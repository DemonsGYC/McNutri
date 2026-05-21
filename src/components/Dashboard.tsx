import { useMemo, useState } from 'react';
import type { UserProfile, LogEntry } from '../types';
import { Award, Sparkles, Trash2, Info, X } from 'lucide-react';

interface DashboardProps {
  profile: UserProfile;
  logs: LogEntry[];
  onClearLogs: () => void;
}

export function Dashboard({ profile, logs, onClearLogs }: DashboardProps) {
  const [selectedNutrient, setSelectedNutrient] = useState<'protein' | 'fat' | 'carbs' | 'sodium' | null>(null);

  // 计算今天的所有摄入量
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

  // 计算剩余热量和比例
  const remainingCalories = Math.max(0, profile.targetCalories - totals.calories);
  const caloriePercent = Math.min(100, (totals.calories / profile.targetCalories) * 100);

  // 计算节省下来的酱料热量 (去酱/去芝士省下来的总热量)
  const savedCalories = useMemo(() => {
    let saved = 0;
    logs.forEach((log) => {
      log.atoms.forEach((atom) => {
        // 如果该原子是可移除的，且默认是包含的，但用户在吃的时候把它去掉了 (included: false)
        if (!atom.included) {
          saved += atom.calories;
        }
      });
    });
    return saved;
  }, [logs]);

  // 动态状态反馈文案 (模仿 Apple Health 的极简贴心语气)
  const dynamicTip = useMemo(() => {
    if (logs.length === 0) {
      return {
        title: '开启精准第一餐',
        desc: '今天尚未记录。点击下方的“原子点餐台”，去定制你的第一款极简轻量级麦当劳单品吧！'
      };
    }

    if (savedCalories > 0) {
      const burgerEquivalent = Math.round((savedCalories / 335) * 10) / 10;
      if (burgerEquivalent >= 0.5) {
        return {
          title: '控卡大师！',
          desc: `干得漂亮！因为你今天主动勾选了“去酱/去芝士”，累计直接省下了 ${savedCalories} kcal 热量，这相当于少吃了将近 ${burgerEquivalent} 个麦香鱼汉堡！`
        };
      }
      return {
        title: '微习惯，大改变',
        desc: `优秀的细节把控！你今天通过“去酱/去盐”省下了 ${savedCalories} kcal，午餐轻松消除了快餐负担，快给你的自律点个赞吧。`
      };
    }

    // 蛋白质达成度高
    const proteinPercent = (totals.protein / profile.targetProtein) * 100;
    if (proteinPercent > 50) {
      return {
        title: '蛋白质弹药充足',
        desc: `太棒了！今天已摄入 ${Math.round(totals.protein)}g 蛋白质，完美填补了身体肌纤维的修复缺口，继续保持高品质营养摄入！`
      };
    }

    // 默认控卡反馈
    if (totals.calories < profile.targetCalories * 0.8) {
      return {
        title: '身体状况极佳',
        desc: `当前热量额度充足。反向智能推荐已为你解锁高蛋白单品组合，在享受麦当劳的同时从容控卡。`
      };
    }

    return {
      title: '享受低焦虑快餐',
      desc: '即使卡路里即将填满，科学计算的宏量营养素也已稳步锁定，告别负罪感，专注你的纯净卡路里管理。'
    };
  }, [logs, savedCalories, totals.protein, profile.targetProtein, totals.calories, profile.targetCalories]);

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-6 animate-pop">
      {/* 1. 核心大数字看板 */}
      <div className="glass rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden">
        {/* 背景光晕装饰 */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full filter blur-xl -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full filter blur-xl translate-x-1/3 translate-y-1/3" />

        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 block mb-1">
          今日剩余热量预算
        </span>

        {/* 环形进度条环绕的核心大数字 */}
        <div className="relative w-48 h-48 flex items-center justify-center my-4">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* 底色环 */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-slate-100 dark:stroke-slate-800"
              strokeWidth="2.5"
              fill="transparent"
            />
            {/* 进度环 */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-amber-500 transition-all duration-500"
              strokeWidth="3.5"
              strokeDasharray={`${2 * Math.PI * 44}`}
              strokeDashoffset={`${2 * Math.PI * 44 * (1 - caloriePercent / 100)}`}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* 中央文本内容 */}
          <div className="absolute flex flex-col items-center text-center">
            <span className="text-4xl font-extrabold tracking-tighter text-slate-900 dark:text-white">
              {remainingCalories}
            </span>
            <span className="text-xs text-slate-400 mt-0.5">kcal</span>
          </div>
        </div>

        {/* 今日热量数据横向对比 */}
        <div className="grid grid-cols-2 gap-8 w-full border-t border-slate-100 dark:border-slate-800/80 pt-4 mt-2">
          <div className="text-center">
            <span className="text-xs text-slate-400 block mb-0.5">已摄入</span>
            <span className="text-lg font-bold text-slate-800 dark:text-slate-200">
              {Math.round(totals.calories)} <span className="text-xs font-normal text-slate-400">kcal</span>
            </span>
          </div>
          <div className="text-center">
            <span className="text-xs text-slate-400 block mb-0.5">目标预算</span>
            <span className="text-lg font-bold text-slate-800 dark:text-slate-200">
              {profile.targetCalories} <span className="text-xs font-normal text-slate-400">kcal</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. 模仿 Apple Health 的极细三大宏量营养素进度条 */}
      <div className="glass rounded-3xl p-6 shadow-md space-y-4">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            宏量营养素消耗
          </h3>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium flex items-center gap-0.5">
            <Info className="w-3 h-3" />
            点击任一条目了解科普
          </span>
        </div>

        {/* 蛋白质 Protein */}
        <div 
          onClick={() => setSelectedNutrient('protein')}
          className="space-y-1.5 cursor-pointer hover:bg-slate-100/40 dark:hover:bg-slate-800/40 p-2 -mx-2 rounded-2xl transition-all duration-200 group"
          title="点击查看蛋白质科普与膳食来源"
        >
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 block" />
              蛋白质 (P)
              <Info className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
            <span className="text-slate-500">
              {Math.round(totals.protein)} / {profile.targetProtein} g
            </span>
          </div>
          <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (totals.protein / profile.targetProtein) * 100)}%` }}
            />
          </div>
        </div>

        {/* 脂肪 Fat */}
        <div 
          onClick={() => setSelectedNutrient('fat')}
          className="space-y-1.5 cursor-pointer hover:bg-slate-100/40 dark:hover:bg-slate-800/40 p-2 -mx-2 rounded-2xl transition-all duration-200 group"
          title="点击查看脂肪科普与膳食来源"
        >
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 block" />
              脂肪 (F)
              <Info className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
            <span className="text-slate-500">
              {Math.round(totals.fat)} / {profile.targetFat} g
            </span>
          </div>
          <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (totals.fat / profile.targetFat) * 100)}%` }}
            />
          </div>
        </div>

        {/* 碳水化合物 Carbs */}
        <div 
          onClick={() => setSelectedNutrient('carbs')}
          className="space-y-1.5 cursor-pointer hover:bg-slate-100/40 dark:hover:bg-slate-800/40 p-2 -mx-2 rounded-2xl transition-all duration-200 group"
          title="点击查看碳水化合物科普与膳食来源"
        >
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block" />
              碳水化合物 (C)
              <Info className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
            <span className="text-slate-500">
              {Math.round(totals.carbs)} / {profile.targetCarbs} g
            </span>
          </div>
          <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (totals.carbs / profile.targetCarbs) * 100)}%` }}
            />
          </div>
        </div>

        {/* 钠 额外标识 */}
        <div 
          onClick={() => setSelectedNutrient('sodium')}
          className="border-t border-slate-100 dark:border-slate-800/80 pt-3 mt-1 flex justify-between items-center text-xs font-semibold text-slate-500 cursor-pointer hover:bg-slate-100/40 dark:hover:bg-slate-800/40 p-2 -mx-2 rounded-2xl transition-all duration-200 group"
          title="点击查看为什么要限钠及疾病警示"
        >
          <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 block" />
            钠摄入限制
            <Info className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </span>
          <span className={`${totals.sodium > profile.targetSodium ? 'text-rose-500 font-extrabold' : 'text-slate-500'}`}>
            {Math.round(totals.sodium)} / {profile.targetSodium} mg
          </span>
        </div>
      </div>

      {/* 3. 智能状态动态语卡片 */}
      <div className="glass rounded-3xl p-5 shadow-sm border border-amber-500/10 bg-gradient-to-br from-white/80 to-amber-500/[0.02] dark:from-slate-900/80 dark:to-amber-500/[0.01] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Sparkles className="w-12 h-12 text-amber-500" />
        </div>
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500 mt-0.5">
            <Award className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{dynamicTip.title}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{dynamicTip.desc}</p>
          </div>
        </div>
      </div>

      {/* 4. 今日就餐历史记录 */}
      {logs.length > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              今日吃过的单品
            </h3>
            <button
              onClick={onClearLogs}
              className="text-xs font-semibold text-rose-500 dark:text-rose-400 hover:opacity-80 flex items-center gap-1 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              清空记录
            </button>
          </div>

          <div className="space-y-2">
            {logs.map((log) => {
              // 找出有哪些原子是被去掉的 (included: false)
              const removedNames = log.atoms
                .filter((a) => !a.included)
                .map((a) => a.name.replace('特制', '').replace('经典', '').replace('新鲜', ''));

              return (
                <div
                  key={log.id}
                  className="glass rounded-2xl p-4 shadow-sm flex justify-between items-center relative overflow-hidden"
                >
                  <div className="space-y-1 pr-4">
                    <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      {log.itemName}
                      {log.selectedSize && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold leading-none">
                          {{ S: '小杯', M: '中杯', L: '大杯' }[log.selectedSize]}
                        </span>
                      )}
                      {removedNames.length > 0 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold leading-none">
                          已魔改
                        </span>
                      )}
                    </div>
                    {removedNames.length > 0 ? (
                      <p className="text-[11px] text-slate-400 dark:text-slate-500">
                        去除了: {removedNames.join('、')}
                      </p>
                    ) : (
                      <p className="text-[11px] text-slate-400 dark:text-slate-500">保留了默认原厂配方</p>
                    )}
                    <span className="text-[10px] text-slate-300 dark:text-slate-600 block pt-0.5">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-bold text-slate-800 dark:text-slate-200 block">
                      +{Math.round(log.totalCalories)}
                    </span>
                    <span className="text-[10px] text-slate-400 block">kcal</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* 5. 营养素科普详情模态框 (Apple Health 极简风) */}
      {selectedNutrient && (() => {
        const info = NUTRIENT_DETAILS[selectedNutrient];
        return (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-fade-in" onClick={() => setSelectedNutrient(null)}>
            <div 
              className="glass w-full max-w-md rounded-t-[32px] rounded-b-[24px] p-6 space-y-5 shadow-2xl relative overflow-y-auto max-h-[85vh] animate-pop" 
              onClick={(e) => e.stopPropagation()}
            >
              {/* 顶部指示条 */}
              <div className="w-12 h-1 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto -mt-2 mb-2 pointer-events-none" />

              {/* 头部标题 */}
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">
                    科普与膳食指导 (点击灰色区域可关闭)
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2 font-sans">
                    <span className={`w-3 h-3 rounded-full ${info.colorClass}`} />
                    {info.name}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedNutrient(null)}
                  className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-350 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 科普内容 */}
              <div className="space-y-4 text-slate-750 dark:text-slate-300 text-xs leading-relaxed">
                {/* 介绍 */}
                <div className="bg-slate-50/60 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                  <p className="font-semibold text-slate-800 dark:text-slate-200 leading-normal">{info.intro}</p>
                </div>

                {/* 钠危害警告块 */}
                {'warnings' in info && (
                  <div className="bg-rose-500/5 dark:bg-rose-500/[0.02] border border-rose-500/10 p-4 rounded-2xl space-y-2.5">
                    <h4 className="font-bold text-rose-500 flex items-center gap-1.5 text-xs">
                      {info.warnings.title}
                    </h4>
                    <ul className="space-y-2 text-[11px] text-slate-650 dark:text-slate-400 leading-normal">
                      {info.warnings.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="text-rose-400 font-bold">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 对身体的好处 */}
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-950 dark:text-white flex items-center gap-1.5">
                    💪 对身体的核心益处
                  </h4>
                  <ul className="grid grid-cols-1 gap-2 pl-1">
                    {info.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${selectedNutrient === 'sodium' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'} leading-none`}>
                          0{i + 1}
                        </span>
                        <span className="text-slate-600 dark:text-slate-400">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 食物推荐 */}
                <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                  <h4 className="font-bold text-slate-950 dark:text-white flex items-center gap-1.5">
                    🥦 优质膳食来源推荐
                  </h4>
                  
                  <div className="space-y-2 text-[11px]">
                    <div className="bg-amber-500/5 dark:bg-amber-500/[0.01] border border-amber-500/10 p-3 rounded-xl">
                      <span className="font-bold text-amber-600 dark:text-amber-400 block mb-0.5">麦当劳就餐指导</span>
                      <p className="text-slate-500 dark:text-slate-400 leading-normal">{info.foods.mcd}</p>
                    </div>
                    <div className="bg-blue-500/5 dark:bg-blue-500/[0.01] border border-blue-500/10 p-3 rounded-xl">
                      <span className="font-bold text-blue-600 dark:text-blue-400 block mb-0.5">日常饮食优质来源</span>
                      <p className="text-slate-500 dark:text-slate-400 leading-normal">{info.foods.daily}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 底部确认按钮 */}
              <button 
                onClick={() => setSelectedNutrient(null)}
                className={`w-full py-3 text-white rounded-2xl text-xs font-bold transition-all shadow-md ${
                  selectedNutrient === 'sodium'
                    ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/10'
                    : 'bg-slate-800 hover:bg-slate-900 dark:bg-slate-200 dark:hover:bg-white dark:text-slate-900 shadow-slate-900/15'
                }`}
              >
                我已了解
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

