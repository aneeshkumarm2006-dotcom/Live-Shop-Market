import classnames from 'classnames';
import { motion } from 'framer-motion';
import PlatformIcon from './PlatformIcon';

/**
 * Badge Component — LiveShopMarket Design System
 *
 * Types:
 *   - live:      Red LIVE badge with pulse animation (on stream cards)
 *   - category:  Small colored category label
 *   - platform:  Platform icon badge (Instagram, TikTok, YouTube, QVC)
 *   - status:    Generic status badge (success, warning, info)
 *
 * Figma specs (LIVE badge):
 *   - Background: #FF0000 (90% opacity)
 *   - Text: white, 12px, bold, uppercase
 *   - Padding: 4px 12px
 *   - Border-radius: 9999px (pill)
 *   - Shadow: 0 2px 8px rgba(255,0,0,0.3)
 *   - Pulsing dot animation
 */

const typeStyles = {
  live: [
    'bg-live-red text-white',
    'text-xs font-bold uppercase tracking-wider',
    'px-3 py-1',
    'rounded-[var(--radius-badge)]',
    'shadow-[var(--shadow-live-badge)]',
    'inline-flex items-center gap-1.5',
  ].join(' '),

  category: [
    'text-xs font-medium',
    'px-2.5 py-0.5',
    'rounded-[var(--radius-badge)]',
    'inline-flex items-center',
  ].join(' '),

  platform: [
    'inline-flex items-center gap-1.5',
    'px-3 py-1.5',
    'rounded-[var(--radius-tag)]',
    'text-xs font-medium',
    'border border-border-light',
    'bg-bg-white',
    'hover:shadow-[var(--shadow-sm)] hover:-translate-y-px',
    'transition-all duration-200',
  ].join(' '),

  status: [
    'text-xs font-medium',
    'px-2.5 py-0.5',
    'rounded-[var(--radius-badge)]',
    'inline-flex items-center',
  ].join(' '),
};

// Category-specific color schemes
const categoryColorMap = {
  'Tech & Gadgets': 'bg-blue-100 text-blue-700',
  Fashion: 'bg-purple-100 text-purple-700',
  'Beauty & Personal Care': 'bg-pink-100 text-pink-700',
  Wellness: 'bg-green-100 text-green-700',
  'Sports & Fitness': 'bg-orange-100 text-orange-700',
  'Home & Living': 'bg-amber-100 text-amber-700',
  'Food & Cooking': 'bg-red-100 text-red-700',
  'Kids & Family': 'bg-rose-100 text-rose-700',
  'Pets & Animals': 'bg-teal-100 text-teal-700',
};

// Status color schemes
const statusColorMap = {
  success: 'bg-green-100 text-green-700',
  warning: 'bg-amber-100 text-amber-700',
  error: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
};

export default function Badge({
  type = 'category',
  text,
  platform,
  category,
  status,
  isLive = false,
  size = 'md',
  className,
  onClick,
}) {
  // LIVE badge
  if (type === 'live' || isLive) {
    return (
      <motion.span
        className={classnames(typeStyles.live, 'badge-live-glow', className)}
        role="status"
        aria-label="Currently live"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Pulsing dot */}
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
        {text || 'LIVE'}
      </motion.span>
    );
  }

  // Platform badge — "Watch on Instagram", "Watch on TikTok", etc.
  if (type === 'platform' && platform) {
    return (
      <span
        className={classnames(typeStyles.platform, 'cursor-pointer', className)}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
      >
        <span className="text-xs text-text-secondary">Watch on</span>
        <PlatformIcon platform={platform} size={16} />
      </span>
    );
  }

  // Category badge
  if (type === 'category') {
    const colorClass =
      categoryColorMap[category || text] || 'bg-gray-100 text-gray-700';

    return (
      <span
        className={classnames(
          typeStyles.category,
          colorClass,
          size === 'sm' && 'text-[10px] px-2 py-px',
          className
        )}
      >
        {text || category}
      </span>
    );
  }

  // Status badge
  if (type === 'status') {
    const colorClass = statusColorMap[status] || 'bg-gray-100 text-gray-700';

    return (
      <span className={classnames(typeStyles.status, colorClass, className)}>
        {text}
      </span>
    );
  }

  // Fallback generic badge
  return (
    <span
      className={classnames(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700',
        className
      )}
    >
      {text}
    </span>
  );
}
