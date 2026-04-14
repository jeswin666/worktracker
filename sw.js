const CACHE = 'ebs-tracker-v1';
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
  // Network first for Supabase API calls
  if (e.request.url.includes('supabase.co')) {
    e.respondWith(fetch(e.request).catch(() => new Response('', { status: 503 })));
    return;
  }
  // Cache first for app assets
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
