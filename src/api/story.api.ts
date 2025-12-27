import type { AxiosInstance } from 'axios';
import type { TStoryFormValues } from '@/schema/story.schema';
import type { IStory, IStoryCollaboratorWithUser, TStoryCollaboratorRole } from '@/type/story.type';
import type {
  IStorySettingUpdateRequest,
  IUpdateStoryCoverImageRequest,
  IUpdateStoryCardImageRequest,
} from '@/type/story/story-request.type';
import type {
  IGetMyStoriesResponse,
  IGetStoryBySlugResponse,
  IGetStoryCollaboratorsResponse,
  ICreateInvitationResponse,
  IGetStoryTreeResponse,
  ICreateStoryResponse,
  IAddChapterResponse,
  IGetNewStoriesResponse,
  IGetDraftStoriesResponse,
  IPublishStoryResponse,
  IStoryListItemResponse,
  IGetSignatureUrlResponse,
  IGetStoryOverviewBySlugResponse,
  IGetStorySettingsBySlugResponse,
  IUpdateStorySettingsBySlugResponse,
  IUpdateStoryCoverImageResponse,
  IUpdateStoryCardImageResponse,
} from '@/type/story/story-response.type';

// Request payload types
interface ICreateInvitationPayload {
  storyId: string;
  role: TStoryCollaboratorRole;
  invitedUserId: string;
  invitedUserName: string;
}

interface ICreateChapterPayload {
  parentChapterId: string | null;
  title: string;
  content: string;
  storyId: string;
}

interface IPublishStoryPayload {
  storyId: string;
}

// Story API factory
const storyApi = (api: AxiosInstance) => ({
  // ===== QUERIES =====

  getMyStories: async (): Promise<IStory[]> => {
    const res = await api.get<IGetMyStoriesResponse>('/stories/my');
    return res.data.data;
  },

  getDraftStories: async (): Promise<IStory[]> => {
    const res = await api.get<IGetDraftStoriesResponse>('/stories/draft');
    return res.data.data;
  },

  getNewStories: async (): Promise<IStoryListItemResponse[]> => {
    const res = await api.get<IGetNewStoriesResponse>('/stories/new');
    return res.data.data;
  },

  getStoryOverviewBySlug: async (slug: string): Promise<IGetStoryOverviewBySlugResponse> => {
    const res = await api.get<IGetStoryOverviewBySlugResponse>(`/stories/slug/${slug}/overview`);
    return res.data;
  },

  getStorySettingsBySlug: async (
    slug: string
  ): Promise<IGetStorySettingsBySlugResponse['data']> => {
    const res = await api.get<IGetStorySettingsBySlugResponse>(`/stories/slug/${slug}/settings`);
    return res.data.data;
  },

  getBySlug: async (slug: string): Promise<IStory> => {
    const res = await api.get<IGetStoryBySlugResponse>(`/stories/slug/${slug}`);
    return res.data.data;
  },

  getById: async (storyId: string): Promise<IStory> => {
    const res = await api.get<IGetStoryBySlugResponse>(`/stories/id/${storyId}`);
    return res.data.data;
  },

  getCollaborators: async (storyId: string): Promise<IStoryCollaboratorWithUser[]> => {
    const res = await api.get<IGetStoryCollaboratorsResponse>(
      `/stories/id/${storyId}/collaborators`
    );
    return res.data.data;
  },

  getTree: async (storyId: string) => {
    const res = await api.get<IGetStoryTreeResponse>(`/stories/id/${storyId}/tree`);
    return res.data.data;
  },

  getSignatureUrl: async (slug: string): Promise<IGetSignatureUrlResponse> => {
    const res = await api.get<IGetSignatureUrlResponse>(`/stories/slug/${slug}/signature-url`);
    return res.data;
  },

  // ===== MUTATIONS =====

  createStory: async (payload: TStoryFormValues) => {
    const res = await api.post<ICreateStoryResponse>('/stories', payload);
    return res.data.data;
  },

  publishStory: async (payload: IPublishStoryPayload) => {
    const { storyId } = payload;
    const res = await api.post<IPublishStoryResponse>(`/stories/id/${storyId}/publish`);
    return res.data.data;
  },

  createInvitation: async (payload: ICreateInvitationPayload) => {
    const { storyId, ...body } = payload;
    const res = await api.post<ICreateInvitationResponse>(
      `/stories/id/${storyId}/collaborators`,
      body
    );
    return res.data.data;
  },

  createChapter: async (payload: ICreateChapterPayload) => {
    const { storyId, ...body } = payload;
    const res = await api.post<IAddChapterResponse>(`/stories/id/${storyId}/chapters`, body);
    return res.data.data;
  },

  updateStorySettingBySlug: async (
    payload: IStorySettingUpdateRequest
  ): Promise<IUpdateStorySettingsBySlugResponse['data']> => {
    const { slug, ...body } = payload;
    const res = await api.post<IUpdateStorySettingsBySlugResponse>(
      `/stories/slug/${slug}/settings`,
      body
    );
    return res.data.data;
  },

  updateStoryCoverImageBySlug: async (
    payload: IUpdateStoryCoverImageRequest
  ): Promise<IUpdateStoryCoverImageResponse['data']> => {
    const { slug, coverImage } = payload;
    const res = await api.patch<IUpdateStoryCoverImageResponse>(
      `/stories/slug/${slug}/cover-image`,
      { coverImage }
    );
    return res.data.data;
  },

  updateStoryCardImageBySlug: async (
    payload: IUpdateStoryCardImageRequest
  ): Promise<IUpdateStoryCardImageResponse['data']> => {
    const { slug, cardImage } = payload;
    const res = await api.patch<IUpdateStoryCardImageResponse>(
      `/stories/slug/${slug}/card-image`,
      { cardImage }
    );
    return res.data.data;
  },
});

// Export types for external use
export type { ICreateInvitationPayload, ICreateChapterPayload, IPublishStoryPayload };

export { storyApi };
