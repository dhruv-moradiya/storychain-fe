# Badge Component System

A flexible and modular badge component system for creating customizable badges with various styles, colors, and configurations.

## Installation

Import from the badge module:

```tsx
import { createBadge, BadgeGroup, SuccessBadge } from '@/components/common/badge';
```

## File Structure

```
src/components/common/badge/
├── index.ts          # Barrel exports
├── types.ts          # TypeScript types and interfaces
├── colors.ts         # Color schemes using CSS variables
├── variants.ts       # Size, shape, and style variants
├── Badge.tsx         # Main createBadge function
├── BadgeGroup.tsx    # BadgeGroup component
├── factories.tsx     # Pre-built badge factories
├── utils.ts          # Utility functions
└── BADGE_USAGE.md    # This documentation
```

---

## Basic Usage

### Using `createBadge`

The core function to create any badge:

```tsx
import { createBadge } from '@/components/common/badge';

// Simple text badge
{createBadge({ label: 'New' })}

// Badge with color
{createBadge({ label: 'Featured', color: 'pink' })}

// Badge with icon
import { Star } from 'lucide-react';
{createBadge({ label: 'Featured', icon: Star, color: 'amber' })}
```

---

## Badge Configuration

### Available Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | required | Badge text content |
| `icon` | `LucideIcon` | - | Icon component from lucide-react |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Icon placement |
| `color` | `BadgeColorKey \| ColorScheme` | `'gray'` | Badge color |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'sm'` | Badge size |
| `shape` | `'rounded' \| 'pill' \| 'square' \| 'soft'` | `'rounded'` | Border radius style |
| `style` | `'filled' \| 'outline' \| 'soft' \| 'ghost'` | `'soft'` | Visual style |
| `iconColor` | `string` | - | Custom icon color (CSS variable or hex) |
| `iconClassName` | `string` | - | Additional icon classes |
| `className` | `string` | - | Additional badge classes |
| `dot` | `boolean` | `false` | Show status dot |
| `removable` | `boolean` | `false` | Show remove button |
| `onRemove` | `() => void` | - | Remove button callback |
| `onClick` | `() => void` | - | Badge click callback |
| `disabled` | `boolean` | `false` | Disable interactions |
| `uppercase` | `boolean` | `false` | Uppercase text |
| `mono` | `boolean` | `true` | Use monospace font |

---

## Colors

### Available Color Keys

```tsx
// Brand colors
'pink' | 'blue' | 'orange'

// Semantic colors
'success' | 'warning' | 'error' | 'info'

// Neutral colors
'gray' | 'slate'

// Special colors
'purple' | 'cyan' | 'emerald' | 'amber' | 'rose' | 'indigo'
```

### Using Preset Colors

```tsx
{createBadge({ label: 'Success', color: 'success' })}
{createBadge({ label: 'Warning', color: 'warning' })}
{createBadge({ label: 'Error', color: 'error' })}
{createBadge({ label: 'Info', color: 'info' })}
```

### Custom Color Scheme

```tsx
{createBadge({
  label: 'Custom',
  color: {
    bg: 'var(--custom-bg)',
    text: 'var(--custom-text)',
    border: 'var(--custom-border)',
  },
})}
```

---

## Sizes

```tsx
{createBadge({ label: 'XS', size: 'xs' })}  // 10px text, h-4
{createBadge({ label: 'SM', size: 'sm' })}  // 12px text, h-5
{createBadge({ label: 'MD', size: 'md' })}  // 12px text, h-6
{createBadge({ label: 'LG', size: 'lg' })}  // 14px text, h-7
```

---

## Shapes

```tsx
{createBadge({ label: 'Rounded', shape: 'rounded' })}  // rounded-md
{createBadge({ label: 'Pill', shape: 'pill' })}        // rounded-full
{createBadge({ label: 'Square', shape: 'square' })}    // rounded-none
{createBadge({ label: 'Soft', shape: 'soft' })}        // rounded-lg
```

---

## Styles

```tsx
{createBadge({ label: 'Soft', style: 'soft' })}        // Light bg, colored text
{createBadge({ label: 'Filled', style: 'filled' })}    // Solid bg, white text
{createBadge({ label: 'Outline', style: 'outline' })}  // Transparent bg, border
{createBadge({ label: 'Ghost', style: 'ghost' })}      // Transparent, no border
```

---

## Icons

### Basic Icon Usage

```tsx
import { Star, Check, AlertTriangle, Info, Sparkles } from 'lucide-react';

// Icon on left (default)
{createBadge({ label: 'Featured', icon: Star, color: 'amber' })}

// Icon on right
{createBadge({ label: 'Verified', icon: Check, iconPosition: 'right', color: 'success' })}
```

### Custom Icon Styling

```tsx
// Custom icon color using CSS variable
{createBadge({
  label: 'Premium',
  icon: Crown,
  iconColor: 'var(--brand-pink-500)',
})}

// Custom icon classes
{createBadge({
  label: 'New',
  icon: Sparkles,
  iconClassName: 'animate-pulse',
})}

