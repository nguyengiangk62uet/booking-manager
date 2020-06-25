// Created by thanhpd on 5/21/2019
// @flow

const success = jest.fn(() => Promise.resolve({}));
const error = jest.fn(() => Promise.resolve({}));
const warning = jest.fn(() => Promise.resolve({}));


export default {
  success,
  error,
  warning,
  getNotificationsForCurrentUser: jest.fn(() => Promise.resolve({})),
  pushNotificationsForCurrentUser: jest.fn(() => Promise.resolve({})),
  putNotificationsForCurrentUser: jest.fn(() => Promise.resolve({})),
  getAllUserToNotifications: jest.fn(() => Promise.resolve({})),
};
