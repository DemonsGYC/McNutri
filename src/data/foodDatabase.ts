import type { MenuItem } from '../types';

export const FOOD_DATABASE: MenuItem[] = [
  // ================= Klassiker (主食) =================
  {
    id: 'de_mcd_mcplant',
    name: 'McPlant®',
    category: 'klassiker',
    base_calories: 420,
    description: 'Pflanzenbasiertes Patty, vegane Schmelzkäsezubereitung, frischer Salat, Tomaten, Gurken und die legendäre Sandwich-Soße.',
    imageUrl: 'https://s7d1.scene7.com/is/image/mcdonalds/DC_202109_4323_McPlant_832x472',
    atoms: [
      { id: 'mcplant_bun', name: '经典面包 (McPlant-Bun)', type: 'carb', calories: 150, protein: 5.2, fat: 1.8, carbs: 28, salt: 0.45, removable: false, default: true },
      { id: 'mcplant_patty', name: '植物肉饼 (Pflanzenbasiertes Patty)', type: 'base', calories: 135, protein: 15.6, fat: 7.8, carbs: 2.1, salt: 0.58, removable: false, default: true },
      { id: 'mcplant_sauce', name: '植物沙拉酱 (Sandwich-Soße)', type: 'sauce', calories: 60, protein: 0.1, fat: 6.2, carbs: 1.1, salt: 0.18, removable: true, default: true },
      { id: 'mcplant_cheese', name: '植物纯素芝士 (Vegane Schmelzkäsezubereitung)', type: 'cheese', calories: 48, protein: 0.1, fat: 3.8, carbs: 1.6, salt: 0.32, removable: true, default: true },
      { id: 'mcplant_lettuce', name: '新鲜生菜 (Salat)', type: 'topping', calories: 6, protein: 0.3, fat: 0, carbs: 0.6, salt: 0.01, removable: true, default: true },
      { id: 'mcplant_tomato', name: '鲜切番茄片 (Tomate)', type: 'topping', calories: 12, protein: 0.4, fat: 0.1, carbs: 1.8, salt: 0.01, removable: true, default: true },
      { id: 'mcplant_pickle', name: '酸黄瓜片 (Gurke)', type: 'topping', calories: 4, protein: 0.1, fat: 0, carbs: 0.6, salt: 0.01, removable: true, default: true }
    ]
  },
  {
    id: 'de_mcd_bigtastybacon',
    name: 'Big Tasty® Bacon',
    category: 'klassiker',
    base_calories: 850,
    description: 'Saftiges Rindfleisch, herzhafter Bacon, zart schmelzender Käse, frische Tomaten, Salat und die unverwechselbare Big Tasty Rauchsoße.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/McDonald%27s_Big_Tasty_Bacon.jpg/640px-McDonald%27s_Big_Tasty_Bacon.jpg',
    atoms: [
      { id: 'bigtasty_bun', name: '大面包 (Big Tasty Bun)', type: 'carb', calories: 240, protein: 8.2, fat: 4.8, carbs: 41, salt: 0.78, removable: false, default: true },
      { id: 'bigtasty_beef', name: '纯牛肉饼 (Rindfleischpatty)', type: 'base', calories: 250, protein: 25, fat: 16.5, carbs: 0, salt: 0.42, removable: false, default: true },
      { id: 'bigtasty_sauce', name: '大美味烟熏酱 (Big Tasty Soße)', type: 'sauce', calories: 195, protein: 0.6, fat: 20.2, carbs: 2.8, salt: 0.55, removable: true, default: true },
      { id: 'bigtasty_bacon', name: '香脆培根 (Bacon)', type: 'topping', calories: 85, protein: 5.5, fat: 7.2, carbs: 0.2, salt: 0.48, removable: true, default: true },
      { id: 'bigtasty_cheese', name: '切达芝士 (Käse)', type: 'cheese', calories: 68, protein: 4.1, fat: 5.6, carbs: 0.5, salt: 0.42, removable: true, default: true },
      { id: 'bigtasty_lettuce', name: '新鲜生菜 (Salat)', type: 'topping', calories: 8, protein: 0.4, fat: 0, carbs: 0.8, salt: 0.01, removable: true, default: true },
      { id: 'bigtasty_tomato', name: '鲜切番茄片 (Tomate)', type: 'topping', calories: 14, protein: 0.5, fat: 0.1, carbs: 2.1, salt: 0.01, removable: true, default: true }
    ]
  },
  {
    id: 'de_mcd_mcrip',
    name: 'McRip®',
    category: 'klassiker',
    base_calories: 485,
    description: 'Herzhaftes Schweinefleischpatty, würzige McRip-Soße, knackige Zwiebeln und Gurkenscheiben auf einem länglichen Brötchen.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/McD-McRib.jpg/640px-McD-McRib.jpg',
    atoms: [
      { id: 'mcrip_bun', name: '麦肋排长Brötchen (McRip-Brötchen)', type: 'carb', calories: 175, protein: 6.2, fat: 2.6, carbs: 32, salt: 0.56, removable: false, default: true },
      { id: 'mcrip_pork', name: '经典猪肉排 (Schweinefleischpatty)', type: 'base', calories: 225, protein: 18.2, fat: 16.2, carbs: 0.6, salt: 0.52, removable: false, default: true },
      { id: 'mcrip_sauce', name: '肋排烧烤酱 (McRip-Soße)', type: 'sauce', calories: 75, protein: 0.4, fat: 0.4, carbs: 17, salt: 0.68, removable: true, default: true },
      { id: 'mcrip_onion', name: '新鲜洋葱碎 (Zwiebeln)', type: 'topping', calories: 6, protein: 0.2, fat: 0, carbs: 1.2, salt: 0.01, removable: true, default: true },
      { id: 'mcrip_pickle', name: '清脆酸黄瓜片 (Gurkenscheiben)', type: 'topping', calories: 4, protein: 0.1, fat: 0, carbs: 0.8, salt: 0.12, removable: true, default: true }
    ]
  },
  {
    id: 'de_mcd_bigmac',
    name: 'Big Mac®',
    category: 'klassiker',
    base_calories: 545,
    description: 'Zwei Rindfleischpatties, Schmelzkäse, knackiger Salat, Gurken, Zwiebeln und die unnachahmliche Big Mac Soße.',
    imageUrl: 'https://s7d1.scene7.com/is/image/mcdonalds/DC_201907_0005_BigMac_832x472',
    atoms: [
      { id: 'bigmac_bun', name: '三层芝麻面包 (Big Mac Bun)', type: 'carb', calories: 180, protein: 5.5, fat: 2.0, carbs: 35, salt: 0.45, removable: false, default: true },
      { id: 'bigmac_beef', name: '双层纯牛肉饼 (Beef-Patties)', type: 'base', calories: 180, protein: 18.5, fat: 11.0, carbs: 0, salt: 0.30, removable: false, default: true },
      { id: 'bigmac_sauce', name: '特制巨无霸酱 (Big Mac Soße)', type: 'sauce', calories: 105, protein: 0.5, fat: 10.5, carbs: 2.0, salt: 0.65, removable: true, default: true },
      { id: 'bigmac_cheese', name: '切达芝士片 (Cheddar-Käse)', type: 'cheese', calories: 60, protein: 3.5, fat: 5.0, carbs: 0.5, salt: 0.45, removable: true, default: true },
      { id: 'bigmac_lettuce', name: '新鲜生菜丝 (Eisbergsalat)', type: 'topping', calories: 10, protein: 0.3, fat: 0, carbs: 1.0, salt: 0.05, removable: true, default: true },
      { id: 'bigmac_pickle', name: '清脆酸黄瓜 (Gewürzgurken)', type: 'topping', calories: 5, protein: 0.1, fat: 0, carbs: 1.5, salt: 0.35, removable: true, default: true },
      { id: 'bigmac_onion', name: '洋葱碎 (Zwiebeln)', type: 'topping', calories: 5, protein: 0.1, fat: 0, carbs: 1.0, salt: 0.05, removable: true, default: true }
    ]
  },
  {
    id: 'de_mcd_royalkaese',
    name: 'Hamburger Royal® Käse',
    category: 'klassiker',
    base_calories: 505,
    description: 'Saftiges Rindfleischpatty, reichlich Käse, Heinz Ketchup, Senf, Zwiebeln und Gurke auf softem Sesambrötchen.',
    imageUrl: 'https://s7d1.scene7.com/is/image/mcdonalds/DC_202006_0378_QuarterPounderwithCheese_832x472',
    atoms: [
      { id: 'royalkaese_bun', name: '皇家芝麻面包 (Royal Bun)', type: 'carb', calories: 165, protein: 5.2, fat: 2.0, carbs: 31, salt: 0.45, removable: false, default: true },
      { id: 'royalkaese_beef', name: '皇家大牛肉饼 (Large Beef-Patty)', type: 'base', calories: 210, protein: 20.8, fat: 14.5, carbs: 0, salt: 0.35, removable: false, default: true },
      { id: 'royalkaese_cheese', name: '切达芝士 (Cheddar-Käse)', type: 'cheese', calories: 110, protein: 6.8, fat: 10.0, carbs: 1.0, salt: 0.90, removable: true, default: true },
      { id: 'royalkaese_ketchup', name: '美式番茄酱 (Heinz Ketchup)', type: 'sauce', calories: 15, protein: 0.1, fat: 0, carbs: 3.5, salt: 0.40, removable: true, default: true },
      { id: 'royalkaese_mustard', name: '黄芥末酱 (Senf)', type: 'sauce', calories: 3, protein: 0.1, fat: 0.1, carbs: 0.2, salt: 0.10, removable: true, default: true },
      { id: 'royalkaese_pickle', name: '清脆酸黄瓜片 (Gewürzgurken)', type: 'topping', calories: 5, protein: 0.1, fat: 0, carbs: 1.5, salt: 0.35, removable: true, default: true },
      { id: 'royalkaese_onion', name: '新鲜洋葱碎 (Zwiebeln)', type: 'topping', calories: 5, protein: 0.1, fat: 0, carbs: 1.2, salt: 0.05, removable: true, default: true }
    ]
  },
  {
    id: 'de_mcd_royalts',
    name: 'Hamburger Royal® TS',
    category: 'klassiker',
    base_calories: 536,
    description: 'Bestehend aus Rindfleischpatty, Käse, frischem Salat, Tomaten, Zwiebeln und cremiger Sandwich-Soße.',
    imageUrl: 'https://s7d1.scene7.com/is/image/mcdonalds/DC_201907_0114_QuarterPounderwithCheeseDeluxe_832x472',
    atoms: [
      { id: 'royalts_bun', name: '皇家芝麻面包 (Royal Bun)', type: 'carb', calories: 165, protein: 5.2, fat: 2.0, carbs: 31, salt: 0.45, removable: false, default: true },
      { id: 'royalts_beef', name: '皇家大牛肉饼 (Large Beef-Patty)', type: 'base', calories: 210, protein: 20.8, fat: 14.5, carbs: 0, salt: 0.69, removable: false, default: true },
      { id: 'royalts_sauce', name: '特制皇家沙拉酱 (Sandwich-Soße)', type: 'sauce', calories: 80, protein: 0.1, fat: 8.2, carbs: 1.2, salt: 0.20, removable: true, default: true },
      { id: 'royalts_cheese', name: '切达芝士 (Cheddar-Käse)', type: 'cheese', calories: 55, protein: 3.4, fat: 5.0, carbs: 0.5, salt: 0.45, removable: true, default: true },
      { id: 'royalts_lettuce', name: '新鲜生菜丝 (Eisbergsalat)', type: 'topping', calories: 10, protein: 0.3, fat: 0, carbs: 1.0, salt: 0.05, removable: true, default: true },
      { id: 'royalts_tomato', name: '鲜切番茄 (Tomaten)', type: 'topping', calories: 12, protein: 0.4, fat: 0.1, carbs: 1.8, salt: 0.01, removable: true, default: true },
      { id: 'royalts_onion', name: '新鲜洋葱片 (Zwiebeln)', type: 'topping', calories: 5, protein: 0.1, fat: 0, carbs: 1.0, salt: 0.05, removable: true, default: true }
    ]
  },
  {
    id: 'de_mcd_mcchicken',
    name: 'McChicken® Classic',
    category: 'klassiker',
    base_calories: 440,
    description: 'Feines, paniertes Hähnchenbrustfleisch, knackiger Eisbergsalat und würzige Sandwich-Soße auf klassischem Sesambrötchen.',
    imageUrl: 'https://s7d1.scene7.com/is/image/mcdonalds/DC_201907_0055_McChicken_832x472',
    atoms: [
      { id: 'mcchicken_bun', name: '芝麻汉堡面包 (Sesame Bun)', type: 'carb', calories: 150, protein: 5.0, fat: 2.0, carbs: 28, salt: 0.45, removable: false, default: true },
      { id: 'mcchicken_patty', name: '香脆炸鸡排 (Chicken Patty)', type: 'base', calories: 200, protein: 12.5, fat: 9.0, carbs: 17, salt: 1.10, removable: false, default: true },
      { id: 'mcchicken_sauce', name: '特制沙拉酱 (Sandwich-Soße)', type: 'sauce', calories: 80, protein: 0.1, fat: 8.0, carbs: 1.0, salt: 0.20, removable: true, default: true },
      { id: 'mcchicken_lettuce', name: '新鲜生菜丝 (Eisbergsalat)', type: 'topping', calories: 10, protein: 0.4, fat: 0, carbs: 1.0, salt: 0.05, removable: true, default: true }
    ]
  },
  {
    id: 'de_mcd_filetofish',
    name: 'Filet-o-Fish®',
    category: 'klassiker',
    base_calories: 375,
    description: 'Goldbraun paniertes Fischfilet aus nachhaltiger Fischerei, herzhafte Tartar-Soße und eine halbe Scheibe Schmelzkäse.',
    imageUrl: 'https://s7d1.scene7.com/is/image/mcdonalds/DC_202001_8963_FiletOFish_832x472',
    atoms: [
      { id: 'filetofish_bun', name: '柔软蒸面包 (Steamed Bun)', type: 'carb', calories: 130, protein: 4.5, fat: 2.0, carbs: 24, salt: 0.45, removable: false, default: true },
      { id: 'filetofish_fish', name: '金黄鳕鱼排 (Fish Patty)', type: 'base', calories: 140, protein: 9.0, fat: 4.0, carbs: 11, salt: 0.60, removable: false, default: true },
      { id: 'filetofish_sauce', name: '特制塔塔酱 (Tartar-Sauce)', type: 'sauce', calories: 75, protein: 0.1, fat: 4.5, carbs: 1.5, salt: 0.40, removable: true, default: true },
      { id: 'filetofish_cheese', name: '切达芝士片半片 (Cheddar-Käse)', type: 'cheese', calories: 30, protein: 1.7, fat: 2.5, carbs: 0.25, salt: 0.25, removable: true, default: true }
    ]
  },
  {
    id: 'de_mcd_triplecheese',
    name: 'Triple Cheeseburger',
    category: 'klassiker',
    base_calories: 603,
    description: 'Drei saftige Rindfleischpatties, dreifach Schmelzkäse, Senf, Heinz Ketchup, Gewürzgurken und frische Zwiebeln.',
    imageUrl: 'https://s7d1.scene7.com/is/image/mcdonalds/DC_202006_4243_TripleCheeseburger_832x472',
    atoms: [
      { id: 'triplecheese_bun', name: '标准汉堡面包 (Standard Bun)', type: 'carb', calories: 140, protein: 4.5, fat: 2.0, carbs: 26, salt: 0.45, removable: false, default: true },
      { id: 'triplecheese_beef', name: '三片纯牛肉饼 (Beef-Patties)', type: 'base', calories: 270, protein: 25.5, fat: 17.0, carbs: 0, salt: 0.45, removable: false, default: true },
      { id: 'triplecheese_cheese', name: '三片切达芝士 (Cheddar-Käse)', type: 'cheese', calories: 165, protein: 10.2, fat: 15.0, carbs: 1.5, salt: 1.35, removable: true, default: true },
      { id: 'triplecheese_ketchup', name: '美式番茄酱 (Heinz Ketchup)', type: 'sauce', calories: 15, protein: 0.1, fat: 0, carbs: 3.5, salt: 0.40, removable: true, default: true },
      { id: 'triplecheese_mustard', name: '黄芥末酱 (Senf)', type: 'sauce', calories: 3, protein: 0.1, fat: 0.1, carbs: 0.2, salt: 0.10, removable: true, default: true },
      { id: 'triplecheese_pickle', name: '清脆酸黄瓜片 (Gewürzgurken)', type: 'topping', calories: 5, protein: 0.1, fat: 0, carbs: 1.5, salt: 0.35, removable: true, default: true },
      { id: 'triplecheese_onion', name: '脱水洋葱碎 (Zwiebeln)', type: 'topping', calories: 5, protein: 0.1, fat: 0, carbs: 1.0, salt: 0.05, removable: true, default: true }
    ]
  },

  // ================= Snacks & Beilagen (小食/配菜) =================
  {
    id: 'de_mcd_pommes',
    name: 'Pommes Frites',
    category: 'snacks_beilagen',
    base_calories: 340,
    description: 'Außen knusprig, innen feines Kartoffelaroma. Standardmäßig mit Salz.',
    imageUrl: 'https://s7d1.scene7.com/is/image/mcdonalds/DC_202002_6050_MediumFries_832x472',
    supportedSizes: ['S', 'M', 'L'],
    atoms: [
      { id: 'pommes_fries', name: '金黄细薯条 (Pommes)', type: 'carb', calories: 340, protein: 3.8, fat: 15.5, carbs: 44.5, salt: 0.08, removable: false, default: true },
      { id: 'pommes_salz', name: '表面撒盐 (Salz)', type: 'other', calories: 0, protein: 0, fat: 0, carbs: 0, salt: 0.52, removable: true, default: true }
    ]
  },
  {
    id: 'de_mcd_mcnuggets',
    name: 'Chicken McNuggets®',
    category: 'snacks_beilagen',
    base_calories: 270,
    description: 'Knusprig panierte Hähnchenbruststücke, außen super kross und innen zart. Beliebt in 6er, 9er oder 20er Portionen.',
    imageUrl: 'https://s7d1.scene7.com/is/image/mcdonalds/DC_202002_0278_6PieceChickenMcNuggets_832x472',
    supportedSizes: ['6er', '9er', '20er'],
    atoms: [
      { id: 'mcnuggets_meat', name: '黄金鸡块 (McNuggets)', type: 'base', calories: 270, protein: 16.0, fat: 16.0, carbs: 16.0, salt: 0.90, removable: false, default: true }
    ]
  },
  {
    id: 'de_mcd_gitterkartoffeln',
    name: 'Gitterkartoffeln',
    category: 'snacks_beilagen',
    base_calories: 406,
    description: 'Knusprig und herzhaft gewürzte Kartoffel-Gitter. Der absolute Liebling als Special-Beilage.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Grid_fries.jpg/640px-Grid_fries.jpg',
    atoms: [
      { id: 'gitterkartoffeln_fries', name: '金黄卷卷/网状薯条 (Gitterkartoffeln)', type: 'carb', calories: 406, protein: 4.2, fat: 21.5, carbs: 49.0, salt: 2.00, removable: false, default: true }
    ]
  },
  {
    id: 'de_mcd_netzkartoffeln',
    name: 'Netzkartoffeln',
    category: 'snacks_beilagen',
    base_calories: 340,
    description: 'Kartoffel-Waffeln im Netz-Schnitt. Super knusprige Textur und herzhaft gewürzt.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Waffle_fries.jpg/640px-Waffle_fries.jpg',
    atoms: [
      { id: 'netzkartoffeln_waffles', name: '网格华夫薯饼 (Netzkartoffeln)', type: 'carb', calories: 340, protein: 3.8, fat: 17.5, carbs: 41.0, salt: 1.80, removable: false, default: true }
    ]
  },
  {
    id: 'de_mcd_gartensalat',
    name: 'Side Salad (Gartensalat)',
    category: 'snacks_beilagen',
    base_calories: 15,
    description: 'Ein knackiger Beilagensalat aus frischen Salatblättern mit Kirschtomaten und feinen Gurkenscheiben.',
    imageUrl: 'https://s7d1.scene7.com/is/image/mcdonalds/DC_202002_8130_SideSalad_832x472',
    atoms: [
      { id: 'gartensalat_leaves', name: '混合生菜叶 (Blattsalat)', type: 'topping', calories: 10, protein: 0.6, fat: 0.1, carbs: 1.5, salt: 0.02, removable: false, default: true },
      { id: 'gartensalat_tomgurk', name: '圣女果与黄瓜片 (Cherrytomaten & Gurkenscheiben)', type: 'topping', calories: 5, protein: 0.3, fat: 0, carbs: 1.0, salt: 0.01, removable: true, default: true }
    ]
  },

  // ================= Getränke (饮料) =================
  {
    id: 'de_mcd_cola_zero',
    name: 'Coca-Cola Zero Sugar',
    category: 'getraenke',
    base_calories: 0,
    description: 'Originaler Cola-Geschmack ohne Zucker und ohne Kalorien.',
    imageUrl: 'https://s7d1.scene7.com/is/image/mcdonalds/DC_201610_0576_CokeZero_Medium_832x472',
    supportedSizes: ['S', 'M', 'L'],
    atoms: [
      { id: 'cola_zero_liquid', name: '无糖可口可乐 (Coca-Cola Zero Sugar)', type: 'other', calories: 0, protein: 0, fat: 0, carbs: 0, salt: 0.02, removable: false, default: true },
      { id: 'cola_zero_ice', name: '清凉冰块 (Eiswürfel)', type: 'other', calories: 0, protein: 0, fat: 0, carbs: 0, salt: 0, removable: false, default: true }
    ]
  },
  {
    id: 'de_mcd_cola',
    name: 'Coca-Cola',
    category: 'getraenke',
    base_calories: 150,
    description: 'Der Klassiker – erfrischend und belebend.',
    imageUrl: 'https://s7d1.scene7.com/is/image/mcdonalds/DC_200906_1811_MediumCoke_832x472',
    supportedSizes: ['S', 'M', 'L'],
    atoms: [
      { id: 'cola_liquid', name: '经典可口可乐 (Coca-Cola)', type: 'other', calories: 150, protein: 0, fat: 0, carbs: 37, salt: 0.02, removable: false, default: true },
      { id: 'cola_ice', name: '清凉冰块 (Eiswürfel)', type: 'other', calories: 0, protein: 0, fat: 0, carbs: 0, salt: 0, removable: false, default: true }
    ]
  },
  {
    id: 'de_mcd_fanta',
    name: 'Fanta',
    category: 'getraenke',
    base_calories: 140,
    description: 'Erfrischungsgetränk mit Orangengeschmack.',
    imageUrl: 'https://s7d1.scene7.com/is/image/mcdonalds/DC_200906_2068_MediumFantaOrange_832x472',
    supportedSizes: ['S', 'M', 'L'],
    atoms: [
      { id: 'fanta_liquid', name: '经典芬达汽水 (Fanta Orange)', type: 'other', calories: 140, protein: 0, fat: 0, carbs: 34, salt: 0.02, removable: false, default: true },
      { id: 'fanta_ice', name: '清凉冰块 (Eiswürfel)', type: 'other', calories: 0, protein: 0, fat: 0, carbs: 0, salt: 0, removable: false, default: true }
    ]
  },
  {
    id: 'de_mcd_kaffee_schwarz',
    name: 'Kaffee Schwarz',
    category: 'getraenke',
    base_calories: 6,
    description: 'Frisch gebrühter Filterkaffee aus 100% Arabica-Bohnen.',
    imageUrl: 'https://s7d1.scene7.com/is/image/mcdonalds/DC_201906_1203_MediumPremiumRoastCoffee_832x472',
    supportedSizes: ['M', 'L'],
    atoms: [
      { id: 'kaffee_schwarz_liquid', name: '浓郁黑咖啡 (Kaffee Schwarz)', type: 'other', calories: 6, protein: 0.2, fat: 0, carbs: 1.1, salt: 0.01, removable: false, default: true }
    ]
  },

  // ================= Saucen & Dips (酱料/蘸酱) =================
  {
    id: 'de_mcd_suesssauer',
    name: 'Süßsauer-Soße',
    category: 'saucen_dips',
    base_calories: 52,
    description: 'Klassischer Dip mit fruchtigem Geschmack von Aprikosen und Pfirsichen.',
    imageUrl: 'https://s7d1.scene7.com/is/image/mcdonalds/DC_202002_2021_SweetSauerSauce_832x472',
    atoms: [
      { id: 'dip_suesssauer', name: '经典甜酸酱 (Süßsauer-Soße)', type: 'sauce', calories: 52, protein: 0.2, fat: 0.1, carbs: 12.5, salt: 0.32, removable: false, default: true }
    ]
  },
  {
    id: 'de_mcd_bbq',
    name: 'Barbecue-Soße',
    category: 'saucen_dips',
    base_calories: 45,
    description: 'Würzige Soße mit rauchigem Barbecue-Aroma.',
    imageUrl: 'https://s7d1.scene7.com/is/image/mcdonalds/DC_202002_2022_TangyBarbequeSauce_832x472',
    atoms: [
      { id: 'dip_bbq', name: '烟熏烧烤酱 (Barbecue-Soße)', type: 'sauce', calories: 45, protein: 0.4, fat: 0.1, carbs: 10.0, salt: 0.45, removable: false, default: true }
    ]
  },
  {
    id: 'de_mcd_ketchup',
    name: 'Ketchup (Heinz)',
    category: 'saucen_dips',
    base_calories: 30,
    description: 'Traditionell fruchtiger Tomatenketchup von Heinz.',
    imageUrl: 'https://s7d1.scene7.com/is/image/mcdonalds/DC_202002_0010_KetchupPacket_832x472',
    atoms: [
      { id: 'dip_ketchup', name: '番茄沙司 (Ketchup)', type: 'sauce', calories: 30, protein: 0.3, fat: 0.1, carbs: 7.0, salt: 0.35, removable: false, default: true }
    ]
  },
  {
    id: 'de_mcd_mayo',
    name: 'Mayonnaise (Heinz)',
    category: 'saucen_dips',
    base_calories: 90,
    description: 'Fein-cremige Mayonnaise mit ausgewogenem Geschmack.',
    imageUrl: 'https://s7d1.scene7.com/is/image/mcdonalds/DC_202002_0005_MayonnaisePacket_832x472',
    atoms: [
      { id: 'dip_mayo', name: '香浓美乃滋 (Mayonnaise)', type: 'sauce', calories: 90, protein: 0.2, fat: 9.8, carbs: 0.5, salt: 0.25, removable: false, default: true }
    ]
  },
  {
    id: 'de_mcd_sourcream',
    name: 'Sour Cream Dip',
    category: 'saucen_dips',
    base_calories: 85,
    description: 'Erfrischender Sour Cream Dip mit Kräutern und Sauerrahmaroma.',
    imageUrl: 'https://s7d1.scene7.com/is/image/mcdonalds/DC_202002_2023_SourCreamDip_832x472',
    atoms: [
      { id: 'dip_sourcream', name: '酸乳酪酱 (Sour Cream)', type: 'sauce', calories: 85, protein: 0.9, fat: 7.8, carbs: 2.3, salt: 0.26, removable: false, default: true }
    ]
  },

  // ================= Frühstück (早餐/麦满分) =================
  {
    id: 'de_mcd_mcmuffin_bacon',
    name: 'McMuffin® Bacon & Egg',
    category: 'fruehstueck',
    base_calories: 350,
    description: 'Getoasteter Weizenmuffin belegt mit knusprigem Bacon, einem frisch aufgeschlagenen Ei und Schmelzkäsezubereitung.',
    imageUrl: 'https://s7d1.scene7.com/is/image/mcdonalds/DC_202004_0006_BaconEggCheeseMcMuffin_832x472',
    atoms: [
      { id: 'mcmuffin_bacon_muffin', name: '麦满分英式面包 (English Muffin)', type: 'carb', calories: 140, protein: 5.2, fat: 1.2, carbs: 26, salt: 0.50, removable: false, default: true },
      { id: 'mcmuffin_bacon_egg', name: '鲜煎鸡蛋 (Ei)', type: 'base', calories: 80, protein: 6.8, fat: 5.5, carbs: 0.5, salt: 0.30, removable: true, default: true },
      { id: 'mcmuffin_bacon_meat', name: '香脆培根 (Bacon)', type: 'topping', calories: 60, protein: 4.5, fat: 4.5, carbs: 0.1, salt: 0.45, removable: true, default: true },
      { id: 'mcmuffin_bacon_cheese', name: '切达芝士片 (Cheddar-Käse)', type: 'cheese', calories: 70, protein: 4.1, fat: 5.6, carbs: 0.5, salt: 0.42, removable: true, default: true }
    ]
  },
  {
    id: 'de_mcd_mcmuffin_sausage',
    name: 'McMuffin® Sausage & Egg',
    category: 'fruehstueck',
    base_calories: 428,
    description: 'Getoasteter Weizenmuffin belegt mit würzigem Schweinefleischpatty, frisch zubereitetem Ei und Schmelzkäse.',
    imageUrl: 'https://s7d1.scene7.com/is/image/mcdonalds/DC_201907_0068_SausageMcMuffinwithEgg_832x472',
    atoms: [
      { id: 'mcmuffin_sausage_muffin', name: '麦满分英式面包 (English Muffin)', type: 'carb', calories: 140, protein: 5.2, fat: 1.2, carbs: 26, salt: 0.50, removable: false, default: true },
      { id: 'mcmuffin_sausage_meat', name: '德式风味猪肉饼 (Sausage Patty)', type: 'base', calories: 138, protein: 9.0, fat: 12.5, carbs: 0.3, salt: 0.60, removable: false, default: true },
      { id: 'mcmuffin_sausage_egg', name: '鲜煎鸡蛋 (Ei)', type: 'base', calories: 80, protein: 6.8, fat: 5.5, carbs: 0.5, salt: 0.30, removable: true, default: true },
      { id: 'mcmuffin_sausage_cheese', name: '切达芝士片 (Cheddar-Käse)', type: 'cheese', calories: 70, protein: 4.1, fat: 5.6, carbs: 0.5, salt: 0.42, removable: true, default: true }
    ]
  },
  {
    id: 'de_mcd_mcmuffin_egg',
    name: 'McMuffin® Egg',
    category: 'fruehstueck',
    base_calories: 298,
    description: 'Getoasteter Weizenmuffin belegt mit einem frischen Ei, Butter und schmelzendem Cheddarkäse.',
    imageUrl: 'https://s7d1.scene7.com/is/image/mcdonalds/DC_202004_0008_EggMcMuffin_832x472',
    atoms: [
      { id: 'mcmuffin_egg_muffin', name: '麦满分英式面包 (English Muffin)', type: 'carb', calories: 140, protein: 5.2, fat: 1.2, carbs: 26, salt: 0.50, removable: false, default: true },
      { id: 'mcmuffin_egg_egg', name: '鲜煎鸡蛋 (Ei)', type: 'base', calories: 80, protein: 6.8, fat: 5.5, carbs: 0.5, salt: 0.30, removable: true, default: true },
      { id: 'mcmuffin_egg_cheese', name: '切达芝士片 (Cheddar-Käse)', type: 'cheese', calories: 78, protein: 4.5, fat: 6.0, carbs: 0.5, salt: 0.45, removable: true, default: true }
    ]
  }
];

