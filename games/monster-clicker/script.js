const LEGACY_STORAGE_KEY = "dungeon-grinder-save-v1";
const SAVE_PREFIX = "dungeon-grinder-save-v2:";
const USERS_KEY = "dungeon-grinder-users-v1";
const SESSION_KEY = "dungeon-grinder-session-v1";
const MAX_LEVEL = 70;

const classes = {
  warrior: {
    name: "战士",
    stat: "力量",
    damageStat: "attack",
    baseCrit: 0.08,
  },
  mage: {
    name: "法师",
    stat: "法术",
    damageStat: "magic",
    baseCrit: 0.1,
  },
};

const dungeons = [
  {
    id: "mine",
    name: "雾林矿洞",
    unlock: 1,
    min: 1,
    max: 12,
    monsters: ["苔甲兽", "矿洞窃魂", "石脊狼"],
    colors: ["#6d82ff", "#d9e0ff", "#313c89"],
  },
  {
    id: "ruin",
    name: "碎星遗迹",
    unlock: 10,
    min: 10,
    max: 25,
    monsters: ["遗迹守卫", "星砂魔灵", "断刃骑士"],
    colors: ["#58c8d6", "#c9fbff", "#1f6d78"],
  },
  {
    id: "grave",
    name: "王陵深井",
    unlock: 22,
    min: 22,
    max: 40,
    monsters: ["王陵怨卫", "骨纹祭司", "黑烛猎手"],
    colors: ["#a889ff", "#efe4ff", "#4e357f"],
  },
  {
    id: "forge",
    name: "赤炉火山",
    unlock: 38,
    min: 38,
    max: 55,
    monsters: ["熔核巨兽", "赤炉恶犬", "火纹督军"],
    colors: ["#ee6a50", "#ffd099", "#842934"],
  },
  {
    id: "abyss",
    name: "星渊裂隙",
    unlock: 55,
    min: 55,
    max: 70,
    monsters: ["裂隙吞星者", "虚空主祭", "终焉魔像"],
    colors: ["#4ed0a7", "#d4ffe8", "#1f6855"],
  },
];

const monsterCatalog = {
  mine: [
    { key: "mine-mossling", name: "苔岩幼兽", tier: "minion", hue: -8, scale: 0.88 },
    { key: "mine-stonebat", name: "矿洞石蝠", tier: "minion", hue: 12, scale: 0.82 },
    { key: "mine-rat", name: "石脊啮鼠", tier: "minion", hue: -18, scale: 0.86 },
    { key: "mine-worm", name: "水晶蠕虫", tier: "minion", hue: 26, scale: 0.9 },
    { key: "mine-pickshade", name: "铁镐怨灵", tier: "minion", hue: 36, scale: 0.94 },
    { key: "mine-spore", name: "矿脉孢子", tier: "minion", hue: -36, scale: 0.8 },
    { key: "mine-crawler", name: "裂石爬行者", tier: "minion", hue: 6, scale: 0.96 },
    { key: "mine-sootling", name: "煤尘矮魔", tier: "minion", hue: -28, scale: 0.84 },
    { key: "mine-drillbeast", name: "青铜钻岩兽", tier: "elite", hue: 10, scale: 1.04 },
    { key: "mine-crystal-warden", name: "荧晶矿脉守卫", tier: "elite", hue: 28, scale: 1.1 },
    { key: "mine-collapse-arm", name: "坍塌巨臂", tier: "elite", hue: -14, scale: 1.14 },
    { key: "mine-heart-idol", name: "千年矿心石像", tier: "boss", hue: 8, scale: 1.22 },
    { key: "mine-root-crown", name: "雾根晶冠巨兽", tier: "boss", hue: -24, scale: 1.26 },
  ],
  ruin: [
    { key: "ruin-stardust", name: "星砂魔灵", tier: "minion", hue: 0, scale: 0.86 },
    { key: "ruin-tablet", name: "浮碑守卫", tier: "minion", hue: 18, scale: 0.9 },
    { key: "ruin-blade", name: "断刃傀儡", tier: "minion", hue: -14, scale: 0.92 },
    { key: "ruin-magnet", name: "磁光巡游者", tier: "minion", hue: 34, scale: 0.84 },
    { key: "ruin-swarm", name: "星屑虫群", tier: "minion", hue: -30, scale: 0.78 },
    { key: "ruin-afterimage", name: "蓝晶残像", tier: "minion", hue: 42, scale: 0.88 },
    { key: "ruin-hound", name: "遗迹机关犬", tier: "minion", hue: -8, scale: 0.94 },
    { key: "ruin-orbit", name: "星轨哨兵", tier: "minion", hue: 24, scale: 0.9 },
    { key: "ruin-star-armor", name: "破阵星铠", tier: "elite", hue: 12, scale: 1.08 },
    { key: "ruin-prism", name: "棱镜碑灵", tier: "elite", hue: 38, scale: 1.1 },
    { key: "ruin-knight", name: "古代断刃骑士", tier: "elite", hue: -20, scale: 1.12 },
    { key: "ruin-core", name: "坠星中枢", tier: "boss", hue: 12, scale: 1.24 },
    { key: "ruin-throne", name: "碎星王座守卫", tier: "boss", hue: -18, scale: 1.28 },
  ],
  grave: [
    { key: "grave-lantern", name: "墓灯骷髅", tier: "minion", hue: 0, scale: 0.86 },
    { key: "grave-candle", name: "黑烛猎手", tier: "minion", hue: 20, scale: 0.9 },
    { key: "grave-pottery", name: "陪葬陶卫", tier: "minion", hue: -18, scale: 0.92 },
    { key: "grave-warden", name: "王陵怨卫", tier: "minion", hue: 32, scale: 0.94 },
    { key: "grave-priest", name: "骨纹祭司", tier: "minion", hue: -34, scale: 0.88 },
    { key: "grave-servant", name: "腐袍侍从", tier: "minion", hue: 14, scale: 0.84 },
    { key: "grave-moth", name: "深井尸蛾", tier: "minion", hue: 46, scale: 0.8 },
    { key: "grave-boneshield", name: "白骨盾卒", tier: "minion", hue: -10, scale: 0.94 },
    { key: "grave-coffin", name: "银棺禁卫", tier: "elite", hue: 18, scale: 1.08 },
    { key: "grave-seal-rider", name: "王印亡骑", tier: "elite", hue: -24, scale: 1.12 },
    { key: "grave-well-priest", name: "井底哭魂主祭", tier: "elite", hue: 38, scale: 1.1 },
    { key: "grave-black-crown", name: "黑冠陵主", tier: "boss", hue: 10, scale: 1.24 },
    { key: "grave-bone-queen", name: "千骨王妃", tier: "boss", hue: -34, scale: 1.26 },
  ],
  forge: [
    { key: "forge-imp", name: "炉渣小鬼", tier: "minion", hue: 0, scale: 0.84 },
    { key: "forge-hound", name: "赤岩火犬", tier: "minion", hue: -14, scale: 0.9 },
    { key: "forge-worm", name: "熔核蠕虫", tier: "minion", hue: 20, scale: 0.86 },
    { key: "forge-axe", name: "火纹掷斧手", tier: "minion", hue: 34, scale: 0.92 },
    { key: "forge-smoke", name: "黑烟焦骨", tier: "minion", hue: -30, scale: 0.88 },
    { key: "forge-beetle", name: "岩浆甲虫", tier: "minion", hue: 10, scale: 0.82 },
    { key: "forge-cinder", name: "炽煤傀儡", tier: "minion", hue: -8, scale: 0.94 },
    { key: "forge-ash", name: "赤炉灰灵", tier: "minion", hue: 42, scale: 0.82 },
    { key: "forge-core", name: "熔核巨兽", tier: "elite", hue: 0, scale: 1.08 },
    { key: "forge-warlord", name: "赤炉督军", tier: "elite", hue: -18, scale: 1.12 },
    { key: "forge-anvil", name: "火山铁砧守卫", tier: "elite", hue: 28, scale: 1.14 },
    { key: "forge-overlord", name: "炎炉霸主", tier: "boss", hue: 0, scale: 1.24 },
    { key: "forge-drake", name: "赤曜火山龙", tier: "boss", hue: -20, scale: 1.28 },
  ],
  abyss: [
    { key: "abyss-spawn", name: "裂隙幼体", tier: "minion", hue: 0, scale: 0.84 },
    { key: "abyss-eye", name: "虚空眼虫", tier: "minion", hue: 24, scale: 0.8 },
    { key: "abyss-drifter", name: "星渊漂浮者", tier: "minion", hue: -18, scale: 0.88 },
    { key: "abyss-tendril", name: "断光触须", tier: "minion", hue: 38, scale: 0.86 },
    { key: "abyss-devourer", name: "暗星噬者", tier: "minion", hue: -32, scale: 0.94 },
    { key: "abyss-ghost", name: "黑曜游魂", tier: "minion", hue: 12, scale: 0.82 },
    { key: "abyss-mantis", name: "相位螳螂", tier: "minion", hue: 44, scale: 0.9 },
    { key: "abyss-husk", name: "流星残壳", tier: "minion", hue: -10, scale: 0.92 },
    { key: "abyss-priest", name: "虚空主祭", tier: "elite", hue: 8, scale: 1.08 },
    { key: "abyss-star-eater", name: "裂隙吞星者", tier: "elite", hue: -24, scale: 1.12 },
    { key: "abyss-phase-knight", name: "星渊折光骑士", tier: "elite", hue: 34, scale: 1.1 },
    { key: "abyss-end-golem", name: "终焉魔像", tier: "boss", hue: 0, scale: 1.24 },
    { key: "abyss-maw", name: "星渊之口", tier: "boss", hue: -26, scale: 1.28 },
  ],
};

const monsterTierVisuals = {
  minion: { scale: 0.9, hue: 0, saturation: 1, glow: "rgba(88, 208, 199, 0.2)" },
  elite: { scale: 1.08, hue: 0, saturation: 1.12, glow: "rgba(255, 205, 96, 0.28)" },
  boss: { scale: 1.24, hue: 0, saturation: 1.22, glow: "rgba(255, 92, 92, 0.34)" },
  treasure: { scale: 1.02, hue: 32, saturation: 1.18, glow: "rgba(255, 205, 96, 0.32)" },
};

const slots = [
  { key: "weapon", name: "武器" },
  { key: "helm", name: "头盔" },
  { key: "hat", name: "帽子" },
  { key: "shoulders", name: "护肩" },
  { key: "armor", name: "胸甲" },
  { key: "gloves", name: "手套" },
  { key: "pants", name: "裤子" },
  { key: "boots", name: "战靴" },
  { key: "ring", name: "戒指" },
];

const equippedSlotDefs = [
  { key: "weapon", slot: "weapon", name: "武器", paperClass: "paper-weapon" },
  { key: "helm", slot: "helm", name: "头盔", paperClass: "paper-helm" },
  { key: "hat", slot: "hat", name: "帽子", paperClass: "paper-hat" },
  { key: "shoulders", slot: "shoulders", name: "护肩", paperClass: "paper-shoulders" },
  { key: "armor", slot: "armor", name: "胸甲", paperClass: "paper-armor" },
  { key: "gloves", slot: "gloves", name: "手套", paperClass: "paper-gloves" },
  { key: "pants", slot: "pants", name: "裤子", paperClass: "paper-pants" },
  { key: "boots", slot: "boots", name: "战靴", paperClass: "paper-boots" },
  { key: "ring1", slot: "ring", name: "戒指一", paperClass: "paper-ring-one" },
  { key: "ring2", slot: "ring", name: "戒指二", paperClass: "paper-ring-two" },
];

const equipmentSlotFilters = [{ key: "all", name: "全部" }, ...slots];

const rarities = [
  { key: "common", name: "普通", colorClass: "rarity-common", mult: 1, sell: 1, mat: 1, weight: 50 },
  { key: "fine", name: "精良", colorClass: "rarity-fine", mult: 1.25, sell: 1.7, mat: 2, weight: 27 },
  { key: "rare", name: "稀有", colorClass: "rarity-rare", mult: 1.6, sell: 2.7, mat: 4, weight: 14 },
  { key: "epic", name: "史诗", colorClass: "rarity-epic", mult: 2.15, sell: 4.4, mat: 8, weight: 7 },
  { key: "legend", name: "传说", colorClass: "rarity-legend", mult: 3, sell: 8, mat: 15, weight: 2 },
];
const LEGENDARY_WEAPON_CHANCE = 0.0001;
const nonLegendaryRarities = rarities.filter((rarity) => rarity.key !== "legend");

const equipmentRarityFilters = [{ key: "all", name: "全部品质" }, ...rarities.map(({ key, name }) => ({ key, name }))];
const equipmentClassFilters = [
  { key: "all", name: "全部职业" },
  { key: "current", name: "当前职业" },
  { key: "warrior", name: "战士" },
  { key: "mage", name: "法师" },
];
const equipmentWearableFilters = [
  { key: "all", name: "全部装备" },
  { key: "level", name: "当前等级可装备" },
  { key: "wearable", name: "可装备" },
];

const setNames = ["狼魂", "秘银", "星火", "龙脊", "月蚀"];
const equipmentSetSlugs = {
  狼魂: "wolf",
  秘银: "mithril",
  星火: "starfire",
  龙脊: "dragonspine",
  月蚀: "eclipse",
};
const warriorNames = {
  weapon: "武器",
  helm: "战盔",
  hat: "战帽",
  shoulders: "护肩",
  armor: "板甲",
  gloves: "重拳套",
  pants: "战裤",
  boots: "踏山靴",
  ring: "勇气戒",
};
const mageNames = {
  weapon: "武器",
  helm: "星冠",
  hat: "法帽",
  shoulders: "星纹护肩",
  armor: "秘法袍",
  gloves: "符文手套",
  pants: "织星裤",
  boots: "浮光履",
  ring: "奥术戒",
};

const weaponTypes = [
  { key: "staff", name: "法杖", classKey: "mage", damage: 1, speed: 1, crit: 0.006 },
  { key: "orb", name: "法珠", classKey: "mage", damage: 0.88, speed: 0.78, crit: 0.018 },
  { key: "axe", name: "斧头", classKey: "warrior", damage: 1.14, speed: 1.16, crit: 0.006 },
  { key: "greatsword", name: "大剑", classKey: "warrior", damage: 1.02, speed: 1, crit: 0.012 },
  { key: "hammer", name: "锤子", classKey: "warrior", damage: 1.24, speed: 1.28, crit: 0.002 },
];

const gemNames = ["红曜石", "青辉石", "星砂石"];
const petSpecies = ["焰尾兽", "灵羽鹿", "铁壳龟"];

const materialTypes = [
  { key: "cloth", name: "布料", short: "布", use: "行囊、帽子、衣服、手套、护肩、裤子" },
  { key: "iron", name: "精铁", short: "铁", use: "头盔、护肩、武器、重甲" },
  { key: "leather", name: "厚皮", short: "皮", use: "手套、战靴、行囊绑带" },
  { key: "crystal", name: "魔晶", short: "晶", use: "法杖、法珠、戒指" },
  { key: "wood", name: "灵木", short: "木", use: "法杖、锤柄、斧柄、大剑握柄" },
];

const petTypes = [
  {
    key: "dps",
    name: "焰尾兽",
    role: "输出型",
    power: 10,
    hp: 0.85,
    attack: 1.35,
    support: 0.2,
    skills: [
      [1, "爪击", "宠物自动攻击怪物。"],
      [5, "灼痕", "宠物攻击伤害提升。"],
      [10, "连击", "小概率追加一次攻击。"],
      [30, "猎杀", "对精英和BOSS伤害提升。"],
      [40, "燃魂", "主角点击伤害小幅提升。"],
      [50, "烈焰追击", "宠物攻击速度提升。"],
      [70, "终焰", "宠物暴击大幅提升。"],
    ],
  },
  {
    key: "support",
    name: "灵羽鹿",
    role: "辅助型",
    power: 7,
    hp: 1,
    attack: 0.82,
    support: 1.25,
    skills: [
      [1, "灵光", "宠物自动攻击，并提升主角闪避。"],
      [5, "鼓舞", "主角点击伤害提升。"],
      [10, "治愈", "周期性恢复主角生命。"],
      [30, "护佑", "降低怪物造成的伤害。"],
      [40, "专注", "主角暴击率提升。"],
      [50, "复苏", "主角濒死时回复少量生命。"],
      [70, "圣辉", "所有恢复和增益增强。"],
    ],
  },
  {
    key: "tank",
    name: "铁壳龟",
    role: "坦克型",
    power: 8,
    hp: 1.75,
    attack: 0.62,
    support: 0.55,
    skills: [
      [1, "硬壳", "宠物自动攻击，并拥有更高生命。"],
      [5, "嘲讽", "怪物更容易优先攻击宠物。"],
      [10, "格挡", "宠物受到伤害降低。"],
      [30, "守护", "分担主角受到的伤害。"],
      [40, "反震", "被攻击时反弹少量伤害。"],
      [50, "坚守", "低生命时减伤提升。"],
      [70, "不破", "大幅提升宠物生命和嘲讽。"],
    ],
  },
];

const petRarityRates = [
  { key: "legend", chance: 0.00001 },
  { key: "epic", chance: 0.003 },
  { key: "rare", chance: 0.035 },
  { key: "fine", chance: 0.16 },
  { key: "common", chance: 1 },
];

const petRarityFilters = [{ key: "all", name: "全部品质" }, ...rarities.map(({ key, name }) => ({ key, name }))];
const petSubTabs = [
  { key: "hatch", name: "孵化台" },
  { key: "pets", name: "宠物" },
  { key: "fusion", name: "合成" },
];
const STINK_EGG_CHANCE = 0.12;
const EGG_HATCH_DURATION_MS = 60 * 60 * 1000;
const MAX_INCUBATOR_SLOTS = 12;
const MAX_INCUBATOR_TIME_LEVEL = 10;
const MAX_INCUBATOR_SUCCESS_LEVEL = 10;
const INCUBATOR_TIME_REDUCTION_MS = 4 * 60 * 1000;
const MIN_EGG_HATCH_DURATION_MS = 20 * 60 * 1000;
const INCUBATOR_SUCCESS_STEP = 0.01;
const MIN_STINK_EGG_CHANCE = 0.02;

const generatedCharacterAssets = {
  warrior: "./assets/generated-characters/warrior-back.png",
  mage: "./assets/generated-characters/mage-back.png",
};

const generatedPetAssets = {
  dps: {
    common: {
      front: "./assets/generated-pets/dps-common-front.png",
      back: "./assets/generated-pets/dps-common-back.png",
    },
    fine: {
      front: "./assets/generated-pets/dps-fine-front.png",
      back: "./assets/generated-pets/dps-fine-back.png",
    },
    rare: {
      front: "./assets/generated-pets/dps-rare-front.png",
      back: "./assets/generated-pets/dps-rare-back.png",
    },
  },
  support: {
    common: {
      front: "./assets/generated-pets/support-common-front.png",
      back: "./assets/generated-pets/support-common-back.png",
    },
    fine: {
      front: "./assets/generated-pets/support-fine-front.png",
      back: "./assets/generated-pets/support-fine-back.png",
    },
    rare: {
      front: "./assets/generated-pets/support-rare-front.png",
      back: "./assets/generated-pets/support-rare-back.png",
    },
  },
  tank: {
    common: {
      front: "./assets/generated-pets/tank-common-front.png",
      back: "./assets/generated-pets/tank-common-back.png",
    },
    fine: {
      front: "./assets/generated-pets/tank-fine-front.png",
      back: "./assets/generated-pets/tank-fine-back.png",
    },
    rare: {
      front: "./assets/generated-pets/tank-rare-front.png",
      back: "./assets/generated-pets/tank-rare-back.png",
    },
  },
};

const generatedMonsterAssets = {
  mine: {
    minion: "./assets/generated-monsters/mine-minion.png",
    elite: "./assets/generated-monsters/mine-elite.png",
    boss: "./assets/generated-monsters/mine-boss.png",
    fallback: "./assets/generated-monsters/mine.png",
  },
  ruin: {
    minion: "./assets/generated-monsters/ruin-minion.png",
    elite: "./assets/generated-monsters/ruin-elite.png",
    boss: "./assets/generated-monsters/ruin-boss.png",
    fallback: "./assets/generated-monsters/ruin.png",
  },
  grave: {
    minion: "./assets/generated-monsters/grave-minion.png",
    elite: "./assets/generated-monsters/grave-elite.png",
    boss: "./assets/generated-monsters/grave-boss.png",
    fallback: "./assets/generated-monsters/grave.png",
  },
  forge: {
    minion: "./assets/generated-monsters/forge-minion.png",
    elite: "./assets/generated-monsters/forge-elite.png",
    boss: "./assets/generated-monsters/forge-boss.png",
    fallback: "./assets/generated-monsters/forge.png",
  },
  abyss: {
    minion: "./assets/generated-monsters/abyss-minion.png",
    elite: "./assets/generated-monsters/abyss-elite.png",
    boss: "./assets/generated-monsters/abyss-boss.png",
    fallback: "./assets/generated-monsters/abyss.png",
  },
};

const generatedEquipmentAssets = {
  warrior: {
    helm: "./assets/generated-equipment/warrior-helm.png",
    shoulders: "./assets/generated-equipment/warrior-shoulders.png",
    armor: "./assets/generated-equipment/warrior-armor.png",
    gloves: "./assets/generated-equipment/warrior-gloves.png",
    pants: "./assets/generated-equipment/warrior-pants.png",
    boots: "./assets/generated-equipment/warrior-boots.png",
    ring: "./assets/generated-equipment/warrior-ring.png",
  },
  mage: {
    hat: "./assets/generated-equipment/mage-hat.png",
    shoulders: "./assets/generated-equipment/mage-shoulders.png",
    armor: "./assets/generated-equipment/mage-armor.png",
    gloves: "./assets/generated-equipment/mage-gloves.png",
    pants: "./assets/generated-equipment/mage-pants.png",
    boots: "./assets/generated-equipment/mage-boots.png",
    ring: "./assets/generated-equipment/mage-ring.png",
  },
};

const generatedItemAssets = {
  egg: "./assets/generated-items/egg.png",
  gem: "./assets/generated-items/gem.png",
  gold: "./assets/generated-items/gold.png",
  gems: {
    ruby: "./assets/generated-items/ruby.png",
    jade: "./assets/generated-items/jade.png",
    star: "./assets/generated-items/star.png",
  },
  incubator: "./assets/generated-items/incubator-slot.png",
  material: "./assets/generated-items/material.png",
  materials: {
    cloth: "./assets/generated-items/cloth.png",
    iron: "./assets/generated-items/iron.png",
    leather: "./assets/generated-items/leather.png",
    crystal: "./assets/generated-items/crystal.png",
    wood: "./assets/generated-items/wood.png",
  },
  bag: "./assets/generated-items/bag.png",
  item: "./assets/generated-items/material.png",
};

const monsterTypes = {
  minion: { name: "小兵", hp: 1, attack: 1, xp: 1, gold: 1, drop: 1 },
  elite: { name: "精英", hp: 2.15, attack: 1.65, xp: 1.7, gold: 1.7, drop: 1.45 },
  boss: { name: "BOSS", hp: 3.4, attack: 2.15, xp: 2.4, gold: 2.6, drop: 2.2 },
  treasure_equipment: { name: "装备宝箱怪", hp: 1.35, attack: 0.55, xp: 0.8, gold: 1, drop: 10 },
  treasure_gold: { name: "金币宝箱怪", hp: 1.2, attack: 0.5, xp: 0.8, gold: 10, drop: 1 },
  treasure_material: { name: "材料宝箱怪", hp: 1.25, attack: 0.5, xp: 0.8, gold: 1, drop: 10 },
};

