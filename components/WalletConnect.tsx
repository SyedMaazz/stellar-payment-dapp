import React from "react";

interface WalletConnectProps {
  address: string | null;
  error: string | null;
  connect: () => void;
  disconnect: () => void;
}

export default function WalletConnect({
  address,
  error,
  connect,
  disconnect,
}: WalletConnectProps) {
  // Utility: Show truncated address like GABC...WXYZ
  const formatAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="flex flex-col items-center sm:items-start w-full">
      <div className="flex items-center gap-4">
        {!address ? (
          <button
            onClick={connect}
            className="flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition-all hover:bg-indigo-700 active:scale-95 shadow-md shadow-indigo-600/30"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-green-100 px-4 py-2 text-sm font-mono font-bold text-green-800 border border-green-200">
              {formatAddress(address)}
            </span>
            <button
              onClick={disconnect}
              className="flex items-center justify-center rounded-lg bg-zinc-200 font-semibold text-zinc-800 px-4 py-2 transition-colors hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
      
      {/* Show connection errors if any */}
      {error && (
        <p className="mt-3 text-sm text-red-500 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
