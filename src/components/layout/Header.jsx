import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import { HiMenu } from 'react-icons/hi';
import { ROUTES } from '@utils/constants';
import { useAuth } from '@context/AuthContext';
import { Button } from '@components/common';
import MobileMenu from './MobileMenu';

/**
 * Header Component — LiveShopMarket
 *
 * Figma specs (Homepage screenshot):
 *   - Height: 72px (var(--header-height))
 *   - Background: white (#FFFFFF)
 *   - Shadow: 0 2px 4px rgba(0,0,0,0.06) (var(--shadow-header))
 *   - Position: sticky top-0 z-50
 *   - Logo: "LiveShopMarket" — Poppins 700, ~22px, dark text
 *   - Nav links: Inter 500, 14px — "Categories", "Creators", "#Trending Now"
 *   - Right: "Sign Up" lime pill button (logged out) OR user avatar (logged in)
 *   - Mobile: hamburger menu icon replaces nav links
 */

const navLinks = [
  { label: 'Categories', to: ROUTES.CATEGORIES },
  { label: 'Creators', to: ROUTES.CREATORS },
  { label: '#Trending Now', to: ROUTES.TRENDING },
];

export default function Header() {
  const location = useLocation();
  const { isAuthenticated, currentUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <>
      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-accent focus:text-accent-text focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold focus:shadow-lg"
      >
        Skip to main content
      </a>
      <header
        className="sticky top-0 z-50 flex h-[var(--header-height)] items-center bg-bg-white"
        style={{ boxShadow: 'var(--shadow-header)' }}
      >
        <div className="container-app flex w-full items-center justify-between">
          {/* ── Logo ───────────────────────────────────── */}
          <Link
            to={ROUTES.HOME}
            className="flex-shrink-0 font-[var(--font-logo)] text-[var(--text-logo)] font-bold leading-none tracking-tight text-text-primary select-none"
            style={{ fontFamily: 'var(--font-logo)' }}
          >
            LiveShopMarket
          </Link>

          {/* ── Desktop Nav ────────────────────────────── */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map(({ label, to }) => {
              const isActive = location.pathname === to ||
                (to !== '/' && location.pathname.startsWith(to));
              return (
                <Link
                  key={to}
                  to={to}
                  className={classnames(
                    'text-sm font-medium transition-colors',
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-text-primary hover:text-primary'
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* ── Right Actions ──────────────────────────── */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              /* ── Logged-in state ─── */
              <div className="relative hidden md:block">
                <button
                  onClick={() => setUserDropdownOpen((prev) => !prev)}
                  className="inline-flex items-center justify-center gap-2 h-10 px-5 text-sm font-semibold rounded-[var(--radius-button)] bg-accent text-accent-text hover:bg-accent-hover shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-button-hover)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer select-none whitespace-nowrap font-[var(--font-heading)]"
                  aria-label="User menu"
                  aria-expanded={userDropdownOpen}
                >
                  My Account
                </button>

                {/* Dropdown */}
                {userDropdownOpen && (
                  <>
                    {/* Invisible overlay to close dropdown */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserDropdownOpen(false)}
                      aria-hidden="true"
                    />
                    <div
                      className="absolute right-0 top-full z-50 mt-2 w-52 rounded-xl bg-bg-white py-2"
                      style={{ boxShadow: 'var(--shadow-dropdown)' }}
                    >
                      <div className="border-b border-border-light px-4 pb-2 mb-1">
                        <p className="text-sm font-semibold text-text-primary">
                          {currentUser?.name}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {currentUser?.email}
                        </p>
                      </div>

                      <Link
                        to={ROUTES.SAVED}
                        className="block px-4 py-2 text-sm text-text-body hover:bg-gray-50"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        Saved Creators
                      </Link>
                      <Link
                        to={ROUTES.SETTINGS}
                        className="block px-4 py-2 text-sm text-text-body hover:bg-gray-50"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        Settings
                      </Link>

                      {currentUser?.userType === 'creator' && (
                        <Link
                          to={ROUTES.DASHBOARD}
                          className="block px-4 py-2 text-sm text-text-body hover:bg-gray-50"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          Dashboard
                        </Link>
                      )}

                      <hr className="my-1 border-border-light" />
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-left text-sm text-error hover:bg-gray-50"
                      >
                        Log Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* ── Logged-out state ─── */
              <div className="hidden items-center gap-2 md:flex">
                <Button
                  as={Link}
                  to={ROUTES.SIGN_UP}
                  variant="primary"
                  size="sm"
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* ── Mobile hamburger ───────────────────── */}
            <button
              className="flex h-11 w-11 items-center justify-center rounded-full text-text-primary hover:bg-gray-100 md:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <HiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
