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
    <div className="bg-bg-cream flex flex-1 justify-center px-3 py-4 sm:px-6 sm:py-6 md:px-8">
      <div className="w-full max-w-3xl">
        <EditorContent
          editor={editor}
          className={cn(
            'border-border/50 w-full rounded-xl border bg-white/50 shadow-sm',
            'prose prose-gray prose-max-w-none text-text-primary min-h-[60vh] max-w-none p-5 font-serif text-base leading-[1] focus:outline-none sm:min-h-[70vh] sm:p-8 sm:text-[17px] lg:min-h-[11in] lg:p-12',
            'prose-headings:text-text-primary prose-headings:font-serif prose-p:text-text-secondary prose-strong:text-text-primary'
          )}
        />
      </div>
    </div>
  );
}

export { BuilderCanvas };
