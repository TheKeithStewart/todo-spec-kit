import { InputHTMLAttributes } from 'react';
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label text */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Indeterminate state */
  indeterminate?: boolean;
}
declare const Checkbox: import('react').ForwardRefExoticComponent<
  CheckboxProps & import('react').RefAttributes<HTMLInputElement>
>;
export default Checkbox;
//# sourceMappingURL=Checkbox.d.ts.map
