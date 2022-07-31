import api from '../../api/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toEmail: '',
    subject: '',
    content: '',
    userTotal: 0,
    filterTotal: 0,
    logTotal: 0,
    active: 'params',
    selected: 'params',
    filterAccountList: [],
    logList: [],
    userList: [],
    serverParams: {},
  },
  userPageSize: 10,
  userCurrentPage: 1,
  logPageSize: 10,
  logCurrentPage: 1,

  onChange(e) {
    this.setData({
      selected: e.detail.name
    });
    this.getData();
  },

  getData() {
    if (this.data.selected == 'params') {
      if (!this.data.serverParams.domain) {
        this.getServerParams();
      }
    } else if (this.data.selected == 'filter') {
      if (this.data.filterAccountList.length == 0) {
        this.getFilterAccountList();
      }
    } else if (this.data.selected == 'logs') {
      if (this.data.logList.length < this.data.logTotal || this.data.logList.length == 0) {
        this.getLogList();
      }
    } else if (this.data.selected == 'auth') {
      if (this.data.userList.length < this.data.userTotal || this.data.userList.length == 0) {
        this.getUserList();
      }
    } else if (this.data.selected == 'send') {

    }
  },

  async getServerParams() {
    try {
      const res = await api.server.getServerParams();
      if (res.code === 2000) {
        this.setData({
          serverParams: res.data.serverParams
        });
      } else {
        wx.showToast({
          title: '获取失败',
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

  async getFilterAccountList() {
    try {
      const res = await api.server.getFilterAccountList();
      if (res.code === 2000) {
        this.setData({
          filterTotal: res.data.total,
          filterAccountList: res.data.filterAccountList,
        });
      } else {
        wx.showToast({
          title: '获取失败',
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

  async getLogList() {
    const reqData = {
      pageSize: this.logPageSize,
      currentPage: this.logCurrentPage
    };
    try {
      const res = await api.server.getLogList(reqData);
      if (res.code === 2000) {
        this.setData({
          logTotal: res.data.total,
          logList: [...this.data.logList, ...res.data.logList]
        });
      } else {
        wx.showToast({
          title: '获取失败',
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

  async getUserList() {
    const reqData = {
      pageSize: this.userPageSize,
      currentPage: this.userCurrentPage
    };
    try {
      const res = await api.server.getUserList(reqData);
      if (res.code === 2000) {
        this.setData({
          userList: [...this.data.userList, ...res.data.userList],
          userTotal: res.data.total
        });
      } else {
        wx.showToast({
          title: '获取失败',
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

  async sendEmail() {
    if (!this.data.toEmail || !this.data.subject || !this.data.content) {
      wx.showToast({
        title: '信息不完善',
        icon: 'none'
      });
      return;
    }
    try {
      let data = {
        toEmail: this.data.toEmail.trim().split('\n'),
        fromEmail: wx.getStorageSync('userSession').account,
        subject: this.data.subject,
        content: this.data.content,
      }
      const res = await api.mail.sendEmail(data);
      if (res.code == 2000) {
        wx.showToast({
          title: '发送成功',
          icon: 'success',
          duration: 2000,
        })
        //成功以后，清空输入框
        this.setData({
          subject: '',
          content: '',
          toEmail: '',
        });
      } else {
        wx.showToast({
          title: '发送失败',
          icon: 'error',
          duration: 2000,
        })
      }
    } catch (e) {
      console.log(e);
      wx.showToast({
        title: '网络错误',
        icon: 'none'
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
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
    if (this.data.selected == 'logs') {
      this.logList = [];
      this.logCurrentPage = 1;
    } else if (this.data.selected == 'auth') {
      this.userList = [];
      this.userCurrentPage = 1;
    } else if (this.data.selected == 'filter') {
      this.filterAccountList = [];
    } else if (this.data.selected == 'params') {
      this.data.serverParams = {};
    }
    this.getData();
    thiswx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.selected == 'logs') {
      if (this.logCurrentPage >= Math.ceil(this.data.logTotal / this.logPageSize)) {
        wx.showToast({
          title: '到底啦！',
          icon: 'none'
        });
        return;
      }
      this.logCurrentPage++;
      this.getLogList();
    } else if (this.data.selected == 'auth') {
      if (this.userCurrentPage >= Math.ceil(this.data.userTotal / this.userPageSize)) {
        wx.showToast({
          title: '到底啦！',
          icon: 'none'
        });
        return;
      }
      this.userCurrentPage++;
      this.getUserList();
    } else if (this.data.selected == 'filter') {
      wx.showToast({
        title: '到底啦！',
        icon: 'none'
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})