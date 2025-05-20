📘 Book Review API — README

Overview

The Book Review API is a RESTful backend service for managing books, user accounts, and book reviews. It allows users to register and authenticate using JWT, browse and search for books, and submit one review per book. The API is built with Node.js, Express, and MongoDB using Mongoose.

Features

* User authentication using JWT
* Book catalog with metadata and filtering
* One review per user per book (enforced at DB level)
* Review editing and deletion
* Paginated book and review listings
* Full-text search by title or author

Tech Stack

* Node.js with Express
* MongoDB with Mongoose
* JWT for authentication
* bcrypt for password hashing
* Postman collection included for API testing

API Endpoints

Authentication

* POST /api/auth/signup — Register a new user and receive a JWT
* POST /api/auth/login — Log in with credentials and receive a JWT

Books

* POST /api/books — Add a new book (requires authentication)
* GET /api/books — List all books with pagination and optional filters (author, genre)
* GET /api/books/\:id — Fetch a book’s metadata, average rating, and paginated reviews
* GET /api/search?q=... — Search for books by title or author (partial, case-insensitive)

Reviews

* POST /api/books/\:id/reviews — Submit a new review (1 per user per book)
* PUT /api/reviews/\:id — Edit an existing review (only by the author)
* DELETE /api/reviews/\:id — Delete an existing review (only by the author)

Authentication

* JWT is issued on login or signup
* Sent in Authorization header: Bearer <token>
* Middleware checks token validity and user identity
* Token expires in 7 days

Data Models

User

* username: String (unique)
* password: String (bcrypt-hashed)

Book

* title: String
* author: String
* genre: String
* description: String

Review

* user: ObjectId (ref: User)
* book: ObjectId (ref: Book)
* rating: Number (1–5)
* comment: String
* Unique compound index on { user, book }

---

## How to Run

1. **Clone the repository:**

   ```bash
   git clone https://github.com/lunatictiol/books-review-api.git
   cd book-review-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory with the following environment variables:

   ```
   MONGODB_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret_key>
   ```

4. **Start the server:**

   ```bash
   npm start
   ```

The API will be available at `http://localhost:3000` by default.

---

## API Testing with Postman

A Postman collection for all API endpoints is included in the repo as [`postman_collection.json`](./github-files/postman_collection.json).  

You can import this file into Postman to easily test all API routes with predefined requests and example data.  

To import:  
1. Open Postman  
2. Click on **Import**  
3. Select the `postman_collection.json` file from the repo  
4. Start sending requests!  

---

🧩 Database Diagram
![](github-files/details.png)

