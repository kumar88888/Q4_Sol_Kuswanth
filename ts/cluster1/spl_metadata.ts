import wallet from "../wba-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { 
    createMetadataAccountV3, 
    CreateMetadataAccountV3InstructionAccounts, 
    CreateMetadataAccountV3InstructionArgs,
    DataV2Args
} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";
import bs58 from 'bs58'; // Importing bs58 for encoding
// Define our Mint address
const mint = publicKey("GjLjoM1PSBgDeqXPVDTadWGMQF57wiydatwEtZYHzghy");

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
    try {
        // Define accounts
        let accounts: CreateMetadataAccountV3InstructionAccounts = {
            mint: mint,
            updateAuthority: keypair.publicKey,
            mintAuthority: signer,
        };

        // Define data
        let data: DataV2Args = {
            name: "SHOOT YOURSELF", // Name of the NFT
            symbol: "SHOOT", // Symbol (optional)
            uri:"",
            sellerFeeBasisPoints: 500, // 5% fee
            creators:null,
            collection:null,
            uses:null
        };

        // Define args
        let args: CreateMetadataAccountV3InstructionArgs = {
            data: data,
            isMutable: true, // Set to true if you want to be able to update the metadata later
            collectionDetails:null
        };

        // Create and send the transaction
        let tx = createMetadataAccountV3(
            umi,
            {
                ...accounts,
                ...args,
            }
        );

        let result = await tx.sendAndConfirm(umi);
        console.log(bs58.encode(result.signature));
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`);
    }
})();

/* import wallet from "../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { 
    createMetadataAccountV3, 
    CreateMetadataAccountV3InstructionAccounts, 
    CreateMetadataAccountV3InstructionArgs,
    DataV2Args
} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";

// Define our Mint address
const mint = publicKey("<mint address>")

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
    try {
        // Start here
        // let accounts: CreateMetadataAccountV3InstructionAccounts = {
        //     ???
        // }

        // let data: DataV2Args = {
        //     ???
        // }

        // let args: CreateMetadataAccountV3InstructionArgs = {
        //     ???
        // }

        // let tx = createMetadataAccountV3(
        //     umi,
        //     {
        //         ...accounts,
        //         ...args
        //     }
        // )

        // let result = await tx.sendAndConfirm(umi);
        // console.log(bs58.encode(result.signature));
    } catch(e) {
        console.error(Oops, something went wrong: ${e})
    }
})(); */