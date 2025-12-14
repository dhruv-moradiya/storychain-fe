import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/utils';

const StoryTreeLoading = () => {
  return (
    <motion.div
      {...fadeIn(0.05)}
      className="relative mx-auto h-[calc(100vh-106px)] w-full overflow-hidden rounded-2xl border shadow-sm"
    >
      {/* Header */}
      <div className="bg-muted/40 border-b px-4 py-3 text-sm font-medium">
        Loading Story Tree...
      </div>

      {/* Canvas Skeleton */}
      <div className="relative h-full w-full animate-pulse">
        {/* Grid background feel */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)]" />

        {/* Fake nodes */}
        <div className="bg-muted absolute top-[25%] left-[20%] h-20 w-48 rounded-xl" />
        <div className="bg-muted absolute top-[40%] left-[45%] h-20 w-52 rounded-xl" />
        <div className="bg-muted absolute top-[60%] left-[65%] h-20 w-44 rounded-xl" />

        {/* Fake edges */}
        <div className="bg-muted absolute top-[32%] left-[35%] h-1 w-24 rounded" />
        <div className="bg-muted absolute top-[50%] left-[55%] h-1 w-28 rounded" />
      </div>
    </motion.div>
  );
};

export default StoryTreeLoading;
