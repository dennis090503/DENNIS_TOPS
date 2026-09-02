# Express.js — 50 Interview Questions & Answers

---

## 🟢 Easy — Fundamentals (1–15)

### 1. What is Express.js?
**Interview Answer:** Express is a minimal, unopinionated web framework for Node.js that simplifies building web servers and APIs. It provides routing, middleware support, and utilities for handling requests/responses on top of Node's raw `http` module, without forcing a rigid project structure.

### 2. Why do we use Express with Node.js?
**Interview Answer:** Building a server with raw Node `http` means manually parsing URLs, methods, request bodies, and routing — Express abstracts all of that into a clean API (`app.get()`, `app.post()`, middleware chains), dramatically reducing boilerplate and making REST API development faster and more maintainable.

### 3. What is an Express application?
**Interview Answer:** It's the object created by calling `express()`, which represents your web server instance. You configure it with routes, middleware, and settings, then call `.listen(port)` on it to start accepting connections.

### 4. How do you create an Express server?
**Interview Answer:**
```js
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World'));

app.listen(3000, () => console.log('Server running on port 3000'));
```

### 5. What is a route?
**Interview Answer:** A route defines how the application responds to a client request for a specific endpoint — a combination of an HTTP method (GET, POST, etc.) and a URL path, e.g. `app.get('/users', handlerFunction)`.

### 6. What is routing?
**Interview Answer:** Routing is the overall mechanism of determining how an application responds to different combinations of HTTP method and URL path — mapping incoming requests to the correct handler functions.

### 7. What are HTTP methods?
**Interview Answer:** HTTP methods (verbs) indicate the desired action for a resource: `GET` (retrieve data), `POST` (create data), `PUT` (replace/update data), `PATCH` (partially update data), and `DELETE` (remove data) are the most common ones used in REST APIs.

### 8. Difference between GET and POST?
**Interview Answer:** `GET` requests retrieve data and should have no side effects (idempotent, safe) — parameters are typically passed in the URL as query strings, and data can be cached/bookmarked. `POST` requests create/submit data and can have side effects — data is sent in the request body, isn't cached by default, and isn't idempotent (submitting twice can create two resources).

### 9. Difference between PUT and PATCH?
**Interview Answer:** `PUT` is meant to replace an entire resource with the data provided — if you omit a field, it may be treated as removed/reset. `PATCH` is meant for partial updates — you send only the fields that should change, leaving the rest of the resource untouched.

### 10. What is req?
**Interview Answer:** `req` (request) is an object representing the incoming HTTP request, containing everything about it — the URL, headers, query parameters (`req.query`), route parameters (`req.params`), body (`req.body`), cookies, and more.

### 11. What is res?
**Interview Answer:** `res` (response) is the object used to send a response back to the client — setting status codes (`res.status(200)`), sending JSON (`res.json(data)`), plain text/HTML (`res.send()`), redirects (`res.redirect()`), and setting headers/cookies.

### 12. What is req.params?
**Interview Answer:** `req.params` holds route parameters — dynamic segments of the URL path defined with a colon, e.g. for a route `/users/:id`, requesting `/users/42` gives `req.params.id === "42"`.

### 13. What is req.query?
**Interview Answer:** `req.query` holds the parsed query string parameters from the URL, e.g. for `/products?page=2&limit=10`, `req.query` is `{ page: "2", limit: "10" }`.

### 14. What is req.body?
**Interview Answer:** `req.body` holds the parsed body of the request (typically from POST/PUT/PATCH requests), such as JSON or form data. It requires body-parsing middleware (`express.json()` or `express.urlencoded()`) to be populated — without it, `req.body` is `undefined`.

### 15. What is res.json()?
**Interview Answer:** `res.json(data)` sends a JSON response to the client — it automatically sets the `Content-Type` header to `application/json` and serializes the given JavaScript object/array into a JSON string.

---

## 🟢→🟡 Fundamentals to Practical (16–30)

### 16. What is middleware in Express?
**Interview Answer:** Middleware is a function with the signature `(req, res, next)` that executes during the request-response cycle, with access to the request and response objects. It can run code, modify `req`/`res`, end the response, or call `next()` to pass control to the next middleware/route handler in the chain.

