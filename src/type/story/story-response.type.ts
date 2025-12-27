import type { IBaseType } from '..';
import type {
  IStory,
  IStoryCollaborator,
  IStoryCollaboratorWithUser,
  IStoryCreator,
  IStorySettings,
  IStoryStats,
  TStoryCollaboratorRole,
  TStoryStatus,
} from '../story.type';
import type { IChapterNodeData } from '../story-canvas.type';

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
  settings: Pick<IStorySettings, 'genre' | 'contentRating'>;
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

// API Response Wrappers

interface IGetStoryByIdResponse extends IBaseType {
  data: IStory;
}

interface IGetStoryBySlugResponse extends IBaseType {
  data: IStory;
}

interface IGetStoryOverviewBySlugResponse extends IBaseType {
  data: Omit<
    IStory,
    'creatorId' | 'settings' | 'cardImage' | 'trendingScore' | 'createdAt' | 'updatedAt'
  > & { creator: IStoryCreator; genre: string; contentRating: string };
}

interface IGetStorySettingsBySlugResponse extends IBaseType {
  data: IStorySettings;
}

interface IGetAllStoriesResponse extends IBaseType {
  data: IStory[];
}

interface IGetNewStoriesResponse extends IBaseType {
  data: IStoryListItemResponse[];
}

interface IGetMyStoriesResponse extends IBaseType {
  data: IStory[];
}

interface IGetDraftStoriesResponse extends IBaseType {
  data: IStory[];
}

interface ICreateStoryResponse extends IBaseType {
  data: {
    _id: string;
    title: string;
    slug: string;
    status: TStoryStatus;
    createdAt: Date;
  };
}

interface IPublishStoryResponse extends IBaseType {
  data: {
    _id: string;
    title: string;
    slug: string;
    status: TStoryStatus;
    publishedAt: Date;
  };
}

interface IUpdateStorySettingsBySlugResponse extends IBaseType {
  data: {
    settings: IStorySettings;
  };
}

// Collaborator Response Types

interface IGetStoryCollaboratorsResponse extends IBaseType {
  data: IStoryCollaboratorWithUser[];
}

interface ICreateInvitationResponse extends IBaseType {
  data: {
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
  };
}

interface IAcceptInvitationResponse extends IBaseType {
  data: IStoryCollaborator;
}

interface IDeclineInvitationResponse extends IBaseType {
  data: {
    _id: string;
    status: 'DECLINED';
  };
}

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

interface IGetStoryTreeResponse extends IBaseType {
  data: {
    storyId: string;
    chapters: IChapterNodeData[];
  };
}

// Chapter Response Types

interface IAddChapterResponse extends IBaseType {
  data: {
    _id: string;
    storyId: string;
    title: string;
    content: string;
    parentChapterId?: string;
    authorId: string;
    order: number;
    depth: number;
    createdAt: Date;
  };
}

interface IGetSignatureUrlResponse extends IBaseType {
  data: {
    uploadURL: string;
  };
}

interface IUpdateStoryCoverImageResponse extends IBaseType {
  data: {
    coverImage: {
      url: string;
      publicId: string;
    };
  };
}

interface IUpdateStoryCardImageResponse extends IBaseType {
  data: {
    cardImage: {
      url: string;
      publicId: string;
    };
  };
}

export type {
  // Story Types
  IStoryResponse,
  IStoryListItemResponse,
  IStoryDetailResponse,
  // API Response Wrappers
  IGetStoryByIdResponse,
  IGetStoryBySlugResponse,
  IGetStoryOverviewBySlugResponse,
  IGetAllStoriesResponse,
  IGetNewStoriesResponse,
  IGetMyStoriesResponse,
  IGetDraftStoriesResponse,
  ICreateStoryResponse,
  IPublishStoryResponse,
  IUpdateStorySettingsBySlugResponse,
  IGetSignatureUrlResponse,
  IGetStorySettingsBySlugResponse,
  IUpdateStoryCoverImageResponse,
  IUpdateStoryCardImageResponse,
  // Collaborator Response Types
  IGetStoryCollaboratorsResponse,
  ICreateInvitationResponse,
  IAcceptInvitationResponse,
  IDeclineInvitationResponse,
  // Story Tree Response Types
  IStoryChapterNodeResponse,
  IGetStoryTreeResponse,
  // Chapter Response Types
  IAddChapterResponse,
};
