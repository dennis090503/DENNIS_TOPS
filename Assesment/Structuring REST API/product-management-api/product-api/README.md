# Product Management API

TOPS Technologies Assessment — **Structuring REST API** (E-Commerce Product & Category API).

A scalable Node.js + Express.js backend with MongoDB (Mongoose), JWT admin authentication, and Multer image uploads.

## Tech Stack
- Node.js / Express.js
- MongoDB + Mongoose (`ref` + `populate()` for Product → Category relation)
- JWT (`jsonwebtoken`) for admin-protected routes
- Multer for `multipart/form-data` image uploads (JPEG/PNG only, 2 MB limit)
- bcryptjs for password hashing

## Project Structure
```
product-api/
├── config/
│   └── db.js              # Mongoose connection
├── models/
│   ├── Category.js
│   ├── Product.js          # category: ObjectId ref -> Category
│   └── User.js             # role: "user" | "admin"
├── middleware/
│   ├── auth.js             # protect (verify JWT), isAdmin (role check)
│   └── upload.js           # Multer disk storage + file-type/size validation
├── routes/
│   ├── auth.js              # /api/auth/register, /api/auth/login
│   ├── categories.js        # /api/categories CRUD
│   └── products.js          # /api/products CRUD + image upload
├── uploads/                 # saved product images (served at /uploads/<file>)
├── postman/
│   ├── Product-Management-API.postman_collection.json
│   └── Product-Management-API.postman_environment.json
├── server.js
├── package.json
└── .env.example
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```
3. Make sure MongoDB is running (local `mongod` or a MongoDB Atlas URI in `MONGO_URI`).
4. Start the server:
   ```bash
   npm run dev     # with nodemon
   # or
   npm start
   ```
   Server runs at `http://localhost:5000`.

## Getting an admin JWT

Register an admin, then log in:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@example.com","password":"admin123","role":"admin"}'

curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

Copy the returned `token` and send it on protected requests:
```
Authorization: Bearer <token>
```

## API Endpoints

| Method | Endpoint                | Access       | Description                          |
|--------|--------------------------|--------------|--------------------------------------|
| POST   | /api/auth/register       | Public       | Create a user/admin account          |
| POST   | /api/auth/login          | Public       | Log in, returns JWT                  |
| GET    | /api/categories          | Public       | List categories                      |
| GET    | /api/categories/:id      | Public       | Get one category                     |
| POST   | /api/categories          | Admin        | Create category                      |
| PUT    | /api/categories/:id      | Admin        | Update category                      |
| DELETE | /api/categories/:id      | Admin        | Delete category                      |
| GET    | /api/products            | Public       | List products (category populated)   |
| GET    | /api/products/:id        | Public       | Get one product (category populated) |
| POST   | /api/products            | Admin        | Create product (`multipart/form-data`, field `image`) |
| PUT    | /api/products/:id        | Admin        | Update product (optionally replace `image`) |
| DELETE | /api/products/:id        | Admin        | Delete product                       |

## Postman

Import both files from `postman/` into Postman:
1. **Collection**: `Product-Management-API.postman_collection.json`
2. **Environment**: `Product-Management-API.postman_environment.json` (select it as your active environment)

The collection's pre-request script reads `jwt_token` from the environment and injects
`Authorization: Bearer <token>` into every request automatically. Run **Auth → Login** first —
its test script saves the returned token into `jwt_token` — then run any admin route directly.
`category_id` and `product_id` are likewise auto-saved after Create requests, so the
Get/Update/Delete requests chain without manual copy-pasting.

## Image Upload Notes

- Field name must be `image` in the form-data body.
- Only `image/jpeg` and `image/png` mimetypes are accepted; anything else is rejected with a 400.
- Max file size: 2 MB (configurable in `middleware/upload.js`).
- Stored files are served statically at `http://localhost:5000/uploads/<filename>`, and the
  relative path is saved on the product document as `imagePath`.