const NUTRIENT_DETAILS = {
  protein: {
    name: '蛋白质 (Protein)',
    colorClass: 'bg-blue-500',
    textColorClass: 'text-blue-500 dark:text-blue-400',
    intro: '蛋白质是生命活动的物质基础，是构成人体细胞和组织（尤其是肌肉纤维）的重要基石。',
    benefits: [
      '促进肌肉修复与生长，是增肌和维持代谢的核心保障。',
      '维持健全的免疫功能，参与抗体和免疫细胞的合成。',
      '作为合成多种激素和酶的原料，加速身体新陈代谢。',
      '提供极佳且持久的饱腹感，有效减缓胃排空并帮助控食。'
    ],
    foods: {
      mcd: '麦当劳健康选择：板烧鸡腿排（去酱）、鳕鱼排、纯牛奶、麦乐鸡块（不蘸酱）。',
      daily: '日常优质来源：去皮鸡胸肉、牛腱子、三文鱼、鸡蛋、豆腐、希腊酸奶。'
    }
  },
  fat: {
    name: '脂肪 (Fat)',
    colorClass: 'bg-amber-400',
    textColorClass: 'text-amber-500 dark:text-amber-400',
    intro: '脂肪是不可或缺的宏量营养素与高效储能物质，并非健康“大敌”。合理摄入优质不饱和脂肪，对维持荷尔蒙与心血管健康至关重要。',
    benefits: [
      '促进脂溶性维生素（A、D、E、K）在肠道内的吸收与运输利用。',
      '包裹并垫衬保护体内骨骼内脏器官，维持机体体温恒定。',
      '深度参与细胞膜构建以及生殖、应激等多种荷尔蒙的生物合成。',
      '提供必需脂酸，保护中枢神经系统髓鞘，促皮肤光泽。'
    ],
    foods: {
      mcd: '麦当劳适量来源：经典切达吉士片（含优质钙与动物蛋白，但含盐与脂肪，需控量）。',
      daily: '日常优质来源：牛油果、特级初榨橄榄油、核桃、扁桃仁、深海鱼油、亚麻籽。'
    }
  },
  carbs: {
    name: '碳水化合物 (Carbs)',
    colorClass: 'bg-emerald-500',
    textColorClass: 'text-emerald-500 dark:text-emerald-400',
    intro: '碳水化合物是人体最直接、最清洁的能量供给源，是大脑中枢神经系统与红细胞首选的唯一能量燃料。',
    benefits: [
      '快速补充肌肉与肝脏糖原储备，为脑部思考和高强度运动提供源源不断的动力。',
      '发挥节省蛋白质效应，防止机体因能量不足而被迫分解宝贵的肌肉作为燃料。',
      '高膳食纤维的优质碳水能显著促进胃肠蠕动，滋养健康益生菌群。',
      '保持血糖水平的稳定起伏，防止能量暴跌并稳定脑内血清素（情绪）。'
    ],
    foods: {
      mcd: '麦当劳适量来源：经典芝麻面包、蒸面包、中薯条（油炸淀粉，升糖较快需控量）。',
      daily: '日常优质来源：燕麦片、糙米、红薯、藜麦、南瓜、全麦黑麦面包。'
    }
  },
  sodium: {
    name: '钠 (Sodium)',
    colorClass: 'bg-rose-500',
    textColorClass: 'text-rose-500 dark:text-rose-400',
    intro: '钠是人体必需的电解质，负责维持细胞内外体液平衡、渗透压及神经肌肉传导。然而现代快餐加工中高盐广泛存在，世界卫生组织建议成年人每日钠摄入应限制在 2000mg（约5g食盐）以内。',
    benefits: [
      '维持体液渗透压与水分的合理分布，保障细胞形态和功能正常。',
      '协同氢离子调节体内酸碱平衡，协助神经动作电位传递。',
      '与钾离子协同工作，调节心脏肌肉收缩力和心率平衡。'
    ],
    warnings: {
      title: '⚠️ 长期高钠（高盐）摄入对身体的危害与相关疾病：',
      points: [
        '【顽固高血压】多余的钠会滞留体内水分，导致全身血容量剧增，使得外周血管阻力显著上升，极易诱发或加重高血压病。',
        '【心脑血管卒中】持续的血流高压会腐蚀血管内膜，导致动脉硬化与斑块破裂，使脑梗死（中风）、心肌梗死及心力衰竭发病率飙升。',
        '【慢性肾衰竭】肾脏是排泄钠的唯一脏器，长期的超负荷过滤钠会导致肾小球内压过高而硬化萎缩，诱发慢性肾小球肾炎与尿毒症。',
        '【骨质疏松症】肾脏在排泄多余钠离子的同时，会强制顺带将同比例的钙离子排入尿液（即“多排一克钠，流失三克钙”），致使骨密度断崖式下降。',
        '【胃炎与胃癌】超量的盐分在胃部形成高渗环境，可直接腐蚀、物理破坏胃黏膜保护屏障，引起弥漫性胃黏膜水肿、胃溃疡并诱发胃癌。'
      ]
    },
    foods: {
      mcd: '麦当劳就餐避坑绝招：第一，薯条选择“去盐”（即点即炸且立刻扣减大量钠）；第二，汉堡选择“去酱”与“去酸黄瓜”（特制酱汁和腌黄瓜是看不见的钠盐超级巨头）。',
      daily: '日常控钠选择：增加钾的摄入（香蕉、椰子水、深色叶菜），“以钾排钠”；做菜时利用柠檬汁、黑胡椒或天然辛香料增味，并减少味精、豆瓣酱使用。'
    }
  }
};
