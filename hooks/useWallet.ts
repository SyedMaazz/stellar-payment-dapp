import { useState, useEffect } from "react";
import {
  checkFreighterInstallation,
  checkConnection,
  connectFreighter,
} from "../lib/freighter";

export const useWallet = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const installed = await checkFreighterInstallation();
      setIsInstalled(installed);

      if (installed) {
        const existingAddress = await checkConnection();
        if (existingAddress) {
          setAddress(existingAddress);
        }
      }
    };
    init();
  }, []);

  const connect = async () => {
    setError(null);
    if (!isInstalled) {
      setError("Freighter wallet is not installed. Please install it to continue.");
      return;
    }
    const { publicKey, error: connectError } = await connectFreighter();
    if (connectError) {
      setError(connectError);
    } else if (publicKey) {
      setAddress(publicKey);
    }
  };

  const disconnect = () => {
    // Freighter doesn't have a built-in disconnect method that clears allowance,
    // so we just clear our local state
    setAddress(null);
  };

  return {
    address,
    isInstalled,
    error,
    connect,
    disconnect,
  };
};
