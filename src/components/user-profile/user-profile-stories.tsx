import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Eye, Star } from 'lucide-react';
import { Link } from 'react-router';

interface Story {
  id: string;
  title: string;
  slug: string;
  coverUrl: string;
  genre: string;
  rating: number;
  reads: number;
  chapters: number;
}

interface UserProfileStoriesProps {
  stories: Story[];
  username: string;
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

function UserProfileStories({ stories, username }: UserProfileStoriesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="border-border/50 rounded-xl border p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-text-primary font-semibold">Featured Stories</h3>
        <Link
          to={`/user/${username}/stories`}
          className="text-brand-pink-500 flex items-center gap-1 text-xs hover:underline"
        >
          View all
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ y: -4 }}
            className="group cursor-pointer"
          >
            <Link to={`/story/${story.slug}`}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <img
                  src={story.coverUrl}
                  alt={story.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Genre Badge */}
                <span className="absolute top-2 left-2 rounded-md bg-black/50 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                  {story.genre}
                </span>

                {/* Info Overlay */}
                <div className="absolute right-0 bottom-0 left-0 p-3">
                  <h4 className="mb-1.5 line-clamp-2 text-sm font-semibold text-white">
                    {story.title}
                  </h4>

                  <div className="flex items-center gap-3 text-xs text-white/80">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {story.rating.toFixed(1)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {formatNumber(story.reads)}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {story.chapters}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {stories.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <BookOpen className="text-text-secondary-65/50 mb-2 h-10 w-10" />
          <p className="text-text-secondary-65 text-sm">No stories published yet</p>
        </div>
      )}
    </motion.div>
  );
}

export { UserProfileStories };
