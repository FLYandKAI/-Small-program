// pages/dis/dis.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    button_disable:false,
    scrollLeft: 0,
    currentTab: 0,
    userlist: [
      {
        typeId: 0,
        name: '关于我们',
        image:'/images/hind.png',
        arrow:'/images/next.png'
      }
    ], 
    my_items: [
      {
        id: 0,
        name: '我的收藏',
        image:'/images/collection.png'
      },
      {
        id: 1,
        name: '我的评论',
        image: '/images/message.png'

      },
      {
        id: 2,
        name: '我的动态',
        image: '/images/history.png'
      }
    ]

  },
  login(e){
     wx.navigateTo({
       url: '/pages/login/login',
     })
  },
  onShow(options){
    
   
    if (app.globalData.userInfo == null){
      this.setData({
        button_disable:true
      })
    }else{
      this.setData({
        button_disable: false
      })
    }
  },
  onclick_us(){
    wx.navigateTo({
      url: '../us_page/us_page',
    })
  },
  switch(e) {
    var index = e.currentTarget.dataset.current;
    this.setData({
      currentTab: index
    })
  },
 
})