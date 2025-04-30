if (!self.define) {
  let e,
    s = {};
  const c = (c, t) => (
    (c = new URL(c + ".js", t).href),
    s[c] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = c), (e.onload = s), document.head.appendChild(e);
        } else (e = c), importScripts(c), s();
      }).then(() => {
        let e = s[c];
        if (!e) throw new Error(`Module ${c} didn’t register its module`);
        return e;
      })
  );
  self.define = (t, a) => {
    const i =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[i]) return;
    let n = {};
    const u = (e) => c(e, i),
      r = { module: { uri: i }, exports: n, require: u };
    s[i] = Promise.all(t.map((e) => r[e] || u(e))).then((e) => (a(...e), n));
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
          revision: "736ba3627983ddae2ad390d28192eddb",
        },
        {
          url: "/_next/static/SxlKUw7cDPcc2yIeAxuVW/_buildManifest.js",
          revision: "f3e16eb846692a3a254f4383c5e6923d",
        },
        {
          url: "/_next/static/SxlKUw7cDPcc2yIeAxuVW/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/1468-6930f99516e0db7d.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/1517-f8386884ec185994.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/1866-77a79a5acc4865e8.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/299-e081c6a09e545fd2.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/3639-41d67af6a0736fb9.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/40-3a5efecdba1c751b.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/4009-4f1119183e499c54.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/4457-40ee945c3aa709ad.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/4788-d05f415a95980e54.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/4bd1b696-c0d7545cde076bf6.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/5267-ea574e139b7af804.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/5348-e3646f86985d2caf.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/5513-ec25b966770afb42.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/6043-149ffba533080b5c.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/6604-82aba77950f62b80.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/6736-61600a11f977a31b.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/6906-5536d67650c41a6d.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/7103-03270d7f63f3fc52.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/7322-8826c51072a3c20b.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/7593-104726bad2e6e02c.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/7970-06567872c64996a9.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/7990-f8de5bf24ac2c19f.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/814-4315c4a73f01d6b4.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/8173-f46fb97b0b774186.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/8352-c0ab851c1ea6c0ce.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/aaea2bcf-49c02f3f6df882c8.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/(inventory)/categories/page-85505f0e1cde4119.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/(inventory)/items/%5B...slugs%5D/page-b3918905440280fd.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/(inventory)/items/page-bf3916f293ba16d5.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/(inventory)/stock-adjustment/page-e6a64e28c7640703.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/(orders)/item-orders/page-ffcc1f8a297d8c6e.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/(orders)/suppliers/page-a40bde20081579d7.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/department-requests/page-3db316ba24c6e79c.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/layout-e8b78a99ee053ae6.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/reports/page-8f2258011b96700e.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/sales/%5Bid%5D/page-edcf3f5feac5144b.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/sales/page-56dc58efc4858264.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/app/(ims)/dashboard/page-d3bf0bb99ef2cb32.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/app/(ims)/layout-617f935855998bf2.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/app/(ims)/loading-85cd1c57dd1f1449.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/app/(ims)/settings/%5Bpage%5D/error-6eda4c344b3e7352.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/app/(ims)/settings/%5Bpage%5D/page-71303541cd3e42a5.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/app/(ims)/settings/layout-4fd4bf151e94226d.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-a012eb8760689174.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-c7feece0158f9032.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/app/auth/create-account/page-0f40655ee9d8235a.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/app/auth/forgot-password/page-d55b35f50699b737.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/app/auth/forgot-password/verify-code/page-f1c0ffd0d4062b48.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/app/auth/layout-fba7c785c29ded01.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/app/auth/login/page-959eec8722dbce14.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/app/auth/reset-password/page-999f37adfe05b155.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/app/layout-73c379d88f6b3a4d.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/app/page-b8c4da9b9b0f85d3.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/framework-c8065bab8b311d0e.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/main-16fc9ecc240c64a5.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/main-app-4e2adc49b206ff73.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/pages/_app-5f03510007f8ee45.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/pages/_error-8efa4fbf3acc0458.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-786bc8dd37364a66.js",
          revision: "SxlKUw7cDPcc2yIeAxuVW",
        },
        {
          url: "/_next/static/css/b2b20d57516fd451.css",
          revision: "b2b20d57516fd451",
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
              event: c,
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
