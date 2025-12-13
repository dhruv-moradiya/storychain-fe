import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/utils';

export default function NotificationsSkeleton() {
  return (
    <motion.div {...fadeIn(0.05)} className="overflow-hidden rounded-xl border shadow-sm">
      <div className="bg-muted/40 border-b p-3 text-sm font-medium">Loading Notifications...</div>

      <div className="divide-y">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex animate-pulse gap-3 p-3">
            <div className="bg-muted h-9 w-9 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="bg-muted h-3 w-3/4 rounded" />
              <div className="bg-muted h-3 w-1/2 rounded" />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
