import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HiOutlineUser,
  HiOutlineBell,
  HiOutlineLockClosed,
  HiOutlineLogout,
  HiOutlineCamera,
  HiOutlineShieldCheck,
} from 'react-icons/hi';
import { PageLayout } from '@components/layout';
import { Button, Avatar, Input } from '@components/common';
import { useAuth } from '@context/AuthContext';

// ──────────────────────────────────────────────────────────────────────
// Toggle switch (UI-only)
// ──────────────────────────────────────────────────────────────────────
function Toggle({ enabled, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between py-3 sm:py-4 gap-4">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary">{label}</p>
        {description && (
          <p className="text-xs text-text-secondary mt-0.5 leading-snug">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`
          relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer
          rounded-full border-2 border-transparent
          transition-colors duration-200 ease-in-out
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2
          ${enabled ? 'bg-primary' : 'bg-gray-200'}
        `}
      >
        <span
          className={`
            pointer-events-none inline-block h-5 w-5 transform
            rounded-full bg-white shadow ring-0
            transition duration-200 ease-in-out
            ${enabled ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Section wrapper
// ──────────────────────────────────────────────────────────────────────
function Section({ icon: Icon, title, children }) {
  return (
    <div className="bg-bg-card rounded-[var(--radius-card)] border border-border-light shadow-[var(--shadow-card)] overflow-hidden">
      {/* Section header */}
      <div className="flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b border-border-light bg-bg-lighter">
        {Icon && <Icon className="w-5 h-5 text-primary shrink-0" />}
        <h2 className="font-[var(--font-heading)] text-base md:text-lg font-semibold text-text-heading truncate">
          {title}
        </h2>
      </div>
      {/* Section body */}
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// SETTINGS PAGE
// ──────────────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // ── Notification toggles (UI only) ──────────────────────
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    liveAlerts: true,
  });

  const handleNotifChange = useCallback((key) => {
    return (val) =>
      setNotifications((prev) => ({ ...prev, [key]: val }));
  }, []);

  // ── Password fields (UI only) ──────────────────────────
  const [passwords, setPasswords] = useState({
    current: '',
    newPass: '',
    confirm: '',
  });

  // ── Privacy toggle (UI only) ──────────────────────────
  const [privacyPublic, setPrivacyPublic] = useState(true);

  // ── Logout handler ─────────────────────────────────────
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <PageLayout>
      <div className="container-app py-8 sm:py-10 md:py-14 max-w-2xl mx-auto">
        {/* ── Page Header ─────────────────────────────────── */}
        <h1 className="font-[var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold text-text-heading leading-tight mb-6 sm:mb-8 md:mb-10">
          Settings
        </h1>

        <div className="space-y-6">
          {/* ══════════════════════════════════════════════════
              PROFILE SECTION
              ══════════════════════════════════════════════════ */}
          <Section icon={HiOutlineUser} title="Profile">
            {/* Avatar + upload placeholder */}
            <div className="flex items-center gap-5 mb-6">
              <div className="relative">
                <Avatar
                  src={currentUser?.profilePicture}
                  name={currentUser?.name}
                  size="lg"
                  border
                />
                {/* Camera overlay (UI only) */}
                <button
                  type="button"
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full
                             bg-primary text-white
                             flex items-center justify-center
                             shadow-md hover:bg-primary-dark
                             transition-colors duration-200"
                  aria-label="Change profile picture"
                >
                  <HiOutlineCamera className="w-4 h-4" />
                </button>
              </div>

              <div>
                <p className="text-lg font-semibold text-text-primary">
                  {currentUser?.name ?? 'User'}
                </p>
                <p className="text-sm text-text-secondary">
                  {currentUser?.userType === 'creator' ? 'Creator Account' : 'Buyer Account'}
                </p>
              </div>
            </div>

            {/* Read-only fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1 pl-1">
                  Display Name
                </label>
                <input
                  type="text"
                  readOnly
                  value={currentUser?.name ?? ''}
                  className="w-full h-12 bg-bg-lighter border border-border-light
                             rounded-[var(--radius-input)] px-4 text-sm text-text-primary
                             cursor-default focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1 pl-1">
                  Email
                </label>
                <input
                  type="email"
                  readOnly
                  value={currentUser?.email ?? ''}
                  className="w-full h-12 bg-bg-lighter border border-border-light
                             rounded-[var(--radius-input)] px-4 text-sm text-text-primary
                             cursor-default focus:outline-none"
                />
              </div>
            </div>

            {/* Edit Profile CTA (buyers only) */}
            {currentUser?.userType !== 'creator' && (
              <div className="mt-5">
                <Button variant="secondary" size="md">
                  Edit Profile
                </Button>
              </div>
            )}
          </Section>

          {/* ══════════════════════════════════════════════════
              NOTIFICATION PREFERENCES
              ══════════════════════════════════════════════════ */}
          <Section icon={HiOutlineBell} title="Notification Preferences">
            <div className="divide-y divide-border-light">
              <Toggle
                label="Email Notifications"
                description="Receive updates and promotions via email"
                enabled={notifications.email}
                onChange={handleNotifChange('email')}
              />
              <Toggle
                label="Push Notifications"
                description="Get browser and mobile push alerts"
                enabled={notifications.push}
                onChange={handleNotifChange('push')}
              />
              <Toggle
                label="Live Stream Alerts"
                description="Be notified when your saved brands go live"
                enabled={notifications.liveAlerts}
                onChange={handleNotifChange('liveAlerts')}
              />
            </div>
          </Section>

          {/* ══════════════════════════════════════════════════
              ACCOUNT SETTINGS
              ══════════════════════════════════════════════════ */}
          <Section icon={HiOutlineLockClosed} title="Account Settings">
            {/* Change Password (UI only) */}
            <h3 className="text-sm font-semibold text-text-primary mb-3">
              Change Password
            </h3>
            <div className="space-y-3 mb-6">
              <Input
                type="password"
                placeholder="Current password"
                aria-label="Current password"
                value={passwords.current}
                onChange={(e) =>
                  setPasswords((p) => ({ ...p, current: e.target.value }))
                }
              />
              <Input
                type="password"
                placeholder="New password"
                aria-label="New password"
                value={passwords.newPass}
                onChange={(e) =>
                  setPasswords((p) => ({ ...p, newPass: e.target.value }))
                }
              />
              <Input
                type="password"
                placeholder="Confirm new password"
                aria-label="Confirm new password"
                value={passwords.confirm}
                onChange={(e) =>
                  setPasswords((p) => ({ ...p, confirm: e.target.value }))
                }
              />
              <Button variant="secondary" size="md" disabled>
                Update Password
              </Button>
            </div>

            {/* Privacy Settings */}
            <div className="border-t border-border-light pt-5">
              <div className="flex items-center gap-2 mb-3">
                <HiOutlineShieldCheck className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-text-primary">
                  Privacy
                </h3>
              </div>
              <Toggle
                label="Public Profile"
                description="Allow others to see your saved creators and activity"
                enabled={privacyPublic}
                onChange={setPrivacyPublic}
              />
            </div>
          </Section>

          {/* ══════════════════════════════════════════════════
              LOGOUT
              ══════════════════════════════════════════════════ */}
          <div className="bg-bg-card rounded-[var(--radius-card)] border border-red-200 shadow-[var(--shadow-card)] overflow-hidden">
            <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-[var(--font-heading)] text-base font-semibold text-error">
                  Log Out
                </h2>
                <p className="text-xs text-text-secondary mt-0.5">
                  You will be signed out and redirected to the homepage.
                </p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 h-10 px-5
                           rounded-[var(--radius-button)]
                           bg-error text-white text-sm font-semibold
                           shadow-[var(--shadow-button)]
                           hover:bg-red-600 hover:shadow-[var(--shadow-button-hover)]
                           hover:-translate-y-0.5
                           active:translate-y-0
                           transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-error/30"
              >
                <HiOutlineLogout className="w-4 h-4" />
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
