export type GetLeapDayResult =
  | { status: "ok", value: number }
  | {status: "error"}