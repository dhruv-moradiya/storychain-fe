// Chapter API Request Types

import type { TChapterStatus } from './chapter.types';

interface IGetChapterByIdRequest {
  chapterId: string;
}

interface IUpdateChapterRequest {
  chapterId: string;
  title?: string;
  content?: string;
}

interface IDeleteChapterRequest {
  chapterId: string;
}

interface IGetMyChaptersRequest {
  page?: number;
  limit?: number;
  status?: TChapterStatus;
}

export type {
  IGetChapterByIdRequest,
  IUpdateChapterRequest,
  IDeleteChapterRequest,
  IGetMyChaptersRequest,
};
