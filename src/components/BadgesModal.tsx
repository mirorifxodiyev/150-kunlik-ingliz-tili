import React from "react";
import { Badge } from "../types";
import {
  Award,
  Building,
  Calendar,
  CheckCircle2,
  CreditCard,
  Crown,
  Flame,
  Footprints,
  Mic,
  RotateCcw,
  Trophy,
  X
} from "lucide-react";

interface BadgesModalProps {
  badges: Badge[];
  onClose: () => void;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({ badges, onClose }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Footprints":
        return Footprints;
      case "Calendar":
        return Calendar;
      case "Flame":
        return Flame;
      case "Mic":
        return Mic;
      case "Trophy":
        return Trophy;
      case "CreditCard":
        return CreditCard;
      case "Building":
        return Building;
      case "RotateCcw":
        return RotateCcw;
      case "CheckCircle2":
        return CheckCircle2;
      case "Crown":
        return Crown;
      default:
        return Award;
    }
  };

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="text-xs font-semibold text-amber-600 dark:text-amber-400">
              Gamifikatsiya va Yutuqlar
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              O'quv Nishonlari (Badges)
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-2.5 py-1 bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 rounded-lg">
              {unlockedCount} / {badges.length} ochilgan
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          150 kunlik kurs davomida darslarni to'liq bajarish, kunlik streakni saqlash, mikrofon orqali talaffuz qilish va imtihonlarni topshirish orqali barcha nishonlarni to'plang!
        </p>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {badges.map((b) => {
            const Icon = getIcon(b.iconName);
            return (
              <div
                key={b.id}
                className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all ${
                  b.unlocked
                    ? "bg-amber-50/40 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/80 shadow-sm"
                    : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    b.unlocked
                      ? "bg-amber-500 text-white shadow-sm shadow-amber-500/20"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-400"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <h3
                      className={`font-bold ${
                        b.unlocked
                          ? "text-slate-900 dark:text-white"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {b.title}
                    </h3>
                    {b.unlocked && (
                      <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold">
                        Ochilgan ✓
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    {b.descriptionUz}
                  </p>
                  {b.unlockedDate && (
                    <div className="text-[10px] text-slate-400 mt-1">
                      Sana: {b.unlockedDate}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-xs font-semibold"
          >
            Tushunarli
          </button>
        </div>
      </div>
    </div>
  );
};
