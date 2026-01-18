import { motion } from 'motion/react';
import type {
  StepProps,
  StoryOption,
  ChapterOption,
  DraftOption,
} from '../submit-request-dialog.types';
import { SelectionSection } from '../components/selection-section';
import { DraftSelection } from '../components/draft-selection';
import { StorySelection } from '../components/story-selection';
import { ChapterSelection } from '../components/chapter-selection';

type SelectionStep = 'draft' | 'story' | 'chapter';

interface StorySelectionStepProps extends StepProps {
  stories: StoryOption[];
  chapters: ChapterOption[];
  drafts: DraftOption[];
  isLoadingStories?: boolean;
  isLoadingChapters?: boolean;
  isLoadingDrafts?: boolean;
  onStorySelect: (storyId: string) => void;
  onChapterSelect: (chapterId: string) => void;
  onDraftSelect: (draftId: string) => void;
}

export function StorySelectionStep({
  formData,
  onUpdate,
  stories,
  chapters,
  drafts,
  isLoadingStories,
  isLoadingChapters,
  isLoadingDrafts,
  onStorySelect,
  onChapterSelect,
  onDraftSelect,
}: StorySelectionStepProps) {
  const isNewChapter = formData.prType === 'NEW_CHAPTER';
  const isEditChapter = formData.prType === 'EDIT_CHAPTER';
  const needsDraft = isNewChapter || isEditChapter;

  // Determine current active step
  const getCurrentStep = (): SelectionStep => {
    if (needsDraft) {
      if (!formData.draftId) return 'draft';
      if (!formData.storyId) return 'story';
      return 'chapter';
    } else {
      if (!formData.storyId) return 'story';
      return 'chapter';
    }
  };

  const currentStep = getCurrentStep();

  // Get selected items for display
  const selectedDraft = drafts.find((d) => d.id === formData.draftId);
  const selectedStory = stories.find((s) => s.id === formData.storyId);

  // Calculate step numbers
  const getStepNumber = (step: SelectionStep): number => {
    if (needsDraft) {
      return step === 'draft' ? 1 : step === 'story' ? 2 : 3;
    }
    return step === 'story' ? 1 : 2;
  };

  return (
    <motion.div
      key="story-selection"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.15 }}
      className="space-y-3"
    >
      {/* Draft Selection (for NEW_CHAPTER and EDIT_CHAPTER) */}
      {needsDraft && (
        <SelectionSection
          stepNumber={getStepNumber('draft')}
          title="Select Draft"
          isActive={currentStep === 'draft'}
          isCompleted={Boolean(formData.draftId)}
          selectedLabel={selectedDraft?.title}
          onEdit={() =>
            onUpdate({
              draftId: '',
              draftTitle: '',
              draftContent: '',
              storyId: '',
              storyTitle: '',
              storySlug: '',
              parentChapterId: '',
              parentChapterTitle: '',
            })
          }
        >
          <DraftSelection
            drafts={drafts}
            selectedDraftId={formData.draftId}
            onSelect={onDraftSelect}
            isLoading={isLoadingDrafts}
          />
        </SelectionSection>
      )}

      {/* Story Selection */}
      <SelectionSection
        stepNumber={getStepNumber('story')}
        title="Select Story"
        isActive={currentStep === 'story'}
        isCompleted={Boolean(formData.storyId)}
        isDisabled={needsDraft && !formData.draftId}
        selectedLabel={selectedStory?.title}
        onEdit={() =>
          onUpdate({
            storyId: '',
            storyTitle: '',
            storySlug: '',
            parentChapterId: '',
            parentChapterTitle: '',
          })
        }
      >
        <StorySelection
          stories={stories}
          selectedStoryId={formData.storyId}
          onSelect={onStorySelect}
          isLoading={isLoadingStories}
        />
      </SelectionSection>

      {/* Chapter Selection */}
      <SelectionSection
        stepNumber={getStepNumber('chapter')}
        title={isNewChapter ? 'Insert After Chapter' : 'Select Chapter'}
        isActive={currentStep === 'chapter'}
        isCompleted={Boolean(formData.parentChapterId)}
        isDisabled={!formData.storyId}
        selectedLabel={formData.parentChapterTitle}
        onEdit={() =>
          onUpdate({
            parentChapterId: '',
            parentChapterTitle: '',
          })
        }
      >
        <ChapterSelection
          chapters={chapters}
          selectedChapterId={formData.parentChapterId}
          onSelect={onChapterSelect}
          showRootOption={isNewChapter}
          isLoading={isLoadingChapters}
        />
      </SelectionSection>
    </motion.div>
  );
}
