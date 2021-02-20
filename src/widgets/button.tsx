import React from 'react';
import type { ComponentProps, FC } from 'react';

interface ButtonProps extends ComponentProps<'button'> {}

const Button: FC<ButtonProps> = ({ children, ...props }) => (
  <button {...props}>
    {children}
  </button>
);

export default Button;
