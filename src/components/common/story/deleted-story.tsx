import { Trash2, Undo2, ArrowUpRightIcon, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

interface DeletedStoryProps {
  onRestore?: () => void;
  onCreateNew?: () => void;
}

export default function DeletedStory({ onRestore, onCreateNew }: DeletedStoryProps) {
  return (
    <Empty className="from-background/80 via-muted/25 to-muted/60 relative mx-auto max-w-lg overflow-hidden rounded-xl border bg-gradient-to-b py-14 shadow-xl">
      {/* Radial Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_70%)]" />

      <EmptyHeader>
        <div className="relative flex items-center justify-center">
          {/* Glow Animation */}
          <motion.div
            className="absolute h-24 w-24 rounded-full bg-red-500/20 blur-2xl"
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Floating Icon */}
          <motion.div
            animate={{
              y: [-4, 4, -4],
              rotate: [-1.5, 1.5, -1.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <EmptyMedia variant="icon" className="text-red-500 drop-shadow-md">
              <Trash2 size={48} strokeWidth={1.4} />
            </EmptyMedia>
          </motion.div>
        </div>

        <EmptyTitle className="text-xl font-semibold tracking-tight text-red-600">
          This Story Has Been Deleted
        </EmptyTitle>

        <EmptyDescription className="mx-auto max-w-md leading-relaxed text-balance">
          The story you're trying to view no longer exists or has been removed by the creator.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent className="mt-3 space-y-3">
        {/* Restore (optional) */}
        {onRestore && (
          <Button
            onClick={onRestore}
            variant="secondary"
            className="flex w-full items-center gap-2 rounded-lg px-6 shadow-md transition-transform hover:scale-[1.04]"
          >
            <Undo2 className="size-4" />
            Restore Story
          </Button>
        )}

        {/* Create New */}
        {onCreateNew && (
          <Button
            onClick={onCreateNew}
            className="flex w-full items-center gap-2 rounded-lg px-6 shadow-md transition-transform hover:scale-[1.04]"
          >
            <Plus className="size-4" />
            Create a New Story
          </Button>
        )}
      </EmptyContent>

      <Button
        variant="link"
        size="sm"
        className="text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
        asChild
      >
        <a href="/docs/recovery">
          Learn about Story Recovery
          <ArrowUpRightIcon className="size-3" />
        </a>
      </Button>
    </Empty>
  );
}
