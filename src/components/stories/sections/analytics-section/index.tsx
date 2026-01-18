import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router';
import { BarChart3, Download, ChevronDown, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  OverviewStats,
  ReadsChart,
  TopChapters,
  RecentActivity,
  ReadingProgress,
  EngagementFunnel,
} from './components';
import { mockAnalyticsData } from './analytics.data';
import type { DateRange } from './analytics.types';

const dateRangeOptions: { value: DateRange; label: string }[] = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: '1y', label: 'Last year' },
  { value: 'all', label: 'All time' },
];

const AnalyticsSection = () => {
  const { slug } = useParams();
  const [dateRange, setDateRange] = useState<DateRange>('7d');

  // In a real app, this would fetch data based on dateRange
  const data = mockAnalyticsData;

  const handleExport = () => {
    // Export analytics data (mock)
    console.log('Exporting analytics for:', slug, dateRange);
  };

  const selectedDateRange = dateRangeOptions.find((opt) => opt.value === dateRange);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-5xl space-y-5 px-3 pb-14 sm:px-4"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-brand-pink-500/10 flex h-10 w-10 items-center justify-center rounded-xl">
            <BarChart3 className="text-brand-pink-500 h-5 w-5" />
          </div>
          <div>
            <h1 className="text-text-primary text-xl font-semibold">Analytics</h1>
            <p className="text-text-secondary-65 text-sm">Track your story's performance</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Date Range Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-border/50 bg-cream-95 hover:bg-cream-90 gap-2"
              >
                <Calendar className="text-text-secondary-65 h-3.5 w-3.5" />
                {selectedDateRange?.label}
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-cream-95">
              {dateRangeOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setDateRange(option.value)}
                  className={
                    dateRange === option.value ? 'bg-brand-pink-500/10 text-brand-pink-500' : ''
                  }
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Export Button */}
          <Button
            variant="outline"
            size="sm"
            className="border-border/50 bg-cream-95 hover:bg-cream-90 gap-2"
            onClick={handleExport}
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <OverviewStats data={data.overview} />

      {/* Reads Over Time Chart */}
      <ReadsChart data={data.readsOverTime} />

      {/* Three Column Layout: Top Chapters, Recent Activity & Reading Progress */}
      <div className="grid gap-5 lg:grid-cols-3">
        <TopChapters chapters={data.topChapters} />
        <RecentActivity activities={data.recentActivity} />
        <ReadingProgress data={data.readingProgress} />
      </div>

      {/* Engagement Funnel */}
      <EngagementFunnel data={data.engagementFunnel} />
    </motion.div>
  );
};

export default AnalyticsSection;
