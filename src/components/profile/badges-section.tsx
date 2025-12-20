import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Award,
  Trophy,
  Star,
  BookOpen,
  Users,
  GitPullRequest,
  Flame,
  Target,
  Zap,
  Crown,
  Lock,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface BadgeItem {
  id: string;
  name: string;
  description: string;
  icon: typeof Award;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earned: boolean;
  earnedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

const mockBadges: BadgeItem[] = [
  {
    id: '1',
    name: 'First Story',
    description: 'Created your first story',
    icon: BookOpen,
    rarity: 'common',
    earned: true,
    earnedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Wordsmith',
    description: 'Wrote over 10,000 words',
    icon: Star,
    rarity: 'rare',
    earned: true,
    earnedAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    name: 'Collaborator',
    description: 'Joined 5 collaborative stories',
    icon: Users,
    rarity: 'common',
    earned: true,
    earnedAt: new Date('2024-03-10'),
  },
  {
    id: '4',
    name: 'PR Master',
    description: 'Had 10 pull requests approved',
    icon: GitPullRequest,
    rarity: 'rare',
    earned: false,
    progress: 7,
    maxProgress: 10,
  },
  {
    id: '5',
    name: 'On Fire',
    description: 'Maintained a 7-day writing streak',
    icon: Flame,
    rarity: 'epic',
    earned: true,
    earnedAt: new Date('2024-04-01'),
  },
  {
    id: '6',
    name: 'Sharpshooter',
    description: 'Received 50 stars on your stories',
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
    description: 'Created a story with over 100 stars',
    icon: Crown,
    rarity: 'legendary',
    earned: false,
    progress: 45,
    maxProgress: 100,
  },
];

const rarityColors = {
  common: 'bg-slate-100 text-slate-700 border-slate-200',
  rare: 'bg-blue-100 text-blue-700 border-blue-200',
  epic: 'bg-purple-100 text-purple-700 border-purple-200',
  legendary: 'bg-amber-100 text-amber-700 border-amber-200',
};

const rarityGlow = {
  common: '',
  rare: 'shadow-blue-200/50',
  epic: 'shadow-purple-200/50',
  legendary: 'shadow-amber-200/50 shadow-lg',
};

export function BadgesSection() {
  const [filter, setFilter] = useState<'all' | 'earned' | 'locked'>('all');

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
      <div>
        <h1 className="text-lg font-semibold tracking-tight">Badges & Achievements</h1>
        <p className="text-muted-foreground text-sm">
          Track your progress and showcase your accomplishments
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 rounded-xl p-3">
                <Trophy className="text-primary h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.earned}</p>
                <p className="text-muted-foreground text-sm">Badges Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-amber-500/10 p-3">
                <Award className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-muted-foreground text-sm">Total Badges</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-sm">Completion</p>
                <p className="text-sm font-medium">{stats.completion}%</p>
              </div>
              <Progress value={stats.completion} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Badges Grid */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Your Badges</CardTitle>
              <CardDescription>Collect badges by completing achievements</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
            <TabsList>
              <TabsTrigger value="all">All ({mockBadges.length})</TabsTrigger>
              <TabsTrigger value="earned">Earned ({earnedBadges.length})</TabsTrigger>
              <TabsTrigger value="locked">Locked ({lockedBadges.length})</TabsTrigger>
            </TabsList>

            <TabsContent value={filter} className="mt-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {filteredBadges.map((badge) => (
                  <BadgeCard key={badge.id} badge={badge} />
                ))}
              </div>

              {filteredBadges.length === 0 && (
                <div className="py-12 text-center">
                  <div className="bg-muted mb-4 inline-block rounded-full p-4">
                    <Award className="text-muted-foreground h-8 w-8" />
                  </div>
                  <h3 className="mb-1 font-medium">No badges found</h3>
                  <p className="text-muted-foreground text-sm">
                    {filter === 'earned'
                      ? 'Start completing achievements to earn badges!'
                      : "You've earned all available badges!"}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Rarity Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Rarity Guide</CardTitle>
          <CardDescription>Badges come in different rarities based on difficulty</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Badge variant="outline" className={rarityColors.common}>
              Common
            </Badge>
            <Badge variant="outline" className={rarityColors.rare}>
              Rare
            </Badge>
            <Badge variant="outline" className={rarityColors.epic}>
              Epic
            </Badge>
            <Badge variant="outline" className={rarityColors.legendary}>
              Legendary
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface BadgeCardProps {
  badge: BadgeItem;
}

function BadgeCard({ badge }: BadgeCardProps) {
  const Icon = badge.icon;

  return (
    <div
      className={cn(
        'relative flex items-start gap-4 rounded-xl border p-4 transition-all',
        badge.earned
          ? `bg-card hover:shadow-md ${rarityGlow[badge.rarity]}`
          : 'bg-muted/30 opacity-75'
      )}
    >
      <div
        className={cn(
          'shrink-0 rounded-xl p-3',
          badge.earned ? rarityColors[badge.rarity] : 'bg-muted text-muted-foreground'
        )}
      >
        {badge.earned ? <Icon className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <h4 className="text-sm font-medium">{badge.name}</h4>
          <Badge variant="outline" className={cn('text-xs', rarityColors[badge.rarity])}>
            {badge.rarity}
          </Badge>
        </div>
        <p className="text-muted-foreground mb-2 text-sm">{badge.description}</p>

        {badge.earned && badge.earnedAt ? (
          <p className="text-muted-foreground text-xs">
            Earned on {badge.earnedAt.toLocaleDateString()}
          </p>
        ) : badge.progress !== undefined && badge.maxProgress !== undefined ? (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">
                {badge.progress} / {badge.maxProgress}
              </span>
            </div>
            <Progress value={(badge.progress / badge.maxProgress) * 100} className="h-1.5" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default BadgesSection;
