import type { LayoutDirection } from '@/type';
import { motion } from 'framer-motion';
import { FoldVertical, Plus, SquareMousePointer, ZoomIn, ZoomOut, Hand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface LeftActionButtonsProps {
  onLayout: (dir: LayoutDirection) => void;
  setOpenStoryEditor: React.Dispatch<React.SetStateAction<boolean>>;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
}

const LeftActionButtons = ({
  onLayout,
  setOpenStoryEditor,
  onZoomIn,
  onZoomOut,
}: LeftActionButtonsProps) => {
  const buttons = [
    {
      id: 'add-node',
      icon: Plus,
      tooltip: 'Add Chapter',
      onClick: () => setOpenStoryEditor(true),
      primary: true,
    },
    {
      id: 'zoom-in',
      icon: ZoomIn,
      tooltip: 'Zoom In',
      onClick: onZoomIn,
    },
    {
      id: 'zoom-out',
      icon: ZoomOut,
      tooltip: 'Zoom Out',
      onClick: onZoomOut,
    },
    {
      id: 'select-mode',
      icon: SquareMousePointer,
      tooltip: 'Select Mode',
    },
    {
      id: 'pan-mode',
      icon: Hand,
      tooltip: 'Pan Mode',
    },
    {
      id: 'auto-layout',
      icon: FoldVertical,
      tooltip: 'Auto Layout',
      onClick: () => onLayout('TB'),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="absolute top-1/2 left-4 z-10 -translate-y-1/2"
    >
      <div className="border-border/50 bg-bg-cream flex flex-col gap-2 rounded-xl border p-2">
        <TooltipProvider delayDuration={0}>
          {buttons.map((btn, index) => {
            const Icon = btn.icon;
            return (
              <Tooltip key={btn.id}>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 + index * 0.05 }}
                  >
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={btn.onClick}
                      className={cn(
                        'h-10 w-10 rounded-lg transition-all',
                        btn.primary
                          ? 'bg-brand-pink-500 hover:bg-brand-pink-600 text-white'
                          : 'text-text-secondary-65 hover:bg-brand-pink-500/10 hover:text-brand-pink-500'
                      )}
                    >
                      <Icon size={18} />
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  sideOffset={8}
                  className="border-border/50 bg-bg-cream text-text-primary rounded-lg border px-3 py-2 text-xs font-medium"
                >
                  {btn.tooltip}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
    </motion.div>
  );
};

export default LeftActionButtons;
