import { validationResult } from 'express-validator';
import { Task } from '../models/Task.js';

export async function listTasks(req, res) {
  const { q, completed } = req.query;
  const filter = { user: req.user.id };
  if (q) filter.title = { $regex: q, $options: 'i' };
  if (completed === 'true') filter.completed = true;
  if (completed === 'false') filter.completed = false;
  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  res.json({ tasks });
}

export async function createTask(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { title } = req.body;
  const task = await Task.create({ user: req.user.id, title });
  res.status(201).json({ task });
}

export async function updateTask(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { id } = req.params;
  const { title, completed } = req.body;
  const task = await Task.findOneAndUpdate(
    { _id: id, user: req.user.id },
    { $set: { title, completed } },
    { new: true },
  );
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json({ task });
}

export async function deleteTask(req, res) {
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id, user: req.user.id });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json({ success: true });
}



