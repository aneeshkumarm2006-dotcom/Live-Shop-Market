import { forwardRef } from 'react';
import classnames from 'classnames';

/**
 * Button Component — LiveShopMarket Design System
 *
 * Variants:
 *   - primary:   Lime/chartreuse CTA (Sign Up, Create My Account, Sign Up for Free)
 *   - secondary: Outlined with border (Browse Live Brands, Remind Me)
 *   - ghost:     Text-only, no background
 *   - dark:      Dark bg with light text
 *
 * Sizes:
 *   - sm:  32px height — small tags, compact actions
 *   - md:  40px height — nav buttons, inline actions
 *   - lg:  48px height — primary CTAs, form submit
 *   - xl:  56px height — hero CTA
 */

const sizeClasses = {
  sm: 'h-8 px-4 text-xs font-semibold',
  md: 'h-10 px-5 text-sm font-semibold',
  lg: 'h-12 px-6 text-sm font-semibold',
  xl: 'h-14 px-8 text-base font-bold',
};

const variantClasses = {
  primary: [
    'bg-accent text-accent-text',
    'hover:bg-accent-hover hover:shadow-[var(--shadow-button-hover)]',
    'hover:-translate-y-0.5 hover:brightness-105',
    'active:translate-y-0 active:shadow-[var(--shadow-button)]',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[var(--shadow-button)] disabled:hover:brightness-100',
    'shadow-[var(--shadow-button)]',
  ].join(' '),

  secondary: [
    'bg-transparent border border-border-light text-text-primary',
    'hover:border-primary hover:text-primary hover:bg-primary-50',
    'hover:-translate-y-0.5 hover:shadow-[var(--shadow-sm)]',
    'active:translate-y-0',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:border-border-light disabled:hover:text-text-primary disabled:hover:bg-transparent disabled:hover:shadow-none',
  ].join(' '),

  ghost: [
    'bg-transparent text-text-primary',
    'hover:bg-gray-100 hover:text-primary hover:scale-105',
    'active:bg-gray-200 active:scale-100',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:scale-100',
  ].join(' '),

  dark: [
    'bg-bg-dark text-text-inverse',
    'hover:bg-gray-800 hover:shadow-[var(--shadow-button-hover)]',
    'hover:-translate-y-0.5 hover:brightness-110',
    'active:translate-y-0',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:brightness-100',
  ].join(' '),
};

const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'lg',
    disabled = false,
    type = 'button',
    onClick,
    children,
    className,
    icon,
    iconPosition = 'left',
    fullWidth = false,
    as: Component = 'button',
    ...rest
  },
  ref
) {
  const classes = classnames(
    // Base styles
    'inline-flex items-center justify-center gap-2',
    'rounded-[var(--radius-button)]',
    'font-[var(--font-heading)]',
    'transition-all duration-200 ease-in-out',
    'cursor-pointer select-none',
    'whitespace-nowrap',
    // Size
    sizeClasses[size],
    // Variant
    variantClasses[variant],
    // Full width
    fullWidth && 'w-full',
    // User overrides
    className
  );

  return (
    <Component
      ref={ref}
      type={Component === 'button' ? type : undefined}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      {...rest}
    >
      {icon && iconPosition === 'left' && (
        <span className="inline-flex shrink-0">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="inline-flex shrink-0">{icon}</span>
      )}
    </Component>
  );
});

export default Button;
