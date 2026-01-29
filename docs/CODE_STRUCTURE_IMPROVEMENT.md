# Code Structure Improvement Guide

This document analyzes the current StoryChain codebase structure and provides actionable recommendations for improvement and scalability.

---

## Current Structure Overview

```
src/
├── api/                    # API integration layer
├── assets/                 # Static assets (fonts, images)
├── components/             # React components (hierarchical)
│   ├── ui/                 # Shadcn/Radix UI primitives
│   ├── common/             # Shared/reusable components
│   ├── dashboard/          # Dashboard feature
│   ├── stories/            # Story feature
│   ├── story-builder/      # Story builder feature
│   ├── profile/            # Profile feature
│   └── ...
├── constants/              # Application constants
├── hooks/                  # Custom React hooks
├── layout/                 # Layout components
├── lib/                    # Utilities & helpers
├── mock-data/              # Development fixtures
├── pages/                  # Page-level components
├── schema/                 # Zod validation schemas
├── styles/                 # Global styles
└── type/                   # TypeScript interfaces
```

---

## Identified Issues

### 1. Duplicate Components (Critical)

**Problem:** Report and Appeal components exist in multiple locations:
- `/components/common/report-appeal/`
- `/components/report-appeal/` (duplicate)
- `/components/profile/admin-section/components/report-card.tsx`

**Impact:** Maintenance nightmare, inconsistent behavior, confusion for developers.

### 2. Scattered Feature Organization

**Problem:** Submit-request feature is spread across:
- `/components/common/submit-request-dialog/`
- `/components/stories/sections/submit-request-section/`
- `/pages/submit-requests.tsx`
- `/components/submit-requests/`

**Impact:** Hard to understand feature boundaries, difficult onboarding.

### 3. Inconsistent Index Exports

**Problem:** `/components/common/index.ts` only exports 2 items while many components aren't exported from index files.

**Impact:** Inconsistent import patterns, longer import paths.

### 4. Mixed Hook Organization

**Problem:** Some hooks are in `/hooks/components/`, others are colocated with components.

**Impact:** No clear convention, developers don't know where to look.

### 5. Leftover Files

**Problem:** Files like `/mock-data/submit-request copy.ts` exist.

**Impact:** Confusion, potential bugs from using wrong file.

### 6. Inconsistent Section Patterns

**Problem:** Some sections use `index.tsx`, others use direct `.tsx` files.

**Impact:** No predictable structure, harder to navigate.

---

## Recommended Structure (Feature-Based)

The recommended approach is **Feature-Based Architecture** with clear domain boundaries:

