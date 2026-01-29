# Complete HTML Tags Reference Guide

> A comprehensive reference of all HTML tags, their usage, attributes, and real-world examples.

---

## Table of Contents

1. [Document Structure Tags](#document-structure-tags)
2. [Metadata Tags](#metadata-tags)
3. [Semantic/Structural Tags](#semanticstructural-tags)
4. [Text Content Tags](#text-content-tags)
5. [Inline Text Semantics](#inline-text-semantics)
6. [Media Tags](#media-tags)
7. [Form Tags](#form-tags)
8. [Table Tags](#table-tags)
9. [List Tags](#list-tags)
10. [Scripting Tags](#scripting-tags)
11. [Interactive Tags](#interactive-tags)
12. [Deprecated Tags](#deprecated-tags)
13. [Tag Categories Summary](#tag-categories-summary)

---

## Document Structure Tags

### `<!DOCTYPE>`

**Purpose:** Declares the document type and HTML version.

```html
<!-- HTML5 (Current Standard) -->
<!DOCTYPE html>

<!-- This must be the FIRST line in every HTML document -->
<!-- It's NOT an HTML tag, but a declaration -->
```

**Why it matters:**
- Prevents browsers from entering "quirks mode"
- Ensures consistent rendering across browsers

---

### `<html>`

**Purpose:** Root element of an HTML page.

```html
<html lang="en" dir="ltr">
    <head>...</head>
    <body>...</body>
</html>
```

| Attribute | Description | Values |
|-----------|-------------|--------|
| `lang` | Language of content | `en`, `es`, `fr`, `zh`, etc. |
| `dir` | Text direction | `ltr` (left-to-right), `rtl` (right-to-left) |

---

### `<head>`

**Purpose:** Contains metadata, links to stylesheets, scripts, and other resources.

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
    <link rel="stylesheet" href="styles.css">
    <script src="script.js" defer></script>
</head>
```

**Can contain:** `<title>`, `<meta>`, `<link>`, `<style>`, `<script>`, `<base>`, `<noscript>`

---

### `<body>`

**Purpose:** Contains all visible content of the page.

```html
<body class="light-theme" onload="init()">
    <!-- All visible content goes here -->
</body>
```

| Attribute | Description |
|-----------|-------------|
| `onload` | Script to run when page loads |
| `onunload` | Script to run when page unloads |
| `class` | CSS classes for styling |

---

## Metadata Tags

### `<title>`

**Purpose:** Defines the page title shown in browser tabs and search results.

```html
<title>Product Name | Company - Brief Description</title>

<!-- Best Practices -->
<!-- Keep under 60 characters -->
<!-- Include primary keyword -->
<!-- Make it descriptive and unique -->
```

---

### `<meta>`

**Purpose:** Provides metadata about the HTML document.

```html
<!-- Essential Meta Tags -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Page description for SEO (150-160 chars)">

<!-- Additional SEO -->
<meta name="keywords" content="keyword1, keyword2, keyword3">
<meta name="author" content="Author Name">
<meta name="robots" content="index, follow">

<!-- Social Media -->
<meta property="og:title" content="Title for Facebook">
<meta property="og:description" content="Description for Facebook">
<meta property="og:image" content="https://example.com/image.jpg">
<meta name="twitter:card" content="summary_large_image">

<!-- Browser/App -->
<meta name="theme-color" content="#4285f4">
<meta http-equiv="refresh" content="30">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
```

---

### `<link>`

**Purpose:** Links external resources to the document.

```html
<!-- Stylesheets -->
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="print.css" media="print">

<!-- Favicon -->
<link rel="icon" href="favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">

<!-- Preloading/Prefetching -->
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://api.example.com">
<link rel="prefetch" href="next-page.html">

<!-- Canonical URL -->
<link rel="canonical" href="https://www.example.com/page">

<!-- RSS Feed -->
<link rel="alternate" type="application/rss+xml" href="/feed.xml" title="RSS">

<!-- Manifest (PWA) -->
<link rel="manifest" href="/manifest.json">
```

---

### `<base>`

**Purpose:** Specifies the base URL for all relative URLs in the document.

```html
<head>
    <base href="https://www.example.com/" target="_blank">
</head>

<!-- Now all relative URLs will be based on https://www.example.com/ -->
<body>
    <a href="about">About</a>  <!-- Links to https://www.example.com/about -->
    <img src="images/logo.png"> <!-- https://www.example.com/images/logo.png -->
</body>
```

---

### `<style>`

**Purpose:** Contains CSS styles for the document.

```html
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
    }
</style>

<!-- Scoped styles (less common) -->
<style media="screen and (max-width: 600px)">
    .sidebar { display: none; }
</style>
```

---

## Semantic/Structural Tags

### `<header>`

**Purpose:** Introductory content or navigational aids.

```html
<!-- Page header -->
<header>
    <img src="logo.png" alt="Company Logo">
    <nav>...</nav>
</header>

<!-- Article header -->
<article>
    <header>
        <h1>Article Title</h1>
        <p>Published on <time datetime="2024-01-15">January 15, 2024</time></p>
        <address>By <a href="mailto:author@example.com">John Doe</a></address>
    </header>
    <p>Article content...</p>
</article>
```

---

### `<nav>`

**Purpose:** Navigation section with links.

```html
<!-- Main navigation -->
<nav aria-label="Main navigation">
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
</nav>

<!-- Breadcrumb navigation -->
<nav aria-label="Breadcrumb">
    <ol>
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li aria-current="page">Laptop</li>
    </ol>
</nav>

<!-- Pagination navigation -->
<nav aria-label="Pagination">
    <a href="?page=1">First</a>
    <a href="?page=4">Previous</a>
    <span aria-current="page">5</span>
    <a href="?page=6">Next</a>
    <a href="?page=10">Last</a>
</nav>
```

---

### `<main>`

**Purpose:** Main content of the document (unique per page).

```html
<body>
    <header>Site header</header>
    <nav>Navigation</nav>

    <main id="main-content">
        <!-- Primary page content -->
        <h1>Page Title</h1>
        <article>...</article>
    </main>

    <aside>Sidebar</aside>
    <footer>Site footer</footer>
</body>

<!-- Note: Only ONE <main> per page -->
<!-- Should NOT be inside <article>, <aside>, <footer>, <header>, or <nav> -->
```

---

### `<article>`

**Purpose:** Self-contained, independently distributable content.

```html
<!-- Blog post -->
<article>
    <header>
        <h2>How to Learn JavaScript</h2>
        <p>By <a href="/authors/jane">Jane Doe</a> | <time datetime="2024-01-15">Jan 15, 2024</time></p>
    </header>
    <p>JavaScript is one of the most popular programming languages...</p>
    <footer>
        <p>Tags: <a href="/tags/javascript">JavaScript</a>, <a href="/tags/programming">Programming</a></p>
    </footer>
</article>

<!-- Comment (can be nested) -->
<article class="comment">
    <header>
        <img src="avatar.jpg" alt="">
        <span>User123</span>
        <time datetime="2024-01-16T14:30">2 hours ago</time>
    </header>
    <p>Great article! Very helpful.</p>

    <!-- Reply (nested article) -->
    <article class="comment reply">
        <header>
            <span>Author</span>
            <time datetime="2024-01-16T15:00">1 hour ago</time>
        </header>
        <p>Thanks for your feedback!</p>
    </article>
</article>

<!-- Product card -->
<article class="product-card">
    <img src="product.jpg" alt="Product Name">
    <h3>Product Name</h3>
    <p class="price">$99.99</p>
    <button>Add to Cart</button>
</article>
```

---

### `<section>`

**Purpose:** Thematic grouping of content with a heading.

```html
<main>
    <section id="introduction">
        <h2>Introduction</h2>
        <p>Welcome to our guide...</p>
    </section>

    <section id="features">
        <h2>Features</h2>
        <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
        </ul>
    </section>

    <section id="pricing">
        <h2>Pricing</h2>
        <div class="pricing-cards">...</div>
    </section>

    <section id="faq">
        <h2>Frequently Asked Questions</h2>
        <dl>...</dl>
    </section>
</main>
```

**`<section>` vs `<div>`:**
- Use `<section>` for thematic grouping with a heading
- Use `<div>` for styling/layout purposes only

---

### `<aside>`

**Purpose:** Content tangentially related to surrounding content.

```html
<!-- Sidebar -->
<aside class="sidebar">
    <h3>Related Posts</h3>
    <ul>
        <li><a href="#">Post 1</a></li>
        <li><a href="#">Post 2</a></li>
    </ul>
</aside>

<!-- Pull quote in article -->
<article>
    <p>The company announced record profits...</p>
    <aside class="pull-quote">
        <blockquote>"This is our best quarter ever"</blockquote>
        <cite>— CEO John Smith</cite>
    </aside>
    <p>Analysts predict continued growth...</p>
</article>

<!-- Advertisement -->
<aside class="ad-container">
    <p>Advertisement</p>
    <a href="/sponsors"><img src="ad.jpg" alt="Ad"></a>
</aside>
```

---

### `<footer>`

**Purpose:** Footer for its nearest sectioning content or root.

```html
<!-- Page footer -->
<footer>
    <nav>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
    </nav>
    <p>&copy; 2024 Company Name. All rights reserved.</p>
    <address>
        Contact: <a href="mailto:info@example.com">info@example.com</a>
    </address>
</footer>

<!-- Article footer -->
<article>
    <h2>Article Title</h2>
    <p>Content...</p>
    <footer>
        <p>Tags: JavaScript, React, Web Development</p>
        <p>Share: <a href="#">Twitter</a> | <a href="#">Facebook</a></p>
    </footer>
</article>
```

---

### `<address>`

**Purpose:** Contact information for author/owner.

```html
<!-- Author contact in article -->
<article>
    <h1>Article Title</h1>
    <address>
        Written by <a href="mailto:author@example.com">John Doe</a><br>
        Visit us at: <a href="https://example.com">example.com</a>
    </address>
    <p>Article content...</p>
</article>

<!-- Business contact in footer -->
<footer>
    <address>
        <strong>Company Name</strong><br>
        123 Main Street<br>
        City, State 12345<br>
        Phone: <a href="tel:+1234567890">(123) 456-7890</a><br>
        Email: <a href="mailto:info@company.com">info@company.com</a>
    </address>
</footer>
```

---

### `<figure>` and `<figcaption>`

**Purpose:** Self-contained content with optional caption.

```html
<!-- Image with caption -->
<figure>
    <img src="chart.png" alt="Sales chart showing 50% growth">
    <figcaption>Figure 1: Q4 2024 Sales Growth</figcaption>
</figure>

<!-- Code example -->
<figure>
    <pre><code>
function hello() {
    console.log("Hello, World!");
}
    </code></pre>
    <figcaption>Example 1: Basic JavaScript function</figcaption>
</figure>

<!-- Quote with citation -->
<figure>
    <blockquote>
        The only way to do great work is to love what you do.
    </blockquote>
    <figcaption>— Steve Jobs</figcaption>
</figure>

<!-- Multiple images -->
<figure>
    <img src="before.jpg" alt="Before renovation">
    <img src="after.jpg" alt="After renovation">
    <figcaption>Home renovation: Before and After</figcaption>
</figure>
```

---

### `<div>`

**Purpose:** Generic container for styling/layout (no semantic meaning).

```html
<!-- Layout container -->
<div class="container">
    <div class="row">
        <div class="col-6">Column 1</div>
        <div class="col-6">Column 2</div>
    </div>
</div>

<!-- Wrapper for JavaScript -->
<div id="app"></div>

<!-- Styling wrapper -->
<div class="card shadow rounded">
    <h3>Card Title</h3>
    <p>Card content</p>
</div>
```

---

## Text Content Tags

### Headings: `<h1>` to `<h6>`

**Purpose:** Section headings with hierarchical importance.

```html
<h1>Main Page Title</h1>          <!-- Only ONE per page, most important -->
    <h2>Major Section</h2>
        <h3>Subsection</h3>
            <h4>Sub-subsection</h4>
                <h5>Minor heading</h5>
                    <h6>Least important</h6>
```

**Best Practices:**
- Only one `<h1>` per page
- Don't skip levels (h1 → h3)
- Use for structure, not styling

---

### `<p>`

**Purpose:** Paragraph of text.

```html
<p>This is a paragraph of text. It represents a distinct block of content.</p>

<p>
    Paragraphs can contain <strong>bold text</strong>,
    <em>italic text</em>, <a href="#">links</a>, and other inline elements.
</p>
```

---

### `<blockquote>`

**Purpose:** Extended quotation from another source.

```html
<blockquote cite="https://source-url.com">
    <p>
        The only thing we have to fear is fear itself.
    </p>
</blockquote>
<cite>— Franklin D. Roosevelt, Inaugural Address</cite>

<!-- With attribution inside -->
<blockquote>
    <p>Stay hungry, stay foolish.</p>
    <footer>— <cite>Steve Jobs</cite>, Stanford Commencement, 2005</footer>
</blockquote>
```

---

### `<pre>`

**Purpose:** Preformatted text (preserves whitespace and line breaks).

```html
<pre>
    This text preserves
        whitespace and
            line breaks
</pre>

<!-- Code block -->
<pre><code class="language-javascript">
function greet(name) {
    return `Hello, ${name}!`;
}
</code></pre>

<!-- ASCII art -->
<pre>
  /\_/\
 ( o.o )
  > ^ <
</pre>
```

---

### `<hr>`

**Purpose:** Thematic break between content sections.

```html
<section>
    <h2>Chapter 1</h2>
    <p>Content of chapter 1...</p>
</section>

<hr>

<section>
    <h2>Chapter 2</h2>
    <p>Content of chapter 2...</p>
</section>

<!-- Styled divider -->
<hr class="fancy-divider">
```

---

### `<br>`

**Purpose:** Line break within text.

```html
<!-- Address -->
<address>
    123 Main Street<br>
    City, State 12345<br>
    Country
</address>

<!-- Poetry -->
<p>
    Roses are red,<br>
    Violets are blue,<br>
    HTML is fun,<br>
    And so are you!
</p>
```

**Note:** Don't use `<br>` for spacing; use CSS margins instead.

---

## Inline Text Semantics

### `<a>` (Anchor)

**Purpose:** Hyperlinks to other pages, files, locations, or actions.

```html
<!-- External link -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
    External Site
</a>

<!-- Internal link -->
<a href="/about">About Us</a>

<!-- Anchor link (same page) -->
<a href="#section-id">Jump to Section</a>

<!-- Email link -->
<a href="mailto:contact@example.com?subject=Hello&body=Hi there">
    Send Email
</a>

<!-- Phone link -->
<a href="tel:+1234567890">Call Us</a>

<!-- Download link -->
<a href="/files/document.pdf" download="my-document.pdf">
    Download PDF
</a>

<!-- JavaScript action -->
<a href="javascript:void(0)" onclick="openModal()">Open Modal</a>

<!-- Skip link for accessibility -->
<a href="#main-content" class="skip-link">Skip to main content</a>
```

| Attribute | Description |
|-----------|-------------|
| `href` | URL destination |
| `target` | `_blank`, `_self`, `_parent`, `_top` |
| `rel` | Relationship: `noopener`, `noreferrer`, `nofollow` |
| `download` | Download instead of navigate |
| `hreflang` | Language of linked resource |

---

### `<strong>` and `<b>`

```html
<!-- <strong> - Important text (semantic) -->
<p><strong>Warning:</strong> This action cannot be undone.</p>

<!-- <b> - Bold text without importance -->
<p>The <b>keyword</b> appears frequently in this document.</p>
```

---

### `<em>` and `<i>`

```html
<!-- <em> - Emphasized/stressed text (semantic) -->
<p>You <em>must</em> complete this step first.</p>

<!-- <i> - Alternate voice, technical terms, thoughts -->
<p>The <i>USS Enterprise</i> is a famous starship.</p>
<p><i>What was I thinking?</i> she wondered.</p>
```

---

### `<small>`

**Purpose:** Side comments, small print, legal text.

```html
<p>Price: $99.99 <small>(excludes tax)</small></p>

<footer>
    <small>&copy; 2024 Company. All rights reserved.</small>
</footer>
```

---

### `<mark>`

**Purpose:** Highlighted/marked text.

```html
<p>Search results for "JavaScript":</p>
<p>Learn <mark>JavaScript</mark> in 30 days with our course.</p>
```

---

### `<del>` and `<ins>`

**Purpose:** Deleted and inserted text (edits).

```html
<!-- Price change -->
<p>Price: <del>$99.99</del> <ins>$79.99</ins></p>

<!-- Document edits -->
<p>
    The meeting is scheduled for <del datetime="2024-01-15">Monday</del>
    <ins datetime="2024-01-16">Tuesday</ins>.
</p>
```

---

### `<sub>` and `<sup>`

**Purpose:** Subscript and superscript text.

```html
<!-- Chemical formula -->
<p>Water: H<sub>2</sub>O</p>

<!-- Math exponent -->
<p>x<sup>2</sup> + y<sup>2</sup> = z<sup>2</sup></p>

<!-- Footnote reference -->
<p>This is an important fact<sup><a href="#fn1">1</a></sup>.</p>

<!-- Trademark -->
<p>Company Name<sup>™</sup></p>
```

---

### `<code>`, `<kbd>`, `<samp>`, `<var>`

```html
<!-- Inline code -->
<p>Use the <code>console.log()</code> function to debug.</p>

<!-- Keyboard input -->
<p>Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy.</p>

<!-- Sample output -->
<p>The program outputs: <samp>Hello, World!</samp></p>

<!-- Variable -->
<p>The variable <var>x</var> represents the input value.</p>
```

---

### `<abbr>`

**Purpose:** Abbreviation or acronym with expansion.

```html
<p>
    <abbr title="HyperText Markup Language">HTML</abbr> is the standard
    markup language for creating web pages.
</p>

<p>
    The <abbr title="World Health Organization">WHO</abbr> issued new guidelines.
</p>
```

---

### `<time>`

**Purpose:** Machine-readable date/time.

```html
<!-- Date -->
<time datetime="2024-01-15">January 15, 2024</time>

<!-- Date and time -->
<time datetime="2024-01-15T14:30:00">Jan 15 at 2:30 PM</time>

<!-- Duration -->
<time datetime="PT2H30M">2 hours 30 minutes</time>

<!-- In context -->
<article>
    <h2>Breaking News</h2>
    <p>Published <time datetime="2024-01-15T09:00:00Z">2 hours ago</time></p>
</article>
```

---

### `<span>`

**Purpose:** Generic inline container for styling.

```html
<p>
    The total price is <span class="price">$99.99</span>.
</p>

<p>
    Status: <span class="status status-active">Active</span>
</p>
```

---

### `<q>` (Inline Quote)

**Purpose:** Short inline quotation.

```html
<p>
    As Einstein said, <q cite="https://source.com">Imagination is more important
    than knowledge.</q>
</p>
```

---

### `<cite>`

**Purpose:** Reference to a creative work.

```html
<p>
    My favorite book is <cite>The Great Gatsby</cite> by F. Scott Fitzgerald.
</p>

<blockquote>
    <p>To be or not to be, that is the question.</p>
    <footer>— <cite>Hamlet</cite>, William Shakespeare</footer>
</blockquote>
```

---

### `<dfn>`

**Purpose:** Term being defined.

```html
<p>
    <dfn id="html">HTML</dfn> (HyperText Markup Language) is the standard
    markup language for documents designed to be displayed in a web browser.
</p>

<!-- Link back to definition -->
<p>Learn more about <a href="#html">HTML</a> in our guide.</p>
```

---

### `<data>`

**Purpose:** Machine-readable value.

```html
<ul>
    <li><data value="398">Mini Ketchup</data></li>
    <li><data value="399">Jumbo Ketchup</data></li>
    <li><data value="400">Mega Ketchup</data></li>
</ul>
```

---

### `<wbr>`

**Purpose:** Word break opportunity.

```html
<p>
    https://www.example.com/very<wbr>/long<wbr>/url<wbr>/path<wbr>/here
</p>

<p>
    Supercalifragilistic<wbr>expialidocious
</p>
```

---

## Media Tags

### `<img>`

**Purpose:** Embed images.

```html
<!-- Basic image -->
<img src="photo.jpg" alt="Description of the image">

<!-- Responsive image -->
<img
    src="image-800.jpg"
    srcset="image-400.jpg 400w,
            image-800.jpg 800w,
            image-1200.jpg 1200w"
    sizes="(max-width: 600px) 100vw,
           (max-width: 1200px) 50vw,
           400px"
    alt="Responsive image"
    loading="lazy"
    decoding="async"
    width="800"
    height="600"
>
```

| Attribute | Description |
|-----------|-------------|
| `src` | Image source URL |
| `alt` | Alternative text (required for accessibility) |
| `srcset` | Multiple source options for responsive images |
| `sizes` | Image size hints for browser |
| `loading` | `lazy` or `eager` |
| `decoding` | `async`, `sync`, or `auto` |
| `width/height` | Dimensions (prevents layout shift) |

---

### `<picture>`

**Purpose:** Multiple image sources for art direction.

```html
<picture>
    <!-- WebP for modern browsers -->
    <source type="image/webp" srcset="image.webp">
    <!-- AVIF for cutting-edge browsers -->
    <source type="image/avif" srcset="image.avif">
    <!-- Different crops for different screens -->
    <source media="(min-width: 1024px)" srcset="desktop.jpg">
    <source media="(min-width: 768px)" srcset="tablet.jpg">
    <!-- Fallback -->
    <img src="mobile.jpg" alt="Description">
</picture>
```

---

### `<video>`

**Purpose:** Embed video content.

```html
<video
    src="video.mp4"
    width="640"
    height="360"
    controls
    poster="thumbnail.jpg"
    preload="metadata"
>
    <p>Your browser doesn't support video. <a href="video.mp4">Download</a></p>
</video>

<!-- Multiple sources -->
<video controls width="640">
    <source src="video.webm" type="video/webm">
    <source src="video.mp4" type="video/mp4">
    <track kind="subtitles" src="captions.vtt" srclang="en" label="English">
    <track kind="subtitles" src="captions-es.vtt" srclang="es" label="Spanish">
</video>
```

| Attribute | Description |
|-----------|-------------|
| `controls` | Show playback controls |
| `autoplay` | Auto-play (requires `muted`) |
| `muted` | Mute audio |
| `loop` | Loop video |
| `poster` | Thumbnail image |
| `preload` | `none`, `metadata`, `auto` |
| `playsinline` | Play inline on mobile |

---

### `<audio>`

**Purpose:** Embed audio content.

```html
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    <p>Your browser doesn't support audio.</p>
</audio>

<!-- Background music (not recommended) -->
<audio src="music.mp3" autoplay loop muted></audio>
```

---

### `<track>`

**Purpose:** Text tracks for `<video>` and `<audio>`.

```html
<video controls>
    <source src="movie.mp4" type="video/mp4">
    <track kind="subtitles" src="subtitles_en.vtt" srclang="en" label="English" default>
    <track kind="subtitles" src="subtitles_es.vtt" srclang="es" label="Spanish">
    <track kind="captions" src="captions.vtt" srclang="en" label="English CC">
    <track kind="descriptions" src="descriptions.vtt" srclang="en">
</video>
```

| Kind | Purpose |
|------|---------|
| `subtitles` | Translation of dialogue |
| `captions` | Transcription including sounds |
| `descriptions` | Audio descriptions for blind users |
| `chapters` | Chapter titles |
| `metadata` | Machine-readable data |

---

### `<iframe>`

**Purpose:** Embed external content.

```html
<!-- YouTube video -->
<iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/VIDEO_ID"
    title="Video title"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
    allowfullscreen
    loading="lazy"
></iframe>

<!-- Google Maps -->
<iframe
    src="https://www.google.com/maps/embed?pb=..."
    width="600"
    height="450"
    style="border:0;"
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
></iframe>

<!-- Sandboxed iframe -->
<iframe
    src="untrusted-content.html"
    sandbox="allow-scripts allow-same-origin"
></iframe>
```

---

### `<svg>`

**Purpose:** Scalable Vector Graphics.

```html
<!-- Inline SVG -->
<svg width="100" height="100" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" fill="blue"/>
</svg>

<!-- SVG as image -->
<img src="icon.svg" alt="Icon">

<!-- SVG with accessibility -->
<svg role="img" aria-labelledby="title-id">
    <title id="title-id">Accessible SVG title</title>
    <circle cx="50" cy="50" r="40"/>
</svg>
```

---

### `<canvas>`

**Purpose:** Draw graphics via JavaScript.

```html
<canvas id="myCanvas" width="400" height="300">
    Your browser doesn't support canvas.
</canvas>

<script>
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'blue';
    ctx.fillRect(10, 10, 100, 100);
</script>
```

---

### `<map>` and `<area>`

**Purpose:** Image maps with clickable areas.

```html
<img src="workplace.jpg" alt="Workplace" usemap="#workmap">

<map name="workmap">
    <area
        shape="rect"
        coords="34,44,270,350"
        alt="Computer"
        href="computer.html"
    >
    <area
        shape="circle"
        coords="337,300,44"
        alt="Coffee"
        href="coffee.html"
    >
    <area
        shape="poly"
        coords="140,121,181,116,204,160,204,222,191,280,140,280"
        alt="Phone"
        href="phone.html"
    >
</map>
```

---

## Form Tags

### `<form>`

**Purpose:** Container for form controls.

```html
<form
    action="/api/submit"
    method="POST"
    enctype="multipart/form-data"
    autocomplete="on"
    novalidate
>
    <!-- Form controls -->
</form>
```

| Attribute | Description |
|-----------|-------------|
| `action` | URL to submit to |
| `method` | `GET` or `POST` |
| `enctype` | Encoding type for POST |
| `autocomplete` | `on` or `off` |
| `novalidate` | Disable browser validation |
| `target` | Where to display response |

---

### `<input>`

**Purpose:** Various form input controls.

```html
<!-- Text inputs -->
<input type="text" name="username" placeholder="Username" required>
<input type="password" name="password" minlength="8">
<input type="email" name="email" multiple>
<input type="tel" name="phone" pattern="[0-9]{10}">
<input type="url" name="website">
<input type="search" name="q">

<!-- Number inputs -->
<input type="number" name="quantity" min="1" max="100" step="1">
<input type="range" name="volume" min="0" max="100" value="50">

<!-- Date/Time inputs -->
<input type="date" name="birthdate" min="1900-01-01" max="2024-12-31">
<input type="time" name="time">
<input type="datetime-local" name="meeting">
<input type="month" name="month">
<input type="week" name="week">

<!-- Selection inputs -->
<input type="checkbox" name="agree" value="yes" checked>
<input type="radio" name="gender" value="male">
<input type="radio" name="gender" value="female">

<!-- File input -->
<input type="file" name="document" accept=".pdf,.doc" multiple>

<!-- Special inputs -->
<input type="color" name="color" value="#ff0000">
<input type="hidden" name="token" value="abc123">

<!-- Buttons -->
<input type="submit" value="Submit">
<input type="reset" value="Reset">
<input type="button" value="Click Me" onclick="doSomething()">
<input type="image" src="submit.png" alt="Submit">
```

---

### `<textarea>`

**Purpose:** Multi-line text input.

```html
<textarea
    name="message"
    rows="5"
    cols="50"
    maxlength="500"
    placeholder="Enter your message..."
    required
></textarea>
```

---

### `<select>`, `<option>`, `<optgroup>`

**Purpose:** Dropdown selection.

```html
<select name="country" required>
    <option value="">Select a country</option>
    <optgroup label="North America">
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="mx">Mexico</option>
    </optgroup>
    <optgroup label="Europe">
        <option value="uk" selected>United Kingdom</option>
        <option value="de">Germany</option>
        <option value="fr">France</option>
    </optgroup>
</select>

<!-- Multiple selection -->
<select name="skills" multiple size="5">
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="js">JavaScript</option>
</select>
```

---

### `<datalist>`

**Purpose:** Autocomplete suggestions for input.

```html
<input type="text" name="browser" list="browsers">
<datalist id="browsers">
    <option value="Chrome">
    <option value="Firefox">
    <option value="Safari">
    <option value="Edge">
    <option value="Opera">
</datalist>
```

---

### `<label>`

**Purpose:** Label for form controls.

```html
<!-- Explicit association -->
<label for="email">Email:</label>
<input type="email" id="email" name="email">

<!-- Implicit association (wrapping) -->
<label>
    <input type="checkbox" name="newsletter"> Subscribe to newsletter
</label>
```

---

### `<fieldset>` and `<legend>`

**Purpose:** Group related form controls.

```html
<fieldset>
    <legend>Personal Information</legend>
    <label>Name: <input type="text" name="name"></label>
    <label>Email: <input type="email" name="email"></label>
</fieldset>

<fieldset>
    <legend>Payment Method</legend>
    <label><input type="radio" name="payment" value="card"> Credit Card</label>
    <label><input type="radio" name="payment" value="paypal"> PayPal</label>
</fieldset>

<fieldset disabled>
    <legend>Premium Features (Upgrade Required)</legend>
    <label><input type="checkbox" name="feature1"> Feature 1</label>
</fieldset>
```

---

### `<button>`

**Purpose:** Clickable button.

```html
<button type="submit">Submit Form</button>
<button type="reset">Reset Form</button>
<button type="button" onclick="doSomething()">Click Me</button>

<!-- Button with icon -->
<button type="submit">
    <svg>...</svg>
    Save Changes
</button>

<!-- Disabled button -->
<button type="submit" disabled>Processing...</button>
```

---

### `<output>`

**Purpose:** Result of a calculation.

```html
<form oninput="result.value = parseInt(a.value) + parseInt(b.value)">
    <input type="number" id="a" value="0"> +
    <input type="number" id="b" value="0"> =
    <output name="result" for="a b">0</output>
</form>
```

---

### `<progress>` and `<meter>`

```html
<!-- Progress bar -->
<progress value="70" max="100">70%</progress>
<label>Download progress: <progress value="32" max="100"></progress></label>

<!-- Meter (gauge) -->
<meter value="0.7" min="0" max="1" low="0.3" high="0.7" optimum="0.8">70%</meter>
<label>Disk usage: <meter value="6" min="0" max="10" low="3" high="8">6 GB</meter></label>
```

---

## Table Tags

### Complete Table Structure

```html
<table>
    <caption>Monthly Sales Report</caption>
    <colgroup>
        <col style="width: 30%">
        <col style="width: 35%">
        <col style="width: 35%">
    </colgroup>
    <thead>
        <tr>
            <th scope="col">Product</th>
            <th scope="col">Q1</th>
            <th scope="col">Q2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Widget A</th>
            <td>$10,000</td>
            <td>$12,000</td>
        </tr>
        <tr>
            <th scope="row">Widget B</th>
            <td>$8,000</td>
            <td>$9,500</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <th scope="row">Total</th>
            <td>$18,000</td>
            <td>$21,500</td>
        </tr>
    </tfoot>
</table>
```

### Table with Spanning

```html
<table>
    <tr>
        <th colspan="2">Name</th>
        <th>Age</th>
    </tr>
    <tr>
        <td>First</td>
        <td>Last</td>
        <td rowspan="2">30</td>
    </tr>
    <tr>
        <td>John</td>
        <td>Doe</td>
    </tr>
</table>
```

---

## List Tags

### Unordered List (`<ul>`)

```html
<ul>
    <li>Item 1</li>
    <li>Item 2
        <ul>
            <li>Nested item 2.1</li>
            <li>Nested item 2.2</li>
        </ul>
    </li>
    <li>Item 3</li>
</ul>
```

### Ordered List (`<ol>`)

```html
<ol type="1" start="1" reversed>
    <li>First item</li>
    <li>Second item</li>
    <li value="10">Tenth item (value override)</li>
</ol>

<!-- Different types -->
<ol type="A">A, B, C...</ol>
<ol type="a">a, b, c...</ol>
<ol type="I">I, II, III...</ol>
<ol type="i">i, ii, iii...</ol>
```

### Description List (`<dl>`)

```html
<dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language - structure of web pages</dd>

    <dt>CSS</dt>
    <dd>Cascading Style Sheets - styling of web pages</dd>

    <dt>JavaScript</dt>
    <dd>Programming language for web interactivity</dd>
</dl>
```

---

## Scripting Tags

### `<script>`

```html
<!-- External script -->
<script src="app.js"></script>

<!-- Inline script -->
<script>
    console.log('Hello, World!');
</script>

<!-- Module script -->
<script type="module" src="module.js"></script>

<!-- Deferred loading -->
<script src="app.js" defer></script>

<!-- Async loading -->
<script src="analytics.js" async></script>

<!-- With integrity check -->
<script
    src="https://cdn.example.com/lib.js"
    integrity="sha384-..."
    crossorigin="anonymous"
></script>
```

| Attribute | Description |
|-----------|-------------|
| `src` | External script URL |
| `type` | Script type (`module`, `text/javascript`) |
| `defer` | Execute after HTML parsing |
| `async` | Execute as soon as available |
| `integrity` | Subresource integrity hash |
| `crossorigin` | CORS settings |

---

### `<noscript>`

```html
<noscript>
    <p>JavaScript is required to use this application.</p>
    <style>
        .js-only { display: none; }
    </style>
</noscript>
```

---

## Interactive Tags

### `<details>` and `<summary>`

```html
<details>
    <summary>Click to expand</summary>
    <p>Hidden content that appears when expanded.</p>
</details>

<details open>
    <summary>FAQ: What is HTML?</summary>
    <p>HTML is the standard markup language for web pages.</p>
</details>
```

---

### `<dialog>`

```html
<dialog id="myDialog">
    <h2>Dialog Title</h2>
    <p>Dialog content here.</p>
    <form method="dialog">
        <button value="cancel">Cancel</button>
        <button value="confirm">Confirm</button>
    </form>
</dialog>

<button onclick="document.getElementById('myDialog').showModal()">
    Open Dialog
</button>
```

---

## Deprecated Tags

**Do NOT use these tags:**

| Deprecated | Use Instead |
|------------|-------------|
| `<center>` | CSS `text-align: center` |
| `<font>` | CSS `font-family`, `color` |
| `<marquee>` | CSS animations |
| `<blink>` | CSS animations |
| `<frame>`, `<frameset>` | `<iframe>` |
| `<big>` | CSS `font-size` |
| `<strike>`, `<s>` | `<del>` or CSS |
| `<tt>` | `<code>` |
| `<acronym>` | `<abbr>` |

---

## Tag Categories Summary

### By Display Type

| Block-Level | Inline | Inline-Block |
|-------------|--------|--------------|
| `div`, `p`, `h1-h6` | `span`, `a`, `strong` | `img`, `button`, `input` |
| `section`, `article` | `em`, `code`, `small` | `select`, `textarea` |
| `header`, `footer` | `br`, `abbr`, `time` | `video`, `audio` |
| `ul`, `ol`, `li` | `mark`, `sub`, `sup` | `canvas` |
| `table`, `form` | `q`, `cite`, `dfn` | |

### By Purpose

| Category | Tags |
|----------|------|
| **Structure** | `html`, `head`, `body`, `main`, `header`, `footer`, `nav`, `aside` |
| **Content** | `article`, `section`, `div`, `p`, `h1-h6`, `blockquote`, `pre` |
| **Text** | `span`, `a`, `strong`, `em`, `code`, `mark`, `time`, `abbr` |
| **Lists** | `ul`, `ol`, `li`, `dl`, `dt`, `dd` |
| **Tables** | `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`, `caption` |
| **Forms** | `form`, `input`, `textarea`, `select`, `button`, `label`, `fieldset` |
| **Media** | `img`, `video`, `audio`, `picture`, `figure`, `svg`, `canvas` |
| **Meta** | `meta`, `link`, `title`, `style`, `script`, `base` |

---

*This reference covers all HTML tags with their usage, attributes, and examples. Use semantic elements whenever possible for better accessibility and SEO.*
