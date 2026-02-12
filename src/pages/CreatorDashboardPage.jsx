import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '@components/layout';
import { Button, Badge, Card, ExternalLink } from '@components/common';
import PlatformIcon from '@components/common/PlatformIcon';
import { useAuth } from '@context/AuthContext';
import mockCreators from '@data/mockCreators';
import { PLATFORM_LABELS } from '@utils/constants';
import { isValidSocialUrl } from '@utils/platformHelpers';
import {
  HiUsers,
  HiEye,
  HiCalendar,
  HiPencil,
  HiExternalLink,
  HiVideoCamera,
  HiClock,
  HiStar,
  HiTrendingUp,
  HiUserAdd,
  HiPlay,
  HiX,
  HiGlobe,
} from 'react-icons/hi';

// ─── Mock recent activity feed ────────────────────────────────────────
const MOCK_ACTIVITY = [
  { id: 1, icon: HiUserAdd, text: '12 new followers today', time: '2 hours ago', color: 'text-primary' },
  { id: 2, icon: HiEye, text: 'Your last stream hit 3.2k viewers', time: '5 hours ago', color: 'text-success' },
  { id: 3, icon: HiStar, text: 'You ranked #1 in your category this week', time: '1 day ago', color: 'text-warning' },
  { id: 4, icon: HiTrendingUp, text: 'Monthly viewers up 18% from last month', time: '2 days ago', color: 'text-primary' },
  { id: 5, icon: HiUserAdd, text: '47 new followers this week', time: '3 days ago', color: 'text-primary' },
  { id: 6, icon: HiPlay, text: 'Previous stream "Smart Home Gadgets" archived', time: '4 days ago', color: 'text-text-secondary' },
];

