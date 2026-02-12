import { useMemo, useState, useEffect } from 'react';
import { HiOutlineHeart } from 'react-icons/hi';
import { PageLayout } from '@components/layout';
import { BrandCard, Button, EmptyState, SkeletonLoader } from '@components/common';
import { useToastContext } from '@components/common/Toast';
import useSavedCreators from '@hooks/useSavedCreators';
import mockCreators from '@data/mockCreators';

// ─────────────────────────────────────────────────────────────────────
export default function SavedCreatorsPage() {
  const { savedCreators, toggleSaveCreator } = useSavedCreators();
  const { toast } = useToastContext();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  /* Derive the list of saved creator objects */
  const savedCreatorObjects = useMemo(
    () => mockCreators.filter((c) => savedCreators.includes(c.id)),
    [savedCreators]
  );

  /* Toggle handler — used by BrandCard's onFavoriteToggle */
  const handleFavoriteToggle = (creatorId, saved) => {
    toast[saved ? 'saved' : 'removed'](
      saved ? 'Added to favorites' : 'Removed from favorites'
    );
  };

  return (
    <PageLayout>
      <div className="container-app py-8 sm:py-10 md:py-14">
        {/* ── Page Header ─────────────────────────────────────── */}
        <div className="mb-8 md:mb-10">
          <h1 className="font-[var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold text-text-heading leading-tight">
            Saved Creators
          </h1>
          <p className="text-text-secondary text-sm md:text-base mt-2">
            Your favorite brands — all in one place.
          </p>
        </div>

        {/* ── Grid, Loading, or Empty State ───────────────────── */}
        {isLoading ? (
          <SkeletonLoader variant="card" count={8} />
        ) : savedCreatorObjects.length > 0 ? (
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {savedCreatorObjects.map((creator) => (
              <BrandCard
                key={creator.id}
                creator={creator}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<HiOutlineHeart className="w-10 h-10" />}
            title="You haven't saved any brands yet"
            message="Explore categories and tap the heart icon on any brand to save them here for quick access."
            ctaText="Explore Categories"
            ctaTo="/categories"
          />
        )}
      </div>
    </PageLayout>
  );
}
