import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { CommentTree } from './CommentTree';

interface Props {
  onClose: () => void;
}

export default function CommentsPanel({ onClose }: Props) {
  return (
    <div className="relative flex h-full w-full p-4 shadow-lg">
      <Button
        variant="outline"
        size="icon"
        className="absolute top-2 right-2 size-7"
        onClick={onClose}
      >
        <X />
      </Button>
      <CommentTree />
    </div>
  );
}
