import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants";
import type { NextConfig } from "next";
import withSerwist from "@serwist/next";

export default async (phase: string) => {
  const nextConfig: NextConfig = {
    // Required for the Docker multi-stage build to produce a self-contained
    // server bundle (copies only the files needed to run the app).
    output: "standalone",
  };
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    return withSerwist({
      swSrc: "public/service-worker/sw.ts",
      swDest: "public/sw.js",
      reloadOnOnline: true,
    })(nextConfig);
  }

  return nextConfig;
};
