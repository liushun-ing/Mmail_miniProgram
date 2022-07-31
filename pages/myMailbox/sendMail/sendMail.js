// pages/myMailbox/sendMail/sendMail.js
import api from '../../../api/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        emailId: '',
        fromEmail:'',
        toEmail: '',
        subject: '',
        content: ''
    },

    /**
     * 点击存为草稿按钮
     */
    updateDraft: async function (e) {
        try {
            if (!this.data.toEmail && !this.data.subject && !this.data.content) {
                wx.showToast({
                    title: '请勿全为空',
                    icon: 'error',
                    duration: 2000,
                })
            } else {
                const reqData = {
                    emailId: this.data.emailId,
                    toEmail: this.data.toEmail,
                    subject: this.data.subject,
                    content: this.data.content
                }
                const res = await api.mail.updateDraft(reqData);
                if (res.code == 2000) {
                    wx.showToast({
                        title: '更新成功',
                        icon: 'success',
                        duration: 2000,
                    })
                } else {
                    wx.showToast({
                        title: '更新失败',
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

    async getEmailDetail() {
        const reqData = {
            emailId: this.data.emailId
        };
        try {
            const res = await api.mail.getEmailDetail(reqData);
            if (res.code === 2000) {
                this.setData({
                    emailId: res.data.emailDetail.emailId,
                    fromEmail: res.data.emailDetail.fromEmail,
                    toEmail: res.data.emailDetail.toEmail,
                    subject: res.data.emailDetail.subject,
                    content: res.data.emailDetail.content
                });
            } else {
                wx.showToast({
                    title: '获取失败',
                    icon: 'none'
                });
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
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            emailId: options.emailId,
        });
        this.getEmailDetail();
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
        this.getEmailDetail();
        wx.stopPullDownRefresh();
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