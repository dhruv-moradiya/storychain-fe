import { BookOpenText, ChevronRight, Clock, Eye } from "lucide-react";
import { Item, ItemContent } from "@/components/ui/item";
import { RequestStatusBadge } from "./RequestStatusBadge";
import { Button } from "@/components/ui/button";

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
  status: "open" | "approved" | "merged" | "rejected";
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
  status: "open" | "approved" | "merged" | "rejected";
}) {
  return (
    <div className="text-xs text-muted-foreground leading-snug">
      <span className="font-medium text-foreground">{authorName}</span> wants to{" "}
      {status === "open" ? (
        <span className="font-medium text-blue-600 dark:text-blue-400">
          add
        </span>
      ) : (
        <span className="font-medium text-amber-600 dark:text-amber-400">
          update
        </span>
      )}{" "}
      chapter <span className="text-primary">"{chapterName}"</span> in{" "}
      <span className="font-medium">{storyTitle}</span>
    </div>
  );
}

export default function StoryRequestList({
  requests,
  onSelect,
}: StoryRequestListProps) {
  return (
    <div className="flex-1 overflow-y-auto divide-y divide-border">
      {requests.map((req) => (
        <div
          key={req.id}
          onClick={() => onSelect(req.id)}
          className="hover:bg-muted/40 cursor-pointer transition-colors px-0 py-1 border-b hover:shadow-2xl"
        >
          <div className="flex flex-row items-start justify-between p-3">
            {/* Left section */}
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <BookOpenText className="size-4 text-muted-foreground shrink-0" />
                <span className="text-sm font-medium truncate">
                  {req.title}
                </span>
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
            <div className="flex items-center gap-2 shrink-0 ml-3">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
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
