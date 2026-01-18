import type { IChapter } from '../chapter.type';
import type { IChapterNodeData } from '../story-canvas.type';
import type {
  STORY_COLLABORATOR_ROLES,
  STORY_COLLABORATOR_STATUSES,
  STORY_CONTENT_RATINGS,
  STORY_GENRES,
  STORY_STATUSES,
} from './story-enum';

// Derived types from enums
type TStoryStatus = (typeof STORY_STATUSES)[number];
type TStoryCollaboratorRole = (typeof STORY_COLLABORATOR_ROLES)[number];
type TStoryCollaboratorStatus = (typeof STORY_COLLABORATOR_STATUSES)[number];
type TStoryGenres = (typeof STORY_GENRES)[number];
type TStoryContentRating = (typeof STORY_CONTENT_RATINGS)[number];

// Story Settings
interface IStorySettings {
  isPublic: boolean;
  allowBranching: boolean;
  requireApproval: boolean;
  allowComments: boolean;
  allowVoting: boolean;
  genres: TStoryGenres[];
  contentRating: TStoryContentRating;
}

// Story Stats
interface IStoryStats {
  totalChapters: number;
  totalBranches: number;
  totalReads: number;
  totalVotes: number;
  uniqueContributors: number;
  averageRating: number;
}

// Story Creator
interface IStoryCreator {
  clerkId: string;
  email: string;
  username: string;
  avatar: string;
}

// Story Collaborator Info
interface IStoryCollaboratorInfo {
  clerkId: string;
  username: string;
  avatarUrl: string;
  role: TStoryCollaboratorRole;
}

// Main Story Interface
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

// Story Collaborator
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

// Collaborator User
interface ICollaboratorUser {
  clerkId: string;
  email: string;
  username: string;
  avatarUrl: string;
}

// Story Collaborator with User info
type IStoryCollaboratorWithUser = Omit<IStoryCollaborator, 'userId' | 'invitedBy'> & {
  role: TStoryCollaboratorRole;
  status: TStoryCollaboratorStatus;
  invitedBy: ICollaboratorUser | null;
  user: ICollaboratorUser;
  invitedAt: Date;
  updatedAt: Date;
};

// Chapter Tree
interface IChapterTree extends IChapter {
  children: IChapterNodeData[];
}

export type {
  IChapterTree,
  ICollaboratorUser,
  IStory,
  IStoryCollaborator,
  IStoryCollaboratorInfo,
  IStoryCollaboratorWithUser,
  IStoryCreator,
  IStorySettings,
  IStoryStats,
  TStoryCollaboratorRole,
  TStoryCollaboratorStatus,
  TStoryStatus,
  TStoryGenres,
  TStoryContentRating,
};
