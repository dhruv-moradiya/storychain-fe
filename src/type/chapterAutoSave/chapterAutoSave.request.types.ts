interface IEnableAutoSaveRequest {
  userId: string;
  draftId?: string;
  chapterId?: string;
}

interface IDisableAutoSaveRequest {
  autoSaveId: string;
}

type TAutoSaveContentRootChapter = {
  title: string;
  content: string;
  autoSaveType: 'root_chapter';
  storySlug?: string; // Optional when updating existing draft (autoSaveId provided)
  autoSaveId?: string;
};

type TAutoSaveContentNewChapter = {
  title: string;
  content: string;
  autoSaveType: 'new_chapter';
  storySlug?: string; // Optional when updating existing draft (autoSaveId provided)
  parentChapterId: string;
  autoSaveId?: string;
};

type TAutoSaveContentUpdateChapter = {
  title: string;
  content: string;
  autoSaveType: 'update_chapter';
  storySlug?: string; // Optional when updating existing draft (autoSaveId provided)
  parentChapterId: string;
  chapterId: string;
  autoSaveId?: string;
};

type TAutoSaveContentRequest =
  | TAutoSaveContentRootChapter
  | TAutoSaveContentNewChapter
  | TAutoSaveContentUpdateChapter;

export type {
  IEnableAutoSaveRequest,
  IDisableAutoSaveRequest,
  TAutoSaveContentRequest,
  TAutoSaveContentRootChapter,
  TAutoSaveContentNewChapter,
  TAutoSaveContentUpdateChapter,
};
