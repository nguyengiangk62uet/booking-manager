// @flow
import { notification } from 'antd';
import { notificationHelper } from 'helpers/index';
import { v4 as uuid } from 'uuid';
import { notificationConstants } from 'constant/shared';

const notificationTypes = notificationConstants.types;

const saveNewNotification = (title, message, type) => {
  notificationHelper.pushNotificationsForCurrentUser({
    id: uuid(),
    title,
    message,
    createdAt: new Date().toISOString(),
    type,
    seen: false,
  });
};
const success = (message: string, description: string = '') => {
  notification.success({ message, description });
  saveNewNotification(message, description, notificationTypes.success.value);
};

const error = (message: string, description: string = '') => {
  notification.error({ message, description });
  saveNewNotification(message, description, notificationTypes.danger.value);
};

const warning = (message: string, description: string = '') => {
  notification.warning({ message, description });
  saveNewNotification(message, description, notificationTypes.warning.value);
};

export default {
  success,
  error,
  warning,
};
