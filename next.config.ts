import type { NextConfig } from "next";

const devHostname = process.env.DEV_HOSTNAME?.trim();

const nextConfig: NextConfig = {
  output: "standalone",
  ...(devHostname ? { allowedDevOrigins: [devHostname] } : {}),
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
        permanent: false,
      },
      {
        source: "/vote",
        destination: "https://voteabroad.org/ccJP-DGG-2026",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
