import { Lesson, Test } from "../types";
import { MONTH_1_LESSONS } from "./month1";
import { MONTH_2_LESSONS } from "./month2";
import { MONTH_3_LESSONS } from "./month3";
import { MONTH_4_LESSONS } from "./month4";
import { MONTH_5_LESSONS } from "./month5";
import { ALL_TESTS } from "./tests";

export const CURRICULUM: Lesson[] = [
  ...MONTH_1_LESSONS,
  ...MONTH_2_LESSONS,
  ...MONTH_3_LESSONS,
  ...MONTH_4_LESSONS,
  ...MONTH_5_LESSONS
];

export const TESTS: Record<string, Test> = ALL_TESTS;
