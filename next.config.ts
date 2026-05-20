import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // HTTPS sources (Unsplash demos, CDNs, any external image host)
      { protocol: "https", hostname: "**" },
      // HTTP sources (self-hosted backend on LAN / dev server)
      { protocol: "http", hostname: "**" },
    ],
  },
};

export default nextConfig;
