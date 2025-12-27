import type { GroupButton, LayoutDirection } from '@/type';
import { FoldVertical, Plus, SquareMousePointer, ZoomIn, ZoomOut } from 'lucide-react';
import { ButtonGroupWithTooltip } from '../button-group-with-tooltip';

const LeftActionButtons = ({
  onLayout,
  setOpenStoryEditor,
}: {
  onLayout: (dir: LayoutDirection) => void;
  setOpenStoryEditor: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const verticalButtons: GroupButton[] = [
    {
      id: 'add-node',
      icon: <Plus />,
      tooltip: 'Add Node',
      onClick: () => setOpenStoryEditor(true),
    },
    {
      id: 'zoom-in',
      icon: <ZoomIn />,
      tooltip: 'Zoom In',
    },
    {
      id: 'zoom-out',
      icon: <ZoomOut />,
      tooltip: 'Zoom Out',
    },
    {
      id: 'select-mode',
      icon: <SquareMousePointer />,
      tooltip: 'Select Mode',
    },
    {
      id: 'move-mode',
      icon: <FoldVertical />,
      tooltip: 'Auto Layout',
      onClick: () => onLayout('TB'),
    },
  ];

  return (
    <ButtonGroupWithTooltip
      buttons={verticalButtons}
      orientation="vertical"
      className="absolute top-1/2 left-2 z-10 -translate-y-1/2"
      tooltipPosition="right"
    />
  );
};

export default LeftActionButtons;
