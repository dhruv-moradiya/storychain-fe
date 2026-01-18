import { motion } from 'framer-motion';
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
  Receipt,
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
  { icon: typeof CheckCircle; color: string; bgColor: string; label: string }
> = {
  SUCCESS: {
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-500/10',
    label: 'Success',
  },
  FAILED: { icon: XCircle, color: 'text-red-600', bgColor: 'bg-red-500/10', label: 'Failed' },
  PENDING: { icon: Clock, color: 'text-amber-600', bgColor: 'bg-amber-500/10', label: 'Pending' },
  REFUNDED: {
    icon: RefreshCw,
    color: 'text-blue-600',
    bgColor: 'bg-blue-500/10',
    label: 'Refunded',
  },
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
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="border-border/50 bg-cream-95 hover:border-brand-pink-500/30 rounded-xl border p-5 transition-all duration-300 hover:shadow-md"
      >
        <h3 className="text-text-primary mb-4 font-semibold">Payment History</h3>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="bg-muted/50 mb-3 rounded-full p-4">
            <Receipt className="text-text-secondary-65 h-6 w-6" />
          </div>
          <p className="text-text-primary mb-1 font-medium">No payment history yet</p>
          <p className="text-text-secondary-65 text-sm">
            Your payment records will appear here once you upgrade
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="border-border/50 bg-cream-95 hover:border-brand-pink-500/30 rounded-xl border p-5 transition-all duration-300 hover:shadow-md"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-text-primary font-semibold">Payment History</h3>
          <span className="bg-brand-pink-500/10 text-brand-pink-500 rounded-full px-2 py-0.5 text-xs font-medium">
            {payments.length}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-brand-pink-500 hover:bg-brand-pink-500/10 text-xs"
        >
          View All
        </Button>
      </div>

      <ScrollArea className="h-[280px]">
        <div className="space-y-2 pr-4">
          {payments.map((payment, index) => {
            const MethodIcon = methodIcons[payment.method];
            const status = statusConfig[payment.status];
            const StatusIcon = status.icon;

            return (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group border-border/50 bg-cream-90/50 hover:border-brand-pink-500/20 hover:bg-cream-90 flex items-center gap-3 rounded-lg border p-3 transition-all duration-200 hover:shadow-sm"
              >
                {/* Method Icon */}
                <div className="bg-brand-pink-500/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-105">
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
                  <div
                    className={cn(
                      'flex items-center gap-1 rounded-full px-1.5 py-0.5',
                      status.bgColor
                    )}
                  >
                    <StatusIcon className={cn('h-3 w-3', status.color)} />
                    <span className={cn('text-[10px] font-medium', status.color)}>
                      {status.label}
                    </span>
                  </div>
                </div>

                {/* Invoice Download */}
                {payment.invoiceUrl && payment.status === 'SUCCESS' && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                )}
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>
    </motion.div>
  );
}
