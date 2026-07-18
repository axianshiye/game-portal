const SIZE = 8;
const GAME_VERSION = "v0.12.1";
const MAX_LEVELS = 500;
const LEVEL_WAVE = [0.92, 0.98, 1.04, 1.08, 1, 0.95, 1.02, 1.06, 0.97, 1.1];
const TYPES = [
  { name: "奶油马卡龙", src: "assets/foods/cream_macaron.png" },
  { name: "布丁杯", src: "assets/foods/pudding_cup.png" },
  { name: "星星冻", src: "assets/foods/star_jelly.png" },
  { name: "花朵饼", src: "assets/foods/flower_cookie_v2.png" },
  { name: "包包糖", src: "assets/foods/wrapped_candy.png" },
  { name: "苹果", src: "assets/foods/apple.png" },
  { name: "香蕉", src: "assets/foods/banana.png" },
  { name: "葡萄", src: "assets/foods/grape.png" },
  { name: "吐司", src: "assets/foods/toast.png" },
  { name: "牛奶杯", src: "assets/foods/milk_cup.png" },
  { name: "胡萝卜", src: "assets/foods/carrot.png" },
  { name: "番茄", src: "assets/foods/tomato.png" },
  { name: "玉米", src: "assets/foods/corn.png" },
  { name: "虾球", src: "assets/foods/shrimp_ball.png" },
  { name: "饭团", src: "assets/foods/rice_ball.png" },
  { name: "章鱼烧", src: "assets/foods/takoyaki.png" },
  { name: "饺子", src: "assets/foods/dumpling.png" },
  { name: "蘑菇", src: "assets/foods/mushroom.png" },
  { name: "蜂蜜面包", src: "assets/foods/honey_bread.png" },
  { name: "热可可", src: "assets/foods/cocoa_mug.png" },
  { name: "奶酪", src: "assets/foods/cheese.png" },
  { name: "芒果", src: "assets/foods/mango.png" },
  { name: "刨冰", src: "assets/foods/shaved_ice.png" },
  { name: "栗子派", src: "assets/foods/chestnut_pie.png" },
  { name: "派对蛋糕", src: "assets/foods/party_cake.png" },
];
const FOOD_THEMES = [
  { name: "奶油甜品", indexes: [0, 1, 2, 3, 4] },
  { name: "水果拼盘", indexes: [5, 6, 7, 21, 22] },
  { name: "早餐小铺", indexes: [8, 9, 18, 20, 1] },
  { name: "蔬菜花园", indexes: [10, 11, 12, 16, 17] },
  { name: "海边夜市", indexes: [13, 14, 15, 16, 19] },
  { name: "派对厨房", indexes: [20, 21, 22, 23, 24] },
];
const PETS = {
  capybara: {
    name: "卡皮巴拉",
    price: 0,
    appetite: 60,
    maxSatiety: 120,
    skill: "hammer",
    skillName: "糖锤",
    skillCost: 96,
    idle: "assets/pets/capybara-idle.png",
    eat: "assets/pets/capybara-eat.png",
    ready: "assets/pets/capybara-ready-hd.png",
    description: "温柔可靠的厨房队长，糖锤能敲掉目标和上下左右四格。",
  },
  puppy: {
    name: "小奶狗",
    price: 800,
    appetite: 72,
    maxSatiety: 120,
    skill: "crossBlast",
    skillName: "寻宝十字",
    skillCost: 102,
    idle: "assets/pets/puppy-idle.png",
    eat: "assets/pets/puppy-eat.png",
    ready: "assets/pets/puppy-ready-hd.png",
    description: "嗅觉灵敏的小帮手，寻宝十字能同时清理整行和整列。",
  },
  calf: {
    name: "小奶牛",
    price: 1800,
    appetite: 90,
    maxSatiety: 135,
    skill: "colBlast",
    skillName: "奶香竖扫",
    skillCost: 108,
    idle: "assets/pets/calf-idle.png",
    eat: "assets/pets/calf-eat.png",
    ready: "assets/pets/calf-ready-hd.png",
    description: "奶香十足的稳重伙伴，技能可以清空选中的一整列。",
  },
  piglet: {
    name: "小猪",
    price: 3600,
    appetite: 84,
    maxSatiety: 130,
    skill: "rowBlast",
    skillName: "大口横扫",
    skillCost: 104,
    idle: "assets/pets/piglet-idle.png",
    eat: "assets/pets/piglet-eat.png",
    ready: "assets/pets/piglet-ready-hd.png",
    description: "热爱烘焙的大胃王，技能可以横扫选中的一整行。",
  },
  parrot: {
    name: "小鹦鹉",
    price: 6200,
    appetite: 54,
    maxSatiety: 110,
    skill: "spark",
    skillName: "鹦鹉星爆",
    skillCost: 92,
    idle: "assets/pets/parrot-idle.png",
    eat: "assets/pets/parrot-eat.png",
    ready: "assets/pets/parrot-ready-hd.png",
    description: "活泼机灵的甜点侦察员，星爆能清除一种相同食物。",
  },
};
const PET_ORDER = ["capybara", "puppy", "calf", "piglet", "parrot"];
const SKILL_TO_PET = Object.fromEntries(PET_ORDER.map((id) => [PETS[id].skill, id]));
const PLAYER_KEY = "sweet-match-pet-save";
const FOOD_SATIETY = 1;
const BASE_FRESH_MINUTES = 70;
const SPECIAL_TYPES = {
  row: { name: "糖锤", src: "assets/boosters/hammer.png" },
  col: { name: "糖锤", src: "assets/boosters/hammer.png" },
  bomb: { name: "星爆", src: "assets/boosters/spark.png" },
};
const BOOSTER_ASSETS = [
  "assets/boosters/hammer.png",
  "assets/boosters/spark.png",
  "assets/boosters/row-blast.png",
  "assets/boosters/col-blast.png",
  "assets/boosters/cross-blast.png",
  "assets/boosters/add-moves.png",
];
const OBSTACLE_TYPES = {
  ice: { name: "冰块", src: "assets/obstacles/ice.png" },
  fire: { name: "火焰", src: "assets/obstacles/fire.png" },
  stone: { name: "石头", src: "assets/obstacles/stone.png" },
};
const OBSTACLE_ASSETS = Object.values(OBSTACLE_TYPES).map((item) => item.src);
const BASKET_ASSETS = Array.from({ length: 6 }, (_, index) => `assets/baskets/basket-${index}.png`);
const MASCOT_ASSETS = {
  idle: "assets/mascot/idle.png",
  cheer: "assets/mascot/cheer.png",
  wow: "assets/mascot/wow.png",
  legend: "assets/mascot/legend.png",
};
const MASCOT_LINES = {
  four: ["太厉害了！", "这个四消很漂亮！", "甜度拉满啦！", "好手感！"],
  five: ["天啊，真厉害！", "哇！", "这一下太会了！", "星星都亮起来了！"],
  six: ["太崇拜你了！", "牛啊！", "这也太强了！", "厨师帽都要飞起来啦！"],
  combo: ["你真的是神啊！", "无人能敌！", "连起来了，太猛了！", "这一波甜到发光！"],
  ice: ["冰块被敲开啦！", "解冻成功！"],
  fire: ["小心火焰，把糖烧成石头了！", "火焰来捣乱啦！"],
};
const MASCOT_VOICES = {
  "太厉害了！": voiceFile("four-01.mp3"),
  "这个四消很漂亮！": voiceFile("four-02.mp3"),
  "甜度拉满啦！": voiceFile("four-03.mp3"),
  "好手感！": voiceFile("four-04.mp3"),
  "天啊，真厉害！": voiceFile("five-05.mp3"),
  "哇！": voiceFile("five-06.mp3"),
  "这一下太会了！": voiceFile("five-07.mp3"),
  "星星都亮起来了！": voiceFile("five-08.mp3"),
  "太崇拜你了！": voiceFile("six-09.mp3"),
  "牛啊！": voiceFile("six-10.mp3"),
  "这也太强了！": voiceFile("six-11.mp3"),
  "厨师帽都要飞起来啦！": voiceFile("six-12.mp3"),
  "你真的是神啊！": voiceFile("combo-13.mp3"),
  "无人能敌！": voiceFile("combo-14.mp3"),
  "连起来了，太猛了！": voiceFile("combo-15.mp3"),
  "这一波甜到发光！": voiceFile("combo-16.mp3"),
  "冰块被敲开啦！": voiceFile("ice-17.mp3"),
  "解冻成功！": voiceFile("ice-18.mp3"),
  "小心火焰，把糖烧成石头了！": voiceFile("fire-19.mp3"),
  "火焰来捣乱啦！": voiceFile("fire-20.mp3"),
};

function voiceFile(file) {
  return `assets/voices/${file}?v=${GAME_VERSION}`;
}
const REQUIRED_IMAGE_ASSETS = [
  ...new Set([
    ...TYPES.map((item) => item.src),
    ...BOOSTER_ASSETS,
    ...OBSTACLE_ASSETS,
    ...BASKET_ASSETS,
    ...Object.values(MASCOT_ASSETS),
    ...PET_ORDER.flatMap((id) => [PETS[id].idle, PETS[id].eat]),
  ]),
];
const REQUIRED_AUDIO_ASSETS = Object.values(MASCOT_VOICES);
const PROGRESS_KEY = "sweet-match-current-level";

