import { useEffect, useMemo, useState } from 'react';
import Emoji, { gitHubEmojis } from '@tiptap/extension-emoji';
import { TableKit } from '@tiptap/extension-table';
import { FontSize, TextStyle, TextStyleKit } from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useNavigate, useSearchParams } from 'react-router';
import { toast } from 'sonner';

import {
  BuilderCanvas,
  BuilderHeader,
  BuilderStatusBar,
  BuilderToolbar,
  DraftRecoveryBanner,
} from '@/components/story-builder';
import { useGetAutoSaveDraft } from '@/hooks/chapterAutoSave/chapterAutoSave.queries';
import {
  useConvertAutoSaveToDraft,
  useConvertAutoSaveToPublished,
} from '@/hooks/chapterAutoSave/chapterAutoSave.mutations';
import { useBuilderSave } from '@/hooks/components/storyBuilder';

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
  const navigate = useNavigate();
  const autoSaveId = params.get('autoSaveId');
  const { data: { data: draftList = [] } = {} } = useGetAutoSaveDraft();

  // Convert mutations
  const convertToDraft = useConvertAutoSaveToDraft();
  const convertToPublished = useConvertAutoSaveToPublished();

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

  // Handler for converting autosave to draft chapter
  const handleSaveAsDraft = () => {
    if (!autoSaveId) {
      toast.error('No draft to convert. Please save your work first.');
      return;
    }

    convertToDraft.mutate(
      { autoSaveId },
      {
        onSuccess: (response) => {
          toast.success('Successfully saved as draft chapter!');
          // Navigate to the newly created draft chapter
          navigate(`/chapter/${response.data._id}`);
        },
        onError: (error) => {
          toast.error(error.message || 'Failed to save as draft');
        },
      }
    );
  };

  // Handler for converting autosave to published chapter
  const handlePublish = () => {
    if (!autoSaveId) {
      toast.error('No draft to publish. Please save your work first.');
      return;
    }

    convertToPublished.mutate(
      { autoSaveId },
      {
        onSuccess: (response) => {
          toast.success('Successfully published chapter!');
          // Navigate to the published chapter
          navigate(`/chapter/${response.data._id}`);
        },
        onError: (error) => {
          toast.error(error.message || 'Failed to publish chapter');
        },
      }
    );
  };

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
    <div className="flex min-h-screen w-full flex-col">
      <DraftRecoveryBanner />
      <BuilderHeader
        title={title}
        onTitleChange={setTitle}
        onSave={handleSave}
        isSaving={isSaving}
        onPublish={handlePublish}
        onSaveAsDraft={handleSaveAsDraft}
        editorContent={editor.getHTML()}
        autoSaveId={autoSaveId}
        // Pass draft context for submit request dialog
        storyId={selectedDraft?.storyId}
        storySlug={selectedDraft?.storySlug}
        parentChapterId={selectedDraft?.parentChapterId}
        draftId={autoSaveId || undefined}
      />
      <BuilderToolbar editor={editor} />
      <BuilderCanvas editor={editor} />
      <BuilderStatusBar wordCount={wordCount} charCount={charCount} />
    </div>
  );
};

export default StoryBuilder;
