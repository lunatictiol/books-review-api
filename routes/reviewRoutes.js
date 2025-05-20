// Import required dependencies
import express from 'express';
// Import authentication middleware
import protect from '../middleware/auth.js';
// Import review management controller functions
import { editReview, removeReview } from '../controllers/reviewController.js';

// Create an Express Router instance
const router = express.Router();

// Review Management Routes

// PUT /api/reviews/:id - Update an existing review
// Protected route - Requires authentication
// URL params: id (review ID)
// Request body: { rating, comment }
// Only the review owner can edit their review
router.put('/reviews/:id', protect, editReview);

// DELETE /api/reviews/:id - Delete an existing review
// Protected route - Requires authentication
// URL params: id (review ID)
// Only the review owner can delete their review
router.delete('/reviews/:id', protect, removeReview);

export default router;
