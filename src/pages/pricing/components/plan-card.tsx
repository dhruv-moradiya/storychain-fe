import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn, scrollReveal } from '@/lib/utils';
import { Check, Sparkles, ArrowRight, IndianRupee, DollarSign } from 'lucide-react';
import { PaymentModal } from './payment-modal';
import type { Plan, BillingInterval, Currency, PaymentState } from '../pricing.types';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';

interface PlanCardProps {
  plan: Plan;
  billingInterval: BillingInterval;
  currency: Currency;
  index?: number;
}

function formatPrice(amountInPaise: number, currency: Currency): string {
  const amount = amountInPaise / 100;
  if (currency === 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function PlanCard({ plan, billingInterval, currency, index = 0 }: PlanCardProps) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentState, setPaymentState] = useState<PaymentState>({ status: 'idle' });

  const getPrice = () => {
    if (currency === 'INR') {
      return billingInterval === 'monthly' ? plan.monthlyPriceINR : plan.yearlyPriceINR;
    }
    return billingInterval === 'monthly' ? plan.monthlyPriceUSD : plan.yearlyPriceUSD;
  };

  const getMonthlyPrice = () => {
    return currency === 'INR' ? plan.monthlyPriceINR : plan.monthlyPriceUSD;
  };

  const price = getPrice();
  const monthlyPrice = getMonthlyPrice();
  const yearlyDiscount =
    billingInterval === 'yearly' && monthlyPrice > 0
      ? Math.round(((monthlyPrice * 12 - price) / (monthlyPrice * 12)) * 100)
      : 0;

  const Icon = plan.icon;
  const CurrencyIcon = currency === 'INR' ? IndianRupee : DollarSign;
  const isFree = plan.id === 'free';

  const handlePurchase = () => {
    if (isFree) {
      navigate('/signup');
      return;
    }

    setIsModalOpen(true);
    setPaymentState({ status: 'processing' });

    // Simulate payment processing (replace with actual Razorpay integration)
    setTimeout(() => {
      // Simulate random success/failure for demo
      const success = Math.random() > 0.3;
      if (success) {
        setPaymentState({
          status: 'success',
          paymentId: `pay_${Math.random().toString(36).substring(7)}`,
          orderId: `order_${Math.random().toString(36).substring(7)}`,
        });
      } else {
        const errors = ['PAYMENT_FAILED', 'CARD_DECLINED', 'NETWORK_ERROR', 'TIMEOUT'];
        setPaymentState({
          status: 'error',
          errorCode: errors[Math.floor(Math.random() * errors.length)],
        });
      }
    }, 3000);
  };

  const handleRetry = () => {
    setPaymentState({ status: 'processing' });
    setTimeout(() => {
      setPaymentState({
        status: 'success',
        paymentId: `pay_${Math.random().toString(36).substring(7)}`,
        orderId: `order_${Math.random().toString(36).substring(7)}`,
      });
    }, 2000);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPaymentState({ status: 'idle' });
  };

  const handleGoToDashboard = () => {
    setIsModalOpen(false);
    navigate('/profile/subscription');
  };

  return (
    <motion.div
      {...scrollReveal.card(index)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'relative flex flex-col rounded-2xl border p-6 transition-all',
        plan.highlighted
          ? 'border-brand-pink-500/50 bg-cream-95 ring-brand-pink-500/20 shadow-lg ring-2'
          : 'border-border/50 bg-cream-95/50 hover:border-brand-pink-500/30 hover:bg-cream-95'
      )}
    >
      {plan.highlighted && (
        <Badge className="bg-brand-pink-500 absolute -top-3 left-1/2 -translate-x-1/2 gap-1 text-white">
          <Sparkles className="h-3 w-3" />
          Most Popular
        </Badge>
      )}

      {/* Plan Header */}
      <div className="mb-6 text-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={cn(
            'mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl',
            plan.bgColor
          )}
        >
          <Icon className={cn('h-7 w-7', plan.color)} />
        </motion.div>
        <h3 className="text-text-primary text-xl font-semibold">{plan.name}</h3>
        <p className="text-text-secondary-65 mt-1 text-sm">{plan.description}</p>
      </div>

      {/* Price */}
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center">
          {!isFree && <CurrencyIcon className="text-text-primary h-6 w-6" />}
          <span className="text-text-primary text-4xl font-bold">
            {isFree ? 'Free' : formatPrice(price, currency)}
          </span>
        </div>
        {!isFree && (
          <span className="text-text-secondary-65 text-sm">
            /{billingInterval === 'monthly' ? 'month' : 'year'}
          </span>
        )}
        {billingInterval === 'yearly' && yearlyDiscount > 0 && (
          <p className="mt-1 text-sm font-medium text-green-600">
            Save {yearlyDiscount}% vs monthly
          </p>
        )}
      </div>

      {/* Features List */}
      <ul className="mb-6 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
            <span className="text-text-secondary-65 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <Button
        onClick={handlePurchase}
        className={cn(
          'w-full',
          plan.highlighted ? 'bg-brand-pink-500 hover:bg-brand-pink-600 text-white' : ''
        )}
        variant={plan.highlighted ? 'default' : 'outline'}
      >
        {isFree ? 'Get Started Free' : `Upgrade to ${plan.name}`}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        paymentState={paymentState}
        plan={plan}
        currency={currency}
        onRetry={handleRetry}
        onGoToDashboard={handleGoToDashboard}
      />
    </motion.div>
  );
}
