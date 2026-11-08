/**
 * LiveChat — PWA & Zero-Cache Maintenance
 * Maintains standalone UI display mode detection while guaranteeing
 * all local browser caches and service worker caches are immediately evicted.
 */

(function () {
  'use strict';

  // Detect standalone mode
  function isRunningStandalone() {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia('(display-mode: window-controls-overlay)').matches ||
      window.matchMedia('(display-mode: minimal-ui)').matches ||
      window.navigator.standalone === true ||
      document.referrer.includes('android-app://')
    );
  }

  if (isRunningStandalone()) {
    document.documentElement.classList.add('pwa-standalone');
  }

  window.matchMedia('(display-mode: standalone)').addEventListener('change', (e) => {
    if (e.matches) {
      document.documentElement.classList.add('pwa-standalone');
    }
  });

  // Thoroughly clear any browser CacheStorage buckets
  if ('caches' in window) {
    caches.keys().then((names) => {
      names.forEach((name) => caches.delete(name));
    });
  }

  // Unregister any active or lingering Service Workers to prevent local caching
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister().then((success) => {
          if (success) console.log('[PWA] Unregistered service worker to enforce live database updates.');
        });
      }
    });
  }

  window.LiveChatPWA = {
    isRunningStandalone
  };
})();
