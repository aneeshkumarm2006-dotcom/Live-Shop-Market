import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiSearch, HiX } from 'react-icons/hi';
import { FaBell, FaPlay } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { PageLayout } from '@components/layout';
import {
  Avatar,
  Badge,
  BrandCard,
  Button,
  EmptyState,
  ExternalLink,
  ScrollReveal,
  SearchBar,
  SkeletonLoader,
} from '@components/common';
import CategoryRow from '@components/common/CategoryRow';
import PlatformIcon from '@components/common/PlatformIcon';
import mockCreators from '@data/mockCreators';
import { CATEGORIES, CATEGORY_SLUGS, PLATFORM_LABELS } from '@utils/constants';
import { searchCreators } from '@utils/filterHelpers';

const HOMEPAGE_CATEGORIES = [
  { key: CATEGORIES.FASHION, title: 'Fashion', slug: CATEGORY_SLUGS[CATEGORIES.FASHION] },
  { key: CATEGORIES.TECH_GADGETS, title: 'Tech & Gadgets', slug: CATEGORY_SLUGS[CATEGORIES.TECH_GADGETS] },
  { key: CATEGORIES.WELLNESS, title: 'Health & Wellness', slug: CATEGORY_SLUGS[CATEGORIES.WELLNESS] },
];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const isSearching = searchTerm.trim().length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    return searchCreators(mockCreators, searchTerm);
  }, [isSearching, searchTerm]);

  const creatorsByCategory = useMemo(() => {
    const map = {};
    HOMEPAGE_CATEGORIES.forEach(({ key }) => {
      map[key] = mockCreators.filter((c) => c.category === key);
    });
    return map;
  }, []);

  const liveCreators = useMemo(() => mockCreators.filter((c) => c.isLive), []);

  const handleSearch = (query) => {
    if (query?.trim()) {
      setSearchTerm(query.trim());
    }
  };

  const handleClearSearch = () => setSearchTerm('');

  return (
    <PageLayout fullWidth>
      {/* HERO */}
      <section className="relative w-full overflow-hidden">
        <div className="gradient-primary relative w-full pt-32 sm:pt-40 md:pt-48 lg:pt-56 pb-24 sm:pb-28 md:pb-32 lg:pb-36">
          <motion.div
            className="absolute inset-x-0 bottom-0 z-0 flex justify-center translate-y-[-12%]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          >
            <img
              src="/images/hero image.png"
              alt="Live shopping creators streaming"
              className="w-full max-w-4xl h-auto object-contain pointer-events-none select-none"
              draggable={false}
            />
          </motion.div>

          <motion.div
            className="container-app relative z-10 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <h1 className="font-[var(--font-logo)] text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3 drop-shadow-md">
              LiveShopMarket
            </h1>
            <p className="text-white/90 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-md">
              Lorem ipsum sit dolor, consectetur
            </p>
            <div className="w-full max-w-xl px-2 sm:px-0">
              <SearchBar
                placeholder="What are you watching today?"
                size="lg"
                variant="hero"
                value={searchTerm}
                onChange={setSearchTerm}
                onSearch={handleSearch}
                onClear={handleClearSearch}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEARCH RESULTS */}
      {isSearching && (
        <div className="container-app py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-text-heading">
              Search Results for &lsquo;{searchTerm}&rsquo;
              <span className="text-sm font-normal text-text-secondary ml-2">
                ({searchResults.length})
              </span>
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearSearch}
              className="flex items-center gap-1.5"
            >
              <HiX className="w-4 h-4" />
              Clear Search
            </Button>
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {searchResults.map((creator) => (
                <BrandCard key={creator.id} creator={creator} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<HiSearch className="w-8 h-8" />}
              title={`No results found for '${searchTerm}'`}
              message="Try a different search term or browse categories."
              ctaText="Clear Search"
              onCtaClick={handleClearSearch}
            />
          )}
        </div>
      )}

      {/* CATEGORY ROWS */}
      {!isSearching && (
        <div className="container-app py-8 sm:py-12 md:py-16 space-y-8 sm:space-y-12 md:space-y-16">
          {isLoading ? (
            <SkeletonLoader variant="row" count={3} />
          ) : (
            HOMEPAGE_CATEGORIES.map(({ key, title, slug }, index) => {
              const creators = creatorsByCategory[key];
              if (!creators || creators.length === 0) return null;
              return (
                <ScrollReveal key={key} delay={0.1} stagger staggerIndex={index}>
                  <CategoryRow title={title} slug={slug} creators={creators} />
                </ScrollReveal>
              );
            })
          )}

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Link
              to="/categories"
              className="group relative overflow-hidden rounded-[var(--radius-card)] h-48 sm:h-56 flex items-end transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#6FB1FC] via-[#4364F7] to-[#0052D4] opacity-90" />
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-4 right-8 w-16 h-16 rounded-xl bg-white/10 rotate-12 group-hover:rotate-[20deg] transition-transform duration-500" />
                <div className="absolute top-12 right-24 w-10 h-10 rounded-full bg-white/15 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute bottom-16 left-8 w-12 h-12 rounded-lg bg-white/10 -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
                <div className="absolute top-6 left-16 w-8 h-8 rounded-full bg-accent/20 group-hover:scale-125 transition-transform duration-500" />
                <div className="absolute bottom-24 right-12 text-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500">🗂️</div>
                <div className="absolute top-10 left-1/2 text-2xl opacity-30">🛍️</div>
              </div>
              <div className="relative z-10 w-full p-5">
                <span className="inline-block bg-white/95 backdrop-blur-sm text-text-heading text-sm sm:text-base font-semibold px-5 py-2.5 rounded-full shadow-sm group-hover:shadow-md transition-shadow duration-300">
                  Browse All Categories
                </span>
              </div>
            </Link>

            <Link
              to="/trending"
              className="group relative overflow-hidden rounded-[var(--radius-card)] h-48 sm:h-56 flex items-end transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FB923C] via-[#F97316] to-[#EA580C] opacity-90" />
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-6 left-8 w-14 h-14 rounded-xl bg-white/10 rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                <div className="absolute top-10 right-16 w-10 h-10 rounded-full bg-white/15 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute bottom-16 right-8 w-12 h-12 rounded-lg bg-white/10 -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                <div className="absolute bottom-24 left-16 w-8 h-8 rounded-full bg-yellow-300/25 group-hover:scale-125 transition-transform duration-500" />
                <div className="absolute top-8 right-1/3 text-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500">🔥</div>
                <div className="absolute bottom-20 left-1/3 text-2xl opacity-30">⚡</div>
              </div>
              <div className="relative z-10 w-full p-5">
                <span className="inline-block bg-white/95 backdrop-blur-sm text-text-heading text-sm sm:text-base font-semibold px-5 py-2.5 rounded-full shadow-sm group-hover:shadow-md transition-shadow duration-300">
                  See What's Trending
                </span>
              </div>
            </Link>
          </section>
        </div>
      )}

      {/* NEVER MISS A LIVE MOMENT */}
      <section className="w-full bg-bg-dark-blue overflow-hidden">
        <div className="container-app py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-white leading-tight mb-4 sm:mb-5">
                Never Miss a{' '}
                <br className="hidden sm:block" />
                <span className="text-accent">Live</span> Moment
              </h2>

              <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
                Discover upcoming streams, follow your favorite sellers, and get reminders so you never miss a drop, demo, or deal.
              </p>

              <Link to="/signup">
                <Button variant="primary" size="lg" className="shadow-lg hover:shadow-xl border-2 border-pink-500">
                  Sign Up for Free
                </Button>
              </Link>
            </div>

            <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative overflow-hidden">
              <div className="relative w-full max-w-sm lg:max-w-md">
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/30 to-primary-dark/40">
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark-blue/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 rounded-2xl bg-white/5 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
                        <FaPlay className="text-white/40 text-2xl ml-1" />
                      </div>
                      <span className="text-white/30 text-sm font-medium">Live Shopping</span>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-3 -right-3 sm:top-2 sm:-right-6 lg:-right-8 bg-white rounded-xl shadow-xl p-3 sm:p-4 max-w-[220px] sm:max-w-[240px] animate-float">
                  <div className="flex items-start gap-2.5">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center">
                      <FaBell className="text-white text-xs" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-text-primary text-xs font-semibold leading-tight">
                        Cyber Monday exclusive livestream is starting in{' '}
                        <span className="text-primary font-bold">5 minutes</span>.{' '}
                        <Link to="/trending" className="text-primary font-bold hover:underline">
                          Join Live.
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-2 -left-4 sm:-left-6 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg animate-float-delayed">
                  <FaBell className="text-white text-lg sm:text-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CURRENTLY LIVE BRANDS */}
      {liveCreators.length > 0 && (
        <section className="w-full bg-bg-lighter py-10 md:py-14">
          <div className="container-app">
            <div className="flex items-center gap-3 mb-8">
              <Badge variant="live" size="sm" />
              <h3 className="font-[var(--font-heading)] text-xl md:text-2xl font-bold text-text-heading">Currently Live</h3>
            </div>

            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
              {liveCreators.map((creator) => {
                const firstPlatform = creator.currentLivePlatforms?.[0];
                const firstLiveUrl = firstPlatform ? creator.currentLiveLinks?.[firstPlatform] : null;

                return (
                  <div
                    key={creator.id}
                    className="group flex-shrink-0 snap-start flex flex-col items-center gap-3 w-[120px] sm:w-[140px]"
                  >
                    <Link to={`/brand/${creator.id}`} className="relative">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] bg-gradient-to-br from-live-red via-red-500 to-orange-400 live-pulse">
                        <Avatar src={creator.profilePicture} alt={creator.name} size="full" className="w-full h-full border-2 border-white" />
                      </div>
                      <span className="absolute bottom-0.5 right-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-live-red rounded-full border-2 border-white flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-white rounded-full" />
                      </span>
                    </Link>

                    <Link
                      to={`/brand/${creator.id}`}
                      className="text-xs sm:text-sm font-medium text-text-primary text-center text-truncate w-full group-hover:text-primary transition-colors no-underline"
                    >
                      {creator.name}
                    </Link>

                    {firstLiveUrl && (
                      <ExternalLink
                        href={firstLiveUrl}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-live-red/10 text-live-red text-[10px] font-semibold hover:bg-live-red/20 transition-colors no-underline"
                        title={`Watch on ${PLATFORM_LABELS[firstPlatform] || firstPlatform}`}
                      >
                        <PlatformIcon platform={firstPlatform} size={12} />
                        Watch Now
                      </ExternalLink>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
}
