// page/dis/dis.js
const TOP_DISTANCE = 300;
Page({
  data: {
    userInfo: {},
    ivitationList: {
      page: 0,
      list: []
    },
    isShowBT: false
  },
  onPullDownRefresh: function () {
    this.setData({
      'ivitationList.page': 0,
      'ivitationList.list': []
    })
    this.getInvitationData()
    wx.stopPullDownRefresh();
  },
  onShow() {
    this.getInvitationData()
  },
  //获取贴子列表
  getInvitationData() {
    let _this = this
    //获取页码
    const page = this.data.ivitationList.page + 1;
    wx.request({
      url: 'https://www.mofashiteam.com/massage/getMyInvitation',
      method: "Get",
      data: {
        token: wx.getStorageSync("token")
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if(res.data.list==-1){
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
        const oldList = new Array();
        oldList.push(...res.data.list);
        console.log(oldList)
        _this.setData({
          'ivitationList.list': oldList,
          'ivitationList.page': page
        })
      }
    })
  },
  //跳转到详情页
  navigateTo_detail(e){
    var id = e.currentTarget.dataset.id;
    console.log(id)
    var it = JSON.stringify(this.data.ivitationList.list[id])
    wx.navigateTo({
      url: '../detail_page/detail_page?detail_page_data=' + it,
    })
  },
  //上拉加载更多
 
  //判断是否显示回到顶部的按钮
  onPageScroll(options) {
    const scrollTop = options.scrollTop;
    const flag = scrollTop > TOP_DISTANCE;
    if (flag != this.data.isShowBT) {
      this.setData({
        isShowBT: flag
      })
    }
  }, delbtn(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    var that = this
    wx.request({
      url: 'https://www.mofashiteam.com/massage/deleteInvitation',
      method: "Post",
      data: {
        Invitation_id: id,
        token: wx.getStorageSync("token")
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        that.onPullDownRefresh()
      }
    })
  }

})