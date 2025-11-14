export interface DatePickerProps {
  /** Selected date */
  value?: Date;
  /** Callback when date changes */
  onChange: (date: Date) => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Disabled state */
  disabled?: boolean;
}
declare const DatePicker: import('react').ForwardRefExoticComponent<
  DatePickerProps & import('react').RefAttributes<HTMLDivElement>
>;
export default DatePicker;
//# sourceMappingURL=DatePicker.d.ts.map
