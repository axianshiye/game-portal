const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const ui = {
  score: document.querySelector("#score"),
  gold: document.querySelector("#gold"),
  weapon: document.querySelector("#weapon"),
  lives: document.querySelector("#lives"),
  bombs: document.querySelector("#bombs"),
  wave: document.querySelector("#wave"),
  menu: document.querySelector("#menu"),
  modeControls: document.querySelector("#mode-controls"),
  ships: document.querySelector("#ships"),
  start: document.querySelector("#start"),
  how: document.querySelector("#how"),
  hint: document.querySelector("#hint"),
  toast: document.querySelector("#toast"),
  prep: document.querySelector("#prep"),
  prepStage: document.querySelector("#prep-stage"),
  prepGold: document.querySelector("#prep-gold"),
  prepShip: document.querySelector("#prep-ship"),
  upgrades: document.querySelector("#upgrades"),
  resultPanel: document.querySelector("#result-panel"),
  routePanel: document.querySelector("#route-panel"),
  rewardPanel: document.querySelector("#reward-panel"),
  shopPanel: document.querySelector("#shop-panel"),
  techPanel: document.querySelector("#tech-panel"),
  taskPanel: document.querySelector("#task-panel"),
  codexPanel: document.querySelector("#codex-panel"),
  settingsPanel: document.querySelector("#settings-panel"),
  nextStage: document.querySelector("#next-stage"),
  repair: document.querySelector("#repair"),
  prepHint: document.querySelector("#prep-hint")
};

const W = canvas.width;
const H = canvas.height;
const bg = new Image();
bg.src = "./assets/storm-bg-seamless.png";
const atlas = new Image();
atlas.src = "./assets/sprite-atlas.png";

const sprites = {
  falcon: [0, 0],
  vanguard: [1, 0],
  phantom: [2, 0],
  tempest: [3, 0],
  wingBlue: [3, 0],
  wingGold: [4, 0],
  drone: [0, 1],
  zig: [1, 1],
  tank: [2, 1],
  caster: [3, 1],
  mine: [4, 1],
  boss: [0, 2],
  core: [1, 2],
  claw: [2, 2],
  shield: [3, 2],
  elite: [4, 2],
  plasma: [0, 3],
  rocketSprite: [1, 3],
  thunderSprite: [2, 3],
  coin: [3, 3],
  crate: [4, 3]
};

const ships = [
  { id: "falcon", name: "苍隼", hp: 3, speed: 410, fire: 0.12, bomb: 2, color: "#67e8f9", trait: "均衡高速，拾取范围大" },
  { id: "vanguard", name: "重甲", hp: 5, speed: 320, fire: 0.16, bomb: 3, color: "#facc15", trait: "血量高，炸弹更多" },
  { id: "phantom", name: "幻影", hp: 2, speed: 480, fire: 0.09, bomb: 1, color: "#c084fc", trait: "射速最快，擦弹加分" },
  { id: "tempest", name: "风暴", hp: 4, speed: 450, fire: 0.1, bomb: 2, color: "#38bdf8", trait: "原型机，技能充能更快" }
];

const weaponNames = {
  pulse: "脉冲",
  spread: "散射",
  laser: "激光",
  rocket: "火箭",
  orbit: "护航",
  thunder: "雷链"
};

const upgradeDefs = [
  { id: "firepower", name: "火力核心", desc: "提升初始武器等级和所有武器伤害", base: 12 },
  { id: "engine", name: "矢量引擎", desc: "提升移动速度和金币吸附范围", base: 10 },
  { id: "armor", name: "复合装甲", desc: "提升最大生命，开局更稳", base: 14 },
  { id: "payload", name: "炸弹挂架", desc: "提升炸弹容量，清屏更从容", base: 16 }
];

const modes = [
  { id: "campaign", name: "战役", desc: "路线关卡 + 整备成长" },
  { id: "endless", name: "无尽", desc: "连续 Boss，奖励倍率高" },
  { id: "challenge", name: "挑战", desc: "每日规则：敌弹更快，金币更多" }
];

const difficulties = {
  easy: { name: "简单", enemy: 0.82, reward: 0.85 },
  normal: { name: "普通", enemy: 1, reward: 1 },
  hard: { name: "困难", enemy: 1.28, reward: 1.25 },
  nightmare: { name: "噩梦", enemy: 1.62, reward: 1.65 }
};

const stagePlan = ["歼灭", "收集", "生存", "护送", "限时Boss"];
const techDefs = [
  { id: "coin", name: "金币回收", desc: "金币价值 +1" },
  { id: "crit", name: "暴击矩阵", desc: "暴击率 +5%" },
  { id: "shield", name: "护盾协议", desc: "每关开局护盾 +1" }
];
const qualities = [
  { name: "普通", color: "#cbd5e1", bonus: 1 },
  { name: "稀有", color: "#38bdf8", bonus: 1.25 },
  { name: "史诗", color: "#c084fc", bonus: 1.55 },
  { name: "传说", color: "#facc15", bonus: 2 }
];

const keys = new Set();
const state = {
  mode: "menu",
  selected: ships[0],
  player: null,
  bullets: [],
  enemyBullets: [],
  enemies: [],
  particles: [],
  powerups: [],
  explosions: [],
  floaters: [],
  score: 0,
  gold: 0,
  tech: 0,
  stage: 1,
  stageKills: 0,
  stageStart: 0,
  stageHits: 0,
  collected: 0,
  objectiveProgress: 0,
  bossSpawned: false,
  bossWarning: 0,
  repairBoost: 0,
  upgrades: { firepower: 0, engine: 0, armor: 0, payload: 0 },
  techUpgrades: { coin: 0, crit: 0, shield: 0 },
  unlockedShips: ["falcon", "vanguard", "phantom"],
  equipment: [],
  shop: [],
  rewardChoices: [],
  tasks: [],
  achievements: {},
  codex: { enemies: {}, weapons: {} },
  modeType: "campaign",
  difficulty: "normal",
  stageType: "歼灭",
  lastResult: null,
  settings: { autoFire: true, lowFx: false, shake: true, pauseCorner: "右下", music: 0.8, sfx: 0.9 },
  weaponEvolve: "",
  battlePerks: [],
  perkOffered: false,
  activeSkill: 0,
  ultimate: 0,
  manualFire: false,
  wave: 1,
  combo: 1,
  time: 0,
  spawn: 0,
  fire: 0,
  bgY: 0,
  flash: 0,
  shake: 0,
  paused: false,
  pauseReason: "",
  audio: null,
  musicStep: 0,
  musicTime: 0,
  musicMode: ""
};

function icon(ship) {
  const pos = sprites[ship.id];
  return `<span class="ship-icon" aria-hidden="true" style="background-position:${pos[0] * 25}% ${pos[1] * 33.3333}%"></span>`;
}

function renderShips() {
  ui.ships.innerHTML = ships.map(ship => `
    <button class="ship-card" data-id="${ship.id}" aria-pressed="${ship.id === state.selected.id}" ${state.unlockedShips.includes(ship.id) ? "" : "disabled"}>
      ${icon(ship)}
      <strong>${ship.name}</strong>
      <span>${state.unlockedShips.includes(ship.id) ? ship.trait : "商店解锁"}</span>
    </button>
  `).join("");
}

function renderModeControls() {
  ui.modeControls.innerHTML = modes.map(mode => `
    <button data-mode="${mode.id}" aria-pressed="${state.modeType === mode.id}">
      ${mode.name}
    </button>
  `).join("");
}

function saveGame() {
  const data = {
    gold: state.gold,
    tech: state.tech,
    stage: state.stage,
    upgrades: state.upgrades,
    techUpgrades: state.techUpgrades,
    unlockedShips: state.unlockedShips,
    equipment: state.equipment,
    weaponEvolve: state.weaponEvolve,
    achievements: state.achievements,
    codex: state.codex,
    modeType: state.modeType,
    difficulty: state.difficulty,
    settings: state.settings
  };
  localStorage.setItem("raidenThunderSave", JSON.stringify(data));
}

