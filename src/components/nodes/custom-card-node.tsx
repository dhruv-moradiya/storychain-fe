import type { CustomNodeProps } from "@/type/flow.type";
import { Handle, Position } from "@xyflow/react";
import {
  Star,
  Users,
  Clock,
  MessageCircle,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Plus,
} from "lucide-react";

const CustomCardNode = ({ id, data, selected }: CustomNodeProps) => {
  return (
    <div
      className={`w-72 border-2 border-border p-3 rounded-xl flex flex-col items-start bg-background backdrop-blur-xs transition-all duration-200 relative group ${
        selected
          ? "border-2 !border-primary shadow-lg"
          : "border border-border hover:shadow-sm"
      }`}
    >
      {/* Top Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-0.5 !bg-primary !rounded-[3px] hover:!bg-primary/80 border-0!"
      />

      {/* Bottom Handle with hover + icon */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="left-handle"
        className="!w-3 !h-0.5 !bg-primary !border-none !rounded-[3px] relative"
      >
        <span
          className={`absolute -top-1 left-1/2 -translate-x-1/2 transition hover:scale-x-125 ${
            data.hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <Plus size={16} className="text-white bg-primary rounded-full p-1" />
        </span>
      </Handle>

      {/* Favorite button */}
      <button className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-yellow-500">
        <Star size={16} />
      </button>

      {/* User Info */}
      <div className="flex items-center gap-3 mt-2">
        <div className="w-10 h-10 border bg-muted flex items-center justify-center rounded-md">
          <p className="text-foreground font-semibold text-base">
            {data.userInitial}
          </p>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-sm font-medium text-foreground">{data.username}</p>
          <p className="text-muted-foreground text-xs">{data.timeAgo}</p>
        </div>
      </div>

      {/* Chapter Info */}
      <div className="w-full mt-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
            {data.chapter}
          </span>
          <h3 className="text-sm font-semibold text-foreground truncate">
            {data.title}
          </h3>
        </div>

        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Users size={14} className="text-primary" />
              <span>{data.readers} readers</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} className="text-secondary" />
              <span>{data.readTime} min read</span>
            </span>
          </div>

          <button className="px-3 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition">
            Read
          </button>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="mt-3 flex items-center justify-between w-full">
        <div className="flex gap-1">
          <button className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-primary">
            <MessageCircle size={14} />
            <span className="text-xs font-medium">Comment</span>
          </button>
          <button className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-destructive">
            <Heart size={14} />
            <span className="text-xs font-medium">{data.likes}</span>
          </button>
        </div>

        <div className="flex gap-1">
          <button className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-green-600">
            <ThumbsUp size={14} />
          </button>
          <button className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-destructive">
            <ThumbsDown size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomCardNode;
