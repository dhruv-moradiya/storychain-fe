import { Bell, MessageSquare, GitPullRequest, UserPlus, Star } from 'lucide-react';
import { SettingCard, ToggleRow } from './setting-components';
import { useState } from 'react';

export function NotificationsTab() {
  // These would typically come from user preferences/settings
  const [notifications, setNotifications] = useState({
    newComments: true,
    newContributions: true,
    collaboratorJoins: true,
    chapterLikes: false,
    weeklyDigest: true,
  });

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    // In real app, would save to backend
  };

  return (
    <div className="space-y-4">
      {/* Activity Notifications */}
      <SettingCard
        title="Activity Notifications"
        description="Get notified about activity on your story"
      >
        <ToggleRow
          icon={<MessageSquare size={18} />}
          label="New Comments"
          description="When someone comments on your chapters"
          checked={notifications.newComments}
          onChange={() => handleToggle('newComments')}
        />

        <ToggleRow
          icon={<GitPullRequest size={18} />}
          label="New Contributions"
          description="When someone submits a chapter for review"
          checked={notifications.newContributions}
          onChange={() => handleToggle('newContributions')}
        />

        <ToggleRow
          icon={<UserPlus size={18} />}
          label="Collaborator Joins"
          description="When a new collaborator joins your story"
          checked={notifications.collaboratorJoins}
          onChange={() => handleToggle('collaboratorJoins')}
        />

        <ToggleRow
          icon={<Star size={18} />}
          label="Chapter Likes"
          description="When your chapters receive likes"
          checked={notifications.chapterLikes}
          onChange={() => handleToggle('chapterLikes')}
        />
      </SettingCard>

      {/* Email Digest */}
      <SettingCard title="Email Preferences">
        <ToggleRow
          icon={<Bell size={18} />}
          label="Weekly Digest"
          description="Receive a weekly summary of your story's activity"
          checked={notifications.weeklyDigest}
          onChange={() => handleToggle('weeklyDigest')}
        />
      </SettingCard>
    </div>
  );
}
