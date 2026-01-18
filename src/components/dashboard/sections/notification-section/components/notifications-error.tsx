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
    <Empty className="from-cream-95 via-cream-90 to-cream-95 relative mx-auto max-w-lg overflow-hidden rounded-xl border border-red-200/50 bg-gradient-to-b py-14 shadow-lg">
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
