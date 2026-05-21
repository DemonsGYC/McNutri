import { useState, useEffect, useRef, useMemo } from 'react';
import type { MenuItem, LogEntry, FavoritePreset, LoggedAtom } from '../types';
import { X, Sparkles, Heart, Plus } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CustomDrawerProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddLog: (entry: LogEntry) => void;
  onAddFavorite: (preset: FavoritePreset) => void;
}

// 极其优雅的 Odometer 数字滚动与递增递减数字平滑插值组件
function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value);
  const previousValueRef = useRef(value);

  useEffect(() => {
    const startValue = previousValueRef.current;
    const endValue = value;
    if (startValue === endValue) return;

    const duration = 250; // 动画持续 250ms
    const startTime = performance.now();

    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out cubic: 缓动效果让数值变化更圆润
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(startValue + (endValue - startValue) * easeProgress);

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValue);
        previousValueRef.current = endValue;
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [value]);

  return (
    <span className="font-extrabold text-4xl tracking-tighter tabular-nums transition-all">
      {displayValue}
    </span>
  );
}

export function CustomDrawer({ item, onClose, onAddLog, onAddFavorite }: CustomDrawerProps) {
  if (!item) return null;

  // 记录每个 atom 的选中状态
  const [atomSelection, setAtomSelection] = useState<Record<string, boolean>>({});
  // 收藏标签输入框开关
  const [showFavInput, setShowFavInput] = useState(false);
  const [favLabel, setFavLabel] = useState('');

  // 饮品规格状态
  const supportedSizes = item.supportedSizes || [];
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L'>(
    supportedSizes.includes('M') ? 'M' : (supportedSizes[0] as 'S' | 'M' | 'L') || 'M'
  );

  // 初始化原子选中状态与规格为默认值
  useEffect(() => {
    if (item) {
      const initial: Record<string, boolean> = {};
      item.atoms.forEach((atom) => {
        initial[atom.id] = atom.default;
      });
      setAtomSelection(initial);
      setShowFavInput(false);
      setFavLabel('');
      
      const sizes = item.supportedSizes || [];
      setSelectedSize(sizes.includes('M') ? 'M' : (sizes[0] as 'S' | 'M' | 'L') || 'M');
    }
  }, [item]);

  // 饮品规格缩放系数
  const sizeMultiplier = useMemo(() => {
    if (item.category !== 'drink') return 1.0;
    switch (selectedSize) {
      case 'S': return 0.75;
      case 'L': return 1.40;
      case 'M':
      default:
        return 1.00;
    }
  }, [item.category, selectedSize]);

  // 计算当前的实时营养素总量
  const currentNutrition = useMemo(() => {
    const raw = item.atoms.reduce(
      (acc, atom) => {
        const isIncluded = atom.removable ? !!atomSelection[atom.id] : true;
        if (isIncluded) {
          acc.calories += atom.calories * sizeMultiplier;
          acc.protein += atom.protein * sizeMultiplier;
          acc.fat += atom.fat * sizeMultiplier;
          acc.carbs += atom.carbs * sizeMultiplier;
          acc.sodium += atom.sodium * sizeMultiplier;
        }
        return acc;
      },
      { calories: 0, protein: 0, fat: 0, carbs: 0, sodium: 0 }
    );
    return {
      calories: Math.round(raw.calories),
      protein: Math.round(raw.protein * 10) / 10,
      fat: Math.round(raw.fat * 10) / 10,
      carbs: Math.round(raw.carbs * 10) / 10,
      sodium: Math.round(raw.sodium)
    };
  }, [item, atomSelection, sizeMultiplier]);

  // 计算相比原厂默认配置，用户节省了多少热量
  const originalCalories = useMemo(() => {
    const base = item.atoms.reduce((sum, a) => sum + (a.default ? a.calories : 0), 0);
    return Math.round(base * sizeMultiplier);
  }, [item, sizeMultiplier]);
  
  const savedCalories = originalCalories - currentNutrition.calories;

  const toggleAtom = (atomId: string) => {
    setAtomSelection((prev) => ({
      ...prev,
      [atomId]: !prev[atomId]
    }));
  };

  const handleSaveLog = () => {
    // 组装 LoggedAtom 数组
    const loggedAtoms: LoggedAtom[] = item.atoms.map((atom) => ({
      id: atom.id,
      name: atom.name,
      calories: Math.round(atom.calories * sizeMultiplier),
      protein: Math.round(atom.protein * sizeMultiplier * 10) / 10,
      fat: Math.round(atom.fat * sizeMultiplier * 10) / 10,
      carbs: Math.round(atom.carbs * sizeMultiplier * 10) / 10,
      sodium: Math.round(atom.sodium * sizeMultiplier),
      included: atom.removable ? !!atomSelection[atom.id] : true
    }));

    const logEntry: LogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
      itemId: item.id,
      itemName: item.name,
      category: item.category,
      atoms: loggedAtoms,
      totalCalories: currentNutrition.calories,
      totalProtein: currentNutrition.protein,
      totalFat: currentNutrition.fat,
      totalCarbs: currentNutrition.carbs,
      totalSodium: currentNutrition.sodium,
      selectedSize: item.category === 'drink' ? selectedSize : undefined
    };

    // 如果节省了卡路里，爆破七彩纸屑庆祝自律！
    if (savedCalories > 0) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#f2c94c', '#27ae60', '#2f80ed']
      });
    }

    onAddLog(logEntry);
    onClose();
  };

  const handleSaveFavorite = () => {
    if (!favLabel.trim()) return;

    const preset: FavoritePreset = {
      id: Math.random().toString(36).substring(2, 9),
      label: favLabel.trim(),
      itemId: item.id,
      itemName: item.name,
      category: item.category,
      atoms: item.atoms.map((atom) => ({
        id: atom.id,
        included: atom.removable ? !!atomSelection[atom.id] : true
      })),
      totalCalories: currentNutrition.calories,
      totalProtein: currentNutrition.protein,
      totalFat: currentNutrition.fat,
      totalCarbs: currentNutrition.carbs,
      totalSodium: currentNutrition.sodium,
      selectedSize: item.category === 'drink' ? selectedSize : undefined
    };

    onAddFavorite(preset);
    setShowFavInput(false);
    setFavLabel('');
    
    // 微触觉反馈纸屑
    confetti({
      particleCount: 30,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-black/60 z-50 flex items-end justify-center transition-all duration-300">
      {/* 半透明遮罩点击关闭 */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* 滑出式底层抽屉卡片 */}
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-[2.5rem] z-10 max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl flex flex-col relative border-t border-slate-100 dark:border-slate-800">
        
        {/* 顶部中央圆柱指示条 */}
        <div className="w-12 h-1 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto my-3 flex-shrink-0" />

        {/* 头部标题区 */}
        <div className="px-6 flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">{item.name}</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 leading-normal max-w-[85%]">{item.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:opacity-80 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 实时营养素大数字看板 (极简且高级) */}
        <div className="mx-6 mt-5 p-5 bg-slate-50/50 dark:bg-slate-950/30 rounded-3xl border border-slate-100 dark:border-slate-800/80 flex justify-between items-center relative overflow-hidden">
          <div className="space-y-1">
            <div className="flex items-baseline text-slate-900 dark:text-white">
              <AnimatedNumber value={currentNutrition.calories} />
              <span className="text-xs text-slate-400 font-semibold ml-1">kcal</span>
            </div>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
              当前计算热量
            </span>
          </div>

          {/* 节省卡路里徽章 */}
          {savedCalories > 0 && (
            <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 py-1.5 px-3 rounded-2xl text-[10px] font-bold flex items-center gap-1 animate-pop border border-emerald-500/10">
              <Sparkles className="w-3.5 h-3.5" />
              已省 {savedCalories} kcal
            </div>
          )}
        </div>

        {/* 精细宏量指示条组 */}
        <div className="grid grid-cols-4 gap-2 mx-6 mt-3 px-1 text-center">
          <div className="bg-blue-500/[0.04] dark:bg-blue-500/[0.02] p-2.5 rounded-2xl border border-blue-500/5">
            <span className="text-[10px] text-slate-400 font-bold block mb-0.5">蛋白质</span>
            <span className="text-sm font-extrabold text-blue-500 tabular-nums">
              {currentNutrition.protein.toFixed(1)}g
            </span>
          </div>
          <div className="bg-amber-400/[0.04] dark:bg-amber-400/[0.02] p-2.5 rounded-2xl border border-amber-400/5">
            <span className="text-[10px] text-slate-400 font-bold block mb-0.5">脂肪</span>
            <span className="text-sm font-extrabold text-amber-500 tabular-nums">
              {currentNutrition.fat.toFixed(1)}g
            </span>
          </div>
          <div className="bg-emerald-500/[0.04] dark:bg-emerald-500/[0.02] p-2.5 rounded-2xl border border-emerald-500/5">
            <span className="text-[10px] text-slate-400 font-bold block mb-0.5">碳水</span>
            <span className="text-sm font-extrabold text-emerald-500 tabular-nums">
              {currentNutrition.carbs.toFixed(1)}g
            </span>
          </div>
          <div className="bg-rose-500/[0.04] dark:bg-rose-500/[0.02] p-2.5 rounded-2xl border border-rose-500/5">
            <span className="text-[10px] text-slate-400 font-bold block mb-0.5">钠</span>
            <span className="text-sm font-extrabold text-rose-500 tabular-nums">
              {currentNutrition.sodium}mg
            </span>
          </div>
        </div>

        {/* 原子化食材微调区 (核心交互) */}
        <div className="px-6 py-5 space-y-4 flex-grow">
          
          {/* 杯型规格选择器 Segmented Control */}
          {item.category === 'drink' && supportedSizes.length > 1 && (
            <div className="space-y-1.5 animate-pop">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                选择杯型规格
              </h3>
              <div className="bg-slate-100 dark:bg-slate-950/40 p-1 rounded-2xl flex relative border border-slate-200/50 dark:border-slate-800/80">
                {supportedSizes.map((sz) => {
                  const sizeNameMap = { S: '小杯 S', M: '中杯 M', L: '大杯 L' };
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz as 'S' | 'M' | 'L')}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all duration-205 relative z-10 ${
                        isSelected
                          ? 'bg-white dark:bg-slate-850 text-amber-500 shadow-sm border border-slate-100/50 dark:border-slate-800/60'
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-250'
                      }`}
                    >
                      {sizeNameMap[sz as 'S' | 'M' | 'L']}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-50 dark:border-slate-800/80 pb-2">
            原子食材调配
          </h3>

          <div className="space-y-2 max-h-[30vh] overflow-y-auto no-scrollbar pr-0.5">
            {item.atoms.map((atom) => {
              const isRemovable = atom.removable;
              const isSelected = isRemovable ? !!atomSelection[atom.id] : true;
              
              const displayCal = Math.round(atom.calories * sizeMultiplier);
              const displayPro = (atom.protein * sizeMultiplier).toFixed(1);
              const displayFat = (atom.fat * sizeMultiplier).toFixed(1);
              const displaySod = Math.round(atom.sodium * sizeMultiplier);

              return (
                <div
                  key={atom.id}
                  onClick={() => isRemovable && toggleAtom(atom.id)}
                  className={`p-3.5 rounded-2xl flex justify-between items-center transition-all ${
                    !isRemovable
                      ? 'bg-slate-50/60 dark:bg-slate-900/40 border border-transparent opacity-80 cursor-not-allowed'
                      : isSelected
                      ? 'bg-amber-500/[0.03] dark:bg-amber-500/[0.01] border border-amber-500/10 cursor-pointer'
                      : 'bg-slate-100/40 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800/50 opacity-60 cursor-pointer'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className={`text-sm font-bold block ${
                      !isSelected ? 'text-slate-400 line-through' : 'text-slate-800 dark:text-slate-200'
                    }`}>
                      {atom.name}
                    </span>
                    <span className="text-[10px] text-slate-400 block tabular-nums">
                      {displayCal} kcal • 蛋 {displayPro}g • 脂 {displayFat}g • 钠 {displaySod}mg
                    </span>
                  </div>

                  <div>
                    {isRemovable ? (
                      /* 原生高拟真 iOS 风 Toggle Switch */
                      <div
                        className={`w-11 h-6 rounded-full p-0.5 transition-all relative ${
                          isSelected ? 'bg-amber-500' : 'bg-slate-200 dark:bg-slate-800'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white shadow-sm switch-dot transform ${
                            isSelected ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </div>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        必选主料
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 底部操作工具栏 */}
        <div className="border-t border-slate-100 dark:border-slate-800 p-6 space-y-4 bg-slate-50/50 dark:bg-slate-950/20 flex-shrink-0">
          
          {/* 保存为标配输入入口 */}
          {showFavInput ? (
            <div className="flex items-center gap-2 animate-pop">
              <input
                type="text"
                value={favLabel}
                onChange={(e) => setFavLabel(e.target.value)}
                placeholder="给本配方起个名字 (如: 我的板烧标配)"
                className="flex-grow py-3 px-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={handleSaveFavorite}
                disabled={!favLabel.trim()}
                className="py-3 px-4 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white rounded-2xl text-sm font-bold shadow-md shadow-amber-500/10 transition-all flex-shrink-0"
              >
                保存
              </button>
              <button
                onClick={() => setShowFavInput(false)}
                className="p-3 bg-slate-100 dark:bg-slate-800 hover:opacity-80 rounded-2xl text-slate-400 transition-all"
              >
                取消
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center px-1">
              <button
                onClick={() => setShowFavInput(true)}
                className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:opacity-80 flex items-center gap-1.5 transition-all"
              >
                <Heart className="w-4 h-4" />
                另存为“我的标配”
              </button>
            </div>
          )}

          {/* 记入今天按钮 */}
          <button
            onClick={handleSaveLog}
            className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-bold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 flex items-center justify-center gap-2 transition-all text-base"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            记入今天
          </button>
        </div>

      </div>
    </div>
  );
}
