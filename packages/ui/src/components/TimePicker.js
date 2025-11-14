import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { forwardRef, useState, useEffect } from 'react';
const TimePicker = forwardRef(
  ({ value, onChange, label, error, disabled = false, use12Hour = false, interval = 30 }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
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
    // Generate time options based on interval
    const generateTimeOptions = () => {
      const options = [];
      for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += interval) {
          const timeStr = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
          options.push(timeStr);
        }
      }
      return options;
    };
    const formatDisplayTime = (time) => {
      if (!time) return 'Select time';
      if (!use12Hour) return time;
      const [hours, minutes] = time.split(':').map(Number);
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`;
    };
    const handleTimeClick = (time) => {
      if (disabled) return;
      onChange(time);
      setIsOpen(false);
    };
    const timeOptions = generateTimeOptions();
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
              children: formatDisplayTime(value || ''),
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
                d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
              }),
            }),
          ],
        }),
        error && _jsx('p', { className: 'mt-1 text-sm text-red-600', children: error }),
        isOpen &&
          _jsx('div', {
            className:
              'absolute z-50 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 w-full max-h-60 overflow-y-auto',
            children: timeOptions.map((time) => {
              const isSelected = value === time;
              return _jsx(
                'button',
                {
                  type: 'button',
                  onClick: () => handleTimeClick(time),
                  className: `w-full px-4 py-2 text-left text-sm transition-colors ${
                    isSelected
                      ? 'bg-primary-600 text-white font-semibold'
                      : 'text-gray-900 hover:bg-gray-100'
                  }`,
                  children: formatDisplayTime(time),
                },
                time
              );
            }),
          }),
      ],
    });
  }
);
TimePicker.displayName = 'TimePicker';
export default TimePicker;
//# sourceMappingURL=TimePicker.js.map
