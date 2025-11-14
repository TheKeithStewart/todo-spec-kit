import { forwardRef, useState, useEffect } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
} from 'date-fns';

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

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  ({ value, onChange, minDate, maxDate, label, error, disabled = false }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(value || new Date());

    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (ref && 'current' in ref && ref.current && !ref.current.contains(target)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, ref]);

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);
    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    const handleDateClick = (date: Date) => {
      if (disabled) return;
      if (minDate && date < minDate) return;
      if (maxDate && date > maxDate) return;
      onChange(date);
      setIsOpen(false);
    };

    const isDateDisabled = (date: Date) => {
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      return false;
    };

    return (
      <div ref={ref} className="relative">
        {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

        {/* Input Trigger */}
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-full px-3 py-2 text-left border rounded-lg transition-colors flex items-center justify-between ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400'}`}
        >
          <span className={value ? 'text-gray-900' : 'text-gray-400'}>
            {value ? format(value, 'MMM dd, yyyy') : 'Select date'}
          </span>
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

        {/* Calendar Dropdown */}
        {isOpen && (
          <div className="absolute z-50 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <span className="text-sm font-semibold">{format(currentMonth, 'MMMM yyyy')}</span>
              <button
                type="button"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day) => {
                const isSelected = value && isSameDay(day, value);
                const isCurrentMonth = isSameMonth(day, currentMonth);
                const isDisabled = isDateDisabled(day);

                return (
                  <button
                    key={day.toISOString()}
                    type="button"
                    onClick={() => handleDateClick(day)}
                    disabled={isDisabled}
                    className={`p-2 text-sm rounded transition-colors ${
                      !isCurrentMonth
                        ? 'text-gray-400'
                        : isSelected
                          ? 'bg-primary-600 text-white font-semibold'
                          : isDisabled
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {format(day, 'd')}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;
