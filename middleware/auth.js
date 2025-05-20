// Import required dependencies
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

/**
 * Authentication middleware to protect routes
 * Verifies JWT token and attaches user to request
 * 
 * @middleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @throws {401} If no token provided or token is invalid
 * 
 * Usage: Add this middleware to routes that require authentication
 * Example: router.get('/protected', protect, handler);
 */
const protect = async (req, res, next) => {
  // Extract token from Authorization header
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    // Verify token and get user data
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default protect;
