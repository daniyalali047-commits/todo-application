# Todo Application

A task manager with a React frontend and an Express API backed by MongoDB. Users can sign up, log in, and create, view, update, and delete tasks. Tasks support low, medium, and high priority.

## Requirements

- Node.js and npm
- A MongoDB database reachable by the backend

## Setup

### Backend

Configure the MongoDB connection in `backend/dbconfig.js`, then start the API:

```bash
cd backend
npm install
node index.js
```

The API listens on `http://localhost:8000`.

### Frontend

In a second terminal, start the Vite development server:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

The Vite development server proxies the frontend's API requests to the backend on port `8000`.

## Authentication and API

The backend issues JWTs at signup or login and checks the token cookie on protected API routes. Signup and login are public; task routes require a valid token. The frontend checks `/auth` before showing protected pages.

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/signup` | Create an account |
| `POST` | `/login` | Log in |
| `GET` | `/auth` | Check whether the current token is valid |
| `POST` | `/add-task` | Create a task |
| `GET` | `/tasks` | List tasks |
| `GET` | `/tasks/:id` | Get one task |
| `PUT` | `/update-task` | Update a task |
| `DELETE` | `/delete-task/:id` | Delete a task |

## Frontend Checks

Run these from the `frontend` directory:

```bash
npm run lint
npm run build
```

## Security Note

The backend currently has database credentials in `backend/dbconfig.js` and a JWT signing secret in `backend/index.js`. Do not commit real credentials or use the current hard-coded JWT secret in production. Rotate any database credential that has already been committed, and move secrets into environment variables before deploying.