const dom = {
  body: document.body,
  appShell: document.querySelector("#appShell"),
  authScreen: document.querySelector("#authScreen"),
  authForm: document.querySelector("#authForm"),
  authTitle: document.querySelector("#authTitle"),
  authSubtitle: document.querySelector("#authSubtitle"),
  authUsername: document.querySelector("#authUsername"),
  authPassword: document.querySelector("#authPassword"),
  authSubmit: document.querySelector("#authSubmit"),
  authSwitch: document.querySelector("#authSwitch"),
  authMessage: document.querySelector("#authMessage"),
  pages: document.querySelectorAll(".page"),
  tabs: document.querySelectorAll(".tab-button"),
  accountName: document.querySelector("#accountNameLabel"),
  adminEntry: document.querySelector("#adminEntryButton"),
  install: document.querySelector("#installButton"),
  logout: document.querySelector("#logoutButton"),
  toast: document.querySelector("#toast"),
  className: document.querySelector("#classNameLabel"),
  level: document.querySelector("#levelLabel"),
  xp: document.querySelector("#xpLabel"),
  xpNeed: document.querySelector("#xpNeedLabel"),
  xpBar: document.querySelector("#xpBar"),
  gold: document.querySelector("#goldLabel"),
  power: document.querySelector("#powerLabel"),
  dungeonSelector: document.querySelector(".dungeon-selector"),
  dungeonList: document.querySelector("#dungeonList"),
  dungeonSelectLabel: document.querySelector("#dungeonSelectLabel"),
  dungeonLabel: document.querySelector("#dungeonLabel"),
  monsterName: document.querySelector("#monsterName"),
  monsterLevel: document.querySelector("#monsterLevelLabel"),
  monsterType: document.querySelector("#monsterTypeLabel"),
  monsterAttack: document.querySelector("#monsterAttackLabel"),
  monsterTitle: document.querySelector("#monsterTitle"),
  monsterButton: document.querySelector("#monsterButton"),
  heroBack: document.querySelector("#heroBack"),
  petBattleSprite: document.querySelector("#petBattleSprite"),
  battleLevel: document.querySelector("#battleLevelLabel"),
  playerHp: document.querySelector("#playerHpLabel"),
  playerMaxHp: document.querySelector("#playerMaxHpLabel"),
  playerHpBar: document.querySelector("#playerHpBar"),
  petBattleHp: document.querySelector("#petBattleHpLabel"),
  petBattleHpBar: document.querySelector("#petBattleHpBar"),
  petBattleXp: document.querySelector("#petBattleXpLabel"),
  petBattleXpBar: document.querySelector("#petBattleXpBar"),
  hp: document.querySelector("#hpLabel"),
  maxHp: document.querySelector("#maxHpLabel"),
  hpBar: document.querySelector("#hpBar"),
  damageLayer: document.querySelector("#damageLayer"),
  effectLayer: document.querySelector("#effectLayer"),
  groundLoot: document.querySelector("#groundLootLayer"),
  damage: document.querySelector("#damageLabel"),
  crit: document.querySelector("#critLabel"),
  petDps: document.querySelector("#petDpsLabel"),
  autoClick: document.querySelector("#autoClickLabel"),
  log: document.querySelector("#battleLog"),
  dropToastStack: document.querySelector("#dropToastStack"),
  petSubTabs: document.querySelector("#petSubTabs"),
  petSubViews: document.querySelectorAll("[data-pet-subview]"),
  petSummary: document.querySelector("#petSummary"),
  hatchStation: document.querySelector("#hatchStation"),
  petControls: document.querySelector("#petControls"),
  petList: document.querySelector("#petList"),
  petFusionSummary: document.querySelector("#petFusionSummary"),
  petFusionList: document.querySelector("#petFusionList"),
  equippedSlots: document.querySelector("#equippedSlots"),
  equipmentControls: document.querySelector("#equipmentControls"),
  equipmentList: document.querySelector("#equipmentList"),
  setBonusPanel: document.querySelector("#setBonusPanel"),
  itemSummary: document.querySelector("#itemSummary"),
  forgePanel: document.querySelector("#forgePanel"),
  shopList: document.querySelector("#shopList"),
  refreshShop: document.querySelector("#refreshShopButton"),
  classButtons: document.querySelectorAll("[data-class]"),
};

const defaultState = {
  activeTab: "battle",
  playerClass: "warrior",
  level: 1,
  xp: 0,
  gold: 120,
  kills: 0,
  dungeonId: "mine",
  monster: null,
  combatActive: true,
  playerHp: null,
  petHp: null,
  deaths: 0,
  equipment: [],
  equipped: {
    weapon: null,
    helm: null,
    hat: null,
    shoulders: null,
    armor: null,
    gloves: null,
    pants: null,
    boots: null,
    ring1: null,
    ring2: null,
  },
  equipmentFilter: {
    slot: "all",
    rarity: "all",
    classKey: "all",
    wearable: "all",
  },
  equipmentUpgradeSeen: {},
  bagCapacity: 100,
  gems: {
    ruby: 0,
    jade: 0,
    star: 0,
  },
  materials: {
    cloth: 0,
    iron: 0,
    leather: 0,
    crystal: 0,
    wood: 0,
  },
  groundLoot: {
    gold: 0,
    items: [],
  },
  eggs: [],
  incubatorSlots: [{ id: "incubator-1", egg: null, startedAt: null }],
  pets: [],
  activePetId: null,
  petView: "hatch",
  petFilter: {
    rarity: "all",
  },
  shop: [],
  log: ["进入雾林矿洞，开始刷副本。"],
};

let authMode = "login";
let deferredInstallPrompt = null;
let toastTimer = 0;
let lastAutoClickAt = 0;
let lastMonsterAttackAt = 0;
let lastPetAttackAt = 0;
let lastBagFullNoticeAt = 0;
let expandedEquipmentId = null;
let expandedPetSkill = null;
let activeSlotPickerKey = null;
const soundState = {
  context: null,
  dry: null,
  wet: null,
  master: null,
  compressor: null,
  reverb: null,
  lastAttackAt: 0,
};
let currentUser = loadSession();
let state = loadState();

function cloneDefaultState() {
  return structuredClone(defaultState);
}

function normalizeUsername(value) {
  return String(value || "").trim().toLowerCase();
}

function loadUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
    return users && typeof users === "object" && !Array.isArray(users) ? users : {};
  } catch {
    return {};
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function passwordHash(username, password) {
  const text = `${normalizeUsername(username)}:${password}:dungeon-grinder-local-auth`;
  let hash = 2166136261;

  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return `local-${(hash >>> 0).toString(16)}`;
}

function getSaveKey(username = currentUser?.username) {
  if (!username) return null;
  return `${SAVE_PREFIX}${encodeURIComponent(normalizeUsername(username))}`;
}

function loadSession() {
  const username = normalizeUsername(localStorage.getItem(SESSION_KEY));
  if (!username) return null;

  const users = loadUsers();
  return users[username] || null;
}

function setSession(username, options = {}) {
  const users = loadUsers();
  const normalized = normalizeUsername(username);
  const user = users[normalized];

  if (!user) return;

  user.lastLoginAt = new Date().toISOString();
  saveUsers(users);
  currentUser = user;
  localStorage.setItem(SESSION_KEY, normalized);
  state = loadState({ allowLegacyImport: options.allowLegacyImport });
  saveState();
  render();
  updateAuthGate();
}

function loadState(options = {}) {
  const saveKey = getSaveKey();
  let raw = saveKey ? localStorage.getItem(saveKey) : null;
  let importedLegacy = false;
  let next = structuredClone(defaultState);

  if (!raw && options.allowLegacyImport && localStorage.getItem(LEGACY_STORAGE_KEY)) {
    raw = localStorage.getItem(LEGACY_STORAGE_KEY);
    importedLegacy = true;
  }

  if (raw) {
    try {
      const saved = JSON.parse(raw);
      next = {
        ...next,
        ...saved,
        equipped: { ...defaultState.equipped, ...(saved.equipped || {}) },
        equipmentFilter: { ...defaultState.equipmentFilter, ...(saved.equipmentFilter || {}) },
        petFilter: { ...defaultState.petFilter, ...(saved.petFilter || {}) },
        gems: { ...defaultState.gems, ...(saved.gems || {}) },
        log: Array.isArray(saved.log) ? saved.log.slice(0, 12) : next.log,
      };
    } catch {
      next = cloneDefaultState();
    }
  }

  next = normalizeLoadedState(next);
  if (importedLegacy) next.log = ["已导入本机旧存档。", ...next.log].slice(0, 12);
  if (!next.monster) next.monster = createMonster(next.dungeonId, next);
  if (next.monster && (!next.monster.type || !next.monster.attack)) {
    const repairedMonster = createMonster(next.monster.dungeonId || next.dungeonId, next);
    next.monster = { ...repairedMonster, hp: Math.min(next.monster.hp || repairedMonster.hp, repairedMonster.maxHp) };
  }
  if (!next.shop.length) next.shop = createShopStock(next.level, next.playerClass);
  return next;
}

function saveState() {
  const saveKey = getSaveKey();
  if (!saveKey || !currentUser) return;

  localStorage.setItem(saveKey, JSON.stringify(state));
}

function normalizeLoadedState(next) {
  const emptyStats = { attack: 0, magic: 0, armor: 0, hp: 0, crit: 0 };

  next.equipped = { ...defaultState.equipped, ...(next.equipped || {}) };
  if (next.equipped.ring && !next.equipped.ring1) next.equipped.ring1 = next.equipped.ring;
  delete next.equipped.ring;
  next.equipmentFilter = { ...defaultState.equipmentFilter, ...(next.equipmentFilter || {}) };
  if (!equipmentSlotFilters.some((filter) => filter.key === next.equipmentFilter.slot)) next.equipmentFilter.slot = "all";
  if (!equipmentRarityFilters.some((filter) => filter.key === next.equipmentFilter.rarity)) next.equipmentFilter.rarity = "all";
  if (!equipmentClassFilters.some((filter) => filter.key === next.equipmentFilter.classKey)) next.equipmentFilter.classKey = "all";
  if (!equipmentWearableFilters.some((filter) => filter.key === next.equipmentFilter.wearable)) next.equipmentFilter.wearable = "all";
  delete next.equipmentFilter.level;
  next.equipmentUpgradeSeen = normalizeEquipmentUpgradeSeen(next.equipmentUpgradeSeen);
  next.petFilter = { ...defaultState.petFilter, ...(next.petFilter || {}) };
  if (!petRarityFilters.some((filter) => filter.key === next.petFilter.rarity)) next.petFilter.rarity = "all";
  if (!petSubTabs.some((tab) => tab.key === next.petView)) next.petView = defaultState.petView;

  if (!Number.isFinite(next.bagCapacity)) {
    const legacyCapacities = [100, 200, 500];
    next.bagCapacity = legacyCapacities[clamp(Math.floor(next.bagTier || 0), 0, legacyCapacities.length - 1)] || 100;
  }
  next.bagCapacity = Math.max(100, Math.floor(next.bagCapacity / 50) * 50);
  delete next.bagTier;
  next.materials = normalizeMaterials(next.materials);
  next.groundLoot = normalizeGroundLoot(next.groundLoot);

  next.equipment = Array.isArray(next.equipment)
    ? next.equipment.map((item) => {
        const normalized = {
          ...item,
          stats: { ...emptyStats, ...(item.stats || {}) },
        };
        if (normalized.classKey === "mage" && normalized.slot === "helm" && !normalized._keptLegacyHelm) {
          normalized.slot = "hat";
        }
        if (normalized.slot === "weapon" && !normalized.weaponType) {
          normalized.weaponType = pickWeaponType(normalized.classKey).key;
        }
        if (normalized.slot === "weapon") {
          const weaponType = weaponTypeByKey(normalized.weaponType, normalized.classKey);
          const generatedAssets = generatedWeaponAssets(weaponType, normalized.rarity, normalized.setName || pick(setNames));
          normalized.assets = normalizeGeneratedWeaponAssets(normalized.assets, generatedAssets);
        }
        normalized.maxDurability = normalized.maxDurability || maxDurabilityFor(normalized);
        normalized.durability = clamp(
          typeof normalized.durability === "number" ? normalized.durability : normalized.maxDurability,
          0,
          normalized.maxDurability,
        );

        if (normalized.slot === "weapon" && typeof normalized.autoClick === "undefined") {
          normalized.autoClick = Math.random() < 0.84 ? createAutoClickForWeapon(normalized) : null;
        }

        return normalized;
      })
    : [];

  next.shop = Array.isArray(next.shop)
    ? next.shop.map((item) => {
        const normalized = { ...item, stats: { ...emptyStats, ...(item.stats || {}) } };
        if (normalized.classKey === "mage" && normalized.slot === "helm" && !normalized._keptLegacyHelm) normalized.slot = "hat";
        if (normalized.slot === "weapon" && !normalized.weaponType) normalized.weaponType = pickWeaponType(normalized.classKey).key;
        if (normalized.slot === "weapon") {
          const weaponType = weaponTypeByKey(normalized.weaponType, normalized.classKey);
          const generatedAssets = generatedWeaponAssets(weaponType, normalized.rarity, normalized.setName || pick(setNames));
          normalized.assets = normalizeGeneratedWeaponAssets(normalized.assets, generatedAssets);
        }
        if (normalized.slot !== "weapon" || typeof normalized.autoClick !== "undefined") return normalized;
        return { ...normalized, autoClick: Math.random() < 0.84 ? createAutoClickForWeapon(normalized) : null };
      })
    : [];

  next.eggs = Array.isArray(next.eggs) ? next.eggs.map(normalizeEgg).filter(Boolean) : [];
  next.incubatorSlots = normalizeIncubatorSlots(next.incubatorSlots);
  next.pets = Array.isArray(next.pets)
    ? next.pets.map((pet) => ({
        ...pet,
        type: pet.type || pick(petTypes).key,
        rarity: pet.rarity || "common",
        level: clamp(Math.floor(pet.level || 1), 1, MAX_LEVEL),
        xp: Math.max(0, Math.floor(pet.xp || 0)),
      }))
    : [];

  next.combatActive = typeof next.combatActive === "boolean" ? next.combatActive : true;
  next.playerHp = typeof next.playerHp === "number" ? next.playerHp : playerMaxHp(next);
  next.playerHp = clamp(next.playerHp, 0, playerMaxHp(next));
  next.petHp = typeof next.petHp === "number" ? next.petHp : null;
  next.deaths = Math.max(0, Math.floor(next.deaths || 0));

  return next;
}

function setAuthMessage(message, isError = false) {
  dom.authMessage.textContent = message;
  dom.authMessage.classList.toggle("is-error", isError);
}

function updateAuthCopy() {
  const isLogin = authMode === "login";

  dom.authTitle.textContent = isLogin ? "登录账号" : "创建账号";
  dom.authSubtitle.textContent = isLogin ? "继续你的角色进度。" : "创建后会生成一个独立游戏存档。";
  dom.authSubmit.textContent = isLogin ? "登录" : "注册";
  dom.authSwitch.textContent = isLogin ? "创建账号" : "返回登录";
  dom.authPassword.autocomplete = isLogin ? "current-password" : "new-password";
  setAuthMessage("");
}

function updateAuthGate() {
  const locked = !currentUser;

  dom.authScreen.hidden = !locked;
  dom.appShell.classList.toggle("is-locked", locked);
  dom.body.classList.toggle("auth-open", locked);
  dom.appShell.setAttribute("aria-hidden", locked ? "true" : "false");
  dom.accountName.textContent = currentUser ? currentUser.username : "未登录";
  dom.logout.disabled = !currentUser;
  updateAdminEntry();

  if (locked) {
    window.setTimeout(() => dom.authUsername.focus(), 50);
  }
}

function updateAdminEntry() {
  if (!dom.adminEntry) return;
  dom.adminEntry.hidden = normalizeUsername(currentUser?.username) !== "admin";
}

function validateAuthInput(username, password) {
  if (username.length < 2 || username.length > 18) return "账号需要 2-18 个字符。";
  if (password.length < 4 || password.length > 32) return "密码需要 4-32 个字符。";
  return "";
}

function handleAuthSubmit(event) {
  event.preventDefault();

  const username = normalizeUsername(dom.authUsername.value);
  const password = dom.authPassword.value;
  const error = validateAuthInput(username, password);
  if (error) {
    setAuthMessage(error, true);
    return;
  }

  const users = loadUsers();
  const user = users[username];

  if (authMode === "register") {
    if (user) {
      setAuthMessage("这个账号已经存在，可以直接登录。", true);
      return;
    }

    const wasFirstUser = Object.keys(users).length === 0;
    users[username] = {
      username,
      passwordHash: passwordHash(username, password),
      createdAt: new Date().toISOString(),
      lastLoginAt: null,
    };
    saveUsers(users);
    setSession(username, { allowLegacyImport: wasFirstUser });
    dom.authForm.reset();
    showToast(`欢迎，${username}`);
    return;
  }

  if (!user || user.passwordHash !== passwordHash(username, password)) {
    setAuthMessage("账号或密码不正确。", true);
    return;
  }

  setSession(username);
  dom.authForm.reset();
  showToast(`已登录：${username}`);
}

function logout() {
  saveState();
  currentUser = null;
  localStorage.removeItem(SESSION_KEY);
  authMode = "login";
  state = loadState();
  render();
  updateAuthCopy();
  updateAuthGate();
  setAuthMessage("已退出账号。");
}

function showToast(message) {
  if (!message) return;

  dom.toast.textContent = message;
  dom.toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    dom.toast.classList.remove("is-visible");
  }, 2600);
}

function audioContext() {
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) return null;
  if (!soundState.context) {
    soundState.context = new AudioCtor();
    setupSoundGraph(soundState.context);
  }
  if (soundState.context.state === "suspended") soundState.context.resume().catch(() => {});
  return soundState.context;
}

function setupSoundGraph(ctx) {
  soundState.master = ctx.createGain();
  soundState.dry = ctx.createGain();
  soundState.wet = ctx.createGain();
  soundState.compressor = ctx.createDynamicsCompressor();
  soundState.reverb = ctx.createConvolver();

  soundState.master.gain.value = 0.92;
  soundState.dry.gain.value = 0.86;
  soundState.wet.gain.value = 0.16;
  soundState.compressor.threshold.value = -18;
  soundState.compressor.knee.value = 18;
  soundState.compressor.ratio.value = 5;
  soundState.compressor.attack.value = 0.006;
  soundState.compressor.release.value = 0.16;
  soundState.reverb.buffer = createRoomImpulse(ctx);

  soundState.dry.connect(soundState.master);
  soundState.wet.connect(soundState.reverb).connect(soundState.master);
  soundState.master.connect(soundState.compressor).connect(ctx.destination);
}

function createRoomImpulse(ctx) {
  const duration = 1.15;
  const length = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(2, length, ctx.sampleRate);

  for (let channel = 0; channel < 2; channel += 1) {
    const data = buffer.getChannelData(channel);
    let smoothed = 0;
    for (let i = 0; i < length; i += 1) {
      const progress = i / length;
      smoothed = smoothed * 0.78 + (Math.random() * 2 - 1) * 0.22;
      data[i] = smoothed * Math.pow(1 - progress, 3.2) * 0.45;
    }
  }

  return buffer;
}

function soundOutput(ctx, wet = 0) {
  if (!soundState.dry || !soundState.wet) setupSoundGraph(ctx);
  const dryGain = ctx.createGain();
  const wetGain = ctx.createGain();
  dryGain.gain.value = clamp(1 - wet, 0, 1);
  wetGain.gain.value = clamp(wet, 0, 1);
  dryGain.connect(soundState.dry);
  wetGain.connect(soundState.wet);
  return { dryGain, wetGain };
}

function connectSoundNode(ctx, node, { wet = 0, pan = 0 } = {}) {
  let outputNode = node;
  if (ctx.createStereoPanner) {
    const panner = ctx.createStereoPanner();
    panner.pan.value = clamp(pan, -1, 1);
    outputNode.connect(panner);
    outputNode = panner;
  }

  const output = soundOutput(ctx, wet);
  outputNode.connect(output.dryGain);
  outputNode.connect(output.wetGain);
}

function scheduleTone(
  ctx,
  { delay = 0, duration = 0.16, type = "sine", start = 440, end = start, volume = 0.08, attack = 0.008, wet = 0, pan = 0 },
) {
  if (!ctx) return;
  const t = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(Math.max(20, start), t);
  osc.frequency.exponentialRampToValueAtTime(Math.max(20, end), t + duration);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.linearRampToValueAtTime(volume, t + Math.min(attack, duration * 0.45));
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.connect(gain);
  connectSoundNode(ctx, gain, { wet, pan });
  osc.start(t);
  osc.stop(t + duration + 0.02);
}

function scheduleNoise(
  ctx,
  { delay = 0, duration = 0.08, volume = 0.04, frequency = 1600, endFrequency = frequency, type = "bandpass", q = 3.5, attack = 0.004, wet = 0, pan = 0, color = "white" },
) {
  if (!ctx) return;
  const t = ctx.currentTime + delay;
  const length = Math.max(1, Math.floor(ctx.sampleRate * duration));
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < length; i += 1) {
    const random = Math.random() * 2 - 1;
    if (color === "brown") last = last * 0.92 + random * 0.08;
    else if (color === "pink") last = last * 0.72 + random * 0.28;
    else last = random;
    const fade = Math.pow(1 - i / length, 1.7);
    data[i] = last * fade;
  }
  const source = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  source.buffer = buffer;
  filter.type = type;
  filter.frequency.setValueAtTime(frequency, t);
  filter.frequency.exponentialRampToValueAtTime(Math.max(20, endFrequency), t + duration);
  filter.Q.setValueAtTime(q, t);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.linearRampToValueAtTime(volume, t + Math.min(attack, duration * 0.4));
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  source.connect(filter).connect(gain);
  connectSoundNode(ctx, gain, { wet, pan });
  source.start(t);
  source.stop(t + duration + 0.02);
}

function scheduleResonance(ctx, frequency, delay, duration, volume, options = {}) {
  const partials = options.partials || [1, 1.48, 2.03];
  partials.forEach((partial, index) => {
    scheduleTone(ctx, {
      delay: delay + index * 0.006,
      duration: duration * (1 - index * 0.12),
      type: "sine",
      start: frequency * partial,
      end: frequency * partial * (options.drift || 0.985),
      volume: volume / (index + 1.25),
      attack: options.attack || 0.003,
      wet: options.wet ?? 0.08,
      pan: (options.pan || 0) + (index - 1) * 0.08,
    });
  });
}

function activeWeaponTypeKey() {
  const weapon = equippedItemForSlotKey("weapon");
  return weapon?.weaponType ? weaponTypeByKey(weapon.weaponType, weapon.classKey).key : "unarmed";
}

function playAttackSound(kind = "hit", weaponTypeKey = activeWeaponTypeKey()) {
  const ctx = audioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  if (now - soundState.lastAttackAt < 0.055) return;
  soundState.lastAttackAt = now;

  const crit = kind === "crit";
  const impact = crit ? 1.25 : 1;

  if (weaponTypeKey === "hammer") {
    scheduleTone(ctx, { duration: 0.28, type: "sine", start: 76, end: 38, volume: 0.12 * impact, attack: 0.002, wet: 0.03 });
    scheduleNoise(ctx, { delay: 0.003, duration: 0.18, volume: 0.075 * impact, frequency: 180, endFrequency: 95, type: "lowpass", q: 0.8, color: "brown" });
    scheduleNoise(ctx, { delay: 0.01, duration: 0.13, volume: 0.05 * impact, frequency: 760, endFrequency: 420, type: "bandpass", q: 1.4, color: "pink" });
    scheduleResonance(ctx, 178, 0.018, 0.18, 0.05 * impact, { wet: 0.1, partials: [1, 1.37, 2.12], drift: 0.94 });
    if (crit) scheduleResonance(ctx, 310, 0.065, 0.28, 0.03, { wet: 0.16, partials: [1, 1.5, 2.26], drift: 0.97 });
    return;
  }

  if (weaponTypeKey === "greatsword") {
    scheduleNoise(ctx, { duration: 0.19, volume: 0.045 * impact, frequency: 3600, endFrequency: 820, type: "bandpass", q: 1.05, color: "pink", wet: 0.04, pan: -0.12 });
    scheduleNoise(ctx, { delay: 0.024, duration: 0.055, volume: 0.052 * impact, frequency: 2450, endFrequency: 1700, type: "bandpass", q: 6, wet: 0.02 });
    scheduleResonance(ctx, 720, 0.018, 0.18, 0.038 * impact, { wet: 0.12, partials: [1, 1.91, 2.84], drift: 0.992, pan: 0.08 });
    if (crit) scheduleResonance(ctx, 1240, 0.07, 0.3, 0.028, { wet: 0.2, partials: [1, 1.52, 2.32], drift: 1.006 });
    return;
  }

  if (weaponTypeKey === "axe") {
    scheduleTone(ctx, { duration: 0.19, type: "sine", start: 116, end: 58, volume: 0.09 * impact, attack: 0.002, wet: 0.04 });
    scheduleNoise(ctx, { delay: 0.003, duration: 0.12, volume: 0.065 * impact, frequency: 1180, endFrequency: 520, type: "bandpass", q: 1.8, color: "pink" });
    scheduleNoise(ctx, { delay: 0.022, duration: 0.09, volume: 0.038 * impact, frequency: 360, endFrequency: 240, type: "lowpass", q: 0.7, color: "brown" });
    scheduleResonance(ctx, 460, 0.028, 0.13, 0.035 * impact, { wet: 0.09, partials: [1, 1.72, 2.41], drift: 0.96 });
    if (crit) scheduleNoise(ctx, { delay: 0.055, duration: 0.2, volume: 0.025, frequency: 2600, endFrequency: 1400, type: "bandpass", q: 2.6, wet: 0.16 });
    return;
  }

  if (weaponTypeKey === "staff") {
    scheduleNoise(ctx, { duration: 0.24, volume: 0.025 * impact, frequency: 6200, endFrequency: 2600, type: "bandpass", q: 1.2, color: "pink", wet: 0.22 });
    scheduleResonance(ctx, 520, 0, 0.34, 0.04 * impact, { wet: 0.34, partials: [1, 1.5, 2, 2.98], drift: 1.012 });
    scheduleResonance(ctx, 880, 0.08, 0.3, 0.028 * impact, { wet: 0.38, partials: [1, 1.34, 1.99], drift: 1.018, pan: 0.16 });
    if (crit) scheduleNoise(ctx, { delay: 0.11, duration: 0.28, volume: 0.026, frequency: 7600, endFrequency: 4200, type: "highpass", q: 0.8, color: "pink", wet: 0.42 });
    return;
  }

  if (weaponTypeKey === "orb") {
    scheduleNoise(ctx, { duration: 0.28, volume: 0.022 * impact, frequency: 5200, endFrequency: 1900, type: "bandpass", q: 0.9, color: "pink", wet: 0.36 });
    [740, 1110, 1480].forEach((freq, index) => {
      scheduleResonance(ctx, freq, index * 0.035, crit ? 0.28 : 0.2, (crit ? 0.031 : 0.022) / (index + 1), {
        wet: 0.42,
        partials: [1, 1.25, 1.75],
        drift: 1.01,
        pan: index * 0.12 - 0.12,
      });
    });
    return;
  }

  scheduleTone(ctx, { duration: 0.16, type: "sine", start: 104, end: 56, volume: 0.08 * impact, attack: 0.002, wet: 0.03 });
  scheduleNoise(ctx, { delay: 0.004, duration: 0.095, volume: 0.045 * impact, frequency: 980, endFrequency: 420, type: "bandpass", q: 1.2, color: "pink" });
  if (crit) scheduleResonance(ctx, 620, 0.052, 0.18, 0.025, { wet: 0.12, partials: [1, 1.62, 2.2], drift: 0.99 });
}

