const SIZE = 8;
const LEVELS = [
  { targetScore: 3000, moves: 30, orders: [{ type: 0, need: 8 }, { type: 1, need: 8 }] },
  { targetScore: 4800, moves: 28, orders: [{ type: 2, need: 10 }, { type: 5, need: 10 }] },
  { targetScore: 6800, moves: 26, orders: [{ type: 3, need: 12 }, { type: 4, need: 12 }, { type: 1, need: 8 }] },
];
const TYPES = [
  { name: "草莓糖", src: "assets/pieces/strawberry.png" },
  { name: "星星冻", src: "assets/pieces/star.png" },
  { name: "薄荷糖", src: "assets/pieces/wrapped-candy.png" },
  { name: "马卡龙", src: "assets/pieces/macaron.png" },
  { name: "布丁杯", src: "assets/pieces/pudding.png" },
  { name: "花朵饼", src: "assets/pieces/flower-cookie.png" },
];
const SPECIAL_TYPES = {
  row: { name: "糖锤", src: "assets/boosters/hammer.png" },
  col: { name: "糖锤", src: "assets/boosters/hammer.png" },
  bomb: { name: "星爆", src: "assets/boosters/spark.png" },
};

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

document.addEventListener(
  "touchmove",
  (event) => {
    event.preventDefault();
  },
  { passive: false }
);

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
let dragStart = null;
let suppressNextClick = false;
let isLandscapeLocked = false;

function isPhoneLandscape() {
  return window.matchMedia("(orientation: landscape) and (max-height: 760px)").matches;
}

function updateOrientationLock() {
  isLandscapeLocked = isPhoneLandscape();
  document.body.classList.toggle("landscape-locked", isLandscapeLocked);
  orientationLockEl?.setAttribute("aria-hidden", String(!isLandscapeLocked));
}

async function requestPortraitLock() {
  try {
    await screen.orientation?.lock?.("portrait");
  } catch {
    // Browser support varies; the landscape overlay still prevents horizontal play.
  }
}

updateOrientationLock();
window.addEventListener("resize", updateOrientationLock);
window.addEventListener("orientationchange", updateOrientationLock);

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

function tile(type = randType(), special = null) {
  return { type, special };
}

function tileVisual(piece) {
  return piece.special ? SPECIAL_TYPES[piece.special] : TYPES[piece.type];
}

function randType() {
  return Math.floor(Math.random() * TYPES.length);
}

function key(row, col) {
  return `${row}-${col}`;
}

function parseKey(id) {
  const [row, col] = id.split("-").map(Number);
  return { row, col };
}

function currentLevel() {
  return LEVELS[level % LEVELS.length];
}

function sameType(a, b) {
  return a && b && a.type === b.type;
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
  board = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));

  for (let row = 0; row < SIZE; row += 1) {
    for (let col = 0; col < SIZE; col += 1) {
      board[row][col] = randomTileFor(row, col, board);
    }
  }

  if (!findMove()) createBoard();
}

function render(options = {}) {
  const animateDrop = options.animateDrop === true;
  const staggerDrop = options.staggerDrop === true;
  const dropMap = options.dropMap || null;
  const fragment = document.createDocumentFragment();
  boardEl.innerHTML = "";

  for (let row = 0; row < SIZE; row += 1) {
    for (let col = 0; col < SIZE; col += 1) {
      const piece = board[row][col];
      const button = document.createElement("button");
      button.className = "tile";
      button.type = "button";
      button.dataset.row = row;
      button.dataset.col = col;
      if (piece.special) button.dataset.special = piece.special;
      const visual = tileVisual(piece);
      button.setAttribute("aria-label", piece.special ? `${visual.name} 奖励方块` : visual.name);

      if (selected && selected.row === row && selected.col === col) button.classList.add("selected");
      if (activeTool) button.classList.add("tool-target");
      const dropInfo = dropMap?.get(key(row, col));
      if (dropInfo || animateDrop || staggerDrop) {
        button.classList.add("falling");
        const distance = dropInfo
          ? Math.max(42, dropInfo.rows * 58)
          : staggerDrop
            ? 170 + row * 18
            : Math.max(28, (SIZE - row) * 13);
        const delay = dropInfo
          ? dropInfo.delay
          : staggerDrop
            ? row * 72 + col * 24
            : Math.min(120, row * 18 + col * 5);
        button.style.setProperty("--fall-distance", `${distance}px`);
        button.style.setProperty("--fall-delay", `${delay}ms`);
      }

      const image = document.createElement("img");
      image.src = visual.src;
      image.alt = "";
      button.append(image);
      fragment.append(button);
    }
  }

  boardEl.append(fragment);
  levelEl.textContent = `${level + 1}`;
  scoreEl.textContent = score.toString();
  movesEl.textContent = moves.toString();
  comboEl.textContent = `x${combo}`;
  targetScoreEl.textContent = currentLevel().targetScore.toString();
  progressFillEl.style.width = `${Math.min(100, Math.round((score / currentLevel().targetScore) * 100))}%`;
  hammerCountEl.textContent = boosters.hammer.toString();
  sparkCountEl.textContent = boosters.spark.toString();
  rowBlastCountEl.textContent = boosters.rowBlast.toString();
  colBlastCountEl.textContent = boosters.colBlast.toString();
  crossBlastCountEl.textContent = boosters.crossBlast.toString();
  addMovesCountEl.textContent = boosters.addMoves.toString();
  hammerBtn.classList.toggle("active", activeTool === "hammer");
  sparkBtn.classList.toggle("active", activeTool === "spark");
  rowBlastBtn.classList.toggle("active", activeTool === "rowBlast");
  colBlastBtn.classList.toggle("active", activeTool === "colBlast");
  crossBlastBtn.classList.toggle("active", activeTool === "crossBlast");
  hammerBtn.disabled = boosters.hammer <= 0 || busy || ended;
  sparkBtn.disabled = boosters.spark <= 0 || busy || ended;
  rowBlastBtn.disabled = boosters.rowBlast <= 0 || busy || ended;
  colBlastBtn.disabled = boosters.colBlast <= 0 || busy || ended;
  crossBlastBtn.disabled = boosters.crossBlast <= 0 || busy || ended;
  addMovesBtn.disabled = boosters.addMoves <= 0 || busy || ended;
  hintBtn.disabled = busy || ended;
  shuffleBtn.disabled = busy || ended || moves <= 0;
  soundBtn.setAttribute("aria-pressed", String(soundEnabled));
  soundIconEl.textContent = soundEnabled ? "声音开" : "静音";
  renderOrders();
}

