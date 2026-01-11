import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Sparkles } from 'lucide-react';
import {
  BookOpen,
  Star,
  Users,
  GitPullRequest,
  Flame,
  Target,
  Zap,
  Crown,
  Heart,
  MessageSquare,
  Calendar,
  TrendingUp,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BadgeCard } from './badge-types';
import { BadgesStats } from './badges-stats';
import { RarityLegend } from './rarity-legend';
import type { BadgeItem, BadgeFilter } from './badges.types';

// Extended mock badges data
const mockBadges: BadgeItem[] = [
  {
    id: '1',
    name: 'First Story',
    description: 'Created your first story on StoryChain',
    icon: BookOpen,
    rarity: 'common',
    earned: true,
    earnedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Wordsmith',
    description: 'Wrote over 10,000 words across all stories',
    icon: Star,
    rarity: 'rare',
    earned: true,
    earnedAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    name: 'Collaborator',
    description: 'Joined 5 collaborative stories as a contributor',
    icon: Users,
    rarity: 'common',
    earned: true,
    earnedAt: new Date('2024-03-10'),
  },
  {
    id: '4',
    name: 'PR Master',
    description: 'Had 10 pull requests approved by story owners',
    icon: GitPullRequest,
    rarity: 'rare',
    earned: false,
    progress: 7,
    maxProgress: 10,
  },
  {
    id: '5',
    name: 'On Fire',
    description: 'Maintained a 7-day writing streak without missing',
    icon: Flame,
    rarity: 'epic',
    earned: true,
    earnedAt: new Date('2024-04-01'),
  },
  {
    id: '6',
    name: 'Sharpshooter',
    description: 'Received 50 stars on your published stories',
    icon: Target,
    rarity: 'epic',
    earned: false,
    progress: 32,
    maxProgress: 50,
  },
  {
    id: '7',
    name: 'Speed Writer',
    description: 'Published a chapter within 24 hours of starting',
    icon: Zap,
    rarity: 'rare',
    earned: false,
    progress: 0,
    maxProgress: 1,
  },
  {
    id: '8',
    name: 'Story Legend',
    description: 'Created a story that received over 100 stars',
    icon: Crown,
    rarity: 'legendary',
    earned: false,
    progress: 45,
    maxProgress: 100,
  },
  {
    id: '9',
    name: 'Community Heart',
    description: 'Received 100 likes on your comments and feedback',
    icon: Heart,
    rarity: 'common',
    earned: true,
    earnedAt: new Date('2024-03-25'),
  },
  {
    id: '10',
    name: 'Voice of Reason',
    description: 'Left 50 constructive comments on other stories',
    icon: MessageSquare,
    rarity: 'rare',
    earned: true,
    earnedAt: new Date('2024-04-15'),
  },
  {
    id: '11',
    name: 'Veteran',
    description: 'Been a member of StoryChain for over 1 year',
    icon: Calendar,
    rarity: 'epic',
    earned: false,
    progress: 180,
    maxProgress: 365,
  },
  {
    id: '12',
    name: 'Trendsetter',
    description: 'Had a story featured on the explore page',
    icon: TrendingUp,
    rarity: 'legendary',
    earned: false,
    progress: 0,
    maxProgress: 1,
  },
];

export function BadgesSection() {
  const [filter, setFilter] = useState<BadgeFilter>('all');

  const earnedBadges = mockBadges.filter((b) => b.earned);
  const lockedBadges = mockBadges.filter((b) => !b.earned);

  const filteredBadges =
    filter === 'all' ? mockBadges : filter === 'earned' ? earnedBadges : lockedBadges;

  const stats = {
    total: mockBadges.length,
    earned: earnedBadges.length,
    completion: Math.round((earnedBadges.length / mockBadges.length) * 100),
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <div className="from-brand-pink-500/20 to-brand-orange/20 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br">
          <Award className="text-brand-pink-500 h-5 w-5" />
        </div>
        <div>
          <h1 className="text-text-primary text-lg font-semibold tracking-tight">
            Badges & Achievements
          </h1>
          <p className="text-text-secondary-65 text-sm">
            Track your progress and showcase your accomplishments
          </p>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <BadgesStats stats={stats} />

      {/* Badges Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="border-border/50 bg-cream-95 rounded-xl border p-5"
      >
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="text-brand-pink-500 h-5 w-5" />
            <h2 className="text-text-primary text-base font-semibold">Your Badges</h2>
          </div>
        </div>

        <Tabs value={filter} onValueChange={(v) => setFilter(v as BadgeFilter)}>
          <TabsList className="bg-muted/30 mb-6">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-brand-pink-500 data-[state=active]:text-white"
            >
              All ({mockBadges.length})
            </TabsTrigger>
            <TabsTrigger
              value="earned"
              className="data-[state=active]:bg-brand-pink-500 data-[state=active]:text-white"
            >
              Earned ({earnedBadges.length})
            </TabsTrigger>
            <TabsTrigger
              value="locked"
              className="data-[state=active]:bg-brand-pink-500 data-[state=active]:text-white"
            >
              Locked ({lockedBadges.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={filter}>
            <AnimatePresence mode="wait">
              {filteredBadges.length > 0 ? (
                <motion.div
                  key={filter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 gap-4 lg:grid-cols-2"
                >
                  {filteredBadges.map((badge, index) => (
                    <motion.div
                      key={badge.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <BadgeCard badge={badge} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="bg-muted/50 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                    <Award className="text-text-secondary-65 h-8 w-8" />
                  </div>
                  <h3 className="text-text-primary mb-1 font-medium">No badges found</h3>
                  <p className="text-text-secondary-65 text-sm">
                    {filter === 'earned'
                      ? 'Start completing achievements to earn badges!'
                      : "You've earned all available badges!"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Rarity Legend */}
      <RarityLegend />
    </div>
  );
}

export default BadgesSection;
