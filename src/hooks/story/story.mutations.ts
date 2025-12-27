import { useApi } from '@/hooks/useApi';
import { storyApi } from '@/api/story.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { TStoryFormValues } from '@/schema/story.schema';
import type { TStoryCollaboratorRole } from '@/type/story.type';
import type {
  IStorySettingUpdateRequest,
  IUpdateStoryCoverImageRequest,
  IUpdateStoryCardImageRequest,
} from '@/type/story/story-request.type';

export function useCreateStory() {
  const api = useApi();

  return useMutation({
    mutationFn: (payload: TStoryFormValues) => storyApi(api).createStory(payload),
    meta: { requiresAuth: true },
  });
}

export function useCreateInvitation() {
  const api = useApi();

  return useMutation({
    mutationFn: (payload: {
      storyId: string;
      role: TStoryCollaboratorRole;
      invitedUserId: string;
      invitedUserName: string;
    }) => storyApi(api).createInvitation(payload),
  });
}

export function useCreateChapter() {
  const api = useApi();

  return useMutation({
    mutationFn: (payload: {
      parentChapterId: string | null;
      title: string;
      content: string;
      storyId: string;
    }) => storyApi(api).createChapter(payload),
  });
}

export function useUpdateStorySettings() {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IStorySettingUpdateRequest) =>
      storyApi(api).updateStorySettingBySlug(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['story', 'overview'] });
      queryClient.invalidateQueries({ queryKey: ['story', 'settings'] });
    },
  });
}

export function useUpdateStoryCoverImage() {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUpdateStoryCoverImageRequest) =>
      storyApi(api).updateStoryCoverImageBySlug(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['story', 'overview'] });
    },
  });
}

export function useUpdateStoryCardImage() {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUpdateStoryCardImageRequest) =>
      storyApi(api).updateStoryCardImageBySlug(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['story', 'overview'] });
    },
  });
}
