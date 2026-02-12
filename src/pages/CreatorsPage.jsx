import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageLayout } from '@components/layout';
import { BrandCard, SearchBar, Badge, FavoriteButton, PlatformIcon, EmptyState, SkeletonLoader } from '@components/common';
import Button from '@components/common/Button';
import mockCreators from '@data/mockCreators';
import { PLATFORMS, PLATFORM_LABELS } from '@utils/constants';
import { formatCompactNumber } from '@utils/helpers';
import {
  filterByPlatform,
  filterByLiveStatus,
  searchCreators,
  sortCreators as sortCreatorsHelper,
} from '@utils/filterHelpers';
import { HiPlay, HiSortDescending, HiFilter, HiChevronDown, HiX, HiSearch } from 'react-icons/hi';

// ─── Sort options ────────────────────────────────────────────────────
const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'viewers', label: 'Most Viewers' },
  { value: 'az', label: 'A – Z' },
];

// ─── Platform filter pills ──────────────────────────────────────────
const PLATFORM_FILTERS = [
  { value: 'all', label: 'All' },
  { value: PLATFORMS.INSTAGRAM, label: 'Instagram' },
  { value: PLATFORMS.TIKTOK, label: 'TikTok' },
  { value: PLATFORMS.YOUTUBE, label: 'YouTube' },
  { value: PLATFORMS.QVC, label: 'QVC' },
];

