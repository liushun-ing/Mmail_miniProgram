import user from "../../../api/user";

// pages/setting/changePassword/changePassword.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldStatus: true,
    newStatus: true,
    confirmStatus: true,
    userId: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  },

  inputOldPassword(e) {
    this.setData({
      oldPassword: e.detail.value
    });
  },

  inputNewPassword(e) {
    this.setData({
      newPassword: e.detail.value
    });
  },

  inputConfirmPassword(e) {
    this.setData({
      confirmPassword: e.detail.value
    });
  },

  async oldBlur() {
    let reqData = {
      userId: this.data.userId,
      password: this.data.oldPassword
    }
    try {
      const res = await user.verifyPassword(reqData);
      if(res.code !== 2000) {
        this.setData({
          oldStatus: false
        });
      } else {
        this.setData({
          oldStatus: true
        });
      }
    } catch (error) {
      this.setData({
        oldStatus: false
      });
      wx.showToast({
        title: '验证旧密码失败',
        icon: 'none'
      });
    }
  },

  newBlur() {
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\@\#\$\%\^\&\*])[^]{8,12}$/.test(this.data.newPassword)) {
      this.setData({
        newStatus: false,
      });
    } else {
      this.setData({
        newStatus: true
      });
    }
  },

  confirmBlur() {
    if(this.data.confirmPassword != this.data.newPassword) {
      this.setData({
        confirmStatus: false,
      });
    } else {
      this.setData({
        confirmStatus: true
      });
    }
  },

  async submit() {
    if(!this.data.newStatus || !this.data.oldStatus || !this.data.confirmStatus) {
      wx.showToast({
        title: '填写信息有误',
        icon: 'none'
      });
      return;
    }
    let reqData = {
      userId: this.data.userId,
      newPassword: this.data.newPassword
    }
    try {
      const res = await user.changePassword(reqData);
      if(res.code !== 2000) {
        wx.showToast({
          title: '修改失败',
          icon: 'none'
        });
      } else {
        wx.showToast({
          title: '修改成功，请重新登录',
          icon: 'none'
        });
        setTimeout(() => {
          wx.removeStorageSync('userSession');
          wx.navigateTo({
            url: '/pages/login/login',
          });
        }, 2000);
      }
    } catch (error) {
      wx.showToast({
        title: '网络错误',
        icon: 'error'
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId: wx.getStorageSync('userSession').userId
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