// ─── Platform Constants ──────────────────────────────────────────────
export const PLATFORMS = {
  INSTAGRAM: 'instagram',
  TIKTOK: 'tiktok',
  YOUTUBE: 'youtube',
  QVC: 'qvc',
};

export const PLATFORM_LABELS = {
  [PLATFORMS.INSTAGRAM]: 'Instagram',
  [PLATFORMS.TIKTOK]: 'TikTok',
  [PLATFORMS.YOUTUBE]: 'YouTube',
  [PLATFORMS.QVC]: 'QVC',
};

export const PLATFORM_COLORS = {
  [PLATFORMS.INSTAGRAM]: '#E4405F',
  [PLATFORMS.TIKTOK]: '#000000',
  [PLATFORMS.YOUTUBE]: '#FF0000',
  [PLATFORMS.QVC]: '#2563EB',
};

export const PLATFORM_URLS = {
  [PLATFORMS.INSTAGRAM]: 'https://www.instagram.com/',
  [PLATFORMS.TIKTOK]: 'https://www.tiktok.com/@',
  [PLATFORMS.YOUTUBE]: 'https://www.youtube.com/@',
  [PLATFORMS.QVC]: 'https://www.qvc.com/',
};

// ─── Category Constants ──────────────────────────────────────────────
export const CATEGORIES = {
  TECH_GADGETS: 'Tech & Gadgets',
  FASHION: 'Fashion',
  BEAUTY_PERSONAL_CARE: 'Beauty & Personal Care',
  WELLNESS: 'Wellness',
  SPORTS_FITNESS: 'Sports & Fitness',
  HOME_LIVING: 'Home & Living',
  FOOD_COOKING: 'Food & Cooking',
  KIDS_FAMILY: 'Kids & Family',
  PETS: 'Pets & Animals',
};

export const CATEGORY_SLUGS = {
  [CATEGORIES.TECH_GADGETS]: 'tech-gadgets',
  [CATEGORIES.FASHION]: 'fashion',
  [CATEGORIES.BEAUTY_PERSONAL_CARE]: 'beauty-personal-care',
  [CATEGORIES.WELLNESS]: 'wellness',
  [CATEGORIES.SPORTS_FITNESS]: 'sports-fitness',
  [CATEGORIES.HOME_LIVING]: 'home-living',
  [CATEGORIES.FOOD_COOKING]: 'food-cooking',
  [CATEGORIES.KIDS_FAMILY]: 'kids-family',
  [CATEGORIES.PETS]: 'pets-animals',
};

// ─── Category Banner Gradients ───────────────────────────────────────
export const CATEGORY_GRADIENTS = {
  [CATEGORIES.TECH_GADGETS]: 'linear-gradient(135deg, #0052D4 0%, #4364F7 50%, #6FB1FC 100%)',
  [CATEGORIES.FASHION]: 'linear-gradient(135deg, #7B2FF7 0%, #9B59B6 50%, #3498DB 100%)',
  [CATEGORIES.BEAUTY_PERSONAL_CARE]: 'linear-gradient(135deg, #FF69B4 0%, #FF85C8 50%, #FFB6D9 100%)',
  [CATEGORIES.WELLNESS]: 'linear-gradient(135deg, #11998E 0%, #38EF7D 100%)',
  [CATEGORIES.SPORTS_FITNESS]: 'linear-gradient(135deg, #F2994A 0%, #F2C94C 100%)',
  [CATEGORIES.HOME_LIVING]: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
  [CATEGORIES.FOOD_COOKING]: 'linear-gradient(135deg, #F97316 0%, #EF4444 100%)',
  [CATEGORIES.KIDS_FAMILY]: 'linear-gradient(135deg, #A78BFA 0%, #EC4899 100%)',
  [CATEGORIES.PETS]: 'linear-gradient(135deg, #34D399 0%, #059669 100%)',
};

// ─── User Types ──────────────────────────────────────────────────────
export const USER_TYPES = {
  CREATOR: 'creator',
  BUYER: 'buyer',
};

// ─── Routes ──────────────────────────────────────────────────────────
export const ROUTES = {
  HOME: '/',
  SIGN_UP: '/signup',
  LOGIN: '/login',
  CATEGORIES: '/categories',
  CATEGORY: '/categories/:slug',
  CREATORS: '/creators',
  CREATOR_PROFILE: '/creator/:id',
  SAVED: '/saved',
  SETTINGS: '/settings',
  DASHBOARD: '/dashboard',
  TRENDING: '/trending',
};

// ─── Misc ────────────────────────────────────────────────────────────
export const LIVE_BADGE_COLOR = '#FF0000';
export const CTA_COLOR = '#D4FF00';
export const PRIMARY_BLUE = '#0052D4';
export const HEADER_GRADIENT = 'linear-gradient(135deg, #0052D4 0%, #4364F7 50%, #6FB1FC 100%)';
