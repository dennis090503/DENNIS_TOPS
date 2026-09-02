# Node.js — 50 Interview Questions & Answers

---

## 🟢 Easy — Fundamentals (1–15)

### 1. What is Node.js?
**Interview Answer:** Node.js is a runtime environment that lets you run JavaScript outside the browser, built on Chrome's V8 JavaScript engine. It's commonly used to build fast, scalable server-side applications, especially APIs, because it handles I/O asynchronously and non-blockingly.

### 2. Is Node.js a programming language?
**Interview Answer:** No. Node.js is not a language — it's a runtime environment that executes JavaScript (the language) on the server, using the V8 engine plus additional APIs (like `fs`, `http`) that aren't available in browsers.

### 3. Is Node.js a runtime environment?
**Interview Answer:** Yes, that's exactly what it is — a runtime that provides the environment (event loop, libuv, core modules) needed to execute JavaScript code outside a browser, typically for server-side or command-line applications.

### 4. Why is Node.js popular for backend development?
**Interview Answer:** It lets developers use one language (JavaScript) across the whole stack, its non-blocking, event-driven architecture makes it very efficient for I/O-heavy workloads (APIs, real-time apps), it has npm — the largest package ecosystem — and it's fast to develop with while scaling well for many concurrent connections.

### 5. What is npm?
**Interview Answer:** npm (Node Package Manager) is the default package manager for Node.js. It lets you install, share, and manage third-party libraries/packages, run project scripts, and manage dependency versions through `package.json`.

### 6. What is package.json?
**Interview Answer:** It's the manifest file for a Node.js project — it lists the project's metadata (name, version), its dependencies and devDependencies, npm scripts (like `start`, `test`), and other configuration such as the entry point (`main`).

### 7. What is package-lock.json?
**Interview Answer:** It's an auto-generated file that locks the exact resolved version of every dependency (and sub-dependency) installed, ensuring that everyone on the team — and CI/production — installs identical dependency trees, avoiding "works on my machine" issues caused by version drift.

### 8. What is the difference between dependencies and devDependencies?
**Interview Answer:** `dependencies` are packages required for the app to actually run in production (e.g. Express, Mongoose). `devDependencies` are only needed during development — testing frameworks, linters, build tools (e.g. Jest, ESLint, nodemon) — and aren't installed when you run `npm install --production`.

### 9. What is CommonJS?
**Interview Answer:** CommonJS is the original module system used by Node.js, using `require()` to import and `module.exports`/`exports` to export code. It loads modules synchronously, which works well for server-side code where files are on local disk.

### 10. What is ES Module syntax?
**Interview Answer:** ES Modules (ESM) is the standardized JavaScript module system using `import`/`export` syntax. Node.js supports it either by naming files `.mjs` or by setting `"type": "module"` in `package.json`. Unlike CommonJS, ESM loading can be asynchronous and supports static analysis (tree-shaking).

