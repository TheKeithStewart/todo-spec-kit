import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { forwardRef, useState, useEffect, useRef } from 'react';
const Dropdown = forwardRef(
  (
    { trigger, options, onSelect, align = 'left', triggerClassName = '', className = '', ...props },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    // Close on outside click
    useEffect(() => {
      if (!isOpen) return;
      const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);
    // Close on escape
    useEffect(() => {
      if (!isOpen) return;
      const handleEscape = (e) => {
        if (e.key === 'Escape') setIsOpen(false);
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen]);
    const handleSelect = (value) => {
      onSelect(value);
      setIsOpen(false);
    };
    const alignStyles = align === 'right' ? 'right-0' : 'left-0';
    return _jsxs('div', {
      ref: dropdownRef,
      className: `relative inline-block ${className}`,
      ...props,
      children: [
        _jsx('button', {
          onClick: () => setIsOpen(!isOpen),
          className: triggerClassName || 'inline-flex items-center justify-center',
          'aria-haspopup': 'true',
          'aria-expanded': isOpen,
          children: trigger,
        }),
        isOpen &&
          _jsx('div', {
            ref: ref,
            className: `absolute ${alignStyles} mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50`,
            role: 'menu',
            children: options.map((option) =>
              _jsxs(
                'button',
                {
                  onClick: () => !option.disabled && handleSelect(option.value),
                  disabled: option.disabled,
                  className: `w-full flex items-center px-4 py-2 text-sm text-left transition-colors ${
                    option.disabled
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`,
                  role: 'menuitem',
                  children: [
                    option.icon && _jsx('span', { className: 'mr-3', children: option.icon }),
                    option.label,
                  ],
                },
                option.value
              )
            ),
          }),
      ],
    });
  }
);
Dropdown.displayName = 'Dropdown';
export default Dropdown;
//# sourceMappingURL=Dropdown.js.map
