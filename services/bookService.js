// Import the Book model for database operations
import Book from "../models/book.js";

/**
 * Create a new book in the database
 * @param {Object} data - Book data including title, author, description, genre, publishedYear
 * @returns {Promise<Book>} Newly created book document
 */
export const createBook = (data) => Book.create(data);

/**
 * Retrieve books with optional filtering and pagination
 * @param {Object} filters - Filter criteria
 * @param {string} [filters.author] - Author name (case-insensitive partial match)
 * @param {string} [filters.genre] - Exact genre match
 * @param {number} [page=1] - Page number for pagination
 * @param {number} [limit=10] - Number of books per page
 * @returns {Promise<Book[]>} Array of book documents
 */
export const getBooks = async (filters, page = 1, limit = 10) => {
  const query = {};
  if (filters.author) query.author = new RegExp(filters.author, 'i'); // Case-insensitive author search
  if (filters.genre) query.genre = filters.genre;                     // Exact genre match

  const books = await Book.find(query)
    .skip((page - 1) * limit)  // Skip previous pages
    .limit(limit);             // Limit results per page
  return books;
};

/**
 * Retrieve a specific book by its ID
 * @param {string} id - MongoDB ObjectId of the book
 * @returns {Promise<Book>} Book document if found
 */
export const getBookById = (id) => Book.findById(id);

/**
 * Search books by title or author
 * @param {string} query - Search term for title or author
 * @returns {Promise<Book[]>} Array of matching book documents
 */
export const searchBooks = async (query) => {
  return await Book.find({
    $or: [
      { title: new RegExp(query, 'i') },  // Case-insensitive title search
      { author: new RegExp(query, 'i') }   // Case-insensitive author search
    ]
  });
};
