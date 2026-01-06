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
    color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    dotColor: 'bg-slate-500',
  },
  pending: {
    label: 'Pending Review',
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    dotColor: 'bg-amber-500',
  },
  published: {
    label: 'Published',
    color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    dotColor: 'bg-green-500',
  },
  rejected: {
    label: 'Rejected',
    color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    dotColor: 'bg-red-500',
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
    <div className="bg-background/70 sticky top-0 z-30 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 px-3 py-2">
        {/* Left Section - Back button, Chapter Name, Status */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-3">
            <Input
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Untitled Chapter"
              className="h-8 w-40 border-none bg-transparent text-sm font-medium shadow-none focus-visible:ring-1 sm:w-56 sm:text-base"
            />
            <Badge variant="secondary" className={cn('gap-1.5', statusConfig.color)}>
              <span className={cn('h-2 w-2 rounded-full', statusConfig.dotColor)} />
              {statusConfig.label}
            </Badge>
          </div>
        </div>

        {/* Right Section - Preview, Settings, Save, Publish */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-1.5">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Preview</span>
          </Button>

          <Button variant="ghost" size="sm" className="gap-1.5">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={onSave}
            disabled={isSaving}
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Save'}</span>
          </Button>

          <Button size="sm" className="gap-1.5">
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
