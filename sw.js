/* Nava SW v5 - network first, clear old caches */
const CACHE = "nava-v5";
self.addEventListener("install", (e) => self.skipWaiting());
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  if (new URL(req.url).hostname.includes("supabase.co")) return;
  event.respondWith(fetch(req).catch(() => caches.match(req)));
});
