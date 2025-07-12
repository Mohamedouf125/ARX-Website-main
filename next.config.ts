// next.config.js or next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    domains: [
      "via.placeholder.com",
      "placehold.co",
      "storage.googleapis.com",
      "arx-test.com",
    ],
  },
};

export default withNextIntl(nextConfig);