const boardEl = document.querySelector("#board");
const levelEl = document.querySelector("#level");
const scoreEl = document.querySelector("#score");
const movesEl = document.querySelector("#moves");
const comboEl = document.querySelector("#combo");
const targetScoreEl = document.querySelector("#targetScore");
const progressFillEl = document.querySelector("#progressFill");
const ordersEl = document.querySelector("#orders");
const toastEl = document.querySelector("#toast");
const hintBtn = document.querySelector("#hintBtn");
const shuffleBtn = document.querySelector("#shuffleBtn");
const restartBtn = document.querySelector("#restartBtn");
const soundBtn = document.querySelector("#soundBtn");
const soundIconEl = document.querySelector("#soundIcon");
const hammerBtn = document.querySelector("#hammerBtn");
const sparkBtn = document.querySelector("#sparkBtn");
const rowBlastBtn = document.querySelector("#rowBlastBtn");
const colBlastBtn = document.querySelector("#colBlastBtn");
const crossBlastBtn = document.querySelector("#crossBlastBtn");
const addMovesBtn = document.querySelector("#addMovesBtn");
const hammerCountEl = document.querySelector("#hammerCount");
const sparkCountEl = document.querySelector("#sparkCount");
const rowBlastCountEl = document.querySelector("#rowBlastCount");
const colBlastCountEl = document.querySelector("#colBlastCount");
const crossBlastCountEl = document.querySelector("#crossBlastCount");
const addMovesCountEl = document.querySelector("#addMovesCount");
const modalEl = document.querySelector("#modal");
const modalKickerEl = document.querySelector("#modalKicker");
const modalTitleEl = document.querySelector("#modalTitle");
const modalTextEl = document.querySelector("#modalText");
const nextBtn = document.querySelector("#nextBtn");
const comboBannerEl = document.querySelector("#comboBanner");
const orientationLockEl = document.querySelector("#orientationLock");
const loadingScreenEl = document.querySelector("#loadingScreen");
const loaderFillEl = document.querySelector("#loaderFill");
const loaderPercentEl = document.querySelector("#loaderPercent");
const loadingTextEl = document.querySelector("#loadingText");
const loaderVersionEl = document.querySelector("#loaderVersion");
const versionBadgeEl = document.querySelector("#versionBadge");
const homeViewEl = document.querySelector("#homeView");
const gameViewEl = document.querySelector("#gameView");
const readyPanelEl = document.querySelector("#readyPanel");
const startGameBtn = document.querySelector("#startGameBtn");
const exitGameBtn = document.querySelector("#exitGameBtn");
const homeLevelEl = document.querySelector("#homeLevel");
const homeCoinsEl = document.querySelector("#homeCoins");
const readyPetImgEl = document.querySelector("#readyPetImg");
const readyPetNameEl = document.querySelector("#readyPetName");
const readyLevelTextEl = document.querySelector("#readyLevelText");
const homeBasketImgEl = document.querySelector("#homeBasketImg");
const homeFreshnessTextEl = document.querySelector("#homeFreshnessText");
const mascotEl = document.querySelector("#mascot");
const mascotBubbleEl = document.querySelector("#mascotBubble");
const activePetImgEl = document.querySelector("#activePetImg");
const activePetNameEl = document.querySelector("#activePetName");
const petSatietyTextEl = document.querySelector("#petSatietyText");
const petSatietyFillEl = document.querySelector("#petSatietyFill");
const basketTextEl = document.querySelector("#basketText");
const basketImgEl = document.querySelector("#basketImg");
const freshnessTextEl = document.querySelector("#freshnessText");
const petShopEl = document.querySelector("#petShop");
const shopPanelEl = document.querySelector("#shopPanel");
const profilePanelEl = document.querySelector("#profilePanel");
const coinTextShopEl = document.querySelector("#coinTextShop");
const coinTextProfileEl = document.querySelector("#coinTextProfile");
const playerNameInputEl = document.querySelector("#playerNameInput");
const saveProfileBtn = document.querySelector("#saveProfileBtn");
const profileStatsEl = document.querySelector("#profileStats");
const tabButtons = document.querySelectorAll(".tab-btn");

document.addEventListener(
  "touchmove",
  (event) => {
    event.preventDefault();
  },
  { passive: false }
);

document.addEventListener("pointerdown", unlockAudio, { passive: true, capture: true });
document.addEventListener("touchstart", unlockAudio, { passive: true, capture: true });
document.addEventListener("touchstart", rememberTouchStart, { passive: false, capture: true });
document.addEventListener("touchmove", blockBackSwipe, { passive: false, capture: true });

let board = [];
let selected = null;
let score = 0;
let moves = 30;
let combo = 1;
let level = 0;
let orders = [];
let boosters = { hammer: 2, spark: 1, rowBlast: 1, colBlast: 1, crossBlast: 1, addMoves: 1 };
let activeTool = null;
let busy = false;
let ended = false;
let endingSequence = false;
let toastTimer = null;
let bannerTimer = null;
let audioContext = null;
let soundEnabled = getSoundPreference();
let audioUnlocked = false;
let mascotVoiceAudio = null;
let dragStart = null;
let touchStart = null;
let suppressNextClick = false;
let isLandscapeLocked = false;
let turnsTaken = 0;
let activeTab = "game";
let gameStarted = false;
let expandedPetId = null;
let shopNotice = null;
let player = loadPlayer();
applyOfflineFeeding();

function isPhoneLandscape() {
  return window.matchMedia("(orientation: landscape) and (max-height: 760px)").matches;
}

function updateOrientationLock() {
  isLandscapeLocked = isPhoneLandscape();
  document.body.classList.toggle("landscape-locked", isLandscapeLocked);
  orientationLockEl?.setAttribute("aria-hidden", String(!isLandscapeLocked));
}

function updateViewportMetrics() {
  const viewport = window.visualViewport;
  const width = Math.floor(viewport?.width || window.innerWidth || document.documentElement.clientWidth);
  const height = Math.floor(viewport?.height || window.innerHeight || document.documentElement.clientHeight);
  const offsetTop = Math.max(0, Math.floor(viewport?.offsetTop || 0));
  const layoutHeight = Math.max(420, height - offsetTop);
  document.documentElement.style.setProperty("--app-width", `${width}px`);
  document.documentElement.style.setProperty("--app-height", `${height}px`);
  document.documentElement.style.setProperty("--layout-height", `${layoutHeight}px`);
  document.documentElement.style.setProperty("--viewport-top", `${offsetTop}px`);
  document.body.classList.toggle("compact-height", layoutHeight < 760 && width <= 760);
  document.body.classList.toggle("squeezed-height", layoutHeight < 690 && width <= 760);
  document.body.classList.toggle("tiny-height", layoutHeight < 620 && width <= 760);
}

async function requestPortraitLock() {
  try {
    await screen.orientation?.lock?.("portrait");
  } catch {
    // Browser support varies; the landscape overlay still prevents horizontal play.
  }
}

updateViewportMetrics();
updateOrientationLock();
if (versionBadgeEl) versionBadgeEl.textContent = GAME_VERSION;
if (loaderVersionEl) loaderVersionEl.textContent = GAME_VERSION;
window.addEventListener("resize", () => {
  updateViewportMetrics();
  updateOrientationLock();
});
window.visualViewport?.addEventListener("resize", updateViewportMetrics);
window.visualViewport?.addEventListener("scroll", updateViewportMetrics);
window.addEventListener("orientationchange", () => {
  updateViewportMetrics();
  updateOrientationLock();
});

function preloadImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = async () => {
      try {
        await image.decode();
      } catch {
        // onload is enough for browsers without decode support.
      }
      resolve({ src, ok: true });
    };
    image.onerror = () => resolve({ src, ok: false });
    image.src = src;
  });
}

function preloadAudio(src) {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.preload = "auto";
    audio.oncanplaythrough = () => resolve({ src, ok: true });
    audio.onerror = () => resolve({ src, ok: false });
    audio.src = src;
    audio.load();
    setTimeout(() => resolve({ src, ok: true }), 1800);
  });
}

function updateLoadingProgress(progress, text = null) {
  const clamped = Math.max(0, Math.min(1, progress));
  document.documentElement.style.setProperty("--loader-progress", clamped.toFixed(3));
  if (loaderFillEl) loaderFillEl.style.setProperty("--loader-progress", clamped.toFixed(3));
  if (loaderPercentEl) loaderPercentEl.textContent = `${Math.round(clamped * 100)}%`;
  if (text && loadingTextEl) loadingTextEl.textContent = text;
}

async function preloadWithProgress(items, loader, start, end, text) {
  if (items.length === 0) {
    updateLoadingProgress(end, text);
    return [];
  }

  let done = 0;
  const results = [];
  const queue = [...items];
  const workerCount = Math.min(4, items.length);
  await Promise.all(
    Array.from({ length: workerCount }, async () => {
      while (queue.length > 0) {
        const item = queue.shift();
        const result = await loader(item);
        results.push(result);
        done += 1;
        updateLoadingProgress(start + (done / items.length) * (end - start), text);
      }
    })
  );

  return results;
}

async function preloadWithoutProgress(items, loader) {
  const queue = [...items];
  const workerCount = Math.min(4, items.length);
  await Promise.all(
    Array.from({ length: workerCount }, async () => {
      while (queue.length > 0) {
        const item = queue.shift();
        await loader(item);
      }
    })
  );
}

async function finishLoadingScreen() {
  updateLoadingProgress(1, "出发，开始甜甜三消！");
  await sleep(420);
  loadingScreenEl?.classList.add("hidden");
}

async function preloadRequiredImages() {
  updateLoadingProgress(0.04, "卡皮巴拉正在检查糖果");
  const currentReadyAsset = activePet().ready;
  const requiredImages = [...new Set([...REQUIRED_IMAGE_ASSETS, currentReadyAsset])];
  const firstPass = await preloadWithProgress(requiredImages, preloadImage, 0.08, 0.82, "正在装盘糖果素材");
  const missing = firstPass.filter((item) => !item.ok).map((item) => item.src);
  if (missing.length > 0) {
    const secondPass = await preloadWithProgress(
      missing.map((src) => `${src}?retry=${Date.now()}`),
      preloadImage,
      0.82,
      0.9,
      "卡皮巴拉正在补齐素材"
    );
    const stillMissing = secondPass.filter((item) => !item.ok);
    if (stillMissing.length > 0) showToast("部分素材稍后补上");
  }
  preloadWithoutProgress(REQUIRED_AUDIO_ASSETS, preloadAudio).catch(() => {});
  updateLoadingProgress(0.98, "甜点马上出炉");
  await sleep(260);
}

async function bootGame() {
  busy = true;
  registerServiceWorker();
  enableBackNavigationGuard();
  await preloadRequiredImages();
  level = getSavedLevel();
  busy = false;
  renderHomeHub();
  await finishLoadingScreen();
  const remainingReadyAssets = PET_ORDER.map((id) => PETS[id].ready).filter((src) => src !== activePet().ready);
  preloadWithoutProgress(remainingReadyAssets, preloadImage).catch(() => {});
}

function getSoundPreference() {
  try {
    return window.localStorage?.getItem("sweet-match-sound") !== "off";
  } catch {
    return true;
  }
}

function setSoundPreference(enabled) {
  try {
    window.localStorage?.setItem("sweet-match-sound", enabled ? "on" : "off");
  } catch {
    // Some embedded browsers limit storage access; sound still works for the current session.
  }
}

function defaultPlayer() {
  return {
    name: "甜甜玩家",
    coins: 0,
    unlockedPets: ["capybara"],
    activePet: "capybara",
    pets: {
      capybara: { level: 1, satiety: 0 },
    },
    basket: {
      amount: 0,
      capacity: 63,
      freshnessMinutes: BASE_FRESH_MINUTES,
      freshUntil: Date.now() + BASE_FRESH_MINUTES * 60000,
      warmSlots: 0,
    },
    inventory: {
      ice: 0,
      flame: 0,
      warmStone: 0,
    },
    highestLevel: 0,
    lastSeenAt: Date.now(),
  };
}

