import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from '@solana/spl-token';
import wallet from "../wba-wallet.json";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

(async () => {
    try {
        // Create a new token mint
        const mint = await createMint(
            connection,
            keypair,
            keypair.publicKey, // Set mint authority
            null,              // Set freeze authority to null (no freeze authority)
            6                  // Set decimals to 6
        );

        // Log the mint ID
        console.log(`Mint ID: ${mint.toBase58()}`);
    } catch (error) {
        console.log(`Oops, something went wrong: ${error}`);
    }
})();

