import { useState } from 'react';
import { FileText, X, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { useDraftRecoveryBannerLogic } from '@/hooks/components/storyBuilder/useDraftRecoveryBannerLogic';
import { DraftSelectionDialog } from './draft-selection-dialog';
import { colors } from '@/constants';

export const DraftRecoveryBanner = () => {
  const [isDraftSelectionOpen, setIsDraftSelectionOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const { banner, isVisible, isLoading, actions, draftList } =
    useDraftRecoveryBannerLogic(setIsDraftSelectionOpen);

  if (isLoading || banner.count === 0 || !isVisible) return null;

  return (
    <>
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
            className="flex cursor-pointer items-center justify-between px-4 py-3"
            style={{ backgroundColor: `${colors.brand.orange}15` }}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${colors.brand.orange}20` }}
              >
                <FileText className="h-4 w-4" style={{ color: colors.brand.orange }} />
              </div>
              <div>
                <p className="font-mono text-xs font-medium" style={{ color: colors.text.primary }}>
                  {banner.count > 1 ? `${banner.count} Unsaved Drafts` : 'Unsaved Draft'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
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
                  <ChevronDown
                    className="h-4 w-4"
                    style={{ color: colors.text.secondaryOpacity65 }}
                  />
                ) : (
                  <ChevronUp
                    className="h-4 w-4"
                    style={{ color: colors.text.secondaryOpacity65 }}
                  />
                )}
              </Button>
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
                <X className="h-4 w-4" style={{ color: colors.text.secondaryOpacity65 }} />
              </Button>
            </div>
          </div>

          {/* Expandable Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-4 py-3">
                  {/* Draft Info */}
                  <div className="mb-3">
                    <p
                      className="truncate font-mono text-sm font-medium"
                      style={{ color: colors.text.primary }}
                    >
                      "{banner.latestTitle}"
                    </p>
                    <p
                      className="mt-1 font-mono text-xs"
                      style={{ color: colors.text.secondaryOpacity65 }}
                    >
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
                        className="flex-1 border-black/10 font-mono text-xs hover:bg-black/5"
                        style={{ color: colors.text.secondaryOpacity75 }}
                        onClick={actions.handleDiscardLatest}
                      >
                        Discard
                      </Button>
                    )}
                    <Button
                      size="sm"
                      className="flex-1 font-mono text-xs text-white"
                      style={{ backgroundColor: colors.brand.pink[500] }}
                      onClick={actions.handleView}
                    >
                      View Drafts
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      <DraftSelectionDialog
        open={isDraftSelectionOpen}
        onOpenChange={setIsDraftSelectionOpen}
        drafts={draftList}
      />
    </>
  );
};
