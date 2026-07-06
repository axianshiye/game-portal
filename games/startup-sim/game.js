const sectors = ["餐饮", "软件", "内容", "制造", "生活", "服务", "零售", "医疗", "教育", "新能源"];
const gameStartDate = new Date(2020, 0, 1, 0, 0, 0);
const stockTradeSessions = [
  { start: 9 * 60 + 30, end: 11 * 60 + 30 },
  { start: 13 * 60, end: 15 * 60 },
];
const lunarHolidayDates = {
  spring: {
    2020: "2020-01-25", 2021: "2021-02-12", 2022: "2022-02-01", 2023: "2023-01-22",
    2024: "2024-02-10", 2025: "2025-01-29", 2026: "2026-02-17", 2027: "2027-02-06",
    2028: "2028-01-26", 2029: "2029-02-13", 2030: "2030-02-03", 2031: "2031-01-23",
    2032: "2032-02-11", 2033: "2033-01-31", 2034: "2034-02-19", 2035: "2035-02-08",
  },
  dragon: {
    2020: "2020-06-25", 2021: "2021-06-14", 2022: "2022-06-03", 2023: "2023-06-22",
    2024: "2024-06-10", 2025: "2025-05-31", 2026: "2026-06-19", 2027: "2027-06-09",
    2028: "2028-05-28", 2029: "2029-06-16", 2030: "2030-06-05", 2031: "2031-06-24",
    2032: "2032-06-12", 2033: "2033-06-01", 2034: "2034-06-20", 2035: "2035-06-10",
  },
  midAutumn: {
    2020: "2020-10-01", 2021: "2021-09-21", 2022: "2022-09-10", 2023: "2023-09-29",
    2024: "2024-09-17", 2025: "2025-10-06", 2026: "2026-09-25", 2027: "2027-09-15",
    2028: "2028-10-03", 2029: "2029-09-22", 2030: "2030-09-12", 2031: "2031-10-01",
    2032: "2032-09-19", 2033: "2033-09-08", 2034: "2034-09-27", 2035: "2035-09-16",
  },
};
const sectorSkill = {
  餐饮: "销售",
  软件: "技术",
  内容: "运营",
  制造: "技术",
  生活: "运营",
  服务: "产品",
  零售: "销售",
  医疗: "财务",
  教育: "产品",
  新能源: "财务",
};

const vehicles = {
  walk: { name: "步行", kind: "personal", speed: 5, price: 0, store: "随身", costPerKm: 0, minFee: 0, staminaPerKm: 0.9, energyPerHour: 0.55, boardMinutes: 0, accidentPerKm: 0.0000012, maxAccident: 0.006 },
  bike: { name: "自行车", kind: "personal", speed: 13, price: 900, store: "自行车店", costPerKm: 0.05, minFee: 2, staminaPerKm: 0.32, energyPerHour: 0.42, boardMinutes: 4, accidentPerKm: 0.000006, maxAccident: 0.028 },
  ebike: { name: "电动自行车", kind: "personal", speed: 24, price: 3200, store: "自行车店", costPerKm: 0.12, minFee: 3, staminaPerKm: 0.12, energyPerHour: 0.32, boardMinutes: 5, accidentPerKm: 0.000008, maxAccident: 0.035 },
  moto: { name: "摩托车", kind: "personal", speed: 46, price: 12800, store: "自行车店", costPerKm: 0.35, minFee: 8, staminaPerKm: 0.08, energyPerHour: 0.3, boardMinutes: 8, accidentPerKm: 0.000022, maxAccident: 0.085 },
  car: { name: "小汽车", kind: "personal", speed: 72, price: 68000, store: "车行", costPerKm: 1.8, minFee: 35, staminaPerKm: 0.05, energyPerHour: 0.25, boardMinutes: 12, accidentPerKm: 0.000004, maxAccident: 0.028 },
  van: { name: "商务车", kind: "personal", speed: 62, price: 148000, store: "车行", costPerKm: 2.55, minFee: 90, staminaPerKm: 0.03, energyPerHour: 0.2, boardMinutes: 18, accidentPerKm: 0.0000034, maxAccident: 0.022 },
  bus: { name: "公共交通", kind: "public", speed: 42, price: 0, store: "车站", costPerKm: 0.32, minFee: 6, staminaPerKm: 0.025, energyPerHour: 0.18, boardMinutes: 18, accidentPerKm: 0.0000025, maxAccident: 0.018 },
  rail: { name: "高铁", kind: "public", speed: 190, price: 0, store: "高铁站", costPerKm: 0.72, minFee: 68, staminaPerKm: 0.015, energyPerHour: 0.14, boardMinutes: 42, accidentPerKm: 0.00000018, maxAccident: 0.002 },
  flight: { name: "民航", kind: "public", speed: 620, price: 0, store: "机场", costPerKm: 1.42, minFee: 360, staminaPerKm: 0.01, energyPerHour: 0.12, boardMinutes: 110, accidentPerKm: 0.00000008, maxAccident: 0.0012 },
  privatePlane: { name: "私人飞机", kind: "personal", speed: 540, price: 8800000, monthlyMaintenance: 120000, store: "公务航空公司", costPerKm: 8.5, minFee: 3800, staminaPerKm: 0.006, energyPerHour: 0.08, boardMinutes: 55, accidentPerKm: 0.0000001, maxAccident: 0.0015 },
};

const provinceNames = [
  "星岚省", "望海省", "青麦省", "云岭省", "赤原省", "银湾省", "松川省", "北砾省", "南荔省", "泽州省",
  "锦河省", "龙桥省", "花屿省", "玄湖省", "晴谷省", "柏霜省", "霓港省", "石榴省", "白鹿省", "雾山省",
  "秋田省", "竹泉省", "珊瑚省", "金穗省", "墨林省", "天轨省", "沙洲省", "绿洲省", "红杉省", "明台省",
];

const cityRoots = [
  "洛星", "安澜", "石屏", "鹿鸣", "云门", "青洲", "嘉谷", "西垣", "东梧", "明港",
  "南桥", "北棠", "银沙", "天河", "远山", "镜湖", "赤湾", "竹海", "金台", "松原",
  "临光", "澄江", "夏川", "雪岭", "花溪", "平野", "风眠", "潮生", "榕城", "白沙",
  "雁回", "枫桥", "珑湾", "晴川", "麦丘", "丹城", "海棠", "蓝田", "砚山", "长歌",
];

const countyRoots = [
  "新竹", "月浦", "星港", "泉北", "南仓", "西岭", "东湾", "鹿溪", "红桥", "青石",
  "云田", "金湖", "古柳", "松南", "银杏", "白塔", "海风", "锦屏", "桃源", "梅川",
  "沙河", "绿港", "龙门", "梨园", "山阴", "照水", "霞浦", "双桥", "玉泉", "禾川",
  "梧桐", "栖云", "兰亭", "鱼梁", "北泉", "南麓", "晴港", "临湖", "万禾", "小满",
];

const countySuffixes = ["县", "区", "港", "镇", "新区", "湾"];
const streetTileSpec = { cols: 12, rows: 8, tileSize: 150, width: 1800, height: 1200 };

const placeTypes = {
  vacancy: { name: "空铺", draw: 1, foot: 0, rent: 1, note: "可开店" },
  leased: { name: "已租铺位", draw: 1.08, foot: 4, rent: 1.05, note: "已租赁，待开业" },
  shop: { name: "已有店铺", draw: 0.9, foot: 8, rent: 1.1, note: "已有商家" },
  residential: { name: "小区", draw: 1.2, foot: 18, rent: 1.05, note: "稳定生活客流" },
  community: { name: "老社区", draw: 1.05, foot: 14, rent: 0.9, note: "熟客多" },
  office: { name: "写字楼", draw: 1.35, foot: 22, rent: 1.22, note: "白领客流" },
  building: { name: "商业楼宇", draw: 1.4, foot: 24, rent: 1.32, note: "商务聚集" },
  park: { name: "公园", draw: 0.95, foot: 12, rent: 0.88, note: "休闲客流" },
  school: { name: "学校", draw: 1.45, foot: 26, rent: 1.18, note: "学生客流" },
  station: { name: "车站", draw: 1.65, foot: 34, rent: 1.45, note: "流动客流" },
  mall: { name: "商场", draw: 1.75, foot: 38, rent: 1.55, note: "强商业客流" },
  hospital: { name: "医院", draw: 1.25, foot: 20, rent: 1.16, note: "刚需客流" },
  bikeStore: { name: "自行车店", draw: 1.2, foot: 16, rent: 1.04, note: "购买自行车、电动自行车、摩托车" },
  carDealer: { name: "车行", draw: 1.15, foot: 18, rent: 1.12, note: "购买小汽车、商务车" },
  aviation: { name: "公务航空公司", draw: 1.05, foot: 12, rent: 1.35, note: "购买私人飞机" },
};

const industryEffects = {
  餐饮: { residential: 0.12, community: 0.08, office: 0.1, school: 0.18, station: 0.18, mall: 0.16, park: 0.05, hospital: 0.06, shopSamePenalty: -0.18, shopCluster: 0.05 },
  软件: { office: 0.18, building: 0.2, school: 0.08, residential: -0.03, station: -0.04, shopSamePenalty: -0.06, shopCluster: 0.02 },
  内容: { office: 0.1, school: 0.12, mall: 0.08, park: 0.06, building: 0.1, shopSamePenalty: -0.08, shopCluster: 0.04 },
  制造: { building: 0.08, station: 0.06, residential: -0.14, school: -0.12, hospital: -0.1, shopSamePenalty: -0.1, shopCluster: -0.04 },
  生活: { residential: 0.18, community: 0.18, hospital: 0.1, park: 0.05, mall: 0.05, shopSamePenalty: -0.12, shopCluster: 0.03 },
  服务: { office: 0.12, building: 0.14, residential: 0.06, mall: 0.08, shopSamePenalty: -0.1, shopCluster: 0.04 },
  零售: { station: 0.15, mall: 0.18, residential: 0.08, school: 0.1, park: 0.04, shopSamePenalty: -0.16, shopCluster: 0.06 },
  医疗: { hospital: 0.2, residential: 0.08, community: 0.08, school: -0.05, station: -0.04, shopSamePenalty: -0.12, shopCluster: 0.02 },
  教育: { school: 0.2, residential: 0.12, community: 0.1, office: 0.04, station: -0.05, shopSamePenalty: -0.1, shopCluster: 0.02 },
  新能源: { building: 0.12, office: 0.08, station: 0.1, mall: 0.06, residential: -0.02, shopSamePenalty: -0.08, shopCluster: 0.02 },
};

const industryCostRates = {
  餐饮: 0.36,
  软件: 0.14,
  内容: 0.18,
  制造: 0.44,
  生活: 0.32,
  服务: 0.2,
  零售: 0.42,
  医疗: 0.24,
  教育: 0.18,
  新能源: 0.34,
};

const storeOptimizationCatalog = {
  default: [
    { id: "local-marketing", name: "周边地推", focus: "获客", cost: 8000, days: 2, revenueBoost: 0.05, monthlyCost: 600, skill: "销售", description: "用传单、团购和社区合作拉第一波客流。" },
    { id: "basic-sop", name: "基础SOP", focus: "运营", cost: 9000, days: 2, revenueBoost: 0.05, monthlyCost: 400, skill: "运营", description: "把开闭店、收银、采购和复盘流程固定下来。" },
  ],
  "milk-tea": [
    { id: "signature-drink", name: "爆款单品测试", focus: "产品优化", cost: 12000, days: 3, revenueBoost: 0.1, monthlyCost: 900, skill: "产品", description: "测试口味、杯型和定价，提升复购。" },
    { id: "queue-speed", name: "出杯动线优化", focus: "效率", cost: 16000, days: 4, revenueBoost: 0.08, monthlyCost: 600, skill: "运营", description: "重排吧台、备料和高峰排队。" },
    { id: "membership", name: "会员券包", focus: "私域", cost: 8000, days: 2, revenueBoost: 0.06, monthlyCost: 1000, skill: "销售", description: "用充值券、第二杯优惠和社群提醒锁住熟客。" },
  ],
  "chinese-diner": [
    { id: "menu-engineering", name: "菜单毛利工程", focus: "产品优化", cost: 18000, days: 5, revenueBoost: 0.09, monthlyCost: 800, skill: "财务", description: "根据点单率和毛利重排菜单。" },
    { id: "kitchen-flow", name: "后厨标准化", focus: "出餐效率", cost: 26000, days: 7, revenueBoost: 0.11, monthlyCost: 1200, skill: "运营", description: "预制、备菜、排班和翻台统一管理。" },
    { id: "local-banquet", name: "社区宴席套餐", focus: "客源", cost: 15000, days: 4, revenueBoost: 0.07, monthlyCost: 1000, skill: "销售", description: "绑定社区、单位聚餐和家庭宴席。" },
  ],
  "fast-food": [
    { id: "combo-pricing", name: "套餐定价", focus: "产品优化", cost: 10000, days: 2, revenueBoost: 0.08, monthlyCost: 600, skill: "财务", description: "提高客单价，同时不拖慢出餐。" },
    { id: "lunch-peak", name: "午高峰排班", focus: "效率", cost: 12000, days: 3, revenueBoost: 0.07, monthlyCost: 900, skill: "运营", description: "把人手集中到午晚高峰。" },
  ],
  "western-bistro": [
    { id: "scene-menu", name: "场景套餐设计", focus: "产品优化", cost: 22000, days: 6, revenueBoost: 0.1, monthlyCost: 1200, skill: "产品", description: "围绕约会、商务简餐和下午茶做套餐。" },
    { id: "review-photo", name: "拍照点评运营", focus: "内容", cost: 14000, days: 4, revenueBoost: 0.08, monthlyCost: 1600, skill: "运营", description: "让菜品、灯光和点评内容互相带客。" },
  ],
  "game-studio": [
    { id: "vertical-slice", name: "垂直切片", focus: "产品验证", cost: 30000, days: 8, revenueBoost: 0.12, monthlyCost: 1800, skill: "产品", description: "做一段完整可玩的核心体验，提升融资和签约概率。" },
    { id: "tool-chain", name: "工具链升级", focus: "研发效率", cost: 26000, days: 6, revenueBoost: 0.08, monthlyCost: 1400, skill: "技术", description: "版本、构建和素材流程更顺。" },
  ],
  "video-agency": [
    { id: "content-template", name: "内容模板库", focus: "交付效率", cost: 12000, days: 3, revenueBoost: 0.09, monthlyCost: 800, skill: "运营", description: "把脚本、镜头和剪辑节奏模板化。" },
    { id: "account-sales", name: "客户行业包", focus: "销售", cost: 15000, days: 4, revenueBoost: 0.08, monthlyCost: 1000, skill: "销售", description: "按餐饮、医美、本地生活打包方案。" },
  ],
  "hardware-factory": [
    { id: "qc-line", name: "质检工位", focus: "品控", cost: 38000, days: 9, revenueBoost: 0.08, monthlyCost: 2200, skill: "技术", description: "降低返工和售后损失。" },
    { id: "supplier-bom", name: "BOM降本", focus: "供应链", cost: 42000, days: 10, revenueBoost: 0.1, monthlyCost: 1600, skill: "财务", description: "替代料、批量采购和账期管理。" },
  ],
  "convenience": [
    { id: "fresh-shelf", name: "鲜食货架", focus: "品类优化", cost: 22000, days: 5, revenueBoost: 0.09, monthlyCost: 1800, skill: "产品", description: "增加早餐、便当和夜宵刚需。" },
    { id: "nearby-delivery", name: "小区配送群", focus: "履约", cost: 9000, days: 2, revenueBoost: 0.06, monthlyCost: 1200, skill: "运营", description: "覆盖周边小区的即时需求。" },
    { id: "inventory-turn", name: "库存周转表", focus: "现金流", cost: 7000, days: 2, revenueBoost: 0.05, monthlyCost: 300, skill: "财务", description: "减少临期和缺货。" },
  ],
  "consulting": [
    { id: "diagnosis-kit", name: "诊断工具包", focus: "产品化", cost: 18000, days: 5, revenueBoost: 0.09, monthlyCost: 800, skill: "产品", description: "把咨询从人力输出变成标准产品。" },
    { id: "case-library", name: "案例库", focus: "销售转化", cost: 12000, days: 3, revenueBoost: 0.07, monthlyCost: 600, skill: "销售", description: "提高客户信任和报价能力。" },
  ],
  "toy-retail": [
    { id: "display-wall", name: "主题陈列墙", focus: "陈列", cost: 18000, days: 4, revenueBoost: 0.08, monthlyCost: 700, skill: "产品", description: "提升进店停留和连带购买。" },
    { id: "preorder-group", name: "预售社群", focus: "私域", cost: 9000, days: 2, revenueBoost: 0.07, monthlyCost: 1200, skill: "销售", description: "让热门款提前锁单。" },
  ],
};

const companyOpeningSteps = [
  { name: "名称自主申报/核名", ratio: 0.1, note: "确认字号、行业表述和经营范围。" },
  { name: "设立登记材料签署", ratio: 0.26, note: "提交章程、股东/高管信息和住所材料。" },
  { name: "领取营业执照/电子执照", ratio: 0.14, note: "公司主体正式生成。" },
  { name: "印章刻制与备案", ratio: 0.12, note: "公章、财务章、法人章进入可用状态。" },
  { name: "税务信息确认与发票准备", ratio: 0.16, note: "确认税种、纳税人身份、发票和开票设备。" },
  { name: "银行基本户预约开户", ratio: 0.14, note: "银行尽调、开户和网银权限。" },
  { name: "社保/公积金账户", ratio: 0.08, note: "为后续招聘和合规用工做准备。" },
];

const companyOptions = [
  {
    id: "studio",
    name: "轻资产工作室",
    industry: "软件",
    cost: 85000,
    monthlyBase: 36000,
    monthlyFixedCost: 14500,
    setupDays: 10,
    skill: "产品",
    secondary: "技术",
    liabilityRate: 0.32,
    description: "适合接项目、做工具和游戏原型，现金流波动较大。",
    roles: [
      { id: "developer", name: "开发工程师", min: 1, ideal: 3, salary: 14000, hireDays: 10, scarcity: 0.62 },
      { id: "product", name: "产品/项目经理", min: 0, ideal: 1, salary: 11500, hireDays: 8, scarcity: 0.42 },
      { id: "designer", name: "视觉设计", min: 0, ideal: 1, salary: 9500, hireDays: 7, scarcity: 0.36 },
    ],
    optimizations: [
      { id: "prototype", name: "原型验证流程", focus: "产品优化", cost: 18000, days: 4, revenueBoost: 0.12, monthlyCost: 1200, skill: "产品", description: "把需求访谈、可玩原型和灰度测试固化，减少做错方向。" },
      { id: "devops", name: "自动化发布", focus: "交付效率", cost: 26000, days: 6, revenueBoost: 0.08, monthlyCost: 1600, skill: "技术", description: "自动测试、打包和上线，项目交付更稳定。" },
      { id: "client-crm", name: "客户成功体系", focus: "销售续约", cost: 22000, days: 5, revenueBoost: 0.1, monthlyCost: 1800, skill: "销售", description: "减少一次性项目，提升续费和转介绍。" },
    ],
  },
  {
    id: "agency",
    name: "本地生活服务公司",
    industry: "服务",
    cost: 68000,
    monthlyBase: 32000,
    monthlyFixedCost: 11800,
    setupDays: 8,
    skill: "销售",
    secondary: "运营",
    liabilityRate: 0.28,
    description: "整合地推、咨询和运营服务，受城市商务密度影响。",
    roles: [
      { id: "sales", name: "商务销售", min: 1, ideal: 3, salary: 7200, hireDays: 5, scarcity: 0.28 },
      { id: "operator", name: "项目运营", min: 1, ideal: 2, salary: 6800, hireDays: 6, scarcity: 0.32 },
      { id: "finance", name: "兼职财务", min: 0, ideal: 1, salary: 4200, hireDays: 4, scarcity: 0.18 },
    ],
    optimizations: [
      { id: "sop", name: "服务SOP", focus: "交付标准", cost: 12000, days: 3, revenueBoost: 0.08, monthlyCost: 700, skill: "运营", description: "把报价、交付和复盘流程标准化。" },
      { id: "channel", name: "渠道合伙人", focus: "获客渠道", cost: 24000, days: 7, revenueBoost: 0.14, monthlyCost: 2600, skill: "销售", description: "建立转介绍和本地渠道分佣。" },
      { id: "quality", name: "客户满意度回访", focus: "口碑", cost: 10000, days: 2, revenueBoost: 0.06, monthlyCost: 900, skill: "产品", description: "把投诉和需求提前收集，降低坏账和退款。" },
    ],
  },
  {
    id: "supply",
    name: "县域供应链公司",
    industry: "零售",
    cost: 120000,
    monthlyBase: 56000,
    monthlyFixedCost: 23800,
    setupDays: 15,
    skill: "运营",
    secondary: "财务",
    liabilityRate: 0.38,
    description: "连接门店、社区和仓配，需要更多启动资金。",
    roles: [
      { id: "buyer", name: "采购", min: 1, ideal: 2, salary: 7800, hireDays: 7, scarcity: 0.36 },
      { id: "warehouse", name: "仓配主管", min: 1, ideal: 2, salary: 7200, hireDays: 6, scarcity: 0.3 },
      { id: "driver", name: "配送司机", min: 1, ideal: 3, salary: 6200, hireDays: 5, scarcity: 0.24 },
    ],
    optimizations: [
      { id: "inventory", name: "库存周转模型", focus: "库存效率", cost: 36000, days: 8, revenueBoost: 0.1, monthlyCost: 2000, skill: "财务", description: "减少滞销和断货，现金流更稳。" },
      { id: "route", name: "配送线路优化", focus: "履约效率", cost: 28000, days: 6, revenueBoost: 0.08, monthlyCost: 1800, skill: "运营", description: "把配送半径、装载和频次做成规则。" },
      { id: "supplier", name: "核心供应商账期", focus: "采购谈判", cost: 42000, days: 10, revenueBoost: 0.13, monthlyCost: 1200, skill: "销售", description: "争取账期和返利，扩大铺货能力。" },
    ],
  },
];

const projects = [
  {
    id: "milk-tea",
    name: "奶茶小铺",
    industry: "餐饮",
    format: "饮品",
    cost: 26000,
    baseIncome: 9000,
    setupDays: 2,
    stamina: 10,
    energy: 14,
    skill: "销售",
    secondary: "运营",
    risk: 0.18,
    minArea: 18,
    decoration: { name: "轻餐饮装修", cost: 28000, days: 5 },
    equipment: 38000,
    licenses: ["营业执照", "食品经营许可", "从业人员健康证"],
    roles: [
      { id: "barista", name: "饮品店员", min: 1, ideal: 3, salary: 4300, hireDays: 3, scarcity: 0.2 },
      { id: "cashier", name: "收银兼前台", min: 1, ideal: 1, salary: 3800, hireDays: 2, scarcity: 0.12 },
    ],
    selfRunHours: 10,
    idealHours: 14,
    description: "现金流快，容易上手，热闹县城和校园周边会更香。",
  },
  {
    id: "chinese-diner",
    name: "中餐小馆",
    industry: "餐饮",
    format: "中餐",
    cost: 52000,
    baseIncome: 18000,
    setupDays: 9,
    stamina: 18,
    energy: 24,
    skill: "运营",
    secondary: "财务",
    risk: 0.27,
    minArea: 65,
    decoration: { name: "明厨亮灶与排烟装修", cost: 76000, days: 14 },
    equipment: 92000,
    licenses: ["营业执照", "食品经营许可", "消防检查", "排污/油烟备案", "健康证"],
    roles: [
      { id: "chef", name: "厨师", min: 1, ideal: 2, salary: 8200, hireDays: 7, scarcity: 0.55 },
      { id: "helper", name: "后厨帮工", min: 1, ideal: 2, salary: 4800, hireDays: 4, scarcity: 0.24 },
      { id: "server", name: "服务员", min: 1, ideal: 3, salary: 4300, hireDays: 3, scarcity: 0.18 },
    ],
    selfRunHours: 9,
    idealHours: 14,
    description: "重装修、重厨师，翻台和口碑决定收入，油烟和证照要求更高。",
  },
  {
    id: "fast-food",
    name: "快餐店",
    industry: "餐饮",
    format: "快餐",
    cost: 42000,
    baseIncome: 14200,
    setupDays: 6,
    stamina: 15,
    energy: 18,
    skill: "运营",
    secondary: "销售",
    risk: 0.22,
    minArea: 45,
    decoration: { name: "标准快餐装修", cost: 52000, days: 9 },
    equipment: 64000,
    licenses: ["营业执照", "食品经营许可", "消防检查", "健康证"],
    roles: [
      { id: "cook", name: "后厨出餐", min: 1, ideal: 2, salary: 5600, hireDays: 5, scarcity: 0.34 },
      { id: "cashier", name: "收银配餐", min: 1, ideal: 2, salary: 4200, hireDays: 3, scarcity: 0.16 },
    ],
    selfRunHours: 10,
    idealHours: 15,
    description: "出餐效率和午晚高峰很重要，适合车站、写字楼和学校周边。",
  },
  {
    id: "western-bistro",
    name: "西餐简餐",
    industry: "餐饮",
    format: "西餐",
    cost: 62000,
    baseIncome: 16800,
    setupDays: 10,
    stamina: 14,
    energy: 26,
    skill: "产品",
    secondary: "运营",
    risk: 0.3,
    minArea: 55,
    decoration: { name: "氛围型装修", cost: 88000, days: 16 },
    equipment: 76000,
    licenses: ["营业执照", "食品经营许可", "消防检查", "健康证"],
    roles: [
      { id: "western-chef", name: "西厨", min: 1, ideal: 2, salary: 7800, hireDays: 8, scarcity: 0.58 },
      { id: "server", name: "服务员", min: 1, ideal: 2, salary: 4500, hireDays: 4, scarcity: 0.22 },
    ],
    selfRunHours: 8,
    idealHours: 13,
    description: "客单价较高但更吃审美、选址和厨师，空铺周边调性不合会拖累收益。",
  },
  {
    id: "game-studio",
    name: "独立游戏工作室",
    industry: "软件",
    format: "公司地址",
    cost: 42000,
    baseIncome: 12500,
    setupDays: 4,
    stamina: 9,
    energy: 24,
    skill: "技术",
    secondary: "产品",
    risk: 0.28,
    minArea: 35,
    decoration: { name: "办公基础装修", cost: 22000, days: 4 },
    equipment: 36000,
    licenses: ["营业执照", "税务登记", "银行基本户"],
    roles: [
      { id: "developer", name: "开发", min: 1, ideal: 3, salary: 12500, hireDays: 10, scarcity: 0.62 },
      { id: "artist", name: "美术/动效", min: 0, ideal: 1, salary: 9000, hireDays: 8, scarcity: 0.45 },
    ],
    selfRunHours: 12,
    idealHours: 10,
    description: "前期波动大，技术和产品积累起来后收益很高。",
  },
  {
    id: "video-agency",
    name: "短视频代运营",
    industry: "内容",
    format: "公司地址",
    cost: 22000,
    baseIncome: 7600,
    setupDays: 2,
    stamina: 8,
    energy: 18,
    skill: "运营",
    secondary: "销售",
    risk: 0.2,
    minArea: 25,
    decoration: { name: "小型拍摄间改造", cost: 18000, days: 3 },
    equipment: 28000,
    licenses: ["营业执照", "税务登记"],
    roles: [
      { id: "editor", name: "剪辑运营", min: 1, ideal: 2, salary: 7200, hireDays: 6, scarcity: 0.38 },
      { id: "sales", name: "客户销售", min: 0, ideal: 1, salary: 5200, hireDays: 4, scarcity: 0.22 },
    ],
    selfRunHours: 11,
    idealHours: 10,
    description: "客户多、节奏快，持续经营能明显提升运营能力。",
  },
  {
    id: "hardware-factory",
    name: "智能硬件小厂",
    industry: "制造",
    format: "小型厂办",
    cost: 52000,
    baseIncome: 15000,
    setupDays: 6,
    stamina: 16,
    energy: 24,
    skill: "技术",
    secondary: "财务",
    risk: 0.32,
    minArea: 95,
    decoration: { name: "厂办与仓储改造", cost: 96000, days: 18 },
    equipment: 160000,
    licenses: ["营业执照", "消防检查", "环保/仓储备案"],
    roles: [
      { id: "technician", name: "技术员", min: 1, ideal: 2, salary: 8500, hireDays: 9, scarcity: 0.48 },
      { id: "operator", name: "装配工", min: 2, ideal: 5, salary: 5600, hireDays: 6, scarcity: 0.26 },
      { id: "warehouse", name: "仓管", min: 1, ideal: 1, salary: 5200, hireDays: 5, scarcity: 0.22 },
    ],
    selfRunHours: 9,
    idealHours: 12,
    description: "投入高、回报高，现金管理不好会很疼。",
  },
  {
    id: "convenience",
    name: "社区便利店",
    industry: "生活",
    format: "便利店",
    cost: 30000,
    baseIncome: 8400,
    setupDays: 3,
    stamina: 12,
    energy: 13,
    skill: "运营",
    secondary: "财务",
    risk: 0.14,
    minArea: 28,
    decoration: { name: "货架与冷柜装修", cost: 36000, days: 6 },
    equipment: 52000,
    licenses: ["营业执照", "食品经营许可", "烟草证可选"],
    roles: [
      { id: "cashier", name: "收银员", min: 1, ideal: 2, salary: 3900, hireDays: 3, scarcity: 0.12 },
    ],
    selfRunHours: 12,
    idealHours: 16,
    description: "稳定经营型项目，适合打基础和练管理。",
  },
  {
    id: "consulting",
    name: "企业咨询社",
    industry: "服务",
    format: "公司地址",
    cost: 36000,
    baseIncome: 10800,
    setupDays: 3,
    stamina: 7,
    energy: 22,
    skill: "产品",
    secondary: "销售",
    risk: 0.22,
    minArea: 30,
    decoration: { name: "会客室装修", cost: 24000, days: 4 },
    equipment: 26000,
    licenses: ["营业执照", "税务登记"],
    roles: [
      { id: "consultant", name: "顾问", min: 0, ideal: 2, salary: 9800, hireDays: 9, scarcity: 0.5 },
      { id: "assistant", name: "商务助理", min: 0, ideal: 1, salary: 5200, hireDays: 4, scarcity: 0.2 },
    ],
    selfRunHours: 10,
    idealHours: 9,
    description: "声望越高越吃香，也很考验创始人的判断。",
  },
  {
    id: "toy-retail",
    name: "潮玩集合店",
    industry: "零售",
    format: "零售",
    cost: 34000,
    baseIncome: 9800,
    setupDays: 3,
    stamina: 11,
    energy: 16,
    skill: "销售",
    secondary: "财务",
    risk: 0.24,
    minArea: 30,
    decoration: { name: "展示陈列装修", cost: 42000, days: 7 },
    equipment: 58000,
    licenses: ["营业执照", "税务登记"],
    roles: [
      { id: "shop-assistant", name: "导购", min: 1, ideal: 2, salary: 4300, hireDays: 4, scarcity: 0.18 },
      { id: "stock", name: "库存运营", min: 0, ideal: 1, salary: 5200, hireDays: 5, scarcity: 0.28 },
    ],
    selfRunHours: 10,
    idealHours: 13,
    description: "选品和库存很关键，热门商圈会有额外加成。",
  },
  {
    id: "new-energy",
    name: "县域新能源服务站",
    industry: "新能源",
    format: "服务站",
    cost: 60000,
    baseIncome: 17200,
    setupDays: 7,
    stamina: 18,
    energy: 26,
    skill: "财务",
    secondary: "技术",
    risk: 0.3,
    minArea: 80,
    decoration: { name: "服务站与安全改造", cost: 110000, days: 20 },
    equipment: 190000,
    licenses: ["营业执照", "消防检查", "电力/安全备案"],
    roles: [
      { id: "electrician", name: "电工技师", min: 1, ideal: 2, salary: 8800, hireDays: 10, scarcity: 0.62 },
      { id: "operator", name: "运营维护", min: 1, ideal: 2, salary: 5800, hireDays: 6, scarcity: 0.32 },
    ],
    selfRunHours: 8,
    idealHours: 12,
    description: "政策风口项目，吃资金规划和供应链能力。",
  },
];

const stockTemplates = [
  { symbol: "TEA", name: "新茶股份", sector: "餐饮", price: 18.8, eps: 0.86, volumeBase: 860000, volatility: 0.075 },
  { symbol: "PIX", name: "像素互动", sector: "软件", price: 42.5, eps: 1.22, volumeBase: 680000, volatility: 0.11 },
  { symbol: "VID", name: "闪剪传媒", sector: "内容", price: 23.6, eps: 0.74, volumeBase: 920000, volatility: 0.09 },
  { symbol: "BOT", name: "灵构制造", sector: "制造", price: 36.2, eps: 1.48, volumeBase: 510000, volatility: 0.1 },
  { symbol: "MART", name: "万家便利", sector: "零售", price: 15.4, eps: 0.67, volumeBase: 1140000, volatility: 0.06 },
  { symbol: "CARE", name: "邻里健康", sector: "医疗", price: 28.7, eps: 0.95, volumeBase: 450000, volatility: 0.085 },
  { symbol: "EDU", name: "启航教育", sector: "教育", price: 21.9, eps: 0.63, volumeBase: 620000, volatility: 0.08 },
  { symbol: "SUN", name: "晴能电气", sector: "新能源", price: 34.6, eps: 0.82, volumeBase: 760000, volatility: 0.12 },
];