function loadPlayer() {
  try {
    const saved = JSON.parse(window.localStorage?.getItem(PLAYER_KEY) || "null");
    const base = defaultPlayer();
    if (!saved || typeof saved !== "object") return base;
    const merged = {
      ...base,
      ...saved,
      pets: { ...base.pets, ...(saved.pets || {}) },
      basket: { ...base.basket, ...(saved.basket || {}) },
      inventory: { ...base.inventory, ...(saved.inventory || {}) },
    };
    for (const id of merged.unlockedPets) {
      if (!merged.pets[id]) merged.pets[id] = { level: 1, satiety: 0 };
    }
    return merged;
  } catch {
    return defaultPlayer();
  }
}

function savePlayer() {
  player.lastSeenAt = Date.now();
  player.basket.capacity = basketCapacity();
  try {
    window.localStorage?.setItem(PLAYER_KEY, JSON.stringify(player));
  } catch {
    // Local play can continue even if storage is unavailable.
  }
}

function ownedPets() {
  return player.unlockedPets.filter((id) => PETS[id]);
}

function totalAppetitePerHour() {
  return ownedPets().reduce((sum, id) => sum + PETS[id].appetite, 0);
}

function basketCapacity() {
  return Math.max(63, Math.ceil(totalAppetitePerHour() * 1.05) + (player.basket.warmSlots || 0) * 18);
}

function activePetId() {
  return PETS[player.activePet] ? player.activePet : "capybara";
}

function activePetState() {
  const id = activePetId();
  if (!player.pets[id]) player.pets[id] = { level: 1, satiety: 0 };
  return player.pets[id];
}

function activePet() {
  return PETS[activePetId()];
}

function applyOfflineFeeding() {
  const now = Date.now();
  const elapsedHours = Math.max(0, (now - (player.lastSeenAt || now)) / 3600000);
  if (elapsedHours <= 0) return;
  const appetite = totalAppetitePerHour();
  const staleFactor = now > (player.basket.freshUntil || 0) ? 0.5 : 1;
  const consumed = Math.min(player.basket.amount || 0, appetite * elapsedHours);
  player.basket.amount = Math.max(0, (player.basket.amount || 0) - consumed);
  const petIds = ownedPets();
  for (const id of petIds) {
    const pet = PETS[id];
    const state = player.pets[id] || { level: 1, satiety: 0 };
    const share = pet.appetite / Math.max(1, appetite);
    state.satiety = Math.min(pet.maxSatiety, state.satiety + consumed * share * staleFactor);
    player.pets[id] = state;
  }
  player.lastSeenAt = now;
  player.basket.capacity = basketCapacity();
  savePlayer();
}

function applyFoodToPet(value = FOOD_SATIETY) {
  const pet = activePet();
  const state = activePetState();
  const room = Math.max(0, pet.maxSatiety - state.satiety);
  const eaten = Math.min(room, value);
  state.satiety += eaten;
  const overflow = value - eaten;
  if (overflow > 0) addFoodToBasket(overflow);
  player.pets[activePetId()] = state;
  savePlayer();
}

function addFoodToBasket(value) {
  const capacity = basketCapacity();
  const flavorBonus = 1 + Math.min(0.5, (player.inventory.flame || 0) * 0.03);
  const preserveBonus = Math.min(110, (player.inventory.ice || 0) * 18);
  const warmBonus = Math.min(60, (player.basket.warmSlots || 0) * 12);
  const gained = value * flavorBonus;
  player.basket.amount = Math.min(capacity, (player.basket.amount || 0) + gained);
  player.basket.capacity = capacity;
  player.basket.freshnessMinutes = BASE_FRESH_MINUTES + preserveBonus + warmBonus;
  player.basket.freshUntil = Date.now() + player.basket.freshnessMinutes * 60000;
}

function grantObstacleItem(name, amount = 1) {
  if (name === "ice") {
    player.inventory.ice += amount;
    showToast(`冰块保鲜 +${amount}`);
  } else if (name === "fire") {
    player.inventory.flame += amount;
    showToast(`火焰口感 +${amount}`);
  } else if (name === "stone") {
    player.inventory.warmStone += amount;
    player.basket.warmSlots += amount;
    showToast(`暖胃石 +${amount}`);
  }
  savePlayer();
}

function spendPetSatiety(skill) {
  const petId = SKILL_TO_PET[skill];
  const pet = PETS[petId];
  if (!pet || !player.unlockedPets.includes(petId)) {
    showToast("先在商店解锁这只宠物");
    return false;
  }
  const state = player.pets[petId] || { level: 1, satiety: 0 };
  const cost = Math.max(72, pet.skillCost - (state.level - 1) * 4);
  if (state.satiety < cost) {
    showToast(`${pet.name}还没吃饱`);
    return false;
  }
  state.satiety -= cost;
  player.pets[petId] = state;
  player.activePet = petId;
  savePlayer();
  return true;
}

function petSkillReady(skill) {
  const petId = SKILL_TO_PET[skill];
  const pet = PETS[petId];
  const state = player.pets[petId];
  if (!pet || !state || !player.unlockedPets.includes(petId)) return false;
  return state.satiety >= Math.max(72, pet.skillCost - (state.level - 1) * 4);
}

function skillLabel(skill) {
  const petId = SKILL_TO_PET[skill];
  const pet = PETS[petId];
  if (!pet) return "";
  const state = player.pets[petId] || { level: 1, satiety: 0 };
  const cost = Math.max(72, pet.skillCost - (state.level - 1) * 4);
  if (!player.unlockedPets.includes(petId)) return `未解锁`;
  return `${Math.floor(state.satiety)}/${cost}`;
}

function gainCoins(amount, reason = "过关奖励") {
  player.coins += amount;
  showToast(`${reason} +${amount} 金币`);
  savePlayer();
}

function buyPet(id) {
  const pet = PETS[id];
  if (!pet) return;
  if (player.unlockedPets.includes(id)) {
    player.activePet = id;
    expandedPetId = id;
    shopNotice = { id, kind: "success", text: `${pet.name}已设为出战宠物` };
    savePlayer();
    renderHomeHub();
    return;
  }
  if (player.coins < pet.price) {
    expandedPetId = id;
    shopNotice = { id, kind: "error", text: `金币不足，还差 ${pet.price - player.coins}` };
    renderShop();
    return;
  }
  player.coins -= pet.price;
  player.unlockedPets.push(id);
  player.pets[id] = { level: 1, satiety: 0 };
  player.activePet = id;
  expandedPetId = id;
  shopNotice = { id, kind: "success", text: `购买成功，${pet.name}已加入厨房` };
  player.basket.capacity = basketCapacity();
  savePlayer();
  renderHomeHub();
}

function switchTab(tabName) {
  activeTab = tabName;
  readyPanelEl.hidden = tabName !== "game";
  shopPanelEl.hidden = tabName !== "shop";
  profilePanelEl.hidden = tabName !== "profile";
  tabButtons.forEach((button) => button.classList.toggle("active", button.dataset.tab === tabName));
  renderHomeHub();
}

function basketAsset() {
  const capacity = Math.max(1, player.basket.capacity || basketCapacity());
  const ratio = Math.max(0, Math.min(1, (player.basket.amount || 0) / capacity));
  const index = ratio <= 0 ? 0 : Math.min(5, Math.ceil(ratio * 5));
  return BASKET_ASSETS[index];
}

function renderHomeHub() {
  const pet = activePet();
  const basketSrc = basketAsset();
  homeLevelEl.textContent = `${getSavedLevel() + 1}`;
  homeCoinsEl.textContent = `${player.coins}`;
  readyPetImgEl.src = pet.ready || pet.idle;
  readyPetNameEl.textContent = pet.name;
  readyLevelTextEl.textContent = gameStarted ? `继续挑战第 ${level + 1} 关` : `准备挑战第 ${getSavedLevel() + 1} 关`;
  startGameBtn.textContent = gameStarted ? "继续游戏" : "开始游戏";
  homeBasketImgEl.src = basketSrc;
  renderPetHud();
  renderShop();
  renderProfile();
}

async function enterGame() {
  requestPortraitLock();
  updateOrientationLock();
  if (isLandscapeLocked) return;
  homeViewEl.hidden = true;
  gameViewEl.hidden = false;
  playSound("button");
  if (!gameStarted) {
    gameStarted = true;
    await startLevel(getSavedLevel());
  } else {
    render();
  }
}

function exitGame() {
  activeTool = null;
  selected = null;
  closeModal();
  gameViewEl.hidden = true;
  homeViewEl.hidden = false;
  switchTab("game");
  playSound("button");
}

function getSavedLevel() {
  try {
    const saved = Number.parseInt(window.localStorage?.getItem(PROGRESS_KEY) || "0", 10);
    const localLevel = Number.isFinite(saved) && saved >= 0 ? saved : 0;
    return Math.min(MAX_LEVELS - 1, Math.max(localLevel, player.highestLevel || 0));
  } catch {
    return Math.min(MAX_LEVELS - 1, player.highestLevel || 0);
  }
}

function saveLevelProgress(nextLevel) {
  try {
    const saved = getSavedLevel();
    const capped = Math.min(MAX_LEVELS - 1, Math.max(saved, nextLevel));
    player.highestLevel = Math.max(player.highestLevel || 0, capped);
    savePlayer();
    window.localStorage?.setItem(PROGRESS_KEY, String(capped));
  } catch {
    // Progress still advances for the current session when storage is unavailable.
  }
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  if (!window.isSecureContext && location.hostname !== "localhost" && location.hostname !== "127.0.0.1") return;
  navigator.serviceWorker
    .register("sw.js")
    .then((registration) => registration.update())
    .catch(() => {});
  let refreshed = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshed) return;
    refreshed = true;
    window.location.reload();
  });
}

function enableBackNavigationGuard() {
  if (!window.history?.pushState) return;
  try {
    window.history.replaceState({ sweetMatch: true }, "", window.location.href);
    window.history.pushState({ sweetMatchGuard: true }, "", window.location.href);
    window.addEventListener("popstate", () => {
      window.history.pushState({ sweetMatchGuard: true }, "", window.location.href);
      showToast("游戏中已防止误返回");
    });
  } catch {
    // Touch guards still cover browsers that restrict history state.
  }
}

function rememberTouchStart(event) {
  const touch = event.touches?.[0];
  if (!touch) return;
  touchStart = { x: touch.clientX, y: touch.clientY, edge: touch.clientX < 34 };
}

