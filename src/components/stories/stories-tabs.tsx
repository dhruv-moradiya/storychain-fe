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
    <div className="bg-bg-cream/80 border-border/30 sticky top-0 z-50 w-full border-b backdrop-blur-xl">
      <div className="scrollbar-none -mx-1 flex gap-1 overflow-x-auto px-3 sm:gap-2 sm:px-4">
        {tabs.map((t) => {
          const fullPath = `/stories/${slug}/${t.path}`;
          const isActive = pathname.includes(t.key);

          return (
            <Link
              key={t.key}
              to={fullPath}
              className={cn(
                'text-text-secondary-65 hover:text-text-primary relative px-2 py-3 text-xs font-medium whitespace-nowrap transition-colors sm:px-3 sm:text-sm',
                isActive && 'text-brand-pink-500'
              )}
            >
              {t.label}
              {isActive && (
                <span className="bg-brand-pink-500 absolute right-2 bottom-0 left-2 h-0.5 rounded-full sm:right-3 sm:left-3" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
