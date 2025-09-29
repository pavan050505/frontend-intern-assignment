import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDatabase } from '../src/lib/db.js';
import { User } from '../src/models/User.js';
import { Task } from '../src/models/Task.js';

async function run() {
  await connectDatabase();
  await User.deleteMany({});
  await Task.deleteMany({});

  const [u1, u2] = await User.create([
    { name: 'User One', email: 'user1@example.com', password: 'password123' },
    { name: 'User Two', email: 'user2@example.com', password: 'password123' },
  ]);

  await Task.create([
    { user: u1._id, title: 'Buy milk', completed: false },
    { user: u1._id, title: 'Read book', completed: true },
    { user: u2._id, title: 'Walk dog', completed: false },
  ]);

  console.log('Seed complete');
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});