// Combined
{createBadge({
  label: 'Hot',
  icon: Flame,
  iconColor: 'var(--color-badge-error)',
  iconClassName: 'animate-bounce',
})}
```

---

## Pre-built Badge Factories

Ready-to-use badge components:

```tsx
import {
  StatusBadge,
  SuccessBadge,
  WarningBadge,
  ErrorBadge,
  InfoBadge,
  PrimaryBadge,
  SecondaryBadge,
  AccentBadge,
  TagBadge,
  CountBadge,
} from '@/components/common/badge';

// Status badges with dot indicator
<SuccessBadge label="Active" />
<WarningBadge label="Pending" />
<ErrorBadge label="Failed" />
<InfoBadge label="Processing" />

// Brand badges
<PrimaryBadge label="Featured" />
<SecondaryBadge label="New" />
<AccentBadge label="Hot" />

// Removable tag
<TagBadge label="React" onRemove={() => handleRemove('react')} />

// Count badge
<CountBadge label="99+" />
```

---

## Utility Functions

Quick badge creation helpers:

```tsx
import { textBadge, iconBadge, statusBadge, countBadge } from '@/components/common/badge';

// Simple text badge
{textBadge('Simple', 'gray')}

// Badge with icon
{iconBadge('Download', Download, 'blue')}

// Status badge with dot
{statusBadge('Online', 'success')}
{statusBadge('Away', 'warning')}
{statusBadge('Offline', 'error')}

// Count badge
{countBadge(42, 'pink')}
{countBadge(100, 'blue', { size: 'md' })}
```

---

## Badge Group

Display multiple badges together with overflow handling:

```tsx
import { BadgeGroup } from '@/components/common/badge';

const badges = [
  { label: 'React', color: 'blue' },
  { label: 'TypeScript', color: 'blue' },
  { label: 'Tailwind', color: 'cyan' },
  { label: 'Node.js', color: 'success' },
  { label: 'GraphQL', color: 'pink' },
];

// Show all badges
<BadgeGroup badges={badges} />

// Limit to 3 with "+2" indicator
<BadgeGroup badges={badges} max={3} />

// Custom gap
<BadgeGroup badges={badges} gap="xs" />  // gap-1
<BadgeGroup badges={badges} gap="sm" />  // gap-1.5 (default)
<BadgeGroup badges={badges} gap="md" />  // gap-2
```

---

## Creating Custom Badge Factories

Create reusable badge components with preset configs:

```tsx
import { createBadgeFactory } from '@/components/common/badge';

// Create a custom badge factory
const FeatureBadge = createBadgeFactory({
  color: 'purple',
  shape: 'pill',
  size: 'sm',
  icon: Sparkles,
});

// Use it
<FeatureBadge label="Beta" />
<FeatureBadge label="New" iconColor="var(--brand-pink-500)" />
```

---

## Interactive Badges

### Clickable Badge

```tsx
{createBadge({
  label: 'Click me',
  color: 'blue',
  onClick: () => console.log('Badge clicked!'),
})}
```

### Removable Badge

```tsx
const [tags, setTags] = useState(['React', 'Vue', 'Angular']);

{tags.map(tag => (
  createBadge({
    label: tag,
    color: 'gray',
    shape: 'pill',
    removable: true,
    onRemove: () => setTags(tags.filter(t => t !== tag)),
  })
))}
```

### Disabled Badge

```tsx
{createBadge({
  label: 'Disabled',
  color: 'gray',
  onClick: () => {},
  disabled: true,
})}
```

---

## Complete Example

```tsx
import {
  createBadge,
  BadgeGroup,
  SuccessBadge,
  statusBadge,
  createBadgeFactory
} from '@/components/common/badge';
import { Star, Crown, Zap } from 'lucide-react';

function StoryCard({ story }) {
  const PremiumBadge = createBadgeFactory({
    color: 'amber',
    shape: 'pill',
    icon: Crown,
    iconColor: 'var(--color-badge-amber)',
  });

  return (
    <div className="story-card">
      <div className="badges">
        {/* Status indicator */}
        {statusBadge(story.status, story.isPublished ? 'success' : 'warning')}

        {/* Premium badge */}
        {story.isPremium && <PremiumBadge label="Premium" />}

        {/* Featured badge with custom icon */}
        {story.isFeatured && createBadge({
          label: 'Featured',
          icon: Star,
          color: 'pink',
          iconColor: 'var(--brand-pink-500)',
          iconClassName: 'fill-current',
        })}

        {/* Tag group */}
        <BadgeGroup
          badges={story.tags.map(tag => ({
            label: tag,
            color: 'gray',
            shape: 'pill',
          }))}
          max={3}
          gap="xs"
        />
      </div>
    </div>
  );
}
```

---

## CSS Variables Reference

All badge colors use CSS variables from `index.css`:

```css
/* Brand colors */
--brand-pink-500: #ec4899;
--brand-blue: #6b7cff;
--brand-orange: #ff9f68;

/* Badge-specific variables */
--color-badge-success: #10b981;
--color-badge-success-bg: rgba(16, 185, 129, 0.08);
--color-badge-success-border: rgba(16, 185, 129, 0.19);
/* ... and more for each color */
```

This ensures consistent theming across your application.
