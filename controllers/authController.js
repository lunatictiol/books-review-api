// Import user service functions and token generator
import { createUser, findUserByUsername } from '../services/userService.js';
import generateToken from '../utils/generateTokens.js';

/**
 * Handle user registration
 * @route POST /api/auth/signup
 * @param {Object} req.body - Contains username and password
 * @returns {Object} JWT token for authentication
 * @throws {400} If username is already taken
 */
export const signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await createUser(username, password);
    res.json({ token: generateToken(user._id) });
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'Username taken' });
  }
};

/**
 * Handle user login
 * @route POST /api/auth/login
 * @param {Object} req.body - Contains username and password
 * @returns {Object} JWT token for authentication
 * @throws {401} If credentials are invalid
 */
export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByUsername(username);
  if (user && await user.matchPassword(password)) {
    res.json({ token: generateToken(user._id) });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
