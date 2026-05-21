export interface AtomComponent {
  id: string;
  name: string;
  type: 'carb' | 'base' | 'sauce' | 'topping' | 'cheese' | 'other';
  calories: number;
  protein: number; // in grams
  fat: number; // in grams
  carbs: number; // in grams
  sodium: number; // in milligrams
  removable: boolean;
  default: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'burger' | 'snack' | 'drink' | 'combo' | '1plus1';
  base_calories: number;
  atoms: AtomComponent[];
  description?: string;
  image?: string; // Optional image identifier
  supportedSizes?: ('S' | 'M' | 'L')[];
}

export interface UserProfile {
  gender: 'male' | 'female';
  age: number;
  height: number; // in cm
  weight: number; // in kg
  activityLevel: 1.2 | 1.375 | 1.55; //久坐: 1.2, 轻度: 1.375, 中度: 1.55
  goal: 'lose' | 'gain' | 'maintain'; // 减脂 / 增肌 / 维持
  tdee: number; // calculated TDEE
  targetCalories: number;
  targetProtein: number; // g
  targetFat: number; // g
  targetCarbs: number; // g
  targetSodium: number; // mg
}

export interface LoggedAtom {
  id: string;
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  sodium: number;
  included: boolean; // Whether the user kept this atom
}

export interface LogEntry {
  id: string;
  timestamp: string; // ISO String or similar
  itemId: string;
  itemName: string;
  category: MenuItem['category'];
  atoms: LoggedAtom[]; // Complete snapshot of the customizable atoms at the moment of logging
  totalCalories: number;
  totalProtein: number;
  totalFat: number;
  totalCarbs: number;
  totalSodium: number;
  note?: string; // Custom note
  selectedSize?: 'S' | 'M' | 'L';
}

export interface FavoritePreset {
  id: string;
  label: string; // e.g. "周五放纵餐"
  itemId: string;
  itemName: string;
  category: MenuItem['category'];
  atoms: { id: string; included: boolean }[]; // Kept ingredients
  totalCalories: number;
  totalProtein: number;
  totalFat: number;
  totalCarbs: number;
  totalSodium: number;
  selectedSize?: 'S' | 'M' | 'L';
}
