import { useState, useMemo, useCallback } from 'react';
import { searchCreators } from '@utils/filterHelpers';

/**
 * useSearch — custom hook for search functionality.
 *
 * Filters a `creators` array by matching the search term against
 * each creator's name, bio, and category.
 *
 * Returns:
 *   - searchTerm        — current query string
 *   - setSearchTerm     — setter
 *   - clearSearch       — resets the term to ''
 *   - filteredCreators  — creators that match the term
 *   - isSearching       — true when a non-empty term is active
 */
export default function useSearch(creators = []) {
  const [searchTerm, setSearchTerm] = useState('');

  const isSearching = searchTerm.trim().length > 0;

  const filteredCreators = useMemo(
    () => searchCreators(creators, searchTerm),
    [creators, searchTerm]
  );

  const clearSearch = useCallback(() => setSearchTerm(''), []);

  return {
    searchTerm,
    setSearchTerm,
    clearSearch,
    filteredCreators,
    isSearching,
  };
}
