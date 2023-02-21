import React from 'react';

import './Button.scss';

function Button({
  cssClass, handleClick, text, icon,
}) {
  return (
    <button
      type="button"
      className={cssClass}
      onClick={handleClick}
    >
      {text}
      {icon && <i className={icon} />}
    </button>
  );
}

export default Button;
