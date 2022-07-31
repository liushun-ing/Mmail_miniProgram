import {request} from './request';

const user = {
  login(data) {
    return request({
      url: '/login',
      data: data,
      method: 'POST'
    });
  },

  judgeAccountValid(data) {
      return request({
        url: '/user/judgeAccountValid',
        data: data,
        method: 'POST'
      })
  },

  registerUser(data) {
      return request({
          url: '/user/registerUser',
          data: data,
          method: 'POST'
      })
  },

  /**
   * 上传用户信息
   */
  updateUserInfo(data) {
      return request({
          url: '/user/updateUser',
          data: data,
          method: "POST",
      })
  },

  /**
   * 获取用户信息
   */
  getUserInfo(data) {
    return request({
      url: '/user/getUserInfo',
      data: data,
      method: 'GET'
    });
  },

  uploadAvatar(data) {
    return request({
      url: '/user/uploadAvatar',
      data: data,
      method: 'POST'
    });
  },

  updateUser(data) {
    return request({
      url: '/user/updateUser',
      data: data,
      method: 'POST'
    });
  },

  verifyPassword(data) {
    return request({
      url: '/user/verifyPassword',
      data: data,
      method: 'POST'
    });
  },

  changePassword(data) {
    return request({
      url: '/user/changePassword',
      data: data,
      method: 'POST'
    });
  },
}

export default user;