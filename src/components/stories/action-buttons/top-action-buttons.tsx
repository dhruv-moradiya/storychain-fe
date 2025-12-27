import type { GroupButton } from '@/type';
import {
  Eye,
  GitMerge,
  Heart,
  History,
  MessageCircle,
  Settings,
  Share2,
  Trash2,
} from 'lucide-react';
import { ButtonGroupWithTooltip } from '../button-group-with-tooltip';

interface Props {
  setOpenPanel: React.Dispatch<React.SetStateAction<string | null>>;
}

const TopActionButtons = ({ setOpenPanel }: Props) => {
  const verticalButtons: GroupButton[] = [
    {
      id: 'history',
      icon: <History />,
      tooltip: 'Story History',
      onClick: () => setOpenPanel('history'),
    },
    {
      id: 'comments',
      icon: <MessageCircle />,
      tooltip: 'View Comments',
      onClick: () => setOpenPanel('comments'),
    },
    {
      id: 'settings',
      icon: <Settings />,
      tooltip: 'Story Settings',
      onClick: () => setOpenPanel('setting'),
    },
    {
      id: 'preview',
      icon: <Eye />,
      tooltip: 'Preview Story',
      onClick: () => {},
    },
    {
      id: 'favorite',
      icon: <Heart />,
      tooltip: 'Add to Favorites',
      onClick: () => {},
    },
    {
      id: 'merge',
      icon: <GitMerge />, // can be replaced with a custom "merge" icon
      tooltip: 'Request Merge',
      onClick: () => setOpenPanel('merge'),
    },
    {
      id: 'share',
      icon: <Share2 />,
      tooltip: 'Share Story',
      onClick: () => setOpenPanel('share'),
    },
    {
      id: 'delete',
      icon: <Trash2 />,
      tooltip: 'Delete Story',
      onClick: () => {},
    },
  ];

  return (
    <ButtonGroupWithTooltip
      buttons={verticalButtons}
      orientation="horizontal"
      className="absolute top-2 left-1/2 z-10 -translate-x-1/2"
      tooltipPosition="bottom"
    />
  );
};

export default TopActionButtons;
