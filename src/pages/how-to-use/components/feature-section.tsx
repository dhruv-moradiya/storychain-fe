import { cn, scrollReveal } from '@/lib/utils';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Section } from '../how-to-use.types';

interface FeatureSectionProps {
  section: Section;
  index: number;
}

export function FeatureSection({ section, index }: FeatureSectionProps) {
  const isEven = index % 2 === 0;

  return (
    <section className={cn('px-6 py-12', isEven ? 'bg-bg-cream' : 'bg-cream-95')}>
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <motion.span
            {...scrollReveal.paragraph}
            className={cn(
              'font-yellowtail mb-2 block text-lg',
              isEven ? 'text-brand-blue' : 'text-brand-pink-500'
            )}
          >
            {section.subtitle}
          </motion.span>
          <motion.h2
            {...scrollReveal.heading}
            className="font-libreBaskerville text-text-tertiary text-2xl tracking-tight sm:text-3xl"
          >
            {section.title}
          </motion.h2>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {section.items.map((item, itemIndex) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                {...scrollReveal.card(itemIndex)}
                whileHover={{ y: -4 }}
                className={cn(
                  'group rounded-2xl border p-6 transition-all hover:shadow-md',
                  isEven
                    ? 'border-border/50 bg-cream-95 hover:border-brand-blue/30'
                    : 'border-border/50 hover:border-brand-pink-500/30 bg-white/50'
                )}
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={cn(
                    'mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform',
                    isEven ? 'bg-brand-blue/10' : 'bg-brand-pink-500/10'
                  )}
                >
                  <Icon
                    className={cn('h-6 w-6', isEven ? 'text-brand-blue' : 'text-brand-pink-500')}
                  />
                </motion.div>

                {/* Content */}
                <h3 className="text-text-primary mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="text-text-secondary-65 mb-4 text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Tips */}
                <div className="space-y-2">
                  <p className="text-text-primary text-xs font-medium tracking-wide uppercase">
                    Tips
                  </p>
                  <ul className="space-y-1.5">
                    {item.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check
                          className={cn(
                            'mt-0.5 h-3 w-3 flex-shrink-0',
                            isEven ? 'text-brand-blue' : 'text-brand-pink-500'
                          )}
                        />
                        <span className="text-text-secondary-65 text-xs">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
