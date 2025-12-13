import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from '@/components/ui/empty';

export default function NotificationsError({ onRetry }: { onRetry: () => void }) {
  return (
    <Empty className="to-muted/40 relative mx-auto max-w-lg overflow-hidden rounded-xl border bg-gradient-to-b from-red-50/40 py-14 shadow-lg dark:from-red-950/40">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="text-red-500">
          <AlertTriangle size={46} />
        </EmptyMedia>

        <EmptyTitle>Failed to Load Notifications</EmptyTitle>

        <EmptyDescription>Something went wrong while fetching notifications.</EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <Button onClick={onRetry}>Retry</Button>
      </EmptyContent>
    </Empty>
  );
}
