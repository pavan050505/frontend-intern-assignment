import { validationResult } from 'express-validator';
import { User } from '../models/User.js';

export async function getProfile(req, res) {
  res.json({ user: req.user });
}

export async function updateProfile(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { name } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: { name } },
    { new: true, runValidators: true, select: '-password' },
  );
  res.json({ user });
}



