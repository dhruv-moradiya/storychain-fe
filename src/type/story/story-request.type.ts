import type { TStoryContentRating, TStoryGenres } from './story.types';

interface IStorySettingUpdateRequestBase {
  isPublic: boolean;
  allowBranching: boolean;
  requireApproval: boolean;
  allowComments: boolean;
  allowVoting: boolean;
  genres: TStoryGenres[];
  contentRating: TStoryContentRating;
}

type IStorySettingUpdateRequest = { slug: string } & Partial<IStorySettingUpdateRequestBase>;

interface IStoryImagePayload {
  url: string;
  publicId: string;
}

interface IUpdateStoryCoverImageRequest {
  slug: string;
  coverImage: IStoryImagePayload;
}

interface IUpdateStoryCardImageRequest {
  slug: string;
  cardImage: IStoryImagePayload;
}

export type {
  IStorySettingUpdateRequest,
  IStoryImagePayload,
  IUpdateStoryCoverImageRequest,
  IUpdateStoryCardImageRequest,
};
