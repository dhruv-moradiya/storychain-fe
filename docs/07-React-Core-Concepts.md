# React Core Concepts - Beginner to Advanced

> A comprehensive guide covering all important React concepts from fundamentals to advanced patterns.

---

## Table of Contents

1. [Component Fundamentals](#component-fundamentals)
2. [JSX Deep Dive](#jsx-deep-dive)
3. [Props & State](#props--state)
4. [Hooks Complete Guide](#hooks-complete-guide)
5. [Context API](#context-api)
6. [Error Boundaries](#error-boundaries)
7. [Refs and DOM](#refs-and-dom)
8. [Higher-Order Components](#higher-order-components)
9. [Render Props](#render-props)
10. [Custom Hooks](#custom-hooks)
11. [Portals](#portals)
12. [Suspense & Lazy Loading](#suspense--lazy-loading)
13. [Forms & Controlled Components](#forms--controlled-components)
14. [State Management Patterns](#state-management-patterns)
15. [Performance Patterns](#performance-patterns)
16. [Best Practices](#best-practices)

---

## Component Fundamentals

### What is a Component?

A component is a reusable piece of UI that manages its own content, logic, and appearance.

```jsx
// Function Component (Recommended)
function Greeting({ name }) {
    return <h1>Hello, {name}!</h1>;
}

// Arrow Function Component
const Greeting = ({ name }) => <h1>Hello, {name}!</h1>;

// Class Component (Legacy, still supported)
class Greeting extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}!</h1>;
    }
}
```

### Component Composition

```jsx
// Breaking UI into components
function App() {
    return (
        <div className="app">
            <Header />
            <main>
                <Sidebar />
                <Content />
            </main>
            <Footer />
        </div>
    );
}

// Props for communication
function Header() {
    return (
        <header>
            <Logo />
            <Navigation items={['Home', 'About', 'Contact']} />
            <UserMenu user={{ name: 'John' }} />
        </header>
    );
}

// Children prop for composition
function Card({ title, children }) {
    return (
        <div className="card">
            <h2>{title}</h2>
            <div className="card-content">
                {children}
            </div>
        </div>
    );
}

// Usage
<Card title="Welcome">
    <p>This is the card content</p>
    <button>Click me</button>
</Card>
```

### Component Organization Patterns

```jsx
// Container/Presentational Pattern
// Container: Logic
function UserListContainer() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers().then(data => {
            setUsers(data);
            setLoading(false);
        });
    }, []);

    return <UserList users={users} loading={loading} />;
}

// Presentational: UI
function UserList({ users, loading }) {
    if (loading) return <Spinner />;

    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}

// Compound Components Pattern
function Tabs({ children, defaultTab }) {
    const [activeTab, setActiveTab] = useState(defaultTab);

    return (
        <TabContext.Provider value={{ activeTab, setActiveTab }}>
            <div className="tabs">{children}</div>
        </TabContext.Provider>
    );
}

Tabs.List = function TabList({ children }) {
    return <div className="tab-list">{children}</div>;
};

Tabs.Tab = function Tab({ id, children }) {
    const { activeTab, setActiveTab } = useContext(TabContext);
    return (
        <button
            className={activeTab === id ? 'active' : ''}
            onClick={() => setActiveTab(id)}
        >
            {children}
        </button>
    );
};

Tabs.Panels = function TabPanels({ children }) {
    return <div className="tab-panels">{children}</div>;
};

Tabs.Panel = function TabPanel({ id, children }) {
    const { activeTab } = useContext(TabContext);
    return activeTab === id ? <div>{children}</div> : null;
};

// Usage
<Tabs defaultTab="tab1">
    <Tabs.List>
        <Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
        <Tabs.Tab id="tab2">Tab 2</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panels>
        <Tabs.Panel id="tab1">Content 1</Tabs.Panel>
        <Tabs.Panel id="tab2">Content 2</Tabs.Panel>
    </Tabs.Panels>
</Tabs>
```

---

## JSX Deep Dive

### JSX Syntax

```jsx
// JSX is syntactic sugar for React.createElement()
const element = <h1 className="greeting">Hello, world!</h1>;

// Compiles to:
const element = React.createElement(
    'h1',
    { className: 'greeting' },
    'Hello, world!'
);

// Embedding expressions
const name = 'John';
const element = <h1>Hello, {name}!</h1>;

// Any JavaScript expression works in {}
<p>{2 + 2}</p>
<p>{user.firstName}</p>
<p>{formatDate(new Date())}</p>
<p>{items.length > 0 ? 'Has items' : 'Empty'}</p>
<p>{items.map(item => item.name).join(', ')}</p>
```

### JSX Attributes

```jsx
// HTML attributes use camelCase
<div
    className="container"      // class → className
    htmlFor="email"            // for → htmlFor
    tabIndex={0}               // tabindex → tabIndex
    onClick={handleClick}      // Event handlers
    style={{                   // Style object
        backgroundColor: 'blue',
        fontSize: '16px'
    }}
    data-testid="container"    // data-* attributes unchanged
    aria-label="Main content"  // aria-* attributes unchanged
>

// Boolean attributes
<input disabled />            // Same as disabled={true}
<input disabled={false} />    // Not disabled
<button disabled={isLoading}>Submit</button>

// Spread attributes
const props = { id: 'input', type: 'text', placeholder: 'Enter...' };
<input {...props} />

// Overriding spread props
<input {...props} type="email" />  // type="email" wins
```

### JSX Children

```jsx
// String children
<h1>Hello World</h1>

// JSX children
<Card>
    <CardHeader />
    <CardBody />
</Card>

// Expression children
<ul>
    {items.map(item => (
        <li key={item.id}>{item.name}</li>
    ))}
</ul>

// Function as children (render prop)
<DataFetcher>
    {(data, loading) => (
        loading ? <Spinner /> : <DataDisplay data={data} />
    )}
</DataFetcher>

// Mixed children
<div>
    Text content
    <span>JSX element</span>
    {dynamicContent}
</div>

// Booleans, null, undefined render nothing
<div>
    {true}
    {false}
    {null}
    {undefined}
</div>
// Renders: <div></div>

// Careful with 0 (falsy but renders)
{items.length && <List items={items} />}
// If length is 0, renders "0"!

// Fix:
{items.length > 0 && <List items={items} />}
// Or:
{items.length ? <List items={items} /> : null}
```

### Fragments

```jsx
// Fragments let you group elements without extra DOM node
function Columns() {
    return (
        <React.Fragment>
            <td>Column 1</td>
            <td>Column 2</td>
        </React.Fragment>
    );
}

// Short syntax
function Columns() {
    return (
        <>
            <td>Column 1</td>
            <td>Column 2</td>
        </>
    );
}

// Fragment with key (can't use short syntax)
function Items({ items }) {
    return items.map(item => (
        <React.Fragment key={item.id}>
            <dt>{item.term}</dt>
            <dd>{item.description}</dd>
        </React.Fragment>
    ));
}
```

---

## Props & State

### Props (Properties)

```jsx
// Props are read-only inputs to components
function UserCard({ name, email, avatar, isAdmin = false, children }) {
    return (
        <div className="user-card">
            <img src={avatar} alt={name} />
            <h2>{name}</h2>
            <p>{email}</p>
            {isAdmin && <span className="badge">Admin</span>}
            {children}
        </div>
    );
}

// Usage
<UserCard
    name="John Doe"
    email="john@example.com"
    avatar="/avatars/john.jpg"
    isAdmin
>
    <p>Additional content</p>
</UserCard>

// Props are immutable
function WrongComponent({ items }) {
    items.push(newItem);  // ❌ Never mutate props!
}

// Prop Types (optional but recommended)
import PropTypes from 'prop-types';

UserCard.propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    isAdmin: PropTypes.bool,
    children: PropTypes.node
};

UserCard.defaultProps = {
    avatar: '/default-avatar.png',
    isAdmin: false
};

// TypeScript (better alternative)
interface UserCardProps {
    name: string;
    email: string;
    avatar?: string;
    isAdmin?: boolean;
    children?: React.ReactNode;
}

function UserCard({ name, email, avatar = '/default.png', isAdmin = false, children }: UserCardProps) {
    // ...
}
```

### State

```jsx
// State is mutable data managed by the component
import { useState } from 'react';

function Counter() {
    // Declare state variable
    const [count, setCount] = useState(0);

    // Update state
    function increment() {
        setCount(count + 1);
    }

    // Functional update (when new state depends on old)
    function incrementSafe() {
        setCount(prevCount => prevCount + 1);
    }

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
        </div>
    );
}

// Multiple state variables
function Form() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(0);

    // ...
}

// Object state
function Form() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: 0
    });

    function updateField(field, value) {
        setFormData(prev => ({
            ...prev,           // Spread previous state
            [field]: value     // Update specific field
        }));
    }

    // ❌ Never mutate directly
    function wrongUpdate() {
        formData.name = 'John';  // Won't trigger re-render!
        setFormData(formData);   // Same reference, no update
    }
}

// Array state
function TodoList() {
    const [todos, setTodos] = useState([]);

    function addTodo(text) {
        setTodos(prev => [...prev, { id: Date.now(), text }]);
    }

    function removeTodo(id) {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    }

    function updateTodo(id, newText) {
        setTodos(prev => prev.map(todo =>
            todo.id === id ? { ...todo, text: newText } : todo
        ));
    }
}

// Lazy initialization (for expensive initial state)
function ExpensiveComponent() {
    // Function is only called on initial render
    const [data, setData] = useState(() => {
        return computeExpensiveInitialValue();
    });
}
```

### Lifting State Up

```jsx
// When multiple components need the same state, lift it to common ancestor
function Parent() {
    const [temperature, setTemperature] = useState(0);

    return (
        <div>
            <TemperatureInput
                scale="celsius"
                temperature={temperature}
                onTemperatureChange={setTemperature}
            />
            <TemperatureInput
                scale="fahrenheit"
                temperature={temperature * 9/5 + 32}
                onTemperatureChange={(f) => setTemperature((f - 32) * 5/9)}
            />
            <BoilingVerdict celsius={temperature} />
        </div>
    );
}

function TemperatureInput({ scale, temperature, onTemperatureChange }) {
    return (
        <fieldset>
            <legend>Enter temperature in {scale}:</legend>
            <input
                value={temperature}
                onChange={(e) => onTemperatureChange(parseFloat(e.target.value))}
            />
        </fieldset>
    );
}
```

---

## Hooks Complete Guide

### useState

```jsx
import { useState } from 'react';

function Counter() {
    // Basic usage
    const [count, setCount] = useState(0);

    // Functional updates
    const increment = () => setCount(c => c + 1);
    const decrement = () => setCount(c => c - 1);

    // Lazy initialization
    const [expensiveValue] = useState(() => computeExpensiveValue());

    return (
        <div>
            <button onClick={decrement}>-</button>
            <span>{count}</span>
            <button onClick={increment}>+</button>
        </div>
    );
}
```

### useEffect

```jsx
import { useEffect, useState } from 'react';

function DataFetcher({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Effect with dependencies
    useEffect(() => {
        setLoading(true);

        fetch(`/api/users/${userId}`)
            .then(res => res.json())
            .then(data => {
                setUser(data);
                setLoading(false);
            });

        // Cleanup function (optional)
        return () => {
            // Cancel request, unsubscribe, etc.
        };
    }, [userId]);  // Re-run when userId changes

    // Effect runs once on mount
    useEffect(() => {
        console.log('Component mounted');
        return () => console.log('Component unmounted');
    }, []);  // Empty dependency array

    // Effect runs on every render (rare)
    useEffect(() => {
        console.log('Component rendered');
    });  // No dependency array

    // Multiple effects (separate concerns)
    useEffect(() => {
        // Handle data fetching
    }, [userId]);

    useEffect(() => {
        // Handle window resize
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (loading) return <Spinner />;
    return <UserProfile user={user} />;
}
```

### useContext

```jsx
import { createContext, useContext, useState } from 'react';

// Create context
const ThemeContext = createContext('light');

// Provider component
function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(t => t === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Consumer component
function ThemedButton() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            style={{
                background: theme === 'light' ? '#fff' : '#333',
                color: theme === 'light' ? '#333' : '#fff'
            }}
        >
            Toggle Theme
        </button>
    );
}

// App setup
function App() {
    return (
        <ThemeProvider>
            <ThemedButton />
        </ThemeProvider>
    );
}
```

### useReducer

```jsx
import { useReducer } from 'react';

// Reducer function
function todoReducer(state, action) {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, {
                id: Date.now(),
                text: action.payload,
                completed: false
            }];
        case 'TOGGLE_TODO':
            return state.map(todo =>
                todo.id === action.payload
                    ? { ...todo, completed: !todo.completed }
                    : todo
            );
        case 'DELETE_TODO':
            return state.filter(todo => todo.id !== action.payload);
        default:
            return state;
    }
}

function TodoApp() {
    const [todos, dispatch] = useReducer(todoReducer, []);

    function addTodo(text) {
        dispatch({ type: 'ADD_TODO', payload: text });
    }

    function toggleTodo(id) {
        dispatch({ type: 'TOGGLE_TODO', payload: id });
    }

    function deleteTodo(id) {
        dispatch({ type: 'DELETE_TODO', payload: id });
    }

    return (
        <div>
            <AddTodo onAdd={addTodo} />
            <TodoList
                todos={todos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
            />
        </div>
    );
}

// Lazy initialization
const [state, dispatch] = useReducer(reducer, initialArg, init);

function init(initialCount) {
    return { count: initialCount };
}
```

### useMemo

```jsx
import { useMemo, useState } from 'react';

function ExpensiveList({ items, filter }) {
    // Memoize expensive computation
    const filteredItems = useMemo(() => {
        console.log('Filtering items...');
        return items.filter(item =>
            item.name.toLowerCase().includes(filter.toLowerCase())
        );
    }, [items, filter]);  // Only recalculate when items or filter change

    // Memoize object to prevent unnecessary child re-renders
    const config = useMemo(() => ({
        sortBy: 'name',
        order: 'asc'
    }), []);

    return (
        <List items={filteredItems} config={config} />
    );
}

// When to use useMemo:
// 1. Expensive calculations
// 2. Referential equality for useEffect dependencies
// 3. Preventing re-renders of memoized children
```

### useCallback

```jsx
import { useCallback, useState, memo } from 'react';

// Child component wrapped in memo
const ExpensiveChild = memo(function ExpensiveChild({ onClick }) {
    console.log('ExpensiveChild rendered');
    return <button onClick={onClick}>Click me</button>;
});

function Parent() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('');

    // Without useCallback, new function created every render
    // Causes ExpensiveChild to re-render
    const handleClickBad = () => {
        console.log('Clicked');
    };

    // With useCallback, function is memoized
    // ExpensiveChild only re-renders if dependencies change
    const handleClickGood = useCallback(() => {
        console.log('Clicked', count);
    }, [count]);

    return (
        <div>
            <input value={name} onChange={e => setName(e.target.value)} />
            <ExpensiveChild onClick={handleClickGood} />
        </div>
    );
}
```

### useRef

```jsx
import { useRef, useEffect, useState } from 'react';

function TextInput() {
    // DOM reference
    const inputRef = useRef(null);

    useEffect(() => {
        // Focus input on mount
        inputRef.current.focus();
    }, []);

    return <input ref={inputRef} type="text" />;
}

function Timer() {
    const [count, setCount] = useState(0);
    // Mutable value that persists across renders
    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCount(c => c + 1);
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, []);

    function stopTimer() {
        clearInterval(intervalRef.current);
    }

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={stopTimer}>Stop</button>
        </div>
    );
}

// Storing previous value
function usePrevious(value) {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

function Counter() {
    const [count, setCount] = useState(0);
    const prevCount = usePrevious(count);

    return (
        <p>
            Current: {count}, Previous: {prevCount}
        </p>
    );
}
```

### useLayoutEffect

```jsx
import { useLayoutEffect, useRef, useState } from 'react';

function Tooltip({ children, text }) {
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const ref = useRef(null);

    // useLayoutEffect runs synchronously after DOM mutations
    // but before browser paints
    useLayoutEffect(() => {
        const rect = ref.current.getBoundingClientRect();
        setPosition({
            top: rect.bottom + 10,
            left: rect.left
        });
    }, []);

    return (
        <>
            <span ref={ref}>{children}</span>
            <div
                className="tooltip"
                style={{ top: position.top, left: position.left }}
            >
                {text}
            </div>
        </>
    );
}

// useLayoutEffect vs useEffect:
// - useLayoutEffect: Runs before paint, blocks visual updates
// - useEffect: Runs after paint, doesn't block visual updates
// Use useLayoutEffect for DOM measurements/mutations
```

### useImperativeHandle

```jsx
import { useRef, useImperativeHandle, forwardRef } from 'react';

// Child component with imperative handle
const FancyInput = forwardRef(function FancyInput(props, ref) {
    const inputRef = useRef();

    // Customize the ref exposed to parent
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        },
        clear: () => {
            inputRef.current.value = '';
        },
        getValue: () => inputRef.current.value
    }), []);

    return <input ref={inputRef} {...props} />;
});

// Parent component
function Form() {
    const inputRef = useRef();

    function handleSubmit() {
        console.log(inputRef.current.getValue());
        inputRef.current.clear();
    }

    return (
        <form onSubmit={handleSubmit}>
            <FancyInput ref={inputRef} placeholder="Enter text" />
            <button type="button" onClick={() => inputRef.current.focus()}>
                Focus
            </button>
        </form>
    );
}
```

### useId

```jsx
import { useId } from 'react';

function FormField({ label }) {
    // Generate unique ID for accessibility
    const id = useId();

    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input id={id} type="text" />
        </div>
    );
}

// Multiple IDs from same component
function PasswordField() {
    const id = useId();

    return (
        <>
            <label htmlFor={`${id}-password`}>Password</label>
            <input id={`${id}-password`} type="password" />

            <label htmlFor={`${id}-confirm`}>Confirm</label>
            <input id={`${id}-confirm`} type="password" />
        </>
    );
}
```

### useTransition & useDeferredValue

```jsx
import { useState, useTransition, useDeferredValue } from 'react';

// useTransition - Mark updates as non-urgent
function SearchPage() {
    const [query, setQuery] = useState('');
    const [isPending, startTransition] = useTransition();

    function handleChange(e) {
        const value = e.target.value;

        // Urgent: Update input immediately
        setQuery(value);

        // Non-urgent: Can be interrupted
        startTransition(() => {
            setSearchResults(filterData(value));
        });
    }

    return (
        <div>
            <input value={query} onChange={handleChange} />
            {isPending && <Spinner />}
            <SearchResults />
        </div>
    );
}

// useDeferredValue - Defer updating a value
function SearchResults({ query }) {
    // deferredQuery lags behind query during updates
    const deferredQuery = useDeferredValue(query);
    const isStale = query !== deferredQuery;

    const results = useMemo(() => {
        return filterResults(deferredQuery);
    }, [deferredQuery]);

    return (
        <div style={{ opacity: isStale ? 0.7 : 1 }}>
            {results.map(item => <Result key={item.id} item={item} />)}
        </div>
    );
}
```

---

## Context API

### Creating and Using Context

```jsx
import { createContext, useContext, useState, useMemo } from 'react';

// 1. Create Context with default value
const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {}
});

// 2. Create Provider Component
function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = async (credentials) => {
        const user = await authService.login(credentials);
        setUser(user);
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    // Memoize value to prevent unnecessary re-renders
    const value = useMemo(() => ({
        user,
        login,
        logout,
        isAuthenticated: !!user
    }), [user]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// 3. Custom hook for consuming context
function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

// 4. Use in components
function LoginButton() {
    const { user, login, logout, isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return (
            <button onClick={logout}>
                Logout ({user.name})
            </button>
        );
    }

    return <button onClick={() => login({ email, password })}>Login</button>;
}

// 5. Wrap app with provider
function App() {
    return (
        <AuthProvider>
            <Header />
            <Main />
            <Footer />
        </AuthProvider>
    );
}
```

### Multiple Contexts

```jsx
function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <LanguageProvider>
                    <NotificationProvider>
                        <MainApp />
                    </NotificationProvider>
                </LanguageProvider>
            </ThemeProvider>
        </AuthProvider>
    );
}

// Compose providers helper
function ComposeProviders({ providers, children }) {
    return providers.reduceRight(
        (acc, Provider) => <Provider>{acc}</Provider>,
        children
    );
}

// Usage
<ComposeProviders providers={[AuthProvider, ThemeProvider, LanguageProvider]}>
    <MainApp />
</ComposeProviders>
```

### Context Performance Optimization

```jsx
// Problem: All consumers re-render when any context value changes
const AppContext = createContext();

function AppProvider({ children }) {
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState('light');
    const [notifications, setNotifications] = useState([]);

    // Any change triggers all consumers to re-render!
    const value = { user, setUser, theme, setTheme, notifications };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

// Solution: Split into separate contexts
const UserContext = createContext();
const ThemeContext = createContext();
const NotificationContext = createContext();

function AppProvider({ children }) {
    return (
        <UserProvider>
            <ThemeProvider>
                <NotificationProvider>
                    {children}
                </NotificationProvider>
            </ThemeProvider>
        </UserProvider>
    );
}

// Now components only re-render when their specific context changes
```

---

## Error Boundaries

### Class-Based Error Boundary

```jsx
import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    // Update state when error occurs
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    // Log error details
    componentDidCatch(error, errorInfo) {
        console.error('Error:', error);
        console.error('Error Info:', errorInfo);
        // Send to error tracking service
        logErrorToService(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="error-fallback">
                    <h2>Something went wrong</h2>
                    <button onClick={() => this.setState({ hasError: false })}>
                        Try again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

// Usage
function App() {
    return (
        <ErrorBoundary fallback={<ErrorPage />}>
            <MainContent />
        </ErrorBoundary>
    );
}
```

### Error Boundary with react-error-boundary

```jsx
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div role="alert">
            <h2>Something went wrong:</h2>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    );
}

function App() {
    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={(error, info) => logError(error, info)}
            onReset={() => {
                // Reset app state
            }}
        >
            <MainContent />
        </ErrorBoundary>
    );
}

// Programmatically trigger error boundary
function DataComponent() {
    const { showBoundary } = useErrorBoundary();

    async function fetchData() {
        try {
            const data = await api.fetchData();
            setData(data);
        } catch (error) {
            showBoundary(error);
        }
    }
}
```

---

## Refs and DOM

### Accessing DOM Elements

```jsx
import { useRef, useEffect } from 'react';

function VideoPlayer() {
    const videoRef = useRef(null);

    function play() {
        videoRef.current.play();
    }

    function pause() {
        videoRef.current.pause();
    }

    return (
        <div>
            <video ref={videoRef} src="video.mp4" />
            <button onClick={play}>Play</button>
            <button onClick={pause}>Pause</button>
        </div>
    );
}
```

### Forwarding Refs

```jsx
import { forwardRef, useRef } from 'react';

// Forward ref to child component
const FancyButton = forwardRef(function FancyButton({ children, ...props }, ref) {
    return (
        <button ref={ref} className="fancy-button" {...props}>
            {children}
        </button>
    );
});

// Usage
function Parent() {
    const buttonRef = useRef();

    useEffect(() => {
        buttonRef.current.focus();
    }, []);

    return <FancyButton ref={buttonRef}>Click me</FancyButton>;
}
```

### Callback Refs

```jsx
function MeasuredComponent() {
    const [height, setHeight] = useState(0);

    // Callback ref - called when ref is attached/detached
    const measuredRef = useCallback(node => {
        if (node !== null) {
            setHeight(node.getBoundingClientRect().height);
        }
    }, []);

    return (
        <div ref={measuredRef}>
            <p>This element's height is: {height}px</p>
        </div>
    );
}
```

---

## Higher-Order Components

```jsx
// HOC is a function that takes a component and returns a new component
function withAuth(WrappedComponent) {
    return function WithAuth(props) {
        const { user, isLoading } = useAuth();

        if (isLoading) {
            return <Spinner />;
        }

        if (!user) {
            return <Navigate to="/login" />;
        }

        return <WrappedComponent {...props} user={user} />;
    };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);

// HOC for data fetching
function withData(WrappedComponent, fetchFn) {
    return function WithData(props) {
        const [data, setData] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
            fetchFn(props)
                .then(setData)
                .catch(setError)
                .finally(() => setLoading(false));
        }, [props.id]);

        if (loading) return <Spinner />;
        if (error) return <Error error={error} />;

        return <WrappedComponent {...props} data={data} />;
    };
}

// Usage
const UserProfileWithData = withData(
    UserProfile,
    (props) => fetchUser(props.userId)
);

// HOC for logging
function withLogger(WrappedComponent) {
    return function WithLogger(props) {
        useEffect(() => {
            console.log(`${WrappedComponent.name} mounted`);
            return () => console.log(`${WrappedComponent.name} unmounted`);
        }, []);

        console.log(`${WrappedComponent.name} rendered with props:`, props);
        return <WrappedComponent {...props} />;
    };
}
```

---

## Render Props

```jsx
// Render prop pattern - share code using a prop whose value is a function
function MouseTracker({ render }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return render(position);
}

// Usage
function App() {
    return (
        <MouseTracker
            render={({ x, y }) => (
                <div>
                    Mouse position: {x}, {y}
                </div>
            )}
        />
    );
}

// Children as function (common pattern)
function Toggle({ children }) {
    const [on, setOn] = useState(false);
    const toggle = () => setOn(prev => !prev);

    return children({ on, toggle });
}

// Usage
<Toggle>
    {({ on, toggle }) => (
        <button onClick={toggle}>
            {on ? 'ON' : 'OFF'}
        </button>
    )}
</Toggle>

// Generic data fetcher
function DataFetcher({ url, children }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [url]);

    return children({ data, loading, error });
}

// Usage
<DataFetcher url="/api/users">
    {({ data, loading, error }) => {
        if (loading) return <Spinner />;
        if (error) return <Error error={error} />;
        return <UserList users={data} />;
    }}
</DataFetcher>
```

---

## Custom Hooks

```jsx
// Custom hook for form handling
function useForm(initialValues, validate) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));

        if (validate) {
            const validationErrors = validate(values);
            setErrors(validationErrors);
        }
    };

    const reset = () => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
    };

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        reset,
        setValues
    };
}

// Custom hook for localStorage
function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function
                ? value(storedValue)
                : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue];
}

// Custom hook for API calls
function useApi(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch');
            const json = await response.json();
            setData(json);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}

// Custom hook for debounce
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}

// Custom hook for window size
function useWindowSize() {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return size;
}
```

---

## Portals

```jsx
import { createPortal } from 'react-dom';

// Render children into different DOM node
function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')  // Different DOM node
    );
}

// Tooltip with portal
function Tooltip({ children, text, position }) {
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);
    const ref = useRef();

    const showTooltip = () => {
        const rect = ref.current.getBoundingClientRect();
        setCoords({
            x: rect.left + rect.width / 2,
            y: rect.top - 10
        });
        setVisible(true);
    };

    return (
        <>
            <span
                ref={ref}
                onMouseEnter={showTooltip}
                onMouseLeave={() => setVisible(false)}
            >
                {children}
            </span>
            {visible && createPortal(
                <div
                    className="tooltip"
                    style={{
                        position: 'fixed',
                        left: coords.x,
                        top: coords.y,
                        transform: 'translateX(-50%) translateY(-100%)'
                    }}
                >
                    {text}
                </div>,
                document.body
            )}
        </>
    );
}
```

---

## Suspense & Lazy Loading

```jsx
import { lazy, Suspense } from 'react';

// Lazy load component
const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));
const Profile = lazy(() => import('./Profile'));

// Lazy load with named export
const Chart = lazy(() =>
    import('./Charts').then(module => ({ default: module.LineChart }))
);

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

// Multiple suspense boundaries
function DashboardPage() {
    return (
        <div>
            <h1>Dashboard</h1>

            <Suspense fallback={<ChartSkeleton />}>
                <AnalyticsChart />
            </Suspense>

            <Suspense fallback={<TableSkeleton />}>
                <DataTable />
            </Suspense>
        </div>
    );
}

// Suspense for data (React 18+ with Suspense-enabled libraries)
function UserProfile({ userId }) {
    return (
        <Suspense fallback={<ProfileSkeleton />}>
            <ProfileContent userId={userId} />
        </Suspense>
    );
}

// With react-query/SWR
function ProfileContent({ userId }) {
    const { data: user } = useSuspenseQuery({
        queryKey: ['user', userId],
        queryFn: () => fetchUser(userId)
    });

    return <div>{user.name}</div>;
}
```

---

## Forms & Controlled Components

### Controlled Components

```jsx
function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting:', formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
            />

            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
            />

            <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
            />

            <button type="submit">Send</button>
        </form>
    );
}
```

### Uncontrolled Components

```jsx
function UncontrolledForm() {
    const nameRef = useRef();
    const emailRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            name: nameRef.current.value,
            email: emailRef.current.value
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" ref={nameRef} defaultValue="" />
            <input type="email" ref={emailRef} defaultValue="" />
            <button type="submit">Submit</button>
        </form>
    );
}
```

### Form Libraries (React Hook Form)

```jsx
import { useForm } from 'react-hook-form';

function AdvancedForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
        reset
    } = useForm();

    const onSubmit = async (data) => {
        await submitForm(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                {...register('email', {
                    required: 'Email is required',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email'
                    }
                })}
            />
            {errors.email && <span>{errors.email.message}</span>}

            <input
                type="password"
                {...register('password', {
                    required: 'Password is required',
                    minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters'
                    }
                })}
            />
            {errors.password && <span>{errors.password.message}</span>}

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    );
}
```

---

## State Management Patterns

### Prop Drilling (Avoid)

```jsx
// Problem: Passing props through many levels
function App() {
    const [user, setUser] = useState(null);
    return <Layout user={user} setUser={setUser} />;
}

function Layout({ user, setUser }) {
    return <Sidebar user={user} setUser={setUser} />;
}

function Sidebar({ user, setUser }) {
    return <UserMenu user={user} setUser={setUser} />;
}
```

### Context (for global state)

```jsx
// Better: Use context for widely-used state
const UserContext = createContext();

function App() {
    const [user, setUser] = useState(null);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Layout />
        </UserContext.Provider>
    );
}

function UserMenu() {
    const { user, setUser } = useContext(UserContext);
    // ...
}
```

### State Colocation

```jsx
// Best: Keep state as close to where it's used as possible
function ProductPage() {
    // Page-level state
    const [product, setProduct] = useState(null);

    return (
        <div>
            <ProductInfo product={product} />
            <AddToCartSection product={product} />
            <Reviews productId={product?.id} />
        </div>
    );
}

function AddToCartSection({ product }) {
    // Component-level state (only needed here)
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('M');

    return (
        <div>
            <QuantitySelector value={quantity} onChange={setQuantity} />
            <SizeSelector value={size} onChange={setSize} />
            <AddToCartButton product={product} quantity={quantity} size={size} />
        </div>
    );
}
```

---

## Performance Patterns

### Memoization

```jsx
import { memo, useMemo, useCallback } from 'react';

// Memoize component
const ExpensiveList = memo(function ExpensiveList({ items, onItemClick }) {
    return items.map(item => (
        <ExpensiveItem key={item.id} item={item} onClick={onItemClick} />
    ));
});

// Parent component
function Parent({ data }) {
    // Memoize derived data
    const processedData = useMemo(() => {
        return data.map(item => expensiveTransform(item));
    }, [data]);

    // Memoize callback
    const handleItemClick = useCallback((id) => {
        console.log('Clicked:', id);
    }, []);

    return <ExpensiveList items={processedData} onItemClick={handleItemClick} />;
}
```

### Virtualization

```jsx
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualizedList({ items }) {
    const parentRef = useRef(null);

    const virtualizer = useVirtualizer({
        count: items.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 50,
    });

    return (
        <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
            <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
                {virtualizer.getVirtualItems().map(virtualRow => (
                    <div
                        key={virtualRow.key}
                        style={{
                            position: 'absolute',
                            top: virtualRow.start,
                            height: virtualRow.size,
                            width: '100%',
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

## Best Practices

### Component Design

```jsx
// 1. Single Responsibility
// BAD - Component does too much
function UserDashboard() {
    // Fetches data, handles auth, renders UI, manages state...
}

// GOOD - Split into focused components
function UserDashboard() {
    return (
        <DashboardLayout>
            <UserStats />
            <RecentActivity />
            <Notifications />
        </DashboardLayout>
    );
}

// 2. Props naming
// BAD
<Button click={handleClick} txt="Submit" />

// GOOD
<Button onClick={handleClick} label="Submit" />

// 3. Destructure props
// BAD
function UserCard(props) {
    return <div>{props.user.name}</div>;
}

// GOOD
function UserCard({ user }) {
    return <div>{user.name}</div>;
}

// 4. Default props
function Button({ variant = 'primary', size = 'medium', ...props }) {
    return <button className={`btn-${variant} btn-${size}`} {...props} />;
}
```

### Hooks Rules

```jsx
// 1. Only call hooks at top level
// BAD
if (condition) {
    const [state, setState] = useState();  // ❌
}

// GOOD
const [state, setState] = useState();
if (condition) {
    // use state
}

// 2. Only call hooks in React functions
// BAD
function regularFunction() {
    const [state, setState] = useState();  // ❌
}

// GOOD
function ReactComponent() {
    const [state, setState] = useState();  // ✅
}

function useCustomHook() {
    const [state, setState] = useState();  // ✅
}

// 3. Include all dependencies in useEffect
const [count, setCount] = useState(0);

// BAD - Missing dependency
useEffect(() => {
    document.title = `Count: ${count}`;
}, []);  // ❌ Missing count

// GOOD
useEffect(() => {
    document.title = `Count: ${count}`;
}, [count]);  // ✅
```

### File Organization

```
src/
├── components/
│   ├── common/
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.test.jsx
│   │   │   ├── Button.module.css
│   │   │   └── index.js
│   │   └── Input/
│   ├── features/
│   │   ├── auth/
│   │   └── dashboard/
│   └── layout/
├── hooks/
│   ├── useAuth.js
│   ├── useLocalStorage.js
│   └── useApi.js
├── context/
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
├── utils/
├── services/
└── pages/
```

---

## Quick Reference

```jsx
// State
const [state, setState] = useState(initial);
const [state, dispatch] = useReducer(reducer, initial);

// Side Effects
useEffect(() => { /* effect */ return () => { /* cleanup */ }}, [deps]);
useLayoutEffect(() => { /* sync effect */ }, [deps]);

// Context
const value = useContext(MyContext);

// Refs
const ref = useRef(initialValue);
const callbackRef = useCallback(node => {}, []);

// Memoization
const memoized = useMemo(() => compute(a, b), [a, b]);
const callback = useCallback(() => {}, [deps]);
const MemoComponent = memo(Component);

// Concurrent
const [isPending, startTransition] = useTransition();
const deferredValue = useDeferredValue(value);

// Other
const id = useId();
useImperativeHandle(ref, () => ({ method }));
```

---

*This guide covers all essential React concepts. Master these fundamentals to build robust React applications.*
