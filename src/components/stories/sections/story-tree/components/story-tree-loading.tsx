import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/utils';

const StoryTreeLoading = () => {
  return (
    <motion.div
      {...fadeIn(0.05)}
      className="bg-bg-cream relative mx-auto h-[calc(100vh-106px)] w-full overflow-hidden"
    >
      {/* Header */}
      <div className="border-border/50 text-text-secondary-65 border-b px-4 py-3 text-sm font-medium">
        Loading Story Tree...
      </div>

      {/* Canvas Skeleton */}
      <div className="relative h-full w-full animate-pulse">
        {/* Fake nodes */}
        <div className="border-border/50 absolute top-[25%] left-[20%] h-20 w-48 rounded-xl border" />
        <div className="border-border/50 absolute top-[40%] left-[45%] h-20 w-52 rounded-xl border" />
        <div className="border-border/50 absolute top-[60%] left-[65%] h-20 w-44 rounded-xl border" />

        {/* Fake edges */}
        <div className="bg-border/50 absolute top-[32%] left-[35%] h-0.5 w-24 rounded" />
        <div className="bg-border/50 absolute top-[50%] left-[55%] h-0.5 w-28 rounded" />
      </div>
    </motion.div>
  );
};

export default StoryTreeLoading;
