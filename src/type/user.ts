import type { IBaseType } from '.';

enum Badge {
  STORY_STARTER = 'STORY_STARTER',
  BRANCH_CREATOR = 'BRANCH_CREATOR',
  TOP_CONTRIBUTOR = 'TOP_CONTRIBUTOR',
  MOST_UPVOTED = 'MOST_UPVOTED',
  TRENDING_AUTHOR = 'TRENDING_AUTHOR',
  VETERAN_WRITER = 'VETERAN_WRITER',
  COMMUNITY_FAVORITE = 'COMMUNITY_FAVORITE',
  COLLABORATIVE = 'COLLABORATIVE',
  QUALITY_CURATOR = 'QUALITY_CURATOR',
}

enum PlatformRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  PLATFORM_MODERATOR = 'PLATFORM_MODERATOR',
  APPEAL_MODERATOR = 'APPEAL_MODERATOR',
  USER = 'USER',
}

type TBadge = keyof typeof Badge;
type TPlatformRole = keyof typeof PlatformRole;

interface UserPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  theme: 'light' | 'dark' | 'auto';
}

interface UserStats {
  storiesCreated: number;
  chaptersWritten: number;
  totalUpvotes: number;
  totalDownvotes: number;
  branchesCreated: number;
}

interface IUser {
  clerkId: string;
  username: string;
  email: string;

  bio?: string;
  avatarUrl?: string;

  xp: number;
  level: number;
  badges: TBadge[];

  stats: UserStats;
  preferences: UserPreferences;

  isActive: boolean;
  isBanned: boolean;
  banReason?: string;
  bannedUntil?: Date;

  lastActive: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface IPlatformRole {
  userId: string;
  role: 'SUPER_ADMIN' | 'PLATFORM_MODERATOR' | 'APPEAL_MODERATOR' | 'USER';
  assignedBy?: string;
  assignedAt: Date;
}

interface IAuthUser extends IBaseType {
  data: IUser & IPlatformRole;
}

interface IPublicViewUser {
  clerkId: string;
  username: string;
  email: string;
}

interface ISearchUserByUsername extends IBaseType {
  data: IPublicViewUser[];
}

export { Badge, PlatformRole };
export type { IAuthUser, TPlatformRole, UserPreferences, UserStats, IUser, ISearchUserByUsername };
