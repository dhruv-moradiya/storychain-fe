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
  Strikethrough,
  Table,
  Trash2,
  Type,
  Undo2,
  Power,
  PowerOff,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { EmojiPicker } from '@/components/editors/emoji-picker';
import { Spinner } from '@/components/ui/spinner';
import { BubbleMenu } from '@tiptap/react/menus';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

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

// Dummy save function that simulates an API call
const saveContent = async (content: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Content saved:', content);
      resolve();
    }, 500);
  });
};

function MenuBar({ editor }: { editor: Editor }) {
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  const performSave = async () => {
    if (isSaving) return;
    setIsSaving(true);

    try {
      const content = editor.getHTML();
      await saveContent(content);
      setLastSaved(new Date());
    } finally {
      setIsSaving(false);
    }
  };

  const toggleAutoSave = () => {
    const newState = !autoSaveEnabled;
    setAutoSaveEnabled(newState);

    if (newState) {
      performSave();
      intervalRef.current = setInterval(() => performSave(), 60000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, []);

  if (!editor) return null;

  return (
    <div className="bg-background/70 sticky top-0 z-20 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-3 px-3 py-2">
        {/* LEFT GROUP */}
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

            {/* 🔥 FULL TABLE MENU RESTORED */}
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
                  Insert 3×3
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
        <div className="flex items-center gap-3">
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

          {/* Auto Save */}
          <Button
            size="sm"
            variant={autoSaveEnabled ? 'default' : 'outline'}
            onClick={toggleAutoSave}
            className="toolbar-btn flex items-center gap-2"
          >
            {isSaving ? (
              <Spinner className="h-4 w-4" />
            ) : autoSaveEnabled ? (
              <Power className="h-4 w-4" />
            ) : (
              <PowerOff className="h-4 w-4" />
            )}

            <span className="hidden sm:inline">
              {autoSaveEnabled ? 'Auto-save ON' : 'Auto-save OFF'}
            </span>
          </Button>

          {/* Last Saved */}
          {lastSaved && (
            <span className="text-muted-foreground hidden text-xs md:inline">
              Saved {formatDistanceToNow(lastSaved, { addSuffix: true })}
            </span>
          )}

          {/* Char Count */}
          <span className="text-muted-foreground hidden text-xs lg:inline">
            {editor.getText().length} chars
          </span>
        </div>
      </div>
    </div>
  );
}

const StoryBuilder = () => {
  const editor = useEditor({
    extensions,
    content: `
      <h2>Welcome 👋</h2>
      <p>This is a Google Docs–style TipTap editor built with shadcn + Tailwind.</p>
      <p>Try bold, italic, headings, lists, tables, emojis, and more!</p>
      <p>Enable auto-save to automatically save your work every minute.</p>
    `,
  });

  if (!editor) return null;

  return (
    <div className="w-full">
      <MenuBar editor={editor} />
      <div className="flex justify-center px-2 py-4 sm:px-4 sm:py-6">
        <EditorContent
          editor={editor}
          className={cn(
            'editor-content bg-background w-full max-w-[816px] rounded-md border shadow-sm',
            'prose prose-gray dark:prose-invert text-foreground min-h-[60vh] p-4 font-sans text-[14px] leading-[1.6] focus:outline-none sm:min-h-[70vh] sm:p-8 lg:min-h-[11in] lg:p-12'
          )}
        />
      </div>
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
    </div>
  );
};

export default StoryBuilder;
