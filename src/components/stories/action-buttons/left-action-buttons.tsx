import type { GroupButton, LayoutDirection } from "@/type";
import {
  FoldVertical,
  Plus,
  SquareMousePointer,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useState } from "react";
import { ButtonGroupWithTooltip } from "../button-group-with-tooltip";

const LeftActionButtons = ({
  onLayout,
  setOpenStoryEditor,
}: {
  onLayout: (dir: LayoutDirection) => void;
  setOpenStoryEditor: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [zoom, setZoom] = useState(1);
  const [selectedMode, setSelectedMode] = useState<"select" | "move">("select");

  const verticalButtons: GroupButton[] = [
    {
      id: "add-node",
      icon: <Plus />,
      tooltip: "Add Node",
      onClick: () => setOpenStoryEditor(true),
    },
    {
      id: "zoom-in",
      icon: <ZoomIn />,
      tooltip: "Zoom In",
      onClick: () => setZoom((prev) => prev + 0.1),
    },
    {
      id: "zoom-out",
      icon: <ZoomOut />,
      tooltip: "Zoom Out",
      onClick: () => setZoom((prev) => prev - 0.1),
    },
    {
      id: "select-mode",
      icon: <SquareMousePointer />,
      tooltip: "Select Mode",
      onClick: () => setSelectedMode("select"),
    },
    {
      id: "move-mode",
      icon: <FoldVertical />,
      tooltip: "Auto Layout",
      onClick: () => onLayout("TB"),
    },
  ];

  return (
    <ButtonGroupWithTooltip
      buttons={verticalButtons}
      orientation="vertical"
      className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
      tooltipPosition="right"
    />
  );
};

export default LeftActionButtons;
