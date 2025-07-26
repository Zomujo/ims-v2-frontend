/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextConfig } from "next";

const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

module.exports = async (phase: any) => {
  // Your current or future configuration

  const nextConfig = {
    eslint: {
      dirs: ["src"],
      ignoreDuringBuilds: true,
    },
  } satisfies NextConfig;

  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withSerwist = (await import("@serwist/next")).default({
      swSrc: "public/service-worker/sw.ts",
      swDest: "public/sw.js",
      reloadOnOnline: true,
    });
    return withSerwist(nextConfig);
  }

  return nextConfig;
};
