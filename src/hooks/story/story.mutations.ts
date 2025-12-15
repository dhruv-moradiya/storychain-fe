import { useApi } from '@/hook/useApi';
import { storyApi } from '@/api/story.api';
import { useMutation } from '@tanstack/react-query';
import type { TStoryFormValues } from '@/schema/story.schema';
import type { TStoryCollaboratorRole } from '@/type/story.type';

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
