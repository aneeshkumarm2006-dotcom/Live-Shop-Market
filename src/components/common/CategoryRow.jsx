import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { motion } from 'framer-motion';
import { HiArrowRight, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import BrandCard from './BrandCard';

/**
 * CategoryRow — horizontal scrolling row of brand cards for a category
 *
 * Figma specs:
 *   - Section heading "Fashion →" style (left-aligned, clickable)
 *   - Horizontal row of 5–6 brand cards (scrollable on mobile)
 *   - Arrow nav buttons on hover (desktop)
 *   - Gap between cards: 16–24px
 *   - Section bottom spacing: 48px
 */

export default function CategoryRow({ title, slug, creators, className }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.7;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
    // Delay state update to wait for scroll to complete
    setTimeout(updateScrollState, 350);
  };

  return (
    <section className={classnames('relative group/row', className)}>
      {/* Header: Category name + arrow */}
      <div className="flex items-center justify-between mb-5">
        <Link
          to={`/categories/${slug}`}
          className="section-heading group/link"
        >
          {title}
          <HiArrowRight className="w-5 h-5 transition-transform duration-200 group-hover/link:translate-x-1" />
        </Link>
      </div>

      {/* Scroll container */}
      <div className="relative">
        {/* Left scroll button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className={classnames(
              'absolute -left-3 top-1/2 -translate-y-1/2 z-10',
              'w-10 h-10 rounded-full',
              'bg-white shadow-md',
              'flex items-center justify-center',
              'opacity-0 group-hover/row:opacity-100',
              'transition-opacity duration-200',
              'hover:shadow-lg hover:scale-105',
              'cursor-pointer'
            )}
            aria-label="Scroll left"
          >
            <HiChevronLeft className="w-5 h-5 text-text-primary" />
          </button>
        )}

        {/* Cards row */}
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className={classnames(
            'flex gap-4 overflow-x-auto scrollbar-hide',
            'pb-2', // space for card shadow
            'snap-x snap-mandatory',
            'scroll-smooth'
          )}
        >
          {creators.map((creator, index) => (
            <motion.div
              key={creator.id}
              className="snap-start shrink-0 w-[160px] sm:w-[180px] md:w-[200px]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.35, ease: 'easeOut' }}
            >
              <BrandCard creator={creator} />
            </motion.div>
          ))}
        </div>

        {/* Right scroll button */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className={classnames(
              'absolute -right-3 top-1/2 -translate-y-1/2 z-10',
              'w-10 h-10 rounded-full',
              'bg-white shadow-md',
              'flex items-center justify-center',
              'opacity-0 group-hover/row:opacity-100',
              'transition-opacity duration-200',
              'hover:shadow-lg hover:scale-105',
              'cursor-pointer'
            )}
            aria-label="Scroll right"
          >
            <HiChevronRight className="w-5 h-5 text-text-primary" />
          </button>
        )}
      </div>
    </section>
  );
}
