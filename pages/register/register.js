import api from '../../api/index';
import { request } from '../../api/request';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		account: "",
		password: "",
		rePassword: "",
		serverParams: {},
	},

	async registerUser() {
		try {
			let data = {
				account: this.data.account + '@' + this.data.serverParams.domainName,
			};
			if (this.data.account == "" || this.data.password == "") {
				if (this.data.account == "") {
					wx.showToast({
						title: '请输入账号',
						icon: 'none',
						duration: 2000
					});
				}
				else {
					wx.showToast({
						title: '请输入密码',
						icon: 'none',
						duration: 2000
					});
				}
			}
			else {
				const res = await api.user.judgeAccountValid(data);
				//判断账号是否符合要求
				if (res.code == 2000) {
					//判断两次密码输入是否一致
					if (this.data.password == this.data.rePassword) {
						if (res.data.isValid) {
							//验证密码设置是否符合要求
							let pwdExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\@\#\$\%\^\&\*])[^]{8,12}$/;
							//如果符合要求，发送注册请求
							if (pwdExp.test(this.data.password)) {
								let _data = {
									account: this.data.account + '@' + this.data.serverParams.domainName,
									password: this.data.password
								}
								const resRegister = await api.user.registerUser(_data);
								//注册成功
								if (resRegister.code == 2000) {
									wx.showToast({
										title: '注册成功',
										icon: 'success',
										duration: 2000
									});
									//登录
									setTimeout(()=>{
										this.loginPlus(_data);
									}, 1000);
								}
								//注册失败
								else {
									wx.showToast({
										title: '注册失败',
										icon: 'error',
										duration: 2000
									});
								}
							}
							//密码不合要求
							else {
								console.log("不符合要求");
								wx.showToast({
									title: '密码不合规则',
									icon: 'error',
									duration: 2000
								})
							}
						}
						else {
							wx.showToast({
								title: '账号已占用',
								icon: 'error',
								duration: 2000
							})
						}
					}
					else {
						wx.showToast({
							title: '密码不一致！',
							icon: 'error',
							duration: 2000
						})
					}

				}
				else {
					wx.showToast({
						title: res.data.msg,
						icon: "error",
						duration: 2000
					})
				}
			}
		}
		catch (e) {
			console.log(e);
		}
	},

	/**
	 * 封装的登录函数
	 */
	async loginPlus(_data) {
		try {
			const res = await api.user.login(_data);
			if (res.code == 2000) {
				let userSession ={...res.data};
				if (wx.getStorageSync('userSession')) {
					wx.removeStorageSync('userSession');
				}
				// wx.setStorageSync('loginStatus', 1);
				wx.setStorageSync('userSession', userSession);
				wx.redirectTo({
					url: '/pages/setUserInfo/setUserInfo',
				})
			}
			else {
				Dialog.confirm({
					title: '登录失败',
					message: '是否重新登录？',
				})
					.then(() => {
						this.loginPlus();
					})
					.catch(() => {
						wx.redirectTo({
							url: '/pages/login/login',
						})
					});
			}
		}
		catch (e) {
			console.log(e);
		}
	},

	async getDomain() {
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

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		this.getDomain();
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