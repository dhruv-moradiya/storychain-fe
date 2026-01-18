import { GitBranch, ShieldCheck, MessageSquare, Star, Users } from 'lucide-react';
import { SettingCard, ToggleRow } from './setting-components';
import type { SettingTabProps } from './setting-section.types';

export function CollaborationTab({ settings, onSettingUpdate }: SettingTabProps) {
  return (
    <div className="space-y-4">
      {/* Contribution Settings */}
      <SettingCard
        title="Contribution Settings"
        description="Control how others can contribute to your story"
      >
        <ToggleRow
          icon={<GitBranch size={18} />}
          label="Allow Branching"
          description={
            settings.allowBranching
              ? 'Readers can create alternate story branches'
              : 'Only linear storyline allowed'
          }
          checked={settings.allowBranching}
          onChange={(v) => onSettingUpdate('allowBranching', v)}
        />

        <ToggleRow
          icon={<ShieldCheck size={18} />}
          label="Require Approval"
          description={
            settings.requireApproval
              ? 'New chapter submissions require owner/co-author approval'
              : 'Contributions are auto-published'
          }
          checked={settings.requireApproval}
          onChange={(v) => onSettingUpdate('requireApproval', v)}
        />
      </SettingCard>

      {/* Community Settings */}
      <SettingCard
        title="Community Features"
        description="Enable or disable community interactions"
      >
        <ToggleRow
          icon={<MessageSquare size={18} />}
          label="Allow Comments"
          description={
            settings.allowComments
              ? 'Readers can leave comments on chapters'
              : 'Comments are disabled'
          }
          checked={settings.allowComments}
          onChange={(v) => onSettingUpdate('allowComments', v)}
        />

        <ToggleRow
          icon={<Star size={18} />}
          label="Enable Voting"
          description={
            settings.allowVoting
              ? 'Readers can upvote/downvote chapters and PRs'
              : 'Voting is disabled'
          }
          checked={settings.allowVoting}
          onChange={(v) => onSettingUpdate('allowVoting', v)}
        />
      </SettingCard>

      {/* Collaborators Info */}
      <SettingCard title="Team Management">
        <div className="flex items-center gap-3 px-5 py-3">
          <div className="bg-brand-pink-500/10 flex h-9 w-9 items-center justify-center rounded-lg">
            <Users size={18} className="text-brand-pink-500" />
          </div>
          <div className="flex-1">
            <p className="text-text-primary text-sm font-medium">Manage Collaborators</p>
            <p className="text-text-secondary-65 text-xs">
              Add or remove team members from the Collaborators tab
            </p>
          </div>
          <a
            href="#collaborators"
            className="bg-brand-pink-500/10 text-brand-pink-500 hover:bg-brand-pink-500/20 rounded-lg px-3 py-1.5 text-sm font-medium transition"
          >
            View Team
          </a>
        </div>
      </SettingCard>
    </div>
  );
}
