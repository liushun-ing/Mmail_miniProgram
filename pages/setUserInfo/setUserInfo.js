import user from "../../api/user";

// pages/setUserInfo/setUserInfo.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		avatar: '',
		userId: '',
		phone: "",
		nickname: "",
	},

	/**
	 * 设置用户头像
	 *  
	 */
	setAvatar(e) {
		var count = 1;
		var that = this;
		wx.chooseImage({
			count: count,
			sizeType: ['compressed'],
			sourceType: ['album', 'camera'],
			success(res) {
				wx.getFileSystemManager().readFile({
					filePath: res.tempFilePaths[0], //选择图片返回的相对路径
					encoding: "base64",//这个是很重要的
					success: async (res) => { //成功的回调
						//返回base64格式
						// that.setData({
						//     avatarUrlBase64: 'data:image/png;base64,' + res.data,
						// });
						that.setData({
							avatar: 'data:image/png;base64,' + res.data
						});
					}
				})
			}
		})
	},

	/**
	 * 上传用户资料 
	 */
	async updateUserInfo() {
		try {
			let userInfo = {
				nickname: this.data.nickname,
				phone: this.data.phone,
				avatar: this.data.avatar,
				userId: this.data.userId
			}
			const res = await user.updateUserInfo(userInfo);
			if (res.code == 2000) {
				wx.showToast({
					title: '设置成功',
					icon: 'success',
					duration: 2000,
				});
				setTimeout(() => {
					wx.reLaunch({
						url: '/pages/inbox/inbox',
					});
				}, 2000);
			}
			else {
				wx.showToast({
					title: '设置失败',
					icon: 'error',
					duration: 2000,
				});
				console.log(res.msg);
			}
		} catch (e) {
			console.log(e);
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		this.setData({
			userId: wx.getStorageSync('userSession').userId
		});
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