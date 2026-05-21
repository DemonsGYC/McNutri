import type { FavoritePreset, LogEntry } from '../types';
import { FOOD_DATABASE } from '../data/foodDatabase';
import { Heart, Plus, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FavoritesProps {
  favorites: FavoritePreset[];
  onRemoveFavorite: (id: string) => void;
  onAddLog: (entry: LogEntry) => void;
}

export function Favorites({ favorites, onRemoveFavorite, onAddLog }: FavoritesProps) {
  const handleQuickLog = (preset: FavoritePreset) => {
    // 寻找原版菜单单品，以便获取原版原子的详细营养素
    const originalItem = FOOD_DATABASE.find((item) => item.id === preset.itemId);
    if (!originalItem) return;

    // 规格缩放系数
    const sizeMultiplier = preset.selectedSize === 'S' ? 0.75 : preset.selectedSize === 'L' ? 1.40 : 1.00;

    // 根据预置快照重建 LoggedAtom 并应用缩放
    const loggedAtoms = originalItem.atoms.map((atom) => {
      const presetAtom = preset.atoms.find((a) => a.id === atom.id);
      return {
        id: atom.id,
        name: atom.name,
        calories: Math.round(atom.calories * sizeMultiplier),
        protein: Math.round(atom.protein * sizeMultiplier * 10) / 10,
        fat: Math.round(atom.fat * sizeMultiplier * 10) / 10,
        carbs: Math.round(atom.carbs * sizeMultiplier * 10) / 10,
        sodium: Math.round(atom.sodium * sizeMultiplier),
        included: presetAtom ? presetAtom.included : atom.default
      };
    });

    const entry: LogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
      itemId: preset.itemId,
      itemName: preset.itemName,
      category: preset.category,
      atoms: loggedAtoms,
      totalCalories: preset.totalCalories,
      totalProtein: preset.totalProtein,
      totalFat: preset.totalFat,
      totalCarbs: preset.totalCarbs,
      totalSodium: preset.totalSodium,
      note: `快捷记录: ${preset.label}`,
      selectedSize: preset.selectedSize
    };

    onAddLog(entry);

    // 纸屑动画
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-6 animate-pop">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
          <Heart className="w-4 h-4 text-amber-500 fill-amber-500/20" />
          我的魔改标配
        </h2>
        <span className="text-[10px] text-slate-400 font-semibold">{favorites.length} 个标配</span>
      </div>

      {favorites.length > 0 ? (
        <div className="space-y-4">
          {favorites.map((preset) => {
            // 获取该魔改去掉了什么
            const originalItem = FOOD_DATABASE.find((i) => i.id === preset.itemId);
            let removedNames: string[] = [];
            if (originalItem) {
              originalItem.atoms.forEach((atom) => {
                const isIncluded = preset.atoms.find((pa) => pa.id === atom.id)?.included ?? atom.default;
                if (atom.removable && !isIncluded) {
                  removedNames.push(atom.name.replace('特制', '').replace('经典', '').replace('新鲜', ''));
                }
              });
            }

            return (
              <div
                key={preset.id}
                className="glass rounded-3xl p-5 shadow-lg border border-slate-100 dark:border-slate-800 relative overflow-hidden transition-all duration-300 hover:scale-[1.01]"
              >
                {/* 顶部标配标签与删除 */}
                <div className="flex justify-between items-start">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block bg-amber-500/10 px-2 py-0.5 rounded-lg w-max mb-1.5">
                      {preset.label}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight flex items-center gap-1.5">
                      {preset.itemName}
                      {preset.selectedSize && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold leading-none">
                          {{ S: '小杯', M: '中杯', L: '大杯' }[preset.selectedSize]}
                        </span>
                      )}
                    </h3>
                    {removedNames.length > 0 ? (
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">
                        去除了: {removedNames.join('、')}
                      </p>
                    ) : (
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">原厂配方配置</p>
                    )}
                  </div>
                  <button
                    onClick={() => onRemoveFavorite(preset.id)}
                    className="p-2 rounded-xl text-slate-400 dark:text-slate-500 hover:bg-rose-500/10 hover:text-rose-500 transition-all"
                    title="删除此标配"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* 营养素卡片数据 */}
                <div className="grid grid-cols-4 gap-2 bg-slate-50/50 dark:bg-slate-950/20 py-2 px-3 rounded-2xl border border-slate-100 dark:border-slate-800/80 my-3.5 text-center">
                  <div>
                    <span className="text-[9px] text-slate-400 block font-semibold">热量</span>
                    <span className="text-xs font-bold text-slate-850 dark:text-slate-200 tabular-nums">
                      {Math.round(preset.totalCalories)} kcal
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block font-semibold">蛋白</span>
                    <span className="text-xs font-bold text-blue-500 tabular-nums">
                      {preset.totalProtein.toFixed(1)}g
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block font-semibold">脂肪</span>
                    <span className="text-xs font-bold text-amber-500 tabular-nums">
                      {preset.totalFat.toFixed(1)}g
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block font-semibold">钠</span>
                    <span className="text-xs font-bold text-rose-500 tabular-nums">
                      {Math.round(preset.totalSodium)}mg
                    </span>
                  </div>
                </div>

                {/* 一键记录 */}
                <button
                  onClick={() => handleQuickLog(preset)}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-xs font-bold shadow-md shadow-amber-500/15 flex items-center justify-center gap-1.5 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  一键快速记录到今天
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass rounded-3xl p-8 text-center text-slate-400 dark:text-slate-500 space-y-3 border border-dashed border-slate-200 dark:border-slate-800">
          <Heart className="w-8 h-8 text-slate-200 dark:text-slate-800 mx-auto" />
          <div className="text-sm font-semibold">还没有魔改标配</div>
          <p className="text-xs max-w-[80%] mx-auto leading-relaxed">
            你可以前往“原子点餐台”，点击任何麦当劳菜品调配你最爱的一键去酱/去芝士配方，然后点击“另存为我的标配”保存！
          </p>
        </div>
      )}
    </div>
  );
}
