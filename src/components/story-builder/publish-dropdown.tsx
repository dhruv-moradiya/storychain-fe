import { ChevronDown, GitPullRequest, Calendar, Send, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface PublishDropdownProps {
  onPublish: () => void;
  onCreatePR: () => void;
  onSchedule?: () => void;
  onPreview?: () => void;
  isOwner?: boolean;
  disabled?: boolean;
}

export function PublishDropdown({
  onPublish,
  onCreatePR,
  onSchedule,
  onPreview,
  isOwner = true,
  disabled = false,
}: PublishDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={disabled} className="gap-1">
          {isOwner ? 'Publish' : 'Submit'}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        {onPreview && (
          <>
            <DropdownMenuItem onClick={onPreview} className="gap-2">
              <Eye className="h-4 w-4" />
              <div className="flex flex-col">
                <span className="font-medium">Preview</span>
                <span className="text-xs text-muted-foreground">
                  See how it looks before publishing
                </span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        {isOwner ? (
          <>
            <DropdownMenuItem onClick={onPublish} className="gap-2">
              <Send className="h-4 w-4" />
              <div className="flex flex-col">
                <span className="font-medium">Publish Now</span>
                <span className="text-xs text-muted-foreground">
                  Make this chapter live immediately
                </span>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={onCreatePR} className="gap-2">
              <GitPullRequest className="h-4 w-4" />
              <div className="flex flex-col">
                <span className="font-medium">Create Submit Request</span>
                <span className="text-xs text-muted-foreground">
                  Request review before publishing
                </span>
              </div>
            </DropdownMenuItem>

            {onSchedule && (
              <DropdownMenuItem onClick={onSchedule} className="gap-2">
                <Calendar className="h-4 w-4" />
                <div className="flex flex-col">
                  <span className="font-medium">Schedule Publish</span>
                  <span className="text-xs text-muted-foreground">
                    Set a future publish date
                  </span>
                </div>
              </DropdownMenuItem>
            )}
          </>
        ) : (
          <DropdownMenuItem onClick={onCreatePR} className="gap-2">
            <GitPullRequest className="h-4 w-4" />
            <div className="flex flex-col">
              <span className="font-medium">Create Submit Request</span>
              <span className="text-xs text-muted-foreground">
                Submit your contribution for review
              </span>
            </div>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
