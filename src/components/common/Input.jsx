import { forwardRef, useState } from 'react';
import classnames from 'classnames';
import { HiEye, HiEyeOff } from 'react-icons/hi';

/**
 * Input Component — LiveShopMarket Design System
 *
 * Pill-shaped inputs matching the sign-up form design.
 * Supports text, email, password (with show/hide toggle), tel, and select.
 *
 * States: default, focus, error, disabled
 *
 * Figma specs:
 *   - Height: 48px
 *   - Border-radius: 24px (pill)
 *   - Border: 1px solid #D1D5DB
 *   - Focus border: #4364F7 with ring shadow
 *   - Font size: 16px
 *   - Padding: 12px 16px (right padded more for password toggle)
 */

const Input = forwardRef(function Input(
  {
    type = 'text',
    placeholder,
    value,
    onChange,
    onBlur,
    onFocus,
    error,
    disabled = false,
    label,
    name,
    id,
    className,
    wrapperClassName,
    required = false,
    autoComplete,
    ...rest
  },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  const inputId = id || name;

  const inputClasses = classnames(
    // Base
    'w-full h-12',
    'bg-bg-input',
    'border border-border-input',
    'rounded-[var(--radius-input)]',
    'text-base text-text-primary',
    'font-[var(--font-primary)]',
    'transition-all duration-150 ease-in-out',
    'outline-none',
    // Padding — extra right padding for password toggle
    isPassword ? 'pl-4 pr-12' : 'px-4',
    // Placeholder
    'placeholder:text-text-light',
    // Focus
    'focus:border-border-focus focus:shadow-[var(--shadow-input-focus)]',
    // Error
    error && 'border-error! focus:border-error! focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]!',
    // Disabled
    disabled && 'opacity-50 cursor-not-allowed bg-gray-50',
    // User overrides
    className
  );

  return (
    <div className={classnames('flex flex-col gap-1.5', wrapperClassName)}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-text-primary"
        >
          {label}
          {required && <span className="text-error ml-0.5">*</span>}
        </label>
      )}

      {/* Input Wrapper */}
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          className={inputClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...rest}
        />

        {/* Password Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className={classnames(
              'absolute right-3 top-1/2 -translate-y-1/2',
              'p-1 rounded-full',
              'text-text-light hover:text-text-secondary',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-primary/20'
            )}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <HiEyeOff className="w-5 h-5" />
            ) : (
              <HiEye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p
          id={`${inputId}-error`}
          className="text-xs text-error mt-0.5 pl-1"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
