import { useMemo } from 'react';
import type { UserProfile, LogEntry, MenuItem } from '../types';
import { FOOD_DATABASE } from '../data/foodDatabase';
import { Trophy, Lightbulb, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SmartRecommendProps {
  profile: UserProfile;
  logs: LogEntry[];
  onQuickLog: (log: LogEntry) => void;
}

interface RecommendedOption {
  id: string;
  name: string;
  items: {
    menuItem: MenuItem;
    customizedAtoms: { id: string; name: string; included: boolean; calories: number }[];
  }[];
  totalCalories: number;
  totalProtein: number;
  totalFat: number;
  totalCarbs: number;
  totalSodium: number;
  tags: string[];
  reason: string;
}

export function SmartRecommend({ profile, logs, onQuickLog }: SmartRecommendProps) {
  // 1. 计算今日已摄入数据
  const totals = useMemo(() => {
    return logs.reduce(
      (acc, log) => {
        acc.calories += log.totalCalories;
        acc.protein += log.totalProtein;
        acc.fat += log.totalFat;
        acc.carbs += log.totalCarbs;
        acc.sodium += log.totalSodium;
        return acc;
      },
      { calories: 0, protein: 0, fat: 0, carbs: 0, sodium: 0 }
    );
  }, [logs]);

  // 2. 计算营养缺口
  const gaps = useMemo(() => {
    return {
      calories: Math.max(0, profile.targetCalories - totals.calories),
      protein: Math.max(0, profile.targetProtein - totals.protein),
      fat: Math.max(0, profile.targetFat - totals.fat),
      carbs: Math.max(0, profile.targetCarbs - totals.carbs),
      sodium: Math.max(0, profile.targetSodium - totals.sodium)
    };
  }, [profile, totals]);

  // 3. 反向智能推荐引擎核心算法
  const recommendations = useMemo((): RecommendedOption[] => {
    if (gaps.calories <= 50) {
      return []; // 热量额度已满，不推荐多吃
    }

    const list: RecommendedOption[] = [];

    // 定义几种预设的极致硬核“去酱/魔改”方案
    const getCustomizedItem = (item: MenuItem, removeAllSauces: boolean, removeCheese: boolean = false) => {
      let cal = 0, p = 0, f = 0, c = 0, na = 0;
      const customizedAtoms = item.atoms.map((atom) => {
        let included = atom.default;
        if (atom.removable) {
          if (atom.type === 'sauce' && removeAllSauces) {
            included = false;
          }
          if (atom.type === 'cheese' && removeCheese) {
            included = false;
          }
        }
        
        if (included) {
          cal += atom.calories;
          p += atom.protein;
          f += atom.fat;
          c += atom.carbs;
          na += atom.sodium;
        }
        return { id: atom.id, name: atom.name, included, calories: atom.calories };
      });

      return {
        menuItem: item,
        customizedAtoms,
        nutrition: { calories: cal, protein: p, fat: f, carbs: c, sodium: na }
      };
    };

    // 扫描单品并生成其去酱版本
    FOOD_DATABASE.forEach((item) => {
      // 方案 A: 原装默认单品
      const original = getCustomizedItem(item, false, false);
      // 方案 B: 极致去酱版 (如果有酱的话)
      const hasSauce = item.atoms.some((a) => a.type === 'sauce' && a.removable);
      const deSauce = hasSauce ? getCustomizedItem(item, true, false) : null;

      // 评估原装单品
      if (original.nutrition.calories <= gaps.calories && original.nutrition.fat <= gaps.fat) {
        let score = (original.nutrition.protein / original.nutrition.calories) * 100; // 蛋白质热量比
        if (original.nutrition.protein > 10) score += 20; // 蛋白质奖励
        if (original.nutrition.fat < 5) score += 15; // 低脂奖励
        
        list.push({
          id: `single_${item.id}_orig`,
          name: item.name,
          items: [{ menuItem: item, customizedAtoms: original.customizedAtoms }],
          ...original.nutrition,
          tags: original.nutrition.protein >= 15 ? ['高蛋白质', '经典配方'] : ['低卡轻食'],
          reason: `提供 ${original.nutrition.protein}g 优质蛋白质，完美契合当前热量额度。`,
          // score 用作内部排序
          ...({ score } as any)
        });
      }

      // 评估极致去酱版
      if (deSauce && deSauce.nutrition.calories <= gaps.calories && deSauce.nutrition.fat <= gaps.fat) {
        let score = (deSauce.nutrition.protein / deSauce.nutrition.calories) * 100;
        score += 35; // 去酱享受极大自律分加成
        if (deSauce.nutrition.protein > 10) score += 20;
        
        list.push({
          id: `single_${item.id}_desauce`,
          name: `${item.name} (去酱)`,
          items: [{ menuItem: item, customizedAtoms: deSauce.customizedAtoms }],
          ...deSauce.nutrition,
          tags: ['极致控卡', '高蛋白质', '健身必备'],
          reason: `主动去除高脂酱料，瞬间省下 ${item.atoms.find(a => a.type === 'sauce')?.calories || 60} kcal！保留了纯净蛋白质。`,
          ...({ score } as any)
        });
      }
    });

    // 智能组合生成器：生成 [主食魔改 + 饮品] 的黄金组合
    const burgers = FOOD_DATABASE.filter((i) => i.category === 'burger');
    const drinks = FOOD_DATABASE.filter((i) => i.category === 'drink');

    burgers.forEach((burger) => {
      drinks.forEach((drink) => {
        // 尝试 [去酱汉堡 + 饮品]
        const burgerDeSauce = getCustomizedItem(burger, true, false);
        const drinkOrig = getCustomizedItem(drink, false, false);

        const comboCalories = burgerDeSauce.nutrition.calories + drinkOrig.nutrition.calories;
        const comboProtein = burgerDeSauce.nutrition.protein + drinkOrig.nutrition.protein;
        const comboFat = burgerDeSauce.nutrition.fat + drinkOrig.nutrition.fat;
        const comboCarbs = burgerDeSauce.nutrition.carbs + drinkOrig.nutrition.carbs;
        const comboSodium = burgerDeSauce.nutrition.sodium + drinkOrig.nutrition.sodium;

        if (comboCalories <= gaps.calories && comboFat <= gaps.fat && comboSodium <= gaps.sodium) {
          let score = (comboProtein / comboCalories) * 120;
          if (drink.id === 'mcd_010') score += 40; // 纯牛奶高蛋白加成
          if (drink.id === 'mcd_009') score += 20; // 零度可乐零热量加成
          score += 40; // 组合拳加分

          let comboName = `${burger.name} (去酱) + ${drink.name}`;
          let tags = ['黄金搭档', '极速饱腹'];
          let reason = '';

          if (drink.id === 'mcd_010') {
            tags.push('超级钙质', '双重蛋白');
            reason = `去酱汉堡搭配纯牛奶，蛋白质直接爆表 ${comboProtein.toFixed(1)}g！完美契合你的蛋白质缺口。`;
          } else if (drink.id === 'mcd_009') {
            tags.push('快乐无负担');
            reason = `使用无糖零度可乐，以最低热量成本获得满分快乐，脂肪仅有 ${comboFat.toFixed(1)}g。`;
          } else {
            reason = `高性价比控卡套餐，蛋白质饱腹感极佳，下午工作元气满满。`;
          }

          list.push({
            id: `combo_${burger.id}_${drink.id}`,
            name: comboName,
            items: [
              { menuItem: burger, customizedAtoms: burgerDeSauce.customizedAtoms },
              { menuItem: drink, customizedAtoms: drinkOrig.customizedAtoms }
            ],
            totalCalories: comboCalories,
            totalProtein: comboProtein,
            totalFat: comboFat,
            totalCarbs: comboCarbs,
            totalSodium: comboSodium,
            tags,
            reason,
            ...({ score } as any)
          });
        }
      });
    });

    // 按照 Match Score 降序排列，取前 3 个最优解
    return list
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, 3);
  }, [gaps, totals]);

  const handleQuickLog = (option: RecommendedOption) => {
    // 依次记录组合中的菜品
    option.items.forEach((itemOpt) => {
      const loggedAtoms = itemOpt.menuItem.atoms.map((atom) => {
        const custom = itemOpt.customizedAtoms.find((a) => a.id === atom.id);
        return {
          id: atom.id,
          name: atom.name,
          calories: atom.calories,
          protein: atom.protein,
          fat: atom.fat,
          carbs: atom.carbs,
          sodium: atom.sodium,
          included: custom ? custom.included : atom.default
        };
      });

      const currentNutrition = loggedAtoms.reduce(
        (acc, atom) => {
          if (atom.included) {
            acc.calories += atom.calories;
            acc.protein += atom.protein;
            acc.fat += atom.fat;
            acc.carbs += atom.carbs;
            acc.sodium += atom.sodium;
          }
          return acc;
        },
        { calories: 0, protein: 0, fat: 0, carbs: 0, sodium: 0 }
      );

      const entry: LogEntry = {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toISOString(),
        itemId: itemOpt.menuItem.id,
        itemName: itemOpt.menuItem.name,
        category: itemOpt.menuItem.category,
        atoms: loggedAtoms,
        totalCalories: currentNutrition.calories,
        totalProtein: currentNutrition.protein,
        totalFat: currentNutrition.fat,
        totalCarbs: currentNutrition.carbs,
        totalSodium: currentNutrition.sodium
      };

      onQuickLog(entry);
    });

    // 撒花庆祝智能点餐
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#2f80ed', '#f2c94c', '#27ae60']
    });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-6 animate-pop">
      {/* 1. 营养缺口报告卡片 */}
      <div className="glass rounded-3xl p-6 shadow-md bg-gradient-to-br from-white/90 to-blue-500/[0.01] dark:from-slate-900/90 dark:to-blue-500/[0.005]">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-1.5">
          <Lightbulb className="w-4 h-4 text-blue-500" />
          当前营养缺口分析
        </h2>

        {gaps.calories <= 50 ? (
          <div className="text-center py-4 space-y-2">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-800 dark:text-slate-200">今日热量预算已达成！</h3>
            <p className="text-xs text-slate-400 max-w-[80%] mx-auto leading-relaxed">
              干得漂亮，你今天的热量额度已经非常饱满。让肠胃稍作休息，明天继续健康打卡吧！
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50/50 dark:bg-slate-950/20 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80">
              <span className="text-[10px] text-slate-400 font-bold block mb-0.5">剩余热量预算</span>
              <span className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-baseline">
                {gaps.calories} <span className="text-xs font-normal text-slate-400 ml-0.5">kcal</span>
              </span>
            </div>
            <div className="bg-slate-50/50 dark:bg-slate-950/20 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80">
              <span className="text-[10px] text-slate-400 font-bold block mb-0.5">剩余蛋白质缺口</span>
              <span className="text-2xl font-extrabold text-blue-500 flex items-baseline">
                {gaps.protein.toFixed(1)} <span className="text-xs font-normal text-slate-400 ml-0.5">g</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 2. 反向推荐卡片 */}
      {gaps.calories > 50 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              基于当前剩余额度的智能方案
            </h3>
            <span className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold px-2 py-0.5 rounded-lg">
              实时更新
            </span>
          </div>

          {recommendations.length > 0 ? (
            <div className="space-y-4">
              {recommendations.map((option) => (
                <div
                  key={option.id}
                  className="glass rounded-3xl p-5 shadow-lg border border-slate-100 dark:border-slate-800 relative overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-xl"
                >
                  {/* 右上角渐变装饰块 */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/[0.04] to-transparent rounded-bl-full" />

                  {/* 推荐名与标签组 */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {option.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-bold px-2 py-0.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                      {option.name}
                    </h4>
                  </div>

                  {/* 核心营养素指标 */}
                  <div className="grid grid-cols-4 gap-2 bg-slate-50/50 dark:bg-slate-950/20 py-2.5 px-3 rounded-2xl border border-slate-100 dark:border-slate-800/80 my-4 text-center">
                    <div>
                      <span className="text-[9px] text-slate-400 block font-semibold leading-none mb-0.5">热量</span>
                      <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 tabular-nums">
                        {Math.round(option.totalCalories)}k
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block font-semibold leading-none mb-0.5">蛋白</span>
                      <span className="text-xs font-extrabold text-blue-500 tabular-nums">
                        {option.totalProtein.toFixed(1)}g
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block font-semibold leading-none mb-0.5">脂肪</span>
                      <span className="text-xs font-extrabold text-amber-500 tabular-nums">
                        {option.totalFat.toFixed(1)}g
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block font-semibold leading-none mb-0.5">钠</span>
                      <span className="text-xs font-extrabold text-rose-500 tabular-nums">
                        {Math.round(option.totalSodium)}m
                      </span>
                    </div>
                  </div>

                  {/* 推荐理由 */}
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-50 dark:border-slate-800/80 pt-3">
                    {option.reason}
                  </p>

                  {/* 一键记录按钮 */}
                  <button
                    onClick={() => handleQuickLog(option)}
                    className="w-full mt-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl text-xs font-bold shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 flex items-center justify-center gap-1 transition-all"
                  >
                    一键记入今日就餐
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass rounded-3xl p-8 text-center text-slate-400 dark:text-slate-500 space-y-2 border border-dashed border-slate-200 dark:border-slate-800">
              <Zap className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto" />
              <div className="text-sm font-semibold">无合适推荐方案</div>
              <p className="text-xs max-w-[80%] mx-auto leading-relaxed">
                当前剩余卡路里额度较小或蛋白质已经很充足。你可以去“原子点餐台”看看无卡路里的美式咖啡或零度可乐。
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
