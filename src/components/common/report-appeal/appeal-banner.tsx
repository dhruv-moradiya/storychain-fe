import { useState } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, Scale, X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AppealDialog } from './appeal-dialog';
import { type CreateAppealData } from '@/type/appeal.type';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface AppealBannerProps {
  banHistoryId: string;
  banReason?: string;
  banType?: 'TEMPORARY' | 'PERMANENT' | 'CONTENT_REMOVAL' | 'FEATURE_RESTRICTION';
  banExpiresAt?: string;
  canAppeal?: boolean;
  hasExistingAppeal?: boolean;
  existingAppealStatus?: string;
  onAppealSubmit?: (data: CreateAppealData) => Promise<void>;
  onDismiss?: () => void;
  className?: string;
}

export function AppealBanner({
  banHistoryId,
  banReason,
  banType = 'TEMPORARY',
  banExpiresAt,
  canAppeal = true,
  hasExistingAppeal = false,
  existingAppealStatus,
  onAppealSubmit,
  onDismiss,
  className,
}: AppealBannerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const handleSubmit = async (data: CreateAppealData) => {
    setIsLoading(true);
    try {
      if (onAppealSubmit) {
        await onAppealSubmit(data);
      } else {
        // TODO: Replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      toast.success('We will review your appeal and get back to you soon.');
    } catch (error) {
      toast.error('Failed to submit appeal. Please try again later.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  const getBanTypeLabel = () => {
    switch (banType) {
      case 'PERMANENT':
        return 'Permanently Banned';
      case 'CONTENT_REMOVAL':
        return 'Content Removed';
      case 'FEATURE_RESTRICTION':
        return 'Feature Restricted';
      default:
        return 'Temporarily Banned';
    }
  };

  const getTimeRemaining = () => {
    if (!banExpiresAt) return null;
    const now = new Date();
    const expires = new Date(banExpiresAt);
    const diff = expires.getTime() - now.getTime();

    if (diff <= 0) return 'Expired';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} remaining`;
    return `${hours} hour${hours > 1 ? 's' : ''} remaining`;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'relative overflow-hidden rounded-xl border-2',
          banType === 'PERMANENT'
            ? 'border-red-300 bg-red-50 dark:border-red-900 dark:bg-red-950/50'
            : 'border-amber-300 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/50',
          className
        )}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,currentColor_10px,currentColor_11px)]" />
        </div>

        <div className="relative p-5 sm:p-6">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div
              className={cn(
                'flex h-12 w-12 shrink-0 items-center justify-center rounded-full',
                banType === 'PERMANENT'
                  ? 'bg-red-100 dark:bg-red-900/50'
                  : 'bg-amber-100 dark:bg-amber-900/50'
              )}
            >
              <AlertTriangle
                className={cn(
                  'h-6 w-6',
                  banType === 'PERMANENT'
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-amber-600 dark:text-amber-400'
                )}
              />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h3
                  className={cn(
                    'text-lg font-semibold',
                    banType === 'PERMANENT'
                      ? 'text-red-900 dark:text-red-100'
                      : 'text-amber-900 dark:text-amber-100'
                  )}
                >
                  Account Restricted
                </h3>
                <Badge
                  variant="secondary"
                  className={cn(
                    banType === 'PERMANENT'
                      ? 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : 'bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                  )}
                >
                  {getBanTypeLabel()}
                </Badge>
              </div>

              {banReason && (
                <p
                  className={cn(
                    'mt-2 text-sm',
                    banType === 'PERMANENT'
                      ? 'text-red-700 dark:text-red-300'
                      : 'text-amber-700 dark:text-amber-300'
                  )}
                >
                  <span className="font-medium">Reason:</span> {banReason}
                </p>
              )}

              {banExpiresAt && banType !== 'PERMANENT' && (
                <div className="mt-2 flex items-center gap-2">
                  <Clock
                    className={cn(
                      'h-4 w-4',
                      banType === 'PERMANENT' ? 'text-red-500' : 'text-amber-500'
                    )}
                  />
                  <span
                    className={cn(
                      'text-sm font-medium',
                      banType === 'PERMANENT'
                        ? 'text-red-700 dark:text-red-300'
                        : 'text-amber-700 dark:text-amber-300'
                    )}
                  >
                    {getTimeRemaining()}
                  </span>
                </div>
              )}

              {/* Appeal status or button */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {hasExistingAppeal ? (
                  <div className="flex items-center gap-2">
                    <Scale className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                      Appeal {existingAppealStatus?.toLowerCase() || 'submitted'}
                    </span>
                  </div>
                ) : canAppeal ? (
                  <Button
                    onClick={() => setIsOpen(true)}
                    variant="secondary"
                    className={cn(
                      'gap-2',
                      banType === 'PERMANENT'
                        ? 'bg-red-200 text-red-900 hover:bg-red-300 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-800'
                        : 'bg-amber-200 text-amber-900 hover:bg-amber-300 dark:bg-amber-900 dark:text-amber-100 dark:hover:bg-amber-800'
                    )}
                  >
                    <Scale className="h-4 w-4" />
                    Submit Appeal
                  </Button>
                ) : (
                  <span className="text-muted-foreground text-sm">
                    Appeals are not available for this restriction
                  </span>
                )}
              </div>
            </div>

            {/* Dismiss button */}
            {onDismiss && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={handleDismiss}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      <AppealDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        onSubmit={handleSubmit}
        banHistoryId={banHistoryId}
        banReason={banReason}
        banType={banType}
        banExpiresAt={banExpiresAt}
        isLoading={isLoading}
      />
    </>
  );
}
