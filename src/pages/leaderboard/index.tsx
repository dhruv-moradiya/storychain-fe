import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, PenTool, BookOpen, GitBranch, Calendar, Sparkles } from 'lucide-react';
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

// Section divider component
function SectionDivider({
  icon: Icon,
  title,
  colorClass,
}: {
  icon: typeof Trophy;
  title: string;
  colorClass: string;
}) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className={cn('flex h-9 w-9 items-center justify-center rounded-xl', colorClass)}>
        <Icon className="h-4 w-4 text-white" />
      </div>
      <h2 className="font-libreBaskerville text-text-tertiary text-base font-semibold tracking-tight sm:text-lg">
        {title}
      </h2>
      <div className="from-border/50 h-px flex-1 bg-gradient-to-r to-transparent" />
    </div>
  );
}

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<LeaderboardTab>('writers');
  const [period, setPeriod] = useState<LeaderboardPeriod>('weekly');

  const selectedPeriod = periods.find((p) => p.key === period);

  return (
    <div className="bg-bg-cream relative min-h-screen pb-20">
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(0,0,0,0.02)_1px,_transparent_1px)] [background-size:24px_24px] opacity-60" />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-12 pb-8">
        {/* Background decorations - matching pricing/home style */}
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
          <div
            className="absolute bottom-0 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full opacity-10 blur-3xl"
            style={{
              background: 'radial-gradient(circle, var(--brand-orange) 0%, transparent 70%)',
            }}
          />
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-2"
            >
              <Trophy className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium text-amber-600">Leaderboard</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-libreBaskerville text-text-tertiary mb-4 text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            >
              Hall of Fame
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-text-secondary-65 mx-auto max-w-lg text-sm leading-relaxed sm:text-base"
            >
              Celebrating our most talented writers and beloved stories
            </motion.p>
          </motion.div>

          {/* Tabs & Period Selector */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row"
          >
            {/* Tab buttons - pill style */}
            <div className="flex gap-2 rounded-2xl border border-black/5 bg-white/60 p-1.5 shadow-sm backdrop-blur">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;

                return (
                  <motion.button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      'flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all',
                      isActive
                        ? 'bg-brand-pink-500 text-white shadow-md'
                        : 'text-text-secondary-65 hover:text-text-primary hover:bg-white'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Period selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 rounded-xl border-black/10 bg-white/80 shadow-sm hover:bg-white"
                >
                  <Calendar className="text-text-secondary-65 h-4 w-4" />
                  <span className="font-medium">{selectedPeriod?.label}</span>
                  <Flame
                    className={cn(
                      'h-4 w-4 transition-colors',
                      period === 'weekly' ? 'text-orange-500' : 'text-text-secondary-65'
                    )}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="rounded-xl border-black/5 bg-white shadow-lg"
              >
                {periods.map((p) => (
                  <DropdownMenuItem
                    key={p.key}
                    onClick={() => setPeriod(p.key)}
                    className={cn(
                      'cursor-pointer rounded-lg',
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="overflow-hidden rounded-2xl border border-black/5 bg-white/60 shadow-sm backdrop-blur"
            >
              <Podium topThree={mockTopWriters.slice(0, 3)} />
            </motion.div>
          )}
        </div>
      </section>

      {/* List Section */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pt-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'writers' && (
            <>
              <SectionDivider icon={PenTool} title="More Writers" colorClass="bg-brand-pink-500" />
              <WritersList writers={mockTopWriters} />
            </>
          )}

          {activeTab === 'stories' && (
            <>
              <SectionDivider icon={BookOpen} title="Trending Stories" colorClass="bg-brand-blue" />
              <StoriesList stories={mockTopStories} />
            </>
          )}

          {activeTab === 'contributors' && (
            <>
              <SectionDivider
                icon={GitBranch}
                title="Top Branch Contributors"
                colorClass="bg-green-500"
              />
              <ContributorsList contributors={mockTopContributors} />
            </>
          )}
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <Button
            variant="outline"
            className="border-brand-pink-500/30 text-brand-pink-500 hover:bg-brand-pink-500 rounded-xl px-8 hover:text-white"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Load More
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
