// pages/login_test/login.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password: '',
    serverUrl: "http://172.24.111.186:8080"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },

  listenerPhoneInput: function(e){

    var phone = e.detail.value;
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      wx.showToast({
        title: '请输入有效字符',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        ajxtrue: false
      })
      if (phone.length != 11 ) {
        wx.showToast({
          title: '手机号有误',
          icon: 'none',
          duration: 2000
        })
      }
    } else {
      this.setData({
        ajxtrue: true
      })
      this.data.phone = e.detail.value;
    }
  },

  listenerPasswordInput: function(e){
    this.data.password = e.detail.value;
  },


  listenerLogin: function(){
    var that = this;
    console.log(this);
    if (this.data.ajxtrue == true){
      wx.request({
        url: this.data.serverUrl +'/userLogin',
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: "POST",
        data:{
          username: this.data.phone,
          password: this.data.password
        },
        responseType: "text",
        success:function(res){
          var jsonStr = res.data;

          // var jsonObj = JSON.parse(jsonStr);
          console.log(jsonStr.role);
          if(jsonStr.role == "role_user"){
            wx.showToast({
              title: '普通用户登陆成功',
              icon: 'success',
              duration: 2000
            })
            wx.navigateTo({
              url: '../home/home?json=' + jsonStr,
            })
          }else{
            wx.showToast({
              title: '管理员登陆成功',
              icon: 'success',
              duration: 2000
            })
            wx.navigateTo({
              url: '../admin/admin?json=' + jsonStr,
            })
          }
          
        }
      })
    }else{
      wx.showToast({
        title: '手机号或密码有误',
        icon: 'none',
        duration: 2000
      })
    }
  }
})