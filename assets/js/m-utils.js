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
  }
}
export {
  utils as
  default
};