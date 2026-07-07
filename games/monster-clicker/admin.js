const dom = {
  form: document.querySelector("#recordForm"),
  recordType: document.querySelector("#recordType"),
  recordId: document.querySelector("#recordId"),
  recordName: document.querySelector("#recordName"),
  recordRarity: document.querySelector("#recordRarity"),
  recordClass: document.querySelector("#recordClass"),
  recordSlot: document.querySelector("#recordSlot"),
  recordWeaponType: document.querySelector("#recordWeaponType"),
  recordLevel: document.querySelector("#recordLevel"),
  recordSellPrice: document.querySelector("#recordSellPrice"),
  recordSetName: document.querySelector("#recordSetName"),
  recordSetPieces: document.querySelector("#recordSetPieces"),
  recordStats: document.querySelector("#recordStats"),
  recordActorStats: document.querySelector("#recordActorStats"),
  recordSetBonus: document.querySelector("#recordSetBonus"),
  recordSkills: document.querySelector("#recordSkills"),
  recordNotes: document.querySelector("#recordNotes"),
  requiredAssetSlots: document.querySelector("#requiredAssetSlots"),
  assetDropZone: document.querySelector("#assetDropZone"),
  assetFile: document.querySelector("#assetFile"),
  uploadButton: document.querySelector("#uploadButton"),
  clearQueuedAssets: document.querySelector("#clearQueuedAssetsButton"),
  uploadQueue: document.querySelector("#uploadQueue"),
  assetList: document.querySelector("#assetList"),
  recordList: document.querySelector("#recordList"),
  recordTypeFilter: document.querySelector("#recordTypeFilter"),
  assetStatusFilter: document.querySelector("#assetStatusFilter"),
  saveState: document.querySelector("#saveState"),
  newRecord: document.querySelector("#newRecordButton"),
};

const assetSlotDefs = [
  {
    key: "inventoryThumb",
    label: "背包缩略图",
    hint: "背包、商店、地面掉落的小图",
    keywords: ["inventory", "thumb", "thumbnail", "bag", "shop", "背包", "缩略", "缩图", "商店"],
  },
  {
    key: "paperDoll",
    label: "装备剪影位图",
    hint: "装备页人物剪影上的部位图",
    keywords: ["paper", "doll", "paperdoll", "slot", "equip", "silhouette", "剪影", "装备位", "人偶", "纸娃娃"],
  },
  {
    key: "battleBack",
    label: "战场背视图",
    hint: "战斗里主角背后看到的装备图",
    keywords: ["battle", "combat", "back", "battleback", "fight", "战场", "战斗", "背视", "背面"],
  },
  {
    key: "icon",
    label: "通用图标",
    hint: "物品、套装、后台列表通用图标",
    keywords: ["icon", "item", "common", "ui", "图标", "物品", "通用"],
  },
  {
    key: "animation",
    label: "动图 / 特效",
    hint: "GIF/WebP 技能、宝箱或物品特效",
    keywords: ["animation", "anim", "effect", "skill", "motion", "gif", "特效", "动图", "技能"],
  },
  {
    key: "monsterArt",
    label: "怪物图",
    hint: "战场里怪物主体图",
    keywords: ["monster", "mob", "enemy", "boss", "怪物", "小兵", "精英", "首领"],
  },
  {
    key: "petArt",
    label: "宠物图",
    hint: "宠物列表和战斗出战图",
    keywords: ["pet", "companion", "buddy", "宠物", "出战"],
  },
  {
    key: "playerBack",
    label: "主角背影",
    hint: "战斗里玩家背影基础图",
    keywords: ["player", "hero", "main", "back", "avatar", "主角", "玩家", "角色", "背影"],
  },
];

const requiredAssetSlotsByType = {
  equipment: ["inventoryThumb", "paperDoll", "battleBack"],
  weapon: ["inventoryThumb", "paperDoll", "battleBack"],
  item: ["icon", "animation"],
  monster: ["monsterArt", "icon", "animation"],
  player: ["playerBack", "icon"],
  pet: ["petArt", "icon", "animation"],
  set: ["icon"],
};

let catalog = { records: [] };
let currentAssets = {};
let queuedAssets = [];

