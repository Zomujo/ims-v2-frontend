/* eslint-disable */
import type { NextConfig } from "next";
import { redirect } from "next/dist/server/api-utils";

const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = withPWA({
  eslint: {
    dirs: ["src"],
    ignoreDuringBuilds: true,
  },
  // rewrites: async () => {
  //   return [
  //     {
  //       source: "/:path*",
  //       destination: "/ims-entry/:path*",

  //     },
  //   ];
  // },
});

export default nextConfig;
