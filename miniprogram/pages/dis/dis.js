// pages/dis/dis.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    scrollLeft: 0,
    currentTab: 0,
    topData: [{
      top_id: 0,
      name: '全部'   
    }, {
        top_id: 1,
      name: '热门'
    }, {
        top_id: 2,
      name: '精华'
      }, {
        top_id: 3,
        name: '建议交流'
      }, {
        top_id: 4,
        name: '重要公告'
      }],
  },
  switch(e) {
    var index = e.currentTarget.dataset.current;
    this.setData({
      currentTab: index
    })
  },

  onShow() {
    const userInfo = wx.getStorageSync("userinfo");
    this.setData({ userInfo })
  }
})