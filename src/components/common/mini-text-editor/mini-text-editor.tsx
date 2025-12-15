import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Emoji, { gitHubEmojis } from '@tiptap/extension-emoji';
import { TextStyle } from '@tiptap/extension-text-style';
import { cn } from '@/lib/utils';
import MiniTextEditorMenuBar from './mini-text-editor-menubar';

interface MiniTextEditorProps {
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

const MiniTextEditor = ({
  value = '',
  onChange,
  placeholder = 'Write something...',
  minHeight = '80px',
}: MiniTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        blockquote: false,
      }),
      TextStyle,
      Emoji.configure({
        emojis: gitHubEmojis,
        enableEmoticons: true,
      }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm dark:prose-invert focus:outline-none max-w-none',
      },
    },
  });

  if (!editor) return null;

  return (
    <div
      className={cn(
        'relative w-full rounded-md border bg-transparent text-sm shadow-xs transition',
        'field-sizing-content min-h-16',
        'focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'bg-background dark:bg-input/30'
      )}
    >
      <MiniTextEditorMenuBar editor={editor} />

      <EditorContent editor={editor} className={cn('px-3 py-2 text-sm', `min-h-[${minHeight}]`)} />
    </div>
  );
};

export default MiniTextEditor;
