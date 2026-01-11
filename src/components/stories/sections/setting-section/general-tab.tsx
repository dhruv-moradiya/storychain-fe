import { Globe, Lock, Star, BookOpen, Tag } from 'lucide-react';
import { SettingCard, ToggleRow, ReadonlyRow } from './setting-components';
import type { SettingTabProps } from './setting-section.types';

export function GeneralTab({ settings, onSettingUpdate }: SettingTabProps) {
  return (
    <div className="space-y-6">
      {/* Story Info */}
      <SettingCard title="Story Information" description="Basic details about your story">
        <ReadonlyRow
          icon={<BookOpen size={18} />}
          label="Genre"
          value={settings.genre.replace(/_/g, ' ')}
        />
        <ReadonlyRow
          icon={<Star size={18} />}
          label="Content Rating"
          value={settings.contentRating}
        />
        <ReadonlyRow icon={<Tag size={18} />} label="Status" value={'Ongoing'} />
      </SettingCard>

      {/* Visibility */}
      <SettingCard
        title="Visibility & Access"
        description="Control who can see and interact with your story"
      >
        <ToggleRow
          icon={settings.isPublic ? <Globe size={18} /> : <Lock size={18} />}
          label="Public Visibility"
          description={
            settings.isPublic
              ? 'Anyone can find and read your story'
              : 'Only collaborators can access your story'
          }
          checked={settings.isPublic}
          onChange={(v) => onSettingUpdate('isPublic', v)}
        />
      </SettingCard>
    </div>
  );
}
