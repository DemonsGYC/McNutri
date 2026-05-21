import type { MenuItem } from '../types';

export const FOOD_DATABASE: MenuItem[] = [
  {
    id: 'de_mcd_mcplant',
    name: 'McPlant®',
    category: 'klassiker',
    base_calories: 420,
    description: 'Pflanzenbasiertes Patty, vegane Schmelzkäsezubereitung, frischer Salat, Tomaten, Gurken und die legendäre Sandwich-Soße.',
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
    atoms: [
      { id: 'mcrip_bun', name: '麦肋排长Brötchen (McRip-Brötchen)', type: 'carb', calories: 175, protein: 6.2, fat: 2.6, carbs: 32, salt: 0.56, removable: false, default: true },
      { id: 'mcrip_pork', name: '经典猪肉排 (Schweinefleischpatty)', type: 'base', calories: 225, protein: 18.2, fat: 16.2, carbs: 0.6, salt: 0.52, removable: false, default: true },
      { id: 'mcrip_sauce', name: '肋排烧烤酱 (McRip-Soße)', type: 'sauce', calories: 75, protein: 0.4, fat: 0.4, carbs: 17, salt: 0.68, removable: true, default: true },
      { id: 'mcrip_onion', name: '新鲜洋葱碎 (Zwiebeln)', type: 'topping', calories: 6, protein: 0.2, fat: 0, carbs: 1.2, salt: 0.01, removable: true, default: true },
      { id: 'mcrip_pickle', name: '清脆酸黄瓜片 (Gurkenscheiben)', type: 'topping', calories: 4, protein: 0.1, fat: 0, carbs: 0.8, salt: 0.12, removable: true, default: true }
    ]
  },
  {
    id: 'de_mcd_pommes',
    name: 'Pommes Frites',
    category: 'snacks_beilagen',
    base_calories: 340,
    description: 'Außen knusprig, innen feines Kartoffelaroma. Standardmäßig mit Salz.',
    supportedSizes: ['S', 'M', 'L'],
    atoms: [
      { id: 'pommes_fries', name: '金黄细薯条 (Pommes)', type: 'carb', calories: 340, protein: 3.8, fat: 15.5, carbs: 44.5, salt: 0.08, removable: false, default: true },
      { id: 'pommes_salz', name: '表面撒盐 (Salz)', type: 'other', calories: 0, protein: 0, fat: 0, carbs: 0, salt: 0.52, removable: true, default: true }
    ]
  },
  {
    id: 'de_mcd_sourcream',
    name: 'Sour Cream Dip',
    category: 'snacks_beilagen',
    base_calories: 85,
    description: 'Erfrischender Dip mit feiner Kräuter- und Knoblauchnote.',
    atoms: [
      { id: 'dip_sourcream', name: '酸乳酪酱 (Sour Cream)', type: 'sauce', calories: 85, protein: 0.9, fat: 7.8, carbs: 2.3, salt: 0.26, removable: false, default: true }
    ]
  },
  {
    id: 'de_mcd_suesssauer',
    name: 'Süßsauer-Soße',
    category: 'snacks_beilagen',
    base_calories: 52,
    description: 'Klassischer Dip mit fruchtigem Geschmack von Aprikosen und Pfirsichen.',
    atoms: [
      { id: 'dip_suesssauer', name: '经典甜酸酱 (Süßsauer-Soße)', type: 'sauce', calories: 52, protein: 0.2, fat: 0.1, carbs: 12.5, salt: 0.32, removable: false, default: true }
    ]
  },
  {
    id: 'de_mcd_cola_zero',
    name: 'Coca-Cola Zero Sugar',
    category: 'getraenke',
    base_calories: 0,
    description: 'Originaler Cola-Geschmack ohne Zucker und ohne Kalorien.',
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
    supportedSizes: ['M', 'L'],
    atoms: [
      { id: 'kaffee_schwarz_liquid', name: '浓郁黑咖啡 (Kaffee Schwarz)', type: 'other', calories: 6, protein: 0.2, fat: 0, carbs: 1.1, salt: 0.01, removable: false, default: true }
    ]
  }
];
