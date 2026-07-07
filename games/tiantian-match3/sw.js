const CACHE_NAME = "tiantian-match3-v4";
const ASSETS = [
  "./index.html",
  "./styles.css",
  "./game.js",
  "./manifest.webmanifest",
  "./assets/app-icons/icon-180.png",
  "./assets/app-icons/icon-192.png",
  "./assets/app-icons/icon-512.png",
  "./assets/boosters/add-moves.png",
  "./assets/boosters/col-blast.png",
  "./assets/boosters/cross-blast.png",
  "./assets/boosters/hammer.png",
  "./assets/boosters/row-blast.png",
  "./assets/boosters/spark.png",
  "./assets/mascot/cheer.png",
  "./assets/mascot/idle.png",
  "./assets/mascot/legend.png",
  "./assets/mascot/wow.png",
  "./assets/obstacles/fire.png",
  "./assets/obstacles/ice.png",
  "./assets/obstacles/stone.png",
  "./assets/pieces/flower-cookie.png",
  "./assets/pieces/blueberry-jelly.png",
  "./assets/pieces/macaron.png",
  "./assets/pieces/pudding.png",
  "./assets/pieces/rainbow-swirl.png",
  "./assets/pieces/star.png",
  "./assets/pieces/strawberry.png",
  "./assets/pieces/wrapped-candy.png",
  "./assets/voices/combo-13.mp3",
  "./assets/voices/combo-14.mp3",
  "./assets/voices/combo-15.mp3",
  "./assets/voices/combo-16.mp3",
  "./assets/voices/fire-19.mp3",
  "./assets/voices/fire-20.mp3",
  "./assets/voices/five-05.mp3",
  "./assets/voices/five-06.mp3",
  "./assets/voices/five-07.mp3",
  "./assets/voices/five-08.mp3",
  "./assets/voices/four-01.mp3",
  "./assets/voices/four-02.mp3",
  "./assets/voices/four-03.mp3",
  "./assets/voices/four-04.mp3",
  "./assets/voices/ice-17.mp3",
  "./assets/voices/ice-18.mp3",
  "./assets/voices/six-09.mp3",
  "./assets/voices/six-10.mp3",
  "./assets/voices/six-11.mp3",
  "./assets/voices/six-12.mp3"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
