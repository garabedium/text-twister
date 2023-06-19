import React from 'react';
import { TextInputProps } from '../../types/types';
import './TextInput.scss';

function TextInput(props: TextInputProps) {
  const { className, ...inputProps } = props;

  return (
    <input
      type="text"
      className={className}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...inputProps}
    />
  );
}

export default TextInput;