function renderOrders() {
  ordersEl.innerHTML = "";
  for (const order of orders) {
    const item = document.createElement("div");
    item.className = `order${order.got >= order.need ? " done" : ""}`;

    const image = document.createElement("img");
    image.src = TYPES[order.type].src;
    image.alt = "";

    const name = document.createElement("span");
    name.textContent = TYPES[order.type].name;

    const count = document.createElement("strong");
    count.textContent = `${Math.min(order.got, order.need)}/${order.need}`;

    item.append(image, name, count);
    ordersEl.append(item);
  }
}

function updateTile(cell) {
  const tileEl = tileElement(cell);
  const piece = board[cell.row][cell.col];
  if (!tileEl || !piece) return;

  tileEl.classList.remove("selected", "hint", "clearing", "bad-swap");
  if (piece.special) tileEl.dataset.special = piece.special;
  else delete tileEl.dataset.special;
  const visual = tileVisual(piece);
  tileEl.setAttribute("aria-label", piece.special ? `${visual.name} 奖励方块` : visual.name);

  const image = tileEl.querySelector("img");
  if (image) image.src = visual.src;
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
  playSound("clear", Math.min(4, Math.ceil(matches.size / 3)));
  for (const id of matches) {
    const { row, col } = parseKey(id);
    const tileEl = boardEl.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    tileEl?.classList.add("clearing");
    burst(tileEl);
  }
  await sleep(230);
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
    const order = orders.find((item) => item.type === piece.type);
    if (order) order.got += 1;
  }
}

function collapse(matches, specials) {
  const clearedPieces = [];
  const dropMap = new Map();
  for (const id of matches) {
    const { row, col } = parseKey(id);
    if (board[row][col]) clearedPieces.push(board[row][col]);
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
    const matched = new Set();
    for (const group of groups) {
      for (const cell of group.cells) matched.add(key(cell.row, cell.col));
    }

    const specials = collectSpecials(groups, preferredSpecialCell);
    addSpecialBlast(matched);
    if (specials.size > 0) playSound("special");
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

  if (combo >= 3) showComboBanner(`${combo} 连甜蜜爆发`);
  if (clearedTotal >= 9) showToast(`大片甜爆 +${clearedTotal}`);
  else if (clearedTotal >= 5) showToast(`甜蜜连消 +${clearedTotal}`);
  if (!findMove()) {
    shuffleBoard(false);
    showToast("已自动洗牌");
  }
  if (checkEndAfter) await checkEnd();
}

async function trySwap(a, b) {
  if (busy || ended || !areAdjacent(a, b) || moves <= 0) return;
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
    await resolveBoard(b);
    render();
  }

  busy = false;
  if (didMatch) render();
}

function findMove() {
  for (let row = 0; row < SIZE; row += 1) {
    for (let col = 0; col < SIZE; col += 1) {
      const here = { row, col };
      const candidates = [
        { row: row + 1, col },
        { row, col: col + 1 },
      ];

      for (const next of candidates) {
        if (next.row >= SIZE || next.col >= SIZE) continue;
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
  if (boosters.hammer <= 0) return;
  boosters.hammer -= 1;
  activeTool = null;
  clearCells(hammerCells(cell), "糖锤敲碎！");
}

function useSpark(cell) {
  if (boosters.spark <= 0) return;
  boosters.spark -= 1;
  activeTool = null;
  clearCells(typeCells(board[cell.row][cell.col].type), "星爆清屏！");
}

function useRowBlast(cell) {
  if (boosters.rowBlast <= 0) return;
  boosters.rowBlast -= 1;
  activeTool = null;
  clearCells(rowCells(cell.row), "横扫一排！");
}

function useColBlast(cell) {
  if (boosters.colBlast <= 0) return;
  boosters.colBlast -= 1;
  activeTool = null;
  clearCells(colCells(cell.col), "竖扫一列！");
}

function useCrossBlast(cell) {
  if (boosters.crossBlast <= 0) return;
  boosters.crossBlast -= 1;
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
    playSound("win");
    openModal("关卡完成", "太甜啦！", `第 ${level + 1} 关完成，下一关会更有挑战。`, "下一关");
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
  const config = LEVELS[nextLevel % LEVELS.length];
  level = nextLevel;
  score = 0;
  moves = config.moves;
  combo = 1;
  orders = config.orders.map((order) => ({ ...order, got: 0 }));
  boosters = {
    hammer: 2 + Math.floor(level / 2),
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
  await sleep(1250);
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
  if (soundEnabled) playSound("button");
  render();
  showToast(soundEnabled ? "声音已打开" : "已静音");
});
hammerBtn.addEventListener("click", () => {
  requestPortraitLock();
  updateOrientationLock();
  if (isLandscapeLocked) return;
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

startLevel(0);
