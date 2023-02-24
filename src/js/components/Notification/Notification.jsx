import React from 'react';
import './Notification.scss';

function Notification({ text }) {
  return (
    <div className="notification">
      {text}
    </div>
  );
}

export default Notification;
