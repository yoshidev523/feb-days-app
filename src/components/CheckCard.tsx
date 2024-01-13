"use client";
import React, { ChangeEvent, useState } from "react";
import { CheckStatus } from "@/types/checkStatus";
import { Message } from "@/components/Message";
import { sleep } from "@/lib/sleep";
import { yearUtil } from "@/lib/yearUtil";

export const CheckCard = () => {
  const [message, setMessage] = useState(":)");
  const [checkStatus, setCheckStatus] = useState<CheckStatus>("idle");
  const [inputValue, setInputValue] = useState("");

  const handleClickCheckButton = async () => {
    setCheckStatus("checking");

    await sleep(2000);

    const inputValueNum = Number(inputValue);
    if (isNaN(inputValueNum)) {
      setCheckStatus("error");
      return;
    }
    const result = yearUtil.getLeapDay(inputValueNum);
    if (result.status === "error") {
      setCheckStatus("error");
      return;
    }
    setCheckStatus("idle");
    setMessage(`February ${inputValueNum} has ${result.value} days.`);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={"space-y-6 rounded-2xl bg-white p-12"}>
      <div className={"flex justify-between space-x-3"}>
        <input
          data-testid={"input"}
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
      <Message checkStatus={checkStatus} message={message} />
    </div>
  );
};
