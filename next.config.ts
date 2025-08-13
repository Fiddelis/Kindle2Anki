import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['@steve2955/anki-apkg-export', 'sql.js'],

  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = { fs: false, path: false, os: false };
    }
    return config;
  },
};

export default nextConfig;