function playPickupSound(type = "item", rarity = "") {
  const ctx = audioContext();
  if (!ctx) return;

  if (type === "gold") {
    [1320, 1840, 2470, 3100].forEach((freq, index) => {
      scheduleResonance(ctx, freq, index * 0.018, 0.16 - index * 0.018, 0.034, {
        wet: 0.14,
        partials: [1, 1.34, 2.13],
        drift: 0.992,
        pan: index % 2 ? 0.16 : -0.12,
      });
    });
    scheduleNoise(ctx, { delay: 0.006, duration: 0.07, volume: 0.022, frequency: 6200, endFrequency: 3600, type: "bandpass", q: 4, wet: 0.08 });
    return;
  }

  if (type === "equipment") {
    scheduleNoise(ctx, { duration: 0.12, volume: 0.034, frequency: 1600, endFrequency: 760, type: "bandpass", q: 1.5, color: "pink" });
    scheduleTone(ctx, { delay: 0.006, duration: 0.16, type: "sine", start: 156, end: 96, volume: 0.052, attack: 0.003, wet: 0.04 });
    scheduleResonance(ctx, rarity === "legend" ? 820 : 520, 0.025, 0.22, rarity === "legend" ? 0.038 : 0.026, {
      wet: rarity === "legend" ? 0.22 : 0.1,
      partials: [1, 1.58, 2.4],
      drift: 0.995,
    });
    return;
  }

  const base = type === "gem" ? 780 : type === "egg" ? 520 : 420;
  scheduleNoise(ctx, { duration: 0.08, volume: 0.018, frequency: type === "material" ? 900 : 3200, endFrequency: type === "material" ? 440 : 1900, type: "bandpass", q: 1.7, color: "pink" });
  scheduleResonance(ctx, base, 0.012, type === "gem" ? 0.22 : 0.16, type === "gem" ? 0.03 : 0.022, {
    wet: type === "gem" ? 0.18 : 0.08,
    partials: type === "gem" ? [1, 1.5, 2.25] : [1, 1.42],
    drift: type === "gem" ? 1.006 : 0.97,
  });
}

function playLegendaryWeaponSound() {
  const ctx = audioContext();
  if (!ctx) return;

  scheduleTone(ctx, { duration: 0.5, type: "sine", start: 58, end: 34, volume: 0.11, attack: 0.008, wet: 0.18 });
  scheduleNoise(ctx, { delay: 0.018, duration: 0.42, volume: 0.04, frequency: 2400, endFrequency: 680, type: "bandpass", q: 0.8, color: "pink", wet: 0.24 });
  [523, 659, 784, 1046, 1318].forEach((freq, index) => {
    scheduleResonance(ctx, freq, 0.06 + index * 0.052, 0.48, 0.038, {
      wet: 0.5,
      partials: [1, 1.5, 2.02],
      drift: 1.003,
      pan: index * 0.09 - 0.18,
    });
  });
  scheduleNoise(ctx, { delay: 0.16, duration: 0.55, volume: 0.026, frequency: 7200, endFrequency: 4200, type: "highpass", q: 0.7, color: "pink", wet: 0.48 });
}

function playIncubatorSound(kind = "place") {
  const ctx = audioContext();
  if (!ctx) return;

  if (kind === "place") {
    scheduleTone(ctx, { duration: 0.16, type: "sine", start: 210, end: 132, volume: 0.035, attack: 0.004, wet: 0.05 });
    scheduleNoise(ctx, { delay: 0.008, duration: 0.08, volume: 0.02, frequency: 950, endFrequency: 520, type: "bandpass", q: 1.2, color: "pink" });
    scheduleResonance(ctx, 430, 0.028, 0.18, 0.018, { wet: 0.14, partials: [1, 1.46], drift: 0.98 });
    return;
  }

  if (kind === "fail") {
    scheduleTone(ctx, { duration: 0.24, type: "sine", start: 180, end: 78, volume: 0.05, attack: 0.004, wet: 0.04 });
    scheduleNoise(ctx, { delay: 0.018, duration: 0.2, volume: 0.032, frequency: 520, endFrequency: 220, type: "lowpass", q: 0.7, color: "brown" });
    return;
  }

  scheduleNoise(ctx, { duration: 0.12, volume: 0.026, frequency: 1400, endFrequency: 680, type: "bandpass", q: 1.3, color: "pink", wet: 0.12 });
  [520, 784, 1046].forEach((freq, index) => {
    scheduleResonance(ctx, freq, 0.025 + index * 0.05, 0.34, 0.032, {
      wet: 0.34,
      partials: [1, 1.5, 2],
      drift: 1.008,
      pan: index * 0.12 - 0.12,
    });
  });
  scheduleNoise(ctx, { delay: 0.12, duration: 0.26, volume: 0.018, frequency: 6800, endFrequency: 3600, type: "highpass", q: 0.8, color: "pink", wet: 0.38 });
}

function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function weightedPick(list, bonus = 0) {
  const adjusted = list.map((item, index) => ({
    item,
    weight: item.weight + (index * bonus),
  }));
  const total = adjusted.reduce((sum, entry) => sum + entry.weight, 0);
  let roll = Math.random() * total;

  for (const entry of adjusted) {
    roll -= entry.weight;
    if (roll <= 0) return entry.item;
  }

  return adjusted[0].item;
}

function getDungeon(id = state.dungeonId) {
  return dungeons.find((dungeon) => dungeon.id === id) || dungeons[0];
}

function xpNeed(level = state.level) {
  if (level >= MAX_LEVEL) return 0;
  return Math.floor(54 + Math.pow(level, 1.55) * 32);
}

function availableDungeonLevelFor(source, dungeon) {
  return clamp(source.level + Math.floor(source.kills / 12), dungeon.min, dungeon.max);
}

function availableDungeonLevel(dungeon = getDungeon()) {
  return availableDungeonLevelFor(state, dungeon);
}

function recommendedPower(dungeon) {
  return Math.floor(dungeon.min * 14 + Math.pow(dungeon.min, 1.34) * 8);
}

function monsterTierForType(typeKey = "minion") {
  if (typeKey === "boss") return "boss";
  if (typeKey === "elite") return "elite";
  if (String(typeKey).startsWith("treasure")) return "treasure";
  return "minion";
}

function dungeonMonsterPool(dungeonId = state.dungeonId, tier = "") {
  const pool = monsterCatalog[dungeonId] || monsterCatalog.mine;
  return tier ? pool.filter((monster) => monster.tier === tier) : pool;
}

function rollMonsterTemplate(dungeonId, typeKey) {
  const tier = monsterTierForType(typeKey);
  if (tier === "treasure") {
    const dungeon = getDungeon(dungeonId);
    const names = {
      treasure_equipment: `${dungeon.name}装备宝箱怪`,
      treasure_gold: `${dungeon.name}金币宝箱怪`,
      treasure_material: `${dungeon.name}材料宝箱怪`,
    };
    return { key: `${dungeonId}-${typeKey}`, name: names[typeKey] || "副本宝箱怪", tier: "treasure", hue: 30, scale: 1.02 };
  }

  return pick(dungeonMonsterPool(dungeonId, tier));
}

function monsterTemplateFor(monster = state.monster) {
  if (!monster) return null;
  const pool = dungeonMonsterPool(monster.dungeonId, "");
  return (
    pool.find((entry) => entry.key === monster.templateKey) ||
    pool.find((entry) => monster.name?.includes(entry.name)) ||
    null
  );
}

function monsterVisualFor(monster = state.monster) {
  if (!monster) return { tier: "minion", ...monsterTierVisuals.minion };
  const template = monsterTemplateFor(monster) || {};
  const tier = monster.visualTier || template.tier || monsterTierForType(monster?.type);
  const tierVisual = monsterTierVisuals[tier] || monsterTierVisuals.minion;
  return {
    tier,
    scale: monster.visualScale || template.scale || tierVisual.scale,
    hue: monster.visualHue ?? template.hue ?? tierVisual.hue,
    saturation: monster.visualSaturation || tierVisual.saturation,
    glow: tierVisual.glow,
  };
}

function createMonster(dungeonId = state.dungeonId, source = state) {
  const dungeon = getDungeon(dungeonId);
  const level = availableDungeonLevelFor(source, dungeon);
  const typeKey = rollMonsterType(source);
  const type = monsterTypes[typeKey];
  const boss = typeKey === "boss";
  const treasure = typeKey.startsWith("treasure");
  const template = rollMonsterTemplate(dungeonId, typeKey);
  const visual = monsterVisualFor({ type: typeKey, dungeonId, templateKey: template.key, visualTier: template.tier });
  const maxHp = Math.floor((60 + level * 34 + Math.pow(level, 1.36) * 9) * type.hp);
  const attack = Math.floor((8 + level * 3.2 + Math.pow(level, 1.18) * 2.2) * type.attack);
  const baseName = template.name || (treasure ? type.name : pick(dungeon.monsters));
  return {
    id: uid("monster"),
    name: `${boss ? "副本首领 " : typeKey === "elite" ? "精英 " : ""}${baseName}`,
    dungeonId,
    level,
    boss,
    type: typeKey,
    templateKey: template.key,
    visualTier: visual.tier,
    visualHue: visual.hue,
    visualScale: visual.scale,
    visualSaturation: visual.saturation,
    attack,
    hp: maxHp,
    maxHp,
  };
}

function monsterArtFor(monster = state.monster) {
  const assets = generatedMonsterAssets[monster?.dungeonId] || generatedMonsterAssets.mine;
  const visual = monsterVisualFor(monster);
  const tier = visual.tier === "treasure" ? "elite" : visual.tier;
  return assets[tier] || assets.fallback || generatedMonsterAssets.mine.fallback;
}

function characterBackArtFor(classKey = state.playerClass) {
  return generatedCharacterAssets[classKey] || generatedCharacterAssets.warrior;
}

function petArtRarityKey(rarityKey = "common") {
  if (rarityKey === "fine" || rarityKey === "rare") return rarityKey;
  if (rarityKey === "epic" || rarityKey === "legend") return "rare";
  return "common";
}

function petArtFor(typeKey, facing = "front", rarityKey = "common") {
  const rarity = petArtRarityKey(rarityKey);
  return (
    generatedPetAssets[typeKey]?.[rarity]?.[facing] ||
    generatedPetAssets[typeKey]?.common?.[facing] ||
    generatedPetAssets.dps[rarity]?.[facing] ||
    generatedPetAssets.dps.common[facing]
  );
}

function rasterAsset(value) {
  return typeof value === "string" && !value.startsWith(`data:image/${"svg"}`) ? value : "";
}

function equipmentGeneratedAsset(item) {
  if (!item) return "";
  const setSlug = equipmentSetSlugs[item.setName] || equipmentSetSlugs[setNames[0]];
  if (item.slot === "weapon") {
    const weaponType = weaponTypeByKey(item.weaponType, item.classKey);
    return `./assets/generated-weapons-named/${setSlug}-${weaponType.key}.png`;
  }
  const classKey = classes[item.classKey] ? item.classKey : state.playerClass;
  const namedAsset = `./assets/generated-equipment-named/${setSlug}-${classKey}-${item.slot}.png`;
  if (item.setName && equipmentSetSlugs[item.setName]) return namedAsset;
  const classAssets = generatedEquipmentAssets[item.classKey] || generatedEquipmentAssets[state.playerClass] || generatedEquipmentAssets.warrior;
  return classAssets[item.slot] || generatedEquipmentAssets.warrior[item.slot] || generatedEquipmentAssets.mage[item.slot] || "";
}

function materialAssetFor(materials = {}) {
  const materialKey = materialTypes.find((material) => (materials[material.key] || 0) > 0)?.key;
  return generatedItemAssets.materials[materialKey] || generatedItemAssets.material;
}

function gemAssetFor(gemKey) {
  return generatedItemAssets.gems[gemKey] || generatedItemAssets.gem;
}

function generatedItemIconHtml(kind = "item", payload = {}) {
  const src =
    kind === "gem"
      ? gemAssetFor(payload.gemKey)
      : kind === "material"
        ? materialAssetFor(payload.materials || {})
        : generatedItemAssets[kind] || generatedItemAssets.item;
  return `<span class="ground-loot-icon image-icon" aria-hidden="true"><img src="${src}" alt="" /></span>`;
}

function inventoryIconHtml(src, label = "") {
  return `<span class="inventory-icon" aria-hidden="true"><img src="${src}" alt="${label}" /></span>`;
}

function rollMonsterType(source = state) {
  const nextKill = (source.kills || 0) + 1;
  if (Math.random() < 0.006) return pick(["treasure_equipment", "treasure_gold", "treasure_material"]);
  if (nextKill % 10 === 0) return "boss";
  if (Math.random() < 0.18) return "elite";
  return "minion";
}

function rarityByKey(key) {
  return rarities.find((rarity) => rarity.key === key) || rarities[0];
}

function rarityIndex(key) {
  return Math.max(0, rarities.findIndex((rarity) => rarity.key === key));
}

function nextRarityKey(rarityKey) {
  const index = rarityIndex(rarityKey);
  return index >= 0 && index < rarities.length - 1 ? rarities[index + 1].key : null;
}

function rollEquipmentRarity(slot, bonus = 0) {
  if (slot === "weapon") {
    if (Math.random() < LEGENDARY_WEAPON_CHANCE) return "legend";
    return weightedPick(nonLegendaryRarities, bonus).key;
  }
  return weightedPick(rarities, bonus).key;
}

function materialByKey(key) {
  return materialTypes.find((material) => material.key === key) || materialTypes[0];
}

function emptyMaterials() {
  return Object.fromEntries(materialTypes.map((material) => [material.key, 0]));
}

function normalizeMaterials(value) {
  const materials = emptyMaterials();
  if (typeof value === "number") {
    materials.cloth = Math.max(0, Math.floor(value));
    materials.iron = Math.floor(materials.cloth * 0.55);
    materials.leather = Math.floor(materials.cloth * 0.45);
    materials.crystal = Math.floor(materials.cloth * 0.3);
    materials.wood = Math.floor(materials.cloth * 0.4);
    return materials;
  }

  if (value && typeof value === "object") {
    for (const material of materialTypes) {
      materials[material.key] = Math.max(0, Math.floor(value[material.key] || 0));
    }
  }
  return materials;
}

function normalizeGroundLoot(loot) {
  const source = loot && typeof loot === "object" && !Array.isArray(loot) ? loot : {};
  const items = Array.isArray(source.items) ? source.items.map(normalizeGroundLootItem).filter(Boolean) : [];
  return {
    gold: Math.max(0, Math.floor(source.gold || 0)),
    items: stackGroundLootItems(items).slice(-36),
  };
}

function normalizeGroundLootItem(loot) {
  if (!loot || typeof loot !== "object") return null;

  const x = Number(loot.x);
  const y = Number(loot.y);
  const payloads = groundLootPayloads(loot);
  const quantity = Math.max(1, Math.floor(loot.quantity || payloads.length || 1));
  const normalized = {
    id: loot.id || uid("loot"),
    type: loot.type || "item",
    rarity: loot.rarity || "",
    title: loot.title || "掉落物",
    detail: loot.detail || "",
    text: loot.text || "",
    payload: loot.payload && typeof loot.payload === "object" ? loot.payload : payloads[0] || {},
    payloads: payloads.length ? payloads : undefined,
    quantity,
    stackKey: loot.stackKey || "",
    x: clamp(Number.isFinite(x) ? x : 50, 18, 82),
    y: clamp(Number.isFinite(y) ? y : 58, 36, 84),
    createdAt: loot.createdAt || Date.now(),
  };
  normalized.stackKey = normalized.stackKey || groundLootStackKey(normalized);
  const payloadCount = groundLootPayloads(normalized).length;
  return {
    ...normalized,
    quantity: Math.max(1, payloadCount || quantity),
  };
}

function stableLootJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableLootJson).join(",")}]`;
  if (!value || typeof value !== "object") return JSON.stringify(value);
  return `{${Object.keys(value)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableLootJson(value[key])}`)
    .join(",")}}`;
}

function equipmentStackSnapshot(item = {}) {
  return {
    name: item.name || "",
    classKey: item.classKey || "",
    slot: item.slot || "",
    weaponType: item.weaponType || "",
    rarity: item.rarity || "",
    setName: item.setName || "",
    level: Math.floor(item.level || 1),
    stats: item.stats || {},
    autoClick: item.autoClick || null,
  };
}

function groundLootStackKey(loot) {
  if (!loot || typeof loot !== "object") return "";
  const payload = loot.payload || groundLootPayloads(loot)[0] || {};

  if (loot.type === "equipment" && payload.item) {
    return `equipment:${stableLootJson(equipmentStackSnapshot(payload.item))}`;
  }
  if (loot.type === "gem") return `gem:${payload.gemKey || loot.title || "gem"}`;
  if (loot.type === "material") {
    const keys = Object.entries(payload.materials || {})
      .filter(([, amount]) => amount > 0)
      .map(([key]) => key)
      .sort();
    return `material:${keys.join(",") || loot.title || "material"}`;
  }
  if (loot.type === "egg") return "egg:pet";
  return `${loot.type || "item"}:${loot.title || ""}:${loot.detail || ""}`;
}

function groundLootPayloads(loot) {
  if (!loot || typeof loot !== "object") return [];
  if (Array.isArray(loot.payloads)) return loot.payloads.filter((payload) => payload && typeof payload === "object");
  return loot.payload && typeof loot.payload === "object" ? [loot.payload] : [];
}

function mergeGroundLootStack(base, incoming) {
  const nextPayloads = [...groundLootPayloads(base), ...groundLootPayloads(incoming)];
  const nextQuantity = Math.max(1, Math.floor(base.quantity || 1)) + Math.max(1, Math.floor(incoming.quantity || 1));
  base.payloads = nextPayloads;
  base.payload = nextPayloads[0] || base.payload || incoming.payload || {};
  base.quantity = Math.max(1, nextPayloads.length || nextQuantity);
  base.createdAt = Math.min(base.createdAt || Date.now(), incoming.createdAt || Date.now());
  return base;
}

function stackGroundLootItems(items) {
  const stacks = [];
  const byKey = new Map();
  for (const item of items) {
    const key = item.stackKey || groundLootStackKey(item);
    if (!key) {
      stacks.push(item);
      continue;
    }
    const existing = byKey.get(key);
    if (existing) {
      mergeGroundLootStack(existing, item);
    } else {
      item.stackKey = key;
      byKey.set(key, item);
      stacks.push(item);
    }
  }
  return stacks;
}

function groundLootPosition(index = 0) {
  const columns = 6;
  const row = Math.floor(index / columns) % 3;
  const col = index % columns;
  return {
    x: 30 + col * 7.4 + Math.random() * 2.2,
    y: 48 + row * 9.4 + Math.random() * 4.2,
  };
}

function addGroundGold(amount) {
  state.groundLoot = normalizeGroundLoot(state.groundLoot);
  state.groundLoot.gold += Math.max(0, Math.floor(amount || 0));
}

function addGroundLoot(drop) {
  if (!drop) return;

  state.groundLoot = normalizeGroundLoot(state.groundLoot);
  const position = groundLootPosition(state.groundLoot.items.length);
  const item = normalizeGroundLootItem({
    ...drop,
    id: uid("loot"),
    createdAt: Date.now(),
    ...position,
  });
  const existing = state.groundLoot.items.find((entry) => entry.stackKey && entry.stackKey === item.stackKey);
  if (existing) mergeGroundLootStack(existing, item);
  else state.groundLoot.items.push(item);
  state.groundLoot.items = state.groundLoot.items.slice(-36);
}

function addMaterials(bundle) {
  state.materials = normalizeMaterials(state.materials);
  for (const [key, amount] of Object.entries(bundle || {})) {
    if (!materialTypes.some((material) => material.key === key)) continue;
    state.materials[key] = Math.max(0, (state.materials[key] || 0) + Math.floor(amount || 0));
  }
}

function canAffordMaterials(bundle) {
  const materials = normalizeMaterials(state.materials);
  return Object.entries(bundle || {}).every(([key, amount]) => (materials[key] || 0) >= amount);
}

function spendMaterials(bundle) {
  if (!canAffordMaterials(bundle)) return false;
  state.materials = normalizeMaterials(state.materials);
  for (const [key, amount] of Object.entries(bundle || {})) {
    state.materials[key] -= amount;
  }
  return true;
}

function mergeMaterialBundles(...bundles) {
  const merged = emptyMaterials();
  for (const bundle of bundles) {
    for (const [key, amount] of Object.entries(bundle || {})) {
      if (Object.prototype.hasOwnProperty.call(merged, key)) merged[key] += Math.floor(amount || 0);
    }
  }
  return Object.fromEntries(Object.entries(merged).filter(([, amount]) => amount > 0));
}

function formatMaterials(bundle, compact = false) {
  const entries = Object.entries(bundle || {}).filter(([, amount]) => amount > 0);
  if (!entries.length) return "无";
  return entries
    .map(([key, amount]) => `${compact ? materialByKey(key).short : materialByKey(key).name} ${amount}`)
    .join(compact ? " / " : "、");
}

function totalMaterialCount(source = state.materials) {
  return Object.values(normalizeMaterials(source)).reduce((sum, amount) => sum + amount, 0);
}

function slotByKey(key) {
  return slots.find((slot) => slot.key === key) || slots[0];
}

function equippedSlotByKey(key) {
  return equippedSlotDefs.find((slot) => slot.key === key) || equippedSlotDefs[0];
}

function bagCapacity() {
  return Math.max(100, Math.floor((state.bagCapacity || 100) / 50) * 50);
}

function backpackItems() {
  return state.equipment.filter((item) => !isEquipped(item.id));
}

function backpackFreeSlots() {
  return Math.max(0, bagCapacity() - backpackItems().length);
}

function canFitBackpackItems(count = 1) {
  return backpackFreeSlots() >= Math.max(1, Math.floor(count || 1));
}

function filteredBackpackItems() {
  const classFilter = state.equipmentFilter.classKey === "current" ? state.playerClass : state.equipmentFilter.classKey;

  return backpackItems()
    .filter((item) => state.equipmentFilter.slot === "all" || item.slot === state.equipmentFilter.slot)
    .filter((item) => state.equipmentFilter.rarity === "all" || item.rarity === state.equipmentFilter.rarity)
    .filter((item) => classFilter === "all" || item.classKey === classFilter)
    .filter((item) => matchesWearableFilter(item))
    .sort((a, b) => {
      return b.level - a.level || rarityIndex(b.rarity) - rarityIndex(a.rarity) || slotOrder(a.slot) - slotOrder(b.slot);
    });
}

function matchesWearableFilter(item) {
  if (state.equipmentFilter.wearable === "level") return canEquipAtCurrentLevel(item);
  if (state.equipmentFilter.wearable === "wearable") return canEquipItem(item);
  return true;
}

function canEquipAtCurrentLevel(item) {
  return Boolean(item && item.level <= state.level && equippedSlotDefs.some((slot) => slot.slot === item.slot));
}

function canEquipItem(item) {
  return Boolean(item && item.classKey === state.playerClass && item.level <= state.level && equippedSlotDefs.some((slot) => slot.slot === item.slot));
}

function slotPickerCandidates(slotDef) {
  return backpackItems()
    .filter((item) => item.slot === slotDef.slot && canEquipItem(item))
    .sort((a, b) => {
      return equipmentScore(b) - equipmentScore(a) || b.level - a.level || rarityIndex(b.rarity) - rarityIndex(a.rarity);
    });
}

