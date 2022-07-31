import Toast from '@vant/weapp/toast/toast';
import user from '../../api/user';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		idType: ['普通用户', '管理员'],
		popupShow: false,
		userType: "普通用户",
		userId: "",
		password: ""
	},

	/*弹出弹出层*/
	showPopup() {
		this.setData({
			popupShow: true,
		})
	},

	onClose() {
		this.setData({ popupShow: false });
	},

	/*
	* 选择登录账号类型
	*/
	chooseIdType(event) {
		const { picker, value, index } = event.detail;
	},

	confirmIdType(event) {
		const { picker, value, index } = event.detail;
		this.setData({
			userType: value,
			popupShow: false,
		})
	},

	cancelChooseIdtype(event) {
		const { picker, value, index } = event.detail;
		this.setData({
			popupShow: false,
		})
	},

	async login() {
		let data = {
			account: this.data.userId,
			password: this.data.password,
		};
		if (data.account == "") {
			wx.showToast({
				title: '请输入账号',
				icon: 'none',
				duration: 2000
			})
		}
		else if (data.password == "") {
			wx.showToast({
				title: '请输入密码',
				icon: 'none',
				duration: 2000
			})
		}
		else {
			try {
				const res = await user.login(data);
				//const res = await request({url: "/login", data: data, method: "POST"});
				if (res.code === 2000) {
					wx.showToast({
						title: '登录成功',
						icon: "success",
						duration: 2000
					})
					let userSession = {
						account: res.data.account,
						authority: res.data.authority,
						nickname: res.data.nickname,
						userId: res.data.userId,
						token: res.data.token
					}
					if (wx.getStorageSync('userSession')) {
						wx.removeStorageSync('userSession');
					}
					// wx.setStorageSync('loginStatus', 1);
					wx.setStorageSync('userSession', userSession);
					setTimeout(() => {
						wx.reLaunch({
							url: '/pages/inbox/inbox',
						});
					}, 1500);
				}
				else {
					wx.showToast({
						title: res.msg,
						icon: "error",
						duration: 2000
					})
				}
			}
			catch (error) {
				wx.showToast({
					title: '网络错误',
					icon: "error",
					duration: 2000
				})
				console.log(error);
			}
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		// try {
		//     if(wx.getStorageSync('loginStatus') == '1'){
		//         wx.redirectTo({
		//             url: '/pages/inbox/inbox',
		//         })
		//     }
		// } 
		// catch (e) {
		//     console.log(e);
		// }
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