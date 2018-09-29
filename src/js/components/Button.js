import React from 'react';

const Button = (props) =>{
  return (
    <button
      type="button"
      className={props.class}
      onClick={props.handleClick}
    >
      {props.text}
    </button>
  );
}

export default Button;