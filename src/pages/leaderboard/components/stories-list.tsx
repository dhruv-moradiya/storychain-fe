import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Eye,
  BookOpen,
  Star,
  Users,
  ArrowUpRight,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import type { TopStory } from '../leaderboard.types';

interface StoriesListProps {
  stories: TopStory[];
}

const genreColors: Record<string, string> = {
  Fantasy: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  Mystery: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  'Sci-Fi': 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
  Romance: 'bg-pink-500/10 text-pink-600 border-pink-500/20',
  Thriller: 'bg-red-500/10 text-red-600 border-red-500/20',
  Horror: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
  Comedy: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  Drama: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
};

export function StoriesList({ stories }: StoriesListProps) {
  const navigate = useNavigate();

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'from-amber-400 to-amber-500';
    if (rank === 2) return 'from-gray-300 to-gray-400';
    if (rank === 3) return 'from-orange-300 to-orange-400';
    return 'from-gray-400/80 to-gray-500/80';
  };

  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stories.map((story, index) => (
        <motion.div
          key={story.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          onClick={() => navigate(`/stories/${story.slug}`)}
          className="group hover:border-brand-pink-500/20 relative cursor-pointer overflow-hidden rounded-2xl border border-black/5 bg-white/60 shadow-sm backdrop-blur transition-all hover:shadow-lg"
        >
          {/* Cover Image with overlay */}
          <div className="relative h-32 overflow-hidden">
            <img
              src={story.coverUrl}
              alt={story.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Rank Badge - top left */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-bold text-white shadow-lg',
                  getRankStyle(story.rank)
                )}
              >
                {story.rank}
              </div>
              {getMedalEmoji(story.rank) && (
                <span className="text-lg drop-shadow-md">{getMedalEmoji(story.rank)}</span>
              )}
            </div>

            {/* Rank change - top right */}
            <div className="absolute top-3 right-3">
              {story.rankChange > 0 ? (
                <div className="flex items-center gap-0.5 rounded-full bg-green-500/90 px-2 py-1 text-[10px] font-semibold text-white shadow-sm">
                  <TrendingUp className="h-3 w-3" />
                  <span>+{story.rankChange}</span>
                </div>
              ) : story.rankChange < 0 ? (
                <div className="flex items-center gap-0.5 rounded-full bg-red-500/90 px-2 py-1 text-[10px] font-semibold text-white shadow-sm">
                  <TrendingDown className="h-3 w-3" />
                  <span>{story.rankChange}</span>
                </div>
              ) : (
                <div className="flex items-center rounded-full bg-gray-500/90 px-2 py-1 text-[10px] font-semibold text-white shadow-sm">
                  <Minus className="h-3 w-3" />
                </div>
              )}
            </div>

            {/* Genre badge - bottom left */}
            <div className="absolute bottom-3 left-3">
              <span
                className={cn(
                  'rounded-full border px-2.5 py-1 text-[10px] font-semibold backdrop-blur-sm',
                  genreColors[story.genre] || 'border-gray-500/20 bg-gray-500/10 text-gray-600'
                )}
              >
                {story.genre}
              </span>
            </div>

            {/* Read arrow - bottom right */}
            <div className="absolute right-3 bottom-3 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="text-brand-pink-500 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-md">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Title */}
            <h3 className="text-text-tertiary group-hover:text-brand-pink-500 mb-2 truncate font-semibold transition-colors">
              {story.title}
            </h3>

            {/* Author */}
            <div className="mb-3 flex items-center gap-2">
              <div className="from-brand-pink-500/20 to-brand-blue/20 rounded-full bg-gradient-to-br p-0.5">
                <img
                  src={story.author.avatarUrl}
                  alt={story.author.username}
                  className="h-6 w-6 rounded-full border border-white object-cover"
                />
              </div>
              <span className="text-brand-pink-500 text-xs font-medium">
                @{story.author.username}
              </span>
            </div>

            {/* Stats */}
            <div className="bg-cream-90/50 grid grid-cols-4 gap-1 rounded-xl p-2">
              <div className="flex flex-col items-center">
                <Eye className="text-brand-pink-500 mb-0.5 h-3.5 w-3.5" />
                <span className="text-text-tertiary text-xs font-bold">
                  {formatNumber(story.stats.reads)}
                </span>
              </div>
              <div className="border-border/30 flex flex-col items-center border-x">
                <BookOpen className="text-brand-blue mb-0.5 h-3.5 w-3.5" />
                <span className="text-text-tertiary text-xs font-bold">{story.stats.chapters}</span>
              </div>
              <div className="border-border/30 flex flex-col items-center border-r">
                <Star className="mb-0.5 h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="text-text-tertiary text-xs font-bold">{story.stats.rating}</span>
              </div>
              <div className="flex flex-col items-center">
                <Users className="mb-0.5 h-3.5 w-3.5 text-green-500" />
                <span className="text-text-tertiary text-xs font-bold">
                  {formatNumber(story.stats.subscribers)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
