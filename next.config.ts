import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true, // 👈 allows build despite TypeScript errors
  },
  eslint: {
    ignoreDuringBuilds: true, // 👈 disables ESLint in build
  },
};

export default nextConfig;
