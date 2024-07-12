const filesHashes = [{"url":"index.html","hash":"1a5685eeab58cfeee2b60eed2fdddac2"},{"url":"scripts/app.js","hash":"4ff4f6b32a1189bf8612567e12709d9d"}];

// src/service-worker/devWorker.ts
async function clearCache() {
  const keys = await caches.keys();
  for (const k of keys) {
    await caches.delete(k);
  }
}
self.addEventListener("install", async (event) => {
  event.waitUntil(clearCache().then(self.skipWaiting));
});
self.addEventListener("fetch", async (event) => {
  if (event.request.url.startsWith(self.location.origin) && event.request.url !== "/esbuild" && event.request.destination === "document") {
    event.respondWith(
      fetch(event.request).then((response) => {
        if (response.status === 404) {
          return fetch("/index.html");
        } else {
          return response;
        }
      })
    );
  }
});
self.addEventListener("activate", () => {
  self.clients.claim();
});
//# sourceMappingURL=service-worker.js.map
