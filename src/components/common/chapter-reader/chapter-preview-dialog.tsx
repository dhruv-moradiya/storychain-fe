import { useState } from 'react';
import { X, Maximize2, Minimize2, ExternalLink, BookOpen, GitCompare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { ChapterReader, type ChapterData } from './chapter-reader';
import { DiffViewer } from '../diff-viewer/diff-viewer';

interface ChapterPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chapter: ChapterData;
  originalContent?: string;
  showDiff?: boolean;
  onOpenInNewTab?: () => void;
}

export function ChapterPreviewDialog({
  open,
  onOpenChange,
  chapter,
  originalContent,
  showDiff = false,
  onOpenInNewTab,
}: ChapterPreviewDialogProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'changes'>(
    showDiff && originalContent ? 'changes' : 'preview'
  );

  const hasDiff = showDiff && originalContent;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'flex flex-col gap-0 p-0',
          isFullscreen
            ? 'h-screen max-h-screen w-screen max-w-none rounded-none'
            : 'max-h-[90vh] max-w-4xl'
        )}
      >
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between border-b px-4 py-3">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="h-5 w-5" />
            Preview
          </DialogTitle>

          <div className="flex items-center gap-1">
            {onOpenInNewTab && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onOpenInNewTab}
                className="h-8 w-8"
                title="Open in new tab"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="h-8 w-8"
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Tabs (if showing diff) */}
        {hasDiff ? (
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as 'preview' | 'changes')}
            className="flex flex-1 flex-col overflow-hidden"
          >
            <div className="border-b px-4">
              <TabsList className="h-10 w-full justify-start rounded-none border-0 bg-transparent p-0">
                <TabsTrigger
                  value="preview"
                  className="relative rounded-none border-0 bg-transparent px-4 py-2.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Preview
                </TabsTrigger>
                <TabsTrigger
                  value="changes"
                  className="relative rounded-none border-0 bg-transparent px-4 py-2.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary"
                >
                  <GitCompare className="mr-2 h-4 w-4" />
                  Changes
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="preview" className="mt-0 flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="mx-auto max-w-3xl px-6 py-8">
                  <ChapterReader
                    chapter={chapter}
                    variant="preview"
                    showStats={false}
                    showBreadcrumb={false}
                  />
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="changes" className="mt-0 flex-1 overflow-hidden p-4">
              <DiffViewer
                original={originalContent}
                modified={chapter.content}
                originalTitle="Original Version"
                modifiedTitle="Your Changes"
                showStats
                maxHeight={isFullscreen ? 'calc(100vh - 180px)' : '60vh'}
              />
            </TabsContent>
          </Tabs>
        ) : (
          // Simple preview without tabs
          <ScrollArea className="flex-1">
            <div className="mx-auto max-w-3xl px-6 py-8">
              <ChapterReader
                chapter={chapter}
                variant="preview"
                showStats={false}
                showBreadcrumb={false}
              />
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}
