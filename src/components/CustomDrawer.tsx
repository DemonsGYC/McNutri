import { useState, useEffect, useRef, useMemo } from 'react';
import type { MenuItem } from '../types';
import { X, Sparkles, Copy, Plus, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CustomDrawerProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddTrayItem: (
    item: MenuItem,
    selectedSize: 'S' | 'M' | 'L' | undefined,
    atomSelection: Record<string, boolean>,
    nutrition: { calories: number; protein: number; fat: number; carbs: number; salt: number }
  ) => void;
}

// Odometer component for smooth calorie animation
function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value);
  const previousValueRef = useRef(value);

  useEffect(() => {
    const startValue = previousValueRef.current;
    const endValue = value;
    if (startValue === endValue) return;

    const duration = 200;
    const startTime = performance.now();
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
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
    return () => cancelAnimationFrame(animationFrameId);
  }, [value]);

  return (
    <span className="font-extrabold text-4xl tracking-tighter tabular-nums transition-all">
      {displayValue}
    </span>
  );
}

export function CustomDrawer({ item, onClose, onAddTrayItem }: CustomDrawerProps) {
  if (!item) return null;

  const [atomSelection, setAtomSelection] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  // Beverage/Fries Sizing
  const supportedSizes = item.supportedSizes || [];
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L'>(
    supportedSizes.includes('M') ? 'M' : (supportedSizes[0] as 'S' | 'M' | 'L') || 'M'
  );

  // Re-initialize selection when drawer changes
  useEffect(() => {
    const initial: Record<string, boolean> = {};
    item.atoms.forEach((atom) => {
      initial[atom.id] = atom.default;
    });
    setAtomSelection(initial);
    setCopied(false);

    const sizes = item.supportedSizes || [];
    setSelectedSize(sizes.includes('M') ? 'M' : (sizes[0] as 'S' | 'M' | 'L') || 'M');
  }, [item]);

  // Sizing Multiplier (S = 0.75, M = 1.0, L = 1.4)
  const sizeMultiplier = useMemo(() => {
    if (!item.supportedSizes || item.supportedSizes.length === 0) return 1.0;
    switch (selectedSize) {
      case 'S': return 0.75;
      case 'L': return 1.40;
      case 'M':
      default:
        return 1.00;
    }
  }, [item.supportedSizes, selectedSize]);

  // Calculate customized nutrition details
  const currentNutrition = useMemo(() => {
    const raw = item.atoms.reduce(
      (acc, atom) => {
        const isIncluded = atom.removable ? !!atomSelection[atom.id] : true;
        if (isIncluded) {
          acc.calories += atom.calories * sizeMultiplier;
          acc.protein += atom.protein * sizeMultiplier;
          acc.fat += atom.fat * sizeMultiplier;
          acc.carbs += atom.carbs * sizeMultiplier;
          acc.salt += atom.salt * sizeMultiplier;
        }
        return acc;
      },
      { calories: 0, protein: 0, fat: 0, carbs: 0, salt: 0 }
    );
    return {
      calories: Math.round(raw.calories),
      protein: Math.round(raw.protein * 10) / 10,
      fat: Math.round(raw.fat * 10) / 10,
      carbs: Math.round(raw.carbs * 10) / 10,
      salt: Math.round(raw.salt * 100) / 100
    };
  }, [item, atomSelection, sizeMultiplier]);

  // Original Calories comparison
  const originalCalories = useMemo(() => {
    const base = item.atoms.reduce((sum, a) => sum + (a.default ? a.calories : 0), 0);
    return Math.round(base * sizeMultiplier);
  }, [item, sizeMultiplier]);

  const savedCalories = originalCalories - currentNutrition.calories;

  const toggleAtom = (atomId: string) => {
    setAtomSelection((prev) => ({
      ...prev,
      ...({ [atomId]: !prev[atomId] })
    }));
  };

  const handleKopieren = () => {
    const removedAtoms = item.atoms.filter((a) => a.removable && !atomSelection[a.id]);
    const customParts = removedAtoms.map((a) => `[去${a.name.split(' (')[0]}]`).join(', ');
    const sizeSuffix = item.supportedSizes && item.supportedSizes.length > 1 
      ? ` (${selectedSize === 'S' ? '小份' : selectedSize === 'M' ? '中份' : '大份'})` 
      : '';
    const itemDescription = `${item.name}${sizeSuffix}${customParts ? ` ${customParts}` : ''}`;

    const formattedText = `🍔 麦当劳定制餐：${currentNutrition.calories} kcal | 蛋白质: ${currentNutrition.protein.toFixed(1)}g | 脂肪: ${currentNutrition.fat.toFixed(1)}g | 碳水: ${currentNutrition.carbs.toFixed(1)}g | 盐: ${currentNutrition.salt.toFixed(2)}g (${itemDescription})`;

    navigator.clipboard.writeText(formattedText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      // Light confetti burst
      confetti({
        particleCount: 45,
        angle: 60,
        spread: 55,
        origin: { x: 0.1, y: 0.8 }
      });
    });
  };

  const handleAddToTray = () => {
    if (savedCalories > 0) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#ffc72c', '#da291c', '#27ae60']
      });
    } else {
      confetti({
        particleCount: 30,
        spread: 40,
        origin: { y: 0.85 },
        colors: ['#ffc72c', '#da291c']
      });
    }

    onAddTrayItem(item, item.supportedSizes ? selectedSize : undefined, atomSelection, currentNutrition);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-black/60 z-50 flex items-end justify-center transition-all duration-300">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-[2.5rem] z-10 max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl flex flex-col relative border-t border-slate-100 dark:border-slate-800">
        
        {/* Drag Indicator */}
        <div className="w-12 h-1 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto my-3 flex-shrink-0" />

        {/* Header */}
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

        {/* Calorie Display */}
        <div className="mx-6 mt-5 p-5 bg-slate-50/50 dark:bg-slate-950/30 rounded-3xl border border-slate-100 dark:border-slate-800/80 flex justify-between items-center relative overflow-hidden">
          <div className="space-y-1">
            <div className="flex items-baseline text-slate-900 dark:text-white">
              <AnimatedNumber value={currentNutrition.calories} />
              <span className="text-xs text-slate-400 font-semibold ml-1">kcal</span>
            </div>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
              计算所得热量
            </span>
          </div>

          {savedCalories > 0 && (
            <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 py-1.5 px-3 rounded-2xl text-[10px] font-bold flex items-center gap-1 animate-pop border border-emerald-500/10">
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
              去料已省: -{savedCalories} kcal
            </div>
          )}
        </div>

        {/* Nutritional Stats Grid */}
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
            <span className="text-[10px] text-slate-400 font-bold block mb-0.5">盐</span>
            <span className="text-sm font-extrabold text-rose-500 tabular-nums">
              {currentNutrition.salt.toFixed(2)}g
            </span>
          </div>
        </div>

        {/* Customization Details */}
        <div className="px-6 py-5 space-y-4 flex-grow">
          
          {/* Size Selector */}
          {item.supportedSizes && item.supportedSizes.length > 1 && (
            <div className="space-y-1.5 animate-pop">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                选择规格分量
              </h3>
              <div className="bg-slate-100 dark:bg-slate-950/40 p-1 rounded-2xl flex relative border border-slate-200/50 dark:border-slate-800/80">
                {supportedSizes.map((sz) => {
                  const sizeLabels = { S: 'S (小份)', M: 'M (中份)', L: 'L (大份)' };
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
                      {sizeLabels[sz as 'S' | 'M' | 'L']}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-50 dark:border-slate-800/80 pb-2">
            配料微调 (去勾选即可去料)
          </h3>

          <div className="space-y-2 max-h-[30vh] overflow-y-auto no-scrollbar pr-0.5">
            {item.atoms.map((atom) => {
              const isRemovable = atom.removable;
              const isSelected = isRemovable ? !!atomSelection[atom.id] : true;
              
              const displayCal = Math.round(atom.calories * sizeMultiplier);
              const displayPro = (atom.protein * sizeMultiplier).toFixed(1);
              const displayFat = (atom.fat * sizeMultiplier).toFixed(1);
              const displaySalt = (atom.salt * sizeMultiplier).toFixed(2);

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
                      {!isSelected && isRemovable && (
                        <span className="text-rose-500 mr-1.5 font-extrabold">[去]</span>
                      )}
                      {atom.name}
                      {isRemovable && isSelected && (
                        <span className="text-[10px] text-amber-600 dark:text-amber-400 font-normal ml-2">
                          (可选去)
                        </span>
                      )}
                    </span>
                    <span className="text-[10px] text-slate-400 block tabular-nums">
                      {displayCal} kcal • 蛋白质: {displayPro}g • 脂肪: {displayFat}g • 盐: {displaySalt}g
                    </span>
                  </div>

                  <div>
                    {isRemovable ? (
                      <div
                        className={`w-11 h-6 rounded-full p-0.5 transition-all relative ${
                          isSelected ? 'bg-amber-500' : 'bg-slate-200 dark:bg-slate-850'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white shadow-sm switch-dot transform transition-transform duration-200 ${
                            isSelected ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </div>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        基础配方
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="border-t border-slate-100 dark:border-slate-800 p-6 space-y-3 bg-slate-50/50 dark:bg-slate-950/20 flex-shrink-0">
          <div className="flex gap-2">
            {/* Kopieren Button */}
            <button
              onClick={handleKopieren}
              className={`py-4 px-5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all text-sm flex-1 ${
                copied
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 shadow-sm'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  已复制!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  复制数据
                </>
              )}
            </button>

            {/* Warenkorb Button */}
            <button
              onClick={handleAddToTray}
              className="py-4 px-6 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-extrabold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 flex items-center justify-center gap-2 transition-all text-sm flex-[2]"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              放入我的计算盘
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
