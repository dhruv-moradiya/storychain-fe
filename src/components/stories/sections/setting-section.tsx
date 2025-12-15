import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/utils';
import { Globe, GitBranch, MessageSquare, Star, ShieldCheck, Lock } from 'lucide-react';
import { useParams } from 'react-router';
import { Switch } from '@/components/ui/switch';
import { useQueryClient } from '@tanstack/react-query';
import type { IStory } from '@/type/story.type';
import StoryNotFound from '@/components/common/story/story-not-found';

// AUTO-FETCH fallback hook (same query key)
import SettingSectionLoading from '@/components/common/story/setting-section-loading';
import { useGetStoryBySlug } from '@/hooks/story/story.queries';

const SettingSection = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  // 1️⃣ Try get cached data
  const cachedStory = queryClient.getQueryData<IStory>(['story_by_slug', slug]);

  // 2️⃣ If not cached, run API
  const { data: fetchedStory, isLoading } = useGetStoryBySlug(slug ?? '', {
    enabled: !cachedStory, // only fetch if no cache
  });

  // 3️⃣ Final story value → cached OR fetched
  const story = cachedStory ?? fetchedStory;

  // ⚠️ KEEP YOUR ORIGINAL COMMENTED CODE (NOT REMOVED)
  //   const { data: story, isLoading } = useGetStoryOverviewBySlug(slug ?? '');
  //   const updateSettings = useUpdateStorySettings();

  // 4️⃣ While fetching (cold load via new tab)
  if (!cachedStory && isLoading) {
    return <SettingSectionLoading />;
  }

  // 5️⃣ If still no story → real Not Found
  if (!story) {
    return <StoryNotFound onCreate={() => {}} />;
  }

  const settings = story.settings;

  const handleUpdate = (key: keyof typeof settings, value: boolean | string) => {
    // ⚠️ KEEP COMMENTED CODE
    // updateSettings.mutate({
    //   slug,
    //   data: { [key]: value },
    // });
  };

  return (
    <motion.section {...fadeIn(0)} className="mx-auto max-w-xl space-y-8 pb-14">
      <h2 className="text-xl font-semibold">Story Settings</h2>

      <motion.div {...fadeIn(0.1)} className="space-y-4">
        <SettingRow
          icon={settings.isPublic ? <Globe size={18} /> : <Lock size={18} />}
          label="Visibility"
          value={settings.isPublic ? 'Public' : 'Private'}
        >
          <Switch
            checked={settings.isPublic}
            onCheckedChange={(v) => handleUpdate('isPublic', v)}
          />
        </SettingRow>

        <SettingRow
          icon={<GitBranch size={18} />}
          label="Branching"
          value={settings.allowBranching ? 'Allowed' : 'Disabled'}
        >
          <Switch
            checked={settings.allowBranching}
            onCheckedChange={(v) => handleUpdate('allowBranching', v)}
          />
        </SettingRow>

        <SettingRow
          icon={<ShieldCheck size={18} />}
          label="Require Contributor Approval"
          value={settings.requireApproval ? 'Enabled' : 'Disabled'}
        >
          <Switch
            checked={settings.requireApproval}
            onCheckedChange={(v) => handleUpdate('requireApproval', v)}
          />
        </SettingRow>

        <SettingRow
          icon={<MessageSquare size={18} />}
          label="Comments"
          value={settings.allowComments ? 'Allowed' : 'Disabled'}
        >
          <Switch
            checked={settings.allowComments}
            onCheckedChange={(v) => handleUpdate('allowComments', v)}
          />
        </SettingRow>

        <SettingRow
          icon={<Star size={18} />}
          label="Voting"
          value={settings.allowVoting ? 'Enabled' : 'Disabled'}
        >
          <Switch
            checked={settings.allowVoting}
            onCheckedChange={(v) => handleUpdate('allowVoting', v)}
          />
        </SettingRow>

        {/* INFO ONLY */}
        <SettingRow
          icon={<Star size={18} />}
          label="Content Rating"
          value={settings.contentRating}
        />

        <SettingRow icon={<GitBranch size={18} />} label="Genre" value={settings.genre} />
      </motion.div>
    </motion.section>
  );
};

const SettingRow = ({
  icon,
  label,
  value,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  children?: React.ReactNode;
}) => (
  <motion.div
    {...fadeIn(0.05)}
    className="bg-muted/40 hover:bg-muted hover:border-foreground/20 flex items-center justify-between rounded-md border px-3 py-2.5 transition-colors"
  >
    <div className="flex items-center gap-3">
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        {icon} {label}
      </div>
      <span className="text-muted-foreground text-xs">({value})</span>
    </div>
    {children}
  </motion.div>
);

export default SettingSection;