// ─── LiveCreatorCard — larger card for "Live Now" section ────────────
function LiveCreatorCard({ creator }) {
  const navigate = useNavigate();

  const handleClick = () => navigate(`/brand/${creator.id}`);

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer bg-bg-card rounded-[var(--radius-card)] shadow-[var(--shadow-card)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
    >
      {/* Thumbnail placeholder */}
      <div className="relative w-full aspect-[4/3] bg-gray-200">
        {/* LIVE badge */}
        <div className="absolute top-3 left-3 z-10">
          <Badge type="live" />
        </div>

        {/* Play icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
            <HiPlay className="w-6 h-6 text-white drop-shadow-md" />
          </div>
        </div>
      </div>

      {/* Platform badges */}
      {creator.currentLivePlatforms?.length > 0 && (
        <div className="flex flex-wrap gap-2 px-4 pt-3">
          {creator.currentLivePlatforms.map((platform) => (
            <a
              key={platform}
              href={creator.currentLiveLinks?.[platform] || '#'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-border-light bg-bg-white hover:shadow-sm hover:-translate-y-px transition-all duration-200"
            >
              <span className="text-[10px] text-text-light">Watch on</span>
              <PlatformIcon platform={platform} size={14} colored />
              <span className="font-semibold text-text-primary">
                {PLATFORM_LABELS[platform]}
              </span>
            </a>
          ))}
        </div>
      )}

      {/* Stream title + creator name */}
      <div className="px-4 pt-2.5 pb-4">
        <h3 className="text-sm font-semibold text-text-primary truncate">
          Stream Title
        </h3>
        <p className="text-xs text-text-secondary mt-0.5">{creator.name}</p>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════
// CreatorsPage — Browse Live Creators
// ═════════════════════════════════════════════════════════════════════
export default function CreatorsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  // ── State — initialise from URL query params ──────────────────────
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'popular');
  const [platformFilter, setPlatformFilter] = useState(searchParams.get('platform') || 'all');
  const [liveOnly, setLiveOnly] = useState(searchParams.get('live') === 'true');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Simulate loading delay
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // ── Sync state → URL query params ────────────────────────────────
  useEffect(() => {
    const params = {};
    if (platformFilter && platformFilter !== 'all') params.platform = platformFilter;
    if (sortBy && sortBy !== 'popular') params.sort = sortBy;
    if (searchQuery.trim()) params.search = searchQuery.trim();
    if (liveOnly) params.live = 'true';
    setSearchParams(params, { replace: true });
  }, [platformFilter, sortBy, searchQuery, liveOnly, setSearchParams]);

  // Count active filters (excluding default sort)
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (platformFilter !== 'all') count++;
    if (liveOnly) count++;
    if (searchQuery.trim()) count++;
    return count;
  }, [platformFilter, liveOnly, searchQuery]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSortBy('popular');
    setPlatformFilter('all');
    setLiveOnly(false);
  };

  // ── All creators ──────────────────────────────────────────────────
  const allCreators = useMemo(() => [...mockCreators], []);

  // ── Live creators ─────────────────────────────────────────────────
  const liveCreators = useMemo(
    () => allCreators.filter((c) => c.isLive),
    [allCreators]
  );

  // ── All creators (filtered + sorted + searched) ───────────────────
  const filteredCreators = useMemo(() => {
    let results = [...allCreators];

    // Platform filter
    results = filterByPlatform(results, platformFilter);

    // Live-only filter
    results = filterByLiveStatus(results, liveOnly);

    // Search
    results = searchCreators(results, searchQuery);

    // Sort
    return sortCreatorsHelper(results, sortBy);
  }, [allCreators, platformFilter, liveOnly, searchQuery, sortBy]);

  return (
    <PageLayout fullWidth>
      {/* ════════════════════════════════════════════════════════════
          1. CREATOR BANNER
          ════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden min-h-[160px] sm:min-h-[200px] md:min-h-[240px]"
        style={{
          background: 'linear-gradient(135deg, #0052D4 0%, #4364F7 50%, #6FB1FC 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Decorative blurred circles */}
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-black/5 blur-2xl" />

        {/* Content */}
        <div className="relative z-10 container-app flex items-center justify-center h-full min-h-[160px] sm:min-h-[200px] md:min-h-[240px] py-8 sm:py-10 md:py-12">
          <h1
            className="inline-block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg"
            style={{
              backgroundColor: 'rgba(0,0,0,0.18)',
              fontSize: 'clamp(1.5rem, 5vw, 3rem)'
            }}
          >
            Browse Live Creators
          </h1>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          2. FILTER BAR
          ════════════════════════════════════════════════════════════ */}
      <section className="bg-bg-white border-b border-border-light sticky top-[var(--header-height,72px)] z-30">
        <div className="container-app py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Left — Browse Live Creators button + Live-only toggle */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <Button
              variant="primary"
              size="sm"
              className="whitespace-nowrap"
              onClick={() => {
                const el = document.getElementById('live-now-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Browse Live Creators
            </Button>

            {/* Live-only toggle */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={liveOnly}
                  onChange={(e) => setLiveOnly(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-200 rounded-full peer-checked:bg-live-red transition-colors" />
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-4" />
              </div>
              <span className="text-xs font-medium text-text-secondary whitespace-nowrap">Live Only</span>
            </label>
          </div>

          {/* Right — Search + Sort */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="flex-1 sm:flex-none sm:w-56 md:w-64">
              <SearchBar
                placeholder="Search Creators..."
                size="sm"
                value={searchQuery}
                onChange={setSearchQuery}
                onClear={() => setSearchQuery('')}
              />
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown((v) => !v)}
                className="flex items-center gap-1.5 h-10 px-3 rounded-lg border border-border-light text-sm text-text-primary hover:border-primary transition-colors"
              >
                <HiSortDescending className="w-4 h-4 text-text-secondary" />
                <span className="hidden sm:inline text-xs text-text-secondary">
                  {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
                </span>
                <HiChevronDown className="w-3 h-3 text-text-secondary" />
              </button>

              {showSortDropdown && (
                <>
                  {/* Backdrop to close */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowSortDropdown(false)}
                  />
                  <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-border-light py-1 z-50">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSortBy(opt.value);
                          setShowSortDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-bg-light transition-colors ${sortBy === opt.value
                          ? 'text-primary font-semibold'
                          : 'text-text-primary'
                          }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Platform filter pills + active filter summary */}
        <div className="container-app pb-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {PLATFORM_FILTERS.map((pf) => (
            <button
              key={pf.value}
              onClick={() => setPlatformFilter(pf.value)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${platformFilter === pf.value
                ? 'bg-primary text-white border-primary'
                : 'bg-bg-white text-text-secondary border-border-light hover:border-primary hover:text-primary'
                }`}
            >
              {pf.label}
            </button>
          ))}

          {/* Separator + clear-all when filters are active */}
          {activeFilterCount > 0 && (
            <>
              <span className="w-px h-5 bg-border-light mx-1" />
              <button
                onClick={clearAllFilters}
                className="whitespace-nowrap flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-live-red border border-live-red/30 hover:bg-live-red/5 transition-all duration-200"
              >
                <HiX className="w-3 h-3" />
                Clear All ({activeFilterCount})
              </button>
            </>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          3. LIVE NOW SECTION
          ════════════════════════════════════════════════════════════ */}
      {liveCreators.length > 0 && (
        <section id="live-now-section" className="container-app pt-10 pb-6">
          <h2 className="text-xl font-bold text-text-primary mb-5">
            Live Creators Now
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveCreators.map((creator) => (
              <LiveCreatorCard key={creator.id} creator={creator} />
            ))}
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════
          4. ALL CREATORS SECTION
          ════════════════════════════════════════════════════════════ */}
      <section className="container-app pt-6 pb-16">
        <h2 className="text-xl font-bold text-text-primary mb-5">
          All Creators
          {!isLoading && (
            <span className="text-sm font-normal text-text-secondary ml-2">
              ({filteredCreators.length})
            </span>
          )}
        </h2>

        {isLoading ? (
          <SkeletonLoader variant="card" count={10} />
        ) : filteredCreators.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredCreators.map((creator) => (
              <BrandCard key={creator.id} creator={creator} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<HiSearch className="w-8 h-8" />}
            title="No creators found"
            message="Try adjusting your search or filters."
            ctaText="Clear All Filters"
            onCtaClick={clearAllFilters}
          />
        )}
      </section>
    </PageLayout>
  );
}
