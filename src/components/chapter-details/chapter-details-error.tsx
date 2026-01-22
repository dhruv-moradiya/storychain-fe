import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChapterDetailsErrorProps {
  error?: Error | null;
  onRetry?: () => void;
  onBack?: () => void;
}

export function ChapterDetailsError({ error, onRetry, onBack }: ChapterDetailsErrorProps) {
  return (
    <div className="bg-bg-cream flex min-h-screen items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md text-center"
      >
        <div className="bg-destructive/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
          <AlertCircle className="text-destructive h-8 w-8" />
        </div>

        <h1 className="text-text-primary mb-2 text-2xl font-bold">Chapter Not Found</h1>
        <p className="text-text-secondary-65 mb-6">
          {error?.message ||
            "We couldn't find the chapter you're looking for. It may have been deleted or you don't have permission to view it."}
        </p>

        <div className="flex items-center justify-center gap-3">
          {onBack && (
            <Button variant="outline" onClick={onBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          )}
          {onRetry && (
            <Button onClick={onRetry} className="bg-brand-pink-500 hover:bg-brand-pink-600 gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
