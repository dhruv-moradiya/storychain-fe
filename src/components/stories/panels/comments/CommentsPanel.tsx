import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { CommentTree } from "./CommentTree";

interface Props {
  onClose: () => void;
}

export default function CommentsPanel({ onClose }: Props) {
  return (
    <div className="flex h-full shadow-lg w-full relative p-4">
      <Button
        variant="outline"
        size="icon"
        className="size-7 absolute right-2 top-2"
        onClick={onClose}
      >
        <X />
      </Button>
      <CommentTree />
    </div>
  );
}
