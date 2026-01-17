import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, BookOpen, Flame, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FeaturedHero, StoryRow } from './components';
import { DEMO_STORIES, GENRE_OPTIONS, FEATURED_STORY } from './explore.data';

export default function ExplorePage() {
  const [selectedGenre, setSelectedGenre] = useState('all');

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
  };

  const handleSeeAll = (section: string) => {
    // TODO: Navigate to full list view
    console.log('See all:', section);
  };

  const handleReadNow = () => {
    // TODO: Navigate to story
    console.log('Read now:', FEATURED_STORY.id);
  };

  const handleAddToList = () => {
    // TODO: Add to reading list
    console.log('Add to list:', FEATURED_STORY.id);
  };

  const handleMoreInfo = () => {
    // TODO: Show more info modal or navigate to story details
    console.log('More info:', FEATURED_STORY.id);
  };

  return (
    <div className="bg-bg-cream relative min-h-screen">
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(0,0,0,0.02)_1px,_transparent_1px)] [background-size:24px_24px] opacity-60" />

      {/* Netflix-style Featured Hero */}
      <FeaturedHero
        story={FEATURED_STORY}
        onReadNow={handleReadNow}
        onAddToList={handleAddToList}
        onMoreInfo={handleMoreInfo}
      />

      {/* Genre Filter Section */}
      <section className="bg-cream-95/50 relative z-10 border-b border-black/5 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="text-text-tertiary mr-2 text-sm font-semibold">Browse:</span>
            {GENRE_OPTIONS.map((genre, index) => (
              <motion.button
                key={genre.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.03 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleGenreChange(genre.id)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                  selectedGenre === genre.id
                    ? 'bg-brand-pink-500 text-cream-95 shadow-brand-pink-500/25 shadow-lg'
                    : 'bg-cream-90/80 text-text-secondary-65 hover:bg-cream-90 hover:text-text-tertiary'
                )}
              >
                {genre.label}
                {genre.count && (
                  <span
                    className={cn(
                      'ml-1.5 text-xs',
                      selectedGenre === genre.id ? 'text-cream-90/70' : 'text-text-secondary-65/50'
                    )}
                  >
                    {genre.count}
                  </span>
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content - Story Rows */}
      <div className="relative z-10 px-6 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl space-y-14">
          {/* Trending Now */}
          <StoryRow
            icon={Flame}
            title="Trending Now"
            subtitle="Stories everyone's reading this week"
            stories={DEMO_STORIES}
            onSeeAll={() => handleSeeAll('trending')}
            delay={0.1}
          />

          {/* Top Rated */}
          <StoryRow
            icon={Star}
            title="Top Rated"
            subtitle="Highest rated by our community"
            stories={[...DEMO_STORIES].reverse()}
            onSeeAll={() => handleSeeAll('top-rated')}
            delay={0.15}
          />

          {/* Recently Added */}
          <StoryRow
            icon={Clock}
            title="Recently Added"
            subtitle="Fresh stories just published"
            stories={DEMO_STORIES}
            onSeeAll={() => handleSeeAll('recent')}
            delay={0.2}
          />

          {/* Most Loved */}
          <StoryRow
            icon={Heart}
            title="Most Loved"
            subtitle="Reader favorites with the most votes"
            stories={[...DEMO_STORIES].reverse()}
            onSeeAll={() => handleSeeAll('most-loved')}
            delay={0.25}
          />

          {/* Popular Reads */}
          <StoryRow
            icon={BookOpen}
            title="Popular Reads"
            subtitle="All-time reader favorites"
            stories={DEMO_STORIES}
            onSeeAll={() => handleSeeAll('popular')}
            delay={0.3}
          />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="bg-brand-pink-500/5 pointer-events-none fixed bottom-0 left-0 h-96 w-96 rounded-full blur-3xl" />
      <div className="bg-brand-blue/5 pointer-events-none fixed top-1/2 right-0 h-64 w-64 rounded-full blur-3xl" />
    </div>
  );
}
