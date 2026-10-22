# 150-Kunlik Ingliz Tili Platformasi (150-Day English Mastery)

An offline-first, self-contained American English learning platform tailored for Uzbek-speaking adult beginners (A0) preparing to move to the United States in 5 months. It structures 750 hours of study across 150 daily 5-hour sessions with interactive quizzes, weekly tests, monthly exams, spaced repetition (SRS), and an automated mistakes notebook.

## User Review & Critical Decisions

> [!IMPORTANT]
> Below is the summary of your confirmed choices from Phase 1 and the architectural strategy we will follow to build and validate the platform.

- **Confirmed Decision 1 (Full 150-Day Curriculum)**: All 150 lessons across Months 1 to 5 (plus 20 weekly tests and 5 monthly 30-question exams) will be individually authored with authentic American English content, Uzbek explanations, phonetic respellings, and 5-hour task breakdowns.
- **Confirmed Decision 2 (Dual Delivery — AI Studio Preview + Standalone `/index.html`)**: We will build the modular `/build` compilation pipeline that outputs a 100% self-contained, zero-dependency `/index.html` (and copies it to `/mnt/user-data/outputs/index.html` if writable, plus project root) while keeping the live preview server on port 3000 serving the exact same application seamlessly.
- **Confirmed Decision 3 (Clean Academic Editorial Aesthetic)**: The UI will feature a high-contrast editorial layout with a 60-30-10 color budget, dark/light theme support, tabular numerals, and clear Uzbek (Latin script) navigation and feedback.

---

## 1. Overview & Core Concept

- **What It Does**: Guides a learner through a strict 150-day, 5-hour-per-day curriculum from absolute beginner foundations (A1 target) to practical daily and workplace independence (B1 target, B2 stretch) without making false CEFR certification claims from lesson completion alone.
- **Target Audience / Persona**: Uzbek-speaking adult beginner (A0) relocating to the USA in 5 months, needing practical American English for survival, work, housing, healthcare, banking, and social integration.
- **Key Value**: Works 100% offline for all lessons, grammar, vocabulary, audio pronunciation (Web Speech API `en-US`), quizzes, SRS, and error tracking, while providing curated YouTube search queries and podcast tasks for internet-connected listening practice.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Dashboard ("Bosh sahifa")**: Displays real-time computed progress across 150 lessons, current month & target level, unique vocabulary counter (`X / 500+ so'z`), streak calendar status, today's 5-hour checklist (`0/5` to `5/5`), due SRS reviews, and prominent **"Bugungi dars"** / **"Davom etish"** action buttons.
  2. **5-Hour Daily Lesson View ("Kunlik dars")**:
     - Study materials: Objectives, 10–15 vocabulary items with American English respelling and Web Speech API (`en-US`) audio buttons, grammar explanation in Uzbek with examples, practical dialogue, speaking & writing prompts, and summary checklist.
     - Interactive 5-Task Checklist (each 60 minutes with detailed minute splits): Task 1 (YouTube search lesson), Task 2 (Vocab & Grammar active recall), Task 3 (Segmented listening), Task 4 (Speaking & shadowing + offline alternative), Task 5 (SRS review, writing, error correction & film/series clip analysis).
     - Daily Quiz (8–10 mixed-type questions): Immediate grading, Uzbek explanations, automatic logging of wrong answers to the Mistakes Notebook, and strict `>=70%` pass threshold (showing `"Darsni takrorlang"` if below 70%).
  3. **Assessments ("Haftalik testlar" & "Oylik imtihonlar")**:
     - Weekly Tests after Days 7, 14, 21, and 28 (15–20 questions). Failing does not permanently block daily lessons, but all 4 weekly tests in a month must be passed before the Monthly Exam unlocks.
     - Monthly Exam after Day 30 (30 questions covering vocabulary, grammar, reading, transcript-based listening comprehension, and practical English). Passing with `>=70%` unlocks the next month.
  4. **Mistakes Notebook ("Xatolar daftari")**: Automatically captures every incorrect answer across quizzes, tests, and exams. Supports filtering by month, lesson, and error type, flashcard review, and retrying incorrect questions. An item is marked mastered only after **3 consecutive correct answers** in review.
  5. **Spaced Repetition ("So'z va grammatika takrorlash - SRS")**: Schedules learned vocabulary and grammar on `+1, +3, +7, +14, +30` day intervals. Dropping below 60% recent accuracy triggers a recommendation banner advising revision before starting new vocabulary.
  6. **Settings & Backup ("Sozlamalar")**: Theme toggle (Light / Dark / System), Web Speech `en-US` voice selector, JSON Export & validated JSON Import, full reset with confirmation, and the **"Mustaqil rejim / Qulflarni ochish"** toggle with confirmation dialog and active warning banner.

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Clean Academic Editorial — authoritative, distraction-free, structured like a premium modern language workbook and analytical dashboard.
  - *Color Palette & Mood (60-30-10)*:
    - **60% Canvas**: Crisp alabaster paper (`#F8FAFC`) in Light Mode; deep slate ink (`#0F172A`) in Dark Mode.
    - **30% Structural Surfaces**: Pure white (`#FFFFFF`) / elevated slate (`#1E293B`) containers with hairline borders (`#E2E8F0` / `#334155`).
    - **10% Semantic Accents**: Deep Cobalt Blue (`#1D4ED8` / `#3B82F6`) for primary actions, Emerald (`#059669`) paired with explicit text labels for completed/passed states, and Amber/Crimson (`#D97706` / `#DC2626`) with icons/labels for warnings and failed attempts.
  - *Typography & Hierarchy*: System-native neo-grotesque and serif stack (zero external font requests to strictly honor the offline single-file constraint) with `tabular-nums` for all timers, scores, and statistics.
  - *Layout*: Responsive sidebar navigation on desktop (`1280px+`) and fixed bottom navigation bar on mobile (`375px`), keeping fixed bars under 15% of viewport height.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Modular Build Pipeline Producing a Single Inline `index.html`**
  - *Chosen Approach*: Author curriculum chunks in `/build/data/m1_a.js` through `m5_c.js` alongside `/build/app.html.part`, assemble them via `/build/build.js` into a standalone `/index.html` with zero external `<script src>`, `<link href="http...">`, or `@import` rules, and validate via `/build/validate.js`.
  - *Why*: Satisfies the strict single-file offline requirement and passes all 10 automated validation checks while allowing clean, maintainable authoring of 150 distinct lessons and 25 assessments.
