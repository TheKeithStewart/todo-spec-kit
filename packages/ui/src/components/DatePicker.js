import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
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
const DatePicker = forwardRef(
  ({ value, onChange, minDate, maxDate, label, error, disabled = false }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(value || new Date());
    useEffect(() => {
      if (!isOpen) return;
      const handleClickOutside = (e) => {
        const target = e.target;
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
    const handleDateClick = (date) => {
      if (disabled) return;
      if (minDate && date < minDate) return;
      if (maxDate && date > maxDate) return;
      onChange(date);
      setIsOpen(false);
    };
    const isDateDisabled = (date) => {
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      return false;
    };
    return _jsxs('div', {
      ref: ref,
      className: 'relative',
      children: [
        label &&
          _jsx('label', {
            className: 'block text-sm font-medium text-gray-700 mb-1',
            children: label,
          }),
        _jsxs('button', {
          type: 'button',
          onClick: () => !disabled && setIsOpen(!isOpen),
          disabled: disabled,
          className: `w-full px-3 py-2 text-left border rounded-lg transition-colors flex items-center justify-between ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400'}`,
          children: [
            _jsx('span', {
              className: value ? 'text-gray-900' : 'text-gray-400',
              children: value ? format(value, 'MMM dd, yyyy') : 'Select date',
            }),
            _jsx('svg', {
              className: 'w-5 h-5 text-gray-400',
              fill: 'none',
              viewBox: '0 0 24 24',
              stroke: 'currentColor',
              children: _jsx('path', {
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: 2,
                d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
              }),
            }),
          ],
        }),
        error && _jsx('p', { className: 'mt-1 text-sm text-red-600', children: error }),
        isOpen &&
          _jsxs('div', {
            className:
              'absolute z-50 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4',
            children: [
              _jsxs('div', {
                className: 'flex items-center justify-between mb-4',
                children: [
                  _jsx('button', {
                    type: 'button',
                    onClick: () => setCurrentMonth(subMonths(currentMonth, 1)),
                    className: 'p-1 hover:bg-gray-100 rounded transition-colors',
                    children: _jsx('svg', {
                      className: 'w-5 h-5',
                      fill: 'none',
                      viewBox: '0 0 24 24',
                      stroke: 'currentColor',
                      children: _jsx('path', {
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: 2,
                        d: 'M15 19l-7-7 7-7',
                      }),
                    }),
                  }),
                  _jsx('span', {
                    className: 'text-sm font-semibold',
                    children: format(currentMonth, 'MMMM yyyy'),
                  }),
                  _jsx('button', {
                    type: 'button',
                    onClick: () => setCurrentMonth(addMonths(currentMonth, 1)),
                    className: 'p-1 hover:bg-gray-100 rounded transition-colors',
                    children: _jsx('svg', {
                      className: 'w-5 h-5',
                      fill: 'none',
                      viewBox: '0 0 24 24',
                      stroke: 'currentColor',
                      children: _jsx('path', {
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: 2,
                        d: 'M9 5l7 7-7 7',
                      }),
                    }),
                  }),
                ],
              }),
              _jsx('div', {
                className: 'grid grid-cols-7 gap-1 mb-2',
                children: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) =>
                  _jsx(
                    'div',
                    {
                      className: 'text-center text-xs font-medium text-gray-500 py-1',
                      children: day,
                    },
                    day
                  )
                ),
              }),
              _jsx('div', {
                className: 'grid grid-cols-7 gap-1',
                children: days.map((day) => {
                  const isSelected = value && isSameDay(day, value);
                  const isCurrentMonth = isSameMonth(day, currentMonth);
                  const isDisabled = isDateDisabled(day);
                  return _jsx(
                    'button',
                    {
                      type: 'button',
                      onClick: () => handleDateClick(day),
                      disabled: isDisabled,
                      className: `p-2 text-sm rounded transition-colors ${
                        !isCurrentMonth
                          ? 'text-gray-400'
                          : isSelected
                            ? 'bg-primary-600 text-white font-semibold'
                            : isDisabled
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-gray-900 hover:bg-gray-100'
                      }`,
                      children: format(day, 'd'),
                    },
                    day.toISOString()
                  );
                }),
              }),
            ],
          }),
      ],
    });
  }
);
DatePicker.displayName = 'DatePicker';
export default DatePicker;
//# sourceMappingURL=DatePicker.js.map
