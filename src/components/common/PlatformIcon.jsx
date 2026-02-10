import classnames from 'classnames';
import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from 'react-icons/fa';
import { PLATFORMS } from '@utils/constants';

/**
 * PlatformIcon Component — LiveShopMarket Design System
 *
 * Renders the correct social platform icon with brand colors.
 * Used on: Brand profile page (platform badges), category page stream cards,
 *          "Watch on" buttons in live banner.
 *
 * Platforms: Instagram, TikTok, YouTube, QVC
 *
 * Figma specs:
 *   - Instagram: #E4405F gradient icon
 *   - TikTok: #000000 icon
 *   - YouTube: #FF0000 icon
 *   - QVC: #00599C / blue icon with "Q" text
 */

// QVC doesn't have a react-icons entry — render a custom styled text badge
function QvcIcon({ size, className }) {
  return (
    <span
      className={classnames(
        'inline-flex items-center justify-center',
        'font-bold text-white bg-qvc rounded',
        className
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.55,
        lineHeight: 1,
        borderRadius: size * 0.2,
      }}
      aria-label="QVC"
    >
      Q
    </span>
  );
}

const platformIcons = {
  [PLATFORMS.INSTAGRAM]: FaInstagram,
  [PLATFORMS.TIKTOK]: FaTiktok,
  [PLATFORMS.YOUTUBE]: FaYoutube,
  [PLATFORMS.QVC]: null, // Custom component
};

const platformColors = {
  [PLATFORMS.INSTAGRAM]: 'text-instagram',
  [PLATFORMS.TIKTOK]: 'text-tiktok',
  [PLATFORMS.YOUTUBE]: 'text-youtube',
  [PLATFORMS.QVC]: 'text-qvc',
};

const platformLabels = {
  [PLATFORMS.INSTAGRAM]: 'Instagram',
  [PLATFORMS.TIKTOK]: 'TikTok',
  [PLATFORMS.YOUTUBE]: 'YouTube',
  [PLATFORMS.QVC]: 'QVC',
};

export default function PlatformIcon({
  platform,
  size = 20,
  colored = true,
  showLabel = false,
  className,
}) {
  if (!platform) return null;

  const normalizedPlatform = platform.toLowerCase();

  // QVC special case
  if (normalizedPlatform === PLATFORMS.QVC) {
    return (
      <span
        className={classnames('inline-flex items-center gap-1.5', className)}
      >
        <QvcIcon size={size} />
        {showLabel && (
          <span className="text-sm font-medium text-text-primary">
            {platformLabels[normalizedPlatform]}
          </span>
        )}
      </span>
    );
  }

  const IconComponent = platformIcons[normalizedPlatform];
  if (!IconComponent) return null;

  const colorClass = colored
    ? platformColors[normalizedPlatform]
    : 'text-current';

  return (
    <span
      className={classnames('inline-flex items-center gap-1.5', className)}
      role="img"
      aria-label={platformLabels[normalizedPlatform]}
    >
      <IconComponent
        size={size}
        className={classnames(colorClass, 'shrink-0')}
        aria-hidden="true"
      />
      {showLabel && (
        <span className="text-sm font-medium text-text-primary">
          {platformLabels[normalizedPlatform]}
        </span>
      )}
    </span>
  );
}
