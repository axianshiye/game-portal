const SHELL_CACHE = "tiantian-match3-shell-v18";
const RUNTIME_CACHE = "tiantian-match3-runtime-v1";
const SHELL_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./game.js",
  "./manifest.webmanifest",
  "./assets/app-icons/icon-180.png",
  "./assets/app-icons/icon-192.png",
  "./assets/app-icons/icon-512.png",
  "./assets/mascot/cheer.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("tiantian-match3-") && key !== SHELL_CACHE && key !== RUNTIME_CACHE)
            .map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim();
});

async function networkFirst(request, navigationFallback = false) {
  const cache = await caches.open(SHELL_CACHE);
  try {
    const response = await fetch(request);
    if (response?.ok) cache.put(request, response.clone());
    return response;
  } catch {
    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;
    if (navigationFallback) return cache.match("./index.html");
    return Response.error();
  }
}

function runtimeAsset(request, event) {
  const cachePromise = caches.open(RUNTIME_CACHE);
  const updatePromise = cachePromise
    .then(async (cache) => {
      const response = await fetch(request);
      if (response?.ok) await cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);
  const responsePromise = cachePromise
    .then((cache) => cache.match(request, { ignoreSearch: true }))
    .then((cached) => cached || updatePromise)
    .then((response) => response || Response.error());
  event.waitUntil(updatePromise);
  return responsePromise;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate" || request.destination === "document") {
    event.respondWith(networkFirst(request, true));
    return;
  }

  if (["script", "style"].includes(request.destination)) {
    event.respondWith(networkFirst(request));
    return;
  }

  if (["image", "audio", "font"].includes(request.destination)) {
    event.respondWith(runtimeAsset(request, event));
    return;
  }

  event.respondWith(networkFirst(request));
});
