import type { Editor } from '@tiptap/react';
import { EditorContent } from '@tiptap/react';
import { cn } from '@/lib/utils';

interface BuilderCanvasProps {
  editor: Editor;
}

/**
 * Builder canvas component
 * Contains the main editor content area
 */
function BuilderCanvas({ editor }: BuilderCanvasProps) {
  return (
    <div className="bg-bg-cream flex flex-1 justify-center px-2 py-4 sm:px-4 sm:py-6">
      <div className="w-full max-w-[816px]">
        <EditorContent
          editor={editor}
          className={cn(
            'editor-content border-border/50 w-full rounded-lg border bg-white shadow-sm',
            'prose prose-gray text-text-primary min-h-[60vh] p-4 font-mono text-sm leading-relaxed focus:outline-none sm:min-h-[70vh] sm:p-8 lg:min-h-[11in] lg:p-12',
            'prose-headings:text-text-primary prose-p:text-text-secondary prose-strong:text-text-primary'
          )}
        />
      </div>
    </div>
  );
}

export { BuilderCanvas };
