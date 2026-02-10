import { useState, useEffect, useCallback } from 'react';

/**
 * useSavedCreators — Custom hook for managing saved/favorited creators.
 *
 * Persists saved creator IDs to localStorage under 'saved_creators'.
 * Uses a custom DOM event ('saved_creators_changed') so every mounted
 * instance of this hook stays in sync across the app.
 *
 * @returns {{
 *   savedCreators: string[],
 *   saveCreator: (id: string) => void,
 *   unsaveCreator: (id: string) => void,
 *   isCreatorSaved: (id: string) => boolean,
 *   toggleSaveCreator: (id: string) => { saved: boolean },
 * }}
 */

const STORAGE_KEY = 'saved_creators';
const SYNC_EVENT = 'saved_creators_changed';

/** Read the saved IDs array from localStorage */
function getSavedCreators() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    /* corrupt data – fall back to empty */
  }
  return [];
}

/** Write saved IDs to localStorage and dispatch sync event */
function persistAndNotify(nextIds) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextIds));
  window.dispatchEvent(new CustomEvent(SYNC_EVENT));
}

export default function useSavedCreators() {
  const [savedCreators, setSavedCreators] = useState(getSavedCreators);

  // Re-sync whenever another hook instance writes to localStorage
  useEffect(() => {
    const handleSync = () => setSavedCreators(getSavedCreators());
    window.addEventListener(SYNC_EVENT, handleSync);
    // Also listen for direct localStorage changes from other tabs
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY) setSavedCreators(getSavedCreators());
    });
    return () => {
      window.removeEventListener(SYNC_EVENT, handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  /** Add a creator ID to the saved list */
  const saveCreator = useCallback((creatorId) => {
    const current = getSavedCreators();
    if (current.includes(creatorId)) return;
    const next = [...current, creatorId];
    persistAndNotify(next);
    setSavedCreators(next);
  }, []);

  /** Remove a creator ID from the saved list */
  const unsaveCreator = useCallback((creatorId) => {
    const current = getSavedCreators();
    const next = current.filter((id) => id !== creatorId);
    persistAndNotify(next);
    setSavedCreators(next);
  }, []);

  /** Check if a creator is currently saved */
  const isCreatorSaved = useCallback(
    (creatorId) => savedCreators.includes(creatorId),
    [savedCreators]
  );

  /** Toggle saved status — returns { saved: boolean } */
  const toggleSaveCreator = useCallback((creatorId) => {
    const current = getSavedCreators();
    const alreadySaved = current.includes(creatorId);

    const next = alreadySaved
      ? current.filter((id) => id !== creatorId)
      : [...current, creatorId];

    persistAndNotify(next);
    setSavedCreators(next);

    return { saved: !alreadySaved };
  }, []);

  return {
    savedCreators,
    saveCreator,
    unsaveCreator,
    isCreatorSaved,
    toggleSaveCreator,
  };
}
