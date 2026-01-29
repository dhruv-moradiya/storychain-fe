# Explore Page - Wireframes & Templates

## Page Purpose

The Explore page is the **discovery hub** where users find stories to read. It should:

- Showcase top-rated, trending, and new stories
- Allow filtering by genre, tags, and status
- Provide multiple browsing modes (grid, list, featured)
- Feel engaging and visually rich (match home page aesthetic)

---

## Wireframe Options

### Option 1: Hero + Sections Layout (Recommended)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  NAVBAR                                                          [User]    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │                    🔍 Search stories...                             │   │
│  │                                                                     │   │
│  │    [Fantasy] [Sci-Fi] [Romance] [Mystery] [Horror] [All Genres ▼]  │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ═══════════════════════════════════════════════════════════════════════   │
│                                                                             │
│  🔥 TRENDING NOW                                           [See All →]     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│  │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │         │
│  │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │         │
│  │  Title   │ │  Title   │ │  Title   │ │  Title   │ │  Title   │         │
│  │  ⭐ 4.8  │ │  ⭐ 4.7  │ │  ⭐ 4.6  │ │  ⭐ 4.5  │ │  ⭐ 4.4  │         │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘         │
│                        ← Horizontal scroll →                               │
│                                                                             │
│  ═══════════════════════════════════════════════════════════════════════   │
│                                                                             │
│  ⭐ TOP RATED                                              [See All →]     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│  │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │         │
│  │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │         │
│  │  Title   │ │  Title   │ │  Title   │ │  Title   │ │  Title   │         │
│  │  ⭐ 4.9  │ │  ⭐ 4.9  │ │  ⭐ 4.8  │ │  ⭐ 4.8  │ │  ⭐ 4.7  │         │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘         │
│                                                                             │
│  ═══════════════════════════════════════════════════════════════════════   │
│                                                                             │
│  🕐 RECENTLY ADDED                                         [See All →]     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│  │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │         │
│  │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │         │
│  │  Title   │ │  Title   │ │  Title   │ │  Title   │ │  Title   │         │
│  │  2h ago  │ │  5h ago  │ │  1d ago  │ │  2d ago  │ │  3d ago  │         │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘         │
│                                                                             │
│  ═══════════════════════════════════════════════════════════════════════   │
│                                                                             │
│  📚 MOST READ THIS WEEK                                    [See All →]     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│  │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │         │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘         │
│                                                                             │
│  FOOTER                                                                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Option 2: Featured + Grid Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  NAVBAR                                                          [User]    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  FEATURED STORY                                                     │   │
│  │  ┌───────────────────────────────┬─────────────────────────────┐   │   │
│  │  │                               │                             │   │   │
│  │  │         ▓▓▓▓▓▓▓▓▓▓▓▓          │  "The Dragon's Last Dawn"  │   │   │
│  │  │         ▓▓▓▓▓▓▓▓▓▓▓▓          │                             │   │   │
│  │  │         ▓▓▓▓▓▓▓▓▓▓▓▓          │  by @author_name            │   │   │
│  │  │         ▓▓▓▓▓▓▓▓▓▓▓▓          │                             │   │   │
│  │  │         ▓▓▓▓▓▓▓▓▓▓▓▓          │  ⭐ 4.9 · 12.5k reads       │   │   │
│  │  │         (Cover Image)         │  📖 45 chapters · 🌿 12 branches │   │
│  │  │                               │                             │   │   │
│  │  │                               │  [Start Reading]            │   │   │
│  │  └───────────────────────────────┴─────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  [🔥 Trending] [⭐ Top Rated] [🕐 New] [📚 Most Read] [🎲 Random]   │   │
│  │                                                                     │   │
│  │  Filters: [Genre ▼] [Rating ▼] [Length ▼] [Sort: Trending ▼]       │   │
│  │                                                                     │   │
│  │  🔍 Search stories, authors, tags...                               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                       │
│  │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │                       │
│  │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │                       │
│  │  Title   │ │  Title   │ │  Title   │ │  Title   │                       │
│  │  Author  │ │  Author  │ │  Author  │ │  Author  │                       │
│  │  ⭐ 4.8  │ │  ⭐ 4.7  │ │  ⭐ 4.6  │ │  ⭐ 4.5  │                       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                       │
│  │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │                       │
│  │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │                       │
│  │  Title   │ │  Title   │ │  Title   │ │  Title   │                       │
│  │  Author  │ │  Author  │ │  Author  │ │  Author  │                       │
│  │  ⭐ 4.4  │ │  ⭐ 4.3  │ │  ⭐ 4.2  │ │  ⭐ 4.1  │                       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘                       │
│                                                                             │
│                         [Load More Stories]                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Option 3: Netflix-Style Rows

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  NAVBAR                                                          [User]    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  HERO BANNER (Rotating Featured Stories)                           │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │                                                             │   │   │
│  │  │     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░     │   │   │
│  │  │     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░     │   │   │
│  │  │     ░░░░░░   "Epic Fantasy Saga"   ░░░░░░░░░░░░░░░░░░░     │   │   │
│  │  │     ░░░░░░    by @top_author       ░░░░░░░░░░░░░░░░░░░     │   │   │
│  │  │     ░░░░░░                         ░░░░░░░░░░░░░░░░░░░     │   │   │
│  │  │     ░░░░░░   [Read Now] [+ List]   ░░░░░░░░░░░░░░░░░░░     │   │   │
│  │  │     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░     │   │   │
│  │  │                                                             │   │   │
│  │  │                      ○ ● ○ ○ ○  (carousel dots)             │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  🔥 Trending in Fantasy                                    [See All →]     │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐        │
│  │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │        │
│  │ Title  │ │ Title  │ │ Title  │ │ Title  │ │ Title  │ │ Title  │        │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘        │
│  ←                                                                    →    │
│                                                                             │
│  ⭐ Top Rated Sci-Fi                                       [See All →]     │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐        │
│  │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │        │
│  │ Title  │ │ Title  │ │ Title  │ │ Title  │ │ Title  │ │ Title  │        │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘        │
│                                                                             │
│  🕐 New Releases                                           [See All →]     │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐        │
│  │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │        │
│  │ Title  │ │ Title  │ │ Title  │ │ Title  │ │ Title  │ │ Title  │        │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘        │
│                                                                             │
│  📚 Popular in Romance                                     [See All →]     │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐        │
│  │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │        │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘        │
│                                                                             │
│  🎲 Because You Read "Story X"                             [See All →]     │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐        │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Option 4: Category-Focused Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  NAVBAR                                                          [User]    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     EXPLORE STORIES                                 │   │
│  │                                                                     │   │
│  │         🔍 [Search stories, authors, tags...            ]          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  BROWSE BY GENRE                                                           │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│  │  🐉     │ │  🚀     │ │  💕     │ │  🔍     │ │  ⚔️     │ │  👻     │  │
│  │ Fantasy │ │ Sci-Fi  │ │ Romance │ │ Mystery │ │Adventure│ │ Horror  │  │
│  │  234    │ │  189    │ │  312    │ │  156    │ │  201    │ │  98     │  │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘  │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐                          │
│  │  📜     │ │  🍵     │ │  📝     │ │  🎭     │                          │
│  │Historical│ │Slice of │ │  Fan    │ │ Poetry  │                          │
│  │  78     │ │  Life   │ │ Fiction │ │  45     │                          │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘                          │
│                                                                             │
│  ═══════════════════════════════════════════════════════════════════════   │
│                                                                             │
│  ┌─────────────────────┬───────────────────────────────────────────────┐   │
│  │                     │                                               │   │
│  │  FILTERS            │  RESULTS (234 stories)                        │   │
│  │                     │                                               │   │
│  │  Sort By            │  ┌──────────┐ ┌──────────┐ ┌──────────┐      │   │
│  │  ○ Trending         │  │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │      │   │
│  │  ● Top Rated        │  │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │      │   │
│  │  ○ Most Read        │  │  Title   │ │  Title   │ │  Title   │      │   │
│  │  ○ Newest           │  │  ⭐ 4.8  │ │  ⭐ 4.7  │ │  ⭐ 4.6  │      │   │
│  │                     │  └──────────┘ └──────────┘ └──────────┘      │   │
│  │  Rating             │                                               │   │
│  │  ☑ General          │  ┌──────────┐ ┌──────────┐ ┌──────────┐      │   │
│  │  ☑ Teen             │  │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │      │   │
│  │  ☐ Mature           │  │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓  │      │   │
│  │                     │  │  Title   │ │  Title   │ │  Title   │      │   │
│  │  Length             │  │  ⭐ 4.5  │ │  ⭐ 4.4  │ │  ⭐ 4.3  │      │   │
│  │  ○ Any              │  └──────────┘ └──────────┘ └──────────┘      │   │
│  │  ○ Short (<10 ch)   │                                               │   │
│  │  ○ Medium (10-50)   │               [Load More]                     │   │
│  │  ○ Long (50+)       │                                               │   │
│  │                     │                                               │   │
│  │  Status             │                                               │   │
│  │  ☑ Ongoing          │                                               │   │
│  │  ☑ Completed        │                                               │   │
│  │                     │                                               │   │
│  │  [Clear Filters]    │                                               │   │
│  │                     │                                               │   │
│  └─────────────────────┴───────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Component Breakdown

