// @ts-nocheck
import { createPublicClient, createWalletClient, http, encodeFunctionData } from "viem";
import { mainnet } from "viem/chains";
import { namehash } from "viem/ens";
import { privateKeyToAccount } from "viem/accounts";
import * as dotenv from "dotenv";

dotenv.config();

const PUBLIC_RESOLVER_ADDRESS = "0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41";

const publicResolverABI = [
  {
    inputs: [
      { internalType: "bytes32", name: "node", type: "bytes32" },
      { internalType: "string", name: "key", type: "string" },
      { internalType: "string", name: "value", type: "string" }
    ],
    name: "setText",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes[]", name: "data", type: "bytes[]" }
    ],
    name: "multicall",
    outputs: [{ internalType: "bytes[]", name: "results", type: "bytes[]" }],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// Standard ENS Text Records format for FairTrain protocol
const RECORDS = {
  "fairtrain.price":         "100",     // USDC per 1000 tokens (micro-USDC, 6 dec)
  "fairtrain.allowed-uses":  "training,finetuning",
  "fairtrain.royalty-pct":   "0",       // % of downstream revenue (phase 2)
  "fairtrain.content-vault": "",        // 0G storage root CID (filled on register)
  "fairtrain.registry":      process.env.REGISTRY_ADDRESS || "0x0000000000000000000000000000000000000000",   // FairTrainRegistry contract address
  "fairtrain.version":       "1",
};

export async function setupCreatorDomain(subdomain: string = "frida") {
    console.log(`Setting up ENS subdomain text records for ${subdomain}.creator.eth...`);
    
    if (!process.env.PRIVATE_KEY) {
        console.warn("No PRIVATE_KEY provided in env, skipping on-chain write.");
        return;
    }

    const account = privateKeyToAccount(`0x${process.env.PRIVATE_KEY.replace(/^0x/, '')}` as `0x${string}`);
    const client = createWalletClient({
        account,
        chain: mainnet,
        transport: http(process.env.ETH_RPC_URL)
    });

    const name = `${subdomain}.creator.eth`;
    const node = namehash(name);

    const calls = Object.entries(RECORDS).map(([key, value]) =>
      encodeFunctionData({
        abi: publicResolverABI,
        functionName: "setText",
        args: [node as any, key as string, value as string],
      })
    );

    console.log(`Sending multicall transaction to set ${calls.length} records...`);
    
    try {
        const hash = await client.writeContract({
            address: PUBLIC_RESOLVER_ADDRESS,
            abi: publicResolverABI,
            functionName: "multicall",
            args: [calls],
            chain: mainnet
        });
        console.log(`Transaction submitted: ${hash}`);
    } catch (err: any) {
        console.error("Failed to execute transaction:", err.message);
    }
}

if (require.main === module) {
    const subdomain = process.argv[2] || "frida";
    setupCreatorDomain(subdomain).catch(console.error);
}