### 17. Why is middleware important?
**Interview Answer:** It lets you compose cross-cutting concerns — logging, authentication, body parsing, validation, error handling, CORS — as small, reusable, ordered functions instead of duplicating that logic in every route handler. It's the core architectural pattern that makes Express flexible.

### 18. What is app.use()?
**Interview Answer:** `app.use()` registers middleware that runs for every request (or every request matching a given path prefix if specified), regardless of HTTP method. E.g. `app.use(express.json())` applies JSON body-parsing to all incoming requests.

### 19. What is express.json()?
**Interview Answer:** It's built-in middleware that parses incoming requests with a `Content-Type: application/json` body, converting the raw JSON text into a JavaScript object available at `req.body`.

### 20. What is express.urlencoded()?
**Interview Answer:** It's built-in middleware that parses incoming requests with URL-encoded payloads (typical of HTML form submissions, `Content-Type: application/x-www-form-urlencoded`), populating `req.body` accordingly. The `{ extended: true }` option allows parsing of nested objects/arrays using the `qs` library.

### 21. What is express.Router()?
**Interview Answer:** `express.Router()` creates a mini, self-contained router instance — a mountable set of routes and middleware — that you can define in a separate file and then attach to the main app with `app.use('/prefix', router)`. It's the standard way to organize routes by feature/resource.

### 22. Why should we use Express routers?
**Interview Answer:** They keep route definitions modular and organized by feature (e.g. `userRoutes.js`, `productRoutes.js`) instead of dumping every route into one massive file, make the codebase easier to navigate and maintain, and let you apply middleware scoped to just that router.

### 23. What is route-level middleware?
**Interview Answer:** Middleware bound to a specific route (or router), rather than the whole app — e.g. `app.get('/admin', authMiddleware, adminController)` runs `authMiddleware` only for requests to `/admin`, not for every route in the app.

### 24. What is application-level middleware?
**Interview Answer:** Middleware bound to the app instance with `app.use()` or `app.METHOD()`, applying either globally to all routes or to routes under a specific path prefix — e.g. `app.use(express.json())` applies to the entire application.

### 25. What is error-handling middleware?
**Interview Answer:** A special middleware function with **four** parameters — `(err, req, res, next)` — instead of the usual three. Express recognizes this signature and routes errors to it (either passed via `next(err)` or thrown in an async handler with proper wrapping). It's typically defined last, after all other routes/middleware, to catch and format errors centrally.

### 26. What does next() do?
**Interview Answer:** `next()` passes control to the next middleware function in the stack. Calling `next()` with no arguments moves to the next handler normally; calling `next(err)` skips all remaining normal middleware and jumps straight to the nearest error-handling middleware.

### 27. What happens if middleware doesn't call next()?
**Interview Answer:** The request-response cycle stalls — if that middleware doesn't send a response either (e.g. via `res.send()`/`res.json()`), the client's request will hang indefinitely (until it times out), since no further code will run to complete it.

### 28. How do you handle 404 errors?
**Interview Answer:** By adding a catch-all middleware *after* all defined routes but before the error handler, which runs only if no earlier route matched:
```js
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
```

### 29. How do you handle global errors?
**Interview Answer:** With a centralized error-handling middleware (four-argument signature) placed at the very end of the middleware stack, which formats and sends error responses consistently:
```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({ message: err.message || "Server error" });
});
```
All routes/middleware forward errors here via `next(err)` (or via an async wrapper that catches rejected promises automatically).

### 30. How do you organize an Express project?
**Interview Answer:** A common structure separates concerns into folders: `routes/` (route definitions), `controllers/` (request-handling logic), `models/` (Mongoose schemas), `middleware/` (auth, validation, error handling), `config/` (DB connection, environment setup), and `utils/` (helpers). This keeps each file focused and the app easy to navigate as it grows.

---

## 🟡 Medium — Building Real APIs (31–40)

### 31. How do you connect Express with MongoDB?
**Interview Answer:** Typically via Mongoose: `mongoose.connect(process.env.DB_URL)` establishes the connection (usually in a config/db setup file, called once at app startup), and then you define schemas/models (`mongoose.Schema`, `mongoose.model()`) which controllers use to query and manipulate data.

