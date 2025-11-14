import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { forwardRef, useEffect } from 'react';
const Modal = forwardRef(
  (
    {
      open,
      onClose,
      title,
      size = 'md',
      showCloseButton = true,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      footer,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    // Handle escape key
    useEffect(() => {
      if (!open || !closeOnEscape) return;
      const handleEscape = (e) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [open, closeOnEscape, onClose]);
    // Prevent body scroll when modal is open
    useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return () => {
        document.body.style.overflow = '';
      };
    }, [open]);
    if (!open) return null;
    const sizeStyles = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      full: 'max-w-full mx-4',
    }[size];
    return _jsxs('div', {
      className: 'fixed inset-0 z-50 flex items-center justify-center',
      children: [
        _jsx('div', {
          className: 'absolute inset-0 bg-black bg-opacity-50 transition-opacity',
          onClick: closeOnBackdropClick ? onClose : undefined,
          'aria-hidden': 'true',
        }),
        _jsxs('div', {
          ref: ref,
          className: `relative bg-white rounded-lg shadow-xl ${sizeStyles} w-full m-4 max-h-[90vh] flex flex-col ${className}`,
          role: 'dialog',
          'aria-modal': 'true',
          'aria-labelledby': title ? 'modal-title' : undefined,
          ...props,
          children: [
            (title || showCloseButton) &&
              _jsxs('div', {
                className: 'flex items-center justify-between p-6 border-b border-gray-200',
                children: [
                  title &&
                    _jsx('h2', {
                      id: 'modal-title',
                      className: 'text-xl font-semibold text-gray-900',
                      children: title,
                    }),
                  showCloseButton &&
                    _jsx('button', {
                      onClick: onClose,
                      className: 'text-gray-400 hover:text-gray-600 transition-colors',
                      'aria-label': 'Close modal',
                      children: _jsx('svg', {
                        xmlns: 'http://www.w3.org/2000/svg',
                        fill: 'none',
                        viewBox: '0 0 24 24',
                        strokeWidth: 2,
                        stroke: 'currentColor',
                        className: 'w-6 h-6',
                        children: _jsx('path', {
                          strokeLinecap: 'round',
                          strokeLinejoin: 'round',
                          d: 'M6 18L18 6M6 6l12 12',
                        }),
                      }),
                    }),
                ],
              }),
            _jsx('div', { className: 'flex-1 overflow-y-auto p-6', children: children }),
            footer &&
              _jsx('div', {
                className: 'flex items-center justify-end gap-3 p-6 border-t border-gray-200',
                children: footer,
              }),
          ],
        }),
      ],
    });
  }
);
Modal.displayName = 'Modal';
export default Modal;
//# sourceMappingURL=Modal.js.map
