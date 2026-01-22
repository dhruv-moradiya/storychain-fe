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

// Chapter data returned after conversion
interface IConvertedChapter {
  _id: string;
  title: string;
  content: string;
  storyId: string;
  authorId: string;
  parentChapterId?: string;
  ancestorIds: string[];
  depth: number;
  status: 'pending_approval' | 'published';
  createdAt: string;
  updatedAt: string;
}

interface IConvertAutoSaveToDraftResponse extends IBaseType {
  data: IConvertedChapter;
}

interface IConvertAutoSaveToPublishedResponse extends IBaseType {
  data: IConvertedChapter;
}

export type {
  IEnableAutoSaveResponse,
  IChapterAutoSaveContentResponse,
  IDisableAutoSaveResponse,
  IGetAutoSaveDraftResponse,
  IPublishDraftResponse,
  IConvertedChapter,
  IConvertAutoSaveToDraftResponse,
  IConvertAutoSaveToPublishedResponse,
};
