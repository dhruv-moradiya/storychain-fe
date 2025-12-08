import type { IBaseType } from '.';

enum StoryStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
  DELETED = 'DELETED',
}

enum StoryCollaboratorRole {
  OWNER = 'OWNER',
  CO_AUTHOR = 'CO_AUTHOR',
  MODERATOR = 'MODERATOR',
  REVIEWER = 'REVIEWER',
  CONTRIBUTOR = 'CONTRIBUTOR',
}

enum StoryCollaboratorStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  REMOVED = 'REMOVED',
}

const ROLE_HIERARCHY = {
  CONTRIBUTOR: 0,
  REVIEWER: 1,
  MODERATOR: 2,
  CO_AUTHOR: 3,
  OWNER: 4,
} as const;

interface IStorySettings {
  isPublic: boolean;
  allowBranching: boolean;
  requireApproval: boolean;
  allowComments: boolean;
  allowVoting: boolean;
  genre:
    | 'FANTASY'
    | 'SCI_FI'
    | 'MYSTERY'
    | 'ROMANCE'
    | 'HORROR'
    | 'THRILLER'
    | 'ADVENTURE'
    | 'DRAMA'
    | 'COMEDY'
    | 'OTHER';
  contentRating: 'GENERAL' | 'TEEN' | 'MATURE';
}

interface IStoryStats {
  totalChapters: number;
  totalBranches: number;
  totalReads: number;
  totalVotes: number;
  uniqueContributors: number;
  averageRating: number;
}

interface IStory {
  _id: string;
  title: string;
  slug: string;
  description: string;

  coverImage?: {
    url?: string;
    publicId?: string;
  };

  creatorId: string;

  settings: IStorySettings;
  stats: IStoryStats;

  tags: string[];

  status: TStoryStatus;

  trendingScore: number;
  lastActivityAt: Date;
  publishedAt: Date;

  createdAt: Date;
  updatedAt: Date;
}

interface IStoryCollaborator {
  _id: string;
  storyId: string;
  userId: string;
  role: TStoryCollaboratorRole;
  invitedBy?: string;
  invitedAt: Date;
  acceptedAt?: Date;
  status: TStoryCollaboratorStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

type TStoryCollaboratorRole = keyof typeof StoryCollaboratorRole;
type TStoryCollaboratorStatus = keyof typeof StoryCollaboratorStatus;
type TStoryStatus = keyof typeof StoryStatus;

// ---------------------------------
// API RESPONSE TYPES
// ---------------------------------

interface ICollaboratorUser {
  clerkId: string;
  email: string;
  username: string;
  avatarUrl: string;
}

type IStoryCollaboratorWithUser = Omit<IStoryCollaborator, 'userId'> & {
  user: ICollaboratorUser;
};

interface IGetAllUserStoryResponse extends IBaseType {
  data: IStory[];
}

interface IGetAllUserStoryCollaboratorResponse extends IBaseType {
  data: IStoryCollaboratorWithUser[];
}

interface ICreateInvitation extends IBaseType {
  data: IStoryCollaborator;
}

// ---------------------------------
// Exports
// ---------------------------------

export type {
  TStoryStatus,
  IStory,
  IStoryCollaborator,
  IStoryStats,
  IStorySettings,
  IGetAllUserStoryResponse,
  TStoryCollaboratorRole,
  TStoryCollaboratorStatus,
  IGetAllUserStoryCollaboratorResponse,
  IStoryCollaboratorWithUser,
  ICreateInvitation,
};
export { StoryStatus, StoryCollaboratorRole, StoryCollaboratorStatus, ROLE_HIERARCHY };
