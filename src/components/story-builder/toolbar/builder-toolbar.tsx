import type { Editor } from '@tiptap/react';
import type { Level } from '@tiptap/extension-heading';
import { useEditorState } from '@tiptap/react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Code,
  Quote,
  ChevronDown,
  Undo,
  Redo,
  Link2,
  Minus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface BuilderToolbarProps {
  editor: Editor;
}

const headingOptions = [
  { level: 1 as Level, label: 'Heading 1', className: 'text-xl font-bold' },
  { level: 2 as Level, label: 'Heading 2', className: 'text-lg font-bold' },
  { level: 3 as Level, label: 'Heading 3', className: 'text-base font-semibold' },
  { level: 4 as Level, label: 'Heading 4', className: 'text-sm font-semibold' },
];

const fontSizeOptions = [
  { size: '12px', label: 'Small' },
  { size: '14px', label: 'Normal' },
  { size: '16px', label: 'Medium' },
  { size: '18px', label: 'Large' },
  { size: '24px', label: 'Extra Large' },
  { size: '32px', label: 'Huge' },
];

/**
 * Builder toolbar component
 * Contains formatting tools for the editor
 */
function BuilderToolbar({ editor }: BuilderToolbarProps) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive('bold'),
      isItalic: ctx.editor.isActive('italic'),
      isUnderline: ctx.editor.isActive('underline'),
      isStrike: ctx.editor.isActive('strike'),
      isCode: ctx.editor.isActive('code'),
      isBulletList: ctx.editor.isActive('bulletList'),
      isOrderedList: ctx.editor.isActive('orderedList'),
      isBlockquote: ctx.editor.isActive('blockquote'),
      canUndo: ctx.editor.can().undo(),
      canRedo: ctx.editor.can().redo(),
      currentHeading: headingOptions.find((h) =>
        ctx.editor.isActive('heading', { level: h.level })
      ),
    }),
  });

  const currentHeadingLabel = editorState.currentHeading?.label || 'Paragraph';

  return (
    <div className="border-border/50 bg-cream-90 w-full border-b">
      <div className="scrollbar-hide mx-auto flex max-w-[1100px] flex-wrap items-center gap-1 overflow-x-auto px-3 py-1.5">
        {/* History Tools */}
        <ButtonGroup>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editorState.canUndo}
            title="Undo (Ctrl+Z)"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editorState.canRedo}
            title="Redo (Ctrl+Y)"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </ButtonGroup>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Text Style Dropdowns */}
        <div className="flex items-center gap-1">
          {/* Heading Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 min-w-[100px] justify-between gap-1 px-2"
              >
                <span className="truncate text-xs">{currentHeadingLabel}</span>
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-44">
              {headingOptions.map((heading) => (
                <DropdownMenuItem
                  key={heading.level}
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: heading.level }).run()
                  }
                  className={heading.className}
                >
                  {heading.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => editor.chain().focus().setParagraph().run()}
                className="text-sm"
              >
                Paragraph
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Font Size Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 min-w-[80px] justify-between gap-1 px-2"
              >
                <span className="text-xs">Size</span>
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-36">
              {fontSizeOptions.map((option) => (
                <DropdownMenuItem
                  key={option.size}
                  onClick={() => editor.chain().focus().setFontSize(option.size).run()}
                  className="flex items-center justify-between"
                >
                  <span>{option.label}</span>
                  <span className="text-muted-foreground text-xs">{option.size}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Text Formatting */}
        <ButtonGroup>
          <Button
            size="icon"
            variant={editorState.isBold ? 'secondary' : 'ghost'}
            className="h-8 w-8"
            onClick={() => editor.chain().focus().toggleBold().run()}
            title="Bold (Ctrl+B)"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant={editorState.isItalic ? 'secondary' : 'ghost'}
            className="h-8 w-8"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            title="Italic (Ctrl+I)"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant={editorState.isUnderline ? 'secondary' : 'ghost'}
            className="h-8 w-8"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            title="Underline (Ctrl+U)"
          >
            <Underline className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant={editorState.isStrike ? 'secondary' : 'ghost'}
            className="h-8 w-8"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            title="Strikethrough"
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
        </ButtonGroup>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Lists & Quote */}
        <ButtonGroup>
          <Button
            size="icon"
            variant={editorState.isBulletList ? 'secondary' : 'ghost'}
            className="h-8 w-8"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant={editorState.isOrderedList ? 'secondary' : 'ghost'}
            className="h-8 w-8"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant={editorState.isBlockquote ? 'secondary' : 'ghost'}
            className="h-8 w-8"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            title="Blockquote"
          >
            <Quote className="h-4 w-4" />
          </Button>
        </ButtonGroup>

        {/* Additional Tools (hidden on mobile) */}
        <div className="hidden items-center gap-1 md:flex">
          <Separator orientation="vertical" className="mx-1 h-6" />

          {/* Insert Tools */}
          <ButtonGroup>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={() => editor.chain().focus().toggleCode().run()}
              title="Inline Code"
            >
              <Code className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8" title="Insert Link">
              <Link2 className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              title="Horizontal Rule"
            >
              <Minus className="h-4 w-4" />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}

export { BuilderToolbar };
