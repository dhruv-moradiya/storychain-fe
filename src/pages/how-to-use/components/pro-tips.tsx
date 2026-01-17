import { cn } from '@/lib/utils';
import { motion, type Variants } from 'framer-motion';
import { Lightbulb, Sparkles } from 'lucide-react';

interface ProTip {
  title: string;
  description: string;
}

interface ProTipsProps {
  tips: ProTip[];
}

export function ProTips({ tips }: ProTipsProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
  };

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="border-brand-orange/30 bg-brand-orange/10 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2"
          >
            <Sparkles className="text-brand-orange h-4 w-4" />
            <span className="text-brand-orange text-sm font-semibold">Expert advice</span>
          </motion.div>
          <h2 className="font-libreBaskerville text-text-primary text-2xl tracking-tight sm:text-3xl md:text-4xl">
            Pro Tips for Success
          </h2>
          <p className="text-text-secondary-65 mx-auto mt-3 max-w-lg text-sm">
            Level up your storytelling with these expert recommendations
          </p>
        </motion.div>

        {/* Tips Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-5 sm:grid-cols-2"
        >
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'group relative overflow-hidden rounded-2xl p-[1px] transition-all duration-300',
                'from-border/60 via-border/30 to-border/60 bg-gradient-to-br',
                'hover:from-brand-orange/50 hover:to-brand-orange/50 hover:via-amber-400/30'
              )}
            >
              {/* Card Inner */}
              <div className="bg-card/95 relative flex h-full gap-4 rounded-[15px] p-5 backdrop-blur-sm">
                {/* Gradient overlay on hover */}
                <div className="from-brand-orange/5 pointer-events-none absolute inset-0 rounded-[15px] bg-gradient-to-br via-transparent to-amber-400/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="from-brand-orange/20 relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br to-amber-400/20 shadow-sm transition-shadow duration-300 group-hover:shadow-md"
                >
                  <Lightbulb className="text-brand-orange h-6 w-6" />
                  {/* Glow effect */}
                  <div className="bg-brand-orange/20 absolute inset-0 rounded-xl opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                </motion.div>

                {/* Content */}
                <div className="relative flex-1">
                  <h3 className="text-text-primary group-hover:text-brand-orange mb-1.5 font-semibold transition-colors duration-300">
                    {tip.title}
                  </h3>
                  <p className="text-text-secondary-65 text-sm leading-relaxed">
                    {tip.description}
                  </p>
                </div>

                {/* Tip number indicator */}
                <div className="text-text-secondary-65/30 absolute top-3 right-4 font-mono text-xs font-bold">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
