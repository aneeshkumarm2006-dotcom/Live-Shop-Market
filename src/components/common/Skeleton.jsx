import classnames from 'classnames';

/**
 * Skeleton — shimmer loading placeholder.
 *
 * Props:
 *   - width    : CSS width (e.g. '100%', '120px')
 *   - height   : CSS height (e.g. '16px', '200px')
 *   - circle   : if true, renders a circle skeleton
 *   - rounded  : border-radius preset ('sm' | 'md' | 'lg' | 'full')
 *   - className: passthrough
 *   - count    : render N skeletons stacked
 */

const roundedMap = {
  sm: 'rounded',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  full: 'rounded-full',
};

export default function Skeleton({
  width,
  height = '16px',
  circle = false,
  rounded = 'md',
  className,
  count = 1,
}) {
  const style = {
    width: circle ? height : width,
    height,
  };

  const classes = classnames(
    'skeleton',
    circle ? 'rounded-full' : roundedMap[rounded],
    className
  );

  if (count > 1) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className={classes} style={style} />
        ))}
      </div>
    );
  }

  return <div className={classes} style={style} />;
}

/**
 * SkeletonCard — card-shaped loading placeholder that mimics BrandCard.
 */
export function SkeletonCard({ className }) {
  return (
    <div
      className={classnames(
        'bg-bg-card rounded-[var(--radius-card)] overflow-hidden shadow-[var(--shadow-card)]',
        'flex flex-col items-center p-4 gap-3',
        'min-w-[160px]',
        className
      )}
    >
      <Skeleton circle height="64px" />
      <Skeleton width="80%" height="14px" />
      <Skeleton width="50%" height="12px" />
      <div className="flex gap-2 mt-1">
        <Skeleton width="20px" height="20px" rounded="full" />
        <Skeleton width="20px" height="20px" rounded="full" />
        <Skeleton width="20px" height="20px" rounded="full" />
      </div>
    </div>
  );
}

/**
 * SkeletonRow — mimics a CategoryRow loading state.
 */
export function SkeletonRow({ count = 5, className }) {
  return (
    <div className={classnames('space-y-4', className)}>
      <Skeleton width="140px" height="22px" />
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: count }, (_, i) => (
          <SkeletonCard key={i} className="shrink-0 w-[190px]" />
        ))}
      </div>
    </div>
  );
}
