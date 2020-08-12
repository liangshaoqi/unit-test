/* eslint-disable */
/**
 * session存储
 * @param {String} name 键名
 * @param {Object} data 值
 */
export function session_set(name, data) {
  sessionStorage.setItem(name, JSON.stringify(data));
}

/**
 * 读取session
 * @param {String} name 键名
 */
export function session_get(name) {
  return JSON.parse(sessionStorage.getItem(name));
}

export function local_set(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}

export function local_get(name) {
  return JSON.parse(localStorage.getItem(name));
}

/**
 * 时间戳转换时间
 * @param {Number} timeStamp 时间戳
 * @param {String} middleStr 中间连接符
 * @param {String} type 返回类型是否带详细数据(时分秒)
 */
export function timestampToTime(timeStamp, middleStr = '-', type = 'YMD') {
  let date = new Date(timeStamp);
  let Y = date.getFullYear() + middleStr;
  let M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + middleStr;
  let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + '';
  let h =
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  let m =
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
    ':';
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  if (type === 'YMD') {
    return Y + M + D;
  }
  return Y + M + D + ' ' + h + m + s;
}
/**
 * 标准时间转时间字符串(2019-03-29)
 * @param {*} date 标准时间
 */
export function formatDate(date) {
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  let d = date.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
/**
 * 判断对象属性值是否为空或者null或者undefined
 * @export
 * @param {Object} obj
 * @returns true: 对象属性值有空 false:对象属性值没有空
 */
export function objectHasValueIsEmpty(obj) {
  for (var key in obj) {
    if (obj[key] === '' || obj[key] === undefined || obj[key] === null) {
      return true;
    }
  }
  return false;
}
/**
 * 秒数转时间
 * @param {Number} item
 */
export function reverseTime(item) {
  let h = 0;
  let m = 0;
  let s = 0;
  let time = 0;
  if (item >= 3600) {
    h = Math.floor(item / 3600);
    m = Math.floor((item - 3600 * h) / 60);
    s = item - 3600 * h - 60 * m;
    time =
      (h >= 10 ? h : '0' + h) +
      ':' +
      (m >= 10 ? m : '0' + m) +
      ':' +
      (s >= 10 ? s : '0' + s);
  } else if (item >= 60) {
    m = Math.floor(item / 60);
    s = item - 60 * m;
    time =
      (h >= 10 ? h : '0' + h) +
      ':' +
      (m >= 10 ? m : '0' + m) +
      ':' +
      (s >= 10 ? s : '0' + s);
  } else {
    s = item;
    time =
      (h >= 10 ? h : '0' + h) +
      ':' +
      (m >= 10 ? m : '0' + m) +
      ':' +
      (s >= 10 ? s : '0' + s);
  }
  return time;
}

/**
 * 深度克隆
 * @param {Object} obj
 * @returns {Object} newObj
 */
export function deepClone(obj) {
  var str;
  var newobj = obj.constructor === Array ? [] : {};
  if (typeof obj !== 'object') {
    return;
  } else if (window.JSON) {
    str = JSON.stringify(obj); // 序列化对象
    newobj = JSON.parse(str); // 还原
  } else {
    // 如果不支持以上方法
    for (var i in obj) {
      newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
    }
  }
  return newobj;
}
/**
 * 获取uuid
 * @returns {String} UUID
 */
export function getUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
// 获取sign
export function getEncryptKey(data, ticket) {
  let params = Object.keys(data).sort();
  let encryptStr = '';
  for (let i = 0; i < params.length; i++) {
    if (i === params.length - 1) {
      encryptStr += params[i] + '=' + data[params[i]];
    } else {
      encryptStr += params[i] + '=' + data[params[i]] + '&';
    }
  }
  let hash = window.CryptoJS.HmacSHA256(encryptStr, ticket);
  return window.CryptoJS.enc.Hex.stringify(hash);
}
/**
 * 判断数组对象中是否含有字段并且与参数字段值相等
 * @param { Array } arr 需要判断的数组
 * @param { String } property 某个属性
 * @param { String } propertyValue 属性值
 */
export function arrIsSome(arr, property, propertyValue) {
  return arr.some(item => {
    return item[property] === propertyValue;
  });
}
/**
 * 判断数据是否是对象
 * @param { * } item 需要判断的数据
 * @returns {Boolean}
 */
export function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item))
}
/**
 * 深度合并两个对象
 * @param {*} target 
 * @param  {any} sources 
 */
export function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, {
          [key]: {}
        });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, {
          [key]: source[key]
        });
      }
    }
  }
  return mergeDeep(target, ...sources);
}
export function browserType(version = false) {
  let userAgent = navigator.userAgent.toLowerCase()
  function strInclude (str) {
    return userAgent.indexOf(str) > 0
  }
  let isOpera = strInclude('opera')
  let isFirefox = strInclude('firefox')
  let isChrome = strInclude('chrome')
  let isSafari = strInclude('safari')
  let isIE = strInclude('trident')
  if (isOpera) return opera
  if (isFirefox) return 'firefox'
  if (isChrome) return 'chrome'
  if (isSafari) return 'safari'
  if (isIE) return 'ie'
}