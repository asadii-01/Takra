# UCP Takra — The Ultimate Competition Platform

A full-stack web application for organizing and participating in university competitions. Built for UCP's Takra 2026 event.

## Tech Stack

| Layer      | Technology                                                   |
| ---------- | ------------------------------------------------------------ |
| Frontend   | Next.js 16, React 19, Tailwind CSS 4, Framer Motion         |
| Backend    | Express 5, TypeScript, Mongoose (MongoDB), Socket.io         |
| AI         | Groq SDK (LLM) with PDF-based RAG knowledge base            |
| Auth       | JWT (Bearer tokens), bcryptjs password hashing               |

## Project Structure

```
Takra/
├── backend/                # Express API server
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/      # Auth & admin guards
│   │   ├── models/          # Mongoose schemas (User, Competition, Message)
│   │   ├── routes/          # API route definitions
│   │   ├── services/        # AI service, PDF knowledge base
│   │   └── server.ts        # Entry point
│   └── resources/           # PDF knowledge files for RAG
│
├── frontend/               # Next.js application
│   ├── src/
│   │   ├── app/             # Pages & layouts (App Router)
│   │   │   ├── (auth)/      # Login & Register pages
│   │   │   ├── competitions/ # Public competition listing & details
│   │   │   └── dashboard/   # User & Admin dashboard
│   │   ├── components/      # Reusable UI components
│   │   └── lib/             # Utilities
│   └── public/              # Static assets (images, logo)
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/takra
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key    # Optional, for AI chatbot
```

Start the dev server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:3000` and the backend API on `http://localhost:5000`.

## Features

- **Public Landing Page** — Hero section, trending competitions, features overview
- **Competition Discovery** — Browse, filter, and view competition details
- **Competition Registration** — Authenticated users can register for competitions
- **User Dashboard** — Personal stats, joined competitions, quick actions
- **Admin Dashboard** — Platform metrics, competition management (CRUD)
- **Real-time Chat** — Community chat via Socket.io
- **AI Assistant** — Chatbot powered by Groq LLM with PDF knowledge base (RAG)
- **Profile Management** — Update username, email, and password
- **Role-based Access** — User, Admin, and Organizer roles
