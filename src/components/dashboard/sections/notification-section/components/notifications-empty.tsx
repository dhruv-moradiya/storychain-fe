import { motion } from 'framer-motion';
import { BellOff } from 'lucide-react';
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from '@/components/ui/empty';

export default function NotificationsEmpty() {
  return (
    <Empty className="from-background/80 via-muted/30 to-muted/60 relative mx-auto max-w-lg overflow-hidden rounded-xl border bg-gradient-to-b py-14 shadow-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_70%)]" />

      <EmptyHeader>
        <motion.div
          className="relative flex items-center justify-center"
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <EmptyMedia variant="icon" className="text-muted-foreground">
            <BellOff size={44} />
          </EmptyMedia>
        </motion.div>

        <EmptyTitle>No Notifications Yet</EmptyTitle>

        <EmptyDescription>
          You’re all caught up. Activity related to stories, collaborators, and pull requests will
          appear here.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
