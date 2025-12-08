import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/utils';

export default function CollaboratorsSkeleton() {
  return (
    <motion.div {...fadeIn(0.05)} className="overflow-hidden rounded-xl border shadow-sm">
      <div className="bg-muted/40 border-b p-3 text-sm font-medium">Loading Collaborators...</div>

      <div className="divide-y">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex animate-pulse items-center justify-between p-3">
            <div className="flex items-center gap-3">
              <div className="bg-muted h-8 w-8 rounded-full" />
              <div className="space-y-2">
                <div className="bg-muted h-3 w-32 rounded" />
                <div className="bg-muted h-3 w-20 rounded" />
              </div>
            </div>

            <div className="bg-muted h-5 w-16 rounded" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
