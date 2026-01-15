import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import {
  Crown,
  Zap,
  BookOpen,
  ArrowRight,
  Calendar,
  RefreshCw,
  Pause,
  Play,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router';
import type { UserSubscription, PlanType } from '../subscription.types';
import { planDetails } from '../subscription.data';

interface CurrentPlanCardProps {
  subscription: UserSubscription | null;
}

const planIcons: Record<PlanType, typeof Crown> = {
  FREE: BookOpen,
  PRO: Zap,
  PREMIUM: Crown,
};

export function CurrentPlanCard({ subscription }: CurrentPlanCardProps) {
  const planType = subscription?.planType || 'FREE';
  const plan = planDetails[planType];
  const Icon = planIcons[planType];
  const isFreePlan = planType === 'FREE';

  const statusColors = {
    ACTIVE: 'bg-green-500/10 text-green-600 border-green-500/20',
    PAUSED: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    CANCELLED: 'bg-red-500/10 text-red-600 border-red-500/20',
    EXPIRED: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group border-border/50 bg-cream-95 hover:border-brand-pink-500/30 relative overflow-hidden rounded-xl border p-5 transition-all duration-300 hover:shadow-md"
    >
      {/* Subtle gradient background on hover */}
      <div className="from-brand-pink-500/0 to-brand-blue/0 pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-5" />

      <div className="relative">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-xl transition-transform',
                plan.bgColor
              )}
            >
              <Icon className={cn('h-6 w-6', plan.color)} />
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-text-primary text-lg font-semibold">{plan.name} Plan</h3>
                {subscription && (
                  <Badge className={cn('border text-xs', statusColors[subscription.status])}>
                    {subscription.status}
                  </Badge>
                )}
              </div>
              <p className="text-text-secondary-65 text-sm">
                {isFreePlan
                  ? 'Basic access to StoryChain'
                  : `Billed ${subscription?.billingCycle.toLowerCase()}`}
              </p>
            </div>
          </div>
          {!isFreePlan && (
            <div className="text-brand-pink-500 flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-medium">Active</span>
            </div>
          )}
        </div>

        {/* Plan Features */}
        <div className="mb-4 flex flex-wrap gap-2">
          {plan.features.slice(0, 4).map((feature, index) => (
            <motion.span
              key={feature}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="border-border/50 text-text-secondary-65 bg-cream-90/50 hover:border-brand-pink-500/20 hover:bg-cream-90 rounded-full border px-2.5 py-1 text-xs transition-all"
            >
              {feature}
            </motion.span>
          ))}
          {plan.features.length > 4 && (
            <span className="text-text-secondary-65 px-2.5 py-1 text-xs">
              +{plan.features.length - 4} more
            </span>
          )}
        </div>

        {/* Subscription Details */}
        {subscription && !isFreePlan && (
          <div className="border-border/30 mb-4 space-y-2 border-t pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary-65 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Next billing date
              </span>
              <span className="text-text-primary font-medium">
                {format(subscription.endDate, 'MMM dd, yyyy')}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary-65 flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Auto-renewal
              </span>
              <span
                className={cn(
                  'font-medium',
                  subscription.autoRenew ? 'text-green-600' : 'text-amber-600'
                )}
              >
                {subscription.autoRenew ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {isFreePlan ? (
            <Button asChild className="bg-brand-pink-500 hover:bg-brand-pink-600 gap-2 text-white">
              <Link to="/pricing">
                Upgrade Plan
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <>
              <Button
                asChild
                variant="outline"
                className="border-border/50 hover:border-brand-pink-500/30 gap-2"
              >
                <Link to="/pricing">
                  Change Plan
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              {subscription?.status === 'ACTIVE' ? (
                <Button
                  variant="outline"
                  className="border-border/50 gap-2 text-amber-600 hover:border-amber-500/30 hover:bg-amber-500/5 hover:text-amber-700"
                >
                  <Pause className="h-4 w-4" />
                  Pause Subscription
                </Button>
              ) : subscription?.status === 'PAUSED' ? (
                <Button
                  variant="outline"
                  className="border-border/50 gap-2 text-green-600 hover:border-green-500/30 hover:bg-green-500/5 hover:text-green-700"
                >
                  <Play className="h-4 w-4" />
                  Resume Subscription
                </Button>
              ) : null}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
