import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ROUTES, USER_TYPES } from '@utils/constants';
import ProtectedRoute from '@components/auth/ProtectedRoute';
import { LoadingSpinner } from '@components/common';

// ─── Lazy-loaded Pages (code-split by route) ─────────────────────────
const HomePage = lazy(() => import('@pages/HomePage'));
const SignUpPage = lazy(() => import('@pages/SignUpPage'));
const LoginPage = lazy(() => import('@pages/LoginPage'));
const AllCategoriesPage = lazy(() => import('@pages/AllCategoriesPage'));
const SingleCategoryPage = lazy(() => import('@pages/SingleCategoryPage'));
const BrandProfilePage = lazy(() => import('@pages/BrandProfilePage'));
const CategoryBannerPage = lazy(() => import('@pages/CategoryBannerPage'));
const CreatorDashboardPage = lazy(() => import('@pages/CreatorDashboardPage'));
const CreatorProfileEditPage = lazy(() => import('@pages/CreatorProfileEditPage'));
const SavedCreatorsPage = lazy(() => import('@pages/SavedCreatorsPage'));
const SettingsPage = lazy(() => import('@pages/SettingsPage'));
const TrendingPage = lazy(() => import('@pages/TrendingPage'));
const CreatorsPage = lazy(() => import('@pages/CreatorsPage'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage'));

export default function App() {
  const location = useLocation();

  return (
    <Suspense fallback={<LoadingSpinner size="large" className="min-h-screen flex items-center justify-center" />}>
    <AnimatePresence mode="wait">
    <Routes location={location} key={location.pathname}>
      {/* ── Public routes ────────────────────────── */}
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.CATEGORIES} element={<AllCategoriesPage />} />
      <Route path={ROUTES.CATEGORY} element={<SingleCategoryPage />} />
      <Route path="/brand/:id" element={<BrandProfilePage />} />
      <Route path="/category-banner/:slug" element={<CategoryBannerPage />} />
      <Route path={ROUTES.TRENDING} element={<TrendingPage />} />
      <Route path={ROUTES.CREATORS} element={<CreatorsPage />} />

      {/* ── Protected — any authenticated user ──── */}
      <Route
        path={ROUTES.SAVED}
        element={
          <ProtectedRoute requiredUserType={USER_TYPES.BUYER}>
            <SavedCreatorsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.SETTINGS}
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />

      {/* ── Protected — creator only ────────────── */}
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <ProtectedRoute requiredUserType={USER_TYPES.CREATOR}>
            <CreatorDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/creator/profile/edit"
        element={
          <ProtectedRoute requiredUserType={USER_TYPES.CREATOR}>
            <CreatorProfileEditPage />
          </ProtectedRoute>
        }
      />

      {/* ── 404 catch-all ───────────────────────── */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </AnimatePresence>
    </Suspense>
  );
}