const newsPool = [
  { sector: "餐饮", text: "县城茶饮开始第二轮下沉，低租金街区出现排队店。" },
  { sector: "软件", text: "独立工具软件出口增长，小游戏和效率工具成为资本新宠。" },
  { sector: "内容", text: "短视频本地生活投放升温，县域商家急需代运营。" },
  { sector: "制造", text: "智能硬件订单回流，轻工厂和小批量制造利润抬头。" },
  { sector: "生活", text: "社区服务需求扩大，便利店、洗护、维修类项目稳定走强。" },
  { sector: "服务", text: "中小企业咨询预算回暖，品牌定位和流程诊断需求增加。" },
  { sector: "零售", text: "潮玩和折扣集合店在年轻县城爆发，库存周转成为胜负手。" },
  { sector: "医疗", text: "基层健康管理政策加码，县域康养服务出现新窗口。" },
  { sector: "教育", text: "职业技能培训报名增长，创业者愿意为实战课程付费。" },
  { sector: "新能源", text: "充电、储能和节能改造订单增加，县域新能源服务站被看好。" },
];

const newsSources = [
  { type: "微博", name: "路野开店笔记", handle: "@路野开店笔记", reliability: 0.46 },
  { type: "微博", name: "县城商业小马", handle: "@县城商业小马", reliability: 0.5 },
  { type: "报纸", name: "像素财经日报", reliability: 0.76 },
  { type: "短视频", name: "阿澈创业观察", handle: "阿澈创业观察", reliability: 0.52 },
  { type: "短视频", name: "三分钟看商机", handle: "三分钟看商机", reliability: 0.48 },
  { type: "商学院同学", name: "陈砚秋", reliability: 0.68 },
  { type: "商学院同学", name: "孟知远", reliability: 0.58 },
  { type: "行业内参", name: "蓝鲸研报", reliability: 0.82 },
];

const exclusiveRumors = [
  { sector: "软件", text: "某省政务工具采购即将放量，县域软件服务商可能迎来订单潮。" },
  { sector: "新能源", text: "充电桩补贴可能延后，提前入场的人会承受更长现金流压力。" },
  { sector: "教育", text: "职业培训审批窗口收紧，短期内牌照价值会上升。" },
  { sector: "餐饮", text: "头部茶饮品牌计划进入县城，加盟店周边租金可能被抬高。" },
];

const secretaryCandidates = [
  { id: "lin", avatar: "lin", name: "林知夏", gender: "female", hair: "#5b3f2e", understanding: 78, efficiency: 64, loyalty: 82, salary: 8200, hireCost: 12000, trait: "擅长拆解模糊任务，适合早期团队。", resume: "本科工商管理，做过两年创业园区项目助理，长期负责会议纪要、政策材料和创业者入驻沟通。离职原因写得很克制：希望去更小的团队从零开始。" },
  { id: "zhou", avatar: "zhou", name: "周远", gender: "male", hair: "#29366f", understanding: 68, efficiency: 88, loyalty: 70, salary: 12600, hireCost: 18000, trait: "执行很快，适合高频事务。", resume: "前连锁零售区域经理助理，熟悉门店开业、证照流程、供应商催办和排班。简历里项目很多，换城市也比较频繁。" },
  { id: "su", avatar: "su", name: "苏棠", gender: "female", hair: "#7e2553", understanding: 88, efficiency: 74, loyalty: 58, salary: 21800, hireCost: 32000, trait: "商业嗅觉强，能辅助判断风口和投资节奏。", resume: "曾任投资机构总助，参与过消费、教育、软件项目尽调。她会主动问商业模型和退出路径，但对普通行政琐事兴趣不高。" },
  { id: "fei", avatar: "fei", name: "绯月", gender: "female", hair: "#b13e53", understanding: 55, efficiency: 70, loyalty: 45, salary: 32000, hireCost: 52000, trait: "隐藏彩蛋秘书，拥有高价成人放松服务。", resume: "做过高端会所客户经理和商务接待，擅长关系维护、情绪安抚和临场沟通。履历细节比较模糊，薪资要求很高。", easter: true },
];

const courses = [
  { id: "product", name: "产品验证课", skill: "产品", boost: 1, cost: 8800, minutes: 360, stamina: 3, energy: 12 },
  { id: "tech", name: "低成本技术课", skill: "技术", boost: 1, cost: 9600, minutes: 420, stamina: 4, energy: 13 },
  { id: "ops", name: "县域运营课", skill: "运营", boost: 1, cost: 7600, minutes: 300, stamina: 4, energy: 11 },
  { id: "sales", name: "地推销售课", skill: "销售", boost: 1, cost: 7200, minutes: 300, stamina: 6, energy: 9 },
  { id: "finance", name: "现金流财务课", skill: "财务", boost: 1, cost: 8200, minutes: 330, stamina: 3, energy: 12 },
];

const loanProducts = [
  { id: "micro", name: "小额周转贷", amount: 20000, apr: 0.092, months: 24, minReputation: 0, needBusiness: false, collateralRate: 0, purpose: "适合短期现金周转，额度小、审批快、利率略高。" },
  { id: "store", name: "门店经营贷", amount: 120000, apr: 0.068, months: 24, minReputation: 10, needBusiness: true, collateralRate: 0.1, purpose: "参考门店流水和经营年限给额度，适合扩店和备货。" },
  { id: "company", name: "公司信用贷", amount: 300000, apr: 0.078, months: 36, minReputation: 22, needCompany: true, collateralRate: 0.05, purpose: "看公司项目、创始人信用和负债率，额度更高但连带责任更重。" },
  { id: "mortgage", name: "抵押经营贷", amount: 800000, apr: 0.052, months: 60, minReputation: 16, needCollateral: true, collateralRate: 0.55, purpose: "用固定资产或股票折算抵押，利率低，审批更慢。" },
];

const maxSleepDebtMinutes = 7 * 1440;
const mapDragThreshold = 12;
const mapPointers = new Map();
const suddenDeathBaseAnnual = 0.00125;
const suddenDeathSources = [
  "AHA/CPR Facts：美国每年院外心脏骤停死亡约43.6万人，用作低基准风险。",
  "CDC/NHLBI 睡眠资料：成年人需要足够睡眠，长期睡眠不足与心血管疾病和死亡风险相关。",
];

const spouseCandidates = [
  { name: "许清禾", birthDate: "1996-03-12", trait: "稳健型伴侣，重视现金流和家庭教育。" },
  { name: "沈望舒", birthDate: "1994-09-05", trait: "资源型伴侣，擅长社交，能带来少量声望。" },
  { name: "周启明", birthDate: "1993-12-21", trait: "务实型伴侣，对负债和风险特别敏感。" },
  { name: "林晏", birthDate: "1997-07-30", trait: "学习型伴侣，会推动子女教育投入。" },
];

const relationTypes = {
  family: { name: "亲人", label: "亲人", color: "#b13e53" },
  lover: { name: "情人", label: "情人", color: "#d95788" },
  friend: { name: "朋友", label: "朋友", color: "#41a6f6" },
  partner: { name: "商业伙伴", label: "商业伙伴", color: "#efc25f" },
  employee: { name: "员工", label: "员工", color: "#38b764" },
};

const staffNamePool = ["赵栖", "梁川", "顾眠", "唐砚", "许一诺", "沈青", "陆南", "季白", "程禾", "韩序", "宋岚", "林澈"];

function seeded(seed) {
  const value = Math.sin(seed * 999.217) * 10000;
  return value - Math.floor(value);
}

function jitter(seed, size) {
  return (seeded(seed) - 0.5) * size;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function randomStaffName() {
  return staffNamePool[Math.floor(Math.random() * staffNamePool.length)];
}

function makeWorld() {
  const provinces = [];
  const cities = [];
  const counties = [];
  let cityCounter = 0;
  let countyCounter = 0;

  provinceNames.forEach((name, provinceIndex) => {
    const angle = provinceIndex * 2.399;
    const radius = 8 + Math.sqrt((provinceIndex + 1) / provinceNames.length) * 38;
    const province = {
      id: `p-${provinceIndex}`,
      type: "province",
      name,
      x: clamp(50 + Math.cos(angle) * radius * 1.08 + jitter(provinceIndex + 4, 7), 9, 91),
      y: clamp(50 + Math.sin(angle) * radius * 0.78 + jitter(provinceIndex + 9, 7), 9, 91),
      demand: sectors[provinceIndex % sectors.length],
    };
    provinces.push(province);

    const cityCount = provinceIndex < 10 ? 4 : 3;
    for (let cityIndex = 0; cityIndex < cityCount; cityIndex += 1) {
      const cityAngle = (Math.PI * 2 * cityIndex) / cityCount + seeded(cityCounter + 2) * 0.9;
      const cityRadius = 6 + seeded(cityCounter + 13) * 8;
      const city = {
        id: `c-${cityCounter}`,
        type: "city",
        provinceId: province.id,
        name: `${cityRoots[(cityCounter * 7) % cityRoots.length]}市`,
        x: clamp(province.x + Math.cos(cityAngle) * cityRadius, 7, 93),
        y: clamp(province.y + Math.sin(cityAngle) * cityRadius * 0.82, 7, 93),
        demand: sectors[(provinceIndex + cityIndex + 2) % sectors.length],
        population: 80 + Math.round(seeded(cityCounter + 22) * 420),
        railHub: seeded(cityCounter + 24) > 0.32 || cityIndex === 0,
      };
      cities.push(city);
      cityCounter += 1;

      for (let countyIndex = 0; countyIndex < 8; countyIndex += 1) {
        const countyAngle = (Math.PI * 2 * countyIndex) / 8 + seeded(countyCounter + 31) * 0.65;
        const countyRadius = 7.5 + seeded(countyCounter + 37) * 13;
        const demand = sectors[(provinceIndex + cityIndex + countyIndex) % sectors.length];
        const development = Math.round(35 + seeded(countyCounter + 41) * 65);
        const population = Math.round(8 + seeded(countyCounter + 43) * 92);
        const airport = development > 78 && population > 48 && seeded(countyCounter + 53) > 0.62;
        counties.push({
          id: `k-${countyCounter}`,
          type: "county",
          provinceId: province.id,
          cityId: city.id,
          name: `${countyRoots[(countyCounter * 11) % countyRoots.length]}${countySuffixes[countyCounter % countySuffixes.length]}`,
          x: clamp(city.x + Math.cos(countyAngle) * countyRadius, 5, 95),
          y: clamp(city.y + Math.sin(countyAngle) * countyRadius * 0.78, 5, 95),
          demand,
          bonus: sectorSkill[demand],
          population,
          development,
          railHub: city.railHub && countyIndex === 0,
          airport,
          rent: Math.round(3000 + population * 55 + development * 42 + seeded(countyCounter + 47) * 1800),
        });
        countyCounter += 1;
      }
    }
  });

  return { provinces, cities, counties };
}

const world = makeWorld();
const startCounty = world.counties[0];

const state = {
  cash: 120000,
  time: 8 * 60,
  stamina: 100,
  energy: 82,
  reputation: 12,
  player: {
    name: "创始人",
    generation: 1,
    birthDate: "1995-06-18",
    married: false,
    divorced: false,
    spouse: null,
    children: [],
  },
  relationships: [
    { id: "friend-qiao", name: "乔南", type: "friend", role: "商学院同学", note: "经常交换课程消息和县城开店见闻。", closeness: 62 },
    { id: "lover-ye", name: "叶棠", type: "lover", role: "暧昧对象", note: "关系亲近但还没有进入家庭关系。", closeness: 54 },
    { id: "partner-meng", name: "孟知远", type: "partner", role: "渠道联系人", note: "熟悉本地供应链，偶尔介绍商机。", closeness: 48 },
    { id: "employee-luo", name: "罗小满", type: "employee", role: "兼职运营助理", note: "处理过零散的物料、排班和跑腿事务。", closeness: 46 },
  ],
  relationshipOverrides: {},
  sleepDebtMinutes: 0,
  sleepPromptDismissedUntil: 0,
  deathCheckLog: [],
  will: { mode: "auto", targetId: "auto" },
  pendingInheritance: null,
  gameOver: false,
  vehicle: "walk",
  ownedVehicles: ["walk"],
  clockSpeed: 1,
  soundEnabled: true,
  bgmEnabled: true,
  pendingAction: null,
  travelVehicle: null,
  travelVehicleMenuOpen: false,
  activeTab: "city",
  mapLevel: "province",
  mapPan: { x: -520, y: -230 },
  mapZoom: 1,
  drag: null,
  pinch: null,
  ignoreNextMapClick: false,
  ignoreNextMapClickUntil: 0,
  focusProvinceId: null,
  focusCityId: null,
  focusCountyId: null,
  selectedTarget: null,
  selectedPlaceId: null,
  selectedCountyId: startCounty.id,
  current: { type: "county", id: startCounty.id, name: startCounty.name, x: startCounty.x, y: startCounty.y },
  currentPlaceId: null,
  nextPayroll: 30 * 1440,
  nextStockMarketUpdate: null,
  stockMarketDays: 0,
  stockCash: 0,
  stockPerformanceHistory: [],
  lastStockEquity: 0,
  windSector: "餐饮",
  news: [],
  newsFilter: "unread",
  selectedNewsId: null,
  readNewsIds: [],
  newsSeenIds: [],
  newsReturnTab: "city",
  skills: {
    产品: 38,
    技术: 24,
    运营: 31,
    销售: 27,
    财务: 18,
  },
  businesses: [],
  leases: [],
  ownerDutyBusinessId: null,
  companies: [],
  selectedBusinessManageId: null,
  selectedCompanyManageId: null,
  streetMaps: {},
  stocks: stockTemplates.map(createStock),
  expandedStock: null,
  selectedStockTrade: null,
  stockTradeShares: 100,
  stockTradePausedClockSpeed: null,
  holdings: {},
  loans: [],
  realEstate: [],
  properties: [],
  showAssetReport: false,
  secretaryId: null,
  secretaryLoyalty: null,
  secretaryArrears: 0,
  wageDebt: 0,
  secretaryMissedPayrolls: 0,
  setupAssist: 0,
  toast: null,
  ledger: [],
  log: ["你带着 12 万启动资金来到像素创业国。"],
};

state.news = makeNews();
state.windSector = state.news[0].sector;
state.nextStockMarketUpdate = nextStockMarketUpdateAfter(state.time);

let pendingCompletion = null;
let toastTimer = null;
const audioSystem = {
  ctx: null,
  master: null,
  bgmGain: null,
  fxGain: null,
  moveGain: null,
  bgmTimer: null,
  bgmStep: 0,
  moveTimer: null,
  moveVehicleId: null,
  lastClickAt: 0,
};

const cashEl = document.querySelector("#cash");
const timeEl = document.querySelector("#time");
const staminaEl = document.querySelector("#stamina");
const energyEl = document.querySelector("#energy");
const reputationEl = document.querySelector("#reputation");
const newsTickerEl = document.querySelector("#newsTicker");
const tabPanelEl = document.querySelector("#tabPanel");
const logEl = document.querySelector("#log");
const mainLayoutEl = document.querySelector("#mainLayout");
const toastEl = document.querySelector("#toast");
const projectDialog = document.querySelector("#projectDialog");
const projectGridEl = document.querySelector("#projectGrid");
const districtLabelEl = document.querySelector("#districtLabel");
const leaseDialog = document.querySelector("#leaseDialog");
const leaseLabelEl = document.querySelector("#leaseLabel");
const leaseContentEl = document.querySelector("#leaseContent");
const companyDialog = document.querySelector("#companyDialog");
const companyDialogContentEl = document.querySelector("#companyDialogContent");
const stockTradeDialog = document.querySelector("#stockTradeDialog");
const stockTradeLabelEl = document.querySelector("#stockTradeLabel");
const stockTradeContentEl = document.querySelector("#stockTradeContent");
const sleepDialog = document.querySelector("#sleepDialog");
const sleepDialogTextEl = document.querySelector("#sleepDialogText");
const inheritanceDialog = document.querySelector("#inheritanceDialog");
const inheritanceDialogTextEl = document.querySelector("#inheritanceDialogText");
const gameOverDialog = document.querySelector("#gameOverDialog");
const gameOverTitleEl = document.querySelector("#gameOverTitle");
const gameOverTextEl = document.querySelector("#gameOverText");

function audioContextClass() {
  if (typeof window === "undefined") return null;
  return window.AudioContext || window.webkitAudioContext || null;
}

function ensureAudio() {
  const AudioCtx = audioContextClass();
  if (!AudioCtx) return null;
  if (!audioSystem.ctx) {
    audioSystem.ctx = new AudioCtx();
    audioSystem.master = audioSystem.ctx.createGain();
    audioSystem.bgmGain = audioSystem.ctx.createGain();
    audioSystem.fxGain = audioSystem.ctx.createGain();
    audioSystem.moveGain = audioSystem.ctx.createGain();
    audioSystem.master.gain.value = 0.42;
    audioSystem.bgmGain.gain.value = 0.18;
    audioSystem.fxGain.gain.value = 0.55;
    audioSystem.moveGain.gain.value = 0.28;
    audioSystem.bgmGain.connect(audioSystem.master);
    audioSystem.fxGain.connect(audioSystem.master);
    audioSystem.moveGain.connect(audioSystem.master);
    audioSystem.master.connect(audioSystem.ctx.destination);
  }
  syncAudioGains();
  if (audioSystem.ctx.state === "suspended") audioSystem.ctx.resume();
  if (state.bgmEnabled) startBackgroundMusic();
  else stopBackgroundMusic();
  return audioSystem.ctx;
}

function syncAudioGains() {
  if (!audioSystem.ctx) return;
  audioSystem.bgmGain.gain.value = state.bgmEnabled ? 0.18 : 0;
  audioSystem.fxGain.gain.value = state.soundEnabled ? 0.55 : 0;
  audioSystem.moveGain.gain.value = state.soundEnabled ? 0.28 : 0;
}

function playTone(freq, duration = 0.12, options = {}) {
  const ctx = audioSystem.ctx;
  if (!ctx) return;
  const destination = options.destination || audioSystem.fxGain;
  const start = options.start ?? ctx.currentTime;
  const gainValue = options.gain ?? 0.18;
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = options.type || "square";
  oscillator.frequency.setValueAtTime(freq, start);
  if (options.slideTo) oscillator.frequency.exponentialRampToValueAtTime(options.slideTo, start + duration);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

function startBackgroundMusic() {
  const ctx = audioSystem.ctx;
  if (!ctx || audioSystem.bgmTimer || !state.bgmEnabled) return;
  const melody = [261.63, 329.63, 392, 523.25, 440, 392, 329.63, 293.66];
  const bass = [130.81, 130.81, 164.81, 196, 174.61, 174.61, 146.83, 146.83];
  const playStep = () => {
    if (!audioSystem.ctx || !state.bgmEnabled) return;
    const now = audioSystem.ctx.currentTime;
    const index = audioSystem.bgmStep % melody.length;
    playTone(melody[index], 0.16, { start: now, gain: 0.055, type: "square", destination: audioSystem.bgmGain });
    if (index % 2 === 0) playTone(bass[index], 0.34, { start: now, gain: 0.04, type: "triangle", destination: audioSystem.bgmGain });
    audioSystem.bgmStep += 1;
  };
  playStep();
  audioSystem.bgmTimer = setInterval(playStep, 360);
}

function stopBackgroundMusic() {
  if (audioSystem.bgmTimer) clearInterval(audioSystem.bgmTimer);
  audioSystem.bgmTimer = null;
}

function playClickSound() {
  const ctx = ensureAudio();
  if (!ctx) return;
  if (!state.soundEnabled) return;
  if (ctx.currentTime - audioSystem.lastClickAt < 0.045) return;
  audioSystem.lastClickAt = ctx.currentTime;
  playTone(880, 0.045, { gain: 0.12, type: "square" });
  playTone(1320, 0.04, { start: ctx.currentTime + 0.035, gain: 0.08, type: "square" });
}

function movementSoundProfile(vehicleId) {
  if (vehicleId === "walk") return { interval: 300, tones: [170, 128], duration: 0.055, type: "triangle", gain: 0.12 };
  if (vehicleId === "bike") return { interval: 210, tones: [320, 250], duration: 0.04, type: "square", gain: 0.085 };
  if (vehicleId === "ebike") return { interval: 190, tones: [520, 610], duration: 0.07, type: "sawtooth", gain: 0.055 };
  if (vehicleId === "moto") return { interval: 130, tones: [95, 118, 86], duration: 0.07, type: "sawtooth", gain: 0.09 };
  if (["car", "van", "bus"].includes(vehicleId)) return { interval: 180, tones: [82, 96], duration: 0.08, type: "sawtooth", gain: 0.07 };
  if (vehicleId === "rail") return { interval: 150, tones: [220, 180, 260], duration: 0.04, type: "square", gain: 0.07 };
  if (["flight", "privatePlane"].includes(vehicleId)) return { interval: 260, tones: [74, 92], duration: 0.16, type: "sawtooth", gain: 0.055 };
  return { interval: 240, tones: [220], duration: 0.05, type: "square", gain: 0.08 };
}

function startMovementAudio(vehicleId) {
  const ctx = ensureAudio();
  if (!ctx || !state.soundEnabled || audioSystem.moveVehicleId === vehicleId) return;
  stopMovementAudio();
  const profile = movementSoundProfile(vehicleId);
  let step = 0;
  const playMoveStep = () => {
    if (!audioSystem.ctx) return;
    const tone = profile.tones[step % profile.tones.length];
    playTone(tone, profile.duration, {
      gain: profile.gain,
      type: profile.type,
      destination: audioSystem.moveGain,
      slideTo: ["flight", "privatePlane"].includes(vehicleId) ? tone * 1.08 : null,
    });
    step += 1;
  };
  audioSystem.moveVehicleId = vehicleId;
  playMoveStep();
  audioSystem.moveTimer = setInterval(playMoveStep, profile.interval);
}

function stopMovementAudio() {
  if (audioSystem.moveTimer) clearInterval(audioSystem.moveTimer);
  audioSystem.moveTimer = null;
  audioSystem.moveVehicleId = null;
}

function syncMovementAudio() {
  const travel = state.pendingAction?.category === "移动" ? state.pendingAction.travel : null;
  if (!travel || state.clockSpeed <= 0 || !state.soundEnabled) {
    stopMovementAudio();
    return;
  }
  startMovementAudio(travel.vehicleId);
}

function toggleAudioSetting(kind) {
  if (kind === "sound") {
    state.soundEnabled = !state.soundEnabled;
    if (!state.soundEnabled) stopMovementAudio();
  }
  if (kind === "bgm") {
    state.bgmEnabled = !state.bgmEnabled;
    if (!state.bgmEnabled) stopBackgroundMusic();
  }
  const ctx = ensureAudio();
  syncAudioGains();
  if (kind === "sound" && state.soundEnabled && ctx) {
    playTone(1046.5, 0.06, { gain: 0.1, type: "square" });
  }
  if (kind === "bgm" && state.bgmEnabled) startBackgroundMusic();
  syncMovementAudio();
  showToast(kind === "sound"
    ? `声音${state.soundEnabled ? "已开启" : "已关闭"}`
    : `背景音乐${state.bgmEnabled ? "已开启" : "已关闭"}`, "info");
  render();
}

function formatMoneyUnit(value) {
  const abs = Math.abs(value);
  const units = [
    { value: 1000000000000, label: "万亿" },
    { value: 100000000000, label: "千亿" },
    { value: 10000000000, label: "百亿" },
    { value: 100000000, label: "亿" },
    { value: 1000000, label: "百万" },
    { value: 10000, label: "万" },
    { value: 1000, label: "千" },
  ];
  const unit = units.find((item) => abs >= item.value);
  if (!unit) return Math.round(abs).toLocaleString("zh-CN");
  const scaled = abs / unit.value;
  const digits = scaled >= 100 ? 0 : scaled >= 10 ? 1 : 2;
  return `${Number(scaled.toFixed(digits))}${unit.label}`;
}

function money(value) {
  const sign = value < 0 ? "-" : "";
  return `${sign}¥${formatMoneyUnit(Math.round(value))}`;
}

function moneySmall(value) {
  const sign = value < 0 ? "-" : "";
  return `${sign}¥${Math.abs(value).toFixed(value < 10 ? 2 : 0)}`;
}

function moneyPrice(value) {
  const sign = value < 0 ? "-" : "";
  return `${sign}¥${Math.abs(value).toFixed(2)}`;
}

function gameDate(minutes = state.time) {
  return new Date(gameStartDate.getTime() + Math.floor(minutes) * 60000);
}

function formatTime(minutes) {
  const date = gameDate(minutes);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = String(date.getHours()).padStart(2, "0");
  return `${year}年${month}月${day}日 ${hour}时`;
}

function formatShortDate(minutes) {
  const date = gameDate(minutes);
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
}

function formatClock(minutes = state.time) {
  const date = gameDate(minutes);
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function dateFromKey(key) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day, 0, 0, 0);
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function minutesForDateTime(date, hour, minute = 0) {
  const at = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, 0);
  return Math.round((at.getTime() - gameStartDate.getTime()) / 60000);
}

function commonChinaMarketHolidaySet(year) {
  const days = new Set();
  const addKey = (key) => days.add(key);
  const addRange = (startKey, endKey) => {
    let cursor = dateFromKey(startKey);
    const end = dateFromKey(endKey);
    while (cursor <= end) {
      addKey(dateKey(cursor));
      cursor = addDays(cursor, 1);
    }
  };
  addKey(`${year}-01-01`);
  addRange(`${year}-05-01`, `${year}-05-05`);
  addRange(`${year}-10-01`, `${year}-10-07`);

  const qingmingDay = year === 2024 || year === 2025 ? 4 : 5;
  addRange(`${year}-04-${String(Math.max(3, qingmingDay - 1)).padStart(2, "0")}`, `${year}-04-${String(qingmingDay + 1).padStart(2, "0")}`);

  const spring = lunarHolidayDates.spring[year];
  if (spring) {
    const start = addDays(dateFromKey(spring), -1);
    const end = addDays(dateFromKey(spring), 5);
    addRange(dateKey(start), dateKey(end));
  }
  const dragon = lunarHolidayDates.dragon[year];
  if (dragon) {
    addRange(dateKey(addDays(dateFromKey(dragon), -1)), dateKey(addDays(dateFromKey(dragon), 1)));
  }
  const midAutumn = lunarHolidayDates.midAutumn[year];
  if (midAutumn) {
    addRange(dateKey(addDays(dateFromKey(midAutumn), -1)), dateKey(addDays(dateFromKey(midAutumn), 1)));
  }
  return days;
}

function isStockTradingDay(date) {
  const day = date.getDay();
  if (day === 0 || day === 6) return false;
  return !commonChinaMarketHolidaySet(date.getFullYear()).has(dateKey(date));
}

function minuteOfDay(date) {
  return date.getHours() * 60 + date.getMinutes();
}

function isStockMarketOpen(minutes = state.time) {
  const date = gameDate(minutes);
  if (!isStockTradingDay(date)) return false;
  const minute = minuteOfDay(date);
  return stockTradeSessions.some((session) => minute >= session.start && minute < session.end);
}

function stockMarketStatus(minutes = state.time) {
  const date = gameDate(minutes);
  if (!isStockTradingDay(date)) return { open: false, label: "休市", reason: "休息日/节假日" };
  const minute = minuteOfDay(date);
  if (isStockMarketOpen(minutes)) return { open: true, label: "交易中", reason: `${formatClock(minutes)} 可交易` };
  if (minute < stockTradeSessions[0].start) return { open: false, label: "未开盘", reason: "09:30 开盘" };
  if (minute >= stockTradeSessions[0].end && minute < stockTradeSessions[1].start) return { open: false, label: "午间休市", reason: "13:00 复盘" };
  return { open: false, label: "已收盘", reason: "15:00 收盘" };
}

function nextStockMarketUpdateAfter(minutes) {
  let date = gameDate(minutes + 1);
  for (let offset = 0; offset < 5000; offset += 1) {
    const close = minutesForDateTime(date, 15, 0);
    if (close > minutes && isStockTradingDay(date)) return close;
    date = addDays(date, 1);
  }
  return minutes + 24 * 60;
}

function ageFromBirthDate(birthDate, atMinutes = state.time) {
  const date = gameDate(atMinutes);
  const [year, month, day] = birthDate.split("-").map(Number);
  let age = date.getFullYear() - year;
  const hasBirthdayPassed = date.getMonth() + 1 > month || (date.getMonth() + 1 === month && date.getDate() >= day);
  if (!hasBirthdayPassed) age -= 1;
  return Math.max(0, age);
}

function playerAge() {
  return ageFromBirthDate(state.player.birthDate);
}

function childAge(child) {
  return Math.floor(Math.max(0, state.time - child.bornAt) / (365 * 1440));
}

function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  if (hours >= 24) return `${Math.floor(hours / 24)}天${hours % 24}小时`;
  if (hours > 0) return `${hours}小时${mins}分`;
  return `${mins}分钟`;
}

function makeNews() {
  const first = newsPool[Math.floor(Math.random() * newsPool.length)];
  const rest = newsPool
    .filter((item) => item !== first)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  return [first, ...rest].map((item, index) => enrichNews(item, index));
}

function enrichNews(item, index = 0, exclusive = false) {
  const source = newsSources[Math.floor(Math.random() * newsSources.length)];
  const trueSignal = Math.random() < source.reliability;
  return {
    ...item,
    id: `n-${state?.time || 0}-${index}-${Math.floor(Math.random() * 10000)}`,
    title: `${item.sector}：${item.text.slice(0, 16)}...`,
    source,
    trueSignal,
    exclusive,
    publishedAt: state?.time || 8 * 60,
  };
}

function createStock(stock, index) {
  const spreadRate = 0.0025 + seeded(index + 77) * 0.0045;
  return refreshQuote({
    ...stock,
    seedIndex: index,
    prevClose: stock.price,
    open: stock.price,
    high: stock.price,
    low: stock.price,
    change: 0,
    turnover: 0,
    volume: stock.volumeBase,
    spreadRate,
    history: Array.from({ length: 12 }, (_, offset) => Math.round(stock.price * (0.96 + seeded(index * 31 + offset) * 0.08) * 100) / 100),
  }, 0);
}

function ensureCandles(stock) {
  if (stock.candles) return;
  stock.candles = stock.history.map((close, index, list) => {
    const open = index === 0 ? close * (0.985 + seeded(index + stock.price) * 0.03) : list[index - 1];
    const high = Math.max(open, close) * (1.006 + seeded(index + stock.volumeBase) * 0.03);
    const low = Math.min(open, close) * (0.994 - seeded(index + stock.eps) * 0.025);
    return {
      open: Math.round(open * 100) / 100,
      close: Math.round(close * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      volume: Math.round(stock.volumeBase * (0.6 + seeded(index + stock.price) * 0.8)),
    };
  });
}

function refreshQuote(stock, change) {
  stock.change = change;
  stock.price = Math.max(1.2, Math.round(stock.price * (1 + change) * 100) / 100);
  stock.open = stock.prevClose;
  stock.high = Math.max(stock.open, stock.price) * (1 + Math.abs(change) * 0.38);
  stock.low = Math.min(stock.open, stock.price) * (1 - Math.abs(change) * 0.28);
  stock.high = Math.round(stock.high * 100) / 100;
  stock.low = Math.round(stock.low * 100) / 100;
  stock.bid = Math.round(stock.price * (1 - stock.spreadRate / 2) * 100) / 100;
  stock.ask = Math.round(stock.price * (1 + stock.spreadRate / 2) * 100) / 100;
  stock.volume = Math.round(stock.volumeBase * (0.7 + Math.abs(change) * 8 + Math.random() * 0.5));
  stock.turnover = Math.round(stock.volume * stock.price);
  stock.pe = Math.max(1, Math.round((stock.price / Math.max(0.05, stock.eps)) * 10) / 10);
  ensureCandles(stock);
  stock.candles.push({
    open: stock.open,
    close: stock.price,
    high: stock.high,
    low: stock.low,
    volume: stock.volume,
  });
  stock.candles = stock.candles.slice(-32);
  stock.history.push(stock.price);
  stock.history = stock.history.slice(-18);
  return stock;
}

function render(options = {}) {
  const { panel = true } = options;
  renderStatus();
  renderNews();
  renderToast();
  if (panel && !state.drag) renderActiveTab();
  syncLayout();
  renderLog();
  syncTabs();
  syncClockControls();
  syncMovementAudio();
}

function showToast(message, tone = "info") {
  state.toast = { message, tone };
  renderToast();
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    state.toast = null;
    renderToast();
  }, 5000);
}

function renderToast() {
  if (!toastEl) return;
  toastEl.innerHTML = state.toast
    ? `<div class="toast-message ${state.toast.tone}">${state.toast.message}</div>`
    : "";
}

function syncLayout() {
  mainLayoutEl?.classList.toggle("city-active", state.activeTab === "city");
}

function renderStatus() {
  cashEl.textContent = money(state.cash);
  timeEl.textContent = formatTime(state.time);
  staminaEl.textContent = Math.round(state.stamina);
  energyEl.textContent = Math.round(state.energy);
  reputationEl.textContent = state.reputation;
}

