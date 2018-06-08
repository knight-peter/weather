/*时间转换*/
var utils = {
  checkTime: function checkTime(i) {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  },
  formatTime: function formatTime(date) {
    var getFullYear = this.checkTime(date.getFullYear());
    var getMonth = this.checkTime(date.getMonth() + 1);
    var getDate = this.checkTime(date.getDate());
    var getHours = this.checkTime(date.getHours());
    var getMinutes = this.checkTime(date.getMinutes());
    var getSeconds = this.checkTime(date.getSeconds());
    return getFullYear + "-" + getMonth + "-" + getDate + " " + getHours + ":" + getMinutes + ":" + getSeconds;
  },
  formatDate: function formatDate(date) {
    var getFullYear = this.checkTime(date.getFullYear());
    var getMonth = this.checkTime(date.getMonth() + 1);
    var getDate = this.checkTime(date.getDate());
    return getFullYear + "-" + getMonth + "-" + getDate;
  },
  heweather: function heweather(num) {
    let number = parseInt(num);
    switch (number) {
      case 100:
        return 'sunny';
      case 101:
        return 'cloudy';
      case 102:
        return 'cloudy';
      case 103:
        return 'cloudy';
      case 104:
        return 'overcast';
      case 200:
        return 'overcast';
      case 201:
        return 'overcast';
      case 202:
        return 'overcast';
      case 203:
        return 'overcast';
      case 204:
        return 'overcast';
      case 205:
        return 'overcast';
      case 206:
        return 'overcast';
      case 207:
        return 'overcast';
      case 208:
        return 'overcast';
      case 209:
        return 'overcast';
      case 210:
        return 'overcast';
      case 211:
        return 'overcast';
      case 212:
        return 'overcast';
      case 213:
        return 'overcast';
      case 300:
        return 'lightrain';
      case 301:
        return 'heavyrain';
      case 302:
        return 'lightrain';
      case 303:
        return 'heavyrain';
      case 304:
        return 'lightrain';
      case 305:
        return 'lightrain';
      case 306:
        return 'lightrain';
      case 307:
        return 'heavyrain';
      case 308:
        return 'heavyrain';
      case 309:
        return 'lightrain';
      case 310:
        return 'heavyrain';
      case 311:
        return 'heavyrain';
      case 312:
        return 'heavyrain';
      case 313:
        return 'lightrain';
      case 314:
        return 'lightrain';
      case 315:
        return 'heavyrain';
      case 316:
        return 'heavyrain';
      case 317:
        return 'heavyrain';
      case 318:
        return 'heavyrain';
      case 399:
        return 'lightrain';
      case 400:
        return 'snow';
      case 401:
        return 'snow';
      case 402:
        return 'snow';
      case 403:
        return 'snow';
      case 404:
        return 'snow';
      case 405:
        return 'snow';
      case 406:
        return 'snow';
      case 407:
        return 'snow';
      case 408:
        return 'snow';
      case 409:
        return 'snow';
      case 410:
        return 'snow';
      case 499:
        return 'snow';
      case 500:
        return 'cloudy';
      case 500:
        return 'cloudy';
      case 501:
        return 'cloudy';
      case 502:
        return 'cloudy';
      case 503:
        return 'cloudy';
      case 504:
        return 'cloudy';
      case 505:
        return 'cloudy';
      case 506:
        return 'cloudy';
      case 507:
        return 'cloudy';
      case 508:
        return 'cloudy';
      case 509:
        return 'cloudy';
      case 510:
        return 'cloudy';
      case 511:
        return 'cloudy';
      case 512:
        return 'cloudy';
      case 513:
        return 'cloudy';
      case 514:
        return 'cloudy';
      case 515:
        return 'cloudy';
      case 900:
        return 'sunny';
      case 901:
        return 'snow';
      case 999:
        return 'cloudy';
      default:
        return true;
    }
  }
}
export {
  utils as
  default
};