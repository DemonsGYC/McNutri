import type { MenuItem } from '../types';

export const FOOD_DATABASE: MenuItem[] = [
  {
    id: 'mcd_001',
    name: '板烧鸡腿堡',
    category: 'burger',
    base_calories: 402,
    description: '原叶生菜搭配鲜嫩多汁的整块板烧鸡腿肉，风味独特。',
    atoms: [
      { id: 'atom_001_bun', name: '芝麻面包', type: 'carb', calories: 150, protein: 5, fat: 2, carbs: 28, sodium: 120, removable: false, default: true },
      { id: 'atom_001_chicken', name: '板烧鸡腿肉', type: 'base', calories: 180, protein: 22, fat: 10, carbs: 0, sodium: 340, removable: false, default: true },
      { id: 'atom_001_sauce', name: '特制板烧酱', type: 'sauce', calories: 60, protein: 0, fat: 6, carbs: 1, sodium: 150, removable: true, default: true },
      { id: 'atom_001_lettuce', name: '新鲜生菜丝', type: 'topping', calories: 12, protein: 0.5, fat: 0, carbs: 2, sodium: 5, removable: true, default: true }
    ]
  },
  {
    id: 'mcd_002',
    name: '巨无霸',
    category: 'burger',
    base_calories: 520,
    description: '双层牛肉，三层面包，经典巨无霸酱，麦当劳的传世招牌。',
    atoms: [
      { id: 'atom_002_bun', name: '三层芝麻面包', type: 'carb', calories: 200, protein: 6, fat: 3, carbs: 38, sodium: 220, removable: false, default: true },
      { id: 'atom_002_beef', name: '双层纯牛肉饼', type: 'base', calories: 180, protein: 20, fat: 11, carbs: 0, sodium: 160, removable: false, default: true },
      { id: 'atom_002_cheese', name: '经典吉士片', type: 'cheese', calories: 50, protein: 3, fat: 4, carbs: 1, sodium: 230, removable: true, default: true },
      { id: 'atom_002_sauce', name: '巨无霸特制酱', type: 'sauce', calories: 75, protein: 0.5, fat: 8, carbs: 1, sodium: 125, removable: true, default: true },
      { id: 'atom_002_lettuce', name: '生菜丝', type: 'topping', calories: 10, protein: 0.4, fat: 0, carbs: 1.5, sodium: 4, removable: true, default: true },
      { id: 'atom_002_pickle', name: '酸黄瓜片', type: 'topping', calories: 3, protein: 0.1, fat: 0, carbs: 0.5, sodium: 65, removable: true, default: true },
      { id: 'atom_002_onion', name: '脱水洋葱丁', type: 'topping', calories: 2, protein: 0.1, fat: 0, carbs: 0.5, sodium: 1, removable: true, default: true }
    ]
  },
  {
    id: 'mcd_003',
    name: '双层吉士汉堡',
    category: 'burger',
    base_calories: 440,
    description: '双层纯牛肉配以双层切达芝士，番茄酱与芥末酱碰撞出浓郁口感。',
    atoms: [
      { id: 'atom_003_bun', name: '经典汉堡面包', type: 'carb', calories: 140, protein: 4.5, fat: 2, carbs: 26, sodium: 150, removable: false, default: true },
      { id: 'atom_003_beef', name: '双层牛肉饼', type: 'base', calories: 180, protein: 20, fat: 11, carbs: 0, sodium: 160, removable: false, default: true },
      { id: 'atom_003_cheese', name: '双层车达吉士', type: 'cheese', calories: 100, protein: 6, fat: 8, carbs: 2, sodium: 460, removable: true, default: true },
      { id: 'atom_003_ketchup', name: '美式番茄酱', type: 'sauce', calories: 15, protein: 0.2, fat: 0, carbs: 3.5, sodium: 110, removable: true, default: true },
      { id: 'atom_003_mustard', name: '黄芥末酱', type: 'sauce', calories: 3, protein: 0.2, fat: 0.2, carbs: 0.2, sodium: 45, removable: true, default: true },
      { id: 'atom_003_pickle', name: '酸黄瓜片', type: 'topping', calories: 2, protein: 0.1, fat: 0, carbs: 0.4, sodium: 45, removable: true, default: true },
      { id: 'atom_003_onion', name: '洋葱碎', type: 'topping', calories: 2, protein: 0.1, fat: 0, carbs: 0.4, sodium: 1, removable: true, default: true }
    ]
  },
  {
    id: 'mcd_004',
    name: '麦辣鸡腿堡',
    category: 'burger',
    base_calories: 480,
    description: '脆辣多汁的鸡腿排，加上生菜与经典沙拉酱，麦当劳中国的人气神话。',
    atoms: [
      { id: 'atom_004_bun', name: '芝麻面包', type: 'carb', calories: 150, protein: 5, fat: 2, carbs: 28, sodium: 120, removable: false, default: true },
      { id: 'atom_004_chicken', name: '香辣油炸鸡排', type: 'base', calories: 240, protein: 16, fat: 14, carbs: 12, sodium: 580, removable: false, default: true },
      { id: 'atom_004_sauce', name: '香甜沙拉酱', type: 'sauce', calories: 80, protein: 0.5, fat: 9, carbs: 1, sodium: 90, removable: true, default: true },
      { id: 'atom_004_lettuce', name: '生菜丝', type: 'topping', calories: 10, protein: 0.4, fat: 0, carbs: 1.5, sodium: 4, removable: true, default: true }
    ]
  },
  {
    id: 'mcd_005',
    name: '麦香鱼',
    category: 'burger',
    base_calories: 335,
    description: '深海鳕鱼排，搭配塔塔酱与半片切达吉士，口感温润细腻。',
    atoms: [
      { id: 'atom_005_bun', name: '蒸面包', type: 'carb', calories: 130, protein: 4.5, fat: 2, carbs: 24, sodium: 140, removable: false, default: true },
      { id: 'atom_005_fish', name: '鳕鱼排', type: 'base', calories: 120, protein: 10, fat: 6, carbs: 7, sodium: 220, removable: false, default: true },
      { id: 'atom_005_sauce', name: '塔塔酱', type: 'sauce', calories: 60, protein: 0, fat: 6, carbs: 1, sodium: 130, removable: true, default: true },
      { id: 'atom_005_cheese', name: '半片切达吉士', type: 'cheese', calories: 25, protein: 1.5, fat: 2, carbs: 0.5, sodium: 115, removable: true, default: true }
    ]
  },
  {
    id: 'mcd_006',
    name: '薯条 (中)',
    category: 'snack',
    base_calories: 320,
    description: '外脆内糯的金黄薯条，经典百搭。',
    atoms: [
      { id: 'atom_006_potato', name: '马铃薯条(炸)', type: 'carb', calories: 300, protein: 4, fat: 15, carbs: 38, sodium: 80, removable: false, default: true },
      { id: 'atom_006_salt', name: '表面撒盐', type: 'other', calories: 0, protein: 0, fat: 0, carbs: 0, sodium: 210, removable: true, default: true }
    ]
  },
  {
    id: 'mcd_007',
    name: '麦乐鸡 (5块)',
    category: 'snack',
    base_calories: 215,
    description: '香脆可口的鸡肉块，蘸上甜酸酱更是美味。',
    atoms: [
      { id: 'atom_007_nugget', name: '黄金麦乐鸡块(5块)', type: 'base', calories: 180, protein: 11, fat: 11, carbs: 10, sodium: 380, removable: false, default: true },
      { id: 'atom_007_sauce', name: '酸甜蘸酱', type: 'sauce', calories: 35, protein: 0, fat: 0, carbs: 9, sodium: 110, removable: true, default: true }
    ]
  },
  {
    id: 'mcd_008',
    name: '麦辣鸡翅 (2块)',
    category: 'snack',
    base_calories: 180,
    description: '外酥里嫩，香辣多汁，麦当劳常青小食。',
    atoms: [
      { id: 'atom_008_wings', name: '炸麦辣鸡翅(2块)', type: 'base', calories: 180, protein: 12, fat: 12, carbs: 6, sodium: 320, removable: false, default: true }
    ]
  },
  {
    id: 'mcd_009',
    name: '零度可乐',
    category: 'drink',
    base_calories: 0,
    description: '无糖零热量，冰凉爽口，健康无负担。',
    supportedSizes: ['S', 'M', 'L'],
    atoms: [
      { id: 'atom_009_cola', name: '无糖可乐汽水', type: 'other', calories: 0, protein: 0, fat: 0, carbs: 0, sodium: 15, removable: false, default: true },
      { id: 'atom_009_ice', name: '冰块', type: 'other', calories: 0, protein: 0, fat: 0, carbs: 0, sodium: 0, removable: false, default: true }
    ]
  },
  {
    id: 'mcd_010',
    name: '纯牛奶',
    category: 'drink',
    base_calories: 120,
    description: '高钙优质蛋白纯牛奶，健康均衡的日常选择。',
    supportedSizes: ['M'],
    atoms: [
      { id: 'atom_010_milk', name: '利乐包纯牛奶(200ml)', type: 'base', calories: 120, protein: 6.8, fat: 6.4, carbs: 9.4, sodium: 120, removable: false, default: true }
    ]
  },
  {
    id: 'mcd_011',
    name: '经典美式咖啡',
    category: 'drink',
    base_calories: 10,
    description: '选用阿拉比卡咖啡豆，提神醒脑，冰热皆可。',
    supportedSizes: ['M', 'L'],
    atoms: [
      { id: 'atom_011_coffee', name: '精选美式咖啡', type: 'other', calories: 10, protein: 1, fat: 0.2, carbs: 1, sodium: 5, removable: false, default: true }
    ]
  },
  {
    id: 'mcd_012',
    name: '可口可乐',
    category: 'drink',
    base_calories: 150,
    description: '经典美味，汽水气泡充盈，带来极致畅爽体验。',
    supportedSizes: ['S', 'M', 'L'],
    atoms: [
      { id: 'atom_012_cola', name: '原味可乐汽水', type: 'other', calories: 150, protein: 0, fat: 0, carbs: 37, sodium: 15, removable: false, default: true },
      { id: 'atom_012_ice', name: '冰块', type: 'other', calories: 0, protein: 0, fat: 0, carbs: 0, sodium: 0, removable: false, default: true }
    ]
  },
  {
    id: 'mcd_013',
    name: '雪碧',
    category: 'drink',
    base_calories: 140,
    description: '柠檬青柠味汽水，清爽激爽，沁人心脾。',
    supportedSizes: ['S', 'M', 'L'],
    atoms: [
      { id: 'atom_013_sprite', name: '雪碧汽水', type: 'other', calories: 140, protein: 0, fat: 0, carbs: 35, sodium: 15, removable: false, default: true },
      { id: 'atom_013_ice', name: '冰块', type: 'other', calories: 0, protein: 0, fat: 0, carbs: 0, sodium: 0, removable: false, default: true }
    ]
  },
  {
    id: 'mcd_014',
    name: '经典拿铁咖啡',
    category: 'drink',
    base_calories: 110,
    description: '香醇浓缩咖啡融入丝滑纯牛奶，温润奶香。',
    supportedSizes: ['M', 'L'],
    atoms: [
      { id: 'atom_014_espresso', name: '高品质浓缩咖啡', type: 'other', calories: 5, protein: 0.5, fat: 0.1, carbs: 0.5, sodium: 2, removable: false, default: true },
      { id: 'atom_014_milk', name: '鲜牛奶', type: 'base', calories: 105, protein: 6, fat: 5.5, carbs: 8, sodium: 90, removable: false, default: true }
    ]
  },
  {
    id: 'mcd_015',
    name: '阳光柠檬红茶',
    category: 'drink',
    base_calories: 85,
    description: '香醇红茶与清新柠檬碰撞，酸甜清爽解腻。',
    supportedSizes: ['S', 'M', 'L'],
    atoms: [
      { id: 'atom_015_tea', name: '柠檬红茶饮品', type: 'other', calories: 85, protein: 0, fat: 0, carbs: 21, sodium: 10, removable: false, default: true },
      { id: 'atom_015_ice', name: '冰块', type: 'other', calories: 0, protein: 0, fat: 0, carbs: 0, sodium: 0, removable: false, default: true }
    ]
  }
];
