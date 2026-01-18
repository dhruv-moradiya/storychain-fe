import { useMemo } from 'react';
import { useGetUserStories, useGetStoryTree, useGetStoryBySlug } from '@/hooks/story/story.queries';
import { useGetAutoSaveDraft } from '@/hooks/chapterAutoSave/chapterAutoSave.queries';
import type {
  StoryOption,
  ChapterOption,
  DraftOption,
} from '@/components/common/submit-request-dialog/submit-request-dialog.types';
import type { IStory } from '@/type/story';
import type { IChapterNode } from '@/type/story-canvas.type';

interface UseSubmitRequestDataProps {
  selectedStoryId?: string;
  storySlug?: string;
}

export function useSubmitRequestData({
  selectedStoryId,
  storySlug,
}: UseSubmitRequestDataProps = {}) {
  // Fetch user's stories
  const { data: storiesData, isLoading: isLoadingStories } = useGetUserStories();

  // Fetch story by slug (for pre-selection from story builder)
  const { data: storyBySlug, isLoading: isLoadingStoryBySlug } = useGetStoryBySlug(
    storySlug || '',
    { enabled: !!storySlug }
  );

  // Fetch chapters for selected story
  const { data: chaptersData, isLoading: isLoadingChapters } = useGetStoryTree(
    selectedStoryId || ''
  );

  // Fetch user's drafts
  const { data: draftsResponse, isLoading: isLoadingDrafts } = useGetAutoSaveDraft();

  // Transform stories data (API returns IStory[] directly)
  const stories: StoryOption[] = useMemo(() => {
    if (!storiesData) return [];
    return (storiesData as IStory[]).map((story) => ({
      id: story._id,
      title: story.title,
      slug: story.slug,
      genre: story.settings?.genres?.[0] || 'Unknown',
      chapterCount: story.stats?.totalChapters || 0,
    }));
  }, [storiesData]);

  // Transform chapters data (tree structure - flatten it)
  const chapters: ChapterOption[] = useMemo(() => {
    if (!chaptersData) return [];
    const treeData = chaptersData as { storyId: string; chapters: IChapterNode[] };
    if (!treeData.chapters) return [];

    // Flatten the tree structure
    const flattenChapters = (
      nodes: IChapterNode[],
      result: ChapterOption[] = [],
      orderRef = { current: 1 }
    ): ChapterOption[] => {
      nodes.forEach((node) => {
        result.push({
          id: node._id,
          title: node.title,
          order: orderRef.current++,
        });
        if (node.children && node.children.length > 0) {
          flattenChapters(node.children, result, orderRef);
        }
      });
      return result;
    };
    return flattenChapters(treeData.chapters);
  }, [chaptersData]);

  // Transform drafts data
  const drafts: DraftOption[] = useMemo(() => {
    if (!draftsResponse?.data) return [];
    return draftsResponse.data.map((draft) => ({
      id: draft._id,
      title: draft.title || 'Untitled Draft',
      content: draft.content || '',
      updatedAt: draft.lastSavedAt ? new Date(draft.lastSavedAt).toLocaleDateString() : 'Unknown',
      wordCount: draft.content ? draft.content.split(/\s+/).length : 0,
      storySlug: draft.storySlug,
      parentChapterId: draft.parentChapterId,
    }));
  }, [draftsResponse?.data]);

  // Find story by ID
  const findStoryById = (storyId: string): StoryOption | undefined => {
    return stories.find((s) => s.id === storyId);
  };

  // Find story by slug
  const findStoryBySlug = (slug: string): StoryOption | undefined => {
    return stories.find((s) => s.slug === slug);
  };

  // Find chapter by ID
  const findChapterById = (chapterId: string): ChapterOption | undefined => {
    return chapters.find((c) => c.id === chapterId);
  };

  // Find draft by ID
  const findDraftById = (draftId: string): DraftOption | undefined => {
    return drafts.find((d) => d.id === draftId);
  };

  // Pre-selected story from slug (for story builder context)
  const preSelectedStory: StoryOption | undefined = useMemo(() => {
    if (!storyBySlug) return undefined;
    return {
      id: storyBySlug._id,
      title: storyBySlug.title,
      slug: storyBySlug.slug,
      genre: storyBySlug.settings?.genres?.[0] || 'Unknown',
      chapterCount: storyBySlug.stats?.totalChapters || 0,
    };
  }, [storyBySlug]);

  return {
    // Data
    stories,
    chapters,
    drafts,
    preSelectedStory,

    // Loading states
    isLoadingStories,
    isLoadingChapters,
    isLoadingDrafts,
    isLoadingStoryBySlug,
    isLoading: isLoadingStories || isLoadingDrafts,

    // Helpers
    findStoryById,
    findStoryBySlug,
    findChapterById,
    findDraftById,
  };
}
