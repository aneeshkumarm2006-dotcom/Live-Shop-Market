import classnames from 'classnames';
import { HiExternalLink } from 'react-icons/hi';
import PlatformIcon from './PlatformIcon';
import { isValidSocialUrl } from '@utils/platformHelpers';

/**
 * ExternalLink — Reusable component for all outbound links.
 *
 * Automatically adds target="_blank" and rel="noopener noreferrer".
 * Optionally renders a platform icon and/or an external-link indicator.
 *
 * Props:
 *   href        — URL to open
 *   children    — link content
 *   platform    — optional platform key for PlatformIcon
 *   icon        — optional custom icon component (overrides platform icon)
 *   showExternal— show the external-link arrow icon (default: false)
 *   disabled    — if true or href is invalid, renders as a disabled span
 *   className   — additional classes
 *   onClick     — optional click handler (analytics, etc.)
 *   title       — accessible title / tooltip
 *   ...rest     — forwarded to <a>
 */
export default function ExternalLink({
  href,
  children,
  platform,
  icon: CustomIcon,
  showExternal = false,
  disabled = false,
  className,
  onClick,
  title,
  ...rest
}) {
  const valid = isValidSocialUrl(href);
  const isDisabled = disabled || !valid;

  const handleClick = (e) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  // Render as a <span> when disabled
  if (isDisabled) {
    return (
      <span
        className={classnames(
          'inline-flex items-center gap-1.5 opacity-40 cursor-not-allowed',
          className
        )}
        title={title || 'Link unavailable'}
        aria-disabled="true"
        {...rest}
      >
        {CustomIcon && <CustomIcon className="w-4 h-4 shrink-0" />}
        {!CustomIcon && platform && <PlatformIcon platform={platform} size={16} />}
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classnames('inline-flex items-center gap-1.5', className)}
      onClick={handleClick}
      title={title}
      {...rest}
    >
      {CustomIcon && <CustomIcon className="w-4 h-4 shrink-0" />}
      {!CustomIcon && platform && <PlatformIcon platform={platform} size={16} />}
      {children}
      {showExternal && (
        <HiExternalLink className="w-3.5 h-3.5 shrink-0 opacity-60" />
      )}
    </a>
  );
}
