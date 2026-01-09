import type { NextConfig } from "next";
import path from "node:path";

// Only use the loader in development locally
const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Turbopack rules only in local development to avoid Vercel build issues
  turbopack: process.env.VERCEL
    ? {} // empty on Vercel
    : {
        rules: {
          "*.{jsx,tsx}": {
            loaders: [LOADER],
          },
        },
      },
  // remove outputFileTracingRoot for Vercel, Next.js handles it automatically
};

export default nextConfig;
// Orchids restart: 1767966913498
