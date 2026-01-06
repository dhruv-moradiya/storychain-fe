import { Button } from '../ui/button';
import { ButtonGroup } from '../ui/button-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Bold, Italic, Underline, Link, Type } from 'lucide-react';

const EditorToolbar = () => {
  return (
    <TooltipProvider>
      <div className="bg-muted/40 flex flex-wrap items-center justify-between gap-2 border-b p-2">
        {/* Text formatting buttons */}
        <ButtonGroup className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                <Bold className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                <Italic className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                <Underline className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Underline</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                <Link className="h-4 w-4" />
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
                <Type className="mr-1 h-4 w-4" /> Heading
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
