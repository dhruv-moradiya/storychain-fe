import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommentTree } from "../comments/CommentTree";
import { Check, ChevronLeft, RotateCw, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import type { Request } from "@/type/flow.type";
import { RequestStatusBadge } from "./RequestStatusBadge";

interface StoryRequestDetailProps {
  request: Request;
  onBack: () => void;
}

export default function StoryRequestDetail({
  request,
  onBack,
}: StoryRequestDetailProps) {
  const [openChangeDialog, setOpenChangeDialog] = useState(false);

  return (
    <div className="flex flex-col h-full w-full p-4">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="size-7"
            onClick={onBack}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <h2 className="font-semibold text-base truncate">{request.title}</h2>
        </div>

        <RequestStatusBadge status={request.status} />
      </div>

      {/* Scrollable Content */}
      <div className="flex flex-col gap-4 mt-4">
        {/* Chapter & Story Info */}
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Chapter</span>
            <Badge variant="secondary" className="text-xs font-medium">
              {request.chapterName}
            </Badge>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <span className="text-xs text-muted-foreground">Story</span>
            <Badge variant="outline" className="text-xs font-medium">
              {request.storyTitle}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Description */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Description</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {request.description}
          </p>
        </div>

        {/* Change Type */}
        <div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 text-xs h-8"
            onClick={() => setOpenChangeDialog(true)}
          >
            <FileText className="size-3.5" />{" "}
            {request.changeType === "new"
              ? "New Chapter"
              : "Update Existing Chapter"}
          </Button>

          <Dialog open={openChangeDialog} onOpenChange={setOpenChangeDialog}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-base font-semibold">
                  {request.changeType === "new"
                    ? "New Chapter Content"
                    : "Changes in Chapter"}
                </DialogTitle>
              </DialogHeader>
              <div className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                {request.changeType || "No detailed changes provided."}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Separator />

        {/* Contributors */}
        {request.contributors && request.contributors.length > 0 && (
          <>
            <div>
              <h3 className="text-sm font-semibold mb-2">Contributors</h3>
              <div className="flex flex-wrap gap-2">
                {request.contributors.map((contrib) => (
                  <Badge
                    key={contrib}
                    variant="outline"
                    className="text-xs font-medium"
                  >
                    {contrib}
                  </Badge>
                ))}
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* Author Info */}
        <div className="flex items-center gap-2">
          <Avatar className="size-7">
            {request.author.avatar && (
              <AvatarImage
                src={request.author.avatar}
                alt={request.author.name}
              />
            )}
            <AvatarFallback className="text-xs">
              {request.author.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{request.author.name}</span>
            <span className="text-xs text-muted-foreground">
              submitted this chapter request • {request.timeAgo}
            </span>
          </div>
        </div>

        <Separator />

        {/* Discussion */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Discussion</h3>
            <Button size="sm" variant="outline" className="h-7 text-xs">
              Add Comment
            </Button>
          </div>
          <CommentTree />
        </div>

        <Separator />

        {/* Leave Review */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Leave a review</h3>
          <Textarea
            placeholder="Write your feedback..."
            className="resize-none h-20 text-sm"
          />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="border-t p-3 flex justify-end gap-2 bg-background mt-auto">
        {(request.status === "open" || request.status === "approved") && (
          <Button
            size="sm"
            className="bg-primary text-primary-foreground flex items-center gap-1.5 text-xs h-8"
          >
            <Check className="size-3.5" /> Accept
          </Button>
        )}

        {request.status === "rejected" && (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 text-xs h-8"
          >
            <RotateCw className="size-3.5" /> Reopen
          </Button>
        )}

        {request.status === "merged" && (
          <span className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Check className="size-3.5" /> This chapter request has been
            accepted
          </span>
        )}
      </div>
    </div>
  );
}
