import api from '../../../api/index';
import util from '../../../utils/util';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mailList:[],
        searchKey: "",
        account: '',
        seletedEmailId: '',
    },

    totalPage: 1,
    pageSize: 10,
    currentPage: 1,

    /**
     * 根据当前pageSize和currentPage以及searchKey获取邮箱列表 
     */
    async getMailList() {
        let reqData = {
            searchKey: this.data.searchKey,
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            account: this.data.account
        }
        try {
            const res = await api.mail.getDeletedMail(reqData);
            if(res.code == 2000) {
                let mailList = res.data.deletedList;
                mailList.forEach((item) => {
                    item.deleteTime = util.formatTime(item.deleteTime)
                });
                this.setData({
                    mailList: [...this.data.mailList, ...mailList]
                });
                this.totalPage = Math.ceil(res.data.total / this.pageSize);
            } else {
                wx.showToast({
                  title: '获取邮件失败',
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
     * 
     * 根据关键字搜索邮件 
     */
    onSearch: function() {
        this.currentPage = 1;
        this.data.mailList = [];
        this.getMailList();
    },

    /**
     * 取消搜索 
     */
    onCancel: function() {
        this.setData({
            searchKey: '',
            mailList: []
        });
        this.currentPage = 1;
        this.getMailList();
    },

    /**
     * 跳转到详情页面 
     */
    getDetail: function(e) {
        // console.log(e);
        wx.navigateTo({
          url: `/pages/myMailbox/deletedMailDetail/deletedMailDetail?emailId=${e.currentTarget.dataset.id}`,
        });
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        if(this.currentPage > this.totalPage) {
            wx.showToast({
              title: '到底啦！',
              icon: 'none'
            });
        } else {
            this.currentPage++;
            this.getMailList();
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            account: wx.getStorageSync('userSession').account
        });
        this.getMailList();
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
        if (this.data.seletedEmailId) {
            const mailList = this.data.mailList.filter((item) => {
                return item.emailId != this.data.seletedEmailId
            });
            this.data.seletedEmailId = '';
            this.setData({
                mailList: mailList
            })
        }
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
        this.currentPage = 1;
        this.getMailList();
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