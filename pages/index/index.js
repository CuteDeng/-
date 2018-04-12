//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    inputVal:null,
    foodInfo:null,
    totalNum:null,
    pn: 0,//数据返回起始下标
    rn: 1,//数据返回条数，最大30
    message:null,
    searchLoadingComplete: false  //“没有数据”的变量，默认false 
  },
  //事件处理函数
  
  btnClick: function (){
    var thisPage = this;
    app.getFoodInfo(this.data.inputVal,this.data.rn,this.data.pn,function(data){
      if(data.result !== null){
        thisPage.setData({ foodInfo: data.result.data })
        thisPage.setData({ totalNum: data.result.totalNum })
        thisPage.setData({ pn: data.result.pn })
        thisPage.setData({ rn: data.result.rn })
        // console.log(thisPage.data.foodInfo)
      }else{
        thisPage.setData({ message: '不存在该菜谱！' })
      }
    })
  },
  input :function(e){
    this.setData({inputVal:e.detail.value})
    this.setData({ message: null })
  },
  //滚动到底部触发事件  
  searchScrollLower: function () {
    var thisPage = this;
    if (thisPage.data.foodInfo != null){
      thisPage.setData({
        pn: parseInt(thisPage.data.pn) + 1,  //每次触发上拉事件，把pn+1   
      });
    }
    // console.log(this.data.totalNum)
    if (!thisPage.data.searchLoadingComplete){
      app.getFoodInfo(this.data.inputVal, this.data.rn, this.data.pn, function (data) {
        if (data.result != null){
          thisPage.data.foodInfo.push(data.result.data[0])
          thisPage.setData({ foodInfo: thisPage.data.foodInfo })
        }
      });
    }
    if (this.data.totalNum != null && this.data.pn >= this.data.totalNum - 1){
      this.setData({ searchLoadingComplete: true })
    }
    
  },
  onLoad: function () {

  }
})
