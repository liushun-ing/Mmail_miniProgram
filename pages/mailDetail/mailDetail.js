import api from "../../api/index";
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog"
// pages/mailDetail/mailDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showHiddenContent: 0,
        moreOrLess: "详情",
        email: {},
    },

    /**
     * 点击回复邮件
     */
    replyEmail: function() {
        wx.navigateTo({
            url: `/pages/sendEmail/sendEmail?to=${this.data.email.fromEmail}`,
        });
    },

    /**
     *点击删除按钮 
     */
    clickDelete: function() {
        Dialog.confirm({
            title: '确认删除',
            message: '删除后可在垃圾箱恢复',
          })
            .then(() => {
                this.deleteEmail();
            })
            .catch(() => {
              console.log('取消删除');
            });
    },

    /**
     *点击标星邮件 
     */
    starEmail: async function() {
        try {
            let data = {
                emailId: this.data.emailId,
            };
            const res = await api.mail.setStarEmail(data);
            if(res.code == 2000) {
                //标星成功
                this.setData({
                    [`email.stared`]: 1,
                });
                wx.showToast({
                  title: '标星成功',
                  icon: 'success',
                  durtion: 2000
                });
                var pages = getCurrentPages();
                var prevPage = pages[pages.length - 2];  //上一个页面
                //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
                prevPage.setData({
                    seletedEmailId: this.data.emailId
                });
            } else {
                wx.showToast({
                  title: '标星失败',
                  icon: 'error',
                  duration: 2000,
                })
            }
        } catch(e) {   
            console.log(e);
            wx.showToast({
              title: '网络错误',
              icon: 'error'
            });
        }
    },

    /**
     * 取消标星邮件
     */
    cancelStarEmail: async function() {
        try {
            let data = {
                emailId: this.data.emailId,
            }
            const res = await api.mail.clearStared(data);
            if(res.code == 2000) {
                this.setData({
                    [`email.stared`]: 0,
                });
                wx.showToast({
                  title: '取消成功',
                  icon: 'success',
                  duration: 2000,
                });
                var pages = getCurrentPages();
                var prevPage = pages[pages.length - 2];  //上一个页面
                //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
                prevPage.setData({
                    seletedEmailId: this.data.emailId
                });            
            } else {
                wx.showToast({
                  title: '取消失败',
                  icon: 'error',
                  duration: 2000,
                })
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
     * 删除邮件
     */
    deleteEmail: async function(){
        try{
            let data = {
                emailId: this.data.emailId,
            };
            const res = await api.mail.deleteEmail(data);
            if(res.code == 2000) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000,
                });
                var pages = getCurrentPages();
                var prevPage = pages[pages.length - 2];  //上一个页面
                //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
                prevPage.setData({
                    deletedEmailId: this.data.emailId
                });
                setTimeout(() => {
                    wx.navigateBack({
                        delta: 1,
                    });
                }, 1500);
            } else {
                wx.showToast({
                  title: '删除失败',
                  icon: 'error',
                  durtion: 2000,
                });
            }
            
        } catch(e) {
            console.log(e);
        }
    },

    /**
     * 
     */
    clickMore() {
        if(this.data.moreOrLess == "详情"){
            this.setData({
                showHiddenContent: 1,
                moreOrLess: "隐藏",
            })
        }
        else {
            this.setData({
                showHiddenContent: 0,
                moreOrLess: "详情",
            })
        }
    },

    setSeen: async function() {
        try {
            let data = {
                emailId: this.data.emailId,
            }
            const res = await api.mail.setSeen(data);
            if(res.code == 2000) {
                console.log("已读邮件成功");
            } else {
                console.log("已读邮件失败");
            }
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2];  //上一个页面
            //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
            prevPage.setData({
                seletedEmailId: this.data.emailId
            });
        } catch(e) {
            console.log(e + "已读邮件失败");
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
                    email: res.data.emailDetail
                });
                if(this.data.email.seen == 0) {
                    this.setSeen();
                }
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
            emailId: options.emailId
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