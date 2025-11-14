import { jsx as _jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
const Main = forwardRef(
  (
    { padding = 'md', maxWidth = 'full', centered = false, className = '', children, ...props },
    ref
  ) => {
    const baseStyles = 'flex-1 overflow-auto';
    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    }[padding];
    const maxWidthStyles = {
      none: '',
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
      '2xl': 'max-w-screen-2xl',
      full: 'max-w-full',
    }[maxWidth];
    const centeredStyles = centered ? 'mx-auto' : '';
    return _jsx('main', {
      ref: ref,
      className: `${baseStyles} ${paddingStyles} ${className}`,
      ...props,
      children: _jsx('div', {
        className: `${maxWidthStyles} ${centeredStyles}`,
        children: children,
      }),
    });
  }
);
Main.displayName = 'Main';
export default Main;
//# sourceMappingURL=Main.js.map
