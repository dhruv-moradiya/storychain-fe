import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { scrollReveal } from '@/lib/utils';

export function CTASection() {
  return (
    <section className="bg-cream-95 px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <motion.div
          {...scrollReveal.card(0)}
          className="border-border/50 from-brand-pink-500/5 to-brand-blue/5 relative overflow-hidden rounded-2xl border bg-gradient-to-br via-white/50 p-8 text-center"
        >
          {/* Background decorations */}
          <div className="pointer-events-none absolute inset-0">
            <motion.div
              className="bg-brand-pink-500/10 absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl"
              animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="bg-brand-blue/10 absolute -bottom-10 -left-10 h-40 w-40 rounded-full blur-3xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.15, 0.1] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
          </div>

          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-brand-pink-500/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
            >
              <Sparkles className="text-brand-pink-500 h-8 w-8" />
            </motion.div>

            <motion.h2
              {...scrollReveal.heading}
              className="font-libreBaskerville text-text-tertiary mb-4 text-2xl tracking-tight sm:text-3xl"
            >
              Ready to Start Your Story?
            </motion.h2>

            <motion.p
              {...scrollReveal.paragraph}
              className="text-text-secondary-65 mx-auto mb-8 max-w-xl text-sm leading-relaxed"
            >
              Join thousands of writers creating interactive stories on StoryChain. Start for free
              and upgrade when you're ready.
            </motion.p>

            <motion.div
              {...scrollReveal.paragraph}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button
                asChild
                className="bg-brand-pink-500 hover:bg-brand-pink-600 gap-2 text-white"
              >
                <Link to="/dashboard">
                  <BookOpen className="h-4 w-4" />
                  Start Writing
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-brand-pink-500/30 hover:border-brand-pink-500/50 hover:bg-brand-pink-500/5 gap-2"
              >
                <Link to="/pricing">
                  <Zap className="h-4 w-4" />
                  View Pricing
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
