import { motion } from 'framer-motion';
import { Play, Plus, Star, Eye, BookOpen, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { FeaturedStory } from '../explore.types';

interface FeaturedHeroProps {
  story: FeaturedStory;
  onReadNow?: () => void;
  onAddToList?: () => void;
  onMoreInfo?: () => void;
}

const genreConfig: Record<string, { bg: string; text: string }> = {
  fantasy: { bg: 'bg-purple-500/20', text: 'text-purple-300' },
  adventure: { bg: 'bg-emerald-500/20', text: 'text-emerald-300' },
  drama: { bg: 'bg-amber-500/20', text: 'text-amber-300' },
  romance: { bg: 'bg-pink-500/20', text: 'text-pink-300' },
  mystery: { bg: 'bg-blue-500/20', text: 'text-blue-300' },
  horror: { bg: 'bg-red-500/20', text: 'text-red-300' },
  sci_fi: { bg: 'bg-cyan-500/20', text: 'text-cyan-300' },
  comedy: { bg: 'bg-yellow-500/20', text: 'text-yellow-300' },
};

export function FeaturedHero({ story, onReadNow, onAddToList, onMoreInfo }: FeaturedHeroProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <section className="relative h-[75vh] max-h-[750px] min-h-[550px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          src={story.bannerImage}
          alt={story.title}
          className="h-full w-full object-cover"
        />

        {/* Cinematic gradient overlays */}
        <div className="from-bg-cream via-bg-cream/60 absolute inset-0 bg-gradient-to-t to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-6 pb-24 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          {/* Badges */}
          {story.badges && story.badges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 flex flex-wrap gap-2"
            >
              {story.badges.map((badge, index) => (
                <span
                  key={badge}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-xs font-bold tracking-wide uppercase shadow-lg backdrop-blur-sm',
                    index === 0
                      ? 'bg-brand-pink-500 text-cream-95'
                      : 'text-cream-90 ring-cream-90/20 bg-black/40 ring-1'
                  )}
                >
                  {badge}
                </span>
              ))}
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-libreBaskerville text-cream-95 mb-4 text-4xl leading-tight font-bold tracking-tight drop-shadow-lg sm:text-5xl lg:text-6xl"
          >
            {story.title}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-brand-pink-400 mb-5 text-lg font-medium italic sm:text-xl"
          >
            "{story.tagline}"
          </motion.p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mb-5 flex flex-wrap items-center gap-5 text-sm"
          >
            <div className="flex items-center gap-1.5">
              <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              <span className="text-cream-95 font-bold">{story.stats.rating}</span>
              <span className="text-cream-90/70">rating</span>
            </div>
            <div className="bg-cream-90/30 h-4 w-px" />
            <div className="flex items-center gap-1.5">
              <Eye className="text-brand-pink-400 h-4 w-4" />
              <span className="text-cream-90 font-semibold">
                {formatNumber(story.stats.totalReads)}
              </span>
              <span className="text-cream-90/70">reads</span>
            </div>
            <div className="bg-cream-90/30 h-4 w-px" />
            <div className="flex items-center gap-1.5">
              <BookOpen className="text-brand-blue h-4 w-4" />
              <span className="text-cream-90 font-semibold">{story.stats.chapters}</span>
              <span className="text-cream-90/70">chapters</span>
            </div>
          </motion.div>

          {/* Genres */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6 flex flex-wrap gap-2"
          >
            {story.genres.map((genre) => {
              const config = genreConfig[genre] || { bg: 'bg-gray-500/20', text: 'text-gray-300' };
              return (
                <span
                  key={genre}
                  className={cn(
                    'rounded-full px-3 py-1 text-xs font-semibold capitalize backdrop-blur-sm',
                    config.bg,
                    config.text
                  )}
                >
                  {genre.replace('_', '-')}
                </span>
              );
            })}
            <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300 capitalize backdrop-blur-sm">
              {story.contentRating}
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-cream-90/90 mb-7 line-clamp-3 max-w-xl text-sm leading-relaxed sm:text-base"
          >
            {story.description}
          </motion.p>

          {/* Creator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8 flex items-center gap-3"
          >
            <div className="from-brand-pink-500 to-brand-blue rounded-full bg-gradient-to-br p-0.5">
              {story.creator.avatar ? (
                <img
                  src={story.creator.avatar}
                  alt={story.creator.username}
                  className="h-11 w-11 rounded-full border-2 border-black/20 object-cover"
                />
              ) : (
                <div className="text-cream-90 flex h-11 w-11 items-center justify-center rounded-full bg-black/40">
                  {story.creator.username.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <p className="text-cream-90/60 text-xs">Written by</p>
              <p className="text-cream-95 font-semibold">@{story.creator.username}</p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap gap-3"
          >
            <Button
              onClick={onReadNow}
              size="lg"
              className="bg-brand-pink-500 hover:bg-brand-pink-600 text-cream-95 shadow-brand-pink-500/25 hover:shadow-brand-pink-500/30 gap-2.5 rounded-xl px-8 py-6 text-base font-bold shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
            >
              <Play className="h-5 w-5 fill-current" />
              Read Now
            </Button>

            <Button
              onClick={onAddToList}
              size="lg"
              variant="outline"
              className="border-cream-90/30 text-cream-95 hover:border-cream-90/50 gap-2.5 rounded-xl border-2 bg-black/30 px-6 py-6 text-base font-semibold backdrop-blur-sm transition-all hover:bg-black/40"
            >
              <Plus className="h-5 w-5" />
              My List
            </Button>

            <Button
              onClick={onMoreInfo}
              size="lg"
              variant="ghost"
              className="text-cream-90/80 hover:text-cream-95 gap-2 rounded-xl px-5 py-6 text-base font-semibold transition-all hover:bg-black/20"
            >
              <Info className="h-5 w-5" />
              More Info
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Decorative blur orbs */}
      <div className="bg-brand-pink-500/10 pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full blur-3xl" />
      <div className="bg-brand-blue/10 pointer-events-none absolute top-1/4 right-1/4 h-64 w-64 rounded-full blur-3xl" />
    </section>
  );
}
