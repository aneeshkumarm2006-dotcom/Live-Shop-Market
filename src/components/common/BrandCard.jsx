import { useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import Card from './Card';
import Avatar from './Avatar';
import Badge from './Badge';
import FavoriteButton from './FavoriteButton';
import PlatformIcon from './PlatformIcon';
import useSavedCreators from '@hooks/useSavedCreators';
import { useToastContext } from './Toast';
import { openExternalUrl } from '@utils/platformHelpers';
import { PLATFORM_LABELS } from '@utils/constants';

/**
 * BrandCard — Homepage creator/brand card
 *
 * Figma specs:
 *   - Square/portrait card with rounded corners (16px)
 *   - Profile image centered at top (circle avatar)
 *   - Brand name below avatar
 *   - Category badge (small, colored)
 *   - LIVE badge (top-left) when currently streaming
 *   - Favorite heart (top-right)
 *   - Platform icons row at bottom
 *   - Hover: lift + stronger shadow
 */

// Get active social link platforms from a creator object
function getActivePlatforms(creator) {
  const platforms = [];
  if (creator.socialLinks) {
    Object.entries(creator.socialLinks).forEach(([key, url]) => {
      if (url) platforms.push(key);
    });
  }
  return platforms;
}

export default function BrandCard({ creator, className, onFavoriteToggle }) {
  const navigate = useNavigate();
  const { isCreatorSaved, toggleSaveCreator } = useSavedCreators();
  const { toast } = useToastContext();

  const activePlatforms = getActivePlatforms(creator);
  const saved = isCreatorSaved(creator.id);

  const handleClick = () => {
    navigate(`/brand/${creator.id}`);
  };

  /** When live badge is clicked, open the first available live link in new tab */
  const handleLiveClick = (e) => {
    e.stopPropagation();
    if (!creator.isLive || !creator.currentLiveLinks) return;
    const firstPlatform = creator.currentLivePlatforms?.[0];
    const url = firstPlatform ? creator.currentLiveLinks[firstPlatform] : null;
    if (url) {
      openExternalUrl(url);
    } else {
      navigate(`/brand/${creator.id}`);
    }
  };

  const handleFavoriteClick = (/* newState */) => {
    const result = toggleSaveCreator(creator.id);
    toast[result.saved ? 'saved' : 'removed'](
      result.saved ? 'Added to favorites' : 'Removed from favorites'
    );
    onFavoriteToggle?.(creator.id, result.saved);
  };

  return (
    <Card
      variant="default"
      hover
      onClick={handleClick}
      className={classnames(
        'relative flex flex-col items-center group card-parent',
        'min-w-0 w-full',
        className
      )}
    >
      {/* Top badges row */}
      <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
        {/* LIVE badge - top left (clickable when live) */}
        {creator.isLive ? (
          <button
            type="button"
            onClick={handleLiveClick}
            className="cursor-pointer"
            title={creator.currentLivePlatforms?.length
              ? `Watch live on ${creator.currentLivePlatforms.map(p => PLATFORM_LABELS[p] || p).join(', ')}`
              : 'Watch live'
            }
          >
            <Badge type="live" />
          </button>
        ) : (
          <span /> /* Spacer */
        )}

        {/* Favorite button - top right */}
        <FavoriteButton
          isFavorite={saved}
          onClick={handleFavoriteClick}
          size="sm"
        />
      </div>

      {/* Card body */}
      <div className="flex flex-col items-center w-full pt-8 sm:pt-10 pb-3 sm:pb-4 px-2 sm:px-3">
        {/* Profile picture */}
        <div className="overflow-hidden rounded-full mb-3">
          <Avatar
            src={creator.profilePicture}
            name={creator.name}
            size="lg"
            className="card-img-zoom"
            border
          />
        </div>

        {/* Brand name */}
        <h3 className="text-sm font-semibold text-text-primary text-center truncate w-full mb-1">
          {creator.name}
        </h3>

        {/* Category badge */}
        <Badge
          type="category"
          text={creator.category}
          category={creator.category}
          size="sm"
          className="mb-3"
        />

        {/* Platform icons */}
        {activePlatforms.length > 0 && (
          <div className="flex items-center gap-2 mt-auto">
            {activePlatforms.map((platform) => (
              <PlatformIcon
                key={platform}
                platform={platform}
                size={16}
                colored
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
