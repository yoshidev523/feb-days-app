"use client";
import React, { ChangeEvent, useState } from "react";
import { CheckStatus } from "@/types/checkStatus";
import { CheckLeapYearResult } from "@/types/checkLeapYearResult";

export const CheckCard = () => {
  const [message, setMessage] = useState(":)");
  const [checkStatus, setCheckStatus] = useState<CheckStatus>("idle");
  const [inputValue, setInputValue] = useState("");

  const sleep = (msec: number) =>
    new Promise((resolve) => setTimeout(resolve, msec));

  const isLeapYear = (year: number): CheckLeapYearResult => {
    if (year < 0) return { status: "error" };
    if (!Number.isInteger(year)) return { status: "error" };
    return {
      status: "ok",
      isLeapYear: (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0,
    };
  };

  const handleClickCheckButton = async () => {
    setCheckStatus("checking");

    await sleep(2000);

    const inputValueNum = Number(inputValue);
    if (isNaN(inputValueNum)) {
      setCheckStatus("error");
      return;
    }
    const result = isLeapYear(inputValueNum);
    if (result.status === "error") {
      setCheckStatus("error");
      return;
    }
    setCheckStatus("idle");
    setMessage(
      `February ${inputValueNum} has ${result.isLeapYear ? 29 : 28} days.`,
    );
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={"space-y-6 rounded-2xl bg-white p-12"}>
      <div className={"flex justify-between space-x-3"}>
        <input
          type="number"
          onChange={handleChangeInput}
          className={
            "border-b-2 border-gray-800 p-2 focus:border-b-cyan-600 focus:outline-none"
          }
        />
        <button
          className={
            "rounded bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-800"
          }
          onClick={handleClickCheckButton}
        >
          Check
        </button>
      </div>
      <div>
        {checkStatus === "idle" && (
          <p
            className={
              "animate-fade-up text-center text-2xl font-bold"
            }
          >
            {message}
          </p>
        )}
        {checkStatus === "checking" && (
          <p
            className={
              "animate-infinite animate-ease-in-out animate-bounce text-center text-2xl font-bold"
            }
          >
            Checking...
          </p>
        )}
        {checkStatus === "error" && (
          <p
            className={
              "animate-fade-up text-center text-2xl font-bold text-red-600"
            }
          >
            Something Wrong... :(
          </p>
        )}
      </div>
    </div>
  );
};
