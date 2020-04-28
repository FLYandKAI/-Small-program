import request from '../../utils/network.js'
// pages/massage/massage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curNav:1,
    curIndex:0,
    leftData:[{
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request({
      url: 'http://120.25.217.98:8000/massage/getMassageMethods'
    }).then(res => {
      this.setData({
        leftData: res.data,
      })
      console.log(res)
    })
  },

  switchRinght(e){
    var id=e.target.dataset.id;
    var index=e.target.dataset.index;
    this.setData({
        curNav:id,
        curIndex:index
    })
  }
})