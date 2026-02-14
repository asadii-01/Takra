# Takra API Documentation

**Base URL:** `http://localhost:5000/api`

All protected routes require:
```
Authorization: Bearer <token>
```

---

## Health Check

| Method | Endpoint  | Auth | Description          |
| ------ | --------- | ---- | -------------------- |
| GET    | `/health` | No   | Server status check  |

**Response:** `200`
```json
{ "status": "ok", "message": "Server is running" }
```

---

## Authentication

### Register

| Method | Endpoint         | Auth |
| ------ | ---------------- | ---- |
| POST   | `/auth/register` | No   |

**Body:**
```json
{
  "username": "string (required, unique)",
  "email": "string (required, unique)",
  "password": "string (required)"
}
```

**Response:** `201`
```json
{
  "_id": "string",
  "username": "string",
  "email": "string",
  "role": "user",
  "token": "jwt_token"
}
```

**Errors:** `400` User already exists · `500` Server error

---

### Login

| Method | Endpoint       | Auth |
| ------ | -------------- | ---- |
| POST   | `/auth/login`  | No   |

**Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:** `200`
```json
{
  "_id": "string",
  "username": "string",
  "email": "string",
  "role": "user | admin | organizer",
  "token": "jwt_token"
}
```

**Errors:** `401` Invalid credentials · `500` Server error

---

### Get Current User

| Method | Endpoint     | Auth     |
| ------ | ------------ | -------- |
| GET    | `/auth/me`   | Required |

**Response:** `200`
```json
{
  "_id": "string",
  "username": "string",
  "email": "string",
  "role": "string"
}
```

---

### Update Profile

| Method | Endpoint         | Auth     |
| ------ | ---------------- | -------- |
| PUT    | `/auth/profile`  | Required |

**Body** (all optional):
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:** `200`
```json
{
  "_id": "string",
  "username": "string",
  "email": "string",
  "role": "string",
  "token": "new_jwt_token"
}
```

**Errors:** `404` User not found · `500` Server error

---

## Competitions

### List All Competitions

| Method | Endpoint         | Auth |
| ------ | ---------------- | ---- |
| GET    | `/competitions`  | No   |

**Response:** `200` — Array of competitions, sorted by start date ascending.
```json
[
  {
    "_id": "string",
    "title": "string",
    "description": "string",
    "startDate": "ISO date",
    "endDate": "ISO date",
    "type": "Art | Tech | Design | Other",
    "prizePool": "string",
    "participants": ["userId", ...],
    "createdAt": "ISO date"
  }
]
```

---

### Create Competition

| Method | Endpoint         | Auth          |
| ------ | ---------------- | ------------- |
| POST   | `/competitions`  | Admin only    |

**Body:**
```json
{
  "title": "string (required)",
  "description": "string (required)",
  "startDate": "ISO date (required)",
  "endDate": "ISO date (required)",
  "type": "Art | Tech | Design | Other",
  "prizePool": "string (required)"
}
```

**Response:** `201` — Created competition object.

**Errors:** `401` Not admin · `500` Server error

---

### Delete Competition

| Method | Endpoint              | Auth          |
| ------ | --------------------- | ------------- |
| DELETE | `/competitions/:id`   | Admin only    |

**Response:** `200`
```json
{ "message": "Competition removed" }
```

**Errors:** `404` Not found · `401` Not admin · `500` Server error

---

### Join Competition

| Method | Endpoint                  | Auth     |
| ------ | ------------------------- | -------- |
| POST   | `/competitions/:id/join`  | Required |

**Body:** None required (user ID is extracted from token).

**Response:** `200`
```json
{ "message": "Successfully registered for competition" }
```

**Errors:** `400` Already registered · `404` Not found · `500` Server error

---

## Chat

### Get Chat History

| Method | Endpoint        | Auth     |
| ------ | --------------- | -------- |
| GET    | `/chat/history` | Required |

**Response:** `200` — Last 50 messages in chronological order.
```json
[
  {
    "_id": "string",
    "sender": "userId",
    "username": "string",
    "content": "string",
    "createdAt": "ISO date"
  }
]
```

> **Note:** Real-time messaging is handled via Socket.io, not REST.

---

## AI Chatbot

### Send Message

| Method | Endpoint    | Auth |
| ------ | ----------- | ---- |
| POST   | `/ai/chat`  | No   |

**Body:**
```json
{
  "message": "string (required)"
}
```

**Response:** `200`
```json
{
  "response": "AI-generated answer string"
}
```

> Uses Groq LLM with RAG (PDF knowledge base). Falls back to mock mode if `GROQ_API_KEY` is not set.

**Errors:** `400` Message required · `500` Processing error

---

## Data Models

### User
| Field      | Type                          | Notes                    |
| ---------- | ----------------------------- | ------------------------ |
| `username` | String                        | Required, unique         |
| `email`    | String                        | Required, unique         |
| `password` | String                        | Hashed with bcrypt       |
| `role`     | `user` · `admin` · `organizer`| Default: `user`          |

### Competition
| Field          | Type                                   | Notes             |
| -------------- | -------------------------------------- | ----------------- |
| `title`        | String                                 | Required          |
| `description`  | String                                 | Required          |
| `startDate`    | Date                                   | Required          |
| `endDate`      | Date                                   | Required          |
| `type`         | `Art` · `Tech` · `Design` · `Other`   | Default: `Other`  |
| `prizePool`    | String                                 | Required          |
| `participants` | ObjectId[] (ref: User)                 | Array of user IDs |

### Message
| Field      | Type                   | Notes             |
| ---------- | ---------------------- | ----------------- |
| `sender`   | ObjectId (ref: User)   | Required          |
| `username` | String                 | Required          |
| `content`  | String                 | Required          |
| `createdAt`| Date                   | Auto-generated    |
