# Agent Guide

This project is a Next.js 16 App Router site with Decap CMS content stored in the repository.

## Environment

- Use Node 24.
- Use pnpm, not npm or yarn.
- The pinned package manager is declared in `package.json`.
- Run `pnpm install` after dependency changes.

## Commands

- `pnpm dev` starts the Next.js dev server.
- `pnpm cms` starts the Decap local backend proxy for local content editing.
- `pnpm lint` runs ESLint.
- `pnpm build` creates the production Next.js build.
- `docker compose up --build -d` builds and runs the production container.
- `docker compose down` stops the production container.

## Next.js

- This uses Next.js 16 with the App Router under `src/app`.
- Read the installed Next docs in `node_modules/next/dist/docs/` before relying on older Next.js conventions.
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

## Content

- Page content lives under `content/pages`.
- Post content lives under `content/posts`.
- Posts are Markdown files with YAML frontmatter.
- The homepage reads posts through `src/lib/posts.ts`.
- If adding richer Markdown rendering, keep parsing/rendering in the Next app. Decap edits content but does not render the site.

## Verification

Before handing off code changes, run:

```bash
pnpm lint
pnpm build
```

For Docker-related changes, also run:

```bash
docker compose build
```
