import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { forwardRef } from 'react';
const Input = forwardRef(
  (
    {
      label,
      helperText,
      error,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className = '',
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const baseStyles =
      'block px-3 py-2 border rounded-lg text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed';
    const stateStyles = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500';
    const widthStyles = fullWidth ? 'w-full' : '';
    const paddingStyles = leftIcon ? 'pl-10' : rightIcon ? 'pr-10' : '';
    const inputClasses = [baseStyles, stateStyles, widthStyles, paddingStyles, className]
      .filter(Boolean)
      .join(' ');
    return _jsxs('div', {
      className: fullWidth ? 'w-full' : '',
      children: [
        label &&
          _jsx('label', {
            htmlFor: inputId,
            className: 'block text-sm font-medium text-gray-700 mb-1',
            children: label,
          }),
        _jsxs('div', {
          className: 'relative',
          children: [
            leftIcon &&
              _jsx('div', {
                className: 'absolute left-3 top-1/2 -translate-y-1/2 text-gray-400',
                children: leftIcon,
              }),
            _jsx('input', {
              ref: ref,
              id: inputId,
              className: inputClasses,
              disabled: disabled,
              'aria-invalid': !!error,
              'aria-describedby': error
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-helper`
                  : undefined,
              ...props,
            }),
            rightIcon &&
              _jsx('div', {
                className: 'absolute right-3 top-1/2 -translate-y-1/2 text-gray-400',
                children: rightIcon,
              }),
          ],
        }),
        error &&
          _jsx('p', {
            id: `${inputId}-error`,
            className: 'mt-1 text-sm text-red-600',
            children: error,
          }),
        !error &&
          helperText &&
          _jsx('p', {
            id: `${inputId}-helper`,
            className: 'mt-1 text-sm text-gray-500',
            children: helperText,
          }),
      ],
    });
  }
);
Input.displayName = 'Input';
export default Input;
//# sourceMappingURL=Input.js.map
