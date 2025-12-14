import { motion } from 'framer-motion';
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

interface StoryTreeErrorProps {
  onRetry: () => void;
}

const StoryTreeError = ({ onRetry }: StoryTreeErrorProps) => {
  return (
    <Empty className="via-background to-muted/40 relative mx-auto h-[calc(100vh-106px)] max-w-3xl overflow-hidden rounded-2xl border bg-gradient-to-b from-red-50/40 py-20 shadow-xl dark:from-red-950/40">
      {/* Red Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.12),transparent_70%)]" />

      <EmptyHeader>
        <div className="relative flex items-center justify-center">
          {/* Pulsing glow */}
          <motion.div
            className="absolute h-24 w-24 rounded-full bg-red-500/20 blur-2xl"
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Shaking icon */}
          <motion.div
            animate={{ x: [-4, 4, -4] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <EmptyMedia variant="icon" className="text-red-500 drop-shadow-lg">
              <AlertTriangle size={48} strokeWidth={1.5} />
            </EmptyMedia>
          </motion.div>
        </div>

        <EmptyTitle className="text-xl font-semibold tracking-tight">
          Failed to Load Story Tree
        </EmptyTitle>

        <EmptyDescription className="mx-auto max-w-lg leading-relaxed text-balance">
          Something went wrong while loading the story structure. This may be a temporary network
          issue or a server problem.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <Button
          onClick={onRetry}
          className="rounded-lg px-6 shadow-md transition-transform hover:scale-[1.04]"
        >
          Retry
        </Button>
      </EmptyContent>
    </Empty>
  );
};

export default StoryTreeError;
