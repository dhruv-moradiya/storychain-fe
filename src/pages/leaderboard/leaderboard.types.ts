export interface LeaderboardUser {
  id: string;
  rank: number;
  username: string;
  avatarUrl: string;
  displayName: string;
  stats: {
    totalReads: number;
    storiesWritten: number;
    chaptersContributed: number;
    upvotesReceived: number;
  };
  badges: Badge[];
  isCurrentUser?: boolean;
  rankChange: number; // positive = moved up, negative = moved down
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface TopStory {
  id: string;
  rank: number;
  title: string;
  slug: string;
  coverUrl: string;
  author: {
    username: string;
    avatarUrl: string;
  };
  stats: {
    reads: number;
    chapters: number;
    rating: number;
    subscribers: number;
  };
  genre: string;
  rankChange: number;
}

export interface TopContributor {
  id: string;
  rank: number;
  username: string;
  avatarUrl: string;
  contributions: number;
  storiesContributed: number;
  acceptanceRate: number;
  rankChange: number;
}

export type LeaderboardTab = 'writers' | 'stories' | 'contributors';
export type LeaderboardPeriod = 'weekly' | 'monthly' | 'allTime';
