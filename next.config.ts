import type { NextConfig } from "next";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  fallbacks: {
    document: "/~offline",
  },
  cacheStartUrl: true,
  register: true,
  skipWaiting: true,
  workboxOptions: {
    clientsClaim: true,
    runtimeCaching: [
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        urlPattern: (pattern: any) => pattern.request.mode === "navigate",
        handler: "NetworkFirst",
        options: {
          cacheName: "pages-cache",
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 24 * 60 * 60,
          },
        },
        networkTimeoutSeconds: 10,
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        urlPattern: (pattern: any) => pattern.url.pathname.startsWith("/api/"),
        handler: "CacheFirst",
        options: {
          cacheName: "api-cache",
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
          },
        },
      },
      {
        urlPattern: /\.(?:png|gif|jpg|jpeg|svg|webp)$/i,
        handler: "CacheFirst",
        options: {
          cacheName: "images-cache",
          expiration: {
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60,
          },
        },
      },
      {
        urlPattern: /\.(?:woff|woff2|ttf|otf|eot)$/i,
        handler: "CacheFirst",
        options: {
          cacheName: "fonts-cache",
          expiration: {
            maxEntries: 30,
            maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
          },
        },
      },
    ],
  },
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  extendDefaultRuntimeCaching: true,
});

const nextConfig = {
  eslint: {
    dirs: ["src"],
    ignoreDuringBuilds: true,
  },
} satisfies NextConfig;

module.exports = withPWA(nextConfig);
