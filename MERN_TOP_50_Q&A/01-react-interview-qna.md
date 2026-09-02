# React — 50 Interview Questions & Answers

Format: each question has a ready-to-say **Interview Answer**, and where the topic naturally invites a follow-up, a **Likely follow-up** section is included.

---

## 🟢 Easy — Fundamentals (1–15)

### 1. What is React?
**Interview Answer:** React is a JavaScript library for building user interfaces, created by Facebook (Meta). It lets you build encapsulated, reusable UI components that manage their own state, and it uses a declarative style — you describe *what* the UI should look like for a given state, and React handles updating the DOM to match.

### 2. Why is React used?
**Interview Answer:** It's used because it makes building complex, interactive UIs manageable: component reusability, a declarative programming model, the Virtual DOM for efficient updates, a huge ecosystem, strong community support, and a one-way data flow that makes apps easier to debug and reason about.

### 3. What are the main features of React?
**Interview Answer:** JSX syntax, component-based architecture, Virtual DOM, one-way data binding, hooks for state and lifecycle in functional components, unidirectional data flow, and support for server-side rendering (via frameworks like Next.js).

### 4. What is a component in React?
**Interview Answer:** A component is an independent, reusable piece of UI — essentially a JavaScript function (or class) that returns JSX describing what should render on screen. Components can be composed together to build complex UIs from small building blocks.

**Likely follow-up — What are the types of components?**
Functional components (plain JS functions returning JSX, now the standard with hooks) and class components (ES6 classes extending `React.Component`, used before hooks existed).

### 5. What is the difference between functional and class components?
**Interview Answer:** Functional components are plain functions that return JSX and use hooks (`useState`, `useEffect`, etc.) for state and side effects. Class components extend `React.Component`, use `this.state` and `this.setState()`, and have lifecycle methods like `componentDidMount`. Functional components are shorter, easier to test, and are now the recommended approach; class components are mostly seen in legacy code.

### 6. What is JSX?
**Interview Answer:** JSX (JavaScript XML) is a syntax extension that lets you write HTML-like markup directly inside JavaScript. It makes component structure easier to read and write, and it compiles down to `React.createElement()` calls under the hood.

### 7. Why do we use JSX?
**Interview Answer:** It makes code more readable and intuitive by keeping markup and logic together, catches errors at compile time, and lets you use full JavaScript expressions inside your markup (via `{}`), which is more powerful than string-based templating.

### 8. Can browsers directly understand JSX?
**Interview Answer:** No. Browsers only understand plain JavaScript. JSX must be transpiled (usually by Babel) into `React.createElement()` calls before it can run in the browser. Build tools like Vite, Webpack, or CRA handle this automatically.

### 9. What is the Virtual DOM?
**Interview Answer:** The Virtual DOM is a lightweight, in-memory JavaScript representation of the real DOM. When state changes, React creates a new Virtual DOM tree, compares (diffs) it against the previous one, and then applies only the minimal set of changes needed to the real DOM — this process is called reconciliation.

### 10. How is Virtual DOM different from the real DOM?
**Interview Answer:** The real DOM is the actual browser structure — updating it is slow because it triggers layout, reflow, and repaint. The Virtual DOM is just a plain JS object, so creating and comparing it is cheap. React batches and minimizes real DOM writes by diffing virtual trees first, which is much faster for frequent UI updates.

### 11. What are props in React?
**Interview Answer:** Props ("properties") are read-only inputs passed from a parent component to a child component. They let you customize and configure components, similar to function arguments. Props flow one way — from parent to child — and a child cannot modify the props it receives.

### 12. What is state in React?
**Interview Answer:** State is data that is local to a component and can change over time, usually as a result of user interaction or network response. When state updates, React re-renders the component to reflect the new data. In functional components, state is managed with the `useState` hook.

### 13. What is the difference between props and state?
**Interview Answer:** Props are passed in from outside (parent to child) and are immutable from the child's perspective. State is owned and managed internally by the component itself and can be updated with `setState`/`useState`. Props configure a component; state represents its internal, changing data.

### 14. What is one-way data binding in React?
**Interview Answer:** It means data flows in a single direction — from parent components down to child components via props. Children can't directly change the data they receive; instead, they must call a function passed down by the parent to request a change. This makes data flow predictable and easier to debug compared to two-way binding.

