# ServerFY

Marketing site and admin console for ServerFY — SAP S/4HANA, ECC and HANA server access for practice, training and projects.

## Stack

- TanStack Start (React 19) + Vite 8
- Tailwind CSS v4
- Nitro build output (Vercel preset in CI, Node server locally)
- Express + MongoDB Atlas API in `backend/` (deployed separately on Render)

## Development

Requires Node.js 20+.

```sh
npm install
npm run dev      # http://localhost:8080
npm run build    # production build
npm run lint
```

## Environment

- `VITE_API_URL` — base URL of the backend API (analytics, leads, blog studio).
- Backend variables are documented in `backend/.env.example`.

## Structure

```
src/routes/        file-based routes (public pages, blog, hidden admin console)
src/components/    UI sections and shared components
src/data/          static content, module and server catalogues
src/lib/           SEO helpers, API clients, analytics
backend/           Express API (MongoDB Atlas)
```
