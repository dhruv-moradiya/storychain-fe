import { BookOpen, Sparkles, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/utils';

export function HowToUseHero() {
  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-12">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 h-72 w-72 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--brand-blue) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.25, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-20 right-1/4 h-56 w-56 rounded-full opacity-15 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--brand-pink-500) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.2, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--brand-orange) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          {...fadeIn(0.1)}
          className="border-brand-blue/20 bg-brand-blue/5 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2"
        >
          <BookOpen className="text-brand-blue h-4 w-4" />
          <span className="text-brand-blue text-sm font-medium">Learn the basics</span>
        </motion.div>

        <motion.h1
          {...fadeIn(0.2)}
          className="font-libreBaskerville text-text-tertiary mb-5 text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl"
        >
          How to Use
          <br />
          <span className="text-brand-blue">StoryChain</span>
        </motion.h1>

        <motion.p
          {...fadeIn(0.3)}
          className="text-text-secondary-65 mx-auto mb-8 max-w-2xl text-base leading-relaxed"
        >
          Everything you need to know to create, share, and enjoy interactive stories. From your
          first chapter to building an engaged community.
        </motion.p>

        {/* Quick stats */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {[
            { icon: Clock, color: 'text-brand-blue', bg: 'bg-brand-blue/10', text: '5 min read' },
            {
              icon: Sparkles,
              color: 'text-brand-pink-500',
              bg: 'bg-brand-pink-500/10',
              text: 'Beginner friendly',
            },
            {
              icon: Users,
              color: 'text-brand-orange',
              bg: 'bg-brand-orange/10',
              text: '10k+ users',
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.text}
              {...fadeIn(0.4 + index * 0.1)}
              className="text-text-secondary-65 flex items-center gap-2"
            >
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <span className="text-sm">{stat.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