### 1. Explore Hero/Search Section

```tsx
// components/explore/explore-hero.tsx

interface ExploreHeroProps {
  onSearch: (query: string) => void;
  selectedGenre?: string;
  onGenreChange: (genre: string) => void;
}

/*
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│              Discover Your Next Adventure                       │
│                                                                 │
│    ┌─────────────────────────────────────────────────────┐     │
│    │  🔍  Search stories, authors, tags...               │     │
│    └─────────────────────────────────────────────────────┘     │
│                                                                 │
│    [Fantasy] [Sci-Fi] [Romance] [Mystery] [More ▼]             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Background: Subtle gradient (match home page)
Search: Large input with icon
Genre Pills: Horizontal scrollable on mobile
*/
```

---

### 2. Story Card Variants

#### Variant A: Compact Card (For Grids)

```
┌────────────────────────┐
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │  ← Cover Image (16:9 or 4:3)
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
├────────────────────────┤
│  The Dragon's Dawn     │  ← Title (truncate 2 lines)
│  @author_name          │  ← Author
│                        │
│  ⭐ 4.8  ·  📖 23 ch   │  ← Rating + Chapter count
│  [Fantasy] [Adventure] │  ← Genre tags (max 2)
└────────────────────────┘

Hover: Scale up, shadow increase, gradient overlay
Click: Navigate to story page
```

