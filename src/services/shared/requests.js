// @flow
import axios from 'axios';
import { requestHelper } from 'helpers';

// import { REACT_APP_BASE_API_URL } from 'configs';

let REACT_APP_BASE_API_URL = 'https://booking-ui-api.herokuapp.com';

const getAuthorization = () => {
  return '';
};

const responseSuccessInterceptor = (response) => {
  return response;
};

const responseErrorInterceptor = (error) => {
  requestHelper.handleRequestError(error);
  return Promise.reject(error);
};

const requestInterceptor = (request) => {
  request.headers.Authorization = getAuthorization();
  return request;
};

const mainClient = axios.create({
  baseURL: REACT_APP_BASE_API_URL,
});

const clients = [mainClient];

clients.forEach((client) => {
  client.interceptors.request.use(requestInterceptor);
  client.interceptors.response.use(
    responseSuccessInterceptor,
    responseErrorInterceptor,
  );
});

export default {
  mainClient,
};
