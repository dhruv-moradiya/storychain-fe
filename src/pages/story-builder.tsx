import { TextStyleKit } from '@tiptap/extension-text-style';
import { TableKit } from '@tiptap/extension-table';
import type { Editor } from '@tiptap/react';
import { EditorContent, useEditor, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Emoji, { gitHubEmojis } from '@tiptap/extension-emoji';
import type { Level } from '@tiptap/extension-heading';
import { FontSize, TextStyle } from '@tiptap/extension-text-style';
import { ButtonGroup } from '@/components/ui/button-group';
import { Button } from '@/components/ui/button';
import {
  Bold,
  Code,
  Columns,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Rows,
  Ruler,
  Save,
  Strikethrough,
  Table,
  Trash2,
  Type,
  Undo2,
  Eye,
} from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { EmojiPicker } from '@/components/editors/emoji-picker';
import { BubbleMenu } from '@tiptap/react/menus';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useUser } from '@clerk/clerk-react';

import {
  DraftRecoveryBanner,
  PublishDropdown,
  SubmitRequestDialog,
  EditorStatusBar,
  AutoSaveIndicator,
  useAutoSave,
  useDraftRecovery,
  type SubmitRequestData,
  type DraftData,
} from '@/components/story-builder';

import { ChapterPreviewDialog } from '@/components/common/chapter-reader';

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

