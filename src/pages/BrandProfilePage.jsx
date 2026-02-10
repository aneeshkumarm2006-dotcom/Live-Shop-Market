import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import { PageLayout } from '@components/layout';
import { Avatar, Badge, Button, FavoriteButton, PlatformIcon, ExternalLink, SkeletonLoader } from '@components/common';
import { useToastContext } from '@components/common/Toast';
import {
  HiOutlineEye,
  HiOutlineStar,
  HiOutlineUsers,
  HiOutlineBell,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiX,
} from 'react-icons/hi';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { HiMegaphone } from 'react-icons/hi2';
import { PLATFORMS, PLATFORM_LABELS } from '@utils/constants';
import { formatNumber, formatCompactNumber, getTimeAgo, formatDate } from '@utils/helpers';
import { isValidSocialUrl } from '@utils/platformHelpers';
import mockCreators from '@data/mockCreators';
import useSavedCreators from '@hooks/useSavedCreators';

// ─── QVC mini icon for social links row ────────────────────
function QvcSocialIcon() {
  return (
    <span
      className="inline-flex items-center justify-center w-5 h-5 font-bold text-white bg-qvc rounded text-[11px] leading-none"
      aria-label="QVC"
      style={{ borderRadius: 4 }}
    >
      Q
    </span>
  );
}

// Map platform keys to icon components for the social links row
const socialIconMap = {
  [PLATFORMS.INSTAGRAM]: { Icon: FaInstagram, color: 'text-instagram', hoverBg: 'hover:bg-pink-50' },
  [PLATFORMS.TIKTOK]: { Icon: FaTiktok, color: 'text-tiktok', hoverBg: 'hover:bg-gray-100' },
  [PLATFORMS.YOUTUBE]: { Icon: FaYoutube, color: 'text-youtube', hoverBg: 'hover:bg-red-50' },
  [PLATFORMS.QVC]: { Icon: null, color: 'text-qvc', hoverBg: 'hover:bg-blue-50' },
};