function blockBackSwipe(event) {
  if (!touchStart?.edge) return;
  const touch = event.touches?.[0];
  if (!touch) return;
  const dx = touch.clientX - touchStart.x;
  const dy = touch.clientY - touchStart.y;
  if (dx > 8 && Math.abs(dx) > Math.abs(dy) * 1.12) event.preventDefault();
}

function levelNumber() {
  return level + 1;
}

function buildLevelConfig(levelIndex) {
  const cappedLevel = Math.min(MAX_LEVELS - 1, levelIndex);
  const shownLevel = cappedLevel + 1;
  const segment = Math.floor(cappedLevel / 20);
  const wave = LEVEL_WAVE[cappedLevel % LEVEL_WAVE.length];
  const typeIndexes = foodPoolForLevel(cappedLevel);
  const orderA = typeIndexes[cappedLevel % typeIndexes.length];
  const orderB = typeIndexes[(cappedLevel + 2) % typeIndexes.length];
  const config = {
    targetScore: Math.round((2600 + segment * 170 + (shownLevel % 20) * 18) * wave),
    moves: Math.max(24, 31 - Math.floor(cappedLevel / 80) - (shownLevel % 10 === 0 ? 1 : 0)),
    orders: [
      { type: orderA, need: Math.round(7 + segment * 0.25 + wave * 3) },
      { type: orderB, need: Math.round(7 + segment * 0.25 + wave * 3) },
    ],
    typeCount: typeIndexes.length,
    typeIndexes,
    themeName: FOOD_THEMES[Math.floor(cappedLevel / 20) % FOOD_THEMES.length].name,
    iceCount: 0,
    initialStones: 0,
    fireEvery: 0,
  };

  if (shownLevel >= 10) {
    config.iceCount = Math.min(12, 2 + Math.floor(shownLevel / 45));
    config.orders.push({ obstacle: "ice", need: config.iceCount });
    config.moves += shownLevel % 5 === 1 ? 2 : 1;
  }

  if (shownLevel >= 20) {
    config.initialStones = shownLevel % 5 === 1 ? 1 : Math.min(5, 1 + Math.floor(shownLevel / 95));
    config.fireEvery = shownLevel % 5 === 1 ? 0 : Math.max(4, 7 - Math.floor(shownLevel / 140));
    config.moves += 2;
  }

  return config;
}

function tile(type = randType(), special = null) {
  return { type, special, ice: false, stone: false, burning: false };
}

function stoneTile() {
  return { type: null, special: null, ice: false, stone: true, burning: false };
}

function tileVisual(piece) {
  if (piece?.stone) return OBSTACLE_TYPES.stone;
  return piece.special ? SPECIAL_TYPES[piece.special] : TYPES[piece.type];
}

function randType() {
  const pool = currentLevel().typeIndexes;
  return pool[Math.floor(Math.random() * pool.length)];
}

function typeCountForLevel(levelIndex) {
  return Math.min(8, 6 + Math.max(0, Math.floor((levelIndex - 20) / 10)));
}

function foodPoolForLevel(levelIndex) {
  const theme = FOOD_THEMES[Math.floor(levelIndex / 20) % FOOD_THEMES.length];
  const pool = [...theme.indexes];
  const extraCount = Math.min(3, Math.floor(levelIndex / 60));
  for (let i = 0; i < extraCount; i += 1) {
    pool.push((theme.indexes[0] + 5 + i + Math.floor(levelIndex / 40)) % TYPES.length);
  }
  return [...new Set(pool)].slice(0, 8);
}

function key(row, col) {
  return `${row}-${col}`;
}

function parseKey(id) {
  const [row, col] = id.split("-").map(Number);
  return { row, col };
}

function currentLevel() {
  return buildLevelConfig(level);
}

function sameType(a, b) {
  return a && b && !a.stone && !b.stone && Number.isInteger(a.type) && a.type === b.type;
}

function randomTileFor(row, col, draft) {
  let next = tile();
  let guard = 0;

  while (guard < 30) {
    const left1 = col >= 1 ? draft[row][col - 1] : null;
    const left2 = col >= 2 ? draft[row][col - 2] : null;
    const up1 = row >= 1 ? draft[row - 1][col] : null;
    const up2 = row >= 2 ? draft[row - 2][col] : null;

    if (!(sameType(left1, next) && sameType(left2, next)) && !(sameType(up1, next) && sameType(up2, next))) {
      return next;
    }

    next = tile();
    guard += 1;
  }

  return next;
}

function createBoard() {
  let guard = 0;
  do {
    board = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));

    for (let row = 0; row < SIZE; row += 1) {
      for (let col = 0; col < SIZE; col += 1) {
        board[row][col] = randomTileFor(row, col, board);
      }
    }

    placeInitialObstacles();
    guard += 1;
  } while (!findMove() && guard < 20);
}

function shuffledCells() {
  return Array.from({ length: SIZE * SIZE }, (_, index) => ({
    row: Math.floor(index / SIZE),
    col: index % SIZE,
  })).sort(() => Math.random() - 0.5);
}

function placeInitialObstacles() {
  const config = currentLevel();
  const cells = shuffledCells();

  for (let i = 0; i < config.initialStones && cells.length; i += 1) {
    const cell = cells.shift();
    board[cell.row][cell.col] = stoneTile();
  }

  let placedIce = 0;
  for (const cell of cells) {
    if (placedIce >= config.iceCount) break;
    const piece = board[cell.row][cell.col];
    if (!piece || piece.stone) continue;
    piece.ice = true;
    placedIce += 1;
  }
}

function ensureBoardTiles() {
  const existing = boardEl.querySelectorAll(":scope > .tile");
  if (existing.length === SIZE * SIZE) return existing;

  boardEl.innerHTML = "";
  const fragment = document.createDocumentFragment();
  for (let row = 0; row < SIZE; row += 1) {
    for (let col = 0; col < SIZE; col += 1) {
      const button = document.createElement("button");
      button.className = "tile";
      button.type = "button";
      const image = document.createElement("img");
      image.className = "tile-art";
      image.alt = "";
      button.append(image);
      fragment.append(button);
    }
  }
  boardEl.append(fragment);
  return boardEl.querySelectorAll(":scope > .tile");
}

function applyTileState(button, row, col, options = {}) {
  const piece = board[row][col];
  if (!piece) return;

  button.className = "tile";
  button.dataset.row = row;
  button.dataset.col = col;
  delete button.dataset.special;
  delete button.dataset.obstacle;
  delete button.dataset.ice;
  delete button.dataset.burning;
  button.style.removeProperty("--fall-distance");
  button.style.removeProperty("--fall-delay");

  if (piece.special) button.dataset.special = piece.special;
  if (piece.stone) button.dataset.obstacle = "stone";
  if (piece.ice) button.dataset.ice = "true";
  if (piece.burning) button.dataset.burning = "true";

  const visual = tileVisual(piece);
  const label = piece.stone ? visual.name : piece.special ? `${visual.name} 奖励方块` : visual.name;
  button.setAttribute("aria-label", piece.ice ? `${label}，冰块覆盖` : label);

  if (selected && selected.row === row && selected.col === col) button.classList.add("selected");
  if (activeTool) button.classList.add("tool-target");

  const dropInfo = options.dropMap?.get(key(row, col));
  if (dropInfo || options.animateDrop || options.staggerDrop) {
    button.classList.add("falling");
    const distance = dropInfo
      ? Math.max(42, dropInfo.rows * 58)
      : options.staggerDrop
        ? 155 + row * 10
        : Math.max(28, (SIZE - row) * 13);
    const delay = dropInfo
      ? dropInfo.delay
      : options.staggerDrop
        ? (row * SIZE + col) * 10
        : Math.min(120, row * 18 + col * 5);
    button.style.setProperty("--fall-distance", `${distance}px`);
    button.style.setProperty("--fall-delay", `${delay}ms`);
  }

  let image = button.querySelector(".tile-art");
  if (!image) {
    image = document.createElement("img");
    image.className = "tile-art";
    image.alt = "";
    button.prepend(image);
  }
  if (image.getAttribute("src") !== visual.src) image.src = visual.src;

  button.querySelectorAll(".obstacle-overlay").forEach((item) => item.remove());
  if (piece.ice) button.append(makeOverlay("ice-overlay", OBSTACLE_TYPES.ice.src));
  if (piece.burning) button.append(makeOverlay("fire-overlay", OBSTACLE_TYPES.fire.src));
}

function render(options = {}) {
  const renderOptions = {
    animateDrop: options.animateDrop === true,
    staggerDrop: options.staggerDrop === true,
    dropMap: options.dropMap || null,
  };
  const tiles = ensureBoardTiles();

  for (let row = 0; row < SIZE; row += 1) {
    for (let col = 0; col < SIZE; col += 1) {
      applyTileState(tiles[row * SIZE + col], row, col, renderOptions);
    }
  }

  levelEl.textContent = `${level + 1}`;
  scoreEl.textContent = score.toString();
  movesEl.textContent = moves.toString();
  comboEl.textContent = `x${combo}`;
  targetScoreEl.textContent = `${currentLevel().themeName} ${currentLevel().targetScore}`;
  progressFillEl.style.width = `${Math.min(100, Math.round((score / currentLevel().targetScore) * 100))}%`;
  hammerCountEl.textContent = skillLabel("hammer");
  sparkCountEl.textContent = skillLabel("spark");
  rowBlastCountEl.textContent = skillLabel("rowBlast");
  colBlastCountEl.textContent = skillLabel("colBlast");
  crossBlastCountEl.textContent = skillLabel("crossBlast");
  addMovesCountEl.textContent = "免费";
  hammerBtn.classList.toggle("active", activeTool === "hammer");
  sparkBtn.classList.toggle("active", activeTool === "spark");
  rowBlastBtn.classList.toggle("active", activeTool === "rowBlast");
  colBlastBtn.classList.toggle("active", activeTool === "colBlast");
  crossBlastBtn.classList.toggle("active", activeTool === "crossBlast");
  hammerBtn.disabled = !petSkillReady("hammer") || busy || ended;
  sparkBtn.disabled = !petSkillReady("spark") || busy || ended;
  rowBlastBtn.disabled = !petSkillReady("rowBlast") || busy || ended;
  colBlastBtn.disabled = !petSkillReady("colBlast") || busy || ended;
  crossBlastBtn.disabled = !petSkillReady("crossBlast") || busy || ended;
  addMovesBtn.disabled = boosters.addMoves <= 0 || busy || ended;
  hintBtn.disabled = busy || ended;
  shuffleBtn.disabled = busy || ended || moves <= 0;
  soundBtn.setAttribute("aria-pressed", String(soundEnabled));
  soundIconEl.textContent = soundEnabled ? "声音开" : "静音";
  renderPetHud();
  renderShop();
  renderProfile();
  renderOrders();
}

