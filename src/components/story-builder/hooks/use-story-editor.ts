import { useState, useCallback, useRef } from 'react';
import { useEditor } from '@tiptap/react';
import Emoji, { gitHubEmojis } from '@tiptap/extension-emoji';
import { TableKit } from '@tiptap/extension-table';
import { FontSize, TextStyle, TextStyleKit } from '@tiptap/extension-text-style';
import StarterKit from '@tiptap/starter-kit';
import type { DraftData } from './use-auto-save';

const DEFAULT_CONTENT = `
  <h2>Welcome to StoryChain</h2>
  <p>Start writing your chapter here. Your work will be automatically saved as you type.</p>
  <p>When you're ready, you can publish directly or create a submit request for review.</p>
`;

const extensions = [
  TextStyleKit,
  StarterKit,
  FontSize,
  TextStyle,
  Emoji.configure({
    emojis: gitHubEmojis,
    enableEmoticons: true,
  }),
  TableKit.configure({ table: { resizable: true } }),
];

interface UseStoryEditorOptions {
  initialContent?: string;
  initialTitle?: string;
}

export function useStoryEditor({
  initialContent = DEFAULT_CONTENT,
  initialTitle = 'Untitled Chapter',
}: UseStoryEditorOptions = {}) {
  const [chapterTitle, setChapterTitle] = useState(initialTitle);
  const initialContentRef = useRef<string>(initialContent);

  const editor = useEditor({
    extensions,
    content: initialContent,
  });

  const wordCount = editor?.getText().trim() ? editor.getText().trim().split(/\s+/).length : 0;
  const charCount = editor?.getText().length || 0;

  const loadDraft = useCallback(
    (draft: DraftData) => {
      if (editor) {
        editor.commands.setContent(draft.content);
        setChapterTitle(draft.title);
      }
    },
    [editor]
  );

  const resetEditor = useCallback(() => {
    if (editor) {
      editor.commands.setContent(initialContent);
      setChapterTitle(initialTitle);
    }
  }, [editor, initialContent, initialTitle]);

  const getContent = useCallback(() => {
    return editor?.getHTML() || '';
  }, [editor]);

  return {
    editor,
    chapterTitle,
    setChapterTitle,
    wordCount,
    charCount,
    initialContentRef,
    loadDraft,
    resetEditor,
    getContent,
  };
}

export { DEFAULT_CONTENT };
