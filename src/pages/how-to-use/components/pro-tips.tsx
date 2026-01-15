import { motion } from 'framer-motion';
import { Lightbulb, Star } from 'lucide-react';

interface ProTip {
  title: string;
  description: string;
}

interface ProTipsProps {
  tips: ProTip[];
}

export function ProTips({ tips }: ProTipsProps) {
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
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <div className="border-brand-orange/20 bg-brand-orange/5 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5">
            <Star className="text-brand-orange h-4 w-4" />
            <span className="text-brand-orange text-sm font-medium">Expert advice</span>
          </div>
          <h2 className="font-libreBaskerville text-text-tertiary text-2xl tracking-tight sm:text-3xl">
            Pro Tips for Success
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="border-border/50 bg-cream-95 hover:border-brand-orange/20 rounded-2xl border p-6 transition-all"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="group hover:border-brand-orange/20 flex gap-4 rounded-xl border border-transparent bg-white/50 p-4 transition-all hover:bg-white hover:shadow-sm"
              >
                <div className="bg-brand-orange/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-110">
                  <Lightbulb className="text-brand-orange h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-text-primary group-hover:text-brand-orange mb-1 font-semibold transition-colors">
                    {tip.title}
                  </h3>
                  <p className="text-text-secondary-65 text-sm leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
