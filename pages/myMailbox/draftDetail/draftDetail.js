// pages/draftDetail/draftDetail.js
import api from "../../../api/index";
import Dialog from "../../../miniprogram_npm/@vant/weapp/dialog/dialog"
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		showHiddenContent: 0,
		moreOrLess: "详情",
		eamil: {}
	},

	/**
	 * 
	 */
	clickMore() {
		if (this.data.moreOrLess == "详情") {
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

	/**
	 *点击删除按钮 
	 */
	clickDelete: function () {
		Dialog.confirm({
			title: '确认删除',
			message: '删除后可在垃圾箱恢复',
		})
			.then(() => {
				this.deleteDraft();
			})
			.catch(() => {
				console.log('取消删除');
			});
	},

	/**
	* 删除草稿
	*/
	deleteDraft: async function () {
		try {
			let data = {
				emailId: this.data.emailId,
			};
			const res = await api.mail.deleteEmail(data);
			if (res.code == 2000) {
				wx.showToast({
					title: '删除成功',
					icon: 'success',
					duration: 2000,
				});
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2];  //上一个页面
				//直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
				prevPage.setData({
					seletedEmailId: this.data.emailId
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
		} catch (e) {
			console.log(e);
		}
	},

	/**
	 * 编辑草稿
	 */
	editDraft: function () {
		// console.log("编辑");
		wx.navigateTo({
			url: `/pages/myMailbox/sendMail/sendMail?emailId=${this.data.emailId}`,
		});
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