```
src/
├── app/                           # Application setup
│   ├── App.tsx                    # Routes configuration
│   ├── main.tsx                   # Entry point
│   └── providers/                 # Context providers
│       ├── QueryProvider.tsx
│       ├── AuthProvider.tsx
│       └── index.ts
│
├── features/                      # Feature modules (domain-driven)
│   ├── stories/                   # Story feature
│   │   ├── api/                   # Story API calls
│   │   │   └── story.api.ts
│   │   ├── components/            # Story-specific components
│   │   │   ├── StoryCard/
│   │   │   ├── StoryEditor/
│   │   │   ├── StoryTree/
│   │   │   └── index.ts
│   │   ├── hooks/                 # Story-specific hooks
│   │   │   ├── useStory.ts
│   │   │   ├── useStoryMutations.ts
│   │   │   └── index.ts
│   │   ├── pages/                 # Story pages
│   │   │   ├── StoryDetailPage.tsx
│   │   │   ├── StoryBuilderPage.tsx
│   │   │   └── index.ts
│   │   ├── types/                 # Story types
│   │   │   └── story.types.ts
│   │   ├── schemas/               # Story validation
│   │   │   └── story.schema.ts
│   │   ├── constants/             # Story constants
│   │   │   └── story.constants.ts
│   │   └── index.ts               # Public API export
│   │
│   ├── chapters/                  # Chapter feature
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── types/
│   │   └── index.ts
│   │
│   ├── dashboard/                 # Dashboard feature
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── index.ts
│   │
│   ├── profile/                   # Profile feature
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── index.ts
│   │
│   ├── submit-requests/           # Submit request feature (consolidated)
│   │   ├── api/
│   │   ├── components/
│   │   │   ├── SubmitRequestDialog/
│   │   │   ├── SubmitRequestCard/
│   │   │   ├── SubmitRequestList/
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── types/
│   │   └── index.ts
│   │
│   ├── reports/                   # Reports feature (consolidated)
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── index.ts
│   │
│   ├── notifications/             # Notifications feature
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.ts
│   │
│   └── auth/                      # Authentication feature
│       ├── components/
│       ├── pages/
│       └── index.ts
│
├── shared/                        # Shared across features
│   ├── components/                # Reusable UI components
│   │   ├── ui/                    # Shadcn/Radix primitives
│   │   │   ├── button.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── index.ts
│   │   ├── Badge/                 # Custom shared components
│   │   │   ├── Badge.tsx
│   │   │   ├── BadgeGroup.tsx
│   │   │   └── index.ts
│   │   ├── Loader/
│   │   ├── TextEditor/
│   │   ├── DiffViewer/
│   │   └── index.ts
│   │
│   ├── hooks/                     # Shared hooks
│   │   ├── useDebounce.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useMobile.ts
│   │   └── index.ts
│   │
│   ├── utils/                     # Utility functions
│   │   ├── cn.ts                  # Class name merger
│   │   ├── formatters.ts
│   │   └── index.ts
│   │
│   ├── types/                     # Shared types
│   │   ├── common.types.ts
│   │   └── index.ts
│   │
│   ├── constants/                 # Global constants
│   │   └── index.ts
│   │
│   └── layouts/                   # Layout components
│       ├── MainLayout/
│       ├── DashboardLayout/
│       └── index.ts
│
├── config/                        # Configuration
│   ├── api.config.ts              # API configuration
│   ├── query.config.ts            # React Query config
│   └── routes.config.ts           # Route definitions
│
├── assets/                        # Static assets
│   ├── fonts/
│   └── images/
│
├── styles/                        # Global styles
│   ├── index.css
│   └── fonts.css
│
└── __mocks__/                     # Test mocks (rename from mock-data)
    ├── stories.mock.ts
    └── chapters.mock.ts
```

---

## Migration Strategy

### Phase 1: Quick Wins (1-2 days)

1. **Remove duplicate files**
   ```bash
   # Delete duplicates
   rm -rf src/components/report-appeal/  # Keep common/report-appeal
   rm src/mock-data/submit-request\ copy.ts
   ```

2. **Add missing index.ts files**
   - Create barrel exports for all component directories
   - Update imports across codebase

3. **Standardize naming conventions**
   - Components: `PascalCase.tsx`
   - Hooks: `useCamelCase.ts`
   - Types: `feature.types.ts`
   - Constants: `feature.constants.ts`

### Phase 2: Feature Consolidation (3-5 days)

1. **Create features directory**
   ```bash
   mkdir -p src/features/{stories,chapters,dashboard,profile,submit-requests,reports,notifications,auth}
   ```

2. **Migrate one feature at a time**
   - Start with smallest feature (notifications)
   - Move API, hooks, components, types together
   - Update imports using find-and-replace

3. **Create shared directory**
   ```bash
   mkdir -p src/shared/{components,hooks,utils,types,constants,layouts}
   ```

4. **Move shared code**
   - Move `ui/` to `shared/components/ui/`
   - Move common components to `shared/components/`
   - Move shared hooks to `shared/hooks/`

### Phase 3: Polish & Document (2-3 days)

1. **Update path aliases in tsconfig**
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./src/*"],
         "@features/*": ["./src/features/*"],
         "@shared/*": ["./src/shared/*"],
         "@config/*": ["./src/config/*"]
       }
     }
   }
   ```

2. **Add ESLint import rules**
   ```js
   // eslint.config.js
   rules: {
     'import/order': ['error', {
       groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
       pathGroups: [
         { pattern: '@features/**', group: 'internal' },
         { pattern: '@shared/**', group: 'internal' }
       ]
     }]
   }
   ```

3. **Create feature templates**
   - Add a template folder for new features
   - Document the structure in README

---

## Feature Module Pattern

Each feature should follow this internal structure:

```typescript
// features/stories/index.ts - Public API
// Only export what other features need

// Components
export { StoryCard } from './components/StoryCard';
export { StoryEditor } from './components/StoryEditor';

// Hooks
export { useStory, useStoryList } from './hooks';
export { useCreateStory, useUpdateStory } from './hooks';

// Types
export type { IStory, IChapter, StoryStatus } from './types';

// Constants (if needed externally)
export { STORY_STATUS } from './constants';
```

```typescript
// features/stories/components/StoryCard/index.ts
export { StoryCard } from './StoryCard';
export type { StoryCardProps } from './StoryCard';
```

```typescript
// features/stories/components/StoryCard/StoryCard.tsx
import { Badge } from '@shared/components';
import { useStory } from '../../hooks';
import type { StoryCardProps } from './StoryCard.types';

export const StoryCard = ({ storyId }: StoryCardProps) => {
  const { data: story } = useStory(storyId);

  return (
    <div className="story-card">
      <Badge variant={story.status} />
      {/* ... */}
    </div>
  );
};
```

---

## Import Guidelines

### Good Imports

```typescript
// Feature to shared - always allowed
import { Button, Dialog } from '@shared/components/ui';
import { Badge } from '@shared/components';
import { useDebounce } from '@shared/hooks';

