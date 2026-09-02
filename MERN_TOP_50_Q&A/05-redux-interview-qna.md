# Redux — 50 Interview Questions & Answers

---

## 🟢 Easy — Fundamentals (1–15)

### 1. What is Redux and why is it used?
**Interview Answer:** Redux is a predictable state management library for JavaScript apps. It centralizes an application's state into a single store, making state changes explicit and traceable through actions and reducers. It's used when state needs to be shared across many unrelated components, avoiding deep prop drilling and making state changes easier to debug and test.

### 2. What problem does Redux solve?
**Interview Answer:** As apps grow, state gets scattered across many components, and sharing/synchronizing it (especially between distant components) becomes messy — prop drilling, inconsistent updates, hard-to-trace bugs. Redux solves this by putting all shared state in one predictable place with a single, well-defined way to change it, making the app's behavior easier to reason about and debug.

### 3. What are the three core principles of Redux?
**Interview Answer:** (1) **Single source of truth** — the entire app state lives in one store. (2) **State is read-only** — the only way to change state is by dispatching an action, never mutating it directly. (3) **Changes are made with pure functions** — reducers take the previous state and an action, and return a new state, without side effects or mutation.

### 4. What are actions in Redux?
**Interview Answer:** An action is a plain JavaScript object describing *what happened* in the app. It must have a `type` field (usually a string) and can carry additional data in a `payload`, e.g. `{ type: 'counter/increment', payload: 1 }`. Actions are the only way to trigger a state change.

### 5. What are reducers in Redux?
**Interview Answer:** A reducer is a pure function with the signature `(state, action) => newState`. It looks at the action type, computes the new state based on the previous state and the action's payload, and returns it — without mutating the original state or causing side effects.

### 6. What is the Redux store?
**Interview Answer:** The store is the single object holding the entire application's state. It exposes `dispatch(action)` to trigger changes, `getState()` to read current state, and `subscribe(listener)` to be notified of state changes. It's typically created once with `configureStore()`.

### 7. What is dispatch()?
**Interview Answer:** `dispatch(action)` is the only way to trigger a state change in Redux — it sends an action to the store, which runs the root reducer with the current state and that action to compute the new state.

### 8. What is the data flow in Redux (unidirectional flow)?
**Interview Answer:** A UI event calls `dispatch(action)` → the store passes the current state and action to the root reducer → the reducer computes and returns new state → the store updates and notifies subscribers → connected components re-render with the new state. This one-way cycle makes state changes predictable and traceable.

### 9. What is an action creator?
**Interview Answer:** An action creator is a function that returns an action object, so you don't have to hand-write the object literal every time, e.g. `const increment = (amount) => ({ type: 'counter/increment', payload: amount })`. In Redux Toolkit, `createSlice` generates these automatically.

