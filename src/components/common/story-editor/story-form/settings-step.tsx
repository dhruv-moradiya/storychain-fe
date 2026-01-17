import { memo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { Globe, Lock, GitBranch, Shield, MessageSquare, ThumbsUp } from 'lucide-react';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

import { CONTENT_RATINGS, type TStoryFormValues } from '@/schema/story.schema';
import { GenrePicker } from './genre-picker';

export const SettingsStep = memo(() => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext<TStoryFormValues>();

  const settings = useWatch({ name: 'settings' });

  const isPublic = settings?.isPublic ?? true;
  const allowBranching = settings?.allowBranching ?? true;
  const requireApproval = settings?.requireApproval ?? false;
  const allowComments = settings?.allowComments ?? true;
  const allowVoting = settings?.allowVoting ?? true;
  const genres = settings?.genres ?? [];
  const contentRating = settings?.contentRating ?? 'general';

  const updateSetting = (key: string, value: unknown) => {
    setValue(`settings.${key}` as keyof TStoryFormValues, value as never, { shouldValidate: true });
  };

  return (
    <div className="space-y-5">
      {/* Genre Multi-Select */}
      <div className="space-y-2">
        <Label className="text-text-primary text-sm font-medium">
          Genres <span className="text-text-secondary-65 font-normal">(up to 5)</span>
        </Label>
        <GenrePicker
          value={genres}
          onChange={(newGenres) => updateSetting('genres', newGenres as typeof genres)}
          maxSelections={5}
          error={errors.settings?.genres?.message}
        />
      </div>

      {/* Content Rating & Visibility */}
      <div className="grid grid-cols-2 gap-4">
        {/* Content Rating Select */}
        <div className="space-y-2">
          <Label className="text-text-primary text-sm font-medium">Content Rating</Label>
          <Select
            value={contentRating}
            onValueChange={(v) => updateSetting('contentRating', v as typeof contentRating)}
          >
            <SelectTrigger className="bg-cream-95/50 focus:border-brand-pink-500 focus:ring-brand-pink-500/20 h-10 border-black/10 focus:bg-white">
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>
            <SelectContent>
              {CONTENT_RATINGS.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  <span>{r.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.settings?.contentRating && (
            <p className="text-xs text-red-500">{errors.settings.contentRating.message}</p>
          )}
        </div>

        {/* Visibility */}
        <div className="space-y-2">
          <Label className="text-text-primary text-sm font-medium">Visibility</Label>
          <Select
            value={isPublic ? 'public' : 'private'}
            onValueChange={(v) => updateSetting('isPublic', v === 'public')}
          >
            <SelectTrigger className="bg-cream-95/50 focus:border-brand-pink-500 focus:ring-brand-pink-500/20 h-10 border-black/10 focus:bg-white">
              <SelectValue placeholder="Visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">
                <div className="flex items-center gap-2">
                  <Globe className="h-3.5 w-3.5" />
                  <span>Public</span>
                </div>
              </SelectItem>
              <SelectItem value="private">
                <div className="flex items-center gap-2">
                  <Lock className="h-3.5 w-3.5" />
                  <span>Private</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Toggle Settings */}
      <div className="space-y-1">
        <Label className="text-text-primary mb-2 block text-sm font-medium">Story Settings</Label>
        <div className="bg-cream-95/30 divide-y divide-black/5 rounded-xl border border-black/10">
          <SettingToggle
            icon={GitBranch}
            label="Allow Branching"
            description="Let readers create alternate story paths"
            checked={allowBranching}
            onCheckedChange={(v) => updateSetting('allowBranching', v)}
          />

          <SettingToggle
            icon={Shield}
            label="Require Approval"
            description="Review contributions before publishing"
            checked={requireApproval}
            onCheckedChange={(v) => updateSetting('requireApproval', v)}
          />

          <SettingToggle
            icon={MessageSquare}
            label="Allow Comments"
            description="Allow readers to discuss chapters"
            checked={allowComments}
            onCheckedChange={(v) => updateSetting('allowComments', v)}
          />

          <SettingToggle
            icon={ThumbsUp}
            label="Allow Voting"
            description="Let readers vote on chapters"
            checked={allowVoting}
            onCheckedChange={(v) => updateSetting('allowVoting', v)}
          />
        </div>
      </div>
    </div>
  );
});

SettingsStep.displayName = 'SettingsStep';

// Setting Toggle Component
type SettingToggleProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

const SettingToggle = memo(
  ({ icon: Icon, label, description, checked, onCheckedChange }: SettingToggleProps) => {
    return (
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
              checked
                ? 'bg-brand-pink-500/10 text-brand-pink-500'
                : 'text-text-secondary-65 bg-black/5'
            )}
          >
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-text-primary text-sm font-medium">{label}</p>
            <p className="text-text-secondary-65 text-xs">{description}</p>
          </div>
        </div>
        <Switch checked={checked} onCheckedChange={onCheckedChange} />
      </div>
    );
  }
);

SettingToggle.displayName = 'SettingToggle';
