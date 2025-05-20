// Import mongoose for schema definition
import mongoose from 'mongoose';

/**
 * Book Schema
 * Defines the structure for book documents in MongoDB
 * 
 * @property {String} title - The title of the book
 * @property {String} author - The author's name
 * @property {String} genre - The book's genre/category
 * @property {String} description - A description or summary of the book
 */
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  description: String,
});

export default mongoose.model('Book', bookSchema);
