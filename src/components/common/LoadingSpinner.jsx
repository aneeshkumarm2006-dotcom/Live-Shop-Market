import classnames from 'classnames';

/**
 * LoadingSpinner — circular spinner using the primary brand color.
 *
 * Props:
 *   - size      : 'small' | 'medium' | 'large'  (default: 'medium')
 *   - className : passthrough
 *   - label     : accessible text (default: 'Loading…')
 *   - light     : if true, renders white spinner (for dark backgrounds)
 */

const sizeMap = {
  small:  'w-4 h-4 border-2',
  medium: 'w-8 h-8 border-[3px]',
  large:  'w-12 h-12 border-4',
};

export default function LoadingSpinner({
  size = 'medium',
  className,
  label = 'Loading…',
  light = false,
}) {
  return (
    <div
      role="status"
      aria-label={label}
      className={classnames('inline-flex items-center justify-center', className)}
    >
      <div
        className={classnames(
          'rounded-full animate-spin',
          sizeMap[size],
          light
            ? 'border-white/30 border-t-white'
            : 'border-primary/20 border-t-primary'
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}

/**
 * FullPageSpinner — centered spinner for page-level loading.
 */
export function FullPageSpinner({ label }) {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <LoadingSpinner size="large" label={label} />
    </div>
  );
}
