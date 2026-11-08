/**
 * LiveChat Service Worker — Zero-Cache Enforcer
 * Completely blocks all local caching, evicts all existing cache storage,
 * and ensures all requests bypass browser cache directly to the live server.
 */

// Install: Skip waiting immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Activate: Completely purge ALL cache buckets and claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          console.log('[SW] Purging cache bucket:', key);
          return caches.delete(key);
        })
      );
    }).then(() => self.registration.unregister())
      .then(() => self.clients.claim())
  );
});

// Fetch: Never store or serve from cache. Always pass-through directly to network with no-store.
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') {
    return;
  }

  event.respondWith(
    fetch(request, { cache: 'no-store' }).catch(() => fetch(request))
  );
});
