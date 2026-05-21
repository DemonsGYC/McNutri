export interface AtomComponent {
  id: string;
  name: string;
  type: 'carb' | 'base' | 'sauce' | 'topping' | 'cheese' | 'other';
  calories: number;
  protein: number; // in grams
  fat: number; // in grams
  carbs: number; // in grams
  salt: number; // in grams (replaces sodium)
  removable: boolean;
  default: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'klassiker' | 'snacks_beilagen' | 'getraenke';
  base_calories: number;
  atoms: AtomComponent[];
  description?: string;
  image?: string;
  supportedSizes?: ('S' | 'M' | 'L')[];
}

export interface TrayItem {
  id: string; // Unique ID for each item instance in the tray
  menuItem: MenuItem;
  selectedSize?: 'S' | 'M' | 'L';
  customizedAtoms: Record<string, boolean>; // atomId -> whether included
  calculatedNutrition: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    salt: number;
  };
}
