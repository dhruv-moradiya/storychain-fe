# React Rendering Methods - Complete Guide

> A comprehensive guide covering all rendering patterns in React 19+, how they work in the browser, and when to use each approach for frontend development.

---

## Table of Contents

1. [Understanding React Rendering](#understanding-react-rendering)
2. [Client-Side Rendering (CSR)](#client-side-rendering-csr)
3. [Server-Side Rendering (SSR)](#server-side-rendering-ssr)
4. [Static Site Generation (SSG)](#static-site-generation-ssg)
5. [Incremental Static Regeneration (ISR)](#incremental-static-regeneration-isr)
6. [React Server Components (RSC)](#react-server-components-rsc)
7. [Streaming & Suspense](#streaming--suspense)
8. [Hydration Explained](#hydration-explained)
9. [Conditional Rendering Patterns](#conditional-rendering-patterns)
10. [List Rendering](#list-rendering)
11. [Performance Optimization](#performance-optimization)
12. [Comparison & When to Use](#comparison--when-to-use)

---

## Understanding React Rendering

### What is Rendering in React?

Rendering is the process of React calling your components to figure out what should be displayed on screen.

```jsx
// React rendering flow
function App() {
    const [count, setCount] = useState(0);

    // 1. React calls this component function
    // 2. Component returns JSX describing UI
    // 3. React compares with previous render (diffing)
    // 4. React updates only what changed in the DOM

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    );
}
```

### Rendering Phases

```
┌─────────────────────────────────────────────────────────────┐
│                    REACT RENDERING PHASES                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. TRIGGER PHASE                                           │
│     ├── Initial render (createRoot().render())              │
│     └── State update (setState, useReducer dispatch)        │
│                                                             │
│  2. RENDER PHASE (Pure, can be paused)                      │
│     ├── Call component functions                            │
│     ├── Create React elements (Virtual DOM)                 │
│     └── Perform diffing (reconciliation)                    │
│                                                             │
│  3. COMMIT PHASE (Synchronous, cannot be paused)            │
│     ├── Update DOM nodes                                    │
│     ├── Run layout effects (useLayoutEffect)                │
│     └── Run effects after paint (useEffect)                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Client-Side Rendering (CSR)

### How It Works

Client-Side Rendering means all rendering happens in the browser using JavaScript.

```
┌─────────────────────────────────────────────────────────────┐
│                    CSR FLOW                                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Browser Request                                            │
│       │                                                     │
│       ▼                                                     │
│  Server sends minimal HTML with JS bundle link              │
│       │                                                     │
│       ▼                                                     │
│  Browser downloads JS bundle                                │
│       │                                                     │
│       ▼                                                     │
│  React executes and renders content                         │
│       │                                                     │
│       ▼                                                     │
│  User sees content (after JS loads)                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Implementation

```html
<!-- index.html - Minimal HTML shell -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React App</title>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

```jsx
// main.jsx - Entry point
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

```jsx
// App.jsx - Client-rendered component
import { useState, useEffect } from 'react';

function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Data fetching happens on client
        fetch('/api/data')
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.content}</p>
        </div>
    );
}
```

### Pros & Cons of CSR

| Pros | Cons |
|------|------|
| ✅ Simple deployment (static hosting) | ❌ Poor initial load (blank page) |
| ✅ Rich interactivity | ❌ Bad SEO (search engines see empty page) |
| ✅ Great for dashboards/apps | ❌ Slower First Contentful Paint |
| ✅ Reduced server load | ❌ Requires JavaScript enabled |
| ✅ Easy caching of static assets | ❌ More work for client devices |

---

## Server-Side Rendering (SSR)

### How It Works

Server generates full HTML on each request, then React "hydrates" it on client.

```
┌─────────────────────────────────────────────────────────────┐
│                    SSR FLOW                                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Browser Request                                            │
│       │                                                     │
│       ▼                                                     │
│  Server runs React, generates full HTML                     │
│       │                                                     │
│       ▼                                                     │
│  Server sends complete HTML                                 │
│       │                                                     │
│       ▼                                                     │
│  Browser displays content (fast FCP!)                       │
│       │                                                     │
│       ▼                                                     │
│  Browser downloads JS                                       │
│       │                                                     │
│       ▼                                                     │
│  React hydrates (attaches event listeners)                  │
│       │                                                     │
│       ▼                                                     │
│  App is now interactive (TTI)                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Implementation (Next.js App Router)

```jsx
// app/page.jsx - Server Component by default
async function HomePage() {
    // This runs on the server for EVERY request
    const data = await fetch('https://api.example.com/data', {
        cache: 'no-store'  // Ensures fresh data on each request
    });
    const posts = await data.json();

    return (
        <main>
            <h1>Latest Posts</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </main>
    );
}

export default HomePage;
```

### Traditional SSR with Express

```jsx
// server.js
import express from 'express';
import { renderToString } from 'react-dom/server';
import App from './App';

const app = express();

app.get('*', async (req, res) => {
    // Fetch data on server
    const data = await fetchData();

    // Render React to HTML string
    const html = renderToString(<App initialData={data} />);

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>SSR App</title>
        </head>
        <body>
            <div id="root">${html}</div>
            <script>
                window.__INITIAL_DATA__ = ${JSON.stringify(data)};
            </script>
            <script src="/client.js"></script>
        </body>
        </html>
    `);
});

app.listen(3000);
```

```jsx
// client.js - Hydration
import { hydrateRoot } from 'react-dom/client';
import App from './App';

const initialData = window.__INITIAL_DATA__;

hydrateRoot(
    document.getElementById('root'),
    <App initialData={initialData} />
);
```

### Pros & Cons of SSR

| Pros | Cons |
|------|------|
| ✅ Great SEO | ❌ Server load per request |
| ✅ Fast First Contentful Paint | ❌ Slower TTFB (server processing) |
| ✅ Works without JS (initial view) | ❌ More complex infrastructure |
| ✅ Fresh data on each request | ❌ Higher hosting costs |
| ✅ Social media previews work | ❌ Hydration mismatch risks |

---

## Static Site Generation (SSG)

### How It Works

HTML is generated at build time, not runtime. Pages are pre-rendered and cached.

```
┌─────────────────────────────────────────────────────────────┐
│                    SSG FLOW                                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  BUILD TIME:                                                │
│  ├── React generates HTML for all pages                     │
│  ├── Data is fetched and embedded                           │
│  └── Static files are created (.html, .js, .css)            │
│                                                             │
│  RUNTIME:                                                   │
│  ├── Browser requests page                                  │
│  ├── CDN serves pre-built HTML instantly                    │
│  ├── Browser displays content (very fast!)                  │
│  ├── JS downloads and hydrates                              │
│  └── App becomes interactive                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Implementation (Next.js)

```jsx
// app/blog/[slug]/page.jsx

// Generate all possible paths at build time
export async function generateStaticParams() {
    const posts = await fetch('https://api.example.com/posts').then(r => r.json());

    return posts.map(post => ({
        slug: post.slug
    }));
}

// This runs at build time for each path
async function BlogPost({ params }) {
    const post = await fetch(
        `https://api.example.com/posts/${params.slug}`,
        { cache: 'force-cache' }  // Cache the result
    ).then(r => r.json());

    return (
        <article>
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
    );
}

export default BlogPost;
```

### When Data Can't Be Known at Build Time

```jsx
// Using fallback for dynamic paths

// Next.js App Router
export const dynamicParams = true;  // Allow paths not generated at build

async function Page({ params }) {
    const data = await fetchData(params.id);

    if (!data) {
        notFound();  // Returns 404
    }

    return <Content data={data} />;
}
```

### Pros & Cons of SSG

| Pros | Cons |
|------|------|
| ✅ Fastest possible load time | ❌ Data can become stale |
| ✅ Great SEO | ❌ Long build times for many pages |
| ✅ Cheap hosting (CDN) | ❌ Not suitable for real-time data |
| ✅ Highly scalable | ❌ Full rebuild for content changes |
| ✅ Very secure (no server) | ❌ Limited dynamic functionality |

---

## Incremental Static Regeneration (ISR)

### How It Works

Combines SSG with ability to update static pages after build without full rebuild.

```
┌─────────────────────────────────────────────────────────────┐
│                    ISR FLOW                                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Initial build generates static pages                    │
│                                                             │
│  2. Request comes in:                                       │
│     ├── If page exists and fresh → serve cached             │
│     ├── If page exists but stale:                           │
│     │   ├── Serve stale version immediately                 │
│     │   └── Regenerate in background for next request       │
│     └── If page doesn't exist:                              │
│         ├── Generate on-demand                              │
│         └── Cache for future requests                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Implementation

```jsx
// app/products/[id]/page.jsx

// Revalidate every 60 seconds
export const revalidate = 60;

async function ProductPage({ params }) {
    const product = await fetch(
        `https://api.example.com/products/${params.id}`,
        { next: { revalidate: 60 } }  // Per-fetch revalidation
    ).then(r => r.json());

    return (
        <div>
            <h1>{product.name}</h1>
            <p>Price: ${product.price}</p>
            <p>Last updated: {new Date().toISOString()}</p>
        </div>
    );
}

export default ProductPage;
```

### On-Demand Revalidation

```jsx
// app/api/revalidate/route.js
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request) {
    const { path, tag, secret } = await request.json();

    // Verify secret
    if (secret !== process.env.REVALIDATION_SECRET) {
        return Response.json({ error: 'Invalid secret' }, { status: 401 });
    }

    // Revalidate by path
    if (path) {
        revalidatePath(path);
    }

    // Or revalidate by tag
    if (tag) {
        revalidateTag(tag);
    }

    return Response.json({ revalidated: true, now: Date.now() });
}
```

```jsx
// Using tags for granular cache control
async function ProductPage({ params }) {
    const product = await fetch(
        `https://api.example.com/products/${params.id}`,
        { next: { tags: [`product-${params.id}`, 'products'] } }
    ).then(r => r.json());

    return <ProductDisplay product={product} />;
}

// Later, invalidate specific product:
// POST /api/revalidate { tag: 'product-123' }
```

---

## React Server Components (RSC)

### How It Works

Components that run exclusively on the server. They can access server resources directly and send only the rendered result to the client.

```
┌─────────────────────────────────────────────────────────────┐
│              REACT SERVER COMPONENTS                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  SERVER COMPONENTS (Default in Next.js App Router):         │
│  ├── Run on server only                                     │
│  ├── Can access databases, file system                      │
│  ├── Zero bundle size impact                                │
│  ├── Can use async/await directly                           │
│  └── Cannot use hooks or browser APIs                       │
│                                                             │
│  CLIENT COMPONENTS ('use client'):                          │
│  ├── Run on client (and server for SSR)                     │
│  ├── Can use hooks (useState, useEffect)                    │
│  ├── Can use browser APIs                                   │
│  ├── Add to JS bundle                                       │
│  └── Enable interactivity                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Server Component Example

```jsx
// app/dashboard/page.jsx - Server Component (default)
import { db } from '@/lib/database';
import { getCurrentUser } from '@/lib/auth';
import DashboardChart from './DashboardChart';  // Client component

async function DashboardPage() {
    // Direct database access - no API needed!
    const user = await getCurrentUser();
    const analytics = await db.analytics.findMany({
        where: { userId: user.id },
        orderBy: { date: 'desc' },
        take: 30
    });

    // Heavy library used only on server
    const { processData } = await import('heavy-analytics-lib');
    const processedData = processData(analytics);

    return (
        <div>
            <h1>Welcome, {user.name}</h1>

            {/* Pass data to client component */}
            <DashboardChart data={processedData} />

            {/* This list renders on server - no JS sent */}
            <ul>
                {analytics.map(item => (
                    <li key={item.id}>
                        {item.date}: {item.value}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DashboardPage;
```

### Client Component Example

```jsx
// app/dashboard/DashboardChart.jsx
'use client';  // This directive marks it as client component

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';

function DashboardChart({ data }) {
    const [timeRange, setTimeRange] = useState('7d');

    const filteredData = data.filter(item => {
        // Filter based on time range
        // ... filtering logic
    });

    return (
        <div>
            <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
            >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
            </select>

            <LineChart width={600} height={300} data={filteredData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
        </div>
    );
}

export default DashboardChart;
```

### Composition Pattern

```jsx
// Server Component with Client Component children
// app/products/page.jsx (Server)
import ProductList from './ProductList';
import AddToCartButton from './AddToCartButton';
import { getProducts } from '@/lib/products';

async function ProductsPage() {
    const products = await getProducts();

    return (
        <div>
            <h1>Products</h1>
            {products.map(product => (
                <div key={product.id}>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    {/* Client component for interactivity */}
                    <AddToCartButton productId={product.id} />
                </div>
            ))}
        </div>
    );
}
```

```jsx
// app/products/AddToCartButton.jsx (Client)
'use client';

import { useState } from 'react';
import { addToCart } from '@/lib/cart';

function AddToCartButton({ productId }) {
    const [loading, setLoading] = useState(false);

    async function handleClick() {
        setLoading(true);
        await addToCart(productId);
        setLoading(false);
    }

    return (
        <button onClick={handleClick} disabled={loading}>
            {loading ? 'Adding...' : 'Add to Cart'}
        </button>
    );
}

export default AddToCartButton;
```

### What You Can/Can't Do

| Server Components | Client Components |
|-------------------|-------------------|
| ✅ Async/await | ✅ useState, useEffect |
| ✅ Direct DB access | ✅ Event handlers |
| ✅ File system | ✅ Browser APIs |
| ✅ Secret env vars | ✅ Custom hooks |
| ❌ useState, useEffect | ❌ Direct DB access |
| ❌ Browser APIs | ❌ File system |
| ❌ Event handlers | ❌ Async component |

---

## Streaming & Suspense

### How Streaming Works

```
┌─────────────────────────────────────────────────────────────┐
│                    STREAMING SSR                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Traditional SSR:                                           │
│  ────────────[Wait for all data]────────────► Send HTML     │
│                                                             │
│  Streaming SSR:                                             │
│  ──► Send shell ──► Stream component 1 ──► Stream comp 2   │
│                                                             │
│  User sees content progressively!                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Implementation with Suspense

```jsx
// app/page.jsx
import { Suspense } from 'react';
import Header from './Header';
import SlowComponent from './SlowComponent';
import AnotherSlowComponent from './AnotherSlowComponent';

function HomePage() {
    return (
        <div>
            {/* Header renders immediately */}
            <Header />

            {/* These stream in when ready */}
            <Suspense fallback={<div>Loading posts...</div>}>
                <SlowComponent />
            </Suspense>

            <Suspense fallback={<div>Loading comments...</div>}>
                <AnotherSlowComponent />
            </Suspense>
        </div>
    );
}
```

```jsx
// SlowComponent.jsx - Async Server Component
async function SlowComponent() {
    // Simulates slow data fetch
    const data = await fetch('https://api.example.com/slow-endpoint');
    const posts = await data.json();

    return (
        <ul>
            {posts.map(post => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    );
}
```

### Nested Suspense Boundaries

```jsx
function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>

            {/* Outer suspense for main content */}
            <Suspense fallback={<MainSkeleton />}>
                <MainContent />

                {/* Inner suspense for secondary content */}
                <Suspense fallback={<SidebarSkeleton />}>
                    <Sidebar />
                </Suspense>
            </Suspense>
        </div>
    );
}
```

### Loading UI in Next.js

```jsx
// app/dashboard/loading.jsx
// Automatically wraps page in Suspense

export default function Loading() {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading dashboard...</p>
        </div>
    );
}
```

---

## Hydration Explained

### What is Hydration?

Hydration is the process of making server-rendered HTML interactive by attaching event handlers and React's internal state.

```
┌─────────────────────────────────────────────────────────────┐
│                    HYDRATION PROCESS                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Server sends HTML:                                      │
│     <button>Click me (0)</button>                           │
│     (Visible but NOT interactive)                           │
│                                                             │
│  2. Browser downloads React JS                              │
│                                                             │
│  3. React "hydrates":                                       │
│     - Walks through existing DOM                            │
│     - Attaches event listeners                              │
│     - Connects component state                              │
│     - Makes button clickable!                               │
│                                                             │
│  4. App is now fully interactive                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Hydration Code

```jsx
// Server renders this:
import { renderToString } from 'react-dom/server';
const html = renderToString(<App />);

// Client hydrates it:
import { hydrateRoot } from 'react-dom/client';
hydrateRoot(document.getElementById('root'), <App />);
```

### Hydration Mismatch

Hydration errors occur when server HTML doesn't match client render.

```jsx
// ❌ BAD - Will cause hydration mismatch
function BadComponent() {
    // Different on server vs client
    return <div>{Math.random()}</div>;
}

function AlsoBad() {
    // Date differs between server and client
    return <div>{new Date().toLocaleString()}</div>;
}

// ✅ GOOD - Use useEffect for client-only values
function GoodComponent() {
    const [randomValue, setRandomValue] = useState(null);

    useEffect(() => {
        setRandomValue(Math.random());
    }, []);

    return <div>{randomValue ?? 'Loading...'}</div>;
}

// ✅ GOOD - Suppress hydration warning when intentional
function TimeComponent() {
    return (
        <time suppressHydrationWarning>
            {new Date().toLocaleString()}
        </time>
    );
}
```

### Progressive Hydration with React 18+

```jsx
// Selective hydration - hydrate most important parts first
import { lazy, Suspense } from 'react';

const Comments = lazy(() => import('./Comments'));

function Article({ article }) {
    return (
        <article>
            {/* Hydrates immediately - critical content */}
            <h1>{article.title}</h1>
            <p>{article.content}</p>

            {/* Hydrates later - less critical */}
            <Suspense fallback={<div>Loading comments...</div>}>
                <Comments articleId={article.id} />
            </Suspense>
        </article>
    );
}
```

---

## Conditional Rendering Patterns

### Basic Conditional Rendering

```jsx
function UserGreeting({ isLoggedIn, user }) {
    // 1. If/else (use for complex logic)
    if (!isLoggedIn) {
        return <LoginButton />;
    }

    // 2. Ternary operator (inline conditions)
    return (
        <div>
            {user.isAdmin ? <AdminPanel /> : <UserPanel />}

            {/* 3. Logical AND (show or nothing) */}
            {user.hasNotifications && <NotificationBadge />}

            {/* 4. Logical OR (fallback value) */}
            <span>{user.name || 'Anonymous'}</span>

            {/* 5. Nullish coalescing (null/undefined only) */}
            <span>{user.nickname ?? user.name}</span>
        </div>
    );
}
```

### Conditional Rendering Patterns

```jsx
// Pattern 1: Early return
function ProtectedRoute({ user, children }) {
    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
}

// Pattern 2: Render prop
function Toggle({ render }) {
    const [on, setOn] = useState(false);
    return render({ on, toggle: () => setOn(!on) });
}

// Usage
<Toggle render={({ on, toggle }) => (
    <button onClick={toggle}>
        {on ? 'ON' : 'OFF'}
    </button>
)} />

// Pattern 3: Component mapping
const STEP_COMPONENTS = {
    personal: PersonalInfoStep,
    address: AddressStep,
    payment: PaymentStep,
    review: ReviewStep
};

function Wizard({ currentStep }) {
    const StepComponent = STEP_COMPONENTS[currentStep];
    return <StepComponent />;
}

// Pattern 4: Compound conditional
function DataDisplay({ data, loading, error }) {
    if (loading) return <Spinner />;
    if (error) return <ErrorMessage error={error} />;
    if (!data || data.length === 0) return <EmptyState />;
    return <DataList data={data} />;
}
```

### Avoiding Unnecessary Renders

```jsx
// ❌ BAD - Creates new component on every render
function Parent() {
    const Child = () => <div>Child</div>;  // New function each render!
    return <Child />;
}

// ✅ GOOD - Define outside or use useMemo
const Child = () => <div>Child</div>;

function Parent() {
    return <Child />;
}

// ❌ BAD - Always renders both, hides one
function Toggle({ show }) {
    return (
        <div>
            <div style={{ display: show ? 'block' : 'none' }}>
                <ExpensiveComponent />
            </div>
        </div>
    );
}

// ✅ GOOD - Only renders when needed
function Toggle({ show }) {
    return (
        <div>
            {show && <ExpensiveComponent />}
        </div>
    );
}
```

---

## List Rendering

### Basic List Rendering

```jsx
function ProductList({ products }) {
    return (
        <ul>
            {products.map(product => (
                <li key={product.id}>
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>
                </li>
            ))}
        </ul>
    );
}
```

### Key Best Practices

```jsx
// ❌ BAD - Using index as key
{items.map((item, index) => (
    <Item key={index} data={item} />
))}
// Problems: Causes issues with reordering, filtering, adding items

// ❌ BAD - Using non-unique key
{items.map(item => (
    <Item key={item.name} data={item} />  // Names might not be unique!
))}

// ✅ GOOD - Using unique, stable identifier
{items.map(item => (
    <Item key={item.id} data={item} />
))}

// ✅ GOOD - Generating unique ID if none exists
import { nanoid } from 'nanoid';

// When adding items:
const newItem = { id: nanoid(), name: 'New Item' };
setItems([...items, newItem]);
```

### Rendering Different Types

```jsx
// Rendering mixed content types
function Feed({ items }) {
    return (
        <div>
            {items.map(item => {
                switch (item.type) {
                    case 'post':
                        return <PostCard key={item.id} post={item} />;
                    case 'ad':
                        return <AdBanner key={item.id} ad={item} />;
                    case 'suggestion':
                        return <SuggestionCard key={item.id} user={item} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
}
```

### Nested Lists

```jsx
function CategoryList({ categories }) {
    return (
        <div>
            {categories.map(category => (
                <section key={category.id}>
                    <h2>{category.name}</h2>
                    <ul>
                        {category.products.map(product => (
                            <li key={product.id}>
                                {product.name}
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    );
}
```

### Virtualized Lists (Performance)

```jsx
// For long lists, use virtualization
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }) {
    const parentRef = useRef(null);

    const virtualizer = useVirtualizer({
        count: items.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 50,  // Estimated row height
    });

    return (
        <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
            <div
                style={{
                    height: `${virtualizer.getTotalSize()}px`,
                    position: 'relative',
                }}
            >
                {virtualizer.getVirtualItems().map(virtualRow => (
                    <div
                        key={virtualRow.key}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: `${virtualRow.size}px`,
                            transform: `translateY(${virtualRow.start}px)`,
                        }}
                    >
                        {items[virtualRow.index].name}
                    </div>
                ))}
            </div>
        </div>
    );
}
```

---

## Performance Optimization

### React.memo

```jsx
import { memo } from 'react';

// Memoize component - only re-renders if props change
const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
    // Expensive rendering logic
    return <div>{/* ... */}</div>;
});

// With custom comparison
const CustomMemo = memo(
    function Component({ user, settings }) {
        return <div>{user.name}</div>;
    },
    (prevProps, nextProps) => {
        // Return true if props are equal (skip re-render)
        return prevProps.user.id === nextProps.user.id;
    }
);
```

### useMemo and useCallback

```jsx
import { useMemo, useCallback } from 'react';

function Dashboard({ data, filters }) {
    // Memoize expensive computation
    const filteredData = useMemo(() => {
        return data.filter(item =>
            filters.every(f => item[f.field] === f.value)
        );
    }, [data, filters]);

    // Memoize callback to prevent child re-renders
    const handleItemClick = useCallback((id) => {
        console.log('Clicked:', id);
    }, []);

    return (
        <ul>
            {filteredData.map(item => (
                <ListItem
                    key={item.id}
                    item={item}
                    onClick={handleItemClick}
                />
            ))}
        </ul>
    );
}
```

### Code Splitting with lazy

```jsx
import { lazy, Suspense } from 'react';

// Lazy load components
const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));
const Profile = lazy(() => import('./Profile'));

function App() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Suspense>
    );
}

// Named exports
const Chart = lazy(() =>
    import('./Charts').then(module => ({ default: module.LineChart }))
);
```

### useTransition for Non-Urgent Updates

```jsx
import { useState, useTransition } from 'react';

function SearchResults({ items }) {
    const [query, setQuery] = useState('');
    const [isPending, startTransition] = useTransition();

    function handleChange(e) {
        const value = e.target.value;
        setQuery(value);  // Urgent: update input immediately

        startTransition(() => {
            // Non-urgent: can be interrupted
            setFilteredItems(
                items.filter(item =>
                    item.name.toLowerCase().includes(value.toLowerCase())
                )
            );
        });
    }

    return (
        <div>
            <input value={query} onChange={handleChange} />
            {isPending && <span>Updating...</span>}
            <ItemList items={filteredItems} />
        </div>
    );
}
```

### useDeferredValue

```jsx
import { useDeferredValue, useMemo } from 'react';

function SearchResults({ query, items }) {
    // Deferred value updates with lower priority
    const deferredQuery = useDeferredValue(query);

    const filteredItems = useMemo(() => {
        return items.filter(item =>
            item.name.toLowerCase().includes(deferredQuery.toLowerCase())
        );
    }, [deferredQuery, items]);

    const isStale = query !== deferredQuery;

    return (
        <div style={{ opacity: isStale ? 0.5 : 1 }}>
            {filteredItems.map(item => (
                <Item key={item.id} item={item} />
            ))}
        </div>
    );
}
```

---

## Comparison & When to Use

### Rendering Strategy Comparison

| Strategy | Build Time | Request Time | Best For |
|----------|------------|--------------|----------|
| **CSR** | Static shell | Full render | SPAs, dashboards, internal apps |
| **SSR** | N/A | Full render | SEO pages, personalized content |
| **SSG** | Full render | Serve static | Blogs, docs, marketing sites |
| **ISR** | Initial render | Serve + revalidate | E-commerce, frequently updated |
| **RSC** | Server render | Stream + hydrate | Complex apps, data-heavy pages |

### Decision Flowchart

```
┌─────────────────────────────────────────────────────────────┐
│            WHICH RENDERING STRATEGY TO USE?                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Does the page need SEO?                                    │
│  ├── NO → CSR (Client-Side Rendering)                       │
│  └── YES ↓                                                  │
│                                                             │
│  Is content the same for all users?                         │
│  ├── YES ↓                                                  │
│  │   Does content change frequently?                        │
│  │   ├── NO → SSG (Static Site Generation)                  │
│  │   └── YES → ISR (Incremental Static Regeneration)        │
│  └── NO → SSR (Server-Side Rendering)                       │
│                                                             │
│  Do you need to reduce bundle size?                         │
│  └── YES → Use React Server Components                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Real-World Examples

```jsx
// E-commerce Product Page: ISR + RSC
// - SEO important
// - Data updates occasionally
// - Need interactivity for cart

// Blog: SSG
// - SEO important
// - Content rarely changes
// - Simple interactivity

// Dashboard: CSR or RSC
// - No SEO needed
// - Real-time data
// - Heavy interactivity

// News Site: SSR + Streaming
// - SEO important
// - Content always fresh
// - Fast initial load needed

// Documentation: SSG
// - SEO important
// - Content changes on deploy
// - Search functionality
```

---

## Quick Reference

```jsx
// CSR - Client entry point
createRoot(document.getElementById('root')).render(<App />);

// SSR - Hydrate on client
hydrateRoot(document.getElementById('root'), <App />);

// SSG - Next.js generateStaticParams
export async function generateStaticParams() {
    return [{ slug: 'post-1' }, { slug: 'post-2' }];
}

// ISR - Next.js revalidate
export const revalidate = 60;  // seconds

// RSC - Server Component (default in App Router)
async function ServerComponent() {
    const data = await db.query();
    return <div>{data}</div>;
}

// Client Component
'use client';
function ClientComponent() {
    const [state, setState] = useState();
    return <button onClick={() => setState(...)}>Click</button>;
}

// Streaming with Suspense
<Suspense fallback={<Loading />}>
    <AsyncComponent />
</Suspense>
```

---

*This guide covers all React rendering methods from basic to advanced. Understanding when to use each approach is key to building performant React applications.*
