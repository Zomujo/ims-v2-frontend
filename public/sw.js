if (!self.define) {
  let e,
    s = {};
  const n = (n, t) => (
    (n = new URL(n + ".js", t).href),
    s[n] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = n), (e.onload = s), document.head.appendChild(e);
        } else (e = n), importScripts(n), s();
      }).then(() => {
        let e = s[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (t, a) => {
    const i =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[i]) return;
    let c = {};
    const u = (e) => n(e, i),
      r = { module: { uri: i }, exports: c, require: u };
    s[i] = Promise.all(t.map((e) => r[e] || u(e))).then((e) => (a(...e), c));
  };
}
define(["./workbox-1bb06f5e"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/app-build-manifest.json",
          revision: "a291a86976c3e900416cd0cd56f9ce50",
        },
        {
          url: "/_next/static/EBMJmuCEgjwSgMRMnQPCM/_buildManifest.js",
          revision: "e5f4b7c827614f9a9ea651322ff7e64c",
        },
        {
          url: "/_next/static/EBMJmuCEgjwSgMRMnQPCM/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/1468-6930f99516e0db7d.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/1517-f8386884ec185994.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/3878-789a5c041e71d7f1.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/4009-4f1119183e499c54.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/4457-40ee945c3aa709ad.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/4788-d05f415a95980e54.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/4bd1b696-c0d7545cde076bf6.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/5032-edbc729411ae8cd9.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/5267-ea574e139b7af804.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/5348-e3646f86985d2caf.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/6577-b928426d242ada36.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/6736-b8db4d4c840f3bc8.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/6906-23cd8a3d04a03b3c.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/7103-03270d7f63f3fc52.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/7124-09ac80181ed8770a.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/7322-8826c51072a3c20b.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/7970-06567872c64996a9.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/7990-f8de5bf24ac2c19f.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/814-4315c4a73f01d6b4.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/8173-f46fb97b0b774186.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/8245-8f596e32cf31ff34.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/9582-dc48e663690bcc1b.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/9789-6d0ef00e6e3aa302.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/aaea2bcf-49c02f3f6df882c8.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/(inventory)/categories/page-7d1dd21ba657c086.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/(inventory)/items/page-77a713680d77f572.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/(inventory)/stock-adjustment/page-21e6f67a9ead520c.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/(orders)/item-orders/page-c9c81962cea18c5d.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/(orders)/suppliers/page-10c49594bafed508.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/department-requests/page-b84db7dae7c448ee.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/layout-dc9661a8deb29f36.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/reports/page-1217fb7208b17fa2.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/sales/%5Bid%5D/page-0098ddb529d500fa.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/sales/page-de94bb8877280189.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/app/(ims)/dashboard/page-dbbd2895bf0c111e.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/app/(ims)/layout-4d4eb319205a8239.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/app/(ims)/loading-c8095b3f58b470b6.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/app/(ims)/settings/%5Bpage%5D/error-6eda4c344b3e7352.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/app/(ims)/settings/%5Bpage%5D/page-e614d0811c1a97ab.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/app/(ims)/settings/layout-927636f80e72b31f.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-a012eb8760689174.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-c7feece0158f9032.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/app/auth/create-account/page-c328b795a90e7794.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/app/auth/forgot-password/page-c673bdcf0ba30d44.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/app/auth/forgot-password/verify-code/page-91fcde47dda14f66.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/app/auth/layout-fba7c785c29ded01.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/app/auth/login/page-03473bfcea3e3e21.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/app/auth/reset-password/page-f746ecc2f023cfc9.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/app/layout-73c379d88f6b3a4d.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/app/page-90dd91d92c7e879e.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/framework-c8065bab8b311d0e.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/main-16fc9ecc240c64a5.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/main-app-4e2adc49b206ff73.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/pages/_app-5f03510007f8ee45.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/pages/_error-8efa4fbf3acc0458.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-786bc8dd37364a66.js",
          revision: "EBMJmuCEgjwSgMRMnQPCM",
        },
        {
          url: "/_next/static/css/ce89c32858f5533a.css",
          revision: "ce89c32858f5533a",
        },
        {
          url: "/_next/static/media/auth-image.8d239548.jpg",
          revision: "85e5e8fd4d52775b511d8635acfd2082",
        },
        {
          url: "/fonts/Satoshi-Black.otf",
          revision: "22d9e9fdd8728dfa00bb0f49124ce5a7",
        },
        {
          url: "/fonts/Satoshi-Bold.otf",
          revision: "4a6fdcfc68ad464e8a9811e4edcacf00",
        },
        {
          url: "/fonts/Satoshi-Light.otf",
          revision: "d1d1eaba7a325545089fa9d773459211",
        },
        {
          url: "/fonts/Satoshi-Medium.otf",
          revision: "378def5c1f4df7eb6554a88608893391",
        },
        {
          url: "/fonts/Satoshi-Regular.otf",
          revision: "177a4dda04b52dedbd966942e932c5dc",
        },
        {
          url: "/images/auth-image.jpg",
          revision: "85e5e8fd4d52775b511d8635acfd2082",
        },
        { url: "/manifest.json", revision: "01f198058b4fa73410fbacf41717f835" },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: n,
              state: t,
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET",
    );
});
