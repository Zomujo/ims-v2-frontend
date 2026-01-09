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

const revision = crypto.randomUUID();

const urlsToPrecache: PrecacheEntry[] = [
  { url: "/", revision },
  { url: "/dashboard", revision },
  { url: "/items", revision },
  { url: `/items?status=${ITEMS_STATUS.LOW}`, revision },
  { url: `/items?status=${ITEMS_STATUS.OUT_OF_STOCK}`, revision },
  { url: "/items?state=create", revision },
  { url: "/items?state=edit", revision },
  { url: "/items/batches", revision },
  { url: "/items/batches?state=create", revision },
  { url: "/items/batches?state=edit", revision },
  { url: "/categories", revision },
  { url: "/categories?state=create", revision },
  { url: "/categories?state=edit", revision },
  { url: "/stock-adjustment", revision },
  { url: "/stock-adjustment?state=create", revision },
  { url: "/stock-adjustment?state=edit", revision },
  { url: "/expiry", revision },
  { url: "/item-orders", revision },
  { url: "/item-orders?state=create", revision },
  { url: "/item-orders?state=edit", revision },
  { url: "/suppliers", revision },
  { url: "/suppliers?state=create", revision },
  { url: "/suppliers?state=edit", revision },
  { url: "/sales", revision },
  { url: "/sales?todaySales=true", revision },
  { url: "/sales/record", revision },
  { url: "/department-requests", revision },
  { url: "/reports", revision },
  { url: "/audit-logs", revision },
  { url: "/tutorials", revision },
  { url: "/settings/general", revision },
  { url: "/settings/security", revision },
  { url: "/settings/departments", revision },
  { url: "/settings/users", revision },
  { url: "/settings/notifications", revision },
  { url: "/settings/expiry", revision },
  { url: "/reports/stock-level-report", revision },
  { url: "/reports/stock-movement-report", revision },
  { url: "/reports/earnings-overview", revision },
  { url: "/ussd-codes", revision },
  { url: "/~offline", revision },
];

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
  fallbacks: {
    entries: [
      {
        url: "/~offline",
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
});

serwist.addEventListeners();
