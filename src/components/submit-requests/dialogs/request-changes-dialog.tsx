import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { AlertCircle, Plus, X, Send } from 'lucide-react';

interface RequestChangesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: RequestChangesData) => void;
  prTitle?: string;
}

interface ChangeRequest {
  category: string;
  description: string;
}

interface RequestChangesData {
  summary: string;
  changes: ChangeRequest[];
}

const CATEGORIES = [
  'Grammar & Spelling',
  'Plot Consistency',
  'Character Development',
  'Pacing',
  'Tone & Style',
  'Other',
];

export function RequestChangesDialog({
  open,
  onOpenChange,
  onSubmit,
  prTitle = 'Submit Request',
}: RequestChangesDialogProps) {
  const [summary, setSummary] = useState('');
  const [changes, setChanges] = useState<ChangeRequest[]>([{ category: '', description: '' }]);

  const handleSubmit = () => {
    const validChanges = changes.filter((c) => c.category && c.description);
    onSubmit?.({ summary, changes: validChanges });
    onOpenChange(false);
    setSummary('');
    setChanges([{ category: '', description: '' }]);
  };

  const addChange = () => {
    setChanges([...changes, { category: '', description: '' }]);
  };

  const removeChange = (index: number) => {
    if (changes.length > 1) {
      setChanges(changes.filter((_, i) => i !== index));
    }
  };

  const updateChange = (index: number, updates: Partial<ChangeRequest>) => {
    setChanges(changes.map((c, i) => (i === index ? { ...c, ...updates } : c)));
  };

  const canSubmit = changes.some((c) => c.category && c.description);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-black/10 bg-white sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-text-primary flex items-center gap-2 font-serif">
            <div className="bg-brand-orange/15 flex h-8 w-8 items-center justify-center rounded-lg">
              <AlertCircle className="text-brand-orange h-4 w-4" />
            </div>
            Request Changes
          </DialogTitle>
          <DialogDescription className="text-text-secondary-70 font-mono text-sm">
            Request specific changes for:{' '}
            <span className="bg-brand-pink-500/15 text-brand-pink-500 rounded px-1.5 py-0.5 font-medium">
              {prTitle}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[400px] space-y-4 overflow-y-auto py-4">
          {/* Summary */}
          <div className="space-y-2">
            <Label className="text-text-primary font-medium">Summary (optional)</Label>
            <Textarea
              placeholder="Provide an overview of the changes needed..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={2}
              className="border-black/10 bg-white/50 focus:border-[#6b7cff] focus:ring-[#6b7cff]/20"
            />
          </div>

          {/* Change Requests */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-text-secondary-65 font-mono text-xs tracking-wider uppercase">
                Requested Changes
              </Label>
              <Button
                variant="outline"
                size="sm"
                onClick={addChange}
                className="gap-1 border-black/10 font-mono text-xs hover:bg-black/5"
              >
                <Plus className="h-3 w-3" />
                Add
              </Button>
            </div>

            {changes.map((change, index) => (
              <div
                key={index}
                className="space-y-3 rounded-xl border border-black/5 bg-black/[0.02] p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 space-y-2">
                    <Label className="text-text-secondary-65 font-mono text-xs">Category</Label>
                    <div className="flex flex-wrap gap-1.5">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => updateChange(index, { category: cat })}
                          className={cn(
                            'rounded-full border px-2.5 py-1 font-mono text-xs transition-all',
                            change.category === cat
                              ? 'bg-brand-orange border-transparent text-white'
                              : 'text-text-primary border-black/10 hover:border-black/20 hover:bg-white'
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  {changes.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 hover:bg-red-50 hover:text-red-500"
                      onClick={() => removeChange(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>

                <div className="space-y-1">
                  <Label className="text-text-secondary-65 font-mono text-xs">Description</Label>
                  <Input
                    placeholder="Describe the change needed..."
                    value={change.description}
                    onChange={(e) => updateChange(index, { description: e.target.value })}
                    className="border-black/10 bg-white/50 font-mono text-sm focus:border-[#6b7cff] focus:ring-[#6b7cff]/20"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-black/10 font-mono hover:bg-black/5"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="bg-brand-orange hover:bg-brand-orange-alt gap-2 font-mono text-white"
          >
            <Send className="h-4 w-4" />
            Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
