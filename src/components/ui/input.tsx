import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        'h-9 w-full min-w-0 rounded-lg border px-3 py-1 text-base transition-colors outline-none md:text-sm',
        // Colors
        'text-text-primary placeholder:text-text-secondary-65/60 border-black/10 bg-white/60',
        // File input styles
        'file:text-text-primary file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
        // Selection
        'selection:bg-brand-pink-100 selection:text-brand-pink-700',
        // Focus - border only, no ring
        'focus:border-brand-pink-500 focus:bg-white',
        // Disabled
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-black/5 disabled:opacity-50',
        // Invalid
        'aria-invalid:border-red-500',
        className
      )}
      {...props}
    />
  );
}

export { Input };
