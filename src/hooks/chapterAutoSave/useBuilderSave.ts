import { useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { toast } from 'sonner';
import type { Editor } from '@tiptap/react';
import type {
  TAutoSaveContentRequest,
  TAutoSaveContentRootChapter,
  TAutoSaveContentNewChapter,
  TAutoSaveContentUpdateChapter,
} from '@/type/chapterAutoSave/chapterAutoSave.request.types';
import type { IChapterAutoSave, TautoSaveType } from '@/type/chapterAutoSave/chapterAutoSave.type';
import { useAutoSaveContent } from './chapterAutoSave.mutations';

type EditorMode = 'new' | 'root' | 'update';

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
 * Maps URL mode param to autoSaveType
 */
function getAutoSaveTypeFromMode(mode: EditorMode | null): TautoSaveType {
  switch (mode) {
    case 'new':
      return 'new_chapter';
    case 'root':
      return 'root_chapter';
    case 'update':
      return 'update_chapter';
    default:
      return 'new_chapter';
  }
}

interface BuildSavePayloadParams {
  title: string;
  content: string;
  storySlug: string;
  autoSaveType: TautoSaveType;
  autoSaveId: string | undefined;
  parentChapterId: string | undefined;
  chapterId: string | undefined;
}

/**
 * Builds the save payload based on autoSaveType
 * Returns properly typed discriminated union
 */
function buildSavePayload({
  title,
  content,
  storySlug,
  autoSaveType,
  autoSaveId,
  parentChapterId,
  chapterId,
}: BuildSavePayloadParams): TAutoSaveContentRequest {
  const baseFields = {
    title,
    content,
    storySlug,
    ...(autoSaveId && { autoSaveId }),
  };

  switch (autoSaveType) {
    case 'root_chapter':
      return {
        ...baseFields,
        autoSaveType: 'root_chapter',
      } satisfies TAutoSaveContentRootChapter;

    case 'new_chapter': {
      if (!parentChapterId) {
        throw new Error('parentChapterId is required for new_chapter type');
      }
      return {
        ...baseFields,
        autoSaveType: 'new_chapter',
        parentChapterId,
      } satisfies TAutoSaveContentNewChapter;
    }

    case 'update_chapter': {
      if (!parentChapterId || !chapterId) {
        throw new Error('parentChapterId and chapterId are required for update_chapter type');
      }
      return {
        ...baseFields,
        autoSaveType: 'update_chapter',
        parentChapterId,
        chapterId,
      } satisfies TAutoSaveContentUpdateChapter;
    }
  }
}

/**
 * Hook for handling manual save in story builder
 * Calls chapterAutoSaveApi.autoSaveContent with properly typed payload
 */
function useBuilderSave({
  editor,
  title,
  selectedDraft,
}: UseBuilderSaveOptions): UseBuilderSaveReturn {
  const { storySlug } = useParams<{ storySlug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const mode = searchParams.get('mode') as EditorMode | null;
  const autoSaveId = searchParams.get('autoSaveId') ?? undefined;
  const parentFromParams = searchParams.get('parent') ?? undefined;

  const { mutateAsync: saveContent, isPending: isSaving } = useAutoSaveContent();

  const handleSave = useCallback(async () => {
    if (!editor) {
      toast.error('Editor is not ready');
      return;
    }

    if (!storySlug) {
      toast.error('Story slug is missing');
      return;
    }

    const content = editor.getHTML();
    const autoSaveType = getAutoSaveTypeFromMode(mode);

    // Get parentChapterId from query params first, fallback to selectedDraft
    const parentChapterId = parentFromParams ?? selectedDraft?.parentChapterId;
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
