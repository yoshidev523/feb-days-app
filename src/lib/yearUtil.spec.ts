import { yearUtil } from "@/lib/yearUtil";
import { CheckLeapYearResult } from "@/types/checkLeapYearResult";
import { GetLeapDayResult } from "@/types/getLeapDayResult";

describe("test of isLeapYear", () => {
  test.each([
    [2024, true],
    [2025, false],
    [2000, true],
    [2100, false],
  ])("good pass, year=%i, expected=%s", (year, expectedValue) => {
    const actual = yearUtil.isLeapYear(year);
    const expected: CheckLeapYearResult = {
      status: "ok",
      isLeapYear: expectedValue,
    };
    expect(actual).toEqual(expected);
  });

  test.each([[-1], [1.1]])("error pass, year=%i, expected=%s", (year) => {
    const actual = yearUtil.isLeapYear(year);
    const expected: CheckLeapYearResult = {
      status: "error",
    };
    expect(actual).toEqual(expected);
  });
});

describe("test of getLeapYear", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("return 29 when it's a leap year", () => {
    // mock
    const spy = jest.spyOn(yearUtil, "isLeapYear").mockImplementation((_) => ({
      status: "ok",
      isLeapYear: true,
    }));
    // execute
    const actual = yearUtil.getLeapDay(1000);
    // verify
    const expected: GetLeapDayResult = {
      status: "ok",
      value: 29,
    };
    expect(actual).toEqual(expected);
  });

  test("return 28 when it's not a leap year", () => {
    // mock
    const spy = jest.spyOn(yearUtil, "isLeapYear").mockImplementation((_) => ({
      status: "ok",
      isLeapYear: false,
    }));
    // execute
    const actual = yearUtil.getLeapDay(1000);
    // verify
    const expected: GetLeapDayResult = {
      status: "ok",
      value: 28,
    };
    expect(actual).toEqual(expected);
  });

  test("return error status when isLeapYear returns a error status", () => {
    // mock
    const spy = jest.spyOn(yearUtil, "isLeapYear").mockImplementation((_) => ({
      status: "error",
    }));
    // execute
    const actual = yearUtil.getLeapDay(1000);
    // verify
    const expected: GetLeapDayResult = {
      status: "error",
    };
    expect(actual).toEqual(expected);
  });
});
