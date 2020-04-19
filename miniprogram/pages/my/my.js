// pages/dis/dis.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    scrollLeft: 0,
    currentTab: 0,
    Items: [
      {
        typeId: 0,
        name: '粉丝',
        amount: 0
      },
      {
        typeId: 1,
        name: '关注',
        amount: 0

      },
      {
        typeId: 2,
        name: '动态',
        amount: 0
      }
    ], 
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
        name: '点赞记录',
        image: '/images/like.png'
      },
      {
        id: 3,
        name: '浏览足迹',
        image: '/images/history.png'
      }
    ]

  },

  switch(e) {

    var index = e.currentTarget.dataset.current;
    this.setData({
      currentTab: index
    })
  }
})