interface IStorySettingUpdateRequestBase {
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
