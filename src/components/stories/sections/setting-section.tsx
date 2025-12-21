import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/utils';
import {
  Globe,
  GitBranch,
  MessageSquare,
  Star,
  ShieldCheck,
  Lock,
  Image,
  Loader2,
  Trash2,
} from 'lucide-react';
import { useParams } from 'react-router';
import { Switch } from '@/components/ui/switch';
import { useQueryClient } from '@tanstack/react-query';
import type { IStory } from '@/type/story.type';
import StoryNotFound from '@/components/common/story/story-not-found';
import SettingSectionLoading from '@/components/common/story/setting-section-loading';
import { useGetStoryBySlug } from '@/hooks/story/story.queries';
import { useState } from 'react';
import { SectionDivider } from '@/components/common/story-editor/section-divider';

/* ---------------------------------------------
 * Main Section
 * --------------------------------------------*/

const SettingSection = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  const [cardUploading, setCardUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [cardPreview, setCardPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const cachedStory = queryClient.getQueryData<IStory>(['story_by_slug', slug]);

  const { data, isLoading } = useGetStoryBySlug(slug ?? '', {
    enabled: !cachedStory,
  });

  const story = cachedStory ?? data;

  if (!cachedStory && isLoading) return <SettingSectionLoading />;
  if (!story) return <StoryNotFound onCreate={() => {}} />;

  const settings = story.settings;

  const handleUpdate = (key: keyof typeof settings, value: boolean | string) => {
    // updateSettings.mutate({ slug, data: { [key]: value } });
  };

  const handleImageUpload = async (file: File, type: 'card' | 'cover') => {
    const preview = URL.createObjectURL(file);

    if (type === 'card') {
      setCardUploading(true);
      setCardPreview(preview);
      setTimeout(() => setCardUploading(false), 1200);
    } else {
      setCoverUploading(true);
      setCoverPreview(preview);
      setTimeout(() => setCoverUploading(false), 1200);
    }
  };

  return (
    <motion.section {...fadeIn(0)} className="mx-auto max-w-xl pb-14">
      <h2 className="mb-6 text-xl font-semibold">Story Settings</h2>

      <SettingCard>
        <ToggleRow
          icon={settings.isPublic ? <Globe size={18} /> : <Lock size={18} />}
          label="Visibility"
          description={settings.isPublic ? 'Public' : 'Private'}
          checked={settings.isPublic}
          onChange={(v) => handleUpdate('isPublic', v)}
        />

        <ToggleRow
          icon={<GitBranch size={18} />}
          label="Branching"
          description={settings.allowBranching ? 'Allowed' : 'Disabled'}
          checked={settings.allowBranching}
          onChange={(v) => handleUpdate('allowBranching', v)}
        />

        <ToggleRow
          icon={<ShieldCheck size={18} />}
          label="Contributor Approval"
          description={settings.requireApproval ? 'Enabled' : 'Disabled'}
          checked={settings.requireApproval}
          onChange={(v) => handleUpdate('requireApproval', v)}
        />

        <ToggleRow
          icon={<MessageSquare size={18} />}
          label="Comments"
          description={settings.allowComments ? 'Allowed' : 'Disabled'}
          checked={settings.allowComments}
          onChange={(v) => handleUpdate('allowComments', v)}
        />

        <ToggleRow
          icon={<Star size={18} />}
          label="Voting"
          description={settings.allowVoting ? 'Enabled' : 'Disabled'}
          checked={settings.allowVoting}
          onChange={(v) => handleUpdate('allowVoting', v)}
        />

        <ReadonlyRow
          icon={<Star size={18} />}
          label="Content Rating"
          value={settings.contentRating}
        />

        <ReadonlyRow icon={<GitBranch size={18} />} label="Genre" value={settings.genre} />

        <ImageRow
          label="Card image"
          hint="192 × 249 portrait"
          aspectClass="aspect-[192/249] w-[192px]"
          preview={cardPreview}
          uploading={cardUploading}
          onSelect={(f) => handleImageUpload(f, 'card')}
          onRemove={() => setCardPreview(null)}
        />

        <ImageRow
          label="Cover image"
          hint="3:1 wide banner"
          aspectClass="aspect-[3/1]"
          preview={coverPreview}
          uploading={coverUploading}
          onSelect={(f) => handleImageUpload(f, 'cover')}
          onRemove={() => setCoverPreview(null)}
        />
      </SettingCard>
    </motion.section>
  );
};

export default SettingSection;

/* ---------------------------------------------
 * UI Building Blocks
 * --------------------------------------------*/

const SettingCard = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    {...fadeIn(0.08)}
    className="bg-background/60 overflow-hidden rounded-xl shadow-sm backdrop-blur"
  >
    <div className="flex flex-col divide-y">{children}</div>
  </motion.div>
);

const BaseRow = ({
  icon,
  label,
  description,
  action,
}: {
  icon: React.ReactNode;
  label: string;
  description?: string;
  action?: React.ReactNode;
}) => (
  <div className="hover:bg-muted/60 flex items-center justify-between gap-4 px-5 py-3 transition">
    <div className="flex items-start gap-3">
      <div className="text-muted-foreground mt-0.5">{icon}</div>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium">{label}</span>
        {description && (
          <span className="text-muted-foreground text-xs leading-tight">{description}</span>
        )}
      </div>
    </div>
    {action}
  </div>
);

const ToggleRow = ({
  icon,
  label,
  description,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) => (
  <BaseRow
    icon={icon}
    label={label}
    description={description}
    action={<Switch checked={checked} onCheckedChange={onChange} />}
  />
);

const ReadonlyRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => <BaseRow icon={icon} label={label} description={value} />;

/* ---------------------------------------------
 * Image Upload Row
 * --------------------------------------------*/

const ImageRow = ({
  label,
  hint,
  aspectClass,
  preview,
  uploading,
  onSelect,
  onRemove,
}: {
  label: string;
  hint: string;
  aspectClass: string;
  preview: string | null;
  uploading: boolean;
  onSelect: (file: File) => void;
  onRemove?: () => void;
}) => (
  <div className="px-4 py-4">
    <div className="mb-2 text-sm font-medium">{label}</div>

    <label className="group block cursor-pointer">
      <input
        type="file"
        hidden
        accept="image/*"
        disabled={uploading}
        onChange={(e) => e.target.files && onSelect(e.target.files[0])}
      />

      <div
        className={`relative overflow-hidden rounded-lg ${aspectClass} ${
          uploading ? 'opacity-60' : 'hover:border-primary/60'
        }`}
      >
        {preview ? (
          <img src={preview} className="h-full w-full object-cover" />
        ) : (
          <div className="bg-muted/60 flex h-full w-full flex-col items-center justify-center gap-2">
            <Image size={18} className="text-muted-foreground" />
            <span className="text-muted-foreground text-xs">{hint}</span>
          </div>
        )}

        {!uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
            <span className="bg-background rounded-md px-3 py-1 text-xs shadow">
              {preview ? 'Change image' : 'Upload image'}
            </span>
          </div>
        )}
      </div>
    </label>

    <div className="mt-2 flex items-center justify-between">
      {uploading && (
        <span className="text-muted-foreground flex items-center gap-1 text-xs">
          <Loader2 size={12} className="animate-spin" />
          Uploading…
        </span>
      )}

      {preview && onRemove && !uploading && (
        <button onClick={onRemove} className="text-destructive flex items-center gap-1 text-xs">
          <Trash2 size={12} />
          Remove
        </button>
      )}
    </div>
  </div>
);