### 32. How do you implement CRUD APIs?
**Interview Answer:** Define routes for each operation mapped to HTTP methods on a resource — e.g. `GET /users` (list), `GET /users/:id` (read one), `POST /users` (create), `PUT/PATCH /users/:id` (update), `DELETE /users/:id` (delete) — each calling a controller function that interacts with the database via the model and returns an appropriate JSON response and status code.

### 33. How do you validate request data?
**Interview Answer:** Using a validation library like `Joi`, `express-validator`, or `Zod` as middleware — defining a schema for expected fields/types, running incoming `req.body`/`req.query`/`req.params` against it, and returning a 400 error with details if validation fails, before the request ever reaches the controller/database logic.

### 34. How do you handle authentication?
**Interview Answer:** The typical flow: a user submits credentials to a login endpoint, the server verifies them against the database (comparing a hashed password with `bcrypt`), and on success issues a token (commonly a JWT) that the client stores and sends on subsequent requests (usually in an `Authorization: Bearer <token>` header) to prove identity.

### 35. How do you implement JWT authentication?
**Interview Answer:** On login, after verifying credentials, sign a token with a secret: `jwt.sign({ userId: user._id }, SECRET, { expiresIn: '1h' })` and return it to the client. For protected routes, an authentication middleware extracts the token from the request header, verifies it with `jwt.verify(token, SECRET)`, and if valid, attaches the decoded payload to `req.user` before calling `next()`; if invalid/expired, it responds with 401.

### 36. Where should JWT tokens be stored?
**Interview Answer:** The most secure common approach is an `httpOnly`, `secure` cookie, since JavaScript can't read `httpOnly` cookies, which mitigates XSS token theft (though it needs CSRF protection). Storing tokens in `localStorage` is simpler but exposes them to XSS attacks — if an attacker injects a script, they can read and steal the token. The right choice depends on the app's threat model, but httpOnly cookies are generally preferred for sensitive sessions.

### 37. How do you protect routes?
**Interview Answer:** By adding an authentication middleware (verifying the JWT or session) in front of the route handler, so unauthenticated requests are rejected with a 401 before reaching the actual logic: `app.get('/profile', authMiddleware, profileController)`.

### 38. How do you implement role-based authorization?
**Interview Answer:** After authentication middleware attaches the user (and their role) to `req.user`, add a further authorization middleware that checks `req.user.role` against the roles allowed for that route, e.g. `authorize('admin')`, responding with 403 Forbidden if the role doesn't match.

### 39. How do you handle file uploads?
**Interview Answer:** Typically with the `multer` middleware, which parses `multipart/form-data` requests, saves uploaded files (to disk or memory), and populates `req.file`/`req.files` with metadata. From there, files can be kept locally or forwarded to cloud storage (e.g. Cloudinary, S3), with the resulting URL saved to the database.

### 40. How do you implement pagination in Express?
**Interview Answer:** Accept `page` and `limit` as query parameters, then translate them into database `skip`/`limit` values: `const skip = (page - 1) * limit; const results = await Model.find().skip(skip).limit(limit);`. It's also good practice to return metadata (total count, total pages) alongside the results.

---

## 🔴 Hard — Production & Security (41–50)

### 41. How would you design a scalable Express application?
**Interview Answer:** I'd structure the codebase into clear layers (routes → controllers → services → models) for maintainability, keep the app stateless (no in-memory session storage) so it can run as multiple instances behind a load balancer, use environment-based configuration, add centralized logging/monitoring, cache expensive/frequent reads, apply rate limiting, and use a process manager (PM2) or container orchestration (Docker/Kubernetes) with clustering to use all CPU cores across multiple instances.

### 42. What is the difference between authentication and authorization?
**Interview Answer:** Authentication answers "who are you?" — verifying identity (e.g. logging in with credentials, validating a JWT). Authorization answers "what are you allowed to do?" — checking whether an already-authenticated user has permission to perform a specific action or access a specific resource (e.g. role or permission checks).

### 43. How would you implement refresh tokens?
**Interview Answer:** Issue two tokens at login: a short-lived access token (e.g. 15 minutes) used for normal API requests, and a longer-lived refresh token (e.g. 7 days) stored securely (httpOnly cookie or a database record) used only to request a new access token via a dedicated `/refresh` endpoint once the access token expires. This limits the exposure window if an access token is stolen, while avoiding forcing the user to log in frequently. Refresh tokens should be revocable (stored server-side) so they can be invalidated on logout or suspected compromise.

