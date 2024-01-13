import { CheckLeapYearResult } from "@/types/checkLeapYearResult";
import { GetLeapDayResult } from "@/types/getLeapDayResult";

export const yearUtil = {
  isLeapYear: (year: number): CheckLeapYearResult => {
    if (year < 0) return { status: "error" };
    if (!Number.isInteger(year)) return { status: "error" };
    return {
      status: "ok",
      isLeapYear: (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0,
    };
  },
  getLeapDay: (year: number): GetLeapDayResult => {
    const checkLeapYearResult = yearUtil.isLeapYear(year);
    if (checkLeapYearResult.status === "error") {
      return { status: "error" };
    }
    return { status: "ok", value: checkLeapYearResult.isLeapYear ? 29 : 28 };
  },
};
