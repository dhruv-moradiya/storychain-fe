import { formatDistanceToNow } from 'date-fns';
import { Check, AlertCircle, Cloud, CloudOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { AutoSaveState } from './hooks/use-auto-save';

interface AutoSaveIndicatorProps extends AutoSaveState {
  autoSaveEnabled: boolean;
  onToggle: () => void;
  onForceSave: () => void;
}

export function AutoSaveIndicator({
  status,
  lastSavedAt,
  error,
  autoSaveEnabled,
  onToggle,
  onForceSave,
}: AutoSaveIndicatorProps) {
  const getStatusDisplay = () => {
    if (!autoSaveEnabled) {
      return {
        icon: <CloudOff className="h-4 w-4" />,
        text: 'Auto-save off',
        color: 'text-muted-foreground',
      };
    }

    switch (status) {
      case 'saving':
        return {
          icon: <Loader2 className="h-4 w-4 animate-spin" />,
          text: 'Saving...',
          color: 'text-blue-600 dark:text-blue-400',
        };
      case 'saved':
        return {
          icon: <Check className="h-4 w-4" />,
          text: lastSavedAt
            ? `Saved ${formatDistanceToNow(lastSavedAt, { addSuffix: true })}`
            : 'Saved',
          color: 'text-green-600 dark:text-green-400',
        };
      case 'unsaved':
        return {
          icon: <Cloud className="h-4 w-4" />,
          text: 'Unsaved changes',
          color: 'text-amber-600 dark:text-amber-400',
        };
      case 'error':
        return {
          icon: <AlertCircle className="h-4 w-4" />,
          text: error || 'Save failed',
          color: 'text-red-600 dark:text-red-400',
        };
      default:
        return {
          icon: <Cloud className="h-4 w-4" />,
          text: 'Auto-save on',
          color: 'text-muted-foreground',
        };
    }
  };

  const { icon, text, color } = getStatusDisplay();

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={autoSaveEnabled ? 'secondary' : 'outline'}
              size="sm"
              onClick={onToggle}
              className={cn('gap-2 transition-colors', color)}
            >
              {icon}
              <span className="hidden sm:inline">{text}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>
              {autoSaveEnabled
                ? 'Click to disable auto-save'
                : 'Click to enable auto-save'}
            </p>
            {lastSavedAt && (
              <p className="text-xs text-muted-foreground">
                Last saved: {lastSavedAt.toLocaleTimeString()}
              </p>
            )}
          </TooltipContent>
        </Tooltip>

        {/* Manual save button when auto-save is off or there's an error */}
        {(!autoSaveEnabled || status === 'error' || status === 'unsaved') && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={onForceSave} className="px-2">
                Save
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save now (Ctrl+S)</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
}
