export interface TimePickerProps {
  /** Selected time in HH:MM format (24-hour) */
  value?: string;
  /** Callback when time changes */
  onChange: (time: string) => void;
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Use 12-hour format */
  use12Hour?: boolean;
  /** Time interval in minutes */
  interval?: 15 | 30 | 60;
}
declare const TimePicker: import('react').ForwardRefExoticComponent<
  TimePickerProps & import('react').RefAttributes<HTMLDivElement>
>;
export default TimePicker;
//# sourceMappingURL=TimePicker.d.ts.map
