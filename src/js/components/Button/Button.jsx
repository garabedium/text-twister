import React from 'react';

import './Button.scss';

function Button(props) {
  return (
    <button
      type="button"
      className={props.class}
      onClick={props.handleClick}
    >
      {props.text}
      {props.icon && <i className={props.icon} />}
    </button>
  );
}

export default Button;
