import Book from "../models/book.js";


export const createBook = (data) => Book.create(data);

export const getBooks = async (filters, page = 1, limit = 10) => {
  const query = {};
  if (filters.author) query.author = new RegExp(filters.author, 'i');
  if (filters.genre) query.genre = filters.genre;

  const books = await Book.find(query)
    .skip((page - 1) * limit)
    .limit(limit);
  return books;
};

export const getBookById = (id) => Book.findById(id);

export const searchBooks = async (query) => {
  return await Book.find({
    $or: [
      { title: new RegExp(query, 'i') },
      { author: new RegExp(query, 'i') }
    ]
  });
};
