# MongoDB — 50 Interview Questions & Answers

---

## 🟢 Easy — Fundamentals (1–15)

### 1. What is MongoDB?
**Interview Answer:** MongoDB is a document-oriented NoSQL database that stores data as flexible, JSON-like documents (BSON) instead of rows and tables. It's designed for scalability, high performance with large volumes of unstructured or semi-structured data, and a flexible schema that can evolve over time.

### 2. Why is MongoDB called a NoSQL database?
**Interview Answer:** "NoSQL" means it doesn't follow the traditional relational (SQL) model of fixed tables, rows, and rigid schemas. Instead, MongoDB stores data as documents in collections, doesn't enforce a fixed schema by default, and doesn't use SQL as its query language — making it more flexible for unstructured/evolving data and easier to horizontally scale.

### 3. MongoDB vs MySQL?
**Interview Answer:** MySQL is a relational database with fixed tables, rows/columns, and strict schemas enforced at the database level, using SQL and supporting strong ACID transactions and joins natively. MongoDB is a document database with flexible schemas, storing related data as nested documents (reducing the need for joins), and it scales horizontally (sharding) more naturally. MySQL suits highly structured, relational data with complex transactions; MongoDB suits rapidly evolving schemas, hierarchical/nested data, and applications needing horizontal scale.

### 4. What is a document in MongoDB?
**Interview Answer:** A document is the basic unit of data in MongoDB — a set of key-value pairs stored in BSON format, similar to a JSON object. For example, `{ name: "Alex", age: 25, hobbies: ["reading", "cycling"] }` is a single document, roughly analogous to a row in a relational table but far more flexible in structure.

### 5. What is a collection?
**Interview Answer:** A collection is a group of MongoDB documents, roughly analogous to a table in a relational database. Unlike a SQL table, documents in the same collection don't need to share an identical structure.

### 6. What is a database?
**Interview Answer:** A database in MongoDB is a container that holds one or more collections. A single MongoDB server (instance) can host multiple independent databases, each with its own set of collections and users/permissions.

### 7. What is BSON?
**Interview Answer:** BSON (Binary JSON) is the binary-encoded format MongoDB uses internally to store documents. It extends JSON with additional data types (like `Date`, `ObjectId`, and binary data) and is more efficient to parse and traverse than plain text JSON.

### 8. What is the difference between JSON and BSON?
**Interview Answer:** JSON is a human-readable text format with a limited set of data types (string, number, boolean, array, object, null). BSON is a binary format that MongoDB uses for storage and network transfer — it's not human-readable but is faster to parse, more compact for certain data, and supports richer types like dates, binary data, and `ObjectId` that plain JSON doesn't have.

### 9. What is _id?
**Interview Answer:** `_id` is the mandatory, unique primary key field every MongoDB document has. If you don't provide one when inserting a document, MongoDB automatically generates one (typically an `ObjectId`). It's indexed by default and used to uniquely identify documents within a collection.

### 10. What is ObjectId?
**Interview Answer:** `ObjectId` is MongoDB's default type for the `_id` field — a 12-byte identifier that's globally unique and roughly time-ordered. It's composed of a 4-byte timestamp, a 5-byte random value (unique per machine/process), and a 3-byte incrementing counter, which is why documents inserted later generally have "larger" ObjectIds.

### 11. What is a MongoDB schema?
**Interview Answer:** A schema describes the structure, fields, and data types that documents in a collection are expected to have. MongoDB itself doesn't strictly enforce a schema at the database level by default, but applications commonly define one at the application layer using an ODM like Mongoose, which validates document structure before saving.

### 12. Is MongoDB schema-less?
**Interview Answer:** Not entirely — it's more accurate to say MongoDB has a *flexible* schema rather than none at all. Documents in the same collection can have different fields, and fields can be added or removed without a migration, but you can still enforce structure and validation rules either via a schema library like Mongoose or MongoDB's own built-in JSON Schema validation.