- **Decision 2: Versioned `localStorage` with In-Memory Fallback**
  - *Chosen Approach*: Store all learner state under `eng150_v1` with `schemaVersion: 1` and an active migration function `migrateStorageSchema()`. Wrap all storage reads/writes in `try/catch` blocks so if `localStorage` is disabled or full, the platform shows an Uzbek warning banner and continues smoothly in memory.
  - *Why*: Prevents crashes in strict privacy browsers or mobile webviews and ensures zero data loss via JSON Export/Import.
- **Decision 3: Strict Unlock Guard + Non-Destructive "Mustaqil Rejim"**
  - *Chosen Approach*: Central `canAccessLesson(lessonId)` and `canAccessTest(testId)` guards enforce progressive lesson unlocking, weekly test prerequisites for monthly exams, and 70% monthly exam thresholds. Enabling "Mustaqil rejim" in Settings bypasses the view lock after confirmation and displays a persistent top banner without altering real completion dates or streak records.
  - *Why*: Enforces pedagogical discipline while giving the self-directed learner an escape hatch to preview or jump if needed.

---

## 4. Technical Architecture & Data Strategy

### Architecture & Component Diagram

```
┌───────────────────────────────────────────────────────────────────────────┐
│                   BUILD & VALIDATION PIPELINE (/build)                    │
│  ┌───────────────┐   ┌────────────────────────────┐   ┌────────────────┐  │
│  │ app.html.part │ + │ data/m1_a.js ... m5_c.js   │──▶│   build.js     │  │
│  │ (UI + Engine) │   │ (150 Lessons + 25 Tests)   │   └───────┬────────┘  │
│  └───────────────┘   └────────────────────────────┘           ▼           │
│                                                       ┌────────────────┐  │
│                                                       │  /index.html   │  │
│                                                       └───────┬────────┘  │
│                                                               ▼           │
│                                                       ┌────────────────┐  │
│                                                       │  validate.js   │  │
│                                                       └────────────────┘  │
└───────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                 SINGLE-FILE OFFLINE RUNTIME (index.html)                  │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │ State & Persistence Layer (eng150_v1 + try/catch In-Memory Fallback)│  │
│  │  • Schema Migration • Streak Calculator • Access Control Guard      │  │
│  │  • SRS Scheduler (+1,+3,+7,+14,+30d)   • Mistakes Notebook Tracker  │  │
│  └──────────────────────────────────┬──────────────────────────────────┘  │
│                                     │                                     │
│  ┌───────────────┬──────────────────┼──────────────────┬───────────────┐  │
│  ▼               ▼                  ▼                  ▼               ▼  │
│ ┌──────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌───────┐ │
│ │Dashboard │ │5-Hr Lesson & │ │Weekly Tests &│ │SRS & Xatolar │ │Backup │ │
│ │& Stats   │ │Daily Quiz UI │ │Monthly Exams │ │Daftari Views │ │& Audio│ │
│ └──────────┘ └──────────────┘ └──────────────┘ └──────────────┘ └───────┘ │
└───────────────────────────────────────────────────────────────────────────┘
```

