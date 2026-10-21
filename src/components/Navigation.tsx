import React from "react";
import {
  BookOpen,
  Calendar,
  CheckCircle,
  FileCheck,
  Flame,
  HelpCircle,
  RotateCcw,
  Settings,
  Sparkles,
  BarChart3,
  BookmarkCheck
} from "lucide-react";

export type ViewType =
  | "dashboard"
  | "curriculum"
  | "lesson"
  | "test-runner"
  | "srs"
  | "mistakes"
  | "stats"
  | "settings";

interface NavigationProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  streakCount: number;
  dueSrsCount: number;
  activeMistakesCount: number;
  ownerUnlockMode: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onNavigate,
  streakCount,
  dueSrsCount,
  activeMistakesCount,
  ownerUnlockMode,
}) => {
  const navItems = [
    { id: "dashboard" as ViewType, label: "Bosh sahifa", icon: Calendar },
    { id: "curriculum" as ViewType, label: "150-Kunlik Dastur", icon: BookOpen },
    {
      id: "srs" as ViewType,
      label: "SRS Takrorlash",
      icon: RotateCcw,
      badge: dueSrsCount > 0 ? dueSrsCount : undefined,
    },
    {
      id: "mistakes" as ViewType,
      label: "Xatolar daftari",
      icon: HelpCircle,
      badge: activeMistakesCount > 0 ? activeMistakesCount : undefined,
      badgeColor: "bg-rose-500",
    },
    { id: "stats" as ViewType, label: "Statistika", icon: BarChart3 },
    { id: "settings" as ViewType, label: "Sozlamalar", icon: Settings },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col shrink-0 min-h-screen">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-sm">
              150
            </span>
            <div>
              <h1 className="font-bold text-slate-900 dark:text-white text-sm tracking-tight">
                Ingliz Tili Platformasi
              </h1>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                A0 dan B1/B2 gacha (AQSH)
              </p>
            </div>
          </div>
          {ownerUnlockMode && (
            <div className="mt-2 text-[10px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-2 py-1 rounded border border-amber-200 dark:border-amber-800">
              Mustaqil rejim faol (Barcha darslar ochiq)
            </div>
          )}
        </div>

        {/* Streak & Today Highlight */}
        <div className="px-5 py-3 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Streak: <span className="text-orange-600 dark:text-orange-400">{streakCount} kun</span>
            </span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            5 soat/kun
          </div>
        </div>

        {/* Menu links */}
        <nav className="p-3 flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                  isActive
                    ? "bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-sky-600 dark:text-sky-400" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white ${
                      item.badgeColor || "bg-sky-600"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 leading-relaxed">
          100% oflayn xotira (localStorage).
          <br />
          5 oyda 150 kunlik amaliy AQSH tajribasi.
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-t border-slate-200 dark:border-slate-800 z-50 flex items-center justify-around py-2 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center p-1 relative flex-1 ${
                isActive
                  ? "text-sky-600 dark:text-sky-400 font-semibold"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge !== undefined && (
                  <span
                    className={`absolute -top-1 -right-2 text-[9px] font-bold px-1 py-0.2 rounded-full text-white ${
                      item.badgeColor || "bg-sky-600"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 truncate max-w-[55px] text-center">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