### 13. What is CRUD?
**Interview Answer:** CRUD stands for Create, Read, Update, Delete — the four basic operations for interacting with data. In MongoDB these map to `insertOne`/`insertMany`, `find`/`findOne`, `updateOne`/`updateMany`, and `deleteOne`/`deleteMany`.

### 14. How do you insert a document?
**Interview Answer:** Using `insertOne()` for a single document or `insertMany()` for multiple:
```js
db.users.insertOne({ name: "Alex", age: 25 });
db.users.insertMany([{ name: "A" }, { name: "B" }]);
```

### 15. How do you retrieve documents?
**Interview Answer:** Using `find()` to get all matching documents (returns a cursor) or `findOne()` to get just the first match:
```js
db.users.find({ age: { $gt: 18 } });
db.users.findOne({ name: "Alex" });
```

---

## 🟢→🟡 Fundamentals to Practical (16–30)

### 16. How do you update a document?
**Interview Answer:** Using `updateOne()` or `updateMany()` with update operators like `$set`:
```js
db.users.updateOne({ name: "Alex" }, { $set: { age: 26 } });
db.users.updateMany({ status: "inactive" }, { $set: { status: "archived" } });
```

### 17. How do you delete a document?
**Interview Answer:** Using `deleteOne()` or `deleteMany()`:
```js
db.users.deleteOne({ name: "Alex" });
db.users.deleteMany({ age: { $lt: 18 } });
```

### 18. What is find()?
**Interview Answer:** `find(query, projection)` returns a **cursor** to all documents matching the query filter — you can iterate it, convert to an array (`.toArray()`), or chain methods like `.sort()`, `.limit()`, `.skip()` on it.

### 19. What is findOne()?
**Interview Answer:** `findOne(query)` returns only the *first* matching document as a plain object (not a cursor), or `null` if nothing matches — convenient when you only expect/need a single result.

### 20. Difference between find() and findOne()?
**Interview Answer:** `find()` returns a cursor over potentially many matching documents and requires iteration (or `.toArray()`) to access them. `findOne()` returns a single document object directly (or `null`), with no cursor involved — simpler when you only need one result, e.g. looking up a user by unique email.

### 21. What are MongoDB operators?
**Interview Answer:** Operators are special keywords, prefixed with `$`, used in queries, updates, and aggregations to express conditions or transformations beyond simple equality — e.g. comparison operators (`$gt`, `$lt`), logical operators (`$and`, `$or`), update operators (`$set`, `$inc`), and array operators (`$push`, `$pull`).

### 22. What does $gt mean?
**Interview Answer:** "Greater than" — matches documents where a field's value is strictly greater than the specified value, e.g. `{ age: { $gt: 18 } }` matches ages above 18.

### 23. What does $lt mean?
**Interview Answer:** "Less than" — matches documents where a field's value is strictly less than the specified value, e.g. `{ price: { $lt: 100 } }`.

### 24. What does $in mean?
**Interview Answer:** Matches documents where a field's value equals any value in a given array, e.g. `{ status: { $in: ["active", "pending"] } }` matches documents whose status is either "active" or "pending."

### 25. What does $ne mean?
**Interview Answer:** "Not equal" — matches documents where a field's value does not equal the specified value, e.g. `{ status: { $ne: "deleted" } }`.

### 26. What is an index?
**Interview Answer:** An index is a special data structure (typically a B-tree) that MongoDB maintains on a field (or fields) to speed up query lookups on that field, similar to an index in a book. Without an index, MongoDB has to scan every document in a collection (a "collection scan") to find matches, which is slow at scale.

### 27. Why are indexes important?
**Interview Answer:** They dramatically speed up read queries and sort operations by letting MongoDB narrow down the search space instead of scanning the entire collection, which matters enormously as collections grow to millions of documents. They also enable efficient enforcement of uniqueness constraints (unique indexes).

### 28. How do you create an index?
**Interview Answer:** Using `createIndex()`:
```js
db.users.createIndex({ email: 1 }); // ascending index
db.users.createIndex({ email: 1 }, { unique: true }); // unique index
```

