import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from 'react/jsx-runtime';
import { forwardRef } from 'react';
const Button = forwardRef(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    const variantStyles = {
      primary:
        'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 active:bg-primary-800',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 active:bg-gray-800',
      outline:
        'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 active:bg-primary-100',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500 active:bg-gray-200',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800',
    };
    const sizeStyles = {
      sm: 'text-sm px-3 py-1.5 gap-1.5',
      md: 'text-base px-4 py-2 gap-2',
      lg: 'text-lg px-6 py-3 gap-2.5',
    };
    const widthStyles = fullWidth ? 'w-full' : '';
    const classes = [baseStyles, variantStyles[variant], sizeStyles[size], widthStyles, className]
      .filter(Boolean)
      .join(' ');
    return _jsx('button', {
      ref: ref,
      className: classes,
      disabled: disabled || loading,
      ...props,
      children: loading
        ? _jsxs(_Fragment, {
            children: [
              _jsxs('svg', {
                className: 'animate-spin h-5 w-5',
                xmlns: 'http://www.w3.org/2000/svg',
                fill: 'none',
                viewBox: '0 0 24 24',
                children: [
                  _jsx('circle', {
                    className: 'opacity-25',
                    cx: '12',
                    cy: '12',
                    r: '10',
                    stroke: 'currentColor',
                    strokeWidth: '4',
                  }),
                  _jsx('path', {
                    className: 'opacity-75',
                    fill: 'currentColor',
                    d: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z',
                  }),
                ],
              }),
              _jsx('span', { children: 'Loading...' }),
            ],
          })
        : _jsxs(_Fragment, {
            children: [
              leftIcon && _jsx('span', { children: leftIcon }),
              children,
              rightIcon && _jsx('span', { children: rightIcon }),
            ],
          }),
    });
  }
);
Button.displayName = 'Button';
export default Button;
//# sourceMappingURL=Button.js.map
