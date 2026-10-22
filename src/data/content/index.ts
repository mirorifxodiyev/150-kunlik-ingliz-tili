import { DayContent } from "../../types";
import { DAYS_001_005 } from "./days_001_005";
import { DAYS_006_010 } from "./days_006_010";

export const ALL_DAYS_CONTENT: Record<number, DayContent> = {
  ...DAYS_001_005,
  ...DAYS_006_010,
};

export function getDayContent(day: number): DayContent | undefined {
  return ALL_DAYS_CONTENT[day];
}