function renderNews() {
  newsTickerEl.textContent = state.news.map((item) => `【${item.source.type}·${sourceDisplayName(item.source)}】${item.title}`).join("    ");
  document.querySelectorAll(".news-open").forEach((button) => {
    const opened = state.activeTab === "news";
    button.textContent = opened ? "关闭" : "打开";
    button.classList.toggle("active", opened);
  });
}

function renderResources() {
  const resources = [
    { name: "体力", value: state.stamina, color: state.stamina <= 20 ? "#b13e53" : "#38b764" },
    { name: "精力", value: state.energy, color: state.energy <= 20 ? "#b13e53" : "#41a6f6" },
  ];
  return resources
    .map((item) => `
      <div class="resource-row">
        <div class="resource-label"><span>${item.name}</span><strong>${Math.round(item.value)}/100</strong></div>
        <div class="meter"><span style="width:${clamp(item.value, 0, 100)}%;background:${item.color}"></span></div>
      </div>
    `)
    .join("");
}

function renderVehicles() {
  return Object.keys(vehicles)
    .map((id) => renderVehicleCard(id, vehicles[id]))
    .join("");
}

function vehicleIconKey(id) {
  if (id === "privatePlane") return "flight";
  return id;
}

function vehicleShortName(id) {
  const names = {
    walk: "步行",
    bike: "自行车",
    ebike: "电动",
    moto: "摩托",
    car: "汽车",
    van: "商务",
    bus: "公交",
    rail: "高铁",
    flight: "飞机",
    privatePlane: "私飞",
  };
  return names[id] || vehicles[id]?.name || "";
}

function renderVehicleIcon(id, locked = false) {
  return `<span class="vehicle-icon vehicle-icon-${vehicleIconKey(id)} ${locked ? "silhouette" : ""}" aria-hidden="true"></span>`;
}

function renderSkills() {
  return Object.entries(state.skills)
    .map(([name, value]) => {
      const color = value > 60 ? "#38b764" : value > 35 ? "#efc25f" : "#b13e53";
      return `
        <div class="skill-row">
          <div class="skill-label"><span>${name}</span><strong>${value}</strong></div>
          <div class="meter"><span style="width:${value}%;background:${color}"></span></div>
        </div>
      `;
    })
    .join("");
}

function renderActiveTab() {
  if (state.activeTab === "city") renderCityTab();
  if (state.activeTab === "stocks") renderStocksTab();
  if (state.activeTab === "ledger") renderLedgerTab();
  if (state.activeTab === "secretary") renderSecretaryTab();
  if (state.activeTab === "school") renderSchoolTab();
  if (state.activeTab === "me") renderMeTab();
  if (state.activeTab === "settings") renderSettingsTab();
  if (state.activeTab === "business") renderBusinessTab();
  if (state.activeTab === "news") renderNewsTab();
}

function syncTabs() {
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === state.activeTab);
  });
}

function syncClockControls() {
  document.querySelectorAll(".speed-button").forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.clockSpeed) === state.clockSpeed);
  });
}

function renderMeTab() {
  const report = assetReport();
  const netWorth = report.totalAssets - report.totalLiabilities;
  const risk = suddenDeathRiskPreview();
  tabPanelEl.innerHTML = `
    <div class="section-head">
      <div>
        <h2>我的</h2>
        <p class="small-copy">创始人属性、关系网、家庭继承、资产负债、体力精力、技能和交通工具都放在这里。</p>
      </div>
      <div class="pill-row">
        <span class="pill">年龄 ${playerAge()}岁</span>
        <span class="pill">当前交通 ${vehicles[state.vehicle].name}</span>
        <span class="pill">净资产 ${money(netWorth)}</span>
        <span class="pill">透支 ${formatDuration(state.sleepDebtMinutes)}</span>
      </div>
    </div>
    <div class="my-grid">
      <div class="my-column">
        <article class="profile-card">
          <div class="portrait" aria-hidden="true">
            <div class="hair"></div>
            <div class="face"></div>
            <div class="body"></div>
          </div>
          <h3>${state.player.name}</h3>
          <p>第 ${state.player.generation} 代｜${playerAge()} 岁</p>
          <p>擅长：产品直觉</p>
          <p>声望：${state.reputation}</p>
          <p>${state.player.married ? `已婚｜伴侣：${state.player.spouse.name}` : "未婚"}</p>
          <div class="quick-actions">
            <button class="primary-action" data-action="sleep">睡觉</button>
          </div>
        </article>
        ${renderFamilyPanel()}
        <article class="resource-card">
          <h3>体力与精力</h3>
          <div class="resource-pack">${renderResources()}</div>
          <p class="small-copy">预计补觉：${formatDuration(requiredSleepMinutes())}｜猝死风险：${risk.label}</p>
        </article>
        <article class="resource-card">
          <h3>技能</h3>
          <div class="skills">${renderSkills()}</div>
        </article>
      </div>
      <div class="my-column">
        ${renderRelationshipNetwork()}
        <article class="asset-card">
          <h3>个人资产</h3>
          <p>现金：${money(report.cash)}</p>
          <p>证券账户现金：${money(report.stockCash)}</p>
          <p>股票：${money(report.stocks)}</p>
          <p>固定资产：${money(report.fixedAssets)}</p>
          <p>负债：${money(report.totalLiabilities)}</p>
          <p>净资产：${money(netWorth)}</p>
          <button class="small-action gold" data-asset-report="1">${state.showAssetReport ? "收起资产报表" : "查看详细资产报表"}</button>
        </article>
        ${state.showAssetReport ? renderAssetReport(report) : ""}
        <article class="vehicle-card vehicle-compact-card">
          <h3>交通工具</h3>
          <div class="vehicle-icon-grid">${renderVehicles()}</div>
        </article>
      </div>
    </div>
  `;
}

