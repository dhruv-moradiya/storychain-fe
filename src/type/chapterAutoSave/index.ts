interface IChapterAutoSave {
  _id: string;
  chapterId?: string;
  draftId?: string;
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
}

export type { IChapterAutoSave };
