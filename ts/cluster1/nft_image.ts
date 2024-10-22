import wallet from "../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile } from "fs/promises"


const filepath = '/home/kuswanth/solana-starter/ts/cluster1/generug.png';

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');


let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        
        //1. Load image
        const buffer = await readFile(filepath);
     

         //2. Convert image to generic file.
        const file = createGenericFile(buffer,filepath,{
            contentType: "image/png"
        })

        //3. Upload image
    
        const image = await umi.uploader.upload([file])
       
      
       // Image URI 
        const [myUri] = image;
         console.log("Your image URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
