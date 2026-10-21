import { AppState, Lesson, MistakeEntry, SrsCard } from "../types";

export const STORAGE_KEY = "eng150_v1";
export const SCHEMA_VERSION = 1;

let inMemoryStorage: AppState | null = null;
let isStorageFailing = false;

export function getTodayString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getDefaultState(): AppState {
  return {
    schemaVersion: SCHEMA_VERSION,
    activeDay: 1,
    lessonProgress: {},
    testProgress: {},
    srsCards: [],
    srsStats: {
      reviewedTodayCount: 0,
      lastReviewDate: getTodayString(),
      correctAnswersTotal: 0,
      totalReviewsCount: 0,
    },
    mistakes: [],
    streak: {
      current: 0,
      best: 0,
      lastCompletedDate: null,
    },
    settings: {
      theme: "system",
      voiceURI: "",
      speechRate: 0.95,
      ownerUnlockMode: false,
    },
  };
}

export function migrateState(data: any): AppState {
  const fallback = getDefaultState();
  if (!data || typeof data !== "object") return fallback;

  return {
    schemaVersion: SCHEMA_VERSION,
    activeDay: typeof data.activeDay === "number" ? Math.max(1, Math.min(150, data.activeDay)) : 1,
    lessonProgress: data.lessonProgress && typeof data.lessonProgress === "object" ? data.lessonProgress : {},
    testProgress: data.testProgress && typeof data.testProgress === "object" ? data.testProgress : {},
    srsCards: Array.isArray(data.srsCards) ? data.srsCards : [],
    srsStats: data.srsStats && typeof data.srsStats === "object" ? {
      reviewedTodayCount: typeof data.srsStats.reviewedTodayCount === "number" ? data.srsStats.reviewedTodayCount : 0,
      lastReviewDate: data.srsStats.lastReviewDate || getTodayString(),
      correctAnswersTotal: typeof data.srsStats.correctAnswersTotal === "number" ? data.srsStats.correctAnswersTotal : 0,
      totalReviewsCount: typeof data.srsStats.totalReviewsCount === "number" ? data.srsStats.totalReviewsCount : 0,
    } : fallback.srsStats,
    mistakes: Array.isArray(data.mistakes) ? data.mistakes : [],
    streak: data.streak && typeof data.streak === "object" ? {
      current: typeof data.streak.current === "number" ? data.streak.current : 0,
      best: typeof data.streak.best === "number" ? data.streak.best : 0,
      lastCompletedDate: data.streak.lastCompletedDate || null,
    } : fallback.streak,
    settings: data.settings && typeof data.settings === "object" ? {
      theme: ["light", "dark", "system"].includes(data.settings.theme) ? data.settings.theme : "system",
      voiceURI: typeof data.settings.voiceURI === "string" ? data.settings.voiceURI : "",
      speechRate: typeof data.settings.speechRate === "number" ? data.settings.speechRate : 0.95,
      ownerUnlockMode: Boolean(data.settings.ownerUnlockMode),
    } : fallback.settings,
  };
}

export function loadAppState(): { state: AppState; usingMemory: boolean } {
  if (typeof window === "undefined" || !window.localStorage) {
    if (!inMemoryStorage) inMemoryStorage = getDefaultState();
    return { state: inMemoryStorage, usingMemory: true };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const defaultState = getDefaultState();
      saveAppState(defaultState);
      return { state: defaultState, usingMemory: false };
    }
    const parsed = JSON.parse(raw);
    const migrated = migrateState(parsed);
    return { state: migrated, usingMemory: false };
  } catch (err) {
    console.error("localStorage error:", err);
    isStorageFailing = true;
    if (!inMemoryStorage) inMemoryStorage = getDefaultState();
    return { state: inMemoryStorage, usingMemory: true };
  }
}

export function saveAppState(state: AppState): boolean {
  if (typeof window === "undefined" || !window.localStorage) {
    inMemoryStorage = state;
    return false;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    isStorageFailing = false;
    return true;
  } catch (err) {
    console.warn("Storage save failed, falling back to memory:", err);
    inMemoryStorage = state;
    isStorageFailing = true;
    return false;
  }
}

export function isLocalStorageFailing(): boolean {
  return isStorageFailing;
}

