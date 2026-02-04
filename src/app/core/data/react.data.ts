import { Flashcard } from '../models/flashcard.model';

export const REACT_CARDS: Flashcard[] = [
  // ═══════════════════════════════════════════════════════
  // CORE CONCEPTS
  // ═══════════════════════════════════════════════════════
  {
    id: 'react-1',
    question: 'What is React and how does it differ from Angular/Vue?',
    answer: 'React is a UI library (not framework) focused on components. Virtual DOM for efficient updates. One-way data flow. Requires additional libraries for routing/state. Angular is full framework, Vue is progressive.',
    codeExample: `// React is declarative and component-based
function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

// Key differences:
// React: Library, JSX, one-way binding
// Angular: Framework, TypeScript, two-way binding
// Vue: Progressive, SFC, reactive system`,
    technology: 'react',
    category: 'Core',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'react-2',
    question: 'What is JSX and how does it work?',
    answer: 'JSX is syntax extension for JavaScript that looks like HTML. Gets compiled to React.createElement() calls. Allows embedding JavaScript with {}. Must return single root element.',
    codeExample: `// JSX
const element = (
  <div className="container">
    <h1>{title}</h1>
    <p>{isLoggedIn ? 'Welcome!' : 'Please log in'}</p>
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  </div>
);

// Compiles to:
const element = React.createElement(
  'div',
  { className: 'container' },
  React.createElement('h1', null, title),
  // ...
);`,
    technology: 'react',
    category: 'JSX',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'react-3',
    question: 'What is the Virtual DOM?',
    answer: 'Virtual DOM is a JavaScript representation of the real DOM. React compares new VDOM with previous (diffing), then updates only changed parts (reconciliation). Makes updates efficient.',
    codeExample: `// How Virtual DOM works:

// 1. State changes trigger re-render
setCount(count + 1);

// 2. React creates new Virtual DOM tree
{
  type: 'div',
  props: { children: [
    { type: 'h1', props: { children: count + 1 } }
  ]}
}

// 3. React diffs new VDOM with old VDOM
// 4. Only changed nodes update real DOM

// Result: Only the h1 text content updates,
// not the entire DOM tree

// Key: React batches updates and applies
// minimal DOM operations for performance`,
    technology: 'react',
    category: 'Core',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // HOOKS
  // ═══════════════════════════════════════════════════════
  {
    id: 'react-4',
    question: 'What is useState and how do you use it?',
    answer: 'useState is a Hook for state in functional components. Returns [value, setter]. Call setter to update and re-render. Can pass function to setter for updates based on previous state.',
    codeExample: `import { useState } from 'react';

function Counter() {
  // [current value, setter function]
  const [count, setCount] = useState(0);
  
  // Direct update
  const reset = () => setCount(0);
  
  // Functional update (when new depends on old)
  const increment = () => setCount(prev => prev + 1);
  
  // Object state
  const [user, setUser] = useState({ name: '', age: 0 });
  const updateName = (name) => setUser(prev => ({
    ...prev,  // Spread previous state
    name      // Override specific field
  }));
  
  return <button onClick={increment}>{count}</button>;
}`,
    technology: 'react',
    category: 'Hooks',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'react-5',
    question: 'What is useEffect and when do you use it?',
    answer: 'useEffect handles side effects: data fetching, subscriptions, DOM manipulation. Runs after render. Dependency array controls when it runs. Return cleanup function for unmount.',
    codeExample: `import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Side effect: fetch data
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(setUser);
    
    // Cleanup function (optional)
    return () => {
      // Runs before next effect or unmount
      console.log('Cleanup');
    };
  }, [userId]); // Dependency array
  
  // Dependency array:
  // []          - Run once on mount
  // [userId]    - Run when userId changes
  // (omit)      - Run after every render (rare)
  
  return <div>{user?.name}</div>;
}`,
    technology: 'react',
    category: 'Hooks',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'react-6',
    question: 'What is useContext and when should you use it?',
    answer: 'useContext accesses context values without prop drilling. Create Context, wrap with Provider, consume with useContext. Good for themes, auth, language. Not a replacement for all state management.',
    codeExample: `import { createContext, useContext, useState } from 'react';

// 1. Create context
const ThemeContext = createContext('light');

// 2. Provider component
function App() {
  const [theme, setTheme] = useState('dark');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Page />
    </ThemeContext.Provider>
  );
}

// 3. Consume anywhere in tree
function Button() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <button 
      className={theme}
      onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
    >
      Toggle Theme
    </button>
  );
}`,
    technology: 'react',
    category: 'Hooks',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'react-7',
    question: 'What is useReducer and when to use it over useState?',
    answer: 'useReducer manages complex state logic with actions. Better than useState when: state has multiple sub-values, next state depends on previous, complex update logic.',
    codeExample: `import { useReducer } from 'react';

// Reducer function
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { 
        ...state, 
        items: state.items.filter(i => i.id !== action.payload) 
      };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      throw new Error(\`Unknown action: \${action.type}\`);
  }
}

function Cart() {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  
  const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
  const clear = () => dispatch({ type: 'CLEAR' });
  
  return <div>{state.items.length} items</div>;
}`,
    technology: 'react',
    category: 'Hooks',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'react-8',
    question: 'What are useMemo and useCallback?',
    answer: 'useMemo memoizes computed VALUES. useCallback memoizes FUNCTIONS. Both prevent unnecessary recalculations/recreations. Use with expensive operations or when passing to memo components.',
    codeExample: `import { useMemo, useCallback, memo } from 'react';

function Parent({ items }) {
  // useMemo: memoize expensive calculation
  const sortedItems = useMemo(() => {
    console.log('Sorting...');
    return [...items].sort((a, b) => a.name.localeCompare(b.name));
  }, [items]); // Only recalculate when items changes
  
  // useCallback: memoize function reference
  const handleClick = useCallback((id) => {
    console.log('Clicked:', id);
  }, []); // Empty deps = never changes
  
  return <Child items={sortedItems} onClick={handleClick} />;
}

// memo prevents re-render if props unchanged
const Child = memo(function Child({ items, onClick }) {
  return items.map(item => (
    <button key={item.id} onClick={() => onClick(item.id)}>
      {item.name}
    </button>
  ));
});`,
    technology: 'react',
    category: 'Hooks',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'react-9',
    question: 'What is useRef and when do you use it?',
    answer: 'useRef holds mutable value that persists across renders without causing re-render. Common uses: DOM refs, storing previous values, timers/intervals.',
    codeExample: `import { useRef, useEffect } from 'react';

function TextInput() {
  // DOM reference
  const inputRef = useRef(null);
  
  // Mutable value (doesn't trigger re-render)
  const renderCount = useRef(0);
  
  useEffect(() => {
    renderCount.current += 1;
    console.log('Renders:', renderCount.current);
  });
  
  const focusInput = () => {
    inputRef.current.focus(); // Access DOM node
  };
  
  // Previous value pattern
  const prevValue = useRef();
  useEffect(() => {
    prevValue.current = value; // Store after render
  }, [value]);
  
  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </>
  );
}`,
    technology: 'react',
    category: 'Hooks',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // COMPONENT PATTERNS
  // ═══════════════════════════════════════════════════════
  {
    id: 'react-10',
    question: 'What is the difference between props and state?',
    answer: 'Props: passed from parent, read-only in child, trigger re-render when changed. State: managed within component, mutable via setter, triggers re-render on update.',
    codeExample: `// PROPS: Data passed from parent (read-only)
function Child({ name, onGreet }) {  // Destructure props
  // ❌ props.name = 'New'; // Cannot modify!
  return <button onClick={onGreet}>{name}</button>;
}

function Parent() {
  return <Child name="Alice" onGreet={() => alert('Hi!')} />;
}

// STATE: Component's internal data (mutable)
function Counter() {
  const [count, setCount] = useState(0);
  // ✅ State can be updated
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

// Key differences:
// Props: External, immutable, passed down
// State: Internal, mutable, managed locally`,
    technology: 'react',
    category: 'Components',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'react-11',
    question: 'What are controlled vs uncontrolled components?',
    answer: 'Controlled: React controls form value via state (recommended). Uncontrolled: DOM controls value, accessed via ref. Controlled enables validation, formatting, conditional logic.',
    codeExample: `// CONTROLLED: State is single source of truth
function ControlledForm() {
  const [email, setEmail] = useState('');
  
  return (
    <input 
      value={email}
      onChange={e => setEmail(e.target.value)}
    />
  );
}

// UNCONTROLLED: DOM manages value
function UncontrolledForm() {
  const inputRef = useRef();
  
  const handleSubmit = () => {
    console.log(inputRef.current.value);
  };
  
  return <input ref={inputRef} defaultValue="initial" />;
}

// Use controlled for:
// - Validation on change
// - Formatting (phone numbers, currency)
// - Conditional submit button
// - Multiple inputs with one handler`,
    technology: 'react',
    category: 'Forms',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'react-12',
    question: 'What is the key prop and why is it important?',
    answer: 'key helps React identify which items changed, added, or removed in lists. Must be unique among siblings. Should be stable (not array index for dynamic lists). Enables efficient reconciliation.',
    codeExample: `function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        // ✅ Using unique stable ID
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

// ❌ BAD: Using index as key (problems with reordering/deletion)
todos.map((todo, index) => <li key={index}>{todo.text}</li>);

// ❌ BAD: Unstable key (regenerates on each render)
todos.map(todo => <li key={Math.random()}>{todo.text}</li>);

// Why it matters:
// Without key: React may reuse wrong elements
// With stable key: React correctly identifies changes
// Result: Proper state preservation, efficient updates`,
    technology: 'react',
    category: 'Components',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // ADVANCED PATTERNS
  // ═══════════════════════════════════════════════════════
  {
    id: 'react-13',
    question: 'What are Higher-Order Components (HOC)?',
    answer: 'HOC is a function that takes a component and returns enhanced component. Used for cross-cutting concerns: auth, logging, styling. Pattern replaced by hooks in many cases.',
    codeExample: `// HOC: Function that takes component, returns enhanced component
function withAuth(WrappedComponent) {
  return function WithAuth(props) {
    const { user, loading } = useAuth();
    
    if (loading) return <Spinner />;
    if (!user) return <Redirect to="/login" />;
    
    return <WrappedComponent {...props} user={user} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);

// Common HOCs in libraries:
// - connect() from Redux
// - withRouter() from React Router
// - withStyles() from Material-UI

// Modern alternative: Custom hooks
function useAuth() {
  // Same logic, more composable
}`,
    technology: 'react',
    category: 'Patterns',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'react-14',
    question: 'What is React.lazy and Suspense?',
    answer: 'React.lazy enables code-splitting by loading components lazily. Suspense shows fallback while loading. Reduces initial bundle size. Use for routes and large components.',
    codeExample: `import { lazy, Suspense } from 'react';

// Lazy load component
const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));

function App() {
  return (
    <Router>
      {/* Suspense provides fallback during load */}
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

// Named exports require wrapper
const MyComponent = lazy(() => 
  import('./MyModule').then(module => ({
    default: module.MyComponent
  }))
);`,
    technology: 'react',
    category: 'Performance',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'react-15',
    question: 'What is React.memo and when should you use it?',
    answer: 'React.memo is a HOC that memoizes component, skipping re-render if props unchanged. Use for expensive components with same props. Can provide custom comparison function.',
    codeExample: `import { memo } from 'react';

// Basic memo - shallow prop comparison
const ExpensiveList = memo(function ExpensiveList({ items }) {
  console.log('Rendering list...');
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
});

// Custom comparison
const UserCard = memo(
  function UserCard({ user }) {
    return <div>{user.name}</div>;
  },
  (prevProps, nextProps) => {
    // Return true to skip re-render
    return prevProps.user.id === nextProps.user.id;
  }
);

// ⚠️ Don't overuse! Memo has overhead.
// Use when:
// - Component renders often with same props
// - Component is expensive to render
// - Parent re-renders frequently`,
    technology: 'react',
    category: 'Performance',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  }
];
