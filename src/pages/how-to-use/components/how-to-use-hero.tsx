import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Clock, Users } from 'lucide-react';

export function HowToUseHero() {
  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-12">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 left-1/4 h-72 w-72 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--brand-blue) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-20 right-1/4 h-56 w-56 rounded-full opacity-15 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--brand-pink-500) 0%, transparent 70%)',
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
          className="border-brand-blue/20 bg-brand-blue/5 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2"
        >
          <BookOpen className="text-brand-blue h-4 w-4" />
          <span className="text-brand-blue text-sm font-medium">Learn the basics</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-libreBaskerville text-text-tertiary mb-5 text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl"
        >
          How to Use
          <br />
          <span className="text-brand-blue">StoryChain</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-text-secondary-65 mx-auto mb-8 max-w-2xl text-base leading-relaxed"
        >
          Everything you need to know to create, share, and enjoy interactive stories. From your
          first chapter to building an engaged community.
        </motion.p>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          <div className="text-text-secondary-65 flex items-center gap-2">
            <div className="bg-brand-blue/10 flex h-8 w-8 items-center justify-center rounded-lg">
              <Clock className="text-brand-blue h-4 w-4" />
            </div>
            <span className="text-sm">5 min read</span>
          </div>
          <div className="text-text-secondary-65 flex items-center gap-2">
            <div className="bg-brand-pink-500/10 flex h-8 w-8 items-center justify-center rounded-lg">
              <Sparkles className="text-brand-pink-500 h-4 w-4" />
            </div>
            <span className="text-sm">Beginner friendly</span>
          </div>
          <div className="text-text-secondary-65 flex items-center gap-2">
            <div className="bg-brand-orange/10 flex h-8 w-8 items-center justify-center rounded-lg">
              <Users className="text-brand-orange h-4 w-4" />
            </div>
            <span className="text-sm">10k+ users</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
