const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  outputFileTracingRoot: path.resolve(__dirname),
  // All routes are SSG (generateStaticParams + dynamicParams=false), so the
  // server never reads public/Images at runtime. Without this exclude, file
  // tracing drags all ~413MB of images into the serverless bundle, which
  // exceeds Netlify's upload limit and fails the deploy.
  outputFileTracingExcludes: {
    '*': ['./public/Images/**'],
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    // 75 = Next.js default (unset quality prop). 62 = grid thumbnail quality
    // (findings-performance.md P2, ~30-40% smaller, visually identical at
    // card size). Any quality value passed to next/image MUST be listed
    // here or Next.js rejects it.
    qualities: [62, 75],
  },
  async redirects() {
    return [
      {
        source: '/schedule-call',
        destination: '/contact#schedule',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: process.env.NODE_ENV === 'development'
              ? "default-src 'self'; base-uri 'self'; frame-ancestors 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self' ws: wss:; frame-src 'self' https://www.google.com https://calendly.com"
              : "default-src 'self'; base-uri 'self'; frame-ancestors 'self'; img-src 'self' data: https: https://www.google.com; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com; frame-src 'self' https://www.google.com https://calendly.com",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
