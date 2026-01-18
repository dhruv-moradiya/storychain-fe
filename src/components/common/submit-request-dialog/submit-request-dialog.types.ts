import type { PRType, PRLabel } from '@/type/pull-request.type';
import { Plus, FileEdit, Trash2 } from 'lucide-react';

// Props for the main dialog
export interface SubmitRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: PRFormData) => void;
  // Context props (from story builder) - when provided, skip story/chapter selection
  storyId?: string;
  storyTitle?: string;
  storySlug?: string;
  parentChapterId?: string;
  parentChapterTitle?: string;
  // Draft context (from story builder)
  draftId?: string;
  draftTitle?: string;
  draftContent?: string;
  // Pre-selected PR type
  prType?: PRType;
}

// Form data structure
export interface PRFormData {
  title: string;
  description: string;
  prType: PRType;
  storyId: string;
  storyTitle: string;
  storySlug: string;
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
  slug: string;
  genre: string;
  chapterCount: number;
}

export interface ChapterOption {
  id: string;
  title: string;
  order: number;
  content?: string;
}

// Draft option for selection
export interface DraftOption {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  wordCount: number;
  storySlug?: string;
  parentChapterId?: string;
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

// Default form data factory
export const getDefaultFormData = (props?: Partial<SubmitRequestDialogProps>): PRFormData => ({
  title: '',
  description: '',
  prType: props?.prType || 'NEW_CHAPTER',
  storyId: props?.storyId || '',
  storyTitle: props?.storyTitle || '',
  storySlug: props?.storySlug || '',
  chapterId: '',
  parentChapterId: props?.parentChapterId || '',
  parentChapterTitle: props?.parentChapterTitle || '',
  draftId: props?.draftId || '',
  draftTitle: props?.draftTitle || '',
  draftContent: props?.draftContent || '',
  proposedContent: '',
  labels: [],
  isDraft: false,
  autoApproveEnabled: true,
});

// Step names based on context
export const getStepNames = (hasContext: boolean): string[] => {
  if (hasContext) {
    return ['Type', 'Details', 'Preview', 'Review'];
  }
  return ['Type', 'Select', 'Details', 'Preview', 'Review'];
};

// Determine if we have enough context to skip selection step
export const hasFullContext = (props: Partial<SubmitRequestDialogProps>): boolean => {
  return Boolean(props.storyId && props.storyTitle);
};
