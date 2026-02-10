import { PLATFORMS, PLATFORM_LABELS, PLATFORM_COLORS, PLATFORM_URLS } from './constants';

// ─── Platform Detection ──────────────────────────────────────────────

/**
 * Detect which platform a URL belongs to based on its hostname.
 * Returns a PLATFORMS constant value or null.
 *
 * @param {string} url
 * @returns {string|null}
 */
export function detectPlatform(url) {
  if (!url || typeof url !== 'string') return null;

  try {
    const hostname = new URL(url).hostname.toLowerCase();

    if (hostname.includes('instagram.com')) return PLATFORMS.INSTAGRAM;
    if (hostname.includes('tiktok.com')) return PLATFORMS.TIKTOK;
    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) return PLATFORMS.YOUTUBE;
    if (hostname.includes('qvc.com')) return PLATFORMS.QVC;

    return null;
  } catch {
    return null;
  }
}

// ─── Platform Colors ─────────────────────────────────────────────────

/**
 * Get the brand hex color for a platform.
 * @param {string} platform  — PLATFORMS constant value
 * @returns {string} hex color
 */
export function getPlatformColor(platform) {
  return PLATFORM_COLORS[platform] ?? '#6B7280';
}

/**
 * Get the Tailwind CSS class for a platform's brand color.
 * @param {string} platform
 * @returns {string}
 */
export function getPlatformColorClass(platform) {
  const map = {
    [PLATFORMS.INSTAGRAM]: 'text-instagram',
    [PLATFORMS.TIKTOK]: 'text-tiktok',
    [PLATFORMS.YOUTUBE]: 'text-youtube',
    [PLATFORMS.QVC]: 'text-qvc',
  };
  return map[platform] ?? 'text-gray-500';
}

/**
 * Get the hover background class for a platform.
 * @param {string} platform
 * @returns {string}
 */
export function getPlatformHoverBg(platform) {
  const map = {
    [PLATFORMS.INSTAGRAM]: 'hover:bg-pink-50',
    [PLATFORMS.TIKTOK]: 'hover:bg-gray-100',
    [PLATFORMS.YOUTUBE]: 'hover:bg-red-50',
    [PLATFORMS.QVC]: 'hover:bg-blue-50',
  };
  return map[platform] ?? 'hover:bg-gray-50';
}

// ─── URL Validation ──────────────────────────────────────────────────

/**
 * Check whether a string looks like a valid social / external URL.
 * Accepts http and https only.
 *
 * @param {string} url
 * @returns {boolean}
 */
export function isValidSocialUrl(url) {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

// ─── Live Stream URL Builders ────────────────────────────────────────

/**
 * Build a live-stream URL for a given platform + username.
 * Falls back to the base platform URL if username is absent.
 *
 * @param {string} platform
 * @param {string} username
 * @returns {string|null}
 */
export function buildLiveStreamUrl(platform, username) {
  if (!platform || !username) return null;

  switch (platform) {
    case PLATFORMS.INSTAGRAM:
      return `https://www.instagram.com/${username}/live`;
    case PLATFORMS.TIKTOK:
      return `https://www.tiktok.com/@${username}/live`;
    case PLATFORMS.YOUTUBE:
      return `https://www.youtube.com/@${username}/live`;
    case PLATFORMS.QVC:
      return `https://www.qvc.com/${username}`;
    default:
      return null;
  }
}

/**
 * Given a creator object, return the best URL to watch their live stream
 * on a specific platform.
 *
 *  1. Use creator.currentLiveLinks[platform] if available
 *  2. Fall back to building a URL from the social link username
 *
 * @param {object} creator
 * @param {string} platform
 * @returns {string|null}
 */
export function getLiveStreamUrl(creator, platform) {
  // 1. Explicit live link
  const explicit = creator?.currentLiveLinks?.[platform];
  if (explicit && isValidSocialUrl(explicit)) return explicit;

  return null;
}

/**
 * Open an external URL safely in a new tab.
 * @param {string} url
 */
export function openExternalUrl(url) {
  if (!url || !isValidSocialUrl(url)) return;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Get the display label for a platform.
 * @param {string} platform
 * @returns {string}
 */
export function getPlatformLabel(platform) {
  return PLATFORM_LABELS[platform] ?? platform ?? 'Unknown';
}
