import { motion } from 'motion/react';
import type { StepProps } from '../create-pr-dialog.types';
import { MOCK_STORIES, MOCK_STORY_CHAPTERS, MOCK_DRAFTS } from '../create-pr-dialog.types';
import { SelectionSection } from '../components/selection-section';
import { DraftSelection } from '../components/draft-selection';
import { StorySelection } from '../components/story-selection';
import { ChapterSelection } from '../components/chapter-selection';

type SelectionStep = 'draft' | 'story' | 'chapter';

export function StorySelectionStep({ formData, onUpdate }: StepProps) {
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

  // Get chapters for selected story
  const selectedStoryChapters = formData.storyId ? MOCK_STORY_CHAPTERS[formData.storyId] || [] : [];

  // Handlers
  const handleDraftSelect = (draftId: string) => {
    const draft = MOCK_DRAFTS.find((d) => d.id === draftId);
    onUpdate({
      draftId,
      draftTitle: draft?.title || '',
      draftContent: draft?.content || '',
    });
  };

  const handleStorySelect = (storyId: string) => {
    const story = MOCK_STORIES.find((s) => s.id === storyId);
    onUpdate({
      storyId,
      storyTitle: story?.title || '',
      parentChapterId: '',
      parentChapterTitle: '',
      chapterId: '',
    });
  };

  const handleChapterSelect = (chapterId: string) => {
    const chapter = selectedStoryChapters.find((c) => c.id === chapterId);
    onUpdate({
      parentChapterId: chapterId,
      parentChapterTitle: chapterId === 'root' ? 'Story Introduction' : chapter?.title || '',
      chapterId: chapterId,
    });
  };

  // Get selected items for display
  const selectedDraft = MOCK_DRAFTS.find((d) => d.id === formData.draftId);
  const selectedStory = MOCK_STORIES.find((s) => s.id === formData.storyId);

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
              parentChapterId: '',
              parentChapterTitle: '',
            })
          }
        >
          <DraftSelection
            drafts={MOCK_DRAFTS}
            selectedDraftId={formData.draftId}
            onSelect={handleDraftSelect}
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
            parentChapterId: '',
            parentChapterTitle: '',
          })
        }
      >
        <StorySelection
          stories={MOCK_STORIES}
          selectedStoryId={formData.storyId}
          onSelect={handleStorySelect}
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
          chapters={selectedStoryChapters}
          selectedChapterId={formData.parentChapterId}
          onSelect={handleChapterSelect}
          showRootOption={isNewChapter}
        />
      </SelectionSection>
    </motion.div>
  );
}
