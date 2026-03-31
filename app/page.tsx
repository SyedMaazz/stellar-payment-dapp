"use client";

import { useWallet } from "../hooks/useWallet";
import WalletConnect from "../components/WalletConnect";
// We'll import these later in Phase 2 & 3
// import BalancePanel from "../components/BalancePanel";
// import SendForm from "../components/SendForm";
// import TxStatus from "../components/TxStatus";

export default function Home() {
  const { address, error, connect, disconnect } = useWallet();

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

        {/* Modular Components Go Here */}
        <div className="flex flex-col w-full gap-8">
          
          {/* Phase 1: Wallet Connection */}
          <section className="flex flex-col w-full">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">1. Connect Wallet</h2>
            <WalletConnect 
              address={address} 
              error={error} 
              connect={connect} 
              disconnect={disconnect} 
            />
          </section>

          {/* Placeholders for Future Phases */}
          {address && (
            <div className="w-full flex-col flex gap-8">
              {/* Phase 2: BalancePanel goes here */}
              {/* Phase 3 & 4: SendForm and TxStatus go here */}
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
