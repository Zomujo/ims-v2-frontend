import { defaultCache } from "@serwist/next/worker";
import {
  Serwist,
  NetworkFirst,
  PrecacheEntry,
  SerwistGlobalConfig,
  NetworkOnly,
  ExpirationPlugin,
} from "serwist";
import { ITEMS_STATUS } from "@features/shared/types/action.types";

declare global {
  interface ServiceWorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const urlsToPrecache = [
  "/",
  "/dashboard",
  "/items",
  `/items?status=${ITEMS_STATUS.LOW}`,
  `/items?status=${ITEMS_STATUS.OUT_OF_STOCK}`,
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
  "/ussd-codes",
] as const;

// const sessionCachePlugins = [
//   {
//     // Cache only successful responses.
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     cacheWillUpdate: async ({ response }: any) => {
//       if (!response || response.status !== 200) return null;
//       const body = await response.clone().arrayBuffer();
//       return new Response(body, {
//         status: response.status,
//         statusText: response.statusText,
//         headers: { "Content-Type": "application/json" },
//       });
//     },
//   },
// ];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
self.addEventListener("message", (event: any) => {
  if (event?.data?.type === "REFRESH_SESSION") {
    event.waitUntil(
      (async () => {
        try {
          const res = await fetch("/api/auth/session", {
            credentials: "include",
          });
          if (res.ok) {
            const cache = await caches.open("session-cache");
            await cache.put("/api/auth/session", res.clone());
          }
        } catch {
          // ignore
        }
      })(),
    );
  }
});

const serwist = new Serwist({
  precacheEntries: [...(self.__SW_MANIFEST || []), ...urlsToPrecache],
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    {
      matcher: /\/api\/auth\/.*/,
      handler: new NetworkOnly({
        plugins: [
          new ExpirationPlugin({
            maxEntries: 16,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          }),
        ],
        networkTimeoutSeconds: 10,
      }),
    },
    ...defaultCache,
    {
      matcher: ({ request }) => request.mode === "navigate",
      handler: new NetworkFirst({
        cacheName: "pages-cache",
        networkTimeoutSeconds: 2,
      }),
    },
    // {
    //   matcher: ({ url }) => url.pathname === "/api/auth/session",
    //   handler: new NetworkFirst({
    //     cacheName: "session-cache",
    //     networkTimeoutSeconds: 3,
    //   }),
    // },
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

serwist.addEventListeners();
