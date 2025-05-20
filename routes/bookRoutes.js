import express from 'express';
import protect from '../middleware/auth.js';
import { addBook, listBooks, bookDetails,searchBook } from '../controllers/bookController.js';
import { submitReview } from '../controllers/reviewController.js';
const router = express.Router();

router.get('/books/search', protect,searchBook); 
router.get('/books', protect, listBooks);
router.get('/books/:id', protect, bookDetails);
router.post('/books', protect, addBook);
router.post('/books/:id/reviews', protect, submitReview);


export default router;