function MenuBar({
  editor,
  autoSaveState,
  onSaveDraft,
  onPreview,
  onPublish,
  onCreatePR,
}: {
  editor: Editor;
  autoSaveState: ReturnType<typeof useAutoSave>;
  onSaveDraft: () => void;
  onPreview: () => void;
  onPublish: () => void;
  onCreatePR: () => void;
}) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive('bold'),
      isItalic: ctx.editor.isActive('italic'),
      isStrike: ctx.editor.isActive('strike'),
      isCode: ctx.editor.isActive('code'),
      canUndo: ctx.editor.can().chain().undo().run(),
      canRedo: ctx.editor.can().chain().redo().run(),
      color: ctx.editor.getAttributes('textStyle').color,
    }),
  });

  if (!editor) return null;

  return (
    <div className="bg-background/70 sticky top-0 z-20 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-3 px-3 py-2">
        {/* LEFT GROUP - Formatting Tools */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Bold / Italic / Strike */}
          <ButtonGroup className="toolbar-group">
            <Button
              size="icon"
              variant={editorState.isBold ? 'secondary' : 'ghost'}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant={editorState.isItalic ? 'secondary' : 'ghost'}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <Italic className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant={editorState.isStrike ? 'secondary' : 'ghost'}
              onClick={() => editor.chain().focus().toggleStrike().run()}
            >
              <Strikethrough className="h-4 w-4" />
            </Button>
          </ButtonGroup>

          {/* Headings */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="toolbar-btn">
                <Type className="h-4 w-4" />
                <span className="hidden sm:inline">Heading</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              {[1, 2, 3, 4, 5, 6].map((level) => (
                <DropdownMenuItem
                  key={level}
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .toggleHeading({ level: level as Level })
                      .run()
                  }
                >
                  Heading {level}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem onClick={() => editor.chain().focus().setParagraph().run()}>
                Paragraph
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Lists */}
          <ButtonGroup className="toolbar-group">
            <Button
              size="icon"
              variant={editor.isActive('bulletList') ? 'secondary' : 'ghost'}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <List className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant={editor.isActive('orderedList') ? 'secondary' : 'ghost'}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
          </ButtonGroup>

          {/* Code + Blockquote */}
          <div className="hidden items-center gap-2 md:flex">
            <Button
              size="icon"
              variant={editorState.isCode ? 'secondary' : 'ghost'}
              onClick={() => editor.chain().focus().toggleCode().run()}
            >
              <Code className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant={editor.isActive('blockquote') ? 'secondary' : 'ghost'}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
              <Quote className="h-4 w-4" />
            </Button>

            {/* Font Size */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="toolbar-btn">
                  <Ruler className="h-4 w-4" />
                  Size
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-36">
                {[12, 14, 16, 18, 20, 24, 30].map((sz) => (
                  <DropdownMenuItem
                    key={sz}
                    onClick={() => editor.chain().focus().setFontSize(`${sz}px`).run()}
                  >
                    {sz}px
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Table Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="toolbar-btn">
                  <Table className="h-4 w-4" />
                  Table
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56">
                <DropdownMenuItem
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                      .run()
                  }
                >
                  <Table className="mr-2 h-4 w-4" />
                  Insert 3x3
                </DropdownMenuItem>

                <Separator />

                <DropdownMenuItem onClick={() => editor.chain().focus().addColumnBefore().run()}>
                  <Columns className="mr-2 h-4 w-4" />
                  Add Column Before
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => editor.chain().focus().addColumnAfter().run()}>
                  <Columns className="mr-2 h-4 w-4" />
                  Add Column After
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => editor.chain().focus().deleteColumn().run()}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Column
                </DropdownMenuItem>

                <Separator />

                <DropdownMenuItem onClick={() => editor.chain().focus().addRowBefore().run()}>
                  <Rows className="mr-2 h-4 w-4" />
                  Add Row Before
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => editor.chain().focus().addRowAfter().run()}>
                  <Rows className="mr-2 h-4 w-4" />
                  Add Row After
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => editor.chain().focus().deleteRow().run()}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Row
                </DropdownMenuItem>

                <Separator />

                <DropdownMenuItem onClick={() => editor.chain().focus().deleteTable().run()}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Table
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Color Picker */}
            <input
              type="color"
              value={editorState.color || '#000000'}
              onInput={(e) => editor.chain().focus().setColor(e.currentTarget.value).run()}
              className="h-8 w-8 cursor-pointer rounded-md border p-0"
            />

            <Button
              size="sm"
              variant="outline"
              onClick={() => editor.chain().focus().unsetColor().run()}
            >
              Clear
            </Button>

            <EmojiPicker onSelect={(emoji) => editor.chain().focus().insertContent(emoji).run()} />
          </div>
        </div>

        {/* RIGHT SIDE CONTROLS */}
        <div className="flex items-center gap-2">
          {/* Undo / Redo */}
          <ButtonGroup className="toolbar-group">
            <Button
              size="icon"
              variant="ghost"
              disabled={!editorState.canUndo}
              onClick={() => editor.chain().focus().undo().run()}
            >
              <Undo2 className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              disabled={!editorState.canRedo}
              onClick={() => editor.chain().focus().redo().run()}
            >
              <Redo2 className="h-4 w-4" />
            </Button>
          </ButtonGroup>

          <Separator orientation="vertical" className="h-6" />

          {/* Auto Save Indicator */}
          <AutoSaveIndicator
            status={autoSaveState.status}
            lastSavedAt={autoSaveState.lastSavedAt}
            error={autoSaveState.error}
            autoSaveEnabled={autoSaveState.autoSaveEnabled}
            onToggle={autoSaveState.toggleAutoSave}
            onForceSave={autoSaveState.forceSave}
          />

          <Separator orientation="vertical" className="hidden h-6 sm:block" />

          {/* Save Draft Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onSaveDraft}
            className="hidden gap-1.5 sm:flex"
          >
            <Save className="h-4 w-4" />
            Save Draft
          </Button>

          {/* Preview Button */}
          <Button variant="ghost" size="sm" onClick={onPreview} className="hidden gap-1.5 lg:flex">
            <Eye className="h-4 w-4" />
            Preview
          </Button>

          {/* Publish Dropdown */}
          <PublishDropdown
            onPublish={onPublish}
            onCreatePR={onCreatePR}
            onPreview={onPreview}
            isOwner={true}
          />
        </div>
      </div>
    </div>
  );
}

const StoryBuilder = () => {
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

  const handlePublish = useCallback(() => {
    // TODO: Implement publish logic

    const input = {
      chapterTitle,
      content: editor.getHTML(),
    };
    console.log('input :>> ', input);
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
