import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Smile } from 'lucide-react';
import { gitHubEmojis } from '@tiptap/extension-emoji';

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
}

export function EmojiPicker({ onSelect }: EmojiPickerProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');

  const groupedEmojis = React.useMemo(() => {
    const filtered = gitHubEmojis.filter((e) => e.name.toLowerCase().includes(query.toLowerCase()));
    return filtered.reduce(
      (acc, emoji) => {
        const group = emoji.group || 'Other';
        if (!acc[group]) acc[group] = [];
        acc[group].push(emoji);
        return acc;
      },
      {} as Record<string, typeof gitHubEmojis>
    );
  }, [query]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Smile className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-72 p-0" align="start">
        <div className="p-2">
          <Input
            placeholder="Search emoji..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mb-2 h-8"
          />
          <ScrollArea className="h-72 pr-2">
            {Object.keys(groupedEmojis).map((group) => (
              <div key={group}>
                <h3 className="text-muted-foreground mb-1 px-2 text-xs font-medium">{group}</h3>
                <div className="grid grid-cols-6 gap-2 p-1">
                  {groupedEmojis[group].map((emoji) => (
                    <button
                      key={emoji.id}
                      onClick={() => {
                        onSelect(emoji.skins?.[0]?.native || emoji.emoji);
                        setOpen(false);
                      }}
                      className="hover:bg-muted flex items-center justify-center rounded-md p-1 text-xl transition-colors"
                      title={emoji.name}
                    >
                      {emoji.emoji ?? <img src={emoji.fallbackImage} alt={emoji.name} />}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {Object.keys(groupedEmojis).length === 0 && (
              <p className="text-muted-foreground py-4 text-center text-sm">No results</p>
            )}
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
}

{
  /* <Command>
          <CommandInput placeholder="Search emoji..." />
          <ScrollArea className="h-64">
            <CommandList>
              <CommandGroup>
                {emojis.map((emoji, i) => (
                  <CommandItem
                    key={i}
                    onSelect={() => {
                      onSelect(emoji.emoji || "")
                      setOpen(false)
                    }}
                    className="cursor-pointer"
                  >
                    <span className="text-xl mr-2">{emoji?.emoji}</span>
                    <span className="text-sm text-muted-foreground">
                      {emoji.name}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </ScrollArea>
        </Command> */
}
