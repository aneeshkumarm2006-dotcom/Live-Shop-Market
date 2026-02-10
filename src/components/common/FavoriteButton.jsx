import { useState } from 'react';
import classnames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';

/**
 * FavoriteButton Component — LiveShopMarket Design System
 *
 * Toggleable heart icon for favoriting/bookmarking creators.
 * Used on: Creator cards (top-right corner), Brand Profile page.
 *
 * Figma specs:
 *   - Unfilled: outline heart, #D1D5DB color
 *   - Filled: solid heart, #F59E0B (orange/amber)
 *   - Animation: scale pop on toggle (heart-pop keyframe)
 *   - Hover: slight scale up
 *   - Position: typically absolute, top-right of card
 */

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
};

const buttonSizeMap = {
  sm: 'w-7 h-7',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
  xl: 'w-12 h-12',
};

export default function FavoriteButton({
  isFavorite: controlledFavorite,
  onClick,
  size = 'md',
  className,
  showBackground = true,
}) {
  const [internalFav, setInternalFav] = useState(false);
  const [animating, setAnimating] = useState(false);

  const isControlled = controlledFavorite !== undefined;
  const isFav = isControlled ? controlledFavorite : internalFav;

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent card click
    e.preventDefault();

    const newState = !isFav;

    if (!isControlled) setInternalFav(newState);

    // Trigger pop animation
    setAnimating(true);
    setTimeout(() => setAnimating(false), 400);

    onClick?.(newState, e);
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      className={classnames(
        'inline-flex items-center justify-center',
        'rounded-full',
        'transition-colors duration-200 ease-in-out',
        'focus:outline-none focus:ring-2 focus:ring-favorite/30',
        'cursor-pointer',
        // Background
        showBackground && [
          'bg-white/90 backdrop-blur-sm',
          'shadow-[var(--shadow-sm)]',
          'hover:bg-white',
        ],
        // Size
        buttonSizeMap[size],
        // User overrides
        className
      )}
      aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={isFav}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isFav ? (
          <motion.span
            key="filled"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.35, 1], opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 400, damping: 15 }}
            className="inline-flex"
          >
            <HiHeart
              className={classnames(
                sizeMap[size],
                'text-favorite',
                'drop-shadow-sm'
              )}
            />
          </motion.span>
        ) : (
          <motion.span
            key="outline"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: [0.9, 1], opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="inline-flex"
          >
            <HiOutlineHeart
              className={classnames(
                sizeMap[size],
                'text-heart-outline',
                'hover:text-favorite/60',
                'transition-colors duration-200'
              )}
            />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
