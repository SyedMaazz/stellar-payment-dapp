import React from "react";

interface TxStatusProps {
  status: "idle" | "loading" | "success" | "error";
  hash?: string;
  errorMessage?: string;
}

export default function TxStatus({ status, hash, errorMessage }: TxStatusProps) {
  if (status === "idle") return null;

  return (
    <div className={`w-full p-4 rounded-xl border mt-4 ${
      status === "loading" ? "bg-blue-50 border-blue-200 dark:bg-blue-500/10 dark:border-blue-500/20" :
      status === "success" ? "bg-green-50 border-green-200 dark:bg-green-500/10 dark:border-green-500/20" :
      "bg-red-50 border-red-200 dark:bg-red-500/10 dark:border-red-500/20"
    }`}>
      <div className="flex flex-col gap-2">
        {/* Status Heading */}
        <h4 className={`text-md font-bold flex items-center gap-2 ${
          status === "loading" ? "text-blue-800 dark:text-blue-300" :
          status === "success" ? "text-green-800 dark:text-green-300" :
          "text-red-800 dark:text-red-300"
        }`}>
          {status === "loading" && "🔄 Transaction in progress"}
          {status === "success" && "✅ Transaction Successful!"}
          {status === "error" && "❌ Transaction Failed"}
        </h4>

        {/* Message / Error Details */}
        {status === "error" && errorMessage && (
          <p className="text-sm font-medium text-red-700 dark:text-red-400">
            {errorMessage}
          </p>
        )}

        {/* Successful Hash Link */}
        {status === "success" && hash && (
          <div className="flex flex-col mt-2">
            <span className="text-xs text-green-700 dark:text-green-400 font-semibold uppercase tracking-wide">
              Transaction Hash
            </span>
            <a
              href={`https://stellar.expert/explorer/testnet/tx/${hash}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-mono mt-1 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 underline break-all"
            >
              {hash}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
