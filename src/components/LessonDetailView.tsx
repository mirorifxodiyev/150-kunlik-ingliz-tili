import React, { useState, useEffect, useRef } from "react";
import { AppState, Lesson, QuizQuestion } from "../types";
import { SpeechController } from "../utils/speech";
import {
  SpeechRecognitionService,
  SpeechRecognitionResult,
  WordAlignmentToken,
} from "../utils/speechRecognition";
import { MicrophoneDiagnosticModal } from "./MicrophoneDiagnosticModal";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  ExternalLink,
  Headphones,
  Info,
  Mic,
  PenTool,
  Play,
  RotateCcw,
  Sparkles,
  Video,
  Volume2,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Radio,
  Wrench,
} from "lucide-react";

interface LessonDetailViewProps {
  lesson: Lesson;
  state: AppState;
  onBack: () => void;
  onToggleTask: (lessonId: string, taskIndex: number, completed: boolean) => void;
  onSaveQuizResult: (
    lessonId: string,
    score: number,
    mistakes: QuizQuestion[],
    userAnswers: Record<string, string>
  ) => void;
  onSaveNote: (lessonId: string, note: string) => void;
  onAddVocabularyToSrs: (lesson: Lesson) => void;
  onPronounceWordSuccess?: () => void;
}

export const LessonDetailView: React.FC<LessonDetailViewProps> = ({
  lesson,
  state,
  onBack,
  onToggleTask,
  onSaveQuizResult,
  onSaveNote,
  onAddVocabularyToSrs,
  onPronounceWordSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [writingNote, setWritingNote] = useState<string>("");

  // Vocabulary pronunciation state
  const [activeVocabMicIdx, setActiveVocabMicIdx] = useState<number | null>(null);
  const [vocabPronunciationMap, setVocabPronunciationMap] = useState<
    Record<number, SpeechRecognitionResult>
  >({});

  // Speaking sentences practice state (sequential 5-6 sentences)
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState<number>(0);
  const [isListeningSentence, setIsListeningSentence] = useState<boolean>(false);
  const [sentenceResults, setSentenceResults] = useState<
    Record<number, SpeechRecognitionResult>
  >({});
  const [selectedRetryWord, setSelectedRetryWord] = useState<{
    sentenceIdx: number;
    wordIdx: number;
    token: WordAlignmentToken;
  } | null>(null);
  const [isListeningRetryWord, setIsListeningRetryWord] = useState<boolean>(false);
  const [retryWordFeedback, setRetryWordFeedback] = useState<string | null>(null);
  const [isComparingAudio, setIsComparingAudio] = useState<boolean>(false);

  // Free speaking prompt state
  const [isListeningPrompt, setIsListeningPrompt] = useState<boolean>(false);
  const [spokenPromptText, setSpokenPromptText] = useState<string>("");
  const [micErrorMessage, setMicErrorMessage] = useState<string | null>(null);
  const [showMicDiagnostics, setShowMicDiagnostics] = useState<boolean>(false);
  const [interimSpeechText, setInterimSpeechText] = useState<string>("");
  const activeListeningStopperRef = useRef<(() => void) | null>(null);

  // Quiz state
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Timer state for current hour study
  const [timerSeconds, setTimerSeconds] = useState<number>(60 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerNotice, setTimerNotice] = useState<string | null>(null);

  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  const lp = state.lessonProgress[lesson.id] || {
    tasksCompleted: [false, false, false, false, false],
    quizBestScore: null,
    quizAttempts: 0,
    writtenNote: "",
  };

  useEffect(() => {
    setWritingNote(lp.writtenNote || "");
    setQuizScore(lp.quizBestScore ?? null);
    setUserAnswers({});
    setQuizSubmitted(false);
    setSentenceResults({});
    setVocabPronunciationMap({});
    setCurrentSentenceIdx(0);
    setSelectedRetryWord(null);
    setMicErrorMessage(null);
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
      setTimerNotice(`Vaqt tugadi! ${activeTab + 1}-soatlik mashg'ulot yakunlandi.`);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, activeTab]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleSpeak = (text: string, customRate?: number, onEnd?: () => void) => {
    SpeechController.speak(text, {
      voiceURI: state.settings.voiceURI,
      rate: customRate ?? state.settings.speechRate,
      onEnd,
    });
  };

  const playRecordedAudio = (audioUrl: string, onEnded?: () => void) => {
    try {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
      const audio = new Audio(audioUrl);
      audioPlayerRef.current = audio;
      audio.onended = () => {
        if (onEnded) onEnded();
      };
      audio.onerror = () => {
        if (onEnded) onEnded();
      };
      audio.play().catch(() => {
        if (onEnded) onEnded();
      });
    } catch (e) {
      if (onEnded) onEnded();
    }
  };

  // Sequential comparison: "Mening ovozim" -> "Namuna (en-US TTS)"
  const handleSequentialCompare = (audioUrl: string | null | undefined, targetText: string) => {
    if (!audioUrl) {
      handleSpeak(targetText);
      return;
    }
    setIsComparingAudio(true);
    playRecordedAudio(audioUrl, () => {
      setTimeout(() => {
        handleSpeak(targetText, state.settings.speechRate, () => {
          setIsComparingAudio(false);
        });
      }, 350);
    });
  };

  // Check vocabulary word pronunciation
  const handleCheckVocabPronunciation = (index: number, targetWord: string) => {
    setMicErrorMessage(null);
    setInterimSpeechText("");
    setActiveVocabMicIdx(index);

    const runner = SpeechRecognitionService.listenAndCheck(
      targetWord,
      (res) => {
        setVocabPronunciationMap((prev) => ({ ...prev, [index]: res }));
        setActiveVocabMicIdx(null);
        setInterimSpeechText("");
        if (res.accuracyPct >= 75 && onPronounceWordSuccess) {
          onPronounceWordSuccess();
        }
      },
      (err) => {
        setMicErrorMessage(err);
        setActiveVocabMicIdx(null);
        setInterimSpeechText("");
      },
      () => {},
      () => {
        setActiveVocabMicIdx(null);
        setInterimSpeechText("");
      },
      (interim) => {
        setInterimSpeechText(interim);
      }
    );
    activeListeningStopperRef.current = runner.stop;
  };

  // Check target sentence pronunciation (word-by-word alignment)
  const handleCheckSentencePronunciation = (sentenceIdx: number, sentenceText: string) => {
    setMicErrorMessage(null);
    setInterimSpeechText("");
    setSelectedRetryWord(null);
    setRetryWordFeedback(null);
    setIsListeningSentence(true);

    const runner = SpeechRecognitionService.listenAndCheck(
      sentenceText,
      (res) => {
        setSentenceResults((prev) => ({ ...prev, [sentenceIdx]: res }));
        setIsListeningSentence(false);
        setInterimSpeechText("");
        if (res.accuracyPct >= 70 && onPronounceWordSuccess) {
          onPronounceWordSuccess();
        }
      },
      (err) => {
        setMicErrorMessage(err);
        setIsListeningSentence(false);
        setInterimSpeechText("");
      },
      () => {},
      () => {
        setIsListeningSentence(false);
        setInterimSpeechText("");
      },
      (interim) => {
        setInterimSpeechText(interim);
      }
    );
    activeListeningStopperRef.current = runner.stop;
  };

  // Click on a red/yellow word to hear it and retry just that word
  const handleWordClickForRetry = (
    sentenceIdx: number,
    wordIdx: number,
    token: WordAlignmentToken
  ) => {
    setRetryWordFeedback(null);
    setSelectedRetryWord({ sentenceIdx, wordIdx, token });
    handleSpeak(token.displayWord, 0.8);
  };

  const handleRetrySingleWordMic = () => {
    if (!selectedRetryWord) return;
    setMicErrorMessage(null);
    setInterimSpeechText("");
    setIsListeningRetryWord(true);
    setRetryWordFeedback(null);

    const { sentenceIdx, wordIdx, token } = selectedRetryWord;

    const runner = SpeechRecognitionService.listenAndCheck(
      token.displayWord,
      (res) => {
        setIsListeningRetryWord(false);
        setInterimSpeechText("");
        const wordRes = res.words[0];
        const sim = wordRes ? wordRes.similarity : res.accuracyPct;
        const newStatus = sim >= 85 ? "correct" : sim >= 55 ? "close" : "wrong";

        if (newStatus === "correct") {
          setRetryWordFeedback(`Ajoyib! "${token.displayWord}" so'zini to'g'ri aytdingiz (${sim}%).`);
          if (onPronounceWordSuccess) onPronounceWordSuccess();
        } else {
          setRetryWordFeedback(
            `Siz "${res.transcript || "..."}" dedingiz (${sim}%). Audioni eshitib yana bir bor urinib ko'ring.`
          );
        }

        // Update that word inside the sentence alignment result and recalculate average
        setSentenceResults((prev) => {
          const existing = prev[sentenceIdx];
          if (!existing) return prev;
          const updatedWords = [...existing.words];
          updatedWords[wordIdx] = {
            ...updatedWords[wordIdx],
            spokenWord: res.transcript || updatedWords[wordIdx].spokenWord,
            similarity: Math.max(updatedWords[wordIdx].similarity, sim),
            status:
              sim >= 85
                ? "correct"
                : sim >= 55 && updatedWords[wordIdx].status === "wrong"
                ? "close"
                : updatedWords[wordIdx].status,
          };
          const newAvg = Math.round(
            updatedWords.reduce((acc, w) => acc + w.similarity, 0) / updatedWords.length
          );
          return {
            ...prev,
            [sentenceIdx]: {
              ...existing,
              accuracyPct: newAvg,
              isMatch: newAvg >= 70,
              words: updatedWords,
            },
          };
        });
      },
      (err) => {
        setMicErrorMessage(err);
        setIsListeningRetryWord(false);
        setInterimSpeechText("");
      },
      () => {},
      () => {
        setIsListeningRetryWord(false);
        setInterimSpeechText("");
      },
      (interim) => {
        setInterimSpeechText(interim);
      }
    );
    activeListeningStopperRef.current = runner.stop;
  };

  const handleListenSpeakingPrompt = () => {
    setMicErrorMessage(null);
    setInterimSpeechText("");
    setIsListeningPrompt(true);

    const runner = SpeechRecognitionService.listenAndCheck(
      "",
      (res) => {
        setSpokenPromptText(res.transcript);
        setIsListeningPrompt(false);
        setInterimSpeechText("");
        if (res.transcript && onPronounceWordSuccess) {
          onPronounceWordSuccess();
        }
      },
      (err) => {
        setMicErrorMessage(err);
        setIsListeningPrompt(false);
        setInterimSpeechText("");
      },
      () => {},
      () => {
        setIsListeningPrompt(false);
        setInterimSpeechText("");
      },
      (interim) => {
        setInterimSpeechText(interim);
      }
    );
    activeListeningStopperRef.current = runner.stop;
  };

  const handleQuizOptionSelect = (qId: string, val: string) => {
    if (quizSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  // Helper for sentence-order clicking words
  const handleSentenceOrderWordToggle = (qId: string, word: string) => {
    if (quizSubmitted) return;
    const current = (userAnswers[qId] || "").trim();
    const parts = current ? current.split(/\s+/) : [];
    const next = [...parts, word].join(" ");
    setUserAnswers((prev) => ({ ...prev, [qId]: next }));
  };

  const handleQuizSubmit = () => {
    let correct = 0;
    const mistakes: QuizQuestion[] = [];

    lesson.dailyQuiz.forEach((q) => {
      const userAns = (userAnswers[q.id] || "")
        .trim()
        .toLowerCase()
        .replace(/[.!?]+$/g, "");
      const targetAns = q.answer
        .trim()
        .toLowerCase()
        .replace(/[.!?]+$/g, "");
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

    if (scorePct >= 70) {
      onToggleTask(lesson.id, 4, true);
    }
  };

  const handleQuizReset = () => {
    setUserAnswers({});
    setQuizSubmitted(false);
  };

  // If lesson content is not ready yet (Days 6-150)
  if (!lesson.isReady) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 transition-colors"
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
        </div>

        <div className="bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/60 rounded-xl p-8 text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Clock className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Bu dars hali tayyor emas
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
            <strong>{lesson.title}</strong> ({lesson.themeUz}) darsi uchun maxsus 10 ta so'z,
            grammatika formulalari, real hayotiy Amerika dialogi va kunlik test savollari
            bosqichma-bosqich kiritilmoqda. Hozirda 1–5-kun darslari to'liq tayyor.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={lesson.youtubeSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 inline-flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Mavzuni YouTube'dan qidirish
            </a>
            <button
              onClick={onBack}
              className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold"
            >
              Dasturga qaytish
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Lesson order required by specification:
  // Video -> Yangi so'zlar -> Grammatika -> Dialog -> Gapirish (mikrofon) -> Kunlik test
  const tabs = [
    { title: "1-soat: Video va Yangi so'zlar", icon: Video },
    { title: "2-soat: Grammatika", icon: BookOpen },
    { title: "3-soat: Dialog", icon: Headphones },
    { title: "4-soat: Gapirish (Mikrofon) va Yozish", icon: Mic },
    { title: "5-soat: Kunlik test", icon: PenTool },
  ];

  const tasksCompletedCount = (lp.tasksCompleted || []).filter(Boolean).length;
  const isLessonPassed = tasksCompletedCount === 5 && (lp.quizBestScore ?? 0) >= 70;

  const speakingSentences = lesson.speakingSentences || [];
  const completedSentencesCount = Object.keys(sentenceResults).length;
  const averageSpeakingScore =
    completedSentencesCount > 0
      ? Math.round(
          Object.values(sentenceResults).reduce(
            (sum: number, r: SpeechRecognitionResult) => sum + r.accuracyPct,
            0
          ) / completedSentencesCount
        )
      : null;

  const currentSentence = speakingSentences[currentSentenceIdx] || "";
  const currentSentenceRes = sentenceResults[currentSentenceIdx];
  const isSpeechSupported = SpeechRecognitionService.isSupported();

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
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <Clock className="w-4 h-4 text-sky-600" />
            <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
              {formatTimer(timerSeconds)}
            </span>
            <button
              onClick={() => {
                setTimerNotice(null);
                setIsTimerRunning(!isTimerRunning);
              }}
              className="text-xs font-semibold text-sky-600 hover:underline ml-1"
            >
              {isTimerRunning ? "Pauza" : "Boshlash"}
            </button>
            <button
              onClick={() => {
                setIsTimerRunning(false);
                setTimerSeconds(60 * 60);
                setTimerNotice(null);
              }}
              className="text-slate-400 hover:text-slate-600 text-xs"
              title="Qayta o'rnatish"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

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

      {timerNotice && (
        <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 p-3 rounded-xl flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-200">
          <span>{timerNotice}</span>
          <button
            onClick={() => setTimerNotice(null)}
            className="font-semibold underline"
          >
            Yopish
          </button>
        </div>
      )}

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
      <div className="bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-sky-900 dark:text-sky-200">
          <input
            type="checkbox"
            checked={Boolean(lp.tasksCompleted && lp.tasksCompleted[activeTab])}
            onChange={(e) => onToggleTask(lesson.id, activeTab, e.target.checked)}
            className="w-4 h-4 rounded text-sky-600 border-slate-300 focus:ring-sky-500"
          />
          <span>
            {activeTab + 1}-soatlik topshiriqni to'liq bajardim (
            {lesson.tasks[activeTab]?.durationMinutes || 60} daqiqa)
          </span>
        </label>
        <span className="text-[11px] text-sky-700 dark:text-sky-300">
          Reja: {lesson.tasks[activeTab]?.title}
        </span>
      </div>

      {/* ============================================================== */}
      {/* 1-SOAT: VIDEO VA YANGI SO'ZLAR (10 TA) */}
      {/* ============================================================== */}
      {activeTab === 0 && (
        <div className="space-y-6">
          {/* Video Cards Section */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Video className="w-4 h-4 text-sky-600" />
                  1-qadam: Video darslar (Amerika talaffuzi)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Darsni boshlashdan oldin quyidagi video manbalarni YouTube'da ko'rib, Amerika ohangiga quloqni o'rgating.
                </p>
              </div>
              <a
                href={lesson.youtubeSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg inline-flex items-center gap-1.5 transition-colors shrink-0"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Mavzu bo'yicha YouTube qidiruv
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lesson.videos.map((vid, vIdx) => (
                <div
                  key={vIdx}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-[11px] font-semibold text-sky-600 dark:text-sky-400 mb-1">
                      <span>
                        {vid.channel} · {vid.level}
                      </span>
                      <span className="text-slate-400">~{vid.durationMin} daqiqa</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {vid.title}
                    </h3>
                    <div className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                      {vid.verified
                        ? "Tasdiqlangan to'g'ridan-to'g'ri video havola"
                        : "Kanal bo'yicha YouTube qidiruv havolasi (verified: false)"}
                    </div>
                  </div>
                  <div className="pt-2">
                    <a
                      href={vid.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 bg-white dark:bg-slate-900 hover:bg-sky-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-sky-600 dark:text-sky-400 inline-flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      YouTube'da ochish
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vocabulary Section */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                2-qadam: Yangi so'zlar (10 ta faol so'z va talaffuz)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Har bir so'zni eshiting (oddiy yoki 0.7x sekin) va mikrofonni bosib talaffuzingizni tekshiring.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setShowMicDiagnostics(true)}
                className="px-3 py-1.5 bg-sky-50 dark:bg-sky-950/50 hover:bg-sky-100 dark:hover:bg-sky-900 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shrink-0"
                title="Mikrofon diagnostikasi va ovoz balandligini tekshirish"
              >
                <Wrench className="w-3.5 h-3.5 text-sky-600" />
                Mikrofonni tekshirish
              </button>
              <button
                onClick={() => onAddVocabularyToSrs(lesson)}
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                So'zlarni SRS kartalariga qo'shish
              </button>
            </div>
          </div>

          {micErrorMessage && (
            <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-rose-700 dark:text-rose-300">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold">Mikrofon xabari:</span> {micErrorMessage}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowMicDiagnostics(true)}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  Mikrofonni sozlash
                </button>
                <button
                  onClick={() => setMicErrorMessage(null)}
                  className="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Yopish
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lesson.vocabulary.map((v, i) => {
              const res = vocabPronunciationMap[i];
              const isListening = activeVocabMicIdx === i;

              return (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1 gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-base font-bold text-slate-900 dark:text-white">
                          {v.en}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          /{v.ipaOrRespelling}/
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleSpeak(v.en)}
                          className="p-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 dark:hover:bg-sky-900/60 text-sky-600 dark:text-sky-300 transition-colors"
                          title="Namuna talaffuzni tinglash"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleSpeak(v.en, 0.7)}
                          className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-[11px] font-bold transition-colors"
                          title="Sekin rejimda tinglash (0.7x)"
                        >
                          0.7x
                        </button>
                        <button
                          onClick={() => {
                            if (isListening) {
                              activeListeningStopperRef.current?.();
                              setActiveVocabMicIdx(null);
                            } else {
                              handleCheckVocabPronunciation(i, v.en);
                            }
                          }}
                          className={`p-1.5 rounded-lg transition-all flex items-center gap-1 text-xs font-semibold ${
                            isListening
                              ? "bg-rose-600 text-white animate-pulse shadow-md"
                              : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                          }`}
                          title={isListening ? "To'xtatish uchun bosing" : "Mikrofonga aytib tekshirish"}
                        >
                          <Mic className="w-4 h-4" />
                          {isListening && (
                            <span className="text-[11px] pr-1 font-bold">To'xtatish</span>
                          )}
                        </button>
                      </div>
                    </div>

                    {isListening && (
                      <div className="mb-2 p-2 rounded-lg bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-[11px] text-sky-800 dark:text-sky-200 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 font-medium">
                          <Radio className="w-3.5 h-3.5 text-sky-600 animate-pulse shrink-0" />
                          <span className="truncate">
                            {interimSpeechText ? (
                              <>Eshitilmoqda: <b className="text-slate-900 dark:text-white">"{interimSpeechText}"</b></>
                            ) : (
                              "So'zni mikrofonga ayting..."
                            )}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="text-xs font-semibold text-sky-600 dark:text-sky-400 mb-2">
                      {v.uz}
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg text-xs space-y-1 mb-2 flex items-start justify-between gap-2">
                      <div>
                        <div className="text-slate-800 dark:text-slate-200 font-medium">
                          "{v.example}"
                        </div>
                        <div className="text-slate-500 dark:text-slate-400 italic">
                          "{v.exampleUz}"
                        </div>
                      </div>
                      <button
                        onClick={() => handleSpeak(v.example)}
                        className="p-1 text-slate-400 hover:text-sky-600 shrink-0"
                        title="Misol gapni eshitish"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {res && (
                      <div
                        className={`p-2.5 rounded-lg text-xs border transition-all space-y-1.5 ${
                          res.accuracyPct >= 80
                            ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                            : res.accuracyPct >= 55
                            ? "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200"
                            : "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200"
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold">
                          <span>Ball: {res.accuracyPct}%</span>
                          <span className="text-[11px] opacity-80">
                            Siz aytdingiz: "{res.transcript || "—"}"
                          </span>
                        </div>
                        {res.audioUrl && (
                          <div className="flex items-center gap-2 pt-1">
                            <button
                              onClick={() => playRecordedAudio(res.audioUrl!)}
                              className="px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-[11px] font-semibold"
                            >
                              Mening ovozim
                            </button>
                            <button
                              onClick={() => handleSequentialCompare(res.audioUrl, v.en)}
                              className="px-2 py-1 bg-sky-600 text-white rounded text-[11px] font-semibold"
                            >
                              Ketma-ket tinglash
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2-SOAT: GRAMMATIKA VA NAMUNAVIY GAPLAR */}
      {/* ============================================================== */}
      {activeTab === 1 && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-3">
              {lesson.grammar.title}
            </h2>
            <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line mb-6 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
              {lesson.grammar.explanationUz}
            </div>

            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Grammatik qoida bo'yicha misollar ({lesson.grammar.examples.length} ta):
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {lesson.grammar.examples.map((ex, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start justify-between gap-3"
                >
                  <div className="text-xs">
                    <div className="font-semibold text-slate-900 dark:text-white mb-0.5">
                      {ex.en}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400">{ex.uz}</div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleSpeak(ex.en)}
                      className="p-1 text-slate-400 hover:text-sky-600 transition-colors"
                      title="Tinglash"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleSpeak(ex.en, 0.7)}
                      className="px-1.5 py-0.5 text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded"
                      title="Sekin (0.7x)"
                    >
                      0.7x
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Qo'shimcha kundalik 6 ta amaliy misol:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lesson.examples.map((ex, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-start justify-between gap-3"
                >
                  <div className="text-xs">
                    <div className="font-semibold text-slate-900 dark:text-white mb-0.5">
                      {ex.en}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400">{ex.uz}</div>
                  </div>
                  <button
                    onClick={() => handleSpeak(ex.en)}
                    className="p-1 text-slate-400 hover:text-sky-600 transition-colors shrink-0"
                    title="Tinglash"
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  {lesson.dialogue.title}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Har bir qatorni alohida eshitish va soya usulida (shadowing) qaytarish tavsiya etiladi.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    const fullText = lesson.dialogue.lines
                      .map((l) => l.en)
                      .join(" ");
                    handleSpeak(fullText);
                  }}
                  className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  To'liq eshitish
                </button>
                <button
                  onClick={() => {
                    const fullText = lesson.dialogue.lines
                      .map((l) => l.en)
                      .join(" ");
                    handleSpeak(fullText, 0.7);
                  }}
                  className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg transition-colors"
                >
                  Sekin (0.7x)
                </button>
              </div>
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
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleSpeak(line.en)}
                      className="p-1.5 text-slate-400 hover:text-sky-600 transition-colors"
                      title="Ushbu gapni eshitish"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleSpeak(line.en, 0.7)}
                      className="px-1.5 py-0.5 text-[10px] font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-slate-600 dark:text-slate-300"
                      title="Sekin (0.7x)"
                    >
                      0.7x
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4-SOAT: GAPIRISH (MIKROFON) VA YOZISH AMALIYOTI */}
      {/* ============================================================== */}
      {activeTab === 3 && (
        <div className="space-y-6">
          {/* Honest Disclaimer Banner with Diagnostic Button */}
          <div className="bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/70 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900 dark:text-amber-200">
            <div className="flex items-start gap-3">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-semibold">
                  Bu tekshiruv Web Speech tizimida ishlaydi (Chrome, Safari, Edge).
                </div>
                {!isSpeechSupported ? (
                  <div className="text-rose-600 dark:text-rose-400 font-bold">
                    Diqqat: Joriy brauzeringizda Web Speech Recognition topilmadi. Mikrofon mashqi ishlashi uchun Google Chrome, Edge yoki Safari brauzeridan foydalaning.
                  </div>
                ) : (
                  <div className="text-amber-700 dark:text-amber-300">
                    Mikrofoningiz ovoz olayotganini va ruxsat berilganini tekshirish uchun sinovdan foydalanishingiz mumkin.
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => setShowMicDiagnostics(true)}
              className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors shrink-0 shadow-sm"
            >
              <Wrench className="w-3.5 h-3.5" />
              Mikrofonni sinash va sozlash
            </button>
          </div>

          {micErrorMessage && (
            <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-rose-700 dark:text-rose-300">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold">Mikrofon xatosi:</span> {micErrorMessage}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowMicDiagnostics(true)}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  Mikrofonni sozlash
                </button>
                <button
                  onClick={() => setMicErrorMessage(null)}
                  className="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Yopish
                </button>
              </div>
            </div>
          )}

          {/* Sequential Speaking Sentences Practice */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Mic className="w-4 h-4 text-sky-600" />
                  So'zma-so'z talaffuz mashqi ({speakingSentences.length} ta gap)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Gapni mikrofonga o'qing. Har bir so'z yashil (to'g'ri), sariq (yaqin) yoki qizil (xato/tushib qolgan) rangda ko'rsatiladi.
                </p>
              </div>

              {averageSpeakingScore !== null && (
                <div className="px-3.5 py-2 rounded-lg bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-xs font-bold text-sky-800 dark:text-sky-200 shrink-0">
                  Mashq bajarildi: {completedSentencesCount}/{speakingSentences.length} · O'rtacha ball:{" "}
                  <span className="text-sky-600 dark:text-sky-400 text-sm">
                    {averageSpeakingScore}%
                  </span>
                </div>
              )}
            </div>

            {/* Sentence Stepper Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {speakingSentences.map((_, sIdx) => {
                const sRes = sentenceResults[sIdx];
                const isCurrent = currentSentenceIdx === sIdx;
                return (
                  <button
                    key={sIdx}
                    onClick={() => {
                      setCurrentSentenceIdx(sIdx);
                      setSelectedRetryWord(null);
                      setRetryWordFeedback(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                      isCurrent
                        ? "bg-sky-600 text-white border-sky-600"
                        : sRes
                        ? sRes.accuracyPct >= 75
                          ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300"
                          : "bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300"
                        : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    <span>{sIdx + 1}-gap</span>
                    {sRes && <span>({sRes.accuracyPct}%)</span>}
                  </button>
                );
              })}
            </div>

            {/* Active Sentence Box */}
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {currentSentenceIdx + 1}-mashq gapi (Qizil yoki sariq so'z ustiga bossangiz, uni alohida eshitib qayta aytasiz):
              </div>

              {/* Word-level highlighted display */}
              <div className="flex flex-wrap gap-2 items-center">
                {currentSentenceRes && currentSentenceRes.words.length > 0
                  ? currentSentenceRes.words.map((wToken, wIdx) => {
                      const badgeColors =
                        wToken.status === "correct"
                          ? "bg-emerald-100 dark:bg-emerald-950/80 border-emerald-400 text-emerald-900 dark:text-emerald-200"
                          : wToken.status === "close"
                          ? "bg-amber-100 dark:bg-amber-950/80 border-amber-400 text-amber-900 dark:text-amber-200 cursor-pointer hover:ring-2 hover:ring-amber-400"
                          : "bg-rose-100 dark:bg-rose-950/80 border-rose-400 text-rose-900 dark:text-rose-200 cursor-pointer hover:ring-2 hover:ring-rose-400 underline decoration-wavy";

                      return (
                        <button
                          key={wIdx}
                          type="button"
                          onClick={() =>
                            handleWordClickForRetry(currentSentenceIdx, wIdx, wToken)
                          }
                          className={`px-3 py-1.5 rounded-lg border text-base font-bold transition-all ${badgeColors}`}
                          title={
                            wToken.status === "correct"
                              ? `To'g'ri (${wToken.similarity}%)`
                              : `Bosib tinglang va qayta ayting (${wToken.similarity}%)`
                          }
                        >
                          {wToken.displayWord}
                        </button>
                      );
                    })
                  : currentSentence.split(/\s+/).map((word, wIdx) => (
                      <span
                        key={wIdx}
                        onClick={() => handleSpeak(word, 0.85)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-base font-bold text-slate-900 dark:text-white cursor-pointer hover:border-sky-400"
                        title="So'zni eshitish uchun bosing"
                      >
                        {word}
                      </span>
                    ))}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  Yashil: To'g'ri (85%+)
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  Sariq: Yaqin (55–84%)
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  Qizil: Xato yoki tushib qolgan (ustiga bosing!)
                </span>
              </div>

              {/* Controls: Mic, Namuna TTS, Slow 0.7x, Mening ovozim, Ketma-ket */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <button
                  onClick={() => {
                    if (isListeningSentence) {
                      activeListeningStopperRef.current?.();
                      setIsListeningSentence(false);
                    } else {
                      handleCheckSentencePronunciation(currentSentenceIdx, currentSentence);
                    }
                  }}
                  disabled={!isSpeechSupported}
                  className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                    isListeningSentence
                      ? "bg-rose-600 text-white animate-pulse shadow-md"
                      : "bg-sky-600 hover:bg-sky-700 text-white disabled:opacity-50"
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  {isListeningSentence ? "To'xtatish (Gapirib bo'ldim)" : "Mikrofonga aytish"}
                </button>

                <button
                  onClick={() => handleSpeak(currentSentence)}
                  className="px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4 text-sky-600" />
                  Namuna (en-US TTS)
                </button>

                <button
                  onClick={() => handleSpeak(currentSentence, 0.7)}
                  className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200"
                >
                  Sekin namuna (0.7x)
                </button>

                {currentSentenceRes?.audioUrl && (
                  <>
                    <button
                      onClick={() => playRecordedAudio(currentSentenceRes.audioUrl!)}
                      className="px-3.5 py-2 rounded-lg border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/50 text-xs font-semibold text-emerald-800 dark:text-emerald-200 flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5" />
                      Mening ovozim
                    </button>

                    <button
                      onClick={() =>
                        handleSequentialCompare(
                          currentSentenceRes.audioUrl,
                          currentSentence
                        )
                      }
                      disabled={isComparingAudio}
                      className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 disabled:opacity-60"
                    >
                      <Headphones className="w-3.5 h-3.5" />
                      {isComparingAudio
                        ? "Tinglanmoqda..."
                        : "Mening ovozim → Namuna"}
                    </button>
                  </>
                )}
              </div>

              {/* Real-time Listening Indicator & Interim Transcription */}
              {isListeningSentence && (
                <div className="p-3.5 rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 flex items-center justify-between gap-3 text-xs text-sky-800 dark:text-sky-200 animate-pulse">
                  <div className="flex items-center gap-2.5">
                    <Radio className="w-4 h-4 text-sky-600 animate-pulse shrink-0" />
                    <div>
                      {interimSpeechText ? (
                        <span>
                          Eshitilmoqda: <strong className="text-slate-900 dark:text-white font-mono">"{interimSpeechText}"</strong>
                        </span>
                      ) : (
                        <span>Mikrofon eshitmoqda... Gapni ingliz tilida o'qing!</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      activeListeningStopperRef.current?.();
                      setIsListeningSentence(false);
                    }}
                    className="px-2.5 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded text-[11px] font-bold shrink-0"
                  >
                    Tugatish
                  </button>
                </div>
              )}

              {/* Word-by-word result feedback */}
              {currentSentenceRes && (
                <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-sky-600 dark:text-sky-400">
                      So'z darajasidagi ball: {currentSentenceRes.accuracyPct}%
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      Aniqlangan matn: "{currentSentenceRes.transcript || "—"}"
                    </span>
                  </div>
                  <div className="text-slate-700 dark:text-slate-300">
                    {currentSentenceRes.messageUz}
                  </div>
                </div>
              )}

              {/* Single Red/Yellow Word Retry Drawer */}
              {selectedRetryWord &&
                selectedRetryWord.sentenceIdx === currentSentenceIdx && (
                  <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/70 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-rose-900 dark:text-rose-200">
                        Alohida so'z mashqi:{" "}
                        <span className="text-sm underline">
                          "{selectedRetryWord.token.displayWord}"
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedRetryWord(null)}
                        className="text-[11px] text-rose-600 hover:underline font-semibold"
                      >
                        Yopish
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() =>
                          handleSpeak(selectedRetryWord.token.displayWord, 0.75)
                        }
                        className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-700 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-sky-600" />
                        So'zni eshitish (0.75x)
                      </button>
                      <button
                        onClick={() => {
                          if (isListeningRetryWord) {
                            activeListeningStopperRef.current?.();
                            setIsListeningRetryWord(false);
                          } else {
                            handleRetrySingleWordMic();
                          }
                        }}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${
                          isListeningRetryWord
                            ? "bg-rose-600 text-white animate-pulse"
                            : "bg-sky-600 hover:bg-sky-700 text-white"
                        }`}
                      >
                        <Mic className="w-3.5 h-3.5" />
                        {isListeningRetryWord
                          ? "To'xtatish"
                          : "Shu so'zni qayta aytib ko'rish"}
                      </button>
                    </div>
                    {isListeningRetryWord && (
                      <div className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-rose-200 dark:border-rose-700 text-xs text-rose-900 dark:text-rose-200 flex items-center gap-2">
                        <Radio className="w-3.5 h-3.5 text-rose-600 animate-pulse shrink-0" />
                        <span>
                          {interimSpeechText
                            ? `Eshitilmoqda: "${interimSpeechText}"`
                            : `"${selectedRetryWord.token.displayWord}" so'zini mikrofonga ayting...`}
                        </span>
                      </div>
                    )}
                    {retryWordFeedback && (
                      <div className="text-xs font-medium text-slate-800 dark:text-slate-200 pt-1">
                        {retryWordFeedback}
                      </div>
                    )}
                  </div>
                )}

              {/* Prev / Next sentence navigation */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                <button
                  disabled={currentSentenceIdx === 0}
                  onClick={() => {
                    setCurrentSentenceIdx((p) => Math.max(0, p - 1));
                    setSelectedRetryWord(null);
                  }}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold disabled:opacity-40 inline-flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Oldingi gap
                </button>
                <button
                  disabled={currentSentenceIdx >= speakingSentences.length - 1}
                  onClick={() => {
                    setCurrentSentenceIdx((p) =>
                      Math.min(speakingSentences.length - 1, p + 1)
                    );
                    setSelectedRetryWord(null);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 dark:bg-slate-700 text-white text-xs font-semibold disabled:opacity-40 inline-flex items-center gap-1"
                >
                  Keyingi gap <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Free Speaking Prompt Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                Erkin og'zaki nutq topshirig'i (Speaking Prompt)
              </h2>
              <p className="text-xs text-slate-500">
                Quyidagi vaziyat bo'yicha 1–2 daqiqa erkin gapiring:
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              {lesson.speakingPrompt}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  if (isListeningPrompt) {
                    activeListeningStopperRef.current?.();
                    setIsListeningPrompt(false);
                  } else {
                    handleListenSpeakingPrompt();
                  }
                }}
                disabled={!isSpeechSupported}
                className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                  isListeningPrompt
                    ? "bg-rose-600 text-white animate-pulse shadow-lg"
                    : "bg-sky-600 hover:bg-sky-700 text-white shadow-sm disabled:opacity-50"
                }`}
              >
                <Mic className="w-4 h-4" />
                {isListeningPrompt
                  ? "To'xtatish (Gapirib bo'ldim)"
                  : "Erkin nutqni mikrofonda sinash"}
              </button>
            </div>

            {isListeningPrompt && (
              <div className="p-3.5 rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 flex items-center justify-between gap-3 text-xs text-sky-800 dark:text-sky-200 animate-pulse">
                <div className="flex items-center gap-2.5">
                  <Radio className="w-4 h-4 text-sky-600 animate-pulse shrink-0" />
                  <div>
                    {interimSpeechText ? (
                      <span>
                        Eshitilmoqda: <strong className="text-slate-900 dark:text-white font-mono">"{interimSpeechText}"</strong>
                      </span>
                    ) : (
                      <span>Mikrofon tinglamoqda... Fikringizni inglizcha erkin ayting!</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => {
                    activeListeningStopperRef.current?.();
                    setIsListeningPrompt(false);
                  }}
                  className="px-2.5 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded text-[11px] font-bold shrink-0"
                >
                  Tugatish
                </button>
              </div>
            )}

            {spokenPromptText && (
              <div className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs space-y-1">
                <div className="font-bold text-emerald-700 dark:text-emerald-400">
                  Yozib olingan nutqingiz:
                </div>
                <div className="text-slate-800 dark:text-slate-200 italic">
                  "{spokenPromptText}"
                </div>
              </div>
            )}
          </div>

          {/* Writing Prompt Notebook */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Yozish topshirig'i (Writing Prompt)
            </h2>
            <div className="p-4 bg-sky-50/60 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 rounded-lg text-xs text-sky-950 dark:text-sky-200 leading-relaxed mb-4">
              <strong>Vazifa:</strong> {lesson.writingPrompt}
            </div>

            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Yozma daftaringiz (Avtomatik saqlanadi):
            </label>
            <textarea
              rows={6}
              value={writingNote}
              onChange={(e) => {
                setWritingNote(e.target.value);
                onSaveNote(lesson.id, e.target.value);
              }}
              placeholder="Ingliz tilidagi matningizni shu yerga yozing..."
              className="w-full p-3.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <div className="flex justify-between items-center text-[11px] text-slate-400 mt-2">
              <span>
                So'zlar soni:{" "}
                {writingNote.trim() ? writingNote.trim().split(/\s+/).length : 0} ta
              </span>
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
      {/* 5-SOAT: KUNLIK TEST (8 SAVOL) */}
      {/* ============================================================== */}
      {activeTab === 4 && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Kunlik Test ({lesson.dailyQuiz.length} ta savol)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Shu kunning lug'ati va grammatikasi asosida 5 xil turdagi savollar. O'tish bali: 70%.
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
                  Natija: {quizScore}%{" "}
                  {quizScore >= 70 ? "(O'tdingiz)" : "(Qayta urinib ko'ring)"}
                </div>
              )}
            </div>

            <div className="space-y-6">
              {lesson.dailyQuiz.map((q, idx) => {
                const userChoice = userAnswers[q.id] || "";
                const isCorrect =
                  userChoice.trim().toLowerCase().replace(/[.!?]+$/g, "") ===
                  q.answer.trim().toLowerCase().replace(/[.!?]+$/g, "");

                return (
                  <div
                    key={q.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/20"
                  >
                    <div className="text-xs font-bold text-slate-900 dark:text-white mb-2">
                      {idx + 1}-savol: {q.prompt}
                    </div>

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
                    ) : q.type === "sentence-order" && q.options ? (
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1.5">
                          {q.options.map((word, wIdx) => (
                            <button
                              key={wIdx}
                              type="button"
                              disabled={quizSubmitted}
                              onClick={() => handleSentenceOrderWordToggle(q.id, word)}
                              className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-sky-400 rounded text-xs font-semibold text-slate-700 dark:text-slate-200"
                            >
                              + {word}
                            </button>
                          ))}
                          {!quizSubmitted && userChoice && (
                            <button
                              type="button"
                              onClick={() => handleQuizOptionSelect(q.id, "")}
                              className="px-2 py-1 text-[11px] text-rose-600 hover:underline"
                            >
                              Tozalash
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          disabled={quizSubmitted}
                          value={userChoice}
                          onChange={(e) => handleQuizOptionSelect(q.id, e.target.value)}
                          placeholder="So'zlar ustiga bosing yoki gapni to'liq yozing..."
                          className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                        />
                      </div>
                    ) : (
                      <div>
                        <input
                          type="text"
                          disabled={quizSubmitted}
                          value={userChoice}
                          onChange={(e) => handleQuizOptionSelect(q.id, e.target.value)}
                          placeholder="Javobingizni yozing..."
                          className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                        />
                      </div>
                    )}

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

      {/* Microphone Diagnostic & Setup Modal */}
      {showMicDiagnostics && (
        <MicrophoneDiagnosticModal
          onClose={() => setShowMicDiagnostics(false)}
        />
      )}
    </div>
  );
};
