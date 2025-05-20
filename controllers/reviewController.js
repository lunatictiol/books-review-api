import { addReview, updateReview, deleteReview } from '../services/reviewService.js';

export const submitReview = async (req, res) => {
  try {
    const review = await addReview({ ...req.body, user: req.user._id, book: req.params.id });
    res.json(review);
  } catch (err) {
    res.status(400).json({ message: 'You already reviewed this book' });
  }
};

export const editReview = async (req, res) => {
  const review = await updateReview(req.params.id, req.user._id, req.body);
  if (!review) return res.status(403).json({ message: 'Unauthorized or not found' });
  res.json(review);
};

export const removeReview = async (req, res) => {
  const review = await deleteReview(req.params.id, req.user._id);
  if (!review) return res.status(403).json({ message: 'Unauthorized or not found' });
  res.json({ message: 'Deleted' });
};
