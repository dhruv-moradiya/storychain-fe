import type { IChapterAutoSave } from '.';
import type { IBaseType } from '..';
import type { IStory } from '../story';

interface IEnableAutoSaveResponse extends IBaseType {
  data: {
    _id: string;
    chapterId?: string;
    draftId?: string;
    userId: string;
  };
}

interface IChapterAutoSaveContentResponse extends IBaseType {
  data: {
    _id: string;
    saveCount: number;
  };
}

interface IDisableAutoSaveResponse extends IBaseType {
  data: Record<string, never>;
}

interface IGetAutoSaveDraftResponse extends IBaseType {
  data: IChapterAutoSave[];
}

interface IPublishDraftResponse extends IBaseType {
  data: IStory;
}

export type {
  IEnableAutoSaveResponse,
  IChapterAutoSaveContentResponse,
  IDisableAutoSaveResponse,
  IGetAutoSaveDraftResponse,
  IPublishDraftResponse,
};