### Data Model & Curriculum Scope
- **`CURRICULUM` (150 Lesson Objects)**:
  - **Month 1 (Days 1–30, A1 Foundations)**: Alphabet, phonics, spelling names, greetings, pronouns, *to be*, numbers/age, countries, articles, plurals, demonstratives, family, household objects, *there is/are*, question words, negatives, core verbs, time/dates, adjectives, present simple, short American dialogues.
  - **Month 2 (Days 31–60, A2 Everyday English)**: US currency/shopping, grocery stores, restaurants/tipping, transit/directions, appointments, daily routines, work shifts, health/symptoms, present simple vs. continuous, past simple (regular/irregular), future (*will* / *going to*), count/non-count nouns, comparatives/superlatives, modals (*can, must, should*).
  - **Month 3 (Days 61–90, A2–B1 Practical Independence)**: US job applications, resumes, workplace conversations, job interviews, opening a US bank account, credit/debit, apartment hunting & leases, utilities, doctor visits, pharmacy prescriptions, calling 911, phone etiquette, official forms (DMV/SSN), customer service/returns.
  - **Month 4 (Days 91–120, B1 Listening & Speaking)**: Podcast comprehension strategies, authentic American conversations, storytelling in past tenses, expressing opinions, describing past experiences (present perfect vs. past simple), workplace meetings, interview answers (STAR method), connected speech (*gonna, wanna, gotta, flap T*), intonation, paraphrasing.
  - **Month 5 (Days 121–150, B1–B2 Development)**: American cultural norms, small talk, housing/HOA/tenant rights, car buying/insurance/traffic stops, workplace conflict resolution, high-frequency phrasal verbs, American idioms in context, regional accents, extended listening comprehension, structured argumentation, independent speaking mastery.
- **`TESTS` (25 Assessment Objects)**:
  - 20 Weekly Tests (`w_m1_1` .. `w_m5_4`, 15–20 questions each after days 7, 14, 21, 28 of each month).
  - 5 Monthly Exams (`exam_m1` .. `exam_m5`, 30 questions each after day 30 of each month).

### Interactive Component & State Mapping
- **Router & Access Guard**: Hash/view router intercepts every navigation request via `canOpenLesson(id)` and `canOpenAssessment(id)`. Locked items show an Uzbek explanation modal/toast and redirect safely unless "Mustaqil rejim" is active.
- **Task & Quiz Engine**: Checking any of the 5 daily tasks immediately saves timestamped progress and updates the `0/5` counter and study hours. Submitting a quiz validates all answers, records wrong answers to `mistakes[]` (incrementing `errorCount` if already present and resetting `consecutiveCorrect` to 0), adds lesson vocabulary/grammar to `srsItems{}` upon lesson completion, and updates the daily streak if all 5 tasks + `>=70%` quiz are completed.
- **Web Speech API Controller**: Selects the best available `en-US` voice, exposes play and stop/cancel buttons on every vocabulary item, example, and dialogue line, and shows a polite Uzbek message if speech synthesis is unsupported.
