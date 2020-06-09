// pages/bg/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openSettingBtnHidden: true,//是否授权
    imgUrl: '',
    canvasHidden: true, 
  },
  fanclick:function(){
    wx.switchTab({
      url: '../record/index'
    })
  },
  // 保存图片
  saveImg:function(e){
    let that = this;

    //获取相册授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              //这里是用户同意授权后的回调
              that.saveImgToLocal();
            },
            fail() {//这里是用户拒绝授权后的回调
              that.setData({
                openSettingBtnHidden: false
              })
            }
          })
        } else {//用户已经授权过了
          that.saveImgToLocal();
        }
      }
    })

  },
  saveImgToLocal: function (e) {
    let that = this;
 
    // let imgSrc = that.data.imgUrl;
    // wx.downloadFile({
    //   url: imgSrc,
    //   success: function (res) {
    //     console.log(res);
    //     //图片保存到本地
    //     wx.saveImageToPhotosAlbum({
    //       filePath: res.tempFilePath,
    //       success: function (data) {
    //         wx.showToast({
    //           title: '保存成功',
    //           icon: 'success',
    //           duration: 2000
    //         })
    //       },
    //       fail() {
    //         wepy.showToast({title: '保存失败，稍后再试', icon: 'none'})
    //       }
    //     })
    //   }
    // })
    wx.showLoading({
      title: '正在保存',
      mask: true,
    })
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'customCanvas',
        success: function (res) {
          wx.hideLoading();
          var tempFilePath = res.tempFilePath;
          wx.saveImageToPhotosAlbum({
            filePath: tempFilePath,
            success(res) {
              // utils.aiCardActionRecord(19);
              wx.showModal({
                content: '图片已保存到相册，赶紧晒一下吧~',
                showCancel: false,
                confirmText: '好的',
                confirmColor: '#333',
                success: function (res) {
                  if (res.confirm) { }
                },
                fail: function (res) { }
              })
            },
            fail: function (res) {
              wx.showToast({
                title: res.errMsg,
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
      });
    }, 1000);
  },

  // 授权
  handleSetting: function (e) {
    let that = this;
    // 对用户的设置进行判断，如果没有授权，即使用户返回到保存页面，显示的也是“去授权”按钮；同意授权之后才显示保存按钮

    if (!e.detail.authSetting['scope.writePhotosAlbum']) {
      wx.showModal({
        title: '警告',
        content: '若不打开授权，则无法将图片保存在相册中！',
        showCancel: false
      })
      that.setData({
        openSettingBtnHidden: false
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '您已授权，赶紧将图片保存在相册中吧！',
        showCancel: false
      })
      that.setData({
        openSettingBtnHidden: true
      })
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var wth;// 屏幕宽
    // wx.getSystemInfo({
    //   success:function(res){
    //     wth=res.windowWidth;
    //   }
    // }),
    
    var ctx=wx.createCanvasContext('customCanvas');
    ctx.setFillStyle("#ccc");
    //调用draw()开始绘制
    ctx.drawImage("../../images/bg.png",0,0,wx.getSystemInfoSync().windowWidth-20, 330);
    ctx.drawImage("../../images/01.png",0,60,wx.getSystemInfoSync().windowWidth-20, 170);
    ctx.setFontSize(40)//设置字体大小，默认10
    ctx.fillText("15", wx.getSystemInfoSync().windowWidth/2-40, 150)//绘制文本
    ctx.setFontSize(20)//设置字体大小，默认10
    ctx.fillText("分", wx.getSystemInfoSync().windowWidth/2+10, 150)//绘制文本
   //  ctx.drawImage(that.setDatauserInfo.avatarUrl,wx.getSystemInfoSync().windowWidth-20, 170);
    ctx.draw()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this;
    wx.canvasToTempFilePath({
      // x: 0,
      // y: 0,
      // width: wx.getSystemInfoSync().windowWidth-20,
      // height:340,
      // destWidth: wx.getSystemInfoSync().windowWidth-20,
      // destHeight: 340,
      x: 0,
      y: 50,
      width: that.data.windowWidth * 2,
      height: that.data.contentHeight * 2,
      canvasId: 'customCanvas',
      success(res) {
        // console.log(res.tempFilePath)
        that.setData({
          imgUrl:res.tempFilePath
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})