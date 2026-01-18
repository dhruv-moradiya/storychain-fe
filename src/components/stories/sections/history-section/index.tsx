import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion } from 'framer-motion';
import { Filter, History, Search } from 'lucide-react';
import { useState } from 'react';
import { HistoryEventCard } from './history-event-card';
import type { HistoryFilter, HistoryGroup } from './history-section.types';

// Static mock data
const mockHistory: HistoryGroup[] = [
  {
    label: 'Today',
    events: [
      {
        id: '1',
        type: 'chapter_published',
        title: 'Published Chapter 47',
        description: '"The Final Confrontation"',
        user: {
          username: 'fantasy_writer',
          avatarUrl: 'https://i.pinimg.com/736x/4c/ab/77/4cab77de6b83b7e3149ce03867194ea5.jpg',
        },
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        link: { label: 'View Chapter', href: '#' },
      },
      {
        id: '2',
        type: 'pr_approved',
        title: 'Approved PR #156',
        description: '"The Dragon\'s Revelation"',
        user: {
          username: 'editor_pro',
          avatarUrl: 'https://i.pinimg.com/474x/33/fb/eb/33fbeb45315109aa81ed6a7d1551552c.jpg',
        },
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        link: { label: 'View PR', href: '#' },
      },
      {
        id: '3',
        type: 'comment',
        title: 'Commented on Chapter 46',
        description: '"The betrayal scene was heartbreaking!"',
        user: {
          username: 'mystery_lover',
          avatarUrl: 'https://i.pravatar.cc/150?u=mystery',
        },
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        link: { label: 'View Comment', href: '#' },
      },
    ],
  },
  {
    label: 'Yesterday',
    events: [
      {
        id: '4',
        type: 'pr_merged',
        title: 'Merged PR #155',
        description: '"Timeline Fix for Chapter 8"',
        user: {
          username: 'fantasy_writer',
          avatarUrl: 'https://i.pinimg.com/736x/4c/ab/77/4cab77de6b83b7e3149ce03867194ea5.jpg',
        },
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        link: { label: 'View PR', href: '#' },
      },
      {
        id: '5',
        type: 'collaborator_added',
        title: 'Added @new_mod as Moderator',
        user: {
          username: 'story_owner',
          avatarUrl: 'https://i.pravatar.cc/150?u=owner',
        },
        timestamp: new Date(Date.now() - 28 * 60 * 60 * 1000),
      },
      {
        id: '6',
        type: 'pr_submitted',
        title: 'Submitted PR #156',
        description: '"The Dragon\'s Revelation" - NEW CHAPTER',
        user: {
          username: 'contributor_1',
          avatarUrl: 'https://i.pravatar.cc/150?u=contrib1',
        },
        timestamp: new Date(Date.now() - 32 * 60 * 60 * 1000),
        link: { label: 'View PR', href: '#' },
      },
      {
        id: '7',
        type: 'setting_changed',
        title: 'Changed setting',
        description: '"Allow Branching" → Enabled',
        user: {
          username: 'story_owner',
          avatarUrl: 'https://i.pravatar.cc/150?u=owner',
        },
        timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000),
      },
    ],
  },
  {
    label: 'January 23, 2024',
    events: [
      {
        id: '8',
        type: 'report_resolved',
        title: 'Resolved report on comment',
        description: 'Action: Removed comment for harassment',
        user: {
          username: 'moderator',
          avatarUrl: 'https://i.pravatar.cc/150?u=mod',
        },
        timestamp: new Date('2024-01-23T20:00:00'),
      },
    ],
  },
];

const filterOptions: { value: HistoryFilter; label: string }[] = [
  { value: 'all', label: 'All Activity' },
  { value: 'chapters', label: 'Chapters' },
  { value: 'prs', label: 'Pull Requests' },
  { value: 'comments', label: 'Comments' },
  { value: 'settings', label: 'Settings' },
  { value: 'collaborators', label: 'Collaborators' },
];

const HistorySection = () => {
  const [filter, setFilter] = useState<HistoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // In real app, this would filter based on the filter and search
  const filteredHistory = mockHistory;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto max-w-3xl pb-14"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-brand-pink-500/10 flex h-10 w-10 items-center justify-center rounded-xl">
            <History size={20} className="text-brand-pink-500" />
          </div>
          <div>
            <h2 className="text-text-primary text-2xl font-bold">Activity History</h2>
            <p className="text-text-secondary-65 text-sm">
              Track all changes and activity in your story
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <Select value={filter} onValueChange={(v) => setFilter(v as HistoryFilter)}>
          <SelectTrigger className="border-border/50 bg-cream-90/80 w-full sm:w-44">
            <Filter size={16} className="text-text-secondary-65 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative">
          <Search
            size={16}
            className="text-text-secondary-65 absolute top-1/2 left-3 -translate-y-1/2"
          />
          <Input
            placeholder="Search history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-border/50 bg-cream-90/80 w-full pl-9 sm:w-56"
          />
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="space-y-5">
        {filteredHistory.map((group, groupIndex) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + groupIndex * 0.1 }}
          >
            {/* Group Label */}
            <div className="mb-3 flex items-center gap-3">
              <h3 className="text-text-secondary-65 text-xs font-semibold tracking-wider uppercase">
                {group.label}
              </h3>
              <div className="bg-border/50 h-px flex-1" />
            </div>

            {/* Events */}
            <div className="space-y-1">
              {group.events.map((event, eventIndex) => (
                <HistoryEventCard
                  key={event.id}
                  event={event}
                  index={eventIndex}
                  isLast={eventIndex === group.events.length - 1}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <Button
          variant="outline"
          className="border-brand-pink-500/30 text-brand-pink-500 hover:bg-brand-pink-500/10 gap-2"
        >
          Load More History
        </Button>
      </motion.div>
    </motion.section>
  );
};

export default HistorySection;
export { HistorySection };
