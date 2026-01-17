import SettingSectionLoading from '@/components/common/story/setting-section-loading';
import StoryNotFound from '@/components/common/story/story-not-found';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Settings, Palette, Users, Bell, AlertTriangle } from 'lucide-react';
import { useParams } from 'react-router';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

import { GeneralTab } from './general-tab';
import { AppearanceTab } from './appearance-tab';
import { CollaborationTab } from './collaboration-tab';
import { NotificationsTab } from './notifications-tab';
import { DangerTab } from './danger-tab';
import { useSettingSection } from './use-setting-section';
import type { SettingTab } from './setting-section.types';

const tabs = [
  { id: 'general' as const, label: 'General', icon: Settings },
  { id: 'appearance' as const, label: 'Appearance', icon: Palette },
  { id: 'collaboration' as const, label: 'Collaboration', icon: Users },
  { id: 'notifications' as const, label: 'Notifications', icon: Bell },
  { id: 'danger' as const, label: 'Danger Zone', icon: AlertTriangle },
];

const SettingSection = () => {
  const { slug } = useParams();

  const {
    activeTab,
    setActiveTab,
    settings,
    isLoading,
    cardPreview,
    coverPreview,
    cardUploading,
    coverUploading,
    handleSettingUpdate,
    handleImageUpload,
    setCardPreview,
    setCoverPreview,
  } = useSettingSection(slug);

  if (isLoading) return <SettingSectionLoading />;
  if (!settings) return <StoryNotFound onCreate={() => {}} />;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto max-w-3xl pb-14"
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-text-primary text-2xl font-bold">Story Settings</h2>
        <p className="text-text-secondary-65 mt-1 text-sm">
          Configure your story's visibility, appearance, and collaboration settings
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as SettingTab)}>
        <TabsList className="border-border/50 mb-6 flex h-auto w-full justify-start gap-1 overflow-x-auto rounded-xl border p-1.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isDanger = tab.id === 'danger';

            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all',
                  'data-[state=active]:shadow-sm',
                  isActive
                    ? isDanger
                      ? 'bg-destructive/10 text-destructive'
                      : 'bg-brand-pink-500/10 text-brand-pink-500'
                    : isDanger
                      ? 'text-text-secondary-65 hover:bg-destructive/5 hover:text-destructive'
                      : 'text-text-secondary-65 hover:bg-muted/50 hover:text-text-primary'
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="general" className="mt-0">
          <GeneralTab settings={settings.settings} onSettingUpdate={handleSettingUpdate} />
        </TabsContent>

        <TabsContent value="appearance" className="mt-0">
          <AppearanceTab
            cardPreview={cardPreview}
            coverPreview={coverPreview}
            cardUploading={cardUploading}
            coverUploading={coverUploading}
            currentCardImage={settings.cardImage?.url}
            currentCoverImage={settings.coverImage?.url}
            onCardImageSelect={(f) => handleImageUpload(f, 'card')}
            onCoverImageSelect={(f) => handleImageUpload(f, 'cover')}
            onCardImageRemove={() => setCardPreview(null)}
            onCoverImageRemove={() => setCoverPreview(null)}
          />
        </TabsContent>

        <TabsContent value="collaboration" className="mt-0">
          <CollaborationTab settings={settings.settings} onSettingUpdate={handleSettingUpdate} />
        </TabsContent>

        <TabsContent value="notifications" className="mt-0">
          <NotificationsTab />
        </TabsContent>

        <TabsContent value="danger" className="mt-0">
          <DangerTab
            storyTitle={'Tide of the Azure Serpent'}
            onArchive={() => toast.info('Archive feature coming soon')}
            onTransferOwnership={() => toast.info('Transfer feature coming soon')}
            onDelete={() => toast.info('Delete feature coming soon')}
          />
        </TabsContent>
      </Tabs>
    </motion.section>
  );
};

export default SettingSection;
export { SettingSection };
