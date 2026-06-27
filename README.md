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
- **Local Dev Tooling:** `nodemon` (auto-reload)

---

## 📁 Repository Structure

```text
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── pull_request_template.md
├── .env.example            # Template for environment configurations
├── .gitignore              # Files ignored by Git
├── LICENSE                 # Project License (MIT)
├── README.md               # Project documentation (this file)
├── db.js                   # PostgreSQL pool initialization
├── index.js                # Express server and endpoints
├── package.json            # Dependencies and npm scripts
└── schema.sql              # Database schema definition
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
   *Modify the database credentials in the newly created `.env` file to match your local database settings.*

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

### 1. Retrieve All Notes
Fetches all notes, sorted by the creation date in descending order.

* **URL:** `/notes`
* **Method:** `GET`
* **Response (200 OK):**
  ```json
  [
    {
      "id": 1,
      "title": "Weekly Standup Notes",
      "body": "Discussed Q3 roadmaps and API schema migrations.",
      "created_at": "2026-06-27T11:00:00.000Z"
    }
  ]
  ```

---

### 2. Retrieve Note by ID
Fetches details of a single note.

* **URL:** `/notes/:id`
* **Method:** `GET`
* **Path Params:** `id` (integer)
* **Response (200 OK):**
  ```json
  {
    "id": 1,
    "title": "Weekly Standup Notes",
    "body": "Discussed Q3 roadmaps and API schema migrations.",
    "created_at": "2026-06-27T11:00:00.000Z"
  }
  ```
* **Response (404 Not Found):**
  ```json
  {
    "error": "Note not found"
  }
  ```

---

### 3. Create Note
Creates a new note entry.

* **URL:** `/notes`
* **Method:** `POST`
* **Body Format:** `JSON`
* **Payload Structure:**
  ```json
  {
    "title": "Review Tasks",
    "body": "Verify CI/CD setup for GitHub."
  }
  ```
* **Response (201 Created):**
  ```json
  {
    "id": 2,
    "title": "Review Tasks",
    "body": "Verify CI/CD setup for GitHub.",
    "created_at": "2026-06-27T11:15:00.000Z"
  }
  ```

---

## 🤝 Contribution Guidelines

We follow standard GitHub Flow:
1. Fork the repo and create your feature branch: `git checkout -b feature/amazing-feature`.
2. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/): `feat: add note search functionality`.
3. Open a Pull Request against the `main` branch.