export function calculateStreak(
  currentStreak: { current: number; best: number; lastCompletedDate: string | null },
  completedDate: string
): { current: number; best: number; lastCompletedDate: string } {
  if (!currentStreak.lastCompletedDate) {
    return {
      current: 1,
      best: Math.max(1, currentStreak.best),
      lastCompletedDate: completedDate,
    };
  }

  if (currentStreak.lastCompletedDate === completedDate) {
    return {
      current: currentStreak.current,
      best: currentStreak.best,
      lastCompletedDate: completedDate,
    };
  }

  const last = new Date(currentStreak.lastCompletedDate);
  const now = new Date(completedDate);
  const diffTime = Math.abs(now.getTime() - last.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let nextCurrent = 1;
  if (diffDays === 1) {
    nextCurrent = currentStreak.current + 1;
  }

  return {
    current: nextCurrent,
    best: Math.max(nextCurrent, currentStreak.best),
    lastCompletedDate: completedDate,
  };
}

export function isLessonFullyCompleted(
  lessonId: string,
  state: AppState
): boolean {
  const p = state.lessonProgress[lessonId];
  if (!p) return false;
  const tasksDone = (p.tasksCompleted || []).filter(Boolean).length === 5;
  const quizPassed = (p.quizBestScore ?? 0) >= 70;
  return tasksDone && quizPassed;
}

export function isDayUnlocked(
  day: number,
  allLessons: Lesson[],
  state: AppState
): { unlocked: boolean; reason?: string } {
  if (state.settings.ownerUnlockMode) {
    return { unlocked: true };
  }

  if (day === 1) return { unlocked: true };

  const prevLesson = allLessons.find((l) => l.day === day - 1);
  if (!prevLesson) return { unlocked: true };

  const prevDone = isLessonFullyCompleted(prevLesson.id, state);
  if (!prevDone) {
    return {
      unlocked: false,
      reason: `${day - 1}-kunning barcha 5 soatlik vazifalari bajarilishi va kunlik testdan kamida 70% olinishi kerak.`,
    };
  }

  // Check if month change requires monthly exam passing
  if ((day - 1) % 30 === 0) {
    const prevMonth = Math.floor((day - 1) / 30);
    const examId = `exam_m${prevMonth}`;
    const examProg = state.testProgress[examId];
    if (!examProg || !examProg.passed) {
      return {
        unlocked: false,
        reason: `${day}-kunga o'tish uchun ${prevMonth}-oy yakuniy imtihonidan kamida 70% olish shart.`,
      };
    }
  }

  return { unlocked: true };
}

export function isTestUnlocked(
  testId: string,
  allLessons: Lesson[],
  state: AppState
): { unlocked: boolean; reason?: string } {
  if (state.settings.ownerUnlockMode) {
    return { unlocked: true };
  }

  // Parse month and week/exam
  const parts = testId.split("_"); // e.g. "w_m1_1" or "exam_m1"
  if (parts[0] === "w") {
    // Weekly test, e.g. w_m1_2 (month 1, week 2, requires day 14)
    const month = parseInt(parts[1].replace("m", ""), 10);
    const week = parseInt(parts[2], 10);
    const requiredDayInMonth = week * 7;
    const requiredAbsoluteDay = (month - 1) * 30 + requiredDayInMonth;

    const reqLesson = allLessons.find((l) => l.day === requiredAbsoluteDay);
    if (!reqLesson || !isLessonFullyCompleted(reqLesson.id, state)) {
      return {
        unlocked: false,
        reason: `Ushbu haftalik testni ochish uchun ${requiredAbsoluteDay}-kun darsini to'liq tugatgan bo'lishingiz kerak.`,
      };
    }
    return { unlocked: true };
  } else if (parts[0] === "exam") {
    // Monthly exam: requires day 30 of that month and all 4 weekly tests
    const month = parseInt(parts[1].replace("m", ""), 10);
    const day30 = month * 30;
    const reqLesson = allLessons.find((l) => l.day === day30);
    if (!reqLesson || !isLessonFullyCompleted(reqLesson.id, state)) {
      return {
        unlocked: false,
        reason: `Oylik imtihonga kirish uchun ${month}-oyning barcha 30 ta darsini to'liq tugatishingiz kerak.`,
      };
    }

    // Check weekly tests
    for (let w = 1; w <= 4; w++) {
      const wId = `w_m${month}_${w}`;
      const wProg = state.testProgress[wId];
      if (!wProg || !wProg.passed) {
        return {
          unlocked: false,
          reason: `Oylik imtihon uchun ${month}-oyning barcha 4 ta haftalik testidan kamida 70% o'tish talab qilinadi.`,
        };
      }
    }
    return { unlocked: true };
  }

  return { unlocked: true };
}

export function populateSrsFromLesson(lesson: Lesson, state: AppState): SrsCard[] {
  const existingMap = new Map(state.srsCards.map((c) => [c.id, c]));
  const today = getTodayString();
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 1);
  const nextDateStr = nextDate.toISOString().slice(0, 10);

  const newCards: SrsCard[] = [];
  lesson.vocabulary.forEach((v, idx) => {
    const cardId = `srs_${lesson.id}_v${idx + 1}`;
    if (!existingMap.has(cardId)) {
      newCards.push({
        id: cardId,
        lessonId: lesson.id,
        month: lesson.month,
        front: v.en,
        back: v.uz,
        ipa: v.ipaOrRespelling,
        example: `${v.example} — ${v.exampleUz}`,
        intervalDays: 1,
        dueDate: nextDateStr,
        repetitions: 0,
        easeFactor: 2.5,
      });
    }
  });

  return newCards;
}