#### Variant B: Horizontal Card (For Lists)

```
┌──────────────────────────────────────────────────────────────┐
│  ┌──────────┐                                                │
│  │  ▓▓▓▓▓▓  │  The Dragon's Dawn                            │
│  │  ▓▓▓▓▓▓  │  by @author_name                              │
│  │  ▓▓▓▓▓▓  │                                                │
│  │  ▓▓▓▓▓▓  │  A young mage discovers an ancient dragon...  │
│  │  (Cover) │                                                │
│  │          │  ⭐ 4.8  ·  📖 23 chapters  ·  👁 12.5k reads  │
│  └──────────┘  [Fantasy] [Adventure] [Magic]                 │
└──────────────────────────────────────────────────────────────┘

Use: Search results, filtered lists
```

#### Variant C: Featured Card (For Hero)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌─────────────────────────────┐  ┌─────────────────────────┐  │
│  │                             │  │                         │  │
│  │      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓       │  │   ✨ FEATURED STORY    │  │
│  │      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓       │  │                         │  │
│  │      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓       │  │   The Dragon's Dawn    │  │
│  │      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓       │  │   by @top_author       │  │
│  │      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓       │  │                         │  │
│  │      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓       │  │   A young mage sets    │  │
│  │      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓       │  │   out on an epic...    │  │
│  │      (Large Cover)          │  │                         │  │
│  │                             │  │   ⭐ 4.9 · 📖 45 ch     │  │
│  │                             │  │   👁 25k · 🌿 12 branches│  │
│  │                             │  │                         │  │
│  │                             │  │   [Start Reading]       │  │
│  │                             │  │   [+ Add to List]       │  │
│  └─────────────────────────────┘  └─────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Use: Top of explore page, featured story of the week
```

#### Variant D: Ranked Card (For Top Lists)

```
┌────────────────────────────────────────────┐
│  ┌────┐  ┌──────────────────────────────┐ │
│  │    │  │  The Dragon's Dawn           │ │
│  │ #1 │  │  @author_name                │ │
│  │    │  │  ⭐ 4.9  ·  📖 45 chapters   │ │
│  └────┘  │  [Fantasy] [Adventure]       │ │
│          └──────────────────────────────┘ │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│  ┌────┐  ┌──────────────────────────────┐ │
│  │ #2 │  │  Starship Odyssey            │ │
│  └────┘  │  @scifi_writer               │ │
│          │  ⭐ 4.8  ·  📖 32 chapters   │ │
│          └──────────────────────────────┘ │
└────────────────────────────────────────────┘

Use: Top 10 lists, leaderboards
```

---

### 3. Section Headers

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  🔥 Trending Now                               [See All →]     │
│  ───────────────────────────────────────────────────────────   │
│  Stories everyone's reading this week                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Components:
- Icon (emoji or Lucide icon)
- Title (bold)
- See All link (right-aligned)
- Optional subtitle/description
```

---

### 4. Filter Sidebar

