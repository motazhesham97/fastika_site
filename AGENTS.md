# AGENTS.md

## Commands

```bash
npm run dev          # Next.js dev server (http://localhost:3000)
npm run build        # Production build
npm run lint         # ESLint (flat config, no typecheck bundled)
npm run test         # Vitest unit tests (jsdom)
npm run test:ui      # Vitest with browser UI
npm run test:e2e     # Playwright E2E tests (spawns dev server automatically)
```

There is no `typecheck` script — run `npx tsc --noEmit` manually if needed.

## Architecture

Next.js 16 App Router with React 19, React Compiler enabled (`next.config.ts`).

Route groups:
- `src/app/(frontend)/` — public store locator page (RTL Arabic UI)
- `src/app/(admin)/` — admin panel: `/login`, `/dashboard`, `/stores`

Feature-Sliced Design (not feature-based routing):
- `src/entities/` — business domain models and API (admin, store)
- `src/features/` — full vertical slices (admin-auth, store-locator)
- `src/shared/` — cross-cutting: API clients, UI primitives, types, utils
- `src/widgets/` — composed layout pieces (header, footer, admin-layout)

Path alias: `@/*` maps to `./src/*` (tsconfig + vitest + shadcn all agree).

## Key Integrations

- **Supabase**: two clients in `src/shared/api/supabase/` — `client.ts` (browser) and `server.ts` (server-side with SSR cookie handling). Import via `index.ts`.
- **Auth**: Custom JWT via `jose` + `bcryptjs`. Cookie name: `admin_session`. Middleware (`src/middleware.ts`) protects `/dashboard/*` and `/stores/*`, redirects to `/login`.
- **shadcn/ui**: `src/shared/ui/`. Style: new-york, baseColor: stone, icons: lucide. Add new components via `npx shadcn@latest add <component>`.
- **Tailwind CSS v4**: No `tailwind.config` file. Config lives in `src/app/globals.css` via `@import "tailwindcss"` and PostCSS plugin `@tailwindcss/postcss`.

## Testing

- **Unit tests** (Vitest): `src/**/*.test.{ts,tsx}`. Environment: jsdom. Setup file: `src/shared/lib/test-setup.ts` (auto-cleans, mocks `next/navigation` and `next/headers`).
- **E2E tests** (Playwright): `e2e/` directory (currently empty). Config runs 5 projects (Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari). Retries: 2 on CI, 0 locally.
- No existing test files yet.

## Database

Supabase PostgreSQL. Schema in `supabase/migrations/`. Two tables: `stores` and `admins`. RLS enabled. Requires running the migration SQL manually in Supabase Dashboard.

## Environment

Required `.env.local` variables:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
ADMIN_JWT_SECRET
```

Note: the env var is `ADMIN_JWT_SECRET` (not `JWT_SECRET` as README states — the middleware reads `process.env.ADMIN_JWT_SECRET`).