function loadGame() {
  try {
    const data = JSON.parse(localStorage.getItem("raidenThunderSave") || "{}");
    Object.assign(state, {
      gold: data.gold || 0,
      tech: data.tech || 0,
      stage: data.stage || 1,
      upgrades: { ...state.upgrades, ...(data.upgrades || {}) },
      techUpgrades: { ...state.techUpgrades, ...(data.techUpgrades || {}) },
      unlockedShips: data.unlockedShips || state.unlockedShips,
      equipment: data.equipment || [],
      weaponEvolve: data.weaponEvolve || "",
      achievements: data.achievements || {},
      codex: data.codex || state.codex,
      modeType: data.modeType || "campaign",
      difficulty: data.difficulty || "normal",
      settings: { ...state.settings, ...(data.settings || {}) }
    });
  } catch {
    localStorage.removeItem("raidenThunderSave");
  }
}

function currentStageType() {
  if (state.modeType === "endless") return "无尽";
  if (state.modeType === "challenge") return "挑战";
  return stagePlan[(state.stage - 1) % stagePlan.length];
}

function createTasks() {
  state.tasks = [
    { id: "kill", text: "击落 12 个敌人", done: 0, target: 12, reward: 8 },
    { id: "coin", text: "收集 18 枚金币", done: 0, target: 18, reward: 10 },
    { id: "graze", text: "擦弹 8 次", done: 0, target: 8, reward: 1, tech: true }
  ];
}

function randomEquipment() {
  const q = qualities[Math.min(qualities.length - 1, Math.floor(Math.random() * Math.random() * qualities.length))];
  const slot = ["引擎", "装甲", "核心", "雷达", "弹仓"][Math.floor(Math.random() * 5)];
  return { id: Date.now() + Math.random(), slot, quality: q.name, color: q.color, bonus: q.bonus };
}

function refreshShop() {
  state.shop = [
    { type: "weapon", name: "武器箱", cost: 16 + state.stage * 2 },
    { type: "equipment", name: "随机装备", cost: 22 + state.stage * 3, item: randomEquipment() },
    { type: "ship", name: "解锁风暴原型机", cost: 90 }
  ];
}

function ensureAudio() {
  if (state.audio) {
    if (state.audio.ac.state === "suspended") state.audio.ac.resume();
    return;
  }
  const Ctx = window.AudioContext || window.webkitAudioContext;
  const ac = new Ctx();
  const gain = ac.createGain();
  gain.gain.value = 0.055 * state.settings.music;
  gain.connect(ac.destination);
  state.audio = { ac, gain };
}

function tone(freq, dur = 0.06, type = "square", vol = 0.45, slide = 1) {
  ensureAudio();
  const { ac, gain } = state.audio;
  const osc = ac.createOscillator();
  const amp = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ac.currentTime);
  osc.frequency.exponentialRampToValueAtTime(Math.max(30, freq * slide), ac.currentTime + dur);
  amp.gain.setValueAtTime(vol * state.settings.sfx, ac.currentTime);
  amp.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + dur);
  osc.connect(amp);
  amp.connect(gain);
  osc.start();
  osc.stop(ac.currentTime + dur);
}

function noise(dur = 0.18, vol = 0.35) {
  ensureAudio();
  const { ac, gain } = state.audio;
  const buffer = ac.createBuffer(1, ac.sampleRate * dur, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  const src = ac.createBufferSource();
  const amp = ac.createGain();
  src.buffer = buffer;
  amp.gain.value = vol * state.settings.sfx;
  src.connect(amp);
  amp.connect(gain);
  src.start();
}

function explosionSound(big = false) {
  noise(big ? 0.52 : 0.24, big ? 0.58 : 0.34);
  tone(big ? 82 : 145, big ? 0.28 : 0.16, "sawtooth", big ? 0.28 : 0.2, 0.35);
  setTimeout(() => tone(big ? 46 : 72, big ? 0.24 : 0.12, "square", big ? 0.18 : 0.12, 0.55), 45);
}

function startGame(resetCampaign = true) {
  ensureAudio();
  if (resetCampaign) {
    state.stage = 1;
    state.score = 0;
    state.gold = 0;
    state.tech = 0;
    state.repairBoost = 0;
    state.upgrades = { firepower: 0, engine: 0, armor: 0, payload: 0 };
    state.techUpgrades = { coin: 0, crit: 0, shield: 0 };
  }
  createTasks();
  refreshShop();
  startStage();
}

function startStage() {
  ensureAudio();
  Object.assign(state, {
    mode: "play",
    bullets: [],
    enemyBullets: [],
    enemies: [],
    particles: [],
    explosions: [],
    powerups: [],
    floaters: [],
    wave: state.stage,
    stageKills: 0,
    stageHits: 0,
    collected: 0,
    objectiveProgress: 0,
    battlePerks: [],
    perkOffered: false,
    bossSpawned: false,
    bossWarning: 0,
    combo: 1,
    time: 0,
    spawn: 0,
    fire: 0,
    flash: 0,
    shake: 0,
    paused: false,
    pauseReason: ""
  });
  const s = state.selected;
  const up = state.upgrades;
  state.stageType = currentStageType();
  ui.menu.querySelector("h1").textContent = "雷霆弹幕";
  ui.hint.textContent = "方向键/WASD 移动，空格炸弹，P 暂停。把战机停到右下角会暂停，移出来继续。";
  ui.menu.hidden = true;
  ui.prep.hidden = true;
  state.player = {
    x: W / 2,
    y: H - 105,
    r: 18,
    hp: s.hp + up.armor,
    lives: s.hp + up.armor,
    speed: s.speed + up.engine * 26,
    fireRate: Math.max(0.055, s.fire - up.firepower * 0.01),
    bombs: s.bomb + up.payload,
    inv: 2,
    weapon: "pulse",
    level: Math.min(5, 1 + up.firepower),
    shield: state.repairBoost + state.techUpgrades.shield,
    orbit: 0,
    sprite: s.id,
    damageBonus: up.firepower * 0.18 + state.techUpgrades.crit * 0.05,
    crit: 0.08 + state.techUpgrades.crit * 0.05,
    magnet: (s.id === "falcon" ? 120 : 75) + up.engine * 18,
    graze: s.id === "phantom"
  };
  state.repairBoost = 0;
  toast(`${state.stageType} 第 ${state.stage} 关`);
}

function toast(text) {
  ui.toast.textContent = text;
  ui.toast.hidden = false;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => ui.toast.hidden = true, 1100);
}

function addParticle(x, y, color, count = 12, speed = 160) {
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const v = speed * (0.3 + Math.random());
    state.particles.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 0.35 + Math.random() * 0.35, max: 0.7, color, r: 1.5 + Math.random() * 3 });
  }
}

function createExplosion(x, y, color = "#f97316", big = false) {
  const radius = big ? 110 : 48;
  state.explosions.push({ x, y, color, life: big ? 0.72 : 0.45, max: big ? 0.72 : 0.45, radius, big });
  const fxScale = state.settings.lowFx ? 0.38 : 1;
  addParticle(x, y, "#fef3c7", Math.floor((big ? 34 : 16) * fxScale), big ? 420 : 260);
  addParticle(x, y, color, Math.floor((big ? 70 : 28) * fxScale), big ? 360 : 220);
  explosionSound(big);
}

