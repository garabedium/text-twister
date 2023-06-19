import { notifications } from '../utils/constants.util';

export type NotificationKey = keyof typeof notifications;

export type NotificationProps = {
  name: NotificationKey;
};