### 10. Can you have multiple reducers in a Redux app?
**Interview Answer:** Yes — in practice, you split state into slices, each managed by its own reducer (e.g. `userReducer`, `cartReducer`), and combine them with `combineReducers()` (or automatically via `configureStore`'s `reducer` object) into one root reducer that manages the shape of the overall state tree.

### 11. What is combineReducers()?
**Interview Answer:** `combineReducers()` takes an object mapping state slice names to their individual reducer functions and returns a single root reducer. Each slice reducer only manages its own portion of the state tree, and the combined reducer delegates each action to all of them, assembling the results into one state object.

### 12. Is Redux only used with React?
**Interview Answer:** No — Redux is a framework-agnostic state container; it can be used with any JavaScript UI library or even vanilla JS. `react-redux` is the official binding library that connects Redux to React specifically (via `<Provider>` and hooks like `useSelector`/`useDispatch`), but Redux itself has no dependency on React.

### 13. What is the Provider component in react-redux?
**Interview Answer:** `<Provider store={store}>` wraps your React app and makes the Redux store available to every nested component via React context, so any component can access state or dispatch actions using `useSelector`/`useDispatch` without manually passing the store down as props.

### 14. What is useSelector?
**Interview Answer:** `useSelector(selectorFn)` is a react-redux hook that lets a component read a piece of state from the store, e.g. `const count = useSelector(state => state.counter.value)`. It automatically re-renders the component whenever the selected value changes.

### 15. What is useDispatch?
**Interview Answer:** `useDispatch()` returns the store's `dispatch` function, letting a component dispatch actions directly, e.g. `const dispatch = useDispatch(); dispatch(increment(1));`.

---

## 🟡 Medium — Practical Redux Development (16–35)

### 16. What is Redux Toolkit (RTK), and why is it recommended?
**Interview Answer:** Redux Toolkit is the official, opinionated toolset for Redux that drastically reduces boilerplate: `createSlice()` generates action creators and reducers together, `configureStore()` sets up sensible defaults (thunk middleware, DevTools), and `createAsyncThunk` simplifies async logic. It's recommended because writing "plain" Redux by hand — separate action type constants, action creators, switch-based reducers, manual immutable updates — is verbose and error-prone.

### 17. What is createSlice()?
**Interview Answer:** `createSlice({ name, initialState, reducers })` is an RTK function that generates a reducer function plus matching action creators automatically, based on the reducer functions you define. It removes the need to hand-write action type strings and switch statements.

### 18. How does Immer help inside createSlice reducers?
**Interview Answer:** Redux Toolkit uses Immer internally, which lets you write reducer logic that *looks* like direct mutation (`state.count += 1` or `state.items.push(item)`) while Immer actually tracks those "mutations" and produces a correctly immutable new state object behind the scenes. This removes the need for manual spreading (`{...state}`) while still preserving Redux's immutability guarantee.

### 19. What is configureStore()?
**Interview Answer:** `configureStore()` is RTK's replacement for the older `createStore()`. It combines reducers, automatically adds useful middleware (like `redux-thunk` for async logic and a serializability/immutability check in development), and enables Redux DevTools integration out of the box — with far less manual setup than plain Redux.

### 20. What are the different states an async request typically tracks in Redux?
**Interview Answer:** Typically `status` (`'idle' | 'loading' | 'succeeded' | 'failed'`), the resulting `data`, and an `error` message. This lets the UI show a spinner while loading, the data once succeeded, or an error message if it failed.

### 21. What is createAsyncThunk?
**Interview Answer:** `createAsyncThunk(typePrefix, asyncFn)` wraps an async operation (like an API call) and automatically dispatches three lifecycle actions: `pending` when it starts, `fulfilled` on success (with the resolved value as payload), and `rejected` on failure (with the error). You handle these in a slice's `extraReducers` to update loading/data/error state.

### 22. What is middleware in Redux, and why is it needed?
**Interview Answer:** Middleware sits between dispatching an action and it reaching the reducer, letting you intercept actions — for logging, crash reporting, or (most commonly) async logic. It's needed because reducers must be pure and synchronous, so something else has to handle side effects like API calls before dispatching the final result as a plain action.

### 23. What is redux-thunk?
**Interview Answer:** `redux-thunk` is middleware that lets action creators return a function (instead of a plain action object), which receives `dispatch` and `getState` as arguments. This lets you perform async logic (like fetching data) and dispatch multiple actions over time (`pending`, `success`, `error`) as part of a single async flow. It's included by default in RTK's `configureStore`.

### 24. What is redux-saga, and how does it differ from redux-thunk?
**Interview Answer:** `redux-saga` is an alternative middleware for handling side effects using ES6 generator functions, letting you write complex async flows (like cancellation, retries, race conditions, sequencing multiple sagas) in a more testable, declarative style compared to thunks. Thunks are simpler and sufficient for most apps; sagas shine in apps with genuinely complex async orchestration, at the cost of a steeper learning curve.

### 25. How do you structure a typical Redux Toolkit project ("feature folders" / slice pattern)?
**Interview Answer:** Common practice ("ducks"/feature-folder pattern) is one folder per feature (e.g. `features/cart/cartSlice.js`), each containing its slice (state, reducers, and often async thunks) co-located together, rather than splitting actions/reducers/types into separate top-level folders as in classic Redux. The store's root `configureStore` then just imports and combines each feature's reducer.

### 26. What is a selector, and why use one?
**Interview Answer:** A selector is a function that extracts a specific piece of data from the Redux state, e.g. `selectCartTotal = state => state.cart.items.reduce(...)`. Selectors centralize how state is read, so if the state shape changes later you only update the selector, not every component that reads that data — and they can be memoized for performance.

### 27. What is reselect / createSelector, and what problem does it solve?
**Interview Answer:** `createSelector` (from Reselect, built into RTK) creates memoized selectors — they recompute their result only when their specific input values actually change, caching the result otherwise. This avoids expensive recalculations (e.g. filtering/sorting a large list) on every render/state change when the underlying relevant data hasn't changed.

### 28. How do you handle forms with Redux?
**Interview Answer:** Generally, form input state is best kept as local component state (`useState`) while the user is typing, and only dispatched to the Redux store on submit — since Redux is meant for state that's shared across the app, not every keystroke of a local form. Dispatching on every keystroke works but is usually unnecessary overhead and clutters the global store with transient UI state.

### 29. What is the difference between local component state and Redux state?
**Interview Answer:** Local state (`useState`/`useReducer`) is scoped to a single component and its children — ideal for UI-only concerns like form input, toggle states, or a modal being open. Redux state is global and shared across the app — ideal for data that many unrelated components need, like the logged-in user, cart contents, or cached API data. Not everything needs to go into Redux; overusing it for purely local UI state adds unnecessary complexity.

### 30. How do you connect a class component to Redux (without hooks)?
**Interview Answer:** Using the `connect()` higher-order component from react-redux: `connect(mapStateToProps, mapDispatchToProps)(MyComponent)`. `mapStateToProps` maps store state to props, and `mapDispatchToProps` maps dispatchable action creators to props, so the wrapped component receives them as regular props instead of using hooks (which only work in function components).

### 31. What does mapStateToProps do?
**Interview Answer:** It's a function `(state) => ({...})` passed to `connect()` that selects the pieces of Redux state a component needs and maps them to its props, so the component re-renders whenever those specific pieces of state change.

### 32. What does mapDispatchToProps do?
**Interview Answer:** It's a function or object passed to `connect()` that maps action creators to props, so the component can call them directly as functions (e.g. `this.props.increment()`) instead of manually calling `dispatch(actionCreator())`.

### 33. How does Redux DevTools help during development?
**Interview Answer:** Redux DevTools lets you inspect every dispatched action and the resulting state changes over time, "time-travel" by jumping back to any previous state, and even replay actions — making it much easier to debug exactly what happened and why the UI ended up in a particular state.

### 34. What is normalization of state in Redux, and why do it?
**Interview Answer:** Normalizing means storing relational/nested data in a flat structure — typically an object keyed by ID (`{ byId: {...}, allIds: [...] }`) instead of deeply nested arrays of objects. This avoids duplication, makes updates to a single entity O(1) instead of requiring you to find and update it deep inside a nested structure, and keeps related data consistent across the app. RTK's `createEntityAdapter` automates this pattern.

### 35. What is createEntityAdapter in Redux Toolkit?
**Interview Answer:** `createEntityAdapter` generates a set of reducer functions and selectors for managing a normalized collection of items (like a list of users or products) — handling common operations (add, update, remove, set all) and maintaining the `{ ids: [], entities: {} }` shape automatically, so you don't have to write that normalization logic by hand.

---

## 🔴 Hard — Internals & Architecture (36–50)

### 36. How does Redux achieve immutability, and why does it matter?
**Interview Answer:** Reducers must always return a *new* state object/array instead of mutating the existing one — e.g. spreading (`{...state, count: state.count+1}`) rather than `state.count++`. This matters because Redux and `react-redux` detect changes via reference equality (`prevState !== newState`), not deep comparison — mutating in place keeps the same reference, so the UI won't re-render. It also breaks time-travel debugging, which relies on holding onto past state snapshots without them being altered later.

### 37. Redux vs Context API — when would you choose each?
**Interview Answer:** Context API is built into React and fine for simple, infrequently-changing global data (theme, auth user, locale) in small-to-medium apps — it has no built-in structure for complex updates, middleware, or dev tooling, and can cause broad re-renders since any consumer re-renders on any context value change. Redux is better suited for larger apps with complex, frequently-updated state, cross-cutting logic (undo/redo, caching, optimistic updates), async middleware needs, and powerful dev tools like time-travel debugging. Rule of thumb: start with local state/Context, and reach for Redux only once state logic and cross-component interactions become genuinely complex.

### 38. How does react-redux optimize re-renders?
**Interview Answer:** `useSelector` subscribes a component only to the specific slice of state its selector function returns, and by default does a reference-equality (`===`) check between the previous and new selected value — the component only re-renders if that specific value actually changed, not on every store update. This is why selectors should return primitive values or memoized objects/arrays rather than creating new object/array literals on every call (which would always be "different" by reference and defeat the optimization).

### 39. What is the "stale closure" problem in Redux with async thunks, and how do you avoid it?
**Interview Answer:** If a thunk captures `getState()` at the start of a long-running async operation but the relevant state changes before the operation resolves, logic based on that captured value can act on outdated data. The fix is to call `getState()` again right before you need the value (rather than caching it early), or to design the reducer/thunk so the final dispatched action is self-contained and doesn't depend on assumptions about "current" state at resolution time.

### 40. What is the difference between synchronous and asynchronous action creators?
**Interview Answer:** A synchronous action creator immediately returns a plain action object ready to dispatch. An asynchronous action creator (a thunk) returns a function that performs async work (like an API call) and dispatches one or more plain actions over time as that work progresses — Redux itself only ever receives plain objects; thunk middleware is what allows the function form to exist in between.

### 41. How would you test a Redux reducer?
**Interview Answer:** Since reducers are pure functions, testing is straightforward: call the reducer directly with a given previous state and action, and assert the returned state matches what's expected — no need to render components, mock the DOM, or use a full store. E.g. `expect(counterReducer({ value: 0 }, increment())).toEqual({ value: 1 })`.

### 42. How would you test an async thunk or a component connected to Redux?
**Interview Answer:** For thunks, I'd mock the API call (e.g. with `jest.mock` or `msw`) and dispatch the thunk against a real or mock store, then assert the sequence of dispatched actions (`pending`, `fulfilled`/`rejected`) and resulting state. For connected components, I'd typically render them wrapped in a `<Provider>` with a test store (real reducers, preloaded state, or a lightweight mock store), then assert on rendered output and dispatched actions using a library like React Testing Library.

### 43. How does the Redux store notify subscribers, and what triggers a re-render in a React app?
**Interview Answer:** After each `dispatch()`, the store runs the reducer, updates its internal state, and synchronously calls every function registered via `subscribe()`. In a `react-redux` app, `useSelector` internally subscribes to the store this way; on each notification it re-runs the selector and compares the new result to the previous one by reference — only if they differ does React re-render that component.

### 44. What are the performance pitfalls of overusing Redux, and how do you avoid them?
**Interview Answer:** Putting every piece of state (including purely local/UI state) into Redux bloats the store, causes unnecessary re-renders if selectors aren't precise, and adds unneeded dispatch/action boilerplate for things that don't need to be global. Selectors that return new object/array literals on every call (`state => ({ a: state.a, b: state.b })`) break `useSelector`'s reference-equality optimization and cause re-renders on every store update. Mitigations: keep local state local, use memoized selectors (`createSelector`) for derived/computed data, and select primitive or already-stable values wherever possible.

### 45. How would you structure Redux state for a large-scale application?
**Interview Answer:** I'd organize state by feature/domain (feature-folder/"ducks" pattern) rather than by technical layer, normalize relational data (using `createEntityAdapter` or a similar `{byId, allIds}` shape) to avoid duplication and enable O(1) updates, keep only genuinely shared/cross-cutting state in Redux while leaving local UI state to components, use RTK Query (or a similar caching layer) for server-state/data-fetching concerns instead of hand-rolling loading/error/data patterns in every slice, and write memoized selectors for derived data used across multiple components.

### 46. What is RTK Query, and how does it relate to Redux?
**Interview Answer:** RTK Query is a data-fetching and caching solution built into Redux Toolkit. Instead of manually writing thunks and slices to track loading/error/data state for every API call, you define endpoints declaratively, and RTK Query auto-generates hooks (e.g. `useGetProductsQuery()`) that handle fetching, caching, re-fetching, and cache invalidation — all backed internally by the Redux store, but abstracting away most of the boilerplate a hand-written data-fetching slice would need.

### 47. How does Redux handle deeply nested state updates immutably (in plain Redux, without Immer)?
**Interview Answer:** You have to manually spread every level of nesting that changes, e.g. `{ ...state, user: { ...state.user, address: { ...state.user.address, city: newCity } } }`, creating new objects at each level on the path to the changed value while reusing (not copying) untouched branches. This is exactly the tedious, error-prone pattern Immer (used internally by RTK's `createSlice`) is designed to eliminate.

### 48. What is the difference between the Redux store's state shape and a component's local UI state, in terms of design decisions?
**Interview Answer:** Redux state should generally represent normalized, shared, "source of truth" application/domain data — things multiple components need and that should persist across navigation. Local UI state (is a dropdown open, current form input value, hover state) is usually better left in `useState` close to where it's used, since lifting every small UI detail into Redux adds global-store overhead and dispatch boilerplate without any real benefit — a good heuristic is "if only one component tree needs it and it doesn't need to survive that component unmounting, it probably doesn't belong in Redux."

### 49. How would you implement optimistic updates in Redux?
**Interview Answer:** Immediately dispatch an action that updates the UI state as if the server request already succeeded (e.g. add the new item to the list right away), then fire the actual API call. If it succeeds, no further action is needed (or you reconcile with the server's authoritative response); if it fails, dispatch a rollback action that reverts the optimistic change and shows an error. `createAsyncThunk` supports this pattern well by letting you update state in the `pending` handler and roll it back in `rejected`.

### 50. How would you debug an issue where the Redux store updates but the UI doesn't re-render?
**Interview Answer:** First check Redux DevTools to confirm the action is dispatched and the state actually changed as expected. Then check the component's selector: if it mutates and returns the *same* object reference (e.g. a reducer that mutated state directly instead of returning a new object, outside of Immer's tracked context), `useSelector`'s reference-equality check will see "no change" and skip re-rendering. Also check whether the selector creates a brand-new object/array on every call — ironically that causes the opposite problem (always re-rendering) — versus this issue, which is a stale-reference bug where the selected value's reference never updates. The fix is usually ensuring reducers are truly immutable (or wrapped correctly in `createSlice`) and that selectors return the correct, updated reference.

---

## ⭐ Practical Scenarios to Rehearse
- **Counter app** — the "hello world" of Redux: slice with `increment`/`decrement`/`incrementByAmount` reducers, `useSelector`/`useDispatch` in a component.
- **Fetching data with createAsyncThunk** — dispatch a thunk on mount, handle `pending`/`fulfilled`/`rejected` in `extraReducers`, render loading/error/data states.
- **Shopping cart** — add/remove/update quantity actions, a memoized selector (`createSelector`) computing the cart total.
- **Auth slice** — login thunk that calls an API, stores user + token on success, a logout action that clears state, and a selector like `selectIsAuthenticated`.
- **Normalized entity state** — using `createEntityAdapter` for a list of users/posts, with `selectAll`/`selectById` generated selectors.
- **Optimistic update** — toggling a "like" button instantly, then rolling back if the API call fails.
