import type { IChapterNodeProps } from '@/type/story-canvas.type';
import { Handle, Position } from '@xyflow/react';
import { Clock, Heart, MessageCircle, Plus, Star, ThumbsDown, ThumbsUp, Users } from 'lucide-react';
import { useNavigate } from 'react-router';

const CustomCardNode = ({ id, data, selected }: IChapterNodeProps) => {
  const navigate = useNavigate();
  const chapterLabel = `Ch. ${data.depth + 1}`;
  const timeAgo = new Date(data.createdAt).toLocaleDateString();

  return (
    <div
      className={`border-border bg-background group relative flex w-72 flex-col rounded-xl border-2 p-3 backdrop-blur-xs transition-all duration-200 ${
        selected ? '!border-primary shadow-lg' : 'hover:shadow-sm'
      }`}
    >
      {/* Top Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-primary !h-0.5 !w-3 !rounded-[3px] !border-none"
      />

      {/* Bottom Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-primary relative !h-0.5 !w-3 !rounded-[3px] !border-none"
        onClick={() => {
          navigate(`/stories/${data.storyId ?? 'root'}/chapter/${data._id}/new`);
          console.log('Add node between edge:', id);
        }}
      >
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 opacity-0 transition group-hover:opacity-100">
          <Plus size={16} className="bg-primary rounded-full p-1 text-white" />
        </span>
      </Handle>

      {/* Favorite */}
      <button className="hover:bg-accent text-muted-foreground absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg transition hover:text-yellow-500">
        <Star size={16} />
      </button>

      {/* Author */}
      <div className="mt-2 flex items-center gap-3">
        <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-md border">
          {data.author.avatarUrl ? (
            <img
              src={data.author.avatarUrl}
              alt={data.author.username}
              className="h-full w-full rounded-md object-cover"
            />
          ) : (
            <span className="text-sm font-semibold">
              {data.author.username.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div>
          <p className="text-sm font-medium">{data.author.username}</p>
          <p className="text-muted-foreground text-xs">{timeAgo}</p>
        </div>
      </div>

      {/* Chapter */}
      <div className="mt-3">
        <div className="flex items-center gap-2">
          <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-[10px] font-medium">
            {chapterLabel}
          </span>
          <h3 className="truncate text-sm font-semibold">{data.title}</h3>
        </div>

        <div className="text-muted-foreground mt-2 flex items-center justify-between text-xs">
          <div className="flex gap-3">
            <span className="flex items-center gap-1">
              <Users size={14} className="text-primary" />
              {data.stats.reads}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} className="text-secondary" />
              {Math.max(1, Math.round(data.title.split(' ').length / 200))} min
            </span>
          </div>

          <button className="bg-primary/10 text-primary hover:bg-primary/20 rounded-md px-3 py-1 text-xs font-medium">
            Read
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-3 flex justify-between">
        <div className="flex gap-1">
          <button
            onClick={() => data.onCommentClick(id)}
            className="hover:bg-accent flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs transition"
          >
            <MessageCircle size={14} />
            {data.stats.comments}
          </button>

          <button className="hover:bg-accent flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs transition">
            <Heart size={14} />
            {data.votes.upvotes}
          </button>
        </div>

        <div className="flex gap-1">
          <button className="hover:bg-accent flex h-8 w-8 items-center justify-center rounded-lg text-green-600">
            <ThumbsUp size={14} />
          </button>
          <button className="hover:bg-accent text-destructive flex h-8 w-8 items-center justify-center rounded-lg">
            <ThumbsDown size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomCardNode;
