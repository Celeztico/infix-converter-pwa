self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('converter-cache').then(cache =>
      cache.addAll([
        '/',
        '/infix-converter-pwa/index.html',
        '/infix-converter-pwa/style.css',
        '/infix-converter-pwa/script.js',
        '/infix-converter-pwa/manifest.json'
      ])
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
