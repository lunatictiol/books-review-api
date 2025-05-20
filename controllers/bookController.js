// Import book and review related services
import { createBook, getBooks, getBookById, searchBooks } from '../services/bookService.js';
import { getReviewsByBook, getAverageRating } from '../services/reviewService.js';

/**
 * Create a new book
 * @route POST /api/books
 * @param {Object} req.body - Book details (title, author, genre, description)
 * @returns {Object} Created book object
 */
export const addBook = async (req, res) => {
  const book = await createBook(req.body);
  res.json(book);
};

/**
 * List books with optional filtering and pagination
 * @route GET /api/books
 * @param {Object} req.query - Contains page, author, and genre filters
 * @returns {Array} List of books matching criteria
 */
export const listBooks = async (req, res) => {
  const { page, author, genre } = req.query;
  const books = await getBooks({ author, genre }, parseInt(page) || 1);
  res.json(books);
};

/**
 * Get detailed information about a specific book including reviews
 * @route GET /api/books/:id
 * @param {string} req.params.id - Book ID
 * @param {number} req.query.page - Page number for reviews
 * @returns {Object} Book details with average rating and paginated reviews
 * @throws {404} If book not found
 */
export const bookDetails = async (req, res) => {
  const book = await getBookById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Not found' });
  
  const avgRating = await getAverageRating(book._id);
  const reviews = await getReviewsByBook(book._id, req.query.page || 1);

  res.json({ book, avgRating, reviews });
};

/**
 * Search books by title or author
 * @route GET /api/books/search
 * @param {string} req.query.q - Search query
 * @returns {Array} Matching books
 * @throws {500} If search operation fails
 */
export const searchBook = async (req, res) => {
  try {
    const books = await searchBooks(req.query.q || '');
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Search failed' });
  }
};
