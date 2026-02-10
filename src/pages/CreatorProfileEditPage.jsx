import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '@components/layout';
import { Button, Card, Input } from '@components/common';
import { useAuth } from '@context/AuthContext';
import mockCreators from '@data/mockCreators';
import { CATEGORIES, PLATFORMS, PLATFORM_LABELS } from '@utils/constants';
import {
  HiCamera,
  HiUser,
  HiLink,
  HiCog,
  HiCheck,
  HiArrowLeft,
} from 'react-icons/hi';
import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from 'react-icons/fa';

const CATEGORY_OPTIONS = Object.values(CATEGORIES);

const PLATFORM_LIST = [
  { key: PLATFORMS.INSTAGRAM, label: 'Instagram', icon: FaInstagram, color: '#E4405F' },
  { key: PLATFORMS.TIKTOK, label: 'TikTok', icon: FaTiktok, color: '#000000' },
  { key: PLATFORMS.YOUTUBE, label: 'YouTube', icon: FaYoutube, color: '#FF0000' },
  { key: PLATFORMS.QVC, label: 'QVC', color: '#2563EB' },
];

export default function CreatorProfileEditPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const creator = useMemo(() => {
    if (!currentUser?.linkedCreatorId) return null;
    return mockCreators.find((c) => c.id === currentUser.linkedCreatorId) ?? null;
  }, [currentUser]);

  // ── Form state initialised from creator data ───────────────
  const [form, setForm] = useState(() => ({
    name: creator?.name ?? '',
    bio: creator?.bio ?? '',
    category: creator?.category ?? CATEGORY_OPTIONS[0],
    instagram: creator?.socialLinks?.instagram ?? '',
    tiktok: creator?.socialLinks?.tiktok ?? '',
    youtube: creator?.socialLinks?.youtube ?? '',
    qvc: creator?.socialLinks?.qvc ?? '',
    defaultPlatforms: creator?.currentLivePlatforms ?? [],
  }));

  const [saved, setSaved] = useState(false);

  // ── Handlers ───────────────────────────────────────────────
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  }, []);

  const togglePlatform = useCallback((platform) => {
    setForm((prev) => {
      const has = prev.defaultPlatforms.includes(platform);
      return {
        ...prev,
        defaultPlatforms: has
          ? prev.defaultPlatforms.filter((p) => p !== platform)
          : [...prev.defaultPlatforms, platform],
      };
    });
    setSaved(false);
  }, []);

  const handleSave = useCallback(
    (e) => {
      e.preventDefault();
      if (!creator) return;

      // Update in-memory mock data
      const idx = mockCreators.findIndex((c) => c.id === creator.id);
      if (idx !== -1) {
        mockCreators[idx] = {
          ...mockCreators[idx],
          name: form.name,
          bio: form.bio,
          category: form.category,
          socialLinks: {
            instagram: form.instagram,
            tiktok: form.tiktok,
            youtube: form.youtube,
            qvc: form.qvc,
          },
          currentLivePlatforms: form.defaultPlatforms,
        };
      }

      setSaved(true);
      // Auto-dismiss success message
      setTimeout(() => setSaved(false), 4000);
    },
    [creator, form]
  );

  if (!creator) {
    return (
      <PageLayout>
        <section className="container-app py-16 text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-2">No creator profile found</h1>
          <p className="text-text-secondary">Your account isn't connected to a creator profile.</p>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="bg-bg-light min-h-screen">
        <div className="container-app py-8 md:py-12 max-w-3xl mx-auto flex flex-col gap-6">

          {/* ═══ PAGE HEADER ════════════════════════════════════ */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white transition-colors text-text-secondary hover:text-text-primary"
              aria-label="Back to dashboard"
            >
              <HiArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-text-primary">
                Edit Profile
              </h1>
              <p className="text-text-secondary text-sm">Update your brand information and settings.</p>
            </div>
          </div>

          {/* ═══ SUCCESS BANNER ═════════════════════════════════ */}
          {saved && (
            <div className="flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 text-green-800 px-4 py-3 text-sm font-medium animate-fade-in">
              <HiCheck className="w-5 h-5 text-green-600 shrink-0" />
              Your profile has been saved successfully!
            </div>
          )}

          <form onSubmit={handleSave} className="flex flex-col gap-6">

            {/* ═══ 1. PROFILE IMAGES ═══════════════════════════ */}
            <Card variant="default" className="p-6">
              <SectionHeader icon={HiCamera} title="Profile Images" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                {/* Profile Picture */}
                <div>
                  <p className="text-sm font-medium text-text-primary mb-2">Profile Picture</p>
                  <div className="relative group w-28 h-28 rounded-full bg-bg-lighter border-2 border-dashed border-border-light flex items-center justify-center overflow-hidden cursor-pointer hover:border-primary transition-colors">
                    {creator.profilePicture ? (
                      <img
                        src={creator.profilePicture}
                        alt={creator.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <HiCamera className="w-6 h-6 text-white" />
                    </div>
                    {/* Fallback initials when no image */}
                    {!creator.profilePicture && (
                      <span className="text-2xl font-bold text-text-secondary">
                        {creator.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-light mt-2">Click to upload (UI only)</p>
                </div>

                {/* Cover Image */}
                <div>
                  <p className="text-sm font-medium text-text-primary mb-2">Cover Image</p>
                  <div className="relative group h-28 w-full rounded-xl bg-bg-lighter border-2 border-dashed border-border-light flex items-center justify-center overflow-hidden cursor-pointer hover:border-primary transition-colors">
                    {creator.coverImage ? (
                      <img
                        src={creator.coverImage}
                        alt="Cover"
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <HiCamera className="w-6 h-6 text-white" />
                    </div>
                    {!creator.coverImage && (
                      <span className="text-sm text-text-light">Upload cover image</span>
                    )}
                  </div>
                  <p className="text-xs text-text-light mt-2">Recommended: 1200×400 (UI only)</p>
                </div>
              </div>
            </Card>

            {/* ═══ 2. BASIC INFO ═══════════════════════════════ */}
            <Card variant="default" className="p-6">
              <SectionHeader icon={HiUser} title="Basic Information" />
              <div className="flex flex-col gap-4 mt-4">
                <Input
                  label="Brand Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your brand or creator name"
                  required
                />

                {/* Textarea (custom since Input component doesn't support textarea) */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="bio" className="text-sm font-medium text-text-primary">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={form.bio}
                    onChange={handleChange}
                    placeholder="Tell your audience about your brand…"
                    className="w-full rounded-[var(--radius-card-sm)] border border-border-input bg-bg-input px-4 py-3 text-base text-text-primary placeholder:text-text-light outline-none transition-all duration-150 focus:border-border-focus focus:shadow-[var(--shadow-input-focus)] resize-none"
                  />
                </div>

                {/* Category Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="category" className="text-sm font-medium text-text-primary">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full h-12 rounded-[var(--radius-input)] border border-border-input bg-bg-input px-4 text-base text-text-primary outline-none transition-all duration-150 focus:border-border-focus focus:shadow-[var(--shadow-input-focus)] cursor-pointer appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M3 5l3 3 3-3H3z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 16px center',
                    }}
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>

            {/* ═══ 3. SOCIAL LINKS ═════════════════════════════ */}
            <Card variant="default" className="p-6">
              <SectionHeader icon={HiLink} title="Social Links" />
              <div className="flex flex-col gap-4 mt-4">
                <SocialInput
                  icon={FaInstagram}
                  color="#E4405F"
                  label="Instagram URL"
                  name="instagram"
                  value={form.instagram}
                  onChange={handleChange}
                  placeholder="https://www.instagram.com/yourhandle"
                />
                <SocialInput
                  icon={FaTiktok}
                  color="#000000"
                  label="TikTok URL"
                  name="tiktok"
                  value={form.tiktok}
                  onChange={handleChange}
                  placeholder="https://www.tiktok.com/@yourhandle"
                />
                <SocialInput
                  icon={FaYoutube}
                  color="#FF0000"
                  label="YouTube URL"
                  name="youtube"
                  value={form.youtube}
                  onChange={handleChange}
                  placeholder="https://www.youtube.com/@yourchannel"
                />
                <SocialInput
                  icon={null}
                  color="#2563EB"
                  label="QVC URL"
                  name="qvc"
                  value={form.qvc}
                  onChange={handleChange}
                  placeholder="https://www.qvc.com/yourstore"
                  qvc
                />
              </div>
            </Card>

            {/* ═══ 4. LIVE SETTINGS ════════════════════════════ */}
            <Card variant="default" className="p-6">
              <SectionHeader icon={HiCog} title="Live Settings" />

              {/* Default Platforms */}
              <div className="mt-4">
                <p className="text-sm font-medium text-text-primary mb-3">Default Streaming Platforms</p>
                <div className="flex flex-wrap gap-3">
                  {PLATFORM_LIST.map(({ key, label, icon: PIcon, color }) => {
                    const active = form.defaultPlatforms.includes(key);
                    return (
                      <label
                        key={key}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer select-none transition-all duration-200 ${
                          active
                            ? 'border-primary bg-primary-50 shadow-sm'
                            : 'border-border-light bg-white hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={active}
                          onChange={() => togglePlatform(key)}
                          className="sr-only"
                        />
                        {PIcon ? (
                          <PIcon className="w-4 h-4" style={{ color }} />
                        ) : (
                          <span
                            className="inline-flex items-center justify-center w-4 h-4 rounded text-[10px] font-bold text-white"
                            style={{ backgroundColor: color }}
                          >
                            Q
                          </span>
                        )}
                        <span className="text-sm font-medium text-text-primary">{label}</span>
                        {active && <HiCheck className="w-4 h-4 text-primary ml-1" />}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Schedule placeholder */}
              <div className="mt-6">
                <p className="text-sm font-medium text-text-primary mb-2">Streaming Schedule</p>
                <div className="rounded-xl bg-bg-lighter border border-border-light p-4 text-center">
                  <p className="text-sm text-text-secondary">
                    Schedule management coming soon. You'll be able to set recurring stream times here.
                  </p>
                </div>
              </div>
            </Card>

            {/* ═══ 5. SAVE BUTTON ══════════════════════════════ */}
            <div className="flex items-center justify-between gap-4 pb-4">
              <Button
                variant="ghost"
                size="md"
                type="button"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </Button>
              <Button variant="primary" size="lg" type="submit">
                <HiCheck className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}

/* ─── Section Header ────────────────────────────────────────────────── */
function SectionHeader({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-2 pb-3 border-b border-border-light">
      <Icon className="w-5 h-5 text-primary" />
      <h2 className="font-heading text-lg font-bold text-text-primary">{title}</h2>
    </div>
  );
}

/* ─── Social Link Input ─────────────────────────────────────────────── */
function SocialInput({ icon: SIcon, color, label, name, value, onChange, placeholder, qvc }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-text-primary flex items-center gap-2">
        {SIcon ? (
          <SIcon className="w-4 h-4" style={{ color }} />
        ) : qvc ? (
          <span
            className="inline-flex items-center justify-center w-4 h-4 rounded text-[10px] font-bold text-white"
            style={{ backgroundColor: color }}
          >
            Q
          </span>
        ) : null}
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="url"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-12 rounded-[var(--radius-input)] border border-border-input bg-bg-input px-4 text-base text-text-primary placeholder:text-text-light outline-none transition-all duration-150 focus:border-border-focus focus:shadow-[var(--shadow-input-focus)]"
      />
    </div>
  );
}
