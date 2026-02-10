import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { authenticateUser } from '@data/mockAuth';
import { USER_TYPES } from '@utils/constants';

// ─── Auth Context ────────────────────────────────────────────────────
const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = 'lsm_auth_user';

/**
 * AuthProvider — wraps the app tree with authentication state.
 *
 * State:
 *   - currentUser   : user object | null
 *   - isAuthenticated: boolean
 *   - userType      : 'creator' | 'buyer' | null
 *
 * Functions:
 *   - login(email, password) → { success, user?, error? }
 *   - signup(userData)        → { success, user }
 *   - logout()               → void
 *   - isCreator()            → boolean
 *   - isBuyer()              → boolean
 */
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Persist to localStorage on change
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [currentUser]);

  // Derived state
  const isAuthenticated = currentUser !== null;
  const userType = currentUser?.userType ?? null;

  // ── Login ────────────────────────────────────────────────
  const login = useCallback((email, password) => {
    const user = authenticateUser(email, password);

    if (user) {
      setCurrentUser(user);
      return { success: true, user };
    }

    return { success: false, error: 'Invalid email or password' };
  }, []);

  // ── Sign Up ──────────────────────────────────────────────
  const signup = useCallback((userData) => {
    const newUser = {
      id: `user-${Date.now()}`,
      type: USER_TYPES.BUYER,
      userType: USER_TYPES.BUYER,
      name: userData.email.split('@')[0],
      email: userData.email,
      mobile: userData.mobile,
      gender: userData.gender,
      age: userData.age,
      profilePicture: null,
      savedCreators: [],
      createdAt: new Date().toISOString(),
    };

    setCurrentUser(newUser);
    return { success: true, user: newUser };
  }, []);

  // ── Logout ───────────────────────────────────────────────
  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  // ── Helpers ──────────────────────────────────────────────
  const isCreator = useCallback(
    () => userType === USER_TYPES.CREATOR,
    [userType]
  );

  const isBuyer = useCallback(
    () => userType === USER_TYPES.BUYER,
    [userType]
  );

  // ── Memoised context value ───────────────────────────────
  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated,
      userType,
      login,
      signup,
      logout,
      isCreator,
      isBuyer,
    }),
    [currentUser, isAuthenticated, userType, login, signup, logout, isCreator, isBuyer]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth — convenience hook.
 * Throws if used outside <AuthProvider>.
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an <AuthProvider>');
  }
  return ctx;
}

export default AuthContext;