function renderPetHud() {
  const pet = activePet();
  const state = activePetState();
  const basket = player.basket;
  activePetImgEl.src = pet.idle;
  activePetNameEl.textContent = pet.name;
  petSatietyTextEl.textContent = `${Math.floor(state.satiety)}/${pet.maxSatiety}`;
  petSatietyFillEl.style.width = `${Math.min(100, Math.round((state.satiety / pet.maxSatiety) * 100))}%`;
  basket.capacity = basketCapacity();
  basketTextEl.textContent = `${Math.floor(basket.amount || 0)}/${basket.capacity}`;
  const basketSrc = basketAsset();
  basketImgEl.src = basketSrc;
  homeBasketImgEl.src = basketSrc;
  const left = Math.max(0, Math.round(((basket.freshUntil || 0) - Date.now()) / 60000));
  freshnessTextEl.textContent = left > 0 ? `保鲜 ${left} 分钟` : "不新鲜";
  homeFreshnessTextEl.textContent = left > 0 ? `保鲜 ${left} 分钟` : "食物已不新鲜";
  coinTextShopEl.textContent = `金币 ${player.coins}`;
  coinTextProfileEl.textContent = `金币 ${player.coins}`;
}

function renderShop() {
  petShopEl.innerHTML = "";
  for (const id of PET_ORDER) {
    const pet = PETS[id];
    const owned = player.unlockedPets.includes(id);
    const expanded = expandedPetId === id;
    const state = player.pets[id] || { level: 1, satiety: 0 };
    const skillCost = Math.max(72, pet.skillCost - (state.level - 1) * 4);
    const card = document.createElement("article");
    card.className = `pet-card${owned ? " owned" : ""}${expanded ? " expanded" : ""}`;
    card.dataset.pet = id;
    card.innerHTML = `
      <button class="pet-card-summary" type="button" aria-expanded="${expanded}">
        <img src="${pet.idle}" alt="" />
        <span>
          <strong>${pet.name}</strong>
          <span>${pet.skillName} · ${pet.appetite}/小时</span>
          <small>${owned ? (player.activePet === id ? "当前出战" : "已拥有") : `${pet.price} 金币`}</small>
        </span>
        <i aria-hidden="true">${expanded ? "−" : "+"}</i>
      </button>
      <div class="pet-card-details" ${expanded ? "" : "hidden"}>
        <p>${pet.description}</p>
        <div class="pet-parameters">
          <span><small>价格</small><strong>${owned ? "已拥有" : `${pet.price} 金币`}</strong></span>
          <span><small>技能</small><strong>${pet.skillName}</strong></span>
          <span><small>技能消耗</small><strong>${skillCost} 饱食度</strong></span>
          <span><small>每小时食量</small><strong>${pet.appetite}</strong></span>
          <span><small>饱食上限</small><strong>${pet.maxSatiety}</strong></span>
          <span><small>当前等级</small><strong>Lv.${state.level}</strong></span>
        </div>
        ${shopNotice?.id === id ? `<div class="shop-notice ${shopNotice.kind}">${shopNotice.text}</div>` : ""}
        <button class="pet-buy-btn" type="button" ${owned && player.activePet === id ? "disabled" : ""}>
          ${owned ? (player.activePet === id ? "当前出战" : "设为出战") : `购买 · ${pet.price} 金币`}
        </button>
      </div>
    `;
    card.querySelector(".pet-card-summary").addEventListener("click", () => {
      expandedPetId = expanded ? null : id;
      if (shopNotice?.id !== id) shopNotice = null;
      renderShop();
    });
    card.querySelector(".pet-buy-btn")?.addEventListener("click", () => buyPet(id));
    petShopEl.append(card);
  }
}

function renderProfile() {
  playerNameInputEl.value = player.name;
  profileStatsEl.innerHTML = `
    <div><span>账号</span><strong>${player.name}</strong></div>
    <div><span>最高关卡</span><strong>${Math.max(1, (player.highestLevel || 0) + 1)}</strong></div>
    <div><span>拥有宠物</span><strong>${ownedPets().length}/5</strong></div>
    <div><span>篮子容量</span><strong>${basketCapacity()}</strong></div>
    <div><span>冰块</span><strong>${player.inventory.ice}</strong></div>
    <div><span>火焰</span><strong>${player.inventory.flame}</strong></div>
    <div><span>暖胃石</span><strong>${player.inventory.warmStone}</strong></div>
    <div><span>云同步</span><strong>待接入</strong></div>
  `;
}

function renderOrders() {
  ordersEl.innerHTML = "";
  for (const order of orders) {
    const item = document.createElement("div");
    item.className = `order${order.got >= order.need ? " done" : ""}`;

    const image = document.createElement("img");
    const visual = order.obstacle ? OBSTACLE_TYPES[order.obstacle] : TYPES[order.type];
    image.src = visual.src;
    image.alt = "";

    const name = document.createElement("span");
    name.textContent = visual.name;

    const count = document.createElement("strong");
    count.textContent = `${Math.min(order.got, order.need)}/${order.need}`;

    item.append(image, name, count);
    ordersEl.append(item);
  }
}

function updateTile(cell) {
  const tileEl = tileElement(cell);
  if (!tileEl) return;
  applyTileState(tileEl, cell.row, cell.col);
}

function makeOverlay(className, src) {
  const image = document.createElement("img");
  image.className = `obstacle-overlay ${className}`;
  image.src = src;
  image.alt = "";
  return image;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function showToast(message) {
  clearTimeout(toastTimer);
  toastEl.textContent = message;
  toastEl.classList.add("show");
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 980);
}

function showComboBanner(message) {
  clearTimeout(bannerTimer);
  comboBannerEl.textContent = message;
  comboBannerEl.hidden = false;
  bannerTimer = setTimeout(() => {
    comboBannerEl.hidden = true;
  }, 980);
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function playMascotVoice(text) {
  if (!soundEnabled) return;
  const src = MASCOT_VOICES[text];
  if (!src) return;

  try {
    mascotVoiceAudio?.pause();
    mascotVoiceAudio = new Audio(src);
    mascotVoiceAudio.volume = 0.92;
    mascotVoiceAudio.play().catch(() => {});
  } catch {
    // Voice lines are a bonus layer; bubbles and sound effects still play.
  }
}

function cheerMascot(kind) {
  const line = pick(MASCOT_LINES[kind] || MASCOT_LINES.four);
  activePetImgEl.src = activePet().eat;
  mascotBubbleEl.textContent = line;
  mascotEl.classList.remove("cheer");
  void mascotEl.offsetWidth;
  mascotEl.classList.add("cheer");
  playMascotVoice(line);
  clearTimeout(cheerMascot.timer);
  cheerMascot.timer = setTimeout(() => {
    activePetImgEl.src = activePet().idle;
    mascotBubbleEl.textContent = "继续，我在给你烤甜点！";
    mascotEl.classList.remove("cheer");
  }, 2600);
}

function showFloatingScore(amount, cells) {
  const first = cells?.[0];
  if (!first) return;
  const tileEl = boardEl.querySelector(`[data-row="${first.row}"][data-col="${first.col}"]`);
  if (!tileEl) return;

  const rect = tileEl.getBoundingClientRect();
  const float = document.createElement("span");
  float.className = "float-score";
  float.textContent = `+${amount}`;
  float.style.left = `${rect.left + rect.width / 2}px`;
  float.style.top = `${rect.top + rect.height / 2}px`;
  document.body.append(float);
  float.addEventListener("animationend", () => float.remove(), { once: true });
}

function tileElement(cell) {
  return boardEl.querySelector(`[data-row="${cell.row}"][data-col="${cell.col}"]`);
}

function shakeTiles(cells) {
  for (const cell of cells) {
    const tileEl = tileElement(cell);
    if (!tileEl) continue;
    tileEl.classList.remove("bad-swap");
    void tileEl.offsetWidth;
    tileEl.classList.add("bad-swap");
    tileEl.addEventListener("animationend", () => tileEl.classList.remove("bad-swap"), { once: true });
  }
}

function ensureAudio() {
  if (!soundEnabled) return null;
  if (!audioContext) {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) return null;
    audioContext = new AudioCtor();
  }
  if (audioContext.state === "suspended") audioContext.resume();
  return audioContext;
}

function unlockAudio() {
  const ctx = ensureAudio();
  if (!ctx || audioUnlocked) return;

  try {
    const source = ctx.createBufferSource();
    const gain = ctx.createGain();
    gain.gain.value = 0.0001;
    source.buffer = ctx.createBuffer(1, 1, ctx.sampleRate);
    source.connect(gain);
    gain.connect(ctx.destination);
    source.start(0);
    audioUnlocked = true;
  } catch {
    // Audio can still be unlocked by the next real tap in stricter browsers.
  }
}

function tone(freq, start, duration, options = {}) {
  const ctx = ensureAudio();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  osc.type = options.type || "sine";
  osc.frequency.setValueAtTime(freq, start);
  if (options.slideTo) osc.frequency.exponentialRampToValueAtTime(options.slideTo, start + duration);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(options.filter || 2400, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(options.volume || 0.08, start + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

function noise(start, duration, volume = 0.08) {
  const ctx = ensureAudio();
  if (!ctx) return;

  const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * duration));
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i += 1) data[i] = Math.random() * 2 - 1;

  const source = ctx.createBufferSource();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 900;
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  source.buffer = buffer;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(start);
  source.stop(start + duration);
}

function bounceTone(base, start, options = {}) {
  const volume = options.volume || 0.05;
  const lift = options.lift || 1.8;
  const settle = options.settle || 1.12;
  const type = options.type || "sine";
  tone(base, start, 0.075, {
    slideTo: base * lift,
    volume,
    type,
    filter: options.filter || 3200,
  });
  tone(base * 1.28, start + 0.055, 0.105, {
    slideTo: base * settle,
    volume: volume * 0.68,
    type: "triangle",
    filter: options.filter || 3000,
  });
  tone(base * 2.02, start + 0.13, 0.055, {
    slideTo: base * 1.72,
    volume: volume * 0.32,
    type: "sine",
    filter: 4200,
  });
}

