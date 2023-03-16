import React from 'react';
import { NotificationProps } from '../../utils/types';
import { notifications } from '../../utils/constants';

import './Notification.scss';

function Notification(props: NotificationProps) {
  const { name } = props;
  const notification = notifications[name];

  return (
    <div className="notification">
      {notification}
    </div>
  );
}

export default Notification;
