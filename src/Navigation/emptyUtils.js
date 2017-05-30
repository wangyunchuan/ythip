/* 不check boolean 常量哈*/

const check = function (obj) {
  if (typeof obj === 'number') {
    return true
  }
  if (typeof obj === 'boolean') {

    return obj
  }

  if (typeof obj === 'undefined') {
    return false
  }

  if (typeof obj === '') {
    return false
  }

  if (obj === 'undefined'
    || obj === null
    || obj === []
    || isObjEmpty(obj)) {
    return false
  } else {
    return true
  }
};

const isObjEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false
  }
  return true;
};

export default {check, isObjEmpty}


