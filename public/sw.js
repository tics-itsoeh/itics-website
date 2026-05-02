/**
 * Service Worker del sitio ITICs ITSOEH.
 *
 * Estrategia: cache-first para assets estáticos (logos, modelo 3D).
 * Los logos ahora usan formato WebP optimizado.
 */
const STATIC_CACHE = 'itics-static-v3';

const PRECACHE_URLS = [
  '/logos/educacion.webp',
  '/logos/tecnm.webp',
  '/logos/itsoeh.webp',
  '/logos/tics.webp',
  '/logos/esparco.webp',
  '/logos/huawei.webp',
  '/logos/cisco.webp',
  '/logos/logo.svg',
  '/model/logo.webp',
  '/model/model3d.glb',
  '/favicon-32.png',
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
    url.pathname === '/model/logo.webp' || url.pathname === '/model/model3d.glb';
  const isFavicon = url.pathname === '/favicon-32.png';

  if (!isLogo && !isModelAsset && !isFavicon) return;

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