const generatedWeaponTypes = [
  { key: "staff", name: "法杖", classKey: "mage", damage: 1, speed: 1, crit: 0.006 },
  { key: "orb", name: "法珠", classKey: "mage", damage: 0.88, speed: 0.78, crit: 0.018 },
  { key: "axe", name: "斧头", classKey: "warrior", damage: 1.14, speed: 1.16, crit: 0.006 },
  { key: "greatsword", name: "大剑", classKey: "warrior", damage: 1.02, speed: 1, crit: 0.012 },
  { key: "hammer", name: "锤子", classKey: "warrior", damage: 1.24, speed: 1.28, crit: 0.002 },
];

const generatedWeaponLevels = [1, 10, 25, 40, 55, 70];
const generatedSetNames = ["狼魂", "秘银", "星火", "龙脊", "月蚀"];

const typeLabels = {
  equipment: "装备",
  weapon: "武器模板",
  item: "物品",
  monster: "怪物",
  player: "主角",
  pet: "宠物",
  set: "套装",
};

const rarityLabels = {
  common: "普通",
  fine: "精良",
  rare: "稀有",
  epic: "史诗",
  legend: "传说",
};

const rarityMultipliers = {
  common: 1,
  fine: 1.25,
  rare: 1.6,
  epic: 2.15,
  legend: 3,
};

const classLabels = {
  any: "通用",
  warrior: "战士",
  mage: "法师",
};

const slotLabels = {
  none: "无部位",
  weapon: "武器",
  helm: "头盔",
  hat: "帽子",
  shoulders: "护肩",
  armor: "胸甲",
  gloves: "手套",
  pants: "裤子",
  boots: "战靴",
  ring: "戒指",
};

function parseJsonField(input, fallback = {}) {
  try {
    return JSON.parse(input.value || "{}");
  } catch {
    input.focus();
    throw new Error(`${input.previousElementSibling?.textContent || "JSON"} 格式不正确`);
  }
}

