import { motion } from 'framer-motion';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeIn } from '@/lib/utils';

const OverviewSectionError = ({ message = 'Failed to load story overview.' }) => {
  return (
    <motion.section
      {...fadeIn(0)}
      className="mx-auto flex max-w-xl flex-col items-center justify-center space-y-6 py-16 text-center"
    >
      {/* Icon */}
      <motion.div
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
      >
        <AlertTriangle size={38} className="text-destructive/80" />
      </motion.div>

      {/* Text */}
      <motion.div {...fadeIn(0.2)} className="space-y-2">
        <h2 className="text-lg font-bold">Something went wrong</h2>
        <p className="text-muted-foreground text-sm">{message}</p>
      </motion.div>

      {/* Action Button */}
      <motion.div {...fadeIn(0.4)}>
        <Button
          variant="outline"
          size="sm"
          className="flex cursor-pointer items-center gap-2"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={14} />
          <span>Go Back</span>
        </Button>
      </motion.div>
    </motion.section>
  );
};

export default OverviewSectionError;
