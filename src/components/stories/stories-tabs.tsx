import { useState } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useMediaQuery';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogTrigger,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/ui/responsive-dialog';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  FileText,
  GitBranch,
  History,
  MessageSquare,
  Users,
  Vote,
  Settings,
  AlertTriangle,
  Send,
  LayoutDashboard,
  ChevronDown,
  Check,
  BarChart3,
} from 'lucide-react';

const baseTabs = [
  { key: 'overview', label: 'Overview', path: 'overview', icon: LayoutDashboard },
  { key: 'chapters', label: 'Chapters', path: 'chapters', icon: FileText },
  { key: 'tree', label: 'Tree', path: 'tree', icon: GitBranch },
  { key: 'versions', label: 'Versions', path: 'versions', icon: BookOpen },
  { key: 'reports', label: 'Reports', path: 'reports', icon: AlertTriangle },
  { key: 'comments', label: 'Comments', path: 'comments', icon: MessageSquare },
  { key: 'collab', label: 'Collaborators', path: 'collaborators', icon: Users },
  { key: 'votes', label: 'Votes', path: 'votes', icon: Vote },
  { key: 'analytics', label: 'Analytics', path: 'analytics', icon: BarChart3 },
  { key: 'history', label: 'History', path: 'history', icon: History },
  { key: 'settings', label: 'Settings', path: 'settings', icon: Settings },
  { key: 'submit-requests', label: 'Submit Requests', path: 'submit-requests', icon: Send },
];

export const StoryTabs = () => {
  const { pathname } = useLocation();
  const { slug } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const tabs = [...baseTabs];

  const getIsActive = (tabKey: string) => pathname.includes(tabKey);

  const activeTab = tabs.find((t) => getIsActive(t.key)) || tabs[0];
  const ActiveIcon = activeTab.icon;

  const handleTabSelect = (path: string) => {
    navigate(`/stories/${slug}/${path}`);
    setIsOpen(false);
  };

  // Mobile: Show dropdown/sheet
  if (isMobile) {
    return (
      <div className="bg-bg-cream/80 border-border/30 sticky top-0 z-50 w-full border-b backdrop-blur-xl">
        <div className="px-4 py-2">
          <ResponsiveDialog open={isOpen} onOpenChange={setIsOpen}>
            <ResponsiveDialogTrigger asChild>
              <Button
                variant="outline"
                className="border-border/50 bg-cream-95 hover:bg-cream-90 w-full justify-between"
              >
                <span className="flex items-center gap-2">
                  <ActiveIcon className="text-brand-pink-500 h-4 w-4" />
                  <span className="font-medium">{activeTab.label}</span>
                </span>
                <ChevronDown className="text-text-secondary-65 h-4 w-4" />
              </Button>
            </ResponsiveDialogTrigger>
            <ResponsiveDialogContent
              className="bg-cream-95"
              sheetHeight="70%"
              showCloseButton={false}
            >
              <ResponsiveDialogHeader>
                <ResponsiveDialogTitle>Story Sections</ResponsiveDialogTitle>
              </ResponsiveDialogHeader>
              <div className="grid gap-1 py-2">
                {tabs.map((t) => {
                  const isActive = getIsActive(t.key);
                  const Icon = t.icon;

                  return (
                    <button
                      key={t.key}
                      onClick={() => handleTabSelect(t.path)}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-3 text-left transition-all',
                        isActive
                          ? 'bg-brand-pink-500/10 text-brand-pink-500'
                          : 'text-text-primary hover:bg-cream-90'
                      )}
                    >
                      <Icon
                        className={cn(
                          'h-5 w-5',
                          isActive ? 'text-brand-pink-500' : 'text-text-secondary-65'
                        )}
                      />
                      <span className="flex-1 font-medium">{t.label}</span>
                      {isActive && <Check className="text-brand-pink-500 h-4 w-4" />}
                    </button>
                  );
                })}
              </div>
            </ResponsiveDialogContent>
          </ResponsiveDialog>
        </div>
      </div>
    );
  }

  // Desktop: Show horizontal tabs
  return (
    <div className="bg-bg-cream/80 border-border/30 sticky top-0 z-50 w-full border-b backdrop-blur-xl">
      <div className="scrollbar-none -mx-1 flex gap-1 overflow-x-auto px-3 sm:gap-2 sm:px-4">
        {tabs.map((t) => {
          const fullPath = `/stories/${slug}/${t.path}`;
          const isActive = getIsActive(t.key);
          const Icon = t.icon;

          return (
            <Link
              key={t.key}
              to={fullPath}
              className={cn(
                'text-text-secondary-65 hover:text-text-primary relative flex items-center gap-1.5 px-2 py-3 text-xs font-medium whitespace-nowrap transition-colors sm:px-3 sm:text-sm',
                isActive && 'text-brand-pink-500'
              )}
            >
              <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>{t.label}</span>
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
