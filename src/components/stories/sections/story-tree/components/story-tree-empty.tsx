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
import { useNavigate, useParams } from 'react-router';

const StoryTreeEmpty = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  return (
    <Empty className="border-border/50 bg-bg-cream relative mx-auto overflow-hidden rounded-2xl border py-20">
      <EmptyHeader>
        <motion.div
          className="relative flex items-center justify-center"
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <EmptyMedia variant="icon" className="text-brand-pink-500">
            <BookOpen size={46} strokeWidth={1.4} />
          </EmptyMedia>
        </motion.div>

        <EmptyTitle className="text-text-primary text-xl font-semibold tracking-tight">
          No Chapters Yet
        </EmptyTitle>

        <EmptyDescription className="text-text-secondary-65 mx-auto max-w-md leading-relaxed text-balance">
          This story doesn't have any chapters yet. Start by creating the first node in your story
          tree.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <Button
          onClick={() => navigate(`/stories/${slug}/builder?mode=new&parent=root`)}
          className="bg-brand-pink-500 hover:bg-brand-pink-600 cursor-pointer rounded-lg px-6 text-white transition-transform hover:scale-[1.04]"
        >
          Create First Chapter
        </Button>
      </EmptyContent>
    </Empty>
  );
};

export default StoryTreeEmpty;
