// miniprogram/pages/index/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  navigateBack(e){
    wx.switchTab({
      url: '../home/home'
    })
  },
  bindGetUserInfo: function (e) {
    console.log(app.globalData.userInfo)
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo 
      wx.switchTab({
        url: '../home/home'
      })
    } else {
      this.showZanTopTips('很遗憾，您拒绝了微信授权，宝宝很伤心');
    }
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