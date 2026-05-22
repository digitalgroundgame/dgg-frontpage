import type { NextConfig } from "next";

const devHostname = process.env.DEV_HOSTNAME?.trim();
const allowedDevOrigins = [
  "127.0.0.1",
  ...(devHostname ? [devHostname] : []),
];

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.shopify.com" }],
  },
  allowedDevOrigins,
  async headers() {
    return [
      {
        // Cache public page responses, but leave CMS routes and file-like
        // assets to their existing cache behavior.
        source:
          "/((?!admin(?:/|$)|api(?:/|$)|_next(?:/|$))(?!.*\\.[^/]+$).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=300, s-maxage=300",
          },
          {
            key: "Cloudflare-CDN-Cache-Control",
            value: "max-age=300",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
