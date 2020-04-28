import request from '../../utils/network.js'
// pages/home/home.js
Page({


  data: {
    methods:[],
    recommend:[]
  },
  
  
  onLoad: function (options) {
      request({
        url:'http://120.25.217.98:8000/massage/getMassageMethods'
      }).then(res=>{
        this.setData({
          methods:res.data,
        })
        
      }),
        request({
        url: 'http://120.25.217.98:8000/massage/index/getRecommend'
        }).then(res => {
          this.setData({
            recommend: res.data,
          })
          console.log(res.data)
        })
  },




  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})