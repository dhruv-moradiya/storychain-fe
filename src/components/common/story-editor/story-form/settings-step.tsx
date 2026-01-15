import { memo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

import { type TStoryFormValues } from '@/schema/story.schema';

export const SettingsStep = memo(() => {
  const { setValue } = useFormContext<TStoryFormValues>();

  const visibility = useWatch({ name: 'visibility' });
  const approvalMode = useWatch({ name: 'approvalMode' });
  const branching = useWatch({ name: 'branching' });
  const commentsEnabled = useWatch({ name: 'commentsEnabled' });
  const votingEnabled = useWatch({ name: 'votingEnabled' });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Visibility */}
        <div className="space-y-2">
          <Label className="text-text-primary font-medium">Visibility</Label>
          <Select
            value={visibility}
            onValueChange={(v) => setValue('visibility', v as TStoryFormValues['visibility'])}
          >
            <SelectTrigger className="focus:border-brand-pink-500 focus:ring-brand-pink-500/20 border-black/10 bg-white/50">
              <SelectValue placeholder="Visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Approval Mode */}
        <div className="space-y-2">
          <Label className="text-text-primary font-medium">Contributions</Label>
          <Select
            value={approvalMode}
            onValueChange={(v) => setValue('approvalMode', v as TStoryFormValues['approvalMode'])}
          >
            <SelectTrigger className="focus:border-brand-pink-500 focus:ring-brand-pink-500/20 border-black/10 bg-white/50">
              <SelectValue placeholder="Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open (auto-publish)</SelectItem>
              <SelectItem value="curated">Curated (requires approval)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Toggle Settings */}
      <div className="space-y-3 rounded-xl border border-black/5 bg-black/[0.02] p-4">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-text-primary font-medium">Allow Branching</Label>
            <p className="text-text-secondary-65 text-xs">
              Let readers create alternate story paths
            </p>
          </div>
          <Switch checked={branching} onCheckedChange={(v) => setValue('branching', v)} />
        </div>

        <div className="h-px bg-black/5" />

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-text-primary font-medium">Enable Comments</Label>
            <p className="text-text-secondary-65 text-xs">Allow readers to discuss chapters</p>
          </div>
          <Switch
            checked={commentsEnabled}
            onCheckedChange={(v) => setValue('commentsEnabled', v)}
          />
        </div>

        <div className="h-px bg-black/5" />

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-text-primary font-medium">Enable Voting</Label>
            <p className="text-text-secondary-65 text-xs">Let readers vote on chapters</p>
          </div>
          <Switch checked={votingEnabled} onCheckedChange={(v) => setValue('votingEnabled', v)} />
        </div>
      </div>
    </div>
  );
});

SettingsStep.displayName = 'SettingsStep';
