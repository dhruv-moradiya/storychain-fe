import { Button } from '@/components/ui/button';
import type { IChapterAutoSave } from '@/type/chapterAutoSave';
import { formatDistanceToNow } from 'date-fns';
import { FileText, Trash2 } from 'lucide-react';
import { useSearchParams } from 'react-router';

function DraftCard({ lastSavedAt, title, _id }: IChapterAutoSave) {
  const [params, setParams] = useSearchParams();

  return (
    <div className="hover:bg-muted/50 flex items-start gap-3 rounded-lg border p-3 transition-colors">
      <div className="rounded-md bg-amber-100 p-2 dark:bg-amber-900/50">
        <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400" />
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-medium">{title}</h4>
        <p className="text-muted-foreground mt-0.5 text-xs">
          1230 words &bull; Last saved {formatDistanceToNow(lastSavedAt)}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          onClick={() => {
            params.set('autoSaveId', _id);
            setParams(params);
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

export { DraftCard };