```
┌─────────────────────────┐
│  FILTERS                │
│  ─────────────────────  │
│                         │
│  Sort By                │
│  ┌───────────────────┐  │
│  │ Trending        ▼ │  │
│  └───────────────────┘  │
│                         │
│  Genre                  │
│  ☑ Fantasy              │
│  ☑ Sci-Fi               │
│  ☐ Romance              │
│  ☐ Mystery              │
│  ☐ Horror               │
│  [Show more...]         │
│                         │
│  Content Rating         │
│  ☑ General              │
│  ☑ Teen                 │
│  ☐ Mature               │
│                         │
│  Story Length           │
│  ○ Any length           │
│  ○ Short (< 10 ch)      │
│  ○ Medium (10-50 ch)    │
│  ○ Long (50+ ch)        │
│                         │
│  Status                 │
│  ☑ Ongoing              │
│  ☑ Completed            │
│  ☐ Hiatus               │
│                         │
│  Has Branches           │
│  ○ Any                  │
│  ○ Yes                  │
│  ○ No                   │
│                         │
│  ─────────────────────  │
│  [Clear All Filters]    │
│                         │
└─────────────────────────┘

Mobile: Slide-in drawer from left/bottom
Desktop: Fixed sidebar or collapsible
```

---

### 5. Horizontal Scroll Row

```tsx
// components/explore/story-row.tsx

/*
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  🔥 Trending Now                                         [See All →]   │
│                                                                         │
│  ←  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────   →  │
│     │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │ │ ▓▓▓      │
│     │ Title  │ │ Title  │ │ Title  │ │ Title  │ │ Title  │ │ Tit      │
│     │ ⭐ 4.8 │ │ ⭐ 4.7 │ │ ⭐ 4.6 │ │ ⭐ 4.5 │ │ ⭐ 4.4 │ │ ⭐ 4      │
│     └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────       │
│                                                                         │
│                          ○ ○ ● ○ ○ (optional dots)                     │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

Features:
- Horizontal scroll with snap points
- Arrow buttons on hover (desktop)
- Touch scroll (mobile)
- Gradient fade on edges
*/
```

---

### 6. Genre Card

```
┌─────────────────┐
│                 │
│       🐉        │  ← Large emoji or illustration
│                 │
│    Fantasy      │  ← Genre name
│    234 stories  │  ← Story count
│                 │
└─────────────────┘

Hover: Scale up, border highlight
Click: Navigate to /explore/fantasy
```

---

## Responsive Layouts

### Desktop (1200px+)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [Logo]        [Dashboard] [Explore ▼]              [🔍] [User ▼]          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     Hero / Search / Featured                        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────┐  ┌─────────────────────────────────────────────────────────┐  │
│  │         │  │                                                         │  │
│  │ Filters │  │    Story Grid (4 columns)                              │  │
│  │         │  │    ┌────┐ ┌────┐ ┌────┐ ┌────┐                         │  │
│  │         │  │    └────┘ └────┘ └────┘ └────┘                         │  │
│  │         │  │    ┌────┐ ┌────┐ ┌────┐ ┌────┐                         │  │
│  │         │  │    └────┘ └────┘ └────┘ └────┘                         │  │
│  │         │  │                                                         │  │
│  └─────────┘  └─────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Tablet (768px - 1199px)

```
┌─────────────────────────────────────────────────────┐
│  [Logo]              [🔍] [Explore ▼] [User]       │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │           Hero / Search                      │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  [Filter ▼] [Sort: Trending ▼] [Genre: All ▼]      │
│                                                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │  Story   │ │  Story   │ │  Story   │           │
│  └──────────┘ └──────────┘ └──────────┘           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │  Story   │ │  Story   │ │  Story   │           │
│  └──────────┘ └──────────┘ └──────────┘           │
│                                                     │
└─────────────────────────────────────────────────────┘

Filters: Dropdown/modal instead of sidebar
Grid: 3 columns
```

### Mobile (< 768px)

```
┌─────────────────────────────┐
│  [≡]  [Logo]         [🔍]  │
├─────────────────────────────┤
│                             │
│  ┌───────────────────────┐  │
│  │   Search stories...   │  │
│  └───────────────────────┘  │
│                             │
│  ← [Fantasy] [Sci-Fi] [..] →│  (horizontal scroll)
│                             │
│  [🔧 Filters]  [Sort ▼]     │
│                             │
│  ┌───────────────────────┐  │
│  │        Story          │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │        Story          │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │        Story          │  │
│  └───────────────────────┘  │
│                             │
│       [Load More]           │
│                             │
└─────────────────────────────┘

Filters: Bottom sheet modal
Grid: 1-2 columns
Cards: Full width or 2-up
```

---

