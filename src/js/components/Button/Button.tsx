import React, { ButtonHTMLAttributes } from 'react';

import './Button.scss';

type ButtonProps = {
  className?: string, 
  text?: string, 
  icon?: string
}

function Button(props: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  
  const {
    text,
    className,
    icon,
    type = 'button',
    ...moreProps
  } = props;

  return (
    <button
      className={className}
      {...moreProps}
    >
      {text}
      {icon && <i className={icon} />}
    </button>
  );
}

export default Button;
