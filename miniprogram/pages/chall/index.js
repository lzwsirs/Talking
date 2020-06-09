// pages/challenge/index.js
const recorderManager = wx.getRecorderManager();
const innerAudioContext = wx.createInnerAudioContext();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      bool:true,
      tre:true,
      isplay:true,
      pal:''
  },
  lytap(){
    console.log(1111);
    wx.showToast({
      title: '按住时间过短',
      icon: 'none',
      duration: 2000
    })
  },
  lylongpress(e){
    console.log(2222);
    const options = {
      duration: 60000, //指定录音的时长，单位 ms，最大为10分钟（600000），默认为1分钟（60000）
      sampleRate: 16000, //采样率
      numberOfChannels: 1, //录音通道数
      encodeBitRate: 96000, //编码码率
      format: 'mp3', //音频格式，有效值 aac/mp3
      frameSize: 50, //指定帧大小，单位 KB
    }
    this.setData({
      tre:false
    });
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log('。。。开始录音。。。')
    });
    //错误回调
    recorderManager.onError((res) => {
      console.log(res);
    })
  },
  lytou:function(e){
      this.setData({
        bool:false,
        tre:true
      });
    recorderManager.stop();
    recorderManager.onStop((res) => {
      console.log('。。停止录音。。', res.tempFilePath)
      const {tempFilePath} = res;
      wx.setStorage({
        data: tempFilePath,
        key: 'tempFilePath',
      })
    })

  },
  bftap:function(e){
    var that=this;
    console.log("播放按钮");
    wx.getStorage({
      key: 'tempFilePath',
      success(res){
        that.setData({
          pal:res.data
        });
        console.log("*",that.data.pal);

          var isplay = e.currentTarget.dataset.isplay; //暂停还是播放
          innerAudioContext.src ="that.data.pal";
          innerAudioContext.startTime=0; //播放起始位置
          innerAudioContext.autoplay = false;//是否自动播放
          if (isplay == true){
            console.log('开始播放');
            isplay = false;
            //播放事件
            innerAudioContext.onPlay(() => {
              console.log('开始播放');
            })
          }else{
            console.log('暂停播放');
            isplay = true;
            //监听暂停
            innerAudioContext.onPause(() => {
              console.log('暂停播放');
            })
          }
          that.setData({
          isplay:isplay
        })

      }
    });
  },
  cltap:function(){
    this.setData({
      bool:true
    });
    wx.clearStorage();
    console.log("清除成功！");
    // wx.getSetting({
    //   success: function (t) {
    //     console.log(t.authSetting), t.authSetting["scope.record"] ? console.log("已授权录音") : (console.log("未授权录音"),
    //       wx.openSetting({
    //         success: function (t) {
    //           console.log(t.authSetting);
    //         }
    //       }));
    //   }
    // });
  },
  tzclick:function(){
    wx.navigateTo({
      url: '../butt/index'
    })
  },
  /* 转发*/
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '转发dom',
      path: `pages/index/index`,
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
        var shareTickets = res.shareTickets;
        // if (shareTickets.length == 0) {
        //   return false;
        // }
        // //可以获取群组信息
        // wx.getShareInfo({
        //   shareTicket: shareTickets[0],
        //   success: function (res) {
        //     console.log(res)
        //   }
        // })
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var a = this;
    wx.authorize({
      scope: "scope.record",
      success: function() {
        console.log("录音授权成功");
      },
      fail: function() {
        console.log("录音授权失败");
      }
    }), a.onShow()
    wx.showShareMenu({
      // 要求小程序返回分享目标信息
      withShareTicket: true
    }); 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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