export type CheckLeapYearResult =
  | { status: "ok"; isLeapYear: boolean }
  | { status: "error" };
