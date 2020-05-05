// miniprogram/pages/detail_page/detail_page.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    invitation:{},
    current:String,
    discussShow:false,
    collected:true,
    liked:true,
    detail_images:[
    ],
    comments_data:[
      {
      id:1,
      head: '/images/hind.png',
      name:'郑树凯',
      content:'【中国新闻网】5月2日0-24时，山西省新增1例本地确诊病例，为湖北输入病例。其密切接触者首次核酸检测均为阴性，正在集中隔离医学观察。'
      }, 
      {
        id: 2,
        head: '/images/dis.png',
        name: '郑树凯',
        content: '【中国新闻网】5月2日0-24时，山西省新增1例本地确诊病例，为湖北输入病例。其密切接触者首次核酸检测均为阴性，正在集中隔离医学观察。'
      }
    ]
  },
  previewimgs: function (e) {
    var currentImg = e.currentTarget.dataset.img;
    wx.previewImage({
      current: currentImg, // 当前显示图片的http链接 String
      urls: this.data.detail_images// 需要预览的图片http链接列表 Array
    })

  },
  CommentOn:function(e){
    this.setData({
      discussShow:true
    })
  },
  Islogin(e){
    if (app.globalData.userInfo == null) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
  },
  // 获得内容
  getContent:function(e){
    this.setData({
      content
    })
  },
  //发送评论成功
  send:function(e){
    wx.showToast({
      title: '评论成功',
      icon: 'none',
    })
    this.setData({
      discussShow: false
    })
  },
  //键盘失去焦点
  loseblur(e){
    this.setData({
      discussShow: false
    })
  },
  //收藏
  onCollectionTap(e){
    var postsCollected =this.data.collected;
    postsCollected = !postsCollected;
    this.setData({
      collected: postsCollected
    })
    if (postsCollected==false){
     wx.showToast({
        title: '收藏成功',
        icon: 'none',
      })
      }
      else{
      wx.showToast({
        title: '已取消收藏',
        icon: 'none',
      })
      }
    
  },
  //点赞
  onLikeTap(e){
    var postsliked = this.data.liked;
    postsliked = !postsliked;
    this.setData({
      liked: postsliked
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = JSON.parse(options.detail_page_data)
    this.data.detail_images[0] = that.imageUrl
    var image = this.data.detail_images
    console.log(that)
    this.setData({
      invitation:that,
      detail_images:image
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
    wx.request({
      url: 'https://www.mofashiteam.com/massage/getImageForInvitation',
      data: {
        id: "1",
      },
      success: function (res) {
        console.log(res)
      }
    })
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