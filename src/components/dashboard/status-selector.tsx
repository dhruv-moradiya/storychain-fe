import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle, FileEdit, Archive } from "lucide-react";

export type ContentStatus = "published" | "draft" | "archived";

interface StatusSelectorProps {
  value: ContentStatus;
  onChange?: (newStatus: ContentStatus) => void;
  selectable?: boolean;
}

const statusConfig = {
  published: {
    label: "Published",
    icon: CheckCircle,
    className: "text-green-600 border-green-500/20",
  },
  draft: {
    label: "Draft",
    icon: FileEdit,
    className: "bg-yellow-500/15 text-yellow-600 border-yellow-500/20",
  },
  archived: {
    label: "Archived",
    icon: Archive,
    className: "bg-gray-500/15 text-gray-500 border-gray-500/20",
  },
} as const;

export default function StatusSelector({
  value,
  onChange,
  selectable = true,
}: StatusSelectorProps) {
  const current = statusConfig[value];

  return (
    <div className="flex gap-2 items-center">
      {selectable ? (
        Object.entries(statusConfig).map(([key, cfg]) => {
          const Icon = cfg.icon;
          const active = key === value;

          return (
            <Badge
              key={key}
              variant="outline"
              onClick={() => onChange?.(key as ContentStatus)}
              className={cn(
                "flex items-center gap-1 cursor-pointer px-2 py-1 transition-all",
                active
                  ? cfg.className
                  : "opacity-60 hover:opacity-100 hover:bg-muted"
              )}
            >
              <Icon size={14} />
              {cfg.label}
            </Badge>
          );
        })
      ) : (
        <Badge
          variant="outline"
          className={cn(
            "flex items-center gap-1 px-2 py-1 text-xs!",
            current.className
          )}
        >
          <current.icon size={10} />
          {current.label}
        </Badge>
      )}
    </div>
  );
}
