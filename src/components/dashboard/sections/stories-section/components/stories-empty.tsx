import { ArrowUpRightIcon, BookOpen, Plus } from 'lucide-react';
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

interface StoriesEmptyProps {
  onCreate: () => void;
}

export default function StoriesEmpty({ onCreate }: StoriesEmptyProps) {
  return (
    <Empty className="from-background/80 via-muted/25 to-muted/60 relative mx-auto max-w-lg overflow-hidden rounded-xl border bg-gradient-to-b py-14 shadow-xl">
      {/* Radial Glow Layer */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_70%)]" />

      <EmptyHeader>
        <div className="relative flex items-center justify-center">
          {/* Animated Glow Behind Icon */}
          <motion.div
            className="bg-primary/20 absolute h-24 w-24 rounded-full blur-2xl"
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Floating + Rotating Icon */}
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
            <EmptyMedia variant="icon" className="text-primary drop-shadow-md">
              <BookOpen size={46} strokeWidth={1.4} />
            </EmptyMedia>
          </motion.div>
        </div>

        <EmptyTitle className="text-xl font-semibold tracking-tight">No Stories Yet</EmptyTitle>

        <EmptyDescription className="mx-auto max-w-md leading-relaxed text-balance">
          Your writing journey starts here. Begin crafting a story that brings your imagination to
          life.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent className="mt-3">
        <Button
          onClick={onCreate}
          className="flex items-center gap-2 rounded-lg px-6 shadow-md transition-transform hover:scale-[1.04]"
        >
          <Plus className="size-4" />
          Create Your First Story
        </Button>
      </EmptyContent>

      <Button
        variant="link"
        size="sm"
        className="text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
        asChild
      >
        <a href="/docs/writing-tips">
          Writing Tips <ArrowUpRightIcon className="size-3" />
        </a>
      </Button>
    </Empty>
  );
}
