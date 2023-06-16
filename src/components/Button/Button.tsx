import React, { ButtonHTMLAttributes } from 'react';
import { ButtonProps } from '../../types/misc.types';

import './Button.scss';

function Button(props: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const {
    text,
    className,
    icon,
    type = 'button',
    ...buttonProps
  } = props;

  return (
    <button
      // https://github.com/jsx-eslint/eslint-plugin-react/issues/1846
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={className}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...buttonProps}
    >
      {text}
      {icon && <i className={icon} />}
    </button>
  );
}

export default Button;
