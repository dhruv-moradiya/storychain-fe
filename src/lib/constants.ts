export const BADGES = {
  // Story creation badges
  STORY_STARTER: {
    id: 'STORY_STARTER',
    name: 'Story Starter',
    description: 'Created your first story',
    icon: '📖',
    requirement: 'Create 1 story',
    threshold: 1,
  },
  PROLIFIC_CREATOR: {
    id: 'PROLIFIC_CREATOR',
    name: 'Prolific Creator',
    description: 'Created 10 stories',
    icon: '📚',
    requirement: 'Create 10 stories',
    threshold: 10,
  },
  STORY_MASTER: {
    id: 'STORY_MASTER',
    name: 'Story Master',
    description: 'Created 50 stories',
    icon: '🏆',
    requirement: 'Create 50 stories',
    threshold: 50,
  },

  // Chapter badges
  BRANCH_CREATOR: {
    id: 'BRANCH_CREATOR',
    name: 'Branch Creator',
    description: 'Created 10 chapter branches',
    icon: '🌿',
    requirement: 'Create 10 branches',
    threshold: 10,
  },
  TOP_CONTRIBUTOR: {
    id: 'TOP_CONTRIBUTOR',
    name: 'Top Contributor',
    description: 'Written 50 chapters',
    icon: '✍️',
    requirement: 'Write 50 chapters',
    threshold: 50,
  },
  PROLIFIC_WRITER: {
    id: 'PROLIFIC_WRITER',
    name: 'Prolific Writer',
    description: 'Written 100 chapters',
    icon: '📝',
    requirement: 'Write 100 chapters',
    threshold: 100,
  },

  // Quality badges
  MOST_UPVOTED: {
    id: 'MOST_UPVOTED',
    name: 'Most Upvoted',
    description: 'Received 100 upvotes on a single chapter',
    icon: '👍',
    requirement: '100 upvotes on one chapter',
    threshold: 100,
  },
  TRENDING_AUTHOR: {
    id: 'TRENDING_AUTHOR',
    name: 'Trending Author',
    description: 'Had a story in top 10 trending',
    icon: '🔥',
    requirement: 'Reach top 10 trending',
    threshold: 1,
  },
  COMMUNITY_FAVORITE: {
    id: 'COMMUNITY_FAVORITE',
    name: 'Community Favorite',
    description: 'Received 1000+ total upvotes',
    icon: '⭐',
    requirement: '1000 total upvotes',
    threshold: 1000,
  },

  // Collaboration badges
  COLLABORATIVE: {
    id: 'COLLABORATIVE',
    name: 'Collaborative',
    description: 'Contributed to 10 different stories',
    icon: '🤝',
    requirement: 'Contribute to 10 stories',
    threshold: 10,
  },
  TEAM_PLAYER: {
    id: 'TEAM_PLAYER',
    name: 'Team Player',
    description: 'Contributed to 25 different stories',
    icon: '👥',
    requirement: 'Contribute to 25 stories',
    threshold: 25,
  },

  // PR system badges
  QUALITY_CURATOR: {
    id: 'QUALITY_CURATOR',
    name: 'Quality Curator',
    description: 'Had 10 PRs approved',
    icon: '✅',
    requirement: '10 approved PRs',
    threshold: 10,
  },
  TRUSTED_CONTRIBUTOR: {
    id: 'TRUSTED_CONTRIBUTOR',
    name: 'Trusted Contributor',
    description: 'Had 25 PRs approved',
    icon: '🎖️',
    requirement: '25 approved PRs',
    threshold: 25,
  },

  // Community badges
  VETERAN_WRITER: {
    id: 'VETERAN_WRITER',
    name: 'Veteran Writer',
    description: 'Active for 1 year',
    icon: '🗓️',
    requirement: '1 year active',
    threshold: 365,
  },
  COMMENTATOR: {
    id: 'COMMENTATOR',
    name: 'Commentator',
    description: 'Left 100 comments',
    icon: '💬',
    requirement: '100 comments',
    threshold: 100,
  },
  SOCIAL_BUTTERFLY: {
    id: 'SOCIAL_BUTTERFLY',
    name: 'Social Butterfly',
    description: 'Following 50 users',
    icon: '🦋',
    requirement: 'Follow 50 users',
    threshold: 50,
  },
  POPULAR: {
    id: 'POPULAR',
    name: 'Popular',
    description: 'Have 100 followers',
    icon: '🌟',
    requirement: '100 followers',
    threshold: 100,
  },

  // Reading badges
  BOOKWORM: {
    id: 'BOOKWORM',
    name: 'Bookworm',
    description: 'Read 100 chapters',
    icon: '🐛',
    requirement: 'Read 100 chapters',
    threshold: 100,
  },
  VORACIOUS_READER: {
    id: 'VORACIOUS_READER',
    name: 'Voracious Reader',
    description: 'Read 500 chapters',
    icon: '📚',
    requirement: 'Read 500 chapters',
    threshold: 500,
  },
} as const;

export const LEVEL_THRESHOLDS = [
  { level: 1, minXP: 0, maxXP: 99, title: 'Beginner' },
  { level: 2, minXP: 100, maxXP: 299, title: 'Writer' },
  { level: 3, minXP: 300, maxXP: 599, title: 'Author' },
  { level: 4, minXP: 600, maxXP: 999, title: 'Storyteller' },
  { level: 5, minXP: 1000, maxXP: 1999, title: 'Master' },
  { level: 6, minXP: 2000, maxXP: 3499, title: 'Wordsmith' },
  { level: 7, minXP: 3500, maxXP: 5499, title: 'Legendary Author' },
  { level: 8, minXP: 5500, maxXP: 8499, title: 'Epic Narrator' },
  { level: 9, minXP: 8500, maxXP: 12499, title: 'Mythweaver' },
  { level: 10, minXP: 12500, maxXP: Infinity, title: 'Grandmaster' },
] as const;
