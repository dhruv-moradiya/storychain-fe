import { ArrowLeft, Eye, Settings, Save, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router';

type ChapterStatus = 'draft' | 'pending' | 'published' | 'rejected';

interface BuilderHeaderProps {
  title: string;
  onTitleChange: (title: string) => void;
  onSave: () => void;
  isSaving: boolean;
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
function BuilderHeader({ title, onTitleChange, onSave, isSaving }: BuilderHeaderProps) {
  const navigate = useNavigate();
  const status: ChapterStatus = 'draft';
  const statusConfig = STATUS_CONFIG[status];

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
            <Input
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Untitled Chapter"
              className="text-text-primary placeholder:text-text-secondary-65 focus-visible:ring-brand-pink-500/30 h-8 min-w-0 flex-1 border-none bg-transparent text-sm font-medium shadow-none focus-visible:ring-1 sm:max-w-56 sm:text-base"
            />
            <Badge
              variant="secondary"
              className={cn('hidden flex-shrink-0 gap-1.5 border sm:flex', statusConfig.color)}
            >
              <span className={cn('h-2 w-2 rounded-full', statusConfig.dotColor)} />
              {statusConfig.label}
            </Badge>
          </div>
        </div>

        {/* Right Section - Preview, Settings, Save, Publish */}
        <div className="flex flex-shrink-0 items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-text-secondary hover:bg-muted/50 hover:text-text-primary hidden gap-1.5 md:flex"
          >
            <Eye className="h-4 w-4" />
            <span className="hidden lg:inline">Preview</span>
          </Button>

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

          <Button
            size="sm"
            className="bg-brand-pink-500 hover:bg-brand-pink-600 gap-1.5 text-white shadow-[0_2px_8px_var(--brand-pink-shadow25)]"
          >
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline">Publish</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export { BuilderHeader };
export type { ChapterStatus, BuilderHeaderProps };
