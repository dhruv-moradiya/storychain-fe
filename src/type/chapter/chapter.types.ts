import { CHAPTER_PR_STATUSES, CHAPTER_STATUSES } from './chapter-enum';

export type TChapterStatus = (typeof CHAPTER_STATUSES)[number];
export type TChapterPRStatus = (typeof CHAPTER_PR_STATUSES)[number];

/**
 * Represents a single chapter within a story.
 */
export interface IChapter {
  _id: string;
  slug: string;
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
    score: number;
  };

  status: TChapterStatus;
  isEnding: boolean;

  pullRequest: {
    isPR: boolean;
    prId?: string;
    status: TChapterPRStatus;
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