export const REMOTE_DB_URL = "https://your-api.com/mcd_de_db.json";

/**
 * Attempts to asynchronously fetch the latest German McDonald's database from the remote URL.
 * If successful, caches the result in localStorage and updates the state.
 * If network or format errors occur, gracefully falls back to localStorage cache, or default statics.
 */
export async function initializeDatabase(): Promise<MenuItem[]> {
  try {
    // Set a timeout using AbortController to prevent infinite loading on bad networks
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(REMOTE_DB_URL, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const latestData = await response.json();

    // Structurally validate that we received a non-empty array of MenuItems
    if (Array.isArray(latestData) && latestData.length > 0 && latestData[0].id) {
      try {
        localStorage.setItem('mcd_de_food_db', JSON.stringify(latestData));
      } catch (storageError) {
        console.warn('Failed to write fetched database to localStorage cache:', storageError);
      }
      return latestData;
    } else {
      throw new Error('Fetched data did not pass MenuItem verification.');
    }
  } catch (error) {
    console.warn('Failed to fetch remote database, falling back to cache:', error);
    return getCachedDatabase();
  }
}

/**
 * Synchronously retrieves the cached database from localStorage to prevent screen flash.
 */
export function getCachedDatabase(): MenuItem[] {
  try {
    const cached = localStorage.getItem('mcd_de_food_db');
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (cacheError) {
    console.warn('Failed to read database cache from localStorage:', cacheError);
  }
  return FOOD_DATABASE;
}