// Within same feature - use relative
import { StoryCard } from '../components';
import { useStory } from '../hooks';

// Feature to feature - only through public API
import { ChapterCard } from '@features/chapters';
```

### Bad Imports

```typescript
// DON'T: Deep imports into other features
import { ChapterCard } from '@features/chapters/components/ChapterCard/ChapterCard';

// DON'T: Circular imports between features
// stories imports from chapters, chapters imports from stories

// DON'T: Shared importing from features
// shared/components should NEVER import from features/
```

---

## Scalability Benefits

### 1. Clear Boundaries
- Each feature is self-contained
- Easy to understand what belongs where
- New developers can find code quickly

### 2. Independent Development
- Teams can work on different features
- Reduced merge conflicts
- Easier code reviews

### 3. Code Splitting
- Natural boundaries for lazy loading
- Each feature can be a separate chunk

```typescript
// routes.config.ts
const StoryRoutes = lazy(() => import('@features/stories/pages'));
const DashboardRoutes = lazy(() => import('@features/dashboard/pages'));
```

### 4. Testing
- Test features in isolation
- Mock other features easily
- Clear test file locations

### 5. Future-Proofing
- Extract features to packages if needed
- Migrate to micro-frontends
- Share features across projects

---

## Quick Reference Card

| Category | Location | Example |
|----------|----------|---------|
| Feature components | `features/{name}/components/` | `StoryCard.tsx` |
| Feature hooks | `features/{name}/hooks/` | `useStory.ts` |
| Feature API | `features/{name}/api/` | `story.api.ts` |
| Feature types | `features/{name}/types/` | `story.types.ts` |
| Feature pages | `features/{name}/pages/` | `StoryDetailPage.tsx` |
| UI primitives | `shared/components/ui/` | `button.tsx` |
| Shared components | `shared/components/` | `Badge/` |
| Shared hooks | `shared/hooks/` | `useDebounce.ts` |
| Utilities | `shared/utils/` | `cn.ts` |
| Layouts | `shared/layouts/` | `MainLayout/` |
| Config | `config/` | `api.config.ts` |

---

## Checklist for Migration

- [ ] Remove duplicate report-appeal components
- [ ] Remove leftover copy files
- [ ] Create `features/` directory structure
- [ ] Migrate notifications feature (smallest)
- [ ] Migrate reports feature (consolidate duplicates)
- [ ] Migrate submit-requests feature (consolidate scattered)
- [ ] Migrate auth feature
- [ ] Migrate profile feature
- [ ] Migrate dashboard feature
- [ ] Migrate chapters feature
- [ ] Migrate stories feature (largest, last)
- [ ] Create `shared/` directory
- [ ] Move UI primitives to shared
- [ ] Move common components to shared
- [ ] Move shared hooks
- [ ] Update path aliases
- [ ] Add ESLint import rules
- [ ] Update all imports
- [ ] Run tests
- [ ] Document new structure

---

## Conclusion

The current structure has grown organically and needs consolidation. The feature-based architecture will:

1. **Eliminate confusion** from duplicate components
2. **Improve discoverability** with predictable locations
3. **Enable scaling** as the team and codebase grow
4. **Reduce coupling** between different parts of the app
5. **Simplify onboarding** for new developers

Start with Phase 1 quick wins, then gradually migrate features. The investment will pay off in maintainability and developer productivity.
