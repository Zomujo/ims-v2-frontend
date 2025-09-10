/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from "next/constants";
import type { NextConfig } from "next";

export default async (phase: string) => {
  const nextConfig: NextConfig = {
    eslint: {
      dirs: ["src"],
      ignoreDuringBuilds: true,
    },
  };

  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const { default: withSerwist } = await import("@serwist/next");
    return withSerwist({
      swSrc: "public/service-worker/sw.ts",
      swDest: "public/sw.js",
      reloadOnOnline: true,
    })(nextConfig);
  }

  return nextConfig;
};
