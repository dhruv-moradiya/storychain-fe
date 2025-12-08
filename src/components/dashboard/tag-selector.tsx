import React, { useState, useMemo } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { Tag, Search } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface TagSelectorProps {
  allTags: string[];
  value?: string[];
  onChange?: (tags: string[]) => void;
}

export default function TagSelector({
  allTags = [],
  value = [],
  onChange,
}: TagSelectorProps) {
  const [search, setSearch] = useState("");

  const filteredTags = useMemo(() => {
    return allTags.filter((tag) =>
      tag.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, allTags]);

  const toggleTag = (tag: string) => {
    const isSelected = value.includes(tag);
    const updated = isSelected
      ? value.filter((t) => t !== tag)
      : [...value, tag];
    onChange?.(updated);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="justify-start p-0 hover:bg-transparent w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-1 hover:bg-primary/10 rounded-lg p-1 text-muted-foreground hover:border-primary transition-colors cursor-pointer w-full">
            {value.length > 0 ? (
              <div className="flex items-center gap-2 flex-wrap">
                {value.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-1 border rounded-md px-2 py-0.5 text-[10px] uppercase text-muted-foreground"
                  >
                    <Tag className="size-3" />
                    {tag}
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-xs font-medium uppercase">Add Tags</span>
            )}
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={6}
        className="p-3 w-64 rounded-xl shadow-md border bg-background"
      >
        <InputGroup className="rounded-md overflow-hidden border bg-muted/30">
          <InputGroupInput
            placeholder="Search tags..."
            className="text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon>
            <Search className="size-4 opacity-70" />
          </InputGroupAddon>
        </InputGroup>

        <ul className="mt-3 flex flex-col gap-1 max-h-40 overflow-auto pr-1 scrollbar-thin">
          {filteredTags.length > 0 ? (
            filteredTags.map((tag) => {
              const checked = value.includes(tag);
              return (
                <li
                  key={tag}
                  className="flex items-center gap-2 text-sm px-2 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground transition cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() => toggleTag(tag)}
                  />
                  <span>{tag}</span>
                </li>
              );
            })
          ) : (
            <li className="text-xs text-muted-foreground px-3 py-2">
              No tags found
            </li>
          )}
        </ul>

        <Separator className="my-3" />

        <Button variant="outline" size="sm" className="w-full rounded-md">
          + Create new tag
        </Button>
      </PopoverContent>
    </Popover>
  );
}
