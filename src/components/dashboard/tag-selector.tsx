import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Search, Tag } from 'lucide-react';
import { useMemo, useState } from 'react';

interface TagSelectorProps {
  allTags: string[];
  value?: string[];
  onChange?: (tags: string[]) => void;
}

export default function TagSelector({ allTags = [], value = [], onChange }: TagSelectorProps) {
  const [search, setSearch] = useState('');

  const filteredTags = useMemo(() => {
    return allTags.filter((tag) => tag.toLowerCase().includes(search.toLowerCase()));
  }, [search, allTags]);

  const toggleTag = (tag: string) => {
    const isSelected = value.includes(tag);
    const updated = isSelected ? value.filter((t) => t !== tag) : [...value, tag];
    onChange?.(updated);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start p-0 hover:bg-transparent"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="hover:bg-primary/10 text-muted-foreground hover:border-primary flex w-full cursor-pointer items-center gap-1 rounded-lg p-1 transition-colors">
            {value.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2">
                {value.map((tag) => (
                  <div
                    key={tag}
                    className="text-muted-foreground flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] uppercase"
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

      <PopoverContent sideOffset={6} className="bg-background w-64 rounded-xl border p-3 shadow-md">
        <InputGroup className="bg-muted/30 overflow-hidden rounded-md border">
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

        <ul className="scrollbar-thin mt-3 flex max-h-40 flex-col gap-1 overflow-auto pr-1">
          {filteredTags.length > 0 ? (
            filteredTags.map((tag) => {
              const checked = value.includes(tag);
              return (
                <li
                  key={tag}
                  className="hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition"
                  onClick={() => toggleTag(tag)}
                >
                  <Checkbox checked={checked} onCheckedChange={() => toggleTag(tag)} />
                  <span>{tag}</span>
                </li>
              );
            })
          ) : (
            <li className="text-muted-foreground px-3 py-2 text-xs">No tags found</li>
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
