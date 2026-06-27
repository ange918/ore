# NELLOA BANK

Application web fintech française — banque digitale avec inscription, espace client et panel admin.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/nelloa-bank run dev` — run the frontend (port 20254)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- Required env: none required (localStorage-based app)
- Optional env: `RESEND_API_KEY`, `ADMIN_EMAIL` — for email notifications on new signups

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS v4, wouter (routing), framer-motion, Space Grotesk font
- API: Express 5 (for email notifications only)
- No database — all user data in localStorage
- Email: Resend (optional, configured via env vars)

## Where things live

- `artifacts/nelloa-bank/src/lib/storage.ts` — localStorage data layer (users + sessions)
- `artifacts/nelloa-bank/src/pages/` — all pages (Landing, Register, Login, Dashboard, Admin)
- `artifacts/api-server/src/routes/notify-admin.ts` — POST /api/notify-admin email route
- `lib/api-spec/openapi.yaml` — API spec (only healthz endpoint used)

## Architecture decisions

- No database: all user data stored in localStorage under `nelloa_users` key
- Sessions stored in localStorage under `nelloa_session` (user ID string)
- Admin auth uses sessionStorage (clears on tab close)
- Admin password is hardcoded: `NELLOA_ADMIN_2025`
- Email notifications are fire-and-forget (non-blocking) — app works without Resend configured

## Product

- **Landing page** (`/`): Marketing page with hero, 3 account offer cards, how-it-works steps
- **Registration** (`/register`): 3-step flow (personal info → account type → summary) with UUID-based user creation
- **Login** (`/login`): Email + password authentication against localStorage
- **Dashboard** (`/dashboard`): Client space — shows KYC upload UI if blocked, account details if active
- **Admin** (`/admin`): Password-protected panel to view all users and approve/reject KYC

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Admin password: `NELLOA_ADMIN_2025` (hardcoded in AdminPage.tsx)
- New users always start with status `blocked` and kycStatus `pending` — admin must approve
- Email notifications only work when both `RESEND_API_KEY` and `ADMIN_EMAIL` env vars are set
- uuid package must be in nelloa-bank devDependencies (not just added to package.json manually)

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
