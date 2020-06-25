// Created by thanhpd on 3/29/2019
// @flow

export default {
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  interceptors: {
    response: {
      use: jest.fn(() => {}),
    },
  },
  defaults: {
    transformResponse: [],
    transformRequest: [],
  },
  create: jest.fn(() => {
    return {
      get: jest.fn(() => Promise.resolve({ data: {} })),
      post: jest.fn(() => Promise.resolve({ data: {} })),
      patch: jest.fn(() => Promise.resolve({ data: {} })),
      put: jest.fn(() => Promise.resolve({ data: {} })),
      delete: jest.fn(() => Promise.resolve({ data: {} })),
      interceptors: {
        response: {
          use: jest.fn(() => {}),
        },
        request: {
          use: jest.fn(() => {}),
        },
      },
      defaults: {
        transformResponse: [],
        transformRequest: [],
      },
    };
  }),
};
