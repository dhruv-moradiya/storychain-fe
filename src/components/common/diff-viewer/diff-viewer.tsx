import { useMemo, useState } from 'react';
import { Plus, Minus, Equal, ChevronDown, ChevronRight, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

export interface DiffLine {
  type: 'add' | 'remove' | 'unchanged' | 'context';
  content: string;
  lineNumber?: {
    old?: number;
    new?: number;
  };
}

export interface DiffStats {
  additions: number;
  deletions: number;
  changes: number;
}

export interface DiffViewerProps {
  original: string;
  modified: string;
  originalTitle?: string;
  modifiedTitle?: string;
  showLineNumbers?: boolean;
  showStats?: boolean;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  maxHeight?: string;
  className?: string;
}

// Simple diff algorithm (word-based for text content)
function computeDiff(original: string, modified: string): DiffLine[] {
  const originalLines = original.split('\n');
  const modifiedLines = modified.split('\n');
  const diff: DiffLine[] = [];

  let oldLineNum = 1;
  let newLineNum = 1;

  // Simple LCS-based diff
  const lcs = computeLCS(originalLines, modifiedLines);
  let lcsIndex = 0;
  let i = 0;
  let j = 0;

  while (i < originalLines.length || j < modifiedLines.length) {
    if (
      lcsIndex < lcs.length &&
      i < originalLines.length &&
      j < modifiedLines.length &&
      originalLines[i] === lcs[lcsIndex] &&
      modifiedLines[j] === lcs[lcsIndex]
    ) {
      // Unchanged line
      diff.push({
        type: 'unchanged',
        content: originalLines[i],
        lineNumber: { old: oldLineNum++, new: newLineNum++ },
      });
      i++;
      j++;
      lcsIndex++;
    } else if (
      j < modifiedLines.length &&
      (lcsIndex >= lcs.length || modifiedLines[j] !== lcs[lcsIndex])
    ) {
      // Addition
      diff.push({
        type: 'add',
        content: modifiedLines[j],
        lineNumber: { new: newLineNum++ },
      });
      j++;
    } else if (
      i < originalLines.length &&
      (lcsIndex >= lcs.length || originalLines[i] !== lcs[lcsIndex])
    ) {
      // Deletion
      diff.push({
        type: 'remove',
        content: originalLines[i],
        lineNumber: { old: oldLineNum++ },
      });
      i++;
    }
  }

  return diff;
}

// Compute Longest Common Subsequence
function computeLCS(a: string[], b: string[]): string[] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to find LCS
  const lcs: string[] = [];
  let i = m;
  let j = n;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      lcs.unshift(a[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return lcs;
}

function calculateStats(diff: DiffLine[]): DiffStats {
  let additions = 0;
  let deletions = 0;

  diff.forEach((line) => {
    if (line.type === 'add') additions++;
    if (line.type === 'remove') deletions++;
  });

  return {
    additions,
    deletions,
    changes: additions + deletions,
  };
}

// Strip HTML tags for plain text diff
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .trim();
}

export function DiffViewer({
  original,
  modified,
  originalTitle = 'Original',
  modifiedTitle = 'Modified',
  showLineNumbers = true,
  showStats = true,
  collapsible = false,
  defaultExpanded = true,
  maxHeight = '500px',
  className,
}: DiffViewerProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'unified' | 'split'>('unified');

  // Strip HTML for diffing
  const originalText = stripHtml(original);
  const modifiedText = stripHtml(modified);

  const diff = useMemo(() => computeDiff(originalText, modifiedText), [originalText, modifiedText]);
  const stats = useMemo(() => calculateStats(diff), [diff]);

  const handleCopy = async () => {
    const diffText = diff
      .map((line) => {
        const prefix = line.type === 'add' ? '+' : line.type === 'remove' ? '-' : ' ';
        return `${prefix} ${line.content}`;
      })
      .join('\n');

    await navigator.clipboard.writeText(diffText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const diffContent = (
    <div className="overflow-auto" style={{ maxHeight }}>
      {viewMode === 'unified' ? (
        <UnifiedDiffView diff={diff} showLineNumbers={showLineNumbers} />
      ) : (
        <SplitDiffView
          diff={diff}
          showLineNumbers={showLineNumbers}
          originalTitle={originalTitle}
          modifiedTitle={modifiedTitle}
        />
      )}
    </div>
  );

  const header = (
    <div className="flex items-center justify-between border-b px-4 py-3">
      <div className="flex items-center gap-3">
        {collapsible && (
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
        )}
        <span className="font-medium">Changes</span>

        {showStats && (
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="gap-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
            >
              <Plus className="h-3 w-3" />
              {stats.additions}
            </Badge>
            <Badge
              variant="secondary"
              className="gap-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            >
              <Minus className="h-3 w-3" />
              {stats.deletions}
            </Badge>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'unified' | 'split')}>
          <TabsList className="h-8">
            <TabsTrigger value="unified" className="text-xs">
              Unified
            </TabsTrigger>
            <TabsTrigger value="split" className="text-xs">
              Split
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 gap-1.5">
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
        </Button>
      </div>
    </div>
  );

  if (collapsible) {
    return (
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <div className={cn('rounded-lg border bg-card', className)}>
          {header}
          <CollapsibleContent>{diffContent}</CollapsibleContent>
        </div>
      </Collapsible>
    );
  }

  return (
    <div className={cn('rounded-lg border bg-card', className)}>
      {header}
      {diffContent}
    </div>
  );
}

// Unified diff view
function UnifiedDiffView({
  diff,
  showLineNumbers,
}: {
  diff: DiffLine[];
  showLineNumbers: boolean;
}) {
  return (
    <div className="font-mono text-sm">
      {diff.map((line, index) => (
        <div
          key={index}
          className={cn(
            'flex',
            line.type === 'add' && 'bg-green-50 dark:bg-green-950/30',
            line.type === 'remove' && 'bg-red-50 dark:bg-red-950/30'
          )}
        >
          {showLineNumbers && (
            <div className="flex w-20 shrink-0 select-none border-r bg-muted/50 text-xs text-muted-foreground">
              <span className="w-10 px-2 py-1 text-right">
                {line.lineNumber?.old || ''}
              </span>
              <span className="w-10 px-2 py-1 text-right">
                {line.lineNumber?.new || ''}
              </span>
            </div>
          )}
          <div className="flex flex-1 items-start">
            <span
              className={cn(
                'w-6 shrink-0 select-none px-2 py-1 text-center',
                line.type === 'add' && 'text-green-600 dark:text-green-400',
                line.type === 'remove' && 'text-red-600 dark:text-red-400'
              )}
            >
              {line.type === 'add' && '+'}
              {line.type === 'remove' && '-'}
              {line.type === 'unchanged' && ' '}
            </span>
            <pre
              className={cn(
                'flex-1 whitespace-pre-wrap break-words px-2 py-1',
                line.type === 'add' && 'text-green-800 dark:text-green-200',
                line.type === 'remove' && 'text-red-800 dark:text-red-200'
              )}
            >
              {line.content || ' '}
            </pre>
          </div>
        </div>
      ))}
    </div>
  );
}

// Split diff view
function SplitDiffView({
  diff,
  showLineNumbers,
  originalTitle,
  modifiedTitle,
}: {
  diff: DiffLine[];
  showLineNumbers: boolean;
  originalTitle: string;
  modifiedTitle: string;
}) {
  // Separate into left (original) and right (modified) columns
  const leftLines: (DiffLine | null)[] = [];
  const rightLines: (DiffLine | null)[] = [];

  let leftIndex = 0;
  let rightIndex = 0;

  diff.forEach((line) => {
    if (line.type === 'unchanged') {
      // Pad to align
      while (leftLines.length < rightLines.length) leftLines.push(null);
      while (rightLines.length < leftLines.length) rightLines.push(null);
      leftLines.push(line);
      rightLines.push(line);
    } else if (line.type === 'remove') {
      leftLines.push(line);
    } else if (line.type === 'add') {
      rightLines.push(line);
    }
  });

  // Pad to equal length
  while (leftLines.length < rightLines.length) leftLines.push(null);
  while (rightLines.length < leftLines.length) rightLines.push(null);

  return (
    <div className="font-mono text-sm">
      {/* Column Headers */}
      <div className="sticky top-0 z-10 flex border-b bg-muted/80 text-xs font-medium">
        <div className="flex-1 border-r px-3 py-2">{originalTitle}</div>
        <div className="flex-1 px-3 py-2">{modifiedTitle}</div>
      </div>

      {/* Diff Rows */}
      {leftLines.map((leftLine, index) => {
        const rightLine = rightLines[index];

        return (
          <div key={index} className="flex">
            {/* Left (Original) */}
            <div
              className={cn(
                'flex flex-1 border-r',
                leftLine?.type === 'remove' && 'bg-red-50 dark:bg-red-950/30'
              )}
            >
              {showLineNumbers && (
                <span className="w-10 shrink-0 select-none border-r bg-muted/50 px-2 py-1 text-right text-xs text-muted-foreground">
                  {leftLine?.lineNumber?.old || ''}
                </span>
              )}
              <pre
                className={cn(
                  'flex-1 whitespace-pre-wrap break-words px-3 py-1',
                  leftLine?.type === 'remove' && 'text-red-800 dark:text-red-200'
                )}
              >
                {leftLine?.content || ' '}
              </pre>
            </div>

            {/* Right (Modified) */}
            <div
              className={cn(
                'flex flex-1',
                rightLine?.type === 'add' && 'bg-green-50 dark:bg-green-950/30'
              )}
            >
              {showLineNumbers && (
                <span className="w-10 shrink-0 select-none border-r bg-muted/50 px-2 py-1 text-right text-xs text-muted-foreground">
                  {rightLine?.lineNumber?.new || ''}
                </span>
              )}
              <pre
                className={cn(
                  'flex-1 whitespace-pre-wrap break-words px-3 py-1',
                  rightLine?.type === 'add' && 'text-green-800 dark:text-green-200'
                )}
              >
                {rightLine?.content || ' '}
              </pre>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { computeDiff, calculateStats, stripHtml };
