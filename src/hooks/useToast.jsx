import { useState, useCallback, useEffect, useRef } from 'react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import classnames from 'classnames';

/**
 * useToast — lightweight hook that mounts a single toast notification.
 *
 * Returns { showToast, ToastContainer }.
 * Render <ToastContainer /> once at the top of the component tree
 * (e.g. inside PageLayout or main App root).
 */
export function useToast({ duration = 2200 } = {}) {
  const [toast, setToast] = useState(null); // { message, type }
  const timerRef = useRef(null);

  const showToast = useCallback(
    (message, type = 'info') => {
      // Clear any existing timer so consecutive toasts don't vanish early
      if (timerRef.current) clearTimeout(timerRef.current);
      setToast({ message, type, key: Date.now() });
      timerRef.current = setTimeout(() => setToast(null), duration);
    },
    [duration]
  );

  useEffect(() => () => clearTimeout(timerRef.current), []);

  function ToastContainer() {
    if (!toast) return null;

    const isSaved = toast.type === 'saved';

    return (
      <div
        key={toast.key}
        role="status"
        aria-live="polite"
        className={classnames(
          'fixed top-20 left-1/2 -translate-x-1/2 z-[9999]',
          'inline-flex items-center gap-2',
          'px-5 py-3 rounded-full',
          'text-sm font-medium shadow-[var(--shadow-toast)]',
          'animate-slide-down pointer-events-none select-none',
          isSaved
            ? 'bg-orange-50 text-orange-800 border border-orange-200'
            : 'bg-gray-50 text-gray-700 border border-gray-200'
        )}
      >
        {isSaved ? (
          <HiHeart className="w-4 h-4 text-favorite shrink-0" />
        ) : (
          <HiOutlineHeart className="w-4 h-4 text-gray-400 shrink-0" />
        )}
        {toast.message}
      </div>
    );
  }

  return { showToast, ToastContainer };
}

export default useToast;
