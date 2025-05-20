// Import review service functions
import { addReview, updateReview, deleteReview } from '../services/reviewService.js';

/**
 * Submit a new review for a book
 * @route POST /api/books/:id/reviews
 * @param {string} req.params.id - Book ID
 * @param {Object} req.body - Review details (rating, comment)
 * @param {Object} req.user - Authenticated user information
 * @returns {Object} Created review
 * @throws {400} If user has already reviewed this book
 */
export const submitReview = async (req, res) => {
  try {
    const review = await addReview({ ...req.body, user: req.user._id, book: req.params.id });
    res.json(review);
  } catch (err) {
    res.status(400).json({ message: 'You already reviewed this book' });
  }
};

/**
 * Update an existing review
 * @route PUT /api/reviews/:id
 * @param {string} req.params.id - Review ID
 * @param {Object} req.body - Updated review details
 * @param {Object} req.user - Authenticated user information
 * @returns {Object} Updated review
 * @throws {403} If user is not the review owner
 */
export const editReview = async (req, res) => {
  const review = await updateReview(req.params.id, req.user._id, req.body);
  if (!review) return res.status(403).json({ message: 'Unauthorized or not found' });
  res.json(review);
};

/**
 * Delete a review
 * @route DELETE /api/reviews/:id
 * @param {string} req.params.id - Review ID
 * @param {Object} req.user - Authenticated user information
 * @returns {Object} Success message
 * @throws {403} If user is not the review owner
 */
export const removeReview = async (req, res) => {
  const review = await deleteReview(req.params.id, req.user._id);
  if (!review) return res.status(403).json({ message: 'Unauthorized or not found' });
  res.json({ message: 'Deleted' });
};
