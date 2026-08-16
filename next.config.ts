import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: {
    root: process.cwd(),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 100],
  },
};

export default nextConfig;