function spawnEnemy() {
  const w = state.stage;
  const types = [
    { kind: "drone", hp: 18 + w * 3, r: 17, speed: 95, score: 80, color: "#fb7185" },
    { kind: "zig", hp: 25 + w * 4, r: 19, speed: 120, score: 120, color: "#f97316" },
    { kind: "tank", hp: 85 + w * 14, r: 28, speed: 58, score: 280, color: "#a3e635" },
    { kind: "caster", hp: 46 + w * 7, r: 22, speed: 72, score: 190, color: "#38bdf8" },
    { kind: "mine", hp: 30 + w * 5, r: 20, speed: 80, score: 140, color: "#f472b6" }
  ];
  const bossAlive = state.enemies.some(e => e.kind === "boss");
  const needKills = state.stageType === "护送" ? 6 + state.stage * 2 : 8 + state.stage * 3;
  const objectiveReady =
    state.stageType === "收集" ? state.collected >= 18 :
    state.stageType === "生存" ? state.time >= 42 :
    state.stageType === "限时Boss" ? state.time >= 3 :
    state.stageType === "无尽" ? state.stageKills >= 12 + state.stage * 2 :
    state.stageType === "挑战" ? state.stageKills >= 10 + state.stage * 2 :
    state.stageKills >= needKills;
  const bossReady = objectiveReady && !state.bossSpawned;
  if (state.bossSpawned && bossAlive) return;
  const diff = difficulties[state.difficulty];
  const base = bossReady
    ? { kind: "boss", hp: 620 + w * 230, r: 58, speed: 35, score: 1800 + w * 300, color: "#e879f9" }
    : types[Math.floor(Math.random() * Math.min(types.length, 2 + Math.floor(w / 2)))];
  if (bossReady) state.bossSpawned = true;
  const elite = !bossReady && Math.random() < 0.16 + state.stage * 0.01;
  const affix = elite ? ["护盾", "分裂", "冲锋", "再生"][Math.floor(Math.random() * 4)] : "";
  const hp = Math.floor(base.hp * diff.enemy * (elite ? 1.75 : 1));
  state.enemies.push({ ...base, hp, maxHp: hp, elite, affix, x: 55 + Math.random() * (W - 110), y: -70, t: 0, shot: 0.8 + Math.random(), phase: Math.random() * 9, bossPhase: 1 });
  state.codex.enemies[base.kind] = true;
  if (bossReady) {
    state.bossWarning = 1.8;
    toast(`警报：第 ${state.stage} 关 Boss`);
  }
}

function shoot() {
  const p = state.player;
  const lvl = p.level;
  const add = (x, y, vx, vy, dmg, type, color, r = 5) => {
    const crit = Math.random() < p.crit;
    state.bullets.push({ x, y, vx, vy, dmg: dmg * (1 + p.damageBonus) * (crit ? 1.8 : 1), type, color, r, life: 2.4, pierce: type === "laser" ? 8 : 1, crit });
  };
  tone(p.weapon === "rocket" ? 130 : 520, 0.035, "square", 0.22, 0.78);
  if (p.weapon === "spread") {
    for (let i = -lvl; i <= lvl; i++) add(p.x, p.y - 23, i * 95, -650, 10, "shot", "#7dd3fc", 4);
  } else if (p.weapon === "laser") {
    for (let i = -1; i <= 1; i++) add(p.x + i * 10, p.y - 28, i * 10, -900, 7, "laser", "#f0abfc", 3);
  } else if (p.weapon === "rocket") {
    for (let i = 0; i < Math.min(3, lvl); i++) add(p.x + (i - 1) * 15, p.y - 20, (i - 1) * 30, -430, 42, "rocket", "#fbbf24", 7);
  } else if (p.weapon === "thunder") {
    add(p.x, p.y - 26, 0, -720, 20 + lvl * 5, "thunder", "#67e8f9", 6);
    add(p.x - 16, p.y - 12, -45, -620, 10, "shot", "#bae6fd", 4);
    add(p.x + 16, p.y - 12, 45, -620, 10, "shot", "#bae6fd", 4);
  } else {
    add(p.x - 9, p.y - 24, 0, -700, 15 + lvl * 3, "shot", "#93c5fd", 5);
    add(p.x + 9, p.y - 24, 0, -700, 15 + lvl * 3, "shot", "#93c5fd", 5);
  }
  if (state.weaponEvolve === "双重雷链") add(p.x, p.y - 36, 0, -820, 18 + lvl * 4, "thunder", "#67e8f9", 6);
  if (state.weaponEvolve === "巡航导弹") {
    add(p.x - 22, p.y - 4, -80, -470, 30, "rocket", "#fbbf24", 6);
    add(p.x + 22, p.y - 4, 80, -470, 30, "rocket", "#fbbf24", 6);
  }
  if (state.weaponEvolve === "激光棱镜") {
    add(p.x - 26, p.y - 30, -20, -820, 10, "laser", "#f0abfc", 3);
    add(p.x + 26, p.y - 30, 20, -820, 10, "laser", "#f0abfc", 3);
  }
  if (state.battlePerks.includes("sideMissile")) add(p.x, p.y, Math.sin(state.time * 6) * 120, -500, 28, "rocket", "#fbbf24", 6);
  if (p.weapon === "orbit" || p.orbit > 0) {
    add(p.x - 30, p.y - 5, -45, -620, 12, "shot", "#34d399", 4);
    add(p.x + 30, p.y - 5, 45, -620, 12, "shot", "#34d399", 4);
  }
}

function useActiveSkill() {
  if (state.activeSkill < 1 || state.mode !== "play") return;
  state.activeSkill = 0;
  state.player.orbit = Math.max(state.player.orbit, 10);
  state.player.shield = Math.min(3, state.player.shield + 1);
  tone(620, 0.18, "sine", 0.32, 1.8);
  toast("主动技能：雷盾僚机");
}

function useUltimate() {
  if (state.ultimate < 1 || state.mode !== "play") return;
  state.ultimate = 0;
  state.flash = 0.45;
  state.shake = 18;
  state.enemyBullets = [];
  state.enemies.forEach(e => {
    e.hp -= e.kind === "boss" ? 420 : 999;
    createExplosion(e.x, e.y, e.color, e.kind === "boss");
  });
  toast("终极技能：雷暴黑洞");
}

function enemyShoot(e) {
  const p = state.player;
  const dx = p.x - e.x;
  const dy = p.y - e.y;
  const a = Math.atan2(dy, dx);
  const count = e.kind === "boss" ? 6 + e.bossPhase * 4 : e.kind === "caster" ? 5 : e.elite ? 3 : 1;
  for (let i = 0; i < count; i++) {
    const spread = (i - (count - 1) / 2) * 0.18;
    const speed = (e.kind === "boss" ? 180 + e.bossPhase * 35 : 210) * difficulties[state.difficulty].enemy;
    state.enemyBullets.push({ x: e.x, y: e.y + e.r * 0.6, vx: Math.cos(a + spread) * speed, vy: Math.sin(a + spread) * speed, r: e.kind === "boss" ? 6 : 5, color: e.color });
  }
  tone(180, 0.05, "sawtooth", 0.12, 0.7);
}

function drop(x, y) {
  const coins = 1 + Math.floor(Math.random() * (state.enemies.some(e => e.kind === "boss") ? 4 : 3));
  for (let i = 0; i < coins; i++) {
    state.powerups.push({
      x: x + (Math.random() - 0.5) * 42,
      y: y + (Math.random() - 0.5) * 28,
      type: "coin",
      value: 1 + Math.floor(state.stage / 2),
      r: 12,
      vy: 75 + Math.random() * 45,
      t: Math.random() * 6
    });
  }
  const roll = Math.random();
  if (roll > 0.68) {
    const types = ["spread", "laser", "rocket", "orbit", "thunder", "shield", "bomb", "heal"];
    state.powerups.push({ x, y, type: types[Math.floor(Math.random() * types.length)], r: 13, vy: 95, t: 0 });
  }
}

function bomb() {
  const p = state.player;
  if (p.bombs <= 0) return;
  p.bombs--;
  state.flash = 0.35;
  state.shake = 14;
  state.enemyBullets = [];
  state.enemies.forEach(e => e.hp -= 240);
  createExplosion(p.x, p.y, "#fef3c7", true);
  toast("雷暴清屏");
}

function hitPlayer() {
  const p = state.player;
  if (p.inv > 0 || p.shield > 0) {
    p.shield = Math.max(0, p.shield - 1);
    p.inv = 0.7;
    tone(760, 0.08, "triangle", 0.22, 1.6);
    return;
  }
  p.lives--;
  state.stageHits++;
  p.inv = 1.6;
  state.combo = 1;
  state.shake = 10;
  explosionSound(false);
  createExplosion(p.x, p.y, "#fecaca", false);
  addParticle(p.x, p.y, "#fecaca", 28, 260);
  if (p.lives <= 0) {
    state.mode = "over";
    ui.menu.hidden = false;
    ui.menu.querySelector("h1").textContent = "任务结束";
    ui.hint.textContent = `最终分数 ${state.score}，金币 ${state.gold}。换一架机型再来一轮。`;
  }
}

