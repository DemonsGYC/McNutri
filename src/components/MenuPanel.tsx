import React, { useState } from 'react';
import type { MenuItem } from '../types';
import { FOOD_DATABASE } from '../data/foodDatabase';
import { Search, Filter } from 'lucide-react';

interface MenuPanelProps {
  onSelectItem: (item: MenuItem) => void;
}

type TabType = 'all' | 'klassiker' | 'snacks_beilagen' | 'getraenke';

export function MenuPanel({ onSelectItem }: MenuPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Search and filter logic
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
    <div className="max-w-md mx-auto px-4 py-5 space-y-4 animate-pop">
      
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Nach McPlant, Big Tasty oder Pommes suchen..."
          className="w-full py-3.5 pl-11 pr-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 shadow-sm transition-all"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <Search className="w-4 h-4" />
        </div>
      </div>

      {/* Categories Tabs Slider */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {[
          { type: 'all', label: 'Alle Produkte' },
          { type: 'klassiker', label: 'Klassiker' },
          { type: 'snacks_beilagen', label: 'Snacks & Beilagen' },
          { type: 'getraenke', label: 'Getränke' }
        ].map((tab) => (
          <button
            key={tab.type}
            onClick={() => setActiveTab(tab.type as TabType)}
            className={`py-2.5 px-4.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap border ${
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
        <div className="grid grid-cols-1 gap-3">
          {filteredMenu.map((item) => {
            const defaultCalories = item.base_calories;
            const proteinAtom = item.atoms.reduce((sum, a) => sum + (a.default ? a.protein : 0), 0);

            // Minimum calories if all customizable items are removed
            const minCalories = item.atoms.reduce(
              (sum, atom) => sum + (atom.removable ? 0 : atom.calories),
              0
            );
            
            const canBeCustomized = item.atoms.some((a) => a.removable);

            // Dynamic customization hint
            let customLabel = '';
            if (canBeCustomized) {
              const hasSauce = item.atoms.some((a) => a.removable && a.type === 'sauce');
              const hasCheese = item.atoms.some((a) => a.removable && a.type === 'cheese');
              const hasSalt = item.atoms.some((a) => a.removable && a.id.includes('salz'));

              if (item.category === 'snacks_beilagen' && hasSalt) {
                customLabel = 'ohne Salz möglich';
              } else if (hasSauce && hasCheese) {
                customLabel = 'ohne Soße/Käse möglich';
              } else if (hasSauce) {
                customLabel = 'ohne Soße möglich';
              } else if (hasCheese) {
                customLabel = 'ohne Käse möglich';
              } else {
                customLabel = 'Anpassbar';
              }
            }

            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="glass rounded-3xl p-4 shadow-sm border border-slate-100 dark:border-slate-850 flex justify-between items-center cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-md hover:border-amber-500/20 active:scale-[0.99] relative overflow-hidden"
              >
                <div className="space-y-1.5 flex-grow pr-4">
                  <div className="flex items-center flex-wrap gap-1.5">
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white leading-snug">{item.name}</span>
                    {item.supportedSizes && item.supportedSizes.length > 1 && (
                      <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 uppercase tracking-widest leading-none">
                        {item.supportedSizes.join('·')}
                      </span>
                    )}
                    {canBeCustomized && (
                      <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase tracking-wider leading-none">
                        {customLabel}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-normal max-w-[90%]">
                    {item.description}
                  </p>

                  <div className="flex gap-2 items-center text-[10px] font-bold text-slate-400">
                    <span className="text-blue-500 font-extrabold">Protein: {proteinAtom.toFixed(1)}g</span>
                    <span>•</span>
                    {canBeCustomized ? (
                      <span className="text-emerald-500">Min. {minCalories} kcal</span>
                    ) : (
                      <span className="text-slate-350">Standardrezeptur</span>
                    )}
                  </div>
                </div>

                {/* Right Badge Calorie Indicator */}
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
          <Filter className="w-8 h-8 text-slate-300 dark:text-slate-850 mx-auto" />
          <div className="text-sm font-semibold">Keine Produkte gefunden</div>
          <p className="text-xs max-w-[80%] mx-auto">
            Bitte versuchen Sie einen anderen Suchbegriff oder eine andere Kategorie.
          </p>
        </div>
      )}
    </div>
  );
}
