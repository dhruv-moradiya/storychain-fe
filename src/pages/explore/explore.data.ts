import type { ExploreStory, GenreOption, FeaturedStory } from './explore.types';

// Demo data for the explore cards
export const DEMO_STORIES: ExploreStory[] = [
  {
    id: '1',
    title: 'Whispers Beneath the Floorboards',
    description: 'A quiet house hides a darker secret beneath…',
    cardImage: 'https://i.pinimg.com/1200x/4a/4d/40/4a4d40e89be1beed34fc6e7b6530edba.jpg',
    creator: {
      username: 'ghostwriter',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    genres: ['horror', 'mystery'],
    contentRating: 'mature',
    tags: ['Suspense', 'Haunted', 'Thriller'],
    stats: { totalReads: 1420, totalVotes: 89 },
  },
  {
    id: '2',
    title: 'The Last Summer',
    description: 'A coming-of-age story about friendship and loss',
    cardImage: 'https://i.pinimg.com/736x/99/ed/f5/99edf5659cf09824caac1310484ecfea.jpg',
    creator: {
      username: 'summerwriter',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    genres: ['drama', 'romance'],
    contentRating: 'teen',
    tags: ['Coming of Age', 'Summer', 'Friendship'],
    stats: { totalReads: 2340, totalVotes: 156 },
  },
  {
    id: '3',
    title: 'Starlight Chronicles',
    description: 'An epic space adventure across galaxies',
    cardImage: 'https://i.pinimg.com/1200x/fb/4d/7e/fb4d7eb0eb96cb428f0e07b1999906aa.jpg',
    creator: {
      username: 'cosmicpen',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    genres: ['sci_fi', 'adventure'],
    contentRating: 'general',
    tags: ['Space', 'Action', 'Heroes'],
    stats: { totalReads: 5670, totalVotes: 342 },
  },
  {
    id: '4',
    title: 'Moonlit Shadows',
    description: 'When darkness falls, secrets emerge from the shadows',
    cardImage: 'https://i.pinimg.com/736x/8a/5c/3e/8a5c3e2b8f9d4c1a2b3c4d5e6f7a8b9c.jpg',
    creator: {
      username: 'nightscribe',
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
    genres: ['fantasy', 'mystery'],
    contentRating: 'teen',
    tags: ['Magic', 'Dark Fantasy', 'Mystery'],
    stats: { totalReads: 3210, totalVotes: 201 },
  },
  {
    id: '5',
    title: 'Heart of the Storm',
    description: 'Two souls meet in the eye of chaos',
    cardImage: 'https://i.pinimg.com/736x/1b/2c/3d/1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e.jpg',
    creator: {
      username: 'stormchaser',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    genres: ['romance', 'drama'],
    contentRating: 'mature',
    tags: ['Romance', 'Drama', 'Passion'],
    stats: { totalReads: 4560, totalVotes: 289 },
  },
];

export const GENRE_OPTIONS: GenreOption[] = [
  { id: 'all', label: 'All Genres' },
  { id: 'fantasy', label: 'Fantasy', count: 234 },
  { id: 'sci_fi', label: 'Sci-Fi', count: 189 },
  { id: 'romance', label: 'Romance', count: 312 },
  { id: 'mystery', label: 'Mystery', count: 156 },
  { id: 'horror', label: 'Horror', count: 98 },
  { id: 'adventure', label: 'Adventure', count: 201 },
  { id: 'drama', label: 'Drama', count: 167 },
];

// Featured story for Netflix-style hero banner
export const FEATURED_STORY: FeaturedStory = {
  id: 'featured-1',
  title: 'The Eternal Kingdom',
  tagline: 'Where legends are born and empires fall',
  description:
    'In a world where magic flows through ancient bloodlines, a young orphan discovers she holds the key to an empire salvation or its destruction. As war looms on the horizon, she must choose between the family she never knew and the friends who became her home.',
  bannerImage: 'https://i.pinimg.com/1200x/fb/4d/7e/fb4d7eb0eb96cb428f0e07b1999906aa.jpg',
  creator: {
    username: 'epicwriter',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  genres: ['fantasy', 'adventure', 'drama'],
  contentRating: 'teen',
  stats: {
    totalReads: 125000,
    totalVotes: 8900,
    chapters: 47,
    rating: 4.8,
  },
  badges: ['Editors Pick', 'Trending', 'Top 10'],
};
