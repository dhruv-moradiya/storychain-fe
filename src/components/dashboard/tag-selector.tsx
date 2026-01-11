import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

interface TagSelectorProps {
  allTags: string[];
  value?: string[];
  onChange?: (tags: string[]) => void;
  onCreateTag?: (tag: string) => void;
}

export default function TagSelector({
  allTags = [],
  value = [],
  onChange,
  onCreateTag,
}: TagSelectorProps) {
  const [search, setSearch] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTagName, setNewTagName] = useState('');

  const filteredTags = useMemo(() => {
    return allTags.filter((tag) => tag.toLowerCase().includes(search.toLowerCase()));
  }, [search, allTags]);

  const toggleTag = (tag: string) => {
    const isSelected = value.includes(tag);
    const updated = isSelected ? value.filter((t) => t !== tag) : [...value, tag];
    onChange?.(updated);
  };

  const handleCreateTag = () => {
    if (newTagName.trim()) {
      onCreateTag?.(newTagName.trim());
      setNewTagName('');
      setIsCreateModalOpen(false);
    }
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start p-0 hover:bg-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-text-secondary-65 hover:bg-brand-pink-500/10 flex w-full cursor-pointer items-center gap-1 rounded-lg p-1 transition-colors">
              {value.length > 0 ? (
                <div className="flex flex-wrap items-center gap-1">
                  {value.map((tag) => (
                    <span
                      key={tag}
                      className="border-brand-pink-500/40 bg-brand-pink-500/10 text-brand-pink-500 rounded-md border px-2 py-0.5 text-xs font-medium"
                    >
                      {tag}
                    </span>
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
          className="border-border/30 bg-cream-95 w-64 rounded-xl border p-3 shadow-md"
        >
          <InputGroup className="border-border/30 overflow-hidden rounded-lg border bg-white/80">
            <InputGroupInput
              placeholder="Search tags..."
              className="text-text-primary placeholder:text-text-secondary-65 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputGroupAddon>
              <Search className="text-text-secondary-65 size-4" />
            </InputGroupAddon>
          </InputGroup>

          <ul className="scrollbar-thin mt-3 flex max-h-40 flex-col gap-1 overflow-auto pr-1">
            {filteredTags.length > 0 ? (
              filteredTags.map((tag) => {
                const isSelected = value.includes(tag);
                return (
                  <li
                    key={tag}
                    className={cn(
                      'cursor-pointer rounded-md px-3 py-1.5 text-sm transition-all',
                      isSelected
                        ? 'border-brand-pink-500 bg-brand-pink-500/10 text-brand-pink-600 border font-medium'
                        : 'text-text-secondary hover:border-brand-pink-500/30 border border-transparent bg-white/60 hover:bg-white/80'
                    )}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </li>
                );
              })
            ) : (
              <li className="text-text-secondary-65 px-3 py-2 text-xs">No tags found</li>
            )}
          </ul>

          <div className="border-border/50 mt-3 border-t pt-3">
            <Button
              variant="outline"
              size="sm"
              className="border-brand-pink-500/40 bg-brand-pink-500/5 text-brand-pink-500 hover:border-brand-pink-500 hover:bg-brand-pink-500/10 w-full gap-1.5 rounded-lg border-dashed"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="h-3.5 w-3.5" />
              Create new tag
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Create Tag Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="border-border/30 bg-cream-95 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-text-primary flex items-center gap-2">
              <div className="bg-brand-pink-500/15 flex h-8 w-8 items-center justify-center rounded-lg">
                <Plus className="text-brand-pink-500 h-4 w-4" />
              </div>
              Create New Tag
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="tag-name" className="text-text-secondary text-sm font-medium">
                Tag Name
              </Label>
              <Input
                id="tag-name"
                placeholder="Enter tag name..."
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                className="border-border/30 text-text-primary placeholder:text-text-secondary-65 focus-visible:ring-brand-pink-500/30 bg-white/80"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCreateTag();
                  }
                }}
              />
            </div>

            {newTagName.trim() && (
              <div className="space-y-2">
                <Label className="text-text-secondary text-sm font-medium">Preview</Label>
                <div className="flex items-center gap-2">
                  <span className="border-brand-pink-500/40 bg-brand-pink-500/10 text-brand-pink-500 rounded-md border px-2.5 py-1 text-sm font-medium">
                    {newTagName.trim()}
                  </span>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="border-border text-text-secondary hover:bg-muted/50"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={handleCreateTag}
              disabled={!newTagName.trim()}
              className="bg-brand-pink-500 hover:bg-brand-pink-600 text-white shadow-[0_2px_8px_var(--brand-pink-shadow25)] disabled:opacity-50"
            >
              <Plus className="mr-1.5 h-4 w-4" />
              Create Tag
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
