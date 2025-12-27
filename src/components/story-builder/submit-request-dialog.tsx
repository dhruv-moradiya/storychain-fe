import { DiffViewer } from '@/components/common/diff-viewer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, GitPullRequest, Plus, X } from 'lucide-react';
import { useState } from 'react';

export interface SubmitRequestData {
  title: string;
  description: string;
  type: 'NEW_CHAPTER' | 'EDIT_CHAPTER' | 'DELETE_CHAPTER';
  parentChapterId: string;
  labels: string[];
  isDraft: boolean;
}

interface ParentChapter {
  id: string;
  title: string;
  depth: number;
}

interface SubmitRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: SubmitRequestData) => void;
  parentChapters?: ParentChapter[];
  wordCount?: number;
  charCount?: number;
  isLoading?: boolean;
  originalContent?: string;
  modifiedContent?: string;
}

const AVAILABLE_LABELS = [
  {
    value: 'plot-twist',
    label: 'Plot Twist',
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  },
  {
    value: 'character-development',
    label: 'Character Development',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  },
  {
    value: 'world-building',
    label: 'World Building',
    color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  },
  {
    value: 'needs-review',
    label: 'Needs Review',
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  },
  {
    value: 'grammar-fix',
    label: 'Grammar Fix',
    color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  },
  {
    value: 'good-first-pr',
    label: 'Good First PR',
    color: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  },
];

const PR_TYPES = [
  { value: 'NEW_CHAPTER', label: 'New Chapter', description: 'Add a new chapter to the story' },
  { value: 'EDIT_CHAPTER', label: 'Edit Chapter', description: 'Modify an existing chapter' },
  {
    value: 'DELETE_CHAPTER',
    label: 'Delete Chapter',
    description: 'Remove a chapter from the story',
  },
];

export function SubmitRequestDialog({
  open,
  onOpenChange,
  onSubmit,
  parentChapters = [],
  wordCount = 0,
  charCount = 0,
  isLoading = false,
  originalContent,
  modifiedContent,
}: SubmitRequestDialogProps) {
  const [formData, setFormData] = useState<SubmitRequestData>({
    title: '',
    description: '',
    type: 'NEW_CHAPTER',
    parentChapterId: '',
    labels: [],
    isDraft: false,
  });
  const [showDiff, setShowDiff] = useState(false);
  const hasDiff = originalContent !== undefined && modifiedContent !== undefined;

  const toggleLabel = (label: string) => {
    setFormData((prev) => ({
      ...prev,
      labels: prev.labels.includes(label)
        ? prev.labels.filter((l) => l !== label)
        : [...prev.labels, label],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'NEW_CHAPTER',
      parentChapterId: '',
      labels: [],
      isDraft: false,
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) resetForm();
        onOpenChange(isOpen);
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GitPullRequest className="h-5 w-5" />
            Create Submit Request
          </DialogTitle>
          <DialogDescription>
            Submit your changes for review. The story owner and collaborators will be notified.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="pr-title">Title</Label>
            <Input
              id="pr-title"
              placeholder="Add Chapter 5: The Dark Forest"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="pr-description">Description</Label>
            <Textarea
              id="pr-description"
              placeholder="Describe your changes and why they improve the story..."
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={4}
            />
          </div>

          {/* Type, Parent Chapter, Labels */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Type */}
            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    type: value as SubmitRequestData['type'],
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PR_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex flex-col">
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Parent Chapter */}
            <div className="space-y-2">
              <Label>Parent Chapter</Label>
              <Select
                value={formData.parentChapterId}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, parentChapterId: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select parent..." />
                </SelectTrigger>
                <SelectContent>
                  {parentChapters.length > 0 ? (
                    parentChapters.map((chapter) => (
                      <SelectItem key={chapter.id} value={chapter.id}>
                        <span style={{ paddingLeft: chapter.depth * 12 }}>{chapter.title}</span>
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="root">Story Root</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Labels */}
            <div className="space-y-2">
              <Label>Labels</Label>
              <Select onValueChange={toggleLabel}>
                <SelectTrigger>
                  <div className="flex items-center gap-1">
                    <Plus className="h-3 w-3" />
                    <span>Add label</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_LABELS.map((label) => (
                    <SelectItem
                      key={label.value}
                      value={label.value}
                      disabled={formData.labels.includes(label.value)}
                    >
                      {label.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Selected Labels */}
          {formData.labels.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.labels.map((labelValue) => {
                const label = AVAILABLE_LABELS.find((l) => l.value === labelValue);
                return (
                  <Badge key={labelValue} variant="secondary" className={cn('gap-1', label?.color)}>
                    {label?.label || labelValue}
                    <button
                      type="button"
                      onClick={() => toggleLabel(labelValue)}
                      className="ml-1 rounded-full hover:bg-black/10"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                );
              })}
            </div>
          )}

          {/* Changes Preview */}
          <div className="space-y-3">
            <div className="bg-muted/30 rounded-md border p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Changes Summary</p>
                {hasDiff && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDiff(!showDiff)}
                    className="h-7 gap-1.5 text-xs"
                  >
                    {showDiff ? (
                      <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                    {showDiff ? 'Hide Changes' : 'View Changes'}
                  </Button>
                )}
              </div>
              <div className="mt-2 flex items-center gap-4 text-sm">
                <span className="text-green-600 dark:text-green-400">
                  + {wordCount.toLocaleString()} words added
                </span>
                <span className="text-muted-foreground">
                  {charCount.toLocaleString()} characters
                </span>
              </div>
              <div className="bg-muted mt-2 h-2 overflow-hidden rounded-full">
                <div
                  className="h-full bg-green-500 transition-all"
                  style={{ width: `${Math.min(100, (wordCount / 2000) * 100)}%` }}
                />
              </div>
              <p className="text-muted-foreground mt-1 text-xs">
                {Math.round((wordCount / 2000) * 100)}% of typical chapter length
              </p>
            </div>

            {/* Diff Viewer */}
            {hasDiff && showDiff && (
              <ScrollArea className="max-h-[300px]">
                <DiffViewer />
              </ScrollArea>
            )}
          </div>

          {/* Draft Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is-draft"
              checked={formData.isDraft}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, isDraft: checked === true }))
              }
            />
            <Label htmlFor="is-draft" className="text-sm font-normal">
              Save as draft (don't notify reviewers yet)
            </Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!formData.title || isLoading}>
              {isLoading ? 'Creating...' : 'Create Submit Request'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
