import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTES } from '@utils/constants';
import { useAuth } from '@context/AuthContext';
import { Button } from '@components/common';

/**
 * MobileMenu — Slide-out drawer for mobile navigation.
 *
 * Props:
 *   - isOpen   : boolean
 *   - onClose  : () => void
 */

const navLinks = [
  { label: 'Home', to: ROUTES.HOME },
  { label: 'Categories', to: ROUTES.CATEGORIES },
  { label: '#Trending Now', to: ROUTES.TRENDING },
  { label: 'Creators', to: ROUTES.CREATORS },
];

export default function MobileMenu({ isOpen, onClose }) {
  const location = useLocation();
  const { isAuthenticated, currentUser, userType, logout } = useAuth();

  // Close menu on route change
  useEffect(() => {
    if (isOpen) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Overlay ─────────────────────────────────── */}
          <motion.div
            className="fixed inset-0 z-[998] bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* ── Drawer ──────────────────────────────────── */}
          <motion.aside
            className="fixed top-0 right-0 z-[999] flex h-full w-[280px] flex-col bg-bg-white shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {/* Close button */}
            <div className="flex items-center justify-end p-4">
              <button
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-full text-text-secondary hover:bg-gray-100 hover:text-text-primary"
                aria-label="Close menu"
              >
                <HiX className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex flex-1 flex-col gap-1 px-4">
              {navLinks.map(({ label, to }) => {
                const isActive = location.pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary font-semibold'
                        : 'text-text-primary hover:bg-gray-50'
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}

              {/* Authenticated-only links */}
              {isAuthenticated && (
                <>
                  <hr className="my-2 border-border-light" />

                  {userType === 'creator' && (
                    <Link
                      to={ROUTES.DASHBOARD}
                      className="rounded-lg px-4 py-3 text-base font-medium text-text-primary hover:bg-gray-50"
                    >
                      Dashboard
                    </Link>
                  )}

                  <Link
                    to={ROUTES.SAVED}
                    className="rounded-lg px-4 py-3 text-base font-medium text-text-primary hover:bg-gray-50"
                  >
                    Saved Creators
                  </Link>

                  <Link
                    to={ROUTES.SETTINGS}
                    className="rounded-lg px-4 py-3 text-base font-medium text-text-primary hover:bg-gray-50"
                  >
                    Settings
                  </Link>
                </>
              )}
            </nav>

            {/* Bottom section — auth buttons */}
            <div className="border-t border-border-light p-4">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <p className="text-sm text-text-secondary">
                    Signed in as{' '}
                    <span className="font-semibold text-text-primary">
                      {currentUser?.name}
                    </span>
                  </p>
                  <Button
                    variant="secondary"
                    size="md"
                    fullWidth
                    onClick={logout}
                  >
                    Log Out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button
                    as={Link}
                    to={ROUTES.SIGN_UP}
                    variant="primary"
                    size="md"
                    fullWidth
                  >
                    Sign Up
                  </Button>
                  <Button
                    as={Link}
                    to={ROUTES.LOGIN}
                    variant="ghost"
                    size="md"
                    fullWidth
                  >
                    Log In
                  </Button>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
