import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // typescript: {
  //   ignoreBuildErrors: true, // 👈 allows build despite TypeScript errors
  // },
  // eslint: {
  //   ignoreDuringBuilds: true, // 👈 disables ESLint in build
  // },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "expo-secure-store": false,
    };
    return config;
  },
};

export default nextConfig;
