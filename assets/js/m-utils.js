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
        return {
          cond_name: 'sunny',
          color: '#cbeefd'
        };
      case 101:
        return {
          cond_name: 'cloudy',
          color: '#deeef6'
        };
      case 102:
        return {
          cond_name: 'cloudy',
          color: '#deeef6'
        };
      case 103:
        return {
          cond_name: 'cloudy',
          color: '#deeef6'
        };
      case 104:
        return {
          cond_name: 'overcast',
          color: '#c6ced2'
        };
      case 200:
        return {
          cond_name: 'overcast',
          color: '#c6ced2'
        };
      case 201:
        return {
          cond_name: 'overcast',
          color: '#c6ced2'
        };
      case 202:
        return {
          cond_name: 'overcast',
          color: '#c6ced2'
        };
      case 203:
        return {
          cond_name: 'overcast',
          color: '#c6ced2'
        };
      case 204:
        return {
          cond_name: 'overcast',
          color: '#c6ced2'
        };
      case 205:
        return {
          cond_name: 'overcast',
          color: '#c6ced2'
        };
      case 206:
        return {
          cond_name: 'overcast',
          color: '#c6ced2'
        };
      case 207:
        return {
          cond_name: 'overcast',
          color: '#c6ced2'
        };
      case 208:
        return {
          cond_name: 'overcast',
          color: '#c6ced2'
        };
      case 209:
        return {
          cond_name: 'overcast',
          color: '#c6ced2'
        };
      case 210:
        return {
          cond_name: 'overcast',
          color: '#c6ced2'
        };
      case 211:
        return {
          cond_name: 'overcast',
          color: '#c6ced2'
        };
      case 212:
        return {
          cond_name: 'overcast',
          color: '#c6ced2'
        };
      case 213:
        return {
          cond_name: 'overcast',
          color: '#c6ced2'
        };
      case 300:
        return {
          cond_name: 'lightrain',
          color: '#bdd5e1'
        };
      case 301:
        return {
          cond_name: 'heavyrain',
          color: '#c5ccd0'
        };
      case 302:
        return {
          cond_name: 'lightrain',
          color: '#bdd5e1'
        };
      case 303:
        return {
          cond_name: 'heavyrain',
          color: '#c5ccd0'
        };
      case 304:
        return {
          cond_name: 'lightrain',
          color: '#bdd5e1'
        };
      case 305:
        return {
          cond_name: 'lightrain',
          color: '#bdd5e1'
        };
      case 306:
        return {
          cond_name: 'lightrain',
          color: '#bdd5e1'
        };
      case 307:
        return {
          cond_name: 'heavyrain',
          color: '#c5ccd0'
        };
      case 308:
        return {
          cond_name: 'heavyrain',
          color: '#c5ccd0'
        };
      case 309:
        return {
          cond_name: 'lightrain',
          color: '#bdd5e1'
        };
      case 310:
        return {
          cond_name: 'heavyrain',
          color: '#c5ccd0'
        };
      case 311:
        return {
          cond_name: 'heavyrain',
          color: '#c5ccd0'
        };
      case 312:
        return {
          cond_name: 'heavyrain',
          color: '#c5ccd0'
        };
      case 313:
        return {
          cond_name: 'lightrain',
          color: '#bdd5e1'
        };
      case 314:
        return {
          cond_name: 'lightrain',
          color: '#bdd5e1'
        };
      case 315:
        return {
          cond_name: 'heavyrain',
          color: '#c5ccd0'
        };
      case 316:
        return {
          cond_name: 'heavyrain',
          color: '#c5ccd0'
        };
      case 317:
        return {
          cond_name: 'heavyrain',
          color: '#c5ccd0'
        };
      case 318:
        return {
          cond_name: 'heavyrain',
          color: '#c5ccd0'
        };
      case 399:
        return {
          cond_name: 'lightrain',
          color: '#bdd5e1'
        };
      case 400:
        return {
          cond_name: 'snow',
          color: '#aae1fc'
        };
      case 401:
        return {
          cond_name: 'snow',
          color: '#aae1fc'
        };
      case 402:
        return {
          cond_name: 'snow',
          color: '#aae1fc'
        };
      case 403:
        return {
          cond_name: 'snow',
          color: '#aae1fc'
        };
      case 404:
        return {
          cond_name: 'snow',
          color: '#aae1fc'
        };
      case 405:
        return {
          cond_name: 'snow',
          color: '#aae1fc'
        };
      case 406:
        return {
          cond_name: 'snow',
          color: '#aae1fc'
        };
      case 407:
        return {
          cond_name: 'snow',
          color: '#aae1fc'
        };
      case 408:
        return {
          cond_name: 'snow',
          color: '#aae1fc'
        };
      case 409:
        return {
          cond_name: 'snow',
          color: '#aae1fc'
        };
      case 410:
        return {
          cond_name: 'snow',
          color: '#aae1fc'
        };
      case 499:
        return {
          cond_name: 'snow',
          color: '#aae1fc'
        };
      case 500:
        return {
          cond_name: 'cloudy',
          color: '#deeef6'
        };
      case 500:
        return {
          cond_name: 'cloudy',
          color: '#deeef6'
        };
      case 501:
        return {
          cond_name: 'cloudy',
          color: '#deeef6'
        };
      case 502:
        return {
          cond_name: 'cloudy',
          color: '#deeef6'
        };
      case 503:
        return {
          cond_name: 'cloudy',
          color: '#deeef6'
        };
      case 504:
        return {
          cond_name: 'cloudy',
          color: '#deeef6'
        };
      case 505:
        return {
          cond_name: 'cloudy',
          color: '#deeef6'
        };
      case 506:
        return {
          cond_name: 'cloudy',
          color: '#deeef6'
        };
      case 507:
        return {
          cond_name: 'cloudy',
          color: '#deeef6'
        };
      case 508:
        return {
          cond_name: 'cloudy',
          color: '#deeef6'
        };
      case 509:
        return {
          cond_name: 'cloudy',
          color: '#deeef6'
        };
      case 510:
        return {
          cond_name: 'cloudy',
          color: '#deeef6'
        };
      case 511:
        return {
          cond_name: 'cloudy',
          color: '#deeef6'
        };
      case 512:
        return {
          cond_name: 'cloudy',
          color: '#deeef6'
        };
      case 513:
        return {
          cond_name: 'cloudy',
          color: '#deeef6'
        };
      case 514:
        return {
          cond_name: 'cloudy',
          color: '#deeef6'
        };
      case 515:
        return {
          cond_name: 'cloudy',
          color: '#deeef6'
        };
      case 900:
        return {
          cond_name: 'sunny',
          color: '#cbeefd'
        };
      case 901:
        return {
          cond_name: 'snow',
          color: '#aae1fc'
        };
      case 999:
        return {
          cond_name: 'cloudy',
          color: '#deeef6'
        };
      default:
        return true;
    }
  }
}
export {
  utils as
  default
};