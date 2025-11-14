import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { forwardRef } from 'react';
const Checkbox = forwardRef(
  (
    { label, helperText, error, indeterminate = false, className = '', id, disabled, ...props },
    ref
  ) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const baseStyles =
      'w-4 h-4 border-2 rounded transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500';
    const stateStyles = error ? 'border-red-500 text-red-600' : 'border-gray-300 text-primary-600';
    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';
    return _jsxs('div', {
      className: className,
      children: [
        _jsxs('div', {
          className: 'flex items-start',
          children: [
            _jsx('input', {
              ref: ref,
              type: 'checkbox',
              id: checkboxId,
              className: `${baseStyles} ${stateStyles} ${disabledStyles}`,
              disabled: disabled,
              'aria-invalid': !!error,
              'aria-describedby': error
                ? `${checkboxId}-error`
                : helperText
                  ? `${checkboxId}-helper`
                  : undefined,
              ...props,
              ...(indeterminate && { 'data-indeterminate': true }),
            }),
            label &&
              _jsx('label', {
                htmlFor: checkboxId,
                className: `ml-2 text-sm text-gray-700 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`,
                children: label,
              }),
          ],
        }),
        error &&
          _jsx('p', {
            id: `${checkboxId}-error`,
            className: 'mt-1 ml-6 text-sm text-red-600',
            children: error,
          }),
        !error &&
          helperText &&
          _jsx('p', {
            id: `${checkboxId}-helper`,
            className: 'mt-1 ml-6 text-sm text-gray-500',
            children: helperText,
          }),
      ],
    });
  }
);
Checkbox.displayName = 'Checkbox';
export default Checkbox;
//# sourceMappingURL=Checkbox.js.map
