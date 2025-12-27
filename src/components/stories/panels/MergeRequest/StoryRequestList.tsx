import { BookOpenText, Clock } from 'lucide-react';
import { RequestStatusBadge } from './RequestStatusBadge';

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

export default function StoryRequestList({ requests, onSelect }: StoryRequestListProps) {
  return (
    <div className="divide-border flex-1 divide-y overflow-y-auto">
      {requests.map((req) => (
        <div
          key={req.id}
          onClick={() => onSelect(req.id)}
          className="hover:bg-muted/40 cursor-pointer border-b px-0 py-1 transition-colors hover:shadow-2xl"
        >
          <div className="flex flex-row items-start justify-between p-3">
            {/* Left section */}
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <BookOpenText className="text-muted-foreground size-4 shrink-0" />
                <span className="truncate text-sm font-medium">{req.title}</span>
                <RequestStatusBadge status={req.status} />
              </div>

              <RequestDescription
                authorName={req.author.name}
                chapterName={req.chapterName}
                storyTitle={req.storyTitle}
                status={req.status}
              />
            </div>

            {/* Right section */}
            <div className="ml-3 flex shrink-0 items-center gap-2">
              <div className="text-muted-foreground flex items-center gap-1 text-xs">
                <Clock className="size-3.5" />
                <span>{req.timeAgo}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
