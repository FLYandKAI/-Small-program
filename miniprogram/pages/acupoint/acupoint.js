import request from '../../utils/network.js'
// miniprogram/pages/acupoint/acupoint.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    acupoint_data:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request({
      url: 'https://www.mofashiteam.com/massage/getAcupoint',
      data: { 'bodyPartId': options.id }
    }).then(res => {
      this.setData({
        acupoint_data: res.data,
      })
    })
  },

  click_acupoint(e) {
    var acupoint_item_data= e.currentTarget.dataset;
    var it = JSON.stringify(acupoint_item_data)
   
    wx.navigateTo({
      url: '../acupoint_item/acupoint_item?acupoint_item_data=' +it,
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})