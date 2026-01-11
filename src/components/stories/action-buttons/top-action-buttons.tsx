import { motion } from 'framer-motion';
import {
  Eye,
  GitMerge,
  Heart,
  History,
  MessageCircle,
  Settings,
  Share2,
  Trash2,
  MoreHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface TopActionButtonsProps {
  setOpenPanel: React.Dispatch<React.SetStateAction<string | null>>;
}

const TopActionButtons = ({ setOpenPanel }: TopActionButtonsProps) => {
  const mainButtons = [
    {
      id: 'history',
      icon: History,
      tooltip: 'Story History',
      onClick: () => setOpenPanel('history'),
    },
    {
      id: 'comments',
      icon: MessageCircle,
      tooltip: 'View Comments',
      onClick: () => setOpenPanel('comments'),
      badge: 12,
    },
    {
      id: 'settings',
      icon: Settings,
      tooltip: 'Story Settings',
      onClick: () => setOpenPanel('setting'),
    },
    {
      id: 'preview',
      icon: Eye,
      tooltip: 'Preview Story',
      onClick: () => {},
    },
  ];

  const moreActions = [
    {
      id: 'favorite',
      icon: Heart,
      label: 'Add to Favorites',
      onClick: () => {},
    },
    {
      id: 'merge',
      icon: GitMerge,
      label: 'Request Merge',
      onClick: () => setOpenPanel('merge'),
    },
    {
      id: 'share',
      icon: Share2,
      label: 'Share Story',
      onClick: () => setOpenPanel('share'),
    },
    {
      id: 'delete',
      icon: Trash2,
      label: 'Delete Story',
      onClick: () => {},
      destructive: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="absolute top-4 left-1/2 z-10 -translate-x-1/2"
    >
      <div className="border-border/50 bg-bg-cream flex items-center gap-2 rounded-xl border p-2">
        <TooltipProvider delayDuration={0}>
          {mainButtons.map((btn, index) => {
            const Icon = btn.icon;
            return (
              <Tooltip key={btn.id}>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 + index * 0.05 }}
                    className="relative"
                  >
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={btn.onClick}
                      className="text-text-secondary-65 hover:bg-brand-pink-500/10 hover:text-brand-pink-500 h-10 w-10 rounded-lg transition-all"
                    >
                      <Icon size={18} />
                    </Button>
                    {btn.badge && btn.badge > 0 && (
                      <span className="bg-brand-pink-500 absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white">
                        {btn.badge > 9 ? '9+' : btn.badge}
                      </span>
                    )}
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  sideOffset={8}
                  className="border-border/50 bg-bg-cream text-text-primary rounded-lg border px-3 py-2 text-xs font-medium"
                >
                  {btn.tooltip}
                </TooltipContent>
              </Tooltip>
            );
          })}

          {/* Divider */}
          <div className="bg-border/50 mx-1 h-6 w-px" />

          {/* More Actions Dropdown */}
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35 }}
                  >
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-text-secondary-65 hover:bg-brand-pink-500/10 hover:text-brand-pink-500 h-10 w-10 rounded-lg transition-all"
                    >
                      <MoreHorizontal size={18} />
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                sideOffset={8}
                className="border-border/50 bg-bg-cream text-text-primary rounded-lg border px-3 py-2 text-xs font-medium"
              >
                More Actions
              </TooltipContent>
            </Tooltip>

            <DropdownMenuContent
              align="center"
              sideOffset={8}
              className="border-border/50 bg-bg-cream w-48 rounded-xl border p-2"
            >
              {moreActions.map((action, index) => {
                const Icon = action.icon;
                const isDestructive = action.destructive;

                if (isDestructive && index > 0) {
                  return (
                    <div key={action.id}>
                      <DropdownMenuSeparator className="bg-border/50 my-1.5" />
                      <DropdownMenuItem
                        onClick={action.onClick}
                        className="text-destructive hover:bg-destructive/10 flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5"
                      >
                        <Icon size={16} />
                        <span>{action.label}</span>
                      </DropdownMenuItem>
                    </div>
                  );
                }

                return (
                  <DropdownMenuItem
                    key={action.id}
                    onClick={action.onClick}
                    className={cn(
                      'flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5',
                      isDestructive
                        ? 'text-destructive hover:bg-destructive/10'
                        : 'text-text-secondary-65 hover:bg-brand-pink-500/10 hover:text-brand-pink-500'
                    )}
                  >
                    <Icon size={16} />
                    <span>{action.label}</span>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipProvider>
      </div>
    </motion.div>
  );
};

export default TopActionButtons;
