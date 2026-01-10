import { motion } from 'motion/react';
import { GitPullRequest, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

// ==================== LOADING STATE ====================

interface PRListLoadingProps {
  count?: number;
}

export function PRListLoading({ count = 5 }: PRListLoadingProps) {
  return (
    <div className="bg-card overflow-hidden rounded-xl border">
      {/* Header Skeleton */}
      <div className="bg-muted/50 flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-4">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-20" />
        </div>
      </div>

      {/* Items Skeleton */}
      <div className="divide-y">
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="flex items-start gap-3 px-4 py-3">
            <Skeleton className="h-5 w-5 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-4 w-72" />
              <Skeleton className="h-4 w-full max-w-md" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
            <div className="flex -space-x-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== EMPTY STATE ====================

interface PRListEmptyProps {
  title?: string;
  description?: string;
}

export function PRListEmpty({
  title = 'No submit requests yet',
  description = 'Submit requests will appear here when contributors propose changes',
}: PRListEmptyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card flex flex-col items-center justify-center rounded-xl border px-4 py-16 text-center"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className="bg-muted mb-4 flex h-16 w-16 items-center justify-center rounded-full"
      >
        <GitPullRequest className="text-muted-foreground h-8 w-8" />
      </motion.div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground max-w-md text-sm">{description}</p>
    </motion.div>
  );
}

// ==================== ERROR STATE ====================

interface PRListErrorProps {
  message?: string;
  onRetry?: () => void;
}

export function PRListError({
  message = 'Failed to load submit requests',
  onRetry,
}: PRListErrorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card flex flex-col items-center justify-center rounded-xl border px-4 py-16 text-center"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30"
      >
        <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
      </motion.div>
      <h3 className="mb-2 text-lg font-semibold">Something went wrong</h3>
      <p className="text-muted-foreground mb-4 max-w-md text-sm">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </motion.div>
  );
}

// ==================== CARD SKELETON ====================

export function PRCardSkeleton() {
  return (
    <div className="flex items-start gap-3 px-4 py-3">
      <Skeleton className="h-5 w-5 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="h-4 w-72" />
        <Skeleton className="h-4 w-full max-w-md" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}