function movePlayer(dt) {
  const p = state.player;
  let mx = 0;
  let my = 0;
  if (keys.has("ArrowLeft") || keys.has("a")) mx--;
  if (keys.has("ArrowRight") || keys.has("d")) mx++;
  if (keys.has("ArrowUp") || keys.has("w")) my--;
  if (keys.has("ArrowDown") || keys.has("s")) my++;
  const len = Math.hypot(mx, my) || 1;
  const slow = keys.has("shift") ? 0.45 : 1;
  p.x = clamp(p.x + (mx / len) * p.speed * slow * dt, 24, W - 24);
  p.y = clamp(p.y + (my / len) * p.speed * slow * dt, 84, H - 24);
}

function updateCornerPause() {
  if (state.mode !== "play" || !state.player || state.pauseReason === "manual") return;
  const p = state.player;
  if (state.settings.pauseCorner === "双击") return;
  const inDock = state.settings.pauseCorner === "左下"
    ? p.x <= 64 && p.y >= H - 64
    : p.x >= W - 64 && p.y >= H - 64;
  if (inDock && !state.paused) {
    state.paused = true;
    state.pauseReason = "corner";
    toast("停靠暂停");
  } else if (!inDock && state.pauseReason === "corner") {
    state.paused = false;
    state.pauseReason = "";
    toast("继续战斗");
  }
}

function update(dt) {
  if (state.mode !== "play") return;
  if (state.pauseReason === "manual") return;
  movePlayer(dt);
  updateCornerPause();
  if (state.paused) return;
  state.time += dt;
  state.spawn -= dt;
  state.fire -= dt;
  state.bgY = (state.bgY + dt * 80) % H;
  state.flash = Math.max(0, state.flash - dt);
  state.bossWarning = Math.max(0, state.bossWarning - dt);
  state.shake = state.settings.shake ? Math.max(0, state.shake - dt * 40) : 0;
  const p = state.player;
  p.inv = Math.max(0, p.inv - dt);
  p.orbit = Math.max(0, p.orbit - dt);

  if ((state.settings.autoFire || state.manualFire) && state.fire <= 0) {
    shoot();
    state.fire = p.fireRate;
  }
  if (state.spawn <= 0) {
    spawnEnemy();
    state.spawn = Math.max(0.25, 0.9 - state.stage * 0.045) * (state.enemies.some(e => e.kind === "boss") ? 1.7 : 1);
  }

  state.bullets.forEach(b => {
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    b.life -= dt;
    if (b.type === "rocket") {
      const target = state.enemies.reduce((best, e) => !best || dist(b, e) < dist(b, best) ? e : best, null);
      if (target) {
        const a = Math.atan2(target.y - b.y, target.x - b.x);
        b.vx += Math.cos(a) * 480 * dt;
        b.vy += Math.sin(a) * 480 * dt;
      }
    }
  });

  state.enemyBullets.forEach(b => {
    b.x += b.vx * dt;
    b.y += b.vy * dt;
  });

  state.enemies.forEach(e => {
    e.t += dt;
    e.y += e.speed * dt;
    if (e.kind === "zig") e.x += Math.sin(e.t * 5 + e.phase) * 140 * dt;
    if (e.elite && e.affix === "冲锋") e.y += 80 * dt;
    if (e.elite && e.affix === "再生" && e.t % 1 < dt) e.hp = Math.min(e.maxHp, e.hp + 4 + state.stage);
    if (e.kind === "mine") e.r += Math.sin(e.t * 8) * 0.08;
    if (e.kind === "boss") {
      e.y = Math.min(112, e.y);
      e.x += Math.sin(e.t * 1.2) * 70 * dt;
      if (state.stageType === "限时Boss" && state.time > 55) {
        e.speed = 80;
        e.color = "#ef4444";
      }
      const ratio = e.hp / e.maxHp;
      const nextPhase = ratio < 0.34 ? 3 : ratio < 0.67 ? 2 : 1;
      if (nextPhase !== e.bossPhase) {
        e.bossPhase = nextPhase;
        state.shake = 12;
        toast(`Boss 第 ${nextPhase} 形态`);
      }
    }
    e.shot -= dt;
    if (e.shot <= 0) {
      enemyShoot(e);
      e.shot = e.kind === "boss" ? 0.52 : 1.25 + Math.random() * 0.7;
    }
  });

  state.powerups.forEach(o => {
    o.t += dt;
    const d = dist(o, p);
    const magnet = o.type === "coin" ? 900 : p.magnet;
    if (d < magnet) {
      const pull = o.type === "coin" ? 7.5 : 5;
      o.x += (p.x - o.x) * dt * pull;
      o.y += (p.y - o.y) * dt * pull;
    } else {
      o.y += o.vy * dt;
    }
  });

  collide();
  state.particles.forEach(pt => {
    pt.x += pt.vx * dt;
    pt.y += pt.vy * dt;
    pt.life -= dt;
  });
  state.explosions.forEach(ex => {
    ex.life -= dt;
  });
  state.floaters.forEach(f => {
    f.y -= 38 * dt;
    f.life -= dt;
  });
  cleanup();
}

function collide() {
  const p = state.player;
  for (const b of state.bullets) {
    for (const e of state.enemies) {
      if (e.hp > 0 && b.life > 0 && dist(b, e) < b.r + e.r) {
        const dmg = b.dmg * elementMod(b.type, e.kind) * (e.elite && e.affix === "护盾" ? 0.55 : 1);
        e.hp -= dmg;
        b.pierce--;
        if (b.pierce <= 0) b.life = -1;
        addParticle(b.x, b.y, b.color, b.type === "rocket" ? 14 : 4, 90);
        state.floaters.push({ x: b.x, y: b.y, text: `${b.crit ? "暴 " : ""}${Math.round(dmg)}`, life: 0.45, color: b.crit ? "#facc15" : b.color });
        state.codex.weapons[b.type] = true;
        if (b.type === "thunder") chain(e, b.dmg * 0.45);
        if (e.hp <= 0) killEnemy(e);
      }
    }
  }
  for (const b of state.enemyBullets) {
    if (dist(b, p) < b.r + p.r * 0.72) {
      b.dead = true;
      hitPlayer();
    } else if (p.graze && dist(b, p) < b.r + p.r + 12 && !b.graze) {
      b.graze = true;
      state.score += 8;
      addTask("graze", 1);
      state.activeSkill = Math.min(1, state.activeSkill + 0.03);
      state.ultimate = Math.min(1, state.ultimate + 0.018);
      state.combo = Math.min(9, state.combo + 0.08);
    }
  }
  for (const e of state.enemies) {
    if (e.hp > 0 && dist(e, p) < e.r + p.r) {
      e.hp = 0;
      killEnemy(e);
      hitPlayer();
    }
  }
  for (const o of state.powerups) {
    if (dist(o, p) < o.r + p.r) {
      o.dead = true;
      collect(o);
    }
  }
}

function elementMod(type, kind) {
  if (type === "thunder" && ["caster", "mine", "boss"].includes(kind)) return 1.25;
  if (type === "rocket" && ["tank", "boss"].includes(kind)) return 1.25;
  if (type === "laser" && ["zig", "drone"].includes(kind)) return 1.2;
  return 1;
}

function chain(source, dmg) {
  let hits = 0;
  for (const e of state.enemies) {
    if (e !== source && e.hp > 0 && dist(e, source) < 130 && hits < 3) {
      e.hp -= dmg;
      hits++;
      state.particles.push({ x: (e.x + source.x) / 2, y: (e.y + source.y) / 2, vx: 0, vy: 0, life: 0.12, max: 0.12, color: "#67e8f9", r: 16 });
      if (e.hp <= 0) killEnemy(e);
    }
  }
}

