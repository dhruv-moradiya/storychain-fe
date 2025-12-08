import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
  EmptyContent,
} from '@/components/ui/empty';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface StoriesErrorProps {
  onRetry: () => void;
}

export default function StoriesError({ onRetry }: StoriesErrorProps) {
  return (
    <Empty
      className={`via-background to-muted/40 dark:via-background dark:to-muted/20 relative mx-auto max-w-lg overflow-hidden rounded-xl border bg-gradient-to-b from-red-50/40 py-14 shadow-lg dark:from-red-950/40`}
    >
      {/* Radial Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.1),transparent_70%)]" />

      <EmptyHeader>
        <div className="relative flex items-center justify-center">
          {/* Pulsing Red Glow */}
          <motion.div
            className="absolute h-20 w-20 rounded-full bg-red-500/20 blur-xl"
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Shake Animation */}
          <motion.div
            animate={{ x: [-3, 3, -3] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <EmptyMedia variant="icon" className="text-red-500 drop-shadow-lg">
              <AlertTriangle size={46} strokeWidth={1.5} />
            </EmptyMedia>
          </motion.div>
        </div>

        <EmptyTitle className="text-xl font-semibold tracking-tight">
          Failed to Load Stories
        </EmptyTitle>

        <EmptyDescription className="mx-auto max-w-md">
          Something went wrong while loading your stories. This may be due to network issues or
          temporary server downtime.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <Button
          onClick={onRetry}
          className="flex items-center gap-2 rounded-lg px-6 shadow-md transition-transform hover:scale-[1.04]"
        >
          Retry
        </Button>
      </EmptyContent>
    </Empty>
  );
}
