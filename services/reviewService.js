// Import the Review model for database operations
import Review from "../models/review.js";

/**
 * Retrieve reviews for a specific book with pagination
 * @param {string} bookId - MongoDB ObjectId of the book
 * @param {number} [page=1] - Page number for pagination
 * @param {number} [limit=5] - Number of reviews per page
 * @returns {Promise<Review[]>} Array of review documents with populated user information
 */
export const getReviewsByBook = (bookId, page = 1, limit = 5) => {
  return Review.find({ book: bookId })
    .populate('user', 'username')  // Include user information (username only)
    .skip((page - 1) * limit)      // Skip previous pages
    .limit(limit);                 // Limit results per page
};

/**
 * Calculate the average rating for a specific book
 * @param {string} bookId - MongoDB ObjectId of the book
 * @returns {Promise<number>} Average rating (0 if no reviews exist)
 */
export const getAverageRating = async (bookId) => {
  const result = await Review.aggregate([
    { $match: { book: bookId } },                    // Filter reviews for specific book
    { $group: { _id: '$book', avg: { $avg: '$rating' } } }  // Calculate average rating
  ]);
  return result[0]?.avg || 0;  // Return average or 0 if no reviews exist
};

/**
 * Create a new review
 * @param {Object} data - Review data including book, user, rating, and comment
 * @returns {Promise<Review>} Newly created review document
 */
export const addReview = (data) => Review.create(data);

/**
 * Update an existing review
 * @param {string} id - MongoDB ObjectId of the review
 * @param {string} userId - MongoDB ObjectId of the user who owns the review
 * @param {Object} data - Updated review data (rating and/or comment)
 * @returns {Promise<Review>} Updated review document or null if not found
 */
export const updateReview = (id, userId, data) => {
  return Review.findOneAndUpdate(
    { _id: id, user: userId },  // Only update if review belongs to user
    data,
    { new: true }              // Return updated document
  );
};

/**
 * Delete a review
 * @param {string} id - MongoDB ObjectId of the review
 * @param {string} userId - MongoDB ObjectId of the user who owns the review
 * @returns {Promise<Review>} Deleted review document or null if not found
 */
export const deleteReview = (id, userId) => {
  return Review.findOneAndDelete({ _id: id, user: userId });  // Only delete if review belongs to user
};
