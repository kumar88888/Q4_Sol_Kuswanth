import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import wallet from "../wba-wallet.json";
import { getOrCreateAssociatedTokenAccount, transfer, getAccount } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("GjLjoM1PSBgDeqXPVDTadWGMQF57wiydatwEtZYHzghy");

// Recipient address
const to = new PublicKey("Recipient Address");

(async () => {
    try {
        // Get the token account of the sender's wallet
        const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey
        );

        // Get the token account of the recipient address
        const toTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            to
        );

        // Amount of tokens to transfer (1 for example)
        const amount = 1 * LAMPORTS_PER_SOL; // Adjust as needed

        // Transfer the token from the sender's token account to the recipient's token account
        const transferSignature = await transfer(
            connection,
            keypair,
            fromTokenAccount.address,
            toTokenAccount.address,
            keypair,
            amount
        );

        console.log(`Transfer successful! Signature: ${transferSignature}`);
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`);
    }
})();
