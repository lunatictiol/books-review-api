// Import required dependencies
import express from 'express';
import { signup, login } from '../controllers/authController.js';

// Create an Express Router instance
const router = express.Router();

// Authentication Routes

// POST /signup - Register a new user
// Request body should contain: { username, password }
router.post('/signup', signup);

// POST /login - Authenticate an existing user
// Request body should contain: { username, password }
// Returns: JWT token for authentication
router.post('/login', login);

export default router;
