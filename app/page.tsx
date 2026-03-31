"use client";

import { useState } from "react";
import { useWallet } from "../hooks/useWallet";
import WalletConnect from "../components/WalletConnect";
import BalancePanel from "../components/BalancePanel";
import SendForm from "../components/SendForm";
import TxStatus from "../components/TxStatus";

export default function Home() {
  const { address, balance, error: walletError, connect, disconnect } = useWallet();

  // Transaction Status State
  const [txStatus, setTxStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [txHash, setTxHash] = useState<string>("");
  const [txError, setTxError] = useState<string>("");

  // Handler for successful transaction
  const handleTxSuccess = (hash: string) => {
    setTxStatus("success");
    setTxHash(hash);
    setTxError("");
  };

  // Handler for transaction errors
  const handleTxError = (msg: string) => {
    if (msg) {
      setTxStatus("error");
      setTxError(msg);
      setTxHash("");
    } else {
      setTxStatus("idle");
      setTxError("");
      setTxHash("");
    }
  };

  // Force re-fetch the balance by calling connect or we can just rely on auto-refresh.
  // We'll simulate a refresh by calling connect again or disconnecting/connecting.
  // Wait, if we keep the same address, `useWallet` automatically handles it via polling,
  // but to immediately refresh, it's easier to just call `connect` to re-trigger.
  const handleRefreshBalance = () => {
    connect(); 
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4">
      <main className="flex w-full max-w-2xl flex-col items-center justify-start py-8 px-6 sm:px-12 bg-white dark:bg-zinc-950 rounded-2xl shadow-xl shadow-zinc-200/50 dark:shadow-zinc-900/50 ring-1 ring-zinc-200 dark:ring-zinc-800">
        
        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center sm:text-left sm:items-start w-full mb-10 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Stellar Payment <span className="text-indigo-600 dark:text-indigo-400">dApp</span>
          </h1>
          <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-md">
            Connect your Freighter wallet to check your balance and send XLM on the Stellar Testnet.
          </p>
        </div>

        {/* Modular Components */}
        <div className="flex flex-col w-full gap-8">
          
          {/* Section 1: Wallet Connection */}
          <section className="flex flex-col w-full">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">1. Connect Wallet</h2>
            <WalletConnect 
              address={address} 
              error={walletError} 
              connect={connect} 
              disconnect={disconnect} 
            />
          </section>

          {/* Connected state: Balance and Sending */}
          {address && (
            <div className="w-full flex-col flex gap-8">
              
              {/* Section 2: Your Balance */}
              <section className="flex flex-col w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">2. Your Balance</h2>
                <BalancePanel balance={balance} />
              </section>

              {/* Section 3: Send XLM */}
              {balance && balance !== "0.0000000" && (
                <section className="flex flex-col w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">3. Send Payment</h2>
                  
                  <SendForm 
                    address={address}
                    onSuccess={handleTxSuccess}
                    onError={handleTxError}
                    onRefreshBalance={handleRefreshBalance}
                  />

                  {/* Section 4: Transaction Status Feedback */}
                  <TxStatus 
                    status={txStatus} 
                    hash={txHash} 
                    errorMessage={txError} 
                  />
                  
                </section>
              )}
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-zinc-500">
        🚀 Built for Stellar Journey to Mastery
      </footer>
    </div>
  );
}
