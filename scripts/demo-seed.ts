import { FairTrain } from "../packages/sdk/src/index";
import * as dotenv from "dotenv";

dotenv.config();

async function runDemoSeed() {
    console.log("Starting demo seeder...");
    
    // Simulate the SDK initialization
    const ft = new FairTrain({ 
        privateKey: process.env.PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000000", 
        rpcUrl: "https://rpc-testnet.0g.ai" 
    });

    console.log("Uploading to 0G Storage...");
    // Simulate upload and register flow for demo purposes 
    // In a real execution, you would pass an actual file path here:
    // const result = await ft.register({
    //     filePath: "./my-painting.jpg",
    //     ensSubdomain: "frida",
    //     pricePerKToken: 100, 
    //     allowedUses: ["training"],
    // });

    console.log("✓ CID: bafyre...");
    console.log("Registering on-chain...");
    console.log("✓ contentHash: 0xa3f9...");
    console.log("Writing ENS terms...");
    console.log("✓ frida.creator.eth → price: 0.0001 USDC/token");
    
    console.log("\nSetup complete. You can now run the pipeline and keeper tools.");
}

if (require.main === module) {
    runDemoSeed().catch(console.error);
}
