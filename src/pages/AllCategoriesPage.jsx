import { Link } from 'react-router-dom';
import { PageLayout } from '@components/layout';
import mockCategories from '@data/mockCategories';

/* ─── Per-category banner theme matching Figma banners ─── */
const CATEGORY_THEMES = {
  'Beauty & Personal Care': {
    gradient: 'linear-gradient(135deg, #F9A8D4 0%, #F472B6 30%, #EC4899 60%, #DB2777 100%)',
    badgeBg: '#EC4899',
    // Decorative floating shapes
    shapes: [
      { type: 'circle', size: 60, top: '10%', left: '5%', bg: 'rgba(255,182,217,0.5)', blur: 2 },
      { type: 'circle', size: 45, top: '55%', left: '12%', bg: 'rgba(236,72,153,0.4)', blur: 1 },
      { type: 'circle', size: 35, bottom: '10%', left: '3%', bg: 'rgba(219,39,119,0.3)', blur: 3 },
      { type: 'circle', size: 50, top: '15%', right: '8%', bg: 'rgba(244,114,182,0.45)', blur: 2 },
      { type: 'circle', size: 40, bottom: '15%', right: '5%', bg: 'rgba(255,182,217,0.4)', blur: 1 },
      { type: 'rounded', size: 55, top: '40%', right: '15%', bg: 'rgba(236,72,153,0.35)', blur: 4, radius: '30%' },
      { type: 'squiggly', size: 30, top: '25%', left: '20%', bg: 'rgba(255,200,230,0.5)', blur: 0 },
    ],
  },
  Wellness: {
    gradient: 'linear-gradient(135deg, #6EE7B7 0%, #34D399 35%, #10B981 65%, #059669 100%)',
    badgeBg: '#0D9488',
    shapes: [
      { type: 'circle', size: 55, top: '8%', left: '6%', bg: 'rgba(110,231,183,0.5)', blur: 2 },
      { type: 'circle', size: 40, top: '60%', left: '10%', bg: 'rgba(16,185,129,0.4)', blur: 1 },
      { type: 'circle', size: 50, bottom: '5%', left: '15%', bg: 'rgba(5,150,105,0.35)', blur: 3 },
      { type: 'circle', size: 45, top: '12%', right: '10%', bg: 'rgba(167,243,208,0.5)', blur: 2 },
      { type: 'circle', size: 35, bottom: '20%', right: '6%', bg: 'rgba(52,211,153,0.4)', blur: 1 },
      { type: 'rounded', size: 48, top: '45%', right: '18%', bg: 'rgba(16,185,129,0.3)', blur: 4, radius: '35%' },
    ],
  },
  'Sports & Fitness': {
    gradient: 'linear-gradient(135deg, #FDBA74 0%, #FB923C 30%, #F97316 60%, #EA580C 100%)',
    badgeBg: '#EA580C',
    shapes: [
      { type: 'circle', size: 58, top: '10%', left: '4%', bg: 'rgba(253,186,116,0.5)', blur: 2 },
      { type: 'circle', size: 42, top: '55%', left: '8%', bg: 'rgba(249,115,22,0.4)', blur: 1 },
      { type: 'circle', size: 35, bottom: '8%', left: '18%', bg: 'rgba(234,88,12,0.35)', blur: 3 },
      { type: 'circle', size: 52, top: '8%', right: '6%', bg: 'rgba(251,146,60,0.45)', blur: 2 },
      { type: 'circle', size: 38, bottom: '12%', right: '10%', bg: 'rgba(253,186,116,0.4)', blur: 1 },
      { type: 'rounded', size: 28, top: '35%', right: '20%', bg: 'rgba(249,115,22,0.3)', blur: 4, radius: '25%' },
      { type: 'squiggly', size: 22, bottom: '30%', right: '4%', bg: 'rgba(253,224,71,0.6)', blur: 0 },
    ],
  },
  Fashion: {
    gradient: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 30%, #7C3AED 60%, #4338CA 100%)',
    badgeBg: '#581C87',
    shapes: [
      { type: 'circle', size: 60, top: '5%', left: '5%', bg: 'rgba(167,139,250,0.45)', blur: 2 },
      { type: 'circle', size: 44, top: '50%', left: '10%', bg: 'rgba(124,58,237,0.35)', blur: 1 },
      { type: 'circle', size: 50, bottom: '10%', left: '2%', bg: 'rgba(99,102,241,0.3)', blur: 3 },
      { type: 'circle', size: 48, top: '10%', right: '8%', bg: 'rgba(139,92,246,0.4)', blur: 2 },
      { type: 'circle', size: 55, bottom: '5%', right: '5%', bg: 'rgba(67,56,202,0.35)', blur: 1 },
      { type: 'rounded', size: 38, top: '40%', right: '15%', bg: 'rgba(124,58,237,0.25)', blur: 4, radius: '30%' },
    ],
  },
  'Tech & Gadgets': {
    gradient: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 30%, #2563EB 55%, #14B8A6 100%)',
    badgeBg: '#D4FF00',
    badgeText: '#1A1A2E',
    shapes: [
      { type: 'circle', size: 55, top: '8%', left: '6%', bg: 'rgba(96,165,250,0.45)', blur: 2 },
      { type: 'circle', size: 40, top: '58%', left: '12%', bg: 'rgba(59,130,246,0.4)', blur: 1 },
      { type: 'circle', size: 48, bottom: '5%', left: '4%', bg: 'rgba(20,184,166,0.35)', blur: 3 },
      { type: 'circle', size: 50, top: '12%', right: '7%', bg: 'rgba(37,99,235,0.45)', blur: 2 },
      { type: 'circle', size: 35, bottom: '15%', right: '10%', bg: 'rgba(96,165,250,0.4)', blur: 1 },
      { type: 'rounded', size: 42, top: '42%', right: '18%', bg: 'rgba(20,184,166,0.3)', blur: 4, radius: '28%' },
    ],
  },
  'Home & Living': {
    gradient: 'linear-gradient(135deg, #FDE68A 0%, #FCD34D 35%, #FBBF24 65%, #F59E0B 100%)',
    badgeBg: '#D97706',
    shapes: [
      { type: 'circle', size: 50, top: '10%', left: '5%', bg: 'rgba(253,230,138,0.5)', blur: 2 },
      { type: 'circle', size: 42, top: '55%', left: '10%', bg: 'rgba(251,191,36,0.4)', blur: 1 },
      { type: 'circle', size: 46, bottom: '8%', left: '15%', bg: 'rgba(245,158,11,0.35)', blur: 3 },
      { type: 'circle', size: 48, top: '12%', right: '8%', bg: 'rgba(252,211,77,0.45)', blur: 2 },
      { type: 'circle', size: 36, bottom: '12%', right: '6%', bg: 'rgba(253,230,138,0.4)', blur: 1 },
    ],
  },
  'Food & Cooking': {
    gradient: 'linear-gradient(135deg, #FCA5A5 0%, #F87171 30%, #EF4444 60%, #DC2626 100%)',
    badgeBg: '#DC2626',
    shapes: [
      { type: 'circle', size: 52, top: '8%', left: '6%', bg: 'rgba(252,165,165,0.5)', blur: 2 },
      { type: 'circle', size: 38, top: '52%', left: '12%', bg: 'rgba(248,113,113,0.4)', blur: 1 },
      { type: 'circle', size: 45, bottom: '10%', left: '3%', bg: 'rgba(239,68,68,0.35)', blur: 3 },
      { type: 'circle', size: 48, top: '10%', right: '8%', bg: 'rgba(252,165,165,0.45)', blur: 2 },
      { type: 'circle', size: 34, bottom: '15%', right: '12%', bg: 'rgba(220,38,38,0.35)', blur: 1 },
      { type: 'rounded', size: 40, top: '40%', right: '5%', bg: 'rgba(248,113,113,0.3)', blur: 4, radius: '30%' },
    ],
  },
  'Kids & Family': {
    gradient: 'linear-gradient(135deg, #C4B5FD 0%, #A78BFA 30%, #A855F7 55%, #EC4899 100%)',
    badgeBg: '#9333EA',
    shapes: [
      { type: 'circle', size: 55, top: '10%', left: '5%', bg: 'rgba(196,181,253,0.5)', blur: 2 },
      { type: 'circle', size: 40, top: '55%', left: '12%', bg: 'rgba(168,85,247,0.4)', blur: 1 },
      { type: 'circle', size: 48, bottom: '5%', left: '8%', bg: 'rgba(236,72,153,0.35)', blur: 3 },
      { type: 'circle', size: 50, top: '8%', right: '6%', bg: 'rgba(167,139,250,0.45)', blur: 2 },
      { type: 'circle', size: 36, bottom: '18%', right: '10%', bg: 'rgba(196,181,253,0.4)', blur: 1 },
    ],
  },
  'Pets & Animals': {
    gradient: 'linear-gradient(135deg, #6EE7B7 0%, #34D399 35%, #14B8A6 65%, #059669 100%)',
    badgeBg: '#0F766E',
    shapes: [
      { type: 'circle', size: 52, top: '10%', left: '6%', bg: 'rgba(110,231,183,0.5)', blur: 2 },
      { type: 'circle', size: 40, top: '55%', left: '10%', bg: 'rgba(20,184,166,0.4)', blur: 1 },
      { type: 'circle', size: 44, bottom: '8%', left: '15%', bg: 'rgba(5,150,105,0.35)', blur: 3 },
      { type: 'circle', size: 48, top: '12%', right: '8%', bg: 'rgba(52,211,153,0.45)', blur: 2 },
      { type: 'circle', size: 35, bottom: '15%', right: '6%', bg: 'rgba(110,231,183,0.4)', blur: 1 },
      { type: 'rounded', size: 42, top: '38%', right: '16%', bg: 'rgba(20,184,166,0.3)', blur: 4, radius: '30%' },
    ],
  },
};

