// @flow

import i18n from 'i18n';
import { isObject, isNumber } from 'lodash';

export const isValid = (error: Object) => {
  if (error) {
    return Object.values(error).every(value => {
      if (isObject(value)) {
        return isValid(value);
      }
      return !value;
    });
  }
  return !error;
};

export const validateRequired = (
  value: any,
  message: string = i18n.t('FieldRequiredMsg'),
) => {
  if (
    (!value && !isNumber(value)) ||
    (Array.isArray(value) && value.length === 0) ||
    (isObject(value) && Object.keys(value).length === 0)
  ) {
    return message;
  }
  return null;
};

export const validateRange = (value: number, min: number, max: number) => {
  if (value < min || value > max) {
    return `${i18n.t('PleaseInputTheValue')} ${i18n.t('from')} ${min} ${i18n.t(
      'to',
    )} ${max}`;
  }
  return null;
};

export const validateMin = (value: number, min: number, message: string) => {
  if (value < min) {
    return message;
  }
  return '';
};

export const validateMax = (value: number, max: number, message: string) => {
  if (value > max) {
    return message;
  }
  return '';
};

export const isValidPhoneFormat = (number: string): boolean => {
  if (
    !number.match(/^((09|03|07|08|05)+([0-9]{8}))$/) &&
    !number.match(/^(\+(84)+(09|03|07|08|05)+([0-9]{8}))$/) &&
    !number.match(/^(\+(84)+(9|3|7|8|5)+([0-9]{8}))$/) &&
    !number.match(/^((84)+(09|03|07|08|05)+([0-9]{8}))$/) &&
    !number.match(/^((84)+(9|3|7|8|5)+([0-9]{8}))$/)
  ) {
    return false;
  }

  return true;
};