### 44. How would you implement rate limiting?
**Interview Answer:** Using middleware like `express-rate-limit`, configured with a time window and max request count per client (usually keyed by IP or user ID), e.g. `rateLimit({ windowMs: 15*60*1000, max: 100 })`. Requests exceeding the limit get a 429 Too Many Requests response. For distributed/multi-instance deployments, the rate limit store needs to be shared (e.g. Redis) rather than in-memory, so limits apply consistently across all instances.

### 45. How do you prevent SQL/NoSQL injection?
**Interview Answer:** Never build queries by directly concatenating raw user input into a query string. For MongoDB specifically, avoid passing raw `req.body`/`req.query` objects directly into query filters (an attacker could inject operators like `$gt`), and use sanitization middleware (`express-mongo-sanitize`) to strip `$`/`.` characters from user input. For SQL, always use parameterized queries or an ORM/query builder rather than string concatenation.

### 46. How do you prevent XSS attacks?
**Interview Answer:** Sanitize/escape any user-generated content before rendering it, especially in contexts where it could be interpreted as HTML/JS; use libraries like `DOMPurify` on the frontend for rendering rich content; set a strict Content-Security-Policy header; avoid `dangerouslySetInnerHTML` (React) unless content is sanitized; and store JWTs in httpOnly cookies rather than `localStorage`, so they can't be read by injected scripts even if XSS occurs.

### 47. How do you configure CORS securely?
**Interview Answer:** Using the `cors` middleware, explicitly whitelist only the origins that should be allowed to access the API (`origin: ['https://myapp.com']`) rather than using a blanket `origin: '*'`, especially if credentials/cookies are involved (which requires `credentials: true` and a specific origin, not a wildcard). Also restrict allowed methods and headers to only what's actually needed.

### 48. How would you implement centralized error handling?
**Interview Answer:** Define a single error-handling middleware (four-argument signature) at the end of the middleware stack that all errors get funneled to, either by calling `next(err)` explicitly or by wrapping async route handlers in a helper that catches rejected promises and forwards them automatically. This handler normalizes the error response shape (status code, message, and optionally an error code), logs the error server-side, and avoids leaking stack traces to clients in production.

### 49. How would you improve the performance of an Express API?
**Interview Answer:** Enable response compression (`compression` middleware), cache expensive/frequent responses (Redis or HTTP caching headers), optimize and index database queries, use connection pooling, avoid blocking synchronous operations in request handlers, paginate large result sets instead of returning everything, use a CDN for static assets, and profile with tools to find and fix actual bottlenecks rather than guessing.

### 50. How would you design a production-ready Express backend?
**Interview Answer:** I'd combine everything above into a coherent setup: a layered, modular codebase (routes/controllers/services/models); environment-based config via `.env` and validated at startup; centralized error handling and structured logging; input validation on every endpoint; authentication (JWT with refresh tokens) and role-based authorization; security middleware (`helmet`, CORS whitelist, rate limiting, sanitization against injection); database indexes and query optimization; automated tests for critical paths; health-check endpoints for monitoring; and a deployment setup (Docker, process manager or orchestration) that supports horizontal scaling and zero-downtime deploys.

---

## ⭐ Practical Scenarios to Rehearse (end-to-end flow explanations)

**Login flow:** React login form → `POST /api/auth/login` → Express route → controller → find user in MongoDB → compare hashed password (bcrypt) → sign JWT → return token → React stores auth state (e.g. httpOnly cookie or memory) and redirects.

**Product listing:** React requests `GET /api/products?page=1&limit=10` → Express route → controller → MongoDB query with `skip`/`limit` and sort → JSON response with data + pagination metadata → React renders the list.

**Protected route:** Incoming request with JWT → auth middleware extracts and verifies token → attaches `req.user` → authorization middleware checks role/permissions → controller runs → MongoDB → response.

**Search:** User types → frontend debounces input → API request → Express route → MongoDB query (ideally using a text index) → results → React renders.

**File upload:** React sends `FormData` → Express + Multer parses the multipart request → file is uploaded to storage (e.g. Cloudinary/S3) → the resulting URL is saved in MongoDB → response sent back → React displays the uploaded image.
