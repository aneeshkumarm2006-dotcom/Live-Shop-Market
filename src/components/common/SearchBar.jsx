import { useState, useRef } from 'react';
import classnames from 'classnames';
import { HiSearch, HiX } from 'react-icons/hi';

/**
 * SearchBar Component — LiveShopMarket Design System
 *
 * Pill-shaped search input with magnifying glass icon.
 * Used in: Homepage hero section, Single Category page header.
 *
 * Figma specs:
 *   - Height: 44px (category page), 48px (hero)
 *   - Border-radius: 9999px (pill)
 *   - Background: white
 *   - Border: 1px solid #E5E7EB
 *   - Icon: search magnifier, left-positioned
 *   - Padding-left: ~44px (for icon), padding-right: 16px
 *   - Font size: 14px
 *   - Focus: blue border + ring shadow
 *
 * Variants:
 *   - default:  Light border, white bg (category pages)
 *   - hero:     Slightly larger, white bg (homepage hero)
 */

const sizeClasses = {
  sm: 'h-10 text-sm pl-10 pr-8',
  md: 'h-11 text-sm pl-11 pr-8',
  lg: 'h-12 text-base pl-12 pr-9',
};

const iconSizeClasses = {
  sm: 'left-3 w-4 h-4',
  md: 'left-3.5 w-4 h-4',
  lg: 'left-4 w-5 h-5',
};

export default function SearchBar({
  placeholder = 'What are you watching today?',
  value: controlledValue,
  onChange,
  onSearch,
  onClear,
  size = 'md',
  variant = 'default',
  className,
  autoFocus = false,
}) {
  const [internalValue, setInternalValue] = useState('');
  const inputRef = useRef(null);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleChange = (e) => {
    const val = e.target.value;
    if (!isControlled) setInternalValue(val);
    onChange?.(val);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch?.(currentValue);
    }
    if (e.key === 'Escape' && currentValue) {
      e.preventDefault();
      handleClear();
    }
  };

  const handleSearchClick = () => {
    onSearch?.(currentValue);
    inputRef.current?.focus();
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue('');
    onChange?.('');
    onClear?.();
    inputRef.current?.focus();
  };

  const inputClasses = classnames(
    'w-full',
    'bg-bg-white',
    'rounded-[var(--radius-search)]',
    'border',
    'text-text-primary',
    'font-[var(--font-primary)]',
    'placeholder:text-text-light',
    'outline-none',
    'transition-all duration-200 ease-in-out',
    // Focus state
    'focus:border-border-focus focus:shadow-[var(--shadow-input-focus)]',
    'focus:ring-2 focus:ring-primary/10',
    // Size
    sizeClasses[size],
    // Variant
    variant === 'default' && 'border-border-light',
    variant === 'hero' && 'border-white/30 shadow-[var(--shadow-sm)]',
    // User overrides
    className
  );

  return (
    <div role="search" className="relative w-full search-focus-scale">
      {/* Search Icon */}
      <button
        type="button"
        onClick={handleSearchClick}
        className={classnames(
          'absolute top-1/2 -translate-y-1/2',
          'text-text-light hover:text-text-secondary',
          'transition-colors duration-150',
          'cursor-pointer p-0 bg-transparent border-none',
          iconSizeClasses[size]
        )}
        tabIndex={-1}
        aria-label="Search"
      >
        <HiSearch className="w-full h-full" />
      </button>

      {/* Input */}
      <input
        ref={inputRef}
        type="search"
        value={currentValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={inputClasses}
        aria-label={placeholder}
      />

      {/* Clear button */}
      {currentValue && (
        <button
          type="button"
          onClick={handleClear}
          className={classnames(
            'absolute top-1/2 -translate-y-1/2 right-3',
            'text-text-light hover:text-text-secondary',
            'transition-colors duration-150',
            'cursor-pointer p-0 bg-transparent border-none',
            'w-4 h-4'
          )}
          tabIndex={0}
          aria-label="Clear search"
        >
          <HiX className="w-full h-full" />
        </button>
      )}
    </div>
  );
}
