const CACHE_NAME = "dungeon-grinder-pwa-v60";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=0.2.56",
  "./script.js?v=0.2.56",
  "./admin",
  "./admin.html",
  "./admin.css?v=0.1.7",
  "./admin.js?v=0.1.7",
  "./manifest.webmanifest",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/generated-weapons/axe.png",
  "./assets/generated-weapons/greatsword.png",
  "./assets/generated-weapons/hammer.png",
  "./assets/generated-weapons/orb.png",
  "./assets/generated-weapons/staff.png",
  "./assets/generated-equipment/warrior-helm.png",
  "./assets/generated-equipment/warrior-shoulders.png",
  "./assets/generated-equipment/warrior-armor.png",
  "./assets/generated-equipment/warrior-gloves.png",
  "./assets/generated-equipment/warrior-pants.png",
  "./assets/generated-equipment/warrior-boots.png",
  "./assets/generated-equipment/warrior-ring.png",
  "./assets/generated-equipment/mage-hat.png",
  "./assets/generated-equipment/mage-shoulders.png",
  "./assets/generated-equipment/mage-armor.png",
  "./assets/generated-equipment/mage-gloves.png",
  "./assets/generated-equipment/mage-pants.png",
  "./assets/generated-equipment/mage-boots.png",
  "./assets/generated-equipment/mage-ring.png",
  "./assets/generated-characters/warrior-back.png",
  "./assets/generated-characters/mage-back.png",
  "./assets/generated-pets/dps-front.png",
  "./assets/generated-pets/dps-back.png",
  "./assets/generated-pets/dps-common-front.png",
  "./assets/generated-pets/dps-common-back.png",
  "./assets/generated-pets/dps-fine-front.png",
  "./assets/generated-pets/dps-fine-back.png",
  "./assets/generated-pets/dps-rare-front.png",
  "./assets/generated-pets/dps-rare-back.png",
  "./assets/generated-pets/support-front.png",
  "./assets/generated-pets/support-back.png",
  "./assets/generated-pets/support-common-front.png",
  "./assets/generated-pets/support-common-back.png",
  "./assets/generated-pets/support-fine-front.png",
  "./assets/generated-pets/support-fine-back.png",
  "./assets/generated-pets/support-rare-front.png",
  "./assets/generated-pets/support-rare-back.png",
  "./assets/generated-pets/tank-front.png",
  "./assets/generated-pets/tank-back.png",
  "./assets/generated-pets/tank-common-front.png",
  "./assets/generated-pets/tank-common-back.png",
  "./assets/generated-pets/tank-fine-front.png",
  "./assets/generated-pets/tank-fine-back.png",
  "./assets/generated-pets/tank-rare-front.png",
  "./assets/generated-pets/tank-rare-back.png",
  "./assets/generated-monsters/mine.png",
  "./assets/generated-monsters/mine-minion.png",
  "./assets/generated-monsters/mine-elite.png",
  "./assets/generated-monsters/mine-boss.png",
  "./assets/generated-monsters/ruin.png",
  "./assets/generated-monsters/ruin-minion.png",
  "./assets/generated-monsters/ruin-elite.png",
  "./assets/generated-monsters/ruin-boss.png",
  "./assets/generated-monsters/grave.png",
  "./assets/generated-monsters/grave-minion.png",
  "./assets/generated-monsters/grave-elite.png",
  "./assets/generated-monsters/grave-boss.png",
  "./assets/generated-monsters/forge.png",
  "./assets/generated-monsters/forge-minion.png",
  "./assets/generated-monsters/forge-elite.png",
  "./assets/generated-monsters/forge-boss.png",
  "./assets/generated-monsters/abyss.png",
  "./assets/generated-monsters/abyss-minion.png",
  "./assets/generated-monsters/abyss-elite.png",
  "./assets/generated-monsters/abyss-boss.png",
  "./assets/generated-items/egg.png",
  "./assets/generated-items/gold.png",
  "./assets/generated-items/incubator-slot.png",
  "./assets/generated-items/gem.png",
  "./assets/generated-items/ruby.png",
  "./assets/generated-items/jade.png",
  "./assets/generated-items/star.png",
  "./assets/generated-items/material.png",
  "./assets/generated-items/cloth.png",
  "./assets/generated-items/iron.png",
  "./assets/generated-items/leather.png",
  "./assets/generated-items/crystal.png",
  "./assets/generated-items/wood.png",
  "./assets/generated-items/bag.png",
  "./assets/generated-ui/tab-bg.png",
  "./assets/generated-ui/tab-bg-cutout.png?v=0.2.49",
  "./assets/generated-ui/tab-active.png",
  "./assets/generated-ui/tab-battle.png",
  "./assets/generated-ui/tab-pets.png",
  "./assets/generated-ui/tab-equip.png",
  "./assets/generated-ui/tab-items.png",
  "./assets/generated-ui/tab-shop.png",
  "./assets/generated-ui/tab-my.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html"))),
  );
});