export default function CreatorDashboardPage() {
  const { currentUser } = useAuth();

  // Find the linked creator profile
  const creator = useMemo(() => {
    if (!currentUser?.linkedCreatorId) return null;
    return mockCreators.find((c) => c.id === currentUser.linkedCreatorId) ?? null;
  }, [currentUser]);

  const [isLive, setIsLive] = useState(creator?.isLive ?? false);

  if (!creator) {
    return (
      <PageLayout>
        <section className="container-app py-16 text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-2">No creator profile linked</h1>
          <p className="text-text-secondary">Your account isn't connected to a creator profile yet.</p>
        </section>
      </PageLayout>
    );
  }

  const { stats, upcomingStreams = [], currentLivePlatforms = [] } = creator;
  const displayName = creator.name || currentUser.name;

  return (
    <PageLayout>
      <div className="bg-bg-light min-h-screen">
        <div className="container-app py-6 sm:py-8 md:py-12 flex flex-col gap-6 sm:gap-8">

          {/* ═══ WELCOME SECTION ═══════════════════════════════════ */}
          <section>
            <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-1">
              Welcome back, {displayName}!
            </h1>
            <p className="text-text-secondary text-sm">
              Here's what's happening with your brand today.
            </p>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-6">
              <StatCard
                icon={HiUsers}
                label="Total Followers"
                value={stats.followers.toLocaleString()}
                trend="+2.4%"
                trendUp
              />
              <StatCard
                icon={HiEye}
                label="Monthly Viewers"
                value={stats.monthlyViewers.toLocaleString()}
                trend="+18%"
                trendUp
              />
              <StatCard
                icon={HiCalendar}
                label="Upcoming Streams"
                value={upcomingStreams.length}
              />
            </div>
          </section>

          {/* ═══ MAIN GRID: Live Status + Quick Actions ════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ── LIVE STATUS CARD ──────────────────────────────── */}
            <Card variant="default" className="lg:col-span-2 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-heading text-xl font-bold text-text-primary flex items-center gap-2">
                  <HiVideoCamera className="text-primary w-5 h-5" />
                  Live Status
                </h2>

                {/* Toggle */}
                <button
                  onClick={() => setIsLive((prev) => !prev)}
                  className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/30 ${isLive ? 'bg-live-red' : 'bg-gray-300'
                    }`}
                  role="switch"
                  aria-checked={isLive}
                  aria-label="Toggle live status"
                >
                  <span
                    className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${isLive ? 'translate-x-7' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              {isLive ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge type="live">LIVE</Badge>
                    <span className="text-sm text-text-secondary">
                      Streaming on{' '}
                      {currentLivePlatforms.map((p) => PLATFORM_LABELS[p] || p).join(', ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-text-body text-sm">
                    <HiEye className="w-4 h-4 text-text-secondary" />
                    <span className="font-semibold">1,247</span> watching now
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {currentLivePlatforms.map((p) => {
                      const liveUrl = creator.currentLiveLinks?.[p];
                      return (
                        <ExternalLink
                          key={p}
                          href={liveUrl}
                          disabled={!liveUrl}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-border-light bg-white hover:shadow-sm hover:-translate-y-0.5 transition-all no-underline text-text-primary"
                          title={`Watch on ${PLATFORM_LABELS[p]}`}
                        >
                          <PlatformIcon platform={p} size={14} />
                          {PLATFORM_LABELS[p]}
                          <HiExternalLink className="w-3 h-3 opacity-50" />
                        </ExternalLink>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-text-secondary text-sm">You are currently offline.</p>
                  {upcomingStreams.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-text-body">
                      <HiClock className="w-4 h-4 text-primary" />
                      <span>
                        Next stream:{' '}
                        <span className="font-semibold">{upcomingStreams[0].title}</span>{' '}
                        — {upcomingStreams[0].date} at {upcomingStreams[0].time}
                      </span>
                    </div>
                  )}
                  <Button variant="primary" size="lg" onClick={() => setIsLive(true)}>
                    <HiPlay className="w-4 h-4" />
                    Go Live
                  </Button>
                </div>
              )}
            </Card>

            {/* ── QUICK ACTIONS ─────────────────────────────────── */}
            <Card variant="default" className="p-6 flex flex-col gap-4">
              <h2 className="font-heading text-xl font-bold text-text-primary">Quick Actions</h2>
              <div className="flex flex-col gap-3 flex-1">
                <Link to="/creator/profile/edit">
                  <Button variant="secondary" size="md" fullWidth className="justify-start">
                    <HiPencil className="w-4 h-4" />
                    Edit Profile
                  </Button>
                </Link>
                <Button variant="secondary" size="md" fullWidth className="justify-start">
                  <HiCalendar className="w-4 h-4" />
                  Schedule Stream
                </Button>
                <Link to={`/brand/${creator.id}`}>
                  <Button variant="ghost" size="md" fullWidth className="justify-start text-primary">
                    <HiExternalLink className="w-4 h-4" />
                    View My Public Profile
                  </Button>
                </Link>
              </div>

              {/* Social Links Preview */}
              {creator.socialLinks && Object.entries(creator.socialLinks).some(([, url]) => url) && (
                <div className="border-t border-border-light pt-4 mt-1">
                  <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <HiGlobe className="w-3.5 h-3.5" />
                    Social Links
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(creator.socialLinks)
                      .filter(([, url]) => url && url.trim() !== '')
                      .map(([platform, url]) => (
                        <ExternalLink
                          key={platform}
                          href={url}
                          disabled={!isValidSocialUrl(url)}
                          platform={platform}
                          showExternal
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-border-light bg-white hover:shadow-sm hover:-translate-y-0.5 transition-all no-underline text-text-primary"
                          title={PLATFORM_LABELS[platform] || platform}
                        >
                          {PLATFORM_LABELS[platform] || platform}
                        </ExternalLink>
                      ))}
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* ═══ BOTTOM GRID: Activity + Upcoming Streams ═════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* ── RECENT ACTIVITY ───────────────────────────────── */}
            <Card variant="default" className="p-6">
              <h2 className="font-heading text-xl font-bold text-text-primary mb-4">
                Recent Activity
              </h2>
              <ul className="space-y-3">
                {MOCK_ACTIVITY.map((activity) => (
                  <li key={activity.id} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bg-lighter ${activity.color}`}
                    >
                      <activity.icon className="w-4 h-4" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text-body">{activity.text}</p>
                      <p className="text-xs text-text-light mt-0.5">{activity.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            {/* ── UPCOMING STREAMS TABLE ────────────────────────── */}
            <Card variant="default" className="p-6">
              <h2 className="font-heading text-xl font-bold text-text-primary mb-4">
                Upcoming Streams
              </h2>

              {upcomingStreams.length === 0 ? (
                <p className="text-text-secondary text-sm">No upcoming streams scheduled.</p>
              ) : (
                <div className="overflow-x-auto -mx-2">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-light text-left">
                        <th className="pb-2 pl-2 font-semibold text-text-secondary text-xs uppercase tracking-wider">
                          Stream
                        </th>
                        <th className="pb-2 font-semibold text-text-secondary text-xs uppercase tracking-wider">
                          Date
                        </th>
                        <th className="pb-2 font-semibold text-text-secondary text-xs uppercase tracking-wider">
                          Platforms
                        </th>
                        <th className="pb-2 pr-2 font-semibold text-text-secondary text-xs uppercase tracking-wider text-right">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingStreams.map((stream, i) => (
                        <tr
                          key={i}
                          className="border-b border-border-light last:border-0 hover:bg-bg-lighter transition-colors"
                        >
                          <td className="py-3 pl-2 font-medium text-text-primary max-w-[200px] truncate">
                            {stream.title}
                          </td>
                          <td className="py-3 text-text-secondary whitespace-nowrap">
                            {stream.date} · {stream.time}
                          </td>
                          <td className="py-3">
                            <div className="flex gap-1.5">
                              {stream.platforms.map((p) => (
                                <PlatformIcon key={p} platform={p} size={16} />
                              ))}
                            </div>
                          </td>
                          <td className="py-3 pr-2 text-right">
                            <div className="inline-flex gap-1">
                              <button
                                className="p-1.5 rounded-md text-text-secondary hover:text-primary hover:bg-primary-50 transition-colors"
                                title="Edit stream"
                              >
                                <HiPencil className="w-4 h-4" />
                              </button>
                              <button
                                className="p-1.5 rounded-md text-text-secondary hover:text-error hover:bg-red-50 transition-colors"
                                title="Cancel stream"
                              >
                                <HiX className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

/* ─── Stat Card Sub-Component ───────────────────────────────────────── */
function StatCard({ icon: Icon, label, value, trend, trendUp }) {
  return (
    <Card variant="default" className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">
            {label}
          </p>
          <p className="text-2xl font-bold text-text-primary">{value}</p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary">
          <Icon className="w-5 h-5" />
        </span>
      </div>
      {trend && (
        <p className={`text-xs font-medium mt-2 ${trendUp ? 'text-success' : 'text-error'}`}>
          {trend} from last month
        </p>
      )}
    </Card>
  );
}
