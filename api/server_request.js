// 记录同时发送请求的个数
let AjaxTimes = 0;
const baseURL = 'http://110.40.230.26:8081';
// const baseURL = 'http://localhost:8081';

// 参数传入形式{url:xxx, data:xxx, method: xxx}
// method只有POST请求需要说明，url只需传入后面一截就好了，data也只需要在有需要的时候传入即可
export const request=(params)=>{
  AjaxTimes++;
  wx.showLoading({
    title: '努力中',
    mask: true
  });  
  return new Promise((resolve, reject)=>{
	let header = {};
	if(wx.getStorageSync('login_token')) {
      header['Token'] = wx.getStorageSync('login_token').token;
	}
    if(params.method === 'POST') {
      header['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    wx.request({
      ...params,
      url : baseURL + params.url,
      header : header,
      success:(result)=>{
        resolve(result.data);
      },
      fail:(err)=>{
        if (err.code == 401) {
          wx.showToast({
            title: '登陆过期，请重新登陆',
            icon: 'none'
          });
          wx.removeStorageSync('userSession');
          wx.navigateTo({
            url: '/pages/login/login',
          });
        }
        reject(err);
      },
      complete:()=>{
        AjaxTimes--;
        //  关闭加载中
        if (AjaxTimes === 0) {
          wx.hideLoading();
        }
      }
    });
  });
}
  