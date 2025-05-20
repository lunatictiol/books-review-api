import Review from "../models/review.js";



export const getReviewsByBook = (bookId, page = 1, limit = 5) => {
  return Review.find({ book: bookId })
    .populate('user', 'username')
    .skip((page - 1) * limit)
    .limit(limit);
};

export const getAverageRating = async (bookId) => {
  const result = await Review.aggregate([
    { $match: { book: bookId } },
    { $group: { _id: '$book', avg: { $avg: '$rating' } } }
  ]);
  return result[0]?.avg || 0;
};

export const addReview = (data) => Review.create(data);

export const updateReview = (id, userId, data) => {
  return Review.findOneAndUpdate({ _id: id, user: userId }, data, { new: true });
};

export const deleteReview = (id, userId) => {
  return Review.findOneAndDelete({ _id: id, user: userId });
};
