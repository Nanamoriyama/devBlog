import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'supabase.com',
      },
    ],
  },
  eslint: {
    // Disable ESLint during builds to prevent build failures from warnings
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript errors during builds
    ignoreBuildErrors: true,
  },
  // Disable experimental features that might interfere with Tailwind
  // experimental: {
  //   optimizeCss: true,
  // },
};

export default nextConfig;
