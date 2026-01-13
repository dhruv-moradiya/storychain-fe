import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export function HowToUseHero() {
  return (
    <section className="relative overflow-hidden px-6 pt-12 pb-8">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 left-1/4 h-64 w-64 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--brand-blue) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-20 right-1/4 h-48 w-48 rounded-full opacity-15 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--brand-pink-500) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-brand-blue/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
        >
          <BookOpen className="text-brand-blue h-8 w-8" />
        </motion.div>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-yellowtail text-brand-blue mb-4 block text-xl"
        >
          Learn the basics
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-libreBaskerville text-text-tertiary mb-4 text-4xl leading-tight tracking-tight sm:text-5xl"
        >
          How to Use
          <br />
          StoryChain
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-text-secondary-65 mx-auto max-w-xl font-mono text-sm leading-relaxed"
        >
          Everything you need to know to create, share, and enjoy interactive stories. From your
          first chapter to building an engaged community.
        </motion.p>
      </div>
    </section>
  );
}
