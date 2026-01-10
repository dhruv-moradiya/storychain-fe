import type { PRType, PRLabel } from '@/type/pull-request.type';
import { Plus, FileEdit, Trash2 } from 'lucide-react';

// Props for the main dialog
export interface CreatePRDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: PRFormData) => void;
  // Context props (from story builder) - when provided, skip story/chapter selection
  storyId?: string;
  storyTitle?: string;
  parentChapterId?: string;
  parentChapterTitle?: string;
}

// Form data structure
export interface PRFormData {
  title: string;
  description: string;
  prType: PRType;
  storyId: string;
  storyTitle: string;
  chapterId: string;
  parentChapterId: string;
  parentChapterTitle: string;
  // For NEW_CHAPTER: selected draft
  draftId: string;
  draftTitle: string;
  draftContent: string;
  proposedContent: string;
  labels: PRLabel[];
  isDraft: boolean;
  autoApproveEnabled: boolean;
}

// Step component props
export interface StepProps {
  formData: PRFormData;
  onUpdate: (updates: Partial<PRFormData>) => void;
}

// PR Type configuration
export interface PRTypeConfig {
  value: PRType;
  label: string;
  description: string;
  icon: React.ElementType;
  colorClass: string;
  bgClass: string;
}

// Story and Chapter types for selection
export interface StoryOption {
  id: string;
  title: string;
  genre: string;
  chapterCount: number;
}

export interface ChapterOption {
  id: string;
  title: string;
  order: number;
  content?: string;
}

// Constants
export const PR_TYPES: PRTypeConfig[] = [
  {
    value: 'NEW_CHAPTER',
    label: 'New Chapter',
    description: 'Add a new chapter to the story',
    icon: Plus,
    colorClass: 'text-[#10b981]',
    bgClass: 'bg-[#10b981]/15',
  },
  {
    value: 'EDIT_CHAPTER',
    label: 'Edit Chapter',
    description: 'Propose changes to an existing chapter',
    icon: FileEdit,
    colorClass: 'text-brand-blue',
    bgClass: 'bg-brand-blue/15',
  },
  {
    value: 'DELETE_CHAPTER',
    label: 'Delete Chapter',
    description: 'Request removal of a chapter',
    icon: Trash2,
    colorClass: 'text-[#ef4444]',
    bgClass: 'bg-[#ef4444]/15',
  },
];

export const LABELS: { value: PRLabel; label: string }[] = [
  { value: 'NEEDS_REVIEW', label: 'Needs Review' },
  { value: 'QUALITY_ISSUE', label: 'Quality Issue' },
  { value: 'GRAMMAR', label: 'Grammar' },
  { value: 'PLOT_HOLE', label: 'Plot Hole' },
  { value: 'GOOD_FIRST_PR', label: 'Good First PR' },
];

// Mock data for stories
export const MOCK_STORIES: StoryOption[] = [
  {
    id: 'story-1',
    title: 'The Adventure Begins',
    genre: 'Fantasy',
    chapterCount: 5,
  },
  {
    id: 'story-2',
    title: 'Mystery at Midnight',
    genre: 'Mystery',
    chapterCount: 8,
  },
  {
    id: 'story-3',
    title: 'Love in Paris',
    genre: 'Romance',
    chapterCount: 12,
  },
  {
    id: 'story-4',
    title: 'The Last Frontier',
    genre: 'Sci-Fi',
    chapterCount: 6,
  },
];

