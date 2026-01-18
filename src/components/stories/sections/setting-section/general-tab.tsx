import { Globe, Lock, Star, BookOpen } from 'lucide-react';
import { SettingCard, ToggleRow, BadgeRow } from './setting-components';
import type { SettingTabProps } from './setting-section.types';
import { genresBadges, contentRatingBadge } from '@/components/common/badge';

export function GeneralTab({ settings, onSettingUpdate }: SettingTabProps) {
  return (
    <div className="space-y-4">
      {/* Story Info */}
      <SettingCard title="Story Information" description="Basic details about your story">
        <BadgeRow icon={<BookOpen size={18} />} label="Genre">
          {genresBadges(settings.genres, { size: 'sm' })}
        </BadgeRow>
        <BadgeRow icon={<Star size={18} />} label="Content Rating">
          {contentRatingBadge(settings.contentRating, { size: 'sm' })}
        </BadgeRow>
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
