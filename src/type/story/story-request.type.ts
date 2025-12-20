interface IStorySettingUpdateRequest {
  storyId: string;
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
  converImage: {
    coverImage: string;
    publicId: string;
  };
  cardImage: {
    coverImage: string;
    publicId: string;
  };
}

export type { IStorySettingUpdateRequest };