### 11. Difference between require() and import?
**Interview Answer:** `require()` is CommonJS, synchronous, and can be called conditionally/anywhere in code. `import` is ES Module syntax, generally static (hoisted to the top, can't be called conditionally in standard usage), and supports asynchronous dynamic imports via `import()`. Node supports both, but they can't be mixed freely in the same file without interop considerations.

### 12. What is the Node.js REPL?
**Interview Answer:** REPL stands for Read-Eval-Print-Loop — it's the interactive shell you get by typing `node` in the terminal without a file. It reads JS input, evaluates it, prints the result, and loops, letting you quickly test snippets of JavaScript.

### 13. What is the Node.js event loop?
**Interview Answer:** The event loop is the mechanism that allows Node.js to perform non-blocking I/O despite JavaScript being single-threaded. It continuously checks a queue of callbacks (from completed I/O operations, timers, etc.) and executes them one at a time on the main thread, allowing Node to handle many operations concurrently without creating a thread per request.

### 14. Is Node.js synchronous or asynchronous?
**Interview Answer:** Node.js supports both, but its defining strength is asynchronous, non-blocking execution — most I/O APIs (file system, network, database) are asynchronous by default so the main thread isn't blocked waiting on them. Synchronous versions of many APIs also exist (e.g. `fs.readFileSync`) but block the event loop and are generally avoided in production servers.

### 15. What does non-blocking I/O mean?
**Interview Answer:** It means that when Node.js starts an I/O operation (reading a file, querying a database, making an HTTP request), it doesn't wait around for it to finish — it registers a callback and moves on to execute other code. Once the I/O completes, its callback is placed in a queue and eventually executed by the event loop. This lets a single thread handle many concurrent operations efficiently.

---

## 🟢→🟡 Fundamentals to Practical (16–30)

### 16. What is a callback?
**Interview Answer:** A callback is a function passed as an argument to another function, to be executed later — typically once an asynchronous operation completes. For example, `fs.readFile('file.txt', (err, data) => {...})` — the arrow function is the callback invoked once the file read finishes.

### 17. What is callback hell?
**Interview Answer:** Callback hell is the situation where callbacks are nested inside callbacks inside callbacks (often for sequential async steps), producing deeply indented, hard-to-read, hard-to-maintain "pyramid of doom" code, and making error handling messy since each level needs its own error check.

### 18. How do Promises solve callback hell?
**Interview Answer:** Promises represent a future value of an async operation and let you chain `.then()` calls flatly instead of nesting, plus handle all errors in one `.catch()` at the end of the chain. This flattens the pyramid structure and centralizes error handling, making async sequences much more readable.

### 19. What is async/await?
**Interview Answer:** `async/await` is syntax built on top of Promises that lets you write asynchronous code that *looks* synchronous. An `async` function always returns a Promise, and `await` pauses execution inside that function until the awaited Promise resolves (without blocking the rest of the app), letting you use normal `try/catch` for error handling instead of `.then/.catch` chains.

### 20. Difference between Promise and callback?
**Interview Answer:** A callback is just a plain function invoked when an operation finishes — it has no built-in structure for chaining or centralized error handling, which is what leads to callback hell. A Promise is an object representing an eventual value with defined states (pending/fulfilled/rejected) that supports chaining (`.then`), aggregation (`Promise.all`), and consistent error propagation (`.catch`), and it underlies the cleaner `async/await` syntax.

### 21. What happens when an async function throws an error?
**Interview Answer:** The `async` function's returned Promise automatically rejects with that error, instead of throwing synchronously to the caller. If you `await` that call inside a `try/catch`, the `catch` block handles it; if not caught, it results in an unhandled promise rejection, which Node will log (and can be configured to crash the process).

### 22. What is the fs module?
**Interview Answer:** `fs` (File System) is a core Node.js module for interacting with the file system — reading, writing, updating, deleting, and watching files/directories. It offers synchronous (`readFileSync`), callback-based (`readFile`), and promise-based (`fs.promises.readFile` / `fs/promises`) APIs.

### 23. What is the path module?
**Interview Answer:** `path` is a core module for working with file and directory paths in a cross-platform way — joining paths (`path.join`), resolving absolute paths (`path.resolve`), extracting filenames/extensions (`path.basename`, `path.extname`), and handling differences between Windows (`\`) and POSIX (`/`) separators.

### 24. What is the http module?
**Interview Answer:** `http` is Node's core module for creating HTTP servers and making HTTP requests without any external framework. `http.createServer((req, res) => {...})` creates a raw server that listens for requests and lets you manually handle routing, headers, and responses — this is the low-level foundation frameworks like Express are built on.

### 25. How do you create a basic HTTP server in Node.js?
**Interview Answer:** Using the `http` module:
```js
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});
server.listen(3000, () => console.log('Server running on port 3000'));
```
This creates a server that responds to every request with plain text, listening on port 3000.

### 26. What are environment variables?
**Interview Answer:** Environment variables are key-value pairs available to a process from its operating environment, used to configure an app without hardcoding values — things like database URLs, API keys, and the current environment (`development`/`production`). In Node, they're accessed via `process.env`.

### 27. How do you use .env files?
**Interview Answer:** You put key-value pairs in a `.env` file (e.g. `PORT=3000`, `DB_URL=...`), then use a package like `dotenv` to load them into `process.env` at startup with `require('dotenv').config()`. This keeps secrets and config out of source code (and `.env` should be added to `.gitignore`).

### 28. What is process.env?
**Interview Answer:** `process.env` is a global object in Node that exposes all environment variables available to the running process as string values, e.g. `process.env.PORT`, `process.env.NODE_ENV`.

### 29. What is middleware in Node.js?
**Interview Answer:** In the context of frameworks like Express, middleware is a function that has access to the request, response, and a `next` function, and executes during the request-response cycle — used for logging, authentication, parsing request bodies, error handling, etc. Middleware functions run in sequence, and each can either end the response or call `next()` to pass control to the next one.

### 30. What is the difference between Node.js and browser JavaScript?
**Interview Answer:** They share the same core language (JavaScript, ECMAScript), but different environments and APIs: browsers give you the DOM, `window`, `document`, and `fetch`; Node gives you `fs`, `http`, `process`, module systems (CommonJS/ESM), and no DOM at all. Node is also generally single-process without a UI, focused on server-side execution.

---

## 🟡 Medium — The Event Loop & Core Internals (31–40)

### 31. Explain the Node.js event loop in detail.
**Interview Answer:** The event loop is what allows Node's single JS thread to handle many concurrent operations. When the call stack is empty, the event loop picks up completed callbacks from various queues and pushes them onto the call stack to execute. It processes work in ordered phases (timers, pending callbacks, poll, check, close callbacks), cycling through them repeatedly for the life of the application, while microtasks (Promises, `process.nextTick`) are drained between phases/callbacks.

### 32. What are the different phases of the event loop?
**Interview Answer:** The main phases are: **Timers** (executes callbacks scheduled by `setTimeout`/`setInterval` whose time has elapsed), **Pending callbacks** (executes I/O callbacks deferred from the previous cycle), **Poll** (retrieves new I/O events and executes their callbacks; this is where most work happens), **Check** (executes `setImmediate` callbacks), and **Close callbacks** (handles things like `socket.on('close')`). Microtasks (`process.nextTick` and Promise callbacks) run between each phase transition.

### 33. What is the difference between process.nextTick() and setImmediate()?
**Interview Answer:** `process.nextTick()` schedules a callback to run immediately after the current operation completes, before the event loop continues to the next phase — it has higher priority. `setImmediate()` schedules a callback to run in the Check phase of the event loop, after I/O events in the current cycle. So `nextTick` callbacks always run before `setImmediate` callbacks if both are scheduled at the same point.

### 34. What are streams in Node.js?
**Interview Answer:** Streams are objects that let you read or write data piece-by-piece (in chunks) rather than loading it all into memory at once — essential for handling large files or data over a network efficiently. Node has four types: Readable, Writable, Duplex (both), and Transform (modifies data as it passes through).

### 35. What are readable and writable streams?
**Interview Answer:** A **readable stream** is a source of data you can consume from, like `fs.createReadStream()` reading a file chunk by chunk, or an incoming HTTP request body. A **writable stream** is a destination you can write data to, like `fs.createWriteStream()` or an HTTP response object — you call `.write()` to send chunks and `.end()` to finish.

### 36. What is a Buffer in Node.js?
**Interview Answer:** A Buffer is a fixed-size chunk of raw binary data, used to handle binary data (like file contents or network packets) directly in memory before it's encoded into a string or another format. Buffers exist because JavaScript strings weren't originally designed to handle raw binary data efficiently.

### 37. What is the EventEmitter?
**Interview Answer:** `EventEmitter` is a core Node.js class (from the `events` module) that implements the observer pattern — objects can emit named events (`emitter.emit('event', data)`) and other code can listen for them (`emitter.on('event', callback)`). It's the foundation of many Node APIs, like streams and the `http` server, which are built on top of `EventEmitter`.

### 38. How does Node.js handle multiple requests?
**Interview Answer:** Node uses a single main thread running an event loop for JavaScript execution, but delegates I/O operations (file, network, DNS) to the operating system or to libuv's thread pool. So while one request's I/O is waiting to complete, the event loop is free to process other requests' JavaScript — this lets a single thread handle thousands of concurrent connections efficiently for I/O-bound workloads.

### 39. What happens when CPU-intensive code runs in Node.js?
**Interview Answer:** Since JavaScript execution itself is single-threaded, a long CPU-bound task (heavy computation, large synchronous loops) blocks the event loop entirely — no other requests can be processed until it finishes, which can make the whole server unresponsive. The fix is to offload CPU-heavy work to worker threads, a child process, or an external service, keeping the main thread free.

### 40. What is the difference between setTimeout() and setInterval()?
**Interview Answer:** `setTimeout(fn, delay)` runs a function once after the specified delay. `setInterval(fn, delay)` runs the function repeatedly, once every `delay` milliseconds, until explicitly stopped with `clearInterval()`. Both are handled in the Timers phase of the event loop, and the delay is a minimum, not a guarantee — the actual execution can be delayed if the event loop is busy.

---

## 🔴 Hard — Architecture & Scaling (41–50)

### 41. Why is Node.js considered single-threaded?
**Interview Answer:** Because JavaScript execution in Node happens on a single main thread — there's one call stack and one event loop running your JS code, so only one piece of JS logic executes at any instant. This simplifies reasoning about state (no race conditions from parallel JS execution) but means a single blocking operation can stall everything.

### 42. Is Node.js actually completely single-threaded?
**Interview Answer:** Not entirely — that's a common oversimplification. Your JavaScript code runs on one thread, but Node relies on libuv's thread pool (default 4 threads) under the hood for certain operations like file system access, DNS lookups, and some crypto functions, and it also supports explicit multi-threading via the `worker_threads` module. So the *language execution* is single-threaded, but the *runtime* uses multiple threads internally.

### 43. What is the libuv library?
**Interview Answer:** libuv is the C library that powers Node.js's asynchronous, event-driven architecture. It provides the event loop itself, abstracts asynchronous I/O across platforms (Windows uses different I/O primitives than Linux/macOS), and manages a thread pool for operations that can't be done asynchronously at the OS level (like some file system calls).

### 44. How does Node.js handle file operations without blocking the main thread?
**Interview Answer:** Async file operations (like `fs.readFile`) are delegated to libuv's thread pool, which performs the actual blocking system call on a background thread. Once it completes, libuv notifies the event loop, which then invokes your JS callback on the main thread — so the main thread was never blocked waiting on disk I/O.

### 45. What are worker threads?
**Interview Answer:** The `worker_threads` module lets you run actual multi-threaded JavaScript within a single Node process — each worker runs on its own thread with its own event loop and V8 instance, and can communicate with the main thread via message passing (or shared memory using `SharedArrayBuffer`). This is specifically for offloading CPU-intensive JavaScript work, unlike the libuv thread pool which handles I/O.

### 46. When would you use worker threads?
**Interview Answer:** For CPU-bound tasks that would otherwise block the event loop — image/video processing, complex calculations, data compression, parsing very large files/JSON, or cryptographic hashing of large payloads. If the bottleneck is I/O (network/database calls), worker threads aren't the answer since Node already handles I/O asynchronously — they're specifically for heavy synchronous computation.

### 47. What is clustering in Node.js?
**Interview Answer:** The `cluster` module lets you spawn multiple copies (workers) of your Node process, one per CPU core, all sharing the same server port. The OS/Node load-balances incoming connections across these worker processes, letting you fully utilize multi-core machines since a single Node process only uses one core for JS execution.

### 48. How would you scale a Node.js application?
**Interview Answer:** Vertically, by clustering to use all CPU cores on a machine. Horizontally, by running multiple instances behind a load balancer across several machines/containers (common in Kubernetes or with PM2 in cluster mode). Beyond compute, I'd also cache frequent reads (Redis), use a CDN for static assets, optimize database queries/indexes, use message queues for background jobs, and offload CPU-heavy work to worker threads or separate services.

### 49. How would you debug a memory leak in Node.js?
**Interview Answer:** I'd start by monitoring memory usage over time (`process.memoryUsage()`, or tools like `clinic.js`), then take heap snapshots at different points using the built-in inspector (`node --inspect` + Chrome DevTools) and compare them to see which objects keep growing. Common culprits are: global variables accidentally holding references, event listeners that are added but never removed, unbounded caches, and closures unintentionally retaining large objects. Once identified, I'd fix the reference leak and re-verify with another heap snapshot comparison.

### 50. How would you optimize a Node.js API handling thousands of concurrent requests?
**Interview Answer:** I'd look at several layers: use clustering/horizontal scaling to use all cores/machines; add caching (Redis) for frequently requested, rarely-changing data; ensure all I/O is async/non-blocking and never use sync APIs in request handlers; add database indexes and optimize slow queries; use connection pooling for the database; apply rate limiting to protect against abuse; use a reverse proxy/CDN for static content; enable compression (gzip); and profile with tools like `clinic.js` or `0x` to find actual bottlenecks rather than guessing. Also make sure logging isn't synchronous/blocking under load.

---

## ⭐ Practical Coding Scenarios to Rehearse
- **Basic HTTP server → REST API flow**: create server → define routes → read request (`req.params/query/body`) → validate → call DB → send response → handle errors (try/catch + centralized error middleware).
- **File upload** — typically via Multer (Express) storing to disk or memory, then optionally uploading to cloud storage.
- **JWT authentication** — generate a token on login, verify it on protected routes.
- **Password hashing** — using `bcrypt` to hash on signup and compare on login.
- **API pagination** — `?page=&limit=` query params converted to `skip`/`limit` in the DB query.
- **Rate limiting** — using something like `express-rate-limit` to cap requests per IP/time window.
- **Streams** — piping a large file read stream directly into an HTTP write stream instead of loading it fully into memory.
- **Background jobs** — using a queue (BullMQ/Redis) to process slow tasks outside the request-response cycle.
