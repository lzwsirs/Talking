//index.js
const app = getApp()

Page({
  data: {
  },
  btnclick:function(){
    wx.switchTab({
      url: '../record/index'
    })
}

})
