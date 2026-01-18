import { motion } from 'framer-motion';
import { Eye, Heart, User, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ExploreStory } from '../explore.types';

interface ExploreCardProps {
  story: ExploreStory;
  index?: number;
}

const genreConfig: Record<string, { bg: string; text: string }> = {
  fantasy: { bg: 'bg-purple-500/30', text: 'text-purple-200' },
  adventure: { bg: 'bg-emerald-500/30', text: 'text-emerald-200' },
  drama: { bg: 'bg-amber-500/30', text: 'text-amber-200' },
  romance: { bg: 'bg-pink-500/30', text: 'text-pink-200' },
  mystery: { bg: 'bg-blue-500/30', text: 'text-blue-200' },
  horror: { bg: 'bg-red-500/30', text: 'text-red-200' },
  sci_fi: { bg: 'bg-cyan-500/30', text: 'text-cyan-200' },
  comedy: { bg: 'bg-yellow-500/30', text: 'text-yellow-200' },
};

const ratingConfig: Record<string, { bg: string; text: string }> = {
  general: { bg: 'bg-green-500/30', text: 'text-green-200' },
  teen: { bg: 'bg-amber-500/30', text: 'text-amber-200' },
  mature: { bg: 'bg-red-500/30', text: 'text-red-200' },
};

export function ExploreCard({ story, index = 0 }: ExploreCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group/card relative w-[200px] flex-shrink-0 cursor-pointer"
    >
      {/* Card container */}
      <div className="group-hover/card:ring-brand-pink-500/30 relative h-[300px] overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/10 transition-all duration-500 group-hover/card:shadow-2xl">
        {/* Cover image */}
        <img
          src={story.cardImage}
          alt={story.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
        />

        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />

        {/* Play button - appears on hover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        >
          <div className="bg-brand-pink-500 shadow-brand-pink-500/30 flex h-14 w-14 items-center justify-center rounded-full shadow-xl">
            <Play className="fill-cream-95 text-cream-95 ml-0.5 h-6 w-6" />
          </div>
        </motion.div>

        {/* Top section - Title & Rating */}
        <div className="absolute inset-x-0 top-0 p-3.5">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="text-cream-95 line-clamp-2 flex-1 text-sm leading-tight font-bold drop-shadow-lg">
              {story.title}
            </h3>
            {/* Content rating badge */}
            <span
              className={cn(
                'shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase backdrop-blur-sm',
                ratingConfig[story.contentRating]?.bg || 'bg-gray-500/30',
                ratingConfig[story.contentRating]?.text || 'text-gray-200'
              )}
            >
              {story.contentRating}
            </span>
          </div>
        </div>

        {/* Bottom section - Info */}
        <div className="absolute inset-x-0 bottom-0 p-3.5">
          {/* Creator */}
          <div className="mb-3 flex items-center gap-2">
            <div className="from-brand-pink-500/50 to-brand-blue/50 rounded-full bg-gradient-to-br p-0.5">
              {story.creator.avatar ? (
                <img
                  src={story.creator.avatar}
                  alt={story.creator.username}
                  className="h-7 w-7 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black/40">
                  <User size={12} className="text-cream-90" />
                </div>
              )}
            </div>
            <span className="text-cream-90 truncate text-xs font-medium">
              @{story.creator.username}
            </span>
          </div>

          {/* Genres */}
          <div className="mb-3 flex flex-wrap gap-1.5">
            {story.genres.slice(0, 2).map((genre) => {
              const config = genreConfig[genre] || { bg: 'bg-gray-500/30', text: 'text-gray-200' };
              return (
                <span
                  key={genre}
                  className={cn(
                    'rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize backdrop-blur-sm',
                    config.bg,
                    config.text
                  )}
                >
                  {genre.replace('_', '-')}
                </span>
              );
            })}
          </div>

          {/* Stats */}
          <div className="border-cream-90/20 flex items-center gap-4 border-t pt-2.5">
            <div className="flex items-center gap-1.5">
              <Eye size={12} className="text-brand-pink-400" />
              <span className="text-cream-90 text-xs font-semibold">
                {formatNumber(story.stats.totalReads)}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Heart size={12} className="text-red-400" />
              <span className="text-cream-90 text-xs font-semibold">
                {formatNumber(story.stats.totalVotes)}
              </span>
            </div>
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="ring-brand-pink-500/50 pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-2 transition-opacity duration-500 ring-inset group-hover/card:opacity-100" />
      </div>
    </motion.div>
  );
}
