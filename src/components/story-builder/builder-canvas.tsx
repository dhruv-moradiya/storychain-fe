import type { Editor } from '@tiptap/react';
import { EditorContent } from '@tiptap/react';
import { cn } from '@/lib/utils';
import './builder-canvas.css';

interface BuilderCanvasProps {
  editor: Editor;
}

/**
 * Builder canvas component
 * Contains the main editor content area with optimized typography
 */
function BuilderCanvas({ editor }: BuilderCanvasProps) {
  return (
    <div className="bg-bg-cream flex flex-1 justify-center px-3 py-4 sm:px-6 sm:py-6 md:px-8">
      <div className="w-full max-w-3xl">
        <EditorContent
          editor={editor}
          className={cn(
            'story-editor',
            'border-border/30 w-full rounded-2xl border bg-white shadow-sm',
            'min-h-[60vh] p-6 sm:min-h-[70vh] sm:p-10 lg:min-h-[11in] lg:p-14'
          )}
        />
      </div>
    </div>
  );
}

export { BuilderCanvas };