function normalizeEquipmentUpgradeSeen(value) {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  return Object.fromEntries(
    equippedSlotDefs.map((slot) => {
      const entries = Array.isArray(source[slot.key]) ? source[slot.key].filter(Boolean).slice(-80) : [];
      return [slot.key, entries];
    }),
  );
}

function equipmentUpgradeSignature(item) {
  return item ? `${item.id}:${Math.round(equipmentScore(item) * 100)}` : "";
}

function slotUpgradeCandidates(slotDef) {
  const current = equippedItemForSlotKey(slotDef.key);
  const currentScore = equipmentScore(current);
  return slotPickerCandidates(slotDef).filter((item) => equipmentScore(item) > currentScore + 0.1);
}

function unseenSlotUpgradeCandidates(slotDef) {
  const seen = new Set(state.equipmentUpgradeSeen?.[slotDef.key] || []);
  return slotUpgradeCandidates(slotDef).filter((item) => !seen.has(equipmentUpgradeSignature(item)));
}

function hasSlotUpgradeNotice(slotDef) {
  return unseenSlotUpgradeCandidates(slotDef).length > 0;
}

function acknowledgeSlotUpgradeNotice(slotKey) {
  const slotDef = equippedSlotDefs.find((slot) => slot.key === slotKey);
  if (!slotDef) return false;

  const signatures = slotUpgradeCandidates(slotDef).map(equipmentUpgradeSignature).filter(Boolean);
  if (!signatures.length) return false;

  state.equipmentUpgradeSeen = normalizeEquipmentUpgradeSeen(state.equipmentUpgradeSeen);
  const previous = state.equipmentUpgradeSeen[slotKey] || [];
  const next = [...new Set([...previous, ...signatures])].slice(-80);
  const changed = next.length !== previous.length || next.some((signature, index) => signature !== previous[index]);
  state.equipmentUpgradeSeen[slotKey] = next;
  return changed;
}

function slotOrder(slot) {
  return Math.max(0, slots.findIndex((entry) => entry.key === slot));
}

function availableSlotsForClass(classKey) {
  return slots.filter((slot) => {
    if (slot.key === "helm") return classKey === "warrior";
    if (slot.key === "hat") return classKey === "mage";
    return true;
  });
}

function pickWeaponType(classKey) {
  const candidates = weaponTypes.filter((type) => type.classKey === classKey);
  return pick(candidates.length ? candidates : weaponTypes);
}

function weaponTypeByKey(key, classKey = state.playerClass) {
  return weaponTypes.find((type) => type.key === key) || pickWeaponType(classKey);
}

function getEquippedItems(source = state) {
  return equippedSlotDefs
    .map((slot) => source.equipped?.[slot.key])
    .filter(Boolean)
    .map((id) => source.equipment.find((item) => item.id === id))
    .filter(Boolean);
}

function equippedItemForSlotKey(slotKey) {
  const id = state.equipped[slotKey];
  return id ? state.equipment.find((item) => item.id === id) || null : null;
}

function equippedItemsForItem(item) {
  return equippedSlotDefs
    .filter((slot) => slot.slot === item.slot)
    .map((slot) => equippedItemForSlotKey(slot.key))
    .filter(Boolean);
}

function equippedItemsForSlot(slotKey) {
  return getEquippedItems().filter((item) => item.slot === slotKey);
}

function activePet(source = state) {
  return source.pets.find((pet) => pet.id === source.activePetId) || null;
}

function filteredPets() {
  return state.pets
    .filter((pet) => state.petFilter.rarity === "all" || pet.rarity === state.petFilter.rarity)
    .sort((a, b) => rarityIndex(b.rarity) - rarityIndex(a.rarity) || b.level - a.level || petTypeByKey(a.type).name.localeCompare(petTypeByKey(b.type).name));
}

function petSellValue(pet) {
  return Math.floor((20 + pet.level * 6) * rarityByKey(pet.rarity).sell);
}

function petPower(pet = activePet()) {
  if (!pet) return 0;
  const rarity = rarityByKey(pet.rarity);
  const type = petTypeByKey(pet.type);
  return Math.floor((pet.level * 2.6 + 8 + type.power) * rarity.mult);
}

function petTypeByKey(key) {
  return petTypes.find((type) => type.key === key) || petTypes[0];
}

function rollPetRarity() {
  const roll = Math.random();
  for (const rarity of petRarityRates) {
    if (roll < rarity.chance) return rarity.key;
  }
  return "common";
}

function normalizeEgg(egg) {
  if (!egg) return null;
  return {
    id: egg.id || uid("egg"),
    createdAt: egg.createdAt || Date.now(),
  };
}

function normalizeIncubatorSlots(slots) {
  const source = Array.isArray(slots) && slots.length ? slots : defaultState.incubatorSlots;
  return source.slice(0, MAX_INCUBATOR_SLOTS).map((slot, index) => ({
    id: slot?.id || `incubator-${index + 1}`,
    egg: normalizeEgg(slot?.egg),
    startedAt: slot?.egg ? slot.startedAt || Date.now() : null,
    timeLevel: clamp(Math.floor(slot?.timeLevel || 0), 0, MAX_INCUBATOR_TIME_LEVEL),
    successLevel: clamp(Math.floor(slot?.successLevel || 0), 0, MAX_INCUBATOR_SUCCESS_LEVEL),
  }));
}

function incubatorSlots() {
  state.incubatorSlots = normalizeIncubatorSlots(state.incubatorSlots);
  return state.incubatorSlots;
}

function incubatorSlot() {
  return incubatorSlots()[0];
}

function incubatorSlotById(id) {
  return incubatorSlots().find((slot) => slot.id === id) || incubatorSlot();
}

function incubatorSlotNumber(slot) {
  return Math.max(1, incubatorSlots().findIndex((entry) => entry.id === slot?.id) + 1);
}

function incubatorDurationForLevel(level = 0) {
  return Math.max(MIN_EGG_HATCH_DURATION_MS, EGG_HATCH_DURATION_MS - clamp(level, 0, MAX_INCUBATOR_TIME_LEVEL) * INCUBATOR_TIME_REDUCTION_MS);
}

function incubatorHatchDuration(slot) {
  return incubatorDurationForLevel(slot?.timeLevel || 0);
}

function incubatorStinkChance(slot) {
  return clamp(STINK_EGG_CHANCE - (slot?.successLevel || 0) * INCUBATOR_SUCCESS_STEP, MIN_STINK_EGG_CHANCE, STINK_EGG_CHANCE);
}

function incubatorSuccessChance(slot) {
  return 1 - incubatorStinkChance(slot);
}

function incubatorRemainingMs(slot, now = Date.now()) {
  if (!slot?.egg || !slot.startedAt) return 0;
  return Math.max(0, slot.startedAt + incubatorHatchDuration(slot) - now);
}

function incubatorProgress(slot, now = Date.now()) {
  if (!slot?.egg || !slot.startedAt) return 0;
  const duration = incubatorHatchDuration(slot);
  return clamp(((duration - incubatorRemainingMs(slot, now)) / duration) * 100, 0, 100);
}

function readyIncubatorSlot() {
  return incubatorSlots().find((slot) => slot.egg && incubatorRemainingMs(slot) <= 0) || null;
}

function emptyIncubatorSlot() {
  return incubatorSlots().find((slot) => !slot.egg) || null;
}

function incubatorSlotUpgradeCost() {
  const current = incubatorSlots().length;
  if (current >= MAX_INCUBATOR_SLOTS) return null;

  const target = current + 1;
  const step = target - 1;
  const materials = {
    cloth: 12 + step * 8,
    wood: 6 + step * 5,
  };
  if (target >= 4) materials.iron = 5 + (target - 3) * 5;
  if (target >= 6) materials.leather = 6 + (target - 5) * 5;
  if (target >= 8) materials.crystal = 4 + (target - 7) * 4;

  return { target, materials };
}

function incubatorSlotLevelCost(slot, kind) {
  const slotNumber = incubatorSlotNumber(slot);
  const isTime = kind === "time";
  const level = isTime ? slot?.timeLevel || 0 : slot?.successLevel || 0;
  const maxLevel = isTime ? MAX_INCUBATOR_TIME_LEVEL : MAX_INCUBATOR_SUCCESS_LEVEL;
  if (level >= maxLevel) return null;

  const next = level + 1;
  const materials = isTime
    ? {
        cloth: 8 + next * 5 + slotNumber * 2,
        wood: 5 + next * 4 + slotNumber,
      }
    : {
        leather: 8 + next * 5 + slotNumber,
        iron: 6 + next * 4 + slotNumber,
      };
  if (isTime && next >= 4) materials.crystal = 2 + Math.floor(next / 2) + Math.ceil(slotNumber / 4);
  if (!isTime && next >= 3) materials.crystal = 3 + Math.floor(next / 2) + Math.ceil(slotNumber / 4);

  return { next, materials };
}

function incubatorSlotStatUpgradeCost(slot) {
  const timeCost = incubatorSlotLevelCost(slot, "time");
  const successCost = incubatorSlotLevelCost(slot, "success");
  if (!timeCost && !successCost) return null;

  return {
    timeNext: timeCost ? timeCost.next : slot?.timeLevel || 0,
    successNext: successCost ? successCost.next : slot?.successLevel || 0,
    materials: mergeMaterialBundles(timeCost?.materials, successCost?.materials),
  };
}

function petMaxHp(pet) {
  const rarity = rarityByKey(pet.rarity);
  const type = petTypeByKey(pet.type);
  const skillBonus = pet.type === "tank" && hasPetSkill(pet, 70) ? 1.28 : 1;
  return Math.floor((80 + pet.level * 22 + petPower(pet) * 2.8) * type.hp * rarity.mult * skillBonus);
}

function petAttackDamage(pet) {
  const rarity = rarityByKey(pet.rarity);
  const type = petTypeByKey(pet.type);
  const skillBonus = pet.type === "dps" && hasPetSkill(pet, 70) ? 1.28 : hasPetSkill(pet, 5) ? 1.12 : 1;
  return Math.floor((8 + pet.level * 3.4 + petPower(pet) * type.attack) * rarity.mult * skillBonus);
}

function petAttackInterval(pet) {
  const type = petTypeByKey(pet.type);
  const speedBonus = hasPetSkill(pet, 50) && type.key === "dps" ? 260 : 0;
  return Math.max(620, Math.floor(1750 - pet.level * 5 - speedBonus));
}

function petDpsText(pet = activePet()) {
  if (!pet || state.petHp <= 0) return "0";
  const dps = (petAttackDamage(pet) * 1000) / petAttackInterval(pet);
  return dps >= 10 ? `${Math.round(dps)}` : dps.toFixed(1);
}

function hasPetSkill(pet, level) {
  return pet && pet.level >= level;
}

function unlockedPetSkills(pet) {
  const type = petTypeByKey(pet.type);
  return type.skills.filter(([level]) => pet.level >= level);
}

function petSkillDetail(pet, level, name, description) {
  const unlocked = hasPetSkill(pet, level);
  const details = {
    dps: {
      1: `属性：自动攻击 ${petAttackDamage(pet)} 伤害，间隔 ${formatInterval(petAttackInterval(pet))}。`,
      5: "属性：宠物攻击 +12%。",
      10: "属性：18% 概率追加一次 55% 伤害攻击。",
      30: "属性：攻击精英怪和 BOSS 时伤害 +18%。",
      40: "属性：主角点击伤害 +6%。",
      50: "属性：宠物攻击间隔减少 260ms。",
      70: "属性：宠物最终攻击提升到更高倍率。",
    },
    support: {
      1: "属性：主角闪避 +4%。",
      5: "属性：主角点击伤害 +8%。",
      10: `属性：周期性治疗主角 ${hasPetSkill(pet, 70) ? "5.5%" : "3.5%"} 最大生命。`,
      30: "属性：怪物对主角造成的伤害 -10%。",
      40: "属性：主角暴击率 +3.5%。",
      50: "属性：濒死回复预留技能，后续接入冷却触发。",
      70: "属性：治疗效果提升到 5.5%，辅助增益增强。",
    },
    tank: {
      1: `属性：宠物最大生命 ${petMaxHp(pet)}，可替主角承伤。`,
      5: "属性：82% 概率嘲讽怪物优先攻击宠物。",
      10: "属性：宠物受到伤害 -28%。",
      30: "属性：主角受到伤害 -12%。",
      40: "属性：受到攻击时反弹 18% 伤害。",
      50: "属性：低生命减伤预留技能，后续接入濒死状态。",
      70: "属性：宠物最大生命 +28%，嘲讽稳定性提升。",
    },
  };

  return {
    unlocked,
    title: `Lv.${level} ${name}`,
    description,
    effect: details[pet.type]?.[level] || "属性：待配置。",
  };
}

function petHealCost(pet) {
  const rarityStep = rarityIndex(pet.rarity) + 1;
  return {
    leather: 4 + Math.ceil(pet.level * 0.4) + rarityStep * 2,
    crystal: 2 + Math.ceil(pet.level * 0.22) + rarityStep,
  };
}

function healPet(id) {
  const pet = state.pets.find((entry) => entry.id === id);
  if (!pet) return;

  const cost = petHealCost(pet);
  if (!canAffordMaterials(cost)) return;

  spendMaterials(cost);
  if (state.activePetId !== id) state.activePetId = id;
  state.petHp = petMaxHp(pet);
  addLog(`治疗 ${pet.name}，消耗 ${formatMaterials(cost)}。`);
  showToast(`${pet.name} 已恢复战斗`);
  saveState();
  render();
}

function nextPetRarityKey(rarityKey) {
  return nextRarityKey(rarityKey);
}

function evolutionMaterialFor(pet) {
  const next = nextPetRarityKey(pet.rarity);
  if (!next) return null;
  return state.pets
    .filter((entry) => entry.id !== pet.id && entry.type === pet.type && entry.rarity === pet.rarity)
    .sort((a, b) => Number(a.id === state.activePetId) - Number(b.id === state.activePetId))[0] || null;
}

function evolvePet(id) {
  const pet = state.pets.find((entry) => entry.id === id);
  if (!pet) return;

  const nextRarity = nextPetRarityKey(pet.rarity);
  const material = evolutionMaterialFor(pet);
  if (!nextRarity || !material) return;

  state.pets = state.pets.filter((entry) => entry.id !== material.id);
  pet.rarity = nextRarity;
  pet.level = 1;
  pet.xp = 0;
  pet.name = `${rarityText(nextRarity)}${petTypeByKey(pet.type).name}`;
  if (state.activePetId === material.id || state.activePetId === pet.id) {
    state.activePetId = pet.id;
    state.petHp = petMaxHp(pet);
  }
  expandedPetSkill = null;
  addLog(`${pet.name}合体进化成功，等级重置为 1。`);
  showDropToast({
    rarity: pet.rarity,
    title: pet.name,
    detail: "合体进化 · 稀有度提升",
  });
  saveState();
  render();
}

function setBonuses(source = state) {
  const counts = {};
  for (const item of getEquippedItems(source)) {
    counts[item.setName] = (counts[item.setName] || 0) + 1;
  }

  let attackBonus = 0;
  let critBonus = 0;
  let text = "无";
  const active = Object.entries(counts)
    .filter(([, count]) => count >= 2)
    .map(([name, count]) => ({ name, count }));

  if (active.length) {
    attackBonus = active.reduce((sum, item) => sum + item.count * 3, 0);
    critBonus = active.reduce((sum, item) => sum + (item.count >= 4 ? 0.08 : 0.035), 0);
    text = active.map((item) => `${item.name}${item.count}件`).join(" / ");
  }

  return { attackBonus, critBonus, text, active };
}

function totalStats(source = state) {
  const totals = {
    attack: 0,
    magic: 0,
    armor: 0,
    hp: 0,
    crit: 0,
  };

  for (const item of getEquippedItems(source)) {
    const durabilityRate = durabilityRatio(item);
    for (const key of Object.keys(totals)) {
      totals[key] += Math.floor((item.stats[key] || 0) * durabilityRate);
    }
  }

  const pet = activePet(source);
  if (pet) {
    totals.attack += petPower(pet);
    totals.magic += petPower(pet);
  }

  const bonus = setBonuses(source);
  totals.attack += bonus.attackBonus;
  totals.magic += bonus.attackBonus;
  totals.crit += bonus.critBonus;

  return totals;
}

function maxDurabilityFor(item) {
  return Math.floor(60 + item.level * 3 + rarityIndex(item.rarity) * 18);
}

function durabilityRatio(item) {
  const max = item.maxDurability || maxDurabilityFor(item);
  return clamp((typeof item.durability === "number" ? item.durability : max) / max, 0.25, 1);
}

function playerMaxHp(source = state) {
  const stats = totalStats(source);
  return Math.floor(120 + source.level * 26 + stats.hp + stats.armor * 1.8);
}

function playerDodgeChance() {
  const stats = totalStats();
  return clamp(0.04 + stats.crit * 0.45 + state.level * 0.001, 0.03, 0.42);
}

function ensureVitals() {
  const max = playerMaxHp();
  if (typeof state.playerHp !== "number") state.playerHp = max;
  state.playerHp = clamp(state.playerHp, 0, max);

  const pet = activePet();
  if (!pet) {
    state.petHp = null;
    return;
  }

  const maxPet = petMaxHp(pet);
  if (typeof state.petHp !== "number") state.petHp = maxPet;
  state.petHp = clamp(state.petHp, 0, maxPet);
}

function combatPower() {
  const stats = totalStats();
  const auto = autoClickStats();
  const autoPower = auto ? auto.damage * (1000 / auto.interval) * 5 : 0;
  return Math.floor(
    state.level * 8 + stats.attack * 1.4 + stats.magic * 1.4 + stats.armor + stats.hp * 0.2 + stats.crit * 120 + autoPower,
  );
}

function clickDamage() {
  const cls = classes[state.playerClass];
  const stats = totalStats();
  const pet = activePet();
  let bonus = 1;
  if (pet?.type === "support" && hasPetSkill(pet, 5)) bonus += 0.08;
  if (pet?.type === "dps" && hasPetSkill(pet, 40)) bonus += 0.06;
  return Math.max(1, Math.floor((10 + state.level * 4.2 + stats[cls.damageStat] * 1.7 + stats.armor * 0.15) * bonus));
}

function critChance() {
  const pet = activePet();
  const petBonus = pet?.type === "support" && hasPetSkill(pet, 40) ? 0.035 : 0;
  return clamp(classes[state.playerClass].baseCrit + totalStats().crit + state.level * 0.0015 + petBonus, 0.05, 0.72);
}

function autoClickStats() {
  const weapon = getEquippedItems().find((item) => item.slot === "weapon" && item.autoClick);
  if (!weapon) return null;

  return {
    ...weapon.autoClick,
    weaponName: weapon.name,
  };
}

function autoClickLabel() {
  const auto = autoClickStats();
  if (!auto) return "未装备";
  return `${auto.damage}/${formatInterval(auto.interval)}`;
}

function formatInterval(interval) {
  if (interval >= 1000) return `${(interval / 1000).toFixed(1)}秒`;
  return `${interval}毫秒`;
}

