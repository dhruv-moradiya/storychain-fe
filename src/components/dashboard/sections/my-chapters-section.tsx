import MyChapterList from './my-chapters/components/my-chapter-list';
import { DashboardContentLayout } from '@/components/dashboard';

function MyChaptersSection() {
  return (
    <DashboardContentLayout maxWidth="7xl" paddingSize="none">
      <MyChapterList />
    </DashboardContentLayout>
  );
}

export { MyChaptersSection };
