import { useEffect, useMemo, useState } from 'react';
import Emoji, { gitHubEmojis } from '@tiptap/extension-emoji';
import { TableKit } from '@tiptap/extension-table';
import { FontSize, TextStyle, TextStyleKit } from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useSearchParams } from 'react-router';

import {
  BuilderCanvas,
  BuilderHeader,
  BuilderStatusBar,
  BuilderToolbar,
  DraftRecoveryBanner,
} from '@/components/story-builder';
import { useGetAutoSaveDraft } from '@/hooks/chapterAutoSave/chapterAutoSave.queries';
import { useBuilderSave } from '@/hooks/chapterAutoSave/useBuilderSave';

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
  Underline,
  Emoji.configure({
    emojis: gitHubEmojis,
    enableEmoticons: true,
  }),
  TableKit.configure({ table: { resizable: true } }),
];

const StoryBuilder = () => {
  const [editorContent, setEditorContent] = useState<string>(DEFAULT_CONTENT);
  const [title, setTitle] = useState<string>('');
  const [params] = useSearchParams();
  const autoSaveId = params.get('autoSaveId');
  const { data: { data: draftList = [] } = {} } = useGetAutoSaveDraft();

  const selectedDraft = useMemo(() => {
    if (!draftList.length || !autoSaveId) return undefined;
    return draftList.find((draft) => draft._id === autoSaveId);
  }, [draftList, autoSaveId]);

  const editor = useEditor({
    extensions,
    content: editorContent,
  });

  const { handleSave, isSaving } = useBuilderSave({
    editor,
    title,
    selectedDraft,
  });

  useEffect(() => {
    if (selectedDraft && editor) {
      const content = selectedDraft.content ?? '';
      setEditorContent(content);
      setTitle(selectedDraft.title ?? '');
      editor.commands.setContent(content);
    }
  }, [selectedDraft, autoSaveId, editor]);

  if (!editor) return null;

  const wordCount = editor.getText().trim() ? editor.getText().trim().split(/\s+/).length : 0;
  const charCount = editor.getText().length;

  return (
    <div className="bg-bg-cream flex min-h-screen w-full flex-col">
      <DraftRecoveryBanner />
      <BuilderHeader
        title={title}
        onTitleChange={setTitle}
        onSave={handleSave}
        isSaving={isSaving}
      />
      <BuilderToolbar editor={editor} />
      <BuilderCanvas editor={editor} />
      <BuilderStatusBar wordCount={wordCount} charCount={charCount} />
    </div>
  );
};

export default StoryBuilder;
