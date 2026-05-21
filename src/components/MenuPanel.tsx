import React, { useState } from 'react';
import type { MenuItem } from '../types';
import { FOOD_DATABASE } from '../data/foodDatabase';
import { Search, Filter } from 'lucide-react';

interface MenuPanelProps {
  onSelectItem: (item: MenuItem) => void;
  foodDatabase?: MenuItem[];
}

type TabType = 'all' | 'klassiker' | 'snacks_beilagen' | 'getraenke' | 'saucen_dips' | 'fruehstueck';

export function MenuPanel({ onSelectItem, foodDatabase = FOOD_DATABASE }: MenuPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Search and filter logic
  const filteredMenu = React.useMemo(() => {
    return foodDatabase.filter((item) => {
      const matchesTab = activeTab === 'all' || item.category === activeTab;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTab && matchesSearch;
    });
  }, [foodDatabase, activeTab, searchQuery]);

  return (
    <div className="max-w-md mx-auto px-4 py-3 space-y-4 animate-pop">
      
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="搜索 McPlant, Big Tasty 或 Pommes..."
          className="w-full py-3.5 pl-11 pr-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 shadow-sm transition-all"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <Search className="w-4 h-4" />
        </div>
      </div>

      {/* Categories Tabs Slider */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {[
          { type: 'all', label: 'Alle 全部' },
          { type: 'klassiker', label: 'Klassiker 主食' },
          { type: 'snacks_beilagen', label: 'Snacks 小食' },
          { type: 'getraenke', label: 'Getränke 饮料' },
          { type: 'saucen_dips', label: 'Saucen & Dips 酱料' },
          { type: 'fruehstueck', label: 'Frühstück 早餐' }
        ].map((tab) => (
          <button
            key={tab.type}
            onClick={() => setActiveTab(tab.type as TabType)}
            className={`py-2 px-4 rounded-xl font-bold text-xs transition-all whitespace-nowrap border ${
              activeTab === tab.type
                ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/10'
                : 'bg-white dark:bg-slate-900 border-slate-150 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Product List */}
      {filteredMenu.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {filteredMenu.map((item) => {
            const defaultCalories = item.base_calories;
            const proteinAtom = item.atoms.reduce((sum, a) => sum + (a.default ? a.protein : 0), 0);

            const canBeCustomized = item.atoms.some((a) => a.removable);

            // Dynamic customization hint in Chinese
            let customLabel = '';
            if (canBeCustomized) {
              const hasSauce = item.atoms.some((a) => a.removable && a.type === 'sauce');
              const hasCheese = item.atoms.some((a) => a.removable && a.type === 'cheese');
              const hasSalt = item.atoms.some((a) => a.removable && a.id.includes('salz'));

              if (item.category === 'snacks_beilagen' && hasSalt) {
                customLabel = '可去盐';
              } else if (hasSauce && hasCheese) {
                customLabel = '去酱/芝士';
              } else if (hasSauce) {
                customLabel = '可去酱';
              } else if (hasCheese) {
                customLabel = '可去芝士';
              } else {
                customLabel = '可定制';
              }
            }

            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="bg-white dark:bg-slate-900 rounded-3xl p-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 dark:border-slate-800/80 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-amber-500/20 active:scale-[0.98] relative overflow-hidden"
              >
                {/* Product Image Container */}
                <div className="w-full h-28 flex items-center justify-center bg-slate-50/50 dark:bg-slate-950/30 rounded-2xl p-1.5 relative overflow-hidden">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.06)] hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 dark:bg-slate-850 flex items-center justify-center text-slate-350 text-[10px] font-bold">
                      Kein Bild
                    </div>
                  )}
                </div>

                {/* Badges strip */}
                <div className="flex flex-wrap gap-1 mt-2.5 min-h-[16px]">
                  {canBeCustomized && (
                    <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      {customLabel}
                    </span>
                  )}
                  {item.supportedSizes && item.supportedSizes.length > 1 && (
                    <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      {item.category === 'getraenke' ? '多杯型' : '多规格'}
                    </span>
                  )}
                </div>

                {/* Item Name */}
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white mt-1 leading-snug line-clamp-2 min-h-[2.2rem] flex items-start">
                  {item.name}
                </h4>

                {/* Card Footer: Calories & Protein */}
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50 dark:border-slate-800/80">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black text-slate-800 dark:text-slate-200 tabular-nums">
                      {defaultCalories} <span className="text-[8px] text-slate-400 font-bold uppercase">kcal</span>
                    </span>
                  </div>
                  <span className="text-[8.5px] font-extrabold px-1.5 py-0.5 rounded bg-blue-500/[0.06] text-blue-500 dark:text-blue-400">
                    P: {proteinAtom.toFixed(1)}g
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass rounded-3xl p-12 text-center text-slate-400 dark:text-slate-500 space-y-2 border border-dashed border-slate-200 dark:border-slate-850">
          <Filter className="w-8 h-8 text-slate-300 dark:text-slate-850 mx-auto" />
          <div className="text-sm font-semibold">未找到匹配商品</div>
          <p className="text-xs max-w-[80%] mx-auto">
            请尝试输入其他关键词或切换分类选项。
          </p>
        </div>
      )}
    </div>
  );
}