function renderAudioSettings() {
  return `
    <article class="settings-card">
      <h3>声音设置</h3>
      <div class="setting-list">
        <div class="setting-row">
          <div>
            <strong>声音</strong>
            <p class="small-copy">点击、移动和交通音效</p>
          </div>
          <button class="small-action ${state.soundEnabled ? "gold" : "red"}" data-audio-toggle="sound">
            ${state.soundEnabled ? "已开启" : "已关闭"}
          </button>
        </div>
        <div class="setting-row">
          <div>
            <strong>背景音乐</strong>
            <p class="small-copy">简单休闲的循环音乐</p>
          </div>
          <button class="small-action ${state.bgmEnabled ? "gold" : "red"}" data-audio-toggle="bgm">
            ${state.bgmEnabled ? "已开启" : "已关闭"}
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderSettingsTab() {
  tabPanelEl.innerHTML = `
    <div class="section-head">
      <div>
        <h2>设置</h2>
        <p class="small-copy">声音、音乐和后续系统选项集中放在这里。</p>
      </div>
    </div>
    <div class="settings-grid">
      ${renderAudioSettings()}
    </div>
  `;
}

function renderVehicleCard(id, vehicle) {
  const owned = state.ownedVehicles.includes(id) || vehicle.kind === "public";
  const active = state.vehicle === id;
  return `
    <button class="vehicle-icon-button ${active ? "active" : ""} ${owned ? "" : "locked"}" data-vehicle-select="${id}" aria-label="${vehicle.name}">
      ${renderVehicleIcon(id, !owned)}
      <span>${vehicleShortName(id)}</span>
    </button>
  `;
}

function renderFamilyPanel() {
  const children = state.player.children;
  const adultChild = children.find((child) => childAge(child) >= 18);
  return `
    <article class="family-card">
      <h3>家庭与继承</h3>
      <p>${state.player.married ? `伴侣：${state.player.spouse.name}｜${state.player.spouse.trait}` : "还没有结婚。结婚会开启子女和继承玩法。"}</p>
      <div class="quick-actions">
        ${state.player.married
          ? `<button class="primary-action alt" data-family-action="child" ${children.length >= 3 ? "disabled" : ""}>计划子女</button>`
          : `<button class="primary-action alt" data-family-action="marry">结婚</button>`}
        <button class="primary-action" data-family-action="heir" ${adultChild ? "" : "disabled"}>${adultChild ? `交棒给${adultChild.name}` : "子女成年后可继承"}</button>
      </div>
      <div class="child-list">
        ${children.length ? children.map(renderChildCard).join("") : "<p class=\"small-copy\">暂无子女。子女成年后可以继承全部资产与负债。</p>"}
      </div>
      ${renderWillControls()}
    </article>
  `;
}

function renderChildCard(child) {
  const profile = childDevelopment(child);
  return `
    <div class="child-card">
      <strong>${child.name}｜${childAge(child)}岁</strong>
      <p>天赋 ${profile.talent}｜教育投入 ${money(child.education)}</p>
      <p>预估技能点：产品${profile.skills.产品} 技术${profile.skills.技术} 运营${profile.skills.运营} 销售${profile.skills.销售} 财务${profile.skills.财务}</p>
      <div class="pill-row">
        <button class="small-action gold" data-child-id="${child.id}" data-education-invest="10000">教育投入 ${money(10000)}</button>
        <button class="small-action green" data-child-id="${child.id}" data-education-invest="50000">重点培养 ${money(50000)}</button>
      </div>
    </div>
  `;
}

function relationshipPeople() {
  const people = [];
  const usedNames = new Set();
  const push = (person) => {
    if (!person?.name || usedNames.has(person.name)) return;
    usedNames.add(person.name);
    people.push({
      ...person,
      type: relationTypes[person.type] ? person.type : "friend",
    });
  };

  if (state.player.married && state.player.spouse) {
    push({
      id: "family-spouse",
      rawId: "spouse",
      source: "family",
      name: state.player.spouse.name,
      type: "family",
      role: "伴侣",
      note: state.player.spouse.trait || "唯一伴侣关系。",
      locked: true,
    });
  }

  state.player.children.forEach((child) => {
    push({
      id: `family-child-${child.id}`,
      rawId: child.id,
      source: "family",
      name: child.name,
      type: "family",
      role: `子女｜${childAge(child)}岁`,
      note: `教育投入 ${money(child.education)}，未来可继承资产与负债。`,
      locked: true,
    });
  });

  state.relationships.forEach((contact) => {
    push({
      ...contact,
      rawId: contact.id,
      source: "contact",
      locked: false,
    });
  });

  const secretary = currentSecretary();
  if (secretary) {
    const id = `secretary-${secretary.id}`;
    push({
      id,
      rawId: secretary.id,
      source: "secretary",
      name: secretary.name,
      type: state.relationshipOverrides[id] || "employee",
      role: "秘书",
      note: `月薪 ${money(secretary.salary)}，负责处理事务和市场信息。`,
      locked: false,
    });
  }

  state.businesses.forEach((business) => {
    (business.staff || []).forEach((staff, index) => {
      const id = `staff-${business.id}-${staff.id}`;
      push({
        id,
        rawId: staff.id,
        source: "staff",
        name: staff.name || `${staff.roleName}${index + 1}`,
        type: state.relationshipOverrides[id] || "employee",
        role: `${business.name}｜${staff.roleName}`,
        note: `月薪 ${money(staff.salary)}，士气 ${staff.morale}。`,
        locked: false,
      });
    });
  });

  state.companies.forEach((company) => {
    (company.staff || []).forEach((staff, index) => {
      const id = `co-staff-${company.id}-${staff.id}`;
      push({
        id,
        rawId: staff.id,
        source: "companyStaff",
        name: staff.name || `${staff.roleName}${index + 1}`,
        type: state.relationshipOverrides[id] || "employee",
        role: `${company.name}｜${staff.roleName}`,
        note: `月薪 ${money(staff.salary)}，效率 ${staff.efficiency}。`,
        locked: false,
      });
    });
  });

  return people;
}

function relationshipPosition(index, total) {
  if (total <= 1) return { x: 50, y: 18 };
  const angle = -Math.PI / 2 + (Math.PI * 2 * index) / total;
  return {
    x: clamp(50 + Math.cos(angle) * 36, 13, 87),
    y: clamp(50 + Math.sin(angle) * 32, 15, 85),
  };
}

function renderRelationshipNetwork() {
  const people = relationshipPeople();
  const mapPeople = people.slice(0, 12);
  const positioned = mapPeople.map((person, index) => ({
    ...person,
    position: relationshipPosition(index, mapPeople.length),
  }));
  const legend = Object.entries(relationTypes)
    .map(([type, meta]) => `<span class="relation-legend-item relation-${type}"><i></i>${meta.label}</span>`)
    .join("");

  return `
    <article class="relationship-card">
      <div class="relationship-head">
        <div>
          <h3>关系网</h3>
          <p class="small-copy">亲人关系锁定；朋友、情人、商业伙伴、员工可以互相转换。转为伴侣时只能有一个。</p>
        </div>
        <div class="relationship-legend">${legend}</div>
      </div>
      <div class="relationship-map" aria-label="关系网">
        <svg class="relationship-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          ${positioned.map((person) => `<line class="relation-line relation-line-${person.type}" x1="50" y1="50" x2="${person.position.x}" y2="${person.position.y}"></line>`).join("")}
        </svg>
        <div class="relationship-center">我</div>
        ${positioned.map((person) => `
          <div class="relationship-node relation-node-${person.type}" style="left:${person.position.x}%; top:${person.position.y}%;">
            <strong>${person.name}</strong>
            <span>${relationTypes[person.type].label}</span>
          </div>
        `).join("")}
      </div>
      <div class="relationship-list">
        ${people.length ? people.map(renderRelationshipPerson).join("") : "<p class=\"small-copy\">暂时没有可展示的人际关系。</p>"}
      </div>
    </article>
  `;
}

function renderRelationshipPerson(person) {
  const meta = relationTypes[person.type] || relationTypes.friend;
  return `
    <div class="relationship-person">
      <div>
        <strong>${person.name}</strong>
        <span class="relation-label relation-${person.type}">${meta.label}</span>
        <p>${person.role}｜${person.note}</p>
      </div>
      <div class="relationship-actions">
        ${renderRelationshipActions(person)}
      </div>
    </div>
  `;
}

function renderRelationshipActions(person) {
  if (person.locked || person.type === "family") return `<span class="relationship-lock">亲人关系不可转换</span>`;
  const options = [
    { type: "friend", label: "朋友", cls: "" },
    { type: "lover", label: "情人", cls: "red" },
    { type: "partner", label: "商业伙伴", cls: "gold" },
    { type: "employee", label: "员工", cls: "green" },
    { type: "family", label: "伴侣", cls: "red" },
  ];
  return options.map((option) => {
    const current = person.type === option.type;
    const spouseBlocked = option.type === "family" && state.player.married;
    const disabled = current || spouseBlocked;
    return `
      <button class="small-action ${option.cls}" data-relation-id="${person.id}" data-relation-type="${option.type}" ${disabled ? "disabled" : ""}>
        ${option.label}
      </button>
    `;
  }).join("");
}

function convertRelationship(personId, nextType) {
  const person = relationshipPeople().find((item) => item.id === personId);
  if (!person || !relationTypes[nextType]) {
    showToast("没有找到这段关系。", "warn");
    render();
    return;
  }
  if (person.locked || person.type === "family") {
    showToast("亲人关系不能转换为其他关系。", "warn");
    render();
    return;
  }
  if (nextType === "family") {
    promoteRelationshipToSpouse(person);
    return;
  }
  setRelationshipType(person, nextType);
  addLog(`${person.name}的关系调整为${relationTypes[nextType].name}。`);
  showToast(`${person.name}已转为${relationTypes[nextType].name}。`, "success");
  render();
}

function setRelationshipType(person, nextType) {
  if (person.source === "contact") {
    const contact = state.relationships.find((item) => item.id === person.rawId);
    if (contact) contact.type = nextType;
    return;
  }
  state.relationshipOverrides[person.id] = nextType;
}

function promoteRelationshipToSpouse(person) {
  if (state.player.married) {
    showToast("伴侣只能有一个。", "warn");
    render();
    return;
  }
  state.player.married = true;
  state.player.spouse = {
    name: person.name,
    birthDate: "1996-01-01",
    trait: `由${relationTypes[person.type].name}发展为伴侣，关系进入家庭与继承系统。`,
  };
  if (person.source === "contact") {
    state.relationships = state.relationships.filter((item) => item.id !== person.rawId);
  } else {
    state.relationshipOverrides[person.id] = "family";
  }
  state.reputation += 1;
  addLog(`${person.name}成为你的伴侣。伴侣关系唯一，已进入家庭与继承系统。`);
  showToast(`${person.name}已成为伴侣。`, "success");
  render();
}

function renderWillPanel() {
  return `
    <article class="will-card">
      ${renderWillControls()}
    </article>
  `;
}

function renderWillControls() {
  const targetLabel = willTargetLabel();
  const children = state.player.children;
  return `
    <div class="will-inline">
      <h3>遗嘱</h3>
      <p>当前安排：${targetLabel}</p>
      <p class="small-copy">死亡后会先按遗嘱处理；选择捐献会终局，自动继承会优先成年子女，其次配偶监护未成年子女。</p>
      <div class="pill-row">
        <button class="small-action ${state.will.mode === "auto" ? "gold" : "green"}" data-will-mode="auto" data-will-target="auto">自动继承</button>
        <button class="small-action ${state.will.mode === "donate" ? "gold" : "green"}" data-will-mode="donate" data-will-target="charity">死后捐献</button>
        ${state.player.married ? `<button class="small-action ${state.will.mode === "spouse" ? "gold" : "green"}" data-will-mode="spouse" data-will-target="spouse">给配偶</button>` : ""}
        ${children.map((child) => `<button class="small-action ${state.will.targetId === child.id ? "gold" : "green"}" data-will-mode="child" data-will-target="${child.id}">给${child.name}</button>`).join("")}
      </div>
    </div>
  `;
}

function willTargetLabel() {
  if (state.will.mode === "donate") return "死亡后清算财产并捐献，游戏结束";
  if (state.will.mode === "spouse") return state.player.married ? `全部交给${state.player.spouse.name}` : "指定配偶，但当前没有配偶";
  if (state.will.mode === "child") {
    const child = state.player.children.find((item) => item.id === state.will.targetId);
    return child ? `全部交给${child.name}` : "指定子女不存在，按自动继承处理";
  }
  return "自动继承";
}

function childDevelopment(child) {
  const educationLevel = Math.floor(child.education / 50000);
  const talent = clamp(child.baseTalent + educationLevel * 2 + Math.floor(childAge(child) / 4), 18, 96);
  const skills = {
    产品: clamp(Math.round(talent * 0.34 + educationLevel * 2 + seeded(child.seed + 1) * 12), 8, 88),
    技术: clamp(Math.round(talent * 0.3 + educationLevel * 2 + seeded(child.seed + 2) * 14), 8, 88),
    运营: clamp(Math.round(talent * 0.32 + educationLevel * 2 + seeded(child.seed + 3) * 12), 8, 88),
    销售: clamp(Math.round(talent * 0.28 + educationLevel * 2 + seeded(child.seed + 4) * 13), 8, 88),
    财务: clamp(Math.round(talent * 0.27 + educationLevel * 2 + seeded(child.seed + 5) * 12), 8, 88),
  };
  return { talent, skills };
}

function assetReport() {
  const vehicleItems = state.ownedVehicles
    .filter((id) => id !== "walk")
    .map((id) => {
      const vehicle = vehicles[id];
      const rate = id === "privatePlane" ? 0.72 : 0.58;
      return { name: vehicle.name, value: Math.round(vehicle.price * rate) };
    });
  const vehicleAssets = vehicleItems.reduce((sum, item) => sum + item.value, 0);
  const housingAssets = state.realEstate.reduce((sum, item) => sum + item.value, 0);
  const propertyAssets = state.properties.reduce((sum, item) => sum + item.value, 0);
  const fixedAssets = vehicleAssets + housingAssets + propertyAssets;
  const businessEquity = state.businesses.reduce((sum, business) => sum + business.baseIncome * (5 + business.level) + business.mastery * 260, 0);
  const companyEquity = state.companies.reduce((sum, company) => sum + company.monthlyBase * (6 + company.level), 0);
  const stocks = portfolioValue();
  const stockCash = state.stockCash;
  const loanPrincipal = state.loans.reduce((sum, loan) => sum + loan.outstanding, 0);
  const loanShortTermDebt = state.loans.reduce((sum, loan) => sum + Math.min(loan.outstanding, loan.monthlyPayment * 12), 0);
  const companyGuarantee = state.companies.reduce((sum, company) => sum + (company.liabilityGuarantee || 0), 0);
  const secretaryWageDebt = Math.max(0, state.secretaryArrears + (state.wageDebt || 0));
  const shortTermDebt = loanShortTermDebt + secretaryWageDebt;
  const currentPayables = (currentSecretary() ? currentSecretary().salary : 0) + (state.ownedVehicles.includes("privatePlane") ? vehicles.privatePlane.monthlyMaintenance : 0);
  const totalAssets = state.cash + stockCash + stocks + fixedAssets + businessEquity + companyEquity;
  const totalLiabilities = loanPrincipal + companyGuarantee + secretaryWageDebt + currentPayables;
  return {
    cash: state.cash,
    stockCash,
    stocks,
    fixedAssets,
    vehicleAssets,
    vehicleItems,
    housingAssets,
    propertyAssets,
    businessEquity,
    companyEquity,
    loanPrincipal,
    shortTermDebt,
    secretaryWageDebt,
    companyGuarantee,
    currentPayables,
    totalAssets,
    totalLiabilities,
  };
}

function renderAssetReport(report = assetReport()) {
  return `
    <article class="asset-report">
      <h3>详细个人资产报表</h3>
      <div class="asset-section">
        <h4>资产</h4>
        ${renderAssetLine("现金", report.cash)}
        ${renderAssetLine("证券账户现金", report.stockCash)}
        ${renderAssetLine("股票市值", report.stocks)}
        ${renderAssetLine("车辆", report.vehicleAssets)}
        ${renderAssetLine("房子", report.housingAssets)}
        ${renderAssetLine("物业地产", report.propertyAssets)}
        ${renderAssetLine("门店权益估值", report.businessEquity)}
        ${renderAssetLine("公司权益估值", report.companyEquity)}
      </div>
      <div class="asset-section">
        <h4>固定资产明细</h4>
        ${report.vehicleItems.length ? report.vehicleItems.map((item) => renderAssetLine(item.name, item.value)).join("") : "<p class=\"small-copy\">暂无车辆固定资产。</p>"}
        ${state.realEstate.length ? state.realEstate.map((item) => renderAssetLine(item.name, item.value)).join("") : "<p class=\"small-copy\">暂无房产。</p>"}
        ${state.properties.length ? state.properties.map((item) => renderAssetLine(item.name, item.value)).join("") : "<p class=\"small-copy\">暂无物业地产。</p>"}
      </div>
      <div class="asset-section">
        <h4>负债</h4>
        ${renderAssetLine("贷款本金", report.loanPrincipal)}
        ${renderAssetLine("一年内需偿还债务", report.shortTermDebt)}
        ${report.secretaryWageDebt > 0 ? renderAssetLine("拖欠工资债务", report.secretaryWageDebt) : ""}
        ${renderAssetLine("公司连带责任", report.companyGuarantee)}
        ${renderAssetLine("当月固定应付款", report.currentPayables)}
        ${report.secretaryWageDebt > 0 ? `<div class="pill-row"><button class="small-action gold" data-repay-wage-debt="true">补发拖欠工资</button></div>` : ""}
      </div>
      <div class="asset-total">
        <strong>总资产 ${money(report.totalAssets)}</strong>
        <strong>总负债 ${money(report.totalLiabilities)}</strong>
        <strong>净资产 ${money(report.totalAssets - report.totalLiabilities)}</strong>
      </div>
    </article>
  `;
}

function renderAssetLine(label, value) {
  return `<p class="asset-line"><span>${label}</span><strong>${money(value)}</strong></p>`;
}

function renderVehicleStoreAtPlace(place) {
  const storeMap = {
    bikeStore: ["bike", "ebike", "moto"],
    carDealer: ["car", "van"],
    aviation: ["privatePlane"],
  };
  const storeVehicles = storeMap[place.placeType];
  if (!storeVehicles) return "";
  const atStore = state.current.type === "place" && state.current.id === place.id && !state.pendingAction;
  return `
    <div class="store-card">
      <h3>${place.name}</h3>
      ${atStore
        ? `<div class="vehicle-icon-grid store-vehicle-grid">${storeVehicles.map((id) => renderStoreVehicleButton(id)).join("")}</div>`
        : `<p class="small-copy">到店后可购买：${storeVehicles.map((id) => vehicles[id].name).join("、")}</p>`}
    </div>
  `;
}

function renderStoreVehicleButton(id) {
  const vehicle = vehicles[id];
  const owned = state.ownedVehicles.includes(id);
  return `
    <button class="vehicle-icon-button ${owned ? "active" : ""}" data-buy-vehicle="${id}" ${owned ? "disabled" : ""} aria-label="购买${vehicle.name}">
      ${renderVehicleIcon(id, false)}
      <span>${owned ? "已拥有" : money(vehicle.price)}</span>
    </button>
  `;
}

function renderCityTab() {
  const nodes = mapNodes();
  const province = state.focusProvinceId ? getProvince(state.focusProvinceId) : null;
  const city = state.focusCityId ? getCity(state.focusCityId) : null;
  const county = state.focusCountyId ? getCounty(state.focusCountyId) : null;
  const selectedIsPlace = state.selectedTarget?.type === "place";
  tabPanelEl.innerHTML = `
    <div class="map-topline">
      <div class="map-title">
        <h2>${mapTitle()}</h2>
        <p>虚拟国家：${world.provinces.length} 省、${world.cities.length} 市、${world.counties.length} 县。地图可以随便浏览，选中地点后在弹窗里选择交通并移动。</p>
      </div>
      <div class="world-stats">
        <span class="pill">可浏览 ${mapLevelLabel()}</span>
        <span class="pill">移动前先选地点</span>
      </div>
    </div>
    <div class="breadcrumb">
      <button class="crumb ${state.mapLevel === "province" ? "active" : ""}" data-map-level="province">全国</button>
      ${province ? `<button class="crumb ${state.mapLevel === "city" ? "active" : ""}" data-map-level="city">${province.name}</button>` : ""}
      ${city ? `<button class="crumb ${state.mapLevel === "county" ? "active" : ""}" data-map-level="county">${city.name}</button>` : ""}
      ${county ? `<button class="crumb ${state.mapLevel === "street" ? "active" : ""}" data-map-level="street">${county.name}街道</button>` : ""}
    </div>
    <div class="map-shell ${selectedIsPlace ? "has-selection" : ""}">
      <div class="map-toolbar">
        <span>拖动地图查看周边，点击地点只会选中，不会立即移动。</span>
        <div class="map-tools">
          <button class="small-action gold" data-map-zoom="out">－</button>
          <span class="zoom-label">${Math.round(state.mapZoom * 100)}%</span>
          <button class="small-action gold" data-map-zoom="in">＋</button>
          <button class="small-action gold" data-map-overview="1">地图全览</button>
          <button class="small-action gold" data-map-current="1">回到所在位置</button>
        </div>
      </div>
      <div class="map-canvas" data-map-viewport="1">
        <div class="map-world ${state.mapLevel === "street" ? "street-world" : "country-world"}" style="transform:translate(${state.mapPan.x}px, ${state.mapPan.y}px) scale(${state.mapZoom});">
          ${state.mapLevel === "street" ? renderStreetBackdrop(nodes) : renderWorldBackdrop()}
          ${renderRouteSvg(nodes)}
          ${nodes.map((node) => node.type === "place" ? renderStreetNode(node) : renderMapNode(node)).join("")}
          ${renderPlayerMarker(nodes)}
        </div>
        <div class="map-note">${mapHelpText()}</div>
        ${renderTravelProgressOverlay(nodes)}
      </div>
      ${renderMapActionPopup()}
    </div>
    ${renderMapInfoPanel()}
  `;
}

function mapLevelLabel() {
  if (state.mapLevel === "province") return "全国";
  if (state.mapLevel === "city") return "省内城市";
  if (state.mapLevel === "county") return "县镇";
  return "街道建筑";
}

function mapTitle() {
  if (state.mapLevel === "province") return "全国省级地图";
  if (state.mapLevel === "city") return `${getProvince(state.focusProvinceId).name} · 市级地图`;
  if (state.mapLevel === "county") return `${getCity(state.focusCityId).name} · 县镇地图`;
  return `${getCounty(state.focusCountyId).name} · 街道生活地图`;
}

function mapHelpText() {
  if (state.pendingAction) return `${state.pendingAction.label}进行中，剩余 ${formatDuration(Math.max(0, state.pendingAction.end - state.time))}。`;
  if (state.stamina <= 18) return "体力过低，先休息再移动。";
  if (state.mapLevel === "province") return "点击省份进入市级地图，同时在弹窗里可选择是否移动到该省。";
  if (state.mapLevel === "city") return "点击城市进入县镇地图，弹窗会显示移动方案。";
  if (state.mapLevel === "county") return "点击县镇展开街道生活地图：空铺、小区、楼宇、公园、学校、车站都会影响开店收益。";
  return "点击街道里的空铺查看周边影响，选择移动并开店。";
}

function mapNodes() {
  if (state.mapLevel === "province") {
    return world.provinces.map((province) => ({
      ...province,
      meta: `${cityCount(province.id)}市`,
    }));
  }
  if (state.mapLevel === "city") {
    return world.cities
      .filter((city) => city.provinceId === state.focusProvinceId)
      .map((city) => ({
        ...city,
        meta: `${countyCount(city.id)}县｜${city.demand}`,
      }));
  }
  if (state.mapLevel === "county") return world.counties
    .filter((county) => county.cityId === state.focusCityId)
    .map((county, index, list) => ({
      ...county,
      ...spreadCountyPosition(county, index, list.length),
      meta: `${county.demand}｜租${money(county.rent)}`,
      owned: state.businesses.some((business) => business.locationId === county.id),
    }));
  return getStreetMap(state.focusCountyId).places;
}

function spreadCountyPosition(county, index, total) {
  const columns = Math.ceil(Math.sqrt(total * 1.25));
  const rows = Math.ceil(total / columns);
  const col = index % columns;
  const row = Math.floor(index / columns);
  const xStep = 62 / Math.max(1, columns - 1);
  const yStep = 54 / Math.max(1, rows - 1);
  return {
    x: clamp(19 + col * xStep + jitter(Number(county.id.replace("k-", "")) + 501, 5), 12, 88),
    y: clamp(23 + row * yStep + jitter(Number(county.id.replace("k-", "")) + 607, 5), 14, 86),
  };
}

function renderMapNode(node) {
  const isCurrent = state.current.type === node.type && state.current.id === node.id;
  const selected = state.selectedTarget?.type === node.type && state.selectedTarget?.id === node.id;
  const classes = ["map-node", node.type, node.owned ? "owned" : "", isCurrent ? "current" : "", selected ? "selected" : ""].filter(Boolean).join(" ");
  return `
    <button class="${classes}" style="left:${node.x}%;top:${node.y}%;" data-map-node="${node.type}" data-id="${node.id}">
      <span class="node-label"><strong>${node.name}</strong><small>${node.meta}</small></span>
    </button>
  `;
}

function renderStreetNode(place) {
  const isCurrent = state.current.type === "place" && state.current.id === place.id;
  const selected = state.selectedTarget?.type === "place" && state.selectedTarget?.id === place.id;
  const type = placeTypes[place.placeType];
  const classes = ["street-node", place.placeType, isCurrent ? "current" : "", selected ? "selected" : ""].filter(Boolean).join(" ");
  return `
    <button class="${classes}" style="left:${place.x}%;top:${place.y}%;" data-map-node="place" data-id="${place.id}">
      <span class="place-sprite" aria-hidden="true"><span></span></span>
      <span class="place-label"><strong>${compactPlaceName(place)}</strong><small>${type.name}｜人流${place.footTraffic}</small></span>
    </button>
  `;
}

function renderPlayerMarker(nodes) {
  const point = playerMarkerPoint(nodes);
  if (!point) return "";
  const vehicleId = state.pendingAction?.travel?.vehicleId || state.vehicle;
  const moving = state.pendingAction?.category === "移动" ? " moving" : "";
  return `<span class="player-marker${moving} travel-${vehicleId}" style="left:${point.x}%;top:${point.y}%;" aria-label="当前位置"></span>`;
}

function playerMarkerPoint(nodes) {
  const movingPoint = movingTravelPoint(nodes);
  if (movingPoint) return movingPoint;
  if (state.pendingAction) return null;
  const current = pointForCurrent();
  const direct = nodes.find((node) => node.type === current.type && node.id === current.id);
  if (direct) return direct;

  if (state.mapLevel === "street" && current.type === "county" && current.id === state.focusCountyId) {
    return { x: 50, y: 50 };
  }
  if (state.mapLevel === "street" && current.type === "place") {
    return nodes.find((node) => node.id === current.id) || null;
  }
  if (state.mapLevel !== "street") {
    return { x: current.x, y: current.y };
  }
  return null;
}

function actionProgress(action = state.pendingAction) {
  if (!action) return 0;
  const total = Math.max(1, action.end - action.start);
  return clamp((state.time - action.start) / total, 0, 1);
}

function movingTravelPoint(nodes) {
  const travel = state.pendingAction?.category === "移动" ? state.pendingAction.travel : null;
  if (!travel) return null;
  const from = displayTravelPoint(travel.from, nodes);
  const to = displayTravelPoint(travel.to, nodes);
  if (!from || !to) return null;
  const progress = actionProgress();
  return {
    x: from.x + (to.x - from.x) * progress,
    y: from.y + (to.y - from.y) * progress,
  };
}

function displayTravelPoint(point, nodes) {
  if (!point) return null;
  if (state.mapLevel === "street") {
    if (point.type === "place") return nodes.find((node) => node.id === point.id) || null;
    if (point.type === "county" && point.id === state.focusCountyId) return { x: 50, y: 50 };
    const county = getCountyForPoint(point);
    if (county?.id === state.focusCountyId) return { x: 50, y: 50 };
    return null;
  }
  return displayPointForMap(point, nodes);
}

function compactPlaceName(place) {
  const type = placeTypes[place.placeType];
  const index = Number(place.id.split("-s-")[1]) + 1;
  return `${type.name}${index}`;
}

function renderWorldBackdrop() {
  return "";
}

function renderStreetBackdrop() {
  const street = getStreetMap(state.focusCountyId);
  return renderStreetMapSvg(street.visual);
}

function renderStreetMapSvg(visual) {
  const width = streetTileSpec.width;
  const height = streetTileSpec.height;
  return `
    <svg class="street-map-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern id="street-paving" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M0 0H28V28H0Z" fill="#d8bf91" />
          <path d="M0 0H28M0 14H28M0 28H28M0 0V28M14 0V28M28 0V28" stroke="#b89263" stroke-width="1.3" opacity="0.34" />
        </pattern>
        <pattern id="street-grass" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M0 0H36V36H0Z" fill="#87c866" />
          <path d="M9 8h3v3h-3zM24 18h4v4h-4zM14 29h3v3h-3z" fill="#b9e978" opacity="0.74" />
        </pattern>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#street-grass)" />
      ${renderStreetCornerScenes()}
      ${visual.parcels.map(renderStreetParcel).join("")}
      ${visual.roadNodes.map((node) => renderRoadNode(node, 112, "#d8bf91", 0.98)).join("")}
      ${visual.roads.map((road) => renderRoadPath(road, 112, "#d8bf91", 0.98)).join("")}
      ${visual.roadNodes.map((node) => renderRoadNode(node, 76, "#5f676c", 1)).join("")}
      ${visual.roads.map((road) => renderRoadPath(road, 76, "#5f676c", 1)).join("")}
      ${visual.roads.map(renderLaneLine).join("")}
      ${visual.decorations.map(renderStreetDecoration).join("")}
    </svg>
  `;
}

function renderRoadPath(road, width, color, opacity) {
  return `<path d="${road.path}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}" />`;
}

function renderRoadNode(node, width, color, opacity) {
  const radius = width / 2;
  return `<circle cx="${node.x}" cy="${node.y}" r="${radius}" fill="${color}" opacity="${opacity}" />`;
}

function renderLaneLine(road) {
  return `<path d="${road.path}" fill="none" stroke="#f2ead0" stroke-width="4" stroke-linecap="round" stroke-dasharray="22 18" opacity="0.62" />`;
}

function renderStreetParcel(parcel) {
  return `
    <path d="${parcel.path}" fill="${parcel.fill}" stroke="${parcel.stroke}" stroke-width="3" opacity="${parcel.opacity}" />
    <path d="${parcel.innerPath}" fill="none" stroke="${parcel.innerStroke}" stroke-width="2" opacity="0.45" />
  `;
}

function renderStreetDecoration(item) {
  if (item.kind === "tree") {
    return `<path d="M${item.x} ${item.y - 17}L${item.x + 13} ${item.y + 8}H${item.x - 13}Z" fill="#2f9f53" opacity="0.95" /><rect x="${item.x - 2}" y="${item.y + 5}" width="4" height="11" fill="#8b5a30" />`;
  }
  if (item.kind === "lamp") {
    return `<rect x="${item.x - 2}" y="${item.y - 16}" width="4" height="26" fill="#3f4145" /><circle cx="${item.x}" cy="${item.y - 18}" r="6" fill="#ffeaa0" opacity="0.85" />`;
  }
  return `<circle cx="${item.x}" cy="${item.y}" r="${item.r}" fill="${item.fill}" opacity="${item.opacity}" />`;
}

function renderStreetCornerScenes() {
  return `
    <path d="M0 0H335C300 54 286 112 304 176C234 166 161 186 112 242C71 210 35 206 0 218Z" fill="#4aa9cc" />
    <path d="M0 0H310C276 44 264 91 280 142C216 135 141 157 95 215C61 188 31 184 0 194Z" fill="#64c3df" opacity="0.65" />
    <path d="M0 216C55 206 91 224 119 254C168 196 236 174 304 185L304 304H0Z" fill="url(#street-paving)" opacity="0.92" />
    <path d="M1502 0H1800V272C1729 256 1652 266 1606 313C1582 246 1533 211 1472 204C1518 143 1527 72 1502 0Z" fill="#7ecf66" />
    <ellipse cx="1684" cy="102" rx="95" ry="54" fill="#55b7d2" />
    <ellipse cx="1684" cy="102" rx="75" ry="40" fill="#73d0e7" opacity="0.72" />
    <path d="M0 899C74 870 139 879 193 928C244 888 302 872 376 888L376 1200H0Z" fill="#75c85e" />
    <path d="M52 981C112 948 177 957 221 1004C258 968 303 952 360 964L360 1200H0V1040Z" fill="#4fae58" opacity="0.58" />
    <path d="M1486 902H1800V1200H1511C1542 1122 1536 1052 1492 997C1545 970 1546 931 1486 902Z" fill="#6fb765" />
    <path d="M1560 926H1784V1057H1560Z" fill="#61686d" opacity="0.7" />
    <path d="M1588 942V1044M1632 942V1044M1676 942V1044M1720 942V1044M1764 942V1044" stroke="#f2ead0" stroke-width="4" opacity="0.78" />
  `;
}

function renderRouteSvg(nodes) {
  const movingTravel = state.pendingAction?.category === "移动" ? state.pendingAction.travel : null;
  if (state.mapLevel === "street" && !movingTravel) {
    return "";
  }
  const current = movingTravel ? displayTravelPoint(movingTravel.from, nodes) : displayPointForMap(pointForCurrent(), nodes);
  const selected = movingTravel
    ? displayTravelPoint(movingTravel.to, nodes)
    : state.selectedTarget ? displayPointForMap(getPoint(state.selectedTarget.type, state.selectedTarget.id), nodes) : null;
  if (!current) return "";
  if (!selected) return "";
  const progress = movingTravel ? actionProgress() : 0;
  return `
    <svg class="map-routes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <line class="active-route" x1="${current.x}%" y1="${current.y}%" x2="${selected.x}%" y2="${selected.y}%" />
      ${movingTravel ? `<line class="travel-route-progress" x1="${current.x}%" y1="${current.y}%" x2="${current.x + (selected.x - current.x) * progress}%" y2="${current.y + (selected.y - current.y) * progress}%" />` : ""}
    </svg>
  `;
}

function renderTravelProgressOverlay() {
  const action = state.pendingAction?.category === "移动" ? state.pendingAction : null;
  if (!action?.travel) return "";
  const progress = actionProgress(action);
  const vehicle = vehicles[action.travel.vehicleId];
  const remaining = Math.max(0, action.end - state.time);
  return `
    <div class="travel-progress-card">
      <div class="travel-progress-head">
        <strong>${action.locationText}</strong>
        <span>${Math.round(progress * 100)}%</span>
      </div>
      <div class="travel-progress-bar"><span style="width:${Math.round(progress * 100)}%"></span></div>
      <div class="travel-progress-meta">
        <span>${vehicle.name}｜${action.travel.km}km</span>
        <span>还需 ${formatDuration(remaining)}</span>
      </div>
    </div>
  `;
}

function displayPointForMap(point, nodes) {
  return nodes.find((node) => node.type === point.type && node.id === point.id) || point;
}

function renderStocksTab() {
  const portfolio = portfolioValue();
  const stockEquity = stockAccountEquity();
  const status = stockMarketStatus();
  tabPanelEl.innerHTML = `
    <div class="stocks-surface">
      <div class="section-head">
        <div>
          <h2>股票交易系统</h2>
          <p class="small-copy">证券账户资金需要先从个人现金转入；账户内资金只能买股票或转出，不能用于开店、移动和生活支出。</p>
        </div>
        <div class="pill-row">
          <span class="pill">个人现金 ${money(state.cash)}</span>
          <span class="pill">证券现金 ${money(state.stockCash)}</span>
          <span class="pill">持仓市值 ${money(portfolio)}</span>
          <span class="pill">证券资产 ${money(stockEquity)}</span>
          <span class="pill">${status.label}｜${status.reason}</span>
          <span class="pill">当前风口 ${state.windSector}</span>
          <span class="pill">交易日 ${state.stockMarketDays}</span>
        </div>
      </div>
      <div class="stock-account-panel">
        <div>
          <h3>资金划转</h3>
          <p class="small-copy">转入后进入证券账户，买入只扣证券现金；转出后才会回到个人现金。</p>
        </div>
        <div class="stock-transfer">
          <input type="number" min="100" step="100" value="${defaultStockTransferAmount()}" data-stock-transfer-input aria-label="划转金额" />
          <button class="small-action green" data-stock-transfer="in">转入</button>
          <button class="small-action gold" data-stock-transfer="out">转出</button>
          <button class="small-action red" data-stock-transfer="all-out" ${state.stockCash <= 0 ? "disabled" : ""}>全部转出</button>
        </div>
      </div>
      ${renderStockPerformance()}
      <p class="small-copy">A股常见颜色：红色代表上涨/盈利，绿色代表下跌/亏损。交易日 09:30-11:30、13:00-15:00；周六周日和常见节假日休市，调休周末也休市。</p>
      <div class="stock-table">
        ${state.stocks.map(renderStockRow).join("")}
      </div>
    </div>
  `;
}

function defaultStockTransferAmount() {
  return Math.max(1000, Math.min(10000, Math.floor(state.cash / 1000) * 1000 || 1000));
}

function renderStockPerformance() {
  const latest = state.stockPerformanceHistory[state.stockPerformanceHistory.length - 1];
  const monthly = periodStockReturn("month");
  const yearly = periodStockReturn("year");
  return `
    <div class="stock-performance">
      ${renderPerformanceCard("日收益", latest ? latest.returnRate : null, latest ? latest.pnl : 0)}
      ${renderPerformanceCard("月收益", monthly.rate, monthly.pnl)}
      ${renderPerformanceCard("年收益", yearly.rate, yearly.pnl)}
    </div>
    <div class="stock-history">
      <h3>历史成绩回顾</h3>
      ${state.stockPerformanceHistory.length ? state.stockPerformanceHistory.slice(-8).reverse().map(renderStockHistoryLine).join("") : "<p class=\"small-copy\">还没有交易日成绩。收盘后会记录账户日收益。</p>"}
    </div>
  `;
}

function renderPerformanceCard(label, rate, pnl) {
  const positive = (rate || 0) >= 0;
  return `
    <article class="performance-card">
      <span>${label}</span>
      <strong class="${positive ? "trend-up" : "trend-down"}">${rate === null ? "--" : formatPercent(rate)}</strong>
      <p>${money(pnl || 0)}</p>
    </article>
  `;
}

function renderStockHistoryLine(item) {
  const positive = item.returnRate >= 0;
  return `
    <div class="stock-history-line">
      <span>${formatShortDate(item.time)}</span>
      <span class="${positive ? "trend-up" : "trend-down"}">${formatPercent(item.returnRate)}</span>
      <span>${money(item.pnl)}</span>
      <span>${money(item.equity)}</span>
    </div>
  `;
}

function formatPercent(value) {
  return `${value >= 0 ? "+" : ""}${(value * 100).toFixed(2)}%`;
}

function periodStockReturn(period) {
  const now = gameDate();
  const items = state.stockPerformanceHistory.filter((item) => {
    const date = gameDate(item.time);
    if (period === "year") return date.getFullYear() === now.getFullYear();
    return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
  });
  if (!items.length) return { rate: null, pnl: 0 };
  const rate = items.reduce((product, item) => product * (1 + item.returnRate), 1) - 1;
  const pnl = items.reduce((sum, item) => sum + item.pnl, 0);
  return { rate, pnl };
}

function renderStockRow(stock) {
  const holding = getHolding(stock.symbol);
  const shares = holding.shares;
  const trendClass = stock.change >= 0 ? "trend-up" : "trend-down";
  const trend = `${stock.change >= 0 ? "+" : ""}${(stock.change * 100).toFixed(1)}%`;
  const marketValue = shares * stock.price;
  const floating = marketValue - shares * holding.avgCost;
  const floatingClass = floating >= 0 ? "trend-up" : "trend-down";
  const expanded = state.expandedStock === stock.symbol;
  return `
    <article class="stock-card ${expanded ? "expanded" : ""}">
      <div class="stock-row" data-stock-row="${stock.symbol}">
        <div>
          <h3>${stock.name}</h3>
          <p>${stock.symbol}｜${stock.sector}｜PE ${stock.pe}</p>
        </div>
        <div>
          <strong>${moneyPrice(stock.price)}</strong>
          <p class="${trendClass}">${trend}</p>
        </div>
        <div>
          <p>买一 ${moneyPrice(stock.bid)}</p>
          <p>卖一 ${moneyPrice(stock.ask)}</p>
        </div>
        <div>
          <p>成交 ${stock.volume.toLocaleString("zh-CN")}</p>
          <p>额 ${money(stock.turnover)}</p>
        </div>
        <div>
          <p>持有 ${shares}</p>
          <p>成本 ${shares ? moneyPrice(holding.avgCost) : "-"}</p>
        </div>
        <div>
          <p>${money(marketValue)}</p>
          <p class="${floatingClass}">${shares ? money(floating) : "¥0"}</p>
        </div>
        <div class="stock-actions">
          <button class="small-action gold" data-stock-toggle="${stock.symbol}">${expanded ? "收起K线" : "展开K线"}</button>
          <button class="small-action green" data-stock-trade-open="buy" data-symbol="${stock.symbol}">买入</button>
          <button class="small-action red" data-stock-trade-open="sell" data-symbol="${stock.symbol}" ${shares < 100 ? "disabled" : ""}>卖出</button>
        </div>
      </div>
      ${expanded ? renderCandleChart(stock) : ""}
    </article>
  `;
}

function renderCandleChart(stock) {
  const candles = (stock.candles || []).slice(-28);
  if (!candles.length) return "";
  const high = Math.max(...candles.map((item) => item.high));
  const low = Math.min(...candles.map((item) => item.low));
  const maxVolume = Math.max(...candles.map((item) => item.volume), 1);
  const width = 820;
  const height = 240;
  const left = 36;
  const right = 76;
  const top = 18;
  const priceHeight = 145;
  const volumeTop = 184;
  const volumeHeight = 38;
  const span = Math.max(0.01, high - low);
  const step = (width - left - right) / candles.length;
  const bodyWidth = Math.max(6, Math.min(18, step * 0.56));
  const priceY = (value) => top + (high - value) / span * priceHeight;
  const volumeY = (volume) => volumeTop + volumeHeight - volume / maxVolume * volumeHeight;
  const grid = [0, 0.25, 0.5, 0.75, 1].map((ratio) => {
    const y = top + ratio * priceHeight;
    const value = high - ratio * span;
    return `<line class="chart-grid" x1="${left}" y1="${y}" x2="${width - right}" y2="${y}" /><text class="chart-label" x="${width - right + 8}" y="${y + 4}">${moneyPrice(value)}</text>`;
  }).join("");
  const bars = candles.map((item, index) => {
    const x = left + index * step + step / 2;
    const openY = priceY(item.open);
    const closeY = priceY(item.close);
    const highY = priceY(item.high);
    const lowY = priceY(item.low);
    const up = item.close >= item.open;
    const bodyTop = Math.min(openY, closeY);
    const bodyHeight = Math.max(3, Math.abs(closeY - openY));
    const volY = volumeY(item.volume);
    const volHeight = volumeTop + volumeHeight - volY;
    return `
      <g class="candle ${up ? "up" : "down"}">
        <line x1="${x}" y1="${highY}" x2="${x}" y2="${lowY}" />
        <rect x="${x - bodyWidth / 2}" y="${bodyTop}" width="${bodyWidth}" height="${bodyHeight}" />
        <rect class="volume-bar" x="${x - bodyWidth / 2}" y="${volY}" width="${bodyWidth}" height="${volHeight}" />
      </g>
    `;
  }).join("");

  return `
    <div class="kline-panel">
      <div class="kline-head">
        <strong>${stock.name} K线</strong>
        <span>开 ${moneyPrice(stock.open)}｜高 ${moneyPrice(stock.high)}｜低 ${moneyPrice(stock.low)}｜收 ${moneyPrice(stock.price)}</span>
      </div>
      <svg class="kline-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${stock.name}K线图">
        <rect class="chart-bg" x="0" y="0" width="${width}" height="${height}" />
        ${grid}
        <line class="volume-axis" x1="${left}" y1="${volumeTop + volumeHeight}" x2="${width - right}" y2="${volumeTop + volumeHeight}" />
        ${bars}
      </svg>
    </div>
  `;
}

function renderLedgerTab() {
  const weeklyBurn = state.secretaryId ? Math.round(currentSecretary().salary / 4) : 0;
  tabPanelEl.innerHTML = `
    <div class="section-head">
      <div>
        <h2>账目</h2>
        <p class="small-copy">这里记录行动成本、股票交易、开店投入、经营收入和秘书工资。</p>
      </div>
      <div class="pill-row">
        <span class="pill">现金 ${money(state.cash)}</span>
        <span class="pill">股票 ${money(portfolioValue())}</span>
        <span class="pill">秘书周薪 ${money(weeklyBurn)}</span>
      </div>
    </div>
    <div class="card-grid">
      <article class="data-card">
        <h3>资产概览</h3>
        <p>门店数量：${state.businesses.length}</p>
        <p>股票市值：${money(portfolioValue())}</p>
        <p>股票已实现盈亏：${money(realizedProfit())}</p>
        <p>总资产估算：${money(state.cash + portfolioValue())}</p>
      </article>
      <article class="data-card">
        <h3>经营项目</h3>
        ${state.businesses.length ? state.businesses.map(renderBusinessTiny).join("") : "<p>还没有开店。</p>"}
      </article>
    </div>
    <h3>流水</h3>
    <div class="ledger-table">
      ${state.ledger.length ? state.ledger.slice(0, 12).map(renderLedgerLine).join("") : "<p class=\"small-copy\">暂无流水。</p>"}
    </div>
  `;
}

function renderBusinessTiny(business) {
  const county = getCounty(business.locationId);
  const place = business.placeId ? getPlace(business.placeId) : null;
  const metrics = businessMonthlyMetrics(business);
  const ownerDuty = state.ownerDutyBusinessId === business.id;
  const selected = state.selectedBusinessManageId === business.id;
  return `
    <button class="business-line business-select ${ownerDuty ? "owner-duty" : ""} ${selected ? "selected" : ""}" data-manage-business="${business.id}">
      <div class="business-line-head">
        <strong>${business.name}</strong>
        <span>${place ? place.name : county.name}｜${business.level}级｜熟练度 ${business.mastery}</span>
      </div>
      <div class="business-stats">
        <span>面积 ${place ? `${place.area}㎡` : "县域"}</span>
        <span>员工 ${business.staff.length}人</span>
        <span>营业 ${business.operatingHours}小时/天</span>
        <span>收入/月 ${money(metrics.revenue)}</span>
        <span>成本/月 ${money(metrics.cost)}</span>
        <span class="${metrics.profit >= 0 ? "trend-up" : "trend-down"}">利润/月 ${money(metrics.profit)}</span>
      </div>
      ${ownerDuty ? `<p class="small-copy warn-text">创始人正在亲自顶班。补齐最低岗位前，不能跑地图、炒股、上课或另开项目。</p>` : ""}
    </button>
  `;
}

function renderLedgerLine(item) {
  const cls = item.amount >= 0 ? "trend-up" : "trend-down";
  return `
    <div class="ledger-line">
      <span>${formatTime(item.time)}</span>
      <span>${item.text}</span>
      <strong class="${cls}">${money(item.amount)}</strong>
    </div>
  `;
}

function renderSecretaryTab() {
  const secretary = currentSecretary();
  if (!secretary) {
    tabPanelEl.innerHTML = `
      <div class="section-head">
        <div>
          <h2>秘书</h2>
          <p class="small-copy">秘书能降低事务压力。不要看裸数值，试着从简历、经历和薪资要求判断他们的理解力、效率和忠诚度。</p>
        </div>
      </div>
      <div class="card-grid">
        ${secretaryCandidates.map(renderSecretaryCandidate).join("")}
      </div>
    `;
    return;
  }
  const risk = secretaryResignationRisk(secretary);

  tabPanelEl.innerHTML = `
    <div class="section-head">
      <div>
        <h2>${secretary.name}</h2>
        <p class="small-copy">${secretary.trait}</p>
      </div>
      <div class="pill-row">
        <span class="pill">月薪 ${money(secretary.salary)}</span>
        <span class="pill">${secretary.gender === "female" ? "女" : "男"}</span>
        <span class="pill ${state.secretaryArrears > 0 ? "danger-pill" : ""}">欠薪 ${money(state.secretaryArrears)}</span>
        <span class="pill">离职风险 ${risk.label}</span>
      </div>
    </div>
    <div class="card-grid">
      <article class="secretary-profile">
        ${renderSecretaryAvatar(secretary)}
        <h3>履历</h3>
        <p>${secretary.resume}</p>
        <p class="small-copy">${state.secretaryArrears > 0 ? "工资拖欠会影响工作关系，欠薪越久越容易离职。" : "工资按时发放时，工作关系会更稳定。"}</p>
      </article>
      <article class="secretary-card">
        <h3>委托事项</h3>
        <p>跑手续会让下一次开店更省时间；市场调研会提高判断风口的收益。</p>
        <div class="pill-row">
          <button class="small-action green" data-secretary-action="paperwork">委托跑手续</button>
          <button class="small-action gold" data-secretary-action="survey">市场调研</button>
          ${secretary.easter ? `<button class="small-action red" data-secretary-action="relax">私人放松服务</button>` : ""}
        </div>
      </article>
    </div>
  `;
}

function renderSecretaryCandidate(secretary) {
  return `
    <article class="secretary-profile">
      ${renderSecretaryAvatar(secretary)}
      <h3>${secretary.name}</h3>
      <p>${secretary.trait}</p>
      <p>${secretary.resume}</p>
      <div class="pill-row">
        <span class="tag">${secretary.gender === "female" ? "女" : "男"}</span>
        <span class="tag">月薪 ${money(secretary.salary)}</span>
        <span class="tag cost">入职 ${money(secretary.hireCost)}</span>
      </div>
      <button class="small-action green" data-hire-secretary="${secretary.id}">聘请</button>
    </article>
  `;
}

function renderSecretaryAvatar(secretary) {
  return `<div class="secretary-avatar secretary-avatar-${secretary.avatar || secretary.id}" aria-hidden="true"></div>`;
}

function renderSchoolTab() {
  tabPanelEl.innerHTML = `
    <div class="section-head">
      <div>
        <h2>商学院</h2>
        <p class="small-copy">课程只能极少提升技能，真正价值在于同学、老师和内参里流出的独家消息，但消息可能是真的，也可能是误判。</p>
      </div>
    </div>
    <div class="card-grid">
      ${courses.map(renderCourse).join("")}
    </div>
  `;
}

function renderCourse(course) {
  return `
    <article class="course-card">
      <h3>${course.name}</h3>
      <p>${course.skill} +${course.boost}，并获得一条独家消息。</p>
      <div class="pill-row">
        <span class="tag cost">${money(course.cost)}</span>
        <span class="tag">${formatDuration(course.minutes)}</span>
        <span class="tag">体力 -${course.stamina}</span>
        <span class="tag">精力 -${course.energy}</span>
      </div>
      <button class="small-action green" data-course="${course.id}">报名学习</button>
    </article>
  `;
}

function renderBusinessTab() {
  const summary = businessPortfolioSummary();
  tabPanelEl.innerHTML = `
    <div class="section-head">
      <div>
        <h2>商业</h2>
        <p class="small-copy">这里集中管理你的事业：街道门店、公司项目和未来的员工、融资、供应链。</p>
      </div>
      <div class="pill-row">
        <span class="pill">门店 ${state.businesses.length}</span>
        <span class="pill">公司 ${state.companies.length}</span>
        <span class="pill">贷款 ${state.loans.length}</span>
      </div>
    </div>
    <div class="business-summary">
      <span>总收入/月 <strong>${money(summary.revenue)}</strong></span>
      <span>总成本/月 <strong>${money(summary.cost)}</strong></span>
      <span>盈利状况 <strong class="${summary.profit >= 0 ? "trend-up" : "trend-down"}">${money(summary.profit)}</strong></span>
    </div>
    <div class="card-grid">
      <article class="business-card">
        <h3>我的门店</h3>
        ${state.businesses.length ? state.businesses.map(renderBusinessTiny).join("") : "<p>还没有门店。去城市街道里找空铺。</p>"}
      </article>
      <article class="business-card">
        <div class="business-card-head">
          <h3>我的公司</h3>
          <button class="small-action green" data-open-company-dialog="1">开公司</button>
        </div>
        ${state.companies.length ? state.companies.map(renderCompanyTiny).join("") : "<p>还没有公司。点击开公司选择方向。</p>"}
      </article>
      ${renderBankPanel()}
    </div>
    ${renderBusinessManagementPanel()}
  `;
}

function renderCompanyOption(company) {
  const metrics = companyOptionMetrics(company);
  return `
    <article class="company-card">
      <h3>${company.name}</h3>
      <p>${company.description}</p>
      <div class="metric-grid mini">
        <span>启动资金 <strong>${money(company.cost)}</strong></span>
        <span>预计收入/月 <strong>${money(metrics.revenue)}</strong></span>
        <span>预计成本/月 <strong>${money(metrics.cost)}</strong></span>
        <span>预计利润/月 <strong class="${metrics.profit >= 0 ? "trend-up" : "trend-down"}">${money(metrics.profit)}</strong></span>
      </div>
      <div class="pill-row">
        <span class="tag">${company.industry}</span>
        <span class="tag">${company.setupDays}天</span>
        <span class="tag">成长 ${company.skill}</span>
      </div>
      <p class="small-copy">最低岗位：${company.roles.filter((role) => role.min > 0).map((role) => `${role.name}${role.min}人`).join("、")}</p>
      <div class="company-step-list">
        ${companyOpeningSteps.map((step, index) => `<span>${index + 1}. ${step.name}</span>`).join("")}
      </div>
      <button type="button" class="small-action green" data-company="${company.id}">确认开办</button>
    </article>
  `;
}

function openCompanyDialog() {
  if (!companyDialogContentEl) return;
  companyDialogContentEl.innerHTML = `
    <div class="company-dialog-intro">
      <p>开公司会参考现实中的企业开办流程：名称申报、设立登记、营业执照、印章、税务/发票、银行账户、社保公积金。游戏里会按这些步骤推进进度条。</p>
    </div>
    <div class="card-grid company-choice-grid">
      ${companyOptions.map(renderCompanyOption).join("")}
    </div>
  `;
  openDialog(companyDialog);
}

function renderCompanyTiny(company) {
  const metrics = companyMonthlyMetrics(company);
  const selected = state.selectedCompanyManageId === company.id;
  const opening = company.status === "opening";
  const progress = companyOpeningProgress(company);
  return `
    <button class="business-line business-select company-line ${selected ? "selected" : ""}" data-manage-company="${company.id}">
      <div class="business-line-head">
        <strong>${company.name}</strong>
        <span>${opening ? "筹办中" : `运营 ${company.ageDays || 0} 天`}｜${company.industry}｜${company.level || 1}级</span>
      </div>
      ${opening ? renderCompanyProgress(company, progress) : ""}
      <div class="business-stats">
        <span>员工 ${company.staff?.length || 0}人</span>
        <span>收入/月 ${money(metrics.revenue)}</span>
        <span>成本/月 ${money(metrics.cost)}</span>
        <span class="${metrics.profit >= 0 ? "trend-up" : "trend-down"}">利润/月 ${money(metrics.profit)}</span>
      </div>
    </button>
  `;
}

function renderCompanyProgress(company, progress = companyOpeningProgress(company)) {
  return `
    <div class="company-progress">
      <div class="progress-head">
        <span>${progress.step.name}</span>
        <strong>${Math.round(progress.ratio * 100)}%</strong>
      </div>
      <div class="progress-bar"><span style="width:${Math.round(progress.ratio * 100)}%"></span></div>
      <p class="small-copy">${progress.step.note}｜剩余 ${formatDuration(progress.remaining)}</p>
    </div>
  `;
}

function renderBusinessManagementPanel() {
  const business = state.businesses.find((item) => item.id === state.selectedBusinessManageId);
  const company = state.companies.find((item) => item.id === state.selectedCompanyManageId);
  if (business) return renderStoreManagement(business);
  if (company) return renderCompanyManagement(company);
  return `
    <article class="management-panel empty">
      <h3>经营管理</h3>
      <p class="small-copy">点击上面的门店或公司，可以查看人员配置、收入成本、产品优化和运营优化空间。</p>
    </article>
  `;
}

function renderStoreManagement(business) {
  const county = getCounty(business.locationId);
  const place = business.placeId ? getPlace(business.placeId) : null;
  const metrics = businessMonthlyMetrics(business);
  const openings = staffOpenings(business);
  const optimizations = storeOptimizationsFor(business);
  const done = new Set((business.optimizations || []).map((item) => item.id));
  return `
    <article class="management-panel">
      <div class="management-head">
        <div>
          <h3>${business.name}管理</h3>
          <p class="small-copy">${place ? place.name : county.name}｜${business.industry}｜营业 ${business.operatingHours}小时/天｜熟练度 ${business.mastery}</p>
        </div>
        <div class="metric-grid mini">
          <span>收入/月 <strong>${money(metrics.revenue)}</strong></span>
          <span>成本/月 <strong>${money(metrics.cost)}</strong></span>
          <span>利润/月 <strong class="${metrics.profit >= 0 ? "trend-up" : "trend-down"}">${money(metrics.profit)}</strong></span>
        </div>
      </div>
      <div class="management-grid">
        <section>
          <h4>人员管理</h4>
          <div class="staff-list">
            ${business.staff.length ? business.staff.map((staff) => `<span>${staff.roleName}｜${money(staff.salary)}/月｜士气${staff.morale}</span>`).join("") : "<span>暂无员工，创始人亲自上马。</span>"}
          </div>
          ${openings.length ? `
            <div class="hire-grid">
              ${openings.map((item) => `
                <button class="small-action ${item.required ? "green" : "gold"}" data-hire-staff="${business.id}" data-role-id="${item.role.id}">
                  ${item.required ? "招聘" : "增聘"}${item.role.name}｜${money(item.salary)}/月｜${item.days}天
                </button>
              `).join("")}
            </div>
          ` : "<p class=\"small-copy\">当前岗位已接近理想班底，可以把精力放到产品和运营优化。</p>"}
        </section>
        <section>
          <h4>产品/运营优化</h4>
          <div class="optimization-list">
            ${optimizations.map((action) => renderOptimizationAction(action, done.has(action.id), "business", business.id)).join("")}
          </div>
        </section>
      </div>
    </article>
  `;
}

function renderCompanyManagement(company) {
  const metrics = companyMonthlyMetrics(company);
  const openings = companyStaffOpenings(company);
  const done = new Set((company.optimizations || []).map((item) => item.id));
  return `
    <article class="management-panel">
      <div class="management-head">
        <div>
          <h3>${company.name}管理</h3>
          <p class="small-copy">${company.status === "opening" ? "企业开办中" : "运营中"}｜${company.industry}｜成长 ${company.skill}/${company.secondary || company.skill}</p>
        </div>
        <div class="metric-grid mini">
          <span>收入/月 <strong>${money(metrics.revenue)}</strong></span>
          <span>成本/月 <strong>${money(metrics.cost)}</strong></span>
          <span>利润/月 <strong class="${metrics.profit >= 0 ? "trend-up" : "trend-down"}">${money(metrics.profit)}</strong></span>
        </div>
      </div>
      ${company.status === "opening" ? renderCompanyProgress(company) : ""}
      <div class="management-grid">
        <section>
          <h4>人员管理</h4>
          <div class="staff-list">
            ${company.staff?.length ? company.staff.map((staff) => `<span>${staff.roleName}｜${money(staff.salary)}/月｜效率${staff.efficiency}</span>`).join("") : "<span>暂无员工，创始人亲自推动。</span>"}
          </div>
          ${company.status === "opening" ? "<p class=\"small-copy\">公司完成营业执照、刻章、税务和银行账户后，再开始正式招聘。</p>" : openings.length ? `
            <div class="hire-grid">
              ${openings.map((item) => `
                <button class="small-action ${item.required ? "green" : "gold"}" data-hire-company-staff="${company.id}" data-role-id="${item.role.id}">
                  ${item.required ? "招聘" : "增聘"}${item.role.name}｜${money(item.salary)}/月｜${item.days}天
                </button>
              `).join("")}
            </div>
          ` : "<p class=\"small-copy\">公司岗位已接近理想配置，可以继续做流程和产品优化。</p>"}
        </section>
        <section>
          <h4>产品/组织优化</h4>
          <div class="optimization-list">
            ${(company.optimizationOptions || company.optimizationsCatalog || company.optimizations || [])
              .filter((item) => item.cost)
              .map((action) => renderOptimizationAction(action, done.has(action.id), "company", company.id)).join("") || "<p class=\"small-copy\">暂无可执行优化。</p>"}
          </div>
        </section>
      </div>
    </article>
  `;
}

function renderOptimizationAction(action, done, kind, ownerId) {
  return `
    <div class="optimization-item ${done ? "done" : ""}">
      <strong>${action.name}</strong>
      <p>${action.focus}｜${action.description}</p>
      <p>投入 ${money(action.cost)}｜${action.days}天｜月维护 ${money(action.monthlyCost || 0)}｜预计收入 +${Math.round((action.revenueBoost || 0) * 100)}%</p>
      <button class="small-action ${done ? "gold" : "green"}" ${done ? "disabled" : ""} data-${kind}-optimize="${ownerId}" data-optimization-id="${action.id}">
        ${done ? "已完成" : "执行优化"}
      </button>
    </div>
  `;
}

function optimizationRevenueMultiplier(optimizations = []) {
  return optimizations.reduce((product, item) => product * (1 + (item.revenueBoost || 0)), 1);
}

function optimizationMonthlyCost(optimizations = []) {
  return optimizations.reduce((sum, item) => sum + (item.monthlyCost || 0), 0);
}

function operatingCostRate(entity) {
  return industryCostRates[entity.industry] ?? 0.28;
}

function storeOptimizationsFor(business) {
  const specific = storeOptimizationCatalog[business.id] || storeOptimizationCatalog[business.projectId] || [];
  return [...specific, ...storeOptimizationCatalog.default];
}

function expectedBusinessMonthlyRevenue(business) {
  const county = getCounty(business.locationId);
  const place = business.placeId ? getPlace(business.placeId) : null;
  const primary = state.skills[business.skill] || 0;
  const secondary = state.skills[business.secondary] || 0;
  const locationFit = business.industry === county.demand ? 1.2 : 1;
  const skillFit = business.skill === county.bonus ? 1.1 : 1;
  const windFit = business.industry === state.windSector ? 1.16 : 1;
  const secretaryFit = currentSecretary() ? 1 + currentSecretary().efficiency / 700 : 1;
  const streetFit = place ? locationScore(business, place).total : business.locationScore || 1;
  const skillPower = 0.72 + primary * 0.006 + secondary * 0.003;
  const experiencePower = 1 + (business.mastery || 0) * 0.012 + ((business.level || 1) - 1) * 0.16;
  const coverage = staffCoverage(business, business.staff || [], business.ownerOperated);
  const hoursPower = clamp((business.operatingHours || business.selfRunHours || 8) / Math.max(1, business.idealHours || 10), 0.42, 1.08);
  const staffPower = clamp(0.68 + coverage * 0.36 + idealStaffRatio(business, business.staff || []) * 0.08, 0.48, 1.12);
  return Math.round((business.baseIncome || 0) * locationFit * skillFit * windFit * secretaryFit * streetFit * skillPower * experiencePower * hoursPower * staffPower * optimizationRevenueMultiplier(business.optimizations || []));
}

function businessMonthlyMetrics(business) {
  const county = getCounty(business.locationId);
  const place = business.placeId ? getPlace(business.placeId) : null;
  const lease = business.leaseId ? state.leases.find((item) => item.id === business.leaseId) : null;
  const revenue = expectedBusinessMonthlyRevenue(business);
  const rent = lease?.monthlyRent || place?.rent || county.rent || 0;
  const payroll = monthlyPayroll(business);
  const materials = Math.round(revenue * operatingCostRate(business));
  const extra = optimizationMonthlyCost(business.optimizations || []);
  const cost = rent + payroll + materials + extra;
  return {
    revenue,
    rent,
    payroll,
    materials,
    extra,
    cost,
    profit: revenue - cost,
  };
}

function companyOptionMetrics(company) {
  const minPayroll = company.roles
    .filter((role) => role.min > 0)
    .reduce((sum, role) => sum + role.salary * role.min, 0);
  const revenue = company.monthlyBase;
  const cost = company.monthlyFixedCost + minPayroll;
  return { revenue, cost, profit: revenue - cost };
}

function companyMonthlyMetrics(company) {
  if (company.status === "opening") {
    return { revenue: 0, cost: 0, payroll: 0, extra: 0, profit: 0 };
  }
  const primary = state.skills[company.skill] || 0;
  const secondary = state.skills[company.secondary] || 0;
  const skillPower = 0.78 + primary * 0.006 + secondary * 0.003;
  const windFit = company.industry === state.windSector ? 1.14 : 1;
  const experiencePower = 1 + ((company.level || 1) - 1) * 0.14 + Math.min((company.ageDays || 0) / 900, 0.18);
  const staffPower = clamp(0.7 + companyStaffCoverage(company) * 0.34 + companyIdealStaffRatio(company) * 0.08, 0.58, 1.12);
  const revenue = Math.round((company.monthlyBase || 0) * skillPower * windFit * experiencePower * staffPower * optimizationRevenueMultiplier(company.optimizations || []));
  const payroll = companyMonthlyPayroll(company);
  const extra = optimizationMonthlyCost(company.optimizations || []);
  const cost = (company.monthlyFixedCost || 0) + payroll + extra;
  return { revenue, cost, payroll, extra, profit: revenue - cost };
}

function businessPortfolioSummary() {
  const store = state.businesses.reduce((sum, business) => {
    const metrics = businessMonthlyMetrics(business);
    return {
      revenue: sum.revenue + metrics.revenue,
      cost: sum.cost + metrics.cost,
      profit: sum.profit + metrics.profit,
    };
  }, { revenue: 0, cost: 0, profit: 0 });
  return state.companies.reduce((sum, company) => {
    const metrics = companyMonthlyMetrics(company);
    return {
      revenue: sum.revenue + metrics.revenue,
      cost: sum.cost + metrics.cost,
      profit: sum.profit + metrics.profit,
    };
  }, store);
}

function companyOpeningProgress(company) {
  if (company.status !== "opening" || company.setupStart === undefined || company.setupEnd === undefined) {
    return { ratio: 1, step: { name: "运营中", note: "公司已经可以正式经营。" }, remaining: 0 };
  }
  const total = Math.max(1, company.setupEnd - company.setupStart);
  const ratio = clamp((state.time - company.setupStart) / total, 0, 1);
  let cursor = 0;
  const step = companyOpeningSteps.find((item) => {
    cursor += item.ratio;
    return ratio <= cursor;
  }) || companyOpeningSteps[companyOpeningSteps.length - 1];
  return {
    ratio,
    step,
    remaining: Math.max(0, company.setupEnd - state.time),
  };
}

function renderBankPanel() {
  const report = assetReport();
  const credit = creditProfile(report);
  return `
    <article class="bank-card">
      <h3>银行信贷</h3>
      <p>银行会参考现金、股票、固定资产、经营项目、声望、负债率和月供压力。</p>
      <div class="pill-row">
        <span class="tag">授信 ${money(credit.limit)}</span>
        <span class="tag">月供 ${money(credit.monthlyDebt)}</span>
        <span class="tag ${credit.debtRatio > 0.45 ? "warn" : "fit"}">负债率 ${Math.round(credit.debtRatio * 100)}%</span>
      </div>
      <div class="loan-list">
        ${loanProducts.map((product) => renderLoanProduct(product, credit, report)).join("")}
      </div>
      ${state.loans.length ? `<h4>已有贷款</h4>${state.loans.map(renderLoanLine).join("")}` : "<p class=\"small-copy\">暂无贷款。</p>"}
    </article>
  `;
}

function renderLoanProduct(product, credit, report) {
  const check = loanEligibility(product, credit, report);
  const payment = monthlyPayment(product.amount, product.apr, product.months);
  return `
    <div class="loan-product">
      <strong>${product.name}</strong>
      <p>${product.purpose}</p>
      <p>额度 ${money(product.amount)}｜年化 ${(product.apr * 100).toFixed(1)}%｜${product.months}期｜月供 ${money(payment)}</p>
      <button class="small-action green" data-bank-loan="${product.id}" ${check.ok ? "" : "disabled"}>${check.ok ? "申请贷款" : check.reason}</button>
    </div>
  `;
}

function renderLoanLine(loan) {
  return `
    <div class="loan-line">
      <span>${loan.name}</span>
      <span>剩余 ${money(loan.outstanding)}｜${loan.remainingMonths}期</span>
      <button class="small-action gold" data-loan-repay="${loan.id}" ${state.cash >= loan.outstanding ? "" : "disabled"}>提前结清</button>
    </div>
  `;
}

function renderNewsTab() {
  const heldUnread = state.newsFilter === "unread"
    ? state.news.filter((item) => !isNewsRead(item.id) || state.newsSeenIds.includes(item.id))
    : null;
  const unread = heldUnread || state.news.filter((item) => !isNewsRead(item.id));
  const read = state.news.filter((item) => isNewsRead(item.id));
  const visible = state.newsFilter === "read" ? read : unread;
  tabPanelEl.innerHTML = `
    <div class="section-head">
      <div>
        <h2>新闻</h2>
        <p class="small-copy">新闻来自微博、报纸、短视频、商学院同学和行业内参。标题不代表事实，细节需要点开后自己判断。</p>
      </div>
      <div class="pill-row">
        <button class="crumb ${state.newsFilter === "unread" ? "active" : ""}" data-news-filter="unread">未读 ${unread.length}</button>
        <button class="crumb ${state.newsFilter === "read" ? "active" : ""}" data-news-filter="read">已读 ${read.length}</button>
        <span class="pill">市场风向 ${state.windSector}</span>
      </div>
    </div>
    <div class="news-list">
      ${visible.length ? visible.map(renderNewsArticle).join("") : `<article class="article-card"><h3>${state.newsFilter === "read" ? "暂时没有已读新闻" : "未读新闻已经看完"}</h3></article>`}
    </div>
  `;
}

function renderNewsArticle(item) {
  const opened = state.selectedNewsId === item.id;
  const read = isNewsRead(item.id);
  return `
    <article class="article-card ${opened ? "open" : ""}">
      <button class="news-title-button" data-news-open="${item.id}">
        <span>${item.title}</span>
        <small>${read ? "已读" : "未读"}｜${item.source.type}｜${formatShortDate(item.publishedAt)}</small>
      </button>
      ${opened ? `
      <div class="article-detail">
        <div class="article-meta">
          <span class="tag">${item.source.type}</span>
          <span class="tag">${sourceDisplayName(item.source)}</span>
          <span class="tag">${item.sector}</span>
          <span class="tag ${item.exclusive ? "fit" : ""}">${item.exclusive ? "独家消息" : "公开新闻"}</span>
        </div>
        <p class="article-body">${item.text} 这条消息正在影响创业者对${item.sector}行业的判断。玩家需要结合门店经营、股票盘口、商学院消息和后续价格变化自行判断它到底是真风口还是噪音。</p>
      </div>
      ` : ""}
    </article>
  `;
}

function renderMapActionPopup() {
  if (state.activeTab !== "city" || state.selectedTarget?.type !== "place") return "";
  const target = getPoint(state.selectedTarget.type, state.selectedTarget.id);
  const place = target.type === "place" ? getPlace(target.id) : null;
  return `
    <div class="map-action-popup">
      ${renderTravelBox(target)}
      ${place ? `<div class="map-popup-detail">${renderPlaceDetails(place)}</div>` : ""}
    </div>
  `;
}

function renderMapInfoPanel() {
  const target = state.selectedTarget ? getPoint(state.selectedTarget.type, state.selectedTarget.id) : null;
  const county = target ? getCountyForPoint(target) : state.focusCountyId ? getCounty(state.focusCountyId) : getCountyForPoint(pointForCurrent());
  if (!county) return "";
  const city = getCity(county.cityId);
  const province = getProvince(county.provinceId);
  const businesses = state.businesses.filter((business) => business.locationId === county.id);
  return `
    <aside class="map-info-panel">
      <strong>${province.name}｜${city.name}｜${county.name}</strong>
      <span>人口 ${county.population}万｜适合 ${county.demand}｜机场${county.airport ? "有" : "无"}｜高铁${county.railHub ? "有" : "无"}｜已有事业 ${businesses.length}</span>
    </aside>
  `;
}

function renderTravelBox(target) {
  const options = travelOptionsForTarget(target);
  if (!state.travelVehicle || !options.includes(state.travelVehicle)) state.travelVehicle = preferredTravelVehicle(target, options);
  const travel = travelCost(target, state.travelVehicle);
  const vehicle = vehicles[state.travelVehicle];
  const actionLabel = state.travelVehicle === "walk" ? "步行至此处" : "前往此处";
  const vehicleLabel = state.travelVehicle === "walk" ? "步行" : `乘坐${vehicleShortName(state.travelVehicle)}`;
  return `
    <div class="travel-box">
      <div class="travel-picker">
        <button class="current-vehicle-button" data-toggle-travel-menu="1">
          ${renderVehicleIcon(state.travelVehicle, false)}
          <span>${vehicleLabel}</span>
        </button>
        ${state.travelVehicleMenuOpen ? `
          <div class="travel-options">
            ${options.map((id) => `
              <button class="travel-option ${state.travelVehicle === id ? "active" : ""}" data-travel-vehicle="${id}" aria-label="${vehicles[id].name}">
                ${renderVehicleIcon(id, false)}
                <span>${vehicleShortName(id)}</span>
              </button>
            `).join("")}
          </div>
        ` : ""}
      </div>
      <button class="small-action green" data-move-selected="1" ${state.pendingAction ? "disabled" : ""}>${actionLabel}</button>
      <p class="travel-meta">距离 ${travel.km}km｜${money(travel.cash)}｜体力-${travel.stamina}｜精力-${travel.energy}｜${formatDuration(travel.minutes)}</p>
    </div>
  `;
}

function renderPlaceDetails(place) {
  const type = placeTypes[place.placeType];
  const canLease = place.placeType === "vacancy";
  const leased = getLease(place.id);
  const business = state.businesses.find((item) => item.placeId === place.id);
  const canChooseProject = leased && !business;
  const impact = (canLease || canChooseProject) ? projects.map((project) => ({ project, score: locationScore(project, place) })).sort((a, b) => b.score.total - a.score.total).slice(0, 3) : [];
  return `
    <p>${type.name}｜${type.note}｜人流 ${place.footTraffic}｜租金 ${money(place.rent)}</p>
    ${renderVehicleStoreAtPlace(place)}
    ${canLease ? `
      <p>推荐业态：${impact.map((item) => `${item.project.industry}${Math.round(item.score.total * 100)}%`).join("、")}</p>
      <button class="small-action green" data-open-lease="${place.id}">查看租赁信息</button>
    ` : ""}
    ${canChooseProject ? `
      <p>已签约：${leased.termMonths}个月｜押金 ${money(leased.deposit)}｜月租 ${money(leased.monthlyRent)}</p>
      <button class="small-action green" data-open-project="${place.id}">选择创业项目</button>
    ` : ""}
    ${business ? `<p>当前经营：${business.name}｜员工 ${business.staff.length} 人｜营业 ${business.operatingHours} 小时/天</p>` : ""}
    ${!canLease && !canChooseProject && !business ? "<p>这里不是空铺，只能作为周边影响因子。</p>" : ""}
  `;
}

function renderLog() {
  if (!logEl) return;
  logEl.innerHTML = state.log.map((item) => `<li>${item}</li>`).join("");
}

function handleMapNode(type, id) {
  const target = getPoint(type, id);
  state.selectedTarget = { type, id, name: target.name, x: target.x, y: target.y };
  const options = travelOptionsForTarget(target);
  state.travelVehicle = preferredTravelVehicle(target, options);
  state.travelVehicleMenuOpen = false;
  if (type === "province") {
    state.focusProvinceId = id;
    state.focusCityId = null;
    state.selectedCountyId = null;
    state.mapLevel = "city";
    resetMapPan(false);
  }
  if (type === "city") {
    state.focusProvinceId = target.provinceId;
    state.focusCityId = id;
    state.selectedCountyId = null;
    state.mapLevel = "county";
    resetMapPan(false);
  }
  if (type === "county") {
    state.focusProvinceId = target.provinceId;
    state.focusCityId = target.cityId;
    state.focusCountyId = id;
    state.selectedCountyId = id;
    state.mapLevel = "street";
    resetMapPan(false);
  }
  if (type === "place") {
    const place = getPlace(id);
    state.focusCountyId = place.countyId;
    state.selectedCountyId = place.countyId;
    state.selectedPlaceId = id;
  }
  render();
}

function moveToSelected() {
  if (!state.selectedTarget || state.pendingAction) return;
  const selectedTarget = { ...state.selectedTarget };
  const target = getPoint(selectedTarget.type, selectedTarget.id);
  const from = { ...pointForCurrent() };
  const vehicleId = state.travelVehicle || fastestAvailableVehicle(target);
  const travel = travelCost(target, vehicleId);
  const vehicle = vehicles[vehicleId];
  startTimedAction({
    ...travel,
    travel: {
      vehicleId,
      from,
      to: { ...target },
      km: travel.km,
    },
  }, `前往${target.name}`, "移动", () => {
    state.current = { type: selectedTarget.type, id: selectedTarget.id, name: target.name, x: target.x, y: target.y };
    state.currentPlaceId = target.type === "place" ? target.id : null;
    state.vehicle = vehicle.kind === "personal" ? vehicleId : state.vehicle;
    addLog(`到达${target.name}，本次使用${vehicle.name}，距离 ${travel.km}km。`);
    applyTrafficIncident(travel, target, vehicleId);
  }, vehicleId === "walk" ? `步行去往${target.name}途中` : `乘坐${vehicle.name}去往${target.name}途中`);
  state.travelVehicleMenuOpen = false;
}

function openLeaseDialog(placeId) {
  const place = getPlace(placeId);
  const county = getCounty(place.countyId);
  const lease = leaseQuote(place);
  const recommended = projects
    .map((project) => ({ project, score: locationScore(project, place), ok: place.area >= project.minArea }))
    .sort((a, b) => b.score.total - a.score.total)
    .slice(0, 6);
  leaseLabelEl.textContent = `${place.name}｜${getCity(county.cityId).name}｜${county.name}`;
  leaseContentEl.innerHTML = `
    <div class="lease-grid">
      <article class="lease-card">
        <h3>铺位信息</h3>
        <p>面积：${place.area}㎡｜人流 ${place.footTraffic}｜周边热度 ${Math.round(lease.heat * 100)}%</p>
        <p>月租：${money(lease.monthlyRent)}｜押金：${money(lease.deposit)}｜首月租金：${money(lease.firstMonthRent)}</p>
        <p>中介/转让/进场费：${money(lease.entryFee)}｜签约耗时：${formatDuration(lease.minutes)}</p>
        <p>签约首付合计：${money(lease.total)}</p>
      </article>
      <article class="lease-card">
        <h3>适合业态</h3>
        ${recommended.map(({ project, score, ok }) => `
          <p>${project.name}｜${project.format}｜${Math.round(score.total * 100)}%｜${ok ? "面积匹配" : `至少${project.minArea}㎡`}</p>
        `).join("")}
      </article>
    </div>
    <article class="lease-card">
      <h3>租前提醒</h3>
      <p>餐饮类通常需要食品经营许可、健康证、排烟/消防条件；公司地址类更看重写字楼、商业楼宇和交通。</p>
      <p>租下后会产生月租成本。装修、设备、证照和招聘会在选择具体项目时继续投入。</p>
      <div class="dialog-actions">
        <button type="button" class="primary-action alt" value="lease" data-lease-place="${place.id}">签约租赁</button>
        <button class="primary-action" value="cancel">暂不租</button>
      </div>
    </article>
  `;
  openDialog(leaseDialog);
}

function leaseQuote(place) {
  const heat = clamp(place.footTraffic / 100 + (place.rent / 18000), 0.18, 1.2);
  const monthlyRent = place.rent;
  const deposit = monthlyRent * 2;
  const firstMonthRent = monthlyRent;
  const entryFee = Math.round(monthlyRent * (0.25 + heat * 0.7));
  return {
    heat,
    monthlyRent,
    deposit,
    firstMonthRent,
    entryFee,
    termMonths: 12,
    minutes: 8 * 60,
    total: deposit + firstMonthRent + entryFee,
  };
}

function leasePlace(placeId) {
  const place = getPlace(placeId);
  if (!place || place.placeType !== "vacancy" || getLease(placeId)) return;
  const quote = leaseQuote(place);
  const started = startTimedAction({ cash: quote.total, minutes: quote.minutes, stamina: 2, energy: 6 }, `签约租赁${place.name}`, "租赁", () => {
    state.leases.push({
      id: `lease-${Date.now()}-${state.leases.length}`,
      placeId,
      countyId: place.countyId,
      monthlyRent: quote.monthlyRent,
      deposit: quote.deposit,
      entryFee: quote.entryFee,
      termMonths: quote.termMonths,
      startTime: state.time,
    });
    place.placeType = "leased";
    state.selectedPlaceId = placeId;
    addLog(`签下${place.name}，月租 ${money(quote.monthlyRent)}，可以选择创业项目。`);
    openProjectDialog(placeId);
  });
  if (started) closeDialog(leaseDialog);
}

function getLease(placeId) {
  return state.leases.find((lease) => lease.placeId === placeId);
}

function openProjectDialog(locationId) {
  const place = locationId.includes("-s-") ? getPlace(locationId) : null;
  const county = place ? getCounty(place.countyId) : getCounty(locationId);
  if (place && place.placeType === "vacancy" && !getLease(place.id)) {
    openLeaseDialog(place.id);
    return;
  }
  state.selectedCountyId = county.id;
  state.selectedPlaceId = place?.id || null;
  districtLabelEl.textContent = `${place ? place.name : county.name}｜${place ? `${place.area}㎡` : "县域"}｜适合 ${county.demand}`;
  projectGridEl.innerHTML = projects.map((project) => renderProjectCard(project, county, place)).join("");
  projectDialog.showModal();
}

function renderProjectCard(project, county, place = null) {
  const canFit = !place || place.area >= project.minArea;
  const setupHire = projectSetupCost(project, county, place, "hire");
  const setupSelf = projectSetupCost(project, county, place, "self");
  const score = place ? locationScore(project, place) : { total: project.industry === county.demand ? 1.18 : 1, notes: ["县域主导行业"] };
  const fit = score.total >= 1.12 || project.industry === county.demand || project.skill === county.bonus;
  const assisted = state.setupAssist > 0 ? `<span class="tag fit">秘书协助</span>` : "";
  const roleText = project.roles
    .filter((role) => role.min > 0)
    .map((role) => {
      const salary = roleSalary(role, county, place);
      const willingness = roleWillingness(role, county, place);
      return `${role.name} 最少${role.min}人 ${money(salary)}/月 意愿${Math.round(willingness * 100)}%`;
    })
    .join("；");
  return `
    <article class="project-card ${canFit ? "" : "locked"}">
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <div class="meta">
        <span class="tag">${project.industry}</span>
        <span class="tag">${project.format}</span>
        <span class="tag">成长 ${project.skill}</span>
        <span class="tag">至少 ${project.minArea}㎡</span>
        <span class="tag cost">招聘开业 ${money(setupHire.cash)}</span>
        <span class="tag">装修 ${project.decoration.days}天</span>
        <span class="tag">收益系数 ${Math.round(score.total * 100)}%</span>
        ${fit ? `<span class="tag fit">地段加成</span>` : ""}
        ${canFit ? "" : `<span class="tag warn">面积不足</span>`}
        ${assisted}
      </div>
      <p class="small-copy">装修：${project.decoration.name} ${money(project.decoration.cost)}｜设备/首批物料 ${money(project.equipment)}</p>
      <p class="small-copy">证照：${project.licenses.join("、")}</p>
      <p class="small-copy">最低岗位：${roleText || "可由创始人独立启动"}</p>
      <p class="small-copy">自营启动 ${money(setupSelf.cash)}｜自己上马营业约 ${project.selfRunHours}小时/天；最低班底营业约 ${project.selfRunHours}小时/天，增聘到理想班底可拉到 ${project.idealHours}小时/天。</p>
      <p class="small-copy">${score.notes.join("；")}</p>
      <div class="project-actions">
        <button type="button" data-project="${project.name}" data-project-mode="hire" ${canFit ? "" : "disabled"}>招聘最低班底开业</button>
        <button type="button" data-project="${project.name}" data-project-mode="self" ${canFit ? "" : "disabled"}>我先亲自上马</button>
      </div>
      <p class="small-copy">自己上马期间不能做股票、跑地图等其它行动；补齐最低岗位后解除。</p>
    </article>
  `;
}

function startBusiness(projectName, mode = "hire") {
  const county = getCounty(state.selectedCountyId);
  const place = state.selectedPlaceId ? getPlace(state.selectedPlaceId) : null;
  const project = projects.find((item) => item.name === projectName);
  if (place && !getLease(place.id)) {
    openLeaseDialog(place.id);
    return;
  }
  const setup = projectSetupCost(project, county, place, mode);
  const started = startTimedAction(setup, `开办${project.name}`, "开店", () => {
    if (state.setupAssist > 0) state.setupAssist -= 1;
    const staff = mode === "hire" ? minimumStaff(project, county, place) : [];
    const business = {
      ...project,
      id: `b-${Date.now()}-${state.businesses.length}`,
      projectId: project.id,
      locationId: county.id,
      placeId: place?.id || null,
      locationScore: place ? locationScore(project, place).total : 1,
      leaseId: place ? getLease(place.id)?.id : null,
      staff,
      optimizations: [],
      ownerOperated: mode === "self",
      operatingHours: operatingHours(project, staff, mode === "self"),
      ageDays: 0,
      level: 1,
      mastery: 8,
    };
    state.businesses.push(business);
    if (place) place.placeType = "shop";
    if (business.ownerOperated) state.ownerDutyBusinessId = business.id;
    state.reputation += 2;
    addLog(`你在${place ? place.name : county.name}开办了${project.name}，投入 ${money(setup.cash)}。${business.ownerOperated ? "你开始亲自顶班。" : `已招聘 ${staff.length} 名员工。`}`);
    closeDialog(projectDialog);
  });
  if (started) closeDialog(projectDialog);
}

function projectSetupCost(project, county, place = null, mode = "hire") {
  const secretary = currentSecretary();
  const assistRate = state.setupAssist > 0 && secretary ? clamp(secretary.efficiency / 400, 0.08, 0.24) : 0;
  const hire = mode === "hire" ? hiringPlanCost(project, county, place) : { cash: 0, minutes: 0 };
  const openingStock = Math.round(project.cost * (mode === "self" ? 0.72 : 1));
  return {
    cash: openingStock + project.decoration.cost + project.equipment + hire.cash,
    minutes: Math.round((project.setupDays * 1440 + project.decoration.days * 1440 + hire.minutes) * (1 - assistRate)),
    stamina: Math.max(2, Math.round(project.stamina * (1 - assistRate / 2))),
    energy: Math.max(2, Math.round(project.energy * (1 - assistRate / 2))),
  };
}

function requiredRoles(project) {
  return project.roles.filter((role) => role.min > 0);
}

function roleSalary(role, county, place = null) {
  const cityPremium = 0.92 + (county.development || 50) / 420 + (county.population || 20) / 900;
  const locationPremium = place ? clamp(place.footTraffic / 620 + place.rent / 90000, 0.04, 0.24) : 0.08;
  const scarcityPremium = (role.scarcity || 0.2) * 0.12;
  return Math.round(role.salary * (cityPremium + locationPremium + scarcityPremium) / 100) * 100;
}

function roleWillingness(role, county, place = null) {
  const salary = roleSalary(role, county, place);
  const payAttraction = clamp(salary / Math.max(1, role.salary), 0.86, 1.35) - 1;
  const localSupply = clamp((county.population + county.development) / 190, 0.28, 0.9);
  const scarcityDrag = (role.scarcity || 0.2) * 0.42;
  const hardLocation = place ? Math.max(0, 0.58 - place.footTraffic / 120) * 0.16 : 0;
  const reputationBoost = clamp(state.reputation / 260, 0, 0.18);
  return clamp(0.36 + localSupply * 0.36 + payAttraction * 0.55 + reputationBoost - scarcityDrag - hardLocation, 0.18, 0.92);
}

function hireDaysForRole(role, county, place = null) {
  const willingness = roleWillingness(role, county, place);
  const scarcity = role.scarcity || 0.2;
  return Math.max(1, Math.round(role.hireDays * (1.55 - willingness) * (1 + scarcity * 0.35)));
}

function hiringPlanCost(project, county, place = null) {
  let cash = 0;
  let minutes = 0;
  requiredRoles(project).forEach((role) => {
    const salary = roleSalary(role, county, place);
    const willingness = roleWillingness(role, county, place);
    const perHead = Math.round(salary * (0.42 + (1 - willingness) * 0.3 + (role.scarcity || 0.2) * 0.18));
    cash += perHead * role.min;
    minutes = Math.max(minutes, hireDaysForRole(role, county, place) * 1440);
  });
  return { cash, minutes };
}

function createStaff(role, county, place = null) {
  return {
    id: `staff-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
    name: randomStaffName(),
    roleId: role.id,
    roleName: role.name,
    salary: roleSalary(role, county, place),
    hiredAt: state.time,
    morale: Math.round(58 + roleWillingness(role, county, place) * 32),
    efficiency: Math.round(48 + (1 - (role.scarcity || 0.2)) * 20 + Math.random() * 18),
  };
}