function playSound(name, strength = 1) {
  const ctx = ensureAudio();
  if (!ctx) return;
  const now = ctx.currentTime + 0.01;

  if (name === "select") {
    bounceTone(520, now, { volume: 0.034, lift: 1.72, settle: 1.04 });
  } else if (name === "swap") {
    bounceTone(430, now, { volume: 0.044, lift: 1.9, settle: 1.18 });
    bounceTone(560, now + 0.08, { volume: 0.03, lift: 1.52, settle: 1.04 });
  } else if (name === "bad") {
    tone(220, now, 0.08, { slideTo: 155, volume: 0.048, type: "triangle", filter: 900 });
    tone(175, now + 0.08, 0.09, { slideTo: 128, volume: 0.034, type: "sine", filter: 760 });
  } else if (name === "clear") {
    const notes = [523, 659, 784, 988, 1175];
    notes.slice(0, Math.min(notes.length, 2 + strength)).forEach((freq, index) => {
      bounceTone(freq, now + index * 0.05, {
        volume: 0.035,
        lift: 1.45,
        settle: 1.02,
        filter: 4200,
      });
    });
  } else if (name === "special") {
    noise(now, 0.08, 0.035);
    bounceTone(392, now, { volume: 0.06, lift: 2.35, settle: 1.22, filter: 4800 });
    bounceTone(784, now + 0.12, { volume: 0.04, lift: 1.55, settle: 1.02, filter: 5200 });
  } else if (name === "tool") {
    noise(now, 0.055, 0.025);
    bounceTone(330, now, { volume: 0.052, lift: 2.05, settle: 1.18, type: "triangle" });
    tone(990, now + 0.12, 0.07, { slideTo: 760, volume: 0.018, type: "sine", filter: 5000 });
  } else if (name === "win") {
    [523, 659, 784, 1046, 1318].forEach((freq, index) => {
      bounceTone(freq, now + index * 0.075, { volume: 0.044, lift: 1.35, settle: 1.02 });
    });
  } else if (name === "lose") {
    [392, 330, 262].forEach((freq, index) => {
      tone(freq, now + index * 0.1, 0.16, { volume: 0.045, type: "triangle" });
    });
  } else if (name === "button") {
    bounceTone(420, now, { volume: 0.03, lift: 1.5, settle: 1.05 });
  }
}

function areAdjacent(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col) === 1;
}

function canMoveCell(cell) {
  const piece = board[cell.row]?.[cell.col];
  return !!piece && !piece.stone;
}

function swap(a, b) {
  const temp = board[a.row][a.col];
  board[a.row][a.col] = board[b.row][b.col];
  board[b.row][b.col] = temp;
}

function getMatchGroups() {
  const groups = [];

  for (let row = 0; row < SIZE; row += 1) {
    let runStart = 0;
    for (let col = 1; col <= SIZE; col += 1) {
      if (col < SIZE && sameType(board[row][col], board[row][runStart])) continue;
      if (col - runStart >= 3) {
        groups.push({
          orientation: "row",
          cells: Array.from({ length: col - runStart }, (_, i) => ({ row, col: runStart + i })),
        });
      }
      runStart = col;
    }
  }

  for (let col = 0; col < SIZE; col += 1) {
    let runStart = 0;
    for (let row = 1; row <= SIZE; row += 1) {
      if (row < SIZE && sameType(board[row][col], board[runStart][col])) continue;
      if (row - runStart >= 3) {
        groups.push({
          orientation: "col",
          cells: Array.from({ length: row - runStart }, (_, i) => ({ row: runStart + i, col })),
        });
      }
      runStart = row;
    }
  }

  return groups;
}

function getMatches() {
  const matches = new Set();
  for (const group of getMatchGroups()) {
    for (const cell of group.cells) matches.add(key(cell.row, cell.col));
  }
  return matches;
}

function chooseSpecialCell(group, preferred) {
  if (preferred && group.cells.some((cell) => cell.row === preferred.row && cell.col === preferred.col)) return preferred;
  return group.cells[Math.floor(group.cells.length / 2)];
}

function specialFromGroup(group) {
  if (group.cells.length >= 5) return "bomb";
  if (group.cells.length === 4) return group.orientation;
  return null;
}

function collectSpecials(groups, preferred) {
  const specials = new Map();
  for (const group of groups) {
    const special = specialFromGroup(group);
    if (!special) continue;
    const cell = chooseSpecialCell(group, preferred);
    specials.set(key(cell.row, cell.col), { type: board[cell.row][cell.col].type, special });
  }
  return specials;
}

function addSpecialBlast(matches) {
  const queue = [...matches].map(parseKey);
  const visited = new Set(matches);

  while (queue.length) {
    const cell = queue.shift();
    const piece = board[cell.row][cell.col];
    if (!piece?.special) continue;

    const extra = [];
    if (piece.special === "row" || piece.special === "col") {
      extra.push(...hammerCells(cell));
    } else if (piece.special === "bomb") {
      extra.push(...typeCells(piece.type));
    }

    for (const next of extra) {
      const id = key(next.row, next.col);
      if (visited.has(id)) continue;
      visited.add(id);
      matches.add(id);
      queue.push(next);
    }
  }
}

async function markClearing(matches) {
  if (matches.size === 0) return;
  playSound("clear", Math.min(4, Math.ceil(matches.size / 3)));
  for (const id of matches) {
    const { row, col } = parseKey(id);
    const tileEl = boardEl.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    tileEl?.classList.add("clearing");
    burst(tileEl);
  }
  await sleep(230);
}

function collectFoodFromMatches(matches) {
  let collected = 0;
  for (const id of matches) {
    const { row, col } = parseKey(id);
    const piece = board[row]?.[col];
    if (!piece || piece.stone || piece.type === null) continue;
    const tileEl = tileElement({ row, col });
    animateFoodToPet(tileEl, piece);
    applyFoodToPet(FOOD_SATIETY);
    collected += 1;
  }
  if (collected > 0) {
    const img = activePetImgEl;
    img.src = activePet().eat;
    img.classList.remove("eating");
    void img.offsetWidth;
    img.classList.add("eating");
    window.setTimeout(() => {
      img.src = activePet().idle;
      img.classList.remove("eating");
    }, 620);
  }
}

function animateFoodToPet(tileEl, piece) {
  if (!tileEl || !activePetImgEl) return;
  const img = tileEl.querySelector("img");
  if (!img) return;
  const start = img.getBoundingClientRect();
  const end = activePetImgEl.getBoundingClientRect();
  const flyer = document.createElement("img");
  flyer.className = "food-flyer";
  flyer.src = tileVisual(piece).src;
  flyer.alt = "";
  flyer.style.left = `${start.left + start.width / 2 - 17}px`;
  flyer.style.top = `${start.top + start.height / 2 - 17}px`;
  document.body.append(flyer);
  requestAnimationFrame(() => {
    flyer.style.transform = `translate(${end.left + end.width / 2 - start.left - start.width / 2}px, ${end.top + end.height / 2 - start.top - start.height / 2}px) scale(0.35)`;
    flyer.style.opacity = "0.25";
  });
  window.setTimeout(() => flyer.remove(), 620);
}

function burst(tileEl) {
  if (!tileEl) return;
  const rect = tileEl.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 5; i += 1) {
    const spark = document.createElement("span");
    spark.className = "sparkle";
    spark.style.left = `${centerX}px`;
    spark.style.top = `${centerY}px`;
    spark.style.setProperty("--dx", `${Math.cos(i * 1.26) * 42}px`);
    spark.style.setProperty("--dy", `${Math.sin(i * 1.26) * 42}px`);
    document.body.append(spark);
    spark.addEventListener("animationend", () => spark.remove(), { once: true });
  }
}

function collectOrders(clearedPieces) {
  for (const piece of clearedPieces) {
    if (piece.stone) continue;
    const order = orders.find((item) => item.type === piece.type);
    if (order) order.got += 1;
  }
}

function collectObstacle(name, amount = 1) {
  const order = orders.find((item) => item.obstacle === name);
  if (order) order.got += amount;
  grantObstacleItem(name, amount);
}

function neighborCells(cell) {
  return [
    cell,
    { row: cell.row - 1, col: cell.col },
    { row: cell.row + 1, col: cell.col },
    { row: cell.row, col: cell.col - 1 },
    { row: cell.row, col: cell.col + 1 },
  ].filter((next) => next.row >= 0 && next.row < SIZE && next.col >= 0 && next.col < SIZE);
}

function crackIceNear(matches) {
  let cracked = 0;
  const protectedCells = new Set();
  const candidates = new Set();

  for (const id of matches) {
    const cell = parseKey(id);
    for (const next of neighborCells(cell)) candidates.add(key(next.row, next.col));
  }

  for (const id of candidates) {
    const cell = parseKey(id);
    const piece = board[cell.row]?.[cell.col];
    if (!piece?.ice) continue;
    piece.ice = false;
    cracked += 1;
    protectedCells.add(id);
    burst(tileElement(cell));
  }

  for (const id of protectedCells) matches.delete(id);
  if (cracked > 0) {
    collectObstacle("ice", cracked);
    playSound("special");
    cheerMascot("ice");
    render();
  }

  return cracked;
}

function collapse(matches, specials) {
  const clearedPieces = [];
  const dropMap = new Map();
  for (const id of matches) {
    const { row, col } = parseKey(id);
    if (board[row][col]?.stone) collectObstacle("stone", 1);
    else if (board[row][col]) clearedPieces.push(board[row][col]);
    board[row][col] = null;
  }

  for (const [id, piece] of specials) {
    if (!matches.has(id)) continue;
    const { row, col } = parseKey(id);
    board[row][col] = piece;
  }

  collectOrders(clearedPieces);

  for (let col = 0; col < SIZE; col += 1) {
    const kept = [];
    for (let row = SIZE - 1; row >= 0; row -= 1) {
      if (board[row][col] !== null) kept.push({ piece: board[row][col], fromRow: row });
    }

    let created = 0;
    for (let row = SIZE - 1; row >= 0; row -= 1) {
      const item = kept[SIZE - 1 - row];
      if (item) {
        board[row][col] = item.piece;
        const rows = row - item.fromRow;
        if (rows > 0) {
          dropMap.set(key(row, col), {
            rows,
            delay: (SIZE - 1 - row) * 58 + col * 12,
          });
        }
      } else {
        board[row][col] = tile();
        created += 1;
        dropMap.set(key(row, col), {
          rows: row + created,
          delay: created * 70 + col * 12,
        });
      }
    }
  }

  return dropMap;
}

