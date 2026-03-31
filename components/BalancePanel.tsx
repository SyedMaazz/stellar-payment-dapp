import React from "react";

interface BalancePanelProps {
  balance: string | null;
}

export default function BalancePanel({ balance }: BalancePanelProps) {
  return (
    <div className="w-full rounded-2xl bg-zinc-50 p-6 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all hover:shadow-md">
      <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wide">
        Current Balance
      </h3>
      <div className="flex items-baseline gap-2">
        {balance === null ? (
          <div className="h-10 w-32 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        ) : (
          <>
            <span className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              {Number(balance).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 7,
              })}
            </span>
            <span className="text-xl font-semibold text-zinc-500 dark:text-zinc-400">
              XLM
            </span>
          </>
        )}
      </div>

      {balance === "0.0000000" && (
        <div className="mt-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Your account is unfunded.</strong> You need XLM to make transactions.
            Get free testnet XLM from <a href="https://laboratory.stellar.org/#account-creator?network=test" target="_blank" rel="noreferrer" className="underline font-bold hover:text-amber-900 dark:hover:text-amber-100">Friendbot</a>.
          </p>
        </div>
      )}
    </div>
  );
}
