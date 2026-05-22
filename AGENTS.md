# Agent Guide

This project is a Next.js 16 App Router site with Decap CMS content stored in the repository.

## Commits and Branches

Do not make a new branch unless asked to make one or when creating a PR.

## Styles

@STYLING_GUIDE.md

## Links

- External links must open in a new tab with `target="_blank"` and `rel="noopener noreferrer"`.

## Commands

- `pnpm dev` starts the Next.js dev server.
- `pnpm cms` starts the Decap local backend proxy for local content editing.
- `pnpm lint` runs ESLint.
- `pnpm build` creates the production Next.js build.

## Next.js

- This uses Next.js 16 with the App Router under `src/app`.
- The production Docker image depends on `output: "standalone"` in `next.config.ts`.
- API routes live under `src/app/api`.

## Decap CMS

- The admin UI is served from `public/admin`.
- `public/admin/index.html` manually initializes Decap and loads `public/admin/config.js`.
- `public/admin/config.js` configures the Decap GitHub backend for `digitalgroundgame/dgg-frontpage`.
- Keep the Decap config in JavaScript unless there is a clear reason to move back to YAML; it sets `base_url` from `window.location.origin` for local and production OAuth.
- Local editing requires both `pnpm dev` and `pnpm cms`.
- Production editing requires GitHub OAuth env vars:
  - `GITHUB_CLIENT_ID`
  - `GITHUB_CLIENT_SECRET`
  - `DECAP_GITHUB_SCOPE`

## Verification

Don't start your own server, and check if there is already a server running.

If code change is risky run:

```bash
pnpm lint
pnpm build
```

For Docker-related changes, also run:

```bash
docker compose build
```

