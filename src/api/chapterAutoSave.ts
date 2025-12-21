import type { AxiosInstance } from 'axios';
import type {
  IAutoSaveContentRequest,
  IDisableAutoSaveRequest,
  IEnableAutoSaveRequest,
} from '@/type/chapterAutoSave/chapterAutoSave.request.types';
import type {
  IChapterAutoSaveContentResponse,
  IDisableAutoSaveResponse,
  IEnableAutoSaveResponse,
  IGetAutoSaveDraftResponse,
} from '@/type/chapterAutoSave/chapterAutoSave.response.types';

const chapterAutoSaveApi = (api: AxiosInstance) => ({
  enableAutoSave: async (input: IEnableAutoSaveRequest) => {
    const res = await api.post<IEnableAutoSaveResponse>(`/auto-save/enable`, input);
    return res.data;
  },
  autoSaveContent: async (input: IAutoSaveContentRequest) => {
    const res = await api.post<IChapterAutoSaveContentResponse>(`/auto-save/save`, input);
    return res.data;
  },
  disableAutoSave: async (input: IDisableAutoSaveRequest) => {
    const res = await api.post<IDisableAutoSaveResponse>(`/auto-save/disable`, input);
    return res.data;
  },
  getAutoSaveDraft: async () => {
    const res = await api.get<IGetAutoSaveDraftResponse>(`/auto-save/draft`);
    return res.data;
  },
});

export { chapterAutoSaveApi };
