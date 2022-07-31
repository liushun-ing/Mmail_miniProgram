// pages/inbox/inbox.js
import api from '../../api/index';
import util from '../../utils/util'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		mailList: [],
		searchKey: "",
		account: '',
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
			const res = await api.mail.getMailList(reqData);
			if (res.code == 2000) {
				let mailList = res.data.emailList;
				mailList.forEach((item) => {
					item.sendTime = util.formatTime(item.sendTime)
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
		} catch (e) {
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
	onSearch: function () {
		this.currentPage = 1;
		this.data.mailList = [];
		this.getMailList();
	},

	/**
	 * 取消搜索 
	 */
	onCancel: function () {
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
	getDetail: function (e) {
		// console.log(e);
		wx.navigateTo({
			url: `/pages/mailDetail/mailDetail?emailId=${e.currentTarget.dataset.id}`,
		});
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		const userSession = wx.getStorageSync('userSession');
		if (!userSession) {
			wx.showToast({
				title: '当前未登录，请先登录',
				icon: 'none'
			})
			setTimeout(() => {
				wx.navigateTo({
					url: '/pages/login/login',
				});
			}, 2000);
		} else {
			this.setData({
				account: userSession.account
			});
			this.getMailList();
		}

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {
		if (this.currentPage > this.totalPage) {
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
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	async updateEmailDetail() {
		const reqData = {
			emailId: this.data.seletedEmailId
		};
		try {
			const res = await api.mail.getEmailDetail(reqData);
			if (res.code === 2000) {
				const index = this.data.mailList.findIndex((item) => {
					return item.emailId == this.data.seletedEmailId
				});
				let mailList = this.data.mailList;
				res.data.emailDetail.sendTime = util.formatTime(res.data.emailDetail.sendTime);
				mailList[index] = res.data.emailDetail;
				this.setData({
					mailList: mailList
				});
				this.data.seletedEmailId = '';
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
	 * 生命周期函数--监听页面显示
	 */
	onShow() {
		if (this.data.deletedEmailId) {
			const mailList = this.data.mailList.filter((item) => {
				return item.emailId != this.data.deletedEmailId
			});
			this.data.deletedEmailId = '';
			this.setData({
				mailList: mailList
			});
			return;
		}
		if (this.data.seletedEmailId) {
			this.updateEmailDetail();
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
		this.setData({
			searchKey: '',
			searchCurrentPage: 1,
			searchMailList: [],
			currentPage: 1,
			mailList: [],
		});
		let data = {
			pageSize: this.data.pageSize,
			currentPage: this.data.currentPage,
			searchKey: this.data.searchKey,
			account: this.data.account,
		};
		this.getMailList(data);
		wx.stopPullDownRefresh();
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	}
})