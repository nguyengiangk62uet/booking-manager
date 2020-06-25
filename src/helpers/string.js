import _ from 'lodash';

const PRICE_FORMAT = /\B(?=(\d{3})+(?!\d))/g;

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();
};

const capitalJoin = (...args) => {
  return capitalize(args.join(' '));
};

const formatPrice = (price, defaultValue = '') => {
  return `${_.isNumber(price) ? price : defaultValue}`.replace(
    PRICE_FORMAT,
    '.'
  );
};

const formatPriceFull = (price) => {
  return `${formatPrice(price)} đ`;
};

const isPositiveNumber = (value) => {
  return /^\d+$/.test(value);
};

const getIntValIfValid = (value) => {
  return isPositiveNumber(value) ? parseInt(value) : value;
};

const buildClassNames = (map) => {
  return Object.keys(_.pickBy(map)).join(' ');
};

export default {
  capitalize,
  capitalJoin,
  formatPrice,
  formatPriceFull,
  isPositiveNumber,
  getIntValIfValid,
  buildClassNames,
};
