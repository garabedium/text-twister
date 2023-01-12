import React from 'react';
import './Notification.scss';

function Notification(props) {
  const { text } = props;
  return (
    <div className="notification">
      {text}
    </div>
  );
}

export default Notification;
