/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { 
    unoptimized: true,
    domains: ['ui-avatars.com']
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;