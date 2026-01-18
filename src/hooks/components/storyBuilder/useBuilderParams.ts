import { useParams, useSearchParams } from 'react-router';

type EditorMode = 'new' | 'update';

interface BuilderParams {
  storySlug: string | undefined;
  mode: EditorMode | null;
  autoSaveId: string | undefined;
  parentChapterId: string | undefined;
  isUpdatingExistingDraft: boolean;
}

/**
 * Hook for extracting and parsing story builder URL params
 */
function useBuilderParams(): BuilderParams {
  const { storySlug } = useParams<{ storySlug: string }>();
  const [searchParams] = useSearchParams();

  const mode = searchParams.get('mode') as EditorMode | null;
  const autoSaveId = searchParams.get('autoSaveId') ?? undefined;
  const parentFromParams = searchParams.get('parent') ?? undefined;

  // Determine parentChapterId from URL (skip if 'root')
  const parentChapterId =
    parentFromParams && parentFromParams !== 'root' ? parentFromParams : undefined;

  return {
    storySlug,
    mode,
    autoSaveId,
    parentChapterId,
    isUpdatingExistingDraft: !!autoSaveId,
  };
}

export { useBuilderParams };
export type { BuilderParams, EditorMode };
