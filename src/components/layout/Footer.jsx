import { Link } from 'react-router-dom';
import { ROUTES, CATEGORIES, CATEGORY_SLUGS } from '@utils/constants';
import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaFacebookF,
  FaEnvelope,
} from 'react-icons/fa';

/**
 * Footer Component — LiveShopMarket
 *
 * Figma: footer is not prominently shown in the provided screenshots,
 * so this is a clean, minimal design matching the site's style tokens:
 *   - Dark background (--color-bg-dark / #1A1A2E)
 *   - White/light text
 *   - 4-column grid: Brand, Categories, Company, Social
 *   - Bottom bar: copyright
 */

const categoryLinks = [
  { label: CATEGORIES.FASHION, to: `/categories/${CATEGORY_SLUGS[CATEGORIES.FASHION]}` },
  { label: CATEGORIES.TECH_GADGETS, to: `/categories/${CATEGORY_SLUGS[CATEGORIES.TECH_GADGETS]}` },
  { label: CATEGORIES.BEAUTY_PERSONAL_CARE, to: `/categories/${CATEGORY_SLUGS[CATEGORIES.BEAUTY_PERSONAL_CARE]}` },
  { label: CATEGORIES.WELLNESS, to: `/categories/${CATEGORY_SLUGS[CATEGORIES.WELLNESS]}` },
  { label: CATEGORIES.SPORTS_FITNESS, to: `/categories/${CATEGORY_SLUGS[CATEGORIES.SPORTS_FITNESS]}` },
];

const companyLinks = [
  { label: 'About', to: '#' },
  { label: 'Careers', to: '#' },
  { label: 'Privacy Policy', to: '#' },
  { label: 'Terms of Service', to: '#' },
  { label: 'Contact', to: '#' },
];

const socialLinks = [
  { label: 'Instagram', icon: FaInstagram, href: 'https://instagram.com' },
  { label: 'TikTok', icon: FaTiktok, href: 'https://tiktok.com' },
  { label: 'YouTube', icon: FaYoutube, href: 'https://youtube.com' },
  { label: 'Facebook', icon: FaFacebookF, href: 'https://facebook.com' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-dark text-text-inverse">
      {/* ── Main Grid ──────────────────────────────── */}
      <div className="container-app py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <Link
              to={ROUTES.HOME}
              className="mb-4 inline-block text-xl font-bold tracking-tight"
              style={{ fontFamily: 'var(--font-logo)' }}
            >
              LiveShopMarket
            </Link>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-gray-400">
              Discover live shopping experiences from your favorite brands and
              creators. Never miss a drop, demo, or deal.
            </p>

            {/* Newsletter mini-form */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="relative flex-1">
                <FaEnvelope className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" aria-hidden="true" />
                <input
                  type="email"
                  placeholder="Your email"
                  aria-label="Email for newsletter"
                  className="h-10 w-full rounded-full bg-gray-800 pl-9 pr-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button className="h-10 rounded-full bg-accent px-4 text-sm font-semibold text-accent-text transition-colors hover:bg-accent-hover w-full sm:w-auto">
                Subscribe
              </button>
            </div>
          </div>

          {/* Categories column */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Categories
            </h4>
            <ul className="space-y-2.5">
              {categoryLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social column */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Follow Us
            </h4>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-300 transition-colors hover:bg-primary hover:text-white"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
                For Creators
              </h4>
              <Link
                to={ROUTES.SIGN_UP}
                className="inline-block rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-text transition-colors hover:bg-accent-hover"
              >
                Join as Creator
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ─────────────────────────────── */}
      <div className="border-t border-gray-800">
        <div className="container-app flex flex-col items-center justify-between gap-3 py-5 sm:flex-row">
          <p className="text-xs text-gray-500">
            &copy; {currentYear} LiveShopMarket. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="#"
              className="text-xs text-gray-500 transition-colors hover:text-gray-300"
            >
              Privacy
            </Link>
            <Link
              to="#"
              className="text-xs text-gray-500 transition-colors hover:text-gray-300"
            >
              Terms
            </Link>
            <Link
              to="#"
              className="text-xs text-gray-500 transition-colors hover:text-gray-300"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
