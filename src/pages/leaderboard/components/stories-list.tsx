import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, Eye, BookOpen, Star, Users } from 'lucide-react';
import { useNavigate } from 'react-router';
import type { TopStory } from '../leaderboard.types';

interface StoriesListProps {
  stories: TopStory[];
}

const genreColors: Record<string, string> = {
  Fantasy: 'bg-purple-500/10 text-purple-600',
  Mystery: 'bg-blue-500/10 text-blue-600',
  'Sci-Fi': 'bg-cyan-500/10 text-cyan-600',
  Romance: 'bg-pink-500/10 text-pink-600',
  Thriller: 'bg-red-500/10 text-red-600',
  Horror: 'bg-gray-500/10 text-gray-600',
  Comedy: 'bg-amber-500/10 text-amber-600',
  Drama: 'bg-indigo-500/10 text-indigo-600',
};

export function StoriesList({ stories }: StoriesListProps) {
  const navigate = useNavigate();

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-br from-amber-400 to-amber-500 text-white';
    if (rank === 2) return 'bg-gradient-to-br from-gray-300 to-gray-400 text-white';
    if (rank === 3) return 'bg-gradient-to-br from-orange-300 to-orange-400 text-white';
    return 'bg-cream-90 text-text-secondary-65';
  };

  return (
    <div className="space-y-3">
      {stories.map((story, index) => (
        <motion.div
          key={story.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          onClick={() => navigate(`/stories/${story.slug}`)}
          className="group border-border/50 bg-cream-95 hover:border-brand-pink-500/30 cursor-pointer overflow-hidden rounded-xl border transition-all hover:shadow-md"
        >
          <div className="flex gap-3 p-3 sm:gap-4 sm:p-4">
            {/* Cover Image */}
            <div className="relative flex-shrink-0">
              <img
                src={story.coverUrl}
                alt={story.title}
                className="h-24 w-16 rounded-lg object-cover shadow-sm sm:h-28 sm:w-20"
              />
              {/* Rank Badge */}
              <div
                className={cn(
                  'absolute -top-2 -left-2 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold shadow-md',
                  getRankStyle(story.rank)
                )}
              >
                {story.rank}
              </div>
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              {/* Header */}
              <div className="mb-1 flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="text-text-primary group-hover:text-brand-pink-500 truncate font-semibold">
                    {story.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    <img
                      src={story.author.avatarUrl}
                      alt={story.author.username}
                      className="h-4 w-4 rounded-full"
                    />
                    <span className="text-text-secondary-65 text-xs">@{story.author.username}</span>
                  </div>
                </div>

                {/* Rank change & Genre */}
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1">
                    {story.rankChange > 0 ? (
                      <span className="flex items-center gap-0.5 text-xs text-green-500">
                        <TrendingUp className="h-3 w-3" />+{story.rankChange}
                      </span>
                    ) : story.rankChange < 0 ? (
                      <span className="flex items-center gap-0.5 text-xs text-red-500">
                        <TrendingDown className="h-3 w-3" />
                        {story.rankChange}
                      </span>
                    ) : (
                      <span className="flex items-center text-xs text-gray-400">
                        <Minus className="h-3 w-3" />
                      </span>
                    )}
                  </div>
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[10px] font-medium',
                      genreColors[story.genre] || 'bg-gray-500/10 text-gray-600'
                    )}
                  >
                    {story.genre}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs sm:gap-4">
                <div className="text-text-secondary-65 flex items-center gap-1">
                  <Eye className="text-brand-pink-500 h-3.5 w-3.5" />
                  <span className="font-medium">{formatNumber(story.stats.reads)}</span>
                  <span className="hidden sm:inline">reads</span>
                </div>
                <div className="text-text-secondary-65 flex items-center gap-1">
                  <BookOpen className="text-brand-blue h-3.5 w-3.5" />
                  <span className="font-medium">{story.stats.chapters}</span>
                  <span className="hidden sm:inline">chapters</span>
                </div>
                <div className="text-text-secondary-65 flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-medium">{story.stats.rating}</span>
                </div>
                <div className="text-text-secondary-65 flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-green-500" />
                  <span className="font-medium">{formatNumber(story.stats.subscribers)}</span>
                  <span className="hidden sm:inline">subs</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