function minimumStaff(project, county, place = null) {
  const staff = [];
  requiredRoles(project).forEach((role) => {
    for (let index = 0; index < role.min; index += 1) {
      staff.push(createStaff(role, county, place));
    }
  });
  return staff;
}

function staffCount(business, roleId) {
  return business.staff.filter((staff) => staff.roleId === roleId).length;
}

function hasMinimumStaff(business) {
  return requiredRoles(business).every((role) => staffCount(business, role.id) >= role.min);
}

function canOwnerLeaveBusiness(business) {
  const required = requiredRoles(business);
  if (required.length) return hasMinimumStaff(business);
  return business.staff.length > 0;
}

function staffCoverage(project, staff, ownerOperated = false) {
  const required = requiredRoles(project);
  if (!required.length) return 1;
  const roleScore = required.reduce((sum, role) => {
    const count = staff.filter((item) => item.roleId === role.id).length;
    return sum + clamp(count / role.min, 0, 1);
  }, 0) / required.length;
  return ownerOperated ? clamp(Math.max(roleScore, 0.72), 0, 1) : clamp(roleScore, 0, 1);
}

function idealStaffRatio(project, staff) {
  const idealTotal = project.roles.reduce((sum, role) => sum + Math.max(role.ideal || role.min || 0, role.min || 0), 0);
  if (!idealTotal) return 1;
  const filled = project.roles.reduce((sum, role) => {
    const ideal = Math.max(role.ideal || role.min || 0, role.min || 0);
    return sum + Math.min(staff.filter((item) => item.roleId === role.id).length, ideal);
  }, 0);
  return clamp(filled / idealTotal, 0, 1);
}

function operatingHours(project, staff, ownerOperated = false) {
  const minTotal = requiredRoles(project).reduce((sum, role) => sum + role.min, 0);
  if (ownerOperated && !hasMinimumStaff({ ...project, staff })) return project.selfRunHours;
  if (minTotal > 0 && staff.length <= minTotal) return project.selfRunHours;
  const ideal = idealStaffRatio(project, staff);
  return Math.round(clamp(project.selfRunHours + (project.idealHours - project.selfRunHours) * ideal, 4, Math.max(project.selfRunHours, project.idealHours)));
}

function monthlyPayroll(business) {
  return business.staff.reduce((sum, staff) => sum + staff.salary, 0);
}

function companyMonthlyPayroll(company) {
  return (company.staff || []).reduce((sum, staff) => sum + staff.salary, 0);
}

function staffOpenings(business) {
  const county = getCounty(business.locationId);
  const place = business.placeId ? getPlace(business.placeId) : null;
  return business.roles
    .map((role) => {
      const count = staffCount(business, role.id);
      const target = Math.max(role.ideal || role.min || 0, role.min || 0);
      if (count >= target) return null;
      return {
        role,
        count,
        target,
        required: count < role.min,
        salary: roleSalary(role, county, place),
        willingness: roleWillingness(role, county, place),
        days: hireDaysForRole(role, county, place),
      };
    })
    .filter(Boolean)
    .sort((a, b) => Number(b.required) - Number(a.required));
}

