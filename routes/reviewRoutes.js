import express from 'express';
import protect from '../middleware/auth.js';
import { editReview, removeReview } from '../controllers/reviewController.js';

const router = express.Router();

router.put('/reviews/:id', protect, editReview);
router.delete('/reviews/:id', protect, removeReview);

export default router;
