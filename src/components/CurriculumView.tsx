import React, { useState } from "react";
import { AppState, Lesson } from "../types";
import { isDayUnlocked, isLessonFullyCompleted, isTestUnlocked } from "../utils/storage";
import {
  BookOpen,
  CheckCircle2,
  Lock,
  Play,
  Trophy,
  AlertCircle
} from "lucide-react";

interface CurriculumViewProps {
  allLessons: Lesson[];
  state: AppState;
  onOpenLesson: (lessonId: string) => void;
  onOpenTest: (testId: string) => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  allLessons,
  state,
  onOpenLesson,
  onOpenTest,
}) => {
  const [activeMonth, setActiveMonth] = useState<number>(1);

  const monthMetadata: Record<number, { title: string; subtitle: string; cefr: string }> = {
    1: {
      title: "1-oy: A1 Poydevor (Foundations)",
      subtitle: "Alifbo, tovushlar, 'to be', raqamlar, oila, ko'rsatish olmoshlari, asosiy fe'llar va Present Simple",
      cefr: "A1 (Boshlang'ich)",
    },
    2: {
      title: "2-oy: A2 Kundalik Muloqot (Everyday English)",
      subtitle: "Supermarket, narxlar, restoranlar, transport, yo'nalishlar, Present Continuous, Past Simple va Going to",
      cefr: "A2 (Oddiy muloqot)",
    },
    3: {
      title: "3-oy: A2 -> B1 Amaliy Mustaqillik (Independence)",
      subtitle: "Ish qidirish, suhbatlar, bank hisoblari, kvartira ijarasi, kommunal to'lovlar, 911 va rasmiy shakllar",
      cefr: "A2 -> B1 (Mustaqillik)",
    },
    4: {
      title: "4-oy: B1 Tinglash va Gapirish (Listening & Speaking)",
      subtitle: "Podkastlar, nutq bog'lanishi (reductions), fikr bildirish, ish majlislari, STAR usuli va taqdimotlar",
      cefr: "B1 (Erkin muloqot)",
    },
    5: {
      title: "5-oy: B1 -> B2 Rivojlanish va AQSH Hayoti (Development)",
      subtitle: "Amerika madaniyati, uy/mashina xaridi, kredit tarixi, tibbiyot hisoblari, diplomatiya va B2 nutq",
      cefr: "B1 -> B2 (Rivojlangan)",
    },
  };

  const currentMonthLessons = allLessons.filter((l) => l.month === activeMonth);
  const completedInMonth = currentMonthLessons.filter((l) =>
    isLessonFullyCompleted(l.id, state)
  ).length;

  return (
    <div className="space-y-6">
      {/* Month Selector Tabs */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-2 flex overflow-x-auto gap-2">
        {[1, 2, 3, 4, 5].map((m) => {
          const mLessons = allLessons.filter((l) => l.month === m);
          const done = mLessons.filter((l) => isLessonFullyCompleted(l.id, state)).length;
          const isActive = activeMonth === m;

          return (
            <button
              key={m}
              onClick={() => setActiveMonth(m)}
              className={`flex-1 min-w-[170px] p-3 rounded-lg text-left transition-colors border ${
                isActive
                  ? "bg-sky-50 dark:bg-sky-950/60 border-sky-300 dark:border-sky-700 text-sky-900 dark:text-sky-100"
                  : "border-transparent hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              <div className="text-[11px] font-semibold text-sky-600 dark:text-sky-400">
                {m}-oy ({monthMetadata[m].cefr})
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5 truncate">
                {monthMetadata[m].title.split(":")[1]?.trim()}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {done}/30 dars ({Math.round((done / 30) * 100)}%)
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Month Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-sky-600 dark:text-sky-400">
              {monthMetadata[activeMonth].cefr} · 30 Kunlik Dastur
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              {monthMetadata[activeMonth].title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              {monthMetadata[activeMonth].subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Monthly Exam button */}
            <button
              onClick={() => onOpenTest(`exam_m${activeMonth}`)}
              className="px-4 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold rounded-lg text-xs flex items-center gap-2 transition-colors"
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              {activeMonth}-oylik Katta Imtihon (30 savol)
            </button>
          </div>
        </div>

        {/* Progress in current month */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500">Oy bo'yicha yakunlangan:</span>
          <span className="font-bold text-sky-600 dark:text-sky-400">
            {completedInMonth} / 30 dars ({completedInMonth * 5} / 150 soat)
          </span>
        </div>
      </div>

      {/* 30 Lessons Grid with Interspersed Weekly Test Banners */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentMonthLessons.map((lesson) => {
            const unlockInfo = isDayUnlocked(lesson.day, allLessons, state);
            const isCompleted = isLessonFullyCompleted(lesson.id, state);
            const lp = state.lessonProgress[lesson.id];
            const tasksDone = (lp?.tasksCompleted || []).filter(Boolean).length;

            return (
              <div
                key={lesson.id}
                onClick={() => {
                  if (unlockInfo.unlocked) {
                    onOpenLesson(lesson.id);
                  }
                }}
                className={`border rounded-xl p-4 transition-all relative flex flex-col justify-between ${
                  !unlockInfo.unlocked
                    ? "bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60 cursor-not-allowed"
                    : isCompleted
                    ? "bg-white dark:bg-slate-900 border-emerald-300 dark:border-emerald-800/60 hover:shadow-md cursor-pointer"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-sky-400 cursor-pointer hover:shadow-md"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-sky-600 dark:text-sky-400">
                      {lesson.day}-kun · {lesson.level}
                    </span>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Tugallangan
                      </span>
                    ) : !unlockInfo.unlocked ? (
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Lock className="w-3 h-3" />
                        Qulflangan
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400">
                        {tasksDone}/5 soat
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1 mb-1">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {lesson.themeUz}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">
                    Kunlik test:{" "}
                    <strong className="text-slate-700 dark:text-slate-300">
                      {lp?.quizBestScore !== null && lp?.quizBestScore !== undefined
                        ? `${lp.quizBestScore}%`
                        : "—"}
                    </strong>
                  </span>

                  {unlockInfo.unlocked ? (
                    <span className="text-sky-600 dark:text-sky-400 font-semibold flex items-center gap-1">
                      Ochish <Play className="w-3 h-3 fill-sky-600 dark:fill-sky-400" />
                    </span>
                  ) : (
                    <span className="text-slate-400 italic text-[10px] truncate max-w-[120px]">
                      {unlockInfo.reason || "Qulf"}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Weekly Tests Section for this Month */}
        <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl p-5 mt-6">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-3 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-sky-600" />
            {activeMonth}-oyning 4 ta haftalik nazorat testlari (har biri 16 ta savol)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((w) => {
              const testId = `w_m${activeMonth}_${w}`;
              const p = state.testProgress[testId];
              const testUnlock = isTestUnlocked(testId, allLessons, state);

              return (
                <div
                  key={testId}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[11px] font-semibold text-slate-500">
                      {w}-hafta testi
                    </div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                      {w * 7}-kundan so'ng
                    </div>
                    <div className="text-[11px] mt-2">
                      Holat:{" "}
                      <strong
                        className={
                          p?.passed
                            ? "text-emerald-600"
                            : p?.bestScore !== undefined
                            ? "text-rose-500"
                            : "text-slate-400"
                        }
                      >
                        {p?.passed ? `O'tgan (${p.bestScore}%)` : p ? `${p.bestScore}%` : "Topshirilmagan"}
                      </strong>
                    </div>
                  </div>

                  <button
                    disabled={!testUnlock.unlocked}
                    onClick={() => onOpenTest(testId)}
                    className={`mt-3 py-1.5 px-3 rounded text-xs font-semibold transition-colors ${
                      testUnlock.unlocked
                        ? "bg-sky-600 hover:bg-sky-700 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    {testUnlock.unlocked ? (p?.passed ? "Qayta ko'rish" : "Testni boshlash") : "Qulflangan"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
