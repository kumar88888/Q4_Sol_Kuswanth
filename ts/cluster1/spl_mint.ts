import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "../wba-wallet.json";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address (replace with your actual mint address)
const mint = new PublicKey("GjLjoM1PSBgDeqXPVDTadWGMQF57wiydatwEtZYHzghy");

// Amount to mint (in the smallest unit; for 1 million with 6 decimals, it would be 1_000_000)
const amountToMint = (1000000*100000)-1000000; 

(async () => {
    try {
        // Create an associated token account for your wallet
        const ata = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey // Your wallet address
        );
        console.log(`Your ATA is: ${ata.address.toBase58()}`);

        // Mint tokens to your associated token account
        const mintTx = await mintTo(
            connection,
            keypair,
            mint,
            ata.address, // The ATA address where tokens will be minted
            keypair,     // The authority to mint tokens
            amountToMint // Amount to mint (in the smallest unit)
        );
        console.log(`Your mint txid: ${mintTx}`);
    } catch (error) {
        console.log(`Oops, something went wrong: ${error}`);
    }
})();
