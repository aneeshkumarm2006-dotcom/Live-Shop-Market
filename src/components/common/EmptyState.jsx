import classnames from 'classnames';
import { Link } from 'react-router-dom';
import Button from './Button';

/**
 * EmptyState — friendly placeholder when there's no data to display.
 *
 * Props:
 *   - icon        : React element (from react-icons)
 *   - title       : heading text
 *   - message     : descriptive body text
 *   - ctaText     : button label (optional)
 *   - ctaTo       : route path — renders Link instead of onClick (optional)
 *   - onCtaClick  : button handler (optional)
 *   - className   : passthrough
 */
export default function EmptyState({
  icon,
  title,
  message,
  ctaText,
  ctaTo,
  onCtaClick,
  className,
}) {
  return (
    <div
      className={classnames(
        'flex flex-col items-center justify-center py-20 sm:py-24 text-center',
        className
      )}
    >
      {/* Icon circle */}
      {icon && (
        <div className="w-20 h-20 rounded-full bg-bg-light flex items-center justify-center mb-6">
          <span className="text-text-light text-3xl">{icon}</span>
        </div>
      )}

      {/* Heading */}
      {title && (
        <h2 className="font-[var(--font-heading)] text-xl md:text-2xl font-semibold text-text-heading mb-2">
          {title}
        </h2>
      )}

      {/* Description */}
      {message && (
        <p className="text-text-secondary text-sm md:text-base max-w-sm mb-8">
          {message}
        </p>
      )}

      {/* CTA button */}
      {ctaText && ctaTo && (
        <Button as={Link} to={ctaTo} variant="primary" size="lg">
          {ctaText}
        </Button>
      )}
      {ctaText && onCtaClick && !ctaTo && (
        <Button variant="primary" size="lg" onClick={onCtaClick}>
          {ctaText}
        </Button>
      )}
    </div>
  );
}
