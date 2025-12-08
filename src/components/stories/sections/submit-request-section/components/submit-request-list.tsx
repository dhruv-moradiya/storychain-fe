import { BookOpenText, Clock, GitPullRequestArrow } from 'lucide-react';
import { RequestStatusBadge } from './request-status-badge';

interface StoryRequest {
  id: string;
  title: string;
  storyTitle: string;
  chapterName: string;
  description: string;
  author: {
    name: string;
    avatar?: string;
  };
  timeAgo: string;
  status: 'open' | 'approved' | 'merged' | 'rejected';
}

interface StoryRequestListProps {
  requests: StoryRequest[];
  onSelect: (id: string) => void;
}

function RequestDescription({
  authorName,
  chapterName,
  storyTitle,
  status,
}: {
  authorName: string;
  chapterName: string;
  storyTitle: string;
  status: 'open' | 'approved' | 'merged' | 'rejected';
}) {
  return (
    <div className="text-muted-foreground text-xs leading-snug">
      <span className="text-foreground font-medium">{authorName}</span> wants to{' '}
      {status === 'open' ? (
        <span className="font-medium text-blue-600 dark:text-blue-400">add</span>
      ) : (
        <span className="font-medium text-amber-600 dark:text-amber-400">update</span>
      )}{' '}
      chapter <span className="text-primary">"{chapterName}"</span> in{' '}
      <span className="font-medium">{storyTitle}</span>
    </div>
  );
}

export default function SubmitRequestList({ requests, onSelect }: StoryRequestListProps) {
  return (
    <div className="bg-background flex h-full flex-col overflow-hidden rounded-lg border">
      {/* =================== HEADER (GitHub-style) =================== */}
      <div className="bg-muted/30 flex items-center gap-2 border-b px-4 py-2 text-sm font-medium">
        <GitPullRequestArrow size={16} className="text-green-600" />
        <span>{requests.length} Open</span>
      </div>

      {/* =================== LIST =================== */}
      <div className="divide-border flex-1 divide-y overflow-y-auto">
        {requests.map((req) => (
          <div
            key={req.id}
            onClick={() => onSelect(req.id)}
            className="hover:bg-muted/40 cursor-pointer transition-colors"
          >
            <div className="flex items-start justify-between px-4 py-3">
              {/* LEFT SIDE */}
              <div className="flex min-w-0 flex-col gap-1">
                {/* Title row */}
                <div className="flex flex-wrap items-center gap-2">
                  <BookOpenText size={14} className="text-muted-foreground shrink-0" />

                  <span className="truncate text-sm font-medium">{req.title}</span>

                  {/* Status Badge */}
                  <RequestStatusBadge status={req.status} />
                </div>

                {/* Description */}
                <RequestDescription
                  authorName={req.author.name}
                  chapterName={req.chapterName}
                  storyTitle={req.storyTitle}
                  status={req.status}
                />
              </div>

              {/* RIGHT SIDE */}
              <div className="text-muted-foreground ml-3 flex shrink-0 items-center gap-1 text-xs">
                <Clock size={14} />
                <span>{req.timeAgo}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
