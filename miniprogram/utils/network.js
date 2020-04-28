export default function(option){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: option.url,
      data:option.data||{},
      success:resolve,
      fail:reject
    })
  })
}