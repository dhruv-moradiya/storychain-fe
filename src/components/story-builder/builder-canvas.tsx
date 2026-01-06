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
    <div className="flex flex-1 justify-center px-2 py-4 sm:px-4 sm:py-6">
      <div className="w-full max-w-[816px]">
        <EditorContent
          editor={editor}
          className={cn(
            'editor-content bg-background w-full rounded-md border shadow-sm',
            'prose prose-gray dark:prose-invert text-foreground min-h-[60vh] p-4 font-mono text-sm text-[13px] leading-relaxed font-medium focus:outline-none sm:min-h-[70vh] sm:p-8 lg:min-h-[11in] lg:p-12'
          )}
        />
      </div>
    </div>
  );
}

export { BuilderCanvas };