function killEnemy(e) {
  e.dead = true;
  const gain = Math.floor(e.score * state.combo);
  state.score += gain;
  if (e.kind !== "boss") {
    state.stageKills++;
    addTask("kill", 1);
    if (state.stageKills === 6 && !state.perkOffered) {
      state.perkOffered = true;
      const perks = ["sideMissile", "rapid", "vampire"];
      const pick = perks[Math.floor(Math.random() * perks.length)];
      state.battlePerks.push(pick);
      if (pick === "rapid") state.player.fireRate = Math.max(0.045, state.player.fireRate * 0.82);
      if (pick === "vampire") state.player.lives = Math.min(state.player.hp, state.player.lives + 1);
      toast(`战斗强化：${pick === "sideMissile" ? "副武器导弹" : pick === "rapid" ? "射速提升" : "战场修复"}`);
    }
  }
  const charge = state.selected.id === "tempest" ? 1.35 : 1;
  state.activeSkill = Math.min(1, state.activeSkill + (e.kind === "boss" ? 0.45 : 0.08) * charge);
  state.ultimate = Math.min(1, state.ultimate + (e.kind === "boss" ? 0.5 : 0.04) * charge);
  state.combo = Math.min(9, state.combo + 0.18);
  state.floaters.push({ x: e.x, y: e.y, text: `+${gain}`, life: 0.75, color: e.color });
  createExplosion(e.x, e.y, e.color, e.kind === "boss");
  if (e.elite && e.affix === "分裂") {
    for (let i = -1; i <= 1; i += 2) {
      state.enemies.push({ kind: "drone", hp: 18 + state.stage * 2, maxHp: 18 + state.stage * 2, r: 15, speed: 120, score: 60, color: "#fb7185", x: e.x + i * 22, y: e.y, t: 0, shot: 0.8, phase: 0 });
    }
  }
  drop(e.x, e.y);
  if (e.kind === "boss") {
    stageVictory();
  }
}

function addTask(id, amount) {
  const task = state.tasks.find(item => item.id === id);
  if (!task || task.done >= task.target) return;
  task.done = Math.min(task.target, task.done + amount);
  if (task.done >= task.target) {
    if (task.tech) state.tech += task.reward;
    else state.gold += task.reward;
    toast(`任务完成：${task.text}`);
  }
}

function updateAchievements() {
  if (state.stageHits === 0) state.achievements.noHit = true;
  if (state.combo >= 5) state.achievements.combo = true;
  if (state.stage >= 5) state.achievements.stage5 = true;
}

function stageVictory() {
  updateAchievements();
  const clearTime = Math.max(1, Math.floor(state.time));
  const rating = state.stageHits === 0 && clearTime < 55 ? "S" : state.stageHits <= 1 ? "A" : state.stageHits <= 3 ? "B" : "C";
  state.lastResult = {
    stage: state.stage,
    type: state.stageType,
    kills: state.stageKills,
    coins: state.collected,
    hits: state.stageHits,
    time: clearTime,
    rating
  };
  state.mode = "prep";
  state.paused = false;
  state.pauseReason = "";
  state.enemyBullets = [];
  state.enemies = [];
  state.bullets = [];
  state.powerups = [];
  state.stage++;
  state.player.bombs++;
  const reward = Math.floor((10 + state.stage * 3) * difficulties[state.difficulty].reward);
  state.gold += reward;
  state.tech += rating === "S" ? 2 : rating === "A" ? 1 : 0;
  state.rewardChoices = [
    { id: "gold", text: `金币 +${12 + state.stage * 2}` },
    { id: "tech", text: "科技点 +1" },
    { id: "equip", text: "开启装备箱" }
  ];
  state.equipment.push(randomEquipment());
  state.floaters.push({ x: W / 2, y: H / 2, text: "关卡胜利", life: 1.4, color: "#facc15" });
  refreshShop();
  saveGame();
  toast("关卡胜利，进入整备");
  setTimeout(showPrep, 700);
}

function upgradeCost(id) {
  const def = upgradeDefs.find(item => item.id === id);
  const level = state.upgrades[id] || 0;
  return def.base + level * level * 6 + level * 8;
}

function renderPrep() {
  const s = state.selected;
  const repairCost = 8 + state.stage * 2;
  ui.prepStage.textContent = state.stage;
  ui.prepGold.textContent = state.gold;
  ui.prepShip.textContent = s.name;
  ui.upgrades.innerHTML = upgradeDefs.map(def => {
    const level = state.upgrades[def.id] || 0;
    const cost = upgradeCost(def.id);
    const disabled = state.gold < cost ? "disabled" : "";
    return `
      <div class="upgrade-card">
        <strong>${def.name} Lv.${level}</strong>
        <span>${def.desc}</span>
        <p>升级花费 ${cost} 金币</p>
        <button data-upgrade="${def.id}" ${disabled}>升级</button>
      </div>
    `;
  }).join("");
  ui.repair.textContent = `快速修复 ${repairCost}金`;
  ui.repair.disabled = state.gold < repairCost;
  ui.prepHint.textContent = `第 ${state.stage - 1} 关胜利。整备完成后进入第 ${state.stage} 关。开局护盾 +${state.repairBoost}`;
  renderMetaPanels();
  updateHud();
}

function renderMetaPanels() {
  const result = state.lastResult;
  ui.resultPanel.innerHTML = result ? `
    <div class="meta-title">通关结算 <span>${result.rating} 评级</span></div>
    <div class="meta-grid">
      <div class="meta-row"><span>类型</span><strong>${result.type}</strong></div>
      <div class="meta-row"><span>击杀</span><strong>${result.kills}</strong></div>
      <div class="meta-row"><span>金币</span><strong>${result.coins}</strong></div>
      <div class="meta-row"><span>受击</span><strong>${result.hits}</strong></div>
    </div>
  ` : "";
  ui.routePanel.innerHTML = `
    <div class="meta-title">主线地图 <span>${state.modeType}/${difficulties[state.difficulty].name}</span></div>
    <div class="route">${Array.from({ length: 10 }, (_, i) => {
      const stage = state.stage + i;
      return `<span class="${i === 0 ? "current" : ""}">${stagePlan[(stage - 1) % stagePlan.length]}</span>`;
    }).join("")}</div>
  `;
  ui.rewardPanel.innerHTML = state.rewardChoices.length ? `
    <div class="meta-title">关卡奖励三选一 <span>宝箱已入库</span></div>
    <div class="choice-row">${state.rewardChoices.map(choice => `<button data-reward="${choice.id}">${choice.text}</button>`).join("")}</div>
  ` : `
    <div class="meta-title">武器进化树 <span>${state.weaponEvolve || "未进化"}</span></div>
    <div class="choice-row">
      <button data-evolve="双重雷链">双重雷链 35金</button>
      <button data-evolve="巡航导弹">巡航导弹 35金</button>
      <button data-evolve="激光棱镜">激光棱镜 35金</button>
    </div>
  `;
  ui.shopPanel.innerHTML = `
    <div class="meta-title">商店 <button class="secondary" data-shop="refresh">刷新 5金</button></div>
    <div class="meta-grid">${state.shop.map((item, i) => `
      <div class="meta-row"><span>${item.name}</span><button data-buy="${i}">${item.cost}金</button></div>
    `).join("")}</div>
  `;
  ui.techPanel.innerHTML = `
    <div class="meta-title">永久科技树 <span>科技点 ${state.tech}</span></div>
    <div class="meta-grid">${techDefs.map(def => `
      <div class="meta-row"><span>${def.name} Lv.${state.techUpgrades[def.id]}<br>${def.desc}</span><button data-tech="${def.id}">1点</button></div>
    `).join("")}</div>
  `;
  ui.taskPanel.innerHTML = `
    <div class="meta-title">任务 / 成就 <span>${Object.keys(state.achievements).length} 成就</span></div>
    <div class="meta-grid">${state.tasks.map(task => `
      <div class="meta-row"><span>${task.text}</span><strong>${task.done}/${task.target}</strong></div>
    `).join("")}
      <div class="meta-row"><span>无伤通关</span><strong>${state.achievements.noHit ? "完成" : "未完成"}</strong></div>
      <div class="meta-row"><span>5倍连击</span><strong>${state.achievements.combo ? "完成" : "未完成"}</strong></div>
    </div>
  `;
  ui.codexPanel.innerHTML = `
    <div class="meta-title">图鉴 / 装备 <span>${state.equipment.length} 件装备</span></div>
    <div class="meta-grid">
      <div class="meta-row"><span>敌人</span><strong>${Object.keys(state.codex.enemies).length}/6</strong></div>
      <div class="meta-row"><span>武器</span><strong>${Object.keys(state.codex.weapons).length}/6</strong></div>
      ${state.equipment.slice(-4).map(item => `<div class="meta-row"><span style="color:${item.color}">${item.quality} ${item.slot}</span><strong>x${item.bonus}</strong></div>`).join("")}
    </div>
  `;
  ui.settingsPanel.innerHTML = `
    <div class="meta-title">设置 / 难度 <span>音量与手感</span></div>
    <div class="meta-grid">
      <div class="meta-row"><span>难度</span><button data-difficulty="cycle">${difficulties[state.difficulty].name}</button></div>
      <div class="meta-row"><span>自动射击</span><button data-setting="autoFire">${state.settings.autoFire ? "开" : "关"}</button></div>
      <div class="meta-row"><span>特效等级</span><button data-setting="lowFx">${state.settings.lowFx ? "低" : "高"}</button></div>
      <div class="meta-row"><span>屏幕震动</span><button data-setting="shake">${state.settings.shake ? "开" : "关"}</button></div>
      <div class="meta-row"><span>暂停区</span><button data-setting="pauseCorner">${state.settings.pauseCorner}</button></div>
      <div class="meta-row"><span>音乐</span><button data-volume="music">${Math.round(state.settings.music * 100)}%</button></div>
      <div class="meta-row"><span>音效</span><button data-volume="sfx">${Math.round(state.settings.sfx * 100)}%</button></div>
    </div>
  `;
}

