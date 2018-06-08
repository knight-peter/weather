App({
  onLanunch: function (options) {
    // 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
  },
  onShow: function (options) {
    // 当小程序启动，或从后台进入前台显示，会触发 onShow
  },
  onHide: function () {
    // 当小程序从前台进入后台，会触发 onHide
  },
  onError: function (msg) {
    console.log(msg);
  },
  onPageNotFound: function () {
    // 当小程序出现要打开的页面不存在的情况，会带上页面信息回调该函数,在回调中进行重定向处理
  },
  globalData: {
    baseUrl: 'https://test-miniprogram.com',
    key: '08883216dcd94032848ee21f07d598df'
  }
})