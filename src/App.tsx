import { useState, useMemo } from 'react';
import type { MenuItem, TrayItem } from './types';
import { MenuPanel } from './components/MenuPanel';
import { CustomDrawer } from './components/CustomDrawer';
import { Copy, Trash2, Check, HelpCircle, Utensils } from 'lucide-react';
import confetti from 'canvas-confetti';

// Daily Reference Intake (RI) for adults in Germany (GDA)
const REFERENCE_INTAKE = {
  calories: 2000, // kcal
  protein: 50,    // g
  fat: 70,        // g
  carbs: 260,     // g
  salt: 6.0       // g
};

export function App() {
  const [trayItems, setTrayItems] = useState<TrayItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [copied, setCopied] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // Add customized item from Drawer to calculate tray
  const handleAddTrayItem = (
    menuItem: MenuItem,
    selectedSize: 'S' | 'M' | 'L' | undefined,
    atomSelection: Record<string, boolean>,
    calculatedNutrition: { calories: number; protein: number; fat: number; carbs: number; salt: number }
  ) => {
    const newItem: TrayItem = {
      id: `${menuItem.id}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      menuItem,
      selectedSize,
      customizedAtoms: atomSelection,
      calculatedNutrition
    };
    setTrayItems((prev) => [...prev, newItem]);
  };

  // Remove specific item from tray
  const handleRemoveTrayItem = (id: string) => {
    setTrayItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear entire tray
  const handleClearTray = () => {
    if (trayItems.length === 0) return;
    if (window.confirm('Möchten Sie Ihr Tablett wirklich leeren? (您确定要清空计算盘吗？)')) {
      setTrayItems([]);
    }
  };

  // Grand totals of all items in the tray
  const grandTotals = useMemo(() => {
    return trayItems.reduce(
      (acc, item) => {
        acc.calories += item.calculatedNutrition.calories;
        acc.protein += item.calculatedNutrition.protein;
        acc.fat += item.calculatedNutrition.fat;
        acc.carbs += item.calculatedNutrition.carbs;
        acc.salt += item.calculatedNutrition.salt;
        return acc;
      },
      { calories: 0, protein: 0, fat: 0, carbs: 0, salt: 0 }
    );
  }, [trayItems]);

  // Format and copy calculated data to clipboard
  const handleKopierenTray = () => {
    if (trayItems.length === 0) return;

    const itemDescriptions = trayItems
      .map((item) => {
        const removedAtoms = item.menuItem.atoms.filter(
          (a) => a.removable && !item.customizedAtoms[a.id]
        );
        const customParts = removedAtoms
          .map((a) => `ohne ${a.name.replace(/\(.*\)/, '').trim()}`)
          .join(', ');
        const sizeSuffix = item.selectedSize ? ` (${item.selectedSize})` : '';
        return `${item.menuItem.name}${sizeSuffix}${customParts ? ` ${customParts}` : ''}`;
      })
      .join(' + ');

    const formattedText = `🍔 McDonald's Custom: ${grandTotals.calories} kcal | P: ${grandTotals.protein.toFixed(
      1
    )}g | F: ${grandTotals.fat.toFixed(1)}g | C: ${grandTotals.carbs.toFixed(
      1
    )}g | Salt: ${grandTotals.salt.toFixed(2)}g (${itemDescriptions})`;

    navigator.clipboard.writeText(formattedText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      // Party confetti burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffc72c', '#da291c', '#ffffff']
      });
    });
  };

  // Calculate percentages relative to Germany GDA reference intakes
  const percentages = useMemo(() => {
    return {
      calories: Math.min((grandTotals.calories / REFERENCE_INTAKE.calories) * 100, 100),
      protein: Math.min((grandTotals.protein / REFERENCE_INTAKE.protein) * 100, 100),
      fat: Math.min((grandTotals.fat / REFERENCE_INTAKE.fat) * 100, 100),
      carbs: Math.min((grandTotals.carbs / REFERENCE_INTAKE.carbs) * 100, 100),
      salt: Math.min((grandTotals.salt / REFERENCE_INTAKE.salt) * 100, 100)
    };
  }, [grandTotals]);

  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-black text-[#1d1d1f] dark:text-slate-100 flex flex-col pb-10 font-sans antialiased transition-all duration-300">
      
      {/* Premium Header */}
      <header className="sticky top-0 bg-white/70 dark:bg-black/70 backdrop-blur-md border-b border-slate-150/40 dark:border-slate-900/60 z-30 px-6 py-4 flex justify-between items-center max-w-md mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-extrabold text-base shadow-sm">
            M
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-amber-600 dark:from-white dark:via-slate-200 dark:to-amber-500 bg-clip-text text-transparent">
              McNutri Calculator
            </span>
            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">
              Deutschland 🇩🇪
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:opacity-80 transition-all"
            title="Referenzwerte anzeigen"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Info Popover */}
      {showInfo && (
        <div className="max-w-md mx-auto px-4 mt-2 animate-pop">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 space-y-2">
            <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-200 mb-1">
              Referenzmengen für einen durchschnittlichen Erwachsenen (GDA)
            </h4>
            <p>Die Prozentwerte beziehen sich auf die EU-Referenzmengen:</p>
            <ul className="list-disc list-inside space-y-0.5 pl-1 font-semibold">
              <li>Energie (Kalorien): 2.000 kcal</li>
              <li>Eiweiß (Protein): 50 g</li>
              <li>Fett: 70 g</li>
              <li>Kohlenhydrate: 260 g</li>
              <li>Salz (Salzäquivalent): 6,0 g</li>
            </ul>
            <p className="text-[10px] text-slate-400">
              *Berechnung auf Basis der atomar ausgewählten Zutaten. Keine Erhebung personenbezogener Daten.
            </p>
          </div>
        </div>
      )}

      {/* Main Core Calculative Tray (Mein Tablett) */}
      <main className="flex-grow w-full max-w-md mx-auto overflow-x-hidden pt-4 px-4 space-y-4">
        
        {/* Apple-Health Styled Live Dashboard Card */}
        <div className="glass rounded-[2rem] p-6 shadow-md border border-slate-100 dark:border-slate-850 space-y-5 relative overflow-hidden transition-all">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <Utensils className="w-4 h-4 text-amber-500" />
              Mein Tablett (我的餐盘)
            </h3>
            {trayItems.length > 0 && (
              <button
                onClick={handleClearTray}
                className="text-[10px] font-bold text-rose-500 hover:text-rose-600 transition-colors flex items-center gap-1 bg-rose-500/5 py-1 px-2.5 rounded-lg border border-rose-500/10"
              >
                <Trash2 className="w-3 h-3" />
                Leeren
              </button>
            )}
          </div>

          {/* Large Calorie Indicator */}
          <div className="flex items-baseline space-x-1">
            <span className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white transition-all duration-300">
              {grandTotals.calories}
            </span>
            <span className="text-sm font-extrabold text-slate-400">kcal</span>
          </div>

          {/* GDA Macro Progress Bars */}
          <div className="space-y-3">
            {/* Protein */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-slate-500 dark:text-slate-400">Protein (蛋白质)</span>
                <span className="text-blue-500 font-extrabold">
                  {grandTotals.protein.toFixed(1)}g / {REFERENCE_INTAKE.protein}g ({Math.round((grandTotals.protein / REFERENCE_INTAKE.protein) * 100)}%)
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${percentages.protein}%` }}
                />
              </div>
            </div>

            {/* Fett */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-slate-500 dark:text-slate-400">Fett (脂肪)</span>
                <span className="text-amber-500 font-extrabold">
                  {grandTotals.fat.toFixed(1)}g / {REFERENCE_INTAKE.fat}g ({Math.round((grandTotals.fat / REFERENCE_INTAKE.fat) * 100)}%)
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-300"
                  style={{ width: `${percentages.fat}%` }}
                />
              </div>
            </div>

            {/* Carbs */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-slate-500 dark:text-slate-400">Kohlenhydrate (碳水)</span>
                <span className="text-emerald-500 font-extrabold">
                  {grandTotals.carbs.toFixed(1)}g / {REFERENCE_INTAKE.carbs}g ({Math.round((grandTotals.carbs / REFERENCE_INTAKE.carbs) * 100)}%)
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${percentages.carbs}%` }}
                />
              </div>
            </div>

            {/* Salt */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-slate-500 dark:text-slate-400">Salz (盐)</span>
                <span className="text-rose-500 font-extrabold">
                  {grandTotals.salt.toFixed(2)}g / {REFERENCE_INTAKE.salt}g ({Math.round((grandTotals.salt / REFERENCE_INTAKE.salt) * 100)}%)
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full transition-all duration-300"
                  style={{ width: `${percentages.salt}%` }}
                />
              </div>
            </div>
          </div>

          {/* Export Action Strip */}
          {trayItems.length > 0 && (
            <button
              onClick={handleKopierenTray}
              className={`w-full py-4.5 rounded-2xl font-extrabold flex items-center justify-center gap-2.5 transition-all text-sm shadow-md ${
                copied
                  ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                  : 'bg-amber-500 text-white hover:bg-amber-600 shadow-amber-500/10'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 stroke-[2.5]" />
                  Kopiert! (已复制到剪贴板)
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 stroke-[2.2]" />
                  Kopieren (复制营养数据)
                </>
              )}
            </button>
          )}
        </div>

        {/* Tablett Items Section */}
        {trayItems.length > 0 && (
          <div className="glass rounded-[2rem] p-5 shadow-sm border border-slate-100 dark:border-slate-850 space-y-3.5 animate-pop">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 pl-1">
              Hinzugefügte Produkte ({trayItems.length})
            </h4>
            <div className="space-y-2.5 max-h-[220px] overflow-y-auto no-scrollbar pr-0.5">
              {trayItems.map((item) => {
                const removedAtoms = item.menuItem.atoms.filter(
                  (a) => a.removable && !item.customizedAtoms[a.id]
                );
                const customDescription = removedAtoms
                  .map((a) => `ohne ${a.name.replace(/\(.*\)/, '').trim()}`)
                  .join(', ');

                return (
                  <div
                    key={item.id}
                    className="p-3 bg-slate-50/70 dark:bg-slate-950/20 rounded-2.5xl border border-slate-100 dark:border-slate-850 flex justify-between items-center transition-all animate-pop"
                  >
                    <div className="space-y-0.5 flex-grow pr-3">
                      <div className="flex items-baseline flex-wrap gap-1.5">
                        <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                          {item.menuItem.name}
                        </span>
                        {item.selectedSize && (
                          <span className="text-[8px] font-extrabold px-1 py-0.2 rounded bg-amber-500/10 text-amber-600 uppercase tracking-widest leading-none">
                            {item.selectedSize}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 leading-tight">
                        {customDescription ? (
                          <span className="text-amber-600 dark:text-amber-500 font-semibold">
                            {customDescription}
                          </span>
                        ) : (
                          <span className="text-slate-350 dark:text-slate-650">
                            Standardrezeptur
                          </span>
                        )}
                      </p>
                      <span className="text-[9px] text-slate-400 font-bold block tabular-nums">
                        {item.calculatedNutrition.calories} kcal • P: {item.calculatedNutrition.protein.toFixed(1)}g • Salz: {item.calculatedNutrition.salt.toFixed(2)}g
                      </span>
                    </div>

                    <button
                      onClick={() => handleRemoveTrayItem(item.id)}
                      className="p-2 rounded-xl hover:bg-rose-500/10 text-slate-350 hover:text-rose-500 transition-all flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Separator / Headline for Restaurant Menu */}
        <div className="pt-2 px-1">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Deutschland Speisekarte (德国麦当劳菜单)
          </h3>
        </div>

        {/* Menu Grid Selection Area */}
        <MenuPanel onSelectItem={setSelectedItem} />

      </main>

      {/* Atomic Customization Drawer (Pop-up customized ingredient deck) */}
      <CustomDrawer
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddTrayItem={handleAddTrayItem}
      />

    </div>
  );
}

export default App;
