import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, Plus } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const mockStories = [
  {
    id: "1",
    title: "The Dawn of AI",
    description: "A short story about the rise of sentient machines.",
    startTime: new Date("2024-09-01T09:00:00"),
    updatedAt: new Date("2024-09-10T14:20:00"),
    contributors: [
      { name: "Alice", avatar: "/avatars/alice.png" },
      { name: "Bob", avatar: "/avatars/bob.png" },
    ],
  },
  {
    id: "2",
    title: "The Forest Keeper",
    description: "",
    startTime: new Date("2024-09-05T08:30:00"),
    updatedAt: new Date("2024-09-09T11:45:00"),
    contributors: [],
  },
];

const Story = () => {
  return (
    <div className="space-y-6 pb-4 w-full">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">Your Stories</h2>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          New Story
        </Button>
      </div>

      {/* Story Table */}
      {mockStories.length > 0 ? (
        <div className="rounded-md">
          <Table className="min-w-full">
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                <TableHead className="w-[20%]">Title</TableHead>
                <TableHead className="w-[30%]">Description</TableHead>
                <TableHead className="w-[15%]">Contributors</TableHead>
                <TableHead className="w-[15%]">Started</TableHead>
                <TableHead className="w-[15%]">Last Updated</TableHead>
                <TableHead className="text-right w-[10%]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockStories.map((story) => (
                <TableRow key={story.id}>
                  <TableCell className="truncate">{story.title}</TableCell>
                  <TableCell className="text-gray-500 dark:text-gray-400 max-w-[250px]">
                    <Tooltip>
                      <TooltipTrigger className="w-full">
                        <p className="w-full truncate">{story.description}</p>
                      </TooltipTrigger>
                      <TooltipContent>
                        {story.description || "—"}
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <div className="flex -space-x-2">
                      {story.contributors.length > 0 ? (
                        story.contributors.map((c, i) => (
                          <Avatar key={i} className="h-6 w-6 border">
                            <AvatarImage src={c.avatar} alt={c.name} />
                            <AvatarFallback>{c.name[0]}</AvatarFallback>
                          </Avatar>
                        ))
                      ) : (
                        <span className="text-gray-400 text-sm">None</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDistanceToNow(story.startTime, { addSuffix: true })}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDistanceToNow(story.updatedAt, { addSuffix: true })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="gap-1">
                      Open <ArrowRight className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
          <p className="text-lg font-medium mb-2">No stories found</p>
          <p className="text-sm">Start by creating your first story.</p>
          <Button variant="outline" className="mt-4 gap-2">
            <Plus className="h-4 w-4" />
            Create Story
          </Button>
        </div>
      )}
    </div>
  );
};

export default Story;
