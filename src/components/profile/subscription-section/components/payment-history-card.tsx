import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import {
  Building2,
  CheckCircle,
  Clock,
  CreditCard,
  Download,
  RefreshCw,
  Smartphone,
  Wallet,
  XCircle,
} from 'lucide-react';
import type { PaymentHistory, PaymentMethod, PaymentStatus } from '../subscription.types';

interface PaymentHistoryCardProps {
  payments: PaymentHistory[];
}

const methodIcons: Record<PaymentMethod, typeof CreditCard> = {
  CARD: CreditCard,
  UPI: Smartphone,
  NET_BANKING: Building2,
  WALLET: Wallet,
};

const statusConfig: Record<
  PaymentStatus,
  { icon: typeof CheckCircle; color: string; label: string }
> = {
  SUCCESS: { icon: CheckCircle, color: 'text-green-600', label: 'Success' },
  FAILED: { icon: XCircle, color: 'text-red-600', label: 'Failed' },
  PENDING: { icon: Clock, color: 'text-amber-600', label: 'Pending' },
  REFUNDED: { icon: RefreshCw, color: 'text-blue-600', label: 'Refunded' },
};

function formatAmount(amount: number, currency: 'INR' | 'USD'): string {
  const value = amount / 100;
  if (currency === 'INR') {
    return `₹${new Intl.NumberFormat('en-IN').format(value)}`;
  }
  return `$${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(value)}`;
}

export function PaymentHistoryCard({ payments }: PaymentHistoryCardProps) {
  if (payments.length === 0) {
    return (
      <div className="border-border/50 bg-cream-95 rounded-xl border p-5">
        <h3 className="text-text-primary mb-4 font-semibold">Payment History</h3>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="bg-muted/50 mb-3 rounded-full p-3">
            <CreditCard className="text-text-secondary-65 h-6 w-6" />
          </div>
          <p className="text-text-secondary-65 text-sm">No payment history yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border-border/50 bg-cream-95 rounded-xl border p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-text-primary font-semibold">Payment History</h3>
        <Button variant="ghost" size="sm" className="text-brand-pink-500 text-xs">
          View All
        </Button>
      </div>

      <ScrollArea className="h-[280px]">
        <div className="space-y-3 pr-4">
          {payments.map((payment) => {
            const MethodIcon = methodIcons[payment.method];
            const status = statusConfig[payment.status];
            const StatusIcon = status.icon;

            return (
              <div
                key={payment.id}
                className="border-border/50 flex items-center gap-4 rounded-lg border bg-white/50 p-3 transition-colors hover:bg-white"
              >
                {/* Method Icon */}
                <div className="bg-brand-pink-500/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg">
                  <MethodIcon className="text-brand-pink-500 h-5 w-5" />
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <p className="text-text-primary truncate text-sm font-medium">
                    {payment.description}
                  </p>
                  <p className="text-text-secondary-65 text-xs">
                    {format(payment.date, 'MMM dd, yyyy')} • {payment.method.replace('_', ' ')}
                  </p>
                </div>

                {/* Amount & Status */}
                <div className="flex flex-shrink-0 flex-col items-end gap-1">
                  <span className="text-text-primary text-sm font-semibold">
                    {formatAmount(payment.amount, payment.currency)}
                  </span>
                  <div className={cn('flex items-center gap-1', status.color)}>
                    <StatusIcon className="h-3 w-3" />
                    <span className="text-xs">{status.label}</span>
                  </div>
                </div>

                {/* Invoice Download */}
                {payment.invoiceUrl && payment.status === 'SUCCESS' && (
                  <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                    <Download className="h-4 w-4" />
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
