/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
  // Ensure compatibility with existing code
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;