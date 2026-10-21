import React from "react";
import { AppState, Lesson } from "../types";
import { isLessonFullyCompleted } from "../utils/storage";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  FileCheck,
  Flame,
  HelpCircle,
  Play,
  RotateCcw,
  Sparkles,
  Trophy,
  Smartphone,
  Award
} from "lucide-react";

interface DashboardViewProps {
  state: AppState;
  allLessons: Lesson[];
  onOpenLesson: (lessonId: string) => void;
  onOpenTest: (testId: string) => void;
  onNavigate: (view: any) => void;
  onToggleTask: (lessonId: string, taskIndex: number, completed: boolean) => void;
  onOpenBadges?: () => void;
  onInstallPwa?: () => void;
  canInstallPwa?: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  state,
  allLessons,
  onOpenLesson,
  onOpenTest,
  onNavigate,
  onToggleTask,
  onOpenBadges,
  onInstallPwa,
  canInstallPwa,
}) => {
  // Find current active or first incomplete lesson
  const completedCount = allLessons.filter((l) =>
    isLessonFullyCompleted(l.id, state)
  ).length;

  const todayLesson =
    allLessons.find((l) => !isLessonFullyCompleted(l.id, state)) ||
    allLessons[allLessons.length - 1];

  const currentMonth = todayLesson.month;
  const progressPct = Math.round((completedCount / 150) * 100);

  // Distinct vocabulary count from completed lessons
  const completedLessons = allLessons.filter((l) =>
    isLessonFullyCompleted(l.id, state)
  );
  const distinctVocab = new Set(
    completedLessons.flatMap((l) => l.vocabulary.map((v) => v.en.toLowerCase()))
  );

  // Today lesson progress
  const lp = state.lessonProgress[todayLesson.id] || {
    tasksCompleted: [false, false, false, false, false],
    quizBestScore: null,
    quizAttempts: 0,
  };
  const tasksDoneCount = (lp.tasksCompleted || []).filter(Boolean).length;

  // Active mistakes
  const activeMistakesCount = state.mistakes.filter((m) => !m.mastered).length;

  // Due SRS cards
  const todayStr = new Date().toISOString().slice(0, 10);
  const dueSrsCount = state.srsCards.filter((c) => c.dueDate <= todayStr).length;

  // Weekly tests for current month
  const weeklyTests = [1, 2, 3, 4].map((w) => {
    const testId = `w_m${currentMonth}_${w}`;
    const p = state.testProgress[testId];
    return {
      week: w,
      testId,
      passed: p?.passed || false,
      score: p?.bestScore ?? null,
    };
  });

  const monthExamId = `exam_m${currentMonth}`;
  const monthExamProg = state.testProgress[monthExamId];

  const unlockedBadgesCount = (state.badges || []).filter((b) => b.unlocked).length;

  return (
    <div className="space-y-6">
      {/* PWA Install Banner if installable */}
      {canInstallPwa && (
        <div className="bg-gradient-to-r from-sky-600 to-indigo-600 rounded-xl p-4 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-lg shrink-0">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm">Ilovani smartfonga o'rnating (PWA)</div>
              <div className="text-xs text-sky-100">
                Play Market kabi telefoningiz asosiy ekraniga chiqarib oling va oflayn rejimda ham o'rganing!
              </div>
            </div>
          </div>
          <button
            onClick={onInstallPwa}
            className="px-4 py-2 bg-white text-sky-700 hover:bg-sky-50 font-bold rounded-lg text-xs whitespace-nowrap shadow-sm transition-colors self-start sm:self-auto"
          >
            Ilovani o'rnatish
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-sky-600 dark:text-sky-400 mb-1">
              {currentMonth}-oy · {todayLesson.level} daraja sari
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Amerika Ingliz Tili: 150 Kunlik Dastur
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Eslatma: Darslarni shunchaki yakunlash rasmiy CEFR darajasini kafolatlamaydi; 
              haqiqiy natija har kungi 5 soatlik intizom, faol nutq va imtihon ko'rsatkichlariga bog'liq.
            </p>
          </div>
          <div className="flex items-center flex-wrap gap-2.5 shrink-0">
            {onOpenBadges && (
              <button
                onClick={onOpenBadges}
                className="px-3.5 py-2 border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-amber-900 dark:text-amber-200 font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Trophy className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Yutuqlar ({unlockedBadgesCount}/10)</span>
              </button>
            )}
            <button
              onClick={() => onOpenLesson(todayLesson.id)}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg text-xs sm:text-sm transition-colors flex items-center gap-2 shadow-sm"
            >
              <Play className="w-4 h-4 fill-white" />
              Bugungi dars ({todayLesson.day}-kun)
            </button>
            <button
              onClick={() => onNavigate("curriculum")}
              className="px-4 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium rounded-lg text-xs sm:text-sm transition-colors"
            >
              Dasturni ko'rish
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-baseline mb-2 text-xs font-semibold">
            <span className="text-slate-700 dark:text-slate-300">
              Umumiy dastur o'zlashtirilishi
            </span>
            <span className="text-sky-600 dark:text-sky-400">
              {completedCount} / 150 dars ({progressPct}%)
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-sky-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* 4 Stat Blocks */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">O'qilgan vaqt</span>
            <Clock className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {completedCount * 5} <span className="text-xs font-normal text-slate-400">/ 750 soat</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Har bir dars = 5 soat</div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Uzluksiz kunlar</span>
            <Flame className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {state.streak.current} <span className="text-xs font-normal text-slate-400">kun</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Eng yaxshi: {state.streak.best} kun
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Faol so'z boyligi</span>
            <BookOpen className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {distinctVocab.size} <span className="text-xs font-normal text-slate-400">so'z</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Tugallangan darslardan</div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">SRS va Xatolar</span>
            <RotateCcw className="w-4 h-4 text-violet-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {dueSrsCount}{" "}
            <span className="text-xs font-normal text-rose-500">
              ({activeMistakesCount} ta xato)
            </span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Bugun takrorlash zarur</div>
        </div>
      </div>

      {/* Main 2-Column Split: Today's 5-Hour Plan & Tests/SRS status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's 5-Hour Plan (2 cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                Bugungi reja · {todayLesson.day}-kun ({todayLesson.level})
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {todayLesson.title}
              </h2>
            </div>
            <div className="text-sm font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-3 py-1 rounded-lg">
              {tasksDoneCount}/5 vazifa ({tasksDoneCount} soat)
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
            Dars to'liq tugallangan hisoblanishi uchun barcha 5 ta soatlik vazifalar belgilanishi VA 
            kunlik 8 savollik testdan kamida 70% to'planishi kerak.
          </p>

          <div className="space-y-3">
            {todayLesson.tasks.map((task, idx) => {
              const isChecked = Boolean(lp.tasksCompleted && lp.tasksCompleted[idx]);
              return (
                <label
                  key={idx}
                  className={`flex items-start gap-3 p-3.5 rounded-lg border transition-colors cursor-pointer ${
                    isChecked
                      ? "bg-slate-50/60 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-700 text-slate-800 dark:text-slate-200"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => onToggleTask(todayLesson.id, idx, e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-sky-600 border-slate-300 focus:ring-sky-500"
                  />
                  <div className="flex-1 text-xs">
                    <div className="font-semibold text-slate-900 dark:text-white text-sm">
                      {task.title}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 mt-0.5">
                      {task.description}
                    </div>
                  </div>
                </label>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Kunlik test natijasi:{" "}
              <strong className="text-slate-900 dark:text-white">
                {lp.quizBestScore !== null ? `${lp.quizBestScore}%` : "Hali topshirilmagan"}
              </strong>
            </div>
            <button
              onClick={() => onOpenLesson(todayLesson.id)}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Dars materiallarini ochish
            </button>
          </div>
        </div>

        {/* Right Column: SRS, Mistakes & Month Exams */}
        <div className="space-y-6">
          {/* SRS Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-sky-600" />
                SRS Interval Takrorlash
              </h3>
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400">
                {dueSrsCount} ta karta
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
              +1, +3, +7, +14 va +30 kunlik ilmiy oraliq bilan so'zlarni uzoq muddatli xotiraga o'tkazish.
            </p>
            <button
              onClick={() => onNavigate("srs")}
              className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-lg transition-colors"
            >
              Takrorlashni boshlash
            </button>
          </div>

          {/* Mistakes Notebook */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-rose-500" />
                Xatolar daftari
              </h3>
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                {activeMistakesCount} ta faol xato
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
              Har bir xato qilingan savol ketma-ket 3 marta to'g'ri yechilmaguncha saqlanib turadi.
            </p>
            <button
              onClick={() => onNavigate("mistakes")}
              className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-lg transition-colors"
            >
              Xatolarni mashq qilish
            </button>
          </div>

          {/* Current Month Tests */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-3 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              {currentMonth}-oy imtihonlari
            </h3>
            <div className="space-y-2 text-xs">
              {weeklyTests.map((t) => (
                <div
                  key={t.testId}
                  className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800"
                >
                  <span className="text-slate-700 dark:text-slate-300">
                    {t.week}-haftalik test
                  </span>
                  <span
                    className={`font-semibold ${
                      t.passed
                        ? "text-emerald-600 dark:text-emerald-400"
                        : t.score !== null
                        ? "text-rose-500"
                        : "text-slate-400"
                    }`}
                  >
                    {t.passed ? `${t.score}% (O'tgan)` : t.score !== null ? `${t.score}%` : "Topshirilmagan"}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                30 savollik oylik imtihon
              </span>
              <button
                onClick={() => onOpenTest(monthExamId)}
                className="text-xs font-semibold text-sky-600 hover:underline"
              >
                {monthExamProg?.passed ? "Natijani ko'rish" : "Imtihonni ochish"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