### 29. What is a compound index?
**Interview Answer:** A compound index is built on multiple fields together, e.g. `db.orders.createIndex({ userId: 1, createdAt: -1 })`. It speeds up queries that filter or sort on that combination of fields (or a prefix of them), and field order in the index matters for which query patterns it can serve efficiently.

### 30. What happens if you create too many indexes?
**Interview Answer:** Every index speeds up reads but adds overhead: it consumes additional disk space and RAM, and every write (insert/update/delete) has to update all relevant indexes, slowing down write performance. So indexing is a trade-off — you should index fields that are actually queried/sorted often, not every field.

---

## 🟡 Medium — Aggregation & Data Modeling (31–40)

### 31. What is MongoDB aggregation?
**Interview Answer:** Aggregation is MongoDB's framework for processing data through a multi-stage pipeline to transform, filter, group, and compute derived results — similar to SQL's `GROUP BY`, `JOIN`, and analytical functions combined, but expressed as a sequence of pipeline stages.

### 32. What is an aggregation pipeline?
**Interview Answer:** It's an ordered array of stages, each of which transforms the documents as they pass through — the output of one stage becomes the input to the next. For example: `db.orders.aggregate([ {$match:{...}}, {$group:{...}}, {$sort:{...}} ])` first filters, then groups, then sorts.

### 33. What does $match do?
**Interview Answer:** `$match` filters documents, similar to the `find()` query — it only passes documents matching the given condition to the next pipeline stage. It's most efficient placed early in the pipeline (ideally leveraging an index) to reduce the data volume processed downstream.

### 34. What does $group do?
**Interview Answer:** `$group` groups documents by a specified key (like SQL's `GROUP BY`) and lets you compute aggregated values per group using accumulators like `$sum`, `$avg`, `$max`, `$push`. E.g. grouping orders by `customerId` and summing `total` to get spend per customer.

### 35. What does $sort do?
**Interview Answer:** `$sort` orders the documents passing through the pipeline by one or more fields, ascending (`1`) or descending (`-1`) — e.g. `{ $sort: { createdAt: -1 } }` sorts newest first.

### 36. What does $lookup do?
**Interview Answer:** `$lookup` performs a left outer join with another collection in the same database, letting you pull in related documents — similar to a SQL JOIN. E.g. joining an `orders` collection with `users` on `userId` to attach customer details to each order.

### 37. What is embedding in MongoDB?
**Interview Answer:** Embedding means storing related data directly nested inside a parent document rather than in a separate collection — e.g. storing a user's addresses as an array inside the user document. It's efficient for data that's always accessed together and doesn't grow unbounded.

### 38. What is referencing in MongoDB?
**Interview Answer:** Referencing means storing a related document's `_id` (a reference) instead of embedding the full data, similar to a foreign key in SQL, and retrieving the related data with a separate query or a `$lookup`. It's used when related data is large, shared across many documents, or updated independently.

### 39. Embedding vs referencing — when would you use each?
**Interview Answer:** Use embedding when the related data is small, bounded, and mostly accessed together with the parent (e.g. an address inside a user document) — it avoids extra queries/joins. Use referencing when the related data is large, unbounded (e.g. thousands of orders per user), shared across multiple parents, or updated independently of the parent — it avoids duplicate data and huge documents. In practice it's a spectrum, and many real schemas mix both.

### 40. How would you design a schema for users and orders?
**Interview Answer:** I'd generally reference rather than embed here, since a user can have an unbounded, growing number of orders over time. I'd have a `users` collection with core profile data, and a separate `orders` collection where each order document stores a `userId` reference back to the user. I'd index `userId` on the orders collection for fast lookups ("all orders for this user"), and use `$lookup` (or a manual query) when I need to join user info onto an order. If each order needs a snapshot of user info at time of purchase (e.g. shipping address as it was then), I might additionally embed a small denormalized copy of that specific data inside the order.

---

## 🔴 Hard — Performance & Scaling (41–50)

### 41. How does MongoDB indexing work internally?
**Interview Answer:** MongoDB indexes are implemented as B-tree data structures that store a sorted mapping of field values to document locations (pointers). When a query filters or sorts on an indexed field, MongoDB's query planner can traverse the B-tree to find matching entries directly rather than scanning every document, similar to how a database index works in relational systems.

### 42. What is a covered query?
**Interview Answer:** A covered query is one where all the fields required by the query (both the filter and the returned fields) are present in the index itself, so MongoDB can satisfy the entire query from the index without ever reading the actual documents — making it extremely fast.

### 43. What is an explain plan?
**Interview Answer:** `.explain()` shows how MongoDB actually executes a given query — whether it used an index or did a full collection scan (`COLLSCAN` vs `IXSCAN`), how many documents were examined vs. returned, and execution time. It's the primary tool for diagnosing and optimizing slow queries.

### 44. How do you optimize a slow MongoDB query?
**Interview Answer:** Run `.explain("executionStats")` to see if it's doing a collection scan; if so, add an appropriate index (or compound index matching the query's filter/sort pattern). I'd also check whether the query is only fetching needed fields (projection), whether pagination uses efficient patterns, and whether the query can leverage a covered index. For aggregation pipelines, I'd make sure `$match`/`$sort` stages that can use indexes come as early as possible.

