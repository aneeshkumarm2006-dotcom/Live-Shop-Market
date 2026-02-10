import classnames from 'classnames';

/**
 * Avatar Component — LiveShopMarket Design System
 *
 * Circular avatar with image or initials fallback.
 * Used on: Brand profile page, creator cards, user menu.
 *
 * Figma specs:
 *   - Shape: circular (border-radius: 9999px)
 *   - Border: 2px solid white (when overlapping/on colored bg)
 *   - Sizes: sm (32px), md (48px), lg (96px), xl (128px)
 *   - Fallback: colored background with user's initials
 */

const sizeMap = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-24 h-24 text-2xl',
  xl: 'w-32 h-32 text-3xl',
  full: 'w-full h-full text-2xl', // fills parent container
};

// Deterministic color based on name string
const fallbackColors = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-green-500',
  'bg-orange-500',
  'bg-teal-500',
  'bg-indigo-500',
  'bg-rose-500',
];

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getColorIndex(name) {
  if (!name) return 0;
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % fallbackColors.length;
}

export default function Avatar({
  src,
  alt = '',
  name,
  size = 'md',
  className,
  border = false,
  onClick,
}) {
  const sizeClass = sizeMap[size] || sizeMap.md;
  const initials = getInitials(name || alt);
  const colorClass = fallbackColors[getColorIndex(name || alt)];

  const wrapperClasses = classnames(
    'relative inline-flex items-center justify-center shrink-0',
    'rounded-full overflow-hidden',
    sizeClass,
    border && 'ring-2 ring-white',
    onClick && 'cursor-pointer',
    className
  );

  const interactiveProps = onClick
    ? {
        role: 'button',
        tabIndex: 0,
        onKeyDown: (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick(e);
          }
        },
      }
    : {};

  if (src) {
    return (
      <div className={wrapperClasses} onClick={onClick} {...interactiveProps}>
        <img
          src={src}
          alt={alt || name || 'User avatar'}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  // Fallback: initials on colored background
  return (
    <div
      className={wrapperClasses}
      onClick={onClick}
      aria-label={name || 'User avatar'}
      {...interactiveProps}
    >
      <div
        className={classnames(
          'w-full h-full flex items-center justify-center',
          'font-semibold text-white',
          colorClass
        )}
      >
        {initials}
      </div>
    </div>
  );
}
