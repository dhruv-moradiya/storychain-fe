import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Eye, TrendingUp, TrendingDown, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router';
import type { TopChapter } from '../analytics.types';

interface TopChaptersProps {
  chapters: TopChapter[];
}

export function TopChapters({ chapters }: TopChaptersProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const navigate = useNavigate();
  const { slug } = useParams();

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="border-border/50 bg-cream-95 rounded-xl border p-4"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-text-primary flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
          <div className="bg-brand-blue h-1 w-1 rounded-full" />
          Top Chapters
        </h3>
        <BookOpen className="text-text-secondary-65 h-4 w-4" />
      </div>

      <div className="space-y-2">
        {chapters.map((chapter, index) => {
          const isPositive = chapter.change >= 0;

          return (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              className="group border-border/50 bg-cream-90/50 hover:border-brand-pink-500/30 hover:bg-cream-90 flex items-center gap-3 rounded-lg border p-3 transition-all"
            >
              {/* Rank */}
              <div
                className={cn(
                  'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-xs font-bold',
                  index === 0
                    ? 'bg-amber-500/20 text-amber-600'
                    : index === 1
                      ? 'bg-gray-300/30 text-gray-600'
                      : index === 2
                        ? 'bg-orange-400/20 text-orange-600'
                        : 'bg-border/50 text-text-secondary-65'
                )}
              >
                {index + 1}
              </div>

              {/* Chapter Info */}
              <div className="min-w-0 flex-1">
                <p className="text-text-primary truncate text-sm font-medium">
                  Ch.{chapter.chapterNumber}: {chapter.title}
                </p>
                <div className="text-text-secondary-65 flex items-center gap-2 text-xs">
                  <Eye className="h-3 w-3" />
                  <span>{chapter.reads.toLocaleString()} reads</span>
                  <span
                    className={cn(
                      'flex items-center gap-0.5',
                      isPositive ? 'text-green-600' : 'text-red-500'
                    )}
                  >
                    {isPositive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {isPositive ? '+' : ''}
                    {chapter.change}%
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <Button
        variant="ghost"
        className="text-brand-pink-500 hover:bg-brand-pink-500/10 hover:text-brand-pink-600 mt-3 w-full justify-center gap-2"
        onClick={() => navigate(`/stories/${slug}/chapters`)}
      >
        View All Chapters
        <ArrowRight className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}
