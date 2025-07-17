const CACHE_NAME = 'converter-cache-v1';
const filesToCache = [
  '/infix-converter-pwa/index.html',
  '/infix-converter-pwa/style.css',
  '/infix-converter-pwa/script.js',
  '/infix-converter-pwa/manifest.json'
];

self.addEventListener('install', e => {
  console.log('[SW] install start');
  e.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      for (const url of filesToCache) {
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
          await cache.put(url, res.clone());
          console.log(`✅ Cached: ${url}`);
        } catch (err) {
          console.error(`❌ Failed to cache ${url}:`, err);
        }
      }
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