function formatDuration(duration) {
  const totalSeconds = Math.max(0, Math.ceil(duration / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours) return `${hours}小时${minutes ? `${minutes}分` : ""}`;
  if (minutes) return `${minutes}分${seconds ? `${seconds}秒` : ""}`;
  return `${seconds}秒`;
}

function attack(pointerEvent) {
  if (!state.combatActive) resumeBattleFromMonsterClick();
  if (!state.combatActive) return;
  const didCrit = Math.random() < critChance();
  const damage = Math.floor(clickDamage() * (didCrit ? 2.15 : 1));
  playAttackSound(didCrit ? "crit" : "hit", activeWeaponTypeKey());
  damageMonster(damage, didCrit ? "crit" : "hit", pointerEvent);
  pulseMonster("is-hit");
}

function resumeBattleFromMonsterClick() {
  state.combatActive = true;
  ensureVitals();
  if (state.playerHp <= 0) state.playerHp = playerMaxHp();
  if (activePet() && (!state.petHp || state.petHp <= 0)) state.petHp = petMaxHp(activePet());
  resetCombatTimers();
  addLog("点击怪物，继续战斗。");
  saveState();
}

function runAutoClick() {
  if (!currentUser || !state.monster || !state.combatActive) return;

  const auto = autoClickStats();
  if (!auto) {
    lastAutoClickAt = performance.now();
    return;
  }

  const now = performance.now();
  if (now - lastAutoClickAt < auto.interval) return;

  lastAutoClickAt = now;
  damageMonster(auto.damage, "auto");
  pulseMonster("is-hit");
}

function runPetAttack() {
  if (!currentUser || !state.monster || !state.combatActive) return;

  const pet = activePet();
  if (!pet || state.petHp <= 0) return;

  const now = performance.now();
  if (now - lastPetAttackAt < petAttackInterval(pet)) return;

  lastPetAttackAt = now;
  let damage = petAttackDamage(pet);
  if (pet.type === "dps" && hasPetSkill(pet, 30) && (state.monster.type === "elite" || state.monster.type === "boss")) {
    damage = Math.floor(damage * 1.18);
  }
  damageMonster(damage, "pet");
  showBattlePop("pet", "宠物攻击", "pet");

  if (pet.type === "support" && hasPetSkill(pet, 10)) {
    const heal = Math.ceil(playerMaxHp() * (hasPetSkill(pet, 70) ? 0.055 : 0.035));
    state.playerHp = Math.min(playerMaxHp(), state.playerHp + heal);
    showBattlePop("player", `+${heal}`, "heal");
  }

  if (pet.type === "dps" && hasPetSkill(pet, 10) && Math.random() < 0.18) {
    window.setTimeout(() => damageMonster(Math.floor(damage * 0.55), "pet"), 160);
  }
}

function runMonsterAttack() {
  if (!currentUser || !state.monster || !state.combatActive) return;
  ensureVitals();

  const now = performance.now();
  const interval = state.monster.type === "elite" || state.monster.type === "boss" ? 1050 : 1250;
  if (now - lastMonsterAttackAt < interval) return;
  lastMonsterAttackAt = now;

  const target = chooseMonsterTarget();
  if (target === "pet") {
    receivePetDamage(state.monster.attack);
  } else {
    receivePlayerDamage(state.monster.attack);
  }
}

function chooseMonsterTarget() {
  const pet = activePet();
  if (!pet || state.petHp <= 0) return "player";

  const tankTaunt = pet.type === "tank" && hasPetSkill(pet, 5);
  if (tankTaunt && Math.random() < 0.82) return "pet";
  return Math.random() < 0.34 ? "pet" : "player";
}

function receivePlayerDamage(rawDamage) {
  const pet = activePet();
  const support = pet?.type === "support" && hasPetSkill(pet, 30) ? 0.9 : 1;
  const guarded = pet?.type === "tank" && hasPetSkill(pet, 30) && state.petHp > 0 ? 0.88 : 1;
  const dodge = playerDodgeChance() + (pet?.type === "support" && hasPetSkill(pet, 1) ? 0.04 : 0);

  if (Math.random() < dodge) {
    showBattlePop("player", "闪避", "dodge");
    return;
  }

  const armor = totalStats().armor;
  const damage = Math.max(1, Math.floor((rawDamage - armor * 0.28) * support * guarded));
  state.playerHp = Math.max(0, state.playerHp - damage);
  showBattlePop("player", `-${damage}`, "hurt");

  if (state.playerHp <= 0) defeatPlayer();
  render();
}

function receivePetDamage(rawDamage) {
  const pet = activePet();
  if (!pet) return;

  const wasAlive = state.petHp > 0;
  const block = pet.type === "tank" && hasPetSkill(pet, 10) ? 0.72 : 1;
  const damage = Math.max(1, Math.floor(rawDamage * block));
  state.petHp = Math.max(0, state.petHp - damage);
  showBattlePop("pet", `-${damage}`, "hurt");

  if (pet.type === "tank" && hasPetSkill(pet, 40)) {
    damageMonster(Math.max(1, Math.floor(damage * 0.18)), "pet");
  }

  if (state.petHp <= 0 && wasAlive) {
    const cost = petHealCost(pet);
    showBattlePop("pet", "倒下", "hurt");
    addLog(`${pet.name}倒下了，需要 ${formatMaterials(cost)} 治疗。`);
    showToast(`${pet.name} 倒下，需要治疗材料`);
    saveState();
  }
  render();
}

function resetCombatTimers() {
  const now = performance.now();
  lastAutoClickAt = now;
  lastMonsterAttackAt = now;
  lastPetAttackAt = now;
}

function defeatPlayer() {
  state.combatActive = false;
  state.playerHp = 0;
  resetCombatTimers();
  state.xp = 0;
  state.deaths += 1;
  damageEquipmentDurability();
  addLog("主角死亡，当前等级经验归零，装备耐久下降。");
  showToast("战败：经验归零，装备耐久下降");
  saveState();
}

function damageEquipmentDurability() {
  for (const item of getEquippedItems()) {
    item.maxDurability = item.maxDurability || maxDurabilityFor(item);
    item.durability = clamp((item.durability ?? item.maxDurability) - Math.ceil(item.maxDurability * 0.12), 0, item.maxDurability);
  }
}

function damageMonster(amount, kind = "hit", pointerEvent) {
  if (!state.monster || amount <= 0 || !state.combatActive) return;

  state.monster.hp = Math.max(0, state.monster.hp - amount);
  showDamage(amount, kind, pointerEvent);

  if (state.monster.hp <= 0) {
    defeatMonster();
  }

  render();
}

function defeatMonster() {
  const monster = state.monster;
  const type = monsterTypes[monster.type] || monsterTypes.minion;
  const goldReward = Math.floor((10 + monster.level * 3.2) * type.gold);
  const xpReward = Math.floor((18 + monster.level * 5.6) * type.xp);

  state.kills += 1;
  addGroundGold(goldReward);
  if (state.level < MAX_LEVEL) state.xp += xpReward;

  const drops = rollDrops(monster);
  addLog(`${monster.name}倒下，获得 ${xpReward} 经验，掉落 ${goldReward} 金币。`);
  for (const drop of drops) {
    addGroundLoot(drop);
    addLog(drop.text);
    if (isLegendaryWeaponLoot(drop)) playLegendaryWeaponSound();
  }
  gainPetXp(Math.floor(xpReward * 0.6));
  levelUpIfNeeded();
  ensureVitals();
  state.playerHp = Math.min(playerMaxHp(), state.playerHp + Math.ceil(playerMaxHp() * 0.08));
  if (activePet()) state.petHp = Math.min(petMaxHp(activePet()), (state.petHp || 0) + Math.ceil(petMaxHp(activePet()) * 0.12));
  state.monster = createMonster(state.dungeonId);
  resetCombatTimers();
  saveState();
  showDamage(`掉落 ${goldReward}G`, "reward");
  pulseMonster("is-spawn");
}

function levelUpIfNeeded() {
  let changed = false;

  while (state.level < MAX_LEVEL && state.xp >= xpNeed()) {
    state.xp -= xpNeed();
    state.level += 1;
    state.gold += Math.floor(20 + state.level * 4);
    changed = true;
  }

  if (state.level >= MAX_LEVEL) state.xp = 0;
  if (changed) addLog(`角色升到 ${state.level} 级，最高等级为 70。`);
}

function rollDrops(monster) {
  const drops = [];
  const levelBonus = monster.level >= 40 ? 10 : monster.level >= 20 ? 5 : 0;
  const type = monsterTypes[monster.type] || monsterTypes.minion;
  const rewardMulti = type.drop || 1;
  const equipChance = clamp((monster.boss ? 0.95 : 0.42) * Math.min(rewardMulti, 2.4), 0, 1);
  const gemChance = clamp((monster.boss ? 0.8 : 0.34) * Math.min(rewardMulti, 2.4), 0, 1);
  const eggChance = clamp((monster.boss ? 0.32 : 0.085) * Math.min(rewardMulti, 2.2), 0, 0.75);
  const materialChance = clamp((monster.boss ? 0.72 : 0.24) * Math.min(rewardMulti, 2.2), 0, 0.9);
  const equipRolls = monster.type === "treasure_equipment" ? 10 : 1;
  const materialReward = monster.type === "treasure_material" ? monsterMaterialReward(monster.level, 10) : null;

  for (let roll = 0; roll < equipRolls; roll += 1) if (Math.random() < equipChance) {
    const item = createEquipment({
      level: monster.level,
      classKey: Math.random() < 0.55 ? state.playerClass : pick(Object.keys(classes)),
      rarityBonus: levelBonus + (monster.boss ? 8 : 0) + (monster.type === "treasure_equipment" ? 12 : 0),
    });
    drops.push({
      type: "equipment",
      rarity: item.rarity,
      title: item.name,
      detail: `${rarityText(item.rarity)}装备 · Lv.${item.level}${item.autoClick ? ` · 自动 ${item.autoClick.damage}/${formatInterval(item.autoClick.interval)}` : ""}`,
      text: `掉落 ${rarityText(item.rarity)} ${item.name}。`,
      payload: { item },
    });
  }

  if (Math.random() < gemChance) {
    const gemKey = pick(Object.keys(state.gems));
    const amount = monster.boss ? 2 : monster.type === "treasure_material" ? 10 : 1;
    drops.push({
      type: "gem",
      title: `${gemLabel(gemKey)} x${amount}`,
      detail: "副本宝石",
      text: `掉落 ${gemLabel(gemKey)} x${amount}。`,
      payload: { gemKey, amount },
    });
  }

  if (materialReward) {
    drops.push({
      type: "material",
      title: "材料宝箱",
      detail: "材料宝箱怪奖励",
      text: `掉落 ${formatMaterials(materialReward)}。`,
      payload: { materials: materialReward },
    });
  } else if (Math.random() < materialChance) {
    const materialDrop = battleMaterialReward(monster.level, monster.boss ? 2 : 1);
    drops.push({
      type: "material",
      title: formatMaterials(materialDrop, true),
      detail: "战场材料",
      text: `掉落 ${formatMaterials(materialDrop)}。`,
      payload: { materials: materialDrop },
    });
  }

  if (Math.random() < eggChance) {
    const egg = { id: uid("egg"), createdAt: Date.now() };
    drops.push({
      type: "egg",
      title: "宠物蛋",
      detail: "孵化前未知品质和类型",
      text: "掉落 宠物蛋。",
      payload: { egg },
    });
  }

  return drops;
}

function trimEquipment() {
  if (backpackItems().length <= bagCapacity()) return;

  const equippedIds = new Set(equippedSlotDefs.map((slot) => state.equipped[slot.key]).filter(Boolean));
  const equipped = state.equipment.filter((item) => equippedIds.has(item.id));
  const backpack = state.equipment.filter((item) => !equippedIds.has(item.id)).slice(0, bagCapacity());
  state.equipment = [...equipped, ...backpack];
}

function createEquipment(options = {}) {
  const level = clamp(Math.floor(options.level || state.level), 1, MAX_LEVEL);
  const classKey = options.classKey || state.playerClass;
  const slot = options.slot || pick(availableSlotsForClass(classKey)).key;
  const weaponType = slot === "weapon" ? weaponTypeByKey(options.weaponType || pickWeaponType(classKey).key, classKey) : null;
  const rarity = options.rarity || rollEquipmentRarity(slot, options.rarityBonus || 0);
  const rarityInfo = rarityByKey(rarity);
  const setName = options.setName || pick(setNames);
  const base = Math.floor((level * 2.5 + 7) * rarityInfo.mult);
  const classNames = classKey === "warrior" ? warriorNames : mageNames;
  const name = `${setName}${weaponType ? weaponType.name : classNames[slot]}`;
  const stats = {
    attack: 0,
    magic: 0,
    armor: 0,
    hp: 0,
    crit: 0,
  };

  if (slot === "weapon") {
    const statKey = classKey === "warrior" ? "attack" : "magic";
    stats[statKey] = Math.floor((base + level * rarityInfo.mult) * (weaponType?.damage || 1));
    stats.crit = Number(((weaponType?.crit || 0) + rarityInfo.mult * 0.004).toFixed(3));
  }
  if (slot === "helm") {
    stats.armor = Math.floor(base * 0.55);
    stats.hp = Math.floor(base * 2.4);
  }
  if (slot === "hat") {
    stats.magic = Math.floor(base * 0.42);
    stats.hp = Math.floor(base * 1.85);
    stats.crit = Number((0.008 + rarityInfo.mult * 0.004).toFixed(3));
  }
  if (slot === "shoulders") {
    stats.armor = Math.floor(base * 0.68);
    stats.hp = Math.floor(base * 2.05);
    stats[classKey === "warrior" ? "attack" : "magic"] = Math.floor(base * 0.22);
  }
  if (slot === "armor") {
    stats.armor = Math.floor(base * 0.95);
    stats.hp = Math.floor(base * 3.6);
  }
  if (slot === "gloves") {
    stats[classKey === "warrior" ? "attack" : "magic"] = Math.floor(base * 0.48);
    stats.crit = Number((0.012 + rarityInfo.mult * 0.006).toFixed(3));
  }
  if (slot === "pants") {
    stats.armor = Math.floor(base * 0.62);
    stats.hp = Math.floor(base * 2.65);
  }
  if (slot === "boots") {
    stats.armor = Math.floor(base * 0.5);
    stats.crit = Number((0.01 + rarityInfo.mult * 0.006).toFixed(3));
  }
  if (slot === "ring") {
    stats[classKey === "warrior" ? "attack" : "magic"] = Math.floor(base * 0.58);
    stats.crit = Number((0.015 + rarityInfo.mult * 0.008).toFixed(3));
  }

  const item = {
    id: uid("eq"),
    name,
    classKey,
    slot,
    weaponType: weaponType?.key || null,
    rarity,
    setName,
    level,
    stats,
  };
  item.maxDurability = maxDurabilityFor(item);
  item.durability = item.maxDurability;

  if (slot === "weapon") {
    const chance = clamp(0.74 + rarityIndex(rarity) * 0.045, 0, 0.92);
    item.autoClick = Math.random() < chance ? createAutoClickForWeapon(item) : null;
    item.assets = generatedWeaponAssets(weaponType, rarity, setName);
  }

  return item;
}

function generatedWeaponAssets(weapon, rarity, setName) {
  const setSlug = equipmentSetSlugs[setName] || equipmentSetSlugs[setNames[0]];
  const imageUrl = `./assets/generated-weapons-named/${setSlug}-${weapon?.key || "staff"}.png`;
  return {
    inventoryThumb: imageUrl,
    paperDoll: imageUrl,
    battleBack: imageUrl,
  };
}

function normalizeGeneratedWeaponAssets(existingAssets = {}, generatedAssets = {}) {
  const nextAssets = { ...generatedAssets };
  for (const [slot, value] of Object.entries(existingAssets || {})) {
    if (typeof value === "string" && value.startsWith(`data:image/${"svg"}`)) continue;
    nextAssets[slot] = value;
  }
  return nextAssets;
}

function createAutoClickForWeapon(item) {
  const rarityInfo = rarityByKey(item.rarity);
  const index = rarityIndex(item.rarity);
  const baseStat = item.stats[item.classKey === "warrior" ? "attack" : "magic"] || 0;
  const type = weaponTypeByKey(item.weaponType, item.classKey);
  const damageRoll = 0.88 + Math.random() * 0.24;
  const speedRoll = Math.round((Math.random() - 0.5) * 260);

  return {
    damage: Math.max(1, Math.floor((5 + item.level * 1.25 + baseStat * 0.34) * damageRoll * (type.damage || 1))),
    interval: Math.round(clamp((2200 - item.level * 8 - index * 220 + speedRoll) * (type.speed || 1), 560, 2800)),
  };
}

function createPet() {
  const rarityKey = rollPetRarity();
  const rarityInfo = rarityByKey(rarityKey);
  const type = pick(petTypes);
  return {
    id: uid("pet"),
    name: `${rarityInfo.name}${type.name}`,
    type: type.key,
    rarity: rarityKey,
    level: 1,
    xp: 0,
    hatchedAt: Date.now(),
  };
}

function petXpNeed(pet) {
  return Math.floor(36 + Math.pow(pet.level, 1.45) * 20);
}

function gainPetXp(amount) {
  const pet = activePet();
  if (!pet) return;

  pet.xp += amount;
  while (pet.level < MAX_LEVEL && pet.xp >= petXpNeed(pet)) {
    pet.xp -= petXpNeed(pet);
    pet.level += 1;
    addLog(`${pet.name}升到 ${pet.level} 级。`);
  }
  if (pet.level >= MAX_LEVEL) pet.xp = 0;
}

function hatchEgg() {
  const ready = readyIncubatorSlot();
  if (ready) {
    hatchIncubatorEgg(ready);
    return;
  }

  const empty = emptyIncubatorSlot();
  if (empty && state.eggs.length) {
    placeEggInIncubator(empty);
    return;
  }

  showToast(empty ? "没有宠物蛋可以放入" : "孵化台已满，等待孵化完成");
}

function placeEggInIncubator(slot = incubatorSlot()) {
  if (!state.eggs.length || slot.egg) return;

  slot.egg = state.eggs.shift();
  slot.startedAt = Date.now();
  playIncubatorSound("place");
  addLog(`宠物蛋已放入孵化台 ${incubatorSlotNumber(slot)} 号槽，需要 ${formatDuration(incubatorHatchDuration(slot))}。`);
  saveState();
  render();
}

function removeEggFromIncubator(slot = incubatorSlot()) {
  if (!slot.egg) return;

  const egg = slot.egg;
  slot.egg = null;
  slot.startedAt = null;
  state.eggs.unshift(egg);
  addLog(`已从孵化台 ${incubatorSlotNumber(slot)} 号槽取回宠物蛋，重新放入会重新计时。`);
  saveState();
  render();
}

function hatchIncubatorEgg(slot = incubatorSlot()) {
  if (!slot.egg) return;
  const remaining = incubatorRemainingMs(slot);
  if (remaining > 0) {
    showToast(`孵化中，还需要 ${formatDuration(remaining)}`);
    return;
  }

  const egg = slot.egg;
  slot.egg = null;
  slot.startedAt = null;

  if (Math.random() > incubatorSuccessChance(slot)) {
    playIncubatorSound("fail");
    addLog(`孵化台 ${incubatorSlotNumber(slot)} 号槽孵化失败。`);
    showDropToast({
      title: "孵化失败",
      detail: "没有孵出宠物，蛋壳已经清理。",
    });
    saveState();
    render();
    return;
  }

  const pet = createPet(egg);
  state.pets.unshift(pet);
  if (!state.activePetId) {
    state.activePetId = pet.id;
    state.petHp = petMaxHp(pet);
  }
  playIncubatorSound("hatch");
  addLog(`孵化台 ${incubatorSlotNumber(slot)} 号槽孵化出 ${rarityText(pet.rarity)} ${pet.name}。`);
  showDropToast({
    rarity: pet.rarity,
    title: pet.name,
    detail: `${petTypeByKey(pet.type).role} · ${rarityText(pet.rarity)} · 战力 +${petPower(pet)}`,
  });
  saveState();
  render();
}

function upgradeIncubatorSlots() {
  const cost = incubatorSlotUpgradeCost();
  if (!cost || !canAffordMaterials(cost.materials)) return;

  spendMaterials(cost.materials);
  state.incubatorSlots = incubatorSlots();
  state.incubatorSlots.push({
    id: `incubator-${cost.target}`,
    egg: null,
    startedAt: null,
    timeLevel: 0,
    successLevel: 0,
  });
  addLog(`孵化台扩建到 ${cost.target} 个槽位，消耗 ${formatMaterials(cost.materials)}。`);
  showToast(`孵化台槽位 ${cost.target}/${MAX_INCUBATOR_SLOTS}`);
  saveState();
  render();
}

function upgradeIncubatorSlot(slotId) {
  const slot = incubatorSlotById(slotId);
  const cost = incubatorSlotStatUpgradeCost(slot);
  if (!cost || !canAffordMaterials(cost.materials)) return;

  spendMaterials(cost.materials);
  slot.timeLevel = cost.timeNext;
  slot.successLevel = cost.successNext;
  addLog(
    `孵化台 ${incubatorSlotNumber(slot)} 号槽升级到 Lv.${incubatorSlotLevel(slot)}，速度 ${formatDuration(
      incubatorHatchDuration(slot),
    )}，成功率 ${Math.round(incubatorSuccessChance(slot) * 100)}%，消耗 ${formatMaterials(cost.materials)}。`,
  );
  showToast(`${incubatorSlotNumber(slot)} 号槽升级完成`);
  saveState();
  render();
}

function sellPet(id) {
  const pet = state.pets.find((entry) => entry.id === id);
  if (!pet) return;

  const value = petSellValue(pet);
  state.gold += value;
  state.pets = state.pets.filter((entry) => entry.id !== id);
  if (state.activePetId === id) {
    state.activePetId = state.pets[0]?.id || null;
    state.petHp = state.activePetId ? petMaxHp(activePet()) : null;
  }
  addLog(`出售 ${pet.name}，获得 ${value} 金币。`);
  saveState();
  render();
}

function sellVisiblePets() {
  const pets = filteredPets().filter((pet) => pet.id !== state.activePetId);
  if (!pets.length) return;

  const message = `确认出售当前筛选结果里的 ${pets.length} 只未出战宠物？`;
  if (!window.confirm(message)) return;

  const ids = new Set(pets.map((pet) => pet.id));
  const value = pets.reduce((sum, pet) => sum + petSellValue(pet), 0);
  state.gold += value;
  state.pets = state.pets.filter((pet) => !ids.has(pet.id));
  if (!state.pets.some((pet) => pet.id === state.activePetId)) {
    state.activePetId = state.pets[0]?.id || null;
    state.petHp = state.activePetId ? petMaxHp(activePet()) : null;
  }
  expandedPetSkill = null;
  addLog(`一键出售 ${pets.length} 只宠物，获得 ${value} 金币。`);
  showToast(`宠物出售完成：+${value} 金币`);
  saveState();
  render();
}

function equipmentMergeKey(item) {
  return [
    item.classKey,
    item.slot,
    item.setName,
    item.weaponType || "",
    item.name,
  ].join("|");
}

function equipmentMergeMaterialFor(item) {
  if (!item || isEquipped(item.id) || !nextRarityKey(item.rarity)) return null;
  const key = equipmentMergeKey(item);
  return backpackItems()
    .filter((entry) => entry.id !== item.id && !isEquipped(entry.id))
    .filter((entry) => entry.rarity === item.rarity && equipmentMergeKey(entry) === key)
    .sort((a, b) => a.level - b.level || equipmentScore(a) - equipmentScore(b))[0] || null;
}

function mergeEquipment(id) {
  const item = state.equipment.find((entry) => entry.id === id);
  if (!item || isEquipped(item.id)) return;

  const nextRarity = nextRarityKey(item.rarity);
  const material = equipmentMergeMaterialFor(item);
  if (!nextRarity || !material) return;

  const itemAssets = item.assets ? { ...item.assets } : null;
  const targetLevel = Math.max(item.level, material.level);
  const upgraded = createEquipment({
    level: targetLevel,
    classKey: item.classKey,
    slot: item.slot,
    weaponType: item.weaponType,
    setName: item.setName,
    rarity: nextRarity,
  });

  Object.assign(item, upgraded, {
    id: item.id,
    assets: itemAssets || upgraded.assets,
    upgradedAt: Date.now(),
  });
  delete item.price;
  removeEquipment(material.id);
  addLog(`${item.name}合并升级到${rarityText(item.rarity)}，消耗 1 件同名装备。`);
  showDropToast({
    rarity: item.rarity,
    title: item.name,
    detail: `装备合并 · ${rarityText(item.rarity)} · Lv.${item.level}`,
  });
  saveState();
  render();
}

function equipItem(id, preferredSlotKey = null) {
  const item = state.equipment.find((entry) => entry.id === id);
  if (!item) return;
  if (item.classKey !== state.playerClass) {
    addLog(`${item.name}属于${classes[item.classKey].name}装备，当前职业无法装备。`);
    render();
    return;
  }
  if (item.level > state.level) {
    addLog(`${item.name}需要角色 ${item.level} 级。`);
    render();
    return;
  }

  const preferredSlot = preferredSlotKey ? equippedSlotDefs.find((slot) => slot.key === preferredSlotKey && slot.slot === item.slot) : null;
  const targetSlot = preferredSlot?.key || targetEquipSlotKey(item);
  state.equipped[targetSlot] = item.id;
  activeSlotPickerKey = null;
  addLog(`装备 ${item.name}。`);
  saveState();
  render();
}

function targetEquipSlotKey(item) {
  const candidates = equippedSlotDefs.filter((slot) => slot.slot === item.slot);
  const empty = candidates.find((slot) => !state.equipped[slot.key]);
  if (empty) return empty.key;

  if (item.slot === "ring") {
    const weakest = candidates
      .map((slot) => ({ key: slot.key, item: equippedItemForSlotKey(slot.key) }))
      .sort((a, b) => equipmentScore(a.item) - equipmentScore(b.item))[0];
    return weakest?.key || candidates[0].key;
  }

  return candidates[0]?.key || item.slot;
}

function unequipSlot(slot) {
  state.equipped[slot] = null;
  activeSlotPickerKey = null;
  saveState();
  render();
}

function sellItem(id) {
  const item = state.equipment.find((entry) => entry.id === id);
  if (!item || isEquipped(id)) return;

  const value = sellValue(item);
  state.gold += value;
  removeEquipment(id);
  addLog(`出售 ${item.name}，获得 ${value} 金币。`);
  saveState();
  render();
}

function meltItem(id) {
  const item = state.equipment.find((entry) => entry.id === id);
  if (!item || isEquipped(id)) return;

  const amount = meltValue(item);
  addMaterials(amount);
  removeEquipment(id);
  addLog(`熔炼 ${item.name}，获得 ${formatMaterials(amount)}。`);
  saveState();
  render();
}

function meltVisibleEquipment() {
  const items = filteredBackpackItems();
  if (!items.length) return;

  const message = `确认熔炼当前筛选结果里的 ${items.length} 件装备？`;
  if (!window.confirm(message)) return;

  const ids = new Set(items.map((item) => item.id));
  const amount = mergeMaterialBundles(...items.map((item) => meltValue(item)));
  addMaterials(amount);
  state.equipment = state.equipment.filter((item) => !ids.has(item.id));
  addLog(`一键熔炼 ${items.length} 件装备，获得 ${formatMaterials(amount)}。`);
  showToast(`熔炼完成：${formatMaterials(amount, true)}`);
  saveState();
  render();
}

function sellVisibleEquipment() {
  const items = filteredBackpackItems();
  if (!items.length) return;

  const message = `确认出售当前筛选结果里的 ${items.length} 件装备？`;
  if (!window.confirm(message)) return;

  const ids = new Set(items.map((item) => item.id));
  const value = items.reduce((sum, item) => sum + sellValue(item), 0);
  state.gold += value;
  state.equipment = state.equipment.filter((item) => !ids.has(item.id));
  addLog(`一键出售 ${items.length} 件装备，获得 ${value} 金币。`);
  showToast(`出售完成：+${value} 金币`);
  saveState();
  render();
}

function removeEquipment(id) {
  state.equipment = state.equipment.filter((item) => item.id !== id);
  for (const slot of equippedSlotDefs) {
    if (state.equipped[slot.key] === id) state.equipped[slot.key] = null;
  }
}

function isEquipped(id) {
  return equippedSlotDefs.some((slot) => state.equipped[slot.key] === id);
}

function sellValue(item) {
  return Math.floor((12 + item.level * 2.6) * rarityByKey(item.rarity).sell);
}

function meltValue(item) {
  const value = Math.max(1, Math.floor((2 + item.level * 0.18) * rarityByKey(item.rarity).mat));
  const classKey = item.classKey || state.playerClass;
  const weaponType = weaponTypeByKey(item.weaponType, classKey);
  const profiles = {
    weapon:
      classKey === "mage"
        ? { crystal: 0.48, wood: 0.34, iron: 0.18 }
        : { iron: 0.52, wood: 0.28, leather: 0.2 },
    helm: { iron: 0.62, cloth: 0.22, leather: 0.16 },
    hat: { cloth: 0.55, crystal: 0.28, leather: 0.17 },
    shoulders: { iron: 0.42, cloth: 0.32, leather: 0.26 },
    armor: { cloth: 0.4, iron: 0.36, leather: 0.24 },
    gloves: classKey === "mage" ? { cloth: 0.42, crystal: 0.34, leather: 0.24 } : { leather: 0.42, iron: 0.34, cloth: 0.24 },
    pants: { cloth: 0.45, leather: 0.33, iron: 0.22 },
    boots: { leather: 0.58, cloth: 0.28, iron: 0.14 },
    ring: { crystal: 0.66, iron: 0.22, cloth: 0.12 },
  };

  const profile = profiles[item.slot] || { cloth: 1 };
  const typeBonus = item.slot === "weapon" && weaponType.key === "orb" ? { crystal: 1 } : {};
  const bundle = {};

  for (const [key, ratio] of Object.entries(profile)) {
    bundle[key] = Math.max(1, Math.floor(value * ratio));
  }
  for (const [key, amount] of Object.entries(typeBonus)) {
    bundle[key] = (bundle[key] || 0) + amount;
  }

  return bundle;
}

function monsterMaterialReward(level, multiplier = 1) {
  const base = Math.max(2, Math.floor((2 + level * 0.26) * multiplier));
  return {
    cloth: base * 2,
    iron: Math.ceil(base * 1.1),
    leather: Math.ceil(base * 0.95),
    crystal: Math.max(1, Math.ceil(base * (level >= 20 ? 0.75 : 0.35))),
    wood: Math.ceil(base * 0.85),
  };
}

function battleMaterialReward(level, multiplier = 1) {
  const base = Math.max(1, Math.floor((1 + level * 0.1) * multiplier));
  const primary = pick(materialTypes).key;
  const bundle = { [primary]: base };

  if (level >= 12 && Math.random() < 0.34) {
    const secondary = pick(materialTypes.filter((material) => material.key !== primary)).key;
    bundle[secondary] = Math.max(1, Math.floor(base * 0.55));
  }

  return bundle;
}

function forgeMaterialCost() {
  const step = Math.floor(state.level / 8);
  const cost = {
    cloth: 8 + step * 2,
    leather: 4 + Math.floor(step * 1.2),
  };

  if (state.playerClass === "mage") {
    cost.crystal = 6 + step * 2;
    cost.wood = 4 + step;
  } else {
    cost.iron = 7 + step * 2;
    cost.wood = 3 + step;
  }
  return cost;
}

function bagUpgradeCost() {
  const current = bagCapacity();
  const target = current + 50;
  const step = Math.max(1, Math.floor((target - 100) / 50));
  const materials = { cloth: 8 + step * 4 };

  if (target > 500) materials.leather = 5 + Math.ceil((target - 500) / 50) * 3;
  if (target > 700) materials.iron = 4 + Math.ceil((target - 700) / 50) * 3;
  if (target > 900) materials.wood = 3 + Math.ceil((target - 900) / 50) * 2;
  if (target > 1100) materials.crystal = 2 + Math.ceil((target - 1100) / 50) * 2;

  return {
    target,
    gold: 80 + step * 45,
    materials,
  };
}

function equipmentScore(item) {
  if (!item) return 0;

  const stats = item.stats || {};
  const auto = item.autoClick ? item.autoClick.damage * (1000 / item.autoClick.interval) : 0;
  return (
    (stats.attack || 0) * 1.4 +
    (stats.magic || 0) * 1.4 +
    (stats.armor || 0) +
    (stats.hp || 0) * 0.2 +
    (stats.crit || 0) * 120 +
    auto * 5 +
    item.level * 0.6 +
    rarityIndex(item.rarity) * 4
  );
}

function forgeEquipment() {
  const materialCost = forgeMaterialCost();
  const gemCost = 2 + Math.floor(state.level / 20);

  if (!canAffordMaterials(materialCost) || totalGems() < gemCost) return;

  spendMaterials(materialCost);
  spendAnyGems(gemCost);
  const item = createEquipment({
    level: clamp(state.level + Math.floor(Math.random() * 3) - 1, 1, MAX_LEVEL),
    classKey: state.playerClass,
    rarityBonus: 12,
  });
  state.equipment.unshift(item);
  addLog(`锻造出 ${rarityText(item.rarity)} ${item.name}。`);
  showDropToast({
    rarity: item.rarity,
    title: item.name,
    detail: `${rarityText(item.rarity)}装备 · Lv.${item.level}${item.autoClick ? ` · 自动 ${item.autoClick.damage}/${formatInterval(item.autoClick.interval)}` : ""}`,
  });
  saveState();
  render();
}

function upgradeBag() {
  const next = bagUpgradeCost();
  if (state.gold < next.gold || !canAffordMaterials(next.materials)) return;

  state.gold -= next.gold;
  spendMaterials(next.materials);
  state.bagCapacity = next.target;
  addLog(`装备行囊升级到 ${next.target} 件容量。`);
  showToast(`装备行囊扩充到 ${next.target} 件`);
  saveState();
  render();
}

function repairCost() {
  return mergeMaterialBundles(...getEquippedItems().map((item) => {
    item.maxDurability = item.maxDurability || maxDurabilityFor(item);
    const missing = item.maxDurability - (item.durability ?? item.maxDurability);
    if (missing <= 0) return {};
    const base = Math.ceil(missing / 10);
    return Object.fromEntries(Object.entries(meltValue(item)).map(([key, amount]) => [key, Math.max(1, Math.ceil((amount * base) / 4))]));
  }));
}

function repairEquipped() {
  const cost = repairCost();
  if (!Object.keys(cost).length || !canAffordMaterials(cost)) return;

  spendMaterials(cost);
  for (const item of getEquippedItems()) {
    item.maxDurability = item.maxDurability || maxDurabilityFor(item);
    item.durability = item.maxDurability;
  }
  addLog(`修补已装备装备，消耗 ${formatMaterials(cost)}。`);
  showToast(`修补完成：${formatMaterials(cost, true)}`);
  saveState();
  render();
}

function totalGems() {
  return Object.values(state.gems).reduce((sum, count) => sum + count, 0);
}

function spendAnyGems(amount) {
  for (const key of Object.keys(state.gems)) {
    const used = Math.min(amount, state.gems[key]);
    state.gems[key] -= used;
    amount -= used;
    if (amount <= 0) return;
  }
}

function createShopStock(level, classKey) {
  const stockLevel = level ?? state.level;
  const ownerClass = classKey ?? state.playerClass;
  return Array.from({ length: 6 }, () => {
    const item = createEquipment({
      level: clamp(stockLevel + Math.floor(Math.random() * 7) - 2, 1, MAX_LEVEL),
      classKey: Math.random() < 0.72 ? ownerClass : pick(Object.keys(classes)),
      rarityBonus: 5,
    });
    item.price = Math.floor(sellValue(item) * 2.4 + item.level * 5);
    return item;
  });
}

function refreshShop(force = false) {
  const cost = 30;
  if (!force) {
    if (state.gold < cost) return;
    state.gold -= cost;
  }
  state.shop = createShopStock();
  addLog(force ? "商店货架已生成。" : "商店随机刷新了一批装备。");
  saveState();
  render();
}

function buyShopItem(id) {
  const item = state.shop.find((entry) => entry.id === id);
  if (!item || state.gold < item.price) return;

  state.gold -= item.price;
  const bought = { ...item, id: uid("eq") };
  delete bought.price;
  state.equipment.unshift(bought);
  state.shop = state.shop.filter((entry) => entry.id !== id);
  addLog(`购买 ${bought.name}。`);
  saveState();
  render();
}

function selectDungeon(id) {
  const dungeon = getDungeon(id);
  state.dungeonId = id;
  state.monster = createMonster(id);
  state.combatActive = true;
  ensureVitals();
  resetCombatTimers();
  addLog(`进入${dungeon.name}。`);
  saveState();
  render();
  if (dom.dungeonSelector) dom.dungeonSelector.open = false;
  pulseMonster("is-spawn");
}

function switchClass(classKey) {
  if (!classes[classKey]) return;
  state.playerClass = classKey;
  for (const slot of equippedSlotDefs) {
    const item = state.equipment.find((entry) => entry.id === state.equipped[slot.key]);
    if (item && item.classKey !== classKey) state.equipped[slot.key] = null;
  }
  addLog(`切换职业为${classes[classKey].name}。`);
  saveState();
  render();
}

function setActiveTab(tab) {
  state.activeTab = tab;
  renderTabs();
  saveState();
}

function addLog(message) {
  state.log.unshift(message);
  state.log = state.log.slice(0, 12);
}

function resetGame() {
  if (!currentUser) return;
  if (!window.confirm("确认重置当前进度？")) return;
  localStorage.removeItem(getSaveKey());
  state = loadState();
  render();
  saveState();
  showToast("当前账号进度已重置。");
}

function rarityText(key) {
  return rarityByKey(key).name;
}

function gemLabel(key) {
  const labels = {
    ruby: "红曜石",
    jade: "青辉石",
    star: "星砂石",
  };
  return labels[key] || key;
}

function statLines(itemOrStats) {
  const stats = itemOrStats.stats || itemOrStats;
  const lines = [];
  if (stats.attack) lines.push(`攻击 +${stats.attack}`);
  if (stats.magic) lines.push(`法术 +${stats.magic}`);
  if (stats.armor) lines.push(`护甲 +${stats.armor}`);
  if (stats.hp) lines.push(`生命 +${stats.hp}`);
  if (stats.crit) lines.push(`暴击 +${Math.round(stats.crit * 100)}%`);
  if (itemOrStats.autoClick) {
    lines.push(`自动点击 ${itemOrStats.autoClick.damage}/${formatInterval(itemOrStats.autoClick.interval)}`);
  }
  if (itemOrStats.maxDurability) {
    lines.push(`耐久 ${Math.ceil(itemOrStats.durability ?? itemOrStats.maxDurability)}/${itemOrStats.maxDurability}`);
  }
  return lines;
}

function durabilityText(item) {
  if (!item?.maxDurability) return "";
  return `${Math.ceil(item.durability ?? item.maxDurability)}/${item.maxDurability}`;
}

function comparisonTarget(item, preferredSlotKey = null) {
  if (preferredSlotKey) {
    const preferredSlot = equippedSlotDefs.find((slot) => slot.key === preferredSlotKey && slot.slot === item.slot);
    if (preferredSlot) return equippedItemForSlotKey(preferredSlot.key);
  }

  const equippedItems = equippedItemsForItem(item);
  if (!equippedItems.length) return null;

  if (item.slot === "ring" && equippedItems.length > 1) {
    return [...equippedItems].sort((a, b) => equipmentScore(a) - equipmentScore(b))[0];
  }

  return equippedItems[0];
}

function comparisonRows(item, preferredSlotKey = null) {
  const current = comparisonTarget(item, preferredSlotKey);
  const currentStats = current?.stats || {};
  const nextStats = item.stats || {};
  const rows = [
    ["attack", "攻击", 0],
    ["magic", "法术", 0],
    ["armor", "护甲", 0],
    ["hp", "生命", 0],
    ["crit", "暴击", 100],
  ];

  const statRows = rows
    .map(([key, label, percent]) => {
      const next = nextStats[key] || 0;
      const old = currentStats[key] || 0;
      if (!next && !old) return "";
      const delta = next - old;
      return comparisonRowHtml(label, formatStatValue(next, percent), formatDelta(delta, percent, false));
    })
    .filter(Boolean);

  if (item.slot === "weapon" || current?.slot === "weapon") {
    const nextAuto = item.autoClick || null;
    const oldAuto = current?.autoClick || null;
    if (nextAuto || oldAuto) {
      statRows.push(comparisonRowHtml("自动伤害", nextAuto ? nextAuto.damage : 0, formatDelta((nextAuto?.damage || 0) - (oldAuto?.damage || 0), 0, false)));
      statRows.push(comparisonRowHtml("自动间隔", nextAuto ? formatInterval(nextAuto.interval) : "无", formatIntervalDelta(nextAuto, oldAuto)));
    }
  }

  return {
    current,
    html: statRows.join("") || `<div class="compare-row"><span>属性</span><strong>无变化</strong><em>0</em></div>`,
  };
}

function comparisonRowHtml(label, value, delta) {
  return `
    <div class="compare-row">
      <span>${label}</span>
      <strong>${value}</strong>
      <em class="${delta.className}">${delta.text}</em>
    </div>
  `;
}

function formatStatValue(value, percent = 0) {
  if (percent) return `${Math.round(value * percent)}%`;
  return value ? `+${value}` : "0";
}

function formatDelta(delta, percent = 0, higherIsBetter = false) {
  const value = percent ? Math.round(delta * percent) : Math.round(delta);
  const className = value > 0 ? "up" : value < 0 ? "down" : "same";
  const prefix = value > 0 ? "+" : "";
  const suffix = percent ? "%" : "";

  return {
    className: higherIsBetter && value > 0 ? "up" : className,
    text: `${prefix}${value}${suffix}`,
  };
}

function formatIntervalDelta(nextAuto, oldAuto) {
  if (nextAuto && !oldAuto) return { className: "up", text: "新增" };
  if (!nextAuto && oldAuto) return { className: "down", text: "移除" };
  if (!nextAuto || !oldAuto) return { className: "same", text: "0" };

  const diff = oldAuto.interval - nextAuto.interval;
  if (diff > 0) return { className: "up", text: `快${diff}ms` };
  if (diff < 0) return { className: "down", text: `慢${Math.abs(diff)}ms` };
  return { className: "same", text: "0" };
}

function equipmentArtHtml(item, small = false) {
  if (!item) return `<span class="equipment-art empty-art ${small ? "small" : ""}" aria-hidden="true"></span>`;
  const uploadedAsset = small ? rasterAsset(item.assets?.inventoryThumb) : rasterAsset(item.assets?.paperDoll);
  const customAsset = equipmentGeneratedAsset(item) || uploadedAsset;
  const weaponClass = item.weaponType ? `weapon-${item.weaponType}` : "";
  const style = customAsset ? ` style="background-image:url('${customAsset}')"` : "";
  return `<span class="equipment-art ${small ? "small" : ""} art-${item.slot} ${weaponClass} ${rarityByKey(item.rarity).colorClass}"${style} aria-hidden="true"></span>`;
}

function renderHeroBack() {
  if (!dom.heroBack) return;

  const weapon = equippedItemsForSlot("weapon")[0] || null;
  const weaponType = weapon ? weaponTypeByKey(weapon.weaponType, weapon.classKey).key : "none";
  const playerAsset = characterBackArtFor(state.playerClass);
  const battleAsset = weapon ? equipmentGeneratedAsset(weapon) : "";

  dom.heroBack.className = `hero-back has-player-art hero-${state.playerClass} hero-weapon-${weaponType}`;
  dom.heroBack.innerHTML = `
    <img class="hero-back-art" src="${playerAsset}" alt="" />
    <span class="hero-weapon ${weapon ? rarityByKey(weapon.rarity).colorClass : ""}" ${battleAsset ? `style="background-image:url('${battleAsset}')"` : ""}></span>
    ${weapon && state.playerClass === "warrior" ? `<span class="hero-grip" aria-hidden="true"></span>` : ""}
  `;
}

function renderBattlePet() {
  if (!dom.petBattleSprite) return;

  const pet = activePet();
  if (!pet) {
    dom.petBattleSprite.className = "pet-battle-sprite is-empty";
    dom.petBattleSprite.innerHTML = "";
    return;
  }

  const type = petTypeByKey(pet.type);
  const rarity = rarityByKey(pet.rarity);
  const dead = state.petHp <= 0;
  dom.petBattleSprite.className = `pet-battle-sprite pet-${type.key} ${rarity.colorClass} ${dead ? "is-dead" : ""}`;
  dom.petBattleSprite.innerHTML = `
    <img class="pet-sprite-art" src="${petArtFor(type.key, "back", pet.rarity)}" alt="" />
    <span class="pet-badge">${dead ? "治疗" : type.role.replace("型", "")}</span>
  `;
}

function equipmentHtml(item, mode = "inventory") {
  const rarity = rarityByKey(item.rarity);
  const className = classes[item.classKey].name;
  const slotName = slotByKey(item.slot).name;
  const weaponType = item.slot === "weapon" ? weaponTypeByKey(item.weaponType, item.classKey) : null;
  const locked = !canEquipItem(item);
  const equipped = isEquipped(item.id);
  const expanded = expandedEquipmentId === item.id;
  const comparison = comparisonRows(item);
  const mergeMaterial = mode === "shop" ? null : equipmentMergeMaterialFor(item);
  const mergeRarity = nextRarityKey(item.rarity);
  const mergeLabel = mergeRarity ? `合并到${rarityText(mergeRarity)}` : "已最高品质";
  const actions = mode === "shop"
    ? `<button class="primary-button" type="button" data-buy="${item.id}" ${state.gold < item.price ? "disabled" : ""}>购买 ${item.price}G</button>`
    : `
      <button class="mini-button" type="button" data-equip="${item.id}" ${locked || equipped ? "disabled" : ""}>装备</button>
      <button class="mini-button" type="button" data-merge-equip="${item.id}" ${mergeMaterial ? "" : "disabled"}>${mergeLabel}</button>
      <button class="mini-button" type="button" data-sell="${item.id}" ${equipped ? "disabled" : ""}>出售 ${sellValue(item)}G</button>
      <button class="danger-button" type="button" data-melt="${item.id}" ${equipped ? "disabled" : ""}>熔炼 ${formatMaterials(meltValue(item), true)}</button>
    `;

  return `
    <article class="${mode === "shop" ? "shop-card" : "item-card"} ${expanded ? "is-expanded" : ""}" data-inspect-equipment="${item.id}">
      <header>
        ${equipmentArtHtml(item, true)}
        <div>
          <div class="item-title ${rarity.colorClass}">${item.name}</div>
          <div class="item-meta">
            <span class="tag">${rarity.name}</span>
            <span class="tag">Lv.${item.level}</span>
            <span class="tag">${className}</span>
            <span class="tag">${slotName}</span>
            ${weaponType ? `<span class="tag">${weaponType.name}</span>` : ""}
            <span class="tag">${item.setName}</span>
            <span class="tag">耐久 ${durabilityText(item)}</span>
          </div>
        </div>
        ${equipped ? `<span class="tag">已装备</span>` : ""}
      </header>
      <div class="item-detail-popover">
        <div class="item-stats">
          ${statLines(item).map((line) => `<span>${line}</span>`).join("") || "<span>无属性</span>"}
        </div>
        <div class="compare-panel">
          <p class="meta">对比：${comparison.current ? comparison.current.name : "空槽"}</p>
          ${mode !== "shop" ? `<p class="meta">合并：${mergeRarity ? (mergeMaterial ? `消耗 ${mergeMaterial.name}，提升到${rarityText(mergeRarity)}` : "需要 1 件同名同品质装备") : "当前已是最高品质"}</p>` : ""}
          ${comparison.html}
        </div>
      </div>
      ${locked && mode !== "shop" ? `<div class="locked">职业或等级不符合，暂时不能装备。</div>` : ""}
      <div class="${mode === "shop" ? "shop-actions" : "item-actions"}">${actions}</div>
    </article>
  `;
}

function renderTabs() {
  dom.tabs.forEach((button) => {
    const active = button.dataset.tab === state.activeTab;
    button.classList.toggle("active", active);
  });
  dom.pages.forEach((page) => {
    page.classList.toggle("active", page.dataset.page === state.activeTab);
  });
}

function renderTopbar() {
  const need = xpNeed();
  dom.accountName.textContent = currentUser ? currentUser.username : "未登录";
  updateAdminEntry();
  dom.className.textContent = classes[state.playerClass].name;
  dom.level.textContent = state.level;
  dom.battleLevel.textContent = state.level;
  dom.xp.textContent = state.level >= MAX_LEVEL ? "满级" : state.xp;
  dom.xpNeed.textContent = state.level >= MAX_LEVEL ? "70" : need;
  dom.xpBar.style.width = state.level >= MAX_LEVEL ? "100%" : `${clamp((state.xp / need) * 100, 0, 100)}%`;
  dom.gold.textContent = state.gold;
  dom.power.textContent = combatPower();
}

function renderDungeons() {
  dom.dungeonList.innerHTML = dungeons
    .map((dungeon) => {
      const active = state.dungeonId === dungeon.id;
      const pool = dungeonMonsterPool(dungeon.id);
      const minions = pool.filter((monster) => monster.tier === "minion");
      const elites = pool.filter((monster) => monster.tier === "elite");
      const bosses = pool.filter((monster) => monster.tier === "boss");
      const preview = [...minions.slice(0, 2), ...elites.slice(0, 1), ...bosses.slice(0, 1)].map((monster) => monster.name).join(" / ");
      return `
        <button class="dungeon-card ${active ? "active" : ""}" type="button" data-dungeon="${dungeon.id}">
          <strong>${dungeon.name}</strong>
          <div class="dungeon-meta">
            <span class="tag">建议 Lv.${dungeon.min}-${dungeon.max}</span>
            <span class="tag">建议战力 ${recommendedPower(dungeon)}</span>
            <span class="tag">${pool.length} 种怪物</span>
            <span class="tag">精英 ${elites.length} / BOSS ${bosses.length}</span>
          </div>
          <span class="meta">${preview}</span>
        </button>
      `;
    })
    .join("");
}

function renderBattle() {
  ensureVitals();
  const dungeon = getDungeon();
  const monster = state.monster;
  const hpPercent = clamp((monster.hp / monster.maxHp) * 100, 0, 100);
  const playerMax = playerMaxHp();
  const playerHpPercent = clamp((state.playerHp / playerMax) * 100, 0, 100);
  const pet = activePet();
  const petMax = pet ? petMaxHp(pet) : 0;
  const petHpPercent = pet ? clamp(((state.petHp || 0) / petMax) * 100, 0, 100) : 0;
  const petNeed = pet && pet.level < MAX_LEVEL ? petXpNeed(pet) : 0;
  const petXpPercent = pet ? (pet.level >= MAX_LEVEL ? 100 : clamp((pet.xp / petNeed) * 100, 0, 100)) : 0;
  const colors = dungeon.colors;
  const monsterType = monsterTypes[monster.type] || monsterTypes.minion;

  dom.dungeonLabel.textContent = `${dungeon.name}${monster.boss ? " · 首领战" : ""}`;
  dom.dungeonSelectLabel.textContent = dungeon.name;
  dom.monsterName.textContent = monster.name;
  dom.monsterLevel.textContent = monster.level;
  dom.monsterType.textContent = monsterType.name;
  dom.monsterAttack.textContent = monster.attack;
  dom.monsterTitle.textContent = monster.name;
  dom.playerHp.textContent = Math.ceil(state.playerHp);
  dom.playerMaxHp.textContent = playerMax;
  dom.playerHpBar.style.width = `${playerHpPercent}%`;
  dom.petBattleHp.textContent = pet ? `${Math.ceil(state.petHp || 0)}/${petMax}` : "未出战";
  dom.petBattleHpBar.style.width = `${petHpPercent}%`;
  dom.petBattleXp.textContent = pet ? (pet.level >= MAX_LEVEL ? "满级" : `${pet.xp}/${petNeed}`) : "未出战";
  dom.petBattleXpBar.style.width = `${petXpPercent}%`;
  dom.hp.textContent = Math.ceil(monster.hp);
  dom.maxHp.textContent = monster.maxHp;
  dom.hpBar.style.width = `${hpPercent}%`;
  dom.monsterButton.disabled = false;
  const monsterArt = monsterArtFor(monster);
  const monsterVisual = monsterVisualFor(monster);
  dom.monsterButton.classList.toggle("has-generated-art", Boolean(monsterArt));
  dom.monsterButton.dataset.monsterTier = monsterVisual.tier;
  if (monsterArt) dom.monsterButton.style.setProperty("--monster-art", `url('${monsterArt}')`);
  else dom.monsterButton.style.removeProperty("--monster-art");
  dom.monsterButton.style.setProperty("--monster-scale", monsterVisual.scale);
  dom.monsterButton.style.setProperty("--monster-hue", `${monsterVisual.hue}deg`);
  dom.monsterButton.style.setProperty("--monster-saturation", monsterVisual.saturation);
  dom.monsterButton.style.setProperty("--monster-glow", monsterVisual.glow);
  dom.damage.textContent = clickDamage();
  dom.crit.textContent = `${Math.round(critChance() * 100)}%`;
  dom.petDps.textContent = petDpsText(pet);
  dom.autoClick.textContent = autoClickLabel();
  renderHeroBack();
  renderBattlePet();
  renderGroundLoot();
  dom.body.style.setProperty("--monster-main", colors[0]);
  dom.body.style.setProperty("--monster-hot", colors[1]);
  dom.body.style.setProperty("--monster-dark", colors[2]);
  dom.log.innerHTML = state.log.map((item) => `<li>${item}</li>`).join("");
}

function renderGroundLoot() {
  if (!dom.groundLoot) return;

  state.groundLoot = normalizeGroundLoot(state.groundLoot);
  const gold = state.groundLoot.gold || 0;
  const goldScale = clamp(0.76 + Math.sqrt(gold) / 24, 0.76, 1.72);
  const goldHtml = gold
    ? `
      <button class="ground-gold-pile" type="button" data-ground-gold data-ground-x="44" data-ground-y="68" style="--gold-scale: ${goldScale.toFixed(2)}" aria-label="拾取 ${gold} 金币">
        <img class="ground-gold-art" src="${generatedItemAssets.gold}" alt="" />
        <strong>${gold}</strong>
      </button>
    `
    : "";
  dom.groundLoot.innerHTML = `${goldHtml}${state.groundLoot.items.map(groundLootHtml).join("")}`;
}

function groundLootQuantity(loot) {
  return Math.max(1, Math.floor(loot.quantity || groundLootPayloads(loot).length || 1));
}

function groundLootDisplayTitle(loot) {
  if (loot?.type === "gem") {
    const payloads = groundLootPayloads(loot);
    const gemKey = payloads.find((payload) => payload.gemKey)?.gemKey || loot.payload?.gemKey;
    const amount = payloads.reduce((sum, payload) => sum + Math.max(1, Math.floor(payload.amount || 1)), 0);
    if (gemKey && amount > 0) return `${gemLabel(gemKey)} x${amount}`;
  }
  if (loot?.type === "material") {
    const total = mergeMaterialBundles(...groundLootPayloads(loot).map((payload) => payload.materials || {}));
    if (Object.keys(total).length) return formatMaterials(total, true);
  }
  return loot?.title || "掉落物";
}

function groundLootStackSuffix(loot) {
  const quantity = groundLootQuantity(loot);
  return quantity > 1 && loot?.type !== "gem" && loot?.type !== "material" ? ` x${quantity}` : "";
}

function groundLootHtml(loot) {
  const rarityClass = loot.rarity ? rarityByKey(loot.rarity).colorClass : "";
  const legendaryClass = loot.rarity === "legend" ? "is-legendary" : "";
  const quantity = groundLootQuantity(loot);
  const title = groundLootDisplayTitle(loot);
  const quantityText = groundLootStackSuffix(loot);
  return `
    <button
      class="ground-loot ${loot.type || "item"} ${rarityClass} ${legendaryClass}"
      type="button"
      data-ground-loot="${loot.id}"
      data-ground-x="${clamp(loot.x || 50, 18, 82)}"
      data-ground-y="${clamp(loot.y || 58, 36, 84)}"
      style="left: ${clamp(loot.x || 50, 18, 82)}%; top: ${clamp(loot.y || 58, 36, 84)}%;"
      aria-label="拾取 ${title}${quantityText}"
      title="${loot.detail || title}"
    >
      ${groundLootIconHtml(loot)}
      ${quantity > 1 ? `<b class="ground-loot-count">x${quantity}</b>` : ""}
      <span class="ground-loot-name">${title}${quantityText}</span>
    </button>
  `;
}

function groundLootIconHtml(loot) {
  if (loot.type === "equipment" && loot.payload?.item) return equipmentArtHtml(loot.payload.item, true);
  if (loot.type === "egg") return eggVisualHtml("normal", true);
  if (loot.type === "gem") return generatedItemIconHtml("gem", loot.payload || groundLootPayloads(loot)[0] || {});
  if (loot.type === "material") {
    const materials = mergeMaterialBundles(...groundLootPayloads(loot).map((payload) => payload.materials || {}));
    return generatedItemIconHtml("material", { materials });
  }
  return generatedItemIconHtml("item");
}

function renderPetSubTabs() {
  if (!dom.petSubTabs) return;

  dom.petSubTabs.innerHTML = petSubTabs
    .map(
      (tab) => `
        <button class="subtab-button ${state.petView === tab.key ? "active" : ""}" type="button" role="tab" data-pet-view="${tab.key}" aria-selected="${state.petView === tab.key}">
          ${tab.name}
        </button>
      `,
    )
    .join("");

  dom.petSubViews.forEach((view) => {
    view.classList.toggle("active", view.dataset.petSubview === state.petView);
  });
}

function renderPetControls(filteredCount, sellableCount) {
  return `
    <div class="filter-row" role="group" aria-label="宠物品质筛选">
      ${petRarityFilters
        .map(
          (filter) => `
            <button class="switch-button ${state.petFilter.rarity === filter.key ? "active" : ""}" type="button" data-pet-filter-rarity="${filter.key}">
              ${filter.name}
            </button>
          `,
        )
        .join("")}
    </div>
    <div class="filter-row split">
      <div class="summary-strip">
        <span>当前筛选：<strong>${filteredCount}</strong></span>
        <span>可批量出售：<strong>${sellableCount}</strong></span>
      </div>
      <div class="bulk-actions">
        <button class="danger-button" type="button" data-sell-visible-pets ${sellableCount ? "" : "disabled"}>一键出售 ${sellableCount}</button>
      </div>
    </div>
  `;
}

function petFusionPairs() {
  const used = new Set();
  const pairs = [];

  for (const pet of state.pets) {
    if (used.has(pet.id) || !nextPetRarityKey(pet.rarity)) continue;
    const material = evolutionMaterialFor(pet);
    if (!material || used.has(material.id)) continue;
    pairs.push({ pet, material, nextRarity: nextPetRarityKey(pet.rarity) });
    used.add(pet.id);
    used.add(material.id);
  }

  return pairs;
}

function renderPetFusion() {
  const pairs = petFusionPairs();
  const fusionReady = pairs.length;
  const candidates = state.pets.filter((pet) => nextPetRarityKey(pet.rarity)).length;
  dom.petFusionSummary.innerHTML = `
    <span>可合成：<strong>${fusionReady}</strong></span>
    <span>候选宠物：<strong>${candidates}</strong></span>
    <span>规则：<strong>同类型同品质两只合成</strong></span>
  `;
  dom.petFusionList.innerHTML = pairs.length
    ? pairs
        .map(({ pet, material, nextRarity }) => {
          const rarity = rarityByKey(pet.rarity);
          const next = rarityByKey(nextRarity);
          const type = petTypeByKey(pet.type);
          return `
            <article class="pet-card fusion-card">
              <header>
                <div>
                  <h3 class="${next.colorClass}">${type.name} · ${next.name}</h3>
                  <div class="pet-meta">
                    <span class="tag">${rarity.name} + ${rarity.name}</span>
                    <span class="tag">${type.role}</span>
                    <span class="tag">Lv.重置</span>
                  </div>
                </div>
              </header>
              <div class="fusion-pair">
                <div class="pet-card-art ${rarity.colorClass}">
                  <img src="${petArtFor(type.key, "front", pet.rarity)}" alt="" />
                </div>
                <span class="fusion-plus">+</span>
                <div class="pet-card-art ${rarity.colorClass}">
                  <img src="${petArtFor(type.key, "front", material.rarity)}" alt="" />
                </div>
              </div>
              <div class="pet-stats">
                <span>主宠 ${pet.name}</span>
                <span>材料 ${material.name}</span>
                <span>目标 ${next.name}</span>
              </div>
              <div class="pet-actions">
                <button class="primary-button" type="button" data-evolve-pet="${pet.id}">合成到${next.name}</button>
              </div>
            </article>
          `;
        })
        .join("")
    : `<p class="meta">当前没有可合成宠物。需要两只同类型、同品质，并且还没有达到最高品质。</p>`;
}

function renderPetSkillPanel(pet) {
  if (!expandedPetSkill?.startsWith(`${pet.id}:`)) return "";

  const level = Number(expandedPetSkill.split(":")[1]);
  const skill = petTypeByKey(pet.type).skills.find(([skillLevel]) => skillLevel === level);
  if (!skill) return "";

  const detail = petSkillDetail(pet, skill[0], skill[1], skill[2]);
  return `
    <div class="skill-detail">
      <strong>${detail.title}</strong>
      <span class="${detail.unlocked ? "skill-on" : "skill-off"}">${detail.unlocked ? "已解锁" : `宠物 ${level} 级解锁`}</span>
      <p>${detail.description}</p>
      <p>${detail.effect}</p>
    </div>
  `;
}

function renderPets() {
  const pet = activePet();
  const filtered = filteredPets();
  const sellable = filtered.filter((entry) => entry.id !== state.activePetId);
  const slots = incubatorSlots();
  const readySlots = slots.filter((slot) => slot.egg && incubatorRemainingMs(slot) <= 0).length;
  renderPetSubTabs();
  dom.petSummary.innerHTML = `
    <span>出战宠物：<strong>${pet ? pet.name : "无"}</strong></span>
    <span>宠物战力：<strong>${petPower(pet)}</strong></span>
    <span>可收取：<strong>${readySlots}</strong></span>
  `;
  dom.hatchStation.innerHTML = renderHatchStation(slots);
  dom.petControls.innerHTML = renderPetControls(filtered.length, sellable.length);
  renderPetFusion();
  dom.petList.innerHTML = filtered.length
    ? filtered
        .map((entry) => {
          const rarity = rarityByKey(entry.rarity);
          const type = petTypeByKey(entry.type);
          const active = state.activePetId === entry.id;
          const need = entry.level >= MAX_LEVEL ? 0 : petXpNeed(entry);
          const dead = active && state.petHp <= 0;
          const currentHp = active ? Math.ceil(state.petHp || 0) : petMaxHp(entry);
          const healCost = petHealCost(entry);
          const nextRarity = nextPetRarityKey(entry.rarity);
          const evolutionMaterial = evolutionMaterialFor(entry);
          const skills = type.skills
            .map(
              ([level, name]) => `
                <button class="skill-pill ${entry.level >= level ? "skill-on" : "skill-off"} ${expandedPetSkill === `${entry.id}:${level}` ? "active" : ""}" type="button" data-pet-skill="${entry.id}:${level}">
                  Lv.${level} ${name}
                </button>
              `,
            )
            .join("");
          return `
            <article class="pet-card ${dead ? "is-dead" : ""}">
              <header>
                <div>
                  <h3 class="${rarity.colorClass}">${entry.name}</h3>
                  <div class="pet-meta">
                    <span class="tag">${rarity.name}</span>
                    <span class="tag">${type.role}</span>
                    <span class="tag">Lv.${entry.level}</span>
                    ${dead ? `<span class="tag">倒下</span>` : ""}
                  </div>
                </div>
                ${active ? `<span class="tag">出战</span>` : ""}
              </header>
              <div class="pet-card-art ${rarity.colorClass}">
                <img src="${petArtFor(type.key, "front", entry.rarity)}" alt="" />
              </div>
              <div class="pet-stats">
                <span>战力 +${petPower(entry)}</span>
                <span>生命 ${currentHp}/${petMaxHp(entry)}</span>
                <span>攻击 ${petAttackDamage(entry)}</span>
                <span>经验 ${entry.level >= MAX_LEVEL ? "满级" : `${entry.xp}/${need}`}</span>
                <span>售价 ${petSellValue(entry)}G</span>
                <span>治疗 ${formatMaterials(healCost, true)}</span>
              </div>
              <div class="skill-list">${skills}</div>
              ${renderPetSkillPanel(entry)}
              <div class="pet-actions">
                <button class="mini-button" type="button" data-active-pet="${entry.id}" ${active ? "disabled" : ""}>出战</button>
                <button class="mini-button" type="button" data-heal-pet="${entry.id}" ${dead && canAffordMaterials(healCost) ? "" : "disabled"}>治疗</button>
                <button class="mini-button" type="button" data-evolve-pet="${entry.id}" ${nextRarity && evolutionMaterial ? "" : "disabled"}>
                  ${nextRarity ? `合体到${rarityText(nextRarity)}` : "已最高品质"}
                </button>
                <button class="danger-button" type="button" data-sell-pet="${entry.id}">出售</button>
              </div>
            </article>
          `;
        })
        .join("")
    : `<p class="meta">${state.pets.length ? "当前品质筛选下没有宠物。" : "还没有宠物。去战场刷副本，怪物有概率掉落宠物蛋。"}</p>`;
}

function renderHatchStation(slots = incubatorSlots()) {
  return `
    ${renderIncubatorStationBar()}
    <div class="incubator-grid">
      ${slots.map(renderIncubatorSlotCard).join("")}
    </div>
  `;
}

function renderIncubatorStationBar() {
  const cost = incubatorSlotUpgradeCost();
  const canUpgrade = Boolean(cost && canAffordMaterials(cost.materials));
  return `
    <section class="incubator-station-bar" aria-label="孵化台状态">
      <div class="incubator-station-summary">
        <span>当前宠物蛋 <strong>${state.eggs.length}</strong></span>
        <span>当前材料 ${formatMaterials(state.materials, true)}</span>
        ${cost ? `<span>需要 ${formatMaterials(cost.materials)}</span>` : ""}
      </div>
      <button class="mini-button incubator-slot-add-button" type="button" data-upgrade-incubator-slots ${canUpgrade ? "" : "disabled"}>
        ${cost ? "新增槽位" : "槽位已满"}
      </button>
    </section>
  `;
}

function incubatorSlotLevel(slot) {
  return 1 + Math.floor(slot?.timeLevel || 0) + Math.floor(slot?.successLevel || 0);
}

function renderIncubatorSlotCard(slot, index) {
  const hasEgg = Boolean(slot.egg);
  const remaining = incubatorRemainingMs(slot);
  const ready = hasEgg && remaining <= 0;
  const duration = incubatorHatchDuration(slot);
  const progress = incubatorProgress(slot);
  const upgradeCost = incubatorSlotStatUpgradeCost(slot);
  const canUpgrade = Boolean(upgradeCost && canAffordMaterials(upgradeCost.materials));
  const nextDuration = upgradeCost ? incubatorDurationForLevel(upgradeCost.timeNext) : duration;
  const nextSuccess = upgradeCost
    ? 1 - clamp(STINK_EGG_CHANCE - upgradeCost.successNext * INCUBATOR_SUCCESS_STEP, MIN_STINK_EGG_CHANCE, STINK_EGG_CHANCE)
    : incubatorSuccessChance(slot);
  const status = !hasEgg ? "" : ready ? "孵化完成" : `剩余 ${formatDuration(remaining)}`;
  const padTime = !hasEgg ? "" : ready ? "可收取" : formatDuration(remaining);
  const cardAction = !hasEgg ? `data-incubator-empty-slot="${slot.id}"` : "";
  const padAction = ready
    ? `role="button" tabindex="0" data-hatch-slot="${slot.id}" aria-label="收取 ${index + 1} 号槽宠物"`
    : !hasEgg
      ? `role="button" tabindex="0" data-incubator-empty-slot="${slot.id}" aria-label="使用 ${index + 1} 号槽开始孵化"`
      : `aria-label="${index + 1} 号槽正在孵化"`;

  return `
    <section class="incubator-card ${hasEgg ? "has-egg" : "is-empty-clickable"}" aria-label="宠物蛋孵化台" ${cardAction}>
      <div class="incubator-pad ${ready ? "is-ready" : hasEgg ? "is-busy" : "is-placeable"}" ${padAction}>
        <span class="incubator-aura" aria-hidden="true"></span>
        <img class="incubator-slot-art" src="${generatedItemAssets.incubator}" alt="" />
        ${hasEgg ? eggVisualHtml("normal") : ""}
        ${padTime ? `<span class="incubator-pad-time" data-incubator-time="${slot.id}">${padTime}</span>` : ""}
      </div>
      <div class="incubator-info">
        <div class="incubator-title">
          <h3>${index + 1} 号槽 · Lv.${incubatorSlotLevel(slot)}</h3>
          <span class="tag">${ready ? "可收取" : hasEgg ? "孵化中" : "待命"}</span>
        </div>
        ${status ? `<p data-incubator-status="${slot.id}">${status}</p>` : ""}
        <div class="incubator-progress" aria-hidden="true"><i data-incubator-progress="${slot.id}" style="width: ${progress.toFixed(1)}%"></i></div>
        <div class="incubator-stat-strip">
          <span>速度 Lv.${slot.timeLevel}/${MAX_INCUBATOR_TIME_LEVEL} · ${formatDuration(duration)}</span>
          <span>成功率 Lv.${slot.successLevel}/${MAX_INCUBATOR_SUCCESS_LEVEL} · ${Math.round(incubatorSuccessChance(slot) * 100)}%</span>
        </div>
        <div class="incubator-slot-upgrades">
          <button class="mini-button" type="button" data-upgrade-incubator-slot="${slot.id}" ${canUpgrade ? "" : "disabled"}>
            ${upgradeCost ? `升级：${formatDuration(nextDuration)} / 成功率 ${Math.round(nextSuccess * 100)}% · ${formatMaterials(upgradeCost.materials, true)}` : "槽位已满级"}
          </button>
        </div>
      </div>
    </section>
  `;
}

function eggVisualHtml(kind = "normal", small = false) {
  return `
    <span class="egg-visual egg-${kind} ${small ? "small" : ""}" aria-hidden="true">
      <img src="${generatedItemAssets.egg}" alt="" />
    </span>
  `;
}

function restoreEquipmentListScroll(scrollTop) {
  if (!dom.equipmentList || scrollTop <= 0) return;
  const target = Math.min(scrollTop, Math.max(0, dom.equipmentList.scrollHeight - dom.equipmentList.clientHeight));
  dom.equipmentList.scrollTop = target;
  window.requestAnimationFrame(() => {
    if (!dom.equipmentList) return;
    dom.equipmentList.scrollTop = Math.min(target, Math.max(0, dom.equipmentList.scrollHeight - dom.equipmentList.clientHeight));
  });
}

function renderEquipment(options = {}) {
  const preserveScroll = options.preserveScroll !== false;
  const previousListScroll = preserveScroll && dom.equipmentList ? dom.equipmentList.scrollTop : 0;

  dom.classButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.class === state.playerClass);
  });

  dom.equippedSlots.innerHTML = renderPaperDoll();

  const bonus = setBonuses();
  dom.setBonusPanel.innerHTML = `
    <span>当前套装：<strong>${bonus.text}</strong></span>
    <span>套装攻击/法术：<strong>+${bonus.attackBonus}</strong></span>
    <span>套装暴击：<strong>+${Math.round(bonus.critBonus * 100)}%</strong></span>
  `;

  const backpack = backpackItems();
  const filtered = filteredBackpackItems();
  dom.equipmentControls.innerHTML = renderEquipmentControls(filtered.length, backpack.length);
  dom.equipmentList.innerHTML = filtered.length
    ? filtered.map((item) => equipmentHtml(item)).join("")
    : `<p class="meta">当前分类里没有未装备物品。去战场打副本，或者在商店购买。</p>`;
  restoreEquipmentListScroll(previousListScroll);
}