export function processSrsCardReview(
  card: SrsCard,
  remembered: boolean
): SrsCard {
  const today = new Date();
  let nextInterval: number;
  let nextRepetitions: number;

  if (remembered) {
    nextRepetitions = card.repetitions + 1;
    if (nextRepetitions === 1) nextInterval = 1;
    else if (nextRepetitions === 2) nextInterval = 3;
    else if (nextRepetitions === 3) nextInterval = 7;
    else if (nextRepetitions === 4) nextInterval = 14;
    else nextInterval = 30;
  } else {
    nextRepetitions = 0;
    nextInterval = 1; // Restart cycle if forgotten
  }

  const nextDue = new Date(today);
  nextDue.setDate(nextDue.getDate() + nextInterval);

  return {
    ...card,
    repetitions: nextRepetitions,
    intervalDays: nextInterval,
    dueDate: nextDue.toISOString().slice(0, 10),
  };
}

export function recordMistake(
  entry: Omit<MistakeEntry, "errorCount" | "consecutiveCorrect" | "mastered" | "reviewStatus" | "date">,
  state: AppState
): MistakeEntry[] {
  const list = [...state.mistakes];
  const idx = list.findIndex((m) => m.questionId === entry.questionId);
  const today = getTodayString();

  if (idx >= 0) {
    const existing = list[idx];
    list[idx] = {
      ...existing,
      learnerAnswer: entry.learnerAnswer,
      errorCount: existing.errorCount + 1,
      consecutiveCorrect: 0,
      mastered: false,
      reviewStatus: "Xato takrorlandi",
      date: today,
    };
  } else {
    list.unshift({
      ...entry,
      errorCount: 1,
      consecutiveCorrect: 0,
      mastered: false,
      reviewStatus: "Yangi xato",
      date: today,
    });
  }

  return list;
}

export function recordMistakeRetryResult(
  questionId: string,
  isCorrect: boolean,
  userAnswer: string,
  state: AppState
): MistakeEntry[] {
  const list = [...state.mistakes];
  const idx = list.findIndex((m) => m.questionId === questionId);
  if (idx < 0) return list;

  const item = { ...list[idx] };
  if (isCorrect) {
    item.consecutiveCorrect = (item.consecutiveCorrect || 0) + 1;
    if (item.consecutiveCorrect >= 3) {
      item.mastered = true;
      item.reviewStatus = "O'zlashtirildi (3/3)";
    } else {
      item.reviewStatus = `${item.consecutiveCorrect}/3 ketma-ket to'g'ri`;
    }
  } else {
    item.consecutiveCorrect = 0;
    item.errorCount = (item.errorCount || 1) + 1;
    item.learnerAnswer = userAnswer || "(Bo'sh)";
    item.reviewStatus = "Qayta xato";
  }

  list[idx] = item;
  return list;
}
