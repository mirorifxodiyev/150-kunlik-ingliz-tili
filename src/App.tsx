import React, { useState, useEffect, useRef } from "react";
import { AppState, Lesson, QuizQuestion } from "./types";
import { CURRICULUM, TESTS } from "./data";
import {
  calculateStreak,
  evaluateBadges,
  getDefaultState,
  getTodayString,
  isLocalStorageFailing,
  loadAppState,
  populateSrsFromLesson,
  recordMistake,
  recordMistakeRetryResult,
  saveAppState,
} from "./utils/storage";
import {
  isSupabaseConfigured,
  loadProgressFromSupabase,
  saveProgressToSupabase,
} from "./lib/supabase";
import { Navigation, ViewType } from "./components/Navigation";
import { DashboardView } from "./components/DashboardView";
import { CurriculumView } from "./components/CurriculumView";
import { LessonDetailView } from "./components/LessonDetailView";
import { TestRunnerView } from "./components/TestRunnerView";
import { SrsReviewView } from "./components/SrsReviewView";
import { MistakesView } from "./components/MistakesView";
import { StatsView } from "./components/StatsView";
import { SettingsView } from "./components/SettingsView";
import { BadgesModal } from "./components/BadgesModal";
import { AlertCircle } from "lucide-react";

export default function App() {
  const [state, setState] = useState<AppState>(() => {
    const loaded = loadAppState().state;
    return evaluateBadges(loaded);
  });
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [activeLessonId, setActiveLessonId] = useState<string>("m1_d1");
  const [activeTestId, setActiveTestId] = useState<string>("w_m1_1");
  const [storageWarning, setStorageWarning] = useState<boolean>(false);
  const [showBadgesModal, setShowBadgesModal] = useState<boolean>(false);
  const syncTimeoutRef = useRef<number | null>(null);

  // Initial pull from Supabase if local state has no progress yet
  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    let cancelled = false;
    (async () => {
      const res = await loadProgressFromSupabase();
      if (cancelled || !res.ok || !res.state) return;
      setState((prev) => {
        const localLessonsCount = Object.keys(prev.lessonProgress).length;
        const remoteLessonsCount = Object.keys(res.state!.lessonProgress).length;
        if (
          remoteLessonsCount > localLessonsCount ||
          (localLessonsCount === 0 && res.state!.srsCards.length > prev.srsCards.length)
        ) {
          const evaluated = evaluateBadges(res.state!);
          saveAppState(evaluated);
          return evaluated;
        }
        return prev;
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // PWA install prompt state
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isPwaInstalled, setIsPwaInstalled] = useState<boolean>(false);

  // Listen for PWA beforeinstallprompt event
  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const installedHandler = () => {
      setIsPwaInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", installedHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, []);

  const handleInstallPwa = async () => {
    if (!deferredPrompt) {
      alert("Ilovani o'rnatish uchun brauzeringiz menyusidan (3 ta nuqta yoki 'Share') 'Add to Home Screen' (Ekraningizga qo'shish) tugmasini bosing.");
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setIsPwaInstalled(true);
    }
  };

  // Apply theme class
  useEffect(() => {
    const root = document.documentElement;
    const theme = state.settings.theme;

    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    } else {
      // System
      const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
      if (darkQuery.matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [state.settings.theme]);

  // Persist state on change & evaluate badges automatically
  const updateAndSaveState = (updater: (prev: AppState) => AppState) => {
    setState((prev) => {
      const intermediate = updater(prev);
      const next = evaluateBadges(intermediate);
      const ok = saveAppState(next);
      if (!ok && isLocalStorageFailing()) {
        setStorageWarning(true);
      } else {
        setStorageWarning(false);
      }
      if (isSupabaseConfigured()) {
        if (syncTimeoutRef.current) {
          window.clearTimeout(syncTimeoutRef.current);
        }
        syncTimeoutRef.current = window.setTimeout(() => {
          saveProgressToSupabase(next);
        }, 800);
      }
      return next;
    });
  };

  // Called when user speaks and tests pronunciation with microphone successfully
  const handlePronounceWordSuccess = () => {
    updateAndSaveState((prev) => ({
      ...prev,
      pronunciationChecksCount: (prev.pronunciationChecksCount || 0) + 1,
    }));
  };

  // Toggle hourly task completion (1 of the 5 tasks)
  const handleToggleTask = (lessonId: string, taskIndex: number, completed: boolean) => {
    updateAndSaveState((prev) => {
      const currentLP = prev.lessonProgress[lessonId] || {
        tasksCompleted: [false, false, false, false, false],
        quizBestScore: null,
        quizAttempts: 0,
      };

      const updatedTasks = [...(currentLP.tasksCompleted || [false, false, false, false, false])];
      updatedTasks[taskIndex] = completed;

      const allDone = updatedTasks.filter(Boolean).length === 5;
      const quizPassed = (currentLP.quizBestScore ?? 0) >= 70;

      let nextStreak = { ...prev.streak };
      let completedDate = currentLP.completedDate;

      if (allDone && quizPassed && !completedDate) {
        const today = getTodayString();
        completedDate = today;
        nextStreak = calculateStreak(prev.streak, today);
      }

      return {
        ...prev,
        streak: nextStreak,
        lessonProgress: {
          ...prev.lessonProgress,
          [lessonId]: {
            ...currentLP,
            tasksCompleted: updatedTasks,
            completedDate,
          },
        },
      };
    });
  };

  // Save daily quiz results
  const handleSaveQuizResult = (
    lessonId: string,
    score: number,
    mistakes: QuizQuestion[],
    userAnswers: Record<string, string>
  ) => {
    updateAndSaveState((prev) => {
      const currentLP = prev.lessonProgress[lessonId] || {
        tasksCompleted: [false, false, false, false, false],
        quizBestScore: null,
        quizAttempts: 0,
      };

      const bestScore = Math.max(currentLP.quizBestScore ?? 0, score);
      const allTasksDone = (currentLP.tasksCompleted || []).filter(Boolean).length === 5;
      const isNowFullyPassed = allTasksDone && bestScore >= 70;

      let nextStreak = { ...prev.streak };
      let completedDate = currentLP.completedDate;

      if (isNowFullyPassed && !completedDate) {
        const today = getTodayString();
        completedDate = today;
        nextStreak = calculateStreak(prev.streak, today);
      }

      // Record any mistakes into Xatolar daftari
      let updatedMistakes = [...prev.mistakes];
      const lessonObj = CURRICULUM.find((l) => l.id === lessonId);
      const lessonMonth = lessonObj ? lessonObj.month : 1;

      mistakes.forEach((m) => {
        const uAns = userAnswers[m.id] || "";
        updatedMistakes = recordMistake(
          {
            questionId: m.id,
            lessonId,
            ref: lessonObj?.title || lessonId,
            month: lessonMonth,
            type: m.type,
            prompt: m.prompt,
            correctAnswer: m.answer,
            learnerAnswer: uAns,
            explanationUz: m.explanationUz,
            options: m.options,
          },
          { ...prev, mistakes: updatedMistakes }
        );
      });

      return {
        ...prev,
        streak: nextStreak,
        mistakes: updatedMistakes,
        lessonProgress: {
          ...prev.lessonProgress,
          [lessonId]: {
            ...currentLP,
            quizBestScore: bestScore,
            quizAttempts: currentLP.quizAttempts + 1,
            completedDate,
          },
        },
      };
    });
  };

  // Save weekly test or monthly exam result
  const handleSaveTestResult = (
    testId: string,
    score: number,
    passed: boolean,
    mistakes: QuizQuestion[]
  ) => {
    updateAndSaveState((prev) => {
      const prevTP = prev.testProgress[testId];
      const best = Math.max(prevTP?.bestScore ?? 0, score);

      // Record any mistakes
      let updatedMistakes = [...prev.mistakes];
      const testObj = TESTS[testId];
      const testMonth = testObj ? testObj.month : 1;

      mistakes.forEach((m) => {
        updatedMistakes = recordMistake(
          {
            questionId: m.id,
            lessonId: testId,
            ref: testObj?.title || testId,
            month: testMonth,
            type: m.type,
            prompt: m.prompt,
            correctAnswer: m.answer,
            learnerAnswer: "",
            explanationUz: m.explanationUz,
            options: m.options,
          },
          { ...prev, mistakes: updatedMistakes }
        );
      });

      return {
        ...prev,
        mistakes: updatedMistakes,
        testProgress: {
          ...prev.testProgress,
          [testId]: {
            testId,
            bestScore: best,
            attempts: (prevTP?.attempts || 0) + 1,
            passed: Boolean(prevTP?.passed || passed),
            lastAttemptDate: getTodayString(),
          },
        },
      };
    });
  };

  const handleSaveNote = (lessonId: string, note: string) => {
    updateAndSaveState((prev) => {
      const currentLP = prev.lessonProgress[lessonId] || {
        tasksCompleted: [false, false, false, false, false],
        quizBestScore: null,
        quizAttempts: 0,
      };
      return {
        ...prev,
        lessonProgress: {
          ...prev.lessonProgress,
          [lessonId]: {
            ...currentLP,
            writtenNote: note,
          },
        },
      };
    });
  };

  const handleAddVocabularyToSrs = (lesson: Lesson) => {
    updateAndSaveState((prev) => {
      const newCards = populateSrsFromLesson(lesson, prev);
      alert(`${newCards.length} ta yangi so'z SRS takrorlash kartalariga qo'shildi!`);
      return {
        ...prev,
        srsCards: [...prev.srsCards, ...newCards],
      };
    });
  };

  const handleUpdateSrsCard = (updatedCard: any, remembered: boolean) => {
    updateAndSaveState((prev) => {
      const updatedCards = prev.srsCards.map((c) =>
        c.id === updatedCard.id ? updatedCard : c
      );
      return {
        ...prev,
        srsCards: updatedCards,
        srsStats: {
          ...prev.srsStats,
          reviewedTodayCount: prev.srsStats.reviewedTodayCount + 1,
          totalReviewsCount: prev.srsStats.totalReviewsCount + 1,
          correctAnswersTotal:
            prev.srsStats.correctAnswersTotal + (remembered ? 1 : 0),
        },
      };
    });
  };

  const handleRetryMistakeAnswer = (
    questionId: string,
    isCorrect: boolean,
    userAnswer: string
  ) => {
    updateAndSaveState((prev) => {
      const updatedMistakes = recordMistakeRetryResult(
        questionId,
        isCorrect,
        userAnswer,
        prev
      );
      return {
        ...prev,
        mistakes: updatedMistakes,
      };
    });
  };

  // Navigations
  const handleOpenLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setCurrentView("lesson");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenTest = (testId: string) => {
    setActiveTestId(testId);
    setCurrentView("test-runner");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentLesson =
    CURRICULUM.find((l) => l.id === activeLessonId) || CURRICULUM[0];
  const currentTest = TESTS[activeTestId] || Object.values(TESTS)[0];

  const dueSrsCount = state.srsCards.filter(
    (c) => c.dueDate <= getTodayString()
  ).length;
  const activeMistakesCount = state.mistakes.filter((m) => !m.mastered).length;

  const unlockedBadgesCount = (state.badges || []).filter((b) => b.unlocked).length;
  const canInstallPwa = Boolean(deferredPrompt) || (!isPwaInstalled && typeof window !== "undefined");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col lg:flex-row font-sans">
      {/* Navigation */}
      <Navigation
        currentView={currentView}
        onNavigate={(v) => {
          setCurrentView(v);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        streakCount={state.streak.current}
        dueSrsCount={dueSrsCount}
        activeMistakesCount={activeMistakesCount}
        ownerUnlockMode={state.settings.ownerUnlockMode}
        onOpenBadges={() => setShowBadgesModal(true)}
        unlockedBadgesCount={unlockedBadgesCount}
        onInstallPwa={handleInstallPwa}
        canInstallPwa={canInstallPwa}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-8">
        {/* Storage Warning if local storage fails */}
        {storageWarning && (
          <div className="bg-amber-50 dark:bg-amber-950/80 border-b border-amber-200 dark:border-amber-800 px-4 py-2 text-xs text-amber-800 dark:text-amber-200 flex items-center justify-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Diqqat: Brauzeringizning localStorage xotirasi to'lgan yoki cheklangan. Ma'lumotlar vaqtinchalik xotirada saqlanmoqda. Sozlamalar bo'limidan JSON eksport orqali zaxira oling.
            </span>
          </div>
        )}

        <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 lg:p-8">
          {currentView === "dashboard" && (
            <DashboardView
              state={state}
              allLessons={CURRICULUM}
              onOpenLesson={handleOpenLesson}
              onOpenTest={handleOpenTest}
              onNavigate={(v) => {
                setCurrentView(v);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onToggleTask={handleToggleTask}
              onOpenBadges={() => setShowBadgesModal(true)}
              onInstallPwa={handleInstallPwa}
              canInstallPwa={canInstallPwa}
            />
          )}

          {currentView === "curriculum" && (
            <CurriculumView
              allLessons={CURRICULUM}
              state={state}
              onOpenLesson={handleOpenLesson}
              onOpenTest={handleOpenTest}
            />
          )}

          {currentView === "lesson" && (
            <LessonDetailView
              lesson={currentLesson}
              state={state}
              onBack={() => setCurrentView("curriculum")}
              onToggleTask={handleToggleTask}
              onSaveQuizResult={handleSaveQuizResult}
              onSaveNote={handleSaveNote}
              onAddVocabularyToSrs={handleAddVocabularyToSrs}
              onPronounceWordSuccess={handlePronounceWordSuccess}
            />
          )}

          {currentView === "test-runner" && (
            <TestRunnerView
              test={currentTest}
              state={state}
              onBack={() => setCurrentView("curriculum")}
              onSaveTestResult={handleSaveTestResult}
            />
          )}

          {currentView === "srs" && (
            <SrsReviewView
              state={state}
              onUpdateSrsCard={handleUpdateSrsCard}
              onBack={() => setCurrentView("dashboard")}
            />
          )}

          {currentView === "mistakes" && (
            <MistakesView
              state={state}
              onRetryAnswer={handleRetryMistakeAnswer}
              onBack={() => setCurrentView("dashboard")}
            />
          )}

          {currentView === "stats" && (
            <StatsView
              state={state}
              allLessons={CURRICULUM}
              onBack={() => setCurrentView("dashboard")}
            />
          )}

          {currentView === "settings" && (
            <SettingsView
              state={state}
              onUpdateSettings={(newS) =>
                updateAndSaveState((p) => ({ ...p, settings: newS }))
              }
              onImportState={(newSt) => {
                const evaluated = evaluateBadges(newSt);
                saveAppState(evaluated);
                setState(evaluated);
              }}
              onResetProgress={() => {
                const fresh = getDefaultState();
                saveAppState(fresh);
                setState(fresh);
              }}
              onBack={() => setCurrentView("dashboard")}
            />
          )}
        </main>
      </div>

      {/* Badges Modal */}
      {showBadgesModal && (
        <BadgesModal
          badges={state.badges || []}
          onClose={() => setShowBadgesModal(false)}
        />
      )}
    </div>
  );
}
