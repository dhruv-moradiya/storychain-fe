import {
  Clock,
  GitBranch,
  Edit3,
  MessageCircle,
  BookOpenText,
  UserPlus,
  Tag,
  Share2,
  UploadCloud,
  GitFork,
  Undo2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { storyHistory } from './data';

type StoryHistory = {
  id: string;
  type:
    | 'creation'
    | 'edit'
    | 'chapter_add'
    | 'comment'
    | 'fork'
    | 'merge'
    | 'publish'
    | 'rename'
    | 'delete'
    | 'restore'
    | 'tag_update'
    | 'collaboration';
  user: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
  };
  action: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: Record<string, any>;
  timestamp: string;
  timeAgo: string;
};

interface StoryHistoryListProps {
  history: StoryHistory[];
  onSelect?: (id: string) => void;
}

export default function StoryHistoryList({ history, onSelect }: StoryHistoryListProps) {
  const getIcon = (type: StoryHistory['type']) => {
    switch (type) {
      case 'creation':
        return <BookOpenText className="text-muted-foreground size-4" />;
      case 'edit':
        return <Edit3 className="text-muted-foreground size-4" />;
      case 'chapter_add':
        return <GitBranch className="text-muted-foreground size-4" />;
      case 'comment':
        return <MessageCircle className="text-muted-foreground size-4" />;
      case 'fork':
        return <GitFork className="text-muted-foreground size-4" />;
      case 'merge':
        return <Share2 className="text-muted-foreground size-4" />;
      case 'publish':
        return <UploadCloud className="text-muted-foreground size-4" />;
      case 'collaboration':
        return <UserPlus className="text-muted-foreground size-4" />;
      case 'tag_update':
        return <Tag className="text-muted-foreground size-4" />;
      case 'restore':
        return <Undo2 className="text-muted-foreground size-4" />;
      default:
        return <BookOpenText className="text-muted-foreground size-4" />;
    }
  };

  return (
    <div className="divide-border flex-1 divide-y overflow-y-auto">
      {storyHistory.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect?.(item.id)}
          className="hover:bg-muted/40 cursor-pointer border-b px-0 py-1 transition-colors hover:shadow-2xl"
        >
          <div className="flex flex-row items-start justify-between p-3">
            {/* Left section */}
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                {getIcon(item.type as StoryHistory['type'])}
                <span className="truncate text-sm font-medium">{item.action}</span>
                <Badge variant="secondary" className="text-xs capitalize">
                  {item.type.replace('_', ' ')}
                </Badge>
              </div>

              <div className="text-muted-foreground truncate text-xs">
                {item.user.name} @{item.user.username}
              </div>
            </div>

            {/* Right section */}
            <div className="ml-3 flex shrink-0 items-center gap-2">
              <div className="text-muted-foreground flex items-center gap-1 text-xs">
                <Clock className="size-3.5" />
                <span>{item.timestamp}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
