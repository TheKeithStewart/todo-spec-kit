import { HTMLAttributes, forwardRef, ReactNode, useState, useEffect, useRef } from 'react';

export interface DropdownOption {
  label: string;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface DropdownProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Trigger button content */
  trigger: ReactNode;
  /** Dropdown options */
  options: DropdownOption[];
  /** Callback when option is selected */
  onSelect: (value: string) => void;
  /** Dropdown alignment */
  align?: 'left' | 'right';
  /** Custom trigger className */
  triggerClassName?: string;
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    { trigger, options, onSelect, align = 'left', triggerClassName = '', className = '', ...props },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Close on escape
    useEffect(() => {
      if (!isOpen) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false);
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    const handleSelect = (value: string) => {
      onSelect(value);
      setIsOpen(false);
    };

    const alignStyles = align === 'right' ? 'right-0' : 'left-0';

    return (
      <div ref={dropdownRef} className={`relative inline-block ${className}`} {...props}>
        {/* Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={triggerClassName || 'inline-flex items-center justify-center'}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          {trigger}
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            ref={ref}
            className={`absolute ${alignStyles} mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50`}
            role="menu"
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => !option.disabled && handleSelect(option.value)}
                disabled={option.disabled}
                className={`w-full flex items-center px-4 py-2 text-sm text-left transition-colors ${
                  option.disabled
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                role="menuitem"
              >
                {option.icon && <span className="mr-3">{option.icon}</span>}
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;