function renderPaperDoll() {
  const slotsHtml = equippedSlotDefs
    .map((slot) => {
      const item = equippedItemForSlotKey(slot.key);
      const hasUpgradeNotice = hasSlotUpgradeNotice(slot);
      return `
        <button class="paper-slot ${slot.paperClass} ${item ? "is-filled" : ""} ${hasUpgradeNotice ? "has-upgrade" : ""} ${activeSlotPickerKey === slot.key ? "active" : ""}" type="button" data-open-slot="${slot.key}" aria-label="选择${slot.name}">
          ${hasUpgradeNotice ? `<b class="slot-new-badge">新</b>` : ""}
          ${equipmentArtHtml(item)}
          <span>${slot.name}</span>
        </button>
      `;
    })
    .join("");

  const cardsHtml = equippedSlotDefs
    .map((slot) => {
      const item = equippedItemForSlotKey(slot.key);
      return `
        <article class="slot-card">
          <h3>${slot.name}</h3>
          ${
            item
              ? `
                <div class="slot-card-main">
                  ${equipmentArtHtml(item, true)}
                  <div>
                    <div class="item-title ${rarityByKey(item.rarity).colorClass}">${item.name}</div>
                    <div class="item-meta">
                      <span class="tag">${rarityText(item.rarity)}</span>
                      <span class="tag">Lv.${item.level}</span>
                      <span class="tag">${item.setName}</span>
                      <span class="tag">耐久 ${durabilityText(item)}</span>
                    </div>
                    <div class="item-stats slot-stats">
                      ${statLines(item).map((line) => `<span>${line}</span>`).join("") || "<span>无属性</span>"}
                    </div>
                  </div>
                </div>
              `
              : `<span class="empty">未装备</span>`
          }
        </article>
      `;
    })
    .join("");

  return `
    <div class="paper-doll">
      <div class="silhouette" aria-hidden="true">
        <span class="silhouette-head"></span>
        <span class="silhouette-body"></span>
        <span class="silhouette-arm left"></span>
        <span class="silhouette-arm right"></span>
        <span class="silhouette-leg left"></span>
        <span class="silhouette-leg right"></span>
      </div>
      ${slotsHtml}
      ${activeSlotPickerKey ? renderSlotPicker(activeSlotPickerKey) : ""}
    </div>
    <div class="slot-grid">${cardsHtml}</div>
  `;
}

