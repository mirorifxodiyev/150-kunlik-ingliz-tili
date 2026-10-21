import React, { useState, useEffect } from "react";
import { AppState, Lesson, QuizQuestion } from "../types";
import { SpeechController } from "../utils/speech";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  Headphones,
  Mic,
  PenTool,
  Play,
  RotateCcw,
  Square,
  Volume2,
  AlertCircle
} from "lucide-react";

interface LessonDetailViewProps {
  lesson: Lesson;
  state: AppState;
  onBack: () => void;
  onToggleTask: (lessonId: string, taskIndex: number, completed: boolean) => void;
  onSaveQuizResult: (lessonId: string, score: number, mistakes: QuizQuestion[], userAnswers: Record<string, string>) => void;
  onSaveNote: (lessonId: string, note: string) => void;
  onAddVocabularyToSrs: (lesson: Lesson) => void;
}

export const LessonDetailView: React.FC<LessonDetailViewProps> = ({
  lesson,
  state,
  onBack,
  onToggleTask,
  onSaveQuizResult,
  onSaveNote,
  onAddVocabularyToSrs,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [writingNote, setWritingNote] = useState<string>("");

  // Quiz state
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Timer state for current hour study
  const [timerSeconds, setTimerSeconds] = useState<number>(60 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const lp = state.lessonProgress[lesson.id] || {
    tasksCompleted: [false, false, false, false, false],
    quizBestScore: null,
    quizAttempts: 0,
    writtenNote: "",
  };

  useEffect(() => {
    if (lp.writtenNote) {
      setWritingNote(lp.writtenNote);
    }
    // Pre-populate if quiz was already passed
    if (lp.quizBestScore !== null) {
      setQuizScore(lp.quizBestScore);
    }
  }, [lesson.id]);

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => Math.max(0, prev - 1));
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      alert(`Vaqt tugadi! ${activeTab + 1}-soatlik mashg'ulot yakunlandi.`);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, activeTab]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleSpeak = (text: string) => {
    SpeechController.speak(text, {
      voiceURI: state.settings.voiceURI,
      rate: state.settings.speechRate,
    });
  };

  const handleQuizOptionSelect = (qId: string, val: string) => {
    if (quizSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const handleQuizSubmit = () => {
    let correct = 0;
    const mistakes: QuizQuestion[] = [];

    lesson.dailyQuiz.forEach((q) => {
      const userAns = (userAnswers[q.id] || "").trim().toLowerCase();
      const targetAns = q.answer.trim().toLowerCase();
      if (userAns === targetAns) {
        correct++;
      } else {
        mistakes.push(q);
      }
    });

    const scorePct = Math.round((correct / lesson.dailyQuiz.length) * 100);
    setQuizScore(scorePct);
    setQuizSubmitted(true);

    onSaveQuizResult(lesson.id, scorePct, mistakes, userAnswers);

    // If passed (>=70%), automatically mark the 5th task as completed!
    if (scorePct >= 70) {
      onToggleTask(lesson.id, 4, true);
    }
  };

  const handleQuizReset = () => {
    setUserAnswers({});
    setQuizSubmitted(false);
  };

  const tabs = [
    { title: "1-soat: Lug'at va talaffuz", icon: BookOpen },
    { title: "2-soat: Grammatika va qoidalar", icon: PenTool },
    { title: "3-soat: Tinglash va Dialog", icon: Headphones },
    { title: "4-soat: Yozish va amaliyot", icon: PenTool },
    { title: "5-soat: Gapirish va Kunlik test", icon: Mic },
  ];

  const tasksCompletedCount = (lp.tasksCompleted || []).filter(Boolean).length;
  const isLessonPassed = tasksCompletedCount === 5 && (lp.quizBestScore ?? 0) >= 70;

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 transition-colors"
            title="Orqaga qaytish"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="text-xs font-semibold text-sky-600 dark:text-sky-400">
              {lesson.month}-oy · {lesson.day}-kun ({lesson.level})
            </div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">
              {lesson.title}
            </h1>
          </div>
        </div>

        {/* 5-Hour Progress & Study Timer */}
        <div className="flex items-center gap-4">
          {/* Timer */}
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <Clock className="w-4 h-4 text-sky-600" />
            <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
              {formatTimer(timerSeconds)}
            </span>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="text-xs font-semibold text-sky-600 hover:underline ml-1"
            >
              {isTimerRunning ? "Pauza" : "Boshlash"}
            </button>
            <button
              onClick={() => {
                setIsTimerRunning(false);
                setTimerSeconds(60 * 60);
              }}
              className="text-slate-400 hover:text-slate-600 text-xs"
              title="Qayta o'rnatish"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Status badge */}
          <div className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
            {isLessonPassed ? (
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-4 h-4" /> Dars tugallandi
              </span>
            ) : (
              <span className="text-slate-600 dark:text-slate-400">
                {tasksCompletedCount}/5 soat ({tasksCompletedCount} vazifa)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 5 Hours Tab Navigation */}
      <div className="flex overflow-x-auto gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        {tabs.map((tab, idx) => {
          const isDone = Boolean(lp.tasksCompleted && lp.tasksCompleted[idx]);
          const isActive = activeTab === idx;
          const Icon = tab.icon;

          return (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors border ${
                isActive
                  ? "bg-sky-600 text-white border-sky-600 shadow-sm"
                  : isDone
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.title}</span>
              {isDone && <CheckCircle2 className="w-3.5 h-3.5" />}
            </button>
          );
        })}
      </div>

      {/* Hour Completion Checkbox Bar */}
      <div className="bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 rounded-xl p-3 flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-sky-900 dark:text-sky-200">
          <input
            type="checkbox"
            checked={Boolean(lp.tasksCompleted && lp.tasksCompleted[activeTab])}
            onChange={(e) => onToggleTask(lesson.id, activeTab, e.target.checked)}
            className="w-4 h-4 rounded text-sky-600 border-slate-300 focus:ring-sky-500"
          />
          <span>
            {activeTab + 1}-soatlik topshiriqni to'liq bajardim ({lesson.tasks[activeTab]?.durationMinutes || 60} daqiqa)
          </span>
        </label>
        <span className="text-[11px] text-sky-700 dark:text-sky-300">
          Reja: {lesson.tasks[activeTab]?.title}
        </span>
      </div>

      {/* Tab Content Display */}
      {/* ============================================================== */}
      {/* 1-SOAT: LUG'AT VA TALAFFUZ */}
      {/* ============================================================== */}
      {activeTab === 0 && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                1-soat: Yangi lug'at va talaffuz (10 ta muhim so'z)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Ovozli tugmani bosib talaffuzni eshiting, so'ng ovoz chiqarib takrorlang.
              </p>
            </div>
            <button
              onClick={() => onAddVocabularyToSrs(lesson)}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              So'zlarni SRS kartalariga qo'shish
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lesson.vocabulary.map((v, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-slate-900 dark:text-white">
                        {v.en}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        /{v.ipaOrRespelling}/
                      </span>
                    </div>
                    <button
                      onClick={() => handleSpeak(v.en)}
                      className="p-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 text-sky-600 dark:text-sky-300 transition-colors"
                      title="Talaffuzni tinglash"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-xs font-semibold text-sky-600 dark:text-sky-400 mb-2">
                    {v.uz}
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg text-xs space-y-1">
                    <div className="text-slate-800 dark:text-slate-200 font-medium">
                      "{v.example}"
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 italic">
                      "{v.exampleUz}"
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2-SOAT: GRAMMATIKA VA FORMULALAR */}
      {/* ============================================================== */}
      {activeTab === 1 && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              {lesson.grammar.title}
            </h2>
            <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line mb-6 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
              {lesson.grammar.explanationUz}
            </div>

            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Namunaviy gaplar va tahlil:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lesson.grammar.examples.map((ex, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start justify-between gap-3"
                >
                  <div className="text-xs">
                    <div className="font-semibold text-slate-900 dark:text-white mb-0.5">
                      {ex.en}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400">
                      {ex.uz}
                    </div>
                  </div>
                  <button
                    onClick={() => handleSpeak(ex.en)}
                    className="p-1 text-slate-400 hover:text-sky-600 transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3-SOAT: TINGLASH VA JONLI DIALOG */}
      {/* ============================================================== */}
      {activeTab === 2 && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  {lesson.dialogue.title}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Har bir qatorni alohida eshitish va soya usulida (shadowing) qaytarish tavsiya etiladi.
                </p>
              </div>
              <button
                onClick={() => {
                  const fullText = lesson.dialogue.lines.map((l) => `${l.speaker}: ${l.en}`).join(". ");
                  handleSpeak(fullText);
                }}
                className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                To'liq dialogni eshitish
              </button>
            </div>

            <div className="space-y-3">
              {lesson.dialogue.lines.map((line, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-start justify-between gap-3"
                >
                  <div className="text-xs">
                    <span className="font-bold text-sky-700 dark:text-sky-300 mr-2">
                      {line.speaker}:
                    </span>
                    <span className="text-slate-900 dark:text-white font-medium">
                      {line.en}
                    </span>
                    <div className="text-slate-500 dark:text-slate-400 mt-1 pl-4 border-l border-slate-200 dark:border-slate-700">
                      {line.uz}
                    </div>
                  </div>
                  <button
                    onClick={() => handleSpeak(line.en)}
                    className="p-1.5 text-slate-400 hover:text-sky-600 transition-colors"
                    title="Ushbu gapni eshitish"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4-SOAT: YOZISH VA AMALIYOT */}
      {/* ============================================================== */}
      {activeTab === 3 && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              4-soat: Yozish topshirig'i (Writing Prompt)
            </h2>
            <div className="p-4 bg-sky-50/60 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 rounded-lg text-xs text-sky-950 dark:text-sky-200 leading-relaxed mb-4">
              <strong>Vazifa:</strong> {lesson.writingPrompt}
            </div>

            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Yozma daftaringiz (Avtomatik saqlanadi):
            </label>
            <textarea
              rows={8}
              value={writingNote}
              onChange={(e) => {
                setWritingNote(e.target.value);
                onSaveNote(lesson.id, e.target.value);
              }}
              placeholder="Ingliz tilidagi matningizni shu yerga yozing..."
              className="w-full p-3.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <div className="flex justify-between items-center text-[11px] text-slate-400 mt-2">
              <span>So'zlar soni: {writingNote.trim() ? writingNote.trim().split(/\s+/).length : 0} ta</span>
              <button
                onClick={() => onSaveNote(lesson.id, writingNote)}
                className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded font-semibold text-xs"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5-SOAT: GAPIRISH VA KUNLIK TEST */}
      {/* ============================================================== */}
      {activeTab === 4 && (
        <div className="space-y-6">
          {/* Speaking Prompt Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
              <Mic className="w-4 h-4 text-sky-600" />
              Og'zaki gapirish amaliyoti (Speaking Practice)
            </h2>
            <p className="text-xs text-slate-500 mb-3">
              Telefoningizning diktofonini yoqing yoki o'zingizga ovoz chiqarib 2-3 daqiqa gapiring:
            </p>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
              {lesson.speakingPrompt}
            </div>
          </div>

          {/* Daily Quiz Engine (8 Questions) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Kunlik Test (8 ta savol)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Darsni muvaffaqiyatli topshirish uchun kamida 70% (6 ta to'g'ri) kerak.
                </p>
              </div>
              {quizScore !== null && (
                <div
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg ${
                    quizScore >= 70
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                      : "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
                  }`}
                >
                  Natija: {quizScore}% {quizScore >= 70 ? "(O'tdingiz)" : "(Qayta urinib ko'ring)"}
                </div>
              )}
            </div>

            <div className="space-y-6">
              {lesson.dailyQuiz.map((q, idx) => {
                const userChoice = userAnswers[q.id];
                const isCorrect = userChoice && userChoice.trim().toLowerCase() === q.answer.trim().toLowerCase();

                return (
                  <div
                    key={q.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/20"
                  >
                    <div className="text-xs font-bold text-slate-900 dark:text-white mb-2">
                      {idx + 1}-savol: {q.prompt}
                    </div>

                    {/* Multiple choice options */}
                    {q.options && q.options.length > 0 && q.type !== "sentence-order" ? (
                      <div className="space-y-1.5">
                        {q.options.map((opt, oIdx) => {
                          const isSelected = userChoice === opt;
                          return (
                            <button
                              key={oIdx}
                              disabled={quizSubmitted}
                              onClick={() => handleQuizOptionSelect(q.id, opt)}
                              className={`w-full text-left p-2.5 rounded-lg text-xs border transition-colors flex items-center justify-between ${
                                isSelected
                                  ? "border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200 font-semibold"
                                  : "border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                              }`}
                            >
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      /* Fill in blank or order input */
                      <div>
                        <input
                          type="text"
                          disabled={quizSubmitted}
                          value={userChoice || ""}
                          onChange={(e) => handleQuizOptionSelect(q.id, e.target.value)}
                          placeholder="Javobingizni yozing..."
                          className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                        />
                      </div>
                    )}

                    {/* Feedback if submitted */}
                    {quizSubmitted && (
                      <div
                        className={`mt-3 p-3 rounded-lg text-xs ${
                          isCorrect
                            ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800"
                            : "bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border border-rose-200 dark:border-rose-800"
                        }`}
                      >
                        <div className="font-bold mb-0.5">
                          {isCorrect ? "To'g'ri!" : `Xato! To'g'ri javob: ${q.answer}`}
                        </div>
                        <div className="text-[11px] opacity-90">{q.explanationUz}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Action Buttons */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              {!quizSubmitted ? (
                <button
                  onClick={handleQuizSubmit}
                  className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs rounded-lg transition-colors"
                >
                  Testni tekshirish
                </button>
              ) : (
                <button
                  onClick={handleQuizReset}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-lg transition-colors"
                >
                  Qayta urinish
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
