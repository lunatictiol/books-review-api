// Import the User model for database operations
import User from '../models/user.js';

/**
 * Create a new user in the database
 * @param {string} username - Unique username for the new user
 * @param {string} password - User's password (will be hashed by the model)
 * @returns {Promise<User>} Newly created user document
 * @throws {Error} If username already exists or validation fails
 */
export const createUser = async (username, password) => {
  return await User.create({ username, password });
};

/**
 * Find a user by their username
 * @param {string} username - Username to search for
 * @returns {Promise<User|null>} User document if found, null otherwise
 * Used for:
 * - Authentication during login
 * - Checking username availability during registration
 */
export const findUserByUsername = async (username) => {
  return await User.findOne({ username });
};
