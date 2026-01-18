import { useCallback } from 'react';
import { useSearchParams } from 'react-router';
import type { Editor } from '@tiptap/react';
import type { IChapterAutoSave } from '@/type/chapterAutoSave/chapterAutoSave.type';
import { useAutoSaveContent } from '@/hooks/chapterAutoSave/chapterAutoSave.mutations';
import toast from '@/components/common/toast';
import { useBuilderParams } from './useBuilderParams';
import { getAutoSaveType, buildSavePayload } from './useBuilderPayload';

interface UseBuilderSaveOptions {
  editor: Editor | null;
  title: string;
  selectedDraft: IChapterAutoSave | undefined;
}

interface UseBuilderSaveReturn {
  handleSave: () => Promise<void>;
  isSaving: boolean;
}

/**
 * Hook for handling manual save in story builder
 * Composes useBuilderParams and payload utilities for clean save logic
 */
function useBuilderSave({
  editor,
  title,
  selectedDraft,
}: UseBuilderSaveOptions): UseBuilderSaveReturn {
  const [, setSearchParams] = useSearchParams();
  const {
    storySlug,
    mode,
    autoSaveId,
    parentChapterId: parentFromParams,
    isUpdatingExistingDraft,
  } = useBuilderParams();

  const { mutateAsync: saveContent, isPending: isSaving } = useAutoSaveContent();

  const handleSave = useCallback(async () => {
    if (!editor) {
      toast.error('Editor is not ready');
      return;
    }

    // If updating existing draft but draft data not loaded yet, wait
    if (isUpdatingExistingDraft && !selectedDraft) {
      toast.error('Draft is still loading, please try again');
      return;
    }

    // storySlug is required only for new drafts (no autoSaveId)
    // When updating existing draft, backend already knows the story
    if (!isUpdatingExistingDraft && !storySlug) {
      toast.error('Story slug is missing');
      return;
    }

    const content = editor.getHTML();
    const parentParam = parentFromParams ? parentFromParams : 'root';
    const autoSaveType = getAutoSaveType(selectedDraft, parentParam, mode);

    // Get parentChapterId and chapterId from draft first, then fallback to query params
    const parentChapterId = selectedDraft?.parentChapterId ?? parentFromParams;
    const chapterId = selectedDraft?.chapterId;

    // Validate required fields for non-root chapters
    if (autoSaveType === 'new_chapter' && !parentChapterId) {
      toast.error('Parent chapter is required for new chapters');
      return;
    }

    if (autoSaveType === 'update_chapter' && (!parentChapterId || !chapterId)) {
      toast.error('Chapter information is missing for update');
      return;
    }

    try {
      const payload = buildSavePayload({
        title,
        content,
        storySlug,
        autoSaveType,
        autoSaveId,
        parentChapterId,
        chapterId,
      });

      const response = await saveContent(payload);
      const newAutoSaveId = response.data._id;

      // Add autoSaveId to query params if not already present
      if (!autoSaveId && newAutoSaveId) {
        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.set('autoSaveId', newAutoSaveId);
          return newParams;
        });
      }

      toast.success('Draft saved successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save draft';
      toast.error(errorMessage);
    }
  }, [
    editor,
    storySlug,
    mode,
    autoSaveId,
    parentFromParams,
    title,
    selectedDraft,
    isUpdatingExistingDraft,
    saveContent,
    setSearchParams,
  ]);

  return {
    handleSave,
    isSaving,
  };
}

export { useBuilderSave };
export type { UseBuilderSaveOptions, UseBuilderSaveReturn };
