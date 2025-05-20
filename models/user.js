// Import required dependencies
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * User Schema
 * Defines the structure for user documents in MongoDB
 * 
 * @property {String} username - Unique username for the user
 * @property {String} password - Hashed password
 */
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

/**
 * Pre-save middleware to hash password
 * Automatically hashes the password before saving to database
 * Only runs if password field has been modified
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

/**
 * Method to compare password for authentication
 * @param {string} enteredPassword - The password to verify
 * @returns {Promise<boolean>} True if password matches, false otherwise
 */
userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
