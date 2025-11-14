import { InputHTMLAttributes, forwardRef } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label text */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Indeterminate state */
  indeterminate?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { label, helperText, error, indeterminate = false, className = '', id, disabled, ...props },
    ref
  ) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-');

    const baseStyles =
      'w-4 h-4 border-2 rounded transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500';

    const stateStyles = error ? 'border-red-500 text-red-600' : 'border-gray-300 text-primary-600';

    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

    return (
      <div className={className}>
        <div className="flex items-start">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={`${baseStyles} ${stateStyles} ${disabledStyles}`}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${checkboxId}-error` : helperText ? `${checkboxId}-helper` : undefined
            }
            {...props}
            {...(indeterminate && { 'data-indeterminate': true })}
          />
          {label && (
            <label
              htmlFor={checkboxId}
              className={`ml-2 text-sm text-gray-700 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {label}
            </label>
          )}
        </div>
        {error && (
          <p id={`${checkboxId}-error`} className="mt-1 ml-6 text-sm text-red-600">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${checkboxId}-helper`} className="mt-1 ml-6 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
