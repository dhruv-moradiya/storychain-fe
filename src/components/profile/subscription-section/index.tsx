import { CreditCard } from 'lucide-react';
import { CurrentPlanCard } from './components/current-plan-card';
import { UsageStatsCard } from './components/usage-stats-card';
import { PaymentHistoryCard } from './components/payment-history-card';
import { mockSubscription, mockPaymentHistory, mockUsageStats } from './subscription.data';

export function SubscriptionSection() {
  // In real app, fetch these from API
  const subscription = mockSubscription;
  const payments = mockPaymentHistory;
  const usage = mockUsageStats;

  return (
    <section className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="from-brand-pink-500/20 to-brand-orange/20 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br">
          <CreditCard className="text-brand-pink-500 h-5 w-5" />
        </div>
        <div>
          <h2 className="text-text-primary text-lg font-semibold">Subscription & Billing</h2>
          <p className="text-text-secondary-65 text-sm">Manage your plan and payment methods</p>
        </div>
      </div>

      {/* Current Plan */}
      <CurrentPlanCard subscription={subscription} />

      {/* Usage Stats */}
      <UsageStatsCard stats={usage} />

      {/* Payment History */}
      <PaymentHistoryCard payments={payments} />
    </section>
  );
}

export default SubscriptionSection;