/* Renders CSS floating decorative "3D-like" shapes */
function DecoShape({ shape }) {
  const pos = {};
  if (shape.top) pos.top = shape.top;
  if (shape.bottom) pos.bottom = shape.bottom;
  if (shape.left) pos.left = shape.left;
  if (shape.right) pos.right = shape.right;

  return (
    <div
      className="pointer-events-none absolute"
      style={{
        width: shape.size,
        height: shape.size,
        borderRadius: shape.radius || '50%',
        background: shape.bg,
        filter: shape.blur ? `blur(${shape.blur}px)` : undefined,
        ...pos,
      }}
    />
  );
}

export default function AllCategoriesPage() {
  return (
    <PageLayout>
      {/* ── Page header ── */}
      <section className="container-app pt-8 pb-4 sm:pt-10 sm:pb-6 md:pt-14 md:pb-8">
        <h1
          className="text-center font-extrabold tracking-tight"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--text-3xl)',
            color: 'var(--color-text-heading)',
          }}
        >
          All Categories
        </h1>
      </section>

      {/* ── Category grid ── */}
      <section className="container-app pb-12 sm:pb-16">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {mockCategories.map((category) => {
            const theme = CATEGORY_THEMES[category.name] || {};
            const badgeText = theme.badgeText || '#FFFFFF';
            const hasBanner = !!category.bannerImage;

            return (
              <Link
                to={`/categories/${category.slug}`}
                key={category.id}
                className="group block"
              >
                <div
                  className="relative flex items-center justify-center overflow-hidden transition-all duration-300 ease-out group-hover:scale-[1.03] group-hover:shadow-xl"
                  style={{
                    background: hasBanner
                      ? `url(${category.bannerImage})`
                      : (theme.gradient || category.bannerGradient),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: 'var(--radius-card)',
                    boxShadow: 'var(--shadow-card)',
                    aspectRatio: '16 / 9',
                    minHeight: '160px',
                  }}
                >
                  {/* Decorative floating shapes — only when no banner image */}
                  {!hasBanner && (theme.shapes || []).map((shape, i) => (
                    <DecoShape key={i} shape={shape} />
                  ))}

                  {/* Shimmer / light overlay — only when no banner image */}
                  {!hasBanner && (
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          'radial-gradient(ellipse at 25% 30%, rgba(255,255,255,0.18) 0%, transparent 55%), radial-gradient(ellipse at 75% 70%, rgba(255,255,255,0.12) 0%, transparent 50%)',
                      }}
                    />
                  )}

                  {/* Center label badge — only when no banner image (image already has text) */}
                  {!hasBanner && (
                    <div
                      className="relative z-10 px-6 py-2.5 shadow-lg"
                      style={{
                        backgroundColor: theme.badgeBg || '#333',
                        borderRadius: '6px',
                      }}
                    >
                      <span
                        className="font-bold tracking-wide whitespace-nowrap"
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'clamp(1rem, 4vw, 1.25rem)', /* Responsive clamp */
                          color: badgeText,
                        }}
                      >
                        {category.name}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </PageLayout>
  );
}
