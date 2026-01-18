export interface OverviewStat {
  label: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
}

export interface ReadData {
  date: string;
  reads: number;
  uniqueVisitors: number;
}

export interface TopChapter {
  id: string;
  title: string;
  chapterNumber: number;
  reads: number;
  change: number;
}

export interface FunnelStep {
  label: string;
  value: number;
  percentage: number;
}

export interface RecentActivityItem {
  id: string;
  type: 'read' | 'comment' | 'vote' | 'subscribe' | 'branch';
  user: string;
  action: string;
  target?: string;
  time: string;
}

export interface ReadingProgressData {
  label: string;
  value: number;
  [key: string]: string | number;
}

export interface AnalyticsData {
  overview: {
    totalReads: number;
    totalVotes: number;
    totalComments: number;
    rating: number;
    newSubscribers: number;
    readsChange: number;
    votesChange: number;
    commentsChange: number;
    ratingChange: number;
    subscribersChange: number;
  };
  readsOverTime: ReadData[];
  topChapters: TopChapter[];
  recentActivity: RecentActivityItem[];
  readingProgress: ReadingProgressData[];
  engagementFunnel: FunnelStep[];
}

export type DateRange = '7d' | '30d' | '90d' | '1y' | 'all';