function hireStaff(businessId, roleId) {
  const business = state.businesses.find((item) => item.id === businessId);
  if (!business) return;
  const role = business.roles.find((item) => item.id === roleId);
  if (!role) return;
  const county = getCounty(business.locationId);
  const place = business.placeId ? getPlace(business.placeId) : null;
  const target = Math.max(role.ideal || role.min || 0, role.min || 0);
  if (staffCount(business, role.id) >= target) {
    addLog(`${business.name}的${role.name}已经满编。`);
    render();
    return;
  }

  const salary = roleSalary(role, county, place);
  const willingness = roleWillingness(role, county, place);
  const days = hireDaysForRole(role, county, place);
  const recruitCost = Math.round(salary * (0.28 + (1 - willingness) * 0.42 + (role.scarcity || 0.2) * 0.16));
  const energy = role.scarcity > 0.5 ? 10 : 7;
  const started = startTimedAction({ cash: recruitCost, minutes: days * 1440, stamina: 2, energy }, `招聘${business.name}${role.name}`, "招聘", () => {
    business.staff.push(createStaff(role, county, place));
    business.ownerOperated = !canOwnerLeaveBusiness(business);
    business.operatingHours = operatingHours(business, business.staff, business.ownerOperated);
    if (state.ownerDutyBusinessId === business.id && canOwnerLeaveBusiness(business)) {
      state.ownerDutyBusinessId = null;
      business.ownerOperated = false;
      business.operatingHours = operatingHours(business, business.staff, false);
      addLog(`${business.name}最低班底到位，你从亲自顶班里解放出来。`);
    }
    addLog(`${business.name}招聘到${role.name}，约定月薪 ${money(salary)}。`);
  });
  if (started) render();
}

function companyRoleSalary(role, company) {
  const reputationPremium = clamp(state.reputation / 800, 0, 0.16);
  const scarcityPremium = (role.scarcity || 0.2) * 0.18;
  const companyPremium = company.level ? (company.level - 1) * 0.04 : 0;
  return Math.round(role.salary * (1 + reputationPremium + scarcityPremium + companyPremium) / 100) * 100;
}

function companyRoleWillingness(role, company) {
  const payAttraction = clamp(companyRoleSalary(role, company) / Math.max(1, role.salary), 0.9, 1.45) - 1;
  const reputationBoost = clamp(state.reputation / 280, 0, 0.22);
  const ageBoost = clamp((company.ageDays || 0) / 720, 0, 0.12);
  const scarcityDrag = (role.scarcity || 0.2) * 0.34;
  return clamp(0.36 + payAttraction * 0.45 + reputationBoost + ageBoost - scarcityDrag, 0.16, 0.9);
}

function companyHireDaysForRole(role, company) {
  const willingness = companyRoleWillingness(role, company);
  return Math.max(1, Math.round(role.hireDays * (1.52 - willingness) * (1 + (role.scarcity || 0.2) * 0.28)));
}

