# ServerFY backend (Express + MongoDB Atlas)

Standalone API for the contact / server-request form. Deploys to Render.

## Local run

```bash
cd backend
cp .env.example .env      # fill in MONGODB_URI and ADMIN_API_KEY
npm install
npm run dev
```

## Endpoints

| Method | Path                   | Auth              | Purpose                        |
| ------ | ---------------------- | ----------------- | ------------------------------ |
| GET    | `/health`              | public            | Health check for Render        |
| POST   | `/api/server-requests` | public, rate-limited | Store a server request      |
| GET    | `/api/server-requests` | `x-admin-key`     | List latest requests           |

## Security

- Secrets live only in `.env` (git-ignored) or Render's Environment tab — never in code.
- `helmet` security headers, JSON body capped at 100kb.
- CORS restricted to `CORS_ORIGINS`.
- Zod validation + hidden honeypot field, 10 submissions / 10 min per IP.
- Admin listing uses a constant-time comparison of `ADMIN_API_KEY`.

## Deploy to Render

1. Push this repo to GitHub.
2. Render > New > Web Service > pick the repo, Root Directory `backend`.
3. Build `npm install`, Start `npm start`, Health check `/health`.
4. Add env vars: `MONGODB_URI`, `MONGODB_DB`, `CORS_ORIGINS`, `ADMIN_API_KEY`.
5. In MongoDB Atlas > Network Access, allow `0.0.0.0/0` (or Render's static IPs).

## Connect the frontend

Set `VITE_API_URL=https://<your-service>.onrender.com` in the frontend env.
