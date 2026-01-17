// Types for Explore page

export interface StoryCreator {
  username: string;
  avatar?: string;
}

export interface StoryStats {
  totalReads: number;
  totalVotes: number;
}

export interface ExploreStory {
  id: string;
  title: string;
  description: string;
  cardImage: string;
  creator: StoryCreator;
  genres: string[];
  contentRating: string;
  tags: string[];
  stats: StoryStats;
}

export interface GenreOption {
  id: string;
  label: string;
  icon?: string;
  count?: number;
}

export type SortOption = 'trending' | 'top-rated' | 'newest' | 'most-read';

export interface ExploreFilters {
  genre?: string;
  contentRating?: string;
  sort: SortOption;
  search?: string;
}

// Featured story for Netflix-style hero
export interface FeaturedStory {
  id: string;
  title: string;
  tagline: string;
  description: string;
  bannerImage: string;
  logoImage?: string;
  creator: StoryCreator;
  genres: string[];
  contentRating: string;
  stats: StoryStats & {
    chapters: number;
    rating: number;
  };
  badges?: string[];
}
