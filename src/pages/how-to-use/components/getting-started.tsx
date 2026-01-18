import { cn, scrollReveal } from '@/lib/utils';
import { Rocket, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Step } from '../how-to-use.types';

interface GettingStartedProps {
  steps: Step[];
}

export function GettingStarted({ steps }: GettingStartedProps) {
  return (
    <section className="px-6 pb-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <motion.div
            {...scrollReveal.paragraph}
            className="border-brand-pink-500/20 bg-brand-pink-500/5 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
          >
            <Rocket className="text-brand-pink-500 h-4 w-4" />
            <span className="text-brand-pink-500 text-sm font-medium">Quick start guide</span>
          </motion.div>
          <motion.h2
            {...scrollReveal.heading}
            className="font-libreBaskerville text-text-tertiary text-2xl tracking-tight sm:text-3xl"
          >
            Getting Started in 6 Steps
          </motion.h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                {...scrollReveal.card(index)}
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
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={cn(
                    'mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform',
                    step.bgColor
                  )}
                >
                  <Icon className={cn('h-6 w-6', step.color)} />
                </motion.div>

                {/* Content */}
                <h3 className="text-text-primary group-hover:text-brand-pink-500 mb-2 text-lg font-semibold transition-colors">
                  {step.title}
                </h3>
                <p className="text-text-secondary-65 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
