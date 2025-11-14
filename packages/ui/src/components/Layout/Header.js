import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { forwardRef } from 'react';
const Header = forwardRef(
  ({ logo, nav, actions, sticky = false, className = '', children, ...props }, ref) => {
    const baseStyles = 'w-full bg-white border-b border-gray-200 transition-shadow z-40';
    const stickyStyles = sticky ? 'sticky top-0' : '';
    return _jsx('header', {
      ref: ref,
      className: `${baseStyles} ${stickyStyles} ${className}`,
      ...props,
      children: _jsx('div', {
        className: 'max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8',
        children: _jsxs('div', {
          className: 'flex items-center justify-between h-16',
          children: [
            logo && _jsx('div', { className: 'flex-shrink-0', children: logo }),
            nav &&
              _jsx('nav', {
                className: 'hidden md:flex items-center space-x-8 flex-1 px-8',
                children: nav,
              }),
            actions && _jsx('div', { className: 'flex items-center space-x-4', children: actions }),
            !logo && !nav && !actions && children,
          ],
        }),
      }),
    });
  }
);
Header.displayName = 'Header';
export default Header;
//# sourceMappingURL=Header.js.map
