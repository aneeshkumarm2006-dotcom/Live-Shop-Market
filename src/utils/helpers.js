import { PLATFORMS, PLATFORM_COLORS, PLATFORM_LABELS } from './constants';

// ─── Number Formatting ───────────────────────────────────────────────

/**
 * Format a number with commas and optional "+" suffix.
 * e.g. 30000 → "30,000+"
 */
export function formatNumber(num) {
  if (num == null) return '0';
  return num.toLocaleString('en-US') + '+';
}

/**
 * Format a number compactly (e.g. 1200 → "1.2K").
 */
export function formatCompactNumber(num) {
  if (num == null) return '0';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  return String(num);
}

// ─── Date / Time Formatting ──────────────────────────────────────────

const MONTH_ABBR = [
  'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.',
  'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.',
];

const DAY_ABBR = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

/**
 * Format a date string to "Jan. 23, 2026, FRI".
 */
export function formatDate(dateStr) {
  const d = new Date(dateStr);
  const month = MONTH_ABBR[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();
  const weekday = DAY_ABBR[d.getDay()];
  return `${month} ${day}, ${year}, ${weekday}`;
}

/**
 * Format just the short date: "Jan. 23, 2026"
 */
export function formatShortDate(dateStr) {
  const d = new Date(dateStr);
  const month = MONTH_ABBR[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();
  return `${month} ${day}, ${year}`;
}

/**
 * Calculate a human-readable "time ago" string.
 * e.g. "Last Streamed 14h ago", "Last Streamed 2d ago"
 */
export function getTimeAgo(dateStr) {
  const now = new Date();
  const past = new Date(dateStr);
  const diffMs = now - past;

  const minutes = Math.floor(diffMs / 60_000);
  const hours = Math.floor(diffMs / 3_600_000);
  const days = Math.floor(diffMs / 86_400_000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 30) return `${days}d ago`;
  return formatShortDate(dateStr);
}

/**
 * Calculate time until a future stream.
 * e.g. "in 5 minutes", "in 2 hours", "Tomorrow at 11AM"
 */
export function getTimeUntilLive(dateStr, timeStr) {
  const streamDate = new Date(dateStr);
  // Parse time like "11AM", "3PM"
  if (timeStr) {
    const match = timeStr.match(/^(\d{1,2})(AM|PM)$/i);
    if (match) {
      let hours = parseInt(match[1], 10);
      const period = match[2].toUpperCase();
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      streamDate.setHours(hours, 0, 0, 0);
    }
  }

  const now = new Date();
  const diffMs = streamDate - now;

  if (diffMs <= 0) return 'Live now';

  const minutes = Math.floor(diffMs / 60_000);
  const hours = Math.floor(diffMs / 3_600_000);
  const days = Math.floor(diffMs / 86_400_000);

  if (minutes < 60) return `in ${minutes} minute${minutes !== 1 ? 's' : ''}`;
  if (hours < 24) return `in ${hours} hour${hours !== 1 ? 's' : ''}`;
  if (days === 1) return `Tomorrow at ${timeStr || ''}`.trim();
  return `in ${days} days`;
}

// ─── Platform Helpers ────────────────────────────────────────────────

/**
 * Get the brand color for a platform.
 */
export function getPlatformColor(platform) {
  return PLATFORM_COLORS[platform] || '#6B7280';
}

/**
 * Get the display label for a platform.
 */
export function getPlatformLabel(platform) {
  return PLATFORM_LABELS[platform] || platform;
}

/**
 * Build a "Watch on [Platform]" label.
 */
export function getWatchOnLabel(platform) {
  return `Watch on ${getPlatformLabel(platform)}`;
}

// ─── Slug Helpers ────────────────────────────────────────────────────

/**
 * Convert a name to a URL-safe slug.
 * e.g. "Tech & Gadgets" → "tech-gadgets"
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// ─── Misc ────────────────────────────────────────────────────────────

/**
 * Get initials from a name (for avatar fallback).
 * e.g. "GlowUp Studio" → "GS"
 */
export function getInitials(name) {
  if (!name) return '';
  const words = name.split(/\s+/);
  return words
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

/**
 * Filter creators by category slug.
 */
export function filterCreatorsByCategory(creators, categorySlug) {
  return creators.filter(
    (c) => slugify(c.category) === categorySlug
  );
}

/**
 * Get only currently live creators.
 */
export function getLiveCreators(creators) {
  return creators.filter((c) => c.isLive);
}

/**
 * Sort creators — live first, then by monthly viewers.
 */
export function sortCreators(creators) {
  return [...creators].sort((a, b) => {
    if (a.isLive && !b.isLive) return -1;
    if (!a.isLive && b.isLive) return 1;
    return b.stats.monthlyViewers - a.stats.monthlyViewers;
  });
}
