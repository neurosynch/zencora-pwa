const CACHE_NAME = "zencora-pwa-v1";
const CACHE_NAME = "zencora-pwa-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/manifest.json",
    "/icon-512.png",
    "/icon-192.png"
];

// Install Service Worker and Cache Files
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Serve Cached Content When Offline
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        }).catch(() => caches.match("/index.html"))
    );
});

// Clear Old Caches on Activation
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
