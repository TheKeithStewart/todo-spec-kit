import { jsx as _jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
const Card = forwardRef(
  (
    {
      variant = 'default',
      padding = 'md',
      interactive = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'rounded-lg transition-all';
    const variantStyles = {
      default: 'bg-white',
      outlined: 'bg-white border border-gray-200',
      elevated: 'bg-white shadow-md',
    };
    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };
    const interactiveStyles = interactive
      ? 'cursor-pointer hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
      : '';
    const classes = [
      baseStyles,
      variantStyles[variant],
      paddingStyles[padding],
      interactiveStyles,
      className,
    ]
      .filter(Boolean)
      .join(' ');
    return _jsx('div', { ref: ref, className: classes, ...props, children: children });
  }
);
Card.displayName = 'Card';
export default Card;
// Card sub-components for better composition
export const CardHeader = forwardRef(({ className = '', children, ...props }, ref) =>
  _jsx('div', { ref: ref, className: `mb-4 ${className}`, ...props, children: children })
);
CardHeader.displayName = 'CardHeader';
export const CardTitle = forwardRef(({ className = '', children, ...props }, ref) =>
  _jsx('h3', {
    ref: ref,
    className: `text-xl font-semibold text-gray-900 ${className}`,
    ...props,
    children: children,
  })
);
CardTitle.displayName = 'CardTitle';
export const CardDescription = forwardRef(({ className = '', children, ...props }, ref) =>
  _jsx('p', {
    ref: ref,
    className: `text-sm text-gray-500 mt-1 ${className}`,
    ...props,
    children: children,
  })
);
CardDescription.displayName = 'CardDescription';
export const CardContent = forwardRef(({ className = '', children, ...props }, ref) =>
  _jsx('div', { ref: ref, className: className, ...props, children: children })
);
CardContent.displayName = 'CardContent';
export const CardFooter = forwardRef(({ className = '', children, ...props }, ref) =>
  _jsx('div', {
    ref: ref,
    className: `mt-4 flex items-center gap-2 ${className}`,
    ...props,
    children: children,
  })
);
CardFooter.displayName = 'CardFooter';
//# sourceMappingURL=Card.js.map
