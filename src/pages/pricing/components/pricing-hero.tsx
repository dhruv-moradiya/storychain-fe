import { motion } from 'framer-motion';

export function PricingHero() {
  return (
    <section className="relative overflow-hidden px-6 pt-12 pb-8">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 left-1/4 h-64 w-64 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--brand-pink-500) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-20 right-1/4 h-48 w-48 rounded-full opacity-15 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--brand-blue) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-yellowtail text-brand-pink-500 mb-4 block text-xl"
        >
          Simple, transparent pricing
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-libreBaskerville text-text-tertiary mb-4 text-4xl leading-tight tracking-tight sm:text-5xl"
        >
          Choose the perfect plan
          <br />
          for your stories
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-text-secondary-65 mx-auto max-w-xl font-mono text-sm leading-relaxed"
        >
          Start free and scale as you grow. All plans include our core features. Upgrade anytime to
          unlock more creative possibilities.
        </motion.p>
      </div>
    </section>
  );
}
