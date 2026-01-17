import type { IChapterNodeData } from '../story-canvas.type';
import type {
  IStory,
  IStoryCollaborator,
  IStoryCollaboratorInfo,
  IStoryCollaboratorWithUser,
  IStorySettings,
  IStoryStats,
  TStoryCollaboratorRole,
  TStoryContentRating,
  TStoryGenres,
  TStoryStatus,
} from './story.types';

// Story Response Types

interface IStoryResponse {
  _id: string;
  title: string;
  slug: string;
  description: string;
  coverImage?: {
    url?: string;
    publicId?: string;
  };
  cardImage?: {
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

interface IStoryListItemResponse {
  _id: string;
  title: string;
  slug: string;
  description: string;
  coverImage?: {
    url?: string;
    publicId?: string;
  };
  creatorId: string;
  status: TStoryStatus;
  stats: IStoryStats;
  settings: Pick<IStorySettings, 'genres' | 'contentRating'>;
  createdAt: Date;
  updatedAt: Date;
}

interface IStoryDetailResponse extends IStoryResponse {
  creator?: {
    clerkId: string;
    username: string;
    avatarUrl?: string;
  };
}

// Generic API Response Type
type TApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

// API Response Wrappers

type IGetStoryBySlugResponse = TApiResponse<IStory>;

type IGetStoryOverviewBySlugResponse = TApiResponse<
  Omit<
    IStory,
    'creatorId' | 'settings' | 'cardImage' | 'trendingScore' | 'createdAt' | 'updatedAt'
  > & {
    genres: TStoryGenres[];
    contentRating: TStoryContentRating;
    collaborators: IStoryCollaboratorInfo[];
  }
>;

type IGetStorySettingsBySlugResponse = TApiResponse<{
  settings: IStorySettings;
  coverImage?: IStory['coverImage'];
  cardImage?: IStory['cardImage'];
}>;

type IGetAllStoriesResponse = TApiResponse<IStory[]>;

type IGetNewStoriesResponse = TApiResponse<IStoryListItemResponse[]>;

type IGetMyStoriesResponse = TApiResponse<IStory[]>;

type IGetDraftStoriesResponse = TApiResponse<IStory[]>;

type ICreateStoryResponse = TApiResponse<{
  _id: string;
  title: string;
  slug: string;
  status: TStoryStatus;
  createdAt: Date;
}>;

type IPublishStoryResponse = TApiResponse<{
  _id: string;
  title: string;
  slug: string;
  status: TStoryStatus;
  publishedAt: Date;
}>;

type IUpdateStorySettingsBySlugResponse = TApiResponse<{
  settings: IStorySettings;
}>;

// Collaborator Response Types

type IGetStoryCollaboratorsResponse = TApiResponse<IStoryCollaboratorWithUser[]>;

type ICreateInvitationResponse = TApiResponse<{
  _id: string;
  storyId: string;
  role: TStoryCollaboratorRole;
  invitedUser: {
    id: string;
    name: string;
  };
  inviterUser: {
    id: string;
    name: string;
  };
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'REMOVED';
  createdAt: Date;
}>;

type IAcceptInvitationResponse = TApiResponse<IStoryCollaborator>;

type IDeclineInvitationResponse = TApiResponse<{
  _id: string;
  status: 'DECLINED';
}>;

// Story Tree Response Types

interface IStoryChapterNodeResponse {
  _id: string;
  title: string;
  order: number;
  depth: number;
  parentChapterId?: string;
  authorId: string;
  author?: {
    username: string;
    avatarUrl?: string;
  };
  createdAt: Date;
  children?: IStoryChapterNodeResponse[];
}

type IGetStoryTreeResponse = TApiResponse<{
  storyId: string;
  chapters: IChapterNodeData[];
}>;

// Chapter Response Types

type IAddChapterResponse = TApiResponse<{
  _id: string;
  storyId: string;
  title: string;
  content: string;
  parentChapterId?: string;
  authorId: string;
  order: number;
  depth: number;
  createdAt: Date;
}>;

type IGetSignatureUrlResponse = TApiResponse<{
  uploadURL: string;
}>;

type IUpdateStoryCoverImageResponse = TApiResponse<{
  coverImage: {
    url: string;
    publicId: string;
  };
}>;

type IUpdateStoryCardImageResponse = TApiResponse<{
  cardImage: {
    url: string;
    publicId: string;
  };
}>;

export type {
  IAcceptInvitationResponse,
  // Chapter Response Types
  IAddChapterResponse,
  // Generic API Response Type
  TApiResponse,
  ICreateInvitationResponse,
  ICreateStoryResponse,
  IDeclineInvitationResponse,
  IGetAllStoriesResponse,
  IGetDraftStoriesResponse,
  IGetMyStoriesResponse,
  IGetNewStoriesResponse,
  IGetSignatureUrlResponse,
  // API Response Wrappers
  IGetStoryBySlugResponse,
  // Collaborator Response Types
  IGetStoryCollaboratorsResponse,
  IGetStoryOverviewBySlugResponse,
  IGetStorySettingsBySlugResponse,
  IGetStoryTreeResponse,
  IPublishStoryResponse,
  // Story Tree Response Types
  IStoryChapterNodeResponse,
  IStoryDetailResponse,
  IStoryListItemResponse,
  // Story Types
  IStoryResponse,
  IUpdateStoryCardImageResponse,
  IUpdateStoryCoverImageResponse,
  IUpdateStorySettingsBySlugResponse,
};
