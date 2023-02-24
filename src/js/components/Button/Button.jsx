import React from 'react';

import './Button.scss';

function Button({
  cssClass, text, icon, type = 'button', ...props
}) {
  return (
    <button
      type={type}
      className={cssClass}
      {...props}
    >
      {text}
      {icon && <i className={icon} />}
    </button>
  );
}

export default Button;
