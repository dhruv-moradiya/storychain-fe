interface IEnableAutoSaveRequest {
  userId: string;
  draftId?: string;
  chapterId?: string;
}

interface IAutoSaveContentRequest {
  userId: string;
  title: string;
  content: string;
  draftId?: string;
  chapterId?: string;
}

interface IDisableAutoSaveRequest {
  userId: string;
  draftId?: string;
  chapterId?: string;
}

export type { IEnableAutoSaveRequest, IAutoSaveContentRequest, IDisableAutoSaveRequest };
