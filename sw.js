const CACHE = 'ebs-tracker-v3';
const ASSETS = [
  '/worktracker/index.html',
  '/worktracker/dashboard.html',
  '/worktracker/log.html',
  '/worktracker/performance.html',
  '/worktracker/admin.html',
  '/worktracker/tasks.html',
  '/worktracker/css/style.css',
  '/worktracker/js/config.js',
  '/worktracker/js/auth.js',
  '/worktracker/js/utils.js',
  '/worktracker/logo.png',
  '/worktracker/icon-192.png',
  '/worktracker/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Network first for everything — always serve latest version
  e.respondWith(
    fetch(e.request)
      .then(response => {
        // Update cache with fresh response
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});
