// next.config.js or next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    // (https://images.unsplash.com/photo-1600585154340-be6161a56a0c) 
    domains: [
      "via.placeholder.com",
      "placehold.co",
      "storage.googleapis.com",
      "arx-test.com",
      "images.unsplash.com"

    ],
  },
};

export default withNextIntl(nextConfig);
