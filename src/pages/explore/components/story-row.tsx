import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, type LucideIcon } from 'lucide-react';
import { ExploreCard } from './explore-card';
import { SectionHeader } from './section-header';
import type { ExploreStory } from '../explore.types';

interface StoryRowProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  stories: ExploreStory[];
  onSeeAll?: () => void;
  delay?: number;
}

export function StoryRow({ icon, title, subtitle, stories, onSeeAll, delay = 0 }: StoryRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 450;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="relative"
    >
      <SectionHeader
        icon={icon}
        title={title}
        subtitle={subtitle}
        onSeeAll={onSeeAll}
        delay={delay}
      />

      {/* Scroll container */}
      <div className="group/row relative -mx-2 px-2">
        {/* Left arrow */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: showLeftArrow ? 1 : 0 }}
          onClick={() => scroll('left')}
          className="bg-text-tertiary/90 hover:bg-text-tertiary absolute top-1/2 -left-3 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full shadow-xl backdrop-blur-sm transition-all group-hover/row:flex hover:scale-110"
          style={{ pointerEvents: showLeftArrow ? 'auto' : 'none' }}
        >
          <ChevronLeft className="text-cream-95 h-6 w-6" />
        </motion.button>

        {/* Right arrow */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: showRightArrow ? 1 : 0 }}
          onClick={() => scroll('right')}
          className="bg-text-tertiary/90 hover:bg-text-tertiary absolute top-1/2 -right-3 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full shadow-xl backdrop-blur-sm transition-all group-hover/row:flex hover:scale-110"
          style={{ pointerEvents: showRightArrow ? 'auto' : 'none' }}
        >
          <ChevronRight className="text-cream-95 h-6 w-6" />
        </motion.button>

        {/* Left fade gradient */}
        <div
          className="pointer-events-none absolute top-0 left-0 z-10 h-full w-16 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(to right, var(--bg-cream), transparent)',
            opacity: showLeftArrow ? 1 : 0,
          }}
        />

        {/* Right fade gradient */}
        <div
          className="pointer-events-none absolute top-0 right-0 z-10 h-full w-16 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(to left, var(--bg-cream), transparent)',
            opacity: showRightArrow ? 1 : 0,
          }}
        />

        {/* Cards container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="scrollbar-hide flex gap-5 overflow-x-auto pt-3 pb-6"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {stories.map((story, index) => (
            <div key={story.id} style={{ scrollSnapAlign: 'start' }}>
              <ExploreCard story={story} index={index} />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
