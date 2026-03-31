import {
  isConnected,
  isAllowed,
  setAllowed,
  getAddress,
  signTransaction,
} from "@stellar/freighter-api";

// Check if Freighter is installed
export const checkFreighterInstallation = async (): Promise<boolean> => {
  const result = await isConnected();
  return result.isConnected;
};

// Check if we already have permission from a previous session
export const checkConnection = async (): Promise<string | null> => {
  const allowedResult = await isAllowed();
  if (allowedResult.isAllowed) {
    const addressResult = await getAddress();
    return addressResult.address || null;
  }
  return null;
};

// Prompt the wallet extension to connect
export const connectFreighter = async (): Promise<{ publicKey?: string; error?: string }> => {
  try {
    await setAllowed();
    const addressResult = await getAddress();
    if (addressResult.error) {
      return { error: addressResult.error };
    }
    return { publicKey: addressResult.address };
  } catch (error: unknown) {
    const err = error as Error;
    return { error: err.message || "Failed to connect wallet" };
  }
};

export { signTransaction };
