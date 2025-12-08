import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { GroupButton } from "@/type";
import React from "react";
import { ButtonGroup } from "../ui/button-group";

// Button type

// Reusable ButtonGroup with tooltip
interface ButtonGroupWithTooltipProps {
  buttons: GroupButton[];
  orientation?: "vertical" | "horizontal";
  className?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
}

export const ButtonGroupWithTooltip: React.FC<ButtonGroupWithTooltipProps> = ({
  buttons,
  orientation = "vertical",
  className,
  tooltipPosition = "top",
}) => (
  <ButtonGroup orientation={orientation} className={className}>
    <TooltipProvider>
      {buttons.map((btn, index) => (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <Button
              size={"icon"}
              variant={btn.variant || "outline"}
              onClick={() => btn.onClick && btn.onClick(btn.id)}
              disabled={btn.disabled}
              className={btn.className}
            >
              {btn.icon}
            </Button>
          </TooltipTrigger>
          <TooltipContent side={tooltipPosition}>{btn.tooltip}</TooltipContent>
        </Tooltip>
      ))}
    </TooltipProvider>
  </ButtonGroup>
);
