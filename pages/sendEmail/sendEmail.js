// pages/myMailbox/sendMail/sendMail.js
import api from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromEmail: '',
    toEmail: '',
    subject: '',
    content: ''
  },

  /**
   * 点击存为草稿按钮
   */
  addDraft: async function (e) {
    try {
      if (!this.data.toEmail && !this.data.subject && !this.data.content) {
        wx.showToast({
          title: '请勿全为空',
          icon: 'error',
          duration: 2000,
        })
      } else {
        const reqData = {
          toEmail: this.data.toEmail,
          subject: this.data.subject,
          content: this.data.content
        }
        const res = await api.mail.addDraft(reqData);
        if (res.code == 2000) {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000,
          })
        } else {
          wx.showToast({
            title: '保存失败',
            icon: 'error',
            duration: 2000,
          });
        }
      }
    } catch (error) {
      console.log(error);
      wx.showToast({
        title: '网络错误',
        icon: 'error'
      });
    }
  },

  /**
   * 点击发送按钮发送邮件
   */
  sendEmail: async function () {
    try {
      let data = {
        toEmail: [].concat(this.data.toEmail),
        fromEmail: this.data.fromEmail,
        subject: this.data.subject,
        content: this.data.content,
      }
      const res = await api.mail.sendEmail(data);
      if (res.code == 2000) {
        wx.showToast({
          title: '发送成功',
          icon: 'success',
          duration: 2000,
        });
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          });
        }, 1500);
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000,
        })
      }
    } catch (e) {
      console.log(e);
      wx.showToast({
        title: '网络错误',
        icon: 'error'
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.to) {
      this.setData({
        toEmail: options.to,
        fromEmail: wx.getStorageSync('userSession').account
      });
    } else {
      this.setData({
        fromEmail: wx.getStorageSync('userSession').account
      });
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})