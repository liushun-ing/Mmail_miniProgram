import {request} from "./server_request.js";

const server = {
  getServerParams() {
    return request({
      url: '/server/getServerParams',
      method: 'GET'
    });
  },

  getFilterAccountList() {
    return request({
      url: '/filterAccount/getFilterAccountList',
      method: 'GET'
    });
  },

  getLogList(data) {
    return request({
      url: '/log/getLogList',
      method: 'GET',
      data: data
    });
  },

  getUserList(data) {
    return request({
      url: '/user/getUserList',
      method: 'GET',
      data: data
    });
  },

}   

export default server;