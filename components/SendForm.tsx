import React, { useState } from "react";
import { buildPaymentTransaction, submitTransaction } from "../lib/stellar";
import { signTransaction } from "../lib/freighter";

interface SendFormProps {
  address: string;
  onSuccess: (hash: string) => void;
  onError: (msg: string) => void;
  onRefreshBalance: () => void;
}

export default function SendForm({ address, onSuccess, onError, onRefreshBalance }: SendFormProps) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Validate the form before attempting the transaction
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim() || !amount.trim()) {
      onError("Please provide a valid recipient address and amount.");
      return;
    }
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      onError("Amount must be a positive number.");
      return;
    }

    try {
      setIsLoading(true);
      onError(""); // clear any past errors

      // 1. Build the transaction using Stellar SDK (lib/stellar.ts)
      const xdr = await buildPaymentTransaction(address, recipient, amount);

      // 2. Ask the Freighter extension to sign it
      const signedXdrResult = await signTransaction(xdr, { networkPassphrase: "Test SDF Network ; September 2015" });
      
      // Early check for cancellation or error in the signature step
      if (signedXdrResult.error) {
        setIsLoading(false);
        onError(`Wallet error: ${signedXdrResult.error}`);
        return;
      }
      
      // Ensure we actually got a signed transaction string back
      const txToSubmit = signedXdrResult.signedTxXdr;

      // 3. Submit the signed transaction to the Stellar Testnet
      const response = await submitTransaction(txToSubmit);
      
      // Success!
      setIsLoading(false);
      onSuccess(response.hash);
      
      // Clear inputs and refresh balance
      setRecipient("");
      setAmount("");
      onRefreshBalance();
      
    } catch (error: unknown) {
      const err = error as Error;
      console.error(err);
      setIsLoading(false);
      onError(err.message || "An unknown error occurred while sending XLM.");
    }
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm transition-all hover:shadow-md">
      <form onSubmit={handleSend} className="flex flex-col gap-4">
        
        {/* Recipient Address Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            Recipient Public Key
          </label>
          <input
            type="text"
            className="w-full h-12 px-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="G..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            disabled={isLoading}
            required
            spellCheck="false"
          />
        </div>

        {/* Amount Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            Amount (XLM)
          </label>
          <input
            type="number"
            step="0.0000001"
            className="w-full h-12 px-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isLoading}
            required
            min="0.0000001"
          />
        </div>

        {/* Action Button */}
        <button
          type="submit"
          className="mt-4 flex items-center justify-center w-full h-14 rounded-xl bg-indigo-600 font-semibold text-white transition-all hover:bg-indigo-700 active:scale-[0.98] shadow-md shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? (
             <span className="flex items-center gap-2">
                 <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
                 Processing...
             </span>
          ) : (
            "Send XLM"
          )}
        </button>
      </form>
    </div>
  );
}