async function resolveBoard(preferredSpecialCell = null, checkEndAfter = true) {
  let groups = getMatchGroups();
  let clearedTotal = 0;
  combo = 1;

  while (groups.length > 0) {
    const biggestGroup = Math.max(...groups.map((group) => group.cells.length));
    const matched = new Set();
    for (const group of groups) {
      for (const cell of group.cells) matched.add(key(cell.row, cell.col));
    }

    const specials = collectSpecials(groups, preferredSpecialCell);
    addSpecialBlast(matched);
    crackIceNear(matched);
    if (matched.size === 0) {
      render();
      groups = getMatchGroups();
      preferredSpecialCell = null;
      continue;
    }
    if (specials.size > 0) playSound("special");
    if (biggestGroup >= 6) cheerMascot("six");
    else if (biggestGroup >= 5) cheerMascot("five");
    else if (biggestGroup >= 4) cheerMascot("four");
    collectFoodFromMatches(matched);
    await markClearing(matched);
    clearedTotal += matched.size;
    const gained = matched.size * 70 * combo + specials.size * 180;
    score += gained;
    showFloatingScore(gained, [...matched].map(parseKey));
    combo += 1;
    const dropMap = collapse(matched, specials);
    render({ dropMap });
    await sleep(980);
    groups = getMatchGroups();
    preferredSpecialCell = null;
  }

  combo = Math.max(1, combo - 1);
  render();

  if (combo >= 3) {
    showComboBanner(`${combo} 连甜蜜爆发`);
    cheerMascot("combo");
  }
  if (clearedTotal >= 9) showToast(`大片甜爆 +${clearedTotal}`);
  else if (clearedTotal >= 5) showToast(`甜蜜连消 +${clearedTotal}`);
  if (!findMove()) {
    shuffleBoard(false);
    showToast("已自动洗牌");
  }
  if (checkEndAfter) await checkEnd();
}

function fireCandidates() {
  const cells = [];
  for (let row = 0; row < SIZE; row += 1) {
    for (let col = 0; col < SIZE; col += 1) {
      const piece = board[row][col];
      if (piece && !piece.stone && !piece.ice && !piece.special) cells.push({ row, col });
    }
  }
  return cells;
}

async function triggerFireStep() {
  const config = currentLevel();
  if (!config.fireEvery || turnsTaken === 0 || turnsTaken % config.fireEvery !== 0 || ended) return;
  const candidates = fireCandidates();
  if (candidates.length === 0) return;

  const cell = pick(candidates);
  const piece = board[cell.row][cell.col];
  if (!piece) return;
  piece.burning = true;
  render();
  cheerMascot("fire");
  showToast("火焰烧成石头！");
  grantObstacleItem("fire", 1);
  playSound("special");
  await sleep(720);
  board[cell.row][cell.col] = stoneTile();
  burst(tileElement(cell));
  render();
  await sleep(260);
}

async function trySwap(a, b) {
  if (busy || ended || !areAdjacent(a, b) || moves <= 0 || !canMoveCell(a) || !canMoveCell(b)) return;
  busy = true;
  let didMatch = false;
  activeTool = null;
  selected = null;
  boardEl.querySelectorAll(".selected").forEach((tileEl) => tileEl.classList.remove("selected"));
  swap(a, b);
  playSound("swap");
  updateTile(a);
  updateTile(b);
  await sleep(120);

  if (getMatches().size === 0) {
    swap(a, b);
    updateTile(a);
    updateTile(b);
    shakeTiles([a, b]);
    playSound("bad");
    showToast("没有连成哦");
  } else {
    didMatch = true;
    moves -= 1;
    turnsTaken += 1;
    await resolveBoard(b);
    await triggerFireStep();
    render();
  }

  busy = false;
  if (didMatch) render();
}

function findMove() {
  for (let row = 0; row < SIZE; row += 1) {
    for (let col = 0; col < SIZE; col += 1) {
      const here = { row, col };
      if (!canMoveCell(here)) continue;
      const candidates = [
        { row: row + 1, col },
        { row, col: col + 1 },
      ];

      for (const next of candidates) {
        if (next.row >= SIZE || next.col >= SIZE) continue;
        if (!canMoveCell(next)) continue;
        swap(here, next);
        const works = getMatches().size > 0;
        swap(here, next);
        if (works) return [here, next];
      }
    }
  }

  return null;
}

function shuffleBoard(costMove = true) {
  updateOrientationLock();
  if (isLandscapeLocked) return;
  const values = board.flat().sort(() => Math.random() - 0.5);
  board = Array.from({ length: SIZE }, (_, row) =>
    Array.from({ length: SIZE }, (_, col) => values[row * SIZE + col])
  );

  while (getMatches().size > 0 || !findMove()) {
    values.sort(() => Math.random() - 0.5);
    board = Array.from({ length: SIZE }, (_, row) =>
      Array.from({ length: SIZE }, (_, col) => values[row * SIZE + col])
    );
  }

  if (costMove) moves = Math.max(0, moves - 1);
  selected = null;
  playSound("button");
  render();
  checkEnd();
}

function hint() {
  requestPortraitLock();
  updateOrientationLock();
  if (isLandscapeLocked) return;
  playSound("button");
  const move = findMove();
  if (!move) {
    shuffleBoard(false);
    showToast("换一盘新的");
    return;
  }

  boardEl.querySelectorAll(".hint").forEach((tileEl) => tileEl.classList.remove("hint"));
  for (const spot of move) {
    boardEl.querySelector(`[data-row="${spot.row}"][data-col="${spot.col}"]`)?.classList.add("hint");
  }
}

function uniqueCells(cells) {
  const seen = new Set();
  const result = [];
  for (const cell of cells) {
    const id = key(cell.row, cell.col);
    if (seen.has(id)) continue;
    seen.add(id);
    result.push(cell);
  }
  return result;
}

function rowCells(row) {
  return Array.from({ length: SIZE }, (_, col) => ({ row, col }));
}

function colCells(col) {
  return Array.from({ length: SIZE }, (_, row) => ({ row, col }));
}

function typeCells(type) {
  if (!Number.isInteger(type)) return [];
  const cells = [];
  for (let row = 0; row < SIZE; row += 1) {
    for (let col = 0; col < SIZE; col += 1) {
      if (board[row][col]?.type === type) cells.push({ row, col });
    }
  }
  return cells;
}

function crossCells(cell) {
  return uniqueCells([...rowCells(cell.row), ...colCells(cell.col)]);
}

function hammerCells(cell) {
  return uniqueCells([
    cell,
    { row: cell.row - 1, col: cell.col },
    { row: cell.row + 1, col: cell.col },
    { row: cell.row, col: cell.col - 1 },
    { row: cell.row, col: cell.col + 1 },
  ]).filter((next) => next.row >= 0 && next.row < SIZE && next.col >= 0 && next.col < SIZE);
}

async function clearCells(cells, message, expandSpecials = true, options = {}) {
  const allowDuringBusy = options.allowDuringBusy === true;
  const checkEndAfter = options.checkEndAfter !== false;
  if ((busy && !allowDuringBusy) || ended) return;
  const wasBusy = busy;
  busy = true;
  selected = null;
  playSound("tool");
  const safeCells = uniqueCells(cells).filter((cell) => board[cell.row]?.[cell.col]);
  const matched = new Set(safeCells.map((cell) => key(cell.row, cell.col)));
  if (expandSpecials) addSpecialBlast(matched);
  crackIceNear(matched);
  if (matched.size === 0) {
    showToast(message);
    busy = wasBusy;
    render();
    if (checkEndAfter) await checkEnd();
    return;
  }
  collectFoodFromMatches(matched);
  await markClearing(matched);
  const gained = matched.size * 55;
  score += gained;
  showFloatingScore(gained, safeCells);
  const dropMap = collapse(matched, new Map());
  render({ dropMap });
  await sleep(980);
  await resolveBoard(null, checkEndAfter);
  showToast(message);
  busy = wasBusy;
  render();
}

async function spotlightBoardReward(cell, message) {
  render();
  const tileEl = tileElement(cell);
  if (tileEl) {
    tileEl.classList.add("auto-reward");
    burst(tileEl);
  }
  playSound("special");
  showToast(message);
  await sleep(720);
}

function useHammer(cell) {
  if (!spendPetSatiety("hammer")) return;
  activeTool = null;
  clearCells(hammerCells(cell), "糖锤敲碎！");
}

function useSpark(cell) {
  const piece = board[cell.row]?.[cell.col];
  if (!piece || piece.stone) return;
  if (!spendPetSatiety("spark")) return;
  activeTool = null;
  clearCells(typeCells(piece.type), "星爆清屏！");
}

function useRowBlast(cell) {
  if (!spendPetSatiety("rowBlast")) return;
  activeTool = null;
  clearCells(rowCells(cell.row), "横扫一排！");
}

function useColBlast(cell) {
  if (!spendPetSatiety("colBlast")) return;
  activeTool = null;
  clearCells(colCells(cell.col), "竖扫一列！");
}

function useCrossBlast(cell) {
  if (!spendPetSatiety("crossBlast")) return;
  activeTool = null;
  clearCells(crossCells(cell), "十字甜爆！");
}

function useAddMoves() {
  requestPortraitLock();
  updateOrientationLock();
  if (isLandscapeLocked) return;
  if (boosters.addMoves <= 0 || busy || ended) return;
  boosters.addMoves -= 1;
  moves += 5;
  activeTool = null;
  selected = null;
  playSound("tool");
  render();
  showToast("步数 +5");
}

function useTileReward(cell) {
  const piece = board[cell.row]?.[cell.col];
  if (!piece?.special) return false;

  if (piece.special === "bomb") {
    clearCells(typeCells(piece.type), "星爆清屏！");
  } else {
    clearCells(hammerCells(cell), "糖锤敲碎！");
  }

  return true;
}

function hasWon() {
  return score >= currentLevel().targetScore && orders.every((order) => order.got >= order.need);
}

function levelCoinReward() {
  return Math.floor(35 + (level + 1) * 1.5);
}

function chestChance() {
  return Math.min(0.14, 0.06 + Math.floor((level + 1) / 20) * 0.005);
}

function findBoardReward() {
  for (let row = 0; row < SIZE; row += 1) {
    for (let col = 0; col < SIZE; col += 1) {
      if (board[row][col]?.special) return { row, col };
    }
  }
  return null;
}

async function autoUseBoardRewards() {
  let reward = findBoardReward();
  let usedAny = false;
  while (reward && hasWon() && !ended) {
    const piece = board[reward.row]?.[reward.col];
    if (!piece?.special) break;
    usedAny = true;

    if (piece.special === "bomb") {
      await spotlightBoardReward(reward, "星爆自动释放！");
      await clearCells(typeCells(piece.type), "星爆自动释放！", true, {
        allowDuringBusy: true,
        checkEndAfter: false,
      });
    } else {
      await spotlightBoardReward(reward, "糖锤自动释放！");
      await clearCells(hammerCells(reward), "糖锤自动释放！", true, {
        allowDuringBusy: true,
        checkEndAfter: false,
      });
    }

    await sleep(260);
    reward = findBoardReward();
  }
  if (usedAny) {
    showToast("棋盘道具释放完成");
    await sleep(620);
  }
}

