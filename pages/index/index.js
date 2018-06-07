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
    city: '绍兴市',
    forecast_arr: []
  },
  onLoad: function () {
    this.getNowWeather();
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
        console.log(res)
        let result = res.data.result;
        let temp = result.now.temp;
        let weather = result.now.weather;
        let forecast = result.forecast;
        let forecast_arr = [];
        // console.log(temp, weather)
        let nowHour = new Date().getHours();
        for (let i = 0; i < forecast.length; i++) {
          // console.log(i, forecast[i]);
          forecast_arr.push({
            time: (i + 3 + nowHour) % 24 + '时',
            iconPath: `/assets/image/${forecast[i].weather}-icon.png`,
            temp: `${forecast[i].temp}°`
          })
        }
        // console.log(forecast_arr)
        this.setData({
          nowTemp: `${temp}°`,
          nowWeather: weatherMap[weather],
          nowWeatherBackground: `/assets/image/${weather}-bg.png`,
          forecast_arr: forecast_arr
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
      complete: () => {
        callback && callback()
      }
    })
  }
})