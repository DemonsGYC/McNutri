import { useState } from 'react';
import type { UserProfile, LogEntry, FavoritePreset, MenuItem } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { MenuPanel } from './components/MenuPanel';
import { CustomDrawer } from './components/CustomDrawer';
import { SmartRecommend } from './components/SmartRecommend';
import { Favorites } from './components/Favorites';
import { Activity, Utensils, Sparkles, Heart, User, LogOut } from 'lucide-react';

type TabType = 'dashboard' | 'menu' | 'recommend' | 'favorites' | 'profile';

export function App() {
  // 1. 全局持久化状态管理
  const [profile, setProfile] = useLocalStorage<UserProfile | null>('mcnutri_profile', null);
  const [logs, setLogs] = useLocalStorage<LogEntry[]>('mcnutri_logs', []);
  const [favorites, setFavorites] = useLocalStorage<FavoritePreset[]>('mcnutri_favorites', []);
  
  // 当前活动 Tab 页
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  
  // 被选中的定制单品（控制定制抽屉弹出）
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // 2. 各种操作的处理函数
  const handleOnboardingComplete = (newProfile: UserProfile) => {
    setProfile(newProfile);
    setActiveTab('dashboard');
  };

  const handleAddLog = (newEntry: LogEntry) => {
    setLogs((prev) => [newEntry, ...prev]);
  };

  const handleClearLogs = () => {
    if (window.confirm('确定要清空今天的就餐记录吗？')) {
      setLogs([]);
    }
  };

  const handleAddFavorite = (newPreset: FavoritePreset) => {
    setFavorites((prev) => [newPreset, ...prev]);
  };

  const handleRemoveFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  };

  const handleResetProfile = () => {
    if (window.confirm('确定要重置你的身体数据与营养目标吗？此操作不会清除记录。')) {
      setProfile(null);
    }
  };

  const handleFullReset = () => {
    if (window.confirm('警告：此操作将清空所有数据（包括就餐历史与魔改标配）并重新初始化，是否继续？')) {
      window.localStorage.clear();
      setProfile(null);
      setLogs([]);
      setFavorites([]);
      setActiveTab('dashboard');
    }
  };

  // 3. 未建画像时，强制进入 Onboarding 页面
  if (!profile) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] dark:bg-black text-[#1d1d1f] dark:text-slate-100 flex items-center justify-center py-8">
        <Onboarding onComplete={handleOnboardingComplete} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-black text-[#1d1d1f] dark:text-slate-100 flex flex-col pb-24 font-sans antialiased transition-all duration-300">
      
      {/* 顶部标题区 */}
      <header className="sticky top-0 bg-white/70 dark:bg-black/70 backdrop-blur-md border-b border-slate-150/40 dark:border-slate-900/60 z-30 px-6 py-4 flex justify-between items-center max-w-md mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-base shadow-sm">
            M
          </div>
          <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-amber-600 dark:from-white dark:via-slate-200 dark:to-amber-500 bg-clip-text text-transparent">
            McNutri 麦当劳助手
          </span>
        </div>

        {/* 顶部状态快捷展示 */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 block animate-pulse" />
            已画像
          </div>
        </div>
      </header>

      {/* 主体视口 */}
      <main className="flex-grow w-full max-w-md mx-auto overflow-x-hidden">
        {activeTab === 'dashboard' && (
          <Dashboard
            profile={profile}
            logs={logs}
            onClearLogs={handleClearLogs}
          />
        )}
        
        {activeTab === 'menu' && (
          <MenuPanel onSelectItem={setSelectedItem} />
        )}
        
        {activeTab === 'recommend' && (
          <SmartRecommend
            profile={profile}
            logs={logs}
            onQuickLog={handleAddLog}
          />
        )}
        
        {activeTab === 'favorites' && (
          <Favorites
            favorites={favorites}
            onRemoveFavorite={handleRemoveFavorite}
            onAddLog={handleAddLog}
          />
        )}
        
        {activeTab === 'profile' && (
          <div className="px-5 py-6 space-y-6 animate-pop">
            {/* 我的营养画像展示卡片 */}
            <div className="glass rounded-3xl p-6 shadow-md space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-50 dark:border-slate-800 pb-2 flex items-center gap-1.5">
                <User className="w-4 h-4 text-amber-500" />
                当前健康管理画像
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-bold block">生理性别</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {profile.gender === 'male' ? '男生' : '女生'}
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-bold block">年龄</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {profile.age} 岁
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-bold block">身高 / 体重</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {profile.height} cm / {profile.weight} kg
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-bold block">日常目标</span>
                  <span className="text-sm font-bold text-amber-500">
                    {profile.goal === 'lose' ? '健康减脂 (控油卡)' : profile.goal === 'gain' ? '高效增肌' : '维持体重'}
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">每日总消耗 (TDEE)</span>
                  <span className="text-base font-extrabold text-slate-850 dark:text-slate-200">
                    {profile.tdee} kcal
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">限制热量摄入</span>
                  <span className="text-base font-extrabold text-amber-500">
                    {profile.targetCalories} kcal
                  </span>
                </div>
              </div>
            </div>

            {/* 设置操作区 */}
            <div className="space-y-3">
              <button
                onClick={handleResetProfile}
                className="w-full py-4 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-2xl font-bold shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all text-sm"
              >
                重新测算画像数据
              </button>
              
              <button
                onClick={handleFullReset}
                className="w-full py-4 bg-rose-500/10 text-rose-500 rounded-2xl font-bold border border-rose-500/10 flex items-center justify-center gap-2 hover:bg-rose-500/20 transition-all text-sm"
              >
                <LogOut className="w-4 h-4" />
                清空数据重置应用
              </button>
            </div>

            {/* 原型说明 */}
            <div className="text-center text-[10px] text-slate-400 dark:text-slate-500 leading-normal px-4 space-y-1">
              <p>McNutri (麦当劳精准营养助手) - Apple Health 极简主义设计原型</p>
              <p>© 2026 Advanced Agentic Coding. Proudly built with React.</p>
            </div>
          </div>
        )}
      </main>

      {/* 底部浮动导航栏 (Floating Navigation) */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 dark:bg-black/85 backdrop-blur-lg border-t border-slate-150/40 dark:border-slate-900/60 py-2.5 floating-nav">
        <div className="max-w-md mx-auto flex justify-around items-center px-4">
          
          {/* 看板 */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center justify-center py-1 transition-all ${
              activeTab === 'dashboard' ? 'text-amber-500' : 'text-slate-400 dark:text-slate-650 hover:text-slate-600'
            }`}
          >
            <Activity className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[9px] font-bold mt-1">今日看板</span>
          </button>
          
          {/* 原子点餐台 */}
          <button
            onClick={() => setActiveTab('menu')}
            className={`flex flex-col items-center justify-center py-1 transition-all ${
              activeTab === 'menu' ? 'text-amber-500' : 'text-slate-400 dark:text-slate-650 hover:text-slate-600'
            }`}
          >
            <Utensils className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[9px] font-bold mt-1">原子点餐</span>
          </button>
          
          {/* 智能推荐 */}
          <button
            onClick={() => setActiveTab('recommend')}
            className={`flex flex-col items-center justify-center py-1 transition-all ${
              activeTab === 'recommend' ? 'text-amber-500' : 'text-slate-400 dark:text-slate-650 hover:text-slate-600'
            }`}
          >
            <Sparkles className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[9px] font-bold mt-1">反向智能</span>
          </button>
          
          {/* 我的标配 */}
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex flex-col items-center justify-center py-1 transition-all ${
              activeTab === 'favorites' ? 'text-amber-500' : 'text-slate-400 dark:text-slate-650 hover:text-slate-600'
            }`}
          >
            <Heart className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[9px] font-bold mt-1">我的标配</span>
          </button>
          
          {/* 个人中心 */}
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center py-1 transition-all ${
              activeTab === 'profile' ? 'text-amber-500' : 'text-slate-400 dark:text-slate-650 hover:text-slate-600'
            }`}
          >
            <User className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[9px] font-bold mt-1">个人画像</span>
          </button>

        </div>
      </footer>

      {/* 4. 原子化食品定制抽屉 */}
      <CustomDrawer
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddLog={handleAddLog}
        onAddFavorite={handleAddFavorite}
      />

    </div>
  );
}

export default App;
