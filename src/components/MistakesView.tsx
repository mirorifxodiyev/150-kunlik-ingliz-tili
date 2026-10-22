import React, { useState } from "react";
import { AppState, MistakeEntry } from "../types";
import { CheckCircle2, HelpCircle, Play, RotateCcw, XCircle } from "lucide-react";

interface MistakesViewProps {
  state: AppState;
  onRetryAnswer: (questionId: string, isCorrect: boolean, userAnswer: string) => void;
  onBack: () => void;
}

export const MistakesView: React.FC<MistakesViewProps> = ({
  state,
  onRetryAnswer,
  onBack,
}) => {
  const [filterMonth, setFilterMonth] = useState<string>("all");
  const [isPracticeMode, setIsPracticeMode] = useState<boolean>(false);
  const [practiceIdx, setPracticeIdx] = useState<number>(0);
  const [practiceAnswer, setPracticeAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const activeMistakes = state.mistakes.filter((m) => {
    if (filterMonth !== "all" && String(m.month) !== filterMonth) return false;
    return true;
  });

  const unmastered = activeMistakes.filter((m) => !m.mastered);
  const currentQ: MistakeEntry | undefined = unmastered[practiceIdx];

  const handlePracticeSubmit = (ans: string) => {
    if (!currentQ || feedback) return;
    const isOk = ans.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase();
    onRetryAnswer(currentQ.questionId, isOk, ans);

    setFeedback({
      isCorrect: isOk,
      text: isOk
        ? `To'g'ri! (${(currentQ.consecutiveCorrect || 0) + 1}/3 ketma-ket to'g'ri)`
        : `Xato! To'g'ri javob: ${currentQ.correctAnswer}`,
    });
  };

  const handleNextPractice = () => {
    setFeedback(null);
    setPracticeAnswer("");
    if (practiceIdx >= unmastered.length - 1) {
      setPracticeIdx(0);
      setIsPracticeMode(false);
    } else {
      setPracticeIdx((p) => p + 1);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-rose-500 mb-0.5">
            Xatolar tahlili va mustahkamlash
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-rose-500" />
            Xatolar daftari
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Qoida: Har bir xato ketma-ket <strong>3 marta</strong> to'g'ri topilgandagina "O'zlashtirildi" deb belgilanadi.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {unmastered.length > 0 && (
            <button
              onClick={() => {
                setIsPracticeMode(!isPracticeMode);
                setPracticeIdx(0);
                setFeedback(null);
              }}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-lg flex items-center gap-2 transition-colors shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              {isPracticeMode ? "Ro'yxatga qaytish" : `Xatolarni mashq qilish (${unmastered.length})`}
            </button>
          )}
          <button
            onClick={onBack}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"
          >
            Yopish
          </button>
        </div>
      </div>

      {/* Practice Interactive Mode */}
      {isPracticeMode && currentQ ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-100 dark:border-slate-800">
            <span>Savol: {practiceIdx + 1} / {unmastered.length}</span>
            <span>Ketma-ket to'g'ri: <strong>{currentQ.consecutiveCorrect || 0} / 3</strong></span>
          </div>

          <div>
            <div className="text-xs font-semibold text-sky-600 mb-1">
              {currentQ.month}-oy · {currentQ.lessonId}
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {currentQ.prompt}
            </h3>
          </div>

          {currentQ.options && currentQ.options.length > 0 && currentQ.type !== "sentence-order" ? (
            <div className="space-y-2 pt-2">
              {currentQ.options.map((opt, i) => (
                <button
                  key={i}
                  disabled={Boolean(feedback)}
                  onClick={() => handlePracticeSubmit(opt)}
                  className="w-full text-left p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 transition-colors"
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-2 pt-2">
              <input
                type="text"
                disabled={Boolean(feedback)}
                value={practiceAnswer}
                onChange={(e) => setPracticeAnswer(e.target.value)}
                placeholder="To'g'ri javobni yozing..."
                className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
              {!feedback && (
                <button
                  onClick={() => handlePracticeSubmit(practiceAnswer)}
                  className="px-4 py-2 bg-sky-600 text-white rounded-lg text-xs font-semibold"
                >
                  Tekshirish
                </button>
              )}
            </div>
          )}

          {feedback && (
            <div
              className={`p-4 rounded-xl text-xs space-y-1 ${
                feedback.isCorrect
                  ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border border-emerald-200"
                  : "bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border border-rose-200"
              }`}
            >
              <div className="font-bold">{feedback.text}</div>
              <div className="text-[11px] opacity-90">{currentQ.explanationUz}</div>
              <button
                onClick={handleNextPractice}
                className="mt-3 px-4 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded font-semibold text-xs"
              >
                Keyingi xato savol
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Regular List View */
        <div className="space-y-4">
          {/* Month Filter */}
          <div className="flex gap-2">
            {["all", "1", "2", "3", "4", "5"].map((m) => (
              <button
                key={m}
                onClick={() => setFilterMonth(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                  filterMonth === m
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent font-semibold"
                    : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {m === "all" ? "Barcha oylar" : `${m}-oy`}
              </button>
            ))}
          </div>

          {activeMistakes.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-12 text-center text-slate-500 text-xs">
              Bu bo'limda hozircha xatolar mavjud emas.
            </div>
          ) : (
            <div className="space-y-3">
              {activeMistakes.map((m) => (
                <div
                  key={m.questionId}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3"
                >
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-500">
                        {m.month}-oy · {m.lessonId}
                      </span>
                      <span
                        className={`font-semibold ${
                          m.mastered
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-rose-500"
                        }`}
                      >
                        {m.mastered
                          ? "✓ O'zlashtirildi (3/3)"
                          : `${m.consecutiveCorrect || 0}/3 ketma-ket to'g'ri`}
                      </span>
                    </div>

                    <div className="font-bold text-slate-900 dark:text-white">
                      {m.prompt}
                    </div>

                    <div className="text-slate-500 dark:text-slate-400">
                      To'g'ri javob: <strong className="text-emerald-600">{m.correctAnswer}</strong> · Sizning javobingiz: <span className="text-rose-500">{m.learnerAnswer}</span>
                    </div>
                  </div>

                  <div className="text-right text-[11px] text-slate-400 shrink-0">
                    Xatolar soni: {m.errorCount} ta
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
