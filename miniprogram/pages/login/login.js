// miniprogram/pages/index/index.js
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
    wx.login({
      success(res) {
        console.log(res.code)
        if (res.code) {
              // 发起网络请求
              wx.request({
                url: 'https://www.mofashiteam.com/massage/login',
                data: {
                  code: res.code,
                  avatarUrl: e.detail.userInfo.avatarUrl,//这些是用户的基本信息
                  userName: e.detail.userInfo.nickName,//获取昵称
                }, 
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                method:'Post',
                success: function (res) {
               
                  wx.setStorageSync("nickName", e.detail.userInfo.nickName);
                  wx.setStorageSync("avatarUrl", e.detail.userInfo.avatarUrl);
                  wx.setStorageSync("token", res.data);
                  console.log(wx.getStorageSync("token"))
                  var pages = getCurrentPages();
                  if(pages.length>1){
                    var beforePage = pages[pages.length - 2];
                    wx.navigateBack({
                      delta:1
                    })
                  }
                  else{
                    wx.switchTab({
                      url: '../home/home'
                    })
                  }
                 
                } 
          })
        }
        else {
          this.showZanTopTips('很遗憾，您拒绝了微信授权，宝宝很伤心');
        }
      }
    })
   
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