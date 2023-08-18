// service-worker.js

const STATIC_CACHE = "static-v1";

const APP_SHELL = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './images/icon.png'
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(APP_SHELL))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => cacheName !== STATIC_CACHE)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200) {
          // Clonar la respuesta antes de agregarla al caché
          const responseClone = response.clone();

          caches.open(STATIC_CACHE)
            .then((cache) => cache.put(event.request, responseClone));
        }

        return response;
      })
      .catch(() => {
        return caches.match(event.request)
          .then((cachedResponse) => cachedResponse || fetch(event.request));
      })
  );
});
