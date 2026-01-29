# CSS Interview Questions - Beginner to Advanced

> Real-world CSS interview questions with detailed answers, practical examples, and scenarios you'll face in actual interviews and job situations.

---

## Table of Contents

1. [Beginner Level Questions](#beginner-level-questions)
2. [Intermediate Level Questions](#intermediate-level-questions)
3. [Advanced Level Questions](#advanced-level-questions)
4. [Layout & Positioning Questions](#layout--positioning-questions)
5. [Flexbox Questions](#flexbox-questions)
6. [Grid Questions](#grid-questions)
7. [Responsive Design Questions](#responsive-design-questions)
8. [Animation & Transitions](#animation--transitions)
9. [Real-World Scenario Questions](#real-world-scenario-questions)
10. [CSS Architecture & Best Practices](#css-architecture--best-practices)

---

## Beginner Level Questions

### 1. What is CSS and what does it stand for?

**Answer:**
CSS stands for **Cascading Style Sheets**. It's a stylesheet language used to describe the presentation of HTML documents.

- **Cascading**: Styles cascade down from multiple sources with specific rules of priority
- **Style**: Visual presentation (colors, fonts, layouts)
- **Sheets**: Separate files that contain styling rules

```css
/* Basic CSS syntax */
selector {
    property: value;
    another-property: another-value;
}

/* Example */
h1 {
    color: blue;
    font-size: 2rem;
    font-weight: bold;
}
```

---

### 2. What are the different ways to apply CSS to a webpage?

**Answer:**

| Method | Location | Priority | Best For |
|--------|----------|----------|----------|
| Inline | HTML element | Highest | Dynamic/JS styles |
| Internal | `<style>` in `<head>` | Medium | Page-specific styles |
| External | Separate `.css` file | Normal | Production use |

```html
<!-- 1. Inline CSS -->
<p style="color: red; font-size: 16px;">Inline styled</p>

<!-- 2. Internal CSS -->
<head>
    <style>
        p { color: blue; }
    </style>
</head>

<!-- 3. External CSS -->
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```

**Recommendation:** Use external CSS for maintainability and caching benefits.

---

### 3. Explain CSS Selectors and their types.

**Answer:**

```css
/* 1. Universal Selector */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* 2. Element/Type Selector */
p { color: gray; }
h1 { font-size: 2rem; }

/* 3. Class Selector */
.button { padding: 10px 20px; }
.btn-primary { background: blue; }

/* 4. ID Selector */
#header { position: fixed; }
#main-content { max-width: 1200px; }

/* 5. Attribute Selectors */
[type="text"] { border: 1px solid gray; }
[href^="https"] { color: green; }        /* Starts with */
[href$=".pdf"] { color: red; }           /* Ends with */
[href*="example"] { font-weight: bold; } /* Contains */
[data-active] { background: yellow; }     /* Has attribute */
[data-status="active"] { opacity: 1; }    /* Exact match */

/* 6. Pseudo-class Selectors */
a:hover { color: red; }
input:focus { outline: 2px solid blue; }
li:first-child { font-weight: bold; }
li:last-child { margin-bottom: 0; }
li:nth-child(odd) { background: #f5f5f5; }
li:nth-child(3n) { color: red; }          /* Every 3rd */
input:valid { border-color: green; }
input:invalid { border-color: red; }
button:disabled { opacity: 0.5; }
div:empty { display: none; }
p:not(.special) { color: gray; }

/* 7. Pseudo-element Selectors */
p::first-line { font-weight: bold; }
p::first-letter { font-size: 2em; }
.quote::before { content: '"'; }
.quote::after { content: '"'; }
::selection { background: yellow; }
::placeholder { color: gray; }

/* 8. Combinator Selectors */
/* Descendant (space) */
article p { line-height: 1.6; }

/* Child (>) */
ul > li { list-style: disc; }

/* Adjacent Sibling (+) */
h2 + p { margin-top: 0; }

/* General Sibling (~) */
h2 ~ p { color: gray; }

/* 9. Grouping Selector */
h1, h2, h3, h4, h5, h6 {
    font-family: 'Helvetica', sans-serif;
}
```

---

### 4. What is CSS Specificity and how is it calculated?

**Answer:**
Specificity determines which CSS rule wins when multiple rules target the same element.

**Specificity Hierarchy (highest to lowest):**
1. `!important` (overrides everything)
2. Inline styles (`style=""`)
3. IDs (`#id`)
4. Classes, attributes, pseudo-classes (`.class`, `[attr]`, `:hover`)
5. Elements, pseudo-elements (`div`, `::before`)

**Calculation Method:** (A, B, C, D)
- A = Inline styles (0 or 1)
- B = Number of ID selectors
- C = Number of class/attribute/pseudo-class selectors
- D = Number of element/pseudo-element selectors

```css
/* Specificity: (0, 0, 0, 1) = 1 */
p { color: black; }

/* Specificity: (0, 0, 1, 0) = 10 */
.text { color: blue; }

/* Specificity: (0, 1, 0, 0) = 100 */
#content { color: green; }

/* Specificity: (0, 0, 1, 1) = 11 */
p.text { color: red; }

/* Specificity: (0, 1, 1, 1) = 111 */
#content p.text { color: purple; }

/* Specificity: (0, 0, 2, 2) = 22 */
div.container p.text { color: orange; }

/* Inline style: (1, 0, 0, 0) = 1000 */
<p style="color: pink;">Pink text</p>

/* !important overrides everything */
p { color: yellow !important; }
```

**Practical Example:**

```html
<div id="sidebar" class="widget">
    <p class="text highlight">Which color am I?</p>
</div>
```

```css
p { color: black; }                     /* (0,0,0,1) = 1 */
.text { color: blue; }                  /* (0,0,1,0) = 10 */
.highlight { color: yellow; }           /* (0,0,1,0) = 10 - SAME, later wins */
p.text { color: green; }                /* (0,0,1,1) = 11 */
#sidebar p { color: red; }              /* (0,1,0,1) = 101 */
#sidebar .text { color: purple; }       /* (0,1,1,0) = 110 - WINNER */
```

---

### 5. What is the CSS Box Model?

**Answer:**
The Box Model describes how every HTML element is rendered as a rectangular box with four layers.

```
┌─────────────────────────────────────────┐
│                MARGIN                    │
│   ┌─────────────────────────────────┐   │
│   │            BORDER               │   │
│   │   ┌─────────────────────────┐   │   │
│   │   │        PADDING          │   │   │
│   │   │   ┌─────────────────┐   │   │   │
│   │   │   │    CONTENT      │   │   │   │
│   │   │   │   (width x      │   │   │   │
│   │   │   │    height)      │   │   │   │
│   │   │   └─────────────────┘   │   │   │
│   │   │                         │   │   │
│   │   └─────────────────────────┘   │   │
│   │                                 │   │
│   └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

```css
.box {
    /* Content */
    width: 300px;
    height: 200px;

    /* Padding (inside border) */
    padding: 20px;

    /* Border */
    border: 5px solid black;

    /* Margin (outside border) */
    margin: 10px;
}

/* Total width calculation (content-box): */
/* 300 + (20*2) + (5*2) + (10*2) = 370px total space */
```

**box-sizing property:**

```css
/* content-box (default) - width/height = content only */
.content-box {
    box-sizing: content-box;
    width: 300px;
    padding: 20px;
    border: 5px solid;
    /* Total width: 300 + 40 + 10 = 350px */
}

/* border-box - width/height includes padding and border */
.border-box {
    box-sizing: border-box;
    width: 300px;
    padding: 20px;
    border: 5px solid;
    /* Total width: 300px (content shrinks to 250px) */
}

/* Best practice: Apply globally */
*, *::before, *::after {
    box-sizing: border-box;
}
```

---

### 6. What is the difference between `margin` and `padding`?

**Answer:**

| Property | Location | Affects | Background | Collapse |
|----------|----------|---------|------------|----------|
| Margin | Outside border | Space between elements | Transparent | Yes (vertical) |
| Padding | Inside border | Space around content | Inherits background | No |

```css
/* Margin - space outside */
.element {
    margin-top: 20px;
    margin-right: 15px;
    margin-bottom: 20px;
    margin-left: 15px;

    /* Shorthand */
    margin: 20px;                    /* All sides */
    margin: 20px 15px;               /* vertical | horizontal */
    margin: 20px 15px 10px;          /* top | horizontal | bottom */
    margin: 20px 15px 10px 5px;      /* top | right | bottom | left */

    /* Centering */
    margin: 0 auto;                  /* Center horizontally */
}

/* Padding - space inside */
.element {
    padding-top: 20px;
    padding-right: 15px;
    padding-bottom: 20px;
    padding-left: 15px;

    /* Shorthand (same as margin) */
    padding: 20px 15px;
}
```

**Margin Collapse:**

```css
/* Vertical margins collapse - larger wins */
.box1 { margin-bottom: 30px; }
.box2 { margin-top: 20px; }
/* Gap between them: 30px (not 50px) */

/* Horizontal margins don't collapse */
.box1 { margin-right: 30px; }
.box2 { margin-left: 20px; }
/* Gap between them: 50px */
```

---

### 7. What are CSS units and when to use each?

**Answer:**

**Absolute Units:**
```css
.element {
    /* Pixels - fixed, most common */
    width: 300px;

    /* Points - primarily for print */
    font-size: 12pt;

    /* Centimeters/Millimeters/Inches - print only */
    width: 10cm;
    margin: 5mm;
    padding: 1in;
}
```

**Relative Units:**
```css
.element {
    /* em - relative to parent's font-size */
    font-size: 1.5em;      /* 1.5 × parent font-size */
    padding: 2em;          /* 2 × current element's font-size */

    /* rem - relative to root (html) font-size */
    font-size: 1.5rem;     /* 1.5 × 16px = 24px (default) */
    padding: 2rem;         /* 2 × 16px = 32px */

    /* Percentage - relative to parent */
    width: 50%;            /* 50% of parent width */
    font-size: 120%;       /* 120% of parent font-size */

    /* Viewport units */
    width: 100vw;          /* 100% of viewport width */
    height: 100vh;         /* 100% of viewport height */
    font-size: 5vmin;      /* 5% of smaller viewport dimension */
    padding: 2vmax;        /* 2% of larger viewport dimension */

    /* Character units */
    width: 60ch;           /* Width of 60 '0' characters */
    height: 20ex;          /* Height of 20 'x' characters */
}
```

**When to use what:**

| Unit | Best For |
|------|----------|
| `px` | Borders, shadows, small fixed values |
| `rem` | Font sizes, spacing, consistent scaling |
| `em` | Component-relative sizing |
| `%` | Fluid widths, relative to parent |
| `vw/vh` | Full-screen sections, hero images |
| `ch` | Text containers (optimal reading width) |

```css
/* Practical example */
html {
    font-size: 16px;              /* Base size */
}

body {
    font-size: 1rem;              /* 16px */
    line-height: 1.5;             /* Unitless - recommended */
}

h1 {
    font-size: 2.5rem;            /* 40px - scales with root */
    margin-bottom: 1em;           /* 40px - scales with heading */
}

.container {
    max-width: 70ch;              /* Optimal reading width */
    padding: 1rem;                /* Consistent spacing */
    margin: 0 auto;
}

.hero {
    height: 100vh;                /* Full viewport height */
    padding: 2rem;
}

.button {
    padding: 0.75em 1.5em;        /* Scales with button font */
    border: 1px solid;            /* Fixed border */
    border-radius: 4px;           /* Fixed radius */
}
```

---

### 8. What is the `display` property and its values?

**Answer:**

```css
/* Block - full width, stacks vertically */
.block {
    display: block;
    /* Takes full available width */
    /* Respects all margin/padding */
    /* Starts on new line */
}

/* Inline - content width, flows with text */
.inline {
    display: inline;
    /* Only takes content width */
    /* Ignores top/bottom margin */
    /* Ignores width/height */
    /* Stays in text flow */
}

/* Inline-block - hybrid */
.inline-block {
    display: inline-block;
    /* Flows with text (inline) */
    /* Respects width/height (block) */
    /* Respects all margin/padding */
}

/* None - removes from layout */
.hidden {
    display: none;
    /* Element doesn't render */
    /* Takes no space */
    /* Not accessible */
}

/* Flex - flexible box layout */
.flex-container {
    display: flex;
    /* Children become flex items */
    /* Powerful alignment options */
}

/* Grid - two-dimensional layout */
.grid-container {
    display: grid;
    /* Children become grid items */
    /* Rows and columns */
}

/* Other values */
.other {
    display: contents;        /* Remove box, keep children */
    display: table;           /* Behave like <table> */
    display: list-item;       /* Behave like <li> */
    display: inline-flex;     /* Inline + flex container */
    display: inline-grid;     /* Inline + grid container */
}
```

**Visual Comparison:**

```html
<style>
    .block { display: block; background: lightblue; margin: 5px; }
    .inline { display: inline; background: lightgreen; margin: 5px; }
    .inline-block { display: inline-block; background: lightyellow; margin: 5px; width: 100px; }
</style>

<!-- Block elements -->
<div class="block">Block 1</div>
<div class="block">Block 2</div>

<!-- Inline elements -->
<span class="inline">Inline 1</span>
<span class="inline">Inline 2</span>
<span class="inline">Inline 3</span>

<!-- Inline-block elements -->
<div class="inline-block">IB 1</div>
<div class="inline-block">IB 2</div>
<div class="inline-block">IB 3</div>
```

---

## Intermediate Level Questions

### 9. Explain CSS Positioning and its types.

**Answer:**

```css
/* 1. Static (default) */
.static {
    position: static;
    /* Normal document flow */
    /* top/right/bottom/left have no effect */
}

/* 2. Relative */
.relative {
    position: relative;
    top: 20px;     /* Moves down from original position */
    left: 30px;    /* Moves right from original position */
    /* Original space is preserved */
    /* Creates positioning context for children */
}

/* 3. Absolute */
.absolute {
    position: absolute;
    top: 0;
    right: 0;
    /* Removed from normal flow */
    /* Positioned relative to nearest positioned ancestor */
    /* If no positioned ancestor, relative to viewport */
}

/* 4. Fixed */
.fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    /* Removed from normal flow */
    /* Positioned relative to viewport */
    /* Stays in place during scroll */
}

/* 5. Sticky */
.sticky {
    position: sticky;
    top: 0;
    /* Hybrid of relative and fixed */
    /* Acts relative until scroll threshold */
    /* Then becomes fixed */
}
```

**Practical Examples:**

```html
<!-- Dropdown Menu -->
<style>
    .dropdown {
        position: relative;        /* Positioning context */
    }
    .dropdown-menu {
        position: absolute;        /* Positioned relative to .dropdown */
        top: 100%;                 /* Below the dropdown */
        left: 0;
        display: none;
    }
    .dropdown:hover .dropdown-menu {
        display: block;
    }
</style>

<div class="dropdown">
    <button>Menu</button>
    <ul class="dropdown-menu">
        <li>Option 1</li>
        <li>Option 2</li>
    </ul>
</div>

<!-- Fixed Header -->
<style>
    .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        background: white;
    }
    .main-content {
        margin-top: 60px;  /* Offset for fixed header */
    }
</style>

<!-- Sticky Sidebar -->
<style>
    .sidebar {
        position: sticky;
        top: 20px;      /* Sticks 20px from top */
        height: fit-content;
    }
</style>

<!-- Modal Overlay -->
<style>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .modal {
        position: relative;  /* For close button positioning */
        background: white;
        padding: 20px;
    }
    .modal-close {
        position: absolute;
        top: 10px;
        right: 10px;
    }
</style>
```

---

### 10. What is the `z-index` property and how does stacking context work?

**Answer:**

`z-index` controls the stacking order of positioned elements (elements with position other than `static`).

```css
/* Basic z-index */
.back { z-index: 1; }
.middle { z-index: 2; }
.front { z-index: 3; }

/* Negative z-index - behind parent */
.behind { z-index: -1; }
```

**Stacking Context:**
A stacking context is a three-dimensional conceptualization of HTML elements.

**What creates a new stacking context:**

```css
/* These properties create stacking contexts */
.creates-stacking-context {
    /* Position + z-index */
    position: relative;
    z-index: 1;

    /* Opacity less than 1 */
    opacity: 0.99;

    /* Transform */
    transform: translateX(0);

    /* Filter */
    filter: blur(0);

    /* Isolation */
    isolation: isolate;

    /* Fixed/Sticky position */
    position: fixed;

    /* Flex/Grid children with z-index */
    /* Will/change with certain values */
    will-change: transform;
}
```

**Stacking Context Gotcha:**

```html
<style>
    .parent-a { position: relative; z-index: 1; }
    .parent-b { position: relative; z-index: 2; }

    .child-a { position: absolute; z-index: 9999; }
    .child-b { position: absolute; z-index: 1; }
</style>

<div class="parent-a">
    <div class="child-a">I have z-index: 9999</div>
</div>
<div class="parent-b">
    <div class="child-b">I have z-index: 1, but I'm on top!</div>
</div>

<!-- child-b appears on top because parent-b has higher z-index -->
<!-- z-index only competes within same stacking context -->
```

**Best Practice:**

```css
/* Use z-index scale system */
:root {
    --z-dropdown: 100;
    --z-sticky: 200;
    --z-fixed: 300;
    --z-modal-backdrop: 400;
    --z-modal: 500;
    --z-popover: 600;
    --z-tooltip: 700;
}

.dropdown { z-index: var(--z-dropdown); }
.modal-backdrop { z-index: var(--z-modal-backdrop); }
.modal { z-index: var(--z-modal); }
```

---

### 11. Explain CSS Pseudo-classes vs Pseudo-elements.

**Answer:**

**Pseudo-classes (`:`)** - Select elements based on state or position

```css
/* State-based */
a:hover { color: red; }
a:active { color: darkred; }
a:visited { color: purple; }
input:focus { outline: 2px solid blue; }
input:disabled { opacity: 0.5; }
input:checked + label { font-weight: bold; }
input:valid { border-color: green; }
input:invalid { border-color: red; }
button:enabled { cursor: pointer; }

/* Structural */
li:first-child { font-weight: bold; }
li:last-child { margin-bottom: 0; }
li:nth-child(odd) { background: #f5f5f5; }
li:nth-child(even) { background: white; }
li:nth-child(3) { color: red; }           /* 3rd child */
li:nth-child(3n) { color: blue; }         /* Every 3rd */
li:nth-child(3n+1) { color: green; }      /* 1st, 4th, 7th... */
p:first-of-type { font-size: 1.2em; }
p:last-of-type { margin-bottom: 0; }
p:only-child { text-align: center; }
:root { --color: blue; }                   /* html element */
p:empty { display: none; }                 /* No content */
p:not(.special) { color: gray; }           /* Negation */
article:has(img) { padding: 20px; }        /* Has descendant (new!) */
:is(h1, h2, h3) { font-family: serif; }    /* Matches any */
:where(h1, h2, h3) { margin: 0; }          /* Like :is, zero specificity */
```

**Pseudo-elements (`::`)** - Create/style parts of elements

```css
/* Generated content */
.quote::before {
    content: '"';
    font-size: 2em;
}
.quote::after {
    content: '"';
    font-size: 2em;
}

/* Empty content for styling */
.icon::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('icon.svg');
}

/* First line/letter */
p::first-line {
    font-weight: bold;
    text-transform: uppercase;
}
p::first-letter {
    font-size: 3em;
    float: left;
    line-height: 1;
}

/* Selection styling */
::selection {
    background: yellow;
    color: black;
}

/* Placeholder text */
input::placeholder {
    color: gray;
    font-style: italic;
}

/* Form controls */
input[type="file"]::file-selector-button {
    background: blue;
    color: white;
}

/* Scrollbar (WebKit) */
::-webkit-scrollbar {
    width: 10px;
}
::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
}

/* List markers */
li::marker {
    color: red;
    font-weight: bold;
}
```

**Common Interview Question: Create a tooltip with CSS only**

```css
.tooltip {
    position: relative;
    cursor: help;
}

.tooltip::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 8px 12px;
    background: #333;
    color: white;
    border-radius: 4px;
    font-size: 14px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s;
}

.tooltip:hover::after {
    opacity: 1;
    visibility: visible;
}
```

```html
<span class="tooltip" data-tooltip="This is a tooltip!">Hover me</span>
```

---

### 12. What is the difference between `visibility: hidden` and `display: none`?

**Answer:**

| Property | Space | Accessibility | Transitions | Events |
|----------|-------|---------------|-------------|--------|
| `display: none` | Removed | Not accessible | No | No |
| `visibility: hidden` | Preserved | Not accessible | Yes | No |
| `opacity: 0` | Preserved | Accessible | Yes | Yes |

```css
/* display: none */
.display-none {
    display: none;
    /* Element is removed from layout */
    /* Takes no space */
    /* Children also hidden */
    /* Cannot be animated */
}

/* visibility: hidden */
.visibility-hidden {
    visibility: hidden;
    /* Element is invisible but present */
    /* Still takes up space */
    /* Children can be made visible */
    /* Can be animated */
}

/* opacity: 0 */
.opacity-zero {
    opacity: 0;
    /* Element is invisible but present */
    /* Still takes up space */
    /* Still receives events (clicks) */
    /* Can be animated */
}

/* Combination for accessibility */
.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
```

**Practical Use Cases:**

```css
/* Fade in/out with visibility (animatable) */
.modal {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0.3s, opacity 0.3s;
}
.modal.active {
    visibility: visible;
    opacity: 1;
}

/* Tab panels with display */
.tab-panel {
    display: none;
}
.tab-panel.active {
    display: block;
}

/* Clickable but invisible overlay */
.overlay {
    opacity: 0;
    /* Still clickable! Use pointer-events */
}
.overlay:hover {
    opacity: 1;
}

/* Truly invisible and non-interactive */
.hidden {
    opacity: 0;
    pointer-events: none;
}
```

---

### 13. What are CSS Variables (Custom Properties)?

**Answer:**

```css
/* Define variables (usually in :root) */
:root {
    /* Colors */
    --color-primary: #007bff;
    --color-secondary: #6c757d;
    --color-success: #28a745;
    --color-danger: #dc3545;
    --color-text: #333;
    --color-background: #fff;

    /* Spacing */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;

    /* Typography */
    --font-family: 'Helvetica Neue', Arial, sans-serif;
    --font-size-base: 16px;
    --line-height: 1.5;

    /* Shadows */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

    /* Borders */
    --border-radius: 4px;
    --border-color: #ddd;
}

/* Use variables */
.button {
    background-color: var(--color-primary);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--border-radius);
    font-family: var(--font-family);
    box-shadow: var(--shadow-sm);
}

/* Fallback values */
.element {
    color: var(--color-undefined, #000);  /* Falls back to #000 */
}

/* Scoped variables */
.card {
    --card-padding: 20px;
    padding: var(--card-padding);
}
.card-compact {
    --card-padding: 10px;
}

/* Dynamic with JavaScript */
document.documentElement.style.setProperty('--color-primary', '#ff0000');
```

**Theme Switching:**

```css
:root {
    --bg-color: #ffffff;
    --text-color: #333333;
    --primary-color: #007bff;
}

[data-theme="dark"] {
    --bg-color: #1a1a2e;
    --text-color: #eaeaea;
    --primary-color: #4dabf7;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
}
```

```javascript
// Toggle theme
function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}
```

---

## Advanced Level Questions

### 14. Explain the CSS `@` rules.

**Answer:**

```css
/* @import - Import other stylesheets */
@import url('reset.css');
@import url('theme.css') screen;

/* @media - Media queries */
@media screen and (max-width: 768px) {
    .container { width: 100%; }
}
@media print {
    .no-print { display: none; }
}
@media (prefers-color-scheme: dark) {
    body { background: #000; color: #fff; }
}
@media (prefers-reduced-motion: reduce) {
    * { animation: none !important; }
}

/* @font-face - Custom fonts */
@font-face {
    font-family: 'MyFont';
    src: url('myfont.woff2') format('woff2'),
         url('myfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

/* @keyframes - Animations */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}

/* @supports - Feature queries */
@supports (display: grid) {
    .container { display: grid; }
}
@supports not (display: grid) {
    .container { display: flex; }
}
@supports (backdrop-filter: blur(10px)) {
    .glass { backdrop-filter: blur(10px); }
}

/* @layer - Cascade layers (new!) */
@layer reset, base, components, utilities;

@layer reset {
    * { margin: 0; padding: 0; }
}
@layer base {
    body { font-family: sans-serif; }
}
@layer components {
    .button { padding: 10px 20px; }
}
@layer utilities {
    .hidden { display: none !important; }
}

/* @container - Container queries (new!) */
.card-container {
    container-type: inline-size;
    container-name: card;
}

@container card (min-width: 400px) {
    .card { display: flex; }
}

/* @property - Custom property definition (new!) */
@property --my-color {
    syntax: '<color>';
    inherits: false;
    initial-value: #c0ffee;
}

/* @scope - Scoped styles (new!) */
@scope (.card) to (.card-content) {
    p { margin: 0; }
}
```

---

### 15. What is BEM methodology?

**Answer:**
BEM stands for **Block, Element, Modifier** - a naming convention for CSS classes.

```css
/* Block - standalone component */
.card { }
.menu { }
.button { }

/* Element - part of block (double underscore) */
.card__header { }
.card__body { }
.card__footer { }
.menu__item { }
.menu__link { }

/* Modifier - variation/state (double hyphen) */
.card--featured { }
.card--dark { }
.button--primary { }
.button--large { }
.button--disabled { }
.menu__item--active { }
```

**Complete Example:**

```html
<article class="card card--featured">
    <header class="card__header">
        <h2 class="card__title">Card Title</h2>
        <span class="card__badge card__badge--new">New</span>
    </header>
    <div class="card__body">
        <p class="card__text">Card content here...</p>
        <img class="card__image" src="image.jpg" alt="">
    </div>
    <footer class="card__footer">
        <button class="button button--primary">Read More</button>
        <button class="button button--secondary">Save</button>
    </footer>
</article>
```

```css
/* Block */
.card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
}

/* Block modifier */
.card--featured {
    border-color: gold;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card--dark {
    background: #333;
    color: white;
}

/* Elements */
.card__header {
    padding: 16px;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card__title {
    margin: 0;
    font-size: 1.25rem;
}

.card__badge {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
}

.card__badge--new {
    background: #28a745;
    color: white;
}

.card__body {
    padding: 16px;
}

.card__text {
    line-height: 1.6;
}

.card__image {
    width: 100%;
    display: block;
}

.card__footer {
    padding: 16px;
    border-top: 1px solid #ddd;
    display: flex;
    gap: 8px;
}

/* Button block */
.button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.button--primary {
    background: #007bff;
    color: white;
}

.button--secondary {
    background: #6c757d;
    color: white;
}
```

**Benefits:**
- ✅ Self-documenting
- ✅ Low specificity
- ✅ Avoids conflicts
- ✅ Easy to understand relationships

---

### 16. What is CSS specificity war and how to avoid it?

**Answer:**

**The Problem:**
```css
/* Escalating specificity battle */
.button { color: blue; }                           /* (0,0,1,0) */
.sidebar .button { color: green; }                 /* (0,0,2,0) */
.main .sidebar .button { color: red; }             /* (0,0,3,0) */
#content .main .sidebar .button { color: purple; } /* (0,1,3,0) */
#content .button { color: orange !important; }     /* !important */
```

**Solutions:**

```css
/* 1. Use low-specificity selectors (BEM) */
.button { color: blue; }
.button--sidebar { color: green; }
.button--main { color: red; }

/* 2. Use CSS Layers */
@layer base, components, overrides;

@layer base {
    .button { color: blue; }
}
@layer components {
    .button { color: green; }  /* Wins due to layer order */
}

/* 3. Use :where() for zero specificity */
:where(.button) { color: blue; }    /* (0,0,0,0) */
.button-override { color: green; }  /* (0,0,1,0) - wins easily */

/* 4. Use CSS Custom Properties */
.button {
    --button-color: blue;
    color: var(--button-color);
}
.sidebar .button {
    --button-color: green;  /* Just override the variable */
}

/* 5. Avoid IDs and deep nesting */
/* BAD */
#header .nav ul li a.active { }

/* GOOD */
.nav__link--active { }
```

---

## Layout & Positioning Questions

### 17. How do you center an element horizontally and vertically?

**Answer:**

```css
/* 1. Flexbox (recommended) */
.flex-center {
    display: flex;
    justify-content: center;  /* Horizontal */
    align-items: center;      /* Vertical */
}

/* 2. Grid - place-items */
.grid-center {
    display: grid;
    place-items: center;  /* Shorthand for align + justify */
}

/* 3. Grid - place-content */
.grid-center-alt {
    display: grid;
    place-content: center;
}

/* 4. Absolute + Transform */
.absolute-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

/* 5. Absolute + Inset + Margin Auto */
.absolute-inset {
    position: absolute;
    inset: 0;  /* top: 0; right: 0; bottom: 0; left: 0; */
    margin: auto;
    width: fit-content;
    height: fit-content;
}

/* 6. Horizontal only - margin auto */
.horizontal-center {
    margin-left: auto;
    margin-right: auto;
    width: fit-content;  /* or specific width */
}

/* 7. Text centering */
.text-center {
    text-align: center;  /* Horizontal */
    line-height: 100px;  /* Vertical for single line */
}

/* 8. Table cell (legacy) */
.table-center {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}
```

**Practical Scenarios:**

```css
/* Center a modal */
.modal-overlay {
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
}

/* Center a hero text */
.hero {
    display: grid;
    place-items: center;
    min-height: 100vh;
    text-align: center;
}

/* Center an icon in a button */
.icon-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
}
```

---

### 18. What is the `float` property and how does clearing work?

**Answer:**

```css
/* Float basics */
.float-left { float: left; }
.float-right { float: right; }
.float-none { float: none; }

/* Clear floats */
.clear-left { clear: left; }
.clear-right { clear: right; }
.clear-both { clear: both; }
```

**The Clearfix Problem:**

```html
<style>
    .container {
        border: 2px solid red;
        /* Container collapses because floated children are out of flow */
    }
    .box {
        float: left;
        width: 100px;
        height: 100px;
        background: blue;
    }
</style>

<div class="container">
    <div class="box"></div>
    <div class="box"></div>
    <!-- Container has 0 height! -->
</div>
```

**Solutions:**

```css
/* 1. Clearfix (classic) */
.clearfix::after {
    content: '';
    display: table;
    clear: both;
}

/* 2. Overflow */
.container {
    overflow: auto;  /* or hidden */
}

/* 3. Display flow-root (modern) */
.container {
    display: flow-root;
}

/* 4. Just use Flexbox/Grid instead */
.container {
    display: flex;
    gap: 10px;
}
```

**When floats are still useful:**

```css
/* Text wrapping around image */
.article img {
    float: left;
    margin: 0 20px 20px 0;
}

/* Shapes */
.circle-image {
    float: left;
    shape-outside: circle(50%);
    clip-path: circle(50%);
    margin-right: 20px;
}
```

---

## Flexbox Questions

### 19. Explain Flexbox and its properties.

**Answer:**

```css
/* Container (Parent) Properties */
.flex-container {
    display: flex;              /* or inline-flex */

    /* Main axis direction */
    flex-direction: row;        /* row | row-reverse | column | column-reverse */

    /* Wrapping */
    flex-wrap: nowrap;          /* nowrap | wrap | wrap-reverse */

    /* Shorthand */
    flex-flow: row wrap;        /* direction + wrap */

    /* Main axis alignment */
    justify-content: flex-start;
    /* flex-start | flex-end | center | space-between | space-around | space-evenly */

    /* Cross axis alignment (single line) */
    align-items: stretch;
    /* stretch | flex-start | flex-end | center | baseline */

    /* Cross axis alignment (multiple lines) */
    align-content: stretch;
    /* stretch | flex-start | flex-end | center | space-between | space-around */

    /* Gap between items */
    gap: 10px;
    row-gap: 10px;
    column-gap: 20px;
}

/* Item (Child) Properties */
.flex-item {
    /* Growth factor */
    flex-grow: 0;       /* How much item grows relative to others */

    /* Shrink factor */
    flex-shrink: 1;     /* How much item shrinks relative to others */

    /* Base size */
    flex-basis: auto;   /* Initial size before grow/shrink */

    /* Shorthand */
    flex: 0 1 auto;     /* grow shrink basis */
    flex: 1;            /* Same as: 1 1 0% */
    flex: auto;         /* Same as: 1 1 auto */
    flex: none;         /* Same as: 0 0 auto */

    /* Self alignment (override align-items) */
    align-self: auto;
    /* auto | flex-start | flex-end | center | baseline | stretch */

    /* Order */
    order: 0;           /* Default 0, negative values allowed */
}
```

**Common Patterns:**

```css
/* Navigation bar */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}

.nav-links {
    display: flex;
    gap: 20px;
}

/* Card layout */
.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.card {
    flex: 1 1 300px;  /* Grow, shrink, min 300px */
    max-width: 400px;
}

/* Equal height columns */
.columns {
    display: flex;
}

.column {
    flex: 1;  /* Equal width, equal height */
}

/* Sticky footer */
.page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.main-content {
    flex: 1;  /* Takes remaining space */
}

/* Center single item */
.center-single {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Push item to end */
.header {
    display: flex;
    align-items: center;
}

.logo { }
.nav { }
.user-menu {
    margin-left: auto;  /* Push to right */
}
```

---

### 20. What is the difference between `justify-content` and `align-items`?

**Answer:**

```
flex-direction: row (default)
┌─────────────────────────────────────────┐
│  ←─── justify-content (main axis) ───→  │
│  ┌─────┐  ┌─────┐  ┌─────┐             │ ↑
│  │     │  │     │  │     │             │ │
│  │ Item│  │ Item│  │ Item│             │ align-items
│  │     │  │     │  │     │             │ (cross axis)
│  └─────┘  └─────┘  └─────┘             │ │
│                                         │ ↓
└─────────────────────────────────────────┘

flex-direction: column
┌─────────────────────────────────────────┐
│  ←─── align-items (cross axis) ───→     │
│  ┌─────────────────────────────────┐   │ ↑
│  │            Item                 │   │ │
│  └─────────────────────────────────┘   │ │
│  ┌─────────────────────────────────┐   │ justify-content
│  │            Item                 │   │ (main axis)
│  └─────────────────────────────────┘   │ │
│  ┌─────────────────────────────────┐   │ │
│  │            Item                 │   │ ↓
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

```css
.container {
    display: flex;
    flex-direction: row;

    /* Main axis (horizontal in row) */
    justify-content: center;

    /* Cross axis (vertical in row) */
    align-items: center;
}

/* When flex-direction: column */
.container-column {
    display: flex;
    flex-direction: column;

    /* Main axis (vertical in column) */
    justify-content: center;

    /* Cross axis (horizontal in column) */
    align-items: center;
}
```

---

## Grid Questions

### 21. Explain CSS Grid and its properties.

**Answer:**

```css
/* Container Properties */
.grid-container {
    display: grid;  /* or inline-grid */

    /* Define columns */
    grid-template-columns: 200px 1fr 2fr;           /* Fixed and fractional */
    grid-template-columns: repeat(3, 1fr);          /* Three equal columns */
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Responsive */
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));  /* Responsive, collapse empty */

    /* Define rows */
    grid-template-rows: 100px auto 100px;
    grid-template-rows: repeat(3, 1fr);

    /* Auto rows/columns for implicit grid */
    grid-auto-rows: minmax(100px, auto);
    grid-auto-columns: 1fr;

    /* Gap */
    gap: 20px;
    row-gap: 20px;
    column-gap: 10px;

    /* Alignment */
    justify-items: stretch;   /* Horizontal alignment of items */
    align-items: stretch;     /* Vertical alignment of items */
    place-items: center;      /* Shorthand for both */

    justify-content: start;   /* Horizontal alignment of grid */
    align-content: start;     /* Vertical alignment of grid */
    place-content: center;    /* Shorthand for both */

    /* Named areas */
    grid-template-areas:
        "header header header"
        "sidebar main main"
        "footer footer footer";
}

/* Item Properties */
.grid-item {
    /* Placement */
    grid-column: 1 / 3;       /* Start line / End line */
    grid-column: 1 / span 2;  /* Start / Span count */
    grid-row: 1 / 3;

    /* Shorthand */
    grid-area: 1 / 1 / 3 / 3; /* row-start / col-start / row-end / col-end */

    /* Named area */
    grid-area: header;

    /* Self alignment */
    justify-self: center;
    align-self: center;
    place-self: center;
}
```

**Common Patterns:**

```css
/* Holy Grail Layout */
.page {
    display: grid;
    grid-template-areas:
        "header header header"
        "nav    main   aside"
        "footer footer footer";
    grid-template-columns: 200px 1fr 200px;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
}

.header { grid-area: header; }
.nav { grid-area: nav; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

/* Responsive Card Grid */
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

/* Masonry-like (with subgrid support) */
.masonry {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-auto-rows: 10px;
}

.masonry-item {
    grid-row: span var(--span, 20);  /* Dynamic height */
}

/* Dashboard Layout */
.dashboard {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(150px, auto);
    gap: 20px;
}

.widget-large {
    grid-column: span 2;
    grid-row: span 2;
}

.widget-wide {
    grid-column: span 2;
}

.widget-tall {
    grid-row: span 2;
}
```

---

### 22. What is the difference between `auto-fill` and `auto-fit`?

**Answer:**

```css
/* auto-fill: Creates as many tracks as fit, keeps empty tracks */
.auto-fill {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    /* Empty tracks remain, items don't stretch beyond minmax */
}

/* auto-fit: Creates as many tracks as fit, collapses empty tracks */
.auto-fit {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    /* Empty tracks collapse to 0, items stretch to fill */
}
```

**Visual Difference:**

```
Container width: 600px, min item width: 100px

auto-fill with 2 items:
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│ Item │ │ Item │ │empty │ │empty │ │empty │ │empty │
└──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘
100px    100px    100px    100px    100px    100px

auto-fit with 2 items:
┌─────────────────────────┐ ┌─────────────────────────┐
│         Item            │ │         Item            │
└─────────────────────────┘ └─────────────────────────┘
           300px                       300px
(empty tracks collapsed, items stretched to 1fr)
```

**When to use:**
- **auto-fill**: When you want consistent column sizes
- **auto-fit**: When you want items to stretch and fill available space

---

## Responsive Design Questions

### 23. What are media queries and how do you use them?

**Answer:**

```css
/* Basic syntax */
@media media-type and (condition) {
    /* styles */
}

/* Screen sizes (mobile-first approach) */
/* Mobile - base styles */
.container {
    width: 100%;
    padding: 10px;
}

/* Tablet and up */
@media screen and (min-width: 768px) {
    .container {
        max-width: 720px;
        padding: 20px;
    }
}

/* Desktop and up */
@media screen and (min-width: 1024px) {
    .container {
        max-width: 960px;
    }
}

/* Large desktop */
@media screen and (min-width: 1200px) {
    .container {
        max-width: 1140px;
    }
}

/* Desktop-first (max-width) */
@media screen and (max-width: 1024px) { }
@media screen and (max-width: 768px) { }
@media screen and (max-width: 480px) { }

/* Combined conditions */
@media screen and (min-width: 768px) and (max-width: 1024px) {
    /* Tablet only */
}

/* Orientation */
@media (orientation: landscape) { }
@media (orientation: portrait) { }

/* Print */
@media print {
    .no-print { display: none; }
    body { font-size: 12pt; }
}

/* High DPI screens */
@media (-webkit-min-device-pixel-ratio: 2),
       (min-resolution: 192dpi) {
    .logo { background-image: url('logo@2x.png'); }
}

/* User preferences */
@media (prefers-color-scheme: dark) {
    body {
        background: #1a1a1a;
        color: #ffffff;
    }
}

@media (prefers-reduced-motion: reduce) {
    * {
        animation: none !important;
        transition: none !important;
    }
}

@media (prefers-contrast: high) {
    body {
        --border-color: #000;
        --text-color: #000;
    }
}

/* Hover capability */
@media (hover: hover) {
    .button:hover {
        background: blue;
    }
}

@media (hover: none) {
    /* Touch devices - no hover states */
    .tooltip { display: none; }
}

/* Pointer precision */
@media (pointer: fine) {
    /* Mouse/trackpad */
    .small-button { padding: 5px 10px; }
}

@media (pointer: coarse) {
    /* Touch */
    .small-button { padding: 15px 25px; }
}
```

---

### 24. What is mobile-first vs desktop-first approach?

**Answer:**

**Mobile-First (Recommended):**

```css
/* Base styles for mobile */
.nav {
    display: none;  /* Hidden on mobile */
}

.menu-toggle {
    display: block;  /* Hamburger visible on mobile */
}

/* Enhance for larger screens */
@media (min-width: 768px) {
    .nav {
        display: flex;
    }

    .menu-toggle {
        display: none;
    }
}
```

**Desktop-First:**

```css
/* Base styles for desktop */
.nav {
    display: flex;
}

.menu-toggle {
    display: none;
}

/* Override for smaller screens */
@media (max-width: 767px) {
    .nav {
        display: none;
    }

    .menu-toggle {
        display: block;
    }
}
```

**Why Mobile-First is Better:**
1. ✅ Progressive enhancement
2. ✅ Simpler CSS (add complexity, don't remove)
3. ✅ Better performance on mobile
4. ✅ Forces content prioritization
5. ✅ Easier to maintain

---

## Animation & Transitions

### 25. What is the difference between CSS transitions and animations?

**Answer:**

| Feature | Transitions | Animations |
|---------|-------------|------------|
| Trigger | State change (hover, class) | Automatic or manual |
| Keyframes | Start → End only | Multiple keyframes |
| Looping | No | Yes |
| Control | Less control | Full control |
| Direction | One-way (or reverse) | Forward, reverse, alternate |
| Use Case | Simple interactions | Complex sequences |

**Transitions:**

```css
/* Basic transition */
.button {
    background: blue;
    transition: background 0.3s ease;
}
.button:hover {
    background: red;
}

/* Multiple properties */
.card {
    transition: transform 0.3s ease,
                box-shadow 0.3s ease,
                opacity 0.3s ease;
}
.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

/* All properties */
.element {
    transition: all 0.3s ease;
}

/* Individual control */
.element {
    transition-property: transform, opacity;
    transition-duration: 0.3s, 0.5s;
    transition-timing-function: ease, linear;
    transition-delay: 0s, 0.1s;
}
```

**Animations:**

```css
/* Define animation */
@keyframes fadeInUp {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
}

@keyframes rainbow {
    0% { background: red; }
    16% { background: orange; }
    32% { background: yellow; }
    48% { background: green; }
    64% { background: blue; }
    80% { background: indigo; }
    100% { background: violet; }
}

/* Apply animation */
.element {
    animation: fadeInUp 0.5s ease forwards;
}

/* Full syntax */
.element {
    animation-name: pulse;
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    animation-delay: 0s;
    animation-iteration-count: infinite;  /* or number */
    animation-direction: alternate;       /* normal | reverse | alternate | alternate-reverse */
    animation-fill-mode: forwards;        /* none | forwards | backwards | both */
    animation-play-state: running;        /* running | paused */
}

/* Shorthand */
.element {
    animation: pulse 1s ease-in-out infinite alternate;
}

/* Multiple animations */
.element {
    animation: fadeIn 0.5s ease,
               slideUp 0.5s ease 0.2s,
               pulse 2s ease-in-out infinite;
}
```

**Timing Functions:**

```css
.element {
    /* Built-in */
    transition-timing-function: ease;         /* Default */
    transition-timing-function: linear;
    transition-timing-function: ease-in;
    transition-timing-function: ease-out;
    transition-timing-function: ease-in-out;

    /* Stepped */
    transition-timing-function: steps(4);
    transition-timing-function: step-start;
    transition-timing-function: step-end;

    /* Custom cubic-bezier */
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);  /* Bounce */
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);           /* Material Design */
}
```

---

### 26. How do you optimize CSS animations for performance?

**Answer:**

```css
/* GOOD - Uses compositor-only properties */
.optimized {
    /* Transform - GPU accelerated */
    transform: translateX(100px);
    transform: scale(1.5);
    transform: rotate(45deg);

    /* Opacity - GPU accelerated */
    opacity: 0.5;

    /* Hint to browser */
    will-change: transform, opacity;
}

/* BAD - Triggers layout/paint */
.not-optimized {
    /* These trigger expensive reflows/repaints */
    width: 200px;
    height: 200px;
    top: 100px;
    left: 100px;
    margin: 20px;
    padding: 20px;
    border-width: 5px;
}

/* Instead of animating width, use transform */
/* BAD */
.element {
    width: 100px;
    transition: width 0.3s;
}
.element:hover {
    width: 200px;
}

/* GOOD */
.element {
    width: 100px;
    transition: transform 0.3s;
}
.element:hover {
    transform: scaleX(2);
}

/* Instead of animating top/left, use transform */
/* BAD */
.element {
    position: absolute;
    top: 0;
    left: 0;
    transition: top 0.3s, left 0.3s;
}
.element:hover {
    top: 100px;
    left: 100px;
}

/* GOOD */
.element {
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.3s;
}
.element:hover {
    transform: translate(100px, 100px);
}

/* Use will-change sparingly */
.animated-element {
    will-change: transform;  /* Prepare GPU */
}

/* Remove will-change when not needed */
.element {
    transition: transform 0.3s;
}
.element:hover {
    will-change: transform;  /* Only during hover */
    transform: scale(1.1);
}
```

**Performance Layers:**
1. **Layout** - width, height, margin, padding, position
2. **Paint** - color, background, border-radius, shadows
3. **Composite** - transform, opacity (GPU accelerated)

---

## Real-World Scenario Questions

### 27. How would you create a responsive navigation that becomes a hamburger menu on mobile?

**Answer:**

```html
<nav class="navbar">
    <a href="/" class="navbar__logo">Logo</a>

    <button class="navbar__toggle" aria-label="Toggle menu" aria-expanded="false">
        <span class="navbar__toggle-icon"></span>
    </button>

    <ul class="navbar__menu">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
</nav>
```

```css
/* Base styles (mobile-first) */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #333;
}

.navbar__logo {
    color: white;
    font-weight: bold;
    text-decoration: none;
}

/* Hamburger toggle */
.navbar__toggle {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 24px;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 10;
}

.navbar__toggle-icon,
.navbar__toggle-icon::before,
.navbar__toggle-icon::after {
    display: block;
    width: 100%;
    height: 3px;
    background: white;
    transition: all 0.3s ease;
}

.navbar__toggle-icon {
    position: relative;
}

.navbar__toggle-icon::before,
.navbar__toggle-icon::after {
    content: '';
    position: absolute;
}

.navbar__toggle-icon::before { top: -8px; }
.navbar__toggle-icon::after { top: 8px; }

/* Hamburger animation when active */
.navbar__toggle.active .navbar__toggle-icon {
    background: transparent;
}

.navbar__toggle.active .navbar__toggle-icon::before {
    top: 0;
    transform: rotate(45deg);
}

.navbar__toggle.active .navbar__toggle-icon::after {
    top: 0;
    transform: rotate(-45deg);
}

/* Mobile menu */
.navbar__menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #333;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
}

.navbar__menu.active {
    transform: translateX(0);
}

.navbar__menu a {
    color: white;
    text-decoration: none;
    font-size: 1.5rem;
}

/* Desktop styles */
@media (min-width: 768px) {
    .navbar__toggle {
        display: none;
    }

    .navbar__menu {
        position: static;
        flex-direction: row;
        height: auto;
        width: auto;
        background: transparent;
        transform: none;
        gap: 1.5rem;
    }

    .navbar__menu a {
        font-size: 1rem;
    }
}
```

```javascript
// Toggle functionality
const toggle = document.querySelector('.navbar__toggle');
const menu = document.querySelector('.navbar__menu');

toggle.addEventListener('click', () => {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !isExpanded);
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
});
```

---

### 28. How would you implement a dark mode toggle?

**Answer:**

```css
/* CSS Custom Properties for theming */
:root {
    /* Light theme (default) */
    --color-bg: #ffffff;
    --color-bg-secondary: #f5f5f5;
    --color-text: #333333;
    --color-text-secondary: #666666;
    --color-primary: #007bff;
    --color-border: #dddddd;
    --shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Dark theme */
[data-theme="dark"] {
    --color-bg: #1a1a2e;
    --color-bg-secondary: #16213e;
    --color-text: #eaeaea;
    --color-text-secondary: #b0b0b0;
    --color-primary: #4dabf7;
    --color-border: #2d2d44;
    --shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

/* System preference support */
@media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
        --color-bg: #1a1a2e;
        --color-bg-secondary: #16213e;
        --color-text: #eaeaea;
        --color-text-secondary: #b0b0b0;
        --color-primary: #4dabf7;
        --color-border: #2d2d44;
        --shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }
}

/* Apply variables */
body {
    background-color: var(--color-bg);
    color: var(--color-text);
    transition: background-color 0.3s, color 0.3s;
}

.card {
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    box-shadow: var(--shadow);
}

.text-secondary {
    color: var(--color-text-secondary);
}

a {
    color: var(--color-primary);
}
```

```html
<button class="theme-toggle" aria-label="Toggle dark mode">
    <svg class="icon-sun">...</svg>
    <svg class="icon-moon">...</svg>
</button>
```

```css
/* Toggle button styling */
.theme-toggle {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
}

.icon-sun,
.icon-moon {
    width: 24px;
    height: 24px;
}

/* Show/hide icons based on theme */
:root .icon-moon { display: block; }
:root .icon-sun { display: none; }

[data-theme="dark"] .icon-moon { display: none; }
[data-theme="dark"] .icon-sun { display: block; }
```

```javascript
// Theme toggle with localStorage persistence
const themeToggle = document.querySelector('.theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function getPreferredTheme() {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return prefersDark.matches ? 'dark' : 'light';
}

// Initialize
setTheme(getPreferredTheme());

// Toggle
themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});

// Listen for system preference changes
prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});
```

---

## CSS Architecture & Best Practices

### 29. What CSS methodologies do you know? Compare them.

**Answer:**

| Methodology | Concept | Example | Best For |
|-------------|---------|---------|----------|
| **BEM** | Block, Element, Modifier | `.card__title--large` | Most projects |
| **OOCSS** | Separate structure/skin | `.btn`, `.btn-primary` | Large sites |
| **SMACSS** | Categorize styles | `.is-active`, `.l-sidebar` | Complex apps |
| **Atomic CSS** | Single-purpose classes | `.mt-4`, `.flex` | Rapid development |
| **CSS Modules** | Scoped styles | Component-based | React/Vue apps |

```css
/* BEM Example */
.card { }
.card__header { }
.card__title { }
.card--featured { }

/* OOCSS Example */
.box { padding: 20px; }                    /* Structure */
.box-primary { background: blue; }         /* Skin */
.btn { padding: 10px 20px; }              /* Structure */
.btn-success { background: green; }        /* Skin */

/* SMACSS Example */
/* Base */
html, body { margin: 0; }

/* Layout */
.l-header { }
.l-sidebar { }
.l-main { }

/* Module */
.card { }
.nav { }

/* State */
.is-active { }
.is-hidden { }

/* Theme */
.theme-dark { }

/* Atomic/Utility-First (like Tailwind) */
.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.p-4 { padding: 1rem; }
.mt-2 { margin-top: 0.5rem; }
.text-lg { font-size: 1.125rem; }
.font-bold { font-weight: 700; }
.bg-blue-500 { background-color: #3b82f6; }
```

---

### 30. How do you organize CSS for a large project?

**Answer:**

**File Structure:**

```
styles/
├── base/
│   ├── _reset.css
│   ├── _typography.css
│   └── _variables.css
├── components/
│   ├── _buttons.css
│   ├── _cards.css
│   ├── _forms.css
│   └── _navigation.css
├── layout/
│   ├── _header.css
│   ├── _footer.css
│   ├── _sidebar.css
│   └── _grid.css
├── pages/
│   ├── _home.css
│   ├── _about.css
│   └── _contact.css
├── utilities/
│   ├── _spacing.css
│   ├── _display.css
│   └── _text.css
├── vendors/
│   └── _third-party.css
└── main.css
```

**main.css:**

```css
/* Variables and Config */
@import 'base/variables';

/* Reset and Base */
@import 'base/reset';
@import 'base/typography';

/* Layout */
@import 'layout/grid';
@import 'layout/header';
@import 'layout/footer';
@import 'layout/sidebar';

/* Components */
@import 'components/buttons';
@import 'components/cards';
@import 'components/forms';
@import 'components/navigation';

/* Pages */
@import 'pages/home';
@import 'pages/about';

/* Utilities (last for override power) */
@import 'utilities/spacing';
@import 'utilities/display';
@import 'utilities/text';
```

**Using CSS Layers (Modern):**

```css
@layer reset, base, layout, components, utilities;

@import 'base/reset.css' layer(reset);
@import 'base/typography.css' layer(base);
@import 'layout/grid.css' layer(layout);
@import 'components/buttons.css' layer(components);
@import 'utilities/spacing.css' layer(utilities);
```

---

## Quick Reference

```css
/* Centering */
.center-flex { display: flex; justify-content: center; align-items: center; }
.center-grid { display: grid; place-items: center; }
.center-absolute { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }

/* Truncate text */
.truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Multi-line truncate */
.line-clamp {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Aspect ratio */
.aspect-16-9 { aspect-ratio: 16 / 9; }

/* Smooth scroll */
html { scroll-behavior: smooth; }

/* Custom scrollbar */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-thumb { background: #888; border-radius: 4px; }

/* Focus visible */
:focus-visible { outline: 2px solid blue; outline-offset: 2px; }
:focus:not(:focus-visible) { outline: none; }
```

---

*This guide covers real-world CSS interview questions from beginner to advanced levels. Practice implementing these concepts and be ready to explain your reasoning in interviews.*
