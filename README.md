# Scalable Web App - Simple MERN Stack

Minimal, easy-to-run MERN app with JWT auth, dashboard, CRUD tasks, search/filter, seed data, ESLint/Prettier, and a Postman collection.

## Stack
- Frontend: React (Vite), Tailwind CSS, Axios, React Router, Context API
- Backend: Node.js, Express.js, Mongoose (MongoDB), JWT, express-validator

## Features
- Register/Login (JWT) and logout
- Profile fetch/update
- Tasks CRUD with search/filter
- Protected routes and middleware
- Seed data: 2 users with sample tasks

## Project Structure
```
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
```

## Prerequisites
- Node.js >= 18
- MongoDB running locally or in the cloud

## Backend Setup
```
cd backend
copy .env.example .env   # Windows PowerShell: cp .env.example .env also works if available
# Edit .env with your Mongo URI and JWT secret
npm install
npm run dev
```

Default env (`.env`):
```
PORT=4000
MONGO_URI=mongodb://localhost:27017/scalable_app
JWT_SECRET=changemeplease
CLIENT_ORIGIN=http://localhost:5173
```

Seed data:
```
cd backend
npm run seed
```

Seeded accounts:
- user1@example.com / password123
- user2@example.com / password123

## Frontend Setup
```
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## API Quick Reference
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id
- GET /api/users/me
- PUT /api/users/me

Import `assignment.postman_collection.json` into Postman to test.

## Lint & Format
- Backend: `cd backend && npm run lint` / `npm run format`
- Frontend: `cd frontend && npm run lint` / `npm run format`

## How to Scale (Notes)
- Frontend: add API layer with typed SDK, code-split routes, use React Query for caching.
- Backend: separate services by domain (auth, tasks), add rate-limiting, request-id logging, centralized error handling, validation schemas, deploy behind reverse proxy, use env-var config.



