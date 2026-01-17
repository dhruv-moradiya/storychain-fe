import { motion } from 'framer-motion';
import { Heart, Share2, Bell, Bookmark, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { storyStatusBadge, contentRatingBadge, genresBadges } from '@/components/common/badge';
import type { TStoryStatus } from '@/type/story';

interface StoryHeroProps {
  coverImage?: string;
  cardImage?: string;
  title: string;
  slug: string;
  status: TStoryStatus;
  contentRating: string;
  genres: string[];
  totalVotes: string;
  onBack: () => void;
}

export function StoryHero({
  coverImage,
  cardImage,
  title,
  slug,
  status,
  contentRating,
  genres,
  totalVotes,
  onBack,
}: StoryHeroProps) {
  return (
    <div className="space-y-6">
      {/* Top Actions */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between gap-2"
      >
        <Button
          variant="outline"
          size="sm"
          className="border-border/50 hover:border-brand-pink-500/50 hover:bg-brand-pink-500/10 gap-2"
          onClick={onBack}
        >
          ← Back
        </Button>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="border-border/50 text-text-secondary-65 hover:border-brand-pink-500/50 hover:text-brand-pink-500 hidden h-9 w-9 items-center justify-center rounded-lg border transition sm:flex"
          >
            <Bell size={18} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="border-border/50 text-text-secondary-65 hover:border-brand-pink-500/50 hover:text-brand-pink-500 flex h-8 items-center gap-1 rounded-lg border px-2 transition sm:h-9 sm:gap-1.5 sm:px-3"
          >
            <Heart size={14} className="sm:h-4 sm:w-4" />
            <span className="text-xs font-medium sm:text-sm">{totalVotes}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="border-border/50 text-text-secondary-65 hover:border-brand-pink-500/50 hover:text-brand-pink-500 flex h-8 w-8 items-center justify-center rounded-lg border transition sm:h-9 sm:w-9"
          >
            <Bookmark size={16} className="sm:h-[18px] sm:w-[18px]" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="border-border/50 text-text-secondary-65 hover:border-brand-pink-500/50 hover:text-brand-pink-500 flex h-8 w-8 items-center justify-center rounded-lg border transition sm:h-9 sm:w-9"
          >
            <Share2 size={16} className="sm:h-[18px] sm:w-[18px]" />
          </motion.button>
        </div>
      </motion.div>

      {/* Cover Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-48 w-full overflow-hidden rounded-2xl shadow-lg sm:h-56"
      >
        {coverImage ? (
          <img src={coverImage} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="from-brand-pink-500/20 via-brand-purple/20 to-brand-orange/20 flex h-full w-full items-center justify-center bg-gradient-to-br">
            <div className="flex flex-col items-center gap-3">
              <div className="bg-background/10 flex h-16 w-16 items-center justify-center rounded-full backdrop-blur-sm">
                <BookOpen className="text-foreground/60 h-8 w-8" />
              </div>
              <span className="text-foreground/50 text-sm font-medium">No cover image</span>
            </div>
          </div>
        )}

        {/* Card Image Overlay */}
        {cardImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-4 left-4 z-20 hidden sm:block"
          >
            <div className="h-32 w-24 overflow-hidden rounded-lg border-2 border-white shadow-xl">
              <img src={cardImage} alt={title} className="h-full w-full object-cover" />
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Header Info */}
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-2 sm:space-y-3"
      >
        <p className="text-text-secondary-65 font-mono text-xs">{slug}</p>
        <h1 className="text-text-primary text-xl font-bold sm:text-2xl md:text-3xl">{title}</h1>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {storyStatusBadge(status)}
          {contentRatingBadge(contentRating)}
        </div>

        {genres.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2">{genresBadges(genres)}</div>
        )}
      </motion.header>
    </div>
  );
}