### 15. What is conditional rendering?
**Interview Answer:** It's rendering different UI based on a condition, using normal JavaScript — `if` statements, ternary operators (`condition ? A : B`), or logical `&&` operators inside JSX. For example, showing a spinner while `loading` is true and the actual content once it's false.

---

## 🟢→🟡 Fundamentals to Practical (16–30)

### 16. What is the useState hook?
**Interview Answer:** `useState` is a hook that adds state to a functional component. It returns an array: the current state value and a setter function to update it, e.g. `const [count, setCount] = useState(0)`. Calling the setter triggers a re-render with the new value.

### 17. How does useState work?
**Interview Answer:** On the first render, `useState(initialValue)` creates a state variable and stores it internally in React's fiber tree tied to that component instance. Calling the setter schedules a re-render; React then re-runs the component function, and `useState` on that hook "slot" returns the updated value instead of the initial one. React relies on hooks being called in the same order every render to track which state belongs to which `useState` call.

### 18. Why should we not directly modify state?
**Interview Answer:** Directly mutating state (e.g. `state.value = 5`) doesn't trigger a re-render because React compares references to detect changes — it won't know anything changed. It also breaks predictability and can cause subtle bugs with batching and stale closures. Always use the setter function and treat state as immutable (create new objects/arrays instead of mutating existing ones).

