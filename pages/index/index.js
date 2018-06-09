import utils from '../../assets/js/m-utils';
const QQMapWX = require('../../assets/plugin/qqmap/qqmap-wx-jssdk.js');

let globalData = getApp().globalData;
const weatherMap = {
  sunny: '晴天',
  cloudy: '多云',
  overcast: '阴',
  lightrain: '小雨',
  heavyrain: '大雨',
  snow: '雪',
};
const weatherColorMap = {
  sunny: '#cbeefd',
  cloudy: '#deeef6',
  overcast: '#c6ced2',
  lightrain: '#bdd5e1',
  heavyrain: '#c5ccd0',
  snow: '#aae1fc',
};
const UNPROMPTED = 0
const UNAUTHORIZED = 1
const AUTHORIZED = 2

/* const UNPROMPTED_TIPS = '点击获取当前位置'
const UNAUTHORIZED_TIPS = '点击开启位置权限'
const AUTHORIZED_TIPS = '' */

Page({
  data: {
    nowTemp: '',
    nowWeather: '',
    nowWeatherBackground: '',
    city: '广州市',
    // locationTipsText: UNPROMPTED_TIPS,
    locationAuthType: UNPROMPTED,
    forecast_arr: [],
    todayTemp: '',
    todayDate: '',
  },
  onLoad() {

    // 实例化API核心类
    this.qqmapsdk = new QQMapWX({
      key: 'WZLBZ-G7CK6-NZTSB-ECKRY-ZOV3K-7KBRP',
    });
    wx.getSetting({
      success: res => {
        let auth = res.authSetting['scope.userLocation']
        this.setData({
          locationAuthType: auth ? AUTHORIZED : (auth === false) ? UNAUTHORIZED : UNPROMPTED,
          // locationTipsText: auth ? AUTHORIZED_TIPS : (auto === false) ? UNAUTHORIZED_TIPS : UNPROMPTED_TIPS
        })
        if (auth) {
          this.getCityAndNow()
        } else {
          this.getNowWeather()
        }
      }
    })
    this.getNowWeather();
    // console.log('onLoad')
  },
  onReady: function () {
    // console.log('onReady')
  },
  onPullDownRefresh: function () {
    this.getNowWeather(() => {
      wx.stopPullDownRefresh();
    });
  },
  /* onShow() {
    wx.getSetting({
      success: res => {
        let auth = res.authSetting['scope.userLocation']
        // auth为true，locationAuthType不等于2就意味着权限是从无修改为有
        if (auth && this.data.locationAuthType !== AUTHORIZED) {
          // 权限从无到有
          this.setData({
            locationAuthType: AUTHORIZED,
            locationTipsText: AUTHORIZED_TIPS
          })
          this.getCityAndNow()
        }
        // 权限从有到无未处理
      }
    })
  }, */
  /* 获取当天天气 */
  getNowWeather(callback) {
    wx.request({
      url: `${globalData.baseUrl}/api/weather/now`,
      data: {
        city: this.data.city,
      },
      success: res => {
        console.log({
            city: this.data.city,
          },
          '测试接口：', res,
        );
        let result = res.data.result;
        // 设置当前天气
        // this.setNow(result);
        // 设置未来24个小时天气
        this.setForecastArr(result);
        this.setToday(result);
      },
      complete: () => {
        callback && callback();
      },
    });
    /* 获取实况天气 */
    wx.request({
      url: `https://free-api.heweather.com/s6/weather/now?location=${this.data.city}&key=${globalData.key}`,
      success: res => {
        console.log({
          city: this.data.city
        }, '和风天气：', res)
        let result = res.data.HeWeather6[0];
        // 设置当前天气
        this.setNow(result);
      }
    })
    /* 逐小时预报 */
    /* wx.request({
      url: `https://free-api.heweather.com/s6/weather/hourly?location=${this.data.city}&key=${globalData.key}`,
      success: res => {
        console.log({
          city: this.data.city
        }, '和风天气-逐小时预报：', res)
        let result = res.data.HeWeather6[0];
        // 设置未来24个小时天气
        this.setForecastArr(result);
      }
    }) */
  },
  /* 设置当前天气 */
  setNow(result) {
    let temp = result.now.tmp;
    let weather = result.now.cond_txt;
    this.setData({
      nowTemp: `${temp}°`,
      nowWeather: weather,
      nowWeatherBackground: `/assets/image/${utils.heweather(result.now.cond_code).cond_name}-bg.png`,
    });
    // 动态设置标题栏颜色
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: utils.heweather(result.now.cond_code).color,
    });
    // 动态设置当前页面的标题
    wx.setNavigationBarTitle({
      title: `${this.data.city}欢迎您！`,
    });
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
        time: ((i * 3 + nowHour) % 24) + '时',
        iconPath: `/assets/image/${forecast[i].weather}-icon.png`,
        temp: `${forecast[i].temp}°`,
      });
    }

    forecast_arr[0].time = '现在';
    this.setData({
      forecast_arr: forecast_arr,
    });
  },
  /* 设置今天天气数据 */
  setToday(result) {
    let date = new Date();
    this.setData({
      todayTemp: `${result.today.minTemp}° ~ ${result.today.maxTemp}°`,
      todayDate: `${utils.formatDate(date)} 今天`,
    });
  },
  onTapDayWeather() {
    wx.navigateTo({
      url: `/pages/list/list?city=${this.data.city}`,
    });
  },
  /* 点击按钮，获取地址 */
  onTapLocation() {
    if (this.data.locationAuthType === UNAUTHORIZED) {
      wx.openSetting({
        success: (res) => {
          let auth = res.authSetting['scope.userLocation']
          if (auth) {
            // 权限从无到有
            this.getCityAndNow()
          }
          // 权限从有到无未处理
        }
      })
    } else {
      this.getCityAndNow()
    }

  },
  getCityAndNow() {
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        let that = this
        let latitude = res.latitude;
        let longitude = res.longitude;
        let speed = res.speed;
        let accuracy = res.accuracy;
        /* console.log({
          '纬度-latitude': latitude,
          '经度-longitude': longitude,
          '速度-speed': speed,
          '高度-accuracy': accuracy
        }) */
        this.setData({
          // locationTipsText: AUTHORIZED_TIPS,
          locationAuthType: AUTHORIZED
        })
        this.qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude,
          },
          success: function (res) {
            console.log(res);
            let city = res.result.address_component.city;
            that.setData({
              city: city,
            });
            that.getNowWeather();
          },
          fail: function (res) {
            // console.log(res);
          },
          complete: function (res) {
            // console.log(res);
          },
        });
      },
      fail: () => {
        this.setData({
          locationAuthType: UNAUTHORIZED,
          // locationTipsText: UNAUTHORIZED_TIPS
        })
      }
    });
  }
});