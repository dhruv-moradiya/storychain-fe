import {
  BookOpen,
  PenTool,
  GitBranch,
  Users,
  MessageCircle,
  Share2,
  Trophy,
  Sparkles,
  Layout,
  Eye,
  Bell,
} from 'lucide-react';
import type { Step, Section } from './how-to-use.types';

export const gettingStartedSteps: Step[] = [
  {
    id: 1,
    title: 'Create Your Account',
    description:
      'Sign up with your email or social login. Set up your profile with a username, bio, and avatar to let readers know who you are.',
    icon: Users,
    color: 'text-brand-pink-500',
    bgColor: 'bg-brand-pink-500/10',
  },
  {
    id: 2,
    title: 'Start Your First Story',
    description:
      'Click "New Story" from your dashboard. Give your story a title, description, and choose a genre. Add cover art to make it stand out.',
    icon: BookOpen,
    color: 'text-brand-blue',
    bgColor: 'bg-brand-blue/10',
  },
  {
    id: 3,
    title: 'Write Your First Chapter',
    description:
      'Use our rich text editor to craft your narrative. Add images, format text, and create immersive reading experiences.',
    icon: PenTool,
    color: 'text-brand-orange',
    bgColor: 'bg-brand-orange/10',
  },
  {
    id: 4,
    title: 'Create Branches',
    description:
      'Add decision points in your story where readers can choose different paths. Each choice leads to a new branch of your narrative.',
    icon: GitBranch,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    id: 5,
    title: 'Invite Collaborators',
    description:
      'Share your story with co-authors. They can contribute chapters, create branches, and help expand your story universe.',
    icon: Share2,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    id: 6,
    title: 'Publish & Share',
    description:
      'When ready, publish your story for the world to read. Share it on social media and watch your reader community grow.',
    icon: Sparkles,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
];

export const sections: Section[] = [
  {
    id: 'writing',
    title: 'Writing & Editing',
    subtitle: 'Master the art of interactive storytelling',
    items: [
      {
        title: 'Rich Text Editor',
        description:
          'Our powerful editor supports formatting, images, and more to bring your stories to life.',
        icon: PenTool,
        tips: [
          'Use headings to structure your chapters',
          'Add images to enhance visual storytelling',
          'Use bold and italic for emphasis',
          'Create lists for choices or inventory items',
        ],
      },
      {
        title: 'Branch Management',
        description: 'Create and organize multiple story paths that readers can explore.',
        icon: GitBranch,
        tips: [
          'Plan your branch structure before writing',
          'Use meaningful choice text for decisions',
          'Consider convergent paths for key plot points',
          'Test all branches before publishing',
        ],
      },
      {
        title: 'Auto-Save & Drafts',
        description: 'Never lose your work with automatic saving and draft management.',
        icon: Layout,
        tips: [
          'Work is saved automatically every minute',
          'Access drafts from your dashboard',
          'Compare versions before publishing',
          'Restore previous versions if needed',
        ],
      },
    ],
  },
  {
    id: 'collaboration',
    title: 'Collaboration',
    subtitle: 'Write together with other authors',
    items: [
      {
        title: 'Invite Co-Authors',
        description: 'Share your story and let others contribute to your narrative.',
        icon: Users,
        tips: [
          'Set permissions for each collaborator',
          'Use comments for coordination',
          'Review submissions before merging',
          'Credit all contributors properly',
        ],
      },
      {
        title: 'Submit Requests',
        description: 'Propose changes to stories you follow with our PR-like system.',
        icon: MessageCircle,
        tips: [
          'Write clear descriptions for your submissions',
          'Reference specific chapters or branches',
          'Be open to feedback and revisions',
          'Follow up on pending requests',
        ],
      },
      {
        title: 'Real-Time Updates',
        description: 'See changes as they happen when working with collaborators.',
        icon: Eye,
        tips: [
          'Enable notifications for story updates',
          'Check activity feed regularly',
          'Coordinate writing sessions',
          'Use comments for async communication',
        ],
      },
    ],
  },
  {
    id: 'reading',
    title: 'Reading Experience',
    subtitle: 'Discover and enjoy interactive stories',
    items: [
      {
        title: 'Explore Stories',
        description: 'Browse our library of interactive stories across genres and styles.',
        icon: BookOpen,
        tips: [
          'Filter by genre, length, or popularity',
          'Check ratings and reviews',
          'Follow your favorite authors',
          'Save stories to your reading list',
        ],
      },
      {
        title: 'Track Progress',
        description: 'Your reading progress is saved automatically across all your devices.',
        icon: Layout,
        tips: [
          'Resume where you left off anytime',
          'Explore different branches',
          'Mark favorite paths',
          'Share your journey with friends',
        ],
      },
      {
        title: 'Engage & Interact',
        description: 'Comment, react, and discuss stories with the community.',
        icon: MessageCircle,
        tips: [
          'Leave thoughtful comments',
          'React to memorable moments',
          'Report inappropriate content',
          'Support authors you enjoy',
        ],
      },
    ],
  },
  {
    id: 'profile',
    title: 'Profile & Settings',
    subtitle: 'Customize your StoryChain experience',
    items: [
      {
        title: 'Profile Setup',
        description: 'Create a profile that represents you as a reader and writer.',
        icon: Users,
        tips: [
          'Add a memorable avatar',
          'Write an engaging bio',
          'Link your social accounts',
          'Showcase your best stories',
        ],
      },
      {
        title: 'Notifications',
        description: 'Stay updated on comments, follows, and story updates.',
        icon: Bell,
        tips: [
          'Customize notification preferences',
          'Enable email digests',
          'Set quiet hours',
          'Filter by notification type',
        ],
      },
      {
        title: 'Achievements',
        description: 'Earn badges and track your progress on StoryChain.',
        icon: Trophy,
        tips: [
          'Complete writing challenges',
          'Engage with the community',
          'Reach milestones',
          'Collect rare badges',
        ],
      },
    ],
  },
];

export const proTips = [
  {
    title: 'Plan Your Story Structure',
    description:
      'Before writing, sketch out your main branches and key decision points. This helps maintain consistency across all paths.',
  },
  {
    title: 'Test All Paths',
    description:
      'Read through every branch before publishing. Ensure all paths are complete and make narrative sense.',
  },
  {
    title: 'Engage Your Readers',
    description:
      'Respond to comments, ask for feedback, and involve your community in shaping the story direction.',
  },
  {
    title: 'Use Analytics',
    description:
      'Check your story analytics to see which branches readers prefer and optimize your content accordingly.',
  },
];