async function checkEnd() {
  if (ended || endingSequence) return;
  if (hasWon()) {
    endingSequence = true;
    await autoUseBoardRewards();
    ended = true;
    endingSequence = false;
    saveLevelProgress(level + 1);
    const baseCoins = levelCoinReward();
    let rewardText = `过关金币 +${baseCoins}`;
    gainCoins(baseCoins, "过关奖励");
    if (Math.random() < chestChance()) {
      const chestCoins = baseCoins * (6 + Math.floor(Math.random() * 7));
      gainCoins(chestCoins, "宝箱奖励");
      rewardText += `，宝箱 +${chestCoins}`;
    }
    playSound("win");
    openModal("关卡完成", "宠物吃饱啦！", `第 ${level + 1} 关完成，${rewardText}。`, "下一关");
  } else if (moves <= 0) {
    ended = true;
    playSound("lose");
    openModal("挑战结束", "差一点点", "重开这一关，再凑一波漂亮连消。", "再来一次");
  }
}

function openModal(kicker, title, text, action) {
  modalKickerEl.textContent = kicker;
  modalTitleEl.textContent = title;
  modalTextEl.textContent = text;
  nextBtn.textContent = action;
  modalEl.hidden = false;
  render();
}

function closeModal() {
  modalEl.hidden = true;
}

async function startLevel(nextLevel = level) {
  level = nextLevel;
  const config = currentLevel();
  score = 0;
  moves = config.moves;
  combo = 1;
  turnsTaken = 0;
  orders = config.orders.map((order) => ({ ...order, got: 0 }));
  boosters = {
    hammer: 1,
    spark: 1,
    rowBlast: 1,
    colBlast: 1,
    crossBlast: 1,
    addMoves: 1,
  };
  selected = null;
  activeTool = null;
  busy = true;
  ended = false;
  endingSequence = false;
  closeModal();
  createBoard();
  render({ staggerDrop: true });
  playSound("button");
  showToast(`第 ${level + 1} 关`);
  await sleep(1650);
  busy = false;
  render();
}

function restart() {
  requestPortraitLock();
  updateOrientationLock();
  if (isLandscapeLocked) return;
  startLevel(level);
}

function cellFromTile(tileEl) {
  return {
    row: Number(tileEl.dataset.row),
    col: Number(tileEl.dataset.col),
  };
}

function boardCellFromPoint(x, y) {
  const boardRect = boardEl.getBoundingClientRect();
  const boardMargin = boardRect.width / SIZE * 0.35;
  if (
    x < boardRect.left - boardMargin ||
    x > boardRect.right + boardMargin ||
    y < boardRect.top - boardMargin ||
    y > boardRect.bottom + boardMargin
  ) {
    return null;
  }

  let closest = null;
  let closestDistance = Infinity;
  for (const tileEl of boardEl.querySelectorAll(".tile")) {
    const rect = tileEl.getBoundingClientRect();
    const dx = x - (rect.left + rect.width / 2);
    const dy = y - (rect.top + rect.height / 2);
    const distance = Math.hypot(dx, dy);
    if (distance < closestDistance) {
      closestDistance = distance;
      closest = tileEl;
    }
  }

  if (!closest) return null;
  const rect = closest.getBoundingClientRect();
  const maxDistance = Math.max(rect.width, rect.height) * 0.92;
  return closestDistance <= maxDistance ? cellFromTile(closest) : null;
}

window.boardCellFromPoint = boardCellFromPoint;

function handleTileAction(current) {
  unlockAudio();
  ensureAudio();
  requestPortraitLock();
  updateOrientationLock();
  if (isLandscapeLocked || busy || ended) return;

  if (activeTool === "hammer") {
    useHammer(current);
    return;
  }

  if (activeTool === "spark") {
    useSpark(current);
    return;
  }

  if (activeTool === "rowBlast") {
    useRowBlast(current);
    return;
  }

  if (activeTool === "colBlast") {
    useColBlast(current);
    return;
  }

  if (activeTool === "crossBlast") {
    useCrossBlast(current);
    return;
  }

  if (useTileReward(current)) return;

  if (!canMoveCell(current)) return;
  if (moves <= 0) return;

  if (!selected) {
    selected = current;
    playSound("select");
    render();
    return;
  }

  if (selected.row === current.row && selected.col === current.col) {
    selected = null;
    render();
    return;
  }

  if (areAdjacent(selected, current)) {
    trySwap(selected, current);
  } else {
    selected = current;
    playSound("select");
    render();
  }
}

function neighborFromDrag(start, dx, dy) {
  const horizontal = Math.abs(dx) > Math.abs(dy);
  const next = {
    row: start.row + (!horizontal && dy > 0 ? 1 : !horizontal && dy < 0 ? -1 : 0),
    col: start.col + (horizontal && dx > 0 ? 1 : horizontal && dx < 0 ? -1 : 0),
  };

  if (next.row < 0 || next.row >= SIZE || next.col < 0 || next.col >= SIZE) return null;
  return next;
}

boardEl.addEventListener("pointerdown", (event) => {
  unlockAudio();
  requestPortraitLock();
  updateOrientationLock();
  if (isLandscapeLocked) return;
  const current = boardCellFromPoint(event.clientX, event.clientY);
  if (!current || busy || ended || activeTool) return;
  dragStart = {
    cell: current,
    pointerId: event.pointerId,
    x: event.clientX,
    y: event.clientY,
  };
  boardEl.setPointerCapture?.(event.pointerId);
});

boardEl.addEventListener("pointerup", (event) => {
  updateOrientationLock();
  if (isLandscapeLocked) return;
  if (!dragStart || dragStart.pointerId !== event.pointerId) return;
  const dx = event.clientX - dragStart.x;
  const dy = event.clientY - dragStart.y;
  const distance = Math.hypot(dx, dy);
  const threshold = Math.max(18, boardEl.getBoundingClientRect().width / SIZE * 0.28);
  const startCell = dragStart.cell;
  dragStart = null;

  if (distance < threshold) return;

  const next = neighborFromDrag(startCell, dx, dy);
  if (!next || busy || ended || moves <= 0) return;

  suppressNextClick = true;
  selected = null;
  trySwap(startCell, next);
});

boardEl.addEventListener("pointercancel", () => {
  dragStart = null;
});

boardEl.addEventListener("click", (event) => {
  unlockAudio();
  requestPortraitLock();
  updateOrientationLock();
  if (isLandscapeLocked) return;
  if (suppressNextClick) {
    suppressNextClick = false;
    event.preventDefault();
    return;
  }

  const current = boardCellFromPoint(event.clientX, event.clientY);
  if (!current) return;
  handleTileAction(current);
});

hintBtn.addEventListener("click", hint);
shuffleBtn.addEventListener("click", () => {
  requestPortraitLock();
  updateOrientationLock();
  if (isLandscapeLocked || busy || ended) return;
  shuffleBoard(true);
  showToast("洗牌完成");
});
restartBtn.addEventListener("click", restart);
soundBtn.addEventListener("click", () => {
  requestPortraitLock();
  updateOrientationLock();
  if (isLandscapeLocked) return;
  soundEnabled = !soundEnabled;
  setSoundPreference(soundEnabled);
  if (soundEnabled) {
    audioUnlocked = false;
    unlockAudio();
    playSound("button");
  }
  render();
  showToast(soundEnabled ? "声音已打开" : "已静音");
});
hammerBtn.addEventListener("click", () => {
  requestPortraitLock();
  updateOrientationLock();
  if (isLandscapeLocked) return;
  if (!petSkillReady("hammer")) {
    spendPetSatiety("hammer");
    render();
    return;
  }
  playSound("button");
  activeTool = activeTool === "hammer" ? null : "hammer";
  selected = null;
  render();
  if (activeTool) showToast("选择一个棋子敲碎");
});
sparkBtn.addEventListener("click", () => {
  requestPortraitLock();
  updateOrientationLock();
  if (isLandscapeLocked) return;
  if (!petSkillReady("spark")) {
    spendPetSatiety("spark");
    render();
    return;
  }
  playSound("button");
  activeTool = activeTool === "spark" ? null : "spark";
  selected = null;
  render();
  if (activeTool) showToast("选择一种棋子清除");
});
rowBlastBtn.addEventListener("click", () => {
  requestPortraitLock();
  updateOrientationLock();
  if (isLandscapeLocked) return;
  if (!petSkillReady("rowBlast")) {
    spendPetSatiety("rowBlast");
    render();
    return;
  }
  playSound("button");
  activeTool = activeTool === "rowBlast" ? null : "rowBlast";
  selected = null;
  render();
  if (activeTool) showToast("选择一排横扫");
});
colBlastBtn.addEventListener("click", () => {
  requestPortraitLock();
  updateOrientationLock();
  if (isLandscapeLocked) return;
  if (!petSkillReady("colBlast")) {
    spendPetSatiety("colBlast");
    render();
    return;
  }
  playSound("button");
  activeTool = activeTool === "colBlast" ? null : "colBlast";
  selected = null;
  render();
  if (activeTool) showToast("选择一列竖扫");
});
crossBlastBtn.addEventListener("click", () => {
  requestPortraitLock();
  updateOrientationLock();
  if (isLandscapeLocked) return;
  if (!petSkillReady("crossBlast")) {
    spendPetSatiety("crossBlast");
    render();
    return;
  }
  playSound("button");
  activeTool = activeTool === "crossBlast" ? null : "crossBlast";
  selected = null;
  render();
  if (activeTool) showToast("选择中心点");
});
addMovesBtn.addEventListener("click", useAddMoves);
nextBtn.addEventListener("click", () => {
  requestPortraitLock();
  updateOrientationLock();
  if (isLandscapeLocked) return;
  playSound("button");
  if (hasWon()) startLevel(level + 1);
  else startLevel(level);
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => switchTab(button.dataset.tab));
});

startGameBtn.addEventListener("click", enterGame);
exitGameBtn.addEventListener("click", exitGame);

saveProfileBtn.addEventListener("click", () => {
  const nextName = playerNameInputEl.value.trim() || "甜甜玩家";
  player.name = nextName.slice(0, 16);
  savePlayer();
  renderHomeHub();
  showToast("账号已保存");
});

bootGame();
