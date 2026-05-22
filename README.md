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

Build and run the production image:

```bash
docker compose up --build -d
```

Stop it:

```bash
docker compose down
```

The container serves the Next.js app on [http://localhost:3000](http://localhost:3000).

## Content

Decap CMS is mounted from `public/admin`. Starter content lives in `content/pages` and `content/posts`.
