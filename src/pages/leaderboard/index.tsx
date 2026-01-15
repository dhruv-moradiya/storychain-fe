import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, PenTool, BookOpen, GitBranch, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Podium, WritersList, StoriesList, ContributorsList } from './components';
import { mockTopWriters, mockTopStories, mockTopContributors } from './leaderboard.data';
import type { LeaderboardTab, LeaderboardPeriod } from './leaderboard.types';

const tabs: { key: LeaderboardTab; label: string; icon: typeof Trophy }[] = [
  { key: 'writers', label: 'Top Writers', icon: PenTool },
  { key: 'stories', label: 'Top Stories', icon: BookOpen },
  { key: 'contributors', label: 'Top Contributors', icon: GitBranch },
];

const periods: { key: LeaderboardPeriod; label: string }[] = [
  { key: 'weekly', label: 'This Week' },
  { key: 'monthly', label: 'This Month' },
  { key: 'allTime', label: 'All Time' },
];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<LeaderboardTab>('writers');
  const [period, setPeriod] = useState<LeaderboardPeriod>('weekly');

  const selectedPeriod = periods.find((p) => p.key === period);

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="from-brand-pink-500/10 via-cream-95 to-brand-blue/10 absolute inset-0 bg-gradient-to-br" />

        {/* Decorative elements */}
        <div className="bg-brand-pink-500/20 absolute top-10 left-10 h-32 w-32 rounded-full blur-3xl" />
        <div className="bg-brand-blue/20 absolute top-20 right-10 h-40 w-40 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 pt-8 pb-6 sm:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-center"
          >
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1.5">
              <Trophy className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium text-amber-600">Leaderboard</span>
            </div>
            <h1 className="text-text-primary mb-2 text-2xl font-bold sm:text-3xl">Hall of Fame</h1>
            <p className="text-text-secondary-65 text-sm sm:text-base">
              Celebrating our most talented writers and beloved stories
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row"
          >
            {/* Tab buttons */}
            <div className="bg-cream-90/80 flex gap-1 rounded-xl p-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;

                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={cn(
                      'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all',
                      isActive
                        ? 'text-brand-pink-500 bg-white shadow-sm'
                        : 'text-text-secondary-65 hover:text-text-primary'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Period selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border/50 bg-cream-95 hover:bg-cream-90 gap-2"
                >
                  <Calendar className="text-text-secondary-65 h-3.5 w-3.5" />
                  {selectedPeriod?.label}
                  <Flame
                    className={cn(
                      'h-3.5 w-3.5',
                      period === 'weekly' ? 'text-orange-500' : 'text-text-secondary-65'
                    )}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-cream-95">
                {periods.map((p) => (
                  <DropdownMenuItem
                    key={p.key}
                    onClick={() => setPeriod(p.key)}
                    className={cn(
                      period === p.key ? 'bg-brand-pink-500/10 text-brand-pink-500' : ''
                    )}
                  >
                    {p.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>

          {/* Podium - Only for writers tab */}
          {activeTab === 'writers' && (
            <motion.div
              key="podium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="border-border/50 bg-cream-95/80 rounded-2xl border backdrop-blur-sm"
            >
              <Podium topThree={mockTopWriters.slice(0, 3)} />
            </motion.div>
          )}
        </div>
      </div>

      {/* List Section */}
      <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'writers' && (
            <>
              <div className="mb-4 flex items-center gap-2">
                <div className="bg-brand-pink-500 h-1 w-1 rounded-full" />
                <h2 className="text-text-primary text-sm font-semibold tracking-wide uppercase">
                  More Writers
                </h2>
                <div className="bg-border/50 h-px flex-1" />
              </div>
              <WritersList writers={mockTopWriters} />
            </>
          )}

          {activeTab === 'stories' && (
            <>
              <div className="mb-4 flex items-center gap-2">
                <div className="bg-brand-blue h-1 w-1 rounded-full" />
                <h2 className="text-text-primary text-sm font-semibold tracking-wide uppercase">
                  Trending Stories
                </h2>
                <div className="bg-border/50 h-px flex-1" />
              </div>
              <StoriesList stories={mockTopStories} />
            </>
          )}

          {activeTab === 'contributors' && (
            <>
              <div className="mb-4 flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-green-500" />
                <h2 className="text-text-primary text-sm font-semibold tracking-wide uppercase">
                  Top Branch Contributors
                </h2>
                <div className="bg-border/50 h-px flex-1" />
              </div>
              <ContributorsList contributors={mockTopContributors} />
            </>
          )}
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <Button
            variant="outline"
            className="border-brand-pink-500/30 text-brand-pink-500 hover:bg-brand-pink-500/10"
          >
            Load More
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
