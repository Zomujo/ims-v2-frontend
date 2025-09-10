import { defaultCache } from "@serwist/next/worker";
import { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";
import { NetworkFirst } from "serwist";

declare global {
  interface ServiceWorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    ...defaultCache,
    {
      matcher: ({ url }) => url.pathname.startsWith("/api/auth/session"),
      handler: new NetworkFirst({
        cacheName: "session-cache",
        networkTimeoutSeconds: 2,
      }),
    },
    {
      matcher: ({ url }) =>
        url.pathname.startsWith("/api/") &&
        !url.pathname.startsWith("/api/auth/session"),
      handler: new NetworkFirst({
        cacheName: "api-cache",
      }),
    },
  ],
});

const urlsToPrecache = [
  "/",
  "/dashboard",
  "/items",
  "/items?state=create",
  "/items?state=edit",
  "/items/batches",
  "/items/batches?state=create",
  "/items/batches?state=edit",
  "/categories",
  "/categories?state=create",
  "/categories?state=edit",
  "/stock-adjustment",
  "/stock-adjustment?state=create",
  "/stock-adjustment?state=edit",
  "/expiry",
  "/item-orders",
  "/item-orders?state=create",
  "/item-orders?state=edit",
  "/suppliers",
  "/suppliers?state=create",
  "/suppliers?state=edit",
  "/sales",
  "/sales?todaySales=true",
  "/sales/record",
  "/department-requests",
  "/reports",
  "/audit-logs",
  "/tutorials",
  "/settings/general",
  "/settings/security",
  "/settings/departments",
  "/settings/users",
  "/settings/notifications",
  "/settings/expiry",
  "/reports/stock-level-report",
  "/reports/stock-movement-report",
  "/reports/earnings-overview",
] as const;

self.addEventListener("install", (event) => {
  const requestPromises = Promise.all(
    urlsToPrecache.map(async (entry) => {
      return serwist.handleRequest({ request: new Request(entry), event });
    }),
  );

  event.waitUntil(requestPromises);
});

serwist.addEventListeners();
