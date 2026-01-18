import {
  BadgeGroup,
  contentRatingBadge,
  genresToBadgeConfigs,
  storyStatusBadge,
} from '@/components/common/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { IStory } from '@/type/story';
import { formatDistance } from 'date-fns';
import { ArrowRight, User } from 'lucide-react';
import { useNavigate } from 'react-router';

interface StoryCardProps {
  story: IStory;
}

const StoryCard = ({ story }: StoryCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/stories/${story.slug}`)}
      className="group/story-card bg-card/50 relative cursor-pointer overflow-hidden rounded-[14px] p-1.5 transition-all duration-300"
    >
      {/* ✨ HOVER GRADIENT OVERLAY */}
      <div className="from-primary/5 via-secondary/10 to-primary/10 pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover/story-card:opacity-100" />

      {/* ================= CARD CONTENT ================= */}
      <div className="relative flex flex-1 flex-col justify-between gap-2 rounded-[12px] border p-3 shadow">
        {/* TOP ACCENT */}
        <div className="bg-secondary absolute inset-x-16 top-0 h-[2px] rounded-b-full" />

        {/* USER + SLUG */}
        <div className="mb-3 flex items-center gap-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full border">
            <User size={18} className="text-muted-foreground" />
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-muted-foreground truncate text-sm">{story.slug}</div>
            </TooltipTrigger>
            <TooltipContent side="top">{story.slug}</TooltipContent>
          </Tooltip>
        </div>

        {/* STATUS + TITLE */}
        <div className="mb-3 flex flex-col gap-2">
          {storyStatusBadge(story.status, { size: 'xs', className: 'w-fit' })}
          <Tooltip>
            <TooltipTrigger asChild>
              <h3 className="line-clamp-2 min-h-[2.5rem] text-[15px] leading-tight font-medium">
                {story.title}
              </h3>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[250px]">
              {story.title}
            </TooltipContent>
          </Tooltip>
        </div>

        {/* RATING + TAGS */}
        <div className="mt-auto">
          <div className="mb-2 flex items-center gap-2 text-xs">
            <span className="text-muted-foreground font-medium">Rating:</span>
            {contentRatingBadge(story.settings.contentRating, { size: 'xs' })}
          </div>

          {story.tags && story.tags.length > 0 && (
            <BadgeGroup
              badges={genresToBadgeConfigs(story.tags, { size: 'xs' })}
              gap="xs"
              max={2}
            />
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative mt-1.5 h-5 overflow-hidden">
        <span className="text-muted-foreground absolute top-0 left-1 text-[11px] transition-transform ease-[cubic-bezier(0.2,0.4,0,1)] group-hover/story-card:-translate-x-[calc(100%+4px)]">
          Updated{' '}
          <time dateTime="2025-10-08T09:46:43+05:30">
            {formatDistance(story.updatedAt, new Date())}
          </time>
        </span>

        <span className="absolute top-0 right-0 flex translate-x-full items-center gap-1 text-[11px] transition-transform ease-[cubic-bezier(0.2,0.4,0,1)] group-hover/story-card:-translate-x-2">
          Go to Story <ArrowRight size={12} />
        </span>
      </div>
    </div>
  );
};

export default StoryCard;
