import user from './user.js';
import mail from './mail.js';
import server from './server.js';

export default {
  user,
  mail,
  server
}

/**
 * 使用
 * import api from 'xxx/api/index.js';
 * 
 * const res = await api.user.login(data);
 * if(res.code === 2000) {
 *  this.data.list = res.data.list;
 * } else {
 *  wx.showToast({
 *    title: res.data.msg,
 *  });
 * }
 */