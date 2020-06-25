import _ from 'lodash';

const getQueryStringFromObj = obj => {
  return Object.keys(
    _.pickBy(obj, value => ![undefined, '', null].includes(value)),
  )
    .map(key => `${key}=${obj[key]}`)
    .join('&');
};

const getObjFromQueryString = str => {
  const pairs = str.slice(1).split('&');
  const result = {};
  pairs.forEach(pair => {
    const newPair = pair.split('=');
    try {
      result[newPair[0]] = decodeURIComponent(newPair[1] || '');
    } catch (e) {
      result[newPair[0]] = newPair[1] || '';
    }
  });
  return result;
};

export default {
  getQueryStringFromObj,
  getObjFromQueryString,
};
