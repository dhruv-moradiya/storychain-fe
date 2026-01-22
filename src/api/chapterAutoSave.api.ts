import type { AxiosInstance } from 'axios';
import type {
  TAutoSaveContentRequest,
  IDisableAutoSaveRequest,
  IEnableAutoSaveRequest,
  IConvertAutoSaveToDraftRequest,
  IConvertAutoSaveToPublishedRequest,
} from '@/type/chapterAutoSave/chapterAutoSave.request.types';
import type {
  IChapterAutoSaveContentResponse,
  IDisableAutoSaveResponse,
  IEnableAutoSaveResponse,
  IGetAutoSaveDraftResponse,
  IConvertAutoSaveToDraftResponse,
  IConvertAutoSaveToPublishedResponse,
} from '@/type/chapterAutoSave/chapterAutoSave.response.types';

const chapterAutoSaveApi = (api: AxiosInstance) => ({
  enableAutoSave: async (input: IEnableAutoSaveRequest) => {
    const res = await api.post<IEnableAutoSaveResponse>(`/auto-save/enable`, input);
    return res.data;
  },
  autoSaveContent: async (input: TAutoSaveContentRequest) => {
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
  convertToDraft: async (input: IConvertAutoSaveToDraftRequest) => {
    const res = await api.post<IConvertAutoSaveToDraftResponse>(
      `/auto-save/convert-to-draft`,
      input
    );
    return res.data;
  },
  convertToPublished: async (input: IConvertAutoSaveToPublishedRequest) => {
    const res = await api.post<IConvertAutoSaveToPublishedResponse>(
      `/auto-save/convert-to-published`,
      input
    );
    return res.data;
  },
});

export { chapterAutoSaveApi };
