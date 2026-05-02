const STATIC_CACHE = 'itics-static-v1';

const PRECACHE_URLS = [
  '/logos/educacion.png',
  '/logos/tecnm.png',
  '/logos/itsoeh.png',
  '/logos/tics.png',
  '/logos/esparco.png',
  '/logos/huawei.png',
  '/logos/cisco.webp',
  '/model/logo.png',
  '/model/model3d.glb',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const isLogo = url.pathname.startsWith('/logos/');
  const isModelAsset =
    url.pathname === '/model/logo.png' || url.pathname === '/model/model3d.glb';

  if (!isLogo && !isModelAsset) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (!response || response.status !== 200) return response;
        const responseClone = response.clone();
        caches.open(STATIC_CACHE).then((cache) => cache.put(request, responseClone));
        return response;
      });
    })
  );
});
