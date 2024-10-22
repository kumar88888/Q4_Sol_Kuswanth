
import wallet from "../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        //Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

         const image ="https://devnet.irys.xyz//eCmRhfy8Gnu3b3Fj6n7JBbSrZEXiNdDy3HYMmKQLFth";

         const metadata = {
            name: "RUGGED",
            symbol: "RUG",
            description: "If you got this you rugged",
            image: image,
            attributes: [
              { trait_type: "trait1", value: "20"},
              { trait_type: "trait2", value: "80"},
              { trait_type: "trait3", value: "40"},
              { trait_type: "trait4", value: "10"},
          ],
            properties: {
              files: [
                {
                  type: "image/png",
                  uri: image,
                },
              ],
            },
            creators: [
              {
                address: keypair.publicKey,
                share: 100,
              },
            ],
          };
          const myUri = await umi.uploader.uploadJson(metadata);
        console.log("Your metadata URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();