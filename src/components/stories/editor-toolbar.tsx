import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Bold, Italic, Underline, Link, Type } from "lucide-react";

const EditorToolbar = () => {
  return (
    <TooltipProvider>
      <div className="border-b p-2 bg-muted/40 flex items-center justify-between flex-wrap gap-2">
        {/* Text formatting buttons */}
        <ButtonGroup className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                <Bold className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                <Italic className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                <Underline className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Underline</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                <Link className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Insert Link</TooltipContent>
          </Tooltip>
        </ButtonGroup>

        {/* Dropdowns for heading/font size */}
        <div className="flex gap-1">
          {/* Heading dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Type className="w-4 h-4 mr-1" /> Heading
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>H1</DropdownMenuItem>
              <DropdownMenuItem>H2</DropdownMenuItem>
              <DropdownMenuItem>H3</DropdownMenuItem>
              <DropdownMenuItem>H4</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Font style dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Font
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Arial</DropdownMenuItem>
              <DropdownMenuItem>Roboto</DropdownMenuItem>
              <DropdownMenuItem>Times New Roman</DropdownMenuItem>
              <DropdownMenuItem>Courier New</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Preview button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                Preview
              </Button>
            </TooltipTrigger>
            <TooltipContent>Preview Story</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default EditorToolbar;
