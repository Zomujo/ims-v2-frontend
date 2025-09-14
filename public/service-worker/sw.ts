import { defaultCache } from "@serwist/next/worker";
import { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";
import { NetworkFirst } from "serwist";
import { StaleWhileRevalidate } from "serwist";

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

const sessionCachePlugins = [
  {
    // Ensure only successful responses cached, stripping no-store
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cacheWillUpdate: async ({ response }: any) => {
      if (!response || response.status !== 200) return null;
      const body = await response.clone().arrayBuffer();
      return new Response(body, {
        status: response.status,
        statusText: response.statusText,
        headers: { "Content-Type": "application/json" },
      });
    },
    // Provide cached or synthetic session when offline & no cache yet
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handlerDidError: async ({ request }: any) => {
      const cache = await caches.open("session-cache");
      const cached = await cache.match(request);
      if (cached) return cached;
      return new Response(
        JSON.stringify({
          user: {
            name: "Offline User",
            email: "offline@local",
            role: "OFFLINE",
            permissions: [],
          },
          expires: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
          offline: true,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    },
  },
];

// WARM: ensure session is cached while online so first offline load works.
// (Safe no-op if already cached or unauthenticated.)
self.addEventListener("activate", (event) => {
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
});

const serwist = new Serwist({
  precacheEntries: [...(self.__SW_MANIFEST || []), ...urlsToPrecache],
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    ...defaultCache,
    // Cache navigation requests (HTML pages)
    {
      matcher: ({ request }) => request.mode === "navigate",
      handler: new NetworkFirst({
        cacheName: "pages-cache",
        networkTimeoutSeconds: 2,
      }),
    },
    {
      matcher: ({ url }) => url.pathname.startsWith("/api/auth/session"),
      handler: new StaleWhileRevalidate({
        cacheName: "session-cache",
        plugins: sessionCachePlugins,
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

serwist.addEventListeners();
