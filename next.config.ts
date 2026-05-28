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
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    return [
      {
        source: '/upload/:path*',
        destination: `${apiUrl}/upload/:path*`,
      },
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
