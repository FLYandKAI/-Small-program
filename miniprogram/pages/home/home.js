import request from '../../utils/network.js'
// pages/home/home.js
Page({


  data: {
    bodypart:[],
    recommend:[]
  },
  
  
  onLoad: function (options) {
      request({
        url:'https://www.mofashiteam.com/massage/getBodyPart'
      }).then(res=>{
        this.setData({
          bodypart:res.data,
        })
        
      }),
        request({
        url: 'https://www.mofashiteam.com/massage/index/getRecommend'
        }).then(res => {
          this.setData({
            recommend: res.data,
          })
         
        })
  },
  onClick(e){
     wx.navigateTo({
       url: '../acupoint/acupoint?id='+(e.currentTarget.dataset.index+1),
     })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})