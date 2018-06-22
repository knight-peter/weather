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
const UNPROMPTED = 0;
const UNAUTHORIZED = 1;
const AUTHORIZED = 2;

/* const UNPROMPTED_TIPS = '点击获取当前位置'
const UNAUTHORIZED_TIPS = '点击开启位置权限'
const AUTHORIZED_TIPS = '' */

Page({
  data: {
    nowTemp: '',
    nowWeather: '',
    nowWeatherBackground: '',
    city: '绍兴市',
    // locationTipsText: UNPROMPTED_TIPS,
    locationAuthType: UNPROMPTED,
    forecast_arr: [],
    todayTemp: '',
    todayDate: '',
    nowSport: {},
    qlty: '',
    aqi: '',
    airClass: ''
  },
  onLoad() {
    // 实例化API核心类
    this.qqmapsdk = new QQMapWX({
      key: 'WZLBZ-G7CK6-NZTSB-ECKRY-ZOV3K-7KBRP',
    });
    wx.getSetting({
      success: res => {
        let auth = res.authSetting['scope.userLocation'];
        this.setData({
          locationAuthType: auth ?
            AUTHORIZED : auth === false ?
            UNAUTHORIZED : UNPROMPTED,
          // locationTipsText: auth ? AUTHORIZED_TIPS : (auto === false) ? UNAUTHORIZED_TIPS : UNPROMPTED_TIPS
        });
        if (auth) {
          this.getCityAndNow();
        } else {
          this.getNowWeather();
          this.getAirGroup();
        }
      },
    });
  },
  onReady: function () {
    // console.log('onReady')
  },
  onPullDownRefresh: function () {
    this.getNowWeather(() => {
      wx.stopPullDownRefresh();
    });
    this.getAirGroup(() => {
      wx.stopPullDownRefresh();
    })
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
    /* wx.request({
      url: `${globalData.baseUrl}/api/weather/now`,
      data: {
        city: this.data.city,
      },
      success: res => {
        console.log({
            city: this.data.city,
          },
          '测试接口：',
          res,
        );
        let result = res.data.result;
        // 设置当前天气
        // this.setNow(result);
        // 设置未来24个小时天气
        // this.setForecastArr(result);
        // this.setToday(result);
      },
      complete: () => {
        callback && callback();
      },
    }); */
    /* 获取实况天气 */
    wx.request({
      url: `https://free-api.heweather.com/s6/weather?location=${
        this.data.city
      }&key=${globalData.key}`,
      success: res => {
        console.log({
          city: this.data.city,
        }, {
          '和风天气：': res
        });
        let result = res.data.HeWeather6[0];
        // 设置当前天气
        this.setNow(result);
        // 设置未来24个小时天气
        this.setForecastArr(result);
        // 设置今天天气数据
        this.setToday(result);
        // 在globalData设置未来7天预报
        globalData.daily_forecast = result.daily_forecast;
      },
      complete: () => {
        callback && callback();
      },
    });
  },
  /* 设置当前天气 */
  setNow(result) {
    let temp = result.now.tmp;
    let weather = result.now.cond_txt;
    let lifestyle = result.lifestyle;
    let sport;
    lifestyle.forEach(function (currentValue, index) {
      if (currentValue.type === 'sport') {
        sport = lifestyle[index]
        return
      }
    });
    console.log(lifestyle, sport)
    this.setData({
      nowTemp: `${temp}°`,
      nowWeather: weather,
      nowWeatherBackground: `/assets/image/${
        utils.heweather(result.now.cond_code).cond_name
      }-bg.png`,
      nowSport: sport
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
    let forecast = result.hourly;
    let forecast_arr = [];
    // console.log(temp, weather)
    let nowHour = new Date().getHours();
    for (let i = 0; i < 8; i++) {
      // console.log(i, nowHour, (i + nowHour) % 24, i / 3);
      forecast_arr.push({
        time: `${forecast[i].time.substring(10, 13)}时`,
        iconPath: `/assets/image/cond_icon_heweather/${
          forecast[i].cond_code
        }.png`,
        temp: `${forecast[i].tmp}°`,
      });
    }

    // forecast_arr[0].time = '现在';
    this.setData({
      forecast_arr: forecast_arr,
    });
  },
  /* 设置今天天气数据 */
  setToday(result) {
    let today_data = result.daily_forecast[0]
    this.setData({
      todayTemp: `${today_data.tmp_min}° ~ ${today_data.tmp_max}°`,
      todayDate: `${today_data.date} 今天`,
    });
  },
  /* 获取空气质量数据集合 */
  getAirGroup(callback) {
    wx.request({
      url: `https://free-api.heweather.com/s6/air?location=${
        this.data.city
      }&key=${globalData.key}`,
      success: res => {

        let result = res.data.HeWeather6[0];
        // 设置空气质量
        this.setNowAir(result);
      },
      complete: () => {
        callback && callback();
      },
    })
  },
  setNowAir(result) {
    console.log({
      '空气质量数据集合': result
    })
    let aqi = result.air_now_city.aqi;
    let qlty = result.air_now_city.qlty;
    this.setData({
      aqi: aqi,
      qlty: qlty,
      airClass: utils.heAir(qlty).className
    })
  },
  /* 前往list页面 */
  onTapDayWeather() {
    wx.navigateTo({
      url: `/pages/list/list?city=${this.data.city}`,
    });
  },
  /* 点击按钮，获取地址 */
  onTapLocation() {
    if (this.data.locationAuthType === UNAUTHORIZED) {
      wx.openSetting({
        success: res => {
          let auth = res.authSetting['scope.userLocation'];
          if (auth) {
            // 权限从无到有
            this.getCityAndNow();
          }
          // 权限从有到无未处理
        },
      });
    } else {
      this.getCityAndNow();
    }
  },
  getCityAndNow() {
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        let that = this;
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
          locationAuthType: AUTHORIZED,
        });
        this.qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude,
          },
          success: function (res) {
            console.log('QQ地图：', res);
            let city = res.result.address_component.city;
            that.setData({
              city: city,
            });
            that.getNowWeather();
            that.getAirGroup();
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
        });
      },
    });
  },
});