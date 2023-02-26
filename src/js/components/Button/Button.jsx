import React from 'react';

import './Button.scss';

function Button({
  className, text, icon, type = 'button', ...props
}) {
  return (
    <button
      type={type}
      className={className}
      {...props}
    >
      {text}
      {icon && <i className={icon} />}
    </button>
  );
}

export default Button;
