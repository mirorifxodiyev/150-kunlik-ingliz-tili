import React from "react";
import { AppState, Lesson } from "../types";
import { isLessonFullyCompleted } from "../utils/storage";
import { BarChart3, Clock, Flame, BookOpen, Trophy } from "lucide-react";

interface StatsViewProps {
  state: AppState;
  allLessons: Lesson[];
  onBack: () => void;
}

export const StatsView: React.FC<StatsViewProps> = ({ state, allLessons, onBack }) => {
  const completedLessons = allLessons.filter((l) => isLessonFullyCompleted(l.id, state));
  const completedCount = completedLessons.length;
  const totalHours = completedCount * 5;

  const distinctVocab = new Set(
    completedLessons.flatMap((l) => l.vocabulary.map((v) => v.en.toLowerCase()))
  );

  const masteredMistakesCount = state.mistakes.filter((m) => m.mastered).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-sky-600" />
            Natijalar va Batafsil Statistika
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Haqiqiy saqlangan ma'lumotlar asosida hisoblangan aniq ko'rsatkichlar.
          </p>
        </div>
        <button onClick={onBack} className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white">
          Yopish
        </button>
      </div>

      {/* Grid of Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
          <div className="text-xs font-medium text-slate-400">Tugallangan darslar</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {completedCount} <span className="text-xs font-normal text-slate-400">/ 150</span>
          </div>
          <div className="text-[11px] text-sky-600 mt-1 font-semibold">
            {Math.round((completedCount / 150) * 100)}% yakunlandi
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
          <div className="text-xs font-medium text-slate-400">Jami o'quv soatlari</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {totalHours} <span className="text-xs font-normal text-slate-400">/ 750 soat</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Har bir dars = 5 soat
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
          <div className="text-xs font-medium text-slate-400">Eng uzun streak</div>
          <div className="text-2xl font-bold text-orange-600 mt-1">
            {state.streak.best} <span className="text-xs font-normal text-slate-400">kun</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Hozirgi: {state.streak.current} kun
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
          <div className="text-xs font-medium text-slate-400">O'zlashtirilgan xatolar</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">
            {masteredMistakesCount} <span className="text-xs font-normal text-slate-400">ta</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            3/3 to'g'ri topilgan
          </div>
        </div>
      </div>

      {/* Monthly Breakdown Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
          Oylar kesimida ko'rsatkichlar
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                <th className="pb-2 font-semibold">Oy</th>
                <th className="pb-2 font-semibold">Tugallangan kunlar</th>
                <th className="pb-2 font-semibold">O'qilgan soatlar</th>
                <th className="pb-2 font-semibold">Oylik Imtihon</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[1, 2, 3, 4, 5].map((m) => {
                const mLessons = allLessons.filter((l) => l.month === m);
                const done = mLessons.filter((l) => isLessonFullyCompleted(l.id, state)).length;
                const examProg = state.testProgress[`exam_m${m}`];

                return (
                  <tr key={m}>
                    <td className="py-2.5 font-bold text-slate-800 dark:text-slate-200">{m}-oy</td>
                    <td className="py-2.5 text-slate-600 dark:text-slate-400">
                      {done} / {mLessons.length} ({Math.round((done / mLessons.length) * 100)}%)
                    </td>
                    <td className="py-2.5 text-slate-600 dark:text-slate-400">{done * 5} soat</td>
                    <td className="py-2.5">
                      {examProg?.passed ? (
                        <span className="text-emerald-600 font-semibold">
                          O'tgan ({examProg.bestScore}%)
                        </span>
                      ) : examProg ? (
                        <span className="text-rose-500 font-semibold">
                          {examProg.bestScore}%
                        </span>
                      ) : (
                        <span className="text-slate-400">Topshirilmagan</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
