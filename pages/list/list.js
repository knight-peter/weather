// pages/list/list.js
import utils from '../../assets/js/m-utils'
let globalData = getApp().globalData;
const dayMap = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekWeather: [1, 2, 3, 4, 5, 6, 7]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWeekWeather();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /* 获取一周天气预报 */
  getWeekWeather() {
    wx.request({
      url: `${globalData.baseUrl}/api/weather/future`,
      data: {
        city: '绍兴',
        time: new Date().getTime()
      },
      success: res => {
        console.log(res)
        let result = res.data.result;
        this.setWeekWeather(result);
      }
    })
  },
  /* 设置数据 */
  setWeekWeather(result) {
    let weekWeather = []

    //把date设置到下一天

    for (let i = 0; i < 7; i++) {
      let date = new Date()
      date.setDate(date.getDate() + i)
      weekWeather.push({
        day: dayMap[date.getDay()],
        date: `${utils.formatDate(date)}`,
        temp: `${result[i].minTemp}° ~ ${result[i].maxTemp}`,
        iconPath: `/assets/image/${result[i].weather}-icon.png`
      })
    }
    weekWeather[0].day = '今天'
    console.log(weekWeather)
    this.setData({
      weekWeather: weekWeather
    });
  }
})