# Scalable Web App - Simple MERN Stack

Minimal, easy-to-run MERN app with JWT authentication, dashboard, CRUD tasks, search/filter functionality, seed data, ESLint/Prettier, and a Postman collection.

---

## 🛠 Stack

**Frontend:** React (Vite), Tailwind CSS, Axios, React Router, Context API  
**Backend:** Node.js, Express.js, Mongoose (MongoDB), JWT, express-validator

---

## ✨ Features

- User registration/login with JWT authentication  
- Logout functionality  
- Fetch and update user profile  
- Tasks CRUD with search and filter  
- Protected routes and middleware  
- Seed data: 2 demo users with sample tasks  

---

## 📁 Project Structure

backend/
src/
controllers/
lib/
middleware/
models/
routes/
index.js
scripts/seed.js
package.json

frontend/
src/
context/
pages/
services/
App.jsx
main.jsx
index.css
index.html
package.json

assignment.postman_collection.json
README.md


---

## ⚡ Prerequisites

- Node.js >= 18  
- MongoDB running locally or in the cloud

---

## 🚀 Backend Setup

```bash
cd backend
# Copy example env file
copy .env.example .env      # Windows
# Or on Linux/macOS: cp .env.example .env
# Edit .env with your Mongo URI and JWT secret
npm install
npm run dev
Default .env values:
PORT=4000
MONGO_URI=mongodb://localhost:27017/scalable_app
JWT_SECRET=changemeplease
CLIENT_ORIGIN=http://localhost:5173

Seed Data
cd backend
npm run seed

Seeded accounts:

user1@example.com
 / password123

user2@example.com
 / password123

 🌐 Frontend Setup
 cd frontend
npm install
npm run dev

📡 API Quick Reference
| Method | Endpoint           | Description                 |
| ------ | ------------------ | --------------------------- |
| POST   | /api/auth/register | Register a new user         |
| POST   | /api/auth/login    | Login user and get JWT      |
| GET    | /api/auth/me       | Fetch current user profile  |
| GET    | /api/tasks         | Get all tasks               |
| POST   | /api/tasks         | Create a new task           |
| PUT    | /api/tasks/:id     | Update a task               |
| DELETE | /api/tasks/:id     | Delete a task               |
| GET    | /api/users/me      | Get current user profile    |
| PUT    | /api/users/me      | Update current user profile |

🧹 Lint & Format

Backend:
cd backend
npm run lint
npm run format

Frontend:
cd frontend
npm run lint
npm run format
📈 How to Scale (Notes)

Frontend:

Add API layer with typed SDK

Code-split routes

Use React Query or SWR for caching

Backend:

Separate services by domain (auth, tasks)

Add rate-limiting and request-id logging

Centralized error handling

Validation schemas

Deploy behind reverse proxy

Use environment variable configuration

📄 License

MIT License

---

This README is **clean, professional, and fully descriptive**, perfect for a GitHub submission for your internship assignment.  

If you want, I can also **add badges for Node, React, and MongoDB** to make it look even more professional. Do you want me to do that?
