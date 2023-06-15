import React from 'react';
import { NotificationProps } from '../../utils/types.util';
import { notifications } from '../../utils/constants.util';

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
