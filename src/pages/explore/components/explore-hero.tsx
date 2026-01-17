import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import { useState } from 'react';
import type { GenreOption } from '../explore.types';

interface ExploreHeroProps {
  genres: GenreOption[];
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
  onSearch: (query: string) => void;
}

export function ExploreHero({ genres, selectedGenre, onGenreChange, onSearch }: ExploreHeroProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <section className="relative overflow-hidden px-6 pt-12 pb-8">
      {/* Background decorations - matching pricing hero */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 left-1/4 h-72 w-72 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--brand-pink-500) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-20 right-1/4 h-56 w-56 rounded-full opacity-15 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--brand-blue) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="border-brand-pink-500/20 bg-brand-pink-500/5 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2"
        >
          <Sparkles className="text-brand-pink-500 h-4 w-4" />
          <span className="text-brand-pink-500 text-sm font-medium">Discover stories</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-libreBaskerville text-text-tertiary mb-4 text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl"
        >
          Explore Amazing
          <br />
          <span className="text-brand-pink-500">Interactive Stories</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-text-secondary-65 mx-auto mb-8 max-w-xl text-sm leading-relaxed"
        >
          Dive into worlds created by our community of writers. Find your next favorite story.
        </motion.p>

        {/* Search Bar */}
        <motion.form
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSearch}
          className="mx-auto mb-8 max-w-xl"
        >
          <div className="group relative">
            <Search className="text-text-secondary-65 group-focus-within:text-brand-pink-500 absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stories, authors, tags..."
              className="border-border focus:border-brand-pink-500 focus:ring-brand-pink-500/20 bg-cream-95 h-12 w-full rounded-full border pr-4 pl-12 text-sm shadow-sm transition-all focus:ring-2 focus:outline-none"
            />
          </div>
        </motion.form>

        {/* Genre Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {genres.map((genre) => (
            <motion.button
              key={genre.id}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onGenreChange(genre.id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                selectedGenre === genre.id
                  ? 'border-brand-pink-500 bg-brand-pink-500 text-cream-95 shadow-md'
                  : 'bg-cream-95/80 text-text-secondary-65 hover:border-brand-pink-500/30 hover:bg-cream-90 border-black/10 shadow-sm'
              }`}
            >
              {genre.label}
              {genre.count && (
                <span
                  className={`ml-1.5 text-xs ${selectedGenre === genre.id ? 'text-cream-90/80' : 'text-text-secondary-65/60'}`}
                >
                  ({genre.count})
                </span>
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
