export interface IChapter {
  _id: string;
  storyId: string;

  parentChapterId?: string | null;
  ancestorIds: string[];
  depth: number;
  authorId: string;
  content: string;
  title: string;
  chapterNumber?: number;

  votes: {
    upvotes: number;
    downvotes: number;
    score: number; // Derived metric for ranking
  };

  status: 'PUBLISHED' | 'PENDING_APPROVAL' | 'REJECTED' | 'DELETED';
  isEnding: boolean;

  pullRequest: {
    isPR: boolean;
    prId?: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'MERGED';
    submittedAt?: Date;
    reviewedBy?: string;
    reviewedAt?: Date;
    rejectionReason?: string;
  };

  version: number;
  previousVersionId?: string;

  stats: {
    reads: number;
    comments: number;
    childBranches: number;
  };

  reportCount: number;
  isFlagged: boolean;
  createdAt: Date;
  updatedAt: Date;
}
