import type { NextConfig } from "next";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const precacheManifest = require("./precache-manifest");

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  fallbacks: {
    document: "/~offline",
  },
  cacheStartUrl: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  extendDefaultRuntimeCaching: true,
});

const nextConfig = {
  eslint: {
    dirs: ["src"],
    ignoreDuringBuilds: true,
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    dynamicStartUrl: false,
    additionalManifestEntries: precacheManifest.map((url: never) => ({
      url,
      revision: null,
    })),
    workboxOptions: {
      exclude: [
        /\.map$/,
        /\/_next\/static\/.*\.woff2$/,
        /^manifest.*\.json$/,
        "/some-large-lib.js",
      ],
    },
  },
} satisfies NextConfig;

module.exports = withPWA(nextConfig);
