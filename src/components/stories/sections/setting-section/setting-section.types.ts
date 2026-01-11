import type { IStorySettings } from '@/type/story.type';

export interface SettingTabProps {
  settings: IStorySettings;
  onSettingUpdate: (key: keyof IStorySettings, value: boolean | string) => void;
}

export interface ImageUploadState {
  preview: string | null;
  uploading: boolean;
}

export type SettingTab = 'general' | 'appearance' | 'collaboration' | 'notifications' | 'danger';
