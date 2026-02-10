import { forwardRef } from 'react';
import classnames from 'classnames';

/**
 * Card Component — LiveShopMarket Design System
 *
 * A flexible card wrapper used for:
 *   - Creator / Brand cards (homepage grid, category pages)
 *   - Category cards (All Categories 3×3 grid)
 *   - Stream cards (previous/upcoming streams)
 *
 * Figma specs:
 *   - Background: #FFFFFF
 *   - Border-radius: 16px (default), 12px (compact)
 *   - Shadow: 0 2px 8px rgba(0,0,0,0.08)
 *   - Hover shadow: 0 8px 24px rgba(0,0,0,0.12) + translateY(-4px)
 *   - Overflow: hidden (for banner images to clip at corners)
 *
 * Variants:
 *   - default:  Standard card with shadow and hover lift
 *   - flat:     No shadow, border only (for inline items)
 *   - elevated: Stronger initial shadow
 */

const variantClasses = {
  default: [
    'bg-bg-card',
    'rounded-[var(--radius-card)]',
    'shadow-[var(--shadow-card)]',
    'overflow-hidden',
  ].join(' '),

  flat: [
    'bg-bg-card',
    'rounded-[var(--radius-card-sm)]',
    'border border-border-light',
    'overflow-hidden',
  ].join(' '),

  elevated: [
    'bg-bg-card',
    'rounded-[var(--radius-card)]',
    'shadow-[var(--shadow-md)]',
    'overflow-hidden',
  ].join(' '),
};

const Card = forwardRef(function Card(
  {
    variant = 'default',
    hover = true,
    onClick,
    children,
    className,
    padding,
    as: Component = 'div',
    ...rest
  },
  ref
) {
  const isClickable = !!onClick;

  const classes = classnames(
    // Variant styles
    variantClasses[variant],
    // Hover effect
    hover && [
      'transition-all duration-300 ease-out',
      'hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]',
    ],
    // Clickable
    isClickable && 'cursor-pointer',
    // Padding
    padding === 'sm' && 'p-3',
    padding === 'md' && 'p-4',
    padding === 'lg' && 'p-5',
    padding === 'xl' && 'p-6',
    // User overrides
    className
  );

  return (
    <Component
      ref={ref}
      className={classes}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick(e);
              }
            }
          : undefined
      }
      {...rest}
    >
      {children}
    </Component>
  );
});

export default Card;
