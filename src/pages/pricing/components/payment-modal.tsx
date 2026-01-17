import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, XCircle, RefreshCw, CreditCard, Shield, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { PaymentState, Plan, Currency } from '../pricing.types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentState: PaymentState;
  plan: Plan | null;
  currency: Currency;
  onRetry: () => void;
  onGoToDashboard: () => void;
}

export function PaymentModal({
  isOpen,
  onClose,
  paymentState,
  plan,
  // currency,
  onRetry,
  onGoToDashboard,
}: PaymentModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === e.currentTarget && paymentState.status !== 'processing') {
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="border-border/50 bg-cream-95 relative mx-4 w-full max-w-md rounded-2xl border p-8 shadow-xl"
        >
          {/* Close button - hidden during processing */}
          {paymentState.status !== 'processing' && (
            <button
              onClick={onClose}
              className="text-text-secondary-65 hover:bg-cream-90 hover:text-text-primary absolute top-4 right-4 rounded-full p-1 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}

          {/* Processing State */}
          {paymentState.status === 'processing' && <ProcessingContent plan={plan} />}

          {/* Success State */}
          {paymentState.status === 'success' && (
            <SuccessContent
              plan={plan}
              paymentId={paymentState.paymentId}
              onGoToDashboard={onGoToDashboard}
            />
          )}

          {/* Error State */}
          {paymentState.status === 'error' && (
            <ErrorContent
              errorMessage={paymentState.errorMessage}
              errorCode={paymentState.errorCode}
              onRetry={onRetry}
              onClose={onClose}
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ProcessingContent({ plan }: { plan: Plan | null }) {
  return (
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className="bg-brand-pink-500/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
      >
        <Loader2 className="text-brand-pink-500 h-10 w-10" />
      </motion.div>

      <h3 className="text-text-primary mb-2 text-xl font-semibold">Processing Payment</h3>
      <p className="text-text-secondary-65 mb-6">
        Please wait while we process your payment for {plan?.name || 'the plan'}...
      </p>

      {/* Animated steps */}
      <div className="space-y-3 text-left">
        <ProcessingStep label="Connecting to payment gateway" status="complete" />
        <ProcessingStep label="Verifying payment details" status="active" />
        <ProcessingStep label="Confirming subscription" status="pending" />
      </div>

      <div className="text-text-secondary-65 mt-6 flex items-center justify-center gap-2 text-sm">
        <Shield className="h-4 w-4" />
        <span>Secured by Razorpay</span>
      </div>
    </div>
  );
}

function ProcessingStep({
  label,
  status,
}: {
  label: string;
  status: 'pending' | 'active' | 'complete';
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        'flex items-center gap-3 rounded-lg px-4 py-2',
        status === 'active' && 'bg-brand-pink-500/5',
        status === 'complete' && 'opacity-60'
      )}
    >
      {status === 'complete' && <CheckCircle2 className="h-5 w-5 text-green-500" />}
      {status === 'active' && (
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
          <Loader2 className="text-brand-pink-500 h-5 w-5 animate-spin" />
        </motion.div>
      )}
      {status === 'pending' && <div className="border-border/50 h-5 w-5 rounded-full border-2" />}
      <span
        className={cn(
          'text-sm',
          status === 'active' ? 'text-text-primary font-medium' : 'text-text-secondary-65'
        )}
      >
        {label}
      </span>
    </motion.div>
  );
}

function SuccessContent({
  plan,
  paymentId,
  onGoToDashboard,
}: {
  plan: Plan | null;
  paymentId?: string;
  onGoToDashboard: () => void;
}) {
  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10"
      >
        <CheckCircle2 className="h-10 w-10 text-green-500" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-text-primary mb-2 text-xl font-semibold">Payment Successful!</h3>
        <p className="text-text-secondary-65 mb-4">
          Welcome to {plan?.name || 'your new plan'}! Your subscription is now active.
        </p>

        {paymentId && (
          <div className="bg-cream-90 mb-6 rounded-lg px-4 py-3">
            <p className="text-text-secondary-65 text-xs">Payment ID</p>
            <p className="text-text-primary font-mono text-sm">{paymentId}</p>
          </div>
        )}

        <div className="space-y-3">
          <Button
            onClick={onGoToDashboard}
            className="bg-brand-pink-500 hover:bg-brand-pink-600 w-full text-white"
          >
            Go to Dashboard
          </Button>
          <p className="text-text-secondary-65 text-xs">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function ErrorContent({
  errorMessage,
  errorCode,
  onRetry,
  onClose,
}: {
  errorMessage?: string;
  errorCode?: string;
  onRetry: () => void;
  onClose: () => void;
}) {
  const getErrorDetails = () => {
    const errorMap: Record<string, { title: string; message: string; canRetry: boolean }> = {
      PAYMENT_FAILED: {
        title: 'Payment Failed',
        message:
          'Your payment could not be processed. Please try again or use a different payment method.',
        canRetry: true,
      },
      CARD_DECLINED: {
        title: 'Card Declined',
        message: 'Your card was declined. Please check your card details or try a different card.',
        canRetry: true,
      },
      INSUFFICIENT_FUNDS: {
        title: 'Insufficient Funds',
        message: 'Your account has insufficient funds. Please try a different payment method.',
        canRetry: true,
      },
      NETWORK_ERROR: {
        title: 'Connection Error',
        message:
          'Unable to connect to the payment gateway. Please check your internet connection and try again.',
        canRetry: true,
      },
      TIMEOUT: {
        title: 'Request Timeout',
        message: 'The payment request timed out. Please try again.',
        canRetry: true,
      },
      BANK_DECLINED: {
        title: 'Bank Declined',
        message:
          'Your bank declined this transaction. Please contact your bank or try a different payment method.',
        canRetry: true,
      },
      VERIFICATION_FAILED: {
        title: 'Verification Failed',
        message:
          'Payment verification failed. If amount was deducted, it will be refunded within 5-7 business days.',
        canRetry: false,
      },
    };

    return (
      errorMap[errorCode || ''] || {
        title: 'Something Went Wrong',
        message: errorMessage || 'An unexpected error occurred. Please try again later.',
        canRetry: true,
      }
    );
  };

  const error = getErrorDetails();

  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10"
      >
        <XCircle className="h-10 w-10 text-red-500" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-text-primary mb-2 text-xl font-semibold">{error.title}</h3>
        <p className="text-text-secondary-65 mb-4">{error.message}</p>

        {errorCode && (
          <div className="mb-6 rounded-lg bg-red-500/5 px-4 py-3">
            <p className="text-text-secondary-65 text-xs">Error Code</p>
            <p className="font-mono text-sm text-red-600">{errorCode}</p>
          </div>
        )}

        <div className="space-y-3">
          {error.canRetry && (
            <Button
              onClick={onRetry}
              className="bg-brand-pink-500 hover:bg-brand-pink-600 w-full text-white"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}
          <Button variant="outline" onClick={onClose} className="w-full">
            <CreditCard className="mr-2 h-4 w-4" />
            Try Different Method
          </Button>
        </div>

        <p className="text-text-secondary-65 mt-4 text-xs">
          Need help?{' '}
          <a href="/support" className="text-brand-pink-500 hover:underline">
            Contact Support
          </a>
        </p>
      </motion.div>
    </div>
  );
}
