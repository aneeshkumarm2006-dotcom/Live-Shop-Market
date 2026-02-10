import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import { ROUTES } from '@utils/constants';

/**
 * ProtectedRoute — guards routes that require authentication.
 *
 * Props:
 *   - children          : React element(s) to render when authorised
 *   - requiredUserType  : 'creator' | 'buyer' | undefined
 *                         When set, only users of that type can access the route.
 *                         When omitted, any authenticated user is allowed.
 *   - redirectTo        : path to redirect to (default: /signup)
 */
export default function ProtectedRoute({
  children,
  requiredUserType,
  redirectTo = ROUTES.SIGN_UP,
}) {
  const { isAuthenticated, userType } = useAuth();
  const location = useLocation();

  // Not logged in → redirect to sign-up, preserving intended destination
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Logged in but wrong user type → redirect to home
  if (requiredUserType && userType !== requiredUserType) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
}
