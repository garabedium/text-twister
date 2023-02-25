import React from 'react';
import './TextInput.scss';

function TextInput({ className, ...props }) {
  return (
    <input
      type="text"
      className={className}
      {...props}
    />
  );
}

export default TextInput;
