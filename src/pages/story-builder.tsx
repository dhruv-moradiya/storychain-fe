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
} from 'lucide-react';
import { useState } from 'react';
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

const extensions = [
  TextStyleKit,
  StarterKit,
  FontSize,
  TextStyle,
  Emoji.configure({
    emojis: gitHubEmojis,
    enableEmoticons: true,
    // suggestion,
  }),
  TableKit.configure({ table: { resizable: true } }),
];

function MenuBar({ editor }: { editor: Editor }) {
  const [isSaving, setIsSaving] = useState(false);

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
      isPurple: ctx.editor.isActive('textStyle', { color: '#958DF1' }),
      isRed: ctx.editor.isActive('textStyle', { color: '#F98181' }),
      isOrange: ctx.editor.isActive('textStyle', { color: '#FBBC88' }),
      isYellow: ctx.editor.isActive('textStyle', { color: '#FAF594' }),
      isBlue: ctx.editor.isActive('textStyle', { color: '#70CFF8' }),
      isTeal: ctx.editor.isActive('textStyle', { color: '#94FADB' }),
      isGreen: ctx.editor.isActive('textStyle', { color: '#B9F18D' }),
    }),
  });

  if (!editor) return null;

  return (
    <div className="bg-background flex w-full items-center justify-between px-3 py-2">
      <div className="flex flex-wrap items-center gap-2">
        {/* Text Style Buttons */}
        <ButtonGroup className="bg-muted/30 flex items-center gap-1 rounded-md border">
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
          <Button
            size="icon"
            variant={editorState.isCode ? 'secondary' : 'ghost'}
            onClick={() => editor.chain().focus().toggleCode().run()}
          >
            <Code className="h-4 w-4" />
          </Button>
        </ButtonGroup>

        {/* Headings Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Type className="h-4 w-4" /> Heading
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Ruler className="h-4 w-4" /> Font Size
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            {[11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 24, 26, 28, 30].map((level) => (
              <DropdownMenuItem
                key={level}
                onClick={() => editor.chain().focus().setFontSize(`${level}px`).run()}
              >
                Font Size {level}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* List Buttons */}
        <ButtonGroup className="bg-muted/30 flex items-center gap-1 rounded-md border">
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
          <Button
            size="icon"
            variant={editor.isActive('blockquote') ? 'secondary' : 'ghost'}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <Quote className="h-4 w-4" />
          </Button>
        </ButtonGroup>

        {/* Insert Elements */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Table className="h-4 w-4" /> Table
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem
              onClick={() =>
                editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
              }
            >
              <Table className="mr-2 h-4 w-4" /> Insert 3x3 Table
            </DropdownMenuItem>
            <Separator />
            <DropdownMenuItem onClick={() => editor.chain().focus().addColumnBefore().run()}>
              <Columns className="mr-2 h-4 w-4" /> Add Column Before
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().addColumnAfter().run()}>
              <Columns className="mr-2 h-4 w-4" /> Add Column After
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().deleteColumn().run()}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete Column
            </DropdownMenuItem>
            <Separator />
            <DropdownMenuItem onClick={() => editor.chain().focus().addRowBefore().run()}>
              <Rows className="mr-2 h-4 w-4" /> Add Row Before
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().addRowAfter().run()}>
              <Rows className="mr-2 h-4 w-4" /> Add Row After
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().deleteRow().run()}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete Row
            </DropdownMenuItem>
            <Separator />
            <DropdownMenuItem onClick={() => editor.chain().focus().deleteTable().run()}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete Table
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <input
          type="color"
          onInput={(event) => editor.chain().focus().setColor(event.currentTarget.value).run()}
          value={editorState.color}
          data-testid="setColor"
          className="h-8 w-8 cursor-pointer rounded-2xl border-0 bg-transparent p-0"
        />
        <Button
          variant="outline"
          onClick={() => editor.chain().focus().unsetColor().run()}
          data-testid="unsetColor"
        >
          Unset color
        </Button>

        {/* Emoji Picker */}
        <EmojiPicker onSelect={(emoji) => editor.chain().focus().insertContent(emoji).run()} />
      </div>

      {/* Undo / Redo */}
      <ButtonGroup className="bg-muted/30 flex items-center gap-1 rounded-md border">
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

      <Button className="ml-4" variant="outline" disabled={isSaving}>
        {isSaving ? <Spinner /> : <Save />} Save
      </Button>

      <h3 className="text-muted-foreground text-sm">{editor.getText().length} characters</h3>
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
    `,
  });

  if (!editor) return null;

  return (
    <div className="w-full">
      <MenuBar editor={editor} />
      <div className="flex justify-center px-4 py-6">
        <EditorContent
          editor={editor}
          onChange={(e) => console.log('Editor content was updated:', e)}
          className={cn(
            'editor-content bg-background min-h-[11in] w-[816px] rounded-md border shadow-sm',
            'prose prose-gray dark:prose-invert text-foreground max-w-none p-12 font-sans text-[14px] leading-[1.6] focus:outline-none'
          )}
        />
      </div>
      <BubbleMenu editor={editor} options={{ placement: 'top', offset: 8, flip: true }}>
        <ButtonGroup className="bg-background">
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
            type="button"
            variant={'outline'}
          >
            <Bold />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
            type="button"
            variant={'outline'}
          >
            <Italic />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
            type="button"
            variant={'outline'}
          >
            <Strikethrough />
          </Button>
        </ButtonGroup>
      </BubbleMenu>
    </div>
  );
};

export default StoryBuilder;
