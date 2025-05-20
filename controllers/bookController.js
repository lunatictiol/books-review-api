import { createBook, getBooks, getBookById,searchBooks } from '../services/bookService.js';
import { getReviewsByBook, getAverageRating } from '../services/reviewService.js';

export const addBook = async (req, res) => {
  const book = await createBook(req.body);
  res.json(book);
};

export const listBooks = async (req, res) => {
  const { page, author, genre } = req.query;
  const books = await getBooks({ author, genre }, parseInt(page) || 1);
  res.json(books);
};

export const bookDetails = async (req, res) => {
  const book = await getBookById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Not found' });
  
  const avgRating = await getAverageRating(book._id);
  console.log("avr",avgRating)
  const reviews = await getReviewsByBook(book._id, req.query.page || 1);

  res.json({ book, avgRating, reviews });
};


export const searchBook = async (req, res) => {
  try {
  const books = await searchBooks(req.query.q || '');
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Search failed' });
  }
};
