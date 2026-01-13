import { Shield } from 'lucide-react';

const paymentMethods = ['UPI', 'Cards', 'Net Banking', 'Wallets', 'EMI'];

export function PaymentMethods() {
  return (
    <section className="px-6 pb-16">
      <div className="mx-auto max-w-4xl text-center">
        <div className="border-border/50 bg-cream-95 rounded-2xl border p-6">
          <Shield className="text-brand-pink-500 mx-auto mb-3 h-8 w-8" />
          <h3 className="text-text-primary mb-2 text-lg font-semibold">
            Secure payments powered by Razorpay
          </h3>
          <p className="text-text-secondary-65 mb-4 text-sm">
            Your payment information is always safe and encrypted
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="border-border/50 text-text-secondary-65 rounded-full border bg-white/50 px-3 py-1 text-xs"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
