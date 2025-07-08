# 🌟 RATINITY – Role-Based Store Rating Platform

RATINITY is a full-stack web application that allows users to register, log in, and rate stores based on their roles. It features a powerful role-based access control system with seamless JWT authentication, a modern UI, and a scalable backend built for production.

## 🧠 Key Highlights
- 🔐 Role-based login system: System Administrator, Normal User, Store Owner
- ⭐ Submit and manage ratings (1–5 stars) for registered stores
- 📊 Admin dashboard with user, store, and rating insights
- 🧾 Store Owners can view raters and store’s average rating
- 🌐 Fully responsive modern UI using Tailwind CSS and shadcn/ui
- 🐘 PostgreSQL as a reliable, relational store
- 🧪 Full testing stack with unit, integration, and E2E tests
- 🚀 Dockerized deployment with CI-ready structure

---

## 🧱 Tech Stack

| Layer      | Tech Used                                       |
|------------|-------------------------------------------------|
| Frontend   | React (Vite), Tailwind CSS, shadcn/ui           |
| Backend    | NestJS (TypeScript), TypeORM                    |
| Database   | PostgreSQL                                      |
| Auth       | JWT + Bcrypt                                     |
| ORM        | TypeORM (with PostgreSQL)                       |
| API Calls  | Axios                                           |
| State Mgmt | Context API or Zustand                          |
| Testing    | Jest, Supertest, Playwright, React Testing Lib  |
| Deployment | Docker, Docker Compose, Vercel/Render-ready     |

---

## 🧩 Features by Role

### 👤 Normal User
- Register and login
- View all registered stores
- Search stores by name/address
- Submit or update ratings
- View your submitted rating
- Update password

### 🛠️ System Administrator
- Add new users and stores
- View total users, stores, ratings
- Filter & view all users and stores
- Access full user details (including ratings for Store Owners)

### 🏪 Store Owner
- View all users who rated their store
- See average rating of their store
- Update password

---

## 🗃️ Database Schema

### Users
| Field   | Type        | Description                         |
|---------|-------------|-------------------------------------|
| id      | Integer     | Primary key                         |
| name    | String      | 20-60 characters                    |
| email   | String      | Unique, valid email format          |
| password| String      | Bcrypt-hashed                       |
| address | String      | Max 400 characters                  |
| role    | Enum        | 'admin', 'user', 'owner'            |

### Stores
| Field     | Type    | Description                |
|-----------|---------|----------------------------|
| id        | Integer | Primary key                |
| name      | String  | Store name                 |
| email     | String  | Store contact email        |
| address   | String  | Store address              |
| owner_id  | Integer | FK to Users (nullable)     |

### Ratings
| Field     | Type    | Description                |
|-----------|---------|----------------------------|
| id        | Integer | Primary key                |
| user_id   | Integer | FK to Users                |
| store_id  | Integer | FK to Stores               |
| rating    | Integer | 1 to 5                     |
| created_at| Date    | Auto timestamp             |
| updated_at| Date    | Auto timestamp             |

---

## 📦 Project Structure

```

ratinity/
├── backend/
│   ├── auth/
│   ├── users/
│   ├── stores/
│   ├── ratings/
│   └── main.ts, app.module.ts, ...
├── frontend/
│   ├── pages/
│   ├── components/
│   ├── App.tsx
│   └── main.tsx
├── docker-compose.yml
└── README.md

````

---

## ⚙️ Getting Started

### 🔧 Prerequisites
- Node.js 18+
- Docker + Docker Compose
- PostgreSQL (or use Docker setup)

### 🐳 Run with Docker

```bash
# Start backend + PostgreSQL
docker-compose up --build
````

### 🚀 Run Manually (Dev Mode)

#### Backend

```bash
cd backend
npm install
npm run start:dev
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

```
DATABASE_URL=postgres://postgres:password@localhost:5432/ratinity_db
JWT_SECRET=your_jwt_secret
```

### Frontend (`frontend/.env`)

```
VITE_API_URL=http://localhost:3000
```

---

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm run test
```

### Frontend Tests

```bash
cd frontend
npm run test
```

### E2E with Playwright

```bash
npx playwright test
```

---

## 🔐 Validation Rules

| Field    | Rule                                    |
| -------- | --------------------------------------- |
| Name     | 20–60 characters                        |
| Email    | Valid email format                      |
| Address  | Max 400 characters                      |
| Password | 8–16 chars, 1 uppercase, 1 special char |

---

## 📸 Screenshots

> *(Add screenshots of login page, dashboards, store listings, etc.)*

---

## ✨ Contributors

* [Vishnu Vardhan Bairy](https://github.com/yourhandle) — Fullstack Developer

---


 
