import { useCallback, useEffect, useRef, useState } from 'react';
import type { Editor } from '@tiptap/react';
import {
  useAutoSaveContent,
  useEnableAutoSave,
  useDisableAutoSave,
} from '@/hooks/chapterAutoSave/chapterAutoSave.mutations';
import { useUser } from '@clerk/clerk-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryKey } from '@/lib/query-keys';

export interface AutoSaveState {
  status: 'idle' | 'saving' | 'saved' | 'error';
  lastSavedAt: Date | null;
  error: string | null;
}

export interface DraftData {
  chapterId?: string;
  draftId?: string;
  title: string;
  content: string;
  lastSavedAt: Date;
  wordCount?: number;
  charCount?: number;
}

const AUTO_SAVE_INTERVAL = 60000; // 1 minute

interface UseAutoSaveOptions {
  editor: Editor | null;
  chapterId?: string;
  draftId?: string;
  title?: string;
  enabled?: boolean;
}

export function useAutoSave({
  editor,
  chapterId,
  draftId,
  title = 'Untitled Chapter',
  enabled = false,
}: UseAutoSaveOptions) {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [state, setState] = useState<AutoSaveState>({
    status: 'idle',
    lastSavedAt: null,
    error: null,
  });
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(enabled);
  const [activeDraftId, setActiveDraftId] = useState<string | undefined>(draftId);

  const lastContentRef = useRef<string>('');
  const titleRef = useRef<string>(title);

  // Keep title ref updated
  useEffect(() => {
    titleRef.current = title;
  }, [title]);

  const { mutateAsync: saveContent } = useAutoSaveContent();
  const { mutateAsync: enableAutoSave } = useEnableAutoSave();
  const { mutateAsync: disableAutoSave } = useDisableAutoSave();

  const getDraftData = useCallback((): DraftData | null => {
    if (!editor) return null;

    const content = editor.getHTML();
    const text = editor.getText();

    return {
      chapterId,
      draftId: activeDraftId,
      title: titleRef.current,
      content,
      lastSavedAt: new Date(),
      wordCount: text.trim() ? text.trim().split(/\s+/).length : 0,
      charCount: text.length,
    };
  }, [editor, chapterId, activeDraftId]);

  // Perform save function for the interval
  const performSave = useCallback(async () => {
    if (!editor || !user?.id || !autoSaveEnabled) return null;

    const currentContent = editor.getHTML();

    // Skip if content hasn't changed
    if (currentContent === lastContentRef.current) {
      return null;
    }

    setState((prev) => ({ ...prev, status: 'saving', error: null }));

    try {
      const draftData = getDraftData();
      if (!draftData) throw new Error('Failed to get draft data');

      // Save to backend via API
      await saveContent({
        userId: user.id,
        title: draftData.title,
        content: draftData.content,
        draftId: activeDraftId,
        chapterId,
      });

      lastContentRef.current = currentContent;
      setState({
        status: 'saved',
        lastSavedAt: new Date(),
        error: null,
      });

      return { success: true };
    } catch (error) {
      setState((prev) => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'Save failed',
      }));
      return null;
    }
  }, [editor, user?.id, autoSaveEnabled, getDraftData, saveContent, activeDraftId, chapterId]);

  // Use TanStack Query for interval-based auto-save (only when enabled)
  useQuery({
    queryKey: QueryKey.story.autoSave.interval(activeDraftId ?? 'new'),
    queryFn: performSave,
    enabled: autoSaveEnabled && !!user?.id && !!editor,
    refetchInterval: AUTO_SAVE_INTERVAL,
    refetchIntervalInBackground: false,
  });

  // Enable auto-save via API
  const handleEnableAutoSave = useCallback(async () => {
    if (!user?.id) return;

    try {
      const response = await enableAutoSave({
        userId: user.id,
        draftId: activeDraftId,
        chapterId,
      });

      // Store the draftId returned from enable API
      if (response?.data?._id) {
        setActiveDraftId(response.data._id);
      }

      setAutoSaveEnabled(true);
      // Invalidate draft query to refetch
      queryClient.invalidateQueries({ queryKey: QueryKey.story.autoSave.draft() });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'Failed to enable auto-save',
      }));
    }
  }, [user?.id, activeDraftId, chapterId, enableAutoSave, queryClient]);

  // Disable auto-save via API
  const handleDisableAutoSave = useCallback(async () => {
    if (!user?.id) return;

    try {
      await disableAutoSave({
        userId: user.id,
        draftId: activeDraftId,
        chapterId,
      });

      setAutoSaveEnabled(false);
      // Invalidate draft query to refetch
      queryClient.invalidateQueries({ queryKey: QueryKey.story.autoSave.draft() });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'Failed to disable auto-save',
      }));
    }
  }, [user?.id, activeDraftId, chapterId, disableAutoSave, queryClient]);

  // Toggle auto-save (enable/disable via API)
  const toggleAutoSave = useCallback(async () => {
    if (autoSaveEnabled) {
      await handleDisableAutoSave();
    } else {
      await handleEnableAutoSave();
    }
  }, [autoSaveEnabled, handleEnableAutoSave, handleDisableAutoSave]);

  // Manual force save (for Ctrl+S or save button)
  const forceSave = useCallback(() => {
    performSave();
  }, [performSave]);

  return {
    ...state,
    autoSaveEnabled,
    toggleAutoSave,
    forceSave,
    getDraftData,
    activeDraftId,
  };
}
