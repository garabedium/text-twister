import React from 'react';

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
        onClick={props.onClick}
      />
  );
}

export default FormInput;