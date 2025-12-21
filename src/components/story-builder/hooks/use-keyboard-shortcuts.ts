import { useEffect } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  handler: () => void;
}

interface UseKeyboardShortcutsOptions {
  shortcuts: KeyboardShortcut[];
  enabled?: boolean;
}

export function useKeyboardShortcuts({ shortcuts, enabled = true }: UseKeyboardShortcutsOptions) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const ctrlOrMeta = shortcut.ctrlKey || shortcut.metaKey;
        const matchesCtrlMeta = ctrlOrMeta ? e.ctrlKey || e.metaKey : true;
        const matchesShift = shortcut.shiftKey ? e.shiftKey : !e.shiftKey || !shortcut.shiftKey;
        const matchesAlt = shortcut.altKey ? e.altKey : !e.altKey || !shortcut.altKey;
        const matchesKey = e.key.toLowerCase() === shortcut.key.toLowerCase();

        if (matchesCtrlMeta && matchesShift && matchesAlt && matchesKey) {
          e.preventDefault();
          shortcut.handler();
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, enabled]);
}
