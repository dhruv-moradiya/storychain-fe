import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import type { Step } from '../how-to-use.types';

interface GettingStartedProps {
  steps: Step[];
}

export function GettingStarted({ steps }: GettingStartedProps) {
  return (
    <section className="px-6 pb-16">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <span className="font-yellowtail text-brand-pink-500 mb-2 block text-lg">
            Quick start guide
          </span>
          <h2 className="font-libreBaskerville text-text-tertiary text-2xl tracking-tight sm:text-3xl">
            Getting Started in 6 Steps
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="border-border/50 bg-cream-95 group hover:border-brand-pink-500/30 relative rounded-2xl border p-6 transition-all hover:shadow-md"
              >
                {/* Step number */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  className="bg-brand-pink-500 absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white shadow-md"
                >
                  {step.id}
                </motion.div>

                {/* Icon */}
                <div
                  className={cn(
                    'mb-4 flex h-12 w-12 items-center justify-center rounded-xl',
                    step.bgColor
                  )}
                >
                  <Icon className={cn('h-6 w-6', step.color)} />
                </div>

                {/* Content */}
                <h3 className="text-text-primary mb-2 text-lg font-semibold">{step.title}</h3>
                <p className="text-text-secondary-65 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
