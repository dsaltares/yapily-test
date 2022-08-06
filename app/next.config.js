/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['page.ts', 'page.tsx', 'next.tsx', 'route.ts'],
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.yapily.com'],
  },
};

module.exports = nextConfig;
