import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from '@/components/ui/empty';

interface Props {
  onCreateChapter: () => void;
}

const StoryTreeEmpty = ({ onCreateChapter }: Props) => {
  return (
    <Empty className="from-background/80 via-muted/30 to-muted/60 relative mx-auto h-[calc(100vh-106px)] max-w-3xl overflow-hidden rounded-2xl border bg-gradient-to-b py-20 shadow-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_70%)]" />

      <EmptyHeader>
        <motion.div
          className="relative flex items-center justify-center"
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <EmptyMedia variant="icon" className="text-primary">
            <BookOpen size={46} strokeWidth={1.4} />
          </EmptyMedia>
        </motion.div>

        <EmptyTitle className="text-xl font-semibold tracking-tight">No Chapters Yet</EmptyTitle>

        <EmptyDescription className="mx-auto max-w-md leading-relaxed text-balance">
          This story doesn’t have any chapters yet. Start by creating the first node in your story
          tree.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <Button
          onClick={onCreateChapter}
          className="rounded-lg px-6 shadow-md transition-transform hover:scale-[1.04]"
        >
          Create First Chapter
        </Button>
      </EmptyContent>
    </Empty>
  );
};

export default StoryTreeEmpty;
