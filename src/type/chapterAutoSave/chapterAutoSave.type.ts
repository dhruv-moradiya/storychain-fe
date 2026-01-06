enum ChapterAutoautoSaveType {
  UPDATE_CHAPTER = 'update_chapter',
  NEW_CHAPTER = 'new_chapter',
  ROOT_CHAPTER = 'root_chapter',
}

type TautoSaveType = 'update_chapter' | 'new_chapter' | 'root_chapter';

interface IChapterAutoSave {
  _id: string;
  chapterId?: string;
  userId: string;
  content: string;
  title: string;
  lastSavedAt: Date;
  isEnabled: boolean;
  saveCount: number;
  changes?: {
    additionsCount: number;
    deletionsCount: number;
  };
  autoSaveType: TautoSaveType;
  storyId: string;
  parentChapterId?: string;
}

export { ChapterAutoautoSaveType };
export type { IChapterAutoSave, TautoSaveType };