function showPrep() {
  if (state.mode !== "prep") return;
  ui.menu.hidden = true;
  ui.prep.hidden = false;
  renderPrep();
}

function buyUpgrade(id) {
  const cost = upgradeCost(id);
  if (state.gold < cost) {
    toast("金币不足");
    return;
  }
  state.gold -= cost;
  state.upgrades[id]++;
  tone(980, 0.12, "triangle", 0.3, 1.35);
  renderPrep();
  toast("升级完成");
  saveGame();
}

function chooseReward(id) {
  if (!state.rewardChoices.length) return;
  if (id === "gold") state.gold += 12 + state.stage * 2;
  if (id === "tech") state.tech += 1;
  if (id === "equip") state.equipment.push(randomEquipment());
  state.rewardChoices = [];
  renderPrep();
  saveGame();
  toast("奖励已领取");
}

function buyShop(index) {
  const item = state.shop[index];
  if (!item || state.gold < item.cost) {
    toast("金币不足");
    return;
  }
  state.gold -= item.cost;
  if (item.type === "weapon" && state.player) state.player.level = Math.min(5, state.player.level + 1);
  if (item.type === "equipment") state.equipment.push(item.item || randomEquipment());
  if (item.type === "ship") {
    if (!state.unlockedShips.includes("tempest")) state.unlockedShips.push("tempest");
    state.achievements.prototype = true;
    renderShips();
  }
  renderPrep();
  saveGame();
  toast("购买完成");
}

function buyTech(id) {
  if (state.tech < 1) {
    toast("科技点不足");
    return;
  }
  state.tech--;
  state.techUpgrades[id]++;
  renderPrep();
  saveGame();
  toast("科技升级");
}

function cycleDifficulty() {
  const ids = Object.keys(difficulties);
  state.difficulty = ids[(ids.indexOf(state.difficulty) + 1) % ids.length];
}

function toggleSetting(id) {
  if (id === "pauseCorner") {
    state.settings.pauseCorner = state.settings.pauseCorner === "右下" ? "左下" : state.settings.pauseCorner === "左下" ? "双击" : "右下";
  } else {
    state.settings[id] = !state.settings[id];
  }
}

function cycleVolume(id) {
  state.settings[id] = state.settings[id] <= 0.25 ? 1 : Math.max(0, state.settings[id] - 0.25);
  if (state.audio) state.audio.gain.gain.value = 0.055 * state.settings.music;
}

function collect(pickup) {
  const p = state.player;
  const type = pickup.type;
  if (type === "coin") {
    const value = (pickup.value || 1) + state.techUpgrades.coin;
    state.gold += value;
    state.score += 18;
    state.collected++;
    addTask("coin", 1);
    tone(1180, 0.07, "triangle", 0.18, 1.55);
    return;
  }
  tone(880, 0.1, "triangle", 0.28, 1.4);
  if (weaponNames[type]) {
    p.weapon = type;
    p.level = Math.min(5, p.level + 1);
    if (type === "orbit") p.orbit = 15;
    toast(`${weaponNames[type]} Lv.${p.level}`);
  } else if (type === "shield") {
    p.shield = Math.min(3, p.shield + 1);
    toast("护盾 +1");
  } else if (type === "bomb") {
    p.bombs++;
    toast("炸弹 +1");
  } else if (type === "heal") {
    p.lives = Math.min(p.hp, p.lives + 1);
    toast("修复 +1");
  }
}

function cleanup() {
  state.bullets = state.bullets.filter(b => b.life > 0 && b.y > -80 && b.y < H + 80 && b.x > -80 && b.x < W + 80);
  state.enemyBullets = state.enemyBullets.filter(b => !b.dead && b.y < H + 50 && b.x > -60 && b.x < W + 60);
  state.enemies = state.enemies.filter(e => !e.dead && e.y < H + 100);
  state.powerups = state.powerups.filter(o => !o.dead && o.y < H + 40);
  state.particles = state.particles.filter(p => p.life > 0);
  state.explosions = state.explosions.filter(ex => ex.life > 0);
  state.floaters = state.floaters.filter(f => f.life > 0);
}

function draw() {
  ctx.save();
  ctx.clearRect(0, 0, W, H);
  if (state.shake > 0) ctx.translate((Math.random() - 0.5) * state.shake, (Math.random() - 0.5) * state.shake);
  drawBackground();
  drawPowerups();
  drawBullets();
  drawEnemies();
  drawPlayer();
  drawExplosions();
  drawParticles();
  drawDockZone();
  drawBattleStatus();
  if (state.flash > 0) {
    ctx.fillStyle = `rgba(255,255,255,${state.flash * 1.8})`;
    ctx.fillRect(0, 0, W, H);
  }
  if (state.paused) {
    ctx.fillStyle = "rgba(0,0,0,.45)";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#fff";
    ctx.font = "800 42px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(state.pauseReason === "corner" ? "停靠暂停" : "暂停", W / 2, H / 2);
    if (state.pauseReason === "corner") {
      ctx.font = "700 17px system-ui";
      ctx.fillText("移出右下角继续", W / 2, H / 2 + 36);
    }
  }
  ctx.restore();
  updateHud();
  requestAnimationFrame(loop);
}

function drawBattleStatus() {
  if (state.mode !== "play") return;
  ctx.save();
  ctx.fillStyle = "rgba(3,8,17,.58)";
  rounded(12, 74, 210, 36, 7);
  ctx.fill();
  ctx.fillStyle = "#c5d0df";
  ctx.font = "800 11px system-ui";
  ctx.textAlign = "left";
  ctx.fillText(`${state.stageType}  击杀${state.stageKills} 金币${state.collected}`, 22, 96);
  ctx.fillStyle = "#67e8f9";
  ctx.fillRect(22, 102, 80 * state.activeSkill, 4);
  ctx.fillStyle = "#facc15";
  ctx.fillRect(108, 102, 80 * state.ultimate, 4);
  if (state.stageType === "护送") {
    ctx.fillStyle = "rgba(34,197,94,.22)";
    rounded(W / 2 - 28, H - 150, 56, 56, 8);
    ctx.fill();
    ctx.fillStyle = "#86efac";
    ctx.font = "900 12px system-ui";
    ctx.textAlign = "center";
    ctx.fillText("护送", W / 2, H - 118);
  }
  if (state.bossWarning > 0) {
    ctx.fillStyle = `rgba(239,68,68,${0.35 + Math.sin(state.time * 20) * 0.15})`;
    ctx.fillRect(0, H / 2 - 34, W, 68);
    ctx.fillStyle = "#fff";
    ctx.font = "900 28px system-ui";
    ctx.textAlign = "center";
    ctx.fillText("WARNING", W / 2, H / 2 + 8);
  }
  ctx.restore();
}

