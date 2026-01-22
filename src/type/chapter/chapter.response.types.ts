// Chapter API Response Types

import type { IBaseType } from '..';
import type { IChapter } from '../chapter.type';
import type { IPublicViewUser } from '../user';

// Lightweight chapter item for list views (matches actual API response)
interface IMyChapterListItem {
  _id: string;
  title: string;
  status: IChapter['status'];
  storySlug: string;
  storyTitle: string;
  pullRequest: {
    isPR: boolean;
    prId?: string;
    status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'MERGED';
  };
  stats: {
    reads: number;
    comments: number;
    childBranches: number;
  };
  author: {
    clerkId: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Extended chapter with author info for detail views
interface IChapterWithAuthor extends IChapter {
  author: IPublicViewUser;
  story?: {
    _id: string;
    title: string;
    slug: string;
  };
}

// Response for getting a single chapter by ID
interface IGetChapterByIdResponse extends IBaseType {
  data: IChapterWithAuthor;
}

// Response for getting user's chapters (uses lightweight list item)
interface IGetMyChaptersResponse extends IBaseType {
  data: IMyChapterListItem[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Response for updating a chapter
interface IUpdateChapterResponse extends IBaseType {
  data: IChapter;
}

// Response for deleting a chapter
interface IDeleteChapterResponse extends IBaseType {
  data: {
    deletedId: string;
  };
}

export type {
  IMyChapterListItem,
  IChapterWithAuthor,
  IGetChapterByIdResponse,
  IGetMyChaptersResponse,
  IUpdateChapterResponse,
  IDeleteChapterResponse,
};
