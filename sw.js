/* Assis Maps — app shell com atualização automática ao reconectar */
const CACHE = 'assis-maps-v6';
const SHELL = ['./','./index.html','./manifest.webmanifest','./sw.js','./icon-512.png','./icon-192.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(async cache => {
    for (const item of SHELL) { try { await cache.add(item); } catch (_) {} }
  }).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('message', event => { if (event.data === 'SKIP_WAITING') self.skipWaiting(); });
self.addEventListener('fetch', event => {
  const req = event.request; const url = new URL(req.url);
  if (req.method !== 'GET') return;
  if (req.mode === 'navigate' || url.pathname.endsWith('/index.html') || url.pathname.endsWith('/sw.js')) {
    event.respondWith(fetch(req, {cache:'no-store'}).then(res => {
      if (res && res.ok) { const copy=res.clone(); caches.open(CACHE).then(c=>c.put(req,copy)); }
      return res;
    }).catch(() => caches.match(req).then(r=>r || caches.match('./index.html'))));
    return;
  }
  if (url.hostname.includes('tile.openstreetmap.org')) {
    event.respondWith(caches.match(req).then(cached => fetch(req).then(res => {
      if(res && res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));} return res;
    }).catch(()=>cached)));
    return;
  }
  event.respondWith(fetch(req).catch(()=>caches.match(req)));
});
