import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack config (Next.js 16+ default bundler)
  turbopack: {},

  webpack: (config) => {
    // Stellar SDK uses Node.js built-ins — polyfill them for the browser
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    };
    return config;
  },
};

export default nextConfig;