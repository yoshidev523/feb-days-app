import { yearUtil } from "@/lib/yearUtil";
import { CheckLeapYearResult } from "@/types/checkLeapYearResult";
import { GetLeapDayResult } from "@/types/getLeapDayResult";

jest.spyOn(console, "log");

describe("isLeapYearのテスト", () => {
  test.each([
    [2024, true],
    [2025, false],
    [2000, true],
    [2100, false],
  ])("正常系 year=%i, isLeapYear=%s", (year, expectedIsLeapYear) => {
    const actual = yearUtil.isLeapYear(year);
    const expected: CheckLeapYearResult = {
      status: "ok",
      isLeapYear: expectedIsLeapYear,
    };
    expect(actual).toEqual(expected);
  });

  test.each([[-1], [1.1]])("異常系 year=%s", (year) => {
    const actual = yearUtil.isLeapYear(year);
    const expected: CheckLeapYearResult = {
      status: "error",
    };
    expect(actual).toEqual(expected);
  });
});

describe("getLeapDayのテスト", () => {
  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  test("閏年の時は29が返る", () => {
    const spy = jest.spyOn(yearUtil, "isLeapYear").mockImplementation((_) => ({
      status: "ok",
      isLeapYear: true,
    }));
    const actual = yearUtil.getLeapDay(1000);
    const expected: GetLeapDayResult = { status: "ok", value: 29 };
    expect(actual).toEqual(expected);
  });

  test("閏年の時は29が返る", () => {
    const spy = jest.spyOn(yearUtil, "isLeapYear").mockImplementation((_) => ({
      status: "ok",
      isLeapYear: false,
    }));
    const actual = yearUtil.getLeapDay(1000);
    const expected: GetLeapDayResult = { status: "ok", value: 28 };
    expect(actual).toEqual(expected);
  });

  test("閏年のチェックでエラーがあればエラーステータスが返る", () => {
    const spy = jest.spyOn(yearUtil, "isLeapYear").mockImplementation((_) => ({
      status: "error",
    }));
    const actual = yearUtil.getLeapDay(1000);
    const expected: GetLeapDayResult = { status: "error" };
    expect(actual).toEqual(expected);
  });
});
