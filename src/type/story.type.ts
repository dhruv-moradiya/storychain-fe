import type { IBaseType } from '.';
import type { IChapter } from './chapter.type';
import type { IChapterNodeData } from './story-canvas.type';

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

enum StoryGenre {
  FANTASY = 'FANTASY',
  SCI_FI = 'SCI_FI',
  MYSTERY = 'MYSTERY',
  ROMANCE = 'ROMANCE',
  HORROR = 'HORROR',
  THRILLER = 'THRILLER',
  ADVENTURE = 'ADVENTURE',
  DRAMA = 'DRAMA',
  COMEDY = 'COMEDY',
  OTHER = 'OTHER',
}

enum StoryContentRating {
  GENERAL = 'GENERAL',
  TEEN = 'TEEN',
  MATURE = 'MATURE',
}

type TStoryGenre = keyof typeof StoryGenre;
type TStoryContentRating = keyof typeof StoryContentRating;

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

interface IStoryCreator {
  clerkId: string;
  email: string;
  username: string;
  avatar: string;
}

interface IStory {
  _id: string;
  title: string;
  slug: string;
  description: string;

  coverImage?: {
    url: string;
    publicId: string;
  };

  cardImage?: {
    url: string;
    publicId: string;
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
// API REQUEST TYPES
// ---------------------------------
interface IStoryUpdateSetting {
  storyId: string;
  isPublic: boolean;
  allowBranching: boolean;
  requireApproval: boolean;
  allowComments: boolean;
  allowVoting: boolean;
  genre: TStoryGenre;
  contentRating: TStoryContentRating;
}

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

interface IStoryUpdateSettingResponse extends IBaseType {
  data: IStoryUpdateSetting;
}

interface IChapterTree extends IChapter {
  children: IChapterNodeData[];
}

interface IStoryTreeResponse extends IBaseType {
  data: {
    storyId: string;
    chapters: IChapterNodeData[];
  };
}

// ---------------------------------
// Exports
// ---------------------------------

export type {
  IStoryCreator,
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
  IStoryUpdateSetting,
  IStoryUpdateSettingResponse,
  IStoryTreeResponse,
  IChapterTree,
};
export { StoryStatus, StoryCollaboratorRole, StoryCollaboratorStatus, ROLE_HIERARCHY };
