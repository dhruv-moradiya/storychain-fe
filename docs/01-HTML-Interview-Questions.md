# HTML Interview Questions - Beginner to Advanced

> A comprehensive guide to HTML interview questions with detailed answers, examples, and real-world scenarios.

---

## Table of Contents

1. [Beginner Level Questions](#beginner-level-questions)
2. [Intermediate Level Questions](#intermediate-level-questions)
3. [Advanced Level Questions](#advanced-level-questions)
4. [Scenario-Based Questions](#scenario-based-questions)
5. [Best Practices & Tips](#best-practices--tips)

---

## Beginner Level Questions

### 1. What is HTML and what does it stand for?

**Answer:**
HTML stands for **HyperText Markup Language**. It's the standard markup language used to create and structure content on web pages.

- **HyperText**: Text that contains links to other text/documents
- **Markup**: Using tags to define elements within a document
- **Language**: A syntax with specific rules for writing code

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My First Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first HTML page.</p>
</body>
</html>
```

---

### 2. What is the difference between HTML elements and HTML tags?

**Answer:**

| Aspect | HTML Tag | HTML Element |
|--------|----------|--------------|
| Definition | The markup syntax enclosed in angle brackets | The complete structure including opening tag, content, and closing tag |
| Example | `<p>`, `</p>` | `<p>This is a paragraph</p>` |
| Components | Just the tag itself | Opening tag + Content + Closing tag |

```html
<!-- Tags -->
<p>  <!-- Opening tag -->
</p> <!-- Closing tag -->

<!-- Element -->
<p>This entire thing is an element</p>

<!-- Self-closing elements (void elements) -->
<img src="image.jpg" alt="Description">
<br>
<hr>
<input type="text">
```

---

### 3. What is the purpose of DOCTYPE in HTML?

**Answer:**
DOCTYPE (Document Type Declaration) tells the browser which version of HTML the page is written in. It must be the very first line in an HTML document.

```html
<!-- HTML5 DOCTYPE (modern, recommended) -->
<!DOCTYPE html>

<!-- HTML 4.01 Strict -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

<!-- XHTML 1.0 Strict -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

**Why it matters:**
- Without DOCTYPE, browsers enter "quirks mode" (inconsistent rendering)
- With DOCTYPE, browsers use "standards mode" (consistent rendering)
- HTML5 DOCTYPE is case-insensitive and backward compatible

---

### 4. What are semantic HTML elements? Why are they important?

**Answer:**
Semantic elements clearly describe their meaning to both the browser and the developer.

**Non-Semantic vs Semantic:**

```html
<!-- Non-Semantic (bad) -->
<div class="header">
    <div class="navigation">
        <div class="nav-item">Home</div>
    </div>
</div>
<div class="main-content">
    <div class="article">
        <div class="article-header">Title</div>
    </div>
</div>
<div class="footer">Copyright 2024</div>

<!-- Semantic (good) -->
<header>
    <nav>
        <a href="/">Home</a>
    </nav>
</header>
<main>
    <article>
        <h1>Title</h1>
    </article>
</main>
<footer>Copyright 2024</footer>
```

**Benefits of Semantic HTML:**
1. **Accessibility**: Screen readers understand the page structure
2. **SEO**: Search engines better understand content hierarchy
3. **Maintainability**: Code is easier to read and maintain
4. **Consistency**: Standard meaning across all browsers

---

### 5. What is the difference between `<div>` and `<span>`?

**Answer:**

| Feature | `<div>` | `<span>` |
|---------|---------|----------|
| Display Type | Block-level | Inline |
| Default Behavior | Takes full width, starts on new line | Only takes content width, stays in line |
| Use Case | Grouping block content | Styling inline text |

```html
<!-- div - Block level -->
<div style="background: lightblue;">
    This div takes full width
</div>
<div style="background: lightgreen;">
    This starts on a new line
</div>

<!-- span - Inline -->
<p>
    This is a paragraph with a
    <span style="color: red;">red colored</span>
    word in the middle.
</p>

<!-- Practical Example -->
<div class="card">
    <h2>Product Name</h2>
    <p>Price: <span class="price">$99.99</span></p>
</div>
```

---

### 6. What are HTML attributes? Give examples.

**Answer:**
Attributes provide additional information about HTML elements. They are always specified in the opening tag.

**Syntax:** `attribute="value"`

```html
<!-- Common Global Attributes -->
<div id="unique-id">ID must be unique</div>
<div class="reusable-class">Classes can be reused</div>
<div style="color: blue;">Inline styles</div>
<div title="Tooltip text">Hover for tooltip</div>
<div data-custom="value">Custom data attribute</div>
<div hidden>This content is hidden</div>

<!-- Element-Specific Attributes -->
<a href="https://example.com" target="_blank" rel="noopener">Link</a>
<img src="image.jpg" alt="Description" width="300" height="200">
<input type="text" name="username" placeholder="Enter name" required>
<button type="submit" disabled>Submit</button>

<!-- Boolean Attributes -->
<input type="checkbox" checked>
<input type="text" readonly>
<select multiple>
    <option selected>Option 1</option>
</select>
```

---

### 7. What is the difference between `id` and `class` attributes?

**Answer:**

| Feature | `id` | `class` |
|---------|------|---------|
| Uniqueness | Must be unique per page | Can be reused multiple times |
| CSS Selector | `#id-name` | `.class-name` |
| Specificity | Higher (100) | Lower (10) |
| JavaScript | `getElementById()` | `getElementsByClassName()`, `querySelectorAll()` |
| Use Case | Single unique element | Multiple similar elements |

```html
<!-- ID - Unique identifier -->
<header id="main-header">Only one main header</header>
<nav id="primary-nav">Only one primary nav</nav>

<!-- Class - Reusable -->
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-secondary">Secondary Button</button>
<button class="btn btn-danger">Danger Button</button>

<!-- Combined Usage -->
<div id="user-profile" class="card shadow rounded">
    <h2 class="card-title">John Doe</h2>
    <p class="card-text">Developer</p>
</div>
```

```css
/* CSS Specificity */
#main-header { } /* Specificity: 100 */
.btn { }          /* Specificity: 10 */
div { }           /* Specificity: 1 */
```

```javascript
// JavaScript Access
document.getElementById('main-header');           // Returns single element
document.getElementsByClassName('btn');           // Returns HTMLCollection
document.querySelectorAll('.btn');               // Returns NodeList
```

---

### 8. Explain the HTML document structure.

**Answer:**

```html
<!DOCTYPE html>                          <!-- Declaration - tells browser it's HTML5 -->
<html lang="en">                         <!-- Root element with language attribute -->
    <head>                               <!-- Metadata container (not visible) -->
        <meta charset="UTF-8">           <!-- Character encoding -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Page description for SEO">
        <meta name="keywords" content="html, css, javascript">
        <meta name="author" content="Your Name">

        <title>Page Title</title>        <!-- Browser tab title -->

        <link rel="stylesheet" href="styles.css">    <!-- External CSS -->
        <link rel="icon" href="favicon.ico">         <!-- Favicon -->

        <style>                          <!-- Internal CSS -->
            body { margin: 0; }
        </style>
    </head>

    <body>                               <!-- Visible content container -->
        <header>                         <!-- Page header -->
            <nav>Navigation</nav>
        </header>

        <main>                           <!-- Main content -->
            <article>
                <section>Content</section>
            </article>
            <aside>Sidebar</aside>
        </main>

        <footer>                         <!-- Page footer -->
            Copyright info
        </footer>

        <script src="script.js"></script> <!-- External JS (at end for performance) -->
    </body>
</html>
```

---

## Intermediate Level Questions

### 9. What are data attributes and how do you use them?

**Answer:**
Data attributes allow you to store custom data on HTML elements. They start with `data-` prefix.

```html
<!-- Storing custom data -->
<article
    id="post-1"
    data-author="John Doe"
    data-date="2024-01-15"
    data-category="technology"
    data-read-time="5"
    data-is-featured="true"
>
    <h2>Article Title</h2>
    <p>Article content...</p>
</article>

<!-- E-commerce product example -->
<div class="product"
    data-product-id="SKU123"
    data-price="99.99"
    data-currency="USD"
    data-stock="50"
    data-discount-percent="10"
>
    <h3>Product Name</h3>
    <button class="add-to-cart">Add to Cart</button>
</div>
```

```javascript
// Accessing data attributes in JavaScript
const article = document.querySelector('article');

// Using dataset property (camelCase conversion)
console.log(article.dataset.author);      // "John Doe"
console.log(article.dataset.readTime);    // "5" (data-read-time becomes readTime)
console.log(article.dataset.isFeatured);  // "true"

// Using getAttribute
console.log(article.getAttribute('data-category')); // "technology"

// Setting data attributes
article.dataset.views = "1000";
article.setAttribute('data-likes', '50');

// E-commerce cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.closest('.product');
        const productData = {
            id: product.dataset.productId,
            price: parseFloat(product.dataset.price),
            currency: product.dataset.currency
        };
        addToCart(productData);
    });
});
```

```css
/* Styling based on data attributes */
[data-is-featured="true"] {
    border: 2px solid gold;
    background: linear-gradient(135deg, #fff9e6, #fff);
}

[data-stock="0"] {
    opacity: 0.5;
    pointer-events: none;
}

/* Show data in content */
.product::after {
    content: "Stock: " attr(data-stock);
}
```

---

### 10. Explain the difference between block-level and inline elements.

**Answer:**

| Feature | Block-Level Elements | Inline Elements |
|---------|---------------------|-----------------|
| Width | Takes full available width | Only content width |
| Height | Can set height | Height based on content |
| New Line | Starts on new line | Stays in same line |
| Margin/Padding | All sides work | Only horizontal works |
| Can Contain | Block and inline elements | Only inline elements |

```html
<!-- Block-level elements -->
<div>Division</div>
<p>Paragraph</p>
<h1>Heading</h1>
<ul><li>List</li></ul>
<section>Section</section>
<article>Article</article>
<header>Header</header>
<footer>Footer</footer>
<form>Form</form>
<table>Table</table>

<!-- Inline elements -->
<span>Span</span>
<a href="#">Link</a>
<strong>Bold</strong>
<em>Italic</em>
<img src="img.jpg" alt="Image">
<input type="text">
<button>Button</button>
<label>Label</label>
<code>Code</code>

<!-- Inline-block elements (hybrid) -->
<img>  <!-- Naturally inline-block -->
<button> <!-- Naturally inline-block -->
```

```html
<!-- Visual demonstration -->
<style>
    .block { background: lightblue; margin: 5px 0; }
    .inline { background: lightgreen; }
    .inline-block {
        display: inline-block;
        background: lightyellow;
        width: 150px;
        height: 50px;
    }
</style>

<div class="block">Block 1 - Full Width</div>
<div class="block">Block 2 - New Line</div>

<span class="inline">Inline 1</span>
<span class="inline">Inline 2</span>
<span class="inline">Same Line</span>

<div class="inline-block">Inline-block 1</div>
<div class="inline-block">Inline-block 2</div>
```

---

### 11. What is the difference between `<strong>` vs `<b>` and `<em>` vs `<i>`?

**Answer:**

| Tag | Type | Purpose | Screen Reader |
|-----|------|---------|---------------|
| `<strong>` | Semantic | Important text | Announces with emphasis |
| `<b>` | Presentational | Bold text (no importance) | No special announcement |
| `<em>` | Semantic | Emphasized/stressed text | Announces with stress |
| `<i>` | Presentational | Italic text (alternate voice) | No special announcement |

```html
<!-- WRONG: Using for styling only -->
<p><b>Bold text</b> and <i>italic text</i></p>

<!-- CORRECT: Using semantically -->
<p>
    <strong>Warning:</strong> This action cannot be undone.
</p>

<p>
    I <em>really</em> need you to understand this concept.
</p>

<!-- Proper use of <b> - stylistically different, not important -->
<p>
    The <b>keyword</b> in this sentence is just highlighted, not important.
</p>

<!-- Proper use of <i> - alternate voice, technical terms, thoughts -->
<p>
    The word <i>schadenfreude</i> comes from German.
    <i>What was I thinking?</i> she wondered.
</p>

<!-- Nested for extra emphasis -->
<p>
    <strong><em>CRITICAL:</em></strong> Do not delete this file!
</p>

<!-- Real-world examples -->
<article>
    <h1>Product Safety Notice</h1>
    <p>
        <strong>Important:</strong> Please read all instructions before use.
        The device should <em>never</em> be submerged in water.
    </p>
    <p>
        As mentioned in the <i>User Manual</i>, section 3.2...
    </p>
</article>
```

---

### 12. Explain HTML forms and form validation.

**Answer:**

```html
<!-- Complete Form Example with Validation -->
<form id="registration-form" action="/api/register" method="POST" novalidate>

    <!-- Text Input with validation -->
    <div class="form-group">
        <label for="username">Username:</label>
        <input
            type="text"
            id="username"
            name="username"
            minlength="3"
            maxlength="20"
            pattern="[a-zA-Z0-9_]+"
            placeholder="Enter username"
            required
            autocomplete="username"
        >
        <span class="error-message">Username must be 3-20 alphanumeric characters</span>
    </div>

    <!-- Email with built-in validation -->
    <div class="form-group">
        <label for="email">Email:</label>
        <input
            type="email"
            id="email"
            name="email"
            placeholder="your@email.com"
            required
            autocomplete="email"
        >
    </div>

    <!-- Password with pattern -->
    <div class="form-group">
        <label for="password">Password:</label>
        <input
            type="password"
            id="password"
            name="password"
            minlength="8"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number, one uppercase and lowercase letter, and at least 8 characters"
            required
            autocomplete="new-password"
        >
    </div>

    <!-- Number input -->
    <div class="form-group">
        <label for="age">Age:</label>
        <input
            type="number"
            id="age"
            name="age"
            min="18"
            max="120"
            step="1"
            required
        >
    </div>

    <!-- Date input -->
    <div class="form-group">
        <label for="birthdate">Birth Date:</label>
        <input
            type="date"
            id="birthdate"
            name="birthdate"
            min="1900-01-01"
            max="2006-12-31"
        >
    </div>

    <!-- Tel input -->
    <div class="form-group">
        <label for="phone">Phone:</label>
        <input
            type="tel"
            id="phone"
            name="phone"
            pattern="[0-9]{10}"
            placeholder="1234567890"
        >
    </div>

    <!-- URL input -->
    <div class="form-group">
        <label for="website">Website:</label>
        <input
            type="url"
            id="website"
            name="website"
            placeholder="https://example.com"
        >
    </div>

    <!-- Select dropdown -->
    <div class="form-group">
        <label for="country">Country:</label>
        <select id="country" name="country" required>
            <option value="">Select a country</option>
            <optgroup label="North America">
                <option value="us">United States</option>
                <option value="ca">Canada</option>
            </optgroup>
            <optgroup label="Europe">
                <option value="uk">United Kingdom</option>
                <option value="de">Germany</option>
            </optgroup>
        </select>
    </div>

    <!-- Radio buttons -->
    <div class="form-group">
        <fieldset>
            <legend>Gender:</legend>
            <label>
                <input type="radio" name="gender" value="male" required> Male
            </label>
            <label>
                <input type="radio" name="gender" value="female"> Female
            </label>
            <label>
                <input type="radio" name="gender" value="other"> Other
            </label>
        </fieldset>
    </div>

    <!-- Checkboxes -->
    <div class="form-group">
        <fieldset>
            <legend>Interests:</legend>
            <label>
                <input type="checkbox" name="interests" value="coding"> Coding
            </label>
            <label>
                <input type="checkbox" name="interests" value="design"> Design
            </label>
            <label>
                <input type="checkbox" name="interests" value="marketing"> Marketing
            </label>
        </fieldset>
    </div>

    <!-- Textarea -->
    <div class="form-group">
        <label for="bio">Bio:</label>
        <textarea
            id="bio"
            name="bio"
            rows="4"
            cols="50"
            maxlength="500"
            placeholder="Tell us about yourself..."
        ></textarea>
    </div>

    <!-- File upload -->
    <div class="form-group">
        <label for="avatar">Profile Picture:</label>
        <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg, image/gif"
        >
    </div>

    <!-- Range slider -->
    <div class="form-group">
        <label for="experience">Experience Level: <output id="exp-output">5</output></label>
        <input
            type="range"
            id="experience"
            name="experience"
            min="1"
            max="10"
            value="5"
            oninput="document.getElementById('exp-output').value = this.value"
        >
    </div>

    <!-- Color picker -->
    <div class="form-group">
        <label for="fav-color">Favorite Color:</label>
        <input type="color" id="fav-color" name="fav-color" value="#ff0000">
    </div>

    <!-- Datalist (autocomplete suggestions) -->
    <div class="form-group">
        <label for="browser">Preferred Browser:</label>
        <input type="text" id="browser" name="browser" list="browsers">
        <datalist id="browsers">
            <option value="Chrome">
            <option value="Firefox">
            <option value="Safari">
            <option value="Edge">
        </datalist>
    </div>

    <!-- Hidden field -->
    <input type="hidden" name="form_token" value="abc123xyz">

    <!-- Terms checkbox (required) -->
    <div class="form-group">
        <label>
            <input type="checkbox" name="terms" required>
            I agree to the <a href="/terms">Terms and Conditions</a>
        </label>
    </div>

    <!-- Submit buttons -->
    <div class="form-actions">
        <button type="submit">Register</button>
        <button type="reset">Clear Form</button>
    </div>
</form>
```

```javascript
// JavaScript Form Validation
const form = document.getElementById('registration-form');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Check validity
    if (form.checkValidity()) {
        // Form is valid, submit it
        const formData = new FormData(form);
        console.log(Object.fromEntries(formData));
        // Submit to server...
    } else {
        // Show validation errors
        form.reportValidity();
    }
});

// Custom validation
const password = document.getElementById('password');
password.addEventListener('input', function() {
    const value = this.value;

    if (value.length < 8) {
        this.setCustomValidity('Password must be at least 8 characters');
    } else if (!/[A-Z]/.test(value)) {
        this.setCustomValidity('Password must contain an uppercase letter');
    } else if (!/[0-9]/.test(value)) {
        this.setCustomValidity('Password must contain a number');
    } else {
        this.setCustomValidity(''); // Valid
    }
});
```

```css
/* Form validation styles */
input:valid {
    border-color: green;
}

input:invalid {
    border-color: red;
}

input:focus:invalid {
    outline: 2px solid red;
}

/* Show/hide error messages */
.error-message {
    display: none;
    color: red;
    font-size: 0.8em;
}

input:invalid + .error-message {
    display: block;
}
```

---

### 13. What is the difference between GET and POST methods in forms?

**Answer:**

| Feature | GET | POST |
|---------|-----|------|
| Data Location | URL (query string) | Request body |
| Visibility | Visible in URL | Hidden in body |
| Bookmarkable | Yes | No |
| Cached | Yes | No |
| Data Length | Limited (~2048 chars) | Unlimited |
| Security | Less secure | More secure |
| Idempotent | Yes | No |
| Use Case | Fetching data | Submitting data |

```html
<!-- GET Method - Search/Filter -->
<form action="/search" method="GET">
    <input type="text" name="q" placeholder="Search...">
    <select name="category">
        <option value="all">All</option>
        <option value="products">Products</option>
        <option value="articles">Articles</option>
    </select>
    <button type="submit">Search</button>
</form>
<!-- Results in: /search?q=javascript&category=articles -->
<!-- User can bookmark this search, share the URL -->

<!-- POST Method - User Registration -->
<form action="/api/register" method="POST">
    <input type="text" name="username">
    <input type="password" name="password">
    <input type="email" name="email">
    <button type="submit">Register</button>
</form>
<!-- Data sent in request body, not visible in URL -->

<!-- POST with File Upload -->
<form action="/upload" method="POST" enctype="multipart/form-data">
    <input type="file" name="document">
    <button type="submit">Upload</button>
</form>
```

**When to use each:**

```html
<!-- USE GET for: -->
<!-- 1. Search queries -->
<form method="GET" action="/search">...</form>

<!-- 2. Filtering/sorting -->
<form method="GET" action="/products">
    <select name="sort">...</select>
</form>

<!-- 3. Pagination -->
<a href="/articles?page=2">Next Page</a>

<!-- USE POST for: -->
<!-- 1. Login/Registration -->
<form method="POST" action="/login">...</form>

<!-- 2. Creating/updating data -->
<form method="POST" action="/api/posts">...</form>

<!-- 3. File uploads -->
<form method="POST" enctype="multipart/form-data">...</form>

<!-- 4. Sensitive data -->
<form method="POST" action="/checkout">
    <input type="text" name="credit_card">
</form>
```

---

### 14. Explain the `<meta>` tags and their importance.

**Answer:**

```html
<head>
    <!-- Character Encoding (MUST be first) -->
    <meta charset="UTF-8">

    <!-- Viewport for Responsive Design -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- SEO Meta Tags -->
    <meta name="description" content="A comprehensive guide to HTML for developers">
    <meta name="keywords" content="HTML, CSS, JavaScript, Web Development">
    <meta name="author" content="John Doe">
    <meta name="robots" content="index, follow">

    <!-- Open Graph (Facebook, LinkedIn) -->
    <meta property="og:title" content="HTML Complete Guide">
    <meta property="og:description" content="Learn HTML from scratch">
    <meta property="og:image" content="https://example.com/image.jpg">
    <meta property="og:url" content="https://example.com/html-guide">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="WebDev Academy">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@username">
    <meta name="twitter:title" content="HTML Complete Guide">
    <meta name="twitter:description" content="Learn HTML from scratch">
    <meta name="twitter:image" content="https://example.com/image.jpg">

    <!-- Mobile & PWA -->
    <meta name="theme-color" content="#4285f4">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="My App">

    <!-- Security -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'">
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="X-Frame-Options" content="DENY">

    <!-- Browser Behavior -->
    <meta http-equiv="refresh" content="30"> <!-- Refresh every 30 seconds -->
    <meta http-equiv="refresh" content="5;url=https://example.com"> <!-- Redirect -->
    <meta http-equiv="cache-control" content="no-cache">

    <!-- Verification -->
    <meta name="google-site-verification" content="verification_token">
    <meta name="msvalidate.01" content="bing_verification_token">
</head>
```

**Viewport Meta Tag Explained:**

```html
<!-- Basic responsive viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Prevent zoom (not recommended for accessibility) -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">

<!-- Set minimum and maximum scale -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=3.0">
```

---

### 15. What is the difference between `<link>` and `<a>` tags?

**Answer:**

| Feature | `<link>` | `<a>` |
|---------|----------|-------|
| Location | Only in `<head>` | Anywhere in `<body>` |
| Purpose | Link external resources | Create hyperlinks |
| Visibility | Not visible | Visible (clickable) |
| User Interaction | None | Clickable |
| Common Use | CSS, favicon, preload | Navigation, links |

```html
<head>
    <!-- <link> - External Resources -->
    <link rel="stylesheet" href="styles.css">
    <link rel="icon" href="favicon.ico">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="canonical" href="https://example.com/page">
    <link rel="manifest" href="/manifest.json">
    <link rel="apple-touch-icon" href="/apple-icon.png">
</head>

<body>
    <!-- <a> - Hyperlinks -->
    <a href="https://example.com">External Link</a>
    <a href="/about">Internal Link</a>
    <a href="#section">Anchor Link</a>
    <a href="mailto:email@example.com">Email Link</a>
    <a href="tel:+1234567890">Phone Link</a>
    <a href="/file.pdf" download>Download Link</a>
    <a href="https://example.com" target="_blank" rel="noopener noreferrer">New Tab</a>
</body>
```

---

## Advanced Level Questions

### 16. Explain the concept of Shadow DOM.

**Answer:**
Shadow DOM provides encapsulation for web components. It allows you to attach a hidden DOM tree to an element, with its own scoped styles and markup.

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        /* These styles WON'T affect Shadow DOM */
        p { color: red; }
        .title { font-size: 50px; }
    </style>
</head>
<body>
    <p>This paragraph is RED (main DOM)</p>

    <!-- Custom element with Shadow DOM -->
    <my-card></my-card>

    <script>
        class MyCard extends HTMLElement {
            constructor() {
                super();

                // Attach Shadow DOM
                const shadow = this.attachShadow({ mode: 'open' });

                // Create elements
                const wrapper = document.createElement('div');
                wrapper.setAttribute('class', 'card');

                const title = document.createElement('p');
                title.setAttribute('class', 'title');
                title.textContent = 'Shadow DOM Card';

                // Scoped styles (only affect Shadow DOM)
                const style = document.createElement('style');
                style.textContent = `
                    .card {
                        padding: 20px;
                        border: 2px solid #333;
                        border-radius: 8px;
                        background: #f5f5f5;
                    }
                    p {
                        color: blue;  /* Different from main DOM */
                        margin: 0;
                    }
                    .title {
                        font-size: 18px;  /* Different from main DOM */
                    }
                `;

                // Append to Shadow DOM
                shadow.appendChild(style);
                wrapper.appendChild(title);
                shadow.appendChild(wrapper);
            }
        }

        customElements.define('my-card', MyCard);
    </script>
</body>
</html>
```

**Shadow DOM Modes:**

```javascript
// Open mode - shadow DOM accessible from outside
const shadow = element.attachShadow({ mode: 'open' });
console.log(element.shadowRoot); // Returns shadow root

// Closed mode - shadow DOM not accessible
const shadow = element.attachShadow({ mode: 'closed' });
console.log(element.shadowRoot); // Returns null
```

**Slots - Content Projection:**

```html
<!-- Custom element definition -->
<template id="user-card-template">
    <style>
        .card { border: 1px solid #ccc; padding: 16px; }
        .header { font-weight: bold; }
    </style>
    <div class="card">
        <div class="header">
            <slot name="name">Default Name</slot>
        </div>
        <div class="content">
            <slot>Default content</slot>
        </div>
    </div>
</template>

<!-- Usage -->
<user-card>
    <span slot="name">John Doe</span>
    <p>This is the main content that goes into the default slot.</p>
</user-card>

<script>
    class UserCard extends HTMLElement {
        constructor() {
            super();
            const template = document.getElementById('user-card-template');
            const shadow = this.attachShadow({ mode: 'open' });
            shadow.appendChild(template.content.cloneNode(true));
        }
    }
    customElements.define('user-card', UserCard);
</script>
```

---

### 17. What is the `<template>` tag and how is it used?

**Answer:**
The `<template>` tag holds HTML content that is not rendered when the page loads but can be instantiated later using JavaScript.

```html
<!-- Template Definition -->
<template id="product-card-template">
    <div class="product-card">
        <img class="product-image" src="" alt="">
        <h3 class="product-name"></h3>
        <p class="product-price"></p>
        <button class="add-to-cart">Add to Cart</button>
    </div>
</template>

<!-- Container for rendered cards -->
<div id="products-container"></div>

<script>
    const products = [
        { id: 1, name: 'Laptop', price: 999.99, image: 'laptop.jpg' },
        { id: 2, name: 'Phone', price: 699.99, image: 'phone.jpg' },
        { id: 3, name: 'Tablet', price: 499.99, image: 'tablet.jpg' }
    ];

    const template = document.getElementById('product-card-template');
    const container = document.getElementById('products-container');

    products.forEach(product => {
        // Clone the template content
        const clone = template.content.cloneNode(true);

        // Populate with data
        clone.querySelector('.product-image').src = product.image;
        clone.querySelector('.product-image').alt = product.name;
        clone.querySelector('.product-name').textContent = product.name;
        clone.querySelector('.product-price').textContent = `$${product.price}`;
        clone.querySelector('.add-to-cart').dataset.productId = product.id;

        // Append to container
        container.appendChild(clone);
    });
</script>
```

**Template with Table Rows:**

```html
<table id="users-table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
        </tr>
    </thead>
    <tbody></tbody>
</table>

<template id="user-row-template">
    <tr>
        <td class="user-name"></td>
        <td class="user-email"></td>
        <td class="user-role"></td>
    </tr>
</template>

<script>
    async function loadUsers() {
        const response = await fetch('/api/users');
        const users = await response.json();

        const template = document.getElementById('user-row-template');
        const tbody = document.querySelector('#users-table tbody');

        users.forEach(user => {
            const clone = template.content.cloneNode(true);
            clone.querySelector('.user-name').textContent = user.name;
            clone.querySelector('.user-email').textContent = user.email;
            clone.querySelector('.user-role').textContent = user.role;
            tbody.appendChild(clone);
        });
    }

    loadUsers();
</script>
```

---

### 18. Explain Content Security Policy (CSP) in HTML.

**Answer:**
CSP is a security layer that helps detect and mitigate certain types of attacks, including XSS and data injection attacks.

```html
<!-- CSP via meta tag -->
<meta http-equiv="Content-Security-Policy" content="
    default-src 'self';
    script-src 'self' https://cdn.example.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' data: https:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://api.example.com;
    frame-src 'none';
    object-src 'none';
">
```

**CSP Directives Explained:**

```html
<!--
default-src: Fallback for other directives
script-src: JavaScript sources
style-src: CSS sources
img-src: Image sources
font-src: Font sources
connect-src: XMLHttpRequest, WebSocket, fetch
frame-src: iframe sources
object-src: <object>, <embed>, <applet>
media-src: <audio>, <video>
base-uri: <base> element URLs
form-action: Form submission destinations
-->

<!-- Strict CSP -->
<meta http-equiv="Content-Security-Policy" content="
    default-src 'none';
    script-src 'self';
    style-src 'self';
    img-src 'self';
    font-src 'self';
    connect-src 'self';
    base-uri 'self';
    form-action 'self';
">

<!-- CSP with nonces (more secure than 'unsafe-inline') -->
<meta http-equiv="Content-Security-Policy" content="
    script-src 'nonce-random123' 'strict-dynamic';
">
<script nonce="random123">
    // This script will execute
    console.log('Allowed script');
</script>
```

---

### 19. What are Web Workers and how do you use them?

**Answer:**
Web Workers allow you to run JavaScript in background threads, preventing blocking of the main thread.

```html
<!-- Main HTML file -->
<!DOCTYPE html>
<html>
<head>
    <title>Web Workers Example</title>
</head>
<body>
    <h1>Web Workers Demo</h1>
    <button id="start">Start Heavy Calculation</button>
    <button id="stop">Stop Worker</button>
    <div id="result">Result will appear here</div>
    <div id="counter">0</div>

    <script>
        let worker;
        const resultDiv = document.getElementById('result');
        const counterDiv = document.getElementById('counter');

        // Counter to show main thread is not blocked
        let count = 0;
        setInterval(() => {
            counterDiv.textContent = ++count;
        }, 100);

        document.getElementById('start').addEventListener('click', () => {
            // Create new worker
            worker = new Worker('worker.js');

            // Listen for messages from worker
            worker.onmessage = function(e) {
                resultDiv.textContent = `Result: ${e.data}`;
            };

            // Handle errors
            worker.onerror = function(error) {
                console.error('Worker error:', error);
            };

            // Send data to worker
            worker.postMessage({ number: 45 });
            resultDiv.textContent = 'Calculating...';
        });

        document.getElementById('stop').addEventListener('click', () => {
            if (worker) {
                worker.terminate();
                resultDiv.textContent = 'Worker terminated';
            }
        });
    </script>
</body>
</html>
```

```javascript
// worker.js - Separate file
self.onmessage = function(e) {
    const number = e.data.number;

    // Heavy calculation (Fibonacci)
    function fibonacci(n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    const result = fibonacci(number);

    // Send result back to main thread
    self.postMessage(result);
};
```

**Shared Worker (shared between tabs/windows):**

```javascript
// shared-worker.js
const connections = [];

self.onconnect = function(e) {
    const port = e.ports[0];
    connections.push(port);

    port.onmessage = function(e) {
        // Broadcast to all connections
        connections.forEach(p => {
            p.postMessage(`Received: ${e.data}`);
        });
    };
};

// In main script
const sharedWorker = new SharedWorker('shared-worker.js');
sharedWorker.port.onmessage = function(e) {
    console.log(e.data);
};
sharedWorker.port.postMessage('Hello from tab!');
```

---

### 20. Explain the `<picture>` element and responsive images.

**Answer:**
The `<picture>` element provides multiple source options for an image, allowing the browser to choose the most appropriate one.

```html
<!-- Art Direction (different crops for different screens) -->
<picture>
    <!-- Wide screens: landscape crop -->
    <source
        media="(min-width: 1200px)"
        srcset="hero-wide.jpg"
    >
    <!-- Tablet: medium crop -->
    <source
        media="(min-width: 768px)"
        srcset="hero-medium.jpg"
    >
    <!-- Mobile: portrait crop -->
    <source
        media="(max-width: 767px)"
        srcset="hero-mobile.jpg"
    >
    <!-- Fallback -->
    <img src="hero-fallback.jpg" alt="Hero image">
</picture>

<!-- Resolution Switching (same image, different sizes) -->
<picture>
    <source
        srcset="image-400.jpg 400w,
                image-800.jpg 800w,
                image-1200.jpg 1200w"
        sizes="(max-width: 600px) 100vw,
               (max-width: 1200px) 50vw,
               400px"
    >
    <img src="image-800.jpg" alt="Responsive image">
</picture>

<!-- Format Switching (modern formats with fallback) -->
<picture>
    <source type="image/avif" srcset="image.avif">
    <source type="image/webp" srcset="image.webp">
    <source type="image/png" srcset="image.png">
    <img src="image.jpg" alt="Image with format fallback">
</picture>

<!-- Combined: Format + Resolution + Art Direction -->
<picture>
    <!-- Desktop - WebP -->
    <source
        type="image/webp"
        media="(min-width: 1024px)"
        srcset="desktop-400.webp 400w,
                desktop-800.webp 800w,
                desktop-1200.webp 1200w"
        sizes="50vw"
    >
    <!-- Desktop - JPEG fallback -->
    <source
        media="(min-width: 1024px)"
        srcset="desktop-400.jpg 400w,
                desktop-800.jpg 800w,
                desktop-1200.jpg 1200w"
        sizes="50vw"
    >
    <!-- Mobile - WebP -->
    <source
        type="image/webp"
        srcset="mobile-300.webp 300w,
                mobile-600.webp 600w"
        sizes="100vw"
    >
    <!-- Mobile - JPEG fallback -->
    <source
        srcset="mobile-300.jpg 300w,
                mobile-600.jpg 600w"
        sizes="100vw"
    >
    <img
        src="fallback.jpg"
        alt="Product image"
        loading="lazy"
        decoding="async"
    >
</picture>
```

**srcset and sizes explained:**

```html
<img
    src="default.jpg"
    srcset="small.jpg 400w,      /* 400px wide image */
            medium.jpg 800w,     /* 800px wide image */
            large.jpg 1200w"     /* 1200px wide image */
    sizes="(max-width: 600px) 100vw,   /* On small screens, image is 100% viewport */
           (max-width: 1200px) 50vw,   /* On medium screens, image is 50% viewport */
           400px"                       /* On large screens, image is 400px */
    alt="Responsive image"
>
```

---

## Scenario-Based Questions

### 21. How would you create an accessible navigation menu?

**Answer:**

```html
<nav aria-label="Main navigation">
    <button
        class="menu-toggle"
        aria-expanded="false"
        aria-controls="main-menu"
        aria-label="Toggle menu"
    >
        <span class="hamburger-icon" aria-hidden="true"></span>
    </button>

    <ul id="main-menu" class="nav-menu" role="menubar">
        <li role="none">
            <a href="/" role="menuitem" aria-current="page">Home</a>
        </li>
        <li role="none">
            <a href="/about" role="menuitem">About</a>
        </li>
        <li role="none" class="has-submenu">
            <button
                role="menuitem"
                aria-haspopup="true"
                aria-expanded="false"
            >
                Services
                <span class="arrow" aria-hidden="true">▼</span>
            </button>
            <ul role="menu" aria-label="Services submenu">
                <li role="none">
                    <a href="/services/web" role="menuitem">Web Development</a>
                </li>
                <li role="none">
                    <a href="/services/mobile" role="menuitem">Mobile Development</a>
                </li>
                <li role="none">
                    <a href="/services/design" role="menuitem">UI/UX Design</a>
                </li>
            </ul>
        </li>
        <li role="none">
            <a href="/contact" role="menuitem">Contact</a>
        </li>
    </ul>
</nav>

<style>
    /* Skip link for keyboard users */
    .skip-link {
        position: absolute;
        top: -40px;
        left: 0;
        background: #000;
        color: #fff;
        padding: 8px;
        z-index: 100;
    }

    .skip-link:focus {
        top: 0;
    }

    /* Focus styles */
    .nav-menu a:focus,
    .nav-menu button:focus {
        outline: 2px solid #005fcc;
        outline-offset: 2px;
    }

    /* Hide submenu by default */
    .has-submenu > ul {
        display: none;
    }

    .has-submenu > button[aria-expanded="true"] + ul {
        display: block;
    }
</style>

<script>
    // Accessible menu JavaScript
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.getElementById('main-menu');

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        menu.classList.toggle('is-open');
    });

    // Keyboard navigation
    menu.addEventListener('keydown', (e) => {
        const items = menu.querySelectorAll('[role="menuitem"]');
        const currentIndex = Array.from(items).indexOf(document.activeElement);

        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                items[(currentIndex + 1) % items.length].focus();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                items[(currentIndex - 1 + items.length) % items.length].focus();
                break;
            case 'Home':
                e.preventDefault();
                items[0].focus();
                break;
            case 'End':
                e.preventDefault();
                items[items.length - 1].focus();
                break;
            case 'Escape':
                menuToggle.focus();
                menuToggle.setAttribute('aria-expanded', 'false');
                break;
        }
    });
</script>
```

---

### 22. How would you optimize HTML for better SEO?

**Answer:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Character encoding -->
    <meta charset="UTF-8">

    <!-- Viewport for mobile -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Primary Meta Tags -->
    <title>Best Web Development Services | Company Name</title>
    <meta name="title" content="Best Web Development Services | Company Name">
    <meta name="description" content="Professional web development services including React, Node.js, and full-stack solutions. Get a free quote today!">
    <meta name="keywords" content="web development, React, Node.js, full-stack, custom websites">
    <meta name="author" content="Company Name">
    <meta name="robots" content="index, follow">

    <!-- Canonical URL -->
    <link rel="canonical" href="https://www.example.com/services/web-development">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.example.com/services/web-development">
    <meta property="og:title" content="Best Web Development Services | Company Name">
    <meta property="og:description" content="Professional web development services including React, Node.js, and full-stack solutions.">
    <meta property="og:image" content="https://www.example.com/images/og-image.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://www.example.com/services/web-development">
    <meta property="twitter:title" content="Best Web Development Services | Company Name">
    <meta property="twitter:description" content="Professional web development services.">
    <meta property="twitter:image" content="https://www.example.com/images/twitter-image.jpg">

    <!-- Structured Data (JSON-LD) -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Web Development Services",
        "description": "Professional web development services",
        "url": "https://www.example.com/services/web-development",
        "mainEntity": {
            "@type": "Service",
            "name": "Web Development",
            "provider": {
                "@type": "Organization",
                "name": "Company Name",
                "url": "https://www.example.com"
            },
            "areaServed": "Worldwide",
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Web Development Services",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Custom Website Development"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "E-commerce Development"
                        }
                    }
                ]
            }
        }
    }
    </script>

    <!-- Breadcrumb Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.example.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": "https://www.example.com/services"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "Web Development",
                "item": "https://www.example.com/services/web-development"
            }
        ]
    }
    </script>
</head>
<body>
    <!-- Skip Navigation -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <!-- Semantic Header -->
    <header>
        <nav aria-label="Breadcrumb">
            <ol>
                <li><a href="/">Home</a></li>
                <li><a href="/services">Services</a></li>
                <li aria-current="page">Web Development</li>
            </ol>
        </nav>
    </header>

    <!-- Main Content with proper heading hierarchy -->
    <main id="main-content">
        <article>
            <h1>Professional Web Development Services</h1>

            <section>
                <h2>Our Expertise</h2>
                <p>We specialize in creating modern, responsive websites...</p>

                <h3>Frontend Development</h3>
                <p>React, Vue.js, Angular expertise...</p>

                <h3>Backend Development</h3>
                <p>Node.js, Python, Java solutions...</p>
            </section>

            <section>
                <h2>Why Choose Us</h2>
                <ul>
                    <li>10+ years of experience</li>
                    <li>100+ successful projects</li>
                    <li>24/7 support</li>
                </ul>
            </section>
        </article>

        <!-- Images with proper alt text -->
        <figure>
            <img
                src="team-working.jpg"
                alt="Our development team collaborating on a web project"
                loading="lazy"
                width="800"
                height="600"
            >
            <figcaption>Our dedicated team at work</figcaption>
        </figure>
    </main>

    <footer>
        <p>&copy; 2024 Company Name. All rights reserved.</p>
    </footer>
</body>
</html>
```

---

### 23. How would you implement lazy loading for images and content?

**Answer:**

```html
<!-- Native Lazy Loading (Modern Browsers) -->
<img
    src="image.jpg"
    alt="Description"
    loading="lazy"
    decoding="async"
    width="800"
    height="600"
>

<!-- Lazy loading iframe -->
<iframe
    src="https://www.youtube.com/embed/video-id"
    loading="lazy"
    title="Video title"
></iframe>

<!-- Lazy Loading with Intersection Observer (Custom) -->
<img
    class="lazy-image"
    data-src="actual-image.jpg"
    src="placeholder.jpg"
    alt="Description"
>

<script>
    // Intersection Observer for lazy loading
    const lazyImages = document.querySelectorAll('.lazy-image');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy-image');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',  // Load 50px before entering viewport
        threshold: 0.01
    });

    lazyImages.forEach(img => imageObserver.observe(img));
</script>

<!-- Lazy Loading Sections/Components -->
<div class="lazy-section" data-src="/api/comments">
    <div class="loading-placeholder">Loading comments...</div>
</div>

<script>
    const lazySections = document.querySelectorAll('.lazy-section');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(async entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                const url = section.dataset.src;

                try {
                    const response = await fetch(url);
                    const html = await response.text();
                    section.innerHTML = html;
                    section.classList.add('loaded');
                } catch (error) {
                    section.innerHTML = '<p>Failed to load content</p>';
                }

                sectionObserver.unobserve(section);
            }
        });
    });

    lazySections.forEach(section => sectionObserver.observe(section));
</script>

<!-- Progressive Image Loading (Blur-up technique) -->
<div class="progressive-image-container">
    <img
        class="progressive-image-placeholder"
        src="tiny-blurred-image.jpg"
        alt=""
    >
    <img
        class="progressive-image-full lazy-image"
        data-src="full-image.jpg"
        alt="Description"
    >
</div>

<style>
    .progressive-image-container {
        position: relative;
        overflow: hidden;
    }

    .progressive-image-placeholder {
        filter: blur(20px);
        transform: scale(1.1);
        width: 100%;
    }

    .progressive-image-full {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        transition: opacity 0.3s;
    }

    .progressive-image-full.loaded {
        opacity: 1;
    }
</style>
```

---

## Best Practices & Tips

### HTML Best Practices Checklist

```markdown
## Structure
- [ ] Always include DOCTYPE declaration
- [ ] Use semantic HTML5 elements
- [ ] Maintain proper heading hierarchy (h1 → h2 → h3)
- [ ] One <main> element per page
- [ ] Proper nesting of elements

## Accessibility
- [ ] All images have meaningful alt text
- [ ] Form inputs have associated labels
- [ ] Use ARIA attributes when needed
- [ ] Ensure keyboard navigation works
- [ ] Sufficient color contrast
- [ ] Skip navigation link for keyboard users

## SEO
- [ ] Unique, descriptive title for each page
- [ ] Meta description (150-160 characters)
- [ ] Canonical URL for duplicate content
- [ ] Structured data (JSON-LD)
- [ ] Open Graph and Twitter meta tags
- [ ] XML sitemap referenced

## Performance
- [ ] Minimize DOM depth and element count
- [ ] Use lazy loading for images/iframes
- [ ] Preload critical resources
- [ ] Minimize inline styles and scripts
- [ ] Compress and optimize images

## Code Quality
- [ ] Valid HTML (W3C validator)
- [ ] Consistent indentation
- [ ] Meaningful class/id names
- [ ] Remove unused code
- [ ] Comment complex sections
```

### Common Interview Mistakes to Avoid

```markdown
1. Confusing elements with tags
2. Not knowing semantic HTML elements
3. Forgetting about accessibility
4. Using deprecated elements (<center>, <font>)
5. Not understanding form validation
6. Confusing GET and POST
7. Not knowing about meta tags
8. Ignoring responsive design
9. Using tables for layout
10. Not understanding DOCTYPE purpose
```

---

## Quick Reference Card

```
SEMANTIC ELEMENTS:
<header> <nav> <main> <article> <section> <aside> <footer> <figure> <figcaption>

FORM ELEMENTS:
<form> <input> <textarea> <select> <option> <button> <label> <fieldset> <legend>

META TAGS:
charset, viewport, description, keywords, robots, og:*, twitter:*

INPUT TYPES:
text, password, email, number, tel, url, date, time, file, checkbox, radio, range, color

ATTRIBUTES:
id, class, style, title, data-*, aria-*, role, tabindex

VALIDATION:
required, pattern, minlength, maxlength, min, max, step
```

---

*This guide covers the most commonly asked HTML interview questions from beginner to advanced level. Practice these concepts and be ready to explain them with examples in your interviews.*
