import { SelectHTMLAttributes } from 'react';
export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Label text */
  label?: string;
  /** Select options */
  options: SelectOption[];
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Full width select */
  fullWidth?: boolean;
  /** Placeholder text */
  placeholder?: string;
}
declare const Select: import('react').ForwardRefExoticComponent<
  SelectProps & import('react').RefAttributes<HTMLSelectElement>
>;
export default Select;
//# sourceMappingURL=Select.d.ts.map
