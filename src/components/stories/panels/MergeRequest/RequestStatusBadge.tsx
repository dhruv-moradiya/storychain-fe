import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type RequestStatus =
  | "open"
  | "approved"
  | "merged"
  | "rejected"
  | "draft"
  | "changes_requested";

interface RequestStatusBadgeProps {
  status: RequestStatus;
  className?: string;
}

export function RequestStatusBadge({
  status,
  className,
}: RequestStatusBadgeProps) {
  const variantMap: Record<RequestStatus, string> = {
    open: "bg-primary/10 text-primary border-primary/20",
    approved:
      "bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400",
    merged:
      "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400",
    rejected: "bg-destructive/10 text-destructive border-destructive/20",
    draft: "bg-muted text-muted-foreground border-muted",
    changes_requested:
      "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:text-yellow-400",
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "text-[10px] px-2 py-0.5 capitalize border transition-colors duration-200",
        variantMap[status],
        className
      )}
    >
      {status.replace("_", " ")}
    </Badge>
  );
}