function renderSlotPicker(slotKey) {
  const slotDef = equippedSlotDefs.find((slot) => slot.key === slotKey);
  if (!slotDef) {
    activeSlotPickerKey = null;
    return "";
  }

  const current = equippedItemForSlotKey(slotDef.key);
  const candidates = slotPickerCandidates(slotDef);
  const slotName = slotDef.name;

  return `
    <section class="slot-picker" role="dialog" aria-label="${slotName}可装备列表">
      <header>
        <div>
          <span>选择${slotName}</span>
          <strong>${candidates.length} 件可装备</strong>
        </div>
        <button class="mini-button" type="button" data-close-slot-picker>收起</button>
      </header>
      ${
        current
          ? `
            <div class="slot-picker-current">
              <span>当前装备</span>
              ${slotPickerItemHtml(current, slotDef.key, { current: true })}
            </div>
          `
          : ""
      }
      <div class="slot-picker-list">
        ${
          candidates.length
            ? candidates.map((item) => slotPickerItemHtml(item, slotDef.key)).join("")
            : `<p class="meta">背包里没有当前职业、当前等级可装备的${slotName}。</p>`
        }
      </div>
    </section>
  `;
}

function slotPickerItemHtml(item, slotKey, options = {}) {
  const rarity = rarityByKey(item.rarity);
  const comparison = comparisonRows(item, slotKey);
  const mainStats = statLines(item).slice(0, 4);
  const actionAttributes = options.current
    ? `data-slot-picker-unequip="${slotKey}" aria-label="卸下${item.name}"`
    : `data-slot-picker-equip="${item.id}" data-slot-picker-slot="${slotKey}" aria-label="装备${item.name}"`;
  const actionHint = options.current ? "点击卸下" : "点击装备";

  return `
    <article class="slot-picker-item ${options.current ? "is-current" : ""}" role="button" tabindex="0" ${actionAttributes}>
      ${equipmentArtHtml(item, true)}
      <div class="slot-picker-info">
        <div class="item-title ${rarity.colorClass}">${item.name}</div>
        <div class="item-meta">
          <span class="tag">${rarity.name}</span>
          <span class="tag">Lv.${item.level}</span>
          <span class="tag">${item.setName}</span>
          <span class="tag">耐久 ${durabilityText(item)}</span>
        </div>
        <div class="slot-picker-stats">
          ${mainStats.map((line) => `<span>${line}</span>`).join("") || "<span>无属性</span>"}
        </div>
        <div class="slot-picker-compare">${comparison.html}</div>
      </div>
      <span class="slot-picker-action-hint">${actionHint}</span>
    </article>
  `;
}

function renderEquipmentControls(filteredCount, backpackCount) {
  const capacity = bagCapacity();
  return `
    <div class="filter-row" role="group" aria-label="装备部位分类">
      ${equipmentSlotFilters
        .map(
          (filter) => `
            <button class="switch-button ${state.equipmentFilter.slot === filter.key ? "active" : ""}" type="button" data-equip-filter-slot="${filter.key}">
              ${filter.name}
            </button>
          `,
        )
        .join("")}
    </div>
    <div class="filter-row" role="group" aria-label="装备品质分类">
      ${equipmentRarityFilters
        .map(
          (filter) => `
            <button class="switch-button ${state.equipmentFilter.rarity === filter.key ? "active" : ""}" type="button" data-equip-filter-rarity="${filter.key}">
              ${filter.name}
            </button>
          `,
        )
        .join("")}
    </div>
    <div class="filter-row split">
      <div class="switch-group equipment-filter-group" role="group" aria-label="装备职业分类">
        ${equipmentClassFilters
          .map(
            (filter) => `
              <button class="switch-button ${state.equipmentFilter.classKey === filter.key ? "active" : ""}" type="button" data-equip-filter-class="${filter.key}">
                ${filter.name}
              </button>
            `,
          )
          .join("")}
      </div>
      <div class="switch-group equipment-filter-group" role="group" aria-label="可装备筛选">
        ${equipmentWearableFilters
          .map(
            (filter) => `
              <button class="switch-button ${state.equipmentFilter.wearable === filter.key ? "active" : ""}" type="button" data-equip-filter-wearable="${filter.key}">
                ${filter.name}
              </button>
            `,
          )
          .join("")}
      </div>
      <div class="bulk-actions">
        <button class="mini-button" type="button" data-sell-visible ${filteredCount ? "" : "disabled"}>一键出售 ${filteredCount}</button>
        <button class="danger-button" type="button" data-melt-visible ${filteredCount ? "" : "disabled"}>一键熔炼 ${filteredCount}</button>
      </div>
    </div>
    <div class="summary-strip">
      <span>当前分类：<strong>${filteredCount}</strong></span>
      <span>背包：<strong>${backpackCount}/${capacity}</strong></span>
      <span>已装备：<strong>${getEquippedItems().length}</strong></span>
    </div>
  `;
}

