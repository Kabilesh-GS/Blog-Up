# ✏️ Blog-Up

A full-stack blogging platform where you can write, share, and discover stories from the community.

> Built with **React** (Frontend) + **NestJS** (Backend) + **Prisma** ORM

---

## Features

- **Auth** — Secure sign up & login
- **Discover** — Browse blogs from the community
- **Favorites** — Save blogs you love for later
- **Write & Publish** — Create and share your own posts

---

## Project Structure

```
Blog-Up/
├── Frontend/   # React app (Vite) — runs on port 5173
└── Backend/    # NestJS API + Prisma — runs on port 3000
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm

### 1. Clone the repo

```bash
git clone https://github.com/Kabilesh-GS/Blog-Up.git
cd Blog-Up
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` folder and add your environment variables:

```env
DATABASE_URL="your_database_url_here"
JWT_SECRET="your_jwt_secret_here"
```

Run database migrations and start the server:

```bash
npx prisma migrate deploy
npx prisma generate
npm run start
```

> Backend runs at `http://localhost:3000`

### 3. Frontend Setup

```bash
cd ../Frontend
npm install
npm start
```

> Frontend runs at `http://localhost:5173`

---

## Tech Stack

| Layer     | Technology          |
|-----------|---------------------|
| Frontend  | React, TypeScript, Vite |
| Backend   | NestJS, TypeScript  |
| Database  | Prisma ORM          |
| Auth      | JWT                 |

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.