### 45. What are transactions in MongoDB?
**Interview Answer:** Transactions let you group multiple read/write operations (potentially across multiple documents or collections) into a single atomic unit — either all operations succeed and commit, or none do (rollback), preserving ACID guarantees. MongoDB has supported multi-document ACID transactions since version 4.0.

### 46. When should MongoDB transactions be used?
**Interview Answer:** When you need multiple writes across documents/collections to succeed or fail together — e.g. transferring money between two accounts (debit one, credit another) or an order-and-inventory update that must stay consistent. For single-document updates, transactions usually aren't needed since single-document operations are already atomic by default. Transactions have a performance cost, so they should be used only where true cross-document atomicity is required.

### 47. What is replication in MongoDB?
**Interview Answer:** Replication is maintaining multiple copies of the same data across different servers (a replica set) for high availability and redundancy. If the primary node fails, one of the secondary nodes is automatically elected as the new primary, minimizing downtime.

### 48. What is a replica set?
**Interview Answer:** A replica set is a group of MongoDB servers that maintain the same data set — one **primary** node that receives all writes, and one or more **secondary** nodes that replicate data from the primary and can serve read traffic (depending on read preference). If the primary becomes unavailable, the remaining members hold an election to promote a new primary automatically.

### 49. What is sharding?
**Interview Answer:** Sharding is horizontal scaling — splitting a large collection's data across multiple servers (shards) based on a shard key, so no single machine has to store or process the entire dataset. A `mongos` router directs queries to the appropriate shard(s), letting the database handle datasets and throughput far beyond what a single server could manage.

### 50. How would you design MongoDB for millions of documents?
**Interview Answer:** I'd focus on several things: choose indexes carefully based on actual query patterns (and use compound indexes for common filter+sort combinations), design the schema based on access patterns (embed for data always read together, reference for large/unbounded relations), use pagination that scales (`_id`-based cursor pagination instead of large `skip()` offsets), enable a replica set for availability and read scaling, and shard the collection with a well-chosen shard key (one with high cardinality and even write distribution) once a single replica set can no longer handle the volume. I'd also monitor with `.explain()` and profiling tools to catch slow queries before they become a problem at scale.

---

## ⭐ Practical Queries to Rehearse

```js
// Find users older than 20
db.users.find({ age: { $gt: 20 } });

// Find products in a price range
db.products.find({ price: { $gte: 500, $lte: 2000 } });

// Pagination
db.products.find().skip((page - 1) * limit).limit(limit);

// Aggregation: total spend per customer, sorted descending
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$customerId", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } }
]);

// $lookup: join orders with users
db.orders.aggregate([
  { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "user" } }
]);

// $unwind: flatten an array field before grouping
db.orders.aggregate([
  { $unwind: "$items" },
  { $group: { _id: "$items.productId", totalSold: { $sum: "$items.qty" } } }
]);
```

Also be ready to talk through: designing indexes for a search feature, choosing between embedding and referencing for a specific real-world schema, and reasoning about a shard key choice.
