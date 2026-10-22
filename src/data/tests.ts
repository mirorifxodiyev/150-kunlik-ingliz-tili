import { QuizQuestion, Test } from "../types";
import { ALL_DAYS_CONTENT } from "./content";

/**
 * Deterministically selects `count` questions from the ready days in [startDay, endDay],
 * distributing evenly across days and question types without duplicates.
 */
export function selectQuestionsFromDays(
  prefix: string,
  startDay: number,
  endDay: number,
  count: number
): { questions: QuizQuestion[]; readyDaysCount: number; totalDaysCount: number } {
  const readyDays: number[] = [];
  for (let d = startDay; d <= endDay; d++) {
    if (ALL_DAYS_CONTENT[d] && ALL_DAYS_CONTENT[d].dailyQuiz.length > 0) {
      readyDays.push(d);
    }
  }

  const totalDaysCount = endDay - startDay + 1;
  if (readyDays.length === 0) {
    return { questions: [], readyDaysCount: 0, totalDaysCount };
  }

  // Round-robin pick across ready days so every ready day is represented evenly
  const selected: QuizQuestion[] = [];
  const usedIds = new Set<string>();
  let round = 0;

  while (selected.length < count) {
    let addedInRound = false;
    for (const day of readyDays) {
      const dayQuiz = ALL_DAYS_CONTENT[day].dailyQuiz;
      if (round < dayQuiz.length) {
        const q = dayQuiz[round];
        if (!usedIds.has(q.id)) {
          usedIds.add(q.id);
          selected.push({
            ...q,
            id: `${prefix}_${q.id}`,
          });
          addedInRound = true;
          if (selected.length === count) break;
        }
      }
    }
    if (!addedInRound) break;
    round++;
  }

  return {
    questions: selected,
    readyDaysCount: readyDays.length,
    totalDaysCount,
  };
}

export const ALL_TESTS: Record<string, Test> = {};

// Generate 20 weekly tests (16 questions each, sampled from that week's days)
for (let m = 1; m <= 5; m++) {
  for (let w = 1; w <= 4; w++) {
    const id = `w_m${m}_${w}`;
    const startDay = (m - 1) * 30 + (w - 1) * 7 + 1;
    const endDay = w === 4 ? m * 30 : (m - 1) * 30 + w * 7;
    const afterDayInMonth = w === 4 ? 30 : w * 7;
    const questionsCount = 16;

    const { questions, readyDaysCount, totalDaysCount } = selectQuestionsFromDays(
      `wt_m${m}_w${w}`,
      startDay,
      endDay,
      questionsCount
    );

    const isAvailable = questions.length >= questionsCount;

    ALL_TESTS[id] = {
      id,
      month: m,
      week: w,
      afterDayInMonth,
      title: `${m}-oy, ${w}-haftalik nazorat testi (${startDay}–${endDay}-kunlar)`,
      passingScore: 70,
      isAvailable,
      unavailableReasonUz: isAvailable
        ? undefined
        : `Mavjud emas: ${startDay}–${endDay}-kunlar dars mazmuni hali tayyor emas (${readyDaysCount}/${totalDaysCount} kun tayyor).`,
      questions: isAvailable ? questions : [],
    };
  }
}

// Generate 5 monthly exams (30 questions each, sampled from all days in that month)
for (let m = 1; m <= 5; m++) {
  const id = `exam_m${m}`;
  const startDay = (m - 1) * 30 + 1;
  const endDay = m * 30;
  const questionsCount = 30;

  const examTitles: Record<number, string> = {
    1: "1-oy Katta Yakuniy Imtihoni: A1 Poydevor (Foundations)",
    2: "2-oy Katta Yakuniy Imtihoni: A2 Kundalik Muloqot (Everyday English)",
    3: "3-oy Katta Yakuniy Imtihoni: A2 -> B1 Amaliy Mustaqillik (Independence)",
    4: "4-oy Katta Yakuniy Imtihoni: B1 Tinglash va Gapirish (Listening & Speaking)",
    5: "5-oy Katta Yakuniy Imtihoni: B1 -> B2 Rivojlanish va AQSH Hayoti (Capstone Exam)",
  };

  const { questions, readyDaysCount, totalDaysCount } = selectQuestionsFromDays(
    `ex_m${m}`,
    startDay,
    endDay,
    questionsCount
  );

  const isAvailable = questions.length >= questionsCount;

  ALL_TESTS[id] = {
    id,
    month: m,
    afterDayInMonth: 30,
    title: examTitles[m] || `${m}-oylik imtihon`,
    passingScore: 70,
    isAvailable,
    unavailableReasonUz: isAvailable
      ? undefined
      : `Mavjud emas: ${m}-oy darslari mazmuni hali to'liq tayyor emas (${readyDaysCount}/${totalDaysCount} kun tayyor).`,
    questions: isAvailable ? questions : [],
  };
}
