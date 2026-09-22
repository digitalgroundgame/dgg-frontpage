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
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) for local development. It
redirects to HTTPS on the same address. The dev command creates an untracked,
self-signed development certificate; accept the browser warning on each device
you use for development.

To serve the development app from another hostname on your network, set
`DEV_HOSTNAME` before starting the app:

```bash
DEV_HOSTNAME=your-dev-host.example pnpm dev
```

The app remains available at [https://localhost:3000](https://localhost:3000).
When using another hostname or IP, open it over HTTPS; HTTP requests redirect
to HTTPS on the same port.

When using `/admin` from a network hostname, keep `pnpm dev` running. The
Next.js app proxies CMS requests to the local Decap backend, so only port `3000`
needs to be reachable from the network. Use the HTTPS hostname or IP address
for the remote browser and accept its self-signed certificate warning. To add
the Tailscale hostname and IP to the generated certificate, set them when
starting the app:

```bash
DEV_HOSTNAME=your-machine.your-tailnet.ts.net DEV_TAILSCALE_IP=100.x.y.z pnpm dev
```

Delete `certificates/localhost.pem` and `certificates/localhost-key.pem` if
you change either value and need a new certificate.

## Checks

```bash
pnpm lint
pnpm build
```

## Production Docker

Build and run the production image:

```bash
docker build --tag dgg-frontpage .
docker run --rm --publish 3000:3000 \
  --env-file .env.local \
  dgg-frontpage
```

The image exposes port `3000`, listens on all interfaces, and includes a health
check at `/api/health`.

The Coolify production application uses the Dockerfile build pack with
`/Dockerfile`, port `3000`, and the `/api/health` health check. Configure both
`https://digitalgroundgame.org` and `https://www.digitalgroundgame.org`, with
the redirect direction set to non-www, in Coolify.

## Content

Decap CMS is mounted from `public/admin`. 

## GitHub CMS Backend

The CMS uses Decap's GitHub backend for production.

Create a GitHub OAuth app with these callback URLs:

```text
https://localhost:3000/api/cms/callback
https://YOUR_PRODUCTION_DOMAIN/api/cms/callback
```

Set the OAuth app values in the environment:

```bash
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
DECAP_GITHUB_SCOPE=public_repo,user
```

The OAuth route builds its GitHub callback URL from forwarded proxy headers, so production deploys must preserve `x-forwarded-host` and `x-forwarded-proto`.

## Action Network Supporters

The supporters page can display the names in an Action Network saved report. In
Action Network, create a report that targets active Tier IV supporters who have
agreed to public recognition. Then set:

```bash
ACTION_NETWORK_API_KEY=...
ACTION_NETWORK_TIER_IV_LIST_ID=...
```

Use the report's UUID from its Action Network API list URL, without the
`action_network:` prefix. For local development, put these values in the
gitignored `.env.local` file. In production, configure them as runtime
environment variables on the Coolify application. The Docker image does not
need the API key at build time.

When either variable is missing, the page displays a small test seed so the
Founding Supporters section remains visible during local development.

Only a person's nonblank `Website_Credit_Name` custom field is published; the
site never falls back to their account name. The backend serves names from its
persistent cache and revalidates that cache against Action Network every 24
hours. It also checks the report's `modified_date` and logs a warning when the
report is more than 24 hours old. Action Network reports are read-only through
the API, so a stale report must be rerun in Action Network.