function createCompanyStaff(role, company) {
  return {
    id: `co-staff-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
    name: randomStaffName(),
    roleId: role.id,
    roleName: role.name,
    salary: companyRoleSalary(role, company),
    hiredAt: state.time,
    morale: Math.round(55 + companyRoleWillingness(role, company) * 34),
    efficiency: Math.round(50 + (1 - (role.scarcity || 0.2)) * 18 + Math.random() * 16),
  };
}

function companyStaffCount(company, roleId) {
  return (company.staff || []).filter((staff) => staff.roleId === roleId).length;
}

function requiredCompanyRoles(company) {
  return (company.roles || []).filter((role) => role.min > 0);
}

function companyStaffCoverage(company) {
  const required = requiredCompanyRoles(company);
  if (!required.length) return 1;
  return required.reduce((sum, role) => sum + clamp(companyStaffCount(company, role.id) / role.min, 0, 1), 0) / required.length;
}

function companyIdealStaffRatio(company) {
  const idealTotal = (company.roles || []).reduce((sum, role) => sum + Math.max(role.ideal || role.min || 0, role.min || 0), 0);
  if (!idealTotal) return 1;
  const filled = (company.roles || []).reduce((sum, role) => {
    const ideal = Math.max(role.ideal || role.min || 0, role.min || 0);
    return sum + Math.min(companyStaffCount(company, role.id), ideal);
  }, 0);
  return clamp(filled / idealTotal, 0, 1);
}

function companyStaffOpenings(company) {
  if (company.status === "opening") return [];
  return (company.roles || [])
    .map((role) => {
      const count = companyStaffCount(company, role.id);
      const target = Math.max(role.ideal || role.min || 0, role.min || 0);
      if (count >= target) return null;
      return {
        role,
        count,
        target,
        required: count < role.min,
        salary: companyRoleSalary(role, company),
        willingness: companyRoleWillingness(role, company),
        days: companyHireDaysForRole(role, company),
      };
    })
    .filter(Boolean)
    .sort((a, b) => Number(b.required) - Number(a.required));
}

function hireCompanyStaff(companyId, roleId) {
  const company = state.companies.find((item) => item.id === companyId);
  if (!company || company.status === "opening") return;
  const role = (company.roles || []).find((item) => item.id === roleId);
  if (!role) return;
  const target = Math.max(role.ideal || role.min || 0, role.min || 0);
  if (companyStaffCount(company, role.id) >= target) {
    addLog(`${company.name}的${role.name}已经满编。`);
    render();
    return;
  }
  const salary = companyRoleSalary(role, company);
  const willingness = companyRoleWillingness(role, company);
  const days = companyHireDaysForRole(role, company);
  const recruitCost = Math.round(salary * (0.34 + (1 - willingness) * 0.36 + (role.scarcity || 0.2) * 0.16));
  const started = startTimedAction({ cash: recruitCost, minutes: days * 1440, stamina: 2, energy: role.scarcity > 0.5 ? 10 : 7 }, `招聘${company.name}${role.name}`, "招聘", () => {
    company.staff = company.staff || [];
    company.staff.push(createCompanyStaff(role, company));
    addLog(`${company.name}招聘到${role.name}，约定月薪 ${money(salary)}。`);
  });
  if (started) render();
}

function applyBusinessOptimization(businessId, actionId) {
  const business = state.businesses.find((item) => item.id === businessId);
  if (!business) return;
  const action = storeOptimizationsFor(business).find((item) => item.id === actionId);
  if (!action) return;
  business.optimizations = business.optimizations || [];
  if (business.optimizations.some((item) => item.id === action.id)) return;
  const started = startTimedAction({ cash: action.cost, minutes: action.days * 1440, stamina: 4, energy: 10 }, `${business.name}${action.name}`, "经营优化", () => {
    business.optimizations.push(action);
    business.mastery = clamp((business.mastery || 0) + 6, 0, 100);
    state.skills[action.skill] = clamp((state.skills[action.skill] || 0) + 1, 0, 100);
    addLog(`${business.name}完成${action.name}，预计月收入提升，${action.skill} +1。`);
  });
  if (started) render();
}

function applyCompanyOptimization(companyId, actionId) {
  const company = state.companies.find((item) => item.id === companyId);
  if (!company || company.status === "opening") return;
  const action = (company.optimizationOptions || []).find((item) => item.id === actionId);
  if (!action) return;
  company.optimizations = company.optimizations || [];
  if (company.optimizations.some((item) => item.id === action.id)) return;
  const started = startTimedAction({ cash: action.cost, minutes: action.days * 1440, stamina: 3, energy: 12 }, `${company.name}${action.name}`, "公司优化", () => {
    company.optimizations.push(action);
    company.level = clamp((company.level || 1) + (company.optimizations.length % 2 === 0 ? 1 : 0), 1, 5);
    state.skills[action.skill] = clamp((state.skills[action.skill] || 0) + 1, 0, 100);
    addLog(`${company.name}完成${action.name}，组织能力提升，${action.skill} +1。`);
  });
  if (started) render();
}

function locationScore(project, place) {
  const street = getStreetMap(place.countyId);
  const effects = industryEffects[project.industry] || {};
  let score = 0.72 + place.footTraffic / 145;
  const notes = [`基础人流${place.footTraffic}`];

  street.places.forEach((nearby) => {
    if (nearby.id === place.id) return;
    const d = Math.max(1, Math.hypot(place.x - nearby.x, place.y - nearby.y));
    const weight = clamp(1 - d / 42, 0, 1);
    const effect = (effects[nearby.placeType] || 0) * weight;
    if (effect) score += effect;
  });

  const nearbyBusinesses = state.businesses
    .map((business) => ({ business, p: business.placeId ? getPlace(business.placeId) : null }))
    .filter((item) => item.p && item.p.countyId === place.countyId);

  nearbyBusinesses.forEach(({ business, p }) => {
    const d = Math.max(1, Math.hypot(place.x - p.x, place.y - p.y));
    const weight = clamp(1 - d / 35, 0, 1);
    if (business.industry === project.industry) {
      score += (effects.shopSamePenalty || -0.12) * weight;
    } else {
      score += (effects.shopCluster || 0.02) * weight;
    }
  });

  const vacancyPenalty = street.vacancyRate > 0.28 ? -(street.vacancyRate - 0.28) * 0.8 : 0;
  if (vacancyPenalty < 0) notes.push("空位偏多，人流不足");
  score += vacancyPenalty;

  if (nearbyBusinesses.some((item) => item.business.industry === project.industry)) notes.push("周边有同类竞争");
  if (street.vacancyRate < 0.12) notes.push("空位稀缺，说明地段热");
  if (place.footTraffic > 70) notes.push("高人流高租金");

  return {
    total: clamp(score, 0.55, 1.85),
    notes,
  };
}

function advanceWeek() {
  const cost = { cash: 700, minutes: 7 * 1440, stamina: 18, energy: 20 };
  startTimedAction(cost, "经营巡店 7 天", "经营", () => {

  let profitTotal = 0;
  state.businesses.forEach((business) => {
    const county = getCounty(business.locationId);
    const place = business.placeId ? getPlace(business.placeId) : null;
    const lease = business.leaseId ? state.leases.find((item) => item.id === business.leaseId) : null;
    const primary = state.skills[business.skill];
    const secondary = state.skills[business.secondary];
    const locationFit = business.industry === county.demand ? 1.2 : 1;
    const skillFit = business.skill === county.bonus ? 1.1 : 1;
    const windFit = business.industry === state.windSector ? 1.26 : 1;
    const secretaryFit = currentSecretary() ? 1 + currentSecretary().efficiency / 600 : 1;
    const streetFit = place ? locationScore(business, place).total : business.locationScore || 1;
    const skillPower = 0.72 + primary * 0.006 + secondary * 0.003;
    const experiencePower = 1 + business.mastery * 0.012 + (business.level - 1) * 0.16;
    const coverage = staffCoverage(business, business.staff, business.ownerOperated);
    business.operatingHours = operatingHours(business, business.staff, business.ownerOperated);
    const hoursPower = clamp(business.operatingHours / Math.max(1, business.idealHours), 0.42, 1.08);
    const staffPower = clamp(0.68 + coverage * 0.36 + idealStaffRatio(business, business.staff) * 0.08, 0.48, 1.12);
    const optimizationPower = optimizationRevenueMultiplier(business.optimizations || []);
    const swing = 0.86 + Math.random() * 0.28;
    const revenue = (business.baseIncome / 30) * 7 * locationFit * skillFit * windFit * secretaryFit * streetFit * skillPower * experiencePower * hoursPower * staffPower * optimizationPower * swing;
    const weeklyRent = ((lease?.monthlyRent || place?.rent || county.rent) / 30) * 7;
    const weeklyPayroll = monthlyPayroll(business) / 30 * 7;
    const weeklyOperatingCost = revenue * operatingCostRate(business);
    const weeklyOptimizationCost = optimizationMonthlyCost(business.optimizations || []) / 30 * 7;
    let profit = revenue - weeklyRent - weeklyPayroll - weeklyOperatingCost - weeklyOptimizationCost;

    if (Math.random() < business.risk) {
      const loss = revenue * (0.16 + Math.random() * 0.22);
      profit -= loss;
      addLog(`${business.name}遇到突发问题，额外损失 ${money(loss)}。`);
    }

    business.ageDays += 7;
    business.mastery = clamp(business.mastery + 5 + Math.floor(primary / 24), 0, 100);
    state.skills[business.skill] = clamp(state.skills[business.skill] + 2, 0, 100);
    state.skills[business.secondary] = clamp(state.skills[business.secondary] + 1, 0, 100);
    if (business.ownerOperated) {
      state.stamina = clamp(state.stamina - 8, -100, 100);
      state.energy = clamp(state.energy - 10, -100, 100);
      addSleepDebt(state.stamina + 8, state.energy + 10, { stamina: 8, energy: 10, minutes: 7 * 1440 });
    }

    if (business.mastery >= business.level * 28 && business.level < 5) {
      business.level += 1;
      state.reputation += 3;
      addLog(`${business.name}升到 ${business.level} 级，团队更熟练了。`);
    }

    profitTotal += profit;
    addLedger(`${business.name} 7天经营收入`, profit);
    addLog(`${business.name} 7天净收入 ${money(profit)}，含租金 ${money(weeklyRent)}、工资 ${money(weeklyPayroll)}、经营成本 ${money(weeklyOperatingCost + weeklyOptimizationCost)}，${business.skill} +2。`);
  });

  state.companies.forEach((company) => {
    if (company.status === "opening") return;
    const metrics = companyMonthlyMetrics(company);
    const revenue = metrics.revenue / 30 * 7 * (0.9 + Math.random() * 0.2);
    const weeklyCost = metrics.cost / 30 * 7;
    const profit = revenue - weeklyCost;
    company.ageDays += 7;
    profitTotal += profit;
    addLedger(`${company.name} 7天公司收入`, profit);
    addLog(`${company.name} 7天净收入 ${money(profit)}，含公司成本 ${money(weeklyCost)}。`);
  });

  state.cash += profitTotal;
  state.reputation = clamp(state.reputation + (profitTotal > 0 ? 1 : -1), 0, 999);
  state.news = makeNews();
  state.windSector = state.news[0].sector;

  if (state.businesses.length === 0) addLog("你空跑了一周，还是得先找地方开第一个项目。");
  });
}

function sleep() {
  const minutes = requiredSleepMinutes();
  const cost = { cash: sleepCost(minutes), minutes, stamina: 0, energy: 0, rest: true };
  if (state.pendingAction) {
    addLog(`正在${state.pendingAction.label}，暂时不能睡觉。`);
    render();
    return;
  }
  if (state.cash < cost.cash) {
    addLog("连睡觉和基本补给的开销都不够了。");
    render();
    return;
  }
  state.cash -= cost.cash;
  addLedger("睡觉与补给", -cost.cash);
  state.pendingAction = {
    label: "睡觉",
    category: "睡觉",
    start: state.time,
    end: state.time + cost.minutes,
    locationText: "正在睡觉",
  };
  pendingCompletion = () => {
    state.stamina = 100;
    state.energy = 100;
    state.sleepDebtMinutes = 0;
    state.sleepPromptDismissedUntil = 0;
    addLog(`睡了 ${formatDuration(cost.minutes)}，体力和精力恢复，透支清零。`);
  };
  closeDialog(sleepDialog);
  addLog(`开始睡觉，预计 ${formatDuration(cost.minutes)} 后恢复。`);
  render();
}

function openStockTradeDialog(symbol, action) {
  const stock = state.stocks.find((item) => item.symbol === symbol);
  if (!stock) return;
  state.selectedStockTrade = { symbol, action };
  const maxShares = maxTradableShares(stock, action);
  state.stockTradeShares = normalizeTradeShares(Math.min(Math.max(100, state.stockTradeShares || 100), maxShares || 100), maxShares);
  pauseClockForStockTrade();
  renderStockTradeDialog();
  openDialog(stockTradeDialog);
}

function pauseClockForStockTrade() {
  if (state.stockTradePausedClockSpeed === null) {
    state.stockTradePausedClockSpeed = state.clockSpeed;
  }
  state.clockSpeed = 0;
  syncClockControls();
  syncMovementAudio();
}

function restoreClockAfterStockTrade() {
  if (state.stockTradePausedClockSpeed === null) return;
  const previousSpeed = state.stockTradePausedClockSpeed;
  state.stockTradePausedClockSpeed = null;
  state.clockSpeed = state.gameOver ? 0 : previousSpeed;
  syncClockControls();
  syncMovementAudio();
}

function renderStockTradeDialog() {
  if (!state.selectedStockTrade || !stockTradeContentEl) return;
  const { symbol, action } = state.selectedStockTrade;
  const stock = state.stocks.find((item) => item.symbol === symbol);
  if (!stock) return;
  const holding = getHolding(symbol);
  const status = stockMarketStatus();
  const maxShares = maxTradableShares(stock, action);
  const shares = normalizeTradeShares(state.stockTradeShares, maxShares);
  state.stockTradeShares = shares;
  const quote = action === "buy" ? stock.ask : stock.bid;
  const gross = quote * shares;
  const fee = stockFees(gross, action);
  const total = action === "buy" ? gross + fee.total : gross - fee.total;
  const disabledReason = stockTradeDisabledReason(action, shares, maxShares, total, status);
  stockTradeLabelEl.textContent = `${stock.name} ${action === "buy" ? "买入" : "卖出"}｜${status.label}`;
  stockTradeContentEl.innerHTML = `
    <div class="trade-dialog-grid">
      <article class="trade-summary">
        <h3>${stock.name}</h3>
        <p>${stock.symbol}｜${stock.sector}｜当前 ${moneyPrice(stock.price)}</p>
        <p>买一 ${moneyPrice(stock.bid)}｜卖一 ${moneyPrice(stock.ask)}</p>
        <p>持仓 ${holding.shares} 股｜成本 ${holding.shares ? moneyPrice(holding.avgCost) : "-"}</p>
        <p>证券现金 ${money(state.stockCash)}｜${status.reason}</p>
      </article>
      <article class="trade-ticket">
        <h3>${action === "buy" ? "买入数量" : "卖出数量"}</h3>
        <div class="trade-number-row">
          <input type="number" min="0" max="${maxShares}" step="100" value="${shares}" data-stock-trade-number aria-label="交易股数" />
          <button type="button" class="small-action gold" data-stock-trade-preset="half">半仓</button>
          <button type="button" class="small-action green" data-stock-trade-preset="full">满仓</button>
        </div>
        <input class="trade-slider" type="range" min="0" max="${maxShares}" step="100" value="${shares}" data-stock-trade-range aria-label="拖动选择交易股数" />
        <div class="trade-estimate">
          <p>数量 ${shares} 股｜${Math.floor(shares / 100)} 手</p>
          <p>成交价 ${moneyPrice(quote)}｜成交额 ${money(gross)}</p>
          <p>佣金规费 ${money(fee.total)}${action === "sell" ? `｜预计到账 ${money(total)}` : `｜预计扣款 ${money(total)}`}</p>
        </div>
        <div class="dialog-actions">
          <button type="button" class="primary-action ${action === "buy" ? "alt" : ""}" data-stock-trade-submit="1" ${disabledReason ? "disabled" : ""}>${disabledReason || (action === "buy" ? "确认买入" : "确认卖出")}</button>
          <button class="primary-action" value="cancel">取消</button>
        </div>
      </article>
    </div>
  `;
}

function stockTradeDisabledReason(action, shares, maxShares, total, status) {
  if (!status.open) return status.label;
  if (state.pendingAction) return "行动中";
  if (isBlockedByOwnerDuty("股票", true)) return "自营中";
  if (maxShares < 100) return action === "buy" ? "证券现金不足" : "持仓不足";
  if (shares < 100) return "选择数量";
  if (action === "buy" && state.stockCash < total) return "证券现金不足";
  return "";
}

function normalizeTradeShares(value, maxShares) {
  const max = Math.max(0, Math.floor((maxShares || 0) / 100) * 100);
  const shares = Math.floor(Number(value || 0) / 100) * 100;
  return clamp(shares, 0, max);
}

function maxTradableShares(stock, action) {
  if (action === "sell") return Math.floor(getHolding(stock.symbol).shares / 100) * 100;
  let lots = Math.floor(state.stockCash / Math.max(1, stock.ask * 100));
  while (lots > 0 && stockOrderTotal(stock, "buy", lots * 100) > state.stockCash) lots -= 1;
  return Math.max(0, lots * 100);
}

function stockOrderTotal(stock, action, shares) {
  const quote = action === "buy" ? stock.ask : stock.bid;
  const gross = quote * shares;
  const fee = stockFees(gross, action);
  return action === "buy" ? gross + fee.total : gross - fee.total;
}

function applyStockTradePreset(preset) {
  if (!state.selectedStockTrade) return;
  const stock = state.stocks.find((item) => item.symbol === state.selectedStockTrade.symbol);
  if (!stock) return;
  const maxShares = maxTradableShares(stock, state.selectedStockTrade.action);
  state.stockTradeShares = preset === "full"
    ? maxShares
    : maxShares <= 100 ? maxShares : Math.floor(maxShares / 200) * 100;
  renderStockTradeDialog();
}

function submitStockTrade() {
  if (!state.selectedStockTrade) return;
  const { symbol, action } = state.selectedStockTrade;
  const stock = state.stocks.find((item) => item.symbol === symbol);
  if (!stock) return;
  const maxShares = maxTradableShares(stock, action);
  const shares = normalizeTradeShares(state.stockTradeShares, maxShares);
  const status = stockMarketStatus();
  const total = stockOrderTotal(stock, action, shares);
  const reason = stockTradeDisabledReason(action, shares, maxShares, total, status);
  if (reason) {
    addLog(`股票交易未完成：${reason}。`);
    renderStockTradeDialog();
    render();
    return;
  }
  if (state.pendingAction) return;
  if (isBlockedByOwnerDuty("股票")) return;

  const holding = getHolding(symbol);
  const quote = action === "buy" ? stock.ask : stock.bid;
  const gross = quote * shares;
  const fee = stockFees(gross, action);
  if (action === "buy") {
    const cost = gross + fee.total;
    state.stockCash -= cost;
    const previousCost = holding.shares * holding.avgCost;
    holding.shares += shares;
    holding.avgCost = (previousCost + cost) / holding.shares;
    addLedger(`证券账户买入${stock.name}`, -cost, { minutes: 5, energy: 1 });
    addLog(`买入 ${stock.name} ${shares} 股，成交 ${moneyPrice(quote)}，证券账户扣款 ${money(cost)}。`);
  } else {
    const net = gross - fee.total;
    holding.shares -= shares;
    state.stockCash += net;
    holding.realized += net - holding.avgCost * shares;
    if (holding.shares === 0) holding.avgCost = 0;
    addLedger(`证券账户卖出${stock.name}`, net, { minutes: 5, energy: 1 });
    addLog(`卖出 ${stock.name} ${shares} 股，成交 ${moneyPrice(quote)}，证券账户到账 ${money(net)}。`);
  }
  state.time += 5;
  state.energy = clamp(state.energy - 1, -10080, 100);
  processTimeSystems();
  closeDialog(stockTradeDialog);
  state.selectedStockTrade = null;
  render();
}

function hireSecretary(id) {
  const secretary = secretaryCandidates.find((item) => item.id === id);
  if (state.secretaryId) {
    addLog("当前已经聘请了秘书。");
    render();
    return;
  }
  startTimedAction({ cash: secretary.hireCost, minutes: 180, stamina: 3, energy: 6 }, `聘请${secretary.name}`, "秘书", () => {
    state.secretaryId = id;
    state.secretaryLoyalty = secretary.loyalty;
    state.secretaryArrears = 0;
    state.secretaryMissedPayrolls = 0;
    addLog(`你聘请了${secretary.name}，秘书系统开启。`);
  });
}

function secretaryAction(action) {
  const secretary = currentSecretary();
  if (!secretary) return;

  if (action === "paperwork") {
    if (!spend({ cash: 1200, minutes: Math.round(210 * (1 - secretary.efficiency / 300)), stamina: 1, energy: 4 }, "秘书代办手续", "秘书")) return;
    state.setupAssist += 1;
    state.reputation += 1;
    addLog(`${secretary.name}处理了一批手续，下一次开店会更省时间。`);
  }

  if (action === "survey") {
    if (!spend({ cash: 2800, minutes: Math.round(300 * (1 - secretary.understanding / 360)), stamina: 1, energy: 6 }, "秘书市场调研", "秘书")) return;
    const bonusSkill = sectorSkill[state.windSector];
    state.skills[bonusSkill] = clamp(state.skills[bonusSkill] + 2, 0, 100);
    addLog(`${secretary.name}完成市场调研，${state.windSector}风口判断更清楚，${bonusSkill} +2。`);
  }

  if (action === "relax") {
    if (!secretary.easter) return;
    if (!spend({ cash: 28000, minutes: 240, stamina: 8, energy: 6 }, "私人放松服务", "秘书彩蛋")) return;
    state.energy = clamp(state.energy + 55, 0, 100);
    addLog("隐藏彩蛋服务触发：高额花费换来了明显的精力恢复。");
  }

  render();
}

function repayWageDebt() {
  const totalDebt = (state.wageDebt || 0) + state.secretaryArrears;
  if (totalDebt <= 0) {
    showToast("当前没有拖欠工资债务。", "success");
    render();
    return;
  }
  const paid = Math.min(Math.max(0, state.cash), totalDebt);
  if (paid <= 0) {
    showToast("现金不足，暂时无法补发工资。", "warn");
    render();
    return;
  }

  state.cash -= paid;
  let remainingPay = paid;
  const legacyDebtPaid = Math.min(state.wageDebt || 0, remainingPay);
  state.wageDebt = Math.max(0, (state.wageDebt || 0) - legacyDebtPaid);
  remainingPay -= legacyDebtPaid;
  const activeArrearsPaid = Math.min(state.secretaryArrears, remainingPay);
  state.secretaryArrears = Math.max(0, state.secretaryArrears - activeArrearsPaid);

  const secretary = currentSecretary();
  if (secretary && activeArrearsPaid > 0 && state.secretaryArrears <= 0) {
    state.secretaryMissedPayrolls = 0;
    state.secretaryLoyalty = clamp(secretaryLoyaltyValue(secretary) + 6, 0, 100);
  }

  addLedger("补发拖欠工资", -paid);
  addLog(`补发拖欠工资 ${money(paid)}，剩余工资债务 ${money((state.wageDebt || 0) + state.secretaryArrears)}。`);
  showToast(`已补发拖欠工资 ${money(paid)}。`, "success");
  render();
}

function enrollCourse(id) {
  const course = courses.find((item) => item.id === id);
  startTimedAction({ cash: course.cost, minutes: course.minutes, stamina: course.stamina, energy: course.energy }, `学习${course.name}`, "商学院", () => {
    state.skills[course.skill] = clamp(state.skills[course.skill] + course.boost, 0, 100);
    state.reputation += 1;
    const rumor = exclusiveRumors[Math.floor(Math.random() * exclusiveRumors.length)];
    const source = { type: "商学院同学", name: ["顾星河", "许嘉禾", "唐一宁", "林澈"][Math.floor(Math.random() * 4)], reliability: 0.55 + Math.random() * 0.25 };
    const trueSignal = Math.random() < source.reliability;
    state.news.unshift({
      ...rumor,
      id: `ex-${state.time}-${Math.floor(Math.random() * 10000)}`,
      title: `独家消息：${rumor.sector}动向`,
      source,
      trueSignal,
      exclusive: true,
      publishedAt: state.time,
    });
    state.news = state.news.slice(0, 8);
    addLog(`完成${course.name}，${course.skill} +${course.boost}，获得一条商学院独家消息。`);
  });
}

function startCompany(id) {
  const company = companyOptions.find((item) => item.id === id);
  if (!company) return;
  const setupMinutes = company.setupDays * 1440;
  const companyId = `co-${Date.now()}-${state.companies.length}`;
  const started = startTimedAction({ cash: company.cost, minutes: setupMinutes, stamina: 12, energy: 28 }, `创办${company.name}`, "商业", () => {
    const created = state.companies.find((item) => item.id === companyId);
    if (!created) return;
    created.status = "active";
    created.ageDays = 0;
    created.setupCompleteAt = state.time;
    state.skills[company.skill] = clamp(state.skills[company.skill] + 1, 0, 100);
    state.reputation += 4;
    addLog(`${company.name}完成企业开办流程，进入正式运营，${company.skill} +1。`);
  });
  if (!started) return;
  state.companies.push({
    ...company,
    id: companyId,
    templateId: company.id,
    status: "opening",
    setupStart: state.time,
    setupEnd: state.time + setupMinutes,
    setupCompleteAt: null,
    ageDays: 0,
    level: 1,
    staff: [],
    optimizations: [],
    optimizationOptions: company.optimizations,
    liabilityGuarantee: Math.round(company.cost * (company.liabilityRate || 0.35)),
  });
  state.selectedCompanyManageId = companyId;
  state.selectedBusinessManageId = null;
  closeDialog(companyDialog);
  render();
}

function isoDateFromMinutes(minutes) {
  const date = gameDate(minutes);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function marry() {
  if (state.player.married) return;
  const spouse = spouseCandidates[Math.floor(Math.random() * spouseCandidates.length)];
  startTimedAction({ cash: 50000, minutes: 10 * 1440, stamina: 6, energy: 18 }, "筹备婚礼", "家庭", () => {
    state.player.married = true;
    state.player.spouse = spouse;
    state.reputation += 2;
    addLog(`你和${spouse.name}结婚了，家庭系统开启。`);
  });
}

function haveChild() {
  if (!state.player.married || state.player.children.length >= 3) return;
  const names = ["小禾", "星遥", "知夏", "明舟", "安安", "清越", "景行", "若澄"];
  const seed = Date.now() % 100000 + state.player.children.length * 97;
  startTimedAction({ cash: 18000, minutes: 30 * 1440, stamina: 8, energy: 20 }, "迎接新家庭成员", "家庭", () => {
    const child = {
      id: `child-${Date.now()}-${state.player.children.length}`,
      name: names[Math.floor(seeded(seed) * names.length)],
      bornAt: state.time,
      birthDate: isoDateFromMinutes(state.time),
      baseTalent: Math.round(32 + seeded(seed + 3) * 34),
      education: 0,
      seed,
    };
    state.player.children.push(child);
    addLog(`${child.name}出生了。后续教育投入会影响下一代的天赋和技能点。`);
  });
}

function investEducation(childId, amount) {
  const child = state.player.children.find((item) => item.id === childId);
  if (!child) return;
  startTimedAction({ cash: amount, minutes: 1440, stamina: 0, energy: 4 }, `${child.name}教育投入`, "家庭", () => {
    child.education += amount;
    addLog(`为${child.name}投入教育资金 ${money(amount)}，下一代潜力提高。`);
  });
}

function transferToHeir() {
  const heir = state.player.children.find((child) => childAge(child) >= 18);
  if (!heir) {
    addLog("还没有成年子女可以继承。");
    render();
    return;
  }
  const profile = childDevelopment(heir);
  startTimedAction({ cash: 0, minutes: 7 * 1440, stamina: 4, energy: 12 }, `交棒给${heir.name}`, "继承", () => {
    const nextGeneration = state.player.generation + 1;
    state.player = {
      name: heir.name,
      generation: nextGeneration,
      birthDate: heir.birthDate,
      married: false,
      spouse: null,
      children: [],
    };
    state.skills = profile.skills;
    state.stamina = 100;
    state.energy = 86;
    state.reputation = clamp(Math.round(state.reputation * 0.72 + profile.talent / 3), 5, 999);
    addLog(`${heir.name}继承了全部资产、股票、事业、车辆和负债，成为第 ${nextGeneration} 代玩家角色。`);
  });
}

function triggerDeath(reason) {
  state.gameOver = true;
  state.clockSpeed = 0;
  state.pendingAction = null;
  pendingCompletion = null;
  closeDialog(sleepDialog);
  closeDialog(projectDialog);
  closeDialog(stockTradeDialog);
  closeDialog(leaseDialog);
  closeDialog(companyDialog);
  addLog(reason);
  const succession = resolveSuccession(reason);
  if (succession.type === "donate") {
    showDonationEnding(reason);
    render();
    return;
  }
  if (succession.type === "fail") {
    showGameOver("创业档案终止", `${reason}<br>${succession.message}`);
    render();
    return;
  }
  const netWorth = assetReport().totalAssets - assetReport().totalLiabilities;
  if (netWorth < 0) {
    state.pendingInheritance = succession;
    inheritanceDialogTextEl.innerHTML = `
      <p>${reason}</p>
      <p>${succession.label}可以继承事业，但当前净资产为 ${money(netWorth)}。</p>
      <p>继承人可以选择接盘继续经营，也可以放弃继承，结束本局游戏。</p>
    `;
    openDialog(inheritanceDialog);
    render();
    return;
  }
  applyInheritance(succession);
  render();
}

function resolveSuccession(reason) {
  const children = [...state.player.children].sort((a, b) => a.bornAt - b.bornAt);
  const adultChildren = children.filter((child) => childAge(child) >= 18);
  const minorChildren = children.filter((child) => childAge(child) < 18);

  if (state.will.mode === "donate") return { type: "donate", reason };
  if (state.will.mode === "spouse" && state.player.married && state.player.spouse) {
    return { type: "spouse", spouse: state.player.spouse, label: state.player.spouse.name, reason };
  }
  if (state.will.mode === "child") {
    const child = children.find((item) => item.id === state.will.targetId);
    if (child && childAge(child) >= 18) return { type: "child", child, label: child.name, reason };
    if (child && state.player.married && state.player.spouse && !state.player.divorced) {
      return { type: "spouse", spouse: state.player.spouse, label: `${state.player.spouse.name}代管${child.name}资产`, reason };
    }
  }

  if (!children.length && state.player.married && state.player.spouse && !state.player.divorced) {
    return { type: "spouse", spouse: state.player.spouse, label: state.player.spouse.name, reason };
  }
  if (!children.length) return { type: "fail", message: "没有配偶和子女可以继承，游戏结束。", reason };
  if (adultChildren.length) return { type: "child", child: adultChildren[0], label: adultChildren[0].name, reason };
  if (minorChildren.length && state.player.married && state.player.spouse && !state.player.divorced) {
    return { type: "spouse", spouse: state.player.spouse, label: `${state.player.spouse.name}代管未成年子女资产`, reason };
  }
  return { type: "fail", message: "子女未成年且已经离婚或没有配偶监护，游戏失败。", reason };
}

function applyInheritance(succession) {
  const oldChildren = state.player.children;
  if (succession.type === "child") {
    const profile = childDevelopment(succession.child);
    const nextGeneration = state.player.generation + 1;
    state.player = {
      name: succession.child.name,
      generation: nextGeneration,
      birthDate: succession.child.birthDate,
      married: false,
      divorced: false,
      spouse: null,
      children: [],
    };
    state.skills = profile.skills;
    state.reputation = clamp(Math.round(state.reputation * 0.64 + profile.talent / 2), 5, 999);
  }
  if (succession.type === "spouse") {
    const spouse = succession.spouse;
    state.player = {
      name: spouse.name,
      generation: state.player.generation,
      birthDate: spouse.birthDate || "1995-01-01",
      married: false,
      divorced: false,
      spouse: null,
      children: oldChildren,
    };
    state.skills = softenSkillsForSpouse();
    state.reputation = clamp(Math.round(state.reputation * 0.72), 5, 999);
  }
  state.stamina = 92;
  state.energy = 86;
  state.sleepDebtMinutes = 0;
  state.sleepPromptDismissedUntil = 0;
  state.will = { mode: "auto", targetId: "auto" };
  state.pendingInheritance = null;
  state.gameOver = false;
  state.clockSpeed = 1;
  addLog(`${succession.label}继承了资产、事业、股票、车辆和债务，游戏继续。`);
  closeDialog(inheritanceDialog);
}

function softenSkillsForSpouse() {
  return Object.fromEntries(Object.entries(state.skills).map(([key, value]) => [key, clamp(Math.round(value * 0.72 + 10), 8, 88)]));
}

function showDonationEnding(reason) {
  const report = assetReport();
  const donated = Math.max(0, report.totalAssets - report.totalLiabilities);
  showGameOver(
    `${state.player.name}离世，遗产成立公益基金`,
    `${reason}<br>根据生前遗嘱，遗产清算后捐献 ${money(donated)}，用于县域青年创业基金、商学院奖学金和社区小店扶持计划。新闻标题写道：“${state.player.name}把最后一笔商业版图，留给了下一批创业者。”<br>本局游戏结束。`,
  );
}

function showGameOver(title, html) {
  gameOverTitleEl.textContent = title;
  gameOverTextEl.innerHTML = `<p>${html}</p>`;
  openDialog(gameOverDialog);
}

function updateStocks(updateTime = state.time) {
  state.stocks.forEach((stock) => {
    stock.prevClose = stock.price;
    const signal = state.news.find((item) => item.sector === stock.sector);
    const wind = signal ? (signal.trueSignal ? 0.032 : -0.018) : -0.003;
    const market = (Math.random() - 0.49) * 0.026;
    const companyShock = (Math.random() + Math.random() - 1) * stock.volatility;
    const momentum = clamp(stock.change * 0.22, -0.025, 0.025);
    const change = clamp(wind + market + companyShock + momentum, -0.16, 0.18);
    refreshQuote(stock, change);
    stock.lastUpdatedAt = updateTime;
  });
}

function recordStockPerformance(updateTime, beforeEquity) {
  const afterEquity = stockAccountEquity();
  if (beforeEquity <= 0 && afterEquity <= 0) {
    state.lastStockEquity = afterEquity;
    return;
  }
  const baseline = beforeEquity > 0 ? beforeEquity : afterEquity;
  const pnl = afterEquity - baseline;
  const returnRate = baseline > 0 ? pnl / baseline : 0;
  state.stockPerformanceHistory.push({
    time: updateTime,
    equity: Math.round(afterEquity),
    pnl: Math.round(pnl),
    returnRate,
  });
  state.stockPerformanceHistory = state.stockPerformanceHistory.slice(-520);
  state.lastStockEquity = afterEquity;
}

function startTimedAction(cost, text, category, onComplete, locationText = text) {
  if (state.pendingAction) {
    addLog(`正在${state.pendingAction.label}，暂时不能开始新的行动。`);
    render();
    return false;
  }
  if (isBlockedByOwnerDuty(category)) return false;

  const fullCost = {
    cash: 0,
    minutes: 0,
    stamina: 0,
    energy: 0,
    ...cost,
  };

  if (!spend({ ...fullCost, minutes: 0 }, text, category)) return false;
  if (state.gameOver) return false;
  if (fullCost.minutes <= 0) {
    onComplete();
    render();
    return true;
  }

  state.pendingAction = {
    label: text,
    category,
    start: state.time,
    end: state.time + fullCost.minutes,
    locationText,
    deathRiskMinutes: fullCost.minutes,
    travel: fullCost.travel || null,
  };
  pendingCompletion = onComplete;
  addLog(`${text}开始，预计需要 ${formatDuration(fullCost.minutes)}。`);
  render();
  return true;
}

function spend(cost, text, category) {
  const fullCost = {
    cash: 0,
    minutes: 0,
    stamina: 0,
    energy: 0,
    rest: false,
    ...cost,
  };

  if (state.gameOver) return false;
  if (isBlockedByOwnerDuty(category)) return false;
  if (!fullCost.rest && state.sleepDebtMinutes >= maxSleepDebtMinutes && (fullCost.stamina > 0 || fullCost.energy > 0)) {
    addLog("透支已经达到 7 天上限，必须先睡觉。");
    showSleepPrompt(true);
    return false;
  }
  if (state.cash < fullCost.cash) {
    addLog(`${text}失败：资金不足。`);
    renderLog();
    return false;
  }

  const previousStamina = state.stamina;
  const previousEnergy = state.energy;
  state.cash -= fullCost.cash;
  state.time += Math.round(fullCost.minutes);
  processTimeSystems();
  state.stamina = clamp(state.stamina - fullCost.stamina, -100, 100);
  state.energy = clamp(state.energy - fullCost.energy, -100, 100);
  addSleepDebt(previousStamina, previousEnergy, fullCost);
  addLedger(`${category}：${text}`, -fullCost.cash, fullCost);

  if (state.stamina <= 0 || state.energy <= 0) {
    addLog(`身体已经进入透支，累计需要补觉 ${formatDuration(state.sleepDebtMinutes)}。`);
    showSleepPrompt();
  } else {
    if (state.stamina <= 18) addLog("体力已经很低，继续行动会开始透支。");
    if (state.energy <= 15) addLog("精力接近见底，复杂决策会开始透支。");
  }
  const died = maybeSuddenDeath(`${category}：${text}`, Math.max(30, fullCost.minutes || 30));
  return !died;
}

function isBlockedByOwnerDuty(category, silent = false) {
  if (!state.ownerDutyBusinessId) return false;
  if (["经营", "招聘", "睡觉"].includes(category)) return false;
  const business = state.businesses.find((item) => item.id === state.ownerDutyBusinessId);
  if (!business || canOwnerLeaveBusiness(business)) {
    state.ownerDutyBusinessId = null;
    if (business) business.ownerOperated = false;
    return false;
  }
  if (!silent) {
    addLog(`你正在${business.name}亲自顶班，补齐最低岗位前不能做其它行动。`);
    render();
  }
  return true;
}

function addSleepDebt(previousStamina, previousEnergy, cost) {
  if (cost.rest) return;
  const staminaDeficit = Math.max(0, cost.stamina - Math.max(previousStamina, 0));
  const energyDeficit = Math.max(0, cost.energy - Math.max(previousEnergy, 0));
  const alreadyOverdrawn = previousStamina <= 0 || previousEnergy <= 0 || state.sleepDebtMinutes > 0;
  const overdrawMinutes = staminaDeficit * 42 + energyDeficit * 52 + (alreadyOverdrawn ? Math.round((cost.minutes || 0) * 0.18) : 0);
  if (overdrawMinutes <= 0 && (state.stamina <= 0 || state.energy <= 0)) {
    state.sleepDebtMinutes = Math.min(maxSleepDebtMinutes, state.sleepDebtMinutes + 45);
    return;
  }
  state.sleepDebtMinutes = Math.min(maxSleepDebtMinutes, state.sleepDebtMinutes + Math.round(overdrawMinutes));
}

function requiredSleepMinutes() {
  const age = playerAge();
  const ageFactor = 1 + Math.max(0, age - 35) * 0.012 + Math.max(0, age - 55) * 0.018;
  const baseSleep = 8 * 60;
  const recoveryDebt = state.sleepDebtMinutes * ageFactor;
  const deepDeficit = (Math.max(0, -state.stamina) * 14 + Math.max(0, -state.energy) * 16) * ageFactor;
  return Math.round(baseSleep * Math.min(ageFactor, 1.65) + recoveryDebt + deepDeficit);
}

function sleepCost(minutes) {
  const days = Math.max(1, Math.ceil(minutes / 1440));
  return 160 + days * 180;
}

function suddenDeathRiskPreview() {
  if (state.sleepDebtMinutes <= 0 && state.stamina > 0 && state.energy > 0) return { chance: 0, label: "正常" };
  const chance = suddenDeathChance(8 * 60);
  if (chance < 0.001) return { chance, label: "低" };
  if (chance < 0.006) return { chance, label: "升高" };
  if (chance < 0.02) return { chance, label: "危险" };
  return { chance, label: "极高" };
}

function suddenDeathChance(minutes = 60) {
  const age = playerAge();
  const debtDays = state.sleepDebtMinutes / 1440;
  const ageMultiplier = age < 35 ? 0.45 : age < 45 ? 0.8 : age < 55 ? 1.35 : age < 65 ? 2.4 : age < 75 ? 4.5 : 7.5;
  const exhaustionMultiplier = 1 + debtDays * 2.4 + Math.max(0, -state.stamina) / 18 + Math.max(0, -state.energy) / 15;
  const actionDays = Math.max(0.04, minutes / 1440);
  const baseDaily = suddenDeathBaseAnnual / 365;
  return clamp(baseDaily * actionDays * ageMultiplier * exhaustionMultiplier, 0, 0.18);
}

function maybeSuddenDeath(reason, minutes = 60) {
  if (state.gameOver || state.sleepDebtMinutes <= 0) return false;
  const chance = suddenDeathChance(minutes);
  state.deathCheckLog.unshift({ time: state.time, chance, reason });
  state.deathCheckLog = state.deathCheckLog.slice(0, 12);
  if (Math.random() > chance) return false;
  triggerDeath(`长期透支后，${state.player.name}在${reason}期间突发猝死。`);
  return true;
}

function showSleepPrompt(force = false) {
  if (!sleepDialog || state.gameOver || state.pendingAction?.category === "睡觉") return;
  if (!force && state.sleepPromptDismissedUntil > state.time) return;
  const risk = suddenDeathRiskPreview();
  sleepDialogTextEl.innerHTML = `
    <p>体力：${Math.round(state.stamina)}｜精力：${Math.round(state.energy)}</p>
    <p>当前透支需要补觉 ${formatDuration(state.sleepDebtMinutes)}，预计本次睡眠 ${formatDuration(requiredSleepMinutes())}。</p>
    <p>年龄 ${playerAge()} 岁，继续透支的猝死风险为：${risk.label}。</p>
    <p class="small-copy">最多可累计 7 天透支。达到上限后必须睡觉。</p>
  `;
  openDialog(sleepDialog);
}

function openDialog(dialog) {
  if (!dialog || dialog.open) return;
  if (dialog.showModal) dialog.showModal();
}

function closeDialog(dialog) {
  if (dialog?.open) dialog.close();
}

stockTradeDialog?.addEventListener("close", () => {
  restoreClockAfterStockTrade();
  state.selectedStockTrade = null;
  render();
});

let lastTouchEndAt = 0;
document.addEventListener("gesturestart", (event) => event.preventDefault(), { passive: false });
document.addEventListener("gesturechange", (event) => event.preventDefault(), { passive: false });
document.addEventListener("touchend", (event) => {
  const now = Date.now();
  if (now - lastTouchEndAt <= 300) event.preventDefault();
  lastTouchEndAt = now;
}, { passive: false });

function addLedger(text, amount, cost = {}) {
  state.ledger.unshift({
    time: state.time,
    text,
    amount: Math.round(amount),
    cost,
  });
  state.ledger = state.ledger.slice(0, 80);
}

function addLog(message) {
  state.log.unshift(`${formatTime(state.time)}：${message}`);
  state.log = state.log.slice(0, 18);
}

function travelCost(target, vehicleId = state.vehicle) {
  const vehicle = vehicles[vehicleId];
  const km = travelDistanceKm(target);
  const hours = km / vehicle.speed;
  return {
    km,
    cash: vehicleId === "walk" ? 0 : Math.round(Math.max(vehicle.minFee, km * vehicle.costPerKm) + 5),
    minutes: Math.max(10, Math.round(hours * 60 + vehicle.boardMinutes + 8)),
    stamina: Math.min(95, Math.round(km * vehicle.staminaPerKm + 1)),
    energy: Math.min(60, Math.round(hours * vehicle.energyPerHour + 1.5)),
  };
}

function travelDistanceKm(target) {
  const current = pointForCurrent();
  if (target.type === "place") {
    const targetPlace = getPlace(target.id);
    const sameCountyFromPlace = current.type === "place" && getPlace(current.id).countyId === targetPlace.countyId;
    const sameCountyFromCounty = current.type === "county" && current.id === targetPlace.countyId;
    if (sameCountyFromPlace || sameCountyFromCounty) {
      const fromStreet = sameCountyFromPlace ? getPlace(current.id) : { x: 50, y: 50 };
      const streetKm = distance(fromStreet, targetPlace) * 0.055;
      return Math.max(0.3, Math.round(streetKm * 10) / 10);
    }
  }
  return Math.max(2, Math.round(distance(current, target) * 18));
}

function availableVehiclesForTarget(target) {
  const fromCounty = getCountyForPoint(pointForCurrent());
  const toCounty = getCountyForPoint(target);
  const km = travelDistanceKm(target);
  const available = state.ownedVehicles.filter((id) => {
    if (id === "walk") return km <= 25;
    if (["bike", "ebike"].includes(id)) return km <= 80;
    if (id === "moto") return km <= 220;
    if (id === "privatePlane") return fromCounty.airport && toCounty.airport && km >= 180;
    return true;
  });

  if (km >= 8) available.push("bus");
  if (km >= 90 && fromCounty.railHub && toCounty.railHub) available.push("rail");
  if (km >= 220 && fromCounty.airport && toCounty.airport) available.push("flight");
  return [...new Set(available)].sort((a, b) => vehicles[b].speed - vehicles[a].speed);
}

function ownedTravelOptionsForTarget(target) {
  const km = travelDistanceKm(target);
  const available = state.ownedVehicles.filter((id) => {
    if (id === "walk") return km <= 25;
    if (["bike", "ebike"].includes(id)) return km <= 80;
    if (id === "moto") return km <= 220;
    if (id === "privatePlane") {
      const fromCounty = getCountyForPoint(pointForCurrent());
      const toCounty = getCountyForPoint(target);
      return fromCounty.airport && toCounty.airport && km >= 180;
    }
    return true;
  });
  return [...new Set(available)].sort((a, b) => vehicles[b].speed - vehicles[a].speed);
}

function travelOptionsForTarget(target) {
  if (target.type === "place") {
    const ownedOptions = ownedTravelOptionsForTarget(target);
    return ownedOptions.length ? ownedOptions : availableVehiclesForTarget(target);
  }
  return availableVehiclesForTarget(target);
}

function preferredTravelVehicle(target, options) {
  if (target.type === "place" && options.includes("walk")) return "walk";
  if (options.includes(state.vehicle)) return state.vehicle;
  return options[0] || "walk";
}

function fastestAvailableVehicle(target) {
  return travelOptionsForTarget(target)[0] || "walk";
}

function applyTrafficIncident(travel, target, vehicleId = state.vehicle) {
  const vehicle = vehicles[vehicleId];
  const fatigueFactor = state.stamina < 28 ? 1.55 : state.energy < 22 ? 1.25 : 1;
  const chance = clamp(travel.km * vehicle.accidentPerKm * fatigueFactor, 0, vehicle.maxAccident);
  if (Math.random() >= chance) return;

  const roll = Math.random();
  const severity = roll < 0.78
    ? { name: "轻微剐蹭", cash: 120 + travel.km * 0.8, minutes: 45, stamina: 3, energy: 5 }
    : roll < 0.96
      ? { name: "交通延误事故", cash: 900 + travel.km * 2.6, minutes: 180, stamina: 10, energy: 12 }
      : { name: "较严重交通事故", cash: 4200 + travel.km * 5.5, minutes: 720, stamina: 28, energy: 25 };

  const cashLoss = Math.round(severity.cash);
  state.cash -= cashLoss;
  state.time += severity.minutes;
  processTimeSystems();
  state.stamina = clamp(state.stamina - severity.stamina, 0, 100);
  state.energy = clamp(state.energy - severity.energy, 0, 100);
  addLedger(`${vehicle.name}${severity.name}`, -cashLoss, {
    minutes: severity.minutes,
    stamina: severity.stamina,
    energy: severity.energy,
    chance,
  });
  const travelLabel = vehicleId === "walk" ? `步行前往${target.name}` : `乘坐${vehicle.name}前往${target.name}`;
  addLog(`${travelLabel}途中发生${severity.name}，额外损失 ${money(cashLoss)}，延误 ${formatDuration(severity.minutes)}。`);
}

function distance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function pointForCurrent() {
  return state.current || { type: "county", id: startCounty.id, name: startCounty.name, x: startCounty.x, y: startCounty.y };
}

function getPoint(type, id) {
  if (type === "province") return getProvince(id);
  if (type === "city") return getCity(id);
  if (type === "place") {
    const place = getPlace(id);
    const county = getCounty(place.countyId);
    return {
      ...place,
      x: clamp(county.x + (place.x - 50) * 0.08, 3, 97),
      y: clamp(county.y + (place.y - 50) * 0.08, 3, 97),
    };
  }
  return getCounty(id);
}

function getProvince(id) {
  return world.provinces.find((province) => province.id === id);
}

function getCity(id) {
  return world.cities.find((city) => city.id === id);
}

function getCounty(id) {
  return world.counties.find((county) => county.id === id);
}

function getStreetMap(countyId) {
  if (!state.streetMaps[countyId]) state.streetMaps[countyId] = makeStreetMap(getCounty(countyId));
  if (!state.streetMaps[countyId].visual) state.streetMaps[countyId] = makeStreetMap(getCounty(countyId));
  return state.streetMaps[countyId];
}

function makeStreetTilePlan(seedBase) {
  const { cols, rows } = streetTileSpec;
  const roadCells = new Set();
  const key = (col, row) => `${col},${row}`;
  const isCornerReserve = (col, row) => (
    (col < 2 && row < 2)
    || (col >= cols - 2 && row < 2)
    || (col < 2 && row >= rows - 2)
    || (col >= cols - 2 && row >= rows - 2)
  );
  const verticals = [...new Set([2 + Math.round(seeded(seedBase + 70)), 5, 8 + Math.round(seeded(seedBase + 71))])];
  const horizontals = [...new Set([2, 4 + Math.round(seeded(seedBase + 72)), 6])];

  verticals.forEach((col) => {
    for (let row = 1; row < rows - 1; row += 1) roadCells.add(key(col, row));
  });
  horizontals.forEach((row) => {
    for (let col = 1; col < cols - 1; col += 1) roadCells.add(key(col, row));
  });

  if (seeded(seedBase + 73) > 0.45) {
    const branchRow = seeded(seedBase + 74) > 0.5 ? 1 : rows - 2;
    const start = 3 + Math.floor(seeded(seedBase + 75) * 4);
    for (let col = start; col < Math.min(cols - 1, start + 4); col += 1) roadCells.add(key(col, branchRow));
  }

  const hasRoad = (col, row) => col >= 0 && col < cols && row >= 0 && row < rows && roadCells.has(key(col, row));
  const tiles = [];
  const buildSlots = [];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const corner = (col === 0 && row === 0) || (col === cols - 1 && row === 0) || (col === 0 && row === rows - 1) || (col === cols - 1 && row === rows - 1);
      const isRoad = hasRoad(col, row);
      const mask = isRoad
        ? (hasRoad(col, row - 1) ? 1 : 0)
          + (hasRoad(col + 1, row) ? 2 : 0)
          + (hasRoad(col, row + 1) ? 4 : 0)
          + (hasRoad(col - 1, row) ? 8 : 0)
        : 0;
      const reserved = corner || isCornerReserve(col, row);
      tiles.push({ col, row, mask, corner, reserved, isRoad });

      const adjacentRoads = [hasRoad(col, row - 1), hasRoad(col + 1, row), hasRoad(col, row + 1), hasRoad(col - 1, row)].filter(Boolean).length;
      if (!reserved && !isRoad) {
        const seed = seedBase + row * 29 + col * 17;
        const slotX = clamp((col + 0.5 + jitter(seed + 3, 0.24)) / cols * 100, 3, 97);
        const slotY = clamp((row + 0.52 + jitter(seed + 7, 0.22)) / rows * 100, 4, 96);
        buildSlots.push({
          col,
          row,
          x: slotX,
          y: slotY,
          adjacentRoads,
          roadBoost: adjacentRoads * 7 + (col > 2 && col < cols - 3 && row > 1 && row < rows - 2 ? 5 : 0),
          edgeRing: row <= 1 || row >= rows - 2 || col <= 1 || col >= cols - 2 ? 2 : row <= 2 ? 1 : 0,
          score: adjacentRoads * 20 + seeded(seed + 11) * 12 - (corner ? 100 : 0),
        });
      }
    }
  }

  const visual = makeStreetVisual(seedBase, { cols, rows, tiles, roadCells });
  return { cols, rows, tiles, buildSlots, visual };
}

function makeStreetVisual(seedBase, plan) {
  const { cols, rows, tiles, roadCells } = plan;
  const tile = streetTileSpec.tileSize;
  const key = (col, row) => `${col},${row}`;
  const hasRoad = (col, row) => col >= 0 && col < cols && row >= 0 && row < rows && roadCells.has(key(col, row));
  const roads = [];
  const roadNodes = [];
  const parcels = [];
  const decorations = [];

  for (let row = 0; row < rows; row += 1) {
    let col = 0;
    while (col < cols) {
      if (!hasRoad(col, row)) {
        col += 1;
        continue;
      }
      const start = col;
      while (col + 1 < cols && hasRoad(col + 1, row)) col += 1;
      if (col > start) {
        roads.push(makeRoadRun(seedBase, "h", start, col, row));
      }
      col += 1;
    }
  }

  for (let col = 0; col < cols; col += 1) {
    let row = 0;
    while (row < rows) {
      if (!hasRoad(col, row)) {
        row += 1;
        continue;
      }
      const start = row;
      while (row + 1 < rows && hasRoad(col, row + 1)) row += 1;
      if (row > start) {
        roads.push(makeRoadRun(seedBase, "v", start, row, col));
      }
      row += 1;
    }
  }

  tiles.forEach((mapTile) => {
    const centerX = Math.round((mapTile.col + 0.5) * tile);
    const centerY = Math.round((mapTile.row + 0.5) * tile);
    if (mapTile.isRoad) {
      roadNodes.push({ x: centerX, y: centerY });
      if (mapTile.mask % 3 === 0 || seeded(seedBase + mapTile.col * 41 + mapTile.row * 37) > 0.68) {
        decorations.push({ kind: "lamp", x: centerX + jitter(seedBase + centerX, 42), y: centerY + jitter(seedBase + centerY, 42) });
      }
    }
  });

  const tileByKey = new Map(tiles.map((mapTile) => [key(mapTile.col, mapTile.row), mapTile]));
  const parcelUsed = new Set();
  const canUseParcelCell = (col, row) => {
    const mapTile = tileByKey.get(key(col, row));
    return Boolean(mapTile && !mapTile.isRoad && !mapTile.reserved && !parcelUsed.has(key(col, row)));
  };

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (!canUseParcelCell(col, row)) continue;
      const seed = seedBase + row * 53 + col * 71;
      let blockCols = seeded(seed + 25) > 0.5 && canUseParcelCell(col + 1, row) ? 2 : 1;
      let blockRows = seeded(seed + 27) > 0.62 && canUseParcelCell(col, row + 1) ? 2 : 1;
      if (blockCols === 2 && blockRows === 2 && !canUseParcelCell(col + 1, row + 1)) blockRows = 1;
      if (blockRows === 2 && blockCols === 2 && seeded(seed + 29) < 0.42) blockCols = 1;
      for (let blockRow = row; blockRow < row + blockRows; blockRow += 1) {
        for (let blockCol = col; blockCol < col + blockCols; blockCol += 1) {
          parcelUsed.add(key(blockCol, blockRow));
        }
      }
      const adjacentRoads = countAdjacentRoads(col, row, blockCols, blockRows, hasRoad);
      const margin = 15 + seeded(seed + 3) * 12;
      const x = col * tile + margin + jitter(seed + 5, 8);
      const y = row * tile + margin + jitter(seed + 7, 8);
      const width = blockCols * tile - margin * 2 + jitter(seed + 9, 12);
      const height = blockRows * tile - margin * 2 + jitter(seed + 11, 12);
      const parkLike = adjacentRoads === 0 || seeded(seed + 13) > 0.78;
      const fill = parkLike ? "#7ec866" : seeded(seed + 15) > 0.58 ? "#d8bf91" : "#ceb182";
      const stroke = parkLike ? "#5eaa54" : "#b69062";
      const innerStroke = parkLike ? "#a7df74" : "#ead2a4";
      parcels.push({
        path: makeOrganicParcelPath(x, y, width, height, 20 + seeded(seed + 17) * 16, seed),
        innerPath: makeOrganicParcelPath(x + 10, y + 9, width - 20, height - 18, 14 + seeded(seed + 19) * 10, seed + 23),
        fill,
        stroke,
        innerStroke,
        opacity: parkLike ? 0.94 : 0.9,
      });
      if (parkLike || seeded(seed + 21) > 0.72) {
        const treeCount = parkLike ? 4 : 2;
        for (let i = 0; i < treeCount; i += 1) {
          decorations.push({
            kind: "tree",
            x: Math.round(x + width * (0.2 + seeded(seed + 31 + i) * 0.62)),
            y: Math.round(y + height * (0.22 + seeded(seed + 41 + i) * 0.58)),
          });
        }
      }
    }
  }

  return { roads, roadNodes, parcels, decorations };
}

function countAdjacentRoads(col, row, blockCols, blockRows, hasRoad) {
  let count = 0;
  for (let blockCol = col; blockCol < col + blockCols; blockCol += 1) {
    if (hasRoad(blockCol, row - 1)) count += 1;
    if (hasRoad(blockCol, row + blockRows)) count += 1;
  }
  for (let blockRow = row; blockRow < row + blockRows; blockRow += 1) {
    if (hasRoad(col - 1, blockRow)) count += 1;
    if (hasRoad(col + blockCols, blockRow)) count += 1;
  }
  return count;
}

function makeRoadRun(seedBase, orientation, start, end, fixed) {
  const tile = streetTileSpec.tileSize;
  const seed = seedBase + start * 43 + end * 59 + fixed * 61 + (orientation === "h" ? 0 : 5000);
  if (orientation === "h") {
    const x1 = Math.round((start + 0.5) * tile);
    const x2 = Math.round((end + 0.5) * tile);
    const y = Math.round((fixed + 0.5) * tile + jitter(seed + 1, 10));
    const curve = jitter(seed + 2, 26);
    return {
      path: `M${x1} ${y}C${fmt(x1 + (x2 - x1) * 0.32)} ${fmt(y + curve)},${fmt(x1 + (x2 - x1) * 0.68)} ${fmt(y - curve)},${x2} ${y}`,
    };
  }
  const y1 = Math.round((start + 0.5) * tile);
  const y2 = Math.round((end + 0.5) * tile);
  const x = Math.round((fixed + 0.5) * tile + jitter(seed + 1, 10));
  const curve = jitter(seed + 2, 26);
  return {
    path: `M${x} ${y1}C${fmt(x + curve)} ${fmt(y1 + (y2 - y1) * 0.32)},${fmt(x - curve)} ${fmt(y1 + (y2 - y1) * 0.68)},${x} ${y2}`,
  };
}

function makeOrganicParcelPath(x, y, width, height, radius, seed) {
  const x0 = fmt(x + jitter(seed + 1, 5));
  const y0 = fmt(y + jitter(seed + 2, 5));
  const x1 = fmt(x + width + jitter(seed + 3, 5));
  const y1 = fmt(y + height + jitter(seed + 4, 5));
  const r = fmt(clamp(radius, 10, Math.min(width, height) / 2 - 3));
  return `M${fmt(Number(x0) + Number(r))} ${y0}L${fmt(Number(x1) - Number(r))} ${y0}Q${x1} ${y0} ${x1} ${fmt(Number(y0) + Number(r))}L${x1} ${fmt(Number(y1) - Number(r))}Q${x1} ${y1} ${fmt(Number(x1) - Number(r))} ${y1}L${fmt(Number(x0) + Number(r))} ${y1}Q${x0} ${y1} ${x0} ${fmt(Number(y1) - Number(r))}L${x0} ${fmt(Number(y0) + Number(r))}Q${x0} ${y0} ${fmt(Number(x0) + Number(r))} ${y0}Z`;
}

function fmt(value) {
  return Number(value.toFixed(1));
}

function makeStreetMap(county) {
  const seedBase = Number(county.id.replace("k-", "")) + 100;
  const demandScore = clamp((county.population * 0.45 + county.development * 0.75) / 1.15, 20, 100);
  const baseVacancyRate = clamp(0.32 - demandScore / 420 + seeded(seedBase + 1) * 0.12, 0.06, 0.42);
  const tilePlan = makeStreetTilePlan(seedBase);
  const places = [];
  const typePlan = [
    "community", "school", "residential", "office", "building", "mall",
    "residential", "bikeStore", "shop", "station", "office", "carDealer",
    "park", "community", "vacancy", "mall", "shop", "hospital",
    "vacancy", "residential", "school", "building", "vacancy", "community",
    "park", "vacancy", "aviation", "residential",
  ];
  const buildSlots = [...tilePlan.buildSlots]
    .filter((slot) => slot.adjacentRoads > 0)
    .sort((a, b) => b.score - a.score);
  const fallbackSlots = [...tilePlan.buildSlots].sort((a, b) => b.score - a.score);
  const slots = buildSlots.length >= typePlan.length ? buildSlots : fallbackSlots;

  typePlan.forEach((plannedType, index) => {
    const slot = slots[index % slots.length];
    const ring = slot.edgeRing;
    const x = slot.x;
    const y = slot.y;
    let placeType = plannedType;
    const protectedStore = ["bikeStore", "carDealer", "aviation"].includes(placeType);
    if (!protectedStore && seeded(seedBase + index + 17) < baseVacancyRate + ring * 0.055) placeType = "vacancy";
    if (index % 8 === 0 && demandScore > 62 && seeded(seedBase + index + 19) > 0.35) placeType = "shop";
    if (plannedType === "station" && !county.railHub && seeded(seedBase + 20) < 0.55) placeType = "mall";
    if (plannedType === "station" && county.railHub) placeType = "station";
    if (plannedType === "aviation" && !county.airport) placeType = county.development > 68 ? "carDealer" : "office";
    const type = placeTypes[placeType];
    const roadBoost = slot.roadBoost;
    const footTraffic = Math.round(clamp(demandScore * 0.38 + type.foot + roadBoost + seeded(seedBase + index + 15) * 14 - (placeType === "vacancy" ? baseVacancyRate * 32 + ring * 5 : 0), 8, 100));
    const rent = Math.round(county.rent * (0.34 + footTraffic / 155) * type.rent);
    const areaBase = placeType === "vacancy" ? 22 + seeded(seedBase + index + 33) * 95 : 18 + seeded(seedBase + index + 33) * 120;
    const area = Math.round(areaBase + (plannedType === "mall" || plannedType === "building" ? 45 : 0));
    places.push({
      id: `${county.id}-s-${index}`,
      type: "place",
      countyId: county.id,
      name: `${county.name}${type.name}${index + 1}`,
      placeType,
      x,
      y,
      area,
      footTraffic,
      rent,
      meta: `${type.name}｜人流${footTraffic}`,
    });
  });

  const vacancyRate = places.filter((place) => place.placeType === "vacancy").length / places.length;
  return { countyId: county.id, demandScore: Math.round(demandScore), vacancyRate, tiles: tilePlan.tiles, visual: tilePlan.visual, places };
}

function getPlace(id) {
  const countyId = id.split("-s-")[0];
  return getStreetMap(countyId).places.find((place) => place.id === id);
}

function getCountyForPoint(point) {
  if (!point) return getCounty(startCounty.id);
  if (point.type === "place") return getCounty(point.countyId || getPlace(point.id).countyId);
  if (point.type === "county") return getCounty(point.id);
  if (point.type === "city") return world.counties.find((county) => county.cityId === point.id);
  if (point.type === "province") return world.counties.find((county) => county.provinceId === point.id);
  return getCounty(startCounty.id);
}

function currentLocationText() {
  if (state.pendingAction) return state.pendingAction.locationText || state.pendingAction.label;
  if (state.current.type === "place") return `${getPlace(state.current.id).name}`;
  return state.current.name;
}

function cityCount(provinceId) {
  return world.cities.filter((city) => city.provinceId === provinceId).length;
}

function countyCount(cityId) {
  return world.counties.filter((county) => county.cityId === cityId).length;
}

function typeName(type) {
  if (type === "province") return "省";
  if (type === "city") return "市";
  if (type === "place") return "街道地点";
  return "县";
}

function currentSecretary() {
  return secretaryCandidates.find((secretary) => secretary.id === state.secretaryId);
}

function secretaryLoyaltyValue(secretary = currentSecretary()) {
  if (!secretary) return 0;
  return clamp(state.secretaryLoyalty ?? secretary.loyalty, 0, 100);
}

function secretaryResignationRisk(secretary = currentSecretary()) {
  if (!secretary) return { chance: 0, label: "无" };
  const loyalty = secretaryLoyaltyValue(secretary);
  const arrearsMonths = state.secretaryArrears / Math.max(1, secretary.salary);
  const base = clamp((100 - loyalty) / 260, 0.01, 0.28);
  const arrearsPressure = clamp(arrearsMonths * 0.18 + state.secretaryMissedPayrolls * 0.04, 0, 0.58);
  const chance = clamp(base + arrearsPressure, 0.01, 0.86);
  const label = chance >= 0.5 ? "很高" : chance >= 0.26 ? "偏高" : chance >= 0.12 ? "中等" : "较低";
  return { chance, label };
}

function processSecretaryPayroll() {
  const secretary = currentSecretary();
  if (!secretary) return;
  if (state.secretaryLoyalty === null) state.secretaryLoyalty = secretary.loyalty;
  const totalDue = secretary.salary + state.secretaryArrears;
  const paid = Math.min(Math.max(0, state.cash), totalDue);
  const previousArrears = state.secretaryArrears;

  if (paid > 0) {
    state.cash -= paid;
    addLedger(`${secretary.name} 工资支付`, -paid);
  }

  state.secretaryArrears = Math.max(0, totalDue - paid);

  if (state.secretaryArrears <= 0) {
    const recovered = previousArrears > 0;
    state.secretaryMissedPayrolls = 0;
    if (recovered) {
      state.secretaryLoyalty = clamp(secretaryLoyaltyValue(secretary) + 4, 0, 100);
      addLog(`补齐${secretary.name}的工资，工作关系有所缓和。`);
      showToast(`${secretary.name}工资已结清。`, "success");
    } else {
      addLog(`支付${secretary.name}月薪 ${money(secretary.salary)}。`);
    }
    return;
  }

  state.secretaryMissedPayrolls += 1;
  const newlyOwed = Math.max(0, state.secretaryArrears - previousArrears);
  const loyaltyLoss = Math.ceil(newlyOwed / Math.max(1, secretary.salary) * 18) + state.secretaryMissedPayrolls * 2;
  state.secretaryLoyalty = clamp(secretaryLoyaltyValue(secretary) - loyaltyLoss, 0, 100);
  addLog(`${secretary.name}工资拖欠 ${money(state.secretaryArrears)}，工作关系变差。`);
  showToast(`${secretary.name}出现欠薪 ${money(state.secretaryArrears)}，离职风险上升。`, "warn");

  const risk = secretaryResignationRisk(secretary);
  if (Math.random() < risk.chance) {
    const arrears = state.secretaryArrears;
    state.wageDebt += arrears;
    addLog(`${secretary.name}因长期欠薪选择离职，欠薪 ${money(arrears)} 转为工资债务。`);
    showToast(`${secretary.name}因欠薪离职，欠薪转为债务。`, "warn");
    state.secretaryId = null;
    state.secretaryLoyalty = null;
    state.secretaryArrears = 0;
    state.secretaryMissedPayrolls = 0;
    state.setupAssist = 0;
  }
}

function sourceDisplayName(source) {
  if (source.handle) return source.handle;
  return source.name;
}

function isNewsRead(id) {
  return state.readNewsIds.includes(id);
}

function openNews(id) {
  state.selectedNewsId = state.selectedNewsId === id ? null : id;
  if (!state.readNewsIds.includes(id)) state.readNewsIds.push(id);
  if (!state.newsSeenIds.includes(id)) state.newsSeenIds.push(id);
  render();
}

function canBuyVehicleHere(id) {
  const vehicle = vehicles[id];
  if (!vehicle || vehicle.kind === "public" || id === "walk" || state.ownedVehicles.includes(id)) return false;
  if (state.current.type !== "place" || state.pendingAction) return false;
  const place = getPlace(state.current.id);
  if (vehicle.store === "自行车店") return place.placeType === "bikeStore";
  if (vehicle.store === "车行") return place.placeType === "carDealer";
  if (id === "privatePlane") return place.placeType === "aviation";
  return true;
}

function buyVehicle(id) {
  const vehicle = vehicles[id];
  if (!vehicle || state.ownedVehicles.includes(id)) return;
  if (!canBuyVehicleHere(id)) {
    showToast(`${vehicle.name}需要到${vehicle.store}购买。`, "warn");
    render();
    return;
  }
  startTimedAction({ cash: vehicle.price, minutes: 90, stamina: 2, energy: 3 }, `购买${vehicle.name}`, "交通工具", () => {
    state.ownedVehicles.push(id);
    state.vehicle = id;
    addLog(`购买了${vehicle.name}，已设为当前交通工具。`);
    showToast(`已购买${vehicle.name}。`, "success");
  });
}

function selectVehicle(id) {
  const vehicle = vehicles[id];
  if (!vehicle) return;
  if (vehicle.kind === "public") {
    showToast(`${vehicle.name}是公共交通，会在移动路线可用时出现。`, "info");
    return;
  }
  if (!state.ownedVehicles.includes(id)) {
    showToast(`${vehicle.name}未拥有。可在地图里的${vehicle.store}购买，价格 ${money(vehicle.price)}。`, "warn");
    return;
  }
  state.vehicle = id;
  showToast(`当前交通工具：${vehicle.name}`, "success");
  render();
}

function getHolding(symbol) {
  if (!state.holdings[symbol]) {
    state.holdings[symbol] = { shares: 0, avgCost: 0, realized: 0 };
  }
  return state.holdings[symbol];
}

function holdingShares(symbol) {
  return getHolding(symbol).shares;
}

function stockFees(gross, side) {
  if (gross <= 0) return { commission: 0, exchangeFee: 0, stampTax: 0, total: 0 };
  const commission = Math.max(5, gross * 0.0003);
  const exchangeFee = gross * 0.00002;
  const stampTax = side === "sell" ? gross * 0.0005 : 0;
  return {
    commission,
    exchangeFee,
    stampTax,
    total: Math.round((commission + exchangeFee + stampTax) * 100) / 100,
  };
}

function portfolioValue() {
  return state.stocks.reduce((sum, stock) => sum + holdingShares(stock.symbol) * stock.price, 0);
}

function stockAccountEquity() {
  return state.stockCash + portfolioValue();
}

function resetStockPerformanceBaseline() {
  state.lastStockEquity = stockAccountEquity();
}

function transferStockCash(direction) {
  const input = document.querySelector("[data-stock-transfer-input]");
  const rawAmount = Number(input?.value || 0);
  let amount = Math.floor(rawAmount / 100) * 100;
  if (direction === "all-out") amount = Math.floor(state.stockCash);
  if (direction === "in") amount = clamp(amount, 0, Math.floor(state.cash));
  if (direction === "out") amount = clamp(amount, 0, Math.floor(state.stockCash));
  if (amount <= 0) {
    addLog("请输入有效的划转金额。");
    render();
    return;
  }
  if (direction === "in") {
    state.cash -= amount;
    state.stockCash += amount;
    addLedger("转入证券账户", -amount);
    addLog(`转入证券账户 ${money(amount)}，这笔钱只能用于股票买卖或转出。`);
  } else {
    state.stockCash -= amount;
    state.cash += amount;
    addLedger("证券账户转出", amount);
    addLog(`从证券账户转出 ${money(amount)} 到个人现金。`);
  }
  state.time += 5;
  processTimeSystems();
  resetStockPerformanceBaseline();
  render();
}

function realizedProfit() {
  return Object.values(state.holdings).reduce((sum, holding) => sum + (holding.realized || 0), 0);
}

function monthlyPayment(principal, apr, months) {
  const monthlyRate = apr / 12;
  if (monthlyRate <= 0) return Math.round(principal / months);
  const payment = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(payment);
}

function estimatedMonthlyIncome() {
  const storeIncome = state.businesses.reduce((sum, business) => sum + business.baseIncome * (0.55 + business.level * 0.12), 0);
  const companyIncome = state.companies.reduce((sum, company) => sum + company.monthlyBase * (0.55 + company.level * 0.1), 0);
  return Math.max(3000, storeIncome + companyIncome + state.reputation * 180);
}

function creditProfile(report = assetReport()) {
  const monthlyIncome = estimatedMonthlyIncome();
  const monthlyDebt = state.loans.reduce((sum, loan) => sum + loan.monthlyPayment, 0);
  const collateral = report.fixedAssets * 0.45 + report.stocks * 0.35 + report.businessEquity * 0.18 + report.companyEquity * 0.16;
  const operatingCredit = monthlyIncome * 8 + state.reputation * 1800 + Math.max(0, state.cash) * 0.35;
  const debtPenalty = report.totalLiabilities * 0.55 + monthlyDebt * 18;
  const limit = Math.max(0, Math.round(collateral + operatingCredit - debtPenalty));
  const debtRatio = monthlyDebt / Math.max(1, monthlyIncome);
  return { limit, monthlyIncome, monthlyDebt, debtRatio };
}

function loanEligibility(product, credit = creditProfile(), report = assetReport()) {
  if (state.reputation < product.minReputation) return { ok: false, reason: "声望不足" };
  if (product.needBusiness && state.businesses.length === 0) return { ok: false, reason: "需要门店流水" };
  if (product.needCompany && state.companies.length === 0) return { ok: false, reason: "需要公司经营" };
  if (product.needCollateral && report.fixedAssets + report.stocks < product.amount * product.collateralRate) return { ok: false, reason: "抵押物不足" };
  if (credit.limit < product.amount) return { ok: false, reason: "授信不足" };
  const payment = monthlyPayment(product.amount, product.apr, product.months);
  if ((credit.monthlyDebt + payment) / Math.max(1, credit.monthlyIncome) > 0.55) return { ok: false, reason: "月供过高" };
  return { ok: true, reason: "可申请" };
}

function applyLoan(id) {
  const product = loanProducts.find((item) => item.id === id);
  if (!product) return;
  const check = loanEligibility(product);
  if (!check.ok) {
    addLog(`${product.name}申请失败：${check.reason}。`);
    render();
    return;
  }
  const reviewDays = product.id === "mortgage" ? 5 : product.id === "company" ? 3 : 1;
  startTimedAction({ cash: 0, minutes: reviewDays * 1440, stamina: 1, energy: 4 }, `申请${product.name}`, "银行", () => {
    const payment = monthlyPayment(product.amount, product.apr, product.months);
    state.loans.push({
      id: `loan-${Date.now()}-${state.loans.length}`,
      productId: product.id,
      name: product.name,
      principal: product.amount,
      outstanding: product.amount,
      apr: product.apr,
      months: product.months,
      remainingMonths: product.months,
      monthlyPayment: payment,
    });
    state.cash += product.amount;
    addLedger(`${product.name}放款`, product.amount);
    addLog(`${product.name}审批通过，到账 ${money(product.amount)}，月供约 ${money(payment)}。`);
  });
}

function repayLoan(id) {
  const loan = state.loans.find((item) => item.id === id);
  if (!loan) return;
  if (state.cash < loan.outstanding) {
    addLog(`${loan.name}提前结清失败：现金不足。`);
    render();
    return;
  }
  const payoff = loan.outstanding;
  state.cash -= payoff;
  state.loans = state.loans.filter((item) => item.id !== id);
  addLedger(`${loan.name}提前结清`, -payoff);
  addLog(`提前结清${loan.name}，支付 ${money(payoff)}。`);
  render();
}

function setMapLevel(level) {
  if (level === "province") {
    state.mapLevel = "province";
    state.focusProvinceId = null;
    state.focusCityId = null;
  }
  if (level === "city" && state.focusProvinceId) {
    state.mapLevel = "city";
    state.focusCityId = null;
  }
  if (level === "county" && state.focusCityId) {
    state.mapLevel = "county";
  }
  if (level === "street" && state.focusCountyId) {
    state.mapLevel = "street";
  }
  resetMapPan(false);
  render();
}

function setMapZoom(direction) {
  const previous = state.mapZoom;
  const next = direction === "in" ? previous + 0.15 : previous - 0.15;
  state.mapZoom = clamp(Math.round(next * 100) / 100, 0.65, 1.65);
  const viewport = document.querySelector("[data-map-viewport]");
  const worldEl = viewport?.querySelector?.(".map-world");
  if (viewport && worldEl) {
    state.mapPan = clampPan(state.mapPan.x, state.mapPan.y, viewport, worldEl);
  }
  render();
}

function defaultMapPan() {
  const viewport = document.querySelector("[data-map-viewport]");
  const rect = viewport?.getBoundingClientRect?.() || { width: 1000, height: 620 };
  const worldSize = mapWorldSize();
  const nodes = mapNodes();
  const focus = nodes.length
    ? nodes.reduce((box, node) => ({
      minX: Math.min(box.minX, node.x),
      maxX: Math.max(box.maxX, node.x),
      minY: Math.min(box.minY, node.y),
      maxY: Math.max(box.maxY, node.y),
    }), { minX: 100, maxX: 0, minY: 100, maxY: 0 })
    : { minX: 50, maxX: 50, minY: 50, maxY: 50 };
  const centerX = ((focus.minX + focus.maxX) / 2 / 100) * worldSize.width * state.mapZoom;
  const centerY = ((focus.minY + focus.maxY) / 2 / 100) * worldSize.height * state.mapZoom;
  const rawX = Math.round(rect.width / 2 - centerX);
  const rawY = Math.round(rect.height / 2 - centerY);
  const minX = Math.min(20, rect.width - worldSize.width * state.mapZoom - 20);
  const minY = Math.min(20, rect.height - worldSize.height * state.mapZoom - 20);
  return {
    x: clamp(rawX, minX, 20),
    y: clamp(rawY, minY, 20),
  };
}

function mapWorldSize() {
  return state.mapLevel === "street"
    ? { width: streetTileSpec.width, height: streetTileSpec.height }
    : { width: 1800, height: 1200 };
}

function applyMapTransform(worldEl) {
  if (!worldEl) return;
  worldEl.style.transform = `translate(${state.mapPan.x}px, ${state.mapPan.y}px) scale(${state.mapZoom})`;
  document.querySelectorAll(".zoom-label").forEach((label) => {
    label.textContent = `${Math.round(state.mapZoom * 100)}%`;
  });
}

function resetMapPan(shouldRender = true) {
  state.mapPan = defaultMapPan();
  if (shouldRender) render();
}

function showMapOverview() {
  state.mapZoom = 0.65;
  resetMapPan(false);
  render();
}

function centerMapOnCurrentLocation() {
  const nodes = mapNodes();
  const point = playerMarkerPoint(nodes) || displayPointForMap(pointForCurrent(), nodes);
  centerMapOnPoint(point);
}

function centerMapOnPoint(point) {
  if (!point) return;
  const viewport = document.querySelector("[data-map-viewport]");
  const worldEl = viewport?.querySelector?.(".map-world");
  if (!viewport || !worldEl) return;
  const rect = viewport.getBoundingClientRect();
  const worldSize = mapWorldSize();
  const rawX = Math.round(rect.width / 2 - (point.x / 100) * worldSize.width * state.mapZoom);
  const rawY = Math.round(rect.height / 2 - (point.y / 100) * worldSize.height * state.mapZoom);
  state.mapPan = clampPan(rawX, rawY, viewport, worldEl);
  render();
}

function clampPan(x, y, viewport, worldEl) {
  const viewportRect = viewport.getBoundingClientRect();
  const worldSize = mapWorldSize();
  const worldWidth = worldSize.width * state.mapZoom;
  const worldHeight = worldSize.height * state.mapZoom;
  const minX = Math.min(20, viewportRect.width - worldWidth - 20);
  const minY = Math.min(20, viewportRect.height - worldHeight - 20);
  return {
    x: clamp(x, minX, 20),
    y: clamp(y, minY, 20),
  };
}

function pointInsideMapViewport(event, viewport) {
  const rect = viewport.getBoundingClientRect();
  return {
    id: event.pointerId,
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

function distanceBetweenPoints(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function midpointBetweenPoints(a, b) {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  };
}

function releaseMapPointer(pointer, pointerId) {
  try {
    pointer?.viewport?.releasePointerCapture?.(pointerId);
  } catch (error) {
    // Some mobile browsers release captured pointers automatically before pointerup.
  }
}

function beginMapPinch(viewport, worldEl) {
  const points = [...mapPointers.values()];
  if (points.length < 2 || !viewport || !worldEl) return;
  const [first, second] = points;
  const center = midpointBetweenPoints(first, second);
  const startDistance = Math.max(distanceBetweenPoints(first, second), 1);
  state.pinch = {
    viewport,
    worldEl,
    startDistance,
    startZoom: state.mapZoom,
    anchorWorldX: (center.x - state.mapPan.x) / state.mapZoom,
    anchorWorldY: (center.y - state.mapPan.y) / state.mapZoom,
    moved: false,
  };
  state.drag = null;
  viewport.classList.add("dragging");
}

function updateMapPinch(event) {
  if (!state.pinch || mapPointers.size < 2) return false;
  event.preventDefault();
  const points = [...mapPointers.values()];
  const [first, second] = points;
  const center = midpointBetweenPoints(first, second);
  const distance = Math.max(distanceBetweenPoints(first, second), 1);
  const nextZoom = clamp(Math.round(state.pinch.startZoom * (distance / state.pinch.startDistance) * 100) / 100, 0.65, 1.65);
  state.mapZoom = nextZoom;
  const rawX = center.x - state.pinch.anchorWorldX * nextZoom;
  const rawY = center.y - state.pinch.anchorWorldY * nextZoom;
  state.mapPan = clampPan(rawX, rawY, state.pinch.viewport, state.pinch.worldEl);
  state.pinch.moved = true;
  state.ignoreNextMapClick = true;
  state.ignoreNextMapClickUntil = Date.now() + 260;
  applyMapTransform(state.pinch.worldEl);
  return true;
}

function finishMapPinch() {
  if (!state.pinch) return false;
  const viewport = state.pinch.viewport;
  viewport.classList.remove("dragging");
  state.pinch = null;
  state.drag = null;
  state.ignoreNextMapClick = true;
  state.ignoreNextMapClickUntil = Date.now() + 260;
  return true;
}

function advanceNaturalTime(deltaSeconds) {
  if (state.gameOver) return;
  if (state.clockSpeed <= 0) return;
  const previousStockStatus = state.activeTab === "stocks" ? stockMarketStatus(state.time).label : "";
  const targetTime = state.time + deltaSeconds * 60 * state.clockSpeed;
  let needsPanelRender = false;

  if (state.pendingAction && state.time >= state.pendingAction.end) {
    needsPanelRender = processTimeSystems() || needsPanelRender;
  }

  if (state.pendingAction && targetTime >= state.pendingAction.end) {
    state.time = state.pendingAction.end;
    needsPanelRender = processTimeSystems() || needsPanelRender;
    const completedAction = state.pendingAction;
    const completion = pendingCompletion;
    state.pendingAction = null;
    pendingCompletion = null;
    if (completion) completion();
    if (completedAction.category !== "睡觉") {
      maybeSuddenDeath(completedAction.label, completedAction.deathRiskMinutes || 60);
      if (!state.gameOver && (state.stamina <= 0 || state.energy <= 0 || state.sleepDebtMinutes > 0)) showSleepPrompt();
    }
    needsPanelRender = processTimeSystems() || needsPanelRender;
    needsPanelRender = true;
  } else {
    state.time = targetTime;
    needsPanelRender = processTimeSystems() || needsPanelRender;
  }
  if (state.activeTab === "city" && state.pendingAction?.category === "移动") needsPanelRender = true;
  if (state.activeTab === "business" && ["商业", "开店", "招聘", "经营优化", "公司优化"].includes(state.pendingAction?.category)) needsPanelRender = true;
  if (state.activeTab === "stocks" && previousStockStatus !== stockMarketStatus(state.time).label) needsPanelRender = true;
  render({ panel: needsPanelRender });
}

function processTimeSystems() {
  const stockMoved = processDailyStockMarket();
  const costsMoved = processMonthlyCosts();
  return stockMoved || costsMoved;
}

function processDailyStockMarket() {
  let updated = false;
  if (!state.nextStockMarketUpdate) state.nextStockMarketUpdate = nextStockMarketUpdateAfter(state.time);
  while (state.time >= state.nextStockMarketUpdate) {
    const updateTime = state.nextStockMarketUpdate;
    const beforeEquity = state.lastStockEquity || stockAccountEquity();
    updateStocks(updateTime);
    recordStockPerformance(updateTime, beforeEquity);
    state.nextStockMarketUpdate = nextStockMarketUpdateAfter(updateTime);
    state.stockMarketDays += 1;
    updated = true;
  }
  return updated;
}

function processMonthlyCosts() {
  let updated = false;
  while (state.time >= state.nextPayroll) {
    updated = true;
    processSecretaryPayroll();
    if (state.ownedVehicles.includes("privatePlane")) {
      const maintenance = vehicles.privatePlane.monthlyMaintenance;
      state.cash -= maintenance;
      addLedger("私人飞机月维护", -maintenance);
      addLog(`支付私人飞机月维护 ${money(maintenance)}。`);
    }
    state.loans.slice().forEach((loan) => {
      const interest = Math.round(loan.outstanding * loan.apr / 12);
      const principal = Math.min(loan.outstanding, Math.max(0, loan.monthlyPayment - interest));
      const payment = Math.min(loan.outstanding + interest, loan.monthlyPayment);
      state.cash -= payment;
      loan.outstanding = Math.max(0, loan.outstanding - principal);
      loan.remainingMonths -= 1;
      addLedger(`${loan.name}月供`, -payment);
      addLog(`支付${loan.name}月供 ${money(payment)}。`);
      if (loan.outstanding <= 0 || loan.remainingMonths <= 0) {
        state.loans = state.loans.filter((item) => item.id !== loan.id);
        addLog(`${loan.name}已经还清。`);
      }
    });
    state.nextPayroll += 30 * 1440;
  }
  return updated;
}

document.addEventListener("click", (event) => {
  if (state.ignoreNextMapClick && Date.now() > state.ignoreNextMapClickUntil) {
    state.ignoreNextMapClick = false;
  }
  if (state.ignoreNextMapClick && event.target.closest("[data-map-viewport]")) {
    state.ignoreNextMapClick = false;
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  const button = event.target.closest("button");
  if (!button) return;
  playClickSound();
  if (state.gameOver && !button.dataset.inheritanceChoice) return;

  if (button.dataset.sleepNow) {
    sleep();
  }
  if (button.dataset.keepOverdraft) {
    state.sleepPromptDismissedUntil = state.time + 8 * 60;
    closeDialog(sleepDialog);
    addLog("你选择继续透支，8小时内不再提醒睡觉。");
    render();
  }
  if (button.dataset.inheritanceChoice === "continue") {
    if (state.pendingInheritance) applyInheritance(state.pendingInheritance);
    render();
  }
  if (button.dataset.inheritanceChoice === "end") {
    closeDialog(inheritanceDialog);
    state.pendingInheritance = null;
    showGameOver("继承人放弃接盘", "继承人拒绝承担负资产，本局商业档案终止。");
    render();
  }
  if (button.dataset.willMode) {
    state.will = { mode: button.dataset.willMode, targetId: button.dataset.willTarget || "auto" };
    addLog(`遗嘱已更新：${willTargetLabel()}。`);
    render();
  }

  if (button.dataset.tab) {
    if (button.dataset.tab === "news") {
      if (state.activeTab === "news") {
        state.newsSeenIds = [];
        state.selectedNewsId = null;
        state.activeTab = state.newsReturnTab || "city";
      } else {
        state.newsReturnTab = state.activeTab || "city";
        state.activeTab = "news";
      }
      render();
      return;
    }
    if (state.activeTab === "news") {
      state.newsSeenIds = [];
      state.selectedNewsId = null;
    }
    state.activeTab = button.dataset.tab;
    render();
  }
  if (button.dataset.clockSpeed !== undefined) {
    state.clockSpeed = Number(button.dataset.clockSpeed);
    render();
  }
  if (button.dataset.newsFilter) {
    state.newsFilter = button.dataset.newsFilter;
    state.selectedNewsId = null;
    state.newsSeenIds = [];
    render();
  }
  if (button.dataset.newsOpen) {
    openNews(button.dataset.newsOpen);
  }
  if (button.dataset.stockToggle) {
    state.expandedStock = state.expandedStock === button.dataset.stockToggle ? null : button.dataset.stockToggle;
    render();
  }
  if (button.dataset.stockTransfer) {
    transferStockCash(button.dataset.stockTransfer);
  }
  if (button.dataset.assetReport) {
    state.showAssetReport = !state.showAssetReport;
    render();
  }
  if (button.dataset.repayWageDebt) {
    repayWageDebt();
  }
  if (button.dataset.audioToggle) {
    toggleAudioSetting(button.dataset.audioToggle);
  }
  if (button.dataset.travelVehicle) {
    state.travelVehicle = button.dataset.travelVehicle;
    state.travelVehicleMenuOpen = false;
    render();
  }
  if (button.dataset.toggleTravelMenu) {
    state.travelVehicleMenuOpen = !state.travelVehicleMenuOpen;
    render();
  }
  if (button.dataset.moveSelected) {
    moveToSelected();
  }
  if (button.dataset.resetMap) {
    resetMapPan();
  }
  if (button.dataset.mapOverview) {
    showMapOverview();
  }
  if (button.dataset.mapCurrent) {
    centerMapOnCurrentLocation();
  }
  if (button.dataset.mapZoom) {
    setMapZoom(button.dataset.mapZoom);
  }
  if (button.dataset.vehicleSelect) {
    selectVehicle(button.dataset.vehicleSelect);
  }
  if (button.dataset.buyVehicle) {
    buyVehicle(button.dataset.buyVehicle);
  }
  if (button.dataset.action === "sleep") {
    sleep();
  }
  if (button.dataset.action === "advance-week") {
    advanceWeek();
    render();
  }
  if (button.dataset.openCompanyDialog) {
    openCompanyDialog();
  }
  if (button.dataset.manageBusiness) {
    state.selectedBusinessManageId = button.dataset.manageBusiness;
    state.selectedCompanyManageId = null;
    render();
  }
  if (button.dataset.manageCompany) {
    state.selectedCompanyManageId = button.dataset.manageCompany;
    state.selectedBusinessManageId = null;
    render();
  }
  if (button.dataset.mapNode) {
    handleMapNode(button.dataset.mapNode, button.dataset.id);
  }
  if (button.dataset.mapLevel) {
    setMapLevel(button.dataset.mapLevel);
  }
  if (button.dataset.openProject) {
    openProjectDialog(button.dataset.openProject);
  }
  if (button.dataset.openLease) {
    openLeaseDialog(button.dataset.openLease);
  }
  if (button.dataset.leasePlace) {
    leasePlace(button.dataset.leasePlace);
  }
  if (button.dataset.project) {
    startBusiness(button.dataset.project, button.dataset.projectMode || "hire");
  }
  if (button.dataset.hireStaff) {
    hireStaff(button.dataset.hireStaff, button.dataset.roleId);
  }
  if (button.dataset.hireCompanyStaff) {
    hireCompanyStaff(button.dataset.hireCompanyStaff, button.dataset.roleId);
  }
  if (button.dataset.businessOptimize) {
    applyBusinessOptimization(button.dataset.businessOptimize, button.dataset.optimizationId);
  }
  if (button.dataset.companyOptimize) {
    applyCompanyOptimization(button.dataset.companyOptimize, button.dataset.optimizationId);
  }
  if (button.dataset.stockTradeOpen) {
    openStockTradeDialog(button.dataset.symbol, button.dataset.stockTradeOpen);
  }
  if (button.dataset.stockTradePreset) {
    applyStockTradePreset(button.dataset.stockTradePreset);
  }
  if (button.dataset.stockTradeSubmit) {
    submitStockTrade();
  }
  if (button.dataset.hireSecretary) {
    hireSecretary(button.dataset.hireSecretary);
  }
  if (button.dataset.secretaryAction) {
    secretaryAction(button.dataset.secretaryAction);
  }
  if (button.dataset.relationId) {
    convertRelationship(button.dataset.relationId, button.dataset.relationType);
  }
  if (button.dataset.course) {
    enrollCourse(button.dataset.course);
  }
  if (button.dataset.company) {
    startCompany(button.dataset.company);
  }
  if (button.dataset.bankLoan) {
    applyLoan(button.dataset.bankLoan);
  }
  if (button.dataset.loanRepay) {
    repayLoan(button.dataset.loanRepay);
  }
  if (button.dataset.familyAction === "marry") {
    marry();
  }
  if (button.dataset.familyAction === "child") {
    haveChild();
  }
  if (button.dataset.familyAction === "heir") {
    transferToHeir();
  }
  if (button.dataset.educationInvest) {
    investEducation(button.dataset.childId, Number(button.dataset.educationInvest));
  }
});

document.addEventListener("input", (event) => {
  if (event.target.matches("[data-stock-trade-range]")) {
    state.stockTradeShares = Number(event.target.value || 0);
    renderStockTradeDialog();
  }
});

document.addEventListener("change", (event) => {
  if (event.target.matches("[data-stock-trade-number]")) {
    state.stockTradeShares = Number(event.target.value || 0);
    renderStockTradeDialog();
  }
});

document.addEventListener("click", (event) => {
  const row = event.target.closest("[data-stock-row]");
  if (!row || event.target.closest("button")) return;
  playClickSound();
  state.expandedStock = state.expandedStock === row.dataset.stockRow ? null : row.dataset.stockRow;
  render();
});

document.addEventListener("pointerdown", (event) => {
  const viewport = event.target.closest("[data-map-viewport]");
  if (!viewport) return;
  event.preventDefault();
  const worldEl = viewport.querySelector(".map-world");
  const nodeButton = event.target.closest("[data-map-node]");
  mapPointers.set(event.pointerId, {
    ...pointInsideMapViewport(event, viewport),
    viewport,
    worldEl,
  });
  viewport.setPointerCapture?.(event.pointerId);
  if (mapPointers.size >= 2) {
    beginMapPinch(viewport, worldEl);
    return;
  }
  state.drag = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    panX: state.mapPan.x,
    panY: state.mapPan.y,
    viewport,
    worldEl,
    nodeButton,
    moved: false,
  };
});

document.addEventListener("pointermove", (event) => {
  const trackedPointer = mapPointers.get(event.pointerId);
  if (trackedPointer) {
    mapPointers.set(event.pointerId, {
      ...pointInsideMapViewport(event, trackedPointer.viewport),
      viewport: trackedPointer.viewport,
      worldEl: trackedPointer.worldEl,
    });
  }
  if (state.pinch) {
    updateMapPinch(event);
    return;
  }
  if (!state.drag || state.drag.pointerId !== event.pointerId) return;
  const dx = event.clientX - state.drag.startX;
  const dy = event.clientY - state.drag.startY;
  if (!state.drag.moved && Math.hypot(dx, dy) < mapDragThreshold) return;
  event.preventDefault();
  state.drag.moved = true;
  state.drag.viewport.classList.add("dragging");
  const next = clampPan(
    state.drag.panX + dx,
    state.drag.panY + dy,
    state.drag.viewport,
    state.drag.worldEl,
  );
  state.mapPan = next;
  applyMapTransform(state.drag.worldEl);
});

document.addEventListener("pointerup", (event) => {
  const trackedPointer = mapPointers.get(event.pointerId);
  releaseMapPointer(trackedPointer, event.pointerId);
  mapPointers.delete(event.pointerId);
  if (state.pinch) {
    if (mapPointers.size >= 2) {
      beginMapPinch(state.pinch.viewport, state.pinch.worldEl);
      return;
    }
    finishMapPinch();
    return;
  }
  if (!state.drag || state.drag.pointerId !== event.pointerId) return;
  const nodeButton = state.drag.nodeButton;
  const wasMoved = state.drag.moved;
  const viewport = state.drag.viewport;
  viewport.classList.remove("dragging");
  state.drag = null;
  if (!wasMoved && nodeButton) {
    state.ignoreNextMapClick = true;
    state.ignoreNextMapClickUntil = Date.now() + 260;
    playClickSound();
    handleMapNode(nodeButton.dataset.mapNode, nodeButton.dataset.id);
    return;
  }
  if (wasMoved) {
    state.ignoreNextMapClick = true;
    state.ignoreNextMapClickUntil = Date.now() + 220;
  }
});

document.addEventListener("pointercancel", (event) => {
  const trackedPointer = mapPointers.get(event.pointerId);
  releaseMapPointer(trackedPointer, event.pointerId);
  mapPointers.delete(event.pointerId);
  if (state.pinch) {
    finishMapPinch();
    return;
  }
  if (!state.drag || state.drag.pointerId !== event.pointerId) return;
  state.drag.viewport.classList.remove("dragging");
  state.drag = null;
});

setInterval(() => advanceNaturalTime(0.25), 250);

render();
