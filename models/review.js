// Import mongoose for schema definition
import mongoose from 'mongoose';

/**
 * Review Schema
 * Defines the structure for review documents in MongoDB
 * 
 * @property {ObjectId} user - Reference to the user who wrote the review
 * @property {ObjectId} book - Reference to the reviewed book
 * @property {Number} rating - Rating from 1 to 5
 * @property {String} comment - Review text
 * @property {Date} createdAt - Automatically managed timestamp
 * @property {Date} updatedAt - Automatically managed timestamp
 */
const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  rating: { type: Number, min: 1, max: 5 },
  comment: String
}, { timestamps: true });

// Ensure a user can only review a book once
reviewSchema.index({ user: 1, book: 1 }, { unique: true });

export default mongoose.model('Review', reviewSchema);
