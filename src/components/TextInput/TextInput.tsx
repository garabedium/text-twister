import React from 'react';
import { TextInputProps } from '../../types/text-input.interface';
import './TextInput.scss';

function TextInput(props: TextInputProps) {
  const { className, ...inputProps } = props;

  return (
    <input
      type="text"
      className={className}
      {...inputProps}
    />
  );
}

export default TextInput;
