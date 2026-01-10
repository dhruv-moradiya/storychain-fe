import { useState } from 'react';
import { FileText, X, ChevronUp, ChevronDown, Trash2, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDraftRecoveryBannerLogic } from '@/hooks/components/storyBuilder/useDraftRecoveryBannerLogic';
import { useSearchParams } from 'react-router';
import { formatDistanceToNow } from 'date-fns';
import type { IChapterAutoSave } from '@/type/chapterAutoSave';

// Inline Draft Item Component
const DraftItem = ({ draft, onContinue }: { draft: IChapterAutoSave; onContinue: () => void }) => {
  const [params, setParams] = useSearchParams();

  const handleContinue = () => {
    params.set('autoSaveId', draft._id);
    setParams(params);
    onContinue();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-3 rounded-lg border border-black/5 bg-white/60 p-2.5 transition-colors hover:bg-white/80"
    >
      <div className="bg-brand-orange/15 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
        <FileText className="text-brand-orange h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-text-primary truncate font-mono text-xs font-medium">{draft.title}</p>
        <p className="text-text-secondary-65 font-mono text-[10px]">
          {formatDistanceToNow(draft.lastSavedAt, { addSuffix: true })}
        </p>
      </div>

      <div className="flex flex-shrink-0 items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
        <Button
          size="sm"
          className="bg-brand-pink-500 hover:bg-brand-pink-600 h-7 px-3 font-mono text-[10px] text-white"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
};

export const DraftRecoveryBanner = () => {
  const [isExpanded, setIsExpanded] = useState(true);
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

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed right-4 bottom-4 z-50 w-[340px] overflow-hidden rounded-xl border border-black/5 bg-white/90 shadow-lg backdrop-blur-sm"
      >
        {/* Header - Always visible */}
        <div
          className="bg-brand-orange/15 flex cursor-pointer items-center justify-between px-4 py-3"
          onClick={() => !showDraftList && setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3">
            {showDraftList && (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 hover:bg-black/5"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBackToSummary();
                }}
              >
                <ArrowLeft className="text-text-secondary-65 h-4 w-4" />
              </Button>
            )}
            {!showDraftList && (
              <div className="bg-brand-orange/20 flex h-8 w-8 items-center justify-center rounded-lg">
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
                className="h-7 w-7 hover:bg-black/5"
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
              className="h-7 w-7 hover:bg-black/5"
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
              <div className="px-4 py-3">
                {/* Draft Info */}
                <div className="mb-3">
                  <p className="text-text-primary truncate font-mono text-sm font-medium">
                    "{banner.latestTitle}"
                  </p>
                  <p className="text-text-secondary-65 mt-1 font-mono text-xs">
                    {banner.words && `${banner.words} words`}
                    {banner.words && banner.timeAgo && ' • '}
                    {banner.timeAgo && `saved ${banner.timeAgo}`}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {banner.count > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-text-secondary-75 flex-1 border-black/10 font-mono text-xs hover:bg-black/5"
                      onClick={actions.handleDiscardLatest}
                    >
                      Discard
                    </Button>
                  )}
                  <Button
                    size="sm"
                    className="bg-brand-pink-500 hover:bg-brand-pink-600 flex-1 font-mono text-xs text-white"
                    onClick={handleViewDrafts}
                  >
                    {banner.count > 1 ? 'View All' : 'Continue'}
                  </Button>
                </div>
              </div>
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
