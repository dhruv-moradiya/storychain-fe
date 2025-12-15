import { useCallback, useEffect, useRef, useState } from 'react';
import type { Editor } from '@tiptap/react';

export interface AutoSaveState {
  status: 'idle' | 'saving' | 'saved' | 'unsaved' | 'error';
  lastSavedAt: Date | null;
  error: string | null;
}

export interface DraftData {
  chapterId: string;
  storyId: string;
  title: string;
  content: string;
  lastSavedAt: string;
  wordCount: number;
  charCount: number;
}

const STORAGE_KEY = 'storychain_draft';
const AUTO_SAVE_INTERVAL = 30000; // 30 seconds
const DEBOUNCE_DELAY = 1000; // 1 second after typing stops

interface UseAutoSaveOptions {
  editor: Editor | null;
  chapterId?: string;
  storyId?: string;
  title?: string;
  enabled?: boolean;
  onSave?: (data: DraftData) => Promise<void>;
}

export function useAutoSave({
  editor,
  chapterId = 'new',
  storyId = '',
  title = 'Untitled Chapter',
  enabled = true,
  onSave,
}: UseAutoSaveOptions) {
  const [state, setState] = useState<AutoSaveState>({
    status: 'idle',
    lastSavedAt: null,
    error: null,
  });
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(enabled);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastContentRef = useRef<string>('');

  const getDraftData = useCallback((): DraftData | null => {
    if (!editor) return null;

    const content = editor.getHTML();
    const text = editor.getText();

    return {
      chapterId,
      storyId,
      title,
      content,
      lastSavedAt: new Date().toISOString(),
      wordCount: text.trim() ? text.trim().split(/\s+/).length : 0,
      charCount: text.length,
    };
  }, [editor, chapterId, storyId, title]);

  const saveToLocalStorage = useCallback((data: DraftData) => {
    try {
      const drafts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      drafts[data.chapterId] = data;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
      return true;
    } catch {
      return false;
    }
  }, []);

  const performSave = useCallback(async (force = false) => {
    if (!editor || (!autoSaveEnabled && !force)) return;

    const currentContent = editor.getHTML();

    // Skip if content hasn't changed
    if (!force && currentContent === lastContentRef.current) {
      return;
    }

    setState((prev) => ({ ...prev, status: 'saving', error: null }));

    try {
      const draftData = getDraftData();
      if (!draftData) throw new Error('Failed to get draft data');

      // Save to localStorage immediately
      saveToLocalStorage(draftData);

      // Sync to backend if callback provided
      if (onSave) {
        await onSave(draftData);
      }

      lastContentRef.current = currentContent;
      setState({
        status: 'saved',
        lastSavedAt: new Date(),
        error: null,
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'Save failed',
      }));
    }
  }, [editor, autoSaveEnabled, getDraftData, saveToLocalStorage, onSave]);

  // Debounced save on content change
  const debouncedSave = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    setState((prev) => ({ ...prev, status: 'unsaved' }));

    debounceRef.current = setTimeout(() => {
      performSave();
    }, DEBOUNCE_DELAY);
  }, [performSave]);

  // Setup editor change listener
  useEffect(() => {
    if (!editor || !autoSaveEnabled) return;

    const handleUpdate = () => {
      debouncedSave();
    };

    editor.on('update', handleUpdate);
    return () => {
      editor.off('update', handleUpdate);
    };
  }, [editor, autoSaveEnabled, debouncedSave]);

  // Setup interval auto-save
  useEffect(() => {
    if (!autoSaveEnabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      performSave();
    }, AUTO_SAVE_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoSaveEnabled, performSave]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (state.status === 'unsaved') {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [state.status]);

  const toggleAutoSave = useCallback(() => {
    setAutoSaveEnabled((prev) => !prev);
  }, []);

  const forceSave = useCallback(() => {
    performSave(true);
  }, [performSave]);

  return {
    ...state,
    autoSaveEnabled,
    toggleAutoSave,
    forceSave,
    getDraftData,
  };
}

// Utility to get saved draft from localStorage
export function getSavedDraft(chapterId: string): DraftData | null {
  try {
    const drafts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return drafts[chapterId] || null;
  } catch {
    return null;
  }
}

// Utility to get all saved drafts
export function getAllSavedDrafts(): DraftData[] {
  try {
    const drafts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return Object.values(drafts);
  } catch {
    return [];
  }
}

// Utility to delete a draft
export function deleteDraft(chapterId: string): boolean {
  try {
    const drafts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    delete drafts[chapterId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
    return true;
  } catch {
    return false;
  }
}
