import { Link, useLocation, useParams } from 'react-router';
import { cn } from '@/lib/utils';

const baseTabs = [
  { key: 'overview', label: 'Overview', path: 'overview' },
  { key: 'chapters', label: 'Chapters', path: 'chapters' },
  { key: 'tree', label: 'Tree', path: 'tree' },
  { key: 'versions', label: 'Versions', path: 'versions' },
  { key: 'reports', label: 'Reports', path: 'reports' },
  { key: 'comments', label: 'Comments', path: 'comments' },
  { key: 'collab', label: 'Collaborators', path: 'collaborators' },
  { key: 'votes', label: 'Votes', path: 'votes' },
  { key: 'history', label: 'History', path: 'history' },
  { key: 'settings', label: 'Settings', path: 'settings' },
  { key: 'submit-requests', label: 'Submit Requests', path: 'submit-requests' },
];

export const StoryTabs = () => {
  const { pathname } = useLocation();
  const { slug } = useParams();

  const tabs = [...baseTabs];

  return (
    <div className="bg-muted/40 sticky top-0 z-50 flex w-full gap-6 px-4 pt-3 backdrop-blur-3xl">
      {tabs.map((t) => {
        const fullPath = `/stories/${slug}/${t.path}`;
        const isActive = pathname.includes(t.key);

        return (
          <Link
            key={t.key}
            to={fullPath}
            className={cn(
              'text-muted-foreground border-b-2 border-transparent pb-3 text-sm capitalize transition',
              isActive && 'text-foreground border-primary'
            )}
          >
            {t.label}
          </Link>
        );
      })}
    </div>
  );
};
