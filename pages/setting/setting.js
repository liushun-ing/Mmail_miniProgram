import user from '../../api/user'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newNickname: '',
    newPhone: '',
    phoneShow: false,
    nicknameShow: false,
    phoneStatus: true,
    userInfo: {}
  },

  async getUserInfo() {
    let params = {
      userId: wx.getStorageSync('userSession').userId
    }
    try {
      const res = await user.getUserInfo(params);
      if (res.code === 2000) {
        this.setData({
          userInfo: res.data
        });
      } else {
        wx.showToast({
          title: '获取个人信息失败',
          icon: 'none'
        });
      }
    } catch (error) {
      wx.showToast({
        title: '网络错误',
        icon: 'error'
      });
    }
  },

  setNewNickname() {
    this.setData({
      nicknameShow: !this.data.nicknameShow,
    });
  },

  inputNickname(e) {
    this.setData({
      newNickname: e.detail.value
    });
  },

  async submitNickname() {
    let reqData = {
      userId: this.data.userInfo.userId,
      nickname: this.data.newNickname
    }
    try {
      const res = await user.updateUser(reqData);
      if(res.code === 2000) {
        this.setData({
          [`userInfo.nickname`]: reqData.nickname,
          nicknameShow: false,
          newNickname: ''
        });
        wx.showToast({
          title: '修改成功',
        });
      } else {
        wx.showToast({
          title: '修改失败',
          icon: 'error'
        });
      }
    } catch (error) {
      wx.showToast({
        title: '网络错误',
        icon: 'error'
      });
    }
  },

  setNewPhone() {
    this.setData({
      phoneShow: !this.data.phoneShow,
      phoneStatus: true
    });
  },

  inputPhone(e) {
    this.setData({
      newPhone: e.detail.value
    });
  },

  async submitPhone() {
    if(!/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(this.data.newPhone)) {
      this.setData({
        phoneStatus: false,
      });
      return;
    }
    this.setData({
      phoneStatus: true
    });
    let reqData = {
      userId: this.data.userInfo.userId,
      phone: this.data.newPhone
    }
    try {
      const res = await user.updateUser(reqData);
      if(res.code === 2000) {
        this.setData({
          [`userInfo.phone`]: reqData.phone,
          phoneShow: false,
          newPhone: ''
        });
        wx.showToast({
          title: '修改成功',
        });
      } else {
        wx.showToast({
          title: '修改失败',
          icon: 'error'
        });
      }
    } catch (error) {
      wx.showToast({
        title: '网络错误',
        icon: 'error'
      });
    }
  },

  switchAccount() {
    wx.navigateTo({
      url: '/pages/login/login',
    });
  },

  registerNewAccount() {
    wx.navigateTo({
      url: '/pages/register/register',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo();
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