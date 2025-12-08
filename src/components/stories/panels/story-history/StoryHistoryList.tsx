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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { storyHistory } from "./data";

type StoryHistory = {
  id: string;
  type:
    | "creation"
    | "edit"
    | "chapter_add"
    | "comment"
    | "fork"
    | "merge"
    | "publish"
    | "rename"
    | "delete"
    | "restore"
    | "tag_update"
    | "collaboration";
  user: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
  };
  action: string;
  details?: Record<string, any>;
  timestamp: string;
  timeAgo: string;
};

interface StoryHistoryListProps {
  history: StoryHistory[];
  onSelect?: (id: string) => void;
}

export default function StoryHistoryList({
  history,
  onSelect,
}: StoryHistoryListProps) {
  const getIcon = (type: StoryHistory["type"]) => {
    switch (type) {
      case "creation":
        return <BookOpenText className="size-4 text-muted-foreground" />;
      case "edit":
        return <Edit3 className="size-4 text-muted-foreground" />;
      case "chapter_add":
        return <GitBranch className="size-4 text-muted-foreground" />;
      case "comment":
        return <MessageCircle className="size-4 text-muted-foreground" />;
      case "fork":
        return <GitFork className="size-4 text-muted-foreground" />;
      case "merge":
        return <Share2 className="size-4 text-muted-foreground" />;
      case "publish":
        return <UploadCloud className="size-4 text-muted-foreground" />;
      case "collaboration":
        return <UserPlus className="size-4 text-muted-foreground" />;
      case "tag_update":
        return <Tag className="size-4 text-muted-foreground" />;
      case "restore":
        return <Undo2 className="size-4 text-muted-foreground" />;
      default:
        return <BookOpenText className="size-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto divide-y divide-border">
      {storyHistory.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect?.(item.id)}
          className="hover:bg-muted/40 cursor-pointer transition-colors px-0 py-1 border-b hover:shadow-2xl"
        >
          <div className="flex flex-row items-start justify-between p-3">
            {/* Left section */}
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                {getIcon(item.type)}
                <span className="text-sm font-medium truncate">
                  {item.action}
                </span>
                <Badge variant="secondary" className="text-xs capitalize">
                  {item.type.replace("_", " ")}
                </Badge>
              </div>

              <div className="text-xs text-muted-foreground truncate">
                {item.user.name} @{item.user.username}
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-2 shrink-0 ml-3">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="size-3.5" />
                <span>{item.timeAgo}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
