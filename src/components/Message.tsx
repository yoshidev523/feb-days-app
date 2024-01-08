import React from "react";
import { CheckStatus } from "@/types/checkStatus";

type MessageProps = {
  checkStatus: CheckStatus,
  message: string
}

export const Message = ({checkStatus, message}: MessageProps) => {
  return (
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
  );
};
