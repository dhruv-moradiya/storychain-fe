# Story Pages Wireframes & Design Ideas

> Complete design guide for all pages under `stories/:slug/*`

---

## Table of Contents

1. [Page Overview & Access Matrix](#1-page-overview--access-matrix)
2. [Overview Page](#2-overview-page)
3. [Chapters Page](#3-chapters-page)
4. [Tree Page](#4-tree-page)
5. [Submit Requests (PRs) Page](#5-submit-requests-prs-page)
6. [Collaborators Page](#6-collaborators-page)
7. [Reports Page](#7-reports-page)
8. [Settings Page](#8-settings-page)
9. [Reader/Chapter View](#9-readerchapter-view)
10. [Analytics Page (New)](#10-analytics-page-new)
11. [History Page (New)](#11-history-page-new)
12. [Navigation & Layout](#12-navigation--layout)
13. [Mobile Adaptations](#13-mobile-adaptations)
14. [Component Library](#14-component-library)

---

## 1. Page Overview & Access Matrix

### Route Structure

```
stories/:slug/
├── overview          → Public (default)
├── chapters          → Public (view) / Owner+ (manage)
├── chapters/:id      → Public (read chapter)
├── tree              → Collaborator+ only
├── submit-requests   → Contributor+ (view own) / Owner+ (view all)
├── collaborators     → Owner only
├── reports           → Moderator+ only
├── settings          → Owner only
├── analytics         → Owner only (NEW)
└── history           → Collaborator+ (NEW)
```

### Access Control Matrix

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           ACCESS CONTROL MATRIX                                  │
└─────────────────────────────────────────────────────────────────────────────────┘

Page              │ Public │ Contributor │ Reviewer │ Moderator │ Co-Author │ Owner
──────────────────┼────────┼─────────────┼──────────┼───────────┼───────────┼──────
Overview          │   ✓    │      ✓      │    ✓     │     ✓     │     ✓     │   ✓
Chapters (view)   │   ✓    │      ✓      │    ✓     │     ✓     │     ✓     │   ✓
Chapters (manage) │   ✗    │      ✗      │    ✗     │     ✗     │     ✓     │   ✓
Chapter Read      │   ✓    │      ✓      │    ✓     │     ✓     │     ✓     │   ✓
Tree              │   ✗    │      ✓      │    ✓     │     ✓     │     ✓     │   ✓
Submit Requests   │   ✗    │    Own only │  View    │   View    │  Manage   │ Full
Collaborators     │   ✗    │      ✗      │    ✗     │     ✗     │   View    │ Full
Reports           │   ✗    │      ✗      │    ✗     │     ✓     │     ✓     │   ✓
Settings          │   ✗    │      ✗      │    ✗     │     ✗     │  Partial  │ Full
Analytics         │   ✗    │      ✗      │    ✗     │     ✗     │   View    │ Full
History           │   ✗    │      ✓      │    ✓     │     ✓     │     ✓     │   ✓
```

### Role Badges

```
OWNER       → 👑 Crown icon, Gold badge
CO_AUTHOR   → ✍️ Pen icon, Purple badge
MODERATOR   → 🛡️ Shield icon, Blue badge
REVIEWER    → 👁️ Eye icon, Teal badge
CONTRIBUTOR → 🤝 Handshake icon, Gray badge
```

---

## 2. Overview Page

> **Route:** `/stories/:slug/overview`
> **Access:** Public
> **Purpose:** Story landing page, first impression for readers

### Layout Option 1: Hero Banner Style

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  [← Back]                                            [🔔] [❤️ 234] [📤 Share]  │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ╔═══════════════════════════════════════════════════════════════════════════╗ │
│  ║                                                                           ║ │
│  ║                         COVER IMAGE (16:9)                                ║ │
│  ║                    Background gradient overlay                            ║ │
│  ║                                                                           ║ │
│  ║   ┌──────────┐                                                            ║ │
│  ║   │          │     Chronicles of Eldoria                                  ║ │
│  ║   │  CARD    │     ════════════════════════                               ║ │
│  ║   │  IMAGE   │     An epic fantasy saga spanning three generations...     ║ │
│  ║   │ (2:3)    │                                                            ║ │
│  ║   │          │     [Fantasy] [Epic] [Magic] [Adventure]                   ║ │
│  ║   └──────────┘                                                            ║ │
│  ║                                                                           ║ │
│  ╚═══════════════════════════════════════════════════════════════════════════╝ │
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────────────────────────┬───────────────────────────────────┐   │
│  │                                     │                                   │   │
│  │  📖 ABOUT THIS STORY                │   📊 STATISTICS                   │   │
│  │  ─────────────────────              │   ──────────────                  │   │
│  │                                     │                                   │   │
│  │  In a world where magic flows       │   ┌─────────┐ ┌─────────┐        │   │
│  │  through ancient bloodlines,        │   │   47    │ │  12.5K  │        │   │
│  │  three siblings discover they       │   │Chapters │ │  Reads  │        │   │
│  │  are the last descendants of        │   └─────────┘ └─────────┘        │   │
│  │  a forgotten kingdom...             │                                   │   │
│  │                                     │   ┌─────────┐ ┌─────────┐        │   │
│  │  [Read more...]                     │   │  2.3K   │ │   23    │        │   │
│  │                                     │   │  Votes  │ │ Contrib │        │   │
│  │  ─────────────────────              │   └─────────┘ └─────────┘        │   │
│  │                                     │                                   │   │
│  │  📅 Started: Jan 2024               │   ⭐ Rating: 4.7/5 (342 votes)   │   │
│  │  🔄 Updated: 2 days ago             │                                   │   │
│  │  📝 Status: Ongoing                 │   Progress: ████████░░ 80%       │   │
│  │                                     │   (Est. 60 chapters)             │   │
│  └─────────────────────────────────────┴───────────────────────────────────┘   │
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  👥 CREATORS & COLLABORATORS                                                    │
│  ────────────────────────────                                                   │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │  ┌────┐                                                                 │   │
│  │  │ 👤 │  @fantasy_writer  👑 Owner                    [Following ✓]    │   │
│  │  └────┘  "Building worlds one chapter at a time"                        │   │
│  │          47 stories • 125K followers                                    │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐               │
│  │ ┌──┐ @editor_pro │ │ ┌──┐ @lore_mstr │ │ ┌──┐ +12 more    │               │
│  │ └──┘ ✍️ Co-Author │ │ └──┘ 🛡️ Moderator│ │ └──┘ [View all] │               │
│  └──────────────────┘ └──────────────────┘ └──────────────────┘               │
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  📚 LATEST CHAPTERS                                     [View All Chapters →]  │
│  ───────────────────                                                            │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │  Ch. 47: The Final Confrontation              📅 2 days ago             │   │
│  │  ────────────────────────────────────────────────────────────────────── │   │
│  │  As the sun set over the burning city, Elena knew this was the moment  │   │
│  │  she had trained her entire life for...                                 │   │
│  │                                     👁️ 1.2K reads  💬 45  👍 234        │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │  Ch. 46: Betrayal at Dawn                     📅 5 days ago             │   │
│  │  ────────────────────────────────────────────────────────────────────── │   │
│  │  "You were like a brother to me," Marcus whispered, blade trembling... │   │
│  │                                     👁️ 2.1K reads  💬 89  👍 456        │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│                              [Load More Chapters]                               │
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│                    ┌─────────────────────────────────┐                         │
│                    │     📖 START READING            │                         │
│                    │     Begin from Chapter 1        │                         │
│                    └─────────────────────────────────┘                         │
│                                                                                 │
│                    ┌─────────────────────────────────┐                         │
│                    │     ↪️ CONTINUE READING         │                         │
│                    │     Chapter 23: The Escape      │                         │
│                    └─────────────────────────────────┘                         │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Layout Option 2: Magazine Style

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  [← Back to Explore]              STORYCHAIN              [🔍] [👤] [🔔]       │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │                                                                           │ │
│  │     ┌──────────────┐                                                      │ │
│  │     │              │    CHRONICLES OF ELDORIA                             │ │
│  │     │              │    ══════════════════════                            │ │
│  │     │    CARD      │                                                      │ │
│  │     │    IMAGE     │    [Fantasy]  [Epic]  [Mature]  [Ongoing]            │ │
│  │     │              │                                                      │ │
│  │     │              │    ⭐⭐⭐⭐⭐ 4.7  •  12.5K reads  •  47 chapters      │ │
│  │     │              │                                                      │ │
│  │     └──────────────┘    ┌────────────────┐  ┌──────────────┐              │ │
│  │                         │ 📖 Read Now    │  │ + Follow     │              │ │
│  │                         └────────────────┘  └──────────────┘              │ │
│  │                                                                           │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────────┐
│  │  [Overview]  [Chapters]  [Reviews]  [Community]                            │
│  └─────────────────────────────────────────────────────────────────────────────┘
│                                                                                 │
│  ┌─────────────────────────────────────┐  ┌─────────────────────────────────┐ │
│  │                                     │  │                                 │ │
│  │  SYNOPSIS                           │  │  STORY INFO                     │ │
│  │  ────────                           │  │  ──────────                     │ │
│  │                                     │  │                                 │ │
│  │  In the aftermath of the Great      │  │  Created by: @fantasy_writer   │ │
│  │  Sundering, the five kingdoms       │  │  Started: January 15, 2024     │ │
│  │  struggle to maintain peace.        │  │  Updated: 2 days ago           │ │
│  │                                     │  │  Status: Ongoing               │ │
│  │  When three siblings discover       │  │                                 │ │
│  │  they share a forbidden             │  │  Content Rating: Mature        │ │
│  │  bloodline—one thought extinct      │  │  Language: English             │ │
│  │  for centuries—they become both     │  │                                 │ │
│  │  hunted and hunter in a world       │  │  ─────────────────────────     │ │
│  │  where magic is both salvation      │  │                                 │ │
│  │  and damnation.                     │  │  TAGS                           │ │
│  │                                     │  │  ────                           │ │
│  │  "A masterpiece of world-building"  │  │  #fantasy #magic #siblings     │ │
│  │  — Featured Review                  │  │  #political #war #romance      │ │
│  │                                     │  │  #darkfantasy #epicfantasy     │ │
│  │                                     │  │                                 │ │
│  └─────────────────────────────────────┘  └─────────────────────────────────┘ │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Key Components for Overview

| Component       | Purpose                              | Interactions                    |
| --------------- | ------------------------------------ | ------------------------------- |
| Hero Section    | First impression, cover + card image | Parallax scroll effect          |
| Stats Cards     | Quick metrics overview               | Hover for details               |
| Creator Card    | Author attribution                   | Click to profile, Follow button |
| Chapter Preview | Tease latest content                 | Click to read                   |
| CTA Buttons     | Drive engagement                     | Start/Continue reading          |
| Tags            | Genre/category info                  | Click to filter explore         |

---

## 3. Chapters Page

> **Route:** `/stories/:slug/chapters`
> **Access:** Public (view) / Co-Author+ (manage)
> **Purpose:** Browse and manage all chapters

### Layout Option 1: List View (Current + Enhanced)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  Chronicles of Eldoria > Chapters                                               │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │  [List View ✓]  [Grid View]  [Timeline]     🔍 Search chapters...        │ │
│  │                                                                           │ │
│  │  Filter: [All Status ▼] [All Authors ▼]   Sort: [Chapter Order ▼]        │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │  📖 47 Chapters  •  🌿 12 Branches  •  📝 156K words                      │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  ╔═══════════════════════════════════════════════════════════════════════════╗ │
│  ║  MAIN STORYLINE                                                           ║ │
│  ╠═══════════════════════════════════════════════════════════════════════════╣ │
│  ║                                                                           ║ │
│  ║  ┌─────────────────────────────────────────────────────────────────────┐ ║ │
│  ║  │ ▼ Ch. 1: The Beginning                                              │ ║ │
│  ║  │   ├── by @fantasy_writer  •  Published  •  Jan 15, 2024             │ ║ │
│  ║  │   ├── 👁️ 5.2K  💬 123  👍 456  👎 12                                 │ ║ │
│  ║  │   └── [Read] [Edit*] [3 branches ↗]                                 │ ║ │
│  ║  └─────────────────────────────────────────────────────────────────────┘ ║ │
│  ║                                                                           ║ │
│  ║  ┌─────────────────────────────────────────────────────────────────────┐ ║ │
│  ║  │ ▼ Ch. 2: Whispers in the Dark                                       │ ║ │
│  ║  │   ├── by @fantasy_writer  •  Published  •  Jan 18, 2024             │ ║ │
│  ║  │   ├── 👁️ 4.8K  💬 98  👍 389  👎 8                                   │ ║ │
│  ║  │   └── [Read] [Edit*]                                                │ ║ │
│  ║  │                                                                     │ ║ │
│  ║  │   └── 🌿 BRANCH: "The Shadow Path" (3 chapters)                     │ ║ │
│  ║  │       ├── by @dark_writer  •  Community favorite                    │ ║ │
│  ║  │       └── [Explore Branch →]                                        │ ║ │
│  ║  └─────────────────────────────────────────────────────────────────────┘ ║ │
│  ║                                                                           ║ │
│  ║  ┌─────────────────────────────────────────────────────────────────────┐ ║ │
│  ║  │   Ch. 3: The First Trial                                            │ ║ │
│  ║  │   ├── by @editor_pro  •  Published  •  Jan 22, 2024                 │ ║ │
│  ║  │   ├── 👁️ 4.2K  💬 76  👍 312  👎 5                                   │ ║ │
│  ║  │   └── [Read] [Edit*]                                                │ ║ │
│  ║  └─────────────────────────────────────────────────────────────────────┘ ║ │
│  ║                                                                           ║ │
│  ║  ... (more chapters)                                                      ║ │
│  ║                                                                           ║ │
│  ╚═══════════════════════════════════════════════════════════════════════════╝ │
│                                                                                 │
│  * Edit visible only to Co-Author+                                             │
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │                         [Load More Chapters]                              │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  ╔═══════════════════════════════════════════════════════════════════════════╗ │
│  ║  💡 CONTRIBUTE: Have an idea for the next chapter?  [Submit a PR →]      ║ │
│  ╚═══════════════════════════════════════════════════════════════════════════╝ │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Layout Option 2: Grid View

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  Chapters                                              [List] [Grid ✓] [Tree]  │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │     Ch. 1       │  │     Ch. 2       │  │     Ch. 3       │                 │
│  │  ┌───────────┐  │  │  ┌───────────┐  │  │  ┌───────────┐  │                 │
│  │  │  PREVIEW  │  │  │  │  PREVIEW  │  │  │  │  PREVIEW  │  │                 │
│  │  │   IMAGE   │  │  │  │   IMAGE   │  │  │  │   IMAGE   │  │                 │
│  │  └───────────┘  │  │  └───────────┘  │  │  └───────────┘  │                 │
│  │                 │  │                 │  │                 │                 │
│  │  The Beginning  │  │  Whispers in    │  │  The First      │                 │
│  │                 │  │  the Dark       │  │  Trial          │                 │
│  │  ───────────    │  │  ───────────    │  │  ───────────    │                 │
│  │  👁️ 5.2K 👍 456 │  │  👁️ 4.8K 👍 389 │  │  👁️ 4.2K 👍 312 │                 │
│  │                 │  │                 │  │                 │                 │
│  │  [🌿 3 branches]│  │  [🌿 1 branch] │  │                 │                 │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                 │
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │     Ch. 4       │  │     Ch. 5       │  │     Ch. 6       │                 │
│  │       ...       │  │       ...       │  │       ...       │                 │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                 │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Layout Option 3: Timeline View

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  Chapters                                         [List] [Grid] [Timeline ✓]   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│       January 2024                                                              │
│           │                                                                     │
│           ●────── Ch. 1: The Beginning                                          │
│           │       by @fantasy_writer • 5.2K reads                              │
│           │                                                                     │
│           ●────── Ch. 2: Whispers in the Dark                                   │
│           │       by @fantasy_writer • 4.8K reads                              │
│           │       └── 🌿 Branch: "The Shadow Path"                              │
│           │                                                                     │
│           ●────── Ch. 3: The First Trial                                        │
│           │       by @editor_pro • 4.2K reads                                  │
│           │                                                                     │
│       February 2024                                                             │
│           │                                                                     │
│           ●────── Ch. 4: Allies and Enemies                                     │
│           │       by @fantasy_writer • 3.9K reads                              │
│           │       └── 🌿 Branch: "The Redemption Arc" (5 chapters)              │
│           │                                                                     │
│           ●────── Ch. 5: The Council                                            │
│           │       by @mystery_writer • 3.5K reads                              │
│           │                                                                     │
│           ...                                                                   │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Owner/Co-Author Management View

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  Chapter Management                                          [+ New Chapter]   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │  [All ✓] [Published] [Draft] [Pending] [Rejected]      🔍 Search...      │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────────┐
│  │ ☐ │ # │ Title              │ Author    │ Status    │ Stats      │ Actions │
│  ├───┼───┼────────────────────┼───────────┼───────────┼────────────┼─────────┤
│  │ ☐ │ 1 │ The Beginning      │ @fantasy  │ 🟢 Published │ 5.2K/456  │ ⋮       │
│  │ ☐ │ 2 │ Whispers in Dark   │ @fantasy  │ 🟢 Published │ 4.8K/389  │ ⋮       │
│  │ ☐ │ 3 │ The First Trial    │ @editor   │ 🟢 Published │ 4.2K/312  │ ⋮       │
│  │ ☐ │ - │ The Lost Chapter   │ @mystery  │ 🟡 Pending   │ -         │ ⋮       │
│  │ ☐ │ - │ Draft: Battle      │ @fantasy  │ ⚪ Draft     │ -         │ ⋮       │
│  └─────────────────────────────────────────────────────────────────────────────┘
│                                                                                 │
│  Selected: 0  │  [Publish] [Unpublish] [Delete] [Reorder]                      │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Tree Page

> **Route:** `/stories/:slug/tree`
> **Access:** Contributor+ only
> **Purpose:** Visual chapter relationship editor

### Main Tree View

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  Story Tree                                    [Zoom: 100%] [⊞] [↻ Auto-Layout]│
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────────────────────────────────────┬───────────────────────────┤
│  │                                                 │                           │
│  │                CANVAS AREA                      │   RIGHT PANEL             │
│  │                                                 │   ───────────             │
│  │     ┌─────────┐                                 │                           │
│  │     │ Ch. 1   │                                 │   [Comments] [PRs]        │
│  │     │Prologue │                                 │   [Settings] [History]    │
│  │     └────┬────┘                                 │                           │
│  │          │                                      │   ┌───────────────────┐   │
│  │          ▼                                      │   │                   │   │
│  │     ┌─────────┐                                 │   │   SELECTED NODE   │   │
│  │     │ Ch. 2   │                                 │   │                   │   │
│  │     │The Dark │                                 │   │   Chapter 5:      │   │
│  │     └────┬────┘                                 │   │   "The Council"   │   │
│  │          │                                      │   │                   │   │
│  │     ┌────┴────┐                                 │   │   Author: @mysty  │   │
│  │     ▼         ▼                                 │   │   Status: Published│   │
│  │ ┌─────────┐ ┌─────────┐                        │   │   Words: 3,245    │   │
│  │ │ Ch. 3   │ │ Branch: │                        │   │                   │   │
│  │ │The Trial│ │ Shadow  │                        │   │   [Edit] [Preview]│   │
│  │ └────┬────┘ │ Path    │                        │   │   [Add Child]     │   │
│  │      │      └─────────┘                        │   │                   │   │
│  │      ▼                                         │   └───────────────────┘   │
│  │ ┌─────────┐                                    │                           │
│  │ │ Ch. 4   │                                    │   ───────────────────     │
│  │ │Allies   │                                    │                           │
│  │ └────┬────┘                                    │   QUICK ACTIONS           │
│  │      │                                         │   ─────────────           │
│  │ ┌────┴────┐                                    │                           │
│  │ ▼         ▼                                    │   [+ Add Chapter]         │
│  │┌─────────┐┌─────────┐                         │   [🔀 Create Branch]      │
│  ││ Ch. 5   ││ Branch: │                         │   [📋 Paste Chapter]      │
│  ││Council  ││Redemption│                         │   [🔗 Link Chapters]      │
│  │└─────────┘└─────────┘                         │                           │
│  │                                                │                           │
│  └─────────────────────────────────────────────────┴───────────────────────────┤
│                                                                                 │
│  LEGEND: 🟢 Published  🟡 Pending  ⚪ Draft  🔴 Rejected  🌿 Branch             │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Node Types

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           NODE TYPE DESIGNS                                      │
└─────────────────────────────────────────────────────────────────────────────────┘

MAIN CHAPTER NODE:
┌─────────────────────┐
│ 📖 Ch. 5            │
│ ─────────────────── │
│ The Council         │
│                     │
│ 👁️ 3.5K  👍 289     │
│ ─────────────────── │
│ 🟢 Published        │
└─────────────────────┘

BRANCH NODE:
┌─────────────────────┐
│ 🌿 BRANCH           │
│ ─────────────────── │
│ The Shadow Path     │
│                     │
│ 3 chapters          │
│ by @dark_writer     │
│ ─────────────────── │
│ ⭐ Community Pick   │
└─────────────────────┘

DRAFT NODE:
┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐
│ 📝 DRAFT            │
│ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─│
│ The Final Battle    │
│                     │
│ In progress...      │
│ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─│
│ ⚪ Not published    │
└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘

PENDING PR NODE:
┌─────────────────────┐
│ 🔄 PENDING PR #42   │
│ ─────────────────── │
│ Alternative Ending  │
│                     │
│ 👍 23  👎 2         │
│ ─────────────────── │
│ 🟡 Awaiting Review  │
└─────────────────────┘

ADD NODE PLACEHOLDER:
     ┌───────┐
     │   +   │
     │  Add  │
     └───────┘
```

### Tree Interactions

| Action        | Trigger             | Result                              |
| ------------- | ------------------- | ----------------------------------- |
| Select node   | Click               | Show details in right panel         |
| Move node     | Drag                | Reposition (visual only or reorder) |
| Connect nodes | Drag from port      | Create parent-child link            |
| Add child     | Click + on node     | Opens chapter editor                |
| Expand branch | Double-click branch | Zoom into branch                    |
| Pan canvas    | Drag background     | Move view                           |
| Zoom          | Scroll wheel        | Zoom in/out                         |
| Context menu  | Right-click node    | Edit, Delete, Branch, etc.          |

---

## 5. Submit Requests (PRs) Page

> **Route:** `/stories/:slug/submit-requests`
> **Access:** Contributor+ (own PRs) / Owner+ (all PRs)
> **Purpose:** Manage chapter contributions

### PR List View

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  Submit Requests                                           [+ New Request]      │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │  [🟢 Open (8)] [🟡 In Review (3)] [✅ Approved (2)] [🔵 Merged (45)]      │ │
│  │  [🔴 Rejected (5)] [⚫ Closed (12)]                                        │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  Filter: [All Types ▼] [All Authors ▼]   Sort: [Newest ▼]   🔍 Search...       │
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │                                                                           │ │
│  │  🟢 #156 The Dragon's Revelation                                          │ │
│  │  ══════════════════════════════════════════════════════════════════════   │ │
│  │                                                                           │ │
│  │  ┌──────┐  NEW CHAPTER → After Chapter 11                                 │ │
│  │  │ 👤   │  by @fantasy_writer • opened 2 hours ago                        │ │
│  │  └──────┘                                                                 │ │
│  │                                                                           │ │
│  │  "Introduces the dragon queen and sets up the final arc..."              │ │
│  │                                                                           │ │
│  │  [Plot Twist] [Character Development]                                     │ │
│  │                                                                           │ │
│  │  💬 8 comments   👍 23 / 👎 2   ✅ 1/2 approvals                          │ │
│  │                                                                           │ │
│  │  Reviewers: @editor_pro ✅  @story_owner ⏳                               │ │
│  │                                                                           │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │                                                                           │ │
│  │  🟡 #155 Fix: Timeline Inconsistency in Chapter 8                         │ │
│  │  ══════════════════════════════════════════════════════════════════════   │ │
│  │                                                                           │ │
│  │  ┌──────┐  EDIT CHAPTER → Chapter 8                                       │ │
│  │  │ 👤   │  by @editor_pro • opened 1 day ago                              │ │
│  │  └──────┘                                                                 │ │
│  │                                                                           │ │
│  │  "Fixed the date references that conflicted with chapter 3..."           │ │
│  │                                                                           │ │
│  │  [Grammar Fix] [Plot Hole]                                                │ │
│  │                                                                           │ │
│  │  💬 3 comments   👍 5 / 👎 0   ⚠️ Changes requested                       │ │
│  │                                                                           │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │                                                                           │ │
│  │  ⚪ #154 [DRAFT] Alternative Ending Concept                               │ │
│  │  ══════════════════════════════════════════════════════════════════════   │ │
│  │                                                                           │ │
│  │  ┌──────┐  NEW CHAPTER → After Chapter 47                                 │ │
│  │  │ 👤   │  by @mystery_lover • created 3 days ago                         │ │
│  │  └──────┘                                                                 │ │
│  │                                                                           │ │
│  │  Draft - Not ready for review                                             │ │
│  │                                                                           │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### PR Detail View

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  ← Back to Requests                                                             │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  🟢 #156 The Dragon's Revelation                                                │
│  ══════════════════════════════════════════════════════════════════════════════ │
│                                                                                 │
│  @fantasy_writer wants to add a new chapter after Chapter 11                    │
│  Opened 2 hours ago • Last updated 30 minutes ago                               │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────────┐
│  │  [Conversation]  [Changes]  [Reviews (2)]  [Commits]                        │
│  └─────────────────────────────────────────────────────────────────────────────┘
│                                                                                 │
│  ┌─────────────────────────────────────────────┬───────────────────────────────┤
│  │                                             │                               │
│  │  CONVERSATION                               │  SIDEBAR                      │
│  │  ────────────                               │  ───────                      │
│  │                                             │                               │
│  │  ┌─────────────────────────────────────┐   │  Reviewers                    │
│  │  │ 📝 @fantasy_writer opened this PR   │   │  ──────────                   │
│  │  │    2 hours ago                      │   │  @editor_pro     ✅ Approved  │
│  │  │                                     │   │  @story_owner    ⏳ Pending   │
│  │  │    This chapter introduces the      │   │  [+ Request Review]           │
│  │  │    dragon queen Myrathis and        │   │                               │
│  │  │    establishes her motivation...    │   │  ───────────────────────────  │
│  │  │                                     │   │                               │
│  │  │    Changes:                         │   │  Labels                       │
│  │  │    • +3,245 words                   │   │  ──────                       │
│  │  │    • New character introduced       │   │  [Plot Twist]                 │
│  │  │    • Sets up final arc              │   │  [Character Development]      │
│  │  └─────────────────────────────────────┘   │  [+ Add Label]                │
│  │                                             │                               │
│  │  ┌─────────────────────────────────────┐   │  ───────────────────────────  │
│  │  │ ✅ @editor_pro approved             │   │                               │
│  │  │    1 hour ago                       │   │  Votes                        │
│  │  │                                     │   │  ─────                        │
│  │  │    "Excellent character intro!      │   │  👍 23  /  👎 2               │
│  │  │     The pacing is perfect."         │   │                               │
│  │  │                                     │   │  [👍 Vote Up] [👎 Vote Down]  │
│  │  │    Rating: ⭐⭐⭐⭐⭐               │   │                               │
│  │  └─────────────────────────────────────┘   │  ───────────────────────────  │
│  │                                             │                               │
│  │  ┌─────────────────────────────────────┐   │  Approval Status              │
│  │  │ 💬 @mystery_lover commented         │   │  ───────────────              │
│  │  │    45 minutes ago                   │   │  ✅ 1 of 2 required           │
│  │  │                                     │   │  ⚠️ 0 changes requested       │
│  │  │    "Love the dragon queen! Quick    │   │  💬 8 conversations           │
│  │  │     question: does this connect to  │   │     └─ 2 unresolved           │
│  │  │     the prophecy in chapter 5?"     │   │                               │
│  │  │                                     │   │  ───────────────────────────  │
│  │  │    [Reply] [React]                  │   │                               │
│  │  └─────────────────────────────────────┘   │  [Merge Request ▼]            │
│  │                                             │  [Close Request]              │
│  │  ┌─────────────────────────────────────┐   │                               │
│  │  │ Write a comment...                  │   │                               │
│  │  │                                     │   │                               │
│  │  │ [Preview] [Suggest Change]          │   │                               │
│  │  │                      [Comment]      │   │                               │
│  │  └─────────────────────────────────────┘   │                               │
│  │                                             │                               │
│  └─────────────────────────────────────────────┴───────────────────────────────┤
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### PR Changes/Diff View

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  Changes                                        [Unified ✓] [Side-by-Side]      │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  📊 +3,245 words added • 1 new chapter                                          │
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │  NEW: Chapter 12 - The Dragon's Revelation                                │ │
│  ├───────────────────────────────────────────────────────────────────────────┤ │
│  │                                                                           │ │
│  │  + The throne room fell silent as the massive doors swung open.          │ │
│  │  +                                                                        │ │
│  │  + Myrathis entered with the grace of a predator, her scales             │ │
│  │  + shimmering between gold and crimson in the torchlight. The            │ │
│  │  + guards—those brave enough to remain at their posts—pressed            │ │
│  │  + themselves against the walls.                                          │ │
│  │  +                                                                        │ │
│  │  + "You summoned me, little king," she said, her voice resonating        │ │
│  │  + like distant thunder. "A bold choice, considering our history."       │ │
│  │  +                                                                        │ │
│  │  + King Aldric rose from his throne, his knuckles white against          │ │
│  │  + the armrests. "Bold times require bold choices, Dragon Queen."        │ │
│  │  +                                                                        │ │
│  │  ...                                                                      │ │
│  │                                                                           │ │
│  │  [Show Full Chapter]                                                      │ │
│  │                                                                           │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  💡 INLINE SUGGESTION from @editor_pro on line 42:                             │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │                                                                           │ │
│  │  Original:                                                                │ │
│  │  "her scales shimmering between gold and crimson"                         │ │
│  │                                                                           │ │
│  │  Suggested:                                                               │ │
│  │  "her scales shifting between molten gold and deep crimson"               │ │
│  │                                                                           │ │
│  │  [Apply Suggestion] [Dismiss] [Reply]                                     │ │
│  │                                                                           │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Create PR Dialog

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        CREATE SUBMIT REQUEST                            [✕]    │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  What type of change?                                                           │
│  ───────────────────                                                            │
│                                                                                 │
│  ┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────┐       │
│  │     📝              │ │     ✏️              │ │     🗑️              │       │
│  │   NEW CHAPTER       │ │   EDIT CHAPTER      │ │   DELETE CHAPTER    │       │
│  │                     │ │                     │ │                     │       │
│  │  Add new content    │ │  Modify existing    │ │  Remove a chapter   │       │
│  │  to the story       │ │  chapter content    │ │  from the story     │       │
│  │                     │ │                     │ │                     │       │
│  │    [Selected ✓]     │ │                     │ │                     │       │
│  └─────────────────────┘ └─────────────────────┘ └─────────────────────┘       │
│                                                                                 │
│  ───────────────────────────────────────────────────────────────────────────    │
│                                                                                 │
│  Title *                                                                        │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │ The Dragon's Revelation                                                   │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  Parent Chapter *                                                               │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │ Chapter 11: The Gathering Storm                                      [▼] │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  Description                                                                    │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │ This chapter introduces the dragon queen Myrathis and establishes her    │ │
│  │ motivation for approaching the kingdom. It sets up the final arc of      │ │
│  │ the story and connects to the prophecy mentioned in chapter 5.           │ │
│  │                                                                           │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  Labels                                                                         │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │ [Plot Twist ✕] [Character Development ✕]  [+ Add]                        │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  Chapter Content *                                                              │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │ The throne room fell silent as the massive doors swung open.             │ │
│  │                                                                           │ │
│  │ Myrathis entered with the grace of a predator, her scales shimmering    │ │
│  │ between gold and crimson in the torchlight...                            │ │
│  │                                                                           │ │
│  │                                                                           │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│  📊 3,245 words • ~13 min read                                                  │
│                                                                                 │
│  ───────────────────────────────────────────────────────────────────────────    │
│                                                                                 │
│  ☐ Save as draft (don't submit for review yet)                                 │
│                                                                                 │
│  ┌─────────────────────────┐  ┌─────────────────────────────────────────────┐  │
│  │       Cancel            │  │         Create Submit Request               │  │
│  └─────────────────────────┘  └─────────────────────────────────────────────┘  │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Collaborators Page

> **Route:** `/stories/:slug/collaborators`
> **Access:** Owner only (full) / Co-Author (view only)
> **Purpose:** Manage story team

### Main View

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  Collaborators                                             [+ Invite]           │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │  [All (15)] [Owners (1)] [Co-Authors (2)] [Moderators (3)]               │ │
│  │  [Reviewers (4)] [Contributors (5)] [Pending (2)]                         │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  🔍 Search by name or email...                                                  │
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │                                                                           │ │
│  │  OWNER                                                                    │ │
│  │  ═════                                                                    │ │
│  │                                                                           │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐    │ │
│  │  │  ┌────┐                                                          │    │ │
│  │  │  │ 👤 │  @fantasy_writer  👑                           (You)    │    │ │
│  │  │  └────┘  Sarah Mitchell                                          │    │ │
│  │  │          Joined Jan 15, 2024 • 47 chapters contributed           │    │ │
│  │  │                                                                  │    │ │
│  │  │          Last active: 2 hours ago                                │    │ │
│  │  └──────────────────────────────────────────────────────────────────┘    │ │
│  │                                                                           │ │
│  │  CO-AUTHORS                                                               │ │
│  │  ══════════                                                               │ │
│  │                                                                           │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐    │ │
│  │  │  ┌────┐                                                          │    │ │
│  │  │  │ 👤 │  @editor_pro  ✍️                               [⋮]      │    │ │
│  │  │  └────┘  James Chen                                              │    │ │
│  │  │          Joined Feb 3, 2024 • 12 chapters contributed            │    │ │
│  │  │          Can: Edit, Publish, Manage PRs, Invite                  │    │ │
│  │  │                                                                  │    │ │
│  │  │          Last active: 1 day ago                                  │    │ │
│  │  └──────────────────────────────────────────────────────────────────┘    │ │
│  │                                                                           │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐    │ │
│  │  │  ┌────┐                                                          │    │ │
│  │  │  │ 👤 │  @lore_master  ✍️                              [⋮]      │    │ │
│  │  │  └────┘  Elena Rodriguez                                         │    │ │
│  │  │          Joined Feb 10, 2024 • 8 chapters contributed            │    │ │
│  │  │          Can: Edit, Publish, Manage PRs, Invite                  │    │ │
│  │  │                                                                  │    │ │
│  │  │          Last active: 3 hours ago                                │    │ │
│  │  └──────────────────────────────────────────────────────────────────┘    │ │
│  │                                                                           │ │
│  │  MODERATORS                                                               │ │
│  │  ══════════                                                               │ │
│  │                                                                           │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐    │ │
│  │  │  ┌────┐                                                          │    │ │
│  │  │  │ 👤 │  @community_mod  🛡️                            [⋮]      │    │ │
│  │  │  └────┘  Alex Thompson                                           │    │ │
│  │  │          Joined Mar 1, 2024 • Manages reports & comments         │    │ │
│  │  │          Can: Moderate content, Manage reports, Review PRs       │    │ │
│  │  └──────────────────────────────────────────────────────────────────┘    │ │
│  │                                                                           │ │
│  │  ... (more collaborators)                                                 │ │
│  │                                                                           │ │
│  │  PENDING INVITATIONS                                                      │ │
│  │  ═══════════════════                                                      │ │
│  │                                                                           │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐    │ │
│  │  │  ┌────┐                                                          │    │ │
│  │  │  │ 📧 │  newwriter@email.com                           [⋮]      │    │ │
│  │  │  └────┘  Invited as: Contributor                                 │    │ │
│  │  │          Sent 2 days ago • Expires in 5 days                     │    │ │
│  │  │                                                                  │    │ │
│  │  │          [Resend Invite] [Cancel Invite]                         │    │ │
│  │  └──────────────────────────────────────────────────────────────────┘    │ │
│  │                                                                           │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Invite Dialog

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           INVITE COLLABORATOR                           [✕]    │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  Find User                                                                      │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │ 🔍 Search by username or email...                                        │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  Recent Collaborators:                                                          │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │  ┌────┐ @mystery_writer  •  Collaborated on 2 stories                    │ │
│  │  └────┘ ─────────────────────────────────────────────────────────────────│ │
│  │  ┌────┐ @world_builder   •  Collaborated on 1 story                      │ │
│  │  └────┘                                                                   │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  ───────────────────────────────────────────────────────────────────────────    │
│                                                                                 │
│  Selected: @mystery_writer                                                      │
│                                                                                 │
│  Role                                                                           │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │                                                                           │ │
│  │  ○ 👑 Co-Author                                                           │ │
│  │    Full editing rights, can publish chapters, manage PRs                  │ │
│  │                                                                           │ │
│  │  ○ 🛡️ Moderator                                                           │ │
│  │    Can moderate content, manage reports, review PRs                       │ │
│  │                                                                           │ │
│  │  ○ 👁️ Reviewer                                                            │ │
│  │    Can review and comment on PRs, provide feedback                        │ │
│  │                                                                           │ │
│  │  ● 🤝 Contributor (Recommended)                                           │ │
│  │    Can submit chapters via PR, comment on story                           │ │
│  │                                                                           │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  Personal Message (Optional)                                                    │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │ Hey! I loved your work on "The Shadow Realm" and think you'd be a        │ │
│  │ great fit for this story. Would you like to contribute?                  │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  ┌─────────────────────────┐  ┌─────────────────────────────────────────────┐  │
│  │       Cancel            │  │            Send Invitation                  │  │
│  └─────────────────────────┘  └─────────────────────────────────────────────┘  │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Role Permissions Card

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           ROLE PERMISSIONS                                       │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  Permission              │ Owner │ Co-Auth │ Mod │ Review │ Contrib            │
│  ────────────────────────┼───────┼─────────┼─────┼────────┼──────────          │
│  Delete story            │   ✓   │    ✗    │  ✗  │   ✗    │    ✗               │
│  Transfer ownership      │   ✓   │    ✗    │  ✗  │   ✗    │    ✗               │
│  Manage collaborators    │   ✓   │    ✗    │  ✗  │   ✗    │    ✗               │
│  Change settings         │   ✓   │    ◐    │  ✗  │   ✗    │    ✗               │
│  Publish chapters        │   ✓   │    ✓    │  ✗  │   ✗    │    ✗               │
│  Edit any chapter        │   ✓   │    ✓    │  ✗  │   ✗    │    ✗               │
│  Merge PRs               │   ✓   │    ✓    │  ✗  │   ✗    │    ✗               │
│  Manage reports          │   ✓   │    ✓    │  ✓  │   ✗    │    ✗               │
│  Approve PRs             │   ✓   │    ✓    │  ✓  │   ✓    │    ✗               │
│  Review PRs              │   ✓   │    ✓    │  ✓  │   ✓    │    ✗               │
│  Submit PRs              │   ✓   │    ✓    │  ✓  │   ✓    │    ✓               │
│  Comment                 │   ✓   │    ✓    │  ✓  │   ✓    │    ✓               │
│  View tree               │   ✓   │    ✓    │  ✓  │   ✓    │    ✓               │
│                                                                                 │
│  ◐ = Partial (some settings only)                                              │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Reports Page

> **Route:** `/stories/:slug/reports`
> **Access:** Moderator+ only
> **Purpose:** Content moderation

### Reports Dashboard

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  Content Reports                                                                │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │  📊 OVERVIEW                                                              │ │
│  │                                                                           │ │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐            │ │
│  │  │   12    │ │    3    │ │    5    │ │   89    │ │   2.4h  │            │ │
│  │  │ Pending │ │  High   │ │ Medium  │ │Resolved │ │Avg Time │            │ │
│  │  │ Reports │ │Priority │ │Priority │ │ (30d)   │ │to Resolve│            │ │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘            │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │  [🔴 Pending (12)] [🟡 In Review (3)] [✅ Resolved (89)] [⚫ Dismissed]  │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  Filter: [All Types ▼] [All Reasons ▼]   Sort: [Priority ▼]   🔍 Search...     │
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │                                                                           │ │
│  │  🔴 HIGH PRIORITY                                                         │ │
│  │  ═════════════════                                                        │ │
│  │                                                                           │ │
│  │  ┌────────────────────────────────────────────────────────────────────┐  │ │
│  │  │                                                                    │  │ │
│  │  │  📝 Comment Report  •  3 reports  •  2 hours ago                   │  │ │
│  │  │  ──────────────────────────────────────────────────────────────────│  │ │
│  │  │                                                                    │  │ │
│  │  │  Reported Item:                                                    │  │ │
│  │  │  Comment by @toxic_user on Chapter 12                              │  │ │
│  │  │  "You're an idiot if you think this story makes sense..."          │  │ │
│  │  │                                                                    │  │ │
│  │  │  Reason: Harassment / Hate Speech                                  │  │ │
│  │  │  Reported by: @reader1, @reader2, @reader3                         │  │ │
│  │  │                                                                    │  │ │
│  │  │  [View Context] [Take Action ▼]                                    │  │ │
│  │  │                                                                    │  │ │
│  │  └────────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                           │ │
│  │  ┌────────────────────────────────────────────────────────────────────┐  │ │
│  │  │                                                                    │  │ │
│  │  │  📖 Chapter Report  •  1 report  •  5 hours ago                    │  │ │
│  │  │  ──────────────────────────────────────────────────────────────────│  │ │
│  │  │                                                                    │  │ │
│  │  │  Reported Item:                                                    │  │ │
│  │  │  Chapter 45: "The Dark Ritual" by @mystery_writer                  │  │ │
│  │  │                                                                    │  │ │
│  │  │  Reason: Inappropriate Content (Graphic Violence)                  │  │ │
│  │  │  Message: "This chapter has extremely graphic torture scenes..."   │  │ │
│  │  │                                                                    │  │ │
│  │  │  [View Chapter] [Take Action ▼]                                    │  │ │
│  │  │                                                                    │  │ │
│  │  └────────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                           │ │
│  │  🟡 MEDIUM PRIORITY                                                       │ │
│  │  ═══════════════════                                                      │ │
│  │                                                                           │ │
│  │  ┌────────────────────────────────────────────────────────────────────┐  │ │
│  │  │                                                                    │  │ │
│  │  │  📋 PR Report  •  1 report  •  1 day ago                           │  │ │
│  │  │  ──────────────────────────────────────────────────────────────────│  │ │
│  │  │                                                                    │  │ │
│  │  │  Reported Item:                                                    │  │ │
│  │  │  PR #145: "Complete Rewrite" by @new_contributor                   │  │ │
│  │  │                                                                    │  │ │
│  │  │  Reason: Plagiarism / Copyright                                    │  │ │
│  │  │  Message: "This appears to be copied from another story..."        │  │ │
│  │  │                                                                    │  │ │
│  │  │  [View PR] [Take Action ▼]                                         │  │ │
│  │  │                                                                    │  │ │
│  │  └────────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                           │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Report Action Dialog

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           TAKE ACTION                                   [✕]    │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  Report: Comment by @toxic_user                                                 │
│  Reason: Harassment / Hate Speech                                               │
│                                                                                 │
│  ───────────────────────────────────────────────────────────────────────────    │
│                                                                                 │
│  Action                                                                         │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │                                                                           │ │
│  │  ○ Dismiss Report                                                         │ │
│  │    No violation found, content is acceptable                              │ │
│  │                                                                           │ │
│  │  ○ Warn User                                                              │ │
│  │    Send warning to @toxic_user, content remains                           │ │
│  │                                                                           │ │
│  │  ● Remove Content                                                         │ │
│  │    Delete the comment, warn user                                          │ │
│  │                                                                           │ │
│  │  ○ Remove Content + Temp Ban                                              │ │
│  │    Delete comment, suspend user for 24 hours                              │ │
│  │                                                                           │ │
│  │  ○ Remove Content + Permanent Ban                                         │ │
│  │    Delete comment, ban user from story permanently                        │ │
│  │                                                                           │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  Moderator Note (Optional)                                                      │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │ Removed for violating community guidelines. Personal attacks are not     │ │
│  │ permitted. Please keep discussions respectful.                           │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  ☑ Notify user of action taken                                                 │
│  ☐ Add user to watch list                                                      │
│                                                                                 │
│  ┌─────────────────────────┐  ┌─────────────────────────────────────────────┐  │
│  │       Cancel            │  │            Apply Action                     │  │
│  └─────────────────────────┘  └─────────────────────────────────────────────┘  │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. Settings Page

> **Route:** `/stories/:slug/settings`
> **Access:** Owner only (full) / Co-Author (partial)
> **Purpose:** Story configuration

### Settings Layout

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  Story Settings                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │  [General] [Appearance] [Collaboration] [Notifications] [Danger Zone]    │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  ╔═══════════════════════════════════════════════════════════════════════════╗ │
│  ║  GENERAL SETTINGS                                                         ║ │
│  ╚═══════════════════════════════════════════════════════════════════════════╝ │
│                                                                                 │
│  Story Title                                                                    │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │ Chronicles of Eldoria                                                     │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  URL Slug                                                                       │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │ storychain.app/stories/ chronicles-of-eldoria                             │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│  ⚠️ Changing slug will break existing links                                    │
│                                                                                 │
│  Description                                                                    │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │ In the aftermath of the Great Sundering, the five kingdoms struggle to   │ │
│  │ maintain peace. When three siblings discover they share a forbidden      │ │
│  │ bloodline—one thought extinct for centuries—they become both hunted...   │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│  148 / 500 characters                                                           │
│                                                                                 │
│  ───────────────────────────────────────────────────────────────────────────    │
│                                                                                 │
│  Genre                                         Content Rating                   │
│  ┌───────────────────────────┐                ┌───────────────────────────┐    │
│  │ Fantasy                [▼]│                │ Mature (16+)          [▼]│    │
│  └───────────────────────────┘                └───────────────────────────┘    │
│                                                                                 │
│  Status                                        Language                         │
│  ┌───────────────────────────┐                ┌───────────────────────────┐    │
│  │ Ongoing                [▼]│                │ English               [▼]│    │
│  └───────────────────────────┘                └───────────────────────────┘    │
│                                                                                 │
│  Tags                                                                           │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │ [magic ✕] [siblings ✕] [political intrigue ✕] [war ✕] [+ Add Tag]        │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│                                                               [Save Changes]    │
│                                                                                 │
│  ═══════════════════════════════════════════════════════════════════════════   │
│                                                                                 │
│  ╔═══════════════════════════════════════════════════════════════════════════╗ │
│  ║  VISIBILITY & ACCESS                                                      ║ │
│  ╚═══════════════════════════════════════════════════════════════════════════╝ │
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │  Story Visibility                                        [Public  🔘]    │ │
│  │  ─────────────────────────────────────────────────────────────────────── │ │
│  │  Public: Anyone can find and read your story                             │ │
│  │  Private: Only collaborators can access                                  │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │  Allow Branching                                         [Enabled 🔘]    │ │
│  │  ─────────────────────────────────────────────────────────────────────── │ │
│  │  Readers can create alternate story branches                             │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │  Require Approval for Contributions                      [Enabled 🔘]    │ │
│  │  ─────────────────────────────────────────────────────────────────────── │ │
│  │  New chapter submissions require owner/co-author approval                │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │  Allow Comments                                          [Enabled 🔘]    │ │
│  │  ─────────────────────────────────────────────────────────────────────── │ │
│  │  Readers can leave comments on chapters                                  │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │  Enable Voting                                           [Enabled 🔘]    │ │
│  │  ─────────────────────────────────────────────────────────────────────── │ │
│  │  Readers can upvote/downvote chapters and PRs                            │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Appearance Tab

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  [General] [Appearance ✓] [Collaboration] [Notifications] [Danger Zone]        │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ╔═══════════════════════════════════════════════════════════════════════════╗ │
│  ║  STORY IMAGES                                                             ║ │
│  ╚═══════════════════════════════════════════════════════════════════════════╝ │
│                                                                                 │
│  Card Image (2:3 ratio)                                                         │
│  Used in story cards, search results, and recommendations                       │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                                                                         │   │
│  │     ┌──────────────────┐                                                │   │
│  │     │                  │      ┌────────────────────────────────┐       │   │
│  │     │                  │      │                                │       │   │
│  │     │    CURRENT       │      │  📤 Upload new image           │       │   │
│  │     │    CARD          │      │                                │       │   │
│  │     │    IMAGE         │      │  Recommended: 400x600px        │       │   │
│  │     │                  │      │  Max size: 5MB                 │       │   │
│  │     │                  │      │  Formats: JPG, PNG, WebP       │       │   │
│  │     │                  │      │                                │       │   │
│  │     └──────────────────┘      └────────────────────────────────┘       │   │
│  │                                                                         │   │
│  │     [Remove Image]                                                      │   │
│  │                                                                         │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│  Cover Image (3:1 ratio)                                                        │
│  Displayed as banner on story overview page                                     │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                                                                         │   │
│  │  ┌───────────────────────────────────────────────────────────────────┐ │   │
│  │  │                                                                   │ │   │
│  │  │                     CURRENT COVER IMAGE                           │ │   │
│  │  │                                                                   │ │   │
│  │  └───────────────────────────────────────────────────────────────────┘ │   │
│  │                                                                         │   │
│  │  ┌────────────────────────────────┐                                    │   │
│  │  │                                │                                    │   │
│  │  │  📤 Upload new cover           │                                    │   │
│  │  │                                │                                    │   │
│  │  │  Recommended: 1500x500px       │                                    │   │
│  │  │  Max size: 10MB                │                                    │   │
│  │  │                                │                                    │   │
│  │  └────────────────────────────────┘                                    │   │
│  │                                                                         │   │
│  │  [Remove Cover]                                                         │   │
│  │                                                                         │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│  ╔═══════════════════════════════════════════════════════════════════════════╗ │
│  ║  THEME (Coming Soon)                                                      ║ │
│  ╚═══════════════════════════════════════════════════════════════════════════╝ │
│                                                                                 │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐                               │
│  │ Default │ │ Fantasy │ │  Sci-Fi │ │ Romance │                               │
│  │   ✓     │ │         │ │         │ │         │                               │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘                               │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Danger Zone Tab

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  [General] [Appearance] [Collaboration] [Notifications] [Danger Zone ✓]        │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ⚠️ DANGER ZONE                                                                 │
│  These actions are irreversible. Proceed with caution.                          │
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │                                                                           │ │
│  │  🔒 Archive Story                                                         │ │
│  │  ─────────────────────────────────────────────────────────────────────── │ │
│  │  Story will be hidden from public, but data is preserved.                │ │
│  │  You can unarchive at any time.                                          │ │
│  │                                                                           │ │
│  │                                                    [Archive Story]        │ │
│  │                                                                           │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │                                                                           │ │
│  │  👑 Transfer Ownership                                                    │ │
│  │  ─────────────────────────────────────────────────────────────────────── │ │
│  │  Transfer this story to another user. You will become a Co-Author.       │ │
│  │  The new owner must accept the transfer.                                 │ │
│  │                                                                           │ │
│  │                                                [Transfer Ownership]       │ │
│  │                                                                           │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │                                                                 🔴        │ │
│  │  🗑️ Delete Story                                                          │ │
│  │  ─────────────────────────────────────────────────────────────────────── │ │
│  │  Permanently delete this story and all its chapters, comments,           │ │
│  │  and contributions. This action CANNOT be undone.                        │ │
│  │                                                                           │ │
│  │  All 47 chapters, 1,234 comments, and 156 PRs will be deleted.          │ │
│  │                                                                           │ │
│  │                                                    [Delete Story]         │ │
│  │                                                                           │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 9. Reader/Chapter View

> **Route:** `/stories/:slug/chapters/:chapterId`
> **Access:** Public
> **Purpose:** Read chapter content

### Reading View

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  ← Chronicles of Eldoria                          [🔖] [Aa] [☀️/🌙] [📤]       │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│                                                                                 │
│                    Chapter 12                                                   │
│                    ══════════                                                   │
│                                                                                 │
│                    THE DRAGON'S REVELATION                                      │
│                                                                                 │
│                    by @fantasy_writer                                           │
│                    Published January 25, 2024                                   │
│                                                                                 │
│  ─────────────────────────────────────────────────────────────────────────────  │
│                                                                                 │
│     The throne room fell silent as the massive doors swung open.                │
│                                                                                 │
│     Myrathis entered with the grace of a predator, her scales                   │
│  shimmering between gold and crimson in the torchlight. The guards—            │
│  those brave enough to remain at their posts—pressed themselves                │
│  against the walls.                                                             │
│                                                                                 │
│     "You summoned me, little king," she said, her voice resonating             │
│  like distant thunder. "A bold choice, considering our history."               │
│                                                                                 │
│     King Aldric rose from his throne, his knuckles white against               │
│  the armrests. "Bold times require bold choices, Dragon Queen."                │
│                                                                                 │
│     She circled the room slowly, her tail leaving shallow grooves              │
│  in the marble floor. "And what bold proposition brings me to                  │
│  this..." she paused, nostrils flaring, "...place of memories?"               │
│                                                                                 │
│     "An alliance."                                                              │
│                                                                                 │
│     The word hung in the air like smoke.                                       │
│                                                                                 │
│                              ...                                                │
│                                                                                 │
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  Reading Progress: ████████████░░░░░░░░░░ 65%                                   │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │  [← Ch. 11: The Gathering Storm]          [Ch. 13: The Price of Peace →]│   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  Rate this chapter:  ⭐ ⭐ ⭐ ⭐ ⭐   │   👍 234   👎 12   💬 45 comments     │
│                                                                                 │
│  [👍 Upvote]  [👎 Downvote]  [💬 Comment]  [📤 Share]  [🚩 Report]             │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Reading Settings Popover

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          READING SETTINGS                                       │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  Font Size                                                                      │
│  ─────────                                                                      │
│  [A-] ─────●───────── [A+]                                                      │
│       Small    Medium    Large                                                  │
│                                                                                 │
│  Font Family                                                                    │
│  ───────────                                                                    │
│  [Georgia ✓] [Merriweather] [Open Sans] [System]                               │
│                                                                                 │
│  Line Spacing                                                                   │
│  ────────────                                                                   │
│  [Compact] [Normal ✓] [Relaxed]                                                │
│                                                                                 │
│  Theme                                                                          │
│  ─────                                                                          │
│  [☀️ Light ✓] [🌙 Dark] [📜 Sepia]                                              │
│                                                                                 │
│  Width                                                                          │
│  ─────                                                                          │
│  [Narrow] [Medium ✓] [Wide] [Full]                                             │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Chapter Comments Section

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  💬 Comments (45)                                              [Newest ▼]       │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │ Write a comment...                                                        │ │
│  │                                                                           │ │
│  │                                               [Preview]    [Post Comment] │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │  ┌────┐  @mystery_lover  •  2 hours ago                        👍 12     │ │
│  │  └────┘                                                                   │ │
│  │                                                                           │ │
│  │  The dragon queen's entrance gave me chills! The way you                  │ │
│  │  described her scales "shimmering between gold and crimson"               │ │
│  │  was beautiful imagery.                                                   │ │
│  │                                                                           │ │
│  │  [Reply] [React]                                                          │ │
│  │                                                                           │ │
│  │    └── ┌────┐  @fantasy_writer (Author)  •  1 hour ago        👍 5       │ │
│  │        └────┘                                                             │ │
│  │                                                                           │ │
│  │        Thank you! Myrathis is one of my favorite characters               │ │
│  │        to write. Wait until you see what's coming next! 🐉                │ │
│  │                                                                           │ │
│  │        [Reply] [React]                                                    │ │
│  │                                                                           │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │  ┌────┐  @plot_theorist  •  5 hours ago                        👍 8      │ │
│  │  └────┘                                                                   │ │
│  │                                                                           │ │
│  │  Wait, does this connect to the prophecy in chapter 5?? The one          │ │
│  │  about "scales of two realms"? Mind = blown 🤯                           │ │
│  │                                                                           │ │
│  │  [Reply] [React]                                                          │ │
│  │                                                                           │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  [Load More Comments]                                                           │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 10. Analytics Page (New)

> **Route:** `/stories/:slug/analytics`
> **Access:** Owner only (full) / Co-Author (view)
> **Purpose:** Story performance insights

### Analytics Dashboard

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  Analytics                                    [Last 7 days ▼] [Export 📊]       │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │  📊 OVERVIEW                                                              │ │
│  │                                                                           │ │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐            │ │
│  │  │  12.5K  │ │  2,345  │ │   890   │ │   4.7   │ │   23    │            │ │
│  │  │  Reads  │ │  Votes  │ │Comments │ │ Rating  │ │New Subs │            │ │
│  │  │  ↑ 15%  │ │  ↑ 8%   │ │ ↑ 23%   │ │  ↑ 0.1  │ │ ↑ 12%   │            │ │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘            │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │  READS OVER TIME                                                        │   │
│  │                                                                         │   │
│  │  3K ┤                                           ╭─╮                     │   │
│  │     │                                      ╭───╯  │                     │   │
│  │  2K ┤              ╭─────╮            ╭───╯       │                     │   │
│  │     │         ╭───╯     ╰───╮    ╭───╯           │                     │   │
│  │  1K ┤    ╭───╯              ╰───╯                ╰───                   │   │
│  │     │───╯                                                               │   │
│  │  0  ┼────┬────┬────┬────┬────┬────┬────                                │   │
│  │       Mon  Tue  Wed  Thu  Fri  Sat  Sun                                │   │
│  │                                                                         │   │
│  │  ── Reads  ── Unique Visitors                                          │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│  ┌──────────────────────────────────┐ ┌────────────────────────────────────┐   │
│  │  TOP CHAPTERS                    │ │  READER DEMOGRAPHICS               │   │
│  │  ────────────                    │ │  ───────────────────               │   │
│  │                                  │ │                                    │   │
│  │  1. Ch.47: Final Confrontation   │ │  By Country:                       │   │
│  │     👁️ 2,341 reads (↑ 45%)       │ │  ┌──────────────────────────────┐ │   │
│  │                                  │ │  │ US ████████████████ 45%     │ │   │
│  │  2. Ch.46: Betrayal at Dawn      │ │  │ UK ██████████ 25%           │ │   │
│  │     👁️ 1,890 reads (↑ 12%)       │ │  │ CA ████████ 15%             │ │   │
│  │                                  │ │  │ AU ████ 8%                  │ │   │
│  │  3. Ch.1: The Beginning          │ │  │ Other ██ 7%                 │ │   │
│  │     👁️ 1,456 reads (↑ 5%)        │ │  └──────────────────────────────┘ │   │
│  │                                  │ │                                    │   │
│  │  4. Ch.45: The Alliance          │ │  Avg. Reading Time: 12 min        │   │
│  │     👁️ 1,234 reads (↓ 3%)        │ │  Completion Rate: 78%             │   │
│  │                                  │ │                                    │   │
│  │  [View All Chapters →]           │ │                                    │   │
│  └──────────────────────────────────┘ └────────────────────────────────────┘   │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │  ENGAGEMENT FUNNEL                                                      │   │
│  │  ─────────────────                                                      │   │
│  │                                                                         │   │
│  │  Visited Story Page ███████████████████████████████████████ 100% (5K)  │   │
│  │  Started Ch. 1      █████████████████████████████████ 82% (4.1K)       │   │
│  │  Finished Ch. 1     ██████████████████████████ 65% (3.25K)             │   │
│  │  Read Ch. 5+        ██████████████████ 45% (2.25K)                     │   │
│  │  Read Ch. 20+       ███████████ 28% (1.4K)                             │   │
│  │  Caught Up (Ch.47)  █████ 15% (750)                                    │   │
│  │                                                                         │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 11. History Page (New)

> **Route:** `/stories/:slug/history`
> **Access:** Collaborator+
> **Purpose:** Activity and change log

### History Timeline

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  Activity History                                [All Activity ▼] [Filter 🔍]   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  TODAY                                                                          │
│  ─────                                                                          │
│                                                                                 │
│      ●───── 2:30 PM                                                             │
│      │      📝 @fantasy_writer published Chapter 47                             │
│      │      "The Final Confrontation"                                           │
│      │      [View Chapter →]                                                    │
│      │                                                                          │
│      ●───── 1:15 PM                                                             │
│      │      ✅ @editor_pro approved PR #156                                     │
│      │      "The Dragon's Revelation"                                           │
│      │      [View PR →]                                                         │
│      │                                                                          │
│      ●───── 11:00 AM                                                            │
│      │      💬 @mystery_lover commented on Chapter 46                           │
│      │      "The betrayal scene was heartbreaking!"                            │
│      │      [View Comment →]                                                    │
│      │                                                                          │
│                                                                                 │
│  YESTERDAY                                                                      │
│  ─────────                                                                      │
│                                                                                 │
│      ●───── 6:45 PM                                                             │
│      │      🔀 @fantasy_writer merged PR #155                                   │
│      │      "Timeline Fix for Chapter 8"                                        │
│      │                                                                          │
│      ●───── 4:20 PM                                                             │
│      │      👥 @story_owner added @new_mod as Moderator                         │
│      │                                                                          │
│      ●───── 2:00 PM                                                             │
│      │      📋 @contributor_1 submitted PR #156                                 │
│      │      "The Dragon's Revelation" - NEW CHAPTER                            │
│      │                                                                          │
│      ●───── 10:30 AM                                                            │
│      │      ⚙️ @story_owner changed setting                                     │
│      │      "Allow Branching" → Enabled                                         │
│      │                                                                          │
│                                                                                 │
│  JANUARY 23, 2024                                                               │
│  ────────────────                                                               │
│                                                                                 │
│      ●───── 8:00 PM                                                             │
│      │      🚩 @moderator resolved report on comment                            │
│      │      Action: Removed comment for harassment                             │
│      │                                                                          │
│      ...                                                                        │
│                                                                                 │
│  [Load More History]                                                            │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 12. Navigation & Layout

### Story Page Layout Structure

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  HEADER (Global)                                                                │
│  [Logo] [Search] [Explore] [My Stories] [Notifications] [Profile]              │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  STORY HEADER                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │  [← Back]  Chronicles of Eldoria  •  by @fantasy_writer  [⚙️] [📤]     │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│  STORY TABS (Sticky on scroll)                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │  [Overview] [Chapters] [Tree*] [PRs*] [Collab*] [Reports*] [Settings*] │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│  * = Role-restricted tabs                                                       │
│                                                                                 │
│  ╔═════════════════════════════════════════════════════════════════════════╗   │
│  ║                                                                         ║   │
│  ║                         PAGE CONTENT                                    ║   │
│  ║                                                                         ║   │
│  ║                    (Based on selected tab)                              ║   │
│  ║                                                                         ║   │
│  ╚═════════════════════════════════════════════════════════════════════════╝   │
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│  FOOTER (if applicable)                                                         │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Tab Visibility by Role

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           TAB VISIBILITY                                         │
└─────────────────────────────────────────────────────────────────────────────────┘

PUBLIC USER (Not logged in):
[Overview] [Chapters]

LOGGED IN (Not collaborator):
[Overview] [Chapters]

CONTRIBUTOR:
[Overview] [Chapters] [Tree] [Submit Requests] [History]

REVIEWER:
[Overview] [Chapters] [Tree] [Submit Requests] [History]

MODERATOR:
[Overview] [Chapters] [Tree] [Submit Requests] [Reports] [History]

CO-AUTHOR:
[Overview] [Chapters] [Tree] [Submit Requests] [Collaborators*] [Reports] [Analytics*] [History]
* = View only

OWNER:
[Overview] [Chapters] [Tree] [Submit Requests] [Collaborators] [Reports] [Settings] [Analytics] [History]
```

---

## 13. Mobile Adaptations

### Mobile Navigation

```
┌─────────────────────────────┐
│  ← Chronicles of Eld... [⋮] │
├─────────────────────────────┤
│                             │
│  ┌─────────────────────────┐│
│  │ [Overview ✓] [Chapters] ││
│  │ [Tree] [More ▼]         ││
│  └─────────────────────────┘│
│                             │
│        PAGE CONTENT         │
│                             │
│                             │
│                             │
├─────────────────────────────┤
│  [📖 Read] [+ Contribute]   │
└─────────────────────────────┘
```

### Mobile Chapter List

```
┌─────────────────────────────┐
│  Chapters                   │
├─────────────────────────────┤
│                             │
│  ┌─────────────────────────┐│
│  │ Ch. 47                  ││
│  │ The Final Confrontation ││
│  │ ─────────────────────── ││
│  │ 👁️ 2.3K  👍 234         ││
│  │ 2 days ago              ││
│  └─────────────────────────┘│
│                             │
│  ┌─────────────────────────┐│
│  │ Ch. 46                  ││
│  │ Betrayal at Dawn        ││
│  │ ─────────────────────── ││
│  │ 👁️ 1.9K  👍 189         ││
│  │ 5 days ago              ││
│  └─────────────────────────┘│
│                             │
│  ┌─────────────────────────┐│
│  │ Ch. 45                  ││
│  │ The Alliance            ││
│  │ ...                     ││
│  └─────────────────────────┘│
│                             │
└─────────────────────────────┘
```

### Mobile Reading View

```
┌─────────────────────────────┐
│  ←  Chapter 12          [⋮] │
├─────────────────────────────┤
│                             │
│     THE DRAGON'S            │
│     REVELATION              │
│                             │
│  ─────────────────────────  │
│                             │
│  The throne room fell       │
│  silent as the massive      │
│  doors swung open.          │
│                             │
│  Myrathis entered with      │
│  the grace of a predator,   │
│  her scales shimmering      │
│  between gold and crimson   │
│  in the torchlight...       │
│                             │
│                             │
│                             │
│                             │
│                             │
├─────────────────────────────┤
│  ████████████░░░░░░░ 65%    │
├─────────────────────────────┤
│  [←]  [👍 234] [💬 45]  [→] │
└─────────────────────────────┘
```

---

## 14. Component Library

### Common Components Needed

| Component          | Usage                     | Variants                   |
| ------------------ | ------------------------- | -------------------------- |
| `StoryCard`        | Overview, related stories | Default, Compact, Featured |
| `ChapterCard`      | Chapters list             | List, Grid, Timeline       |
| `PRCard`           | Submit requests           | List, Detail               |
| `CollaboratorCard` | Team members              | Full, Compact              |
| `ReportCard`       | Moderation                | Pending, Resolved          |
| `StatCard`         | Analytics, overview       | Number, Trend, Chart       |
| `CommentThread`    | Discussions               | Nested, Flat               |
| `RoleBadge`        | User roles                | Owner, Co-Author, etc.     |
| `StatusBadge`      | PR/Chapter status         | Published, Draft, etc.     |
| `VoteButtons`      | Voting UI                 | Horizontal, Vertical       |
| `ProgressBar`      | Reading progress          | Linear, Circular           |
| `DiffViewer`       | PR changes                | Unified, Side-by-side      |
| `TreeNode`         | Chapter tree              | Main, Branch, Draft, PR    |

### Design Tokens

```css
/* Story Page Colors */
--story-owner: #ffd700; /* Gold */
--story-coauthor: #9b59b6; /* Purple */
--story-moderator: #3498db; /* Blue */
--story-reviewer: #1abc9c; /* Teal */
--story-contributor: #95a5a6; /* Gray */

/* Status Colors */
--status-published: #27ae60; /* Green */
--status-draft: #bdc3c7; /* Light Gray */
--status-pending: #f39c12; /* Orange */
--status-rejected: #e74c3c; /* Red */
--status-merged: #9b59b6; /* Purple */

/* Chapter Colors */
--chapter-main: #2c3e50; /* Dark Blue */
--chapter-branch: #16a085; /* Teal */
--chapter-pr: #e67e22; /* Orange */
```

---

## Summary

This document provides comprehensive wireframe ideas for all pages under `stories/:slug/*`:

| Page            | Purpose                | Access        |
| --------------- | ---------------------- | ------------- |
| Overview        | Story landing page     | Public        |
| Chapters        | Browse/manage chapters | Public/Owner+ |
| Tree            | Visual chapter editor  | Contributor+  |
| Submit Requests | PR management          | Contributor+  |
| Collaborators   | Team management        | Owner         |
| Reports         | Content moderation     | Moderator+    |
| Settings        | Story configuration    | Owner         |
| Reader          | Chapter reading        | Public        |
| Analytics (New) | Performance insights   | Owner         |
| History (New)   | Activity log           | Contributor+  |

Each section includes:

- Multiple layout options
- Component breakdowns
- Interaction patterns
- Role-based visibility
- Mobile adaptations

---

_Use these wireframes as starting points. Adapt based on user feedback and development constraints._
