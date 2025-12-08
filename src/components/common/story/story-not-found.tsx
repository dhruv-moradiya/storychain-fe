import { BookOpen, Plus, ArrowUpRightIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface StoryNotFoundProps {
  onCreate: () => void;
}

export default function StoryNotFound({ onCreate }: StoryNotFoundProps) {
  return (
    <div className="from-background/80 via-muted/25 to-muted/60 relative mx-auto max-w-lg overflow-hidden rounded-xl border bg-gradient-to-b px-6 py-14 shadow-xl">
      {/* Glow Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.10),transparent_70%)]" />

      {/* Header */}
      <div className="relative z-10 space-y-4 text-center">
        {/* Glow + Icon */}
        <div className="relative flex items-center justify-center">
          {/* Pulsing Glow */}
          <motion.div
            className="bg-primary/20 absolute h-24 w-24 rounded-full blur-2xl"
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Floating Icon */}
          <motion.div
            animate={{
              y: [-5, 5, -5],
              rotate: [-1.5, 1.5, -1.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-primary drop-shadow-md"
          >
            <BookOpen size={48} strokeWidth={1.4} />
          </motion.div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold tracking-tight">Story Not Found</h2>

        {/* Description */}
        <p className="text-muted-foreground mx-auto max-w-md text-sm leading-relaxed">
          The story you are looking for doesn't exist or the creator has removed it.
        </p>
      </div>

      {/* Actions */}
      <div className="relative z-10 mt-6 flex flex-col items-center gap-3">
        <Button
          onClick={onCreate}
          className="flex items-center gap-2 rounded-lg px-6 shadow-md transition-transform hover:scale-[1.04]"
        >
          <Plus className="size-4" />
          Create New Story
        </Button>

        <a
          href="/docs/writing-tips"
          className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm transition-colors"
        >
          Writing Tips
          <ArrowUpRightIcon className="size-3" />
        </a>
      </div>
    </div>
  );
}
