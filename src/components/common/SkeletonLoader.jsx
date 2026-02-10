import classnames from 'classnames';
import Skeleton, { SkeletonCard, SkeletonRow } from './Skeleton';

/**
 * SkeletonLoader — higher-level skeleton variants for specific use cases.
 *
 * Props:
 *   - variant   : 'card' | 'text' | 'avatar' | 'row' | 'profile'
 *   - count     : number of skeletons to render
 *   - className : passthrough
 */
export default function SkeletonLoader({
  variant = 'card',
  count = 1,
  className,
}) {
  switch (variant) {
    case 'card':
      return <CardSkeletonGrid count={count} className={className} />;
    case 'text':
      return <TextSkeleton count={count} className={className} />;
    case 'avatar':
      return <AvatarSkeleton count={count} className={className} />;
    case 'row':
      return <RowSkeleton count={count} className={className} />;
    case 'profile':
      return <ProfileSkeleton className={className} />;
    default:
      return <CardSkeletonGrid count={count} className={className} />;
  }
}

/* ─── Card skeleton grid (for creator card grids) ─────────────────── */
function CardSkeletonGrid({ count = 8, className }) {
  return (
    <div
      className={classnames(
        'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4',
        className
      )}
    >
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

/* ─── Text skeleton (for text content blocks) ─────────────────────── */
function TextSkeleton({ count = 3, className }) {
  return (
    <div className={classnames('space-y-3', className)}>
      {Array.from({ length: count }, (_, i) => (
        <Skeleton
          key={i}
          width={i === count - 1 ? '60%' : '100%'}
          height="14px"
        />
      ))}
    </div>
  );
}

/* ─── Avatar skeleton (circle placeholders) ───────────────────────── */
function AvatarSkeleton({ count = 1, className }) {
  return (
    <div className={classnames('flex gap-3', className)}>
      {Array.from({ length: count }, (_, i) => (
        <Skeleton key={i} circle height="48px" />
      ))}
    </div>
  );
}

/* ─── Row skeleton (for CategoryRow placeholders) ─────────────────── */
function RowSkeleton({ count = 2, className }) {
  return (
    <div className={classnames('space-y-8', className)}>
      {Array.from({ length: count }, (_, i) => (
        <SkeletonRow key={i} />
      ))}
    </div>
  );
}

/* ─── Brand profile skeleton (for BrandProfilePage) ──────────────── */
function ProfileSkeleton({ className }) {
  return (
    <div className={classnames('animate-pulse', className)}>
      {/* Cover image */}
      <Skeleton width="100%" height="240px" rounded="lg" />

      {/* Profile header */}
      <div className="container-app mt-6">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <Skeleton circle height="96px" />
          {/* Info */}
          <div className="flex-1 space-y-3 pt-2">
            <Skeleton width="200px" height="24px" />
            <Skeleton width="120px" height="16px" />
            <div className="flex gap-2">
              <Skeleton width="80px" height="28px" rounded="full" />
              <Skeleton width="80px" height="28px" rounded="full" />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-6 mt-8">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="text-center space-y-2">
              <Skeleton width="48px" height="20px" className="mx-auto" />
              <Skeleton width="64px" height="12px" className="mx-auto" />
            </div>
          ))}
        </div>

        {/* Content area */}
        <div className="mt-10 space-y-4">
          <Skeleton width="100%" height="16px" />
          <Skeleton width="100%" height="16px" />
          <Skeleton width="75%" height="16px" />
        </div>
      </div>
    </div>
  );
}

export { CardSkeletonGrid, TextSkeleton, AvatarSkeleton, RowSkeleton, ProfileSkeleton };
