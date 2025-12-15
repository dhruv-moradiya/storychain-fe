import { motion } from 'motion/react';
import { Scale, AlertCircle, Inbox, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

// ============ LOADING STATE ============

export function AppealsLoading({ count = 5 }: { count?: number }) {
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
          <AppealCardSkeleton />
        </motion.div>
      ))}
    </motion.div>
  );
}

function AppealCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
      <div className="flex items-center gap-2 pt-2">
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>
    </div>
  );
}

// ============ ERROR STATE ============

interface AppealsErrorProps {
  message?: string;
  onRetry?: () => void;
}

export function AppealsError({ message = 'Failed to load appeals', onRetry }: AppealsErrorProps) {
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

interface AppealsEmptyProps {
  title?: string;
  description?: string;
  isUserView?: boolean;
}

export function AppealsEmpty({
  title = 'No appeals found',
  description = "You haven't submitted any appeals yet",
  isUserView = true,
}: AppealsEmptyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative flex min-h-[400px] flex-col items-center justify-center rounded-xl border bg-gradient-to-br from-background/80 via-purple-50/10 to-purple-100/20 p-8 dark:from-background dark:via-purple-950/10 dark:to-purple-900/10"
    >
      {/* Animated glow */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-radial from-purple-500/5 via-transparent to-transparent"
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-4"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
      >
        <motion.div
          className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30"
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {isUserView ? (
            <Scale className="h-8 w-8 text-purple-500" />
          ) : (
            <Inbox className="h-8 w-8 text-purple-500" />
          )}
        </motion.div>

        <div className="text-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
        </div>

        {isUserView && (
          <p className="text-xs text-muted-foreground">
            Appeals can only be submitted when you receive a ban or restriction
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