### 19. What is useEffect?
**Interview Answer:** `useEffect` is a hook for handling side effects in functional components — things like data fetching, subscriptions, timers, or manually interacting with the DOM. It runs after the component renders, and it replaces lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` from class components.

### 20. When does useEffect execute?
**Interview Answer:** By default, it runs after every render (both mount and update). Its exact timing depends on the dependency array: with no array, it runs after every render; with an empty array `[]`, it runs once after the initial mount; with dependencies `[a, b]`, it runs after mount and then again whenever `a` or `b` changes.

### 21. What is the dependency array in useEffect?
**Interview Answer:** It's the second argument to `useEffect`, a list of values the effect depends on. React compares each value in the array between renders, and only re-runs the effect if at least one value has changed. This lets you control exactly when the side effect should fire.

### 22. What happens if you don't provide a dependency array?
**Interview Answer:** The effect runs after every single render of the component — mount and every update — which can cause performance issues or infinite loops if the effect itself triggers a state update.

### 23. What happens if you provide an empty dependency array?
**Interview Answer:** The effect runs exactly once, right after the initial mount, and never again (unless the component unmounts and remounts). This is the common pattern for "run once" logic like an initial API call.

### 24. How do you fetch API data in React?
**Interview Answer:** Typically inside a `useEffect` with an empty dependency array, using `fetch` or a library like Axios, storing the result in state via `useState`. For example: call the API inside the effect, update a `data` state on success and an `error` state on failure, and use a `loading` state to control the UI in between. In real apps, this is often abstracted into a custom hook or handled by a data-fetching library like React Query.

### 25. How do you handle loading and error states?
**Interview Answer:** Keep three pieces of state: `data`, `loading`, and `error`. Set `loading` to true before the request, set `data` on success, catch and set `error` on failure, and always set `loading` to false in a `finally` block. In JSX, conditionally render a spinner, an error message, or the actual data based on these flags.

### 26. What is event handling in React?
**Interview Answer:** React wraps native DOM events in a cross-browser wrapper called SyntheticEvent and lets you attach handlers directly in JSX using camelCase props like `onClick`, `onChange`, `onSubmit`. You pass a function reference (not a string, unlike plain HTML), e.g. `<button onClick={handleClick}>`.

### 27. How do you pass data from parent to child?
**Interview Answer:** Via props — the parent passes values as attributes on the child element, e.g. `<Child name="Alex" />`, and the child reads them through its `props` parameter (or destructures them directly), e.g. `function Child({ name }) { ... }`.

### 28. How do you pass data from child to parent?
**Interview Answer:** The parent passes a callback function down to the child as a prop. The child calls that function (optionally with arguments) when something happens, effectively "lifting" data back up. For example, the parent defines `handleData(value)` and passes it as `onData={handleData}`; the child calls `onData(someValue)`.

### 29. What is prop drilling?
**Interview Answer:** Prop drilling is when you need to pass data through several layers of components that don't actually use the data themselves, just to get it from a top-level component to a deeply nested one. It makes code harder to maintain because every intermediate component has to know about and forward props it doesn't care about.

### 30. How can prop drilling be avoided?
**Interview Answer:** Common solutions are the Context API (for app-wide or subtree-wide data like theme or auth), state management libraries (Redux, Zustand, Jotai) for larger apps, or component composition (passing components as `children` instead of data down multiple levels).

---

## 🟡 Medium — Practical Development (31–40)

### 31. What are controlled components?
**Interview Answer:** A controlled component is a form element (input, textarea, select) whose value is driven entirely by React state. The value comes from state, and every change is handled through an `onChange` handler that updates that state — so React is the single source of truth for the input's value.

### 32. What are uncontrolled components?
**Interview Answer:** An uncontrolled component manages its own state internally in the DOM, and React accesses its current value only when needed, typically via a `ref` (e.g. `inputRef.current.value`) rather than tracking every keystroke in state.

### 33. Controlled vs uncontrolled components?
**Interview Answer:** Controlled components give you full control and make validation, conditional logic, and dynamic behavior easy, but require more boilerplate (state + onChange for every field). Uncontrolled components are simpler and closer to plain HTML forms, useful for quick forms or integrating with non-React code, but harder to validate or react to changes in real time. Most production React forms use controlled components, often via a library like React Hook Form or Formik.

### 34. What is useRef?
**Interview Answer:** `useRef` returns a mutable object with a `.current` property that persists across renders without causing a re-render when it changes. It's commonly used to reference DOM elements directly (e.g. focusing an input) or to store any mutable value that shouldn't trigger a re-render, like a previous value or a timer ID.

### 35. What is the difference between useRef and useState?
**Interview Answer:** Updating state with `useState` triggers a re-render; updating a ref's `.current` value does not. State is meant for values that affect what's rendered; refs are meant for values you need to persist or mutate without affecting the render output, like DOM nodes or interval IDs.

### 36. What is useMemo?
**Interview Answer:** `useMemo` memoizes the *result* of an expensive calculation. It re-runs the calculation only when one of its dependencies changes, and returns the cached value otherwise — useful for avoiding expensive recomputation on every render, e.g. filtering or sorting a large list.

### 37. What is useCallback?
**Interview Answer:** `useCallback` memoizes a *function definition* itself, returning the same function reference between renders as long as its dependencies haven't changed. This is useful when passing callbacks to memoized child components (`React.memo`) to prevent them from re-rendering unnecessarily due to a "new" function reference every render.

### 38. Difference between useMemo and useCallback?
**Interview Answer:** `useMemo` caches a computed *value*; `useCallback` caches a *function*. In fact, `useCallback(fn, deps)` is functionally equivalent to `useMemo(() => fn, deps)`. Use `useMemo` for expensive calculations, and `useCallback` when you need a stable function reference, typically to prevent child re-renders.

### 39. What is React.memo()?
**Interview Answer:** `React.memo` is a higher-order component that wraps a functional component and skips re-rendering it if its props haven't changed (using a shallow comparison by default). It's the functional-component equivalent of `PureComponent` and is useful for optimizing components that render often with the same props.

### 40. When should you optimize a React component?
**Interview Answer:** Only when there's a measurable performance problem — premature optimization adds complexity for no benefit. Good signals are: a component re-renders very frequently with unchanged props, it does expensive computation on every render, or profiling (React DevTools Profiler) shows it as a bottleneck. Typical fixes: `React.memo`, `useMemo`, `useCallback`, code-splitting, and virtualization for long lists.

---

## 🔴 Hard — Internals & Architecture (41–50)

### 41. Explain the React reconciliation process.
**Interview Answer:** Reconciliation is the algorithm React uses to figure out what changed between two Virtual DOM trees and update the real DOM efficiently. Instead of comparing every node exhaustively (which would be O(n³)), React uses heuristics: it assumes elements of different types produce different trees (so it tears down and rebuilds instead of diffing deeper), and it uses `key` props to match items in a list between renders. This reduces the diffing complexity to roughly O(n).

### 42. How does React decide which components need to re-render?
**Interview Answer:** A component re-renders when its own state changes, when it receives new props, when its parent re-renders (by default, children re-render too, regardless of whether their props changed — unless wrapped in `React.memo`), or when a context value it consumes changes. React then diffs the new Virtual DOM output against the previous one to decide what actually needs to change in the real DOM.

### 43. Why are keys important when rendering lists?
**Interview Answer:** Keys give React a stable identity for each item in a list across renders, so it can correctly match old elements to new ones during reconciliation — determining what was added, removed, or reordered — instead of assuming positional correspondence. Without proper keys, React may unnecessarily re-render, lose component state, or update the wrong DOM nodes when the list changes.

### 44. What problems can occur when using array indexes as keys?
**Interview Answer:** If the list order can change (items inserted, removed, or reordered), using the index as a key means React associates state and DOM nodes with a *position*, not the actual item — this can cause incorrect UI state (e.g. an input's typed value "jumping" to the wrong row), unnecessary re-renders, and subtle bugs. Index keys are only safe for static, never-reordered lists.

### 45. What is the difference between re-rendering and remounting?
**Interview Answer:** Re-rendering means React re-runs the component function to compute new output, but the component instance and its state are preserved. Remounting means the old component instance is destroyed (state is lost, cleanup effects run) and a brand-new instance is created from scratch — this happens when a component's `key` changes, or when it's replaced by a different element type at the same position in the tree.

### 46. What are custom hooks and why are they useful?
**Interview Answer:** A custom hook is a JavaScript function whose name starts with `use` and that calls other hooks inside it, letting you extract and reuse stateful logic across multiple components — for example, a `useFetch(url)` hook that encapsulates loading/error/data state and the fetch logic. They're useful because they keep components clean and let you share behavior without duplicating code or resorting to higher-order components/render props.

### 47. Explain the Rules of Hooks.
**Interview Answer:** Two core rules: (1) only call hooks at the top level of a function component or custom hook — never inside loops, conditions, or nested functions — because React relies on the *order* hooks are called in to associate state correctly across renders; (2) only call hooks from React function components or from other custom hooks, not from regular JavaScript functions. ESLint's `eslint-plugin-react-hooks` enforces these automatically.

### 48. What is Context API and when should you use it?
**Interview Answer:** The Context API lets you share data across a component tree without manually passing props at every level. You create a context with `createContext`, wrap a subtree in a `<Context.Provider value={...}>`, and any descendant can read it with `useContext`. It's ideal for relatively static, app-wide data like theme, authenticated user, or locale — not for very frequently changing state, since every consumer re-renders when the context value changes.

### 49. Context API vs Redux — when would you choose each?
**Interview Answer:** Context API is built into React, simple to set up, and great for low-frequency, app-wide data (theme, auth, locale) in small-to-medium apps. Redux (or similar libraries like Zustand) is better for complex, frequently-updated global state, when you need powerful dev tools (time-travel debugging), middleware (logging, async flows via thunks/sagas), or strict predictable state updates across a large app with many interacting features. Rule of thumb: start with Context/local state, and reach for a dedicated state library only once state logic becomes genuinely complex.

### 50. How would you optimize a large React application suffering from slow rendering?
**Interview Answer:** I'd approach it systematically: first profile with React DevTools Profiler to find the actual bottleneck rather than guessing. Common fixes include: memoizing expensive components with `React.memo`, memoizing values/functions with `useMemo`/`useCallback`, splitting state so unrelated updates don't re-render the whole tree, virtualizing long lists (e.g. `react-window`), code-splitting with `React.lazy`/`Suspense` to reduce initial bundle size, avoiding unnecessary context re-renders by splitting contexts, and moving expensive computations out of the render path (web workers if truly CPU-heavy). The key is measure first, then fix the specific bottleneck.

---

## ⭐ Practical Coding Scenarios to Rehearse
Be ready to talk through (or live-code) these, describing state, effects, and data flow at each step:
- **Todo app** — state array of todos, add/remove/toggle handlers, controlled input for new todo text.
- **Fetch products from an API** — `useEffect` + `useState` for data/loading/error.
- **Search & filtering** — controlled input, filter array in render or via `useMemo`.
- **Pagination** — page state, slice data or request `?page=&limit=` from API.
- **Login form** — controlled inputs, validation, submit handler calling an API, storing auth state.
- **Protected routes** — check auth state/token, redirect via React Router if absent.
- **Debounced search** — `useEffect` with `setTimeout`/cleanup, or a custom `useDebounce` hook.
- **Reusable modal** — controlled open/close state, portal rendering, `children` prop for content.
- **Infinite scrolling** — `IntersectionObserver` or scroll listener to fetch more data and append to state.
- **Optimizing a list of thousands of items** — virtualization (`react-window`), `React.memo` on row components, stable keys.
