const CACHE_NAME = "tiantian-match3-v17";
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
  "./assets/celebrations/five_v2.png",
  "./assets/celebrations/four_v2.png",
  "./assets/celebrations/grand_v2.png",
  "./assets/celebrations/six_v2.png",
  "./assets/mascot/cheer.png",
  "./assets/mascot/idle.png",
  "./assets/mascot/legend.png",
  "./assets/mascot/wow.png",
  "./assets/obstacles/fire.png",
  "./assets/obstacles/ice.png",
  "./assets/obstacles/stone.png",
  "./assets/foods/apple.png",
  "./assets/foods/banana.png",
  "./assets/foods/carrot.png",
  "./assets/foods/cheese.png",
  "./assets/foods/chestnut_pie.png",
  "./assets/foods/cocoa_mug.png",
  "./assets/foods/corn.png",
  "./assets/foods/cream_macaron.png",
  "./assets/foods/dumpling.png",
  "./assets/foods/flower_cookie_v2.png",
  "./assets/foods/grape.png",
  "./assets/foods/honey_bread.png",
  "./assets/foods/mango.png",
  "./assets/foods/milk_cup.png",
  "./assets/foods/mushroom.png",
  "./assets/foods/party_cake.png",
  "./assets/foods/pudding_cup_v2.png",
  "./assets/foods/rice_ball.png",
  "./assets/foods/shaved_ice.png",
  "./assets/foods/shrimp_ball.png",
  "./assets/foods/star_jelly.png",
  "./assets/foods/takoyaki.png",
  "./assets/foods/toast.png",
  "./assets/foods/tomato.png",
  "./assets/foods/wrapped_candy_v2.png",
  "./assets/pets/calf-eat.png",
  "./assets/pets/calf-idle.png",
  "./assets/pets/capybara-eat.png",
  "./assets/pets/capybara-idle.png",
  "./assets/pets/parrot-eat.png",
  "./assets/pets/parrot-idle.png",
  "./assets/pets/piglet-eat.png",
  "./assets/pets/piglet-idle.png",
  "./assets/pets/puppy-eat.png",
  "./assets/pets/puppy-idle.png",
  "./assets/pets/capybara-ready-hd.png",
  "./assets/pets/puppy-ready-hd.png",
  "./assets/pets/calf-ready-hd.png",
  "./assets/pets/piglet-ready-hd.png",
  "./assets/pets/parrot-ready-hd.png",
  "./assets/baskets/basket-0.png",
  "./assets/baskets/basket-1.png",
  "./assets/baskets/basket-2.png",
  "./assets/baskets/basket-3.png",
  "./assets/baskets/basket-4.png",
  "./assets/baskets/basket-5.png"
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
