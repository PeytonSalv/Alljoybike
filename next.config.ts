import type { NextConfig } from 'next';

/**
 * Next.js configuration (TypeScript variant of next.config.js)
 *
 * – Enables React strict mode
 * – Allows <Image> to load files stored on Booqable’s CDN hosts
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      // uploads on the *.booqable.com admin host
      {
        protocol: 'https',
        hostname: '**.booqable.com',
        pathname: '/uploads/**',
      },
      // regional CDN hosts that Booqable uses
      {
        protocol: 'https',
        hostname: '**.booqablecdn.com',
        pathname: '/uploads/**',
      },
      // imgix CDN Booqable switches to for image variants
      {
        protocol: 'https',
        hostname: '**.imgix.net',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
