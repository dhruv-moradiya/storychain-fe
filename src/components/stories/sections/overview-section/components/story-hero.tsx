import { motion } from 'framer-motion';
import { Heart, Share2, Bell, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface StoryHeroProps {
  coverImage?: string;
  cardImage?: string;
  title: string;
  slug: string;
  status: string;
  genres: string;
  contentRating: string;
  totalVotes: string;
  onBack: () => void;
}

export function StoryHero({
  coverImage,
  cardImage,
  title,
  slug,
  status,
  genres,
  contentRating,
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
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <img
          src={coverImage || '/images/placeholder-cover.png'}
          alt={title}
          className="h-full w-full object-cover"
        />

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
          <Tag variant="status">{status}</Tag>
          <Tag variant="genre">{genres.replace(/_/g, ' ')}</Tag>
          <Tag variant="rating">{contentRating}</Tag>
        </div>
      </motion.header>
    </div>
  );
}

function Tag({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: 'status' | 'genre' | 'rating';
}) {
  const variantStyles = {
    status: 'bg-badge-success-bg text-badge-success border-badge-success-border',
    genre: 'bg-brand-pink-500/10 text-brand-pink-500 border-brand-pink-500/30',
    rating: 'bg-brand-orange/10 text-brand-orange border-brand-orange/30',
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn('rounded-md border px-2.5 py-1 text-xs font-medium', variantStyles[variant])}
    >
      {children}
    </motion.span>
  );
}
