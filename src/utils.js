/**
 * 缩短字符串
 * @param {String} str 原始字符串
 * @param {Number} len 长度限制
 * @return {String} 缩短后的字符串
 */
export const shortenStr = (str, len) => {
  return str.length > len ? (str.slice(0, len - 3) + '...') : str;
};

/**
 * 一天的时间毫秒数
 */
export const ONE_DAY = 24 * 60 * 60 * 1000;

/**
 * 获取时间段长度
 * 时间格式hh:MM
 * @param {String} start
 * @param {String} end
 * @return {number} 分钟数
 */
export const getTimeLength = (start, end) => {
  const startArr = start.split(':');
  const endArr = end.split(':');
  const startHour = parseInt(startArr[0]);
  const startMinute = parseInt(startArr[1]);
  const endHour = parseInt(endArr[0]);
  const endMinute = parseInt(endArr[1]);
  return endHour > startHour ? endMinute + (endHour - startHour) * 60 - startMinute : endMinute - startMinute;
};

/**
 * 判断两个时间大小
 * 时间格式hh:MM
 * @param {String} time1
 * @param {String} time2
 * @return {Boolean} 第一个时间是否大于第二个时间
 */
export const isTimeBigger = (time1, time2) => {
  const timeArr1 = time1.split(':');
  const timeArr2 = time2.split(':');
  const hour1 = parseInt(timeArr1[0]);
  const hour2 = parseInt(timeArr2[0]);
  if (hour1 > hour2 ) return true;
  if (hour1 < hour2 ) return false;

  const minute1 = parseInt(timeArr1[1]);
  const minute2 = parseInt(timeArr2[1]);
  if (minute1 > minute2) return true;
  if (minute1 <= minute2) return false;
};

/**
 * 防抖
 * 概念：函数触发后延迟一段时间再执行，如果在这期间又被触发，则重新计时
 * 常用场景：搜索框输入减少查询量（用户输入完，即无操作时调用接口，而不是每输入一个字符就调用接口）
 * @param func  待防抖函数
 * @param delay 触发延迟(单位：毫秒)
 * @return function(values){...} 防抖后的函数，参数值为原函数参数组成的数组
 */
export const debounce = (func, delay) => {
  return function() {
    const _this = this;
    const _args = arguments;
    clearTimeout(func.did);
    func.did = setTimeout(function() {
      func.call(_this, [..._args]);
    }, delay);
  }
};

/**
 * 节流
 * 概念：一段时间内函数只触发一次
 * 常用场景：监听鼠标滚动事件，执行触底加载效果（滚动一段时间就调用一次接口，而不是滚动时一直调用接口，也不是像防抖那样，滚动结束后再调用接口）
 * @param func  待防抖函数
 * @param delay 触发间隔(单位：毫秒)
 * @return function(values){...} 防抖后的函数，参数值为原函数参数组成的数组
 */
export const throttle = (func, delay) => {
  let last;
  return function() {
    const _this = this;
    const _args = arguments;
    const now = +new Date();
    if (last && now < last + delay) {
      clearTimeout(func.tid);
      func.tid = setTimeout(function() {
        last = now;
        func.call(_this, [..._args]);
      }, delay);
    } else {
      last = now;
      func.call(_this, [..._args]);
    }
  }
};
