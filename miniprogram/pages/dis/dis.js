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
    var that=this
    setTimeout(function () {
      that.setData({
      'ivitationList.page': 0,
      'ivitationList.list': []
    })
      that.getInvitationData()
    wx.stopPullDownRefresh();
    },1500)
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
      url: 'https://www.mofashiteam.com/massage/getInvitation',
      method: "GET",
      data: {
        page: _this.data.ivitationList.page
      },
      success: function (res) {
        const oldList = _this.data.ivitationList.list;
        console.log(res)
        oldList.push(...res.data);
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
    var it = JSON.stringify(this.data.ivitationList.list[id])
    wx.navigateTo({
      url: '../detail_page/detail_page?detail_page_data=' + it,
    })
  },
  //上拉加载更多
  onReachBottom(options) {
    this.getInvitationData();
  },
  //判断是否显示回到顶部的按钮
  onPageScroll(options) {
    const scrollTop = options.scrollTop;
    const flag = scrollTop > TOP_DISTANCE;
    if (flag != this.data.isShowBT) {
      this.setData({
        isShowBT: flag
      })
    }
  },
  
  //新增按钮
  handleAddInvt() {
    var token = wx.getStorageSync('token');
    console.log("token:"+token);
    if (token==""){
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
    else{ 
      wx.checkSession({
        success() {
          wx.navigateTo({
            url: '/pages/addInvitation/addInvitation'
          })
        },
        fail() {
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }
      });
     
  }
   
  }
})