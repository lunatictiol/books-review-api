// Import required dependencies
import express from 'express';
// Import authentication middleware
import protect from '../middleware/auth.js';
// Import book-related controller functions
import { addBook, listBooks, bookDetails, searchBook } from '../controllers/bookController.js';
// Import review-related controller functions
import { submitReview } from '../controllers/reviewController.js';

// Create an Express Router instance
const router = express.Router();

// Book Routes

// GET /api/books/search - Search for books based on query parameters
// Protected route - Requires authentication
// Query params: title, author, genre (optional)
router.get('/books/search', protect, searchBook); 

// GET /api/books - Retrieve all books
// Protected route - Requires authentication
// Optional query params: page, limit for pagination
router.get('/books', protect, listBooks);

// GET /api/books/:id - Get detailed information about a specific book
// Protected route - Requires authentication
// URL params: id (book ID)
router.get('/books/:id', protect, bookDetails);

// POST /api/books - Create a new book
// Protected route - Requires authentication
// Request body: { title, author, description, genre, publishedYear }
router.post('/books', protect, addBook);

// POST /api/books/:id/reviews - Submit a review for a specific book
// Protected route - Requires authentication
// URL params: id (book ID)
// Request body: { rating, comment }
router.post('/books/:id/reviews', protect, submitReview);

export default router;
