import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/clerk-react';
import Emoji, { gitHubEmojis } from '@tiptap/extension-emoji';
import { TableKit } from '@tiptap/extension-table';
import { FontSize, TextStyle, TextStyleKit } from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, Strikethrough } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import {
  DraftRecoveryBanner,
  EditorStatusBar,
  SubmitRequestDialog,
  useAutoSave,
  useDraftRecovery,
  type DraftData,
  type SubmitRequestData,
} from '@/components/story-builder';

import { ChapterPreviewDialog } from '@/components/common/chapter-reader';
import { MenuBar } from '@/components/story-builder/menu-bar';
import { useCreateChapter } from '@/hooks/story/story.mutations';
import { useParams } from 'react-router';

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

const DEFAULT_CONTENT = `
  <h2>Welcome to StoryChain</h2>
  <p>Start writing your chapter here. Your work will be automatically saved as you type.</p>
  <p>When you're ready, you can publish directly or create a submit request for review.</p>
`;

const StoryBuilder = () => {
  const { chapterId: parentChapterId, storyId } = useParams();
  const [chapterTitle, setChapterTitle] = useState('Untitled Chapter');
  const [isPRDialogOpen, setIsPRDialogOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const initialContentRef = useRef<string>(DEFAULT_CONTENT);
  const { user } = useUser();

  const editor = useEditor({
    extensions,
    content: DEFAULT_CONTENT,
  });

  // Auto-save hook
  const autoSaveState = useAutoSave({
    editor,
    chapterId: 'new',
    storyId: '',
    title: chapterTitle,
    enabled: true,
    onSave: async (data) => {
      // TODO: Implement actual API call
      console.log('Saving to backend:', data);
    },
  });

  // Draft recovery hook
  const draftRecovery = useDraftRecovery({
    onRecover: (draft: DraftData) => {
      if (editor) {
        editor.commands.setContent(draft.content);
        setChapterTitle(draft.title);
        toast.success('Draft recovered successfully');
      }
    },
    onDiscard: () => {
      toast.info('Draft discarded');
    },
  });

  // Calculate word and char counts
  const wordCount = editor?.getText().trim() ? editor.getText().trim().split(/\s+/).length : 0;
  const charCount = editor?.getText().length || 0;

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        autoSaveState.forceSave();
        toast.success('Draft saved');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [autoSaveState]);

  const handleSaveDraft = useCallback(() => {
    autoSaveState.forceSave();
    toast.success('Draft saved');
  }, [autoSaveState]);

  const handlePreview = useCallback(() => {
    setIsPreviewOpen(true);
  }, []);

  const { mutate, isPending } = useCreateChapter();

  const handlePublish = useCallback(() => {
    // TODO: Implement publish logic

    const payload = {
      title: chapterTitle,
      content: editor.getHTML(),
      storyId: storyId ?? '',
      parentChapterId: parentChapterId ? parentChapterId : null,
    };
    console.log('input :>> ', payload);

    mutate(payload);

    toast.info('Publishing coming soon');
  }, []);

  const handleCreatePR = useCallback(() => {
    setIsPRDialogOpen(true);
  }, []);

  const handleSubmitPR = useCallback((data: SubmitRequestData) => {
    // TODO: Implement actual PR creation
    console.log('Creating PR:', data);
    toast.success('Submit request created successfully');
    setIsPRDialogOpen(false);
  }, []);

  const handleHistoryClick = useCallback(() => {
    // TODO: Implement version history panel
    toast.info('Version history coming soon');
  }, []);

  if (!editor) return null;

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Draft Recovery Banner */}
      {draftRecovery.showBanner && draftRecovery.draft && (
        <DraftRecoveryBanner
          draft={draftRecovery.draft}
          onContinue={draftRecovery.recoverDraft}
          onDiscard={draftRecovery.discardDraft}
          onPreview={handlePreview}
          onDismiss={draftRecovery.dismissBanner}
        />
      )}

      {/* Menu Bar */}
      <MenuBar
        editor={editor}
        autoSaveState={autoSaveState}
        onSaveDraft={handleSaveDraft}
        onPreview={handlePreview}
        onPublish={handlePublish}
        onCreatePR={handleCreatePR}
      />

      {/* Editor Content */}
      <div className="flex flex-1 justify-center px-2 py-4 sm:px-4 sm:py-6">
        <div className="w-full max-w-[816px]">
          {/* Chapter Title Input */}
          <input
            type="text"
            value={chapterTitle}
            onChange={(e) => setChapterTitle(e.target.value)}
            placeholder="Chapter Title"
            className="placeholder:text-muted-foreground mb-4 w-full border-none bg-transparent text-2xl font-bold outline-none focus:ring-0 sm:text-3xl"
          />

          {/* Editor */}
          <EditorContent
            editor={editor}
            className={cn(
              'editor-content bg-background w-full rounded-md border shadow-sm',
              'prose prose-gray dark:prose-invert text-foreground min-h-[60vh] p-4 font-sans text-[14px] leading-[1.6] focus:outline-none sm:min-h-[70vh] sm:p-8 lg:min-h-[11in] lg:p-12'
            )}
          />
        </div>
      </div>

      {/* Bubble Menu */}
      <BubbleMenu editor={editor} options={{ placement: 'top', offset: 8, flip: true }}>
        <ButtonGroup className="bg-background border shadow-lg">
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
            type="button"
            variant={'outline'}
            size="sm"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
            type="button"
            variant={'outline'}
            size="sm"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
            type="button"
            variant={'outline'}
            size="sm"
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
        </ButtonGroup>
      </BubbleMenu>

      {/* Status Bar */}
      <EditorStatusBar
        status="draft"
        wordCount={wordCount}
        charCount={charCount}
        chapterTitle={chapterTitle}
        onHistoryClick={handleHistoryClick}
      />

      {/* Submit Request Dialog */}
      <SubmitRequestDialog
        open={isPRDialogOpen}
        onOpenChange={setIsPRDialogOpen}
        onSubmit={handleSubmitPR}
        wordCount={wordCount}
        charCount={charCount}
        originalContent={initialContentRef.current}
        modifiedContent={editor?.getHTML() || ''}
      />

      {/* Preview Dialog */}
      <ChapterPreviewDialog
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        chapter={{
          id: 'preview',
          title: chapterTitle,
          content: editor?.getHTML() || '',
          author: {
            id: user?.id || 'anonymous',
            name: user?.fullName || 'Anonymous',
            avatar: user?.imageUrl,
            username: user?.username || undefined,
          },
          status: 'draft',
          createdAt: new Date(),
        }}
        originalContent={initialContentRef.current}
        showDiff={true}
      />
    </div>
  );
};

export default StoryBuilder;
