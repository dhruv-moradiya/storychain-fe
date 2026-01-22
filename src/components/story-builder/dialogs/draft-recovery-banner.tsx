import { useState } from 'react';
import { FileText, X, ChevronUp, ChevronDown, Trash2, ArrowLeft, NotebookPen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { useDraftRecoveryBannerLogic } from '@/hooks/components/storyBuilder/useDraftRecoveryBannerLogic';
import { useSearchParams } from 'react-router';
import { formatDistanceToNow } from 'date-fns';
import type { IChapterAutoSave } from '@/type/chapterAutoSave';
import { cn } from '@/lib/utils';

// Inline Draft Item Component
const DraftItem = ({ draft, onContinue }: { draft: IChapterAutoSave; onContinue: () => void }) => {
  const [params, setParams] = useSearchParams();

  const handleContinue = () => {
    params.set('autoSaveId', draft._id);
    setParams(params);
    onContinue();
  };

  return (
    <TooltipProvider delayDuration={300}>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="border-border/50 bg-cream-95 hover:bg-cream-90 flex items-center gap-2 rounded-lg border p-2.5 transition-colors"
      >
        <div className="bg-brand-orange/15 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
          <FileText className="text-brand-orange h-4 w-4" />
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="max-w-[140px] min-w-0 flex-1 overflow-hidden">
              <p className="text-text-primary line-clamp-1 font-mono text-xs font-medium">
                {draft.title}
              </p>
              <p className="text-text-secondary-65 line-clamp-1 font-mono text-[10px]">
                {formatDistanceToNow(draft.lastSavedAt, { addSuffix: true })}
              </p>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-[200px]">
            <p className="text-xs font-medium break-words">{draft.title}</p>
            <p className="text-muted-foreground text-[10px]">
              Saved {formatDistanceToNow(draft.lastSavedAt, { addSuffix: true })}
            </p>
          </TooltipContent>
        </Tooltip>

        <div className="ml-auto flex shrink-0 items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive h-7 w-7"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p className="text-xs">Delete draft</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="bg-brand-pink-500 hover:bg-brand-pink-600 h-7 w-7 text-white shadow-[0_2px_8px_var(--brand-pink-shadow25)]"
                onClick={handleContinue}
              >
                <NotebookPen className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p className="text-xs">Continue editing</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </motion.div>
    </TooltipProvider>
  );
};

export const DraftRecoveryBanner = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDraftList, setShowDraftList] = useState(false);

  // We don't need to open a dialog anymore, so we pass a dummy setter
  const { banner, isVisible, isLoading, actions, draftList } = useDraftRecoveryBannerLogic(
    () => {}
  );

  if (isLoading || banner.count === 0 || !isVisible) return null;

  const handleViewDrafts = () => {
    setShowDraftList(true);
    setIsExpanded(true);
  };

  const handleBackToSummary = () => {
    setShowDraftList(false);
  };

  const handleDraftContinue = () => {
    setShowDraftList(false);
    setIsExpanded(false);
  };

  const handleToggleExpand = () => {
    if (!showDraftList) {
      setIsExpanded(!isExpanded);
    }
  };

  // Mobile collapsed state - shows only a small icon button
  const MobileCollapsedButton = () => (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleToggleExpand}
      className={cn(
        'flex h-12 w-12 items-center justify-center rounded-xl',
        'from-brand-orange/20 to-brand-pink-500/20 bg-gradient-to-br',
        'border-brand-orange/30 border shadow-lg backdrop-blur-sm',
        'transition-all duration-200 hover:shadow-xl',
        'hover:border-brand-pink-500/50'
      )}
    >
      <div className="relative">
        <FileText className="text-brand-orange h-5 w-5" />
        {banner.count > 0 && (
          <span className="bg-brand-pink-500 absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white">
            {banner.count > 9 ? '9+' : banner.count}
          </span>
        )}
      </div>
    </motion.button>
  );

  return (
    <AnimatePresence mode="wait">
      {/* Mobile View - Collapsed icon only (screens < md) */}
      {!isExpanded && (
        <motion.div
          key="mobile-collapsed"
          className="fixed right-4 bottom-4 z-50 md:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <MobileCollapsedButton />
        </motion.div>
      )}

      {/* Full Banner - Desktop always, Mobile when expanded */}
      <motion.div
        key="full-banner"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          'fixed right-4 bottom-4 z-50 overflow-hidden rounded-xl',
          'border-border/50 bg-cream-95 border shadow-lg backdrop-blur-sm',
          // Mobile: hidden when collapsed, shown when expanded
          isExpanded ? 'block' : 'hidden md:block',
          // Width adjustments
          'w-[calc(100vw-2rem)] max-w-[340px] sm:w-[340px]'
        )}
      >
        {/* Header - Always visible */}
        <div
          className="from-brand-orange/15 to-brand-pink-500/10 flex cursor-pointer items-center justify-between bg-gradient-to-r px-4 py-3"
          onClick={handleToggleExpand}
        >
          <div className="flex items-center gap-3">
            {showDraftList && (
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-brand-orange/10 h-7 w-7"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBackToSummary();
                }}
              >
                <ArrowLeft className="text-text-secondary-65 h-4 w-4" />
              </Button>
            )}
            {!showDraftList && (
              <div className="from-brand-orange/25 to-brand-pink-500/15 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br">
                <FileText className="text-brand-orange h-4 w-4" />
              </div>
            )}
            <div>
              <p className="text-text-primary font-mono text-xs font-medium">
                {showDraftList
                  ? 'Select a Draft'
                  : banner.count > 1
                    ? `${banner.count} Unsaved Drafts`
                    : 'Unsaved Draft'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {!showDraftList && (
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-brand-orange/10 h-7 w-7"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
              >
                {isExpanded ? (
                  <ChevronDown className="text-text-secondary-65 h-4 w-4" />
                ) : (
                  <ChevronUp className="text-text-secondary-65 h-4 w-4" />
                )}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-destructive/10 h-7 w-7"
              onClick={(e) => {
                e.stopPropagation();
                actions.handleClose();
              }}
              aria-label="Close"
            >
              <X className="text-text-secondary-65 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Expandable Content */}
        <AnimatePresence mode="wait">
          {isExpanded && !showDraftList && (
            <motion.div
              key="summary"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <TooltipProvider delayDuration={300}>
                <div className="px-4 py-3">
                  {/* Draft Info */}
                  <div className="mb-3">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="text-text-primary line-clamp-2 cursor-default font-mono text-sm font-medium">
                          "{banner.latestTitle}"
                        </p>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-[280px]">
                        <p className="text-xs break-words">{banner.latestTitle}</p>
                      </TooltipContent>
                    </Tooltip>
                    <p className="text-text-secondary-65 mt-1 font-mono text-xs">
                      {banner.words && `${banner.words} words`}
                      {banner.words && banner.timeAgo && ' • '}
                      {banner.timeAgo && `saved ${banner.timeAgo}`}
                    </p>
                  </div>

                  {/* Action Buttons - Always visible with fixed widths */}
                  <div className="flex gap-2">
                    {banner.count > 1 && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-border text-text-secondary-75 hover:bg-muted/50 min-w-[80px] shrink-0 font-mono text-xs"
                            onClick={actions.handleDiscardLatest}
                          >
                            Discard
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          <p className="text-xs">Discard this draft</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          className="bg-brand-pink-500 hover:bg-brand-pink-600 min-w-[80px] shrink-0 font-mono text-xs text-white shadow-[0_2px_8px_var(--brand-pink-shadow25)]"
                          onClick={handleViewDrafts}
                        >
                          {banner.count > 1 ? 'View All' : 'Continue'}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p className="text-xs">
                          {banner.count > 1 ? 'View all drafts' : 'Continue editing'}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </TooltipProvider>
            </motion.div>
          )}

          {isExpanded && showDraftList && (
            <motion.div
              key="draft-list"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-3 py-3">
                <p className="text-text-secondary-65 mb-2 font-mono text-[10px]">
                  {draftList.length} draft{draftList.length !== 1 ? 's' : ''} available
                </p>
                <ScrollArea className="max-h-[240px]">
                  <div className="space-y-2 pr-2">
                    {draftList.map((draft, index) => (
                      <motion.div
                        key={draft._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <DraftItem draft={draft} onContinue={handleDraftContinue} />
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};
