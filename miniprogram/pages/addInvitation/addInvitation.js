// page/dis/addInvitation/addInvitation.js
const util = require('../../app.js')
Page({
  data: {
    tempFilePaths:[],
    canSent:false,
    title:"",
    content:"",
    count: 9,
    isShowAddBtn: true
  },
  //取消发布
  handleCancel(){
    wx.navigateBack({
      data:1,
    })
  },
  //标题失去焦点
  handleInpitTitle(event){
    this.setData({
      title: event.detail.value
    })
    this.cantSend()
  },
  //内容失去焦点
  handleInpitContent(event){
    this.setData({
      content: event.detail.value
    })
    this.cantSend()
  },
  //发布按钮出发函数
  handleAdd: util.throttle(function () {
    wx.showLoading({
      title: '正在发布...',
      mask: true
    })
    let _this = this
    wx.request({
      url: 'https://www.mofashiteam.com/massage/saveInvitation',
      data: {
        title: this.data.title,
        content: this.data.content,
        token: wx.getStorageSync("token")
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (_this.data.tempFilePaths.length>0){
        _this.uploadFile(0, res.data)
        }
      },
      complete: function () {
        var pages = getCurrentPages();
        var beforePage = pages[pages.length - 2];
        // 调用列表页的获取数据函数
        beforePage.onPullDownRefresh();
        
        wx.navigateBack({
          data: 1,
        })
      }
    })
  }),
  uploadFile(i, id) {
    if (i > 9) {
      return;
    }
    wx.showLoading({
      title: '上传中...',
      mask: true,
    });
    var that = this;
    wx.uploadFile({
      url: "https://www.mofashiteam.com/massage/upLoadFile",
      filePath: that.data.tempFilePaths[i],
      name: 'file',
      formData: {
        i: i,
        id: id
      },
      success: (res) => {
      },
      fail: (res) => {
        wx.hideLoading();
        wx.showToast({
          title: '上传失败',
          mask: true,
          icon: 'none',
          duration: 1000
        })
      },
      complete: () => {
        i++;
        //当图片传完时，停止调用 
        if (i == that.data.tempFilePaths.length) {
          wx.hideLoading();
          wx.showToast({
            title: '发布成功',
            duration: 3000
          })
        }
        else { //若图片还没有传完，则继续调用函数
          that.uploadFile(i, id);//递归，回调自己
        }
      }
    });
  },
  //删除图片
  deleteImage(event) {
    let index = event.currentTarget.dataset.id;
    let images = this.data.tempFilePaths;
    images.splice(index, 1);
    var count = this.data.count + 1
    this.setData({
      count,
      isShowAddBtn: true
    })
    this.setData({
      tempFilePaths: images
    })
    this.cantSend()
  },
  handleAddImg() {
    var that = this;
    //微信选择图片api
    wx.chooseImage({
      //count表示选择图片的数量，默认为 9
      count: that.data.count,
      //图片的大小original表示原图，compressed表示缩略图，默认都可以
      sizeType: ['original', 'compressed'],
      //图片的来源album表示相册，camera表示照相机
      sourceType: ['album', 'camera'],
      success: function (tempFilePaths) {
        //缓存下 
        //显示加载的api
        wx.showToast({
          title: '正在加载...',
          icon: 'loading',
          mask: true,
          duration: 1000,
          success: function (res) {
          }
        })
        //如果多张图可以遍历
        var imageList = tempFilePaths.tempFilePaths
        const oldList = that.data.tempFilePaths;
        oldList.push(...imageList);
        var count = 9 - oldList.length;
        if (count == 0) {
          that.setData({
            isShowAddBtn: false
          })
        }
        //设置前端展示的图片地址
        that.setData({
          count,
          tempFilePaths: oldList,
          canSent: true
        })
      }
    })
  },
  cantSend() {
    //判断是否所有内容都为空
    if (this.data.tempFilePaths.length == 0 && this.data.title == "" && this.data.content == "") {
      this.setData({
        canSent: false
      })
    }
    else if (!this.data.canSent) {
      this.setData({
        canSent: true
      })
    }
  }
})