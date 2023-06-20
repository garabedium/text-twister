// Extracts prop types for a given component
// excludes any potential ref that the component accepts
import type { ComponentPropsWithoutRef } from 'react';

export interface TextInputProps extends ComponentPropsWithoutRef<'input'> {
  className?: string
}
