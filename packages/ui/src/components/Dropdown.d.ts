import { HTMLAttributes, ReactNode } from 'react';
export interface DropdownOption {
  label: string;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
}
export interface DropdownProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Trigger button content */
  trigger: ReactNode;
  /** Dropdown options */
  options: DropdownOption[];
  /** Callback when option is selected */
  onSelect: (value: string) => void;
  /** Dropdown alignment */
  align?: 'left' | 'right';
  /** Custom trigger className */
  triggerClassName?: string;
}
declare const Dropdown: import('react').ForwardRefExoticComponent<
  DropdownProps & import('react').RefAttributes<HTMLDivElement>
>;
export default Dropdown;
//# sourceMappingURL=Dropdown.d.ts.map
