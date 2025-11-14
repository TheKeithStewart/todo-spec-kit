import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { forwardRef } from 'react';
const Select = forwardRef(
  (
    {
      label,
      options,
      helperText,
      error,
      fullWidth = false,
      placeholder,
      className = '',
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const baseStyles =
      'block px-3 py-2 pr-10 border rounded-lg text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed appearance-none bg-white';
    const stateStyles = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500';
    const widthStyles = fullWidth ? 'w-full' : '';
    const selectClasses = [baseStyles, stateStyles, widthStyles, className]
      .filter(Boolean)
      .join(' ');
    return _jsxs('div', {
      className: fullWidth ? 'w-full' : '',
      children: [
        label &&
          _jsx('label', {
            htmlFor: selectId,
            className: 'block text-sm font-medium text-gray-700 mb-1',
            children: label,
          }),
        _jsxs('div', {
          className: 'relative',
          children: [
            _jsxs('select', {
              ref: ref,
              id: selectId,
              className: selectClasses,
              disabled: disabled,
              'aria-invalid': !!error,
              'aria-describedby': error
                ? `${selectId}-error`
                : helperText
                  ? `${selectId}-helper`
                  : undefined,
              ...props,
              children: [
                placeholder && _jsx('option', { value: '', disabled: true, children: placeholder }),
                options.map((option) =>
                  _jsx(
                    'option',
                    { value: option.value, disabled: option.disabled, children: option.label },
                    option.value
                  )
                ),
              ],
            }),
            _jsx('div', {
              className: 'absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none',
              children: _jsx('svg', {
                className: 'w-5 h-5 text-gray-400',
                fill: 'none',
                viewBox: '0 0 24 24',
                stroke: 'currentColor',
                children: _jsx('path', {
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeWidth: 2,
                  d: 'M19 9l-7 7-7-7',
                }),
              }),
            }),
          ],
        }),
        error &&
          _jsx('p', {
            id: `${selectId}-error`,
            className: 'mt-1 text-sm text-red-600',
            children: error,
          }),
        !error &&
          helperText &&
          _jsx('p', {
            id: `${selectId}-helper`,
            className: 'mt-1 text-sm text-gray-500',
            children: helperText,
          }),
      ],
    });
  }
);
Select.displayName = 'Select';
export default Select;
//# sourceMappingURL=Select.js.map
