import React, { useState } from 'react';
import type { UserProfile } from '../types';
import { Activity, Target, User, ArrowRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number | ''>(25);
  const [height, setHeight] = useState<number | ''>(175);
  const [weight, setWeight] = useState<number | ''>(70);
  const [activityLevel, setActivityLevel] = useState<1.2 | 1.375 | 1.55>(1.2);
  const [goal, setGoal] = useState<'lose' | 'gain' | 'maintain'>('lose');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    // 默认或安全边界处理
    const finalAge = Math.max(1, Math.min(120, Number(age) || 25));
    const finalHeight = Math.max(50, Math.min(250, Number(height) || 175));
    const finalWeight = Math.max(10, Math.min(300, Number(weight) || 70));

    // Mifflin-St Jeor 公式
    let bmr = 0;
    if (gender === 'male') {
      bmr = 10 * finalWeight + 6.25 * finalHeight - 5 * finalAge + 5;
    } else {
      bmr = 10 * finalWeight + 6.25 * finalHeight - 5 * finalAge - 161;
    }

    const tdee = Math.round(bmr * activityLevel);

    // 根据目标确定热量与营养素预算
    let targetCalories = tdee;
    let proteinMultiplier = 1.6; // 克数/公斤体重
    let fatRatio = 0.25; // 脂肪占总热量比例

    if (goal === 'lose') {
      targetCalories = Math.max(1200, tdee - 500); // 至少 1200 kcal
      proteinMultiplier = 2.0; // 减脂高蛋白，防止肌肉流失
      fatRatio = 0.20; // 控油
    } else if (goal === 'gain') {
      targetCalories = tdee + 300;
      proteinMultiplier = 1.8;
      fatRatio = 0.25;
    } else {
      targetCalories = tdee;
      proteinMultiplier = 1.5;
      fatRatio = 0.25;
    }

    // 宏量元素克数计算
    const targetProtein = Math.round(finalWeight * proteinMultiplier);
    // 脂肪热量 = 目标热量 * 比例，1g 脂肪 = 9 kcal
    const targetFat = Math.round((targetCalories * fatRatio) / 9);
    // 蛋白质占热量 (4 kcal/g)，脂肪占热量 (9 kcal/g)，其余分配给碳水化合物 (4 kcal/g)
    const carbCalories = targetCalories - (targetProtein * 4 + targetFat * 9);
    const targetCarbs = Math.round(Math.max(50, carbCalories / 4)); // 至少 50g 碳水
    const targetSodium = goal === 'lose' ? 2000 : 2300; // 钠上限 mg

    const profile: UserProfile = {
      gender,
      age: finalAge,
      height: finalHeight,
      weight: finalWeight,
      activityLevel,
      goal,
      tdee,
      targetCalories,
      targetProtein,
      targetFat,
      targetCarbs,
      targetSodium
    };

    onComplete(profile);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 animate-pop">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 mb-4 pulse-ring">
          <span className="text-3xl font-bold">M</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">McNutri</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
          麦当劳精准营养助手 • 开启你的控卡新纪元
        </p>
      </div>

      <form onSubmit={handleCalculate} className="glass rounded-3xl p-6 shadow-xl space-y-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
          <User className="w-5 h-5 text-amber-500" />
          创建你的健康画像
        </h2>

        {/* 性别选择 */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">生理性别</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setGender('male')}
              className={`py-3 rounded-2xl font-medium border text-sm transition-all ${
                gender === 'male'
                  ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/10'
                  : 'bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              男生
            </button>
            <button
              type="button"
              onClick={() => setGender('female')}
              className={`py-3 rounded-2xl font-medium border text-sm transition-all ${
                gender === 'female'
                  ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/10'
                  : 'bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              女生
            </button>
          </div>
        </div>

        {/* 身高、体重、年龄 */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">年龄 (岁)</label>
            <input
              type="number"
              value={age}
              onChange={(e) => {
                const val = e.target.value;
                setAge(val === '' ? '' : parseInt(val) || 0);
              }}
              className="w-full py-2.5 px-3 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-center font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">身高 (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => {
                const val = e.target.value;
                setHeight(val === '' ? '' : parseInt(val) || 0);
              }}
              className="w-full py-2.5 px-3 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-center font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">体重 (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => {
                const val = e.target.value;
                setWeight(val === '' ? '' : parseInt(val) || 0);
              }}
              className="w-full py-2.5 px-3 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-center font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* 活动强度 */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-slate-400" />
            日常活动强度
          </label>
          <div className="space-y-2">
            {[
              { val: 1.2, label: '久坐不动', desc: '办公室工作，几乎没有运动' },
              { val: 1.375, label: '轻度活跃', desc: '每周轻度运动 1-3 次' },
              { val: 1.55, label: '中度活跃', desc: '每周中等强度运动 3-5 次' }
            ].map((item) => (
              <button
                key={item.val}
                type="button"
                onClick={() => setActivityLevel(item.val as any)}
                className={`w-full p-3.5 rounded-2xl border text-left flex justify-between items-center transition-all ${
                  activityLevel === item.val
                    ? 'bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400'
                    : 'bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div>
                  <div className="text-sm font-semibold">{item.label}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  activityLevel === item.val ? 'border-amber-500 bg-amber-500' : 'border-slate-300 dark:border-slate-700'
                }`}>
                  {activityLevel === item.val && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 身体目标 */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1">
            <Target className="w-3.5 h-3.5 text-slate-400" />
            你的阶段性目标
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: 'lose', label: '健康减脂', desc: '控卡/控油' },
              { val: 'maintain', label: '维持体重', desc: '均衡膳食' },
              { val: 'gain', label: '高效增肌', desc: '超盈卡路里' }
            ].map((item) => (
              <button
                key={item.val}
                type="button"
                onClick={() => setGoal(item.val as any)}
                className={`p-3 rounded-2xl border transition-all text-center flex flex-col items-center justify-center ${
                  goal === item.val
                    ? 'bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400'
                    : 'bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <span className="text-sm font-bold block">{item.label}</span>
                <span className="text-[10px] text-slate-400 mt-1 block leading-none">{item.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 提交按钮 */}
        <button
          type="submit"
          className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-semibold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 flex items-center justify-center gap-2 transition-all"
        >
          生成我的精准营养画像
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
