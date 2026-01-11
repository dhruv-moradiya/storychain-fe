import { motion } from 'framer-motion';
import { BookOpen, FileText, Type, Eye, Heart, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserProfileStatsProps {
  stats: {
    stories: number;
    chapters: number;
    words: number;
    totalReads: number;
    totalLikes: number;
    avgRating: number;
  };
}

const statItems = [
  { key: 'stories', label: 'Stories', icon: BookOpen, iconColor: 'text-brand-pink-500' },
  { key: 'chapters', label: 'Chapters', icon: FileText, iconColor: 'text-brand-orange' },
  { key: 'words', label: 'Words', icon: Type, iconColor: 'text-purple-500' },
  { key: 'totalReads', label: 'Reads', icon: Eye, iconColor: 'text-blue-500' },
  { key: 'totalLikes', label: 'Likes', icon: Heart, iconColor: 'text-red-500' },
  { key: 'avgRating', label: 'Avg Rating', icon: Star, iconColor: 'text-yellow-500' },
] as const;

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

function UserProfileStats({ stats }: UserProfileStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-3 gap-3 sm:grid-cols-6"
    >
      {statItems.map((item, index) => {
        const value = stats[item.key as keyof typeof stats];
        const Icon = item.icon;

        return (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="border-border/50 hover:border-brand-pink-500/30 flex flex-col items-center rounded-xl border p-4 transition-colors"
          >
            <Icon className={cn('mb-2 h-5 w-5', item.iconColor)} />
            <span className="text-text-primary text-xl font-bold">
              {item.key === 'avgRating' ? value.toFixed(1) : formatNumber(value)}
            </span>
            <span className="text-text-secondary-65 text-xs">{item.label}</span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export { UserProfileStats };
