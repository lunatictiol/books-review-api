import { createUser, findUserByUsername } from '../services/userService.js';
import generateToken from '../utils/generateTokens.js';


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

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByUsername(username);
  if (user && await user.matchPassword(password)) {
    res.json({ token: generateToken(user._id) });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
