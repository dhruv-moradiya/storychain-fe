import {
  UserProfileAchievements,
  UserProfileActivity,
  UserProfileBio,
  UserProfileHeader,
  UserProfileStats,
  UserProfileStories,
} from '@/components/user-profile';
import { motion } from 'framer-motion';

// Static mock user data
const mockUser = {
  id: 'user_123',
  username: 'fantasy_writer',
  fullName: 'Elena Martinez',
  email: 'elena.martinez@example.com',
  avatarUrl: 'https://i.pinimg.com/736x/4c/ab/77/4cab77de6b83b7e3149ce03867194ea5.jpg',
  coverUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200',
  bio: 'Passionate storyteller crafting epic fantasy worlds. Creator of the Chronicles of Eldoria series. Always looking for fellow writers to collaborate with on new adventures.',
  location: 'San Francisco, CA',
  website: 'https://elenawritesfantasy.com',
  joinedAt: new Date('2023-06-15'),
  isVerified: true,
  isPro: true,
  stats: {
    stories: 12,
    chapters: 156,
    words: 485000,
    followers: 2847,
    following: 189,
    totalReads: 125000,
    totalLikes: 8934,
    avgRating: 4.7,
  },
  badges: [
    { id: '1', name: 'Story Legend', rarity: 'legendary' as const },
    { id: '2', name: 'On Fire', rarity: 'epic' as const },
    { id: '3', name: 'Wordsmith', rarity: 'rare' as const },
    { id: '4', name: 'First Story', rarity: 'common' as const },
  ],
  featuredStories: [
    {
      id: '1',
      title: 'Chronicles of Eldoria',
      slug: 'chronicles-of-eldoria',
      coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400',
      genre: 'Fantasy',
      rating: 4.8,
      reads: 45000,
      chapters: 47,
    },
    {
      id: '2',
      title: 'The Shadow Realm',
      slug: 'the-shadow-realm',
      coverUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400',
      genre: 'Dark Fantasy',
      rating: 4.6,
      reads: 32000,
      chapters: 35,
    },
    {
      id: '3',
      title: 'Starfall Academy',
      slug: 'starfall-academy',
      coverUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400',
      genre: 'Sci-Fi',
      rating: 4.5,
      reads: 28000,
      chapters: 28,
    },
  ],
  recentActivity: [
    {
      type: 'chapter',
      title: 'Published Chapter 47: The Final Confrontation',
      date: new Date('2024-01-08'),
    },
    { type: 'story', title: 'Started a new story: The Lost Kingdom', date: new Date('2024-01-05') },
    { type: 'badge', title: 'Earned "Story Legend" badge', date: new Date('2024-01-03') },
    {
      type: 'collab',
      title: 'Joined "The Dragon\'s Legacy" as co-author',
      date: new Date('2024-01-01'),
    },
  ],
  socialLinks: {
    twitter: 'fantasy_elena',
    instagram: 'elenawritesfantasy',
  },
};

export default function UserProfilePage() {
  // const { userId } = useParams<{ userId: string }>();

  // In real implementation, fetch user by userId
  const user = mockUser;

  return (
    <div className="bg-bg-cream min-h-screen">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-16">
        {/* Header with cover image and avatar */}
        <UserProfileHeader user={user} />

        {/* Main content */}
        <div className="mx-auto mt-8 max-w-5xl px-4 sm:px-6">
          {/* Stats Row */}
          <UserProfileStats stats={user.stats} />

          {/* Two Column Layout */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left column - Bio and achievements */}
            <div className="space-y-6 lg:col-span-4">
              <UserProfileBio user={user} />
              <UserProfileAchievements badges={user.badges} />
            </div>

            {/* Right column - Stories and activity */}
            <div className="space-y-6 lg:col-span-8">
              <UserProfileStories stories={user.featuredStories} username={user.username} />
              <UserProfileActivity activities={user.recentActivity} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