## Color Scheme (Match Home Page)

```css
/* Primary Colors */
--explore-bg: #fffbf5; /* Warm cream background */
--explore-bg-subtle: #fff5e6; /* Slightly warmer sections */

/* Text */
--explore-title: #23255f; /* Deep navy for titles */
--explore-text: #2a2d66; /* Navy for body text */
--explore-muted: #5a5d8a; /* Muted navy for secondary */

/* Accents */
--explore-primary: #6b7cff; /* Indigo for primary actions */
--explore-accent: #ff6fae; /* Pink for highlights */
--explore-gold: #f6c36a; /* Gold for ratings */

/* Cards */
--card-bg: #ffffff;
--card-border: #e0e1eb;
--card-shadow: rgba(35, 37, 95, 0.08);

/* Gradients */
--gradient-hero: linear-gradient(135deg, #a8b4f0, #c4b8e8, #dcc5d8, #fff5e6);
--gradient-card-hover: linear-gradient(to-b, primary/5, secondary/10, primary/10);
```

---

## Implementation Priority

### Phase 1: MVP (Week 1)

```
✅ Basic explore page with sections
✅ Story card component (compact variant)
✅ Horizontal scroll rows
✅ Trending, Top Rated, New sections
✅ Basic search input
✅ Responsive grid layout
```

### Phase 2: Filters (Week 2)

```
✅ Genre filter tabs
✅ Sort dropdown
✅ Filter sidebar (desktop)
✅ Filter modal (mobile)
✅ URL-based filter state
```

### Phase 3: Enhanced (Week 3)

```
✅ Featured story hero
✅ Genre cards grid
✅ Horizontal card variant
✅ Infinite scroll / pagination
✅ Loading skeletons
✅ Empty states
```

### Phase 4: Polish (Week 4)

```
✅ Animations (stagger, hover, scroll)
✅ Preloading on hover
✅ Search with debounce
✅ Recently viewed section
✅ Personalized recommendations (if logged in)
```

---

## API Endpoints Needed

```typescript
// Explore page data fetching

// Get stories by category
GET /api/stories/explore
  ?category=trending|top-rated|new|most-read
  &genre=fantasy|scifi|romance|...
  &rating=general|teen|mature
  &length=short|medium|long
  &status=ongoing|completed
  &sort=trending|rating|newest|reads
  &page=1
  &limit=20

// Get featured story
GET /api/stories/featured

// Get genre stats
GET /api/stories/genres/stats

// Search stories
GET /api/stories/search
  ?q=search+term
  &genre=...
  &page=1
  &limit=20
```

---

## File Structure

```
src/
├── pages/
│   └── explore.tsx                    # Main explore page
├── components/
│   └── explore/
│       ├── explore-hero.tsx           # Hero section with search
│       ├── explore-filters.tsx        # Filter sidebar/modal
│       ├── story-row.tsx              # Horizontal scroll section
│       ├── story-grid.tsx             # Grid layout wrapper
│       ├── genre-grid.tsx             # Genre cards section
│       ├── cards/
│       │   ├── story-card-compact.tsx # Grid card
│       │   ├── story-card-horizontal.tsx # List card
│       │   ├── story-card-featured.tsx # Hero card
│       │   ├── story-card-ranked.tsx  # Numbered list card
│       │   └── genre-card.tsx         # Genre selection card
│       ├── explore-skeleton.tsx       # Loading state
│       └── explore-empty.tsx          # Empty/no results state
├── hooks/
│   └── explore/
│       ├── use-explore-stories.ts     # Data fetching hook
│       └── use-explore-filters.ts     # Filter state management
└── api/
    └── explore.api.ts                 # API functions
```

---

## Summary

### Recommended Approach

**Option 1 (Hero + Sections)** for the initial implementation because:

1. Familiar pattern (like app stores, streaming services)
2. Showcases multiple categories without overwhelming
3. Horizontal scroll is mobile-friendly
4. Easy to add/remove sections
5. Each section can load independently

### Key Features

| Feature                   | Priority     | Complexity |
| ------------------------- | ------------ | ---------- |
| Story card (compact)      | Must Have    | Low        |
| Horizontal scroll rows    | Must Have    | Medium     |
| Trending/Top/New sections | Must Have    | Low        |
| Search input              | Must Have    | Low        |
| Genre filter tabs         | Should Have  | Low        |
| Filter sidebar            | Should Have  | Medium     |
| Featured story hero       | Nice to Have | Medium     |
| Genre cards               | Nice to Have | Low        |
| Infinite scroll           | Nice to Have | Medium     |

Start with the sections layout, then add filters and polish!
