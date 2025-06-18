import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: false, // 👈 allows build despite TypeScript errors
  },
  eslint: {
    ignoreDuringBuilds: false, // 👈 disables ESLint in build
  },
};

export default nextConfig;
