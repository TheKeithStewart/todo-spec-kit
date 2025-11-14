import React, { InputHTMLAttributes } from 'react';
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label text */
  label?: string;
  /** Helper text below input */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Full width input */
  fullWidth?: boolean;
  /** Icon to display before input */
  leftIcon?: React.ReactNode;
  /** Icon to display after input */
  rightIcon?: React.ReactNode;
}
declare const Input: React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<HTMLInputElement>
>;
export default Input;
//# sourceMappingURL=Input.d.ts.map
