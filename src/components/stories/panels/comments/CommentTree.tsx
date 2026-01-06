import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  MessageCircle,
  ArrowUp,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { InputGroup, InputGroupAddon, InputGroupButton } from '@/components/ui/input-group';
import { comments } from '../../initialData';

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
  <div className="flex w-full flex-col gap-4">
    {comments.map((comment) => (
      <CommentCard key={comment.id} comment={comment} />
    ))}
  </div>
);

const CommentCard = ({ comment, level = 0 }: { comment: Comment; level?: number }) => {
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
      className={cn('text-sm shadow-sm', level > 0 && 'mt-2 ml-6')}
    >
      {/* Header */}
      <div className="mb-1 flex items-center gap-2">
        <Avatar className="h-6 w-6">
          <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
          <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <p className="text-foreground font-medium">{comment.user.name}</p>
        <span className="text-muted-foreground text-xs">· {comment.createdAt}</span>
      </div>

      {/* Comment text */}
      <p className="text-muted-foreground mb-2 ml-8">{comment.text}</p>

      {/* Actions */}
      <div className="text-muted-foreground ml-8 flex items-center gap-1 text-xs">
        <button className="hover:bg-primary/10 hover:text-primary flex items-center gap-1 rounded-md px-2 py-1">
          <ThumbsUp className="h-3.5 w-3.5" />
          {comment.likes > 0 && <span>{comment.likes}</span>}
        </button>

        <button className="hover:bg-destructive/10 hover:text-destructive flex items-center gap-1 rounded-md px-2 py-1">
          <ThumbsDown className="h-3.5 w-3.5" />
          {comment.dislikes > 0 && <span>{comment.dislikes}</span>}
        </button>

        <button
          onClick={() => setIsReplying(!isReplying)}
          className="hover:bg-primary/10 hover:text-primary flex items-center gap-1 rounded-md px-2 py-1"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          <span>Reply</span>
        </button>

        <button className="hover:bg-primary/10 hover:text-primary flex items-center gap-1 rounded-md px-2 py-1">
          <Share2 className="h-3.5 w-3.5" />
          <span>Share</span>
        </button>

        {comment.replies.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="hover:bg-primary/10 hover:text-primary ml-auto flex shrink-0 items-center rounded-md px-2 py-1"
          >
            {isExpanded ? (
              <ChevronDown className="h-3.5 w-3.5" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" />
            )}
            <span>{isExpanded ? 'Hide replies' : `${comment.replies.length} replies`}</span>
          </button>
        )}
      </div>

      {/* Reply Box */}
      <AnimatePresence>
        {isReplying && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
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
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mt-2 flex flex-col gap-3">
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
