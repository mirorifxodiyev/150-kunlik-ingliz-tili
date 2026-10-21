import React, { useState } from "react";
import { AppState, QuizQuestion, Test } from "../types";
import { ArrowLeft, CheckCircle2, Clock, RotateCcw, Trophy, XCircle } from "lucide-react";

interface TestRunnerViewProps {
  test: Test;
  state: AppState;
  onBack: () => void;
  onSaveTestResult: (testId: string, score: number, passed: boolean, mistakes: QuizQuestion[]) => void;
}

export const TestRunnerView: React.FC<TestRunnerViewProps> = ({
  test,
  state,
  onBack,
  onSaveTestResult,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number | null>(null);

  const prevProgress = state.testProgress[test.id];

  const handleSelectOption = (qId: string, value: string) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = () => {
    let correct = 0;
    const mistakes: QuizQuestion[] = [];

    test.questions.forEach((q) => {
      const uAns = (userAnswers[q.id] || "").trim().toLowerCase();
      const targetAns = q.answer.trim().toLowerCase();
      if (uAns === targetAns) {
        correct++;
      } else {
        mistakes.push(q);
      }
    });

    const finalPct = Math.round((correct / test.questions.length) * 100);
    const passed = finalPct >= test.passingScore;

    setScore(finalPct);
    setIsSubmitted(true);
    onSaveTestResult(test.id, finalPct, passed, mistakes);
  };

  const handleRestart = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setScore(null);
    setCurrentIdx(0);
  };

  const currentQ = test.questions[currentIdx];
  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="text-xs font-semibold text-sky-600 dark:text-sky-400">
              {test.week ? `${test.month}-oy, ${test.week}-hafta` : `${test.month}-oy Katta Imtihoni`}
            </div>
            <h1 className="text-base font-bold text-slate-900 dark:text-white">
              {test.title}
            </h1>
          </div>
        </div>

        {prevProgress && (
          <div className="text-xs text-right">
            <span className="text-slate-400">Oldingi eng yaxshi: </span>
            <strong className={prevProgress.passed ? "text-emerald-600" : "text-rose-500"}>
              {prevProgress.bestScore}%
            </strong>
          </div>
        )}
      </div>

      {/* Test Runner Body */}
      {!isSubmitted ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          {/* Question Nav Track */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
            <span className="font-semibold text-slate-500">
              Savol: {currentIdx + 1} / {test.questions.length}
            </span>
            <span className="text-sky-600 font-bold">
              Javob berildi: {answeredCount} / {test.questions.length}
            </span>
          </div>

          {/* Question Display */}
          <div className="mb-6">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">
              {currentIdx + 1}. {currentQ.prompt}
            </h2>

            {currentQ.options && currentQ.options.length > 0 && currentQ.type !== "sentence-order" ? (
              <div className="space-y-2">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = userAnswers[currentQ.id] === opt;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(currentQ.id, opt)}
                      className={`w-full text-left p-3.5 rounded-lg border text-xs font-medium transition-colors flex items-center justify-between ${
                        isSelected
                          ? "border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-950 dark:text-sky-200 font-semibold"
                          : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  value={userAnswers[currentQ.id] || ""}
                  onChange={(e) => handleSelectOption(currentQ.id, e.target.value)}
                  placeholder="Javobingizni kiriting..."
                  className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
            )}
          </div>

          {/* Stepper Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx((p) => p - 1)}
              className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 disabled:opacity-40"
            >
              Oldingisi
            </button>

            {currentIdx < test.questions.length - 1 ? (
              <button
                onClick={() => setCurrentIdx((p) => p + 1)}
                className="px-5 py-2 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold"
              >
                Keyingisi
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold shadow-sm"
              >
                Testni yakunlash
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
            {score !== null && score >= test.passingScore ? (
              <Trophy className="w-8 h-8 text-emerald-500" />
            ) : (
              <XCircle className="w-8 h-8 text-rose-500" />
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {score !== null && score >= test.passingScore
                ? "Tabriklaymiz! Testdan muvaffaqiyatli o'tdingiz!"
                : "Testdan o'ta olmadingiz"}
            </h2>
            <div className="text-3xl font-extrabold text-sky-600 mt-2">
              {score}%
            </div>
            <p className="text-xs text-slate-500 mt-1">
              O'tish chegarasi: {test.passingScore}%
            </p>
          </div>

          <div className="flex justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-lg"
            >
              Qayta topshirish
            </button>
            <button
              onClick={onBack}
              className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs rounded-lg"
            >
              Dasturga qaytish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
