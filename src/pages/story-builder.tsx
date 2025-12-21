import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/clerk-react';
import { EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import { Bold, Italic, Strikethrough } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';

import {
  DraftRecoveryBanner,
  DraftSelectionDialog,
  EditorStatusBar,
  SubmitRequestDialog,
  useAutoSave,
  useDraftRecovery,
  useKeyboardShortcuts,
  useStoryEditor,
  type DraftData,
  type SubmitRequestData,
} from '@/components/story-builder';

import { ChapterPreviewDialog } from '@/components/common/chapter-reader';
import { MenuBar } from '@/components/story-builder/menu-bar';
import { useAutoSaveContent } from '@/hooks/chapterAutoSave/chapterAutoSave.mutations';
import { useCreateChapter } from '@/hooks/story/story.mutations';
import { useParams } from 'react-router';

const StoryBuilder = () => {
  const { chapterId: parentChapterId, storyId } = useParams();
  const { user } = useUser();

  // Dialog states
  const [isPRDialogOpen, setIsPRDialogOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDraftSelectionOpen, setIsDraftSelectionOpen] = useState(false);

  // Story editor hook
  const {
    editor,
    chapterTitle,
    setChapterTitle,
    wordCount,
    charCount,
    initialContentRef,
    loadDraft,
  } = useStoryEditor();

  // Auto-save hook
  const autoSaveState = useAutoSave({
    editor,
    chapterId: parentChapterId,
    title: chapterTitle,
    enabled: false,
  });

  // Draft recovery hook
  const draftRecovery = useDraftRecovery({
    onRecover: (draft: DraftData) => {
      loadDraft(draft);
      toast.success('Draft recovered successfully');
    },
    onDiscard: () => {
      toast.info('Draft discarded');
    },
  });

  // Save draft mutation
  const { mutate: saveDraft, isPending: isSavingDraft } = useAutoSaveContent();

  const handleSaveDraft = useCallback(() => {
    if (!editor || !user?.id) return;

    saveDraft(
      {
        userId: user.id,
        title: chapterTitle,
        content: editor.getHTML(),
        chapterId: parentChapterId,
      },
      {
        onSuccess: () => {
          toast.success('Draft saved');
        },
        onError: () => {
          toast.error('Failed to save draft');
        },
      }
    );
  }, [editor, user?.id, chapterTitle, parentChapterId, saveDraft]);

  // Keyboard shortcuts
  const shortcuts = useMemo(
    () => [
      {
        key: 's',
        ctrlKey: true,
        handler: () => {
          handleSaveDraft();
        },
      },
    ],
    [handleSaveDraft]
  );

  useKeyboardShortcuts({ shortcuts, enabled: !!editor });

  // Handlers
  const handlePreview = useCallback(() => {
    setIsPreviewOpen(true);
  }, []);

  const { mutate: createChapter } = useCreateChapter();

  const handlePublish = useCallback(() => {
    if (!editor) return;

    const payload = {
      title: chapterTitle,
      content: editor.getHTML(),
      storyId: storyId ?? '',
      parentChapterId: parentChapterId ? parentChapterId : null,
    };

    createChapter(payload);
    toast.info('Publishing coming soon');
  }, [editor, chapterTitle, storyId, parentChapterId, createChapter]);

  const handleCreatePR = useCallback(() => {
    setIsPRDialogOpen(true);
  }, []);

  const handleSubmitPR = useCallback((data: SubmitRequestData) => {
    console.log('Creating PR:', data);
    toast.success('Submit request created successfully');
    setIsPRDialogOpen(false);
  }, []);

  const handleHistoryClick = useCallback(() => {
    toast.info('Version history coming soon');
  }, []);

  const handleViewAllDrafts = useCallback(() => {
    setIsDraftSelectionOpen(true);
  }, []);

  const handleSelectDraft = useCallback(
    (draft: DraftData) => {
      loadDraft(draft);
      setIsDraftSelectionOpen(false);
      draftRecovery.dismissBanner();
      toast.success('Draft loaded successfully');
    },
    [loadDraft, draftRecovery]
  );

  const handleDiscardDraft = useCallback(
    (draft: DraftData) => {
      draftRecovery.discardDraft(draft);
    },
    [draftRecovery]
  );

  if (!editor) return null;

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Draft Recovery Banner */}
      {draftRecovery.showBanner && draftRecovery.drafts.length > 0 && (
        <DraftRecoveryBanner
          drafts={draftRecovery.drafts}
          onContinue={handleSelectDraft}
          onDiscard={handleDiscardDraft}
          onViewAll={draftRecovery.hasMultipleDrafts ? handleViewAllDrafts : undefined}
          onDismiss={draftRecovery.dismissBanner}
        />
      )}

      {/* Draft Selection Dialog */}
      <DraftSelectionDialog
        open={isDraftSelectionOpen}
        onOpenChange={setIsDraftSelectionOpen}
        drafts={draftRecovery.drafts}
        onSelect={handleSelectDraft}
        onDiscard={handleDiscardDraft}
      />

      {/* Menu Bar */}
      <MenuBar
        editor={editor}
        autoSaveState={autoSaveState}
        onSaveDraft={handleSaveDraft}
        isSavingDraft={isSavingDraft}
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
