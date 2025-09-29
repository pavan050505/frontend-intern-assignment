import { validationResult } from 'express-validator';
import { User } from '../models/User.js';
import { signToken } from '../middleware/auth.js';

export async function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already in use' });
  const user = await User.create({ name, email, password });
  const token = signToken(user._id.toString());
  res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
}

export async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const match = await user.comparePassword(password);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });
  const token = signToken(user._id.toString());
  res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
}

export async function me(req, res) {
  res.json({ user: req.user });
}



