// ComponentPropsWithoutRef xxtracts the type of props for a given component (type)
// excluding any potential ref that the component accepts
import type { ComponentPropsWithoutRef } from 'react';

export interface TextInputProps extends ComponentPropsWithoutRef<'input'> {
  className?: string,
}