function skillsFromText(text) {
  return String(text || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function generateRecordId(type = dom.recordType.value) {
  return `${type || "asset"}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

function ensureRecordId() {
  if (!dom.recordId.value.trim()) dom.recordId.value = generateRecordId();
}

function assetSlotDef(slot) {
  return assetSlotDefs.find((item) => item.key === slot) || { key: slot, label: slot, hint: "", keywords: [] };
}

function assetLabel(slot) {
  return assetSlotDef(slot).label;
}

function requiredSlotsForType(type = dom.recordType.value) {
  return requiredAssetSlotsByType[type] || ["icon"];
}

function normalizeFileName(name) {
  return String(name || "")
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[_\s-]+/g, "");
}

function isAllowedImage(file) {
  return /\.(png|jpe?g|webp|gif|svg)$/i.test(file.name) || String(file.type || "").startsWith("image/");
}

function scoreSlotByName(file, slot) {
  const name = normalizeFileName(file.name);
  const extension = file.name.split(".").pop()?.toLowerCase() || "";
  const def = assetSlotDef(slot);
  let score = 0;

  for (const keyword of def.keywords) {
    if (name.includes(normalizeFileName(keyword))) score += keyword.length > 3 ? 3 : 2;
  }

  if (slot === "animation" && ["gif", "webp"].includes(extension)) score += 1;
  return score;
}

function guessAssetSlot(file, preferredSlots = requiredSlotsForType()) {
  const candidates = [...preferredSlots, ...assetSlotDefs.map((slot) => slot.key)].filter(
    (slot, index, list) => list.indexOf(slot) === index,
  );
  const scored = candidates
    .map((slot) => ({ slot, score: scoreSlotByName(file, slot) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length) return scored[0].slot;
  if (preferredSlots.length === 1) return preferredSlots[0];
  return "";
}

function queueFiles(files) {
  const preferredSlots = requiredSlotsForType();
  const accepted = Array.from(files || []).filter(isAllowedImage);
  if (!accepted.length) return;

  queuedAssets.push(
    ...accepted.map((file) => ({
      id: uid("queued"),
      file,
      slot: guessAssetSlot(file, preferredSlots),
      status: "ready",
      message: "",
    })),
  );
  renderUploadQueue();
  renderRequiredAssets();
}

function rematchQueuedAssets() {
  const preferredSlots = requiredSlotsForType();
  queuedAssets = queuedAssets.map((asset) => ({
    ...asset,
    slot: asset.status === "uploaded" ? asset.slot : guessAssetSlot(asset.file, preferredSlots),
  }));
  renderUploadQueue();
  renderRequiredAssets();
}

function missingAssetSlots(record) {
  const assets = record.assets || {};
  return requiredSlotsForType(record.type).filter((slot) => !assets[slot]);
}

function generatedWeaponAssets(weapon, rarity, setName) {
  const imageUrl = `./assets/generated-weapons/${weapon.key}.png`;
  return {
    inventoryThumb: {
      url: imageUrl,
      name: `${setName}${weapon.name}-背包图.png`,
      type: "image/png",
      size: 0,
    },
    paperDoll: {
      url: imageUrl,
      name: `${setName}${weapon.name}-装备位图.png`,
      type: "image/png",
      size: 0,
    },
    battleBack: {
      url: imageUrl,
      name: `${setName}${weapon.name}-战场背视图.png`,
      type: "image/png",
      size: 0,
    },
  };
}

function isSvgAsset(asset) {
  const url = typeof asset === "string" ? asset : asset?.url;
  return typeof url === "string" && url.startsWith(`data:image/${"svg"}`);
}

function normalizeSavedWeaponAssets(record) {
  if (record.slot !== "weapon" && record.type !== "weapon") return record;
  const weapon = generatedWeaponTypes.find((item) => item.key === record.weaponType);
  if (!weapon) return record;

  const generatedAssets = generatedWeaponAssets(weapon, record.rarity || "common", record.setName || generatedSetNames[0]);
  const existingAssets = record.assets || {};
  const nextAssets = { ...generatedAssets };

  for (const [slot, asset] of Object.entries(existingAssets)) {
    if (isSvgAsset(asset)) continue;
    nextAssets[slot] = asset;
  }

  return { ...record, assets: nextAssets };
}

function generatedWeaponRecords() {
  return generatedWeaponTypes.flatMap((weapon) =>
    Object.keys(rarityLabels).flatMap((rarity) =>
      generatedSetNames.flatMap((setName) =>
        generatedWeaponLevels.map((level) => {
        const rarityMult = rarityMultipliers[rarity] || 1;
        const base = Math.floor((level * 2.5 + 7) * rarityMult);
        const statKey = weapon.classKey === "warrior" ? "attack" : "magic";
        const stats = { attack: 0, magic: 0, armor: 0, hp: 0, crit: 0 };
        stats[statKey] = Math.floor((base + level * rarityMult) * weapon.damage);
        stats.crit = Number((weapon.crit + rarityMult * 0.004).toFixed(3));

        return {
          id: `system-weapon-${setName}-${weapon.key}-${rarity}-lv${level}`,
          type: "weapon",
          name: `${setName}${weapon.name}`,
          rarity,
          classKey: weapon.classKey,
          slot: "weapon",
          weaponType: weapon.key,
          level,
          sellPrice: 0,
          setName,
          setPieces: 0,
          stats,
          actorStats: { hp: 0, attack: 0, defense: 0, dodge: 0, speed: 0 },
          setBonus: { pieces: 2, bonus: { attack: 0, crit: 0 } },
          skills: [`自动点击参考：伤害系数 ${weapon.damage}，速度系数 ${weapon.speed}`],
          notes: "系统根据游戏掉落算法自动生成的武器，可加载后保存为后台记录并替换正式图片资源。",
          assets: generatedWeaponAssets(weapon, rarity, setName),
          source: "system",
        };
      }),
      ),
    ),
  );
}

function browsableRecords() {
  return [...catalog.records, ...generatedWeaponRecords()];
}

function isCurrentRecordSaved() {
  const id = dom.recordId.value.trim();
  return Boolean(id && catalog.records.some((record) => record.id === id));
}

function recordFromForm() {
  ensureRecordId();
  const id = dom.recordId.value.trim();

  return {
    id,
    type: dom.recordType.value,
    name: dom.recordName.value.trim(),
    rarity: dom.recordRarity.value,
    classKey: dom.recordClass.value,
    slot: dom.recordSlot.value,
    weaponType: dom.recordWeaponType.value,
    level: Number(dom.recordLevel.value || 1),
    sellPrice: Number(dom.recordSellPrice.value || 0),
    setName: dom.recordSetName.value.trim(),
    setPieces: Number(dom.recordSetPieces.value || 0),
    stats: parseJsonField(dom.recordStats),
    actorStats: parseJsonField(dom.recordActorStats),
    setBonus: parseJsonField(dom.recordSetBonus),
    skills: skillsFromText(dom.recordSkills.value),
    notes: dom.recordNotes.value.trim(),
    assets: currentAssets,
    updatedAt: new Date().toISOString(),
  };
}

function fillForm(record) {
  dom.recordType.value = record.type || "equipment";
  dom.recordId.value = record.id || generateRecordId(record.type || "equipment");
  dom.recordName.value = record.name || "";
  dom.recordRarity.value = record.rarity || "common";
  dom.recordClass.value = record.classKey || "any";
  dom.recordSlot.value = record.slot || "none";
  dom.recordWeaponType.value = record.weaponType || "none";
  dom.recordLevel.value = record.level || 1;
  dom.recordSellPrice.value = record.sellPrice || 0;
  dom.recordSetName.value = record.setName || "";
  dom.recordSetPieces.value = record.setPieces || 0;
  dom.recordStats.value = JSON.stringify(record.stats || { attack: 0, magic: 0, armor: 0, hp: 0, crit: 0 }, null, 2);
  dom.recordActorStats.value = JSON.stringify(record.actorStats || { hp: 0, attack: 0, defense: 0, dodge: 0, speed: 0 }, null, 2);
  dom.recordSetBonus.value = JSON.stringify(record.setBonus || { pieces: 2, bonus: { attack: 0, crit: 0 } }, null, 2);
  dom.recordSkills.value = Array.isArray(record.skills) ? record.skills.join("\n") : "";
  dom.recordNotes.value = record.notes || "";
  currentAssets = { ...(record.assets || {}) };
  renderAssets();
  renderRequiredAssets();
  renderUploadQueue();
}

function renderAssets() {
  const entries = Object.entries(currentAssets);
  dom.assetList.innerHTML = entries.length
    ? entries
        .map(
          ([slot, asset]) => `
            <article class="asset-card">
              <img src="${asset.url}" alt="${slot}" />
              <div>
                <strong>${assetLabel(slot)}</strong>
                <p>${asset.name || "未命名"} · ${Math.ceil((asset.size || 0) / 1024)}KB</p>
                <code>${asset.url}</code>
              </div>
              <button class="ghost-button" type="button" data-remove-asset="${slot}">移除</button>
            </article>
          `,
        )
        .join("")
    : `<p class="muted">当前记录还没有上传图片。</p>`;
}

function renderRequiredAssets() {
  const requiredSlots = requiredSlotsForType();
  const queuedSlots = new Set(queuedAssets.filter((asset) => asset.slot).map((asset) => asset.slot));
  dom.requiredAssetSlots.innerHTML = requiredSlots
    .map((slot) => {
      const def = assetSlotDef(slot);
      const uploaded = Boolean(currentAssets[slot]);
      const queued = queuedSlots.has(slot);
      return `
        <article class="required-asset ${uploaded ? "is-done" : ""} ${queued ? "is-queued" : ""}">
          <strong>${def.label}</strong>
          <span>${uploaded ? "已上传" : queued ? "待上传" : "需要图片"}</span>
          <small>${def.hint}</small>
        </article>
      `;
    })
    .join("");
}

function assetSlotOptionsHtml(selectedSlot) {
  const required = new Set(requiredSlotsForType());
  return [
    `<option value="">手动选择图片位置</option>`,
    ...assetSlotDefs.map((slot) => {
      const suffix = required.has(slot.key) ? "（当前类型需要）" : "";
      return `<option value="${slot.key}" ${slot.key === selectedSlot ? "selected" : ""}>${slot.label}${suffix}</option>`;
    }),
  ].join("");
}

function renderUploadQueue() {
  dom.uploadButton.disabled = !queuedAssets.some((asset) => asset.slot && asset.status !== "uploaded");
  dom.clearQueuedAssets.disabled = !queuedAssets.length;
  dom.uploadQueue.innerHTML = queuedAssets.length
    ? queuedAssets
        .map(
          (asset) => `
            <article class="queue-card ${asset.slot ? "" : "is-unmatched"} ${asset.status === "uploaded" ? "is-uploaded" : ""}">
              <div>
                <strong>${asset.file.name}</strong>
                <p>${Math.ceil(asset.file.size / 1024)}KB · ${asset.slot ? `匹配到 ${assetLabel(asset.slot)}` : "未匹配，请在文件名加入用途关键词"}</p>
                ${asset.message ? `<small>${asset.message}</small>` : ""}
              </div>
              <select data-queued-slot="${asset.id}" aria-label="选择 ${asset.file.name} 的图片位置">
                ${assetSlotOptionsHtml(asset.slot)}
              </select>
              <button class="ghost-button" type="button" data-remove-queued-asset="${asset.id}">移除</button>
            </article>
          `,
        )
        .join("")
    : `<p class="muted">还没有待上传图片。把多张图片拖到上方区域即可。</p>`;
}

function renderRecords() {
  const typeFilter = dom.recordTypeFilter.value;
  const assetStatus = dom.assetStatusFilter.value;
  const filteredRecords = browsableRecords().filter((record) => {
    if (typeFilter !== "all" && record.type !== typeFilter) return false;
    const missing = missingAssetSlots(record);
    if (assetStatus === "missing") return missing.length > 0;
    if (assetStatus === "complete") return missing.length === 0;
    return true;
  });

  dom.recordList.innerHTML = filteredRecords.length
    ? filteredRecords
        .map(
          (record) => {
            const missing = missingAssetSlots(record);
            const isSystem = record.source === "system";
            return `
            <article class="record-card ${isSystem ? "system-record" : ""}">
              <div>
                <strong>${record.name || record.id}${isSystem ? " <span class=\"record-badge\">系统</span>" : ""}</strong>
                <p class="record-meta">
                  <span>${typeLabels[record.type] || record.type}</span>
                  <span>${rarityLabels[record.rarity] || record.rarity || "普通"}</span>
                  <span>${classLabels[record.classKey] || record.classKey || "通用"}</span>
                  <span>${slotLabels[record.slot] || record.slot || "无部位"}</span>
                  <span>Lv.${record.level || 1}</span>
                  <span>售价 ${record.sellPrice || 0}</span>
                </p>
                <p class="${missing.length ? "missing-assets" : "complete-assets"}">
                  ${isSystem ? "已自动放入初版武器图片，可套用后替换正式图" : missing.length ? `缺图：${missing.map(assetLabel).join("、")}` : "图片完整"}
                </p>
                <code>${record.id}</code>
              </div>
              <button class="ghost-button" type="button" data-load-record="${record.id}">${isSystem ? "套用" : "编辑"}</button>
            </article>
          `;
          },
        )
        .join("")
    : `<p class="muted">当前筛选下没有记录。</p>`;
}

async function loadCatalog() {
  const response = await fetch("/api/catalog");
  catalog = await response.json();
  if (!Array.isArray(catalog.records)) catalog.records = [];
  catalog.records = catalog.records.map(normalizeSavedWeaponAssets);
  renderRecords();
  dom.saveState.textContent = catalog.updatedAt ? `已加载 ${new Date(catalog.updatedAt).toLocaleString()}` : "已加载";
}

async function saveRecord() {
  const record = recordFromForm();
  const index = catalog.records.findIndex((entry) => entry.id === record.id);
  if (index >= 0) catalog.records[index] = record;
  else catalog.records.unshift(record);

  const response = await fetch("/api/catalog", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(catalog),
  });
  catalog = await response.json();
  renderRecords();
  dom.saveState.textContent = `已保存 ${new Date().toLocaleTimeString()}`;
}

async function uploadSingleAsset(record, queuedAsset) {
  if (!queuedAsset.slot) throw new Error(`${queuedAsset.file.name} 未匹配图片类型`);

  const body = new FormData();
  body.append("entity", record.type);
  body.append("slot", queuedAsset.slot);
  body.append("file", queuedAsset.file);

  const response = await fetch("/api/upload", { method: "POST", body });
  const asset = await response.json();
  if (!response.ok) throw new Error(asset.error || `${queuedAsset.file.name} 上传失败`);
  return asset;
}

async function uploadQueuedAssets() {
  const record = recordFromForm();
  const uploadable = queuedAssets.filter((asset) => asset.slot && asset.status !== "uploaded");
  if (!uploadable.length) throw new Error("还没有匹配成功的待上传图片");

  dom.uploadButton.disabled = true;
  dom.uploadButton.textContent = "上传中";
  try {
    for (const queuedAsset of uploadable) {
      queuedAsset.status = "uploading";
      queuedAsset.message = "上传中";
      renderUploadQueue();

      const asset = await uploadSingleAsset(record, queuedAsset);
      currentAssets[queuedAsset.slot] = asset;
      queuedAsset.status = "uploaded";
      queuedAsset.message = "已上传";
      renderAssets();
      renderRequiredAssets();
      renderUploadQueue();
    }
    await saveRecord();
    queuedAssets = queuedAssets.filter((asset) => !asset.slot || asset.status !== "uploaded");
    dom.assetFile.value = "";
    renderUploadQueue();
    renderRequiredAssets();
  } finally {
    dom.uploadButton.disabled = false;
    dom.uploadButton.textContent = "上传匹配图片";
    renderUploadQueue();
  }
}

function resetForm() {
  queuedAssets = [];
  fillForm({
    id: generateRecordId("equipment"),
    type: "equipment",
    name: "",
  });
  dom.recordName.focus();
}

dom.form.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    await saveRecord();
  } catch (error) {
    alert(error.message);
  }
});

dom.uploadButton.addEventListener("click", async () => {
  try {
    await uploadQueuedAssets();
  } catch (error) {
    alert(error.message);
  }
});

dom.newRecord.addEventListener("click", resetForm);

dom.recordType.addEventListener("change", () => {
  if (!isCurrentRecordSaved()) dom.recordId.value = generateRecordId(dom.recordType.value);
  rematchQueuedAssets();
});
dom.recordTypeFilter.addEventListener("change", renderRecords);
dom.assetStatusFilter.addEventListener("change", renderRecords);

dom.assetFile.addEventListener("change", () => {
  queueFiles(dom.assetFile.files);
  dom.assetFile.value = "";
});

dom.clearQueuedAssets.addEventListener("click", () => {
  queuedAssets = [];
  renderUploadQueue();
  renderRequiredAssets();
});

dom.assetDropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  dom.assetDropZone.classList.add("is-dragging");
});

dom.assetDropZone.addEventListener("dragleave", () => {
  dom.assetDropZone.classList.remove("is-dragging");
});

dom.assetDropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  dom.assetDropZone.classList.remove("is-dragging");
  queueFiles(event.dataTransfer.files);
});

document.addEventListener("change", (event) => {
  const slotSelect = event.target.closest("[data-queued-slot]");
  if (!slotSelect) return;

  const queuedAsset = queuedAssets.find((asset) => asset.id === slotSelect.dataset.queuedSlot);
  if (!queuedAsset) return;

  queuedAsset.slot = slotSelect.value;
  queuedAsset.message = queuedAsset.slot ? `手动选择为 ${assetLabel(queuedAsset.slot)}` : "";
  renderUploadQueue();
  renderRequiredAssets();
});

document.addEventListener("click", async (event) => {
  const loadButton = event.target.closest("[data-load-record]");
  if (loadButton) {
    const isSystemButton = Boolean(loadButton.closest(".system-record"));
    const sourceRecords = isSystemButton ? generatedWeaponRecords() : browsableRecords();
    const record = sourceRecords.find((entry) => entry.id === loadButton.dataset.loadRecord);
    if (record) fillForm(record);
  }

  const removeAsset = event.target.closest("[data-remove-asset]");
  if (removeAsset) {
    delete currentAssets[removeAsset.dataset.removeAsset];
    renderAssets();
    renderRequiredAssets();
    await saveRecord().catch((error) => alert(error.message));
  }

  const removeQueuedAsset = event.target.closest("[data-remove-queued-asset]");
  if (removeQueuedAsset) {
    queuedAssets = queuedAssets.filter((asset) => asset.id !== removeQueuedAsset.dataset.removeQueuedAsset);
    renderUploadQueue();
    renderRequiredAssets();
  }
});

fillForm({ id: generateRecordId("equipment"), type: "equipment", name: "" });
loadCatalog().catch((error) => {
  dom.saveState.textContent = "后台接口不可用";
  alert(`后台接口不可用：${error.message}`);
});
