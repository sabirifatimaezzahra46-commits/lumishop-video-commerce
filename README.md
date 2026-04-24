# Cloudflare Workers + Convex React Template

[![Deploy to Cloudflare][![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/sabirifatimaezzahra46-commits/lumishop-video-commerce)]

A production-ready full-stack application template featuring Cloudflare Workers for the API layer, Cloudflare Pages for the React frontend, and Convex for the real-time backend with authentication and file storage.

## Features

- **Full-Stack Ready**: React 18 frontend with React Router, Tailwind CSS, and shadcn/ui components.
- **Authentication**: Email/password with OTP verification, password reset, and anonymous sign-in powered by Convex Auth.
- **File Storage**: Secure user-specific file uploads with metadata querying and deletion.
- **API Layer**: Hono-based Cloudflare Worker with CORS, logging, and error handling.
- **Real-Time Backend**: Convex for schema-based data, queries, mutations, and storage.
- **Developer Experience**: Hot-reload dev server, TypeScript end-to-end, error reporting, and theme support.
- **Responsive UI**: Modern design with dark/light themes, sidebar layout, and animations.
- **Production Optimized**: Automatic Convex deployment, Cloudflare assets handling, and SPA routing.

## Tech Stack

- **Frontend**: React 18, React Router, Tailwind CSS, shadcn/ui, TanStack Query, Sonner (toasts), Lucide icons.
- **Backend**: Convex (queries, mutations, auth, storage), Hono (API routing).
- **Deployment**: Cloudflare Workers/Pages, Wrangler.
- **Tools**: Bun (package manager), Vite (build tool), TypeScript, ESLint.
- **Other**: Immer (state), Framer Motion (animations), Zod (validation).

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) installed (`curl -fsSL https://bun.sh/install | bash`).
- [Cloudflare CLI (Wrangler)](https://developers.cloudflare.com/workers/wrangler/install/) logged in (`npx wrangler login`).
- [Convex CLI](https://kit.convex.dev/) (`npx convex dev` will prompt setup).
- Environment variables:
  - `VITE_CONVEX_URL`: Your Convex deployment URL.
  - `ANDROMO_SMTP_URL` and `ANDROMO_SMTP_API_KEY` for email OTP (optional for dev).

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   bun install
   ```
3. Deploy backend (Convex):
   ```bash
   bun run backend:deploy
   ```
   - Follow prompts to link your Convex project and set `VITE_CONVEX_URL` in `.env`.
4. Set email env vars if needed (for production auth).

### Development

1. Start the dev server:
   ```bash
   bun dev
   ```
   - Frontend: `http://localhost:3000`
   - Backend: Auto-deploys on changes via `convex dev --once`.
   - API: `/api/*` routes via Worker.

2. Type generation:
   ```bash
   bun run cf-typegen  # For Workers types
   ```

3. Lint:
   ```bash
   bun lint
   ```

## Usage

- **Routes**: `/` (Home), `/about` (demo page). Extend in `src/pages/`.
- **Auth**: Use `<SignInForm />` and `<SignOutButton />`.
- **Files**: Upload via Convex storage (see `convex/files.ts`).
- **API**: Add routes in `worker/userRoutes.ts` (auto-reloads).
- **Customization**:
  - UI: Edit `src/components/ui/` (shadcn).
  - Convex: `convex/schema.ts`, `convex/auth.ts`.
  - Layout: `src/components/layout/AppLayout.tsx`.

Example API call (from frontend):
```ts
// In a React component
const files = useQuery(api.files.listFiles);
```

## Deployment

1. Build the app:
   ```bash
   bun run build
   ```
   - Builds static assets to `dist/`.
   - Deploys Convex backend.

2. Deploy to Cloudflare:
   ```bash
   bun run deploy
   ```
   - Or use Wrangler dashboard.

3. Set secrets:
   ```bash
   wrangler secret put ANDROMO_SMTP_URL
   wrangler secret put ANDROMO_SMTP_API_KEY
   ```

[![Deploy to Cloudflare][![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/sabirifatimaezzahra46-commits/lumishop-video-commerce)]

**Custom Domain**: Configure in Cloudflare Pages dashboard.

## Project Structure

```
├── convex/          # Backend: Schema, auth, files, HTTP router
├── src/             # Frontend: React app, pages, components, hooks
├── worker/          # API: Hono routes, core utils
├── shared/          # Shared types/utils
├── vite.config.ts   # Frontend build config
└── wrangler.jsonc   # Workers config
```

## Environment Variables

| Variable              | Description                  | Required |
|-----------------------|------------------------------|----------|
| `VITE_CONVEX_URL`     | Convex backend URL           | Dev/Prod |
| `ANDROMO_SMTP_URL`    | SMTP service URL             | Auth     |
| `ANDROMO_SMTP_API_KEY`| SMTP API key                 | Auth     |

## Contributing

1. Fork and clone.
2. Install deps: `bun install`.
3. Create feature branch.
4. Lint and test changes.
5. Submit PR.

## License

MIT. See [LICENSE](LICENSE) for details.

---

Built with ❤️ using Cloudflare Workers, Convex, and React.