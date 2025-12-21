import type { IChapterAutoSave } from '.';
import type { IBaseType } from '..';

interface IEnableAutoSaveResponse extends IBaseType {
  data: {
    _id: string;
    chapterId?: string;
    draftId?: string;
    userId: string;
  };
}

interface IChapterAutoSaveContentResponse extends IBaseType {
  data: Record<string, never>;
}

interface IDisableAutoSaveResponse extends IBaseType {
  data: Record<string, never>;
}

interface IGetAutoSaveDraftResponse extends IBaseType {
  data: IChapterAutoSave[];
}

export type {
  IEnableAutoSaveResponse,
  IChapterAutoSaveContentResponse,
  IDisableAutoSaveResponse,
  IGetAutoSaveDraftResponse,
};
