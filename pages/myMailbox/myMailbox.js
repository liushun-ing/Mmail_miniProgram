import user from '../../api/user'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        authority: 0,
        userInfo: {}
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
                        const reqData = {
                            userId: that.data.userInfo.userId,
                            avatar: 'data:image/png;base64,' + res.data
                        }
                        try {
                            const res = await user.uploadAvatar(reqData);
                            if (res.code !== 2000) {
                                wx.showToast({
                                    title: '上传失败',
                                    icon: 'error'
                                });
                            } else {
                                that.setData({
                                    [`userInfo.avatar`]: reqData.avatar
                                })
                            }
                        } catch (error) {
                            wx.showToast({
                              title: '网络错误',
                              icon: 'error'
                            });
                        }
                    }
                })
            }
        })
    },

    async getUserInfo() {
        let params = {
            userId: wx.getStorageSync('userSession').userId
        }
        try {
            const res = await user.getUserInfo(params);
            if (res.code === 2000) {
                this.setData({
                    userInfo: res.data
                });
            } else {
                wx.showToast({
                    title: '获取个人信息失败',
                    icon: 'none'
                });
            }
        } catch (error) {
            wx.showToast({
                title: '网络错误',
                icon: 'error'
            });
        }
    },

    naviToAdmin() {
        if (wx.getStorageSync('userSession').authority == 0) {
            wx.showToast({
              title: '您不是管理员，没有权限查看',
              icon: 'none'
            });
            return;
        }
        wx.navigateTo({
          url: '/pages/admin/admin',
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            authority: wx.getStorageSync('userSession').authority
        })
        this.getUserInfo();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

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
        this.getUserInfo();
        wx.stopPullDownRefresh();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})