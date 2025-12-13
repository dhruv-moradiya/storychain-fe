import { useApi } from '@/hook/useApi';
import type { TStoryFormValues } from '@/schema/story.schema';
import type {
  ICreateInvitation,
  IGetAllUserStoryCollaboratorResponse,
  IGetAllUserStoryResponse,
  IStory,
  TStoryCollaboratorRole,
} from '@/type/story.type';
import { useAuth } from '@clerk/clerk-react';
import { useMutation, useQuery, type UseQueryOptions } from '@tanstack/react-query';

function useGetUserStories() {
  const api = useApi();
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: ['current_user_stories'],
    queryFn: async () => {
      const res = await api.get<IGetAllUserStoryResponse>('/stories/my');
      return res.data.data;
    },
    enabled: isSignedIn,
    staleTime: Infinity,
  });
}

function useGetStoryOverviewBySlug(
  slug: string,
  options: Omit<
    UseQueryOptions<IStory, unknown, IStory, (string | undefined)[]>,
    'queryKey' | 'queryFn'
  > = {}
) {
  const api = useApi();
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: ['story_by_slug', slug],
    queryFn: async () => {
      const res = await api.get(`/stories/${slug}`);
      return res.data.data;
    },
    enabled: isSignedIn && !!slug, // user must be signed in + slug must exist
    staleTime: Infinity,
    ...options, // ⭐ allow override (e.g., enabled: !cached)
  });
}

function useGetStoryCollaboratos(storyId: string) {
  const api = useApi();
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: ['story_collaborators', storyId],
    queryFn: async () => {
      const res = await api.get<IGetAllUserStoryCollaboratorResponse>(
        `/stories/${storyId}/collaborators`
      );
      return res.data.data;
    },
    enabled: isSignedIn && !!storyId,
    staleTime: Infinity,
  });
}

function useCreateStory() {
  const api = useApi();

  return useMutation({
    mutationFn: async (payload: TStoryFormValues) => {
      const res = await api.post('/stories', payload);
      return res.data;
    },
    meta: { requiresAuth: true },
  });
}

function useCreateInvitation() {
  const api = useApi();

  return useMutation({
    mutationFn: async (payload: {
      storyId: string;
      role: TStoryCollaboratorRole;
      invitedUserId: string;
      invitedUserName: string;
    }) => {
      const { storyId, ...body } = payload;

      const res = await api.post<ICreateInvitation>(`/stories/${storyId}/collaborators`, body);

      return res.data.data;
    },
  });
}

function useUpdateStorySetting() {}

export {
  useGetUserStories,
  useGetStoryOverviewBySlug,
  useCreateStory,
  useGetStoryCollaboratos,
  useCreateInvitation,
};
