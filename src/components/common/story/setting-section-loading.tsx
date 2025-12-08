import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/utils';

const SettingSectionLoading = () => {
  return (
    <motion.section {...fadeIn(0)} className="mx-auto max-w-xl space-y-8 pb-14">
      {/* Title Skeleton */}
      <div className="bg-muted/50 h-6 w-40 animate-pulse rounded-md" />

      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <SettingRowSkeleton key={i} />
        ))}

        {/* Static fields skeleton (genre, content rating) */}
        <SettingRowSkeleton />
        <SettingRowSkeleton />
      </div>
    </motion.section>
  );
};

const SettingRowSkeleton = () => (
  <motion.div
    {...fadeIn(0.05)}
    className="bg-muted/40 flex items-center justify-between rounded-md border px-3 py-3"
  >
    {/* Left label */}
    <div className="flex items-center gap-3">
      {/* Icon placeholder */}
      <div className="bg-muted h-4 w-4 animate-pulse rounded" />

      {/* Label */}
      <div className="bg-muted/60 h-4 w-28 animate-pulse rounded" />

      {/* Value */}
      <div className="bg-muted/40 h-3 w-16 animate-pulse rounded" />
    </div>

    {/* Switch placeholder */}
    <div className="bg-muted h-5 w-10 animate-pulse rounded-full" />
  </motion.div>
);

export default SettingSectionLoading;
