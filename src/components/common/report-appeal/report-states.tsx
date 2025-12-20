import { motion } from 'motion/react';
import { Flag, AlertCircle, FileQuestion, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

// ============ LOADING STATE ============

export function ReportsLoading({ count = 5 }: { count?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-3"
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
        >
          <ReportCardSkeleton />
        </motion.div>
      ))}
    </motion.div>
  );
}

function ReportCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
}

// ============ ERROR STATE ============

interface ReportsErrorProps {
  message?: string;
  onRetry?: () => void;
}

export function ReportsError({ message = 'Failed to load reports', onRetry }: ReportsErrorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative flex min-h-[400px] flex-col items-center justify-center rounded-xl border bg-gradient-to-br from-background via-red-50/10 to-red-100/20 p-8 dark:from-background dark:via-red-950/10 dark:to-red-900/10"
    >
      {/* Animated glow */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-radial from-red-500/10 via-transparent to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-4"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
      >
        <motion.div
          className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30"
          animate={{ x: [-3, 3, -3] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <AlertCircle className="h-8 w-8 text-red-500" />
        </motion.div>

        <div className="text-center">
          <h3 className="text-lg font-semibold">Something went wrong</h3>
          <p className="mt-1 text-sm text-muted-foreground">{message}</p>
        </div>

        {onRetry && (
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button onClick={onRetry} variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ============ EMPTY STATE ============

interface ReportsEmptyProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function ReportsEmpty({
  title = 'No reports yet',
  description = "When reports are submitted, they'll appear here",
  actionLabel,
  onAction,
}: ReportsEmptyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative flex min-h-[400px] flex-col items-center justify-center rounded-xl border bg-gradient-to-br from-background/80 via-muted/25 to-muted/60 p-8"
    >
      {/* Animated glow */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-radial from-primary/5 via-transparent to-transparent"
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-4"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
      >
        <motion.div
          className="flex h-16 w-16 items-center justify-center rounded-full bg-muted"
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FileQuestion className="h-8 w-8 text-muted-foreground" />
        </motion.div>

        <div className="text-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
        </div>

        {onAction && actionLabel && (
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button onClick={onAction} className="gap-2">
              <Flag className="h-4 w-4" />
              {actionLabel}
            </Button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
