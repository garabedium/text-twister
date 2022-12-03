import React from 'react';
import './TextInput.scss';

const FormInput = (props) => {
  return (
    <input
      type="text"
      autoComplete="off"
      autoFocus
      className={props.class}
      placeholder={props.placeholder}
      name={props.name}
      value={props.content}
      onKeyPress={props.handleChange}
      onKeyDown={props.handleChange}
      onChange={props.handleChange}
      onClick={props.onClick}
      ref={props.inputRef}
    />
  );
}

export default FormInput;