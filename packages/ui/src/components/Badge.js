import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { forwardRef } from 'react';
const Badge = forwardRef(
  (
    {
      variant = 'default',
      size = 'md',
      icon,
      onRemove,
      dot = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center gap-1 font-medium rounded-full transition-colors';
    const variantStyles = {
      default: 'bg-gray-100 text-gray-700',
      primary: 'bg-primary-100 text-primary-700',
      success: 'bg-green-100 text-green-700',
      warning: 'bg-yellow-100 text-yellow-700',
      error: 'bg-red-100 text-red-700',
      info: 'bg-blue-100 text-blue-700',
    }[variant];
    const sizeStyles = {
      sm: 'text-xs px-2 py-0.5',
      md: 'text-sm px-2.5 py-1',
      lg: 'text-base px-3 py-1.5',
    }[size];
    return _jsxs('span', {
      ref: ref,
      className: `${baseStyles} ${variantStyles} ${sizeStyles} ${className}`,
      ...props,
      children: [
        dot &&
          _jsx('span', {
            className: `w-2 h-2 rounded-full ${
              variant === 'default'
                ? 'bg-gray-500'
                : variant === 'primary'
                  ? 'bg-primary-600'
                  : variant === 'success'
                    ? 'bg-green-600'
                    : variant === 'warning'
                      ? 'bg-yellow-600'
                      : variant === 'error'
                        ? 'bg-red-600'
                        : 'bg-blue-600'
            }`,
          }),
        icon && _jsx('span', { className: 'flex-shrink-0', children: icon }),
        children,
        onRemove &&
          _jsx('button', {
            onClick: onRemove,
            className: 'flex-shrink-0 ml-1 hover:opacity-70 transition-opacity',
            'aria-label': 'Remove badge',
            children: _jsx('svg', {
              className: 'w-3 h-3',
              fill: 'none',
              viewBox: '0 0 24 24',
              stroke: 'currentColor',
              children: _jsx('path', {
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: 2,
                d: 'M6 18L18 6M6 6l12 12',
              }),
            }),
          }),
      ],
    });
  }
);
Badge.displayName = 'Badge';
export default Badge;
//# sourceMappingURL=Badge.js.map
