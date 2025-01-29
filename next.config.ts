import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { // Add the images property and domains inside it
    domains: ['posnew.smcare.net'],
  },
  reactStrictMode: true,
};

const withNextIntl = createNextIntlPlugin('./i18n/request.ts'); // Updated path

export default withNextIntl(nextConfig);
// import type { NextConfig } from "next";

// // Next.js configuration options
// const nextConfig: NextConfig = {
//   // Enable TypeScript error ignoring for builds
//   typescript: {
//     ignoreBuildErrors: true, // Set to false when you're ready to fix TypeScript errors
//   },

//   // Enable React Strict Mode for additional checks during development
//   reactStrictMode: true, // Optional: Set to true to enable strict mode (recommended for new apps)

//   // Image optimization (optional)
//   images: {
//     domains: ['example.com'], // Add your image domains here for remote images
//   },

//   // Additional Webpack configurations (optional)
//   webpack(config, { isServer }) {
//     // Example: Custom Webpack configurations go here
//     if (!isServer) {
//       config.resolve.fallback = { fs: false }; // Example: Fix for missing Node.js modules in the browser
//     }
//     return config;
//   },

//   // Additional config options here (e.g., headers, redirects, etc.)
// };

// export default nextConfig;