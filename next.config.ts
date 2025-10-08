// next.config.js or next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // Target modern browsers to reduce polyfills
  compiler: {
    // Remove console.logs in production
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    // (https://images.unsplash.com/photo-1600585154340-be6161a56a0c)
    domains: [
      "via.placeholder.com",
      "placehold.co",
      "storage.googleapis.com",
      "arx-test.com",
      "images.unsplash.com",
    ],
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "@heroicons/react",
      "framer-motion",
    ],
  },
  webpack: (config, { isServer, dev }) => {
    // Optimize bundle splitting
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            priority: 10,
          },
          framerMotion: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: "framer-motion",
            chunks: "all",
            priority: 20,
          },
          swiper: {
            test: /[\\/]node_modules[\\/]swiper[\\/]/,
            name: "swiper",
            chunks: "all",
            priority: 20,
          },
          reactIcons: {
            test: /[\\/]node_modules[\\/]react-icons[\\/]/,
            name: "react-icons",
            chunks: "all",
            priority: 20,
          },
        },
      };
    }

    // Optimize for modern browsers
    if (!isServer && !dev) {
      // Use modern JavaScript features without polyfills for modern browsers
      config.resolve.alias = {
        ...config.resolve.alias,
        // Ensure we're using modern versions
      };
    }

    return config;
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
