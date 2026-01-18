import type {
  TAutoSaveContentRequest,
  TAutoSaveContentRootChapter,
  TAutoSaveContentNewChapter,
  TAutoSaveContentUpdateChapter,
} from '@/type/chapterAutoSave/chapterAutoSave.request.types';
import type { IChapterAutoSave, TautoSaveType } from '@/type/chapterAutoSave/chapterAutoSave.type';
import type { EditorMode } from './useBuilderParams';

interface BuildPayloadParams {
  title: string;
  content: string;
  storySlug: string | undefined;
  autoSaveType: TautoSaveType;
  autoSaveId: string | undefined;
  parentChapterId: string | undefined;
  chapterId: string | undefined;
}

/**
 * Determines autoSaveType based on draft or URL params
 * Priority:
 * 1. If draft exists (has autoSaveId), use draft's autoSaveType
 * 2. If parent=root → root_chapter
 * 3. If mode=update → update_chapter
 * 4. Otherwise → new_chapter
 */
function getAutoSaveType(
  draft: IChapterAutoSave | undefined,
  parentFromParams: string | undefined,
  mode: EditorMode | null
): TautoSaveType {
  // If we have a draft, use its autoSaveType
  if (draft?.autoSaveType) {
    return draft.autoSaveType;
  }

  // If parent is 'root', it's a root chapter
  if (parentFromParams === 'root') {
    return 'root_chapter';
  }

  // Otherwise, use mode to determine type
  switch (mode) {
    case 'update':
      return 'update_chapter';
    case 'new':
    default:
      return 'new_chapter';
  }
}

/**
 * Builds the save payload based on autoSaveType
 * Returns properly typed discriminated union
 * Note: storySlug is optional when autoSaveId is provided (updating existing draft)
 */
function buildSavePayload({
  title,
  content,
  storySlug,
  autoSaveType,
  autoSaveId,
  parentChapterId,
  chapterId,
}: BuildPayloadParams): TAutoSaveContentRequest {
  const baseFields = {
    title,
    content,
    ...(storySlug && { storySlug }),
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

export { getAutoSaveType, buildSavePayload };
export type { BuildPayloadParams };
