import { EmojiPicker } from '@/components/editors/emoji-picker';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import type { Level } from '@tiptap/extension-heading';
import type { Editor } from '@tiptap/react';
import { useEditorState } from '@tiptap/react';
import {
  Bold,
  Code,
  Columns,
  Eye,
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

import { AutoSaveIndicator, PublishDropdown, useAutoSave } from '@/components/story-builder';

function MenuBar({
  editor,
  autoSaveState,
  onSaveDraft,
  isSavingDraft,
  onPreview,
  onPublish,
  onCreatePR,
}: {
  editor: Editor;
  autoSaveState: ReturnType<typeof useAutoSave>;
  onSaveDraft: () => void;
  isSavingDraft?: boolean;
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
            disabled={isSavingDraft}
            className="hidden gap-1.5 sm:flex"
          >
            <Save className="h-4 w-4" />
            {isSavingDraft ? 'Saving...' : 'Save Draft'}
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

export { MenuBar };
