import type { Editor } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Bold, Italic, Strikethrough, List } from 'lucide-react';
import { EmojiPicker } from '@/components/editors/emoji-picker';

interface MiniTextEditorMenuBarProps {
  editor: Editor;
}

const MiniTextEditorMenuBar = ({ editor }: MiniTextEditorMenuBarProps) => {
  if (!editor) return null;

  return (
    <div className="bg-muted/40 flex flex-wrap items-center gap-0.5 border-b px-1 py-0.5">
      <ButtonGroup>
        <Button
          size="icon"
          className="h-7 w-7"
          variant={editor.isActive('bold') ? 'secondary' : 'ghost'}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-3.5 w-3.5" />
        </Button>

        <Button
          size="icon"
          className="h-7 w-7"
          variant={editor.isActive('italic') ? 'secondary' : 'ghost'}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-3.5 w-3.5" />
        </Button>

        <Button
          size="icon"
          className="h-7 w-7"
          variant={editor.isActive('strike') ? 'secondary' : 'ghost'}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className="h-3.5 w-3.5" />
        </Button>

        <Button
          size="icon"
          className="h-7 w-7"
          variant={editor.isActive('bulletList') ? 'secondary' : 'ghost'}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-3.5 w-3.5" />
        </Button>
      </ButtonGroup>

      <EmojiPicker onSelect={(emoji) => editor.chain().focus().insertContent(emoji).run()} />
    </div>
  );
};

export default MiniTextEditorMenuBar;
