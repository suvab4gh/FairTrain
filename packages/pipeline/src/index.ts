import { discoverTerms } from "./discover";
import { appendConsumptionLog } from "../../sdk/src/storage";
import { ethers } from "ethers";

const REGISTRY_ADDRESS = process.env.REGISTRY_ADDRESS || "0x0000000000000000000000000000000000000000";
const USDC_ADDRESS = process.env.USDC_ADDRESS || "0x0000000000000000000000000000000000000000";

const REGISTRY_ABI = [
  "function getTerms(bytes32 contentHash) external view returns (address creator, string memory ensName, uint96 pricePerKToken)",
  "function consume(bytes32 contentHash, uint64 tokenCount) external"
];

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function transfer(address to, uint256 amount) external returns (bool)"
];

export async function hashUrl(url: string) {
    // Basic mock fetch and hash
    const text = await fetch(url).then(r => r.text());
    return ethers.keccak256(ethers.toUtf8Bytes(text));
}

/**
 * Handles the consumption of training data, interacting with FairTrain Protocol
 * to automatically negotiate terms and pay curators/creators.
 */
export async function fairTrainConsume(
  url: string,
  tokenCount: number,
  signer: ethers.Signer
): Promise<{ paid: number; creator: string } | null> {
  const contentHash = await hashUrl(url);

  console.log(`Discovered URL: ${url}`);
  
  // Clearly separated mock mode: used when REGISTRY_ADDRESS is not populated or set to zero address
  if (REGISTRY_ADDRESS === "0x0000000000000000000000000000000000000000") {
      console.log("Simulating consumption (mock mode)...");
      const pseudoPaid = (tokenCount * 100) / 1e6;
      await appendConsumptionLog({ 
          contentHash, 
          consumer: await signer.getAddress(), 
          tokenCount, 
          txHash: "0xmocktx" + Date.now() 
      });
      return { paid: pseudoPaid, creator: 'mock.creator.eth' };
  }

  // Actual contract interaction logic
  try {
      // Connect to the Registry using the signer
      const registry = new ethers.Contract(REGISTRY_ADDRESS, REGISTRY_ABI, signer);
      // Connect to the USDC token contract using the signer to handle payments
      const usdc = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, signer);

      let getTermsResult;
      try {
          // Fetch creator terms from Registry (resolves ENS and pricing rules)
          getTermsResult = await registry.getTerms(contentHash);
      } catch (error) {
          console.error("Error calling getTerms on Registry:", error);
          return null;
      }

      const [creator, ensName, pricePerKToken] = getTermsResult;
      
      if (creator === ethers.ZeroAddress) {
          console.log("Content not registered, proceeding without payment.");
          return null;
      }

      // Calculate the total payment due based on token count
      const due = (BigInt(tokenCount) * BigInt(pricePerKToken)) / 1000n;
      
      let txHash = "";

      if (due > 0n) {
          try {
              // Ensure FairTrainRegistry contract has allowance to spend USDC on behalf of the consumer
              console.log(`Approving registry to spend ${Number(due) / 1e6} USDC...`);
              const approveTx = await usdc.approve(REGISTRY_ADDRESS, due);
              await approveTx.wait();
              console.log("USDC approval confirmed.");
          } catch (error) {
              console.error("Error calling approve on USDC contract:", error);
              return null;
          }

          try {
              // Transfer USDC directly to creator
              console.log(`Transferring ${Number(due) / 1e6} USDC to creator...`);
              const transferTx = await usdc.transfer(creator, due);
              await transferTx.wait();
              console.log("USDC transfer confirmed.");
          } catch (error) {
              console.error("Error calling transfer on USDC contract:", error);
              return null;
          }
      }

      try {
          // Record consumption on-chain
          console.log("Executing registry.consume...");
          const tx = await registry.consume(contentHash, tokenCount);
          await tx.wait();
          txHash = tx.hash;
          console.log("Consumption recorded on-chain.");
      } catch (error) {
          console.error("Error calling consume on Registry:", error);
          return null;
      }
      
      try {
          // Append to 0G log
          await appendConsumptionLog({ 
              contentHash, 
              consumer: await signer.getAddress(), 
              tokenCount, 
              txHash: txHash
          });
      } catch (error) {
          console.error("Failed to append consumption log to 0G:", error);
      }
      
      const paidNum = Number(due) / 1e6;
      console.log(`Paid ${paidNum} USDC → ${ensName}`);
      return { paid: paidNum, creator: ensName };

  } catch (error) {
      console.error("Unexpected error executing consumption:", error);
      return null;
  }
}