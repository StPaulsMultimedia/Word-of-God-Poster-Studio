const CACHE_NAME = 'gods-word-v2';
const assets = [
  './',
  './index.html',
  './manifest.json'
];

// Install Service Worker and cache files
self.addEventListener('install', e => {
  self.skipWaiting(); // Forces the new service worker to take over immediately
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching new assets');
      return cache.addAll(assets);
    })
  );
});

// Activate and remove old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Fetch assets from cache
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});







