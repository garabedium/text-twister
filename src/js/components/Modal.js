import React from 'react';

const Modal = (props) =>{
  return (
    <div
      className={props.class}
    >
    {props.content}
    </div>
  );
}

export default Modal;