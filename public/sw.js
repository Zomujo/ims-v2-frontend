if (!self.define) {
  let e,
    s = {};
  const t = (t, a) => (
    (t = new URL(t + ".js", a).href),
    s[t] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = t), (e.onload = s), document.head.appendChild(e);
        } else (e = t), importScripts(t), s();
      }).then(() => {
        let e = s[t];
        if (!e) throw new Error(`Module ${t} didn’t register its module`);
        return e;
      })
  );
  self.define = (a, i) => {
    const n =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[n]) return;
    let c = {};
    const u = (e) => t(e, n),
      o = { module: { uri: n }, exports: c, require: u };
    s[n] = Promise.all(a.map((e) => o[e] || u(e))).then((e) => (i(...e), c));
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
          revision: "f1df82a895eede6f82f2ab8e1214f212",
        },
        {
          url: "/_next/static/Buyp46eD2wS3xY6mw58Vo/_buildManifest.js",
          revision: "f3e16eb846692a3a254f4383c5e6923d",
        },
        {
          url: "/_next/static/Buyp46eD2wS3xY6mw58Vo/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/1468-6930f99516e0db7d.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/1517-f8386884ec185994.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/1866-77a79a5acc4865e8.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/299-e081c6a09e545fd2.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/3639-630dfa0a8ecabf5d.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/40-0df85ecb5dcac4e2.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/4009-4f1119183e499c54.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/4457-40ee945c3aa709ad.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/4788-d05f415a95980e54.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/4bd1b696-c0d7545cde076bf6.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/5267-ea574e139b7af804.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/5288-3a45b3e61e1f0df2.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/5348-e3646f86985d2caf.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/5513-ec25b966770afb42.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/6043-149ffba533080b5c.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/6604-6583dec3247e80dd.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/6736-61600a11f977a31b.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/7103-03270d7f63f3fc52.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/7305-6b1944891e861e98.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/7322-8826c51072a3c20b.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/7593-1a72e69999eb3dc7.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/7970-06567872c64996a9.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/7990-f8de5bf24ac2c19f.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/814-4315c4a73f01d6b4.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/8173-f46fb97b0b774186.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/8352-63f61c11d0fe6a96.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/aaea2bcf-49c02f3f6df882c8.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/(inventory)/categories/page-eb20ee72df1f63bd.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/(inventory)/items/%5B...slugs%5D/page-5333920ecd9fbcc7.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/(inventory)/items/page-edc568edc42abb5c.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/(inventory)/stock-adjustment/page-263820e9756912dc.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/(orders)/item-orders/page-c0db96f11ae38751.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/(orders)/suppliers/page-b1c33595207de44e.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/department-requests/page-81320cfb1fc94180.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/layout-1f243f59b80736e2.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/reports/page-11bcc3c084787fc4.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/sales/%5Bid%5D/page-f92559ed7f0b6d24.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/app/(ims)/(pages-with-search)/sales/page-b4de61bbeb76df4f.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/app/(ims)/dashboard/page-a4fcaad13e7582c2.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/app/(ims)/layout-93bcd1ab6ba165cc.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/app/(ims)/loading-85cd1c57dd1f1449.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/app/(ims)/settings/%5Bpage%5D/error-6eda4c344b3e7352.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/app/(ims)/settings/%5Bpage%5D/page-d0eb6de7a33a808a.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/app/(ims)/settings/layout-231b9acdca9b13d9.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-a012eb8760689174.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-c7feece0158f9032.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/app/auth/create-account/page-33bf38dea45c3eb0.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/app/auth/forgot-password/page-59ba74318254e1c1.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/app/auth/forgot-password/verify-code/page-93ec8b0a365db772.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/app/auth/layout-fba7c785c29ded01.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/app/auth/login/page-6d7c8de6d8535cb1.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/app/auth/reset-password/page-ae7984c53b19f9c5.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/app/layout-73c379d88f6b3a4d.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/app/page-b8c4da9b9b0f85d3.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/framework-c8065bab8b311d0e.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/main-16fc9ecc240c64a5.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/main-app-4e2adc49b206ff73.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/pages/_app-5f03510007f8ee45.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/pages/_error-8efa4fbf3acc0458.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-786bc8dd37364a66.js",
          revision: "Buyp46eD2wS3xY6mw58Vo",
        },
        {
          url: "/_next/static/css/6d9560812ad53f60.css",
          revision: "6d9560812ad53f60",
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
              event: t,
              state: a,
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
