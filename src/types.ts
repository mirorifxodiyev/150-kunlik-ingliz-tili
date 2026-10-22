export type CefrLevel = "A1" | "A1 -> A2" | "A2" | "A2 -> B1" | "B1" | "B1 -> B2";

export interface VocabularyItem {
  en: string;
  uz: string;
  example: string;
  exampleUz: string;
  ipaOrRespelling: string;
}

export interface GrammarSection {
  title: string;
  explanationUz: string;
  examples: { en: string; uz: string }[];
}

export interface DialogueLine {
  speaker: string;
  en: string;
  uz: string;
}

export interface DialogueSection {
  title: string;
  lines: DialogueLine[];
}

export interface HourlyTask {
  title: string;
  durationMinutes: number;
  description: string;
  breakdown: { minutes: number; activity: string }[];
}

export type QuizQuestionType =
  | "mcq-translation"
  | "fill-blank"
  | "grammar-choice"
  | "sentence-order"
  | "correct-sentence";

export interface QuizQuestion {
  id: string;
  type: QuizQuestionType;
  prompt: string;
  options?: string[];
  answer: string;
  explanationUz: string;
}

export interface ExternalResource {
  title: string;
  url: string;
  type: string;
}

export interface VideoItem {
  title: string;
  channel: string;
  url: string;
  level: string;
  durationMin: number;
  verified: boolean;
}

export interface DayContent {
  vocabulary: VocabularyItem[];
  grammar: GrammarSection;
  examples: { en: string; uz: string }[];
  dialogue: DialogueSection;
  speakingPrompt: string;
  writingPrompt: string;
  speakingSentences: string[];
  dailyQuiz: QuizQuestion[];
  videos: VideoItem[];
}

export interface Lesson {
  id: string;
  month: number;
  day: number;
  level: CefrLevel;
  title: string;
  themeUz: string;
  isReady: boolean;
  objectives: string[];
  vocabulary: VocabularyItem[];
  grammar: GrammarSection;
  examples: { en: string; uz: string }[];
  dialogue: DialogueSection;
  tasks: HourlyTask[];
  dailyQuiz: QuizQuestion[];
  speakingSentences: string[];
  videos: VideoItem[];
  youtubeSearchUrl: string;
  weeklyTestId: string;
  monthlyExamId: string;
  resources: ExternalResource[];
  speakingPrompt: string;
  writingPrompt: string;
  reviewItems: string[];
  summaryChecklist: string[];
}

export interface Test {
  id: string;
  month: number;
  week?: number;
  afterDayInMonth: number;
  title: string;
  passingScore: number;
  isAvailable: boolean;
  unavailableReasonUz?: string;
  questions: QuizQuestion[];
}

export interface SrsCard {
  id: string;
  lessonId: string;
  month: number;
  front: string;
  back: string;
  ipa?: string;
  example?: string;
  intervalDays: number;
  dueDate: string; // YYYY-MM-DD
  repetitions: number;
  easeFactor: number;
}

export interface MistakeEntry {
  questionId: string;
  lessonId: string;
  ref: string;
  month: number;
  type: QuizQuestionType;
  prompt: string;
  correctAnswer: string;
  learnerAnswer: string;
  explanationUz: string;
  options?: string[];
  date: string;
  errorCount: number;
  consecutiveCorrect: number;
  mastered: boolean;
  reviewStatus: string;
}

export interface LessonProgress {
  tasksCompleted: boolean[]; // 5 tasks for the 5 hours
  quizBestScore: number | null;
  quizAttempts: number;
  writtenNote?: string;
  completedDate?: string;
}

export interface TestProgress {
  testId: string;
  bestScore: number;
  attempts: number;
  passed: boolean;
  lastAttemptDate: string;
}

export interface StreakState {
  current: number;
  best: number;
  lastCompletedDate: string | null;
}

export interface SrsStats {
  reviewedTodayCount: number;
  lastReviewDate: string;
  correctAnswersTotal: number;
  totalReviewsCount: number;
}

export interface Badge {
  id: string;
  title: string;
  descriptionUz: string;
  iconName: string;
  category: "streak" | "curriculum" | "speech" | "mastery";
  unlocked: boolean;
  unlockedDate?: string;
}

export interface AppSettings {
  theme: "light" | "dark" | "system";
  voiceURI: string;
  speechRate: number;
  ownerUnlockMode: boolean; // Mustaqil rejim / Qulflarni ochish
}

export interface AppState {
  schemaVersion: number;
  activeDay: number;
  lessonProgress: Record<string, LessonProgress>;
  testProgress: Record<string, TestProgress>;
  srsCards: SrsCard[];
  srsStats: SrsStats;
  mistakes: MistakeEntry[];
  streak: StreakState;
  badges: Badge[];
  pronunciationChecksCount: number;
  settings: AppSettings;
}
