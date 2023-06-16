import { notifications } from '../utils/constants.util';

export type NotificationKey = keyof typeof notifications;

export interface NotificationProps {
  name: NotificationKey;
}
