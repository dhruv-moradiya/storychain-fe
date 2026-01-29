# React Component Lifecycle - Complete Guide

> Understanding the lifecycle of React components in both Class Components and Functional Components with Hooks.

---

## Table of Contents

1. [What is Component Lifecycle?](#what-is-component-lifecycle)
2. [Class Component Lifecycle](#class-component-lifecycle)
3. [Lifecycle Methods Detailed](#lifecycle-methods-detailed)
4. [Functional Component Lifecycle](#functional-component-lifecycle)
5. [useEffect Patterns](#useeffect-patterns)
6. [Class vs Functional Comparison](#class-vs-functional-comparison)
7. [Common Use Cases](#common-use-cases)
8. [Advanced Patterns](#advanced-patterns)
9. [Debugging Lifecycle](#debugging-lifecycle)
10. [Best Practices](#best-practices)

---

## What is Component Lifecycle?

Every React component goes through three main phases:

```
┌─────────────────────────────────────────────────────────────┐
│                  COMPONENT LIFECYCLE PHASES                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. MOUNTING                                                │
│     └── Component is being created and inserted into DOM    │
│                                                             │
│  2. UPDATING                                                │
│     └── Component is being re-rendered due to props/state   │
│         changes                                             │
│                                                             │
│  3. UNMOUNTING                                              │
│     └── Component is being removed from DOM                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Class Component Lifecycle

### Lifecycle Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    CLASS COMPONENT LIFECYCLE                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ╔═══════════════════════════════════════════════════════╗  │
│  ║                     MOUNTING                          ║  │
│  ╠═══════════════════════════════════════════════════════╣  │
│  ║  1. constructor(props)                                ║  │
│  ║     ↓                                                 ║  │
│  ║  2. static getDerivedStateFromProps(props, state)     ║  │
│  ║     ↓                                                 ║  │
│  ║  3. render()                                          ║  │
│  ║     ↓                                                 ║  │
│  ║  4. componentDidMount()                               ║  │
│  ╚═══════════════════════════════════════════════════════╝  │
│                          ↓                                  │
│  ╔═══════════════════════════════════════════════════════╗  │
│  ║                     UPDATING                          ║  │
│  ║        (New props, setState(), forceUpdate())         ║  │
│  ╠═══════════════════════════════════════════════════════╣  │
│  ║  1. static getDerivedStateFromProps(props, state)     ║  │
│  ║     ↓                                                 ║  │
│  ║  2. shouldComponentUpdate(nextProps, nextState)       ║  │
│  ║     ↓ (if returns true)                               ║  │
│  ║  3. render()                                          ║  │
│  ║     ↓                                                 ║  │
│  ║  4. getSnapshotBeforeUpdate(prevProps, prevState)     ║  │
│  ║     ↓                                                 ║  │
│  ║  5. componentDidUpdate(prevProps, prevState, snapshot)║  │
│  ╚═══════════════════════════════════════════════════════╝  │
│                          ↓                                  │
│  ╔═══════════════════════════════════════════════════════╗  │
│  ║                    UNMOUNTING                         ║  │
│  ╠═══════════════════════════════════════════════════════╣  │
│  ║  1. componentWillUnmount()                            ║  │
│  ╚═══════════════════════════════════════════════════════╝  │
│                                                             │
│  ╔═══════════════════════════════════════════════════════╗  │
│  ║                  ERROR HANDLING                       ║  │
│  ╠═══════════════════════════════════════════════════════╣  │
│  ║  1. static getDerivedStateFromError(error)            ║  │
│  ║  2. componentDidCatch(error, info)                    ║  │
│  ╚═══════════════════════════════════════════════════════╝  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Complete Class Component Example

```jsx
import React, { Component } from 'react';

class LifecycleDemo extends Component {
    // =====================================
    // MOUNTING PHASE
    // =====================================

    constructor(props) {
        super(props);
        console.log('1. Constructor - Component is being constructed');

        // Initialize state
        this.state = {
            count: 0,
            data: null,
            error: null
        };

        // Bind methods
        this.handleClick = this.handleClick.bind(this);

        // DON'T:
        // - Call setState() here
        // - Make API calls
        // - Subscribe to events
    }

    static getDerivedStateFromProps(props, state) {
        // Called before every render (mount and update)
        console.log('2. getDerivedStateFromProps');

        // Return object to update state, or null
        if (props.resetCount && state.count !== 0) {
            return { count: 0 };
        }
        return null;

        // DON'T:
        // - Cause side effects
        // - Access 'this'
    }

    componentDidMount() {
        // Called once after component is mounted to DOM
        console.log('4. componentDidMount - Component is in DOM');

        // GOOD for:
        // - API calls
        // - Event subscriptions
        // - DOM manipulations
        // - Setting up timers

        this.fetchData();
        this.timerID = setInterval(this.tick, 1000);
        document.addEventListener('scroll', this.handleScroll);
    }

    // =====================================
    // UPDATING PHASE
    // =====================================

    shouldComponentUpdate(nextProps, nextState) {
        // Decide if re-render is needed
        console.log('shouldComponentUpdate');

        // Return false to skip render
        if (this.props.id === nextProps.id &&
            this.state.count === nextState.count) {
            return false;
        }

        return true;

        // DON'T:
        // - Call setState()
        // - Cause side effects
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        // Capture info from DOM before update
        console.log('getSnapshotBeforeUpdate');

        // Return value passed to componentDidUpdate
        if (prevState.items.length < this.state.items.length) {
            const list = this.listRef.current;
            return list.scrollHeight - list.scrollTop;
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Called after update is committed to DOM
        console.log('componentDidUpdate');

        // GOOD for:
        // - DOM operations after update
        // - Network requests based on prop changes
        // - Using snapshot value

        // Always compare props/state before setState!
        if (this.props.userId !== prevProps.userId) {
            this.fetchData(this.props.userId);
        }

        // Use snapshot
        if (snapshot !== null) {
            const list = this.listRef.current;
            list.scrollTop = list.scrollHeight - snapshot;
        }

        // DON'T:
        // - Call setState without condition (infinite loop!)
    }

    // =====================================
    // UNMOUNTING PHASE
    // =====================================

    componentWillUnmount() {
        // Called immediately before component is unmounted
        console.log('componentWillUnmount - Cleanup');

        // MUST do:
        // - Cancel API requests
        // - Remove event listeners
        // - Clear timers
        // - Unsubscribe from stores

        clearInterval(this.timerID);
        document.removeEventListener('scroll', this.handleScroll);
        this.abortController?.abort();

        // DON'T:
        // - Call setState()
    }

    // =====================================
    // ERROR HANDLING
    // =====================================

    static getDerivedStateFromError(error) {
        // Update state to show fallback UI
        return { error: error.message };
    }

    componentDidCatch(error, errorInfo) {
        // Log error to service
        console.error('Error caught:', error);
        console.error('Error info:', errorInfo.componentStack);

        // Send to error tracking service
        logErrorToService(error, errorInfo);
    }

    // =====================================
    // RENDER (Required)
    // =====================================

    render() {
        // Called during mount and every update
        console.log('3. Render - Creating virtual DOM');

        if (this.state.error) {
            return <ErrorFallback error={this.state.error} />;
        }

        // MUST be pure:
        // - No side effects
        // - No setState()
        // - Same input = same output

        return (
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.handleClick}>
                    Increment
                </button>
            </div>
        );
    }

    // =====================================
    // INSTANCE METHODS
    // =====================================

    handleClick() {
        this.setState(prevState => ({
            count: prevState.count + 1
        }));
    }

    async fetchData() {
        try {
            const response = await fetch('/api/data');
            const data = await response.json();
            this.setState({ data });
        } catch (error) {
            this.setState({ error: error.message });
        }
    }
}

export default LifecycleDemo;
```

---

## Lifecycle Methods Detailed

### Mounting Phase Methods

#### 1. constructor(props)

```jsx
constructor(props) {
    // Always call super first
    super(props);

    // Initialize state directly (only place to assign this.state)
    this.state = {
        counter: 0,
        isLoading: true,
        // Can derive from props (but consider getDerivedStateFromProps)
        color: props.initialColor
    };

    // Bind event handlers
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // Create refs
    this.inputRef = React.createRef();

    // Initialize instance variables (not state)
    this.animationFrameId = null;
    this.abortController = null;
}

// Common patterns:
// ✅ Initialize state from props
// ✅ Bind methods
// ✅ Create refs
// ✅ Initialize non-state instance variables

// ❌ Don't make API calls
// ❌ Don't subscribe to events
// ❌ Don't call setState
// ❌ Don't cause side effects
```

#### 2. static getDerivedStateFromProps(props, state)

```jsx
class Example extends Component {
    state = {
        email: this.props.defaultEmail,
        prevPropsEmail: this.props.defaultEmail
    };

    static getDerivedStateFromProps(props, state) {
        // Called before EVERY render
        // Compare props to stored previous props

        if (props.defaultEmail !== state.prevPropsEmail) {
            // Props changed, update state
            return {
                email: props.defaultEmail,
                prevPropsEmail: props.defaultEmail
            };
        }

        // No state update needed
        return null;
    }
}

// Use cases:
// ✅ Sync state with props (rarely needed)
// ✅ Reset state when props change

// ❌ Don't fetch data (use componentDidMount/Update)
// ❌ Don't access this (static method)
// ❌ Don't perform side effects
```

#### 3. render()

```jsx
render() {
    // The only REQUIRED method
    // Must be PURE - no side effects

    const { items, isLoading } = this.state;
    const { title } = this.props;

    // Conditional rendering
    if (isLoading) {
        return <Spinner />;
    }

    if (items.length === 0) {
        return <EmptyState />;
    }

    // Return JSX
    return (
        <div className="container">
            <h1>{title}</h1>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );

    // Can also return:
    // - null (renders nothing)
    // - Arrays/Fragments
    // - Portals
    // - Strings/numbers
    // - Booleans (render nothing)
}

// ✅ Return JSX based on props/state
// ✅ Can be called multiple times

// ❌ Don't call setState
// ❌ Don't interact with DOM
// ❌ Don't make API calls
// ❌ Don't modify state/props
```

#### 4. componentDidMount()

```jsx
componentDidMount() {
    // Component is now in the DOM
    // Safe to interact with DOM, make API calls, set up subscriptions

    // 1. API calls
    this.fetchUserData();

    // 2. DOM interactions
    this.inputRef.current.focus();

    // 3. Subscriptions
    this.unsubscribe = store.subscribe(this.handleStoreChange);

    // 4. Timers
    this.timerID = setInterval(this.tick, 1000);

    // 5. Event listeners
    window.addEventListener('resize', this.handleResize);
    document.addEventListener('keydown', this.handleKeyDown);

    // 6. Third-party library initialization
    this.chart = new Chart(this.canvasRef.current, config);
}

async fetchUserData() {
    this.abortController = new AbortController();

    try {
        const response = await fetch('/api/user', {
            signal: this.abortController.signal
        });
        const user = await response.json();
        this.setState({ user, isLoading: false });
    } catch (error) {
        if (error.name !== 'AbortError') {
            this.setState({ error, isLoading: false });
        }
    }
}
```

### Updating Phase Methods

#### 5. shouldComponentUpdate(nextProps, nextState)

```jsx
shouldComponentUpdate(nextProps, nextState) {
    // Performance optimization
    // Return false to skip render

    // Example: Only update if specific props/state changed
    if (this.props.color !== nextProps.color) {
        return true;
    }
    if (this.state.count !== nextState.count) {
        return true;
    }
    return false;

    // OR use shallow comparison
    return (
        !shallowEqual(this.props, nextProps) ||
        !shallowEqual(this.state, nextState)
    );
}

// Shortcut: Extend PureComponent instead
class MyComponent extends React.PureComponent {
    // Automatically implements shallow prop/state comparison
}

// ✅ Return boolean
// ✅ Compare relevant props/state

// ❌ Don't call setState
// ❌ Don't cause side effects
// ❌ Don't use for preventing updates (anti-pattern)
```

#### 6. getSnapshotBeforeUpdate(prevProps, prevState)

```jsx
class ChatMessages extends Component {
    listRef = React.createRef();

    getSnapshotBeforeUpdate(prevProps, prevState) {
        // Capture DOM info before update
        // Called between render and commit

        if (prevState.messages.length < this.state.messages.length) {
            const list = this.listRef.current;
            return {
                scrollHeight: list.scrollHeight,
                scrollTop: list.scrollTop
            };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Use snapshot to maintain scroll position
        if (snapshot !== null) {
            const list = this.listRef.current;
            list.scrollTop =
                list.scrollHeight - snapshot.scrollHeight + snapshot.scrollTop;
        }
    }

    render() {
        return (
            <div ref={this.listRef} className="message-list">
                {this.state.messages.map(msg => (
                    <Message key={msg.id} message={msg} />
                ))}
            </div>
        );
    }
}

// Use cases:
// ✅ Capture scroll position
// ✅ Capture element sizes
// ✅ Any pre-update DOM reading
```

#### 7. componentDidUpdate(prevProps, prevState, snapshot)

```jsx
componentDidUpdate(prevProps, prevState, snapshot) {
    // Called after every update (not initial mount)

    // 1. Fetch data when props change
    if (this.props.userId !== prevProps.userId) {
        this.fetchUserData(this.props.userId);
    }

    // 2. Update DOM based on state
    if (this.state.isOpen !== prevState.isOpen) {
        if (this.state.isOpen) {
            this.modalRef.current.focus();
        }
    }

    // 3. Sync with external library
    if (this.props.data !== prevProps.data) {
        this.chart.update(this.props.data);
    }

    // 4. Use snapshot
    if (snapshot !== null) {
        // Restore scroll position, etc.
    }

    // ⚠️ IMPORTANT: Always wrap setState in condition!
    // Without condition = infinite loop
    if (this.props.value !== prevProps.value) {
        this.setState({ localValue: this.props.value });
    }
}
```

### Unmounting Phase Method

#### 8. componentWillUnmount()

```jsx
componentWillUnmount() {
    // Component is about to be removed from DOM
    // CLEAN UP everything!

    // 1. Cancel API requests
    this.abortController?.abort();

    // 2. Clear timers
    clearInterval(this.timerID);
    clearTimeout(this.debounceTimer);

    // 3. Remove event listeners
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('keydown', this.handleKeyDown);

    // 4. Unsubscribe from stores/observables
    this.unsubscribe?.();
    this.subscription?.unsubscribe();

    // 5. Destroy third-party library instances
    this.chart?.destroy();
    this.map?.remove();

    // 6. Cancel animation frames
    cancelAnimationFrame(this.animationFrameId);

    // Mark as unmounted (for async operations)
    this.isUnmounted = true;
}

// Pattern for safe setState in async operations
async fetchData() {
    try {
        const data = await api.fetch();
        // Check if still mounted before setState
        if (!this.isUnmounted) {
            this.setState({ data });
        }
    } catch (error) {
        if (!this.isUnmounted) {
            this.setState({ error });
        }
    }
}
```

### Error Handling Methods

#### 9. static getDerivedStateFromError(error)

```jsx
class ErrorBoundary extends Component {
    state = { hasError: false };

    static getDerivedStateFromError(error) {
        // Update state to show fallback UI
        // Called during render phase
        return {
            hasError: true,
            errorMessage: error.message
        };
    }

    render() {
        if (this.state.hasError) {
            return <ErrorFallback message={this.state.errorMessage} />;
        }
        return this.props.children;
    }
}

// ✅ Return object to update state
// ❌ Don't cause side effects (use componentDidCatch)
```

#### 10. componentDidCatch(error, errorInfo)

```jsx
componentDidCatch(error, errorInfo) {
    // Called during commit phase
    // Can perform side effects

    // Log to error reporting service
    errorReportingService.log({
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack
    });

    // Can also setState here (but prefer getDerivedStateFromError)
}

// errorInfo.componentStack contains:
// "in ComponentThatThrew (at App.js:10)
//  in ErrorBoundary (at App.js:5)
//  in App (at index.js:9)"
```

---

## Functional Component Lifecycle

### Lifecycle with Hooks

```jsx
import { useState, useEffect, useLayoutEffect, useRef } from 'react';

function FunctionalLifecycle({ userId, onMount }) {
    // =====================================
    // "CONSTRUCTOR" - State Initialization
    // =====================================
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Refs (instance variables)
    const abortControllerRef = useRef(null);
    const isMountedRef = useRef(true);

    // =====================================
    // componentDidMount
    // =====================================
    useEffect(() => {
        console.log('Component mounted');
        onMount?.();

        // Cleanup = componentWillUnmount
        return () => {
            console.log('Component will unmount');
            isMountedRef.current = false;
        };
    }, []);  // Empty dependency array = run once on mount

    // =====================================
    // componentDidMount + componentDidUpdate
    // =====================================
    useEffect(() => {
        console.log('userId changed, fetching data...');

        async function fetchData() {
            // Cancel previous request
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/users/${userId}`, {
                    signal: abortControllerRef.current.signal
                });
                const userData = await response.json();

                if (isMountedRef.current) {
                    setData(userData);
                    setLoading(false);
                }
            } catch (err) {
                if (err.name !== 'AbortError' && isMountedRef.current) {
                    setError(err);
                    setLoading(false);
                }
            }
        }

        fetchData();

        // Cleanup
        return () => {
            abortControllerRef.current?.abort();
        };
    }, [userId]);  // Re-run when userId changes

    // =====================================
    // componentDidUpdate (specific prop)
    // =====================================
    const prevUserIdRef = useRef(userId);

    useEffect(() => {
        if (prevUserIdRef.current !== userId) {
            console.log(`userId changed from ${prevUserIdRef.current} to ${userId}`);
            prevUserIdRef.current = userId;
        }
    }, [userId]);

    // =====================================
    // getSnapshotBeforeUpdate + componentDidUpdate
    // =====================================
    useLayoutEffect(() => {
        // Runs synchronously after DOM mutations
        // Before browser paints
        // Use for DOM measurements
    });

    // =====================================
    // Render
    // =====================================
    if (loading) return <Spinner />;
    if (error) return <Error error={error} />;

    return <UserProfile data={data} />;
}
```

### Hooks Lifecycle Diagram

```
┌─────────────────────────────────────────────────────────────┐
│              FUNCTIONAL COMPONENT LIFECYCLE                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ╔═══════════════════════════════════════════════════════╗  │
│  ║                     MOUNTING                          ║  │
│  ╠═══════════════════════════════════════════════════════╣  │
│  ║  1. Component function called                         ║  │
│  ║     ↓                                                 ║  │
│  ║  2. useState/useReducer initialize state              ║  │
│  ║     ↓                                                 ║  │
│  ║  3. Return JSX (render)                               ║  │
│  ║     ↓                                                 ║  │
│  ║  4. React updates DOM                                 ║  │
│  ║     ↓                                                 ║  │
│  ║  5. useLayoutEffect runs                              ║  │
│  ║     ↓                                                 ║  │
│  ║  6. Browser paints                                    ║  │
│  ║     ↓                                                 ║  │
│  ║  7. useEffect runs                                    ║  │
│  ╚═══════════════════════════════════════════════════════╝  │
│                          ↓                                  │
│  ╔═══════════════════════════════════════════════════════╗  │
│  ║                     UPDATING                          ║  │
│  ╠═══════════════════════════════════════════════════════╣  │
│  ║  1. Props/state change triggers re-render             ║  │
│  ║     ↓                                                 ║  │
│  ║  2. Component function called again                   ║  │
│  ║     ↓                                                 ║  │
│  ║  3. Return new JSX                                    ║  │
│  ║     ↓                                                 ║  │
│  ║  4. React diffs and updates DOM                       ║  │
│  ║     ↓                                                 ║  │
│  ║  5. useLayoutEffect cleanup then effect               ║  │
│  ║     ↓                                                 ║  │
│  ║  6. Browser paints                                    ║  │
│  ║     ↓                                                 ║  │
│  ║  7. useEffect cleanup then effect                     ║  │
│  ╚═══════════════════════════════════════════════════════╝  │
│                          ↓                                  │
│  ╔═══════════════════════════════════════════════════════╗  │
│  ║                    UNMOUNTING                         ║  │
│  ╠═══════════════════════════════════════════════════════╣  │
│  ║  1. useLayoutEffect cleanup                           ║  │
│  ║     ↓                                                 ║  │
│  ║  2. useEffect cleanup                                 ║  │
│  ╚═══════════════════════════════════════════════════════╝  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## useEffect Patterns

### Pattern 1: Run Once on Mount

```jsx
useEffect(() => {
    console.log('Mounted');

    return () => {
        console.log('Unmounting');
    };
}, []);  // Empty array = mount/unmount only
```

### Pattern 2: Run on Every Render

```jsx
useEffect(() => {
    console.log('Rendered');
});  // No dependency array = every render
```

### Pattern 3: Run When Dependencies Change

```jsx
useEffect(() => {
    console.log(`userId changed to: ${userId}`);
    fetchUser(userId);
}, [userId]);  // Runs when userId changes
```

### Pattern 4: Cleanup on Unmount

```jsx
useEffect(() => {
    const subscription = dataSource.subscribe(handleData);

    // Cleanup function runs:
    // 1. Before effect re-runs (on dependency change)
    // 2. When component unmounts
    return () => {
        subscription.unsubscribe();
    };
}, [dataSource]);
```

### Pattern 5: Skip Effect Conditionally

```jsx
// Can't do this inside useEffect
// ❌ BAD
useEffect(() => {
    if (shouldFetch) {
        fetchData();
    }
}, [shouldFetch]);

// ✅ GOOD - put condition inside
useEffect(() => {
    if (!shouldFetch) return;

    fetchData();
}, [shouldFetch]);

// ✅ Or early return
useEffect(() => {
    if (!userId) return;

    const controller = new AbortController();
    fetchUser(userId, controller.signal);

    return () => controller.abort();
}, [userId]);
```

### Pattern 6: Debounced Effect

```jsx
useEffect(() => {
    const timer = setTimeout(() => {
        search(query);
    }, 500);

    return () => clearTimeout(timer);
}, [query]);
```

### Pattern 7: Previous Value Comparison

```jsx
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function Component({ value }) {
    const prevValue = usePrevious(value);

    useEffect(() => {
        if (prevValue !== undefined && prevValue !== value) {
            console.log(`Value changed from ${prevValue} to ${value}`);
        }
    }, [value, prevValue]);
}
```

### Pattern 8: Event Listeners

```jsx
useEffect(() => {
    const handleResize = () => {
        setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
        window.removeEventListener('resize', handleResize);
    };
}, []);  // Empty = add once, remove on unmount
```

### Pattern 9: Async Effect

```jsx
useEffect(() => {
    // Can't make useEffect callback async directly
    // ❌ useEffect(async () => { ... }, []);

    // ✅ Define async function inside
    async function fetchData() {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
        } catch (error) {
            setError(error);
        }
    }

    fetchData();
}, [url]);

// Or use IIFE
useEffect(() => {
    (async () => {
        const data = await fetchData();
        setData(data);
    })();
}, []);
```

---

## Class vs Functional Comparison

### Mapping Class Methods to Hooks

| Class Component | Functional Component |
|-----------------|----------------------|
| `constructor` | `useState`, `useRef` |
| `render` | Component function return |
| `componentDidMount` | `useEffect(() => {}, [])` |
| `componentDidUpdate` | `useEffect(() => {}, [deps])` |
| `componentWillUnmount` | `useEffect` cleanup |
| `shouldComponentUpdate` | `React.memo`, `useMemo` |
| `getSnapshotBeforeUpdate` | `useLayoutEffect` |
| `getDerivedStateFromProps` | `useState` + update in render |
| `getDerivedStateFromError` | Not available (use class) |
| `componentDidCatch` | Not available (use class) |
| `this.state` | `useState`, `useReducer` |
| `this.setState` | State setter function |
| Instance variables | `useRef` |

### Side-by-Side Example

```jsx
// =====================================
// CLASS COMPONENT
// =====================================
class ClassCounter extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
        this.intervalId = null;
    }

    componentDidMount() {
        document.title = `Count: ${this.state.count}`;
        this.intervalId = setInterval(() => {
            this.setState(s => ({ count: s.count + 1 }));
        }, 1000);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.count !== this.state.count) {
            document.title = `Count: ${this.state.count}`;
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        return <h1>Count: {this.state.count}</h1>;
    }
}

// =====================================
// FUNCTIONAL COMPONENT
// =====================================
function FunctionalCounter() {
    const [count, setCount] = useState(0);

    // componentDidMount + componentDidUpdate + componentWillUnmount
    useEffect(() => {
        document.title = `Count: ${count}`;
    }, [count]);

    // componentDidMount + componentWillUnmount
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCount(c => c + 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return <h1>Count: {count}</h1>;
}
```

---

## Common Use Cases

### Data Fetching

```jsx
// Class
class DataFetcher extends Component {
    state = { data: null, loading: true, error: null };

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            this.fetchData();
        }
    }

    async fetchData() {
        this.setState({ loading: true, error: null });
        try {
            const res = await fetch(`/api/data/${this.props.id}`);
            const data = await res.json();
            this.setState({ data, loading: false });
        } catch (error) {
            this.setState({ error, loading: false });
        }
    }

    render() { /* ... */ }
}

// Functional
function DataFetcher({ id }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchData() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`/api/data/${id}`);
                const data = await res.json();
                if (!cancelled) setData(data);
            } catch (error) {
                if (!cancelled) setError(error);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchData();
        return () => { cancelled = true; };
    }, [id]);

    // render...
}
```

### Subscriptions

```jsx
// Class
class StoreSubscriber extends Component {
    state = { value: store.getValue() };

    componentDidMount() {
        this.unsubscribe = store.subscribe(value => {
            this.setState({ value });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return <div>{this.state.value}</div>;
    }
}

// Functional
function StoreSubscriber() {
    const [value, setValue] = useState(store.getValue());

    useEffect(() => {
        const unsubscribe = store.subscribe(setValue);
        return unsubscribe;
    }, []);

    return <div>{value}</div>;
}
```

### DOM Measurements

```jsx
// Class
class MeasuredBox extends Component {
    boxRef = React.createRef();
    state = { width: 0, height: 0 };

    componentDidMount() {
        this.measure();
        window.addEventListener('resize', this.measure);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.measure);
    }

    measure = () => {
        const { width, height } = this.boxRef.current.getBoundingClientRect();
        this.setState({ width, height });
    };

    render() {
        return (
            <div ref={this.boxRef}>
                {this.state.width} x {this.state.height}
            </div>
        );
    }
}

// Functional
function MeasuredBox() {
    const boxRef = useRef();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        function measure() {
            const { width, height } = boxRef.current.getBoundingClientRect();
            setDimensions({ width, height });
        }

        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    return (
        <div ref={boxRef}>
            {dimensions.width} x {dimensions.height}
        </div>
    );
}
```

---

## Advanced Patterns

### Custom Hook for Lifecycle Logging

```jsx
function useLifecycleLogger(componentName) {
    useEffect(() => {
        console.log(`${componentName} mounted`);
        return () => console.log(`${componentName} unmounted`);
    }, [componentName]);

    const renderCount = useRef(0);
    renderCount.current++;
    console.log(`${componentName} render #${renderCount.current}`);
}

function MyComponent() {
    useLifecycleLogger('MyComponent');
    return <div>Content</div>;
}
```

### Strict Mode Double Invocation

```jsx
// In React 18 Strict Mode, effects run twice (mount, unmount, mount)
// This helps find bugs with missing cleanup

function Component() {
    useEffect(() => {
        console.log('Effect runs');
        // Runs twice in development Strict Mode!

        return () => {
            console.log('Cleanup runs');
            // Also runs twice!
        };
    }, []);
}

// Make sure your effects handle this:
// - Proper cleanup
// - Idempotent effects
// - Resilient to re-running
```

### Concurrent Mode Considerations

```jsx
// In Concurrent Mode, render may be interrupted and restarted
// Don't put side effects in render!

function Component() {
    // ❌ BAD - side effect in render
    localStorage.setItem('count', count);

    // ✅ GOOD - side effect in useEffect
    useEffect(() => {
        localStorage.setItem('count', count);
    }, [count]);

    return <div>{count}</div>;
}
```

---

## Debugging Lifecycle

### Using DevTools

```jsx
// React DevTools Profiler shows:
// - Render timing
// - Why component rendered
// - Component tree

// Console logging pattern
function Component({ id }) {
    console.log('Render:', id);

    useEffect(() => {
        console.log('Effect:', id);
        return () => console.log('Cleanup:', id);
    }, [id]);
}
```

### Why Did You Render

```jsx
// Use why-did-you-render library
import whyDidYouRender from '@welldone-software/why-did-you-render';

whyDidYouRender(React, {
    trackAllPureComponents: true,
});

// Mark specific components
Component.whyDidYouRender = true;
```

---

## Best Practices

### Do's

```jsx
// ✅ Clean up subscriptions and timers
useEffect(() => {
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
}, []);

// ✅ Cancel API requests
useEffect(() => {
    const controller = new AbortController();
    fetch(url, { signal: controller.signal });
    return () => controller.abort();
}, [url]);

// ✅ Use functional setState for updates based on previous state
setCount(prevCount => prevCount + 1);

// ✅ Include all dependencies in useEffect
useEffect(() => {
    doSomething(a, b);
}, [a, b]);

// ✅ Separate concerns into multiple effects
useEffect(() => { /* fetch data */ }, [id]);
useEffect(() => { /* update title */ }, [title]);
```

### Don'ts

```jsx
// ❌ Don't forget cleanup
useEffect(() => {
    window.addEventListener('resize', handler);
    // Missing cleanup!
}, []);

// ❌ Don't call setState without condition in componentDidUpdate
componentDidUpdate() {
    this.setState({ /* ... */ });  // Infinite loop!
}

// ❌ Don't perform side effects in render
function Component() {
    fetch('/api');  // Side effect in render!
    return <div />;
}

// ❌ Don't ignore exhaustive-deps warnings
useEffect(() => {
    doSomething(value);
}, []);  // Missing 'value' dependency

// ❌ Don't use index as key in dynamic lists
{items.map((item, index) => (
    <Item key={index} />  // Bad!
))}
```

---

## Quick Reference

```jsx
// CLASS LIFECYCLE
constructor(props)                              // Initialize state, bind methods
static getDerivedStateFromProps(props, state)   // Sync state with props
render()                                        // Return JSX
componentDidMount()                             // API calls, subscriptions
shouldComponentUpdate(nextProps, nextState)     // Performance optimization
getSnapshotBeforeUpdate(prevProps, prevState)   // Capture DOM info
componentDidUpdate(prevProps, prevState, snap)  // React to updates
componentWillUnmount()                          // Cleanup

// HOOKS LIFECYCLE
useState(initial)                   // Initialize state
useEffect(() => {}, [])            // Mount only
useEffect(() => {}, [dep])         // Mount + when dep changes
useEffect(() => { return cleanup }) // Cleanup on unmount/before re-run
useLayoutEffect(() => {})          // Sync after DOM update
useRef()                           // Instance variables

// EFFECT PATTERNS
useEffect(() => {}, [])            // componentDidMount
useEffect(() => {}, [dep])         // componentDidUpdate for dep
useEffect(() => () => {}, [])      // componentWillUnmount
```

---

*This guide covers the complete React component lifecycle for both class and functional components. Understanding these concepts is essential for building robust React applications.*
