import utils from '../../assets/js/m-utils'
const QQMapWX = require('../../assets/plugin/qqmap/qqmap-wx-jssdk.js')

let globalData = getApp().globalData;
const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}
const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}
Page({
  data: {
    nowTemp: '',
    nowWeather: '',
    nowWeatherBackground: '',
    city: '广州市',
    forecast_arr: [],
    todayTemp: '',
    todayDate: ''
  },
  onLoad() {
    this.getNowWeather();
    // 实例化API核心类
    this.qqmapsdk = new QQMapWX({
      key: 'WZLBZ-G7CK6-NZTSB-ECKRY-ZOV3K-7KBRP'
    });
  },
  onReady: function () {

  },
  onPullDownRefresh: function () {
    this.getNowWeather(() => {
      wx.stopPullDownRefresh()
    });
  },
  /* 获取当天天气 */
  getNowWeather(callback) {
    wx.request({
      url: `${globalData.baseUrl}/api/weather/now`,
      data: {
        city: this.data.city
      },
      success: res => {
        // console.log(res)
        let result = res.data.result;
        // 设置当前天气
        this.setNow(result);
        // 设置未来24个小时天气
        this.setForecastArr(result);
        this.setToday(result)
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  /* 设置当前天气 */
  setNow(result) {
    let temp = result.now.temp;
    let weather = result.now.weather;
    this.setData({
      nowTemp: `${temp}°`,
      nowWeather: weatherMap[weather],
      nowWeatherBackground: `/assets/image/${weather}-bg.png`
    });
    // 动态设置标题栏颜色
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: weatherColorMap[weather]
    })
    // 动态设置当前页面的标题
    wx.setNavigationBarTitle({
      title: `${this.data.city}`
    })
  },
  /* 设置未来24个小时天气 */
  setForecastArr(result) {
    let forecast = result.forecast;
    let forecast_arr = [];
    // console.log(temp, weather)
    let nowHour = new Date().getHours();
    for (let i = 0; i < 8; i++) {
      // console.log(i, nowHour, (i + nowHour) % 24, i / 3);
      forecast_arr.push({
        time: (i * 3 + nowHour) % 24 + '时',
        iconPath: `/assets/image/${forecast[i].weather}-icon.png`,
        temp: `${forecast[i].temp}°`
      })
    }

    forecast_arr[0].time = '现在';
    this.setData({
      forecast_arr: forecast_arr
    });
  },
  /* 设置今天天气数据 */
  setToday(result) {
    let date = new Date()
    this.setData({
      todayTemp: `${result.today.minTemp}° ~ ${result.today.maxTemp}°`,
      todayDate: `${utils.formatDate(date)} 今天`
    })
  },
  onTapDayWeather() {
    wx.navigateTo({
      url: '/pages/list/list'
    })
  },
  /* 获取地址 */
  onTapLocation() {
    let that = this;
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        let latitude = res.latitude
        let longitude = res.longitude
        let speed = res.speed
        let accuracy = res.accuracy
        /* console.log({
          '纬度-latitude': latitude,
          '经度-longitude': longitude,
          '速度-speed': speed,
          '高度-accuracy': accuracy
        }) */
        this.qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            console.log(res);
            let city = res.result.address_component.city
            that.setData({
              city: city
            })

          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);
          }
        });
      }
    })
  }
})