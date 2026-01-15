import { motion } from 'framer-motion';
import {
  Shield,
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  CalendarClock,
  Lock,
} from 'lucide-react';

const paymentMethods = [
  { name: 'UPI', icon: Smartphone, color: 'text-green-500', bg: 'bg-green-500/10' },
  { name: 'Cards', icon: CreditCard, color: 'text-brand-blue', bg: 'bg-brand-blue/10' },
  { name: 'Net Banking', icon: Building2, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { name: 'Wallets', icon: Wallet, color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
  { name: 'EMI', icon: CalendarClock, color: 'text-brand-pink-500', bg: 'bg-brand-pink-500/10' },
];

export function PaymentMethods() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <section className="px-6 pb-16">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="border-border/50 from-cream-95 to-cream-90 relative overflow-hidden rounded-2xl border bg-gradient-to-br p-8"
        >
          {/* Background pattern */}
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <div className="bg-brand-pink-500/10 absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl" />
            <div className="bg-brand-blue/10 absolute -bottom-10 -left-10 h-40 w-40 rounded-full blur-3xl" />
          </div>

          <div className="relative">
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="bg-brand-pink-500/10 flex h-12 w-12 items-center justify-center rounded-xl">
                <Shield className="text-brand-pink-500 h-6 w-6" />
              </div>
              <div className="text-left">
                <h3 className="text-text-primary text-lg font-semibold">
                  Secure payments powered by Razorpay
                </h3>
                <p className="text-text-secondary-65 text-sm">
                  Your payment information is always safe and encrypted
                </p>
              </div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <motion.div
                    key={method.name}
                    variants={itemVariants}
                    className="border-border/50 hover:border-brand-pink-500/30 flex items-center gap-2 rounded-full border bg-white/50 px-3 py-1 transition-all hover:shadow-sm"
                  >
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full ${method.bg}`}
                    >
                      <Icon className={`h-3 w-3 ${method.color}`} />
                    </div>
                    <span className="text-text-primary text-sm font-medium">{method.name}</span>
                  </motion.div>
                );
              })}
            </motion.div>

            <div className="text-text-secondary-65 mt-6 flex items-center justify-center gap-2">
              <Lock className="h-4 w-4" />
              <span className="text-xs">256-bit SSL encryption for all transactions</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
