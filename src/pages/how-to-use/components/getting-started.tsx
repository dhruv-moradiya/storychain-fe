import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Rocket, ArrowRight } from 'lucide-react';
import type { Step } from '../how-to-use.types';

interface GettingStartedProps {
  steps: Step[];
}

export function GettingStarted({ steps }: GettingStartedProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
  };

  return (
    <section className="px-6 pb-16">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <div className="border-brand-pink-500/20 bg-brand-pink-500/5 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5">
            <Rocket className="text-brand-pink-500 h-4 w-4" />
            <span className="text-brand-pink-500 text-sm font-medium">Quick start guide</span>
          </div>
          <h2 className="font-libreBaskerville text-text-tertiary text-2xl tracking-tight sm:text-3xl">
            Getting Started in 6 Steps
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="border-border/50 bg-cream-95 group hover:border-brand-pink-500/30 relative rounded-2xl border p-6 transition-all hover:shadow-lg"
              >
                {/* Step number */}
                <div className="bg-brand-pink-500 absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white shadow-md">
                  {step.id}
                </div>

                {/* Connecting line for desktop */}
                {index < steps.length - 1 && index % 3 !== 2 && (
                  <div className="absolute top-1/2 -right-2 z-10 hidden -translate-y-1/2 transform lg:block">
                    <ArrowRight className="text-brand-pink-500/30 h-4 w-4" />
                  </div>
                )}

                {/* Icon */}
                <div
                  className={cn(
                    'mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110',
                    step.bgColor
                  )}
                >
                  <Icon className={cn('h-6 w-6', step.color)} />
                </div>

                {/* Content */}
                <h3 className="text-text-primary group-hover:text-brand-pink-500 mb-2 text-lg font-semibold transition-colors">
                  {step.title}
                </h3>
                <p className="text-text-secondary-65 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
