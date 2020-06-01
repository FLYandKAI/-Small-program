// miniprogram/pages/detail_page/detail_page.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    height: '',
    content:[],
    invitation:{},
    likelist:{},
    likeCount:"",
    current:String,
    discussShow:false,
   
    liked:true,
    detail_images:[
    ],
    comments_data:[
      {}
    ]
  },
  //图片预览
  previewimgs: function (e) {
    var currentImg = e.currentTarget.dataset.img;
    wx.previewImage({
      current: currentImg, // 当前显示图片的http链接 String
      urls: this.data.detail_images// 需要预览的图片http链接列表 Array
    })

  },
  //启动评论
  CommentOn:function(e){
    this.setData({
      discussShow:true
    })
    
  },
  getheight(e){
    console.log(e);
    var y = e.detail.height;
    console.log(y)
    this.setData({
      height: y
    })
  },
  //是否登陆
  Islogin(e){
    wx.checkSession({
      success() {
      },
      fail() {
        wx.navigateTo({
          url: '/pages/login/login'
        })
      }
    });
    var token = wx.getStorageSync('token')
    console.log(token)
    if (token == "") {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }else {
      this.setData({
        token:token
      })
    }
  },
  // 获得内容
  getContent:function(e){
    this.setData({
      content:e.detail.value
    })
  },
  //发送评论成功
  send:function(e){
    var that=this
    console.log(this.data.token)
    wx.request({
      url: 'https://www.mofashiteam.com/massage/saveComment',
      method: "POST",
      data: {
        content: that.data.content,
        invitation_id: that.data.invitation.id,
        token: wx.getStorageSync("token")
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        console.log(that.data.content)
      }
    })
    wx.showToast({
      title: '评论成功',
      icon: 'none',
    })
    this.setData({
      discussShow: false
    }),
    this.onPullDownRefresh()
  },
  //键盘失去焦点
  loseblur(e){
    this.setData({
      discussShow: false
    })
  },
  //收藏
  onCollectionTap(e){
      wx.request({
        url: 'https://www.mofashiteam.com/massage/saveFavorite',
        method: "POST",
        data: {
          invitation_id: this.data.invitation.id,
          token:wx.getStorageSync("token")
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) { 
          console.log(res)
        }
      })
     wx.showToast({
        title: '收藏成功',
        icon: 'none',
      })
  },
  //点赞
  onLikeTap(e){
    var that=this;
    var postsliked = this.data.liked;
    postsliked = !postsliked;
    this.setData({
      liked: postsliked
    })
    var likecount = this.data.likeCount
    console.log(likecount)
    if (postsliked==true){
    }
    else{
      likecount = likecount+1;
      this.setData({
        likeCount: likecount
      })
    }
    wx.request({
      url: 'https://www.mofashiteam.com/massage/likeStar',
      data: {
        invitation_id: that.data.invitation.id,
        token: wx.getStorageSync("token")
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "Get",
      success: function (res) {
        console.log("点赞/取消成功")
        if(res.data==-1){
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
        that.onPullDownRefresh()
      },
  })
   
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = JSON.parse(options.detail_page_data)
    console.log(that)
    var _this=this
    this.data.detail_images[0] = that.imageUrl
    var image = this.data.detail_images
    this.setData({
      invitation:that
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    var that=this
    wx.request({
      url: 'https://www.mofashiteam.com/massage/getImageForInvitation',
      data: {
        id: this.data.invitation.id,
      },
      success: function (res) {
        that.setData({
          detail_images:res.data
        })
      }
    })
    wx.request({
      url: 'https://www.mofashiteam.com/massage/getComment',
      data: {
        invitation_id: this.data.invitation.id
      },
      success: function (res) {
        console.log(res)
        that.setData({
          comments_data:res.data
        })
      }
    }),
      wx.request({
        url: 'https://www.mofashiteam.com/massage/getLiked',
        data: {
          invitation_id: this.data.invitation.id,
        },
        method: "Get",
        success: function (res) {
          that.setData({
            likelist: res.data,
            likeCount: res.data.length
          })
          var name = wx.getStorageSync("nickName")
          for (var i = 0; i < res.data.length; i++) {
            if (name == res.data[i].username) {
              that.setData({
                liked: false
              })
            }
          }
        }
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  },
  onPullDownRefresh: function () {
    console.log("刷新成功");
    this.onShow(),
    
    wx.stopPullDownRefresh();
  },
})