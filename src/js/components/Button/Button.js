import React from 'react';

const Button = (props) =>{
  return (
    <button
      type="button"
      className={props.class}
      onClick={props.handleClick}
    >
      {props.text}
      {props.icon && <i className={props.icon}></i>}
    </button>
  );
}

export default Button;