// account-section/components/account-setting-general-part.tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BADGES, LEVEL_THRESHOLDS } from '@/lib/constants';
import { Upload, Trash2 } from 'lucide-react';
import { Activity, useState } from 'react';

const userXP = 750;
const userBadges = ['STORY_STARTER', 'BRANCH_CREATOR', 'BOOKWORM'];

export default function AccountSettingGeneralPart() {
  const userLevel = LEVEL_THRESHOLDS.find((lvl) => userXP >= lvl.minXP && userXP <= lvl.maxXP);

  const [avatar, setAvatar] = useState<string | null>('https://i.pravatar.cc/100?img=12');

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setAvatar(preview);
  };

  return (
    <div className="space-y-10 pb-6">
      {/* SECTION TITLE */}
      <h3 className="scroll-m-20 border-b pb-2 font-semibold tracking-tight">Account</h3>

      {/* ------------ AVATAR SECTION ------------ */}
      <div className="flex items-center gap-4">
        {/* Avatar Preview */}
        <div className="relative">
          <div className="bg-muted size-16 overflow-hidden rounded-full border shadow-sm">
            <Activity mode={avatar ? 'visible' : 'hidden'}>
              <img
                src={avatar ?? ''}
                alt="avatar"
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </Activity>
          </div>
        </div>

        {/* Avatar Buttons */}
        <div className="flex flex-col gap-1">
          <label className="text-muted-foreground text-xs font-medium">Profile Picture</label>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex h-8 items-center gap-1 px-3 text-xs"
            >
              <Upload size={14} />
              <label htmlFor="avatarInput" className="cursor-pointer">
                Upload
              </label>
              <input
                id="avatarInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </Button>

            <Activity mode={avatar ? 'visible' : 'hidden'}>
              <Button
                variant="outline"
                size="sm"
                className="flex h-8 items-center gap-1 px-3 text-xs text-red-500"
                onClick={() => setAvatar(null)}
              >
                <Trash2 size={14} /> Remove
              </Button>
            </Activity>
          </div>
        </div>
      </div>

      {/* ------------ BASIC INFO ------------ */}
      <div className="space-y-3 pt-2">
        <ProfileRow
          label="Preferred Name"
          description={<Input id="name" value="Username" className="h-8 w-64 text-sm" />}
        />
      </div>

      {/* ------------ USER LEVEL ------------ */}
      {userLevel && (
        <div className="bg-card rounded-md border p-4 shadow-sm">
          <h4 className="text-sm font-semibold">
            Level {userLevel.level}: {userLevel.title}
          </h4>

          <div className="bg-muted mt-3 h-2 w-full rounded-full">
            <div
              className="bg-primary h-full rounded-full transition-all"
              style={{
                width: `${
                  ((userXP - userLevel.minXP) / (userLevel.maxXP - userLevel.minXP)) * 100
                }%`,
              }}
            />
          </div>

          <p className="text-muted-foreground mt-1 text-xs">{userXP} XP</p>
        </div>
      )}

      {/* ------------ BADGES ------------ */}
      <div>
        <h4 className="mb-2 text-sm font-semibold">Badges</h4>

        <div className="flex flex-wrap gap-2">
          {userBadges.map((id) => {
            const badge = BADGES[id as keyof typeof BADGES];
            return (
              <div
                key={badge.id}
                className="bg-muted/30 hover:bg-muted/40 flex items-center gap-1 rounded-md border px-3 py-1 text-xs transition"
              >
                <span className="text-primary">{badge.icon}</span>
                <span>{badge.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------
   PROFILE ROW
------------------------------------------------------ */
interface ProfileRowProps {
  label: string;
  description: React.ReactNode;
  action?: React.ReactNode;
}

export const ProfileRow = ({ label, description, action }: ProfileRowProps) => (
  <div className="flex items-start justify-between gap-4">
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium">{label}</span>
      <div className="text-muted-foreground text-sm">{description}</div>
    </div>
    {action && <div>{action}</div>}
  </div>
);