function drawDockZone() {
  if (state.mode !== "play" || state.settings.pauseCorner === "双击") return;
  const active = state.pauseReason === "corner";
  const left = state.settings.pauseCorner === "左下";
  ctx.save();
  ctx.strokeStyle = active ? "rgba(250,204,21,.95)" : "rgba(250,204,21,.42)";
  ctx.fillStyle = active ? "rgba(250,204,21,.16)" : "rgba(250,204,21,.06)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(left ? 78 : W - 78, H - 8);
  ctx.lineTo(left ? 8 : W - 8, H - 8);
  ctx.lineTo(left ? 8 : W - 8, H - 78);
  ctx.stroke();
  ctx.fillRect(left ? 8 : W - 66, H - 66, 58, 58);
  ctx.fillStyle = "rgba(255,255,255,.8)";
  ctx.font = "800 11px system-ui";
  ctx.textAlign = left ? "left" : "right";
  ctx.fillText("暂停区", left ? 12 : W - 12, H - 42);
  ctx.restore();
}

function drawBackground() {
  if (bg.complete && bg.naturalWidth) {
    const y = state.bgY % H;
    ctx.drawImage(bg, 0, y - H, W, H);
    ctx.drawImage(bg, 0, y, W, H);
    ctx.drawImage(bg, 0, y + H, W, H);
  } else {
    const grd = ctx.createLinearGradient(0, 0, 0, H);
    grd.addColorStop(0, "#09111d");
    grd.addColorStop(1, "#08090d");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);
  }
  ctx.fillStyle = "rgba(1,4,9,.18)";
  ctx.fillRect(0, 0, W, H);
}

function drawSprite(name, x, y, w, h, rot = 0, alpha = 1) {
  if (!atlas.complete || !atlas.naturalWidth || !sprites[name]) return false;
  const [col, row] = sprites[name];
  const sw = atlas.naturalWidth / 5;
  const sh = atlas.naturalHeight / 4;
  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.drawImage(atlas, col * sw, row * sh, sw, sh, -w / 2, -h / 2, w, h);
  ctx.restore();
  return true;
}

