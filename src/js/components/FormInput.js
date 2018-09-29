import React from 'react';

const FormInput = (props) => {
  return (
    <label>{props.label}
      <input
        type="text"
        className={props.class}
        placeholder={props.placeholder}
        name={props.name}
        value={props.content}
        onChange={props.handleChange}
      />
    </label>
  );
}

export default FormInput;