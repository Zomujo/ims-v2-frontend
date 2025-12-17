import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants";
import type { NextConfig } from "next";
import withSerwist from "@serwist/next";

export default async (phase: string) => {
  const nextConfig: NextConfig = {};
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    return withSerwist({
      swSrc: "public/service-worker/sw.ts",
      swDest: "public/sw.js",
      reloadOnOnline: true,
    })(nextConfig);
  }

  return nextConfig;
};
