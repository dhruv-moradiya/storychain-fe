import { Clock, FileText, Type, Check } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface BuilderStatusBarProps {
  wordCount: number;
  charCount: number;
}

function calculateReadTime(wordCount: number): string {
  const wordsPerMinute = 200;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  if (minutes < 1) return '< 1 min';
  return `${minutes} min`;
}

/**
 * Builder status bar component
 * Shows word count, character count, read time, and last saved status
 */
function BuilderStatusBar({ wordCount, charCount }: BuilderStatusBarProps) {
  const readTime = calculateReadTime(wordCount);

  return (
    <TooltipProvider>
      <div className="border-border/50 bg-cream-90 border-t">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-3 py-2 sm:px-4">
          {/* Left Section - Stats */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Word Count */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-text-secondary-65 flex cursor-default items-center gap-1 text-xs sm:gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  <span className="font-medium">{wordCount.toLocaleString()}</span>
                  <span className="hidden sm:inline">words</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Total word count</p>
              </TooltipContent>
            </Tooltip>

            <span className="text-text-secondary-65/40">•</span>

            {/* Character Count */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-text-secondary-65 flex cursor-default items-center gap-1 text-xs sm:gap-1.5">
                  <Type className="h-3.5 w-3.5" />
                  <span className="font-medium">{charCount.toLocaleString()}</span>
                  <span className="hidden sm:inline">characters</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Total character count</p>
              </TooltipContent>
            </Tooltip>

            <span className="text-text-secondary-65/40 hidden sm:inline">•</span>

            {/* Read Time */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-text-secondary-65 hidden cursor-default items-center gap-1.5 text-xs sm:flex">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="font-medium">{readTime}</span>
                  <span className="hidden sm:inline">read</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Estimated reading time at 200 words/min</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Right Section - Last Saved */}
          <div className="flex items-center gap-1.5">
            <div className="text-text-secondary-65 flex items-center gap-1.5 text-xs">
              <Check className="text-badge-success h-3.5 w-3.5" />
              <span className="hidden sm:inline">Saved just now</span>
              <span className="sm:hidden">Saved</span>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

export { BuilderStatusBar };
