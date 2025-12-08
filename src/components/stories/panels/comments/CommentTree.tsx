import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  MessageCircle,
  ArrowUp,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import { comments } from "../../initialData";

// Example data type
interface User {
  name: string;
  avatar?: string;
}
export interface Comment {
  id: string;
  user: User;
  text: string;
  createdAt: string;
  likes: number;
  dislikes: number;
  replies: Comment[];
}

export const CommentTree = () => (
  <div className="w-full flex flex-col gap-4">
    {comments.map((comment) => (
      <CommentCard key={comment.id} comment={comment} />
    ))}
  </div>
);

const CommentCard = ({
  comment,
  level = 0,
}: {
  comment: Comment;
  level?: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isReplying) textareaRef.current?.focus();
  }, [isReplying]);

  const handleReply = () => {
    // TODO: handle reply logic
    setIsReplying(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn("text-sm shadow-sm", level > 0 && "ml-6 mt-2")}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <Avatar className="h-6 w-6">
          <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
          <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <p className="font-medium text-foreground">{comment.user.name}</p>
        <span className="text-xs text-muted-foreground">
          · {comment.createdAt}
        </span>
      </div>

      {/* Comment text */}
      <p className="text-muted-foreground mb-2 ml-8">{comment.text}</p>

      {/* Actions */}
      <div className="flex items-center gap-1 text-xs text-muted-foreground ml-8">
        <button className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-primary/10 hover:text-primary">
          <ThumbsUp className="h-3.5 w-3.5" />
          {comment.likes > 0 && <span>{comment.likes}</span>}
        </button>

        <button className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-destructive/10 hover:text-destructive">
          <ThumbsDown className="h-3.5 w-3.5" />
          {comment.dislikes > 0 && <span>{comment.dislikes}</span>}
        </button>

        <button
          onClick={() => setIsReplying(!isReplying)}
          className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-primary/10 hover:text-primary"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          <span>Reply</span>
        </button>

        <button className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-primary/10 hover:text-primary">
          <Share2 className="h-3.5 w-3.5" />
          <span>Share</span>
        </button>

        {comment.replies.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="shrink-0 flex items-center ml-auto px-2 py-1 rounded-md hover:bg-primary/10 hover:text-primary"
          >
            {isExpanded ? (
              <ChevronDown className="h-3.5 w-3.5" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" />
            )}
            <span>
              {isExpanded
                ? "Hide replies"
                : `${comment.replies.length} replies`}
            </span>
          </button>
        )}
      </div>

      {/* Reply Box */}
      <AnimatePresence>
        {isReplying && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-3 ml-8"
          >
            <InputGroup>
              <TextareaAutosize
                ref={textareaRef}
                placeholder="Write a reply..."
                className="flex min-h-[40px] w-full resize-none rounded-md bg-transparent px-3 py-2 text-sm outline-none"
              />
              <InputGroupAddon align="block-end">
                <InputGroupButton
                  className="ml-auto"
                  size="icon-sm"
                  variant="secondary"
                  onClick={handleReply}
                >
                  <ArrowUp className="h-4 w-4" />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Replies */}
      <AnimatePresence initial={false}>
        {isExpanded && comment.replies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-col gap-3 mt-2">
              {comment.replies.map((reply) => (
                <CommentCard key={reply.id} comment={reply} level={level + 1} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
