import type { AxiosInstance } from 'axios';
import type {
  IUpdateChapterRequest,
  IGetMyChaptersRequest,
} from '@/type/chapter/chapter.request.types';
import type {
  IGetChapterByIdResponse,
  IGetMyChaptersResponse,
  IUpdateChapterResponse,
  IDeleteChapterResponse,
} from '@/type/chapter/chapter.response.types';

// Chapter API factory
const chapterApi = (api: AxiosInstance) => ({
  // ===== QUERIES =====

  // Get a single chapter by ID with full details
  getById: async (chapterId: string) => {
    const res = await api.get<IGetChapterByIdResponse>(`/chapters/${chapterId}`);
    return res.data;
  },

  // Get current user's chapters
  getMyChapters: async (params?: IGetMyChaptersRequest) => {
    const res = await api.get<IGetMyChaptersResponse>('/chapters/my', { params });
    return res.data;
  },

  // ===== MUTATIONS =====

  // Update chapter content/title
  updateChapter: async (payload: IUpdateChapterRequest) => {
    const { chapterId, ...body } = payload;
    const res = await api.patch<IUpdateChapterResponse>(`/chapters/${chapterId}`, body);
    return res.data;
  },

  // Delete a chapter (soft delete - marks as DELETED)
  deleteChapter: async (chapterId: string) => {
    const res = await api.delete<IDeleteChapterResponse>(`/chapters/${chapterId}`);
    return res.data;
  },
});

export { chapterApi };
