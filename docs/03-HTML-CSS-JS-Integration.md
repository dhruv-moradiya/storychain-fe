# HTML, CSS & JavaScript Integration Guide

> A comprehensive guide covering all ways to integrate CSS and JavaScript with HTML, including loading strategies, performance optimization, and best practices.

---

## Table of Contents

1. [CSS Integration Methods](#css-integration-methods)
2. [JavaScript Integration Methods](#javascript-integration-methods)
3. [Loading Strategies & Attributes](#loading-strategies--attributes)
4. [Execution Order & Timing](#execution-order--timing)
5. [Performance Optimization](#performance-optimization)
6. [Module Systems](#module-systems)
7. [Real-World Combinations](#real-world-combinations)
8. [Best Practices](#best-practices)

---

## CSS Integration Methods

### 1. External Stylesheet (Recommended)

**How it works:** CSS is written in a separate `.css` file and linked to HTML using the `<link>` tag.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>External CSS Example</title>

    <!-- Basic external stylesheet -->
    <link rel="stylesheet" href="styles.css">

    <!-- Multiple stylesheets -->
    <link rel="stylesheet" href="reset.css">
    <link rel="stylesheet" href="layout.css">
    <link rel="stylesheet" href="components.css">

    <!-- External CDN stylesheet -->
    <link
        rel="stylesheet"
        href="https://cdn.example.com/library.min.css"
        integrity="sha384-..."
        crossorigin="anonymous"
    >

    <!-- Media-specific stylesheets -->
    <link rel="stylesheet" href="main.css" media="screen">
    <link rel="stylesheet" href="print.css" media="print">
    <link rel="stylesheet" href="mobile.css" media="(max-width: 768px)">
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>
```

```css
/* styles.css */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
}

h1 {
    color: #333;
}
```

**Advantages:**
- ✅ Separation of concerns
- ✅ Cacheable by browser
- ✅ Reusable across multiple pages
- ✅ Easier maintenance
- ✅ Parallel downloading

**Disadvantages:**
- ❌ Additional HTTP request
- ❌ Render-blocking by default

---

### 2. Internal/Embedded Stylesheet

**How it works:** CSS is written inside a `<style>` tag within the HTML document's `<head>`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Internal CSS Example</title>

    <style>
        /* Internal CSS */
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .button {
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Internal CSS Demo</h1>
        <button class="button">Click Me</button>
    </div>
</body>
</html>
```

**Advantages:**
- ✅ No additional HTTP request
- ✅ Good for page-specific styles
- ✅ Useful for critical CSS

**Disadvantages:**
- ❌ Not cacheable separately
- ❌ Increases HTML file size
- ❌ Not reusable across pages
- ❌ Still render-blocking

---

### 3. Inline Styles

**How it works:** CSS is applied directly to elements using the `style` attribute.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Inline CSS Example</title>
</head>
<body>
    <!-- Inline styles on elements -->
    <h1 style="color: #333; font-size: 2.5rem; margin-bottom: 20px;">
        Styled Heading
    </h1>

    <p style="line-height: 1.6; color: #666;">
        This paragraph has inline styles.
    </p>

    <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 40px;
        border-radius: 8px;
    ">
        <span style="color: white; font-weight: bold;">Styled Container</span>
    </div>

    <!-- Dynamic inline styles (often used with JavaScript) -->
    <div id="dynamic-element" style="width: 100px; height: 100px; background: red;">
    </div>

    <script>
        // Changing inline styles with JavaScript
        const element = document.getElementById('dynamic-element');
        element.style.backgroundColor = 'blue';
        element.style.transform = 'rotate(45deg)';
        element.style.transition = 'all 0.3s ease';
    </script>
</body>
</html>
```

**Advantages:**
- ✅ Highest specificity
- ✅ Useful for dynamic styles
- ✅ No HTTP request

**Disadvantages:**
- ❌ Highest specificity (hard to override)
- ❌ No pseudo-classes/elements (`:hover`, `::before`)
- ❌ No media queries
- ❌ Not reusable
- ❌ Hard to maintain
- ❌ Mixes content with presentation

---

### 4. CSS @import

**How it works:** Import CSS files from within other CSS files or style tags.

```html
<!-- In HTML -->
<style>
    @import url('reset.css');
    @import url('https://fonts.googleapis.com/css2?family=Roboto');
    @import url('theme.css');

    body {
        font-family: 'Roboto', sans-serif;
    }
</style>
```

```css
/* main.css */
@import url('variables.css');
@import url('mixins.css');
@import url('components/buttons.css');
@import url('components/cards.css');

/* Media-specific imports */
@import url('mobile.css') screen and (max-width: 768px);
@import url('print.css') print;
```

**Advantages:**
- ✅ Organize CSS into modules
- ✅ Conditional loading with media queries

**Disadvantages:**
- ❌ Blocks parallel downloading
- ❌ Creates waterfall loading (slow)
- ❌ Not recommended for production

---

### CSS Integration Comparison

| Method | Specificity | Cacheable | Reusable | HTTP Request | Best For |
|--------|-------------|-----------|----------|--------------|----------|
| External | Normal | Yes | Yes | Yes | Production |
| Internal | Normal | No | No | No | Critical CSS |
| Inline | Highest | No | No | No | Dynamic styles |
| @import | Normal | Partial | Yes | Multiple | Dev only |

---

## JavaScript Integration Methods

### 1. External Script (Recommended)

**How it works:** JavaScript is written in separate `.js` files and loaded using `<script>` tags.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>External JS Example</title>

    <!-- Script in head (blocks rendering) -->
    <script src="critical.js"></script>

    <!-- Deferred script (recommended for most cases) -->
    <script src="app.js" defer></script>

    <!-- Async script (for independent scripts) -->
    <script src="analytics.js" async></script>
</head>
<body>
    <h1>Hello World</h1>
    <button id="myButton">Click Me</button>

    <!-- Scripts at end of body (traditional approach) -->
    <script src="vendor/jquery.min.js"></script>
    <script src="main.js"></script>
</body>
</html>
```

```javascript
// app.js
document.getElementById('myButton').addEventListener('click', function() {
    alert('Button clicked!');
});
```

**Advantages:**
- ✅ Separation of concerns
- ✅ Cacheable by browser
- ✅ Reusable across pages
- ✅ Easier debugging
- ✅ Supports defer/async

**Disadvantages:**
- ❌ Additional HTTP request
- ❌ Blocks rendering by default (without defer/async)

---

### 2. Internal/Embedded Script

**How it works:** JavaScript is written inside `<script>` tags within the HTML document.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Internal JS Example</title>

    <!-- Script in head -->
    <script>
        // This runs before body is parsed
        console.log('Head script loaded');

        // Won't work - element doesn't exist yet!
        // document.getElementById('myButton'); // null
    </script>
</head>
<body>
    <h1>Hello World</h1>
    <button id="myButton">Click Me</button>

    <!-- Script after elements -->
    <script>
        // This works - element exists
        const button = document.getElementById('myButton');

        button.addEventListener('click', function() {
            alert('Clicked!');
        });

        // Complex inline logic
        const data = [1, 2, 3, 4, 5];
        const doubled = data.map(x => x * 2);
        console.log(doubled);
    </script>

    <!-- Multiple script blocks -->
    <script>
        // Another script block
        function greet(name) {
            return `Hello, ${name}!`;
        }
    </script>
</body>
</html>
```

**Advantages:**
- ✅ No additional HTTP request
- ✅ Good for small, page-specific scripts
- ✅ Access to server-side variables

**Disadvantages:**
- ❌ Not cacheable
- ❌ Increases HTML size
- ❌ Not reusable
- ❌ Harder to debug

---

### 3. Inline Event Handlers (Avoid)

**How it works:** JavaScript is written directly in HTML attributes.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Inline Handlers Example</title>
    <script>
        function handleClick() {
            alert('Clicked!');
        }

        function validateForm() {
            const name = document.forms[0].name.value;
            if (!name) {
                alert('Please enter name');
                return false;
            }
            return true;
        }
    </script>
</head>
<body>
    <!-- Inline event handlers (NOT recommended) -->
    <button onclick="alert('Hello!')">Click 1</button>
    <button onclick="handleClick()">Click 2</button>
    <button ondblclick="console.log('Double clicked')">Double Click</button>

    <!-- Multiple statements -->
    <button onclick="console.log('First'); console.log('Second'); alert('Done');">
        Multiple Actions
    </button>

    <!-- Inline with 'this' -->
    <button onclick="this.style.backgroundColor = 'red'">Change Color</button>

    <!-- Form handlers -->
    <form onsubmit="return validateForm()">
        <input type="text" name="name" onblur="console.log('Lost focus')">
        <input type="text" onfocus="this.style.background = 'yellow'">
        <button type="submit">Submit</button>
    </form>

    <!-- BETTER APPROACH: Separate JS -->
    <button id="goodButton">Good Button</button>
    <script>
        document.getElementById('goodButton').addEventListener('click', function() {
            alert('This is better!');
        });
    </script>
</body>
</html>
```

**Advantages:**
- ✅ Quick for prototyping
- ✅ Obvious what happens on interaction

**Disadvantages:**
- ❌ Mixes HTML and JavaScript
- ❌ Hard to maintain
- ❌ Security risks (CSP violations)
- ❌ Limited functionality
- ❌ Can't use addEventListener features

---

### 4. JavaScript in URL (Avoid)

```html
<!-- DON'T use this in production -->
<a href="javascript:void(0)" onclick="doSomething()">Click</a>
<a href="javascript:alert('Hello')">Alert</a>

<!-- BETTER alternatives -->
<a href="#" onclick="doSomething(); return false;">Click</a>
<button type="button" onclick="doSomething()">Click</button>

<!-- BEST approach -->
<a href="/fallback-page" id="myLink">Click</a>
<script>
    document.getElementById('myLink').addEventListener('click', function(e) {
        e.preventDefault();
        doSomething();
    });
</script>
```

---

### 5. Dynamic Script Loading

**How it works:** Scripts are loaded programmatically at runtime.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Dynamic Script Loading</title>
</head>
<body>
    <button id="loadScript">Load Script</button>

    <script>
        // Load script on demand
        function loadScript(src, callback) {
            const script = document.createElement('script');
            script.src = src;
            script.onload = callback;
            script.onerror = () => console.error(`Failed to load: ${src}`);
            document.head.appendChild(script);
        }

        document.getElementById('loadScript').addEventListener('click', function() {
            loadScript('heavy-library.js', function() {
                console.log('Library loaded!');
                // Use the library here
            });
        });

        // Promise-based loading
        function loadScriptAsync(src) {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }

        // Usage
        async function loadDependencies() {
            await loadScriptAsync('lib1.js');
            await loadScriptAsync('lib2.js');
            console.log('All loaded!');
        }

        // Parallel loading
        Promise.all([
            loadScriptAsync('lib1.js'),
            loadScriptAsync('lib2.js'),
            loadScriptAsync('lib3.js')
        ]).then(() => {
            console.log('All scripts loaded in parallel!');
        });
    </script>
</body>
</html>
```

---

## Loading Strategies & Attributes

### Script Loading Attributes

#### Default (No Attributes)

```html
<script src="script.js"></script>
```

**Behavior:**
1. HTML parsing pauses
2. Script downloads
3. Script executes
4. HTML parsing resumes

```
HTML Parsing: ===|        |===
Script:          [download][execute]
```

---

#### `defer` Attribute

```html
<script src="script.js" defer></script>
```

**Behavior:**
1. HTML parsing continues
2. Script downloads in parallel
3. Script executes after HTML is fully parsed
4. Multiple defer scripts execute in order

```
HTML Parsing: ===================|
Script:       [download]         [execute]
```

```html
<!-- Multiple defer scripts -->
<script src="first.js" defer></script>   <!-- Executes 1st -->
<script src="second.js" defer></script>  <!-- Executes 2nd -->
<script src="third.js" defer></script>   <!-- Executes 3rd -->
```

**Best for:**
- ✅ Scripts that depend on DOM
- ✅ Scripts that depend on each other
- ✅ Main application code

---

#### `async` Attribute

```html
<script src="script.js" async></script>
```

**Behavior:**
1. HTML parsing continues
2. Script downloads in parallel
3. Script executes immediately when downloaded
4. Order not guaranteed

```
HTML Parsing: ======|      |======
Script:       [download][execute]
```

```html
<!-- Async scripts - order NOT guaranteed -->
<script src="analytics.js" async></script>
<script src="ads.js" async></script>
```

**Best for:**
- ✅ Independent scripts
- ✅ Analytics
- ✅ Ads
- ✅ Third-party scripts

---

#### `type="module"`

```html
<script type="module" src="app.js"></script>
```

**Behavior:**
- Deferred by default
- Strict mode enabled
- Top-level `await` supported
- CORS required for cross-origin

```html
<!-- Module script -->
<script type="module">
    import { greet } from './utils.js';
    console.log(greet('World'));
</script>

<!-- Fallback for non-module browsers -->
<script nomodule src="legacy-bundle.js"></script>
```

---

### Visual Comparison

```
No Attribute:
HTML:    ====[BLOCKED]=====[BLOCKED]=====
JS 1:        [DL][RUN]
JS 2:                      [DL][RUN]

defer:
HTML:    =================================|
JS 1:    [--DOWNLOAD--]                   [RUN]
JS 2:         [--DOWNLOAD--]                  [RUN]

async:
HTML:    ========[PAUSE]====[PAUSE]======
JS 1:    [--DL--][RUN]
JS 2:         [----DL----][RUN]

type="module":
HTML:    =================================|
Module:  [--DOWNLOAD + DEPS--]            [RUN]
```

---

### Link Preloading Strategies

```html
<head>
    <!-- Preconnect: Establish early connection -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://api.example.com" crossorigin>

    <!-- DNS Prefetch: Resolve DNS early -->
    <link rel="dns-prefetch" href="https://analytics.example.com">

    <!-- Preload: Load critical resources early -->
    <link rel="preload" href="critical.css" as="style">
    <link rel="preload" href="hero-image.jpg" as="image">
    <link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="app.js" as="script">

    <!-- Prefetch: Load resources for next navigation -->
    <link rel="prefetch" href="next-page.html">
    <link rel="prefetch" href="next-page-data.json">

    <!-- Modulepreload: Preload ES modules -->
    <link rel="modulepreload" href="utils.js">

    <!-- Now load normally -->
    <link rel="stylesheet" href="critical.css">
    <script src="app.js" defer></script>
</head>
```

| Attribute | Purpose | Priority | Use Case |
|-----------|---------|----------|----------|
| `preconnect` | Early connection | High | Domains you'll definitely use |
| `dns-prefetch` | DNS resolution | Low | Third-party domains |
| `preload` | Load immediately | High | Critical resources |
| `prefetch` | Load for future | Low | Next page resources |
| `modulepreload` | Preload ES modules | Medium | Module dependencies |

---

## Execution Order & Timing

### Document Loading Events

```html
<!DOCTYPE html>
<html>
<head>
    <script>
        // 1. Runs immediately (DOM not ready)
        console.log('1. Head script');

        // DOM Content Loaded - DOM is ready
        document.addEventListener('DOMContentLoaded', function() {
            console.log('4. DOMContentLoaded - DOM ready');
        });

        // Window Load - Everything loaded (images, styles, etc.)
        window.addEventListener('load', function() {
            console.log('5. Window load - All resources loaded');
        });

        // Before Unload
        window.addEventListener('beforeunload', function(e) {
            // Show "Leave site?" dialog
            e.preventDefault();
            e.returnValue = '';
        });
    </script>
</head>
<body>
    <h1>Events Demo</h1>
    <img src="large-image.jpg">

    <script>
        // 2. Runs when parser reaches this point
        console.log('2. Body script');
    </script>

    <script defer src="deferred.js"></script> <!-- 3. After DOM parsed -->
</body>
</html>
```

**Execution Order:**
1. Head script (inline)
2. Body script (inline)
3. Deferred scripts (in order)
4. DOMContentLoaded event
5. Window load event (after images, etc.)

---

### Script Execution Timeline

```javascript
// Timeline visualization
console.log('Script Start');

// Synchronous
console.log('Synchronous 1');
console.log('Synchronous 2');

// Microtasks (Promises)
Promise.resolve().then(() => console.log('Microtask 1'));
Promise.resolve().then(() => console.log('Microtask 2'));

// Macrotasks
setTimeout(() => console.log('Timeout 1'), 0);
setTimeout(() => console.log('Timeout 2'), 0);

console.log('Script End');

/*
Output:
Script Start
Synchronous 1
Synchronous 2
Script End
Microtask 1
Microtask 2
Timeout 1
Timeout 2
*/
```

---

## Performance Optimization

### Critical CSS Pattern

```html
<!DOCTYPE html>
<html>
<head>
    <!-- Critical CSS inline (above-the-fold styles) -->
    <style>
        /* Only styles needed for initial render */
        body { margin: 0; font-family: sans-serif; }
        header { background: #333; color: white; padding: 20px; }
        .hero { height: 100vh; display: flex; align-items: center; }
    </style>

    <!-- Non-critical CSS loaded asynchronously -->
    <link rel="preload" href="main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="main.css"></noscript>
</head>
<body>
    <header>Site Header</header>
    <section class="hero">Above the fold content</section>

    <!-- Rest of page -->
</body>
</html>
```

---

### Code Splitting with Dynamic Imports

```html
<!DOCTYPE html>
<html>
<head>
    <script type="module">
        // Main entry point
        import { initApp } from './app.js';
        initApp();

        // Lazy load heavy components
        document.getElementById('showChart').addEventListener('click', async () => {
            const { Chart } = await import('./chart-library.js');
            new Chart('#chart-container', data);
        });

        // Route-based code splitting
        if (window.location.pathname === '/dashboard') {
            const { Dashboard } = await import('./pages/dashboard.js');
            Dashboard.init();
        }
    </script>
</head>
<body>
    <button id="showChart">Show Chart</button>
    <div id="chart-container"></div>
</body>
</html>
```

---

### Resource Hints Complete Example

```html
<!DOCTYPE html>
<html>
<head>
    <!-- DNS Prefetch for third-party domains -->
    <link rel="dns-prefetch" href="https://fonts.googleapis.com">
    <link rel="dns-prefetch" href="https://analytics.google.com">

    <!-- Preconnect for critical third-party -->
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://api.myapp.com">

    <!-- Preload critical resources -->
    <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="/css/critical.css" as="style">
    <link rel="preload" href="/js/app.js" as="script">
    <link rel="preload" href="/img/hero.webp" as="image">

    <!-- Load critical CSS -->
    <link rel="stylesheet" href="/css/critical.css">

    <!-- Defer non-critical CSS -->
    <link rel="preload" href="/css/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">

    <!-- Prefetch next page resources -->
    <link rel="prefetch" href="/about.html">
    <link rel="prefetch" href="/js/about-page.js">
</head>
<body>
    <!-- Content -->

    <script src="/js/app.js" defer></script>
</body>
</html>
```

---

## Module Systems

### ES Modules (Browser Native)

```html
<!DOCTYPE html>
<html>
<head>
    <title>ES Modules</title>
</head>
<body>
    <script type="module">
        // Import from local file
        import { greeting } from './utils.js';
        import * as math from './math.js';
        import defaultExport from './default.js';

        // Import from URL
        import { something } from 'https://cdn.example.com/lib.js';

        // Dynamic import
        const module = await import('./dynamic.js');

        console.log(greeting('World'));
        console.log(math.add(2, 3));
    </script>

    <!-- Separate module file -->
    <script type="module" src="app.js"></script>

    <!-- Fallback for old browsers -->
    <script nomodule src="app.legacy.js"></script>
</body>
</html>
```

```javascript
// utils.js
export function greeting(name) {
    return `Hello, ${name}!`;
}

export const PI = 3.14159;

// Default export
export default class User {
    constructor(name) {
        this.name = name;
    }
}
```

---

### Import Maps

```html
<!DOCTYPE html>
<html>
<head>
    <!-- Import map for bare specifiers -->
    <script type="importmap">
    {
        "imports": {
            "lodash": "https://cdn.skypack.dev/lodash-es",
            "react": "https://cdn.skypack.dev/react",
            "react-dom": "https://cdn.skypack.dev/react-dom",
            "@utils/": "./src/utils/",
            "@components/": "./src/components/"
        }
    }
    </script>

    <script type="module">
        // Now you can use bare imports
        import _ from 'lodash';
        import React from 'react';
        import { formatDate } from '@utils/date.js';
        import { Button } from '@components/Button.js';

        console.log(_.chunk([1, 2, 3, 4], 2));
    </script>
</head>
<body></body>
</html>
```

---

## Real-World Combinations

### 1. Basic Website

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Basic Website</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">

    <!-- CSS -->
    <link rel="stylesheet" href="normalize.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Content -->
    <header>...</header>
    <main>...</main>
    <footer>...</footer>

    <!-- JavaScript at bottom -->
    <script src="vendor/jquery.min.js"></script>
    <script src="main.js"></script>
</body>
</html>
```

---

### 2. Modern SPA (React/Vue/Angular)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React App</title>

    <!-- Preconnect to API -->
    <link rel="preconnect" href="https://api.myapp.com">

    <!-- Preload critical assets -->
    <link rel="preload" href="/static/js/main.chunk.js" as="script">
    <link rel="preload" href="/static/css/main.chunk.css" as="style">

    <!-- Critical CSS inline -->
    <style>
        #root { min-height: 100vh; }
        .loading-spinner { /* ... */ }
    </style>

    <!-- Main CSS -->
    <link rel="stylesheet" href="/static/css/main.chunk.css">
</head>
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>

    <div id="root">
        <!-- Loading state -->
        <div class="loading-spinner"></div>
    </div>

    <!-- React scripts -->
    <script src="/static/js/runtime-main.js" defer></script>
    <script src="/static/js/vendors~main.chunk.js" defer></script>
    <script src="/static/js/main.chunk.js" defer></script>
</body>
</html>
```

---

### 3. E-commerce Site

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Page | Store Name</title>

    <!-- DNS Prefetch for third-party services -->
    <link rel="dns-prefetch" href="https://www.google-analytics.com">
    <link rel="dns-prefetch" href="https://connect.facebook.net">

    <!-- Preconnect to CDN and API -->
    <link rel="preconnect" href="https://cdn.store.com">
    <link rel="preconnect" href="https://api.store.com">

    <!-- Preload hero image -->
    <link rel="preload" as="image" href="product-main.jpg">

    <!-- Critical CSS -->
    <style>
        /* Above-the-fold styles */
        .product-hero { /* ... */ }
        .price { /* ... */ }
        .add-to-cart { /* ... */ }
    </style>

    <!-- Async load main styles -->
    <link rel="preload" href="main.css" as="style" onload="this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="main.css"></noscript>
</head>
<body>
    <!-- Header, Navigation -->
    <header>...</header>

    <!-- Product Content -->
    <main>
        <div class="product-hero">
            <img src="product-main.jpg" alt="Product">
        </div>
        <div class="product-info">
            <h1>Product Name</h1>
            <p class="price">$99.99</p>
            <button class="add-to-cart">Add to Cart</button>
        </div>
    </main>

    <!-- Core functionality -->
    <script src="app.js" defer></script>

    <!-- Analytics (async - independent) -->
    <script src="https://www.google-analytics.com/analytics.js" async></script>

    <!-- Chat widget (lazy loaded) -->
    <script>
        // Load chat widget after page is fully loaded
        window.addEventListener('load', function() {
            setTimeout(function() {
                const script = document.createElement('script');
                script.src = 'https://chat.service.com/widget.js';
                document.body.appendChild(script);
            }, 3000);
        });
    </script>
</body>
</html>
```

---

### 4. Blog/Content Site with AMP Alternative

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Post Title</title>

    <!-- AMP version link -->
    <link rel="amphtml" href="https://www.blog.com/amp/post-title">

    <!-- Canonical URL -->
    <link rel="canonical" href="https://www.blog.com/post-title">

    <!-- RSS Feed -->
    <link rel="alternate" type="application/rss+xml" href="/feed.xml" title="Blog RSS">

    <!-- Critical CSS -->
    <style>
        article { max-width: 800px; margin: 0 auto; }
        .content { line-height: 1.8; }
    </style>

    <!-- Load fonts async -->
    <link rel="preload" href="fonts/serif.woff2" as="font" type="font/woff2" crossorigin>

    <!-- Main stylesheet -->
    <link rel="stylesheet" href="blog.css">
</head>
<body>
    <article>
        <header>
            <h1>Blog Post Title</h1>
            <time datetime="2024-01-15">January 15, 2024</time>
        </header>
        <div class="content">
            <!-- Article content -->
        </div>
    </article>

    <!-- Comments loaded on scroll -->
    <div id="comments-placeholder">
        <button id="load-comments">Load Comments</button>
    </div>

    <script>
        // Lazy load comments
        document.getElementById('load-comments').addEventListener('click', async function() {
            const { initComments } = await import('./comments.js');
            initComments();
        });
    </script>

    <!-- Async: Social sharing, analytics -->
    <script src="analytics.js" async></script>
</body>
</html>
```

---

## Best Practices

### CSS Best Practices

```markdown
1. **Use External Stylesheets**
   - Better caching
   - Easier maintenance
   - Reusable across pages

2. **Critical CSS Inline**
   - Above-the-fold styles inline
   - Load rest asynchronously

3. **Order Matters**
   - Reset/normalize first
   - Base styles
   - Layout
   - Components
   - Utilities/overrides

4. **Avoid @import**
   - Blocks parallel downloads
   - Use bundler instead

5. **Media Queries**
   - Use for conditional loading
   - Mobile-first approach
```

### JavaScript Best Practices

```markdown
1. **Use `defer` for Most Scripts**
   - Doesn't block rendering
   - Maintains execution order
   - DOM is ready when script runs

2. **Use `async` for Independent Scripts**
   - Analytics
   - Ads
   - Third-party widgets

3. **Place Scripts Wisely**
   - Critical scripts: `<head>` with `defer`
   - Non-critical: End of `<body>` or lazy load

4. **Avoid Inline Event Handlers**
   - Security (CSP) issues
   - Hard to maintain
   - Use addEventListener

5. **Use ES Modules for Modern Apps**
   - Native browser support
   - Tree-shaking friendly
   - Deferred by default
```

### Performance Checklist

```markdown
✅ Critical CSS inlined
✅ Main CSS loaded asynchronously
✅ Scripts use defer/async appropriately
✅ Images lazy loaded
✅ Preconnect to critical origins
✅ Preload critical resources
✅ Prefetch next page resources
✅ Third-party scripts loaded asynchronously
✅ Code splitting implemented
✅ No render-blocking resources
```

---

### Quick Reference Table

| Resource Type | Loading Method | When to Use |
|---------------|----------------|-------------|
| Critical CSS | Inline `<style>` | Above-the-fold styles |
| Main CSS | `<link>` async | All other styles |
| Core JS | `<script defer>` | Main app code |
| Independent JS | `<script async>` | Analytics, ads |
| Modules | `<script type="module">` | Modern apps |
| Fonts | `preload` | Critical fonts |
| Images | `loading="lazy"` | Below-fold images |
| Next Page | `prefetch` | Predictable navigation |

---

*This guide covers all aspects of integrating CSS and JavaScript with HTML. Choose the right combination based on your project's needs and performance requirements.*
