# Mini-Vault API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-blue.svg)](package.json)
[![CI Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](#)

A production-ready, lightweight REST API for secure note-taking. Built with Node.js, Express, and PostgreSQL.

---

## 🚀 Tech Stack

- **Runtime:** Node.js (>= 18.0.0)
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Driver:** `pg` (node-postgres)
- **Auth:** `jsonwebtoken` (JWT) + `bcryptjs` (password hashing)
- **Local Dev Tooling:** `nodemon` (auto-reload)

---

## 📁 Repository Structure

```text
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── pull_request_template.md
├── src/
│   ├── middleware/
│   │   └── auth.js         # JWT authentication middleware
│   └── routes/             # (route files go here as API grows)
├── .env.example            # Template for environment configurations
├── .gitignore              # Files ignored by Git
├── LICENSE                 # Project License (MIT)
├── README.md               # Project documentation (this file)
├── db.js                   # PostgreSQL pool initialization
├── index.js                # Express server entry point
├── package.json            # Dependencies and npm scripts
└── schema.sql              # Database schema (users + notes tables)
```

---

## 🛠️ Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (Version 18.x or higher)
- [PostgreSQL](https://www.postgresql.org/) database server running locally or in Docker

### Installation

1. Install the required dependencies:
   ```bash
   npm install
   ```

2. Copy the example environment file and configure your credentials:
   ```bash
   cp .env.example .env
   ```
   *Modify the following values in `.env` to match your setup:*
   - `DATABASE_URL` — your local PostgreSQL connection string
   - `JWT_SECRET` — a long random string (generate one: `openssl rand -base64 32`)
   - `PORT` — optional, defaults to `3000`

### Database Setup

Run the SQL script to initialize the PostgreSQL table schema:
```bash
psql -U postgres -d minivault -f schema.sql
```
*Note: Make sure your PostgreSQL database (`minivault`) exists before running this command. You can create it by running `CREATE DATABASE minivault;` inside your PostgreSQL prompt.*

### Running the Application

- **Development Mode** (with hot-reloading enabled):
  ```bash
  npm run dev
  ```

- **Production Mode**:
  ```bash
  npm start
  ```

The server will start on port `3000` (or the `PORT` specified in your `.env` file).

---

## 🔌 API Documentation

> **Protected routes** require a `Authorization: Bearer <token>` header.

### Auth

#### POST `/auth/register`
Registers a new user account.

* **Body:**
  ```json
  { "email": "user@example.com", "password": "yourpassword" }
  ```
* **Response (201):** `{ "message": "User registered successfully" }`

#### POST `/auth/login`
Logs in and returns a JWT token.

* **Body:**
  ```json
  { "email": "user@example.com", "password": "yourpassword" }
  ```
* **Response (200):** `{ "token": "eyJhbGc..." }`

---

### Notes

#### GET `/notes`
Fetches all notes for the authenticated user, sorted by creation date descending.

* **Auth:** Required
* **Response (200):**
  ```json
  [
    {
      "id": 1,
      "user_id": 1,
      "title": "Weekly Standup Notes",
      "body": "Discussed Q3 roadmaps.",
      "created_at": "2026-06-27T11:00:00.000Z"
    }
  ]
  ```

#### GET `/notes/search?q=keyword`
Searches notes by title using a case-insensitive match.

* **Auth:** Required
* **Query Params:** `q` (string, required)
* **Response (200):** Array of matching notes
* **Response (400):** `{ "error": "required search query" }`

> **Architecture note:** Replaced N+1 query loop (individual DB call per note) with a single parameterized `ILIKE` SQL query — see [commit 41e133b](../../commit/41e133b).

#### GET `/notes/:id`
Fetches a single note by ID.

* **Auth:** Required
* **Response (200):** Note object
* **Response (404):** `{ "error": "This item not found" }`

#### POST `/notes`
Creates a new note.

* **Auth:** Required
* **Body:**
  ```json
  { "title": "Review Tasks", "body": "Verify CI/CD setup." }
  ```
* **Response (201):** Created note object
* **Response (400):** `{ "error": "title is required" }`

---

## 🏗️ Architecture Decisions

| Decision | Rationale |
|---|---|
| Parameterized SQL queries throughout | Prevents SQL injection |
| `ILIKE` for search | Case-insensitive match without client-side filtering |
| JWT stateless auth | No session store needed; scales horizontally |
| `bcryptjs` for passwords | One-way hashing — plaintext passwords never stored |
| `ON DELETE CASCADE` on `notes.user_id` | Deleting a user auto-removes their notes |

---

## 🤝 Contribution Guidelines

We follow standard GitHub Flow:
1. Fork the repo and create your feature branch: `git checkout -b feat/your-feature`.
2. Commit using [Conventional Commits](https://www.conventionalcommits.org/): `feat(auth): add login endpoint`.
3. Open a Pull Request against the `main` branch.
