import React from 'react';

import './Button.scss';

function Button({
  cssClass, handleClick, text, icon, form, type = 'button',
}) {
  return (
    <button
      type={type}
      className={cssClass}
      onClick={handleClick}
      form={form}
    >
      {text}
      {icon && <i className={icon} />}
    </button>
  );
}

export default Button;
