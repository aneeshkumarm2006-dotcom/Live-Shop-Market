import { USER_TYPES } from '../utils/constants';
import { buyerUsers, creatorUsers } from './mockUsers';

// ─── Hard-coded credentials for demo login ───────────────────────────
const mockCredentials = [
  {
    email: 'buyer@demo.com',
    password: 'password',
    userType: USER_TYPES.BUYER,
    userId: 'user-1',
  },
  {
    email: 'creator@demo.com',
    password: 'password',
    userType: USER_TYPES.CREATOR,
    userId: 'creator-user-1',
  },
];

/**
 * Simulate authentication.
 * Returns the matching user object or null.
 */
export function authenticateUser(email, password) {
  const match = mockCredentials.find(
    (cred) => cred.email === email && cred.password === password
  );

  if (!match) return null;

  // Look up the full user object
  const allUsers = [...buyerUsers, ...creatorUsers];
  const user = allUsers.find((u) => u.id === match.userId);

  return user
    ? { ...user, userType: match.userType }
    : null;
}

/**
 * Get default credentials for the demo login hints.
 */
export function getDemoCredentials() {
  return mockCredentials.map(({ email, password, userType }) => ({
    email,
    password,
    userType,
  }));
}

export default mockCredentials;
