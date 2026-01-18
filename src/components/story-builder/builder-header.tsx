import {
  ArrowLeft,
  Eye,
  Settings,
  Save,
  Send,
  Loader2,
  ChevronDown,
  FileText,
  GitPullRequest,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/ui/responsive-dialog';
import { ChapterReader, type ChapterData } from '@/components/common/chapter-reader';
import { SubmitRequestDialog } from '@/components/common/submit-request-dialog';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

type ChapterStatus = 'draft' | 'pending' | 'published' | 'rejected';

interface BuilderHeaderProps {
  title: string;
  onTitleChange: (title: string) => void;
  onSave: () => void;
  isSaving: boolean;
  onPublish?: () => void;
  onSaveAsDraft?: () => void;
  editorContent?: string;
  authorName?: string;
  authorAvatar?: string;
  autoSaveId?: string | null;
  // Context for submit request dialog
  storyId?: string;
  storyTitle?: string;
  storySlug?: string;
  parentChapterId?: string;
  parentChapterTitle?: string;
  draftId?: string;
}

const STATUS_CONFIG: Record<ChapterStatus, { label: string; color: string; dotColor: string }> = {
  draft: {
    label: 'Draft',
    color: 'bg-badge-gray-bg text-badge-gray border-badge-gray-border',
    dotColor: 'bg-badge-gray',
  },
  pending: {
    label: 'Pending Review',
    color: 'bg-badge-warning-bg text-badge-warning border-badge-warning-border',
    dotColor: 'bg-badge-warning',
  },
  published: {
    label: 'Published',
    color: 'bg-badge-success-bg text-badge-success border-badge-success-border',
    dotColor: 'bg-badge-success',
  },
  rejected: {
    label: 'Rejected',
    color: 'bg-badge-error-bg text-badge-error border-badge-error-border',
    dotColor: 'bg-badge-error',
  },
};

/**
 * Builder header component
 * Top section with back button, chapter name, status, and action buttons
 */
function BuilderHeader({
  title,
  onTitleChange,
  onSave,
  isSaving,
  onPublish,
  onSaveAsDraft,
  editorContent = '',
  authorName = 'You',
  authorAvatar,
  autoSaveId,
  storyId,
  storyTitle,
  storySlug,
  parentChapterId,
  parentChapterTitle,
  draftId,
}: BuilderHeaderProps) {
  const navigate = useNavigate();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSubmitRequestOpen, setIsSubmitRequestOpen] = useState(false);
  const status: ChapterStatus = 'draft';
  const statusConfig = STATUS_CONFIG[status];

  // Create chapter data for preview
  const previewChapter: ChapterData = {
    id: 'preview',
    title: title || 'Untitled Chapter',
    content: editorContent,
    author: {
      id: 'current-user',
      name: authorName,
      avatar: authorAvatar,
    },
    status: 'draft',
  };

  return (
    <div className="border-border/50 bg-cream-95 sticky top-0 z-30 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-2 px-3 py-2 sm:gap-4">
        {/* Left Section - Back button, Chapter Name, Status */}
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-text-secondary hover:bg-brand-pink-500/10 hover:text-text-primary h-8 w-8 flex-shrink-0"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <div className="flex min-w-0 flex-1 flex-col">
              <Input
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                placeholder="Untitled Chapter"
                className="text-text-primary placeholder:text-text-secondary-65 focus-visible:ring-brand-pink-500/30 h-8 min-w-0 flex-1 border-none bg-transparent text-sm font-medium shadow-none focus-visible:ring-1 sm:max-w-56 sm:text-base"
              />
              {autoSaveId && (
                <span className="text-text-secondary-65 truncate pl-3 text-[10px]">
                  Draft ID: {autoSaveId.slice(0, 8)}...
                </span>
              )}
            </div>
            <Badge
              variant="secondary"
              className={cn('hidden flex-shrink-0 gap-1.5 border sm:flex', statusConfig.color)}
            >
              <span className={cn('h-2 w-2 rounded-full', statusConfig.dotColor)} />
              {statusConfig.label}
            </Badge>
          </div>
        </div>

        {/* Right Section - Preview, Settings, Save, Actions Dropdown */}
        <div className="flex flex-shrink-0 items-center gap-1 sm:gap-2">
          <ResponsiveDialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
            <Button
              variant="ghost"
              size="sm"
              className="text-text-secondary hover:bg-muted/50 hover:text-text-primary hidden gap-1.5 md:flex"
              onClick={() => setIsPreviewOpen(true)}
            >
              <Eye className="h-4 w-4" />
              <span className="hidden lg:inline">Preview</span>
            </Button>

            <ResponsiveDialogContent
              className="sm:max-w-2xl"
              sheetHeight="90%"
              showCloseButton={true}
            >
              <ResponsiveDialogHeader>
                <ResponsiveDialogTitle>Preview</ResponsiveDialogTitle>
              </ResponsiveDialogHeader>
              <div className="mt-4 max-h-[70vh] overflow-y-auto">
                <ChapterReader
                  chapter={previewChapter}
                  showHeader={true}
                  showStats={false}
                  variant="preview"
                />
              </div>
            </ResponsiveDialogContent>
          </ResponsiveDialog>

          <Button
            variant="ghost"
            size="sm"
            className="text-text-secondary hover:bg-muted/50 hover:text-text-primary hidden gap-1.5 sm:flex"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden lg:inline">Settings</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="border-border text-text-secondary hover:bg-muted/50 hover:text-text-primary gap-1.5"
            onClick={onSave}
            disabled={isSaving}
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Save'}</span>
          </Button>

          {/* Actions Dropdown - Publish, Save as Draft, Submit Request */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                className="bg-brand-pink-500 hover:bg-brand-pink-600 gap-1.5 text-white shadow-[0_2px_8px_var(--brand-pink-shadow25)]"
              >
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">Publish</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={onPublish} className="gap-2">
                <Send className="h-4 w-4" />
                Publish
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onSaveAsDraft} className="gap-2">
                <FileText className="h-4 w-4" />
                Save as Draft
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsSubmitRequestOpen(true)} className="gap-2">
                <GitPullRequest className="h-4 w-4" />
                Create Submit Request
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Submit Request Dialog */}
      <SubmitRequestDialog
        open={isSubmitRequestOpen}
        onOpenChange={setIsSubmitRequestOpen}
        storyId={storyId}
        storyTitle={storyTitle}
        storySlug={storySlug}
        parentChapterId={parentChapterId}
        parentChapterTitle={parentChapterTitle}
        draftId={draftId}
        draftTitle={title}
        draftContent={editorContent}
        onSubmit={(data) => {
          toast.success('Submit request created successfully!');
          console.log('Submit request data:', data);
        }}
      />
    </div>
  );
}

export { BuilderHeader };
export type { ChapterStatus, BuilderHeaderProps };
