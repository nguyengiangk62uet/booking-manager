import { stringHelpers } from 'helpers';

const { getIntValIfValid } = stringHelpers;

const resetFilter = (
  formValues,
  setFieldsValue,
  resetFields
) => {
  resetFields();
  Object.keys(formValues).forEach(key => {
    setFieldsValue({ [key]: undefined });
  });
};

const getFormInitialValues = (
  queryParams,
  multipleSelectKeys
) => {
  const res = { ...queryParams };
  Object.entries(queryParams).forEach(([key, value]) => {
    // Multiple select field
    if (multipleSelectKeys && multipleSelectKeys.includes(key)) {
      res[key] = value.split(',').map((i) => getIntValIfValid(i));
    }
    // Other field (select & text)
    else {
      res[key] = getIntValIfValid(value);
    }
  });
  return res;
};

const processNewFormValues = (queryParams, formValues) => {
  const res = { ...queryParams };
  Object.entries(formValues).forEach(([key, value]) => {
    let newValue = value ? value.toString().trim() : value;
    if (newValue && !!newValue.length) {
      res[key] = newValue;
    } else {
      delete res[key];
    }
  });
  return res;
};

export default {
  resetFilter,
  getFormInitialValues,
  processNewFormValues,
};
