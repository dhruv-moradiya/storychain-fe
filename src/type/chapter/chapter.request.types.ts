// Chapter API Request Types

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
  status?: 'PUBLISHED' | 'PENDING_APPROVAL' | 'REJECTED' | 'DELETED';
}

export type {
  IGetChapterByIdRequest,
  IUpdateChapterRequest,
  IDeleteChapterRequest,
  IGetMyChaptersRequest,
};
