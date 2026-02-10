// ─── Filter & Sort Helpers ───────────────────────────────────────────
// Centralised utilities used by category pages, homepage search, and
// the CreatorsPage.  Functions are pure — they never mutate the input
// array.

/**
 * Filter creators whose `category` matches `category`.
 * Pass `null` / `undefined` / `'all'` to skip filtering.
 */
export function filterByCategory(creators, category) {
  if (!category || category === 'all') return creators;
  return creators.filter((c) => c.category === category);
}

/**
 * Filter creators that have a non-empty social-link for the given
 * platform key (e.g. `'instagram'`).
 * Pass `'all'` or falsy to skip.
 */
export function filterByPlatform(creators, platform) {
  if (!platform || platform === 'all') return creators;
  return creators.filter((c) => {
    const links = c.socialLinks || {};
    return !!links[platform];
  });
}

/**
 * Return only creators whose `isLive` flag is true.
 * When `liveOnly` is false / falsy the original array is returned.
 */
export function filterByLiveStatus(creators, liveOnly) {
  if (!liveOnly) return creators;
  return creators.filter((c) => c.isLive);
}

/**
 * Full-text-ish search across creator name, bio, and category.
 * Case-insensitive.  Returns everything when `searchTerm` is blank.
 */
export function searchCreators(creators, searchTerm) {
  if (!searchTerm || !searchTerm.trim()) return creators;
  const q = searchTerm.trim().toLowerCase();
  return creators.filter((c) => {
    const name = (c.name || '').toLowerCase();
    const bio = (c.bio || '').toLowerCase();
    const category = (c.category || '').toLowerCase();
    return name.includes(q) || bio.includes(q) || category.includes(q);
  });
}

/**
 * Sort an array of creators. Returns a **new** sorted array.
 *
 * Supported `sortBy` values:
 *   - `'popular'`  — by followers (desc)
 *   - `'newest'`   — by joinedDate (desc), falls back to id
 *   - `'viewers'`  — by monthlyViewers (desc)
 *   - `'az'`       — alphabetical A → Z
 *   - anything else → original order
 */
export function sortCreators(creators, sortBy) {
  const sorted = [...creators];
  switch (sortBy) {
    case 'popular':
      return sorted.sort((a, b) => (b.stats?.followers ?? 0) - (a.stats?.followers ?? 0));
    case 'newest':
      return sorted.sort((a, b) => {
        // Prefer joinedDate if present
        if (a.joinedDate && b.joinedDate) {
          return new Date(b.joinedDate) - new Date(a.joinedDate);
        }
        // Fallback: higher id = newer
        return (b.id > a.id ? 1 : -1);
      });
    case 'viewers':
      return sorted.sort((a, b) => (b.stats?.monthlyViewers ?? 0) - (a.stats?.monthlyViewers ?? 0));
    case 'az':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
}

/**
 * Apply the full filter + sort pipeline in the correct order:
 *  1. Category   → 2. Platform  → 3. Live status
 *  4. Search     → 5. Sort
 *
 * `filters` shape:
 *   {
 *     category?:   string,
 *     platform?:   string,
 *     liveOnly?:   boolean,
 *     search?:     string,
 *     sortBy?:     string,   // default 'popular'
 *   }
 */
export function applyAllFilters(creators, filters = {}) {
  const {
    category,
    platform,
    liveOnly,
    search,
    sortBy = 'popular',
  } = filters;

  let results = creators;
  results = filterByCategory(results, category);
  results = filterByPlatform(results, platform);
  results = filterByLiveStatus(results, liveOnly);
  results = searchCreators(results, search);
  results = sortCreators(results, sortBy);
  return results;
}