// Mock data for chapters (keyed by story id)
export const MOCK_STORY_CHAPTERS: Record<string, ChapterOption[]> = {
  'story-1': [
    {
      id: 'ch-1-1',
      title: 'Chapter 1: The Beginning',
      order: 1,
      content: 'The sun rose over the mountains as our hero began their journey...',
    },
    {
      id: 'ch-1-2',
      title: 'Chapter 2: The First Challenge',
      order: 2,
      content: 'A mysterious stranger appeared at the crossroads...',
    },
    {
      id: 'ch-1-3',
      title: 'Chapter 3: Allies and Enemies',
      order: 3,
      content: 'In the tavern, alliances were formed and rivalries born...',
    },
    {
      id: 'ch-1-4',
      title: 'Chapter 4: The Dark Forest',
      order: 4,
      content: 'The path led deep into the ancient woods...',
    },
    {
      id: 'ch-1-5',
      title: 'Chapter 5: The Hidden Temple',
      order: 5,
      content: 'At last, the temple stood before them...',
    },
  ],
  'story-2': [
    {
      id: 'ch-2-1',
      title: 'Chapter 1: A Body in the Library',
      order: 1,
      content: 'The scream echoed through the manor at precisely midnight...',
    },
    {
      id: 'ch-2-2',
      title: 'Chapter 2: Gathering Suspects',
      order: 2,
      content: 'Detective Morgan surveyed the room of nervous faces...',
    },
    {
      id: 'ch-2-3',
      title: 'Chapter 3: Hidden Motives',
      order: 3,
      content: 'Everyone in the manor had something to hide...',
    },
    {
      id: 'ch-2-4',
      title: 'Chapter 4: The Missing Clue',
      order: 4,
      content: 'A crucial piece of evidence had vanished...',
    },
    {
      id: 'ch-2-5',
      title: 'Chapter 5: Midnight Confession',
      order: 5,
      content: 'Under the moonlight, secrets began to unravel...',
    },
    {
      id: 'ch-2-6',
      title: 'Chapter 6: The Second Victim',
      order: 6,
      content: 'Another tragedy struck the manor...',
    },
    {
      id: 'ch-2-7',
      title: 'Chapter 7: Closing In',
      order: 7,
      content: 'The pieces of the puzzle finally came together...',
    },
    {
      id: 'ch-2-8',
      title: 'Chapter 8: Justice Served',
      order: 8,
      content: 'The truth, at last, was revealed...',
    },
  ],
  'story-3': [
    {
      id: 'ch-3-1',
      title: 'Chapter 1: Arrival in Paris',
      order: 1,
      content: 'The Eiffel Tower sparkled as Emma stepped off the train...',
    },
    {
      id: 'ch-3-2',
      title: 'Chapter 2: A Chance Meeting',
      order: 2,
      content: 'At the corner cafe, their eyes met...',
    },
    {
      id: 'ch-3-3',
      title: 'Chapter 3: Walking the Seine',
      order: 3,
      content: 'The river reflected a thousand city lights...',
    },
    {
      id: 'ch-3-4',
      title: 'Chapter 4: Misunderstandings',
      order: 4,
      content: 'A simple miscommunication threatened everything...',
    },
    {
      id: 'ch-3-5',
      title: 'Chapter 5: The Art Gallery',
      order: 5,
      content: 'Among the masterpieces, they found each other again...',
    },
    {
      id: 'ch-3-6',
      title: 'Chapter 6: A Letter Unsent',
      order: 6,
      content: 'Words left unspoken hung heavy in the air...',
    },
    {
      id: 'ch-3-7',
      title: 'Chapter 7: The Montmartre Sunset',
      order: 7,
      content: 'From the hilltop, Paris glowed golden...',
    },
    {
      id: 'ch-3-8',
      title: 'Chapter 8: Choosing Love',
      order: 8,
      content: 'Sometimes the heart knows what the mind fears...',
    },
    {
      id: 'ch-3-9',
      title: 'Chapter 9: The Train Station',
      order: 9,
      content: 'A decision that would change everything...',
    },
    {
      id: 'ch-3-10',
      title: 'Chapter 10: Forever Paris',
      order: 10,
      content: 'Some love stories are written in the stars...',
    },
    {
      id: 'ch-3-11',
      title: 'Chapter 11: New Beginnings',
      order: 11,
      content: 'Together, they faced the future...',
    },
    {
      id: 'ch-3-12',
      title: 'Chapter 12: Epilogue',
      order: 12,
      content: 'Years later, they returned to where it all began...',
    },
  ],
  'story-4': [
    {
      id: 'ch-4-1',
      title: 'Chapter 1: Launch Day',
      order: 1,
      content: 'The engines roared as humanity reached for the stars...',
    },
    {
      id: 'ch-4-2',
      title: 'Chapter 2: Into the Void',
      order: 2,
      content: 'Earth became a pale blue dot in the distance...',
    },
    {
      id: 'ch-4-3',
      title: 'Chapter 3: First Contact',
      order: 3,
      content: 'The signal came from beyond the asteroid belt...',
    },
    {
      id: 'ch-4-4',
      title: 'Chapter 4: The Alien World',
      order: 4,
      content: 'Nothing could have prepared them for what they found...',
    },
    {
      id: 'ch-4-5',
      title: 'Chapter 5: Survival',
      order: 5,
      content: 'Cut off from Earth, they had to adapt...',
    },
    {
      id: 'ch-4-6',
      title: 'Chapter 6: A New Home',
      order: 6,
      content: 'Perhaps the last frontier was within themselves...',
    },
  ],
};

// Default form data
export const getDefaultFormData = (
  storyId?: string,
  storyTitle?: string,
  parentChapterId?: string,
  parentChapterTitle?: string
): PRFormData => ({
  title: '',
  description: '',
  prType: 'NEW_CHAPTER',
  storyId: storyId || '',
  storyTitle: storyTitle || '',
  chapterId: '',
  parentChapterId: parentChapterId || '',
  parentChapterTitle: parentChapterTitle || '',
  draftId: '',
  draftTitle: '',
  draftContent: '',
  proposedContent: '',
  labels: [],
  isDraft: false,
  autoApproveEnabled: true,
});

// Draft type for NEW_CHAPTER
export interface DraftOption {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  wordCount: number;
}

// Mock drafts data
export const MOCK_DRAFTS: DraftOption[] = [
  {
    id: 'draft-1',
    title: 'The Hidden Valley',
    content:
      'As the morning mist cleared, the hidden valley revealed itself in all its glory. Mountains surrounded the lush green meadows...',
    updatedAt: '2 hours ago',
    wordCount: 1250,
  },
  {
    id: 'draft-2',
    title: 'Unexpected Encounter',
    content:
      'She never expected to see him again, especially not here, in the middle of nowhere. Their eyes met across the crowded market...',
    updatedAt: '1 day ago',
    wordCount: 890,
  },
  {
    id: 'draft-3',
    title: 'The Secret Door',
    content:
      'Behind the old bookshelf, there was a door that no one had opened in centuries. Dust covered every surface...',
    updatedAt: '3 days ago',
    wordCount: 2100,
  },
];

// Step names
export const getStepNames = (hasContext: boolean): string[] => {
  if (hasContext) {
    return ['Type', 'Details', 'Preview', 'Review'];
  }
  return ['Type', 'Select', 'Details', 'Preview', 'Review'];
};
