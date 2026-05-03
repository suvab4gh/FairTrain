import { FairTrain } from "../packages/sdk/src/index";
import { fairTrainConsume } from "../packages/pipeline/src/index";
import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * Full end-to-end flow test as defined in Step 4.
 * Upload file -> register on-chain -> write ENS -> call consume() -> read 0G log
 */
async function runTestFlow() {
    console.log("=== Starting FairTrain E2E Test Flow ===");

    const privateKey = process.env.PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000000";
    const rpcUrl = "https://rpc-testnet.0g.ai";

    // Initialize Creator SDK
    const ft = new FairTrain({ privateKey, rpcUrl });

    console.log("\n[1] Registering Content (0G Upload + Chain + ENS)...");
    const registerResult = await ft.register({
        filePath: "package.json", // Just a dummy local file to hash
        ensSubdomain: "test-creator",
        pricePerKToken: 100, // 0.0001 USDC
        allowedUses: ["training", "finetuning"]
    });

    console.log("✓ Registered:", registerResult);

    console.log("\n[2] Simulating AI Pipeline Consumption...");
    // Mocking an AI consuming the registered content via the pipeline SDK
    // Create a random wallet to act as the consumer
    const consumerWallet = ethers.Wallet.createRandom();
    
    // The pipeline looks up the URL, resolves ENS, finds the Registry, and pays USDC.
    // (mocked via fairTrainConsume)
    const consumeResult = await fairTrainConsume(
        "https://example.com/test-creator/data.json", 
        5000, 
        consumerWallet
    );
    
    console.log("✓ Pipeline consumed successfully. Paid out:", consumeResult);

    console.log("\n[3] Reading Immutable Audit Trail from 0G...");
    const auditTrail = await ft.auditTrail(registerResult.contentHash);
    console.log("✓ 0G Audit Trail:", auditTrail);

    console.log("\n[4] Checking Creator Earnings...");
    const earnings = await ft.earnings(registerResult.contentHash);
    console.log("✓ Earnings Dashboard State:", earnings);

    console.log("\n=== Flow execution completed successfully ===");
}

if (require.main === module) {
    runTestFlow().catch(console.error);
}
