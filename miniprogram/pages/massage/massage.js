// pages/massage/massage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curNav:1,
    curIndex:0,
    leftData:[{
      left_id:1,
      name:'拿法',
      children: [{
        child_id: 1,
        name: '洁面皂',
        image: "/images/2.jpg" 
        },{
          child_id: 2,
          name: '卸妆',
          image: "/images/2.jpg"  
        }]
    },{
        left_id: 2,
        name: '捏法'
    },{
        left_id: 3,
        name: '推法'
    },{
        left_id: 4,
        name: '按法'
    },{
        left_id: 5,
        name: '揉法'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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