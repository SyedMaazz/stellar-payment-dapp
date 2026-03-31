import { Horizon, TransactionBuilder, Networks, Asset, Operation } from "@stellar/stellar-sdk";

// Initialize the Horizon Server (Testnet by default)
const horizonUrl = process.env.NEXT_PUBLIC_HORIZON_URL || "https://horizon-testnet.stellar.org";
const server = new Horizon.Server(horizonUrl);
// Default to testnet passphrase
const networkPassphrase = Networks.TESTNET;

/**
 * Fetch the XLM (native) balance for a given Stellar public key
 */
export const getBalance = async (publicKey: string): Promise<string> => {
  try {
    const account = await server.loadAccount(publicKey);
    const nativeBalance = account.balances.find((b) => b.asset_type === "native");
    return nativeBalance ? nativeBalance.balance : "0.0000000";
  } catch (error: unknown) {
    console.error("Error fetching balance:", error);
    return "0.0000000";
  }
};

/**
 * Build an unsigned payment transaction XDR
 */
export const buildPaymentTransaction = async (
  senderPublicKey: string,
  receiverPublicKey: string,
  amount: string
): Promise<string> => {
  try {
    // 1. Load the sender's account to get the current sequence number
    const account = await server.loadAccount(senderPublicKey);

    // 2. Fetch the current base fee from the network
    const fee = await server.fetchBaseFee();

    // 3. Build the transaction
    const transaction = new TransactionBuilder(account, {
      fee: fee.toString(),
      networkPassphrase,
    })
      .addOperation(
        Operation.payment({
          destination: receiverPublicKey,
          asset: Asset.native(),
          amount: amount,
        })
      )
      .setTimeout(30) // Transaction expires after 30 seconds
      .build();

    // 4. Return the transaction as a Base64 encoded XDR string
    return transaction.toXDR();
  } catch (error: unknown) {
    const err = error as { response?: { status?: number }; message?: string };
    if (err?.response?.status === 404) {
      throw new Error("Sender account not funded on the network.");
    }
    throw new Error(`Failed to build transaction: ${err.message || "Unknown error"}`);
  }
};

/**
 * Submit a signed transaction XDR to the Horizon network
 */
export const submitTransaction = async (signedXdr: string) => {
  try {
    // Parse the signed XDR
    const transaction = TransactionBuilder.fromXDR(signedXdr, networkPassphrase);
    
    // Submit it to the Stellar network
    const response = await server.submitTransaction(transaction);
    return response;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { title?: string } }; message?: string };
    console.error("Submit Exception:", err);
    if (err.response && err.response.data) {
      console.error("Horizon error details:", err.response.data);
      throw new Error(
        `Transaction failed: ${err.response.data.title || "Unknown error"}`
      );
    }
    throw new Error(`Failed to submit transaction: ${err.message || "Unknown error"}`);
  }
};