export default function BrandProfilePage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const creator = mockCreators.find((c) => c.id === id);

  // Simulate loading delay
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [id]);

  // ── Favorite state (shared hook) ────────────────────────
  const { isCreatorSaved, toggleSaveCreator } = useSavedCreators();
  const { toast } = useToastContext();

  const isFavorite = creator ? isCreatorSaved(creator.id) : false;

  const handleFavoriteToggle = () => {
    if (!creator) return;
    const { saved } = toggleSaveCreator(creator.id);
    toast[saved ? 'saved' : 'removed'](
      saved ? 'Added to favorites' : 'Removed from favorites'
    );
  };

  // ── Loading state ────────────────────────────────────────
  if (isLoading) {
    return (
      <PageLayout fullWidth>
        <SkeletonLoader variant="profile" />
      </PageLayout>
    );
  }

  // ── 404 if creator not found ─────────────────────────────
  if (!creator) {
    return (
      <PageLayout>
        <section className="container-app py-20 text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-2">Brand Not Found</h1>
          <p className="text-text-secondary mb-6">
            The brand you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            ← Back to Home
          </Link>
        </section>
      </PageLayout>
    );
  }

  // ── Derived data ─────────────────────────────────────────
  const lastStreamedLabel = creator.lastStreamed
    ? `Last Streamed ${getTimeAgo(creator.lastStreamed)}`
    : null;

  // Collect all non-empty social links
  const activeSocialLinks = Object.entries(creator.socialLinks || {}).filter(
    ([, url]) => url && url.trim() !== ''
  );

  return (
    <PageLayout fullWidth>
      {/* ═══════════════════════════════════════════════════
          1. COVER IMAGE
          ═══════════════════════════════════════════════════ */}
      <div className="relative w-full h-[180px] sm:h-[240px] md:h-[300px] bg-gray-200 overflow-hidden">
        {creator.coverImage ? (
          <img
            src={creator.coverImage}
            alt={`${creator.name} cover`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-gray-300 to-gray-200" />
        )}
        {/* subtle bottom gradient for readability */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* ═══════════════════════════════════════════════════
          2. PROFILE HEADER + INFO
          ═══════════════════════════════════════════════════ */}
      <section className="container-app relative">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10 pb-8 border-b border-border-light">

          {/* ── Avatar (overlapping cover) ── */}
          <div className="-mt-12 sm:-mt-16 md:-mt-20 shrink-0">
            <Avatar
              src={creator.profilePicture}
              name={creator.name}
              size="xl"
              border
              className="ring-4 ring-white shadow-md"
            />
          </div>

          {/* ── Info column ── */}
          <div className="flex-1 min-w-0 pt-1">
            {/* Top row: name + favorite */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              {/* Left: Name, category, last streamed */}
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary leading-tight">
                  {creator.name}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  <Badge type="category" category={creator.category} text={creator.category} />
                  {lastStreamedLabel && (
                    <span className="text-sm text-text-secondary">
                      {lastStreamedLabel}
                    </span>
                  )}
                </div>
              </div>

              {/* Right: Favorite CTA */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-orange-50 rounded-xl border border-orange-200">
                  <FavoriteButton
                    isFavorite={isFavorite}
                    onClick={handleFavoriteToggle}
                    size="lg"
                    showBackground={false}
                  />
                  <div className="text-sm leading-tight">
                    <p className="font-semibold text-text-primary">Favorite this brand</p>
                    <p className="text-text-secondary text-xs">
                      and get notified when they go live!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="mt-4 text-text-body text-sm sm:text-base leading-relaxed max-w-2xl">
              {creator.bio}
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 mt-4">
              {/* Monthly viewers */}
              <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                <HiOutlineEye className="w-5 h-5 text-text-muted" />
                <span>
                  <strong className="text-text-primary font-semibold">
                    {formatNumber(creator.stats.monthlyViewers)}
                  </strong>{' '}
                  Monthly Viewers
                </span>
              </div>

              {/* Category rank */}
              <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                <HiOutlineStar className="w-5 h-5 text-yellow-400" />
                <span>
                  <strong className="text-text-primary font-semibold">
                    Top {creator.stats.categoryRank}
                  </strong>{' '}
                  in Category
                </span>
              </div>

              {/* Followers */}
              {creator.stats.followers && (
                <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                  <HiOutlineUsers className="w-5 h-5 text-text-muted" />
                  <span>
                    <strong className="text-text-primary font-semibold">
                      {formatCompactNumber(creator.stats.followers)}
                    </strong>{' '}
                    Followers
                  </span>
                </div>
              )}
            </div>

            {/* Platforms row */}
            {activeSocialLinks.length > 0 && (
              <div className="mt-4">
                <span className="text-sm font-semibold text-text-primary mr-3">Platforms</span>
                <div className="inline-flex items-center gap-2">
                  {activeSocialLinks.map(([platform, url]) => {
                    const entry = socialIconMap[platform];
                    if (!entry) return null;
                    const hasValidUrl = isValidSocialUrl(url);

                    return (
                      <ExternalLink
                        key={platform}
                        href={url}
                        disabled={!hasValidUrl}
                        className={`inline-flex items-center justify-center w-9 h-9 rounded-full border border-border-light transition-all duration-200 ${entry.hoverBg} hover:shadow-sm hover:-translate-y-0.5`}
                        title={PLATFORM_LABELS[platform] || platform}
                        aria-label={PLATFORM_LABELS[platform] || platform}
                      >
                        {entry.Icon ? (
                          <entry.Icon className={`w-4 h-4 ${entry.color}`} />
                        ) : (
                          <QvcSocialIcon />
                        )}
                      </ExternalLink>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            5. UPCOMING STREAMS
            ═══════════════════════════════════════════════════ */}
        <UpcomingStreams streams={creator.upcomingStreams} />

        {/* ═══════════════════════════════════════════════════
            6. PREVIOUS STREAMS
            ═══════════════════════════════════════════════════ */}
        <PreviousStreams streams={creator.previousStreams} />
      </section>

      {/* ═══════════════════════════════════════════════════
          7. LIVE NOW BANNER (fixed bottom)
          ═══════════════════════════════════════════════════ */}
      {creator.isLive && (
        <LiveNowBanner
          creatorName={creator.name}
          platforms={creator.currentLivePlatforms}
          liveLinks={creator.currentLiveLinks}
        />
      )}
    </PageLayout>
  );
}

/* ═══════════════════════════════════════════════════════════════
   UPCOMING STREAMS — Table / list of scheduled streams
   ═══════════════════════════════════════════════════════════════ */
function UpcomingStreams({ streams }) {
  const [reminders, setReminders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('streamReminders') || '{}');
    } catch {
      return {};
    }
  });

  const toggleReminder = (streamKey) => {
    setReminders((prev) => {
      const next = { ...prev, [streamKey]: !prev[streamKey] };
      localStorage.setItem('streamReminders', JSON.stringify(next));
      return next;
    });
  };

  return (
    <section className="py-6 sm:py-8">
      <h2 className="text-base sm:text-lg md:text-xl font-bold text-text-primary mb-4 sm:mb-5">
        Upcoming Streams
      </h2>

      {(!streams || streams.length === 0) ? (
        <div className="py-10 text-center rounded-xl bg-bg-lighter border border-border-light">
          <p className="text-text-secondary text-sm">No upcoming streams scheduled yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="min-w-[600px] divide-y divide-border-light">
            {streams.map((stream, idx) => {
              const key = `${stream.date}-${stream.time}-${idx}`;
              const isSet = !!reminders[key];

              return (
                <div
                  key={key}
                  className="flex items-center gap-4 sm:gap-6 py-4 group hover:bg-bg-lighter/50 -mx-3 px-3 rounded-lg transition-colors"
                >
                  {/* Date */}
                  <div className="shrink-0 w-[140px] sm:w-[160px]">
                    <span className="text-sm font-medium text-text-primary">
                      {formatDate(stream.date)}
                    </span>
                  </div>

                  {/* Time */}
                  <div className="shrink-0 w-[50px]">
                    <span className="text-sm font-semibold text-text-primary">
                      {stream.time}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text-body truncate">
                      {stream.title}
                    </p>
                  </div>

                  {/* Platform icons */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {stream.platforms?.map((p) => (
                      <PlatformIcon key={p} platform={p} size={16} />
                    ))}
                  </div>

                  {/* Remind Me button */}
                  <div className="shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleReminder(key)}
                      className={`
                        inline-flex items-center gap-1.5
                        px-4 py-2 rounded-full text-xs font-semibold
                        transition-all duration-200 cursor-pointer
                        border
                        ${
                          isSet
                            ? 'bg-accent text-accent-text border-accent-hover shadow-sm'
                            : 'bg-accent/80 text-accent-text border-accent hover:bg-accent hover:shadow-sm'
                        }
                      `}
                    >
                      <HiOutlineBell className="w-3.5 h-3.5" />
                      {isSet ? 'Reminder Set' : 'Remind Me'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PREVIOUS STREAMS — Horizontal scrolling thumbnails
   ═══════════════════════════════════════════════════════════════ */
function PreviousStreams({ streams }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  if (!streams || streams.length === 0) {
    return (
      <section className="py-8 border-t border-border-light">
        <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-5">
          Previous Streams
        </h2>
        <div className="py-10 text-center rounded-xl bg-bg-lighter border border-border-light">
          <p className="text-text-secondary text-sm">No previous streams yet.</p>
        </div>
      </section>
    );
  }

  // Total & current (for "Stream 01 / 05" counter)
  const total = streams.length;

  return (
    <section className="py-6 sm:py-8 border-t border-border-light">
      <h2 className="text-base sm:text-lg md:text-xl font-bold text-text-primary mb-4 sm:mb-5">
        Previous Streams
      </h2>

      <div className="relative group">
        {/* Left scroll button */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md border border-border-light flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
            aria-label="Scroll left"
          >
            <HiOutlineChevronLeft className="w-5 h-5 text-text-primary" />
          </button>
        )}

        {/* Right scroll button */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md border border-border-light flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
            aria-label="Scroll right"
          >
            <HiOutlineChevronRight className="w-5 h-5 text-text-primary" />
          </button>
        )}

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2 scrollbar-hide"
        >
          {streams.map((stream, idx) => (
            <div
              key={idx}
              className="shrink-0 w-[160px] sm:w-[180px] group/card cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-200 border border-border-light">
                {stream.thumbnail ? (
                  <img
                    src={stream.thumbnail}
                    alt={stream.title}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/10 transition-colors duration-200" />
              </div>

              {/* Title */}
              <p className="mt-2 text-xs sm:text-sm text-text-body font-medium line-clamp-2 leading-snug">
                {stream.title}
              </p>
            </div>
          ))}
        </div>

        {/* Counter */}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-text-muted">
            Stream <span className="font-semibold text-text-secondary">01</span> / <span className="font-semibold text-text-secondary">{String(total).padStart(2, '0')}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LIVE NOW BANNER — Fixed bottom bar when creator is live
   ═══════════════════════════════════════════════════════════════ */
function LiveNowBanner({ creatorName, platforms, liveLinks }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Slide-up entrance after a short delay
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={`
        fixed bottom-0 inset-x-0 z-50
        transition-transform duration-500 ease-out
        ${visible ? 'translate-y-0' : 'translate-y-full'}
      `}
    >
      {/* Banner */}
      <div className="mx-auto max-w-3xl px-4 pb-4 sm:pb-6">
        <div className="relative bg-accent rounded-2xl shadow-xl border border-accent-hover px-4 py-4 sm:px-8 sm:py-5 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">

          {/* Close button */}
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Dismiss live banner"
          >
            <HiX className="w-4 h-4 text-accent-text" />
          </button>

          {/* Text + megaphone */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <HiMegaphone className="w-8 h-8 sm:w-10 sm:h-10 text-accent-text shrink-0 megaphone-pulse" />
            <p className="text-sm sm:text-base font-bold text-accent-text leading-tight">
              {creatorName} is currently live. Join their stream now!
            </p>
          </div>

          {/* Watch on buttons */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap justify-center">
            {platforms?.map((platform) => {
              const url = liveLinks?.[platform];
              return (
                <ExternalLink
                  key={platform}
                  href={url}
                  disabled={!url}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-xs font-semibold text-text-primary border border-border-light shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer no-underline"
                  title={`Watch on ${PLATFORM_LABELS[platform]}`}
                >
                  <span className="text-[10px] text-text-secondary">Watch on</span>
                  <PlatformIcon platform={platform} size={16} />
                  <span className="font-bold">{PLATFORM_LABELS[platform]}</span>
                </ExternalLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
