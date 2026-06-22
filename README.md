# DGG Frontpage

A Next.js 16 and Decap CMS frontpage project running on Node 24.

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

Run the Next.js and admin apps:

```bash
pnpm dev:all
```

Open [http://localhost:3000](http://localhost:3000).

To serve the development app from another hostname on your network, set
`DEV_HOSTNAME` before starting the app:

```bash
DEV_HOSTNAME=your-dev-host.example pnpm dev:all
```

The app remains available at [http://localhost:3000](http://localhost:3000)
when `DEV_HOSTNAME` is set.

When using `/admin` from a network hostname, keep `pnpm dev:all` running so the
Decap local backend proxy is available on the same hostname at port `8081`.

## Checks

```bash
pnpm lint
pnpm build
```

## Production Docker

Build and run the production image:

```bash
docker compose up --build
```

Stop it:

```bash
docker compose down
```

## Content

Decap CMS is mounted from `public/admin`. 

## GitHub CMS Backend

The CMS uses Decap's GitHub backend for production.

Create a GitHub OAuth app with these callback URLs:

```text
http://localhost:3000/api/cms/callback
https://YOUR_PRODUCTION_DOMAIN/api/cms/callback
```

Set the OAuth app values in the environment:

```bash
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
DECAP_GITHUB_SCOPE=public_repo,user
```

The OAuth route builds its GitHub callback URL from forwarded proxy headers, so production deploys must preserve `x-forwarded-host` and `x-forwarded-proto`.
