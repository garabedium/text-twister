import React from 'react';

const FormInput = (props) => {
  return (
    <label>{props.label}
      <input
        type="text"
        autoComplete="off"
        className={props.class}
        placeholder={props.placeholder}
        name={props.name}
        value={props.content}
        onKeyPress={props.handleChange}
        onKeyDown={props.handleChange}
      />
    </label>
  );
}

export default FormInput;