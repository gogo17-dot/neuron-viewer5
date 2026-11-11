/* AXON service worker: makes the site installable and keeps pages you've
 * opened working without internet.
 * - Pages: try the network first (so updates show at once), fall back to the
 *   saved copy, then to offline.html.
 * - Files on axon.az (scripts, styles, images, 3D models): show the saved copy
 *   straight away and refresh it in the background.
 * - Versioned libraries from CDNs (3D engine, MRI viewer, fonts): saved once,
 *   reused, so atlases you've opened also work offline.
 * - Videos, the visitor counter and anything else are left alone. */
var VERSION = "axon-v1";
var PAGES = VERSION + "-pages";
var FILES = VERSION + "-files";
var LIBS = VERSION + "-libs";
var PRECACHE = ["/offline.html", "/icons/icon-192.png", "/favicon.png"];
var LIB_HOSTS = ["cdn.jsdelivr.net", "unpkg.com", "cdnjs.cloudflare.com", "fonts.googleapis.com", "fonts.gstatic.com"];
var MAX_ENTRIES = { pages: 60, files: 400, libs: 80 };

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(PAGES).then(function (c) { return c.addAll(PRECACHE); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k.indexOf(VERSION) !== 0; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

function trim(name, max) {
  caches.open(name).then(function (c) {
    c.keys().then(function (keys) {
      if (keys.length > max) Promise.all(keys.slice(0, keys.length - max).map(function (k) { return c.delete(k); }));
    });
  });
}

function put(name, req, res, max, allowOpaque) {
  if (!res) return;
  var okType = res.type === "basic" || res.type === "cors" || (allowOpaque && res.type === "opaque");
  if (!okType || (res.type !== "opaque" && !res.ok)) return;
  var copy = res.clone();
  caches.open(name).then(function (c) { return c.put(req, copy); }).then(function () { trim(name, max); }).catch(function () {});
}

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (req.headers.has("range") || /\.(mp4|webm|mov)$/i.test(url.pathname)) return;

  if (req.mode === "navigate" && url.origin === self.location.origin) {
    e.respondWith(
      fetch(req).then(function (res) { put(PAGES, req, res, MAX_ENTRIES.pages); return res; }).catch(function () {
        return caches.match(req, { ignoreSearch: true }).then(function (hit) {
          return hit || caches.match("/offline.html");
        });
      })
    );
    return;
  }

  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.open(FILES).then(function (c) {
        return c.match(req).then(function (hit) {
          var net = fetch(req).then(function (res) { put(FILES, req, res, MAX_ENTRIES.files); return res; });
          if (hit) { net.catch(function () {}); return hit; }
          return net;
        });
      })
    );
    return;
  }

  if (LIB_HOSTS.indexOf(url.hostname) !== -1) {
    e.respondWith(
      caches.match(req).then(function (hit) {
        return hit || fetch(req).then(function (res) { put(LIBS, req, res, MAX_ENTRIES.libs, true); return res; });
      })
    );
  }
});
