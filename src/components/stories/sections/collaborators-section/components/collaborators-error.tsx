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

interface CollaboratorsErrorProps {
  onRetry: () => void;
}

export default function CollaboratorsError({ onRetry }: CollaboratorsErrorProps) {
  return (
    <Empty className="via-background to-muted/40 dark:via-background dark:to-muted/20 relative mx-auto max-w-lg overflow-hidden rounded-xl border bg-gradient-to-b from-red-50/40 py-14 shadow-lg dark:from-red-950/40">
      {/* Red Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.1),transparent_70%)]" />

      <EmptyHeader>
        <div className="relative flex items-center justify-center">
          {/* Pulsing red glow */}
          <motion.div
            className="absolute h-20 w-20 rounded-full bg-red-500/20 blur-xl"
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Shake Icon */}
          <motion.div
            animate={{ x: [-3, 3, -3] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <EmptyMedia variant="icon" className="text-red-500 drop-shadow-lg">
              <AlertTriangle size={46} strokeWidth={1.5} />
            </EmptyMedia>
          </motion.div>
        </div>

        <EmptyTitle className="text-xl font-semibold tracking-tight">
          Failed to Load Collaborators
        </EmptyTitle>

        <EmptyDescription className="mx-auto max-w-md leading-relaxed text-balance">
          Something went wrong while loading collaborator data. This could be a network issue or a
          temporary server problem.
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
}