function drawPlayer() {
  const p = state.player;
  if (!p || (p.inv > 0 && Math.floor(state.time * 18) % 2 === 0)) return;
  ctx.save();
  ctx.shadowColor = state.selected.color;
  ctx.shadowBlur = 18;
  if (p.weapon === "orbit" || p.orbit > 0) {
    drawSprite("wingBlue", p.x - 42, p.y + Math.sin(state.time * 7) * 5, 48, 34);
    drawSprite("wingGold", p.x + 42, p.y + Math.cos(state.time * 7) * 5, 48, 34);
  }
  drawSprite(p.sprite, p.x, p.y, p.sprite === "vanguard" ? 78 : 70, p.sprite === "vanguard" ? 66 : 62);
  if (p.shield > 0) {
    drawSprite("shield", p.x, p.y, 84, 84, state.time * 0.7, 0.5);
    ctx.strokeStyle = `rgba(125,211,252,${0.45 + Math.sin(state.time * 8) * 0.15})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 39, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawEnemies() {
  for (const e of state.enemies) {
    ctx.save();
    ctx.shadowColor = e.color;
    ctx.shadowBlur = 18;
    if (e.kind === "boss") {
      drawSprite("boss", e.x, e.y, 142, 118, Math.sin(e.t) * 0.04);
      drawSprite("core", e.x, e.y + 4, 46, 46, e.t * 0.9, 0.85);
    } else {
      const size = e.kind === "tank" ? 70 : e.kind === "caster" ? 56 : e.kind === "mine" ? 54 : 50;
      drawSprite(e.kind, e.x, e.y, size, size, e.kind === "mine" ? state.time * 2 : Math.sin(e.t * 2) * 0.08);
    }
    ctx.restore();
    if (e.kind === "boss") {
      ctx.fillStyle = "rgba(255,255,255,.22)";
      ctx.fillRect(70, 78, W - 140, 8);
      ctx.fillStyle = e.color;
      ctx.fillRect(70, 78, (W - 140) * Math.max(0, e.hp / e.maxHp), 8);
    }
  }
}

function drawBullets() {
  for (const b of state.bullets) {
    ctx.shadowColor = b.color;
    ctx.shadowBlur = b.type === "laser" ? 18 : 12;
    if (b.type === "rocket") {
      drawSprite("rocketSprite", b.x, b.y, 22, 54, Math.atan2(b.vy, b.vx) + Math.PI / 2);
    } else if (b.type === "thunder") {
      drawSprite("thunderSprite", b.x, b.y, 34, 66, Math.sin(state.time * 10) * 0.08);
    } else {
      drawSprite("plasma", b.x, b.y, b.type === "laser" ? 16 : 13, b.type === "laser" ? 54 : 34);
    }
  }
  ctx.shadowBlur = 0;
  for (const b of state.enemyBullets) {
    ctx.shadowColor = b.color;
    ctx.shadowBlur = 10;
    drawSprite("plasma", b.x, b.y, b.r * 3, b.r * 5, Math.atan2(b.vy, b.vx) + Math.PI / 2, 0.88);
  }
  ctx.shadowBlur = 0;
}

function drawPowerups() {
  for (const o of state.powerups) {
    const label = weaponNames[o.type]?.[0] || ({ shield: "盾", bomb: "爆", heal: "修" })[o.type];
    ctx.save();
    ctx.shadowColor = o.type === "coin" ? "#facc15" : "#f0abfc";
    ctx.shadowBlur = 14;
    if (o.type === "coin") {
      drawSprite("coin", o.x, o.y, 28, 28, o.t * 2.2);
    } else if (o.type === "shield") {
      drawSprite("shield", o.x, o.y, 36, 36, o.t * 1.4);
    } else {
      drawSprite("crate", o.x, o.y, 38, 34, Math.sin(o.t * 4) * 0.08);
      ctx.fillStyle = "#111827";
      ctx.font = "900 12px system-ui";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(label, o.x, o.y + 1);
    }
    ctx.restore();
  }
}

function drawExplosions() {
  for (const ex of state.explosions) {
    const t = 1 - ex.life / ex.max;
    const alpha = Math.max(0, ex.life / ex.max);
    const r = ex.radius * (0.28 + t * 0.9);
    const core = ex.radius * (0.12 + t * 0.22);
    const grd = ctx.createRadialGradient(ex.x, ex.y, 0, ex.x, ex.y, r);
    grd.addColorStop(0, `rgba(255,255,255,${0.9 * alpha})`);
    grd.addColorStop(0.18, `rgba(254,243,199,${0.78 * alpha})`);
    grd.addColorStop(0.45, `${hexToRgba(ex.color, 0.45 * alpha)}`);
    grd.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(ex.x, ex.y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = `rgba(255,255,255,${0.7 * alpha})`;
    ctx.lineWidth = ex.big ? 5 : 3;
    ctx.beginPath();
    ctx.arc(ex.x, ex.y, core + r * 0.42, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = `${hexToRgba(ex.color, 0.65 * alpha)}`;
    ctx.lineWidth = ex.big ? 3 : 2;
    for (let i = 0; i < (ex.big ? 12 : 7); i++) {
      const a = i * Math.PI * 2 / (ex.big ? 12 : 7) + t * 2;
      ctx.beginPath();
      ctx.moveTo(ex.x + Math.cos(a) * core, ex.y + Math.sin(a) * core);
      ctx.lineTo(ex.x + Math.cos(a) * r, ex.y + Math.sin(a) * r);
      ctx.stroke();
    }
  }
}

function drawParticles() {
  for (const p of state.particles) {
    ctx.globalAlpha = Math.max(0, p.life / p.max);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  for (const f of state.floaters) {
    ctx.globalAlpha = Math.max(0, f.life / 0.75);
    ctx.fillStyle = f.color;
    ctx.font = "800 16px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(f.text, f.x, f.y);
  }
  ctx.globalAlpha = 1;
}

function rounded(x, y, w, h, r) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

function updateHud() {
  const p = state.player;
  ui.score.textContent = state.score;
  ui.gold.textContent = state.gold;
  ui.weapon.textContent = p ? `${weaponNames[p.weapon]}${p.level}` : "脉冲";
  ui.lives.textContent = p ? p.lives : state.selected.hp;
  ui.bombs.textContent = p ? p.bombs : state.selected.bomb;
  ui.wave.textContent = state.stage;
}

function music(dt) {
  if (!state.audio) return;
  const mode = state.mode === "prep" ? "prep" : state.mode === "play" ? "battle" : "menu";
  if (mode !== state.musicMode) {
    state.musicMode = mode;
    state.musicStep = 0;
    state.musicTime = 0;
  }
  state.musicTime -= dt;
  if (state.musicTime > 0) return;
  const battle = [110, 146.8, 164.8, 220, 196, 164.8, 246.9, 220, 146.8, 164.8, 196, 293.7];
  const prep = [98, 123.5, 146.8, 196, 174.6, 146.8, 123.5, 110];
  const notes = mode === "prep" ? prep : battle;
  const freq = notes[state.musicStep % notes.length];
  tone(freq, mode === "prep" ? 0.18 : 0.09, mode === "prep" ? "sine" : "triangle", mode === "prep" ? 0.065 : 0.08, 1);
  if (mode === "battle" && state.musicStep % 4 === 0) tone(freq / 2, 0.12, "sawtooth", 0.035, 0.9);
  state.musicStep++;
  state.musicTime = mode === "prep" ? 0.48 : 0.28;
}

function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function hexToRgba(hex, alpha) {
  const clean = hex.replace("#", "");
  const value = parseInt(clean.length === 3 ? clean.split("").map(ch => ch + ch).join("") : clean, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

let last = performance.now();
function loop(now = performance.now()) {
  const dt = Math.min(0.033, (now - last) / 1000);
  last = now;
  music(dt);
  update(dt);
  draw();
}

ui.ships.addEventListener("click", event => {
  const card = event.target.closest(".ship-card");
  if (!card) return;
  if (!state.unlockedShips.includes(card.dataset.id)) {
    toast("这架战机尚未解锁");
    return;
  }
  state.selected = ships.find(s => s.id === card.dataset.id) || ships[0];
  renderShips();
  tone(420, 0.06, "triangle", 0.15, 1.25);
});

ui.modeControls.addEventListener("click", event => {
  const button = event.target.closest("[data-mode]");
  if (!button) return;
  state.modeType = button.dataset.mode;
  renderModeControls();
  toast(`模式：${modes.find(mode => mode.id === state.modeType).name}`);
});

ui.start.addEventListener("click", () => startGame(false));
ui.how.addEventListener("click", () => {
  ui.hint.textContent = "击落敌人会掉金币，也会掉落武器箱、护盾、修复和炸弹。右下角是停靠暂停区，移出后自动继续。";
});

ui.upgrades.addEventListener("click", event => {
  const button = event.target.closest("[data-upgrade]");
  if (!button) return;
  ensureAudio();
  buyUpgrade(button.dataset.upgrade);
});

ui.prep.addEventListener("click", event => {
  const reward = event.target.closest("[data-reward]");
  const buy = event.target.closest("[data-buy]");
  const tech = event.target.closest("[data-tech]");
  const shop = event.target.closest("[data-shop]");
  const evolve = event.target.closest("[data-evolve]");
  const difficulty = event.target.closest("[data-difficulty]");
  const setting = event.target.closest("[data-setting]");
  const volume = event.target.closest("[data-volume]");
  if (reward) chooseReward(reward.dataset.reward);
  if (evolve) {
    if (state.gold >= 35) {
      state.gold -= 35;
      state.weaponEvolve = evolve.dataset.evolve;
      renderPrep();
      saveGame();
      toast("武器已进化");
    } else toast("金币不足");
  }
  if (buy) buyShop(Number(buy.dataset.buy));
  if (tech) buyTech(tech.dataset.tech);
  if (shop) {
    if (state.gold >= 5) {
      state.gold -= 5;
      refreshShop();
      renderPrep();
      toast("商店已刷新");
    } else toast("金币不足");
  }
  if (difficulty) {
    cycleDifficulty();
    renderPrep();
    saveGame();
  }
  if (setting) {
    toggleSetting(setting.dataset.setting);
    renderPrep();
    saveGame();
  }
  if (volume) {
    cycleVolume(volume.dataset.volume);
    renderPrep();
    saveGame();
  }
});

ui.nextStage.addEventListener("click", () => {
  ensureAudio();
  startStage();
});

ui.repair.addEventListener("click", () => {
  ensureAudio();
  const cost = 8 + state.stage * 2;
  if (state.gold < cost) {
    toast("金币不足");
    return;
  }
  state.gold -= cost;
  state.repairBoost = Math.min(3, state.repairBoost + 1);
  tone(720, 0.14, "sine", 0.28, 1.5);
  renderPrep();
  toast("下一关护盾 +1");
});

window.addEventListener("keydown", event => {
  const k = event.key.toLowerCase();
  keys.add(k);
  ensureAudio();
  if (k === " ") {
    event.preventDefault();
    if (state.mode === "play") bomb();
  }
  if (k === "j") state.manualFire = true;
  if (k === "e") useActiveSkill();
  if (k === "q") useUltimate();
  if (k === "p" && state.mode === "play") {
    if (state.pauseReason === "manual") {
      state.paused = false;
      state.pauseReason = "";
      updateCornerPause();
    } else {
      state.paused = true;
      state.pauseReason = "manual";
    }
    toast(state.paused ? "暂停" : "继续");
  }
});

window.addEventListener("keyup", event => {
  const k = event.key.toLowerCase();
  keys.delete(k);
  if (k === "j") state.manualFire = false;
});

let lastTouchEnd = 0;
document.addEventListener("touchend", event => {
  const now = Date.now();
  if (now - lastTouchEnd < 320) event.preventDefault();
  lastTouchEnd = now;
}, { passive: false });

document.addEventListener("touchmove", event => {
  if (event.touches.length > 1) event.preventDefault();
}, { passive: false });

document.addEventListener("gesturestart", event => event.preventDefault());
document.addEventListener("gesturechange", event => event.preventDefault());
document.addEventListener("gestureend", event => event.preventDefault());

canvas.addEventListener("pointerdown", event => {
  event.preventDefault();
  ensureAudio();
  canvas.setPointerCapture(event.pointerId);
  movePointer(event);
});

canvas.addEventListener("pointermove", event => {
  event.preventDefault();
  movePointer(event);
});

canvas.addEventListener("dblclick", event => {
  event.preventDefault();
  if (state.mode !== "play") return;
  if (state.settings.pauseCorner === "双击") {
    state.paused = !state.paused;
    state.pauseReason = state.paused ? "corner" : "";
    toast(state.paused ? "暂停" : "继续");
  } else {
    bomb();
  }
});

function movePointer(event) {
  if (state.mode !== "play" || !state.player) return;
  const rect = canvas.getBoundingClientRect();
  state.player.x = clamp((event.clientX - rect.left) / rect.width * W, 24, W - 24);
  state.player.y = clamp((event.clientY - rect.top) / rect.height * H - 36, 84, H - 24);
  updateCornerPause();
}

loadGame();
renderModeControls();
renderShips();
loop();
