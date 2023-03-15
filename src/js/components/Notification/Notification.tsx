import React from 'react';
import { NotificationProps } from '../../utils/types';
import './Notification.scss';

function Notification(props: NotificationProps) {
  const { text } = props;

  return (
    <div className="notification">
      {text}
    </div>
  );
}

export default Notification;
