//app.js
App({
  onLaunch: function () {
    
  },
  globalData: {
    userInfo: null
  },
  getFoodInfo: function (menu,rn,pn,cb){
    wx.request({
      url: 'http://apis.juhe.cn/cook/query.php?key=879902b7b4fa3a4a5e7ddef22970cc5d&rn='+rn+'&pn='+pn+'&menu='+menu, //仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        cb(res.data)
      }
    })
  }
})