# DGG Frontpage

A Next.js 16 and Decap CMS frontpage project running on Node 24.

The CMS writes content to `digitalgroundgame/dgg-frontpage`.

## Requirements

- Node 24
- pnpm 10.27 or newer

Use Corepack to install the pinned pnpm version:

```bash
corepack enable
corepack prepare pnpm@10.27.0 --activate
```

## Development

Install dependencies:

```bash
pnpm install
```

Run the Next.js app:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Run the Decap CMS local backend in a second terminal when editing content locally:

```bash
pnpm cms
```

Then open [http://localhost:3000/admin/](http://localhost:3000/admin/).

## Checks

```bash
pnpm lint
pnpm build
```

## Production Docker

Create a `.env` file with the GitHub OAuth values:

```bash
cp .env.example .env
```

Build and run the production image:

```bash
docker compose up --build -d
```

Stop it:

```bash
docker compose down
```

The container serves the Next.js app on [http://localhost:3000](http://localhost:3000).

On Coolify, `HOSTNAME` is populated from Coolify's `HOST` runtime variable so Next binds to the right interface. Public site information is exposed separately from Coolify's entered domains through `PUBLIC_URL=${COOLIFY_URL}` and `PUBLIC_HOSTNAME=${COOLIFY_FQDN}`.

## Content

Decap CMS is mounted from `public/admin`. Starter content lives in `content/pages` and `content/posts`.

## GitHub CMS Backend

The CMS uses Decap's GitHub backend for production and Decap's local backend for local file edits.

Create a GitHub OAuth app with these callback URLs:

```text
http://localhost:3000/api/cms/callback
https://YOUR_PRODUCTION_DOMAIN/api/cms/callback
```

Set the OAuth app homepage URL to the matching site origin, for example `http://localhost:3000` locally or the production domain for the deployed app.

Set the OAuth app values in `.env`:

```bash
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
DECAP_GITHUB_SCOPE=public_repo,user
```

Use `repo,user` instead if the repository is made private again.

The target GitHub repo is `digitalgroundgame/dgg-frontpage` and is configured in `public/admin/config.js`.
