import User from '../models/user.js';

export const createUser = async (username, password) => {
  return await User.create({ username, password });
};

export const findUserByUsername = async (username) => {
  return await User.findOne({ username });
};
