import React, { useState } from 'react';
import type { MenuItem } from '../types';
import { FOOD_DATABASE } from '../data/foodDatabase';
import { Search, Filter } from 'lucide-react';

interface MenuPanelProps {
  onSelectItem: (item: MenuItem) => void;
}

type TabType = 'all' | 'burger' | 'snack' | 'drink';

export function MenuPanel({ onSelectItem }: MenuPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 过滤和搜索菜单列表
  const filteredMenu = React.useMemo(() => {
    return FOOD_DATABASE.filter((item) => {
      const matchesTab = activeTab === 'all' || item.category === activeTab;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-5 animate-pop">
      {/* 1. 搜索栏 */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="搜索汉堡、小食、无糖可乐..."
          className="w-full py-3.5 pl-11 pr-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 shadow-sm"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <Search className="w-4 h-4" />
        </div>
      </div>

      {/* 2. 类别横向滑动条 Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {[
          { type: 'all', label: '全部单品' },
          { type: 'burger', label: '经典汉堡' },
          { type: 'snack', label: '美味小食' },
          { type: 'drink', label: '特调饮品' }
        ].map((tab) => (
          <button
            key={tab.type}
            onClick={() => setActiveTab(tab.type as TabType)}
            className={`py-2 px-4 rounded-xl font-bold text-xs transition-all whitespace-nowrap border ${
              activeTab === tab.type
                ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/10'
                : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. 菜品列表网络 */}
      {filteredMenu.length > 0 ? (
        <div className="grid grid-cols-1 gap-3">
          {filteredMenu.map((item) => {
            // 计算原厂默认热量与蛋白质
            const defaultCalories = item.base_calories;
            const proteinAtom = item.atoms.reduce((sum, a) => sum + (a.default ? a.protein : 0), 0);

            // 去酱去芝士后理论最低卡路里 (所有可去原子都设为 false)
            const minCalories = item.atoms.reduce(
              (sum, atom) => sum + (atom.removable ? 0 : atom.calories),
              0
            );
            
            const canBeCustomized = item.atoms.some((a) => a.removable);

            // 动态生成精准的魔改定制标签
            let customLabel = '';
            if (canBeCustomized) {
              const hasSauce = item.atoms.some((a) => a.removable && a.type === 'sauce');
              const hasCheese = item.atoms.some((a) => a.removable && a.type === 'cheese');
              const hasSalt = item.atoms.some((a) => a.removable && a.name.includes('盐'));
              const hasIce = item.atoms.some((a) => a.removable && a.name.includes('冰'));

              if (item.category === 'drink' && hasIce) {
                customLabel = '支持去冰';
              } else if (item.category === 'snack' && hasSalt) {
                customLabel = '支持去盐';
              } else if (hasSauce && hasCheese) {
                customLabel = '支持去酱/去芝士';
              } else if (hasSauce) {
                customLabel = '支持去酱';
              } else if (hasCheese) {
                customLabel = '支持去芝士';
              } else {
                customLabel = '支持定制';
              }
            }

            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="glass rounded-3xl p-4 shadow-sm border border-slate-100 dark:border-slate-850 flex justify-between items-center cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-md hover:border-amber-500/20 active:scale-[0.99] relative overflow-hidden"
              >
                <div className="space-y-1.5 flex-grow pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white">{item.name}</span>
                    {item.supportedSizes && item.supportedSizes.length > 1 && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 uppercase tracking-widest leading-none">
                        {item.supportedSizes.join('·')}杯
                      </span>
                    )}
                    {canBeCustomized && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase tracking-widest leading-none">
                        {customLabel}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-normal max-w-[85%]">
                    {item.description}
                  </p>

                  <div className="flex gap-2 items-center text-[10px] font-bold text-slate-400">
                    <span className="text-blue-500 font-extrabold">蛋白 {proteinAtom.toFixed(1)}g</span>
                    <span>•</span>
                    {canBeCustomized ? (
                      <span className="text-emerald-500">魔改最低 {minCalories} kcal</span>
                    ) : (
                      <span>原厂标准配方</span>
                    )}
                  </div>
                </div>

                {/* 右侧热量圆章 */}
                <div className="flex-shrink-0 text-center bg-slate-50/80 dark:bg-slate-950/40 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/80 min-w-[70px]">
                  <span className="text-base font-extrabold text-slate-800 dark:text-slate-200 block leading-tight">
                    {defaultCalories}
                  </span>
                  <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider mt-0.5">
                    kcal
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass rounded-3xl p-12 text-center text-slate-400 dark:text-slate-500 space-y-2 border border-dashed border-slate-200 dark:border-slate-850">
          <Filter className="w-8 h-8 text-slate-300 dark:text-slate-800 mx-auto" />
          <div className="text-sm font-semibold">未找到匹配菜品</div>
          <p className="text-xs max-w-[80%] mx-auto">
            请尝试更换关键词，或者选择其他分类类别。
          </p>
        </div>
      )}
    </div>
  );
}
