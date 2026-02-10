import { USER_TYPES } from '../utils/constants';

// ─── Buyer Users ─────────────────────────────────────────────────────
const buyerUsers = [
  {
    id: 'user-1',
    type: USER_TYPES.BUYER,
    name: 'Alex Johnson',
    email: 'buyer@demo.com',
    profilePicture: '/images/users/alex-avatar.jpg',
    savedCreators: ['creator-1', 'creator-4', 'creator-5', 'creator-7', 'creator-12', 'creator-15'],
  },
  {
    id: 'user-2',
    type: USER_TYPES.BUYER,
    name: 'Jordan Lee',
    email: 'jordan@example.com',
    profilePicture: '/images/users/jordan-avatar.jpg',
    savedCreators: ['creator-3', 'creator-4', 'creator-8', 'creator-12'],
  },
  {
    id: 'user-3',
    type: USER_TYPES.BUYER,
    name: 'Samira Patel',
    email: 'samira@example.com',
    profilePicture: '/images/users/samira-avatar.jpg',
    savedCreators: ['creator-7', 'creator-10', 'creator-14'],
  },
];

// ─── Creator Users (for dashboard / profile-edit login) ──────────────
const creatorUsers = [
  {
    id: 'creator-user-1',
    type: USER_TYPES.CREATOR,
    name: 'TechVault Admin',
    email: 'creator@demo.com',
    profilePicture: '/images/creators/techvault-avatar.jpg',
    linkedCreatorId: 'creator-4', // links to the TechVault creator profile
  },
  {
    id: 'creator-user-2',
    type: USER_TYPES.CREATOR,
    name: 'GlowUp Studio Admin',
    email: 'glowup@demo.com',
    profilePicture: '/images/creators/glowup-avatar.jpg',
    linkedCreatorId: 'creator-7',
  },
];

// ─── Combined export ─────────────────────────────────────────────────
const mockUsers = [...buyerUsers, ...creatorUsers];

export { buyerUsers, creatorUsers };
export default mockUsers;
