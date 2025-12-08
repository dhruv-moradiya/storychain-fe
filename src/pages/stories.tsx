import '@xyflow/react/dist/style.css';

import ChaptersSection from '@/components/stories/sections/chapters-section';
import CollaboratorSection from '@/components/stories/sections/collaborators-section';
import OverviewSection from '@/components/stories/sections/overview-section';
import ReportSection from '@/components/stories/sections/report-section';
import StoryTree from '@/components/stories/sections/story-tree';
import SubmitRequestSection from '@/components/stories/sections/submit-reuqest-section';
import { StoryTabs } from '@/components/stories/stories-tabs';
import { Navigate, Route, Routes } from 'react-router';
import SettingSection from '@/components/stories/sections/setting-section';

export default function Story() {
  return (
    <div className="relative mx-auto w-full space-y-8">
      <StoryTabs />

      {/* <StoryEditorDialog
        open={openStoryEditor}
        onOpenChange={(open) => setOpenStoryEditor(open)}
        onSubmit={() => {}}
      /> */}
      <div className="container mx-auto">
        <Routes>
          <Route index element={<Navigate to="overview" />} />

          <Route path="overview" element={<OverviewSection />} />
          <Route path="submit-requests" element={<SubmitRequestSection />} />
          <Route path="chapters" element={<ChaptersSection />} />
          <Route path="reports" element={<ReportSection />} />
          <Route path="collaborators" element={<CollaboratorSection />} />
          <Route path="tree" element={<StoryTree />} />
          <Route path="settings" element={<SettingSection />} />
          {/* <Route path="versions" element={<VersionsSection />} />
          <Route path="comments" element={<CommentsSection />} />
          <Route path="collaborators" element={<CollaboratorsSection />} />
          <Route path="votes" element={<VotesSection />} />
          <Route path="history" element={<HistorySection />} />
          <Route path="settings" element={<SettingsSection />} /> */}
        </Routes>
      </div>
    </div>
  );
}
