import type {
  ICreateInvitation,
  IGetAllUserStoryCollaboratorResponse,
  IGetAllUserStoryResponse,
  IStory,
  IStoryTreeResponse,
  TStoryCollaboratorRole,
} from '@/type/story.type';
import type { TStoryFormValues } from '@/schema/story.schema';
import type { AxiosInstance } from 'axios';

const storyApi = (api: AxiosInstance) => ({
  getMyStories: async () => {
    const res = await api.get<IGetAllUserStoryResponse>('/stories/my');
    return res.data.data;
  },

  getBySlug: async (slug: string) => {
    const res = await api.get<{ data: IStory }>(`/stories/${slug}`);
    return res.data.data;
  },

  getCollaborators: async (storyId: string) => {
    const res = await api.get<IGetAllUserStoryCollaboratorResponse>(
      `/stories/${storyId}/collaborators`
    );
    return res.data.data;
  },

  createStory: async (payload: TStoryFormValues) => {
    const res = await api.post('/stories', payload);
    return res.data;
  },

  createInvitation: async (payload: {
    storyId: string;
    role: TStoryCollaboratorRole;
    invitedUserId: string;
    invitedUserName: string;
  }) => {
    const { storyId, ...body } = payload;
    const res = await api.post<ICreateInvitation>(`/stories/${storyId}/collaborators`, body);
    return res.data.data;
  },

  getTree: async (storyId: string) => {
    const res = await api.get<IStoryTreeResponse>(`/stories/${storyId}/tree`);
    return res.data.data;
  },

  createChapter: async (payload: {
    parentChapterId: string | null;
    title: string;
    content: string;
    storyId: string;
  }) => {
    const { storyId, ...body } = payload;
    const res = await api.post(`/stories/${storyId}/chapters`, body);
    return res.data;
  },
});

export { storyApi };
