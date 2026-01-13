import { useMemo, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Check, ChevronDown, Tag } from 'lucide-react';
import { createBadge } from '@/components/common/badge';
import { cn } from '@/lib/utils';

interface TagSelectorProps {
  allTags: string[];
  value?: string[];
  onChange?: (tags: string[]) => void;
  onCreateTag?: (tag: string) => void;
  placeholder?: string;
  className?: string;
}

export default function TagSelector({
  allTags = [],
  value = [],
  onChange,
  onCreateTag,
  placeholder = 'Add tags',
  className,
}: TagSelectorProps) {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
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
      setIsCreateDialogOpen(false);
    }
  };

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            className={cn('flex w-full items-center justify-between gap-2', className)}
          >
            <div className="flex flex-1 flex-wrap items-center gap-1">
              {value.length > 0 ? (
                value.map((tag) => (
                  <span key={tag}>
                    {createBadge({
                      label: tag,
                      color: 'pink',
                      size: 'xs',
                      shape: 'rounded',
                      style: 'soft',
                      removable: true,
                      onRemove: () => onChange?.(value.filter((t) => t !== tag)),
                    })}
                  </span>
                ))
              ) : (
                <span className="text-text-secondary-65 text-xs">{placeholder}</span>
              )}
            </div>
            <ChevronDown className="text-text-secondary-65 h-3 w-3 shrink-0" />
          </button>
        </PopoverTrigger>

        <PopoverContent
          sideOffset={4}
          align="start"
          className="w-[var(--radix-popover-trigger-width)] min-w-[280px] rounded border-black/10 bg-neutral-50 p-0 shadow-md"
        >
          {/* Search */}
          <div className="border-b border-black/5 p-2">
            <div className="relative">
              <Search className="text-text-secondary-65 absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2" />
              <Input
                placeholder="Search tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 border-black/10 bg-white/50 pl-8 text-xs"
              />
            </div>
          </div>

          {/* Tag list */}
          <div className="max-h-[160px] space-y-1 overflow-y-auto p-1.5">
            {filteredTags.length === 0 && search ? (
              <p className="text-text-secondary-65 py-3 text-center text-xs">No tags found</p>
            ) : filteredTags.length === 0 ? (
              <p className="text-text-secondary-65 py-3 text-center text-xs">No tags available</p>
            ) : (
              filteredTags.map((tag) => {
                const isSelected = value.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={cn(
                      'flex w-full items-center gap-2 rounded-md border px-2 py-1.5 text-left transition-all',
                      isSelected
                        ? 'border-brand-pink-500 bg-brand-pink-500/5'
                        : 'border-transparent hover:bg-black/[0.02]'
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-5 w-5 shrink-0 items-center justify-center rounded',
                        isSelected ? 'bg-brand-pink-500/15' : 'bg-black/5'
                      )}
                    >
                      <Tag
                        className={cn(
                          'h-3 w-3',
                          isSelected ? 'text-brand-pink-500' : 'text-text-secondary-65'
                        )}
                      />
                    </div>
                    <span className="text-text-primary flex-1 truncate text-xs">{tag}</span>
                    {isSelected && (
                      <div className="bg-brand-pink-500 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full">
                        <Check className="h-2 w-2 text-white" />
                      </div>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Create new tag button */}
          {onCreateTag && (
            <div className="border-t border-black/5 p-1.5">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsOpen(false);
                  setIsCreateDialogOpen(true);
                }}
                className="text-brand-pink-500 hover:bg-brand-pink-500/10 hover:text-brand-pink-600 h-8 w-full justify-start gap-2"
              >
                <Plus className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Create new tag</span>
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>

      {/* Create Tag Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="border-black/10 bg-white sm:max-w-sm">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="bg-brand-pink-500/10 flex h-10 w-10 items-center justify-center rounded-xl">
                <Tag className="text-brand-pink-500 h-5 w-5" />
              </div>
              <div>
                <DialogTitle className="text-text-primary text-base font-semibold">
                  Create New Tag
                </DialogTitle>
                <p className="text-text-secondary-65 text-xs">Add a new tag to your collection</p>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-3 py-3">
            <div className="relative">
              <Tag className="text-text-secondary-65 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Enter tag name..."
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                className="h-10 border-black/10 bg-white/50 pl-9 text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreateTag();
                }}
                autoFocus
              />
            </div>

            {newTagName.trim() && (
              <div className="flex items-center gap-2 rounded-lg border border-black/5 bg-black/[0.02] px-3 py-2">
                <span className="text-text-secondary-65 text-xs">Preview:</span>
                {createBadge({
                  label: newTagName.trim(),
                  color: 'pink',
                  size: 'sm',
                  shape: 'rounded',
                  style: 'soft',
                })}
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button variant="ghost" size="sm" className="text-text-secondary hover:bg-black/5">
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={handleCreateTag}
              disabled={!newTagName.trim()}
              size="sm"
              className="bg-brand-pink-500 hover:bg-brand-pink-600 text-white"
            >
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Create Tag
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