function renderItems() {
  const backpackCount = backpackItems().length;
  const capacity = bagCapacity();
  const materialCards = materialTypes
    .map(
      (material) => `
        <article class="inventory-card">
          ${inventoryIconHtml(generatedItemAssets.materials[material.key] || generatedItemAssets.material, material.name)}
          <span>${material.name}</span>
          <strong>${state.materials[material.key] || 0}</strong>
          <span class="meta">${material.use}</span>
        </article>
      `,
    )
    .join("");

  dom.itemSummary.innerHTML = `
    ${materialCards}
    <article class="inventory-card">${inventoryIconHtml(gemAssetFor("ruby"), gemNames[0])}<span>${gemNames[0]}</span><strong>${state.gems.ruby}</strong><span class="meta">偏攻击向锻造宝石，用于提高装备输出词条。</span></article>
    <article class="inventory-card">${inventoryIconHtml(gemAssetFor("jade"), gemNames[1])}<span>${gemNames[1]}</span><strong>${state.gems.jade}</strong><span class="meta">偏防御和生命向宝石，适合打造承伤装备。</span></article>
    <article class="inventory-card">${inventoryIconHtml(gemAssetFor("star"), gemNames[2])}<span>${gemNames[2]}</span><strong>${state.gems.star}</strong><span class="meta">稀有通用宝石，用于高等级装备锻造。</span></article>
    <article class="inventory-card">${inventoryIconHtml(generatedItemAssets.egg, "宠物蛋")}<span>宠物蛋</span><strong>${state.eggs.length}</strong><span class="meta">孵化后随机获得宠物，品质和类型看运气。</span></article>
    <article class="inventory-card">${inventoryIconHtml(generatedItemAssets.bag, "装备行囊")}<span>装备行囊</span><strong>${backpackCount}/${capacity}</strong><span class="meta">决定未装备物品容量，已装备不占背包显示。</span></article>
  `;

  const materialCost = forgeMaterialCost();
  const gemCost = 2 + Math.floor(state.level / 20);
  const canForge = canAffordMaterials(materialCost) && totalGems() >= gemCost;
  dom.forgePanel.innerHTML = `
    <article class="forge-card">
      <div>
        <h3>职业装备锻造</h3>
        <p class="meta">消耗材料和任意宝石，打造当前职业、接近当前等级的随机装备。</p>
      </div>
      <div class="item-stats">
        <span>需要材料 ${formatMaterials(materialCost)}</span>
        <span>需要宝石 ${gemCost}</span>
        <span>当前材料 ${formatMaterials(state.materials, true)}</span>
        <span>当前宝石 ${totalGems()}</span>
      </div>
      <div class="forge-actions">
        <button class="primary-button" type="button" data-forge="equipment" ${canForge ? "" : "disabled"}>锻造装备</button>
      </div>
    </article>
    ${renderBagUpgradeCard()}
    ${renderRepairCard()}
  `;
}

function renderBagUpgradeCard() {
  const current = bagCapacity();
  const next = bagUpgradeCost();
  const canUpgrade = state.gold >= next.gold && canAffordMaterials(next.materials);

  return `
    <article class="forge-card">
      <div>
        <h3>装备行囊</h3>
        <p class="meta">每次扩充 50 件。500 件前主要消耗布料，500 件后会逐步加入厚皮、精铁、灵木和魔晶。</p>
      </div>
      <div class="item-stats">
        <span>当前容量 ${current} 件</span>
        <span>下一容量 ${next.target} 件</span>
        <span>需要金币 ${next.gold}</span>
        <span>需要材料 ${formatMaterials(next.materials)}</span>
        <span>当前背包 ${backpackItems().length}/${current}</span>
      </div>
      <div class="forge-actions">
        <button class="primary-button" type="button" data-upgrade-bag ${canUpgrade ? "" : "disabled"}>扩充行囊 +50</button>
      </div>
    </article>
  `;
}

function renderRepairCard() {
  const cost = repairCost();
  const needsRepair = Object.keys(cost).length > 0;
  return `
    <article class="forge-card">
      <div>
        <h3>装备修补</h3>
        <p class="meta">死亡会降低已装备耐久，耐久越低，装备属性发挥越差。</p>
      </div>
      <div class="item-stats">
        <span>需要材料 ${formatMaterials(cost)}</span>
        <span>当前材料 ${formatMaterials(state.materials, true)}</span>
      </div>
      <div class="forge-actions">
        <button class="primary-button" type="button" data-repair-equipped ${needsRepair && canAffordMaterials(cost) ? "" : "disabled"}>修补已装备</button>
      </div>
    </article>
  `;
}

function renderShop() {
  dom.refreshShop.disabled = state.gold < 30;
  dom.shopList.innerHTML = state.shop.length
    ? state.shop.map((item) => equipmentHtml(item, "shop")).join("")
    : `<p class="meta">商店空了，点击刷新商店。</p>`;
}

function render() {
  renderTabs();
  renderTopbar();
  renderDungeons();
  renderBattle();
  renderPets();
  renderEquipment();
  renderItems();
  renderShop();
}

function showDamage(value, kind = "hit", pointerEvent) {
  const pop = document.createElement("span");
  pop.className = `damage-pop ${kind === "crit" ? "crit" : ""} ${kind === "reward" ? "reward" : ""} ${kind === "auto" ? "auto" : ""} ${kind === "pet" ? "pet" : ""}`;
  pop.textContent = typeof value === "number" ? `-${value}` : value;
  pop.style.setProperty("--dx", `${Math.round((Math.random() - 0.5) * 80)}px`);

  if (pointerEvent) {
    const rect = dom.monsterButton.getBoundingClientRect();
    const x = ((pointerEvent.clientX - rect.left) / rect.width) * 100;
    const y = ((pointerEvent.clientY - rect.top) / rect.height) * 100;
    pop.style.left = `${clamp(x, 16, 84)}%`;
    pop.style.top = `${clamp(y, 18, 78)}%`;
  }

  dom.damageLayer.append(pop);
  window.setTimeout(() => pop.remove(), 820);
}

function showBattlePop(target, text, kind = "hurt") {
  if (!dom.effectLayer) return;

  const pop = document.createElement("span");
  pop.className = `battle-pop ${target} ${kind}`;
  pop.textContent = text;
  pop.style.setProperty("--dx", `${Math.round((Math.random() - 0.5) * 42)}px`);
  dom.effectLayer.append(pop);
  window.setTimeout(() => pop.remove(), 900);
}

function showPickupPop(text, options = {}) {
  if (!dom.effectLayer || !text) return;

  const pop = document.createElement("span");
  const rarityClass = options.rarity ? rarityByKey(options.rarity).colorClass : "";
  pop.className = `pickup-pop ${rarityClass} ${options.gold ? "gold" : ""}`;
  pop.textContent = text;
  pop.style.left = `${clamp(Number(options.x) || 50, 12, 88)}%`;
  pop.style.top = `${clamp(Number(options.y) || 62, 28, 84)}%`;
  pop.style.setProperty("--dx", `${Math.round((Math.random() - 0.5) * 56)}px`);
  dom.effectLayer.append(pop);
  window.setTimeout(() => pop.remove(), 980);
}

function showDropToast(drop) {
  if (!dom.dropToastStack || !drop) return;

  const toast = document.createElement("article");
  toast.className = `drop-toast ${drop.rarity ? rarityByKey(drop.rarity).colorClass : ""}`;

  const title = document.createElement("strong");
  title.textContent = drop.title || "获得物品";
  const detail = document.createElement("span");
  detail.textContent = drop.detail || "已放入背包";

  toast.append(title, detail);
  dom.dropToastStack.prepend(toast);

  while (dom.dropToastStack.children.length > 4) {
    dom.dropToastStack.lastElementChild.remove();
  }

  window.setTimeout(() => toast.remove(), 3600);
}

function isLegendaryWeaponLoot(loot) {
  if (!loot || loot.type !== "equipment") return false;
  return groundLootPayloads(loot).some((payload) => payload.item?.slot === "weapon" && payload.item?.rarity === "legend");
}

function groundLootBagSlotsNeeded(loot) {
  if (!loot || loot.type !== "equipment") return 0;
  const payloadCount = groundLootPayloads(loot).filter((payload) => payload.item).length;
  return Math.max(1, payloadCount || groundLootQuantity(loot));
}

function showBagFullNotice(neededSlots = 1, source = null) {
  const now = Date.now();
  if (now - lastBagFullNoticeAt < 900) return;
  lastBagFullNoticeAt = now;

  const current = backpackItems().length;
  const capacity = bagCapacity();
  const free = backpackFreeSlots();
  const missing = Math.max(1, Math.floor(neededSlots || 1) - free);
  const message =
    current >= capacity
      ? `行囊已满（${current}/${capacity}），请升级行囊后再拾取`
      : `行囊空间不足，还差 ${missing} 格，请升级行囊后再拾取`;

  showToast(message);
  showPickupPop("行囊已满", {
    x: source?.dataset?.groundX,
    y: source?.dataset?.groundY,
  });
}

function collectGroundGold(source) {
  state.groundLoot = normalizeGroundLoot(state.groundLoot);
  const amount = state.groundLoot.gold || 0;
  if (!amount) return;

  playPickupSound("gold");
  showPickupPop(`拾取 ${amount}G`, {
    gold: true,
    x: source?.dataset?.groundX || 44,
    y: source?.dataset?.groundY || 68,
  });
  state.groundLoot.gold = 0;
  state.gold += amount;
  addLog(`拾取 ${amount} 金币。`);
  saveState();
  render();
}

function collectGroundLoot(id, source) {
  state.groundLoot = normalizeGroundLoot(state.groundLoot);
  const loot = state.groundLoot.items.find((item) => item.id === id);
  if (!loot) return;
  const title = groundLootDisplayTitle(loot);
  const quantityText = groundLootStackSuffix(loot);
  const equipmentSlotsNeeded = groundLootBagSlotsNeeded(loot);
  if (backpackFreeSlots() <= 0 || (equipmentSlotsNeeded > 0 && !canFitBackpackItems(equipmentSlotsNeeded))) {
    showBagFullNotice(Math.max(1, equipmentSlotsNeeded), source);
    return;
  }

  if (isLegendaryWeaponLoot(loot)) playLegendaryWeaponSound();
  else playPickupSound(loot.type, loot.rarity);
  showPickupPop(`拾取 ${title}${quantityText}`, {
    rarity: loot.rarity,
    x: source?.dataset?.groundX || loot.x,
    y: source?.dataset?.groundY || loot.y,
  });
  state.groundLoot.items = state.groundLoot.items.filter((item) => item.id !== id);
  applyGroundLootReward(loot);
  addLog(`拾取 ${title}${quantityText}。`);
  saveState();
  render();
}

function applyGroundLootReward(loot) {
  const payloads = groundLootPayloads(loot);

  if (loot.type === "equipment") {
    for (const payload of payloads) {
      const item = normalizeCollectedEquipment(payload.item);
      if (item) state.equipment.unshift(item);
    }
    trimEquipment();
    return;
  }

  if (loot.type === "gem") {
    for (const payload of payloads) {
      const amount = Math.max(1, Math.floor(payload.amount || 1));
      if (!Object.prototype.hasOwnProperty.call(state.gems, payload.gemKey)) continue;
      state.gems[payload.gemKey] += amount;
    }
    return;
  }

  if (loot.type === "material") {
    for (const payload of payloads) {
      if (payload.materials) addMaterials(payload.materials);
    }
    return;
  }

  if (loot.type === "egg") {
    for (const payload of payloads) {
      const egg = normalizeEgg(payload.egg);
      if (egg) state.eggs.unshift(egg);
    }
  }
}

function normalizeCollectedEquipment(item) {
  if (!item || typeof item !== "object") return null;

  const slot = slots.some((entry) => entry.key === item.slot) ? item.slot : "weapon";
  const classKey = classes[item.classKey] ? item.classKey : state.playerClass;
  const normalized = {
    ...item,
    id: item.id || uid("eq"),
    classKey,
    slot,
    rarity: rarityByKey(item.rarity).key,
    level: clamp(Math.floor(item.level || state.level), 1, MAX_LEVEL),
    setName: item.setName || pick(setNames),
    stats: {
      attack: 0,
      magic: 0,
      armor: 0,
      hp: 0,
      crit: 0,
      ...(item.stats || {}),
    },
  };

  if (normalized.slot === "weapon" && !normalized.weaponType) {
    normalized.weaponType = pickWeaponType(normalized.classKey).key;
  }
  if (normalized.slot !== "weapon") normalized.weaponType = null;

  normalized.maxDurability = normalized.maxDurability || maxDurabilityFor(normalized);
  normalized.durability = clamp(
    typeof normalized.durability === "number" ? normalized.durability : normalized.maxDurability,
    0,
    normalized.maxDurability,
  );

  if (normalized.slot === "weapon" && typeof normalized.autoClick === "undefined") {
    normalized.autoClick = Math.random() < 0.84 ? createAutoClickForWeapon(normalized) : null;
  }

  return normalized;
}

function pulseMonster(className) {
  dom.monsterButton.classList.remove(className);
  void dom.monsterButton.offsetWidth;
  dom.monsterButton.classList.add(className);
  window.setTimeout(() => dom.monsterButton.classList.remove(className), 360);
}

function isStandaloneMode() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function updateInstallButton() {
  if (isStandaloneMode()) {
    dom.install.textContent = "已安装";
    dom.install.disabled = true;
  } else {
    dom.install.disabled = false;
  }
}

async function handleInstallClick() {
  if (!deferredInstallPrompt) {
    showToast("手机浏览器菜单里可以添加到主屏幕；正式上线需要 HTTPS。");
    return;
  }

  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  updateInstallButton();
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || window.location.protocol === "file:") return;

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      showToast("离线缓存注册失败，刷新后可重试。");
    });
  });
}

dom.authForm.addEventListener("submit", handleAuthSubmit);
dom.authSwitch.addEventListener("click", () => {
  authMode = authMode === "login" ? "register" : "login";
  updateAuthCopy();
});
dom.logout.addEventListener("click", logout);
dom.install.addEventListener("click", handleInstallClick);
dom.monsterButton.addEventListener("pointerdown", attack);
dom.refreshShop.addEventListener("click", () => refreshShop(false));

document.addEventListener("pointerover", collectGroundTarget);
document.addEventListener("pointerdown", collectGroundTarget);

document.addEventListener("click", (event) => {
  const inspectedEquipment = event.target.closest("[data-inspect-equipment]");
  if (inspectedEquipment && !event.target.closest("button")) {
    const id = inspectedEquipment.dataset.inspectEquipment;
    expandedEquipmentId = expandedEquipmentId === id ? null : id;
    renderEquipment();
    renderShop();
  }

  const tab = event.target.closest("[data-tab]");
  if (tab) setActiveTab(tab.dataset.tab);

  const dungeon = event.target.closest("[data-dungeon]");
  if (dungeon) selectDungeon(dungeon.dataset.dungeon);

  const equip = event.target.closest("[data-equip]");
  if (equip) equipItem(equip.dataset.equip);

  const mergeEquip = event.target.closest("[data-merge-equip]");
  if (mergeEquip) mergeEquipment(mergeEquip.dataset.mergeEquip);

  const sell = event.target.closest("[data-sell]");
  if (sell) sellItem(sell.dataset.sell);

  const melt = event.target.closest("[data-melt]");
  if (melt) meltItem(melt.dataset.melt);

  const meltVisible = event.target.closest("[data-melt-visible]");
  if (meltVisible) meltVisibleEquipment();

  const sellVisible = event.target.closest("[data-sell-visible]");
  if (sellVisible) sellVisibleEquipment();

  const unequip = event.target.closest("[data-unequip]");
  if (unequip) unequipSlot(unequip.dataset.unequip);

  const slotPickerUnequip = event.target.closest("[data-slot-picker-unequip]");
  if (slotPickerUnequip) {
    event.preventDefault();
    unequipSlot(slotPickerUnequip.dataset.slotPickerUnequip);
    return;
  }

  const slotPickerEquip = event.target.closest("[data-slot-picker-equip]");
  if (slotPickerEquip) {
    event.preventDefault();
    equipItem(slotPickerEquip.dataset.slotPickerEquip, slotPickerEquip.dataset.slotPickerSlot);
    return;
  }

  const openSlot = event.target.closest("[data-open-slot]");
  if (openSlot) {
    const slotKey = openSlot.dataset.openSlot;
    const acknowledged = acknowledgeSlotUpgradeNotice(slotKey);
    activeSlotPickerKey = activeSlotPickerKey === slotKey ? null : slotKey;
    expandedEquipmentId = null;
    if (acknowledged) saveState();
    renderEquipment();
  }

  const closeSlotPicker = event.target.closest("[data-close-slot-picker]");
  if (closeSlotPicker) {
    activeSlotPickerKey = null;
    renderEquipment();
  }

  const equipToSlot = event.target.closest("[data-equip-to-slot]");
  if (equipToSlot) equipItem(equipToSlot.dataset.equipmentId, equipToSlot.dataset.equipToSlot);

  const filterSlot = event.target.closest("[data-equip-filter-slot]");
  if (filterSlot) {
    state.equipmentFilter.slot = filterSlot.dataset.equipFilterSlot;
    expandedEquipmentId = null;
    activeSlotPickerKey = null;
    saveState();
    renderEquipment({ preserveScroll: false });
  }

  const filterRarity = event.target.closest("[data-equip-filter-rarity]");
  if (filterRarity) {
    state.equipmentFilter.rarity = filterRarity.dataset.equipFilterRarity;
    expandedEquipmentId = null;
    activeSlotPickerKey = null;
    saveState();
    renderEquipment({ preserveScroll: false });
  }

  const filterClass = event.target.closest("[data-equip-filter-class]");
  if (filterClass) {
    state.equipmentFilter.classKey = filterClass.dataset.equipFilterClass;
    expandedEquipmentId = null;
    activeSlotPickerKey = null;
    saveState();
    renderEquipment({ preserveScroll: false });
  }

  const filterWearable = event.target.closest("[data-equip-filter-wearable]");
  if (filterWearable) {
    state.equipmentFilter.wearable = filterWearable.dataset.equipFilterWearable;
    expandedEquipmentId = null;
    activeSlotPickerKey = null;
    saveState();
    renderEquipment({ preserveScroll: false });
  }

  const pet = event.target.closest("[data-active-pet]");
  if (pet) {
    state.activePetId = pet.dataset.activePet;
    state.petHp = petMaxHp(activePet());
    saveState();
    render();
  }

  const petFilterRarity = event.target.closest("[data-pet-filter-rarity]");
  if (petFilterRarity) {
    state.petFilter.rarity = petFilterRarity.dataset.petFilterRarity;
    expandedPetSkill = null;
    saveState();
    renderPets();
  }

  const petViewButton = event.target.closest("[data-pet-view]");
  if (petViewButton) {
    state.petView = petViewButton.dataset.petView;
    expandedPetSkill = null;
    saveState();
    renderPets();
  }

  const petSkill = event.target.closest("[data-pet-skill]");
  if (petSkill) {
    expandedPetSkill = expandedPetSkill === petSkill.dataset.petSkill ? null : petSkill.dataset.petSkill;
    renderPets();
  }

  const emptyIncubatorSlotTarget = event.target.closest("[data-incubator-empty-slot]");
  if (emptyIncubatorSlotTarget && !event.target.closest("button")) {
    event.preventDefault();
    const slot = incubatorSlotById(emptyIncubatorSlotTarget.dataset.incubatorEmptySlot);
    if (state.eggs.length) placeEggInIncubator(slot);
    else showToast("没有宠物蛋可以放入");
    return;
  }

  const placeEggButton = event.target.closest("[data-place-egg]");
  if (placeEggButton) placeEggInIncubator(incubatorSlotById(placeEggButton.dataset.placeEgg));

  const hatchSlotButton = event.target.closest("[data-hatch-slot]");
  if (hatchSlotButton) hatchIncubatorEgg(incubatorSlotById(hatchSlotButton.dataset.hatchSlot));

  const upgradeIncubatorSlotsButton = event.target.closest("[data-upgrade-incubator-slots]");
  if (upgradeIncubatorSlotsButton) upgradeIncubatorSlots();

  const upgradeIncubatorSlotButton = event.target.closest("[data-upgrade-incubator-slot]");
  if (upgradeIncubatorSlotButton) upgradeIncubatorSlot(upgradeIncubatorSlotButton.dataset.upgradeIncubatorSlot);

  const healPetButton = event.target.closest("[data-heal-pet]");
  if (healPetButton) healPet(healPetButton.dataset.healPet);

  const evolvePetButton = event.target.closest("[data-evolve-pet]");
  if (evolvePetButton) evolvePet(evolvePetButton.dataset.evolvePet);

  const sellPetButton = event.target.closest("[data-sell-pet]");
  if (sellPetButton) sellPet(sellPetButton.dataset.sellPet);

  const sellVisiblePetsButton = event.target.closest("[data-sell-visible-pets]");
  if (sellVisiblePetsButton) sellVisiblePets();

  const buy = event.target.closest("[data-buy]");
  if (buy) buyShopItem(buy.dataset.buy);

  const forge = event.target.closest("[data-forge]");
  if (forge) forgeEquipment();

  const upgradeBagButton = event.target.closest("[data-upgrade-bag]");
  if (upgradeBagButton) upgradeBag();

  const repairButton = event.target.closest("[data-repair-equipped]");
  if (repairButton) repairEquipped();

  const classButton = event.target.closest("[data-class]");
  if (classButton) switchClass(classButton.dataset.class);
});

function collectGroundTarget(event) {
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;

  const groundGold = target.closest("[data-ground-gold]");
  if (groundGold) {
    event.preventDefault();
    collectGroundGold(groundGold);
    return;
  }

  const groundLoot = target.closest("[data-ground-loot]");
  if (groundLoot) {
    event.preventDefault();
    collectGroundLoot(groundLoot.dataset.groundLoot, groundLoot);
  }
}

function refreshIncubatorTimers() {
  let shouldRender = false;

  for (const slot of incubatorSlots()) {
    if (!slot.egg) continue;
    const remaining = incubatorRemainingMs(slot);
    const ready = remaining <= 0;
    if (ready) {
      shouldRender = true;
      continue;
    }

    const timeLabel = dom.hatchStation?.querySelector(`[data-incubator-time="${slot.id}"]`);
    if (timeLabel) timeLabel.textContent = formatDuration(remaining);

    const statusLabel = dom.hatchStation?.querySelector(`[data-incubator-status="${slot.id}"]`);
    if (statusLabel) statusLabel.textContent = `剩余 ${formatDuration(remaining)}`;

    const progressBar = dom.hatchStation?.querySelector(`[data-incubator-progress="${slot.id}"]`);
    if (progressBar) progressBar.style.width = `${incubatorProgress(slot).toFixed(1)}%`;
  }

  return shouldRender;
}

function tickIncubators() {
  if (state.activeTab !== "pets") return;
  if (!incubatorSlots().some((slot) => slot.egg)) return;
  if (refreshIncubatorTimers()) renderPets();
}

function lockViewportZoom() {
  let lastTouchEnd = 0;
  const stopMultiTouchZoom = (event) => {
    if (event.touches && event.touches.length > 1) event.preventDefault();
  };
  const stopGestureZoom = (event) => event.preventDefault();

  document.addEventListener("touchstart", stopMultiTouchZoom, { passive: false });
  document.addEventListener("touchmove", stopMultiTouchZoom, { passive: false });
  document.addEventListener("gesturestart", stopGestureZoom, { passive: false });
  document.addEventListener("gesturechange", stopGestureZoom, { passive: false });
  document.addEventListener("gestureend", stopGestureZoom, { passive: false });
  document.addEventListener(
    "touchend",
    (event) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 320) event.preventDefault();
      lastTouchEnd = now;
    },
    { passive: false },
  );
}

window.addEventListener("keydown", (event) => {
  const target = event.target instanceof Element ? event.target : null;

  const hatchSlotTarget = target?.closest("[data-hatch-slot]");
  if (hatchSlotTarget && !target?.closest("button") && (event.code === "Enter" || event.code === "Space")) {
    event.preventDefault();
    hatchIncubatorEgg(incubatorSlotById(hatchSlotTarget.dataset.hatchSlot));
    return;
  }

  const emptyIncubatorSlotTarget = target?.closest("[data-incubator-empty-slot]");
  if (emptyIncubatorSlotTarget && !target?.closest("button") && (event.code === "Enter" || event.code === "Space")) {
    event.preventDefault();
    const slot = incubatorSlotById(emptyIncubatorSlotTarget.dataset.incubatorEmptySlot);
    if (state.eggs.length) placeEggInIncubator(slot);
    else showToast("没有宠物蛋可以放入");
    return;
  }

  const slotPickerItem = target?.closest("[data-slot-picker-unequip], [data-slot-picker-equip]");
  if (slotPickerItem && (event.code === "Enter" || event.code === "Space")) {
    event.preventDefault();
    if (slotPickerItem.dataset.slotPickerUnequip) {
      unequipSlot(slotPickerItem.dataset.slotPickerUnequip);
    } else {
      equipItem(slotPickerItem.dataset.slotPickerEquip, slotPickerItem.dataset.slotPickerSlot);
    }
    return;
  }

  if (event.code === "Space" && !event.repeat && state.activeTab === "battle") {
    event.preventDefault();
    attack();
  }
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  updateInstallButton();
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  updateInstallButton();
  showToast("已添加到桌面。");
});

resetCombatTimers();
lockViewportZoom();
window.setInterval(runAutoClick, 120);
window.setInterval(runPetAttack, 120);
window.setInterval(runMonsterAttack, 120);
window.setInterval(tickIncubators, 1000);
window.setInterval(saveState, 1500);

updateAuthCopy();
updateAuthGate();
updateInstallButton();
registerServiceWorker();
render();
saveState();
