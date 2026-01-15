import { motion } from 'framer-motion';
import { Sparkles, Zap, Shield } from 'lucide-react';

export function PricingHero() {
  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-12">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 left-1/4 h-72 w-72 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--brand-pink-500) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-20 right-1/4 h-56 w-56 rounded-full opacity-15 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--brand-blue) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--brand-orange) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="border-brand-pink-500/20 bg-brand-pink-500/5 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2"
        >
          <Sparkles className="text-brand-pink-500 h-4 w-4" />
          <span className="text-brand-pink-500 text-sm font-medium">
            Simple, transparent pricing
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-libreBaskerville text-text-tertiary mb-5 text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl"
        >
          Choose the perfect plan
          <br />
          <span className="text-brand-pink-500">for your stories</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-text-secondary-65 mx-auto mb-8 max-w-2xl text-base leading-relaxed"
        >
          Start free and scale as you grow. All plans include our core features. Upgrade anytime to
          unlock more creative possibilities.
        </motion.p>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          <div className="text-text-secondary-65 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10">
              <Shield className="h-4 w-4 text-green-500" />
            </div>
            <span className="text-sm">Secure payments</span>
          </div>
          <div className="text-text-secondary-65 flex items-center gap-2">
            <div className="bg-brand-blue/10 flex h-8 w-8 items-center justify-center rounded-lg">
              <Zap className="text-brand-blue h-4 w-4" />
            </div>
            <span className="text-sm">Cancel anytime</span>
          </div>
          <div className="text-text-secondary-65 flex items-center gap-2">
            <div className="bg-brand-pink-500/10 flex h-8 w-8 items-center justify-center rounded-lg">
              <Sparkles className="text-brand-pink-500 h-4 w-4" />
            </div>
            <span className="text-sm">24/7 support</